"""
ResmiGunler.com Public Holiday API
==================================
Merges date.nager.at upstream (fixed-date national holidays) with curated
lunar holiday data (Ramazan Bayramı, Kurban Bayramı — Hijri-based).

Also hosts the user feedback / comments backend (replacing Supabase).

Endpoints:
    GET  /v1/holidays?year=2027        → list for one year
    GET  /v1/holidays/upcoming?days=90 → upcoming holidays in next N days
    GET  /v1/years                     → years with available data
    GET  /v1/comments?context=...      → list comments for a context
    POST /v1/comments                  → create a new comment / reply
    GET  /health                       → liveness probe

Data refresh: cached for 6 hours; refreshed in background via lifespan task.
"""
from __future__ import annotations

import asyncio
import logging
import os
import re
import sqlite3
import time
from contextlib import asynccontextmanager
from datetime import date, datetime, timedelta, timezone
from pathlib import Path
from typing import Any

import httpx
from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field, field_validator

logging.basicConfig(level=logging.INFO, format="%(asctime)s [%(levelname)s] %(message)s")
log = logging.getLogger("resmigunler-api")

NAGER_URL = "https://date.nager.at/api/v3/PublicHolidays/{year}/TR"
SUPPORTED_YEARS = list(range(2024, 2031))
CACHE_TTL_SECONDS = 6 * 60 * 60  # 6 hours

# Diyanet-confirmed lunar holiday dates (Hijri based — these tend to shift +/- 1 day each year).
# Source: Diyanet İşleri Başkanlığı resmi takvimleri.
LUNAR: dict[int, list[dict[str, str]]] = {
    2024: [
        {"id": "ramazan-2024", "name": "Ramazan Bayramı", "date": "2024-04-10", "endDate": "2024-04-12"},
        {"id": "kurban-2024",  "name": "Kurban Bayramı",  "date": "2024-06-16", "endDate": "2024-06-19"},
    ],
    2025: [
        {"id": "ramazan-2025", "name": "Ramazan Bayramı", "date": "2025-03-30", "endDate": "2025-04-01"},
        {"id": "kurban-2025",  "name": "Kurban Bayramı",  "date": "2025-06-06", "endDate": "2025-06-09"},
    ],
    2026: [
        {"id": "ramazan-2026", "name": "Ramazan Bayramı", "date": "2026-03-20", "endDate": "2026-03-22"},
        {"id": "kurban-2026",  "name": "Kurban Bayramı",  "date": "2026-05-27", "endDate": "2026-05-30"},
    ],
    2027: [
        # Diyanet: Ramazan 9-11 Mart, Kurban 16-19 Mayıs (verified May 2026 via Diyanet sources)
        {"id": "ramazan-2027", "name": "Ramazan Bayramı", "date": "2027-03-09", "endDate": "2027-03-11"},
        {"id": "kurban-2027",  "name": "Kurban Bayramı",  "date": "2027-05-16", "endDate": "2027-05-19"},
    ],
    2028: [
        {"id": "ramazan-2028", "name": "Ramazan Bayramı", "date": "2028-02-26", "endDate": "2028-02-28"},
        {"id": "kurban-2028",  "name": "Kurban Bayramı",  "date": "2028-05-05", "endDate": "2028-05-08"},
    ],
    2029: [
        {"id": "ramazan-2029", "name": "Ramazan Bayramı", "date": "2029-02-14", "endDate": "2029-02-16"},
        {"id": "kurban-2029",  "name": "Kurban Bayramı",  "date": "2029-04-24", "endDate": "2029-04-27"},
    ],
    2030: [
        {"id": "ramazan-2030", "name": "Ramazan Bayramı", "date": "2030-02-04", "endDate": "2030-02-06"},
        {"id": "kurban-2030",  "name": "Kurban Bayramı",  "date": "2030-04-13", "endDate": "2030-04-16"},
    ],
}

IMAGE_MAP = {
    "yilbasi": "/images/yilbasi.webp",
    "ulusal egemenlik": "/images/23nisan.webp",
    "isci": "/images/1mayis.webp",
    "ataturk": "/images/19mayis.webp",
    "zafer": "/images/30agustos.webp",
    "cumhuriyet": "/images/29ekim.webp",
    "ramazan": "/images/ramazan.webp",
    "kurban": "/images/ramazan.webp",
    "demokrasi": "/images/yilbasi.webp",
}

CACHE: dict[int, tuple[float, list[dict[str, Any]]]] = {}


def _slugify_match(name: str) -> str:
    n = name.lower()
    n = (n.replace("ı", "i").replace("ğ", "g").replace("ü", "u")
          .replace("ş", "s").replace("ö", "o").replace("ç", "c"))
    return n


def _pick_image(name: str) -> str:
    s = _slugify_match(name)
    for keyword, url in IMAGE_MAP.items():
        if keyword in s:
            return url
    return "/images/yilbasi.webp"


def _slugify_id(name: str, year: int) -> str:
    s = _slugify_match(name).replace("'", "").replace("\"", "")
    s = "".join(c if c.isalnum() else "-" for c in s).strip("-")
    while "--" in s:
        s = s.replace("--", "-")
    return f"{s}-{year}"


async def _fetch_nager(year: int) -> list[dict[str, Any]]:
    async with httpx.AsyncClient(timeout=10.0) as client:
        r = await client.get(NAGER_URL.format(year=year))
        r.raise_for_status()
        return r.json()


def _enrich(name: str, dt: str, end_dt: str | None, year: int) -> dict[str, Any]:
    is_religious = ("Ramazan" in name) or ("Kurban" in name)
    return {
        "id": _slugify_id(name, year),
        "name": name,
        "date": dt,
        "endDate": end_dt,
        "type": "dini_tatil" if is_religious else "resmi_tatil",
        "imageUrl": _pick_image(name),
        "year": year,
        "source": "diyanet" if is_religious else "date.nager.at",
    }


async def get_holidays(year: int, force_refresh: bool = False) -> list[dict[str, Any]]:
    if year not in SUPPORTED_YEARS:
        raise HTTPException(404, f"Year {year} out of supported range {SUPPORTED_YEARS[0]}-{SUPPORTED_YEARS[-1]}")

    now = time.time()
    cached = CACHE.get(year)
    if not force_refresh and cached and (now - cached[0]) < CACHE_TTL_SECONDS:
        return cached[1]

    try:
        upstream = await _fetch_nager(year)
    except Exception as e:
        log.warning(f"Upstream fetch failed for {year}: {e}")
        if cached:
            log.info(f"Returning stale cache for {year}")
            return cached[1]
        raise HTTPException(503, "Upstream provider unavailable")

    fixed = [_enrich(h["localName"], h["date"], None, year) for h in upstream]
    lunar = [_enrich(h["name"], h["date"], h.get("endDate"), year) for h in LUNAR.get(year, [])]
    merged = sorted(fixed + lunar, key=lambda x: x["date"])

    CACHE[year] = (now, merged)
    log.info(f"Refreshed {year}: {len(merged)} holidays")
    return merged


async def _refresh_loop():
    while True:
        for y in SUPPORTED_YEARS:
            try:
                await get_holidays(y, force_refresh=True)
            except Exception as e:
                log.error(f"Background refresh {y} failed: {e}")
        await asyncio.sleep(CACHE_TTL_SECONDS)


# ---------------------------------------------------------------------------
# Comments (replaces Supabase)
# ---------------------------------------------------------------------------

DB_PATH = Path(os.getenv("RESMIGUNLER_DB", "/data/resmigunler.db"))
DB_PATH.parent.mkdir(parents=True, exist_ok=True)


def _db() -> sqlite3.Connection:
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    conn.execute("PRAGMA journal_mode=WAL")
    conn.execute("PRAGMA foreign_keys=ON")
    return conn


def _init_db() -> None:
    with _db() as c:
        c.execute(
            """
            CREATE TABLE IF NOT EXISTS comments (
                id          INTEGER PRIMARY KEY AUTOINCREMENT,
                parent_id   INTEGER NULL REFERENCES comments(id) ON DELETE CASCADE,
                name        TEXT NOT NULL,
                message     TEXT NOT NULL,
                context     TEXT NOT NULL,
                created_at  TEXT NOT NULL,
                ip_hash     TEXT NULL
            )
            """
        )
        c.execute("CREATE INDEX IF NOT EXISTS idx_comments_context ON comments(context)")
        c.execute("CREATE INDEX IF NOT EXISTS idx_comments_parent ON comments(parent_id)")
    log.info(f"Comments DB initialised at {DB_PATH}")


_PROFANITY = {
    "amk", "amq", "aq", "orospu", "oç", "piç", "sik", "yarrak", "göt",
    "amcık", "amına", "ananı", "sikerim", "sikeyim", "siktir", "pezevenk",
    "kahpe", "sürtük", "fahişe", "ibne", "puşt", "götveren", "amcuk",
}


def _has_profanity(text: str) -> bool:
    norm = re.sub(r"[^a-zçğıöşü0-9\s]", "", text.lower())
    return any(re.search(rf"\b{re.escape(w)}\b", norm) for w in _PROFANITY)


class CommentCreate(BaseModel):
    name: str = Field(min_length=1, max_length=80)
    message: str = Field(min_length=2, max_length=2000)
    context: str = Field(min_length=1, max_length=400)
    parent_id: int | None = None
    turnstile_token: str | None = None  # currently informational only

    @field_validator("name", "message")
    @classmethod
    def _no_profanity(cls, v: str) -> str:
        if _has_profanity(v):
            raise ValueError("Lütfen uygun bir dil kullanın.")
        return v.strip()


def _row_to_comment(r: sqlite3.Row) -> dict[str, Any]:
    return {
        "id": r["id"],
        "parent_id": r["parent_id"],
        "name": r["name"],
        "message": r["message"],
        "context": r["context"],
        "created_at": r["created_at"],
    }


@asynccontextmanager
async def lifespan(_app: FastAPI):
    _init_db()
    task = asyncio.create_task(_refresh_loop())
    log.info("Background refresh task started")
    try:
        yield
    finally:
        task.cancel()


app = FastAPI(
    title="ResmiGunler.com Public Holiday API",
    description="Free public holiday data for Turkey, refreshed from upstream sources every 6 hours.",
    version="1.0.0",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://resmigunler.com", "https://www.resmigunler.com", "http://localhost:5173"],
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["*"],
)


@app.get("/health")
async def health():
    return {
        "status": "ok",
        "cached_years": sorted(CACHE.keys()),
        "supported_years": SUPPORTED_YEARS,
        "cache_age_seconds": {y: int(time.time() - ts) for y, (ts, _) in CACHE.items()},
    }


@app.get("/v1/years")
async def years():
    return {"supported": SUPPORTED_YEARS}


@app.get("/v1/holidays")
async def holidays(year: int = Query(..., ge=2020, le=2035)):
    return {"year": year, "count": len(await get_holidays(year)), "data": await get_holidays(year)}


@app.get("/v1/comments")
async def list_comments(context: str | None = Query(None, max_length=400)):
    with _db() as c:
        if context:
            parents = c.execute(
                "SELECT * FROM comments WHERE parent_id IS NULL AND context = ? ORDER BY created_at DESC",
                (context,),
            ).fetchall()
        else:
            parents = c.execute(
                "SELECT * FROM comments WHERE parent_id IS NULL ORDER BY created_at DESC LIMIT 200"
            ).fetchall()
        replies_by_parent: dict[int, list[dict[str, Any]]] = {}
        if parents:
            ids = [p["id"] for p in parents]
            placeholders = ",".join("?" * len(ids))
            replies = c.execute(
                f"SELECT * FROM comments WHERE parent_id IN ({placeholders}) ORDER BY created_at ASC",
                ids,
            ).fetchall()
            for r in replies:
                replies_by_parent.setdefault(r["parent_id"], []).append(_row_to_comment(r))
    out = []
    for p in parents:
        out.append({**_row_to_comment(p), "replies": replies_by_parent.get(p["id"], [])})
    return {"count": len(out), "data": out}


@app.post("/v1/comments", status_code=201)
async def create_comment(payload: CommentCreate):
    if payload.parent_id is not None:
        with _db() as c:
            row = c.execute("SELECT id FROM comments WHERE id = ?", (payload.parent_id,)).fetchone()
            if not row:
                raise HTTPException(404, "parent comment not found")
    now = datetime.now(timezone.utc).isoformat()
    with _db() as c:
        cur = c.execute(
            "INSERT INTO comments (parent_id, name, message, context, created_at) VALUES (?,?,?,?,?)",
            (payload.parent_id, payload.name, payload.message, payload.context, now),
        )
        new_id = cur.lastrowid
        row = c.execute("SELECT * FROM comments WHERE id = ?", (new_id,)).fetchone()
    return _row_to_comment(row)


@app.get("/v1/holidays/upcoming")
async def upcoming(days: int = Query(90, ge=1, le=365)):
    today = date.today()
    horizon = today + timedelta(days=days)
    out: list[dict[str, Any]] = []
    for y in (today.year, today.year + 1):
        if y not in SUPPORTED_YEARS:
            continue
        for h in await get_holidays(y):
            d = datetime.strptime(h["date"], "%Y-%m-%d").date()
            if today <= d <= horizon:
                days_until = (d - today).days
                out.append({**h, "daysUntil": days_until})
    return {"from": today.isoformat(), "to": horizon.isoformat(), "count": len(out), "data": sorted(out, key=lambda x: x["date"])}

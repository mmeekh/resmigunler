# resmigunler-api

Public Holiday API for Turkey — the backend powering [resmigunler.com](https://resmigunler.com).

Lives at **[api.resmigunler.com](https://api.resmigunler.com)**.

## What it does

Merges two sources of truth into one clean JSON API:

1. **Fixed-date national holidays** (Yılbaşı, Ulusal Egemenlik, İşçi, Atatürk'ü Anma, Demokrasi, Zafer, Cumhuriyet) are pulled from [date.nager.at](https://date.nager.at) — an open public-holiday dataset.
2. **Lunar / religious holidays** (Ramazan Bayramı, Kurban Bayramı) are curated against the official Diyanet İşleri Başkanlığı calendar, since the upstream provider doesn't ship them for Turkey.

Holidays are cached for 6 hours and refreshed in the background. If the upstream source is unavailable, stale cache is served — the API is never down because of someone else's outage.

## Endpoints

| Method | Path                                  | Purpose                                          |
|--------|---------------------------------------|--------------------------------------------------|
| GET    | `/v1/holidays?year=YYYY`              | List all holidays for one year                   |
| GET    | `/v1/holidays/upcoming?days=N`        | Holidays in the next N days, with `daysUntil`    |
| GET    | `/v1/years`                           | Supported year range                             |
| GET    | `/v1/comments?context=PATH`           | List user comments for a page                    |
| POST   | `/v1/comments`                        | Create a comment or reply (replaces Supabase)    |
| GET    | `/health`                             | Liveness + cache status                          |

### Example

```bash
curl https://api.resmigunler.com/v1/holidays?year=2027
```

```json
{
  "year": 2027,
  "count": 9,
  "data": [
    { "id": "yilbasi-2027", "name": "Yılbaşı", "date": "2027-01-01",
      "type": "resmi_tatil", "imageUrl": "/images/yilbasi.webp",
      "source": "date.nager.at" },
    { "id": "ramazan-bayrami-2027", "name": "Ramazan Bayramı",
      "date": "2027-03-09", "endDate": "2027-03-11",
      "type": "dini_tatil", "source": "diyanet" },
    ...
  ]
}
```

## Tech stack

| Layer        | Tool                                |
|--------------|-------------------------------------|
| Framework    | FastAPI 0.115 (Python 3.12)         |
| Server       | Uvicorn (ASGI)                      |
| HTTP client  | httpx (async)                       |
| Validation   | Pydantic 2                          |
| Storage      | SQLite (comments)                   |
| Cache        | In-memory, 6h TTL                   |
| Container    | Docker (multi-arch ready)           |

## Running locally

```bash
docker build -t resmigunler-api .
docker run -p 8000:8000 -v "$(pwd)/data:/data" resmigunler-api
```

Or via Compose, alongside the rest of the stack — see the parent project's `docker-compose.yml`.

## Architecture

```
                 ┌─────────────────────────┐
                 │  Background refresh     │
                 │  task (6h interval)     │
                 └────────────┬────────────┘
                              │
                              ▼
   date.nager.at  ─────────►  In-memory cache
   (fixed dates)              + SQLite (comments)
                              │
   Diyanet curated  ──────────┤
   (lunar dates)              ▼
                       FastAPI HTTP server
                              │
                              ▼
                       Caddy (TLS, CORS,
                       reverse proxy)
                              │
                              ▼
                 https://api.resmigunler.com
```

## Why this exists

The frontend used to depend on a hardcoded `constants.ts` table that had to be manually edited every year. That breaks the moment Diyanet shifts a lunar date by a day. This API decouples the data from the deploy cycle:

- New year's worth of holidays land automatically (fixed dates from upstream).
- Lunar date corrections are a one-line PR + container restart.
- The frontend never has to ship a new build to reflect a calendar update.

---

Built by [Muhammet Emin Kilic](https://linkedin.com/in/emin-kilic-250b14210) — Finance-Tech Hybrid, Istanbul.

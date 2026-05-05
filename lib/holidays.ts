/**
 * Dynamic holiday data layer.
 *
 * Strategy: stale-while-revalidate.
 *  1. Read fresh data from /v1/holidays?year=YYYY (api.resmigunler.com).
 *  2. Cache the response in localStorage for 6h.
 *  3. If the network is unreachable, fall back to localStorage; if that's
 *     empty too, fall back to the bundled HOLIDAYS constant (last-resort).
 *
 * The API provides the dates and authoritative names; we enrich them by
 * merging with the rich content (history, tips, activities, keywords)
 * that lives in constants.ts.
 */
import { useEffect, useState } from 'react';
import type { Holiday } from '../types';
import { HOLIDAYS as STATIC_HOLIDAYS } from '../constants';

const API_BASE = 'https://api.resmigunler.com';
const CACHE_TTL_MS = 6 * 60 * 60 * 1000; // 6 hours
const CACHE_KEY = (year: number) => `rg:holidays:${year}`;

interface ApiHoliday {
  id: string;
  name: string;
  date: string;
  endDate: string | null;
  type: 'resmi_tatil' | 'dini_tatil';
  imageUrl: string;
  year: number;
  source: string;
}

interface CacheEntry {
  ts: number;
  data: ApiHoliday[];
}

function readCache(year: number): ApiHoliday[] | null {
  try {
    const raw = localStorage.getItem(CACHE_KEY(year));
    if (!raw) return null;
    const parsed: CacheEntry = JSON.parse(raw);
    if (Date.now() - parsed.ts > CACHE_TTL_MS) return parsed.data; // stale but usable
    return parsed.data;
  } catch {
    return null;
  }
}

function writeCache(year: number, data: ApiHoliday[]) {
  try {
    const entry: CacheEntry = { ts: Date.now(), data };
    localStorage.setItem(CACHE_KEY(year), JSON.stringify(entry));
  } catch {
    /* quota or private mode — ignore */
  }
}

async function fetchFresh(year: number, signal?: AbortSignal): Promise<ApiHoliday[]> {
  const r = await fetch(`${API_BASE}/v1/holidays?year=${year}`, { signal, mode: 'cors' });
  if (!r.ok) throw new Error(`API ${r.status}`);
  const json = await r.json();
  return json.data as ApiHoliday[];
}

/**
 * Merge an API holiday with whatever rich content the bundled constants
 * have for the same holiday (matched by name). Falls back to safe defaults
 * when the constants don't include this year.
 */
function enrich(api: ApiHoliday): Holiday {
  const local = STATIC_HOLIDAYS.find(
    (h) => h.name.trim().toLowerCase() === api.name.trim().toLowerCase()
  );
  return {
    id: api.id,
    name: api.name,
    date: api.date,
    endDate: api.endDate ?? undefined,
    type: api.type,
    imageUrl: api.imageUrl || local?.imageUrl,
    description: local?.description ?? `${api.name} - resmi tatil günü.`,
    history: local?.history ?? '',
    keywords: local?.keywords ?? [],
    vacationTips: local?.vacationTips ?? '',
    activitySuggestions: local?.activitySuggestions ?? [],
    bookingLinks: local?.bookingLinks ?? [],
  };
}

function staticForYear(year: number): Holiday[] {
  return STATIC_HOLIDAYS.filter((h) => h.date.startsWith(String(year)));
}

export interface UseHolidaysResult {
  data: Holiday[];
  loading: boolean;
  error: Error | null;
  source: 'api' | 'cache' | 'static';
  refetch: () => void;
}

export function useHolidays(year: number): UseHolidaysResult {
  const [data, setData] = useState<Holiday[]>(() => {
    const cached = readCache(year);
    if (cached) return cached.map(enrich);
    return staticForYear(year);
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [source, setSource] = useState<'api' | 'cache' | 'static'>(
    readCache(year) ? 'cache' : 'static'
  );
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const ctrl = new AbortController();
    setLoading(true);
    fetchFresh(year, ctrl.signal)
      .then((fresh) => {
        writeCache(year, fresh);
        setData(fresh.map(enrich));
        setSource('api');
        setError(null);
      })
      .catch((e) => {
        if (e.name === 'AbortError') return;
        setError(e);
        // Keep whatever we already showed (cache or static).
      })
      .finally(() => setLoading(false));
    return () => ctrl.abort();
  }, [year, tick]);

  return { data, loading, error, source, refetch: () => setTick((t) => t + 1) };
}

/**
 * One-shot fetch for upcoming holidays in the next N days.
 * Used by the home-page hero / countdown widget.
 */
export async function fetchUpcoming(days: number = 90): Promise<Array<Holiday & { daysUntil: number }>> {
  try {
    const r = await fetch(`${API_BASE}/v1/holidays/upcoming?days=${days}`, { mode: 'cors' });
    if (!r.ok) throw new Error(`API ${r.status}`);
    const json = await r.json();
    return (json.data as Array<ApiHoliday & { daysUntil: number }>).map((h) => ({
      ...enrich(h),
      daysUntil: h.daysUntil,
    }));
  } catch {
    // Fallback: compute from static
    const today = new Date();
    const horizon = new Date(today);
    horizon.setDate(horizon.getDate() + days);
    return STATIC_HOLIDAYS
      .filter((h) => {
        const d = new Date(h.date);
        return d >= today && d <= horizon;
      })
      .map((h) => ({
        ...h,
        daysUntil: Math.ceil((new Date(h.date).getTime() - today.getTime()) / 86_400_000),
      }))
      .sort((a, b) => a.daysUntil - b.daysUntil);
  }
}

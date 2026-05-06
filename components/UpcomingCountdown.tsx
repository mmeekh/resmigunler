/**
 * UpcomingCountdown
 * =================
 * Live ticker that pulls the next 90 days of holidays from the API and
 * counts down to the closest one. Re-renders every minute, refetches the
 * underlying data every 5 minutes — so as soon as the upstream Diyanet
 * dataset updates, the page reflects it without a redeploy.
 */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchUpcoming } from '../lib/holidays';
import type { Holiday } from '../types';

interface UpcomingHoliday extends Holiday {
  daysUntil: number;
}

const REFRESH_MS = 5 * 60 * 1000;
const TICK_MS = 60 * 1000;

function timeUntil(target: string): { days: number; hours: number; minutes: number } {
  const now = new Date();
  const t = new Date(target);
  t.setHours(0, 0, 0, 0);
  const diff = t.getTime() - now.getTime();
  const days = Math.floor(diff / 86_400_000);
  const hours = Math.floor((diff % 86_400_000) / 3_600_000);
  const minutes = Math.floor((diff % 3_600_000) / 60_000);
  return { days: Math.max(0, days), hours: Math.max(0, hours), minutes: Math.max(0, minutes) };
}

const UpcomingCountdown: React.FC = () => {
  const [upcoming, setUpcoming] = useState<UpcomingHoliday[]>([]);
  const [, setTick] = useState(0);

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      try {
        const data = await fetchUpcoming(120);
        if (mounted) setUpcoming(data);
      } catch (e) {
        console.warn('Upcoming fetch failed:', e);
      }
    };
    load();
    const refresh = setInterval(load, REFRESH_MS);
    const tick = setInterval(() => setTick((t) => t + 1), TICK_MS);
    return () => {
      mounted = false;
      clearInterval(refresh);
      clearInterval(tick);
    };
  }, []);

  if (upcoming.length === 0) return null;

  const next = upcoming[0];
  const others = upcoming.slice(1, 4);
  const t = timeUntil(next.date);

  return (
    <section className="bg-gradient-to-br from-red-50 via-white to-amber-50 border-y border-red-100 py-8" aria-label="Yaklaşan tatil">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6 justify-between">
          <div className="flex-1 min-w-0">
            <p className="text-xs uppercase tracking-wider font-bold text-red-600 mb-1">Yaklaşan Tatil • Canlı</p>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
              {next.name}
              <span className="ml-2 text-sm font-medium text-slate-500">
                · {new Date(next.date).toLocaleDateString('tr-TR', {
                  day: 'numeric', month: 'long', year: 'numeric', weekday: 'long',
                })}
              </span>
            </h2>
            {next.description && (
              <p className="text-sm text-slate-600 mt-2 max-w-2xl line-clamp-2">{next.description}</p>
            )}
          </div>

          <div className="grid grid-cols-3 gap-2 md:gap-3 flex-shrink-0">
            {[
              { label: 'gün', value: t.days },
              { label: 'saat', value: t.hours },
              { label: 'dakika', value: t.minutes },
            ].map((c) => (
              <div key={c.label} className="bg-white border border-red-200 rounded-xl px-4 py-3 min-w-[70px] text-center shadow-sm">
                <div className="text-2xl md:text-3xl font-bold text-red-600 tabular-nums">{c.value}</div>
                <div className="text-[10px] uppercase font-semibold text-slate-500 tracking-wider">{c.label}</div>
              </div>
            ))}
          </div>

          <Link
            to={`/holiday/${next.id}`}
            className="bg-red-600 hover:bg-red-700 text-white text-sm font-semibold px-5 py-3 rounded-xl shadow-sm transition-colors whitespace-nowrap"
          >
            Detay & Plan →
          </Link>
        </div>

        {others.length > 0 && (
          <div className="mt-6 flex flex-wrap items-center gap-2 text-xs text-slate-500">
            <span className="font-semibold uppercase tracking-wider mr-1">Sonra:</span>
            {others.map((o) => (
              <Link
                key={o.id}
                to={`/holiday/${o.id}`}
                className="bg-white border border-slate-200 rounded-full px-3 py-1 hover:border-red-300 hover:text-red-600 transition-colors"
              >
                +{o.daysUntil}g · {o.name}
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default UpcomingCountdown;

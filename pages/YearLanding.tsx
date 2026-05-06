import React, { useEffect, useMemo } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useHolidays } from '../lib/holidays';
import { computeLeaveSuggestions } from '../lib/optimizer';
import { formatDateTR } from '../utils';

const YEAR_MIN = 2024;
const YEAR_MAX = 2030;

/**
 * Per-year landing page that targets long-tail searches like
 * "2027 resmi tatiller listesi" or "2027 yılında kaç gün tatil var".
 */
const YearLanding: React.FC = () => {
  const { year: yearParam } = useParams<{ year: string }>();
  const navigate = useNavigate();
  const year = Number(yearParam);

  useEffect(() => {
    if (!yearParam || isNaN(year) || year < YEAR_MIN || year > YEAR_MAX) {
      navigate('/holidays', { replace: true });
    }
  }, [year, yearParam, navigate]);

  const { data: holidays, loading, source } = useHolidays(year);

  const stats = useMemo(() => {
    let totalDays = 0;
    let weekendDays = 0;
    for (const h of holidays) {
      const start = new Date(h.date);
      const end = h.endDate ? new Date(h.endDate) : start;
      const len = Math.round((end.getTime() - start.getTime()) / 86_400_000) + 1;
      totalDays += len;
      let cur = new Date(start);
      while (cur <= end) {
        if ([0, 6].includes(cur.getDay())) weekendDays++;
        cur = new Date(cur.getTime() + 86_400_000);
      }
    }
    return { totalDays, effectiveDays: totalDays - weekendDays };
  }, [holidays]);

  const topSuggestions = useMemo(() => computeLeaveSuggestions(holidays, { topN: 3 }), [holidays]);

  // Set page-specific title + meta description for SEO.
  useEffect(() => {
    document.title = `${year} Resmi Tatiller Listesi - Türkiye | ResmiGünler.com`;
    const desc = `${year} yılında Türkiye'deki tüm resmi tatiller, dini bayramlar, izin uzatma fırsatları ve toplam tatil günü sayısı. ${holidays.length} resmi tatil, ${stats.totalDays} gün toplam.`;
    let metaDesc = document.querySelector("meta[name='description']");
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', desc);

    // Schema.org ItemList for SEO + AI Overviews
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: `${year} Türkiye Resmi Tatilleri`,
      numberOfItems: holidays.length,
      itemListElement: holidays.map((h, idx) => ({
        '@type': 'ListItem',
        position: idx + 1,
        item: {
          '@type': 'Event',
          name: h.name,
          startDate: h.date,
          endDate: h.endDate || h.date,
          location: { '@type': 'Country', name: 'Türkiye' },
        },
      })),
    });
    document.head.appendChild(script);
    return () => {
      document.head.removeChild(script);
    };
  }, [year, holidays, stats.totalDays]);

  if (loading && holidays.length === 0) {
    return <div className="text-center py-20 text-slate-500">Yükleniyor...</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
    >
      <header className="mb-10">
        <p className="text-xs uppercase text-red-600 font-semibold tracking-wider">Yıllık Rehber</p>
        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mt-2">
          {year} Türkiye Resmi Tatilleri
        </h1>
        <p className="text-lg text-slate-600 mt-4 max-w-3xl">
          {year} yılında Türkiye'deki tüm resmi tatiller, dini bayramlar ve izin
          uzatma fırsatları. {holidays.length} tatil, toplam {stats.totalDays} gün.
          Akıllı planlayıcı ile az izinle uzun tatil yapın.
        </p>
      </header>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        <div className="bg-white border border-slate-200 rounded-xl p-5">
          <div className="text-xs uppercase text-slate-500 font-semibold">Tatil sayısı</div>
          <div className="text-3xl font-bold text-slate-900 mt-1">{holidays.length}</div>
        </div>
        <div className="bg-white border border-slate-200 rounded-xl p-5">
          <div className="text-xs uppercase text-slate-500 font-semibold">Toplam gün</div>
          <div className="text-3xl font-bold text-slate-900 mt-1">{stats.totalDays}</div>
        </div>
        <div className="bg-white border border-slate-200 rounded-xl p-5">
          <div className="text-xs uppercase text-slate-500 font-semibold">Hafta içi</div>
          <div className="text-3xl font-bold text-slate-900 mt-1">{stats.effectiveDays}</div>
        </div>
        <div className="bg-white border border-slate-200 rounded-xl p-5">
          <div className="text-xs uppercase text-slate-500 font-semibold">Veri kaynağı</div>
          <div className="text-base font-semibold text-slate-900 mt-1 capitalize">
            {source === 'api' ? '🟢 canlı' : source === 'cache' ? '📦 önbellek' : '📄 yedek'}
          </div>
        </div>
      </div>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-slate-900 mb-6">Tüm tatiller</h2>
        <div className="space-y-3">
          {holidays.map((h) => {
            const start = new Date(h.date);
            const dayName = start.toLocaleDateString('tr-TR', { weekday: 'long' });
            return (
              <Link
                key={h.id}
                to={`/holiday/${h.id}`}
                className="flex items-center gap-4 bg-white border border-slate-200 rounded-xl p-4 hover:border-red-300 hover:shadow-md transition-all"
              >
                <div className="w-16 text-center flex-shrink-0">
                  <div className="text-xs uppercase text-slate-500">{start.toLocaleString('tr-TR', { month: 'short' })}</div>
                  <div className="text-2xl font-bold text-slate-900">{start.getDate()}</div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-slate-900 truncate">{h.name}</div>
                  <div className="text-sm text-slate-500">
                    {dayName} • {formatDateTR(h.date)}
                    {h.endDate && h.endDate !== h.date && <> – {formatDateTR(h.endDate)}</>}
                  </div>
                </div>
                <span
                  className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                    h.type === 'dini_tatil' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'
                  }`}
                >
                  {h.type === 'dini_tatil' ? 'Dini' : 'Resmi'}
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      {topSuggestions.length > 0 && (
        <section className="mb-12 bg-purple-50 border border-purple-100 rounded-2xl p-6 md:p-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">{year} İzin Uzatma Fırsatları</h2>
          <p className="text-sm text-slate-600 mb-6">
            Akıllı planlayıcı, hangi günlere izin alarak {year}'de en uzun aralıksız tatili yapacağını otomatik hesapladı.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {topSuggestions.map((s) => (
              <div key={s.holidayId + s.leaveDates.join(',')} className="bg-white rounded-xl p-5 border border-purple-100">
                <div className="text-sm font-semibold text-purple-700">{s.holidayName}</div>
                <div className="text-xs text-slate-500 mb-3">{formatDateTR(s.holidayDate)}</div>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-bold text-slate-900">{s.totalConsecutiveDays}</span>
                  <span className="text-sm text-slate-500">gün tatil</span>
                </div>
                <div className="text-xs text-slate-600 mt-2">
                  {s.leaveDates.length} gün izin → {s.roi.toFixed(1)}× kazanç
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">Diğer yıllar</h2>
        <div className="flex flex-wrap gap-2">
          {Array.from({ length: YEAR_MAX - YEAR_MIN + 1 }, (_, i) => YEAR_MIN + i).map((y) => (
            <Link
              key={y}
              to={`/tatiller/${y}`}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
                y === year
                  ? 'bg-slate-900 text-white'
                  : 'bg-white border border-slate-200 text-slate-700 hover:border-red-400 hover:text-red-600'
              }`}
            >
              {y}
            </Link>
          ))}
        </div>
      </section>
    </motion.div>
  );
};

export default YearLanding;

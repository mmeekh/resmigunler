import React, { useMemo } from 'react';
import { useHolidays } from '../lib/holidays';
import { computeLeaveSuggestions } from '../lib/optimizer';
import { formatDateTR } from '../utils';

const SmartSuggestions: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const { data: thisYear } = useHolidays(currentYear);
  const { data: nextYear } = useHolidays(currentYear + 1);

  // Pool both years' holidays so suggestions don't dry up at year-end.
  const suggestions = useMemo(() => {
    return computeLeaveSuggestions([...thisYear, ...nextYear], { topN: 4 });
  }, [thisYear, nextYear]);

  if (suggestions.length === 0) return null;

  return (
    <div className="mt-12 animate-fade-in-up">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-purple-100 p-3 rounded-lg text-purple-600">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Tatil Uzatma Fırsatları</h2>
          <p className="text-slate-500 text-sm">
            Akıllı planlayıcı, hangi günlere izin alarak ne kadar tatil yapacağını otomatik hesaplar.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {suggestions.map((s) => {
          const leaveCount = s.leaveDates.length;
          const total = s.totalConsecutiveDays;
          return (
            <div
              key={`${s.holidayId}-${s.leaveDates.join(',')}`}
              className="bg-white rounded-xl shadow-md border border-purple-100 overflow-hidden hover:shadow-lg transition-all relative group"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-purple-50 rounded-bl-full -mr-10 -mt-10 transition-transform group-hover:scale-110"></div>

              <div className="p-6 relative z-10">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <span className="text-xs font-bold text-purple-600 bg-purple-50 px-2 py-1 rounded uppercase tracking-wide">
                      {new Date(s.holidayDate).getFullYear()} Fırsatı
                    </span>
                    <h3 className="text-lg font-bold text-slate-800 mt-2">{s.holidayName}</h3>
                    <p className="text-sm text-slate-500">{formatDateTR(s.holidayDate)}</p>
                  </div>
                  <div className="text-center bg-green-50 p-2 rounded-lg border border-green-100 min-w-[80px]">
                    <span className="block text-2xl font-bold text-green-600">{total}</span>
                    <span className="text-[10px] uppercase font-bold text-green-700">Gün Tatil</span>
                  </div>
                </div>

                <div className="flex items-center gap-4 mb-4">
                  <div className="flex-1 bg-slate-50 rounded p-2 text-center border border-slate-100">
                    <span className="block text-xl font-bold text-red-500">{leaveCount}</span>
                    <span className="text-xs text-slate-500">Gün İzin</span>
                  </div>
                  <div className="text-slate-300">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                  <div className="flex-1 bg-purple-50 rounded p-2 text-center border border-purple-100">
                    <span className="block text-xl font-bold text-purple-600">{total}</span>
                    <span className="text-xs text-purple-600">Gün Keyif</span>
                  </div>
                </div>

                <p className="text-sm text-slate-600 italic border-l-2 border-purple-300 pl-3">
                  "{s.description}"
                </p>
                <div className="mt-3 flex items-center gap-2 text-xs text-slate-400">
                  <span className="bg-amber-50 text-amber-700 px-2 py-0.5 rounded">
                    ROI: {s.roi.toFixed(1)}× ({total} gün / {leaveCount} izin)
                  </span>
                  <span>{s.blockStart} → {s.blockEnd}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SmartSuggestions;

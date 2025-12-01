import React from 'react';
import { HolidayType } from '../types';

export interface FilterState {
  query: string;
  type: HolidayType | 'all';
  month: string;
  tag: string;
  year: number;
  onlyLong: boolean;
}

interface HolidayFiltersProps {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
  keywordOptions: string[];
}

const HolidayFilters: React.FC<HolidayFiltersProps> = ({ filters, onChange, keywordOptions }) => {
  const setFilter = (key: keyof FilterState, value: string | boolean | number) => {
    onChange({ ...filters, [key]: value });
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-4 md:p-6 mb-6" aria-label="Tatiller için arama ve filtreleme paneli">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6">
        <label className="flex flex-col gap-2">
          <span className="text-xs font-semibold text-slate-500 uppercase">Arama</span>
          <input
            type="search"
            value={filters.query}
            onChange={(e) => setFilter('query', e.target.value)}
            placeholder="İsim, açıklama veya etiket ara"
            className="border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-red-500 focus:border-red-500"
          />
        </label>

        <label className="flex flex-col gap-2">
          <span className="text-xs font-semibold text-slate-500 uppercase">Yıl</span>
          <select
            value={filters.year}
            onChange={(e) => setFilter('year', Number(e.target.value))}
            className="border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-red-500 focus:border-red-500"
          >
            {[2023, 2024, 2025, 2026].map((y) => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-2">
          <span className="text-xs font-semibold text-slate-500 uppercase">Tür</span>
          <select
            value={filters.type}
            onChange={(e) => setFilter('type', e.target.value as HolidayType | 'all')}
            className="border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-red-500 focus:border-red-500"
          >
            <option value="all">Tümü</option>
            <option value="resmi_tatil">Resmi Tatil</option>
            <option value="dini_tatil">Dini Tatil</option>
            <option value="ozel_gun">Özel Gün</option>
          </select>
        </label>

        <label className="flex flex-col gap-2">
          <span className="text-xs font-semibold text-slate-500 uppercase">Ay</span>
          <select
            value={filters.month}
            onChange={(e) => setFilter('month', e.target.value)}
            className="border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-red-500 focus:border-red-500"
          >
            <option value="all">Tümü</option>
            {[...Array(12)].map((_, idx) => (
              <option key={idx} value={String(idx + 1).padStart(2, '0')}>{idx + 1}. Ay</option>
            ))}
          </select>
        </label>
      </div>

      <div className="mt-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center gap-2">
          <input
            id="long-weekend"
            type="checkbox"
            checked={filters.onlyLong}
            onChange={(e) => setFilter('onlyLong', e.target.checked)}
            className="h-4 w-4 text-red-600 focus:ring-red-500 border-slate-300 rounded"
          />
          <label htmlFor="long-weekend" className="text-sm text-slate-700">Hafta sonu ile birleşen tatilleri öne çıkar</label>
        </div>

        <div className="flex flex-wrap gap-2" aria-label="Etiketler">
          <span className="text-xs font-semibold text-slate-500 uppercase">Etiket:</span>
          <button
            type="button"
            onClick={() => setFilter('tag', '')}
            className={`px-3 py-1 rounded-full text-xs border ${filters.tag === '' ? 'bg-red-100 text-red-700 border-red-200' : 'border-slate-200 hover:border-red-200 hover:text-red-600'}`}
          >
            Hepsi
          </button>
          {keywordOptions.slice(0, 12).map((keyword) => (
            <button
              key={keyword}
              type="button"
              onClick={() => setFilter('tag', keyword)}
              className={`px-3 py-1 rounded-full text-xs border transition-colors ${filters.tag === keyword ? 'bg-red-100 text-red-700 border-red-200' : 'border-slate-200 hover:border-red-200 hover:text-red-600'}`}
            >
              #{keyword}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HolidayFilters;

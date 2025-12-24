
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import HolidayFilters, { FilterState } from '../components/HolidayFilters';
import { HOLIDAYS } from '../constants';
import { formatDateTR } from '../utils';

const HolidaysList = ({ liteMode }: { liteMode: boolean }) => {
    const navigate = useNavigate();
    const [filters, setFilters] = useState<FilterState>({
        query: '',
        type: 'all',
        month: 'all',
        tag: '',
        year: new Date().getFullYear(),
        onlyLong: false,
    });

    const keywordOptions = Array.from(new Set(HOLIDAYS.flatMap((h) => h.keywords)));

    const filteredHolidays = HOLIDAYS.filter((h) => {
        if (!h.date.startsWith(filters.year.toString())) return false;
        if (filters.type !== 'all' && h.type !== filters.type) return false;
        if (filters.month !== 'all' && !h.date.slice(5, 7).includes(filters.month)) return false;
        if (filters.tag && !h.keywords.includes(filters.tag)) return false;

        if (filters.onlyLong) {
            const day = new Date(h.date).getDay();
            const isNearWeekend = day === 1 || day === 5 || !!h.endDate;
            if (!isNearWeekend) return false;
        }

        if (filters.query.trim()) {
            const q = filters.query.toLowerCase();
            const matchText = `${h.name} ${h.description} ${h.keywords.join(' ')}`.toLowerCase();
            if (!matchText.includes(q)) return false;
        }
        return true;
    });

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
        >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                <div>
                    <p className="text-xs uppercase text-slate-500 font-semibold">Keşfet</p>
                    <h1 className="text-3xl font-bold text-slate-800">Tüm Tatiller</h1>
                    <p className="text-sm text-slate-500">Arama, filtreleme ve etiketlerle sonuçları daraltın.</p>
                </div>
                <div className="flex items-center gap-2 text-xs bg-blue-50 border border-blue-100 text-blue-700 px-3 py-2 rounded-full">
                    <span>🔍 Anında filtreleme</span>
                    <span>🧭 {filteredHolidays.length} sonuç</span>
                </div>
            </div>

            <HolidayFilters filters={filters} onChange={setFilters} keywordOptions={keywordOptions} />

            {filteredHolidays.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredHolidays.map((holiday, index) => (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            key={holiday.id}
                            className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-slate-100 flex flex-col h-full overflow-hidden group"
                        >
                            <div className="h-48 overflow-hidden relative bg-gradient-to-br from-red-50 via-white to-slate-50">
                                {holiday.imageUrl && !liteMode ? (
                                    <img
                                        src={holiday.imageUrl}
                                        alt={holiday.name}
                                        loading="lazy"
                                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                                    />
                                ) : (
                                    <div className="absolute inset-0 flex items-center justify-center text-slate-400 text-sm">Lite mod: görsel kapalı</div>
                                )}
                                <div className="absolute top-4 left-4">
                                    <div className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide shadow-sm
                      ${holiday.type === 'resmi_tatil' ? 'bg-red-600 text-white' : holiday.type === 'dini_tatil' ? 'bg-emerald-600 text-white' : 'bg-slate-600 text-white'}
                    `}>
                                        {holiday.type.replace('_', ' ')}
                                    </div>
                                </div>
                            </div>

                            <div className="p-6 flex flex-col flex-grow">
                                <span className="text-sm font-semibold text-red-600 mb-2 block">{formatDateTR(holiday.date)}</span>
                                <h3 className="text-xl font-bold text-slate-800 mb-2 leading-tight">{holiday.name}</h3>
                                <p className="text-slate-600 text-sm mb-4 flex-grow line-clamp-3">{holiday.description}</p>
                                <div className="flex flex-wrap gap-2 mb-4 text-xs text-slate-500">
                                    {holiday.keywords.slice(0, 3).map((k) => (
                                        <span key={k} className="px-2 py-1 bg-slate-100 rounded-full">#{k}</span>
                                    ))}
                                </div>
                                <button
                                    onClick={() => navigate(`/holiday/${holiday.id}`)}
                                    className="mt-auto w-full py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 hover:bg-red-50 hover:text-red-600 hover:border-red-200 font-medium transition-all"
                                >
                                    İncele & Fırsatları Gör
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-20 bg-slate-50 rounded-xl border border-dashed border-slate-300">
                    <p className="text-slate-500">Seçili filtrelere uygun tatil bulunamadı.</p>
                </div>
            )}
        </motion.div>
    );
};

export default HolidaysList;

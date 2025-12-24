
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion'; // Adding animation
import Calendar from '../components/Calendar';
import LeaveCalculator from '../components/LeaveCalculator';
import { HOLIDAYS } from '../constants';
import { formatDateTR, getHolidayForDate } from '../utils';
import { Holiday } from '../types';

const Home = ({ liteMode }: { liteMode: boolean }) => {
    const navigate = useNavigate();
    // Use today's date formatted as YYYY-MM-DD local time
    const today = new Date();
    const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

    const [selectedDate, setSelectedDate] = useState<string>(todayStr);
    const [activeHoliday, setActiveHoliday] = useState<Holiday | undefined>(undefined);
    const [nextHoliday, setNextHoliday] = useState<Holiday | undefined>(undefined);

    // Effect to update sidebar info when selectedDate changes
    useEffect(() => {
        const foundHoliday = getHolidayForDate(selectedDate);
        setActiveHoliday(foundHoliday);

        // Find the NEXT holiday after the selected date
        const sortedHolidays = [...HOLIDAYS].sort((a, b) => a.date.localeCompare(b.date));
        const next = sortedHolidays.find(h => {
            const hStart = h.date;
            return hStart > selectedDate;
        });
        setNextHoliday(next);
    }, [selectedDate]);

    // Helper to generate a "Smart Tip" for taking leave around a holiday
    const getSmartTip = (holiday: Holiday) => {
        const dayName = formatDateTR(holiday.date).split(' ').pop(); // e.g., Pazartesi
        if (dayName === 'Cuma') return "Bu tatil Cuma gününe denk geliyor. Hafta sonu ile birleşerek otomatik 3 gün tatil!";
        if (dayName === 'Pazartesi') return "Bu tatil Pazartesi gününe denk geliyor. Hafta sonu ile birleşerek 3 gün kesintisiz tatil!";
        if (dayName === 'Salı') return "Pazartesi günü için 1 gün izin alarak hafta sonuyla birleştirip 4 gün tatil yapabilirsiniz.";
        if (dayName === 'Perşembe') return "Cuma günü için 1 gün izin alarak hafta sonuyla birleştirip 4 gün tatil yapabilirsiniz.";
        if (dayName === 'Çarşamba') return "Öncesindeki veya sonrasındaki 2 günü bağlayarak 5 gün tatil yapabilirsiniz.";
        return "Bu tatili hafta sonu ile birleştirmek için İzin Hesaplayıcıyı kullanın.";
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
        >
            {/* Hero Section */}
            <section className="relative bg-slate-900 text-white py-20 lg:py-32 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    {!liteMode && (
                        <img
                            src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&q=80&w=2070"
                            alt="Tatil Planı"
                            className="w-full h-full object-cover opacity-30"
                            loading="lazy"
                        />
                    )}
                    <div className={`absolute inset-0 ${liteMode ? 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900' : 'bg-gradient-to-t from-slate-900 to-transparent'}`}></div>
                </div>
                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
                    <motion.h1
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6"
                    >
                        Tatilini <span className="text-red-500">Akıllı</span> Planla
                    </motion.h1>
                    <motion.p
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="text-lg md:text-xl text-slate-300 max-w-2xl mb-10"
                    >
                        Resmi tatiller, dini bayramları ve özel günleri takip edin. İzinlerinizi birleştirerek maksimum tatil süresine ulaşın.
                    </motion.p>
                    <motion.button
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        onClick={() => {
                            const el = document.getElementById('calculator-section');
                            el?.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-8 rounded-full shadow-lg transform transition hover:scale-105 flex items-center gap-2"
                    >
                        <span>Hemen Hesapla</span>
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                    </motion.button>
                </div>
            </section>

            {/* Calendar Section */}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col lg:flex-row gap-12">
                        {/* Left: Interactive Calendar */}
                        <div className="w-full lg:w-2/3">
                            <h2 className="text-3xl font-bold text-slate-800 mb-8 flex items-center gap-2">
                                <svg className="w-8 h-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                Etkileşimli Takvim
                            </h2>
                            <Calendar
                                selectedDate={selectedDate}
                                onDateClick={setSelectedDate}
                            />
                            <p className="mt-4 text-sm text-slate-500 flex items-center gap-3 flex-wrap">
                                <span className="flex items-center"><span className="w-4 h-4 bg-red-100 border border-red-200 rounded-sm block mr-1.5"></span> Resmi Tatil</span>
                                <span className="flex items-center"><span className="w-4 h-4 bg-emerald-100 border border-emerald-200 rounded-sm block mr-1.5"></span> Dini Tatil</span>
                                <span className="flex items-center"><span className="w-4 h-4 bg-orange-50 border border-orange-200 rounded-sm block mr-1.5"></span> Hafta Sonu</span>
                                <span className="flex items-center"><span className="w-4 h-4 bg-blue-50 border border-blue-300 ring-1 ring-blue-300 rounded-sm block mr-1.5"></span> Bugün / Seçili</span>
                            </p>
                        </div>

                        {/* Right: Dynamic Info Sidebar */}
                        <div className="w-full lg:w-1/3 flex flex-col justify-start pt-0 lg:pt-16">

                            {activeHoliday ? (
                                <motion.div
                                    initial={{ x: 50, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    key={activeHoliday.id}
                                    className="bg-white border border-red-200 shadow-xl rounded-2xl overflow-hidden mb-6"
                                >
                                    {activeHoliday.imageUrl && !liteMode && (
                                        <div className="h-32 w-full relative">
                                            <img
                                                src={activeHoliday.imageUrl}
                                                alt={activeHoliday.name}
                                                className="w-full h-full object-cover"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                            <span className="absolute bottom-2 left-4 text-white font-bold text-shadow">
                                                {formatDateTR(activeHoliday.date)}
                                            </span>
                                        </div>
                                    )}

                                    <div className="p-6 pt-4 relative">
                                        {!activeHoliday.imageUrl && (
                                            <p className="text-red-600 font-medium mb-2">{formatDateTR(activeHoliday.date)}</p>
                                        )}
                                        <h3 className="text-2xl font-bold text-slate-800 mb-2">{activeHoliday.name}</h3>
                                        <p className="text-slate-600 text-sm mb-4 line-clamp-3">{activeHoliday.description}</p>

                                        <div className="bg-blue-50 border-l-4 border-blue-500 p-3 mb-4 rounded-r-lg">
                                            <p className="text-xs text-blue-800 font-medium">
                                                💡 İpucu: {getSmartTip(activeHoliday)}
                                            </p>
                                        </div>

                                        <button
                                            onClick={() => navigate(`/holiday/${activeHoliday.id}`)}
                                            className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg text-sm font-medium transition-colors shadow-sm"
                                        >
                                            Detayları ve Fırsatları Gör &rarr;
                                        </button>
                                    </div>
                                </motion.div>
                            ) : (
                                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 mb-6">
                                    <p className="text-slate-500 text-sm mb-1">{formatDateTR(selectedDate)}</p>
                                    <p className="text-slate-800 font-medium">Bu tarihte herhangi bir resmi tatil bulunmuyor.</p>
                                </div>
                            )}

                            {nextHoliday && (
                                <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                                    <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">
                                        {activeHoliday ? 'Bir Sonraki Tatil' : 'Yaklaşan Tatil'}
                                    </h3>
                                    <div className="flex items-start gap-4">
                                        <div className={`rounded-lg p-3 text-center min-w-[60px] flex flex-col items-center justify-center ${nextHoliday.type === 'dini_tatil' ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'}`}>
                                            <span className="block text-xl font-bold leading-none">{nextHoliday.date.split('-')[2]}</span>
                                            <span className="block text-[10px] font-bold uppercase mt-1">
                                                {new Date(nextHoliday.date).toLocaleDateString('tr-TR', { month: 'short' })}
                                            </span>
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-slate-800 text-lg leading-tight mb-1">{nextHoliday.name}</h4>
                                            <div className="flex items-center gap-2 text-sm text-slate-500 mb-2">
                                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                </svg>
                                                <span>{formatDateTR(nextHoliday.date)}</span>
                                            </div>

                                            {(() => {
                                                const diff = Math.ceil((new Date(nextHoliday.date).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
                                                if (diff > 0) {
                                                    return <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">{diff} gün kaldı</span>
                                                }
                                                return null;
                                            })()}

                                        </div>
                                    </div>
                                    <button
                                        onClick={() => navigate(`/holiday/${nextHoliday.id}`)}
                                        className="mt-4 text-red-600 font-medium text-sm hover:underline flex items-center gap-1"
                                    >
                                        Takvimde git &rarr;
                                    </button>
                                </div>
                            )}

                        </div>
                    </div>
                </div>
            </section>

            {/* Calculator Section */}
            <section id="calculator-section" className="py-16 bg-slate-50 border-t border-slate-200">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <LeaveCalculator />
                </div>
            </section>
        </motion.div>
    );
}

export default Home;

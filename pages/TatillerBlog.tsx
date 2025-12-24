
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HOLIDAYS } from '../constants';
import { formatDateTR } from '../utils';
import { Holiday } from '../types';

const TatillerBlog = () => {
    const navigate = useNavigate();
    const todayStr = new Date().toISOString().split('T')[0];

    const blogEntries = [
        {
            slug: '23-nisan',
            question: '23 Nisan resmi tatil mi?',
            keyword: '23-nisan',
            verdict: 'Evet. 23 Nisan Ulusal Egemenlik ve Çocuk Bayramı her yıl resmi tatildir.',
            punchline: 'Net cevap: Resmi tatil, tek gün.',
        },
        {
            slug: '19-mayis',
            question: '19 Mayıs tatil mi?',
            keyword: '19-mayis',
            verdict: 'Evet. 19 Mayıs Atatürk’ü Anma, Gençlik ve Spor Bayramı resmî tatildir.',
            punchline: 'Net cevap: Resmi tatil, tek gün.',
        },
        {
            slug: '30-agustos',
            question: '30 Ağustos tatil mi?',
            keyword: '30-agustos',
            verdict: 'Evet. 30 Ağustos Zafer Bayramı resmî tatildir.',
            punchline: 'Net cevap: Resmi tatil, tek gün.',
        },
        {
            slug: '29-ekim',
            question: '29 Ekim kaç gün tatil?',
            keyword: '29-ekim',
            verdict: '29 Ekim Cumhuriyet Bayramı resmî tatildir. Tatil süresi 1 tam gündür.',
            punchline: 'Net cevap: Resmi tatil, 1 gün.',
        },
        {
            slug: '1-ocak',
            question: '1 Ocak (Yılbaşı) tatil mi?',
            keyword: 'yilbasi',
            verdict: 'Evet. 1 Ocak Yılbaşı Türkiye’de resmî tatildir.',
            punchline: 'Net cevap: Resmi tatil, 1 gün.',
        },
        {
            slug: '15-temmuz',
            question: '15 Temmuz resmi tatil mi?',
            keyword: '15-temmuz',
            verdict: 'Evet. 15 Temmuz Demokrasi ve Millî Birlik Günü resmî tatildir.',
            punchline: 'Net cevap: Resmi tatil, tek gün.',
        },
    ];

    const calcDuration = (holiday: Holiday) => {
        const start = new Date(holiday.date);
        const end = new Date(holiday.endDate || holiday.date);
        return Math.round((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="bg-slate-50"
        >
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
                <header className="text-center space-y-4">
                    <p className="text-xs uppercase tracking-[0.3em] text-red-600 font-semibold">Tatil FAQ</p>
                    <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900">TATİLLER — Dolandırmadan, Net Cevap</h1>
                    <p className="text-slate-600 max-w-3xl mx-auto text-lg">
                        Haber sitelerinde dolaştırmadan kısa ve net cevaplar: Tatil mi değil mi? Hangi güne denk geliyor? Kaç gün izin almanız gerekir?
                        Her başlıkta “Evet/Hayır” vurgusunu en başta veriyoruz.
                    </p>
                </header>

                <div className="grid gap-8 lg:grid-cols-2">
                    {blogEntries.map((entry, index) => {
                        const matchingHolidays = HOLIDAYS
                            .filter(h => h.id.includes(entry.keyword))
                            .sort((a, b) => a.date.localeCompare(b.date));

                        const upcoming = matchingHolidays.find(h => h.date >= todayStr) || matchingHolidays[matchingHolidays.length - 1];

                        return (
                            <motion.article
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                key={entry.slug}
                                className="bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-lg transition-shadow p-6 flex flex-col gap-4"
                            >
                                <div className="flex items-center justify-between gap-3">
                                    <span className="text-xs font-bold uppercase tracking-wide text-red-600">Net Bilgi</span>
                                    <span className="px-3 py-1 text-xs font-semibold bg-emerald-50 text-emerald-700 rounded-full border border-emerald-100">
                                        {entry.punchline}
                                    </span>
                                </div>
                                <h2 className="text-2xl font-bold text-slate-900 leading-tight">{entry.question}</h2>
                                <p className="text-slate-700 leading-relaxed">{entry.verdict}</p>

                                <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-3">
                                    <p className="text-sm font-semibold text-slate-700">Yıllara göre net tarih ve süre</p>
                                    <ul className="space-y-2">
                                        {matchingHolidays.map(h => (
                                            <li key={h.id} className="flex items-start gap-3">
                                                <div className="mt-0.5 h-2 w-2 rounded-full bg-red-500" aria-hidden></div>
                                                <div>
                                                    <p className="text-sm font-semibold text-slate-800">
                                                        {new Date(h.date).getFullYear()} · {formatDateTR(h.date)} · {calcDuration(h)} gün tatil
                                                        {h.endDate ? ` (${h.date} - ${h.endDate})` : ''}
                                                    </p>
                                                    <p className="text-xs text-slate-600">{h.description}</p>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="flex flex-wrap gap-2 text-xs text-slate-500">
                                    <span className="px-3 py-1 rounded-full bg-slate-100">Resmî tatil</span>
                                    <span className="px-3 py-1 rounded-full bg-slate-100">Doğrudan cevap</span>
                                    <span className="px-3 py-1 rounded-full bg-slate-100">Planlama ipuçları</span>
                                </div>

                                {upcoming && (
                                    <div className="flex items-center justify-between bg-red-50 border border-red-100 rounded-xl p-4">
                                        <div>
                                            <p className="text-xs font-semibold text-red-600 uppercase tracking-wide">Sıradaki tarih</p>
                                            <p className="text-sm font-bold text-slate-900">{formatDateTR(upcoming.date)}</p>
                                        </div>
                                        <button
                                            onClick={() => navigate(`/holiday/${upcoming.id}`)}
                                            className="text-sm font-semibold text-white bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg shadow"
                                        >
                                            Detayı Aç
                                        </button>
                                    </div>
                                )}
                            </motion.article>
                        );
                    })}
                </div>
            </div>
        </motion.div>
    );
};

export default TatillerBlog;


import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HOLIDAYS } from '../constants';
import { buildGoogleCalendarLink, buildIcsContent, buildOutlookCalendarLink, formatDateTR } from '../utils';

const HolidayDetail = ({ liteMode }: { liteMode: boolean }) => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const holiday = HOLIDAYS.find(h => h.id === id);

    if (!holiday) return <div className="text-center py-20">Tatil bulunamadı.</div>;

    const handleIcsDownload = () => {
        const content = buildIcsContent(holiday);
        const blob = new Blob([content], { type: 'text/calendar' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `${holiday.id}.ics`;
        link.click();
        URL.revokeObjectURL(url);
    };

    const handleShare = async () => {
        const shareText = `${holiday.name} - ${formatDateTR(holiday.date)}`;
        const shareUrl = window.location.href;
        try {
            if (navigator.share) {
                await navigator.share({ title: holiday.name, text: shareText, url: shareUrl });
            } else {
                window.open(`https://wa.me/?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`, '_blank');
            }
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="animate-fade-in"
        >
            {/* Detail Hero */}
            <div className="relative h-[400px] w-full">
                {!liteMode && (
                    <img
                        src={holiday.imageUrl || "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1"}
                        alt={holiday.name}
                        loading="lazy"
                        className="w-full h-full object-cover"
                    />
                )}
                <div className={`absolute inset-0 ${liteMode ? 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900' : 'bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent'}`}></div>
                <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
                    <div className="max-w-4xl mx-auto">
                        <button onClick={() => navigate('/holidays')} className="text-white/80 hover:text-white mb-4 flex items-center gap-2 transition-colors">
                            &larr; Tüm Tatillere Dön
                        </button>
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-2 text-shadow">{holiday.name}</h1>
                        <p className="text-xl text-red-400 font-medium">{formatDateTR(holiday.date)}</p>
                    </div>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 -mt-8 relative z-10">
                <motion.div
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden"
                >
                    <div className="p-8">

                        {/* Content Grid */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* Left Column: Main Info */}
                            <div className="lg:col-span-2 space-y-8">
                                <section>
                                    <h3 className="text-xl font-bold text-slate-800 mb-3 border-b border-slate-100 pb-2">Bu Günün Anlamı</h3>
                                    <p className="text-slate-600 leading-relaxed">
                                        {holiday.history || holiday.description}
                                    </p>
                                </section>

                                {holiday.vacationTips && (
                                    <section className="bg-blue-50 rounded-xl p-6 border border-blue-100">
                                        <h3 className="text-lg font-bold text-blue-900 mb-3 flex items-center gap-2">
                                            <span>✈️</span> Seyahat Önerisi
                                        </h3>
                                        <p className="text-blue-800 leading-relaxed">
                                            {holiday.vacationTips}
                                        </p>
                                    </section>
                                )}

                                {holiday.activitySuggestions && (
                                    <section>
                                        <h3 className="text-xl font-bold text-slate-800 mb-4 border-b border-slate-100 pb-2">Yapılabilecek Aktiviteler</h3>
                                        <ul className="space-y-3">
                                            {holiday.activitySuggestions.map((act, i) => (
                                                <li key={i} className="flex items-start gap-3 text-slate-700">
                                                    <span className="bg-green-100 text-green-600 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mt-0.5">{i + 1}</span>
                                                    <span>{act}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </section>
                                )}
                            </div>

                            {/* Right Column: Links & Tags */}
                            <div className="lg:col-span-1 space-y-6">
                                <div className="bg-red-50 border border-red-100 rounded-xl p-5">
                                    <h4 className="font-bold text-red-900 mb-3 flex items-center gap-2">
                                        <span aria-hidden>📅</span> Takvime ekle & paylaş
                                    </h4>
                                    <div className="flex flex-col gap-2">
                                        <button
                                            onClick={handleIcsDownload}
                                            className="w-full inline-flex items-center justify-center gap-2 bg-white border border-red-200 text-red-700 px-3 py-2 rounded-lg text-sm font-semibold hover:bg-red-100"
                                        >
                                            ICS indir (Apple/Outlook)
                                        </button>
                                        <a
                                            className="w-full inline-flex items-center justify-center gap-2 bg-white border border-red-200 text-red-700 px-3 py-2 rounded-lg text-sm font-semibold hover:bg-red-100"
                                            href={buildGoogleCalendarLink(holiday)}
                                            target="_blank"
                                            rel="noreferrer"
                                        >
                                            Google Calendar
                                        </a>
                                        <a
                                            className="w-full inline-flex items-center justify-center gap-2 bg-white border border-red-200 text-red-700 px-3 py-2 rounded-lg text-sm font-semibold hover:bg-red-100"
                                            href={buildOutlookCalendarLink(holiday)}
                                            target="_blank"
                                            rel="noreferrer"
                                        >
                                            Outlook / Office 365
                                        </a>
                                        <button
                                            onClick={handleShare}
                                            className="w-full inline-flex items-center justify-center gap-2 text-sm font-semibold text-red-800 border border-transparent hover:border-red-200 hover:bg-red-100 rounded-lg py-2"
                                        >
                                            Paylaş (Web Share / WhatsApp)
                                        </button>
                                    </div>
                                </div>

                                {/* Booking Links */}
                                {holiday.bookingLinks && (
                                    <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
                                        <h4 className="font-bold text-slate-800 mb-4">Fırsatları Değerlendir</h4>
                                        <div className="space-y-3">
                                            {holiday.bookingLinks.map((link, i) => (
                                                <a
                                                    key={i}
                                                    href={link.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex items-center gap-3 p-3 bg-white border border-slate-200 rounded-lg hover:border-red-300 hover:shadow-sm transition-all group"
                                                >
                                                    <div className="bg-red-50 text-red-500 p-2 rounded-md group-hover:bg-red-100 transition-colors">
                                                        {link.icon === 'plane' && <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>}
                                                        {link.icon === 'hotel' && <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>}
                                                        {link.icon === 'bus' && <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" /></svg>}
                                                    </div>
                                                    <span className="text-sm font-medium text-slate-700 group-hover:text-red-600">{link.title}</span>
                                                </a>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Tags */}
                                <div>
                                    <h4 className="font-bold text-slate-800 mb-3 text-sm uppercase tracking-wide">İlgili Etiketler</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {holiday.keywords.map(k => (
                                            <span key={k} className="text-xs text-slate-500 bg-slate-100 px-3 py-1.5 rounded-full hover:bg-slate-200 transition-colors cursor-default">
                                                #{k}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
};

export default HolidayDetail;

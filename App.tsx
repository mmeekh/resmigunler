
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Calendar from './components/Calendar';
import LeaveCalculator from './components/LeaveCalculator';
import { HOLIDAYS } from './constants';
import { formatDateTR, getHolidayForDate, isWeekend } from './utils';
import { Holiday } from './types';

// Page Components (Internal for simplicity)

// HOME PAGE
const Home = ({ navigate }: { navigate: (p: string) => void }) => {
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
    // Sort all holidays by date first
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
    <>
      {/* Hero Section */}
      <section className="relative bg-slate-900 text-white py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
             <img 
               src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&q=80&w=2070" 
               alt="Tatil Planı" 
               className="w-full h-full object-cover opacity-30" 
             />
             <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent"></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
            Tatilini <span className="text-red-500">Akıllı</span> Planla
          </h1>
          <p className="text-lg md:text-xl text-slate-300 max-w-2xl mb-10">
            Resmi tatiller, dini bayramları ve özel günleri takip edin. İzinlerinizi birleştirerek maksimum tatil süresine ulaşın.
          </p>
          <button 
            onClick={() => {
                const el = document.getElementById('calculator-section');
                el?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-8 rounded-full shadow-lg transform transition hover:scale-105 flex items-center gap-2"
          >
            <span>Hemen Hesapla</span>
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
          </button>
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
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
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
                
                {/* 1. Show info about the SELECTED day if it is a holiday */}
                {activeHoliday ? (
                   <div className="bg-white border border-red-200 shadow-xl rounded-2xl overflow-hidden mb-6 animate-fade-in-up">
                      {/* Image Cap for Sidebar */}
                      {activeHoliday.imageUrl && (
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
                        
                        {/* Smart Tip Box */}
                        <div className="bg-blue-50 border-l-4 border-blue-500 p-3 mb-4 rounded-r-lg">
                           <p className="text-xs text-blue-800 font-medium">
                             💡 İpucu: {getSmartTip(activeHoliday)}
                           </p>
                        </div>

                        <button 
                          onClick={() => navigate(`holiday-${activeHoliday.id}`)}
                          className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg text-sm font-medium transition-colors shadow-sm"
                        >
                          Detayları ve Fırsatları Gör &rarr;
                        </button>
                      </div>
                   </div>
                ) : (
                  <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 mb-6">
                     <p className="text-slate-500 text-sm mb-1">{formatDateTR(selectedDate)}</p>
                     <p className="text-slate-800 font-medium">Bu tarihte herhangi bir resmi tatil bulunmuyor.</p>
                  </div>
                )}

                {/* 2. ALWAYS Show Next Upcoming Holiday relative to selection */}
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
                           
                           {/* Calculate countdown relative to today */}
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
                         onClick={() => navigate(`holiday-${nextHoliday.id}`)}
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
    </>
  );
}

// HOLIDAYS LIST PAGE
const HolidaysList = ({ navigate }: { navigate: (p: string) => void }) => {
  const [year, setYear] = useState(new Date().getFullYear());
  
  const filteredHolidays = HOLIDAYS.filter(h => h.date.startsWith(year.toString()));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-slate-800">Tüm Tatiller</h1>
        <select 
          value={year} 
          onChange={(e) => setYear(Number(e.target.value))}
          className="bg-white border border-slate-300 rounded-lg px-4 py-2 text-slate-700 focus:outline-none focus:ring-2 focus:ring-red-500"
        >
          <option value={2023}>2023</option>
          <option value={2024}>2024</option>
          <option value={2025}>2025</option>
          <option value={2026}>2026</option>
        </select>
      </div>

      {filteredHolidays.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredHolidays.map(holiday => (
            <div key={holiday.id} className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-slate-100 flex flex-col h-full overflow-hidden group">
              {/* Card Image */}
              <div className="h-48 overflow-hidden relative">
                 {holiday.imageUrl ? (
                   <img 
                     src={holiday.imageUrl} 
                     alt={holiday.name} 
                     className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" 
                   />
                 ) : (
                   <div className="w-full h-full bg-slate-200 flex items-center justify-center">
                      <span className="text-slate-400">Görsel Yok</span>
                   </div>
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
                <button 
                  onClick={() => navigate(`holiday-${holiday.id}`)}
                  className="mt-auto w-full py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 hover:bg-red-50 hover:text-red-600 hover:border-red-200 font-medium transition-all"
                >
                  İncele & Fırsatları Gör
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-slate-50 rounded-xl border border-dashed border-slate-300">
           <p className="text-slate-500">Bu yıl için kayıtlı tatil bulunamadı.</p>
        </div>
      )}
    </div>
  );
};

// HOLIDAY DETAIL PAGE
const HolidayDetail = ({ id, navigate }: { id: string, navigate: (p: string) => void }) => {
  const holiday = HOLIDAYS.find(h => h.id === id);

  if (!holiday) return <div className="text-center py-20">Tatil bulunamadı.</div>;

  return (
    <div className="animate-fade-in">
      {/* Detail Hero */}
      <div className="relative h-[400px] w-full">
         <img 
           src={holiday.imageUrl || "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1"} 
           alt={holiday.name} 
           className="w-full h-full object-cover"
         />
         <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent"></div>
         <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
            <div className="max-w-4xl mx-auto">
              <button onClick={() => navigate('holidays')} className="text-white/80 hover:text-white mb-4 flex items-center gap-2 transition-colors">
                &larr; Tüm Tatillere Dön
              </button>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-2 text-shadow">{holiday.name}</h1>
              <p className="text-xl text-red-400 font-medium">{formatDateTR(holiday.date)}</p>
            </div>
         </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 -mt-8 relative z-10">
        <div className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
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
                             <span className="bg-green-100 text-green-600 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mt-0.5">{i+1}</span>
                             <span>{act}</span>
                           </li>
                         ))}
                       </ul>
                     </section>
                   )}
                </div>

                {/* Right Column: Links & Tags */}
                <div className="lg:col-span-1 space-y-6">
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
        </div>
      </div>
    </div>
  );
};

// ABOUT PAGE
const About = () => (
  <div className="max-w-3xl mx-auto px-4 py-16 text-center">
    <h1 className="text-3xl font-bold mb-6">Hakkında</h1>
    <p className="text-lg text-slate-600 mb-4">
      ResmiGunler.com, Türkiye'de yaşayan herkesin yıllık izinlerini en verimli şekilde kullanmasına yardımcı olmak için tasarlanmış, modern ve kullanıcı dostu bir araçtır.
    </p>
    <p className="text-slate-600">
      Yapay zeka destekli tasarım prensipleri ve performans odaklı kod yapısı ile geliştirilmiştir. Verilerimiz her yıl güncellenmektedir.
    </p>
  </div>
);

// MAIN APP COMPONENT
const App: React.FC = () => {
  // Simple custom router state
  const [currentPage, setCurrentPage] = useState('home');
  const [currentParams, setCurrentParams] = useState('');

  // Handle routing based on simple strings
  const navigate = (page: string) => {
    window.scrollTo(0, 0);
    if (page.startsWith('holiday-')) {
      setCurrentParams(page.replace('holiday-', ''));
      setCurrentPage('detail');
    } else {
      setCurrentPage(page);
    }
  };

  // SEO Helper
  useEffect(() => {
    let title = 'Resmi Günler - Tatil Hesaplayıcı';
    if (currentPage === 'calculator') title = 'İzin Hesapla - Resmi Günler';
    if (currentPage === 'holidays') title = 'Tüm Resmi Tatiller - 2024/2025';
    if (currentPage === 'detail') title = 'Tatil Detayı ve Öneriler - Resmi Günler';
    document.title = title;
  }, [currentPage]);

  const renderPage = () => {
    switch (currentPage) {
      case 'home': return <Home navigate={navigate} />;
      case 'holidays': return <HolidaysList navigate={navigate} />;
      case 'calculator': return (
        <div className="max-w-4xl mx-auto px-4 py-16">
          <LeaveCalculator />
        </div>
      );
      case 'detail': return <HolidayDetail id={currentParams} navigate={navigate} />;
      case 'about': return <About />;
      default: return <Home navigate={navigate} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Header onNavigate={navigate} currentPage={currentPage} />
      <main className="flex-grow">
        {renderPage()}
      </main>
      <Footer />
    </div>
  );
};

export default App;

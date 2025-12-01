import React, { useState, useEffect } from 'react';
import { analyzeDateRange, formatDateTR } from '../utils';
import { DateAnalysis } from '../types';
import { HOLIDAYS } from '../constants';

const LeaveCalculator: React.FC = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [result, setResult] = useState<DateAnalysis | null>(null);

  useEffect(() => {
    if (startDate && endDate) {
      if (startDate > endDate) {
        setResult(null); // Invalid range
        return;
      }
      const analysis = analyzeDateRange(startDate, endDate);
      setResult(analysis);
    } else {
      setResult(null);
    }
  }, [startDate, endDate]);

  // Filter for suggestions
  const suggestions = HOLIDAYS
    .filter(h => h.recommendation)
    .sort((a, b) => a.date.localeCompare(b.date))
    .filter(h => new Date(h.date) >= new Date(new Date().getFullYear(), 0, 1)); // From start of current year onwards

  return (
    <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden">
      <div className="p-6 md:p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-red-100 p-3 rounded-lg text-red-600">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-slate-800">İzin Hesapla & Tatil Uzat</h2>
            <p className="text-slate-500 text-sm">Tarih aralığı seçin, ne kadar izin almanız gerektiğini görelim.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Başlangıç Tarihi</label>
            <input 
              type="date" 
              className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors shadow-sm text-slate-700"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Bitiş Tarihi</label>
            <input 
              type="date" 
              className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors shadow-sm text-slate-700"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              min={startDate}
            />
          </div>
        </div>

        {result ? (
          <div className="animate-fade-in-up">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 text-center">
                <span className="block text-3xl font-bold text-blue-600 mb-1">{result.totalDays}</span>
                <span className="text-sm font-medium text-blue-800 uppercase tracking-wide">Toplam Tatil</span>
              </div>
              <div className="bg-slate-100 p-4 rounded-xl border border-slate-200 text-center">
                <span className="block text-3xl font-bold text-slate-600 mb-1">{result.weekendDays + result.holidayDays}</span>
                <span className="text-sm font-medium text-slate-600 uppercase tracking-wide">Hafta Sonu + Resmi</span>
              </div>
              <div className="bg-green-50 p-4 rounded-xl border border-green-100 text-center ring-2 ring-green-500 ring-offset-2">
                <span className="block text-3xl font-bold text-green-600 mb-1">{result.leaveDaysNeeded}</span>
                <span className="text-sm font-medium text-green-800 uppercase tracking-wide">Kullanılacak İzin</span>
              </div>
            </div>
            
            <div className="bg-slate-50 rounded-lg p-4 text-center">
              <p className="text-lg text-slate-700">
                Bu aralıkta <span className="font-bold text-green-600">{result.leaveDaysNeeded} gün</span> yıllık izin kullanarak toplam <span className="font-bold text-blue-600">{result.totalDays} gün</span> tatil yapabilirsiniz.
              </p>
            </div>
          </div>
        ) : (
          <div className="text-center py-8 text-slate-400 bg-slate-50 rounded-xl border border-dashed border-slate-200">
            Sonuçları görmek için tarih seçiniz.
          </div>
        )}
      </div>

      {/* Recommendations Section */}
      <div className="bg-slate-50 border-t border-slate-200 p-6 md:p-8">
         <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
           <span>🚀</span> Bu Yılın Tatil Fırsatları
         </h3>
         <div className="space-y-4">
            {suggestions.map(h => {
              const rec = h.recommendation!;
              return (
                <div key={h.id} className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm flex flex-col md:flex-row gap-4 items-start md:items-center hover:border-red-200 transition-colors">
                   <div className="flex-shrink-0 min-w-[120px]">
                      <span className="text-xs font-bold text-slate-400 uppercase">{formatDateTR(h.date)}</span>
                      <h4 className="font-bold text-slate-800">{h.name}</h4>
                   </div>
                   
                   <div className="flex-grow">
                      <p className="text-sm text-slate-600">
                         <span className="font-semibold text-green-600">{rec.leaveDates.length} gün izin</span> alırsanız, 
                         resmi tatil ve hafta sonlarıyla birleştirerek 
                         <span className="font-bold text-blue-600 text-lg mx-1">{rec.totalHolidayDays} GÜN</span> 
                         tatil yapabilirsiniz.
                      </p>
                      <p className="text-xs text-slate-400 mt-1 italic">
                        "{rec.description}"
                      </p>
                   </div>

                   <button 
                     onClick={() => {
                       setStartDate(rec.startPeriod);
                       setEndDate(rec.endPeriod);
                     }}
                     className="text-sm bg-red-50 text-red-600 px-3 py-2 rounded font-medium hover:bg-red-100 whitespace-nowrap"
                   >
                     Tarihleri Seç
                   </button>
                </div>
              );
            })}
            {suggestions.length === 0 && (
              <p className="text-slate-500 text-sm">Bu yıl için otomatik öneri bulunmamaktadır.</p>
            )}
         </div>
      </div>
    </div>
  );
};

export default LeaveCalculator;
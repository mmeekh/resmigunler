
import React from 'react';
import { HOLIDAYS } from '../constants';
import { formatDateTR } from '../utils';

const SmartSuggestions: React.FC = () => {
  // Filter holidays that have recommendations and sort by date
  const suggestions = HOLIDAYS
    .filter(h => h.recommendation)
    .sort((a, b) => a.date.localeCompare(b.date))
    .filter(h => new Date(h.date) > new Date()); // Only future recommendations

  // Take top 4 suggestions
  const topSuggestions = suggestions.slice(0, 4);

  if (topSuggestions.length === 0) return null;

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
           <p className="text-slate-500 text-sm">Az izin kullanarak tatilinizi nasıl maksimize edebileceğinizi keşfedin.</p>
         </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {topSuggestions.map((holiday) => {
          const rec = holiday.recommendation!;
          const daysOff = rec.leaveDates.length;
          
          return (
            <div key={holiday.id} className="bg-white rounded-xl shadow-md border border-purple-100 overflow-hidden hover:shadow-lg transition-all relative group">
               {/* Background pattern or subtle gradient */}
               <div className="absolute top-0 right-0 w-24 h-24 bg-purple-50 rounded-bl-full -mr-10 -mt-10 transition-transform group-hover:scale-110"></div>

               <div className="p-6 relative z-10">
                  <div className="flex justify-between items-start mb-4">
                     <div>
                       <span className="text-xs font-bold text-purple-600 bg-purple-50 px-2 py-1 rounded uppercase tracking-wide">
                          {new Date(holiday.date).getFullYear()} Fırsatı
                       </span>
                       <h3 className="text-lg font-bold text-slate-800 mt-2">{holiday.name}</h3>
                       <p className="text-sm text-slate-500">{formatDateTR(holiday.date)}</p>
                     </div>
                     <div className="text-center bg-green-50 p-2 rounded-lg border border-green-100 min-w-[80px]">
                        <span className="block text-2xl font-bold text-green-600">{rec.totalHolidayDays}</span>
                        <span className="text-[10px] uppercase font-bold text-green-700">Gün Tatil</span>
                     </div>
                  </div>

                  <div className="flex items-center gap-4 mb-4">
                     <div className="flex-1 bg-slate-50 rounded p-2 text-center border border-slate-100">
                        <span className="block text-xl font-bold text-red-500">{daysOff}</span>
                        <span className="text-xs text-slate-500">Gün İzin</span>
                     </div>
                     <div className="text-slate-300">
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                     </div>
                     <div className="flex-1 bg-purple-50 rounded p-2 text-center border border-purple-100">
                        <span className="block text-xl font-bold text-purple-600">{rec.totalHolidayDays}</span>
                        <span className="text-xs text-purple-600">Gün Keyif</span>
                     </div>
                  </div>

                  <p className="text-sm text-slate-600 italic border-l-2 border-purple-300 pl-3">
                     "{rec.description}"
                  </p>
               </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SmartSuggestions;

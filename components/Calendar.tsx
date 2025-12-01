
import React, { useState, useEffect } from 'react';
import { HOLIDAYS } from '../constants';
import { getHolidayForDate, isWeekend } from '../utils';

interface CalendarProps {
  initialDate?: Date;
  selectedDate?: string;
  onDateClick?: (date: string) => void;
}

const Calendar: React.FC<CalendarProps> = ({ initialDate = new Date(), selectedDate, onDateClick }) => {
  const [currentMonthDate, setCurrentMonthDate] = useState(initialDate);

  // Sync internal month view if selectedDate changes drastically (optional, but good UX)
  // For now, we keep the user's navigation state unless explicitly asked to reset.

  const year = currentMonthDate.getFullYear();
  const month = currentMonthDate.getMonth();

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = new Date(year, month, 1).getDay(); // 0 is Sunday

  // Adjust so Monday is 0, Sunday is 6 for rendering (European/Turkish style)
  const startDayOffset = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;

  const monthNames = [
    "Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran",
    "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"
  ];

  const daysOfWeek = ["Pzt", "Sal", "Çar", "Per", "Cum", "Cmt", "Paz"];

  const handlePrevMonth = () => {
    setCurrentMonthDate(new Date(year, month - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonthDate(new Date(year, month + 1, 1));
  };

  const renderDays = () => {
    const days = [];
    const today = new Date(); // Local time
    
    // Empty cells for offset
    for (let i = 0; i < startDayOffset; i++) {
      days.push(<div key={`empty-${i}`} className="h-24 bg-slate-50/30 border border-slate-100"></div>);
    }

    // Actual days
    for (let d = 1; d <= daysInMonth; d++) {
      const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
      const holiday = getHolidayForDate(dateStr);
      const isWknd = isWeekend(dateStr);
      
      // Strict check for today using local time components
      const isToday = 
        today.getFullYear() === year && 
        today.getMonth() === month && 
        today.getDate() === d;

      const isSelected = selectedDate === dateStr;

      let bgClass = "bg-white hover:bg-slate-50";
      let textClass = "text-slate-700";
      let borderClass = "border-slate-100";

      // Weekend Styles (Distinct Orange)
      if (isWknd) {
        bgClass = "bg-orange-50 hover:bg-orange-100"; 
        textClass = "text-orange-600 font-medium";
      }

      // Holiday Styles (Overrides Weekend)
      if (holiday) {
        if (holiday.type === 'dini_tatil') {
           // Religious Holidays (Greenish)
           bgClass = "bg-emerald-100 hover:bg-emerald-200";
           textClass = "text-emerald-800 font-bold";
        } else {
           // Official Holidays (Red)
           bgClass = "bg-red-100 hover:bg-red-200";
           textClass = "text-red-800 font-bold";
        }
      } 
      
      // Today Styles (Overrides others slightly for border/ring)
      if (isToday) {
         // Keep background color of holiday if it is one, otherwise blue tint
        const baseBg = holiday ? bgClass : "bg-blue-50/60";
        bgClass = `${baseBg} ring-inset ring-2 ring-blue-300`;
      }

      // Selected State (Highest Priority Visuals)
      if (isSelected) {
        borderClass = "border-slate-800 ring-2 ring-slate-800 z-10 shadow-lg scale-[1.02]";
      }

      days.push(
        <div 
          key={d} 
          onClick={() => onDateClick?.(dateStr)}
          className={`h-24 sm:h-32 border p-2 flex flex-col justify-between transition-all duration-200 cursor-pointer group relative overflow-hidden ${bgClass} ${borderClass}`}
        >
          <div className="flex justify-between items-start">
            <span className={`text-sm ${isToday ? 'font-bold text-blue-600' : 'font-medium'} ${isSelected ? 'underline' : ''}`}>{d}</span>
            {isToday && <span className="text-[10px] bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded shadow-sm">Bugün</span>}
          </div>
          
          {holiday && (
            <div className="mt-1">
              <p className={`text-xs leading-tight line-clamp-2 md:line-clamp-3 font-medium ${holiday.type === 'dini_tatil' ? 'text-emerald-700' : 'text-red-700'}`}>
                {holiday.name}
              </p>
            </div>
          )}

          {/* Selection Marker */}
          {isSelected && (
            <div className="absolute bottom-1 right-2 text-slate-800 opacity-20">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
            </div>
          )}
        </div>
      );
    }
    return days;
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden">
      {/* Calendar Header */}
      <div className="flex items-center justify-between px-6 py-4 bg-slate-50 border-b border-slate-200">
        <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
          {monthNames[month]} <span className="text-red-600">{year}</span>
        </h2>
        <div className="flex space-x-2">
          <button onClick={handlePrevMonth} className="p-2 hover:bg-slate-200 rounded-full transition-colors text-slate-600">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button onClick={handleNextMonth} className="p-2 hover:bg-slate-200 rounded-full transition-colors text-slate-600">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Week Days Header */}
      <div className="grid grid-cols-7 border-b border-slate-200 bg-white">
        {daysOfWeek.map((day, idx) => (
          <div key={day} className={`py-3 text-center text-xs sm:text-sm font-semibold uppercase tracking-wider ${idx >= 5 ? 'text-red-400' : 'text-slate-400'}`}>
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 bg-slate-200 gap-[1px]">
        {renderDays()}
      </div>
    </div>
  );
};

export default Calendar;

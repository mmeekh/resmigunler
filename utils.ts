import { HOLIDAYS } from './constants';
import { DateAnalysis, Holiday } from './types';

// Helper to check if a string date is valid
export const isValidDate = (dateStr: string): boolean => {
  return !isNaN(Date.parse(dateStr));
};

// Get list of days between two dates inclusive
export const getDatesInRange = (startDate: string, endDate: string): string[] => {
  const dateArray: string[] = [];
  const currentDate = new Date(startDate);
  const stopDate = new Date(endDate);

  while (currentDate <= stopDate) {
    dateArray.push(currentDate.toISOString().split('T')[0]);
    currentDate.setDate(currentDate.getDate() + 1);
  }
  return dateArray;
};

// Check if a specific date is a weekend
export const isWeekend = (dateStr: string): boolean => {
  const date = new Date(dateStr);
  const day = date.getDay();
  return day === 0 || day === 6; // 0=Sunday, 6=Saturday
};

// Find if a date is a holiday
export const getHolidayForDate = (dateStr: string): Holiday | undefined => {
  return HOLIDAYS.find(h => {
    if (h.endDate) {
      return dateStr >= h.date && dateStr <= h.endDate;
    }
    return h.date === dateStr;
  });
};

export const analyzeDateRange = (startDate: string, endDate: string): DateAnalysis => {
  const dates = getDatesInRange(startDate, endDate);
  let weekendDays = 0;
  let holidayDays = 0;

  dates.forEach(date => {
    const weekend = isWeekend(date);
    const holiday = getHolidayForDate(date);

    if (weekend) {
      weekendDays++;
    } else if (holiday && (holiday.type === 'resmi_tatil' || holiday.type === 'dini_tatil')) {
      // It's a weekday, but it is a holiday, so no leave needed
      holidayDays++;
    }
  });

  const totalDays = dates.length;
  // Leave needed = Total duration - weekends - official holidays falling on weekdays
  const leaveDaysNeeded = totalDays - weekendDays - holidayDays;

  return {
    totalDays,
    workingDays: totalDays - weekendDays, // Simply days that are not weekends
    weekendDays,
    holidayDays,
    leaveDaysNeeded,
    dates
  };
};

export const formatDateTR = (dateStr: string): string => {
  if (!isValidDate(dateStr)) return dateStr;
  
  const date = new Date(dateStr);
  const options: Intl.DateTimeFormatOptions = { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric',
    weekday: 'long' 
  };
  return date.toLocaleDateString('tr-TR', options);
};
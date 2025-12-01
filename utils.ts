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

// ---- Calendar / ICS Helpers ----
const toUtcDateString = (dateStr: string): string => {
  const date = new Date(dateStr + 'T00:00:00');
  return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
};

const getIcsEnd = (holiday: Holiday): string => {
  const end = new Date((holiday.endDate || holiday.date) + 'T00:00:00');
  end.setDate(end.getDate() + 1); // ICS end is exclusive
  return end.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
};

export const buildIcsContent = (holiday: Holiday): string => {
  const uid = `${holiday.id}@resmigunler.com`;
  const dtStart = toUtcDateString(holiday.date);
  const dtEnd = getIcsEnd(holiday);
  const summary = holiday.name;
  const description = holiday.description.replace(/\n/g, ' ');

  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//ResmiGunler.com//PWA//TR',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${uid}`,
    `DTSTAMP:${toUtcDateString(new Date().toISOString())}`,
    `DTSTART:${dtStart}`,
    `DTEND:${dtEnd}`,
    `SUMMARY:${summary}`,
    `DESCRIPTION:${description}`,
    'END:VEVENT',
    'END:VCALENDAR'
  ].join('\n');
};

export const buildGoogleCalendarLink = (holiday: Holiday): string => {
  const start = holiday.date.replace(/-/g, '') + 'T000000Z';
  const endDate = holiday.endDate || holiday.date;
  const end = endDate.replace(/-/g, '') + 'T235900Z';
  const details = encodeURIComponent(holiday.description || holiday.name);
  const title = encodeURIComponent(holiday.name);
  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${start}/${end}&details=${details}&sf=true&output=xml`;
};

export const buildOutlookCalendarLink = (holiday: Holiday): string => {
  const start = holiday.date.replace(/-/g, '') + 'T000000Z';
  const endDate = holiday.endDate || holiday.date;
  const end = endDate.replace(/-/g, '') + 'T235900Z';
  const body = encodeURIComponent(holiday.description || holiday.name);
  const subject = encodeURIComponent(holiday.name);
  return `https://outlook.live.com/calendar/0/deeplink/compose?path=/calendar/action/compose&rru=addevent&startdt=${start}&enddt=${end}&subject=${subject}&body=${body}`;
};
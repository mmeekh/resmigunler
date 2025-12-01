
export type HolidayType = 'resmi_tatil' | 'dini_tatil' | 'ozel_gun' | 'hafta_sonu';

export interface BookingLink {
  title: string;
  url: string;
  icon?: string; // 'plane', 'hotel', 'bus'
}

export interface LeaveRecommendation {
  leaveDates: string[]; // Dates to take off (e.g. ['2025-05-02'])
  totalHolidayDays: number; // Total resulting off days
  startPeriod: string; // Start of the long break
  endPeriod: string; // End of the long break
  description: string; // e.g. "Cuma gününü bağlayarak 4 gün tatil yapın."
}

export interface Holiday {
  id: string;
  name: string;
  date: string; // YYYY-MM-DD
  endDate?: string; // For multi-day holidays
  type: HolidayType;
  description: string;
  history?: string;
  keywords: string[];
  imageUrl?: string; // Unsplash URL
  vacationTips?: string; // Specific advice for this holiday
  activitySuggestions?: string[]; // Bullet points
  bookingLinks?: BookingLink[]; // Affiliate/SEO links
  recommendation?: LeaveRecommendation; // Smart leave suggestion
}

export interface DateAnalysis {
  totalDays: number;
  workingDays: number;
  weekendDays: number;
  holidayDays: number; // Official holidays falling on weekdays
  leaveDaysNeeded: number;
  dates: string[];
}

export interface BreadcrumbItem {
  label: string;
  path: string;
}

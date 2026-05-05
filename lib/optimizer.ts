/**
 * Smart Leave Optimizer
 * =====================
 * For every public holiday in a given year, find the bridge-day combinations
 * that yield the longest run of consecutive days off, and rank by ROI
 * (consecutive days off / leave days spent).
 *
 * This replaces the previous static `recommendation` field on each Holiday
 * with a real algorithm that adapts as the holiday list changes.
 */
import type { Holiday } from '../types';

const MS_PER_DAY = 86_400_000;

function isWeekend(d: Date): boolean {
  const dow = d.getDay();
  return dow === 0 || dow === 6;
}

function fmt(d: Date): string {
  return d.toISOString().slice(0, 10);
}

function addDays(d: Date, n: number): Date {
  return new Date(d.getTime() + n * MS_PER_DAY);
}

function dayLabel(d: Date): string {
  return ['Pazar', 'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi'][d.getDay()];
}

export interface LeaveSuggestion {
  holidayId: string;
  holidayName: string;
  holidayDate: string;
  leaveDates: string[];          // Days you should request as PTO (ISO date)
  totalConsecutiveDays: number;  // Length of the resulting holiday block
  blockStart: string;
  blockEnd: string;
  roi: number;                    // total / leaveDates.length
  description: string;
}

/**
 * Build a Set<isoDate> of all holiday days (multi-day holidays expanded).
 */
function expandHolidaySet(holidays: Holiday[]): Set<string> {
  const set = new Set<string>();
  for (const h of holidays) {
    const start = new Date(h.date);
    const end = h.endDate ? new Date(h.endDate) : start;
    let cur = new Date(start);
    while (cur <= end) {
      set.add(fmt(cur));
      cur = addDays(cur, 1);
    }
  }
  return set;
}

function isOff(d: Date, holidaySet: Set<string>): boolean {
  return isWeekend(d) || holidaySet.has(fmt(d));
}

/**
 * For one holiday, scan candidate leave-day patterns (1, 2, or 3 PTO days
 * either side) and pick the combination that maximizes total consecutive
 * days off. Returns the best suggestion, or null if no improvement over
 * the holiday's natural length.
 */
function bestForHoliday(
  holiday: Holiday,
  holidaySet: Set<string>,
  maxLeave: number
): LeaveSuggestion | null {
  const start = new Date(holiday.date);
  const end = holiday.endDate ? new Date(holiday.endDate) : start;
  const naturalLength = Math.round((end.getTime() - start.getTime()) / MS_PER_DAY) + 1;

  let best: LeaveSuggestion | null = null;

  // Try every combination of (leftDays, rightDays) where each side is 0..maxLeave
  // and the total leave is at least 1 (otherwise it's not a "suggestion").
  for (let left = 0; left <= maxLeave; left++) {
    for (let right = 0; right <= maxLeave; right++) {
      if (left === 0 && right === 0) continue;
      if (left + right > maxLeave) continue;

      const leaveDates: string[] = [];
      let valid = true;

      // Collect leave dates on the left (going backward, skipping weekends/holidays).
      let cur = addDays(start, -1);
      let added = 0;
      while (added < left) {
        if (isWeekend(cur) || holidaySet.has(fmt(cur))) {
          cur = addDays(cur, -1);
          continue;
        }
        leaveDates.unshift(fmt(cur));
        added++;
        cur = addDays(cur, -1);
      }

      // Collect leave dates on the right (going forward, skipping weekends/holidays).
      cur = addDays(end, 1);
      added = 0;
      while (added < right) {
        if (isWeekend(cur) || holidaySet.has(fmt(cur))) {
          cur = addDays(cur, 1);
          continue;
        }
        leaveDates.push(fmt(cur));
        added++;
        cur = addDays(cur, 1);
      }

      if (!valid || leaveDates.length === 0) continue;

      // Now compute the consecutive-days-off block. Start from the earliest
      // day in (leftmost-leave, holiday-start) and walk outward as long as
      // the day is off (weekend, holiday, or one of our leave dates).
      const leaveSet = new Set(leaveDates);
      const isOffOrLeave = (d: Date) => isOff(d, holidaySet) || leaveSet.has(fmt(d));

      const earliestLeave = leaveDates[0] ? new Date(leaveDates[0]) : start;
      let blockStart = earliestLeave < start ? earliestLeave : start;
      // Walk back through any preceding off days (weekends).
      while (true) {
        const prev = addDays(blockStart, -1);
        if (isOffOrLeave(prev)) blockStart = prev;
        else break;
      }

      const lastLeave = leaveDates[leaveDates.length - 1]
        ? new Date(leaveDates[leaveDates.length - 1])
        : end;
      let blockEnd = lastLeave > end ? lastLeave : end;
      while (true) {
        const nxt = addDays(blockEnd, 1);
        if (isOffOrLeave(nxt)) blockEnd = nxt;
        else break;
      }

      const totalDays = Math.round((blockEnd.getTime() - blockStart.getTime()) / MS_PER_DAY) + 1;
      // Only suggest if the block is meaningfully longer than just the holiday.
      if (totalDays <= naturalLength + 1) continue;

      const roi = totalDays / leaveDates.length;
      const candidate: LeaveSuggestion = {
        holidayId: holiday.id,
        holidayName: holiday.name,
        holidayDate: holiday.date,
        leaveDates,
        totalConsecutiveDays: totalDays,
        blockStart: fmt(blockStart),
        blockEnd: fmt(blockEnd),
        roi,
        description: buildDescription(leaveDates, totalDays, holiday),
      };

      if (
        !best ||
        candidate.roi > best.roi ||
        (candidate.roi === best.roi && candidate.totalConsecutiveDays > best.totalConsecutiveDays)
      ) {
        best = candidate;
      }
    }
  }

  return best;
}

function buildDescription(leaveDates: string[], totalDays: number, holiday: Holiday): string {
  const dates = leaveDates
    .map((iso) => {
      const d = new Date(iso);
      return `${d.getDate()} ${d.toLocaleString('tr-TR', { month: 'long' })} ${dayLabel(d)}`;
    })
    .join(' ve ');
  return `${dates} günlerinde izin alırsan ${holiday.name} ile birleştirip toplam ${totalDays} gün aralıksız tatil yaparsın.`;
}

/**
 * Compute the best leave suggestion for every upcoming holiday and return
 * the top N ranked by ROI (most days off per leave day spent).
 */
export function computeLeaveSuggestions(
  holidays: Holiday[],
  options: { maxLeavePerHoliday?: number; topN?: number; futureOnly?: boolean } = {}
): LeaveSuggestion[] {
  const { maxLeavePerHoliday = 3, topN = 6, futureOnly = true } = options;
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const filtered = futureOnly
    ? holidays.filter((h) => new Date(h.date) >= today)
    : holidays;

  const set = expandHolidaySet(holidays);
  const suggestions: LeaveSuggestion[] = [];

  for (const h of filtered) {
    const best = bestForHoliday(h, set, maxLeavePerHoliday);
    if (best) suggestions.push(best);
  }

  return suggestions
    .sort((a, b) => {
      if (Math.abs(a.roi - b.roi) > 0.01) return b.roi - a.roi;
      return b.totalConsecutiveDays - a.totalConsecutiveDays;
    })
    .slice(0, topN);
}

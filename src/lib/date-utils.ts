/**
 * Parse ISO date string (yyyy-MM-dd) to Date object with noon time to avoid timezone issues
 */
export function parseISOWithNoon(dateStr: string): Date {
  const [year, month, day] = dateStr.split('-').map(Number);
  return new Date(year, month - 1, day, 12, 0, 0);
}

/**
 * Format date to yyyy-MM-dd
 */
export function formatYYYYMMDD(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Format date to "Month Day" (e.g., "January 15th")
 */
export function formatMonthDay(date: Date): string {
  const months = ['January', 'February', 'March', 'April', 'May', 'June',
                  'July', 'August', 'September', 'October', 'November', 'December'];
  const day = date.getDate();
  const suffix = getDaySuffix(day);
  return `${months[date.getMonth()]} ${day}${suffix}`;
}

/**
 * Format date to short month (e.g., "Jan", "Feb")
 */
export function formatShortMonth(date: Date): string {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return months[date.getMonth()];
}

/**
 * Get day suffix (st, nd, rd, th)
 */
function getDaySuffix(day: number): string {
  if (day >= 11 && day <= 13) return 'th';
  switch (day % 10) {
    case 1: return 'st';
    case 2: return 'nd';
    case 3: return 'rd';
    default: return 'th';
  }
}

/**
 * Generate array of dates between start and end (inclusive)
 */
export function eachDayOfInterval(start: Date, end: Date): Date[] {
  const days: Date[] = [];
  const current = new Date(start);

  while (current <= end) {
    days.push(new Date(current));
    current.setDate(current.getDate() + 1);
  }

  return days;
}

/**
 * Set hours to a date (avoiding timezone issues)
 */
export function setHoursToNoon(date: Date): Date {
  const newDate = new Date(date);
  newDate.setHours(12, 0, 0, 0);
  return newDate;
}

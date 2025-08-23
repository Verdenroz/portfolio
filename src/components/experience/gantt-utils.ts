import { Experience } from "@/types";

export interface GanttPosition {
  x: number;
  width: number;
  track: number;
}

export interface TimeRange {
  start: Date;
  end: Date;
  totalDays: number;
}

export interface GridLine {
  position: number;
  label: string;
  type: 'major' | 'minor';
}

// Calculate the overall time range for all experiences
export function calculateTimeRange(experiences: Experience[]): TimeRange {
  if (experiences.length === 0) {
    const now = new Date();
    const start = new Date(now.getFullYear() - 1, 0, 1);
    return {
      start,
      end: now,
      totalDays: Math.ceil((now.getTime() - start.getTime()) / (1000 * 60 * 60 * 24))
    };
  }

  const allDates = experiences.flatMap(exp => [
    exp.startDate,
    exp.endDate || new Date()
  ]);

  const start = new Date(Math.min(...allDates.map(d => d.getTime())));
  const end = new Date(Math.max(...allDates.map(d => d.getTime())));
  
  // Add some padding to the range
  const padding = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) * 0.05; // 5% padding
  const paddedStart = new Date(start.getTime() - padding * 24 * 60 * 60 * 1000);
  const paddedEnd = new Date(end.getTime() + padding * 24 * 60 * 60 * 1000);

  const totalDays = Math.ceil((paddedEnd.getTime() - paddedStart.getTime()) / (1000 * 60 * 60 * 24));

  return {
    start: paddedStart,
    end: paddedEnd,
    totalDays
  };
}

// Convert a date to pixel position within the timeline
export function dateToPosition(date: Date, timeRange: TimeRange, containerWidth: number): number {
  const daysSinceStart = Math.ceil((date.getTime() - timeRange.start.getTime()) / (1000 * 60 * 60 * 24));
  return (daysSinceStart / timeRange.totalDays) * containerWidth;
}

// Calculate position and width for an experience bar
export function calculateBarPosition(
  experience: Experience,
  timeRange: TimeRange,
  containerWidth: number,
  minBarWidth: number = 60
): { x: number; width: number } {
  const startPos = dateToPosition(experience.startDate, timeRange, containerWidth);
  const endDate = experience.endDate || new Date();
  const endPos = dateToPosition(endDate, timeRange, containerWidth);
  
  const calculatedWidth = Math.max(endPos - startPos, minBarWidth);
  
  return {
    x: startPos,
    width: calculatedWidth
  };
}

// Detect overlapping experiences and assign tracks
export function assignTracks(experiences: Experience[]): Map<string, number> {
  const sortedExperiences = [...experiences].sort((a, b) => a.startDate.getTime() - b.startDate.getTime());
  const trackAssignments = new Map<string, number>();
  const trackEndTimes: Date[] = [];

  for (const experience of sortedExperiences) {
    const startDate = experience.startDate;
    let assignedTrack = -1;

    // Find the first available track
    for (let track = 0; track < trackEndTimes.length; track++) {
      if (!trackEndTimes[track] || trackEndTimes[track] < startDate) {
        assignedTrack = track;
        break;
      }
    }

    // If no available track found, create a new one
    if (assignedTrack === -1) {
      assignedTrack = trackEndTimes.length;
      trackEndTimes.push(new Date());
    }

    // Update the track end time
    trackEndTimes[assignedTrack] = experience.endDate || new Date();
    trackAssignments.set(experience.id, assignedTrack);
  }

  return trackAssignments;
}

// Generate grid lines for the timeline with yearly intervals
export function generateGridLines(timeRange: TimeRange, containerWidth: number): GridLine[] {
  const gridLines: GridLine[] = [];
  
  let current = new Date(timeRange.start);
  current.setMonth(0); // Start at January
  current.setDate(1); // Start at the beginning of the month
  
  while (current <= timeRange.end) {
    const position = dateToPosition(current, timeRange, containerWidth);
    
    // Format label as just the year (e.g., "2024")
    const label = current.getFullYear().toString();
    
    // All yearly markers are major grid lines
    const type: 'major' | 'minor' = 'major';

    gridLines.push({ position, label, type });

    // Move to next year
    current.setFullYear(current.getFullYear() + 1);
  }

  return gridLines;
}

// Calculate the total height needed for the chart
export function calculateChartHeight(trackCount: number, trackHeight: number = 120, padding: number = 25): number {
  return (trackCount * trackHeight) + ((trackCount - 1) * padding) + 40; // 40px for year labels
}

// Format date range for display (e.g., "Mar 2024 - Present")
export function formatDateRange(startDate: Date, endDate: Date | null): string {
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      year: 'numeric' 
    });
  };

  const start = formatDate(startDate);
  const end = endDate ? formatDate(endDate) : 'Present';
  
  return `${start} - ${end}`;
}

// Format date range with different levels of detail
export function formatDateRangeByType(
  startDate: Date, 
  endDate: Date | null, 
  format: 'full' | 'abbreviated' | 'short'
): string {
  switch (format) {
    case 'full':
      return formatDateRange(startDate, endDate);
    
    case 'abbreviated':
      const startAbbr = startDate.toLocaleDateString('en-US', { month: 'short', year: '2-digit' });
      const endAbbr = endDate ? endDate.toLocaleDateString('en-US', { month: 'short', year: '2-digit' }) : 'Now';
      return `${startAbbr} - ${endAbbr}`;
    
    case 'short':
      const startShort = startDate.getFullYear().toString().slice(-2);
      const endShort = endDate ? endDate.getFullYear().toString().slice(-2) : 'Now';
      return `'${startShort} - '${endShort}`;
    
    default:
      return formatDateRange(startDate, endDate);
  }
}

// Format duration for display (kept for backward compatibility)
export function formatDuration(startDate: Date, endDate: Date | null): string {
  const end = endDate || new Date();
  const diffTime = Math.abs(end.getTime() - startDate.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  const diffMonths = Math.floor(diffDays / 30);
  const diffYears = Math.floor(diffMonths / 12);

  if (diffYears > 0) {
    const remainingMonths = diffMonths % 12;
    if (remainingMonths > 0) {
      return `${diffYears}y ${remainingMonths}m`;
    }
    return `${diffYears}y`;
  }

  if (diffMonths > 0) {
    return `${diffMonths}m`;
  }

  return `${diffDays}d`;
}

// Check if an experience is currently active
export function isCurrentPosition(experience: Experience): boolean {
  return experience.endDate === null;
}

// Bar width categories for responsive content
export type BarWidthCategory = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export function getBarWidthCategory(width: number): BarWidthCategory {
  if (width >= 300) return 'xl';
  if (width >= 200) return 'lg'; 
  if (width >= 120) return 'md';
  if (width >= 60) return 'sm';
  return 'xs';
}

// Enhanced content priority that guarantees essential information
export function getContentPriority(category: BarWidthCategory): {
  showPosition: boolean;
  showCompany: boolean;
  showDateRange: boolean;
  textSize: string;
  useTooltip: boolean;
  dateFormat: 'full' | 'abbreviated' | 'short';
  truncatePosition: boolean;
} {
  switch (category) {
    case 'xl':
      return {
        showPosition: true,
        showCompany: true,
        showDateRange: true,
        textSize: 'text-sm',
        useTooltip: false,
        dateFormat: 'full',
        truncatePosition: false
      };
    case 'lg':
      return {
        showPosition: true,
        showCompany: true,
        showDateRange: true,
        textSize: 'text-xs',
        useTooltip: false,
        dateFormat: 'full',
        truncatePosition: false
      };
    case 'md':
      return {
        showPosition: true,
        showCompany: true,
        showDateRange: true,
        textSize: 'text-xs',
        useTooltip: true,
        dateFormat: 'abbreviated',
        truncatePosition: true
      };
    case 'sm':
      return {
        showPosition: true,
        showCompany: false,
        showDateRange: true,
        textSize: 'text-xs',
        useTooltip: true,
        dateFormat: 'short',
        truncatePosition: true
      };
    case 'xs':
      return {
        showPosition: false,
        showCompany: false,
        showDateRange: false,
        textSize: 'text-xs',
        useTooltip: true,
        dateFormat: 'short',
        truncatePosition: false
      };
  }
}

// Get responsive container width based on screen size
export function getResponsiveWidth(experiences: Experience[]): number {
  if (typeof window === 'undefined') return 1200; // Default for SSR
  
  const viewportWidth = window.innerWidth;
  const timeRange = calculateTimeRange(experiences);
  const yearSpan = timeRange.totalDays / 365;
  
  // Base width calculation: roughly 200px per year
  const baseWidth = Math.max(yearSpan * 200, viewportWidth);
  
  // Adjust for mobile
  if (viewportWidth < 768) {
    return Math.max(baseWidth, viewportWidth * 2);
  }
  
  return Math.max(baseWidth, 1200);
}
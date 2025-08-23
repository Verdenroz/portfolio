"use client";

import React, { useMemo, useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Experience } from "@/types";
import { GanttBar } from "./gantt-bar";
import { GanttTimeline } from "./gantt-timeline";
import { GanttLegend } from "./gantt-legend";
import {
  calculateTimeRange,
  assignTracks,
  calculateBarPosition,
  generateGridLines,
  calculateChartHeight,
  getResponsiveWidth
} from "./gantt-utils";

interface GanttChartProps {
  experiences: Experience[];
  className?: string;
}

const TRACK_HEIGHT = 120;
const TRACK_PADDING = 25;

// Tooltip color mappings for employment types - theme-aware colors
const TOOLTIP_COLORS = {
  freelance: {
    bg: "bg-purple-100 dark:bg-purple-800",
    border: "border-purple-200 dark:border-purple-600",
    text: "text-purple-900 dark:text-purple-100",
    arrow: "bg-purple-100 dark:bg-purple-800 border-purple-200 dark:border-purple-600"
  },
  internship: {
    bg: "bg-blue-100 dark:bg-blue-800", 
    border: "border-blue-200 dark:border-blue-600",
    text: "text-blue-900 dark:text-blue-100",
    arrow: "bg-blue-100 dark:bg-blue-800 border-blue-200 dark:border-blue-600"
  },
  "full-time": {
    bg: "bg-green-100 dark:bg-green-800",
    border: "border-green-200 dark:border-green-600", 
    text: "text-green-900 dark:text-green-100",
    arrow: "bg-green-100 dark:bg-green-800 border-green-200 dark:border-green-600"
  },
  "part-time": {
    bg: "bg-yellow-100 dark:bg-yellow-800",
    border: "border-yellow-200 dark:border-yellow-600",
    text: "text-yellow-900 dark:text-yellow-100", 
    arrow: "bg-yellow-100 dark:bg-yellow-800 border-yellow-200 dark:border-yellow-600"
  },
  volunteer: {
    bg: "bg-pink-100 dark:bg-pink-800",
    border: "border-pink-200 dark:border-pink-600",
    text: "text-pink-900 dark:text-pink-100",
    arrow: "bg-pink-100 dark:bg-pink-800 border-pink-200 dark:border-pink-600"
  }
} as const;

export function GanttChart({ experiences, className = "" }: GanttChartProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(1200);
  const [hasScrolledToEnd, setHasScrolledToEnd] = useState(false);
  
  // Tooltip state
  const [tooltipData, setTooltipData] = useState<{
    experience: Experience;
    x: number;
    y: number;
    visible: boolean;
  } | null>(null);

  // Calculate all positioning data
  const chartData = useMemo(() => {
    if (experiences.length === 0) {
      return {
        timeRange: { start: new Date(), end: new Date(), totalDays: 0 },
        trackAssignments: new Map(),
        gridLines: [],
        chartHeight: 0,
        barPositions: []
      };
    }

    const timeRange = calculateTimeRange(experiences);
    const trackAssignments = assignTracks(experiences);
    const totalTracks = Math.max(...Array.from(trackAssignments.values())) + 1;
    const chartHeight = calculateChartHeight(totalTracks, TRACK_HEIGHT, TRACK_PADDING);
    const gridLines = generateGridLines(timeRange, containerWidth);

    const barPositions = experiences.map(experience => ({
      experience,
      ...calculateBarPosition(experience, timeRange, containerWidth),
      track: trackAssignments.get(experience.id) || 0
    }));

    return {
      timeRange,
      trackAssignments,
      gridLines,
      chartHeight,
      barPositions
    };
  }, [experiences, containerWidth]);

  // Handle responsive width
  useEffect(() => {
    const updateWidth = () => {
      const responsiveWidth = getResponsiveWidth(experiences);
      setContainerWidth(responsiveWidth);
    };

    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, [experiences]);


  // Auto-scroll to current positions on mount
  useEffect(() => {
    if (!hasScrolledToEnd && scrollContainerRef.current && chartData.barPositions.length > 0) {
      const hasCurrentPositions = experiences.some(exp => exp.endDate === null);
      
      if (hasCurrentPositions) {
        // Small delay to ensure rendering is complete
        const timer = setTimeout(() => {
          if (scrollContainerRef.current) {
            const scrollContainer = scrollContainerRef.current;
            const maxScroll = scrollContainer.scrollWidth - scrollContainer.clientWidth;
            
            // Scroll fully to the right to show current positions
            scrollContainer.scrollTo({
              left: maxScroll,
              behavior: 'smooth'
            });
            
            setHasScrolledToEnd(true);
          }
        }, 500);

        return () => clearTimeout(timer);
      }
    }
  }, [chartData.barPositions, experiences, hasScrolledToEnd]);

  // Tooltip handlers
  const handleBarHover = (experience: Experience, x: number, y: number) => {
    setTooltipData({
      experience,
      x,
      y: y - 120, // Position above the bar
      visible: true
    });
  };

  const handleBarLeave = () => {
    setTooltipData(null);
  };

  if (experiences.length === 0) {
    return (
      <div className={`flex items-center justify-center h-40 text-muted-foreground ${className}`}>
        <p>No experiences to display</p>
      </div>
    );
  }

  return (
    <div className={`w-full ${className}`} ref={containerRef}>
      {/* Legend at Top */}
      <div className="mb-6">
        <GanttLegend />
      </div>

      {/* Chart Container */}
      <div 
        className="relative overflow-x-auto overflow-y-hidden"
        ref={scrollContainerRef}
        style={{ 
          height: chartData.chartHeight + 40, // Extra space for container padding
          scrollBehavior: 'smooth'
        }}
      >
        {/* Chart Canvas */}
        <div 
          className="relative"
          style={{ 
            width: containerWidth, 
            height: chartData.chartHeight,
            minWidth: '100%'
          }}
        >
          {/* Experience Bars */}
          <div className="relative z-10">
            {chartData.barPositions.map((barData, index) => (
              <GanttBar
                key={barData.experience.id}
                experience={barData.experience}
                x={barData.x}
                width={barData.width}
                track={barData.track}
                trackHeight={TRACK_HEIGHT}
                index={index}
                onHover={handleBarHover}
                onLeave={handleBarLeave}
              />
            ))}
          </div>

          {/* Timeline Component */}
          <GanttTimeline
            timeRange={chartData.timeRange}
            gridLines={chartData.gridLines}
            containerWidth={containerWidth}
            chartHeight={chartData.chartHeight}
          />
        </div>
      </div>


      {/* Chart-level Tooltip */}
      {tooltipData && (() => {
        const tooltipColors = TOOLTIP_COLORS[tooltipData.experience.type as keyof typeof TOOLTIP_COLORS] || {
          bg: "bg-gray-900",
          border: "border-gray-700", 
          text: "text-white",
          arrow: "bg-gray-900 border-gray-700"
        };
        
        return (
          <div
            className={`fixed px-4 py-3 rounded-lg text-sm shadow-2xl z-50 min-w-max max-w-sm transition-opacity duration-200 ${tooltipColors.bg} ${tooltipColors.border} ${tooltipColors.text}`}
            style={{
              left: `${tooltipData.x}px`,
              top: `${tooltipData.y}px`,
              transform: 'translateX(-50%)',
              pointerEvents: 'none'
            }}
          >
            <div className="space-y-1.5">
              <div className="font-bold text-base">{tooltipData.experience.position}</div>
              <div className="opacity-90 font-semibold">{tooltipData.experience.company}</div>
              <div className="opacity-80 font-medium">
                {tooltipData.experience.startDate.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })} - {
                  tooltipData.experience.endDate 
                    ? tooltipData.experience.endDate.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
                    : 'Present'
                }
              </div>
              <div className="opacity-80 text-sm">
                <span className="inline-block bg-black/20 px-2 py-1 rounded mr-2">{tooltipData.experience.type}</span>
                {tooltipData.experience.location}
              </div>
              <div className="opacity-70 text-xs italic mt-2 pt-2 border-t border-current/20">
                Click for more details
              </div>
            </div>
            {/* Tooltip arrow */}
            <div className={`absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-4 h-4 rotate-45 border-r border-b ${tooltipColors.arrow}`} />
          </div>
        );
      })()}

      {/* Mobile scroll indicator */}
      <div className="md:hidden absolute bottom-4 right-4 flex items-center gap-2 bg-background/90 backdrop-blur-sm px-3 py-2 rounded-full border text-xs text-muted-foreground z-40">
        <div className="w-4 h-2 border border-current rounded-sm relative">
          <div className="absolute inset-0.5 bg-current/30 rounded-sm" />
          <motion.div
            className="absolute right-0 top-0.5 bottom-0.5 w-1 bg-current rounded-sm"
            animate={{ x: [-2, 2, -2] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
        Scroll to explore
      </div>

      {/* Accessibility Instructions */}
      <div className="sr-only">
        <h3>Career Timeline Gantt Chart</h3>
        <p>
          Interactive Gantt chart showing {experiences.length} professional experiences from {chartData.timeRange.start.getFullYear()} 
          to {chartData.timeRange.end.getFullYear()}. Each position is represented as a horizontal bar showing the duration and dates of employment.
          Current positions are highlighted with a pulsing indicator on the right edge.
        </p>
        <p>
          Navigation: Use Tab key to move between positions chronologically. 
          Press Enter or Space to open detailed information for each position in a modal dialog.
          Scroll horizontally to view the full timeline, with current positions towards the right side.
        </p>
        <p>
          Visual elements: Position bars show job title, company name, and date ranges directly on wider bars. 
          Shorter bars display essential information with detailed tooltips available on hover or focus.
          The timeline shows months and years along the bottom axis with a vertical line indicating today&apos;s date.
          Bar colors indicate employment type as shown in the legend below the chart.
        </p>
      </div>
    </div>
  );
}
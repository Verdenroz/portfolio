"use client";

import React from "react";
import { motion } from "framer-motion";
import { GridLine, TimeRange, dateToPosition } from "./gantt-utils";

interface GanttTimelineProps {
  timeRange: TimeRange;
  gridLines: GridLine[];
  containerWidth: number;
  chartHeight: number;
}

export function GanttTimeline({ 
  timeRange, 
  gridLines, 
  containerWidth, 
  chartHeight 
}: GanttTimelineProps) {
  const currentDate = new Date();
  const currentPosition = dateToPosition(currentDate, timeRange, containerWidth);
  const isCurrentInRange = currentDate >= timeRange.start && currentDate <= timeRange.end;

  return (
    <div className="relative w-full" style={{ height: chartHeight }}>
      {/* Grid Lines */}
      <div 
        className="absolute pointer-events-none top-0"
        style={{ height: chartHeight }}
      >
        {gridLines.map((line, index) => (
          <motion.div
            key={`grid-${index}`}
            className={`absolute top-0 bottom-0 ${
              line.type === 'major' 
                ? 'border-l-2 border-border/60' 
                : 'border-l border-border/30'
            } transform -translate-x-1/2`}
            style={{ left: line.position }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: index * 0.02, duration: 0.3 }}
          >
            {/* Year label at bottom of grid line */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
              <span className={`text-sm font-semibold whitespace-nowrap ${
                line.type === 'major' 
                  ? 'text-foreground' 
                  : 'text-muted-foreground'
              }`}>
                {line.label}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Current Date Indicator */}
      {isCurrentInRange && (
        <motion.div
          className="absolute pointer-events-none z-10 top-0"
          style={{ left: currentPosition, height: chartHeight }}
          initial={{ opacity: 0, scaleY: 0 }}
          animate={{ opacity: 1, scaleY: 1 }}
          transition={{ delay: 0.5, duration: 0.6, type: "spring" }}
        >
          {/* Current date line */}
          <div className="w-0.5 h-full bg-primary/80 relative">
            {/* Current date indicator dot */}
            <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-primary rounded-full border-2 border-background shadow-lg animate-pulse" />
            
            {/* Current date label */}
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground px-2 py-1 rounded text-xs font-medium whitespace-nowrap">
              Today
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
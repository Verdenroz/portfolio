"use client";

import React from "react";
import { motion } from "framer-motion";

// Type colors mapping for legend (matches bar backgrounds)
const LEGEND_TYPE_COLORS = {
  freelance: { bg: "bg-purple-500/70 dark:bg-purple-500/70", label: "Freelance" },
  internship: { bg: "bg-blue-500/70 dark:bg-blue-500/70", label: "Internship" },
  "full-time": { bg: "bg-green-500/70 dark:bg-green-500/70", label: "Full-time" },
  "part-time": { bg: "bg-yellow-500/70 dark:bg-yellow-500/70", label: "Part-time" },
  volunteer: { bg: "bg-pink-500/70 dark:bg-pink-500/70", label: "Volunteer" },
} as const;

interface GanttLegendProps {
  className?: string;
}

export function GanttLegend({ className = "" }: GanttLegendProps) {
  const legendEntries = Object.entries(LEGEND_TYPE_COLORS);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className={`flex flex-wrap items-center justify-center gap-4 md:gap-6 p-4 bg-background/50 backdrop-blur-sm border border-border/50 rounded-lg ${className}`}
    >
      <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
        <span>Employment Types:</span>
      </div>
      
      <div className="flex flex-wrap items-center gap-3 md:gap-4">
        {legendEntries.map(([type, { bg, label }], index) => (
          <motion.div
            key={type}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.4 + index * 0.1 }}
            className="flex items-center gap-2"
          >
            <div 
              className={`w-4 h-4 rounded border border-border/30 shadow-sm ${bg}`}
              aria-hidden="true"
            />
            <span className="text-sm font-medium text-foreground">
              {label}
            </span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
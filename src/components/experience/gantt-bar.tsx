"use client";

import React from "react";
import { motion } from "framer-motion";
import { Calendar, MapPin, Building2 } from "lucide-react";
import { Experience } from "@/types";
import { 
  Sheet, 
  SheetContent, 
  SheetDescription, 
  SheetHeader, 
  SheetTitle, 
  SheetTrigger,
  TechnologyBadge
} from "@/components/ui";
import { 
  formatDateRange, 
  formatDateRangeByType,
  isCurrentPosition, 
  getBarWidthCategory, 
  getContentPriority,
  type BarWidthCategory 
} from "./gantt-utils";

// Experience type color mapping for bar backgrounds - vibrant colors with transparency for softer appearance
const TYPE_COLORS = {
  freelance: "bg-purple-500/70 dark:bg-purple-500/70",
  internship: "bg-blue-500/70 dark:bg-blue-500/70", 
  "full-time": "bg-green-500/70 dark:bg-green-500/70",
  "part-time": "bg-yellow-500/70 dark:bg-yellow-500/70",
  volunteer: "bg-pink-500/70 dark:bg-pink-500/70",
} as const;

// Type colors for modal badges
const TYPE_BADGE_COLORS = {
  freelance: "bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-900/20 dark:text-purple-400 dark:border-purple-800",
  internship: "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800", 
  "full-time": "bg-green-100 text-green-800 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800",
  "part-time": "bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-400 dark:border-yellow-800",
  volunteer: "bg-pink-100 text-pink-800 border-pink-200 dark:bg-pink-900/20 dark:text-pink-400 dark:border-pink-800",
} as const;

interface GanttBarProps {
  experience: Experience;
  x: number;
  width: number;
  track: number;
  trackHeight: number;
  index: number;
  onHover?: (experience: Experience, x: number, y: number) => void;
  onLeave?: () => void;
}

export function GanttBar({ 
  experience, 
  x, 
  width, 
  track, 
  trackHeight, 
  index,
  onHover,
  onLeave
}: GanttBarProps) {
  const isCurrent = isCurrentPosition(experience);
  const typeColor = TYPE_COLORS[experience.type as keyof typeof TYPE_COLORS] || 
    "bg-gray-100 dark:bg-gray-900/20";
  const typeBadgeColor = TYPE_BADGE_COLORS[experience.type as keyof typeof TYPE_BADGE_COLORS] || 
    "bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-900/20 dark:text-gray-400 dark:border-gray-800";
  
  const dateRange = formatDateRange(experience.startDate, experience.endDate);
  const widthCategory = getBarWidthCategory(width);
  const contentPriority = getContentPriority(widthCategory);
  const adaptiveDateRange = formatDateRangeByType(experience.startDate, experience.endDate, contentPriority.dateFormat);

  const barVariants = {
    hidden: { opacity: 0, scaleX: 0 },
    visible: (i: number) => ({
      opacity: 1,
      scaleX: 1,
      transition: {
        delay: i * 0.1,
        duration: 0.8,
        type: "spring",
        stiffness: 100,
      },
    }),
  };

  return (
    <motion.div
      className="absolute"
      style={{
        left: x,
        top: track * (trackHeight + 25),
        width: width,
        height: trackHeight,
        transformOrigin: "left center"
      }}
      variants={barVariants}
      custom={index}
      initial="hidden"
      animate="visible"
    >
      <Sheet>
        <SheetTrigger asChild>
          <motion.div
            whileHover={{ scale: 1.02, y: -2 }}
            className={`group relative h-full w-full rounded-lg shadow-md border cursor-pointer transition-all duration-200 overflow-hidden ${
              isCurrent 
                ? 'border-border' 
                : 'border-border hover:border-primary/30 hover:shadow-lg'
            }`}
            role="button"
            tabIndex={0}
            aria-label={`${experience.position} at ${experience.company}, ${experience.timeframe}`}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                e.currentTarget.click();
              }
            }}
            onMouseEnter={(e) => {
              if (onHover) {
                const rect = e.currentTarget.getBoundingClientRect();
                onHover(experience, rect.left + rect.width / 2, rect.top);
              }
            }}
            onMouseLeave={() => {
              if (onLeave) {
                onLeave();
              }
            }}
          >
            {/* Background with type color */}
            <div className={`absolute inset-0 ${typeColor}`} />
            
            {/* Current position indicator */}
            {isCurrent && (
              <div className="absolute right-0 top-0 bottom-0 w-1 bg-primary animate-pulse" />
            )}
            
            {/* Bar Content - Optimized for Full 100px Height */}
            <div className="relative h-full flex flex-col justify-between p-4">
              {widthCategory === 'xs' ? (
                // Extra small bars - larger type indicator for better visibility
                <div className="flex-1 flex items-center justify-center">
                  <div className="w-6 h-6 rounded-full bg-white/20 border-2 border-white shadow-lg" />
                </div>
              ) : (
                <>
                  {/* Main content area - All text aligned to the right */}
                  <div className="flex-1 min-h-0 flex flex-col justify-center items-end space-y-2 text-right">
                    {/* Position Title - Larger text for better readability */}
                    {contentPriority.showPosition && (
                      <h3 className={`${
                        widthCategory === 'xl' || widthCategory === 'lg' ? 'text-base font-bold' : 'text-sm font-bold'
                      } text-foreground truncate leading-tight`}>
                        {experience.position}
                      </h3>
                    )}
                    
                    {/* Company - Better spacing and sizing */}
                    {contentPriority.showCompany && (
                      <p className={`${
                        widthCategory === 'xl' || widthCategory === 'lg' ? 'text-sm' : 'text-xs'
                      } text-foreground font-semibold truncate opacity-90`}>
                        {experience.company}
                      </p>
                    )}
                    
                    {/* Date Range - More prominent display */}
                    {contentPriority.showDateRange && (
                      <p className={`${
                        widthCategory === 'xl' || widthCategory === 'lg' ? 'text-sm' : 'text-xs'
                      } text-foreground font-semibold truncate bg-black/20 px-2 py-1 rounded opacity-90`}>
                        {adaptiveDateRange}
                      </p>
                    )}
                  </div>
                  
                </>
              )}
            </div>

          </motion.div>
        </SheetTrigger>
        
        {/* Detail Modal - Same as original implementation */}
        <SheetContent side="bottom" className="max-h-[85vh] overflow-y-auto p-6">
          <SheetHeader className="text-left space-y-6 pb-6 border-b border-border">
            <div>
              <SheetTitle className="text-2xl font-bold mb-3 leading-tight">
                {experience.position}
              </SheetTitle>
              <div className="flex items-center gap-3 text-primary font-semibold mb-3">
                <Building2 className="h-5 w-5" />
                <span className="text-lg">{experience.company}</span>
                <span className={`px-3 py-1 rounded-full text-sm font-medium border shadow-sm ${typeBadgeColor}`}>
                  {experience.type}
                </span>
              </div>
            </div>
            
            <div className="flex items-center gap-6 text-muted-foreground">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span className="font-medium">{experience.timeframe}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span className="font-medium">{experience.location}</span>
              </div>
            </div>
          </SheetHeader>
          
          <div className="mt-8 space-y-8">
            <div>
              <h4 className="text-lg font-semibold mb-4 text-foreground">Overview</h4>
              <SheetDescription className="text-base leading-relaxed text-muted-foreground">
                {experience.description}
              </SheetDescription>
            </div>
            
            {experience.achievements.length > 0 && (
              <div>
                <h4 className="text-lg font-semibold mb-4 text-foreground">Key Achievements</h4>
                <ul className="space-y-3">
                  {experience.achievements.map((achievement, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                      <span className="text-muted-foreground leading-relaxed">{achievement}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            <div>
              <h4 className="text-lg font-semibold mb-4 text-foreground">Key Skills & Tools</h4>
              <div className="flex flex-wrap gap-3">
                {experience.technologies.map((tech, idx) => (
                  <TechnologyBadge key={idx} technology={tech} />
                ))}
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </motion.div>
  );
}
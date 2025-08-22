"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Experience } from "@/types";
import { experiencesData } from "@/config/experiences";
import { Carousel } from "@/components/ui";

// Type for filter options
type FilterType = "all" | "internship" | "freelance" | "full-time" | "part-time" | "volunteer";

// Experience type color mapping
const TYPE_COLORS = {
  freelance: "bg-purple-100 text-purple-800 border-purple-200",
  internship: "bg-blue-100 text-blue-800 border-blue-200", 
  "full-time": "bg-green-100 text-green-800 border-green-200",
  "part-time": "bg-yellow-100 text-yellow-800 border-yellow-200",
  volunteer: "bg-pink-100 text-pink-800 border-pink-200",
} as const;

// Experience Card Component (Horizontal Layout)
function ExperienceCard({ 
  experience, 
  index
}: { 
  experience: Experience; 
  index: number;
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const cardVariants = {
    hidden: { opacity: 0, x: 30 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        type: "spring",
        stiffness: 100,
      },
    }),
  };

  const expandVariants = {
    collapsed: { height: 0, opacity: 0 },
    expanded: { 
      height: "auto", 
      opacity: 1,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    },
  };

  const isCurrent = experience.endDate === null;
  const typeColor = TYPE_COLORS[experience.type as keyof typeof TYPE_COLORS] || "bg-gray-100 text-gray-800 border-gray-200";

  return (
    <motion.div
      variants={cardVariants}
      custom={index}
      initial="hidden"
      animate="visible"
      className="relative flex-shrink-0 scroll-snap-align-start"
    >
      {/* Experience Card */}
      <motion.div
        whileHover={{ scale: 1.02, y: -4 }}
        className={`bg-white dark:bg-gray-800 rounded-lg shadow-md border ${
          isCurrent ? 'border-blue-200 shadow-blue-100 ring-2 ring-blue-100' : 'border-gray-200'
        } p-4 md:p-6 w-72 md:w-80 h-80 md:h-96 flex flex-col`}
      >
        {/* Timeline Dot - positioned relative to this card */}
        <div 
          className={`absolute -bottom-6 left-1/2 transform -translate-x-1/2 w-3 h-3 md:w-4 md:h-4 rounded-full border-2 md:border-4 ${
            isCurrent 
              ? 'bg-blue-500 border-blue-200 shadow-lg' 
              : 'bg-white border-gray-400'
          }`}
        />
        {/* Header */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex-1 text-left">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white line-clamp-2">
              {experience.position}
            </h3>
            <p className="text-blue-600 dark:text-blue-400 font-medium">
              {experience.company}
            </p>
          </div>
          
          <span className={`px-2 py-1 rounded-full text-xs font-medium border ${typeColor} whitespace-nowrap flex-shrink-0`}>
            {experience.type}
          </span>
        </div>

        {/* Time and Location */}
        <div className="text-sm text-gray-600 dark:text-gray-400 mb-3">
          <p className="font-medium">{experience.timeframe}</p>
          <p>📍 {experience.location}</p>
        </div>

        {/* Description */}
        <p className="text-gray-700 dark:text-gray-300 text-sm mb-4 line-clamp-3 flex-grow">
          {experience.description}
        </p>

        {/* Technologies */}
        <div className="flex flex-wrap gap-2 mb-4">
          {experience.technologies.slice(0, 3).map((tech, idx) => (
            <span
              key={idx}
              className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded text-xs"
            >
              {tech}
            </span>
          ))}
          {experience.technologies.length > 3 && (
            <span className="px-2 py-1 bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-400 rounded text-xs">
              +{experience.technologies.length - 3}
            </span>
          )}
        </div>

        {/* Expand Button */}
        {experience.achievements.length > 0 && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-blue-600 dark:text-blue-400 text-sm font-medium hover:underline text-left mb-2"
          >
            {isExpanded ? 'Show Less' : 'Show Achievements'}
          </button>
        )}

        {/* Achievements (Expandable) */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              variants={expandVariants}
              initial="collapsed"
              animate="expanded" 
              exit="collapsed"
              className="overflow-hidden"
            >
              <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
                <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                  Key Achievements:
                </h4>
                <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1 list-disc list-inside max-h-24 overflow-y-auto">
                  {experience.achievements.map((achievement, idx) => (
                    <li key={idx} className="text-xs">
                      {achievement}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}

// Filter Button Component
function FilterButton({ 
  type, 
  active, 
  onClick, 
  count 
}: { 
  type: FilterType; 
  active: boolean; 
  onClick: () => void; 
  count: number;
}) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`px-4 py-2 rounded-full text-sm font-medium transition-all border ${
        active
          ? 'bg-blue-600 text-white border-blue-600'
          : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:border-blue-300'
      }`}
    >
      {type === 'all' ? 'All' : type.charAt(0).toUpperCase() + type.slice(1)} ({count})
    </motion.button>
  );
}

// Main Experience Timeline Component
export default function Experience() {
  const [selectedFilter, setSelectedFilter] = useState<FilterType>('all');

  // Process and filter experiences
  const { currentExperiences, pastExperiences, filterCounts } = useMemo(() => {
    const sorted = [...experiencesData].sort(
      (a, b) => b.startDate.getTime() - a.startDate.getTime()
    );

    const current = sorted.filter(exp => exp.endDate === null);
    const past = sorted.filter(exp => exp.endDate !== null);

    // Apply filter
    const filterExperiences = (experiences: Experience[]) => {
      return selectedFilter === 'all' 
        ? experiences 
        : experiences.filter(exp => exp.type === selectedFilter);
    };

    const filteredCurrent = filterExperiences(current);
    const filteredPast = filterExperiences(past);

    // Calculate filter counts
    const counts: Record<FilterType, number> = {
      all: experiencesData.length,
      internship: experiencesData.filter(exp => exp.type === 'internship').length,
      freelance: experiencesData.filter(exp => exp.type === 'freelance').length,
      'full-time': experiencesData.filter(exp => exp.type === 'full-time').length,
      'part-time': experiencesData.filter(exp => exp.type === 'part-time').length,
      volunteer: experiencesData.filter(exp => exp.type === 'volunteer').length,
    };

    return {
      currentExperiences: filteredCurrent,
      pastExperiences: filteredPast,
      filterCounts: counts
    };
  }, [selectedFilter]);

  const allFilteredExperiences = [...currentExperiences, ...pastExperiences];

  return (
    <section id="experience" className="py-20">
      <div className="container mx-auto px-4 w-full">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Work Experience
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            My professional journey spanning {new Set(experiencesData.map(e => e.startDate.getFullYear())).size} years 
            across {experiencesData.length} positions in various roles and industries.
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {Object.entries(filterCounts).map(([type, count]) => (
            count > 0 && (
              <FilterButton
                key={type}
                type={type as FilterType}
                active={selectedFilter === type}
                onClick={() => setSelectedFilter(type as FilterType)}
                count={count}
              />
            )
          ))}
        </motion.div>

        {/* Horizontal Timeline */}
        <div className="relative">
          {/* No results message */}
          {allFilteredExperiences.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <p className="text-gray-500 dark:text-gray-400">
                No experiences found for the selected filter.
              </p>
            </motion.div>
          )}

          {/* Timeline Container */}
          {allFilteredExperiences.length > 0 && (
            <div className="relative">
              {/* Experience Carousel */}
              <div className="relative">
                <Carousel
                  id="experience-carousel"
                  scrollAmount={400}
                  gap="gap-x-6"
                  padding="px-[calc(25vw-18rem/2-12px)] pb-8"
                  ariaLabel="Experience Timeline Carousel"
                  enableMotion={true}
                  controlsPosition="absolute"
                >
                  {/* Current Experiences */}
                  {currentExperiences.map((exp, idx) => (
                    <ExperienceCard
                      key={exp.id}
                      experience={exp}
                      index={idx}
                    />
                  ))}
                  
                  {/* Separator between current and past */}
                  {currentExperiences.length > 0 && pastExperiences.length > 0 && (
                    <div className="flex flex-col items-center justify-center w-16 flex-shrink-0 relative">
                      <div className="w-0.5 h-16 bg-gray-300 dark:bg-gray-600"></div>
                      <span className="text-xs text-gray-400 mt-2 transform -rotate-90 whitespace-nowrap">Past</span>
                      {/* Separator timeline dot */}
                      <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 w-2 h-2 md:w-3 md:h-3 rounded-full bg-gray-400 border-2 border-gray-300"></div>
                    </div>
                  )}
                  
                  {/* Past Experiences */}
                  {pastExperiences.map((exp, idx) => (
                    <ExperienceCard
                      key={exp.id}
                      experience={exp}
                      index={idx + currentExperiences.length}
                    />
                  ))}
                </Carousel>

                {/* Horizontal Timeline Line */}
                <div className="absolute -bottom-3 left-0 right-0 h-0.5 bg-gray-300 dark:bg-gray-600 mx-4"></div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
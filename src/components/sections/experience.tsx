"use client";

import React, { useMemo } from "react";
import { motion } from "framer-motion";
import type { Experience } from "@/types";
import { experiencesData } from "@/config/experiences";
import { GanttChart } from "@/components/experience/gantt-chart";

// Removed filter functionality

// Main Experience Timeline Component
export default function Experience() {
  // Process experiences without filtering
  const allExperiences = useMemo(() => {
    return [...experiencesData].sort(
      (a, b) => b.startDate.getTime() - a.startDate.getTime()
    );
  }, []);

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
            Professional Experience
          </h2>
        </motion.div>


        {/* Gantt Chart */}
        <div className="relative">
          {/* Gantt Chart Container */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <GanttChart experiences={allExperiences} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
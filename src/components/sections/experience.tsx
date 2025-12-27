"use client";

import { useMemo } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import type { Experience } from "@/types";
import { experiencesData } from "@/config/experiences";
import { SkillBadgeWithFallback } from "@/components/ui";

// Calculate duration in months
function getDurationMonths(startDate: Date, endDate: Date | null): number {
  const end = endDate || new Date();
  const months = (end.getFullYear() - startDate.getFullYear()) * 12 +
                 (end.getMonth() - startDate.getMonth());
  return Math.max(1, months);
}

// Determine grid size based on duration
function getGridSize(months: number): "large" | "medium" | "small" {
  if (months >= 6) return "large";
  if (months >= 3) return "medium";
  return "small";
}

const gridSizeClasses = {
  large: "md:col-span-2 md:row-span-2",
  medium: "md:col-span-1 md:row-span-2",
  small: "md:col-span-1 md:row-span-2", // min 2 rows to show image
};

function ExperienceCard({
  experience,
  index,
  size
}: {
  experience: Experience;
  index: number;
  size: "large" | "medium" | "small";
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className={`group relative overflow-hidden rounded-xl bg-card border border-border hover:border-primary/30 transition-all ${gridSizeClasses[size]}`}
    >
      {/* Background Image */}
      <div className="absolute inset-0 bg-[#0a0a0a]">
        <Image
          src={experience.image}
          alt={experience.company}
          fill
          quality={90}
          className="object-contain p-4 sm:p-6 md:p-8 transition-transform duration-500 group-hover:scale-105"
          sizes={size === "large" ? "(max-width: 768px) 100vw, 50vw" : "(max-width: 768px) 100vw, 25vw"}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/40 to-black/20 md:from-black/90 md:via-black/50" />
      </div>

      {/* Content Overlay */}
      <div className="relative h-full flex flex-col justify-end p-4 sm:p-5 overflow-hidden">
        <div className="rounded-lg bg-black/60 backdrop-blur-sm p-4 md:rounded-none md:bg-transparent md:backdrop-blur-none md:p-0">
          {/* Header - always visible */}
          <div className="mb-2">
            <p className="text-sm text-neutral-300 mb-1">{experience.timeframe}</p>
            <h3 className={`font-bold text-white mb-1 ${size === "small" ? "text-lg" : "text-xl"}`}>
              {experience.position}
            </h3>
            <p className="text-primary font-semibold">{experience.company}</p>
          </div>

          {/* Description - always visible on mobile, hover-revealed on desktop */}
          <div className="max-h-40 overflow-hidden transition-all duration-300 ease-out md:max-h-0 md:group-hover:max-h-40">
            <p className="text-sm text-neutral-200 py-2 line-clamp-4 md:line-clamp-3">
              {experience.description}
            </p>
          </div>

          {/* Tech badges - always visible */}
          <div className="flex flex-wrap gap-1.5 mt-2">
            {experience.technologies.slice(0, size === "large" ? 5 : size === "medium" ? 3 : 2).map((tech) => (
              <SkillBadgeWithFallback
                key={tech}
                skillName={tech}
                skillSlug={tech.toLowerCase().replace(/\s+/g, "")}
                width={70}
                height={20}
                className="h-5 w-auto"
              />
            ))}
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export default function Experience() {
  const experiencesWithSize = useMemo(() => {
    return experiencesData
      .map(exp => ({
        ...exp,
        duration: getDurationMonths(exp.startDate, exp.endDate),
        size: getGridSize(getDurationMonths(exp.startDate, exp.endDate)),
      }))
      .sort((a, b) => b.startDate.getTime() - a.startDate.getTime());
  }, []);

  return (
    <section id="experience" className="py-16">
      <div className="container mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold text-center text-primary mb-10"
        >
          Experience
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 max-w-6xl mx-auto auto-rows-[260px] sm:auto-rows-[240px] md:auto-rows-[200px]">
          {experiencesWithSize.map((experience, index) => (
            <ExperienceCard
              key={experience.id}
              experience={experience}
              index={index}
              size={experience.size}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";

import { useState, useEffect } from "react";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
  ResponsiveContainer,
} from "recharts";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Skill } from "@/types";
import { useIsMobile } from "@/hooks/use-mobile";

const skills: Skill[] = [
  {
    name: "Full Stack",
    level: 60,
    badges: [
      { name: "React", slug: "react" },
      { name: "Next.js", slug: "nextdotjs" },
      { name: "Node.js", slug: "nodedotjs" },
      { name: "Express", slug: "express" },
    ],
  },
  {
    name: "Mobile Dev",
    level: 70,
    badges: [
      { name: "Android", slug: "android" },
      { name: "Kotlin", slug: "kotlin" },
    ],
  },
  {
    name: "Cloud",
    level: 50,
    badges: [
      { name: "AWS", slug: "amazonwebservices" },
      { name: "Google Cloud", slug: "googlecloud" },
      { name: "Firebase", slug: "firebase" },
      { name: "Docker", slug: "docker" },
    ],
  },
  {
    name: "Databases",
    level: 50,
    badges: [
      { name: "PostgreSQL", slug: "postgresql" },
      { name: "MySQL", slug: "mysql" },
      { name: "Redis", slug: "redis" },
    ],
  },
  {
    name: "UI/UX",
    level: 40,
    badges: [{ name: "Figma", slug: "figma" }],
  },
];

const AxisTick = ({ x, y, payload, onSkillClick, isSelected, isMobile }: {
  x: number;
  y: number;
  payload: any;
  onSkillClick: (skillName: string) => void;
  isSelected: boolean;
  isMobile: boolean;
}) => {
  const angleRad = Math.atan2(y, x);
  const angleDeg = (angleRad * 180) / Math.PI;

  let adjustedX = x;
  let adjustedY = y;

  // Adjust positions based on the label's location
  if (!isMobile) {
    switch (payload.value) {
      case "Full Stack": // Top
        break;
      case "Mobile Dev": // Top Right
        adjustedX += 20;
        adjustedY -= 10;
        break;
      case "Cloud": // Bottom Right
        adjustedX += 10;
        adjustedY += 10;
        break;
      case "Databases": // Bottom
        adjustedX -= 40;
        adjustedY += 10;
        break;
      case "UI/UX": // Bottom Left
        adjustedX -= 35;
        adjustedY -= 5;
        break;
    }
  }

  // Determine text alignment based on position
  let textAnchor = "middle";
  if (angleDeg > 45 && angleDeg < 135) {
    textAnchor = "start";
  } else if (angleDeg < -45 && angleDeg > -135) {
    textAnchor = "end";
  }

  return (
    <g transform={`translate(${adjustedX},${adjustedY})`}>
      {isSelected ? (
        <>
          <defs>
            <linearGradient id={`labelGradient-${payload.value.replace(/\s+/g, '_')}`} x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#22c55e" />
            </linearGradient>
          </defs>
          <text
            x={0}
            y={0}
            textAnchor={textAnchor}
            fill={`url(#labelGradient-${payload.value.replace(/\s+/g, '_')})`}
            className={`${isMobile ? 'text-xs' : 'text-sm'} cursor-pointer transition-all duration-200 hover:scale-110 font-bold`}
            onClick={() => onSkillClick(payload.value)}
          >
            {payload.value}
          </text>
        </>
      ) : (
        <text
          x={0}
          y={0}
          textAnchor={textAnchor}
          fill="hsl(var(--foreground))"
          className={`${isMobile ? 'text-xs' : 'text-sm'} cursor-pointer transition-all duration-200 hover:scale-110`}
          onClick={() => onSkillClick(payload.value)}
        >
          {payload.value}
        </text>
      )}
    </g>
  );
};

export default function Skills() {
  const [selectedSkillIndex, setSelectedSkillIndex] = useState(0);
  const selectedSkill = skills[selectedSkillIndex];
  const isMobile = useIsMobile();

  const handleSkillClick = (skillName: string) => {
    const index = skills.findIndex((s) => s.name === skillName);
    setSelectedSkillIndex(index);
  };

  const handlePrevSkill = () => {
    setSelectedSkillIndex((prev) =>
      prev === 0 ? skills.length - 1 : prev - 1
    );
  };

  const handleNextSkill = () => {
    setSelectedSkillIndex((prev) =>
      prev === skills.length - 1 ? 0 : prev + 1
    );
  };

  // Force a re-render when the screen size changes
  const [, setSize] = useState([0, 0]);
  useEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  return (
    <section id="skills" className="py-10 md:py-20 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-6 md:mb-10 text-primary">
          Skills
        </h2>
        <div className="flex flex-col items-center">
          <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl h-64 sm:h-72 md:h-80 lg:h-96 mb-8">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={skills}>
                <defs>
                  <linearGradient id="gradient" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#3b82f6" />
                    <stop offset="100%" stopColor="#22c55e" />
                  </linearGradient>
                </defs>
                <PolarGrid />
                <PolarAngleAxis
                  dataKey="name"
                  tick={(props) => (
                    <AxisTick
                      {...props}
                      onSkillClick={handleSkillClick}
                      isSelected={props.payload.value === selectedSkill.name}
                      isMobile={isMobile}
                    />
                  )}
                />
                <Radar
                  name="Skills"
                  dataKey="level"
                  stroke="url(#gradient)"
                  fill="url(#gradient)"
                  fillOpacity={0.5}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
          {selectedSkill && (
            <div className="flex flex-col items-center text-center mb-8 w-full md:w-2/3 lg:w-1/3">
            <div className="relative flex items-center justify-center gap-4 mb-2 w-full px-12 sm:px-16 md:px-0">
              <button
                onClick={handlePrevSkill}
                className="absolute left-2 sm:left-4 md:left-0 p-2 rounded-full hover:bg-secondary transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <h3 className="text-lg md:text-xl font-semibold truncate">
                {selectedSkill.name}
              </h3>
              <button
                onClick={handleNextSkill}
                className="absolute right-2 sm:right-4 md:right-0 p-2 rounded-full hover:bg-secondary transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
              <div className="w-full md:w-2/3 h-4 bg-secondary rounded-full mb-4 overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{
                    background:
                      "linear-gradient(90deg, #3b82f6 0%, #22c55e 100%)",
                  }}
                  initial={{ width: 0 }}
                  animate={{ width: `${selectedSkill.level}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedSkill.name}
                  className="flex flex-wrap justify-center gap-2 md:gap-3"
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  variants={{
                    hidden: { opacity: 0 },
                    visible: {
                      opacity: 1,
                    },
                  }}
                >
                  {selectedSkill.badges.map((badge, index) => (
                    <motion.img
                      key={index}
                      variants={{
                        hidden: { opacity: 0, y: 20 },
                        visible: { opacity: 1, y: 0 },
                      }}
                      src={`https://img.shields.io/badge/${badge.name}-333333?style=for-the-badge&logo=${badge.slug}`}
                      alt={badge.name}
                      className="h-6 md:h-8 transition-transform hover:scale-105"
                    />
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}


"use client";

import React, { useState, useRef, useEffect } from "react";
import type { ReactNode } from "react";
import {
  motion,
  useInView,
  useAnimation,
  AnimatePresence,
} from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useTilt } from "@/hooks/use-tilt";

export type Badge = {
  name: string;
  slug: string;
  slugOverride?: string;
  description: string;
  proficiency: "Proficient" | "Familiar" | "Learning";
};

export type Category = {
  name: string;
  color: string; // accent color (hex)
  badges: Badge[];
};

const categories: Category[] = [
  {
    name: "Languages",
    color: "F97316",
    badges: [
      {
        name: "Kotlin",
        slug: "kotlin",
        description: "Modern JVM language",
        proficiency: "Proficient",
      },
      {
        name: "Python",
        slug: "python",
        description: "High-level multiparadigm language",
        proficiency: "Proficient",
      },
      {
        name: "Java",
        slug: "java",
        slugOverride:
          "https://cdn.jsdelivr.net/npm/simple-icons@6/icons/java.svg",
        description: "Object-oriented programming (JVM)",
        proficiency: "Familiar",
      },
      {
        name: "TypeScript",
        slug: "typescript",
        description: "Type-safe JavaScript",
        proficiency: "Familiar",
      },
      {
        name: "JavaScript",
        slug: "javascript",
        description: "Dynamic language for web development",
        proficiency: "Familiar",
      },
      {
        name: "SQL",
        slug: "postgresql/4F8EF7",
        description: "Structured query language for relational databases",
        proficiency: "Familiar",
      },
      {
        name: "Rust",
        slug: "rust/FF0000",
        description: "Systems programming language",
        proficiency: "Learning",
      },
    ],
  },
  {
    name: "Web · API",
    color: "3B82F6",
    badges: [
      {
        name: "React",
        slug: "react",
        description: "JavaScript library for building UIs",
        proficiency: "Proficient",
      },
      {
        name: "Next.js",
        slug: "nextdotjs",
        description: "Fullstack React framework",
        proficiency: "Proficient",
      },
                  {
        name: "TailwindCSS",
        slug: "tailwindcss",
        description: "Utility-first CSS framework",
        proficiency: "Proficient",
      },
      {
        name: "FastAPI",
        slug: "fastapi",
        description: "Modern web framework for Python",
        proficiency: "Proficient",
      },
      {
        name: "Express",
        slug: "express",
        description: "Minimal Node.js web server",
        proficiency: "Familiar",
      },
      {
        name: "MUI",
        slug: "mui",
        description: "Material Design component library for React",
        proficiency: "Familiar",
      },
    ],
  },
  {
    name: "Mobile · Android",
    color: "14B8A6",
    badges: [
      {
        name: "Android",
        slug: "android",
        description: "Native Android SDK for mobile apps",
        proficiency: "Proficient",
      },
      {
        name: "Jetpack Compose",
        slug: "jetpackcompose",
        description: "Modern UI toolkit for Android",
        proficiency: "Proficient",
      },
      {
        name: "Gradle",
        slug: "gradle/20976C",
        description: "Build automation tool",
        proficiency: "Familiar",
      },
      {
        name: "Flows & Coroutines",
        slug: "kotlin",
        description: "Asynchronous programming in Kotlin",
        proficiency: "Familiar",
      },
      {
        name: "Hilt & Dagger",
        slug: "google",
        description: "Android dependency injection libraries",
        proficiency: "Familiar",
      },
      {
        name: "Room",
        slug: "sqlite/4F8EF7",
        description: "Abstracted SQLite database",
        proficiency: "Familiar",
      },
      {
        name: "Google Play",
        slug: "googleplay/34D399",
        description: "Android app distribution platform",
        proficiency: "Learning",
      },
    ],
  },
  {
    name: "Cloud · DevOps",
    color: "6366F1",
    badges: [
      {
        name: "Firebase",
        slug: "firebase",
        description: "Google's serverless backend",
        proficiency: "Proficient",
      },
      {
        name: "Pinecone",
        slug: "pinecone",
        slugOverride: "https://www.pinecone.io/favicon.ico",
        description: "Managed vector database",
        proficiency: "Proficient",
      },
      {
        name: "Docker",
        slug: "docker",
        description: "Containerization platform",
        proficiency: "Familiar",
      },
      {
        name: "Redis",
        slug: "redis",
        description: "Low latency key-value store",
        proficiency: "Familiar",
      },
      {
        name: "AWS",
        slug: "amazonwebservices/FF9900",
        description: "Amazon's cloud computing platform",
        proficiency: "Familiar",
      },
      {
        name: "Google Cloud",
        slug: "googlecloud",
        description: "Google's cloud computing platform",
        proficiency: "Learning",
      },
    ],
  },
  {
    name: "AI · ML",
    color: "8B5CF6",
    badges: [
      {
        name: "LangChain",
        slug: "langchain/20976C",
        description: "LLM application framework",
        proficiency: "Proficient",
      },
      {
        name: "LangGraph",
        slug: "langgraph/20976C",
        description: "LLM orchestration framework",
        proficiency: "Proficient",
      },
      {
        name: "PyTorch",
        slug: "pytorch",
        description: "Neural network library",
        proficiency: "Familiar",
      },
      {
        name: "Hugging Face",
        slug: "huggingface",
        description: "Open-source NLP model hub",
        proficiency: "Familiar",
      },
      {
        name: "OpenAI",
        slug: "openai",
        description: "Provider of LLM APIs",
        proficiency: "Familiar",
      },
      {
        name: "TensorFlow",
        slug: "tensorflow",
        description: "Machine learning library",
        proficiency: "Learning",
      },
    ],
  },
  {
    name: "Design · Testing",
    color: "EC4899",
    badges: [
      {
        name: "Pytest",
        slug: "pytest",
        description: "Python testing framework",
        proficiency: "Proficient",
      },
      {
        name: "Material Design",
        slug: "materialdesign/000000",
        description: "Google's design system",
        proficiency: "Proficient",
      },
      {
        name: "Figma",
        slug: "figma",
        description: "Collaborative interface design tool",
        proficiency: "Familiar",
      },
      {
        name: "JUnit",
        slug: "junit5",
        description: "Java testing framework",
        proficiency: "Familiar",
      },
    ],
  },
];

// ——— Motion variants ———
const floatTransition = {
  duration: 3,
  ease: "easeInOut" as const,
  repeat: Infinity,
  repeatType: "reverse" as const,
};
const badgeVariants = {
  hidden: { opacity: 0, scale: 0.8, y: 8 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      delay: i * 0.05,
      duration: 0.3,
      type: "spring",
      stiffness: 300,
      damping: 24,
    },
  }),
  idle: { y: [0, -6, 0], transition: { ...floatTransition, duration: 2 } },
  exit: { opacity: 0, scale: 0.8, y: 8, transition: { duration: 0.2 } },
};
const categoryVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, type: "spring", stiffness: 300, damping: 24 },
  }),
  exit: (i: number) => ({
    opacity: 0,
    y: 40,
    transition: { delay: i * 0.05, duration: 0.3 },
  }),
};

// ——— Badge component with tooltip showing proficiency ———
function BadgeLogo({
  badge,
  index = 0,
  idle = false,
}: {
  badge: Badge;
  index?: number;
  idle?: boolean;
}): ReactNode {
  const proficiencyColor = {
    Proficient: "bg-green-500 text-white",
    Familiar: "bg-blue-500 text-white",
    Learning: "bg-yellow-500 text-white",
  } as const;

  const badgeSlug =
    badge.slugOverride || `https://cdn.simpleicons.org/${badge.slug}`;

  return (
    <motion.div
      variants={badgeVariants}
      custom={index}
      initial="hidden"
      animate={idle ? "idle" : "visible"}
      exit="exit"
      whileHover={{ scale: 1.1 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      className="relative group select-none flex-shrink-0"
    >
      <div
        className="h-12 w-20 flex flex-col items-center justify-center rounded-lg border backdrop-blur-sm
        dark:bg-gray-500/50 dark:border-gray-500/30
        bg-gray-100/70 border-gray-200/60"
      >
        <div className="flex items-center justify-center h-6 w-6 mb-1">
          <Image
            key={badge.slug}
            src={badgeSlug}
            alt={badge.name}
            title={badge.name}
            width={24}
            height={24}
            className="object-contain"
          />
        </div>
        <span
          className="text-xs font-medium truncate w-full text-center px-1
          dark:text-white/90 text-gray-800"
        >
          {badge.name}
        </span>
      </div>

      <motion.div
        className="absolute z-50 pointer-events-none left-1/2 bottom-full mb-2 -translate-x-1/2 whitespace-nowrap rounded-md px-3 py-2 text-xs opacity-0 group-hover:opacity-100
          dark:bg-gray-800 dark:text-gray-200
          bg-white text-gray-800 shadow-md"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 24, delay: 0.1 }}
      >
        <p className="mb-1 font-semibold">{badge.name}</p>
        <p className="mb-1">{badge.description}</p>
        <span
          className={`inline-block rounded-full px-2 py-0.5 text-[10px] font-medium ${
            proficiencyColor[badge.proficiency]
          }`}
        >
          {badge.proficiency}
        </span>
      </motion.div>
    </motion.div>
  );
}

// ——— Idle badges animation ———
function IdleBadges({ active }: { active: boolean }) {
  const [set, setSet] = useState<Badge[]>([]);
  const controls = useAnimation();
  useEffect(() => {
    if (active) return;
    const all = categories.flatMap((c) => c.badges);
    setSet([...all].sort(() => 0.5 - Math.random()).slice(0, 6));
    controls.start("visible");
    const iv = setInterval(() => {
      controls.start("exit").then(() => {
        setSet([...all].sort(() => 0.5 - Math.random()).slice(0, 6));
        controls.start("visible");
      });
    }, 6000);
    return () => clearInterval(iv);
  }, [active]);
  if (active) return null;
  return (
    <motion.div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      <div className="relative h-64 w-64">
        {set.map((b, i) => (
          <motion.div
            key={i}
            variants={badgeVariants}
            custom={i}
            initial="hidden"
            animate="visible"
            exit="hidden"
            style={{
              top: `${20 + Math.random() * 60}%`,
              left: `${20 + Math.random() * 60}%`,
            }}
            className="absolute"
          >
            <BadgeLogo badge={b} index={i} idle />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

// ——— Category Card ———
function CategoryCard({
  cat,
  index,
  selected,
}: {
  cat: Category;
  index: number;
  selected: boolean;
}): ReactNode {
  const controls = useAnimation();
  const { ref, rotateX, rotateY, onMove, onLeave } = useTilt(8);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (inView) controls.start("visible");
  }, [inView, controls]);

  const groups = {
    Proficient: cat.badges.filter((b) => b.proficiency === "Proficient"),
    Familiar: cat.badges.filter((b) => b.proficiency === "Familiar"),
    Learning: cat.badges.filter((b) => b.proficiency === "Learning"),
  };

  return (
    <motion.div
      ref={ref}
      style={{ rotateX, rotateY }}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      initial="hidden"
      animate={controls}
      exit="exit"
      variants={categoryVariants}
      custom={index}
      className={`relative w-96 flex-shrink-0 overflow-visible rounded-2xl p-px z-0 hover:z-50 ${
        selected ? "z-30" : ""
      }`}
    >
      <div
        className="absolute inset-0 -z-10 rounded-2xl"
        style={{
          background: `linear-gradient(135deg, #${cat.color}80 0%, #${cat.color}40 100%)`,
        }}
      />
      <div className="relative p-8 rounded-2xl">
        <h3 className="mb-6 text-xl font-semibold text-foreground">
          {cat.name}
        </h3>
        <div className="space-y-6">
          {Object.entries(groups).map(
            ([level, badges]) =>
              badges.length > 0 && (
                <div key={level}>
                  <h4 className="mb-3 text-sm font-medium text-muted-foreground uppercase">
                    {level}
                  </h4>
                  <div className="flex flex-wrap gap-3 items-start">
                    {badges.map((b, i) => (
                      <BadgeLogo key={b.slug} badge={b} index={i} />
                    ))}
                  </div>
                </div>
              )
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function SkillsSection(): ReactNode {
  const [activeCats, setActiveCats] = useState<string[]>([]);
  const carouselRef = useRef<HTMLDivElement>(null);

  const toggleCat = (name: string) =>
    setActiveCats((prev) =>
      prev.includes(name) ? prev.filter((x) => x !== name) : [...prev, name]
    );

  const filtered = activeCats.length
    ? categories.filter((c) => activeCats.includes(c.name))
    : categories;

  const scroll = (dir: "left" | "right") => {
    if (!carouselRef.current) return;
    carouselRef.current.scrollBy({
      left: dir === "left" ? -300 : 300,
      behavior: "smooth",
    });
  };

  return (
    <section
      id="skills"
      className="relative mx-auto w-full py-24 px-6 min-h-[600px]"
    >
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-16 text-center text-4xl font-bold text-primary"
      >
        Skills &amp; Tools
      </motion.h2>

      <IdleBadges active={!!activeCats.length} />

      <div className="mx-auto mb-8 flex flex-wrap justify-center gap-3 px-2 scrollbar-hide">
        {categories.map((c, i) => (
          <motion.button
            key={c.name}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, duration: 0.4 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => toggleCat(c.name)}
            className={`inline-block rounded-full border px-5 py-2 text-sm transition-colors ${
              activeCats.includes(c.name)
                ? "border-transparent bg-primary text-background"
                : "border-muted text-foreground hover:bg-muted/20"
            }`}
          >
            {c.name}
          </motion.button>
        ))}
      </div>

      {/* Carousel controls */}
      <div className="relative">
        <div className="sticky w-full flex justify-between items-center mb-4">
          <button
            type="button"
            onClick={() => scroll("left")}
            title="Previous skill slide"
            aria-controls="skills-carousel"
            className="pointer-events-auto z-20 aspect-square h-fit rounded-full border-2 border-neutral-400 bg-neutral-950/95 p-4 text-neutral-50 shadow-lg backdrop-blur-sm transition-all hover:border-neutral-300 hover:bg-neutral-900 disabled:cursor-not-allowed disabled:opacity-50 supports-[backdrop-filter]:bg-neutral-950/90"
          >
            <ChevronLeft className="size-5" />
          </button>
          <button
            type="button"
            onClick={() => scroll("right")}
            title="Next skill slide"
            aria-controls="skills-carousel"
            className="pointer-events-auto z-20 aspect-square h-fit rounded-full border-2 border-neutral-400 bg-neutral-950/95 p-4 text-neutral-50 shadow-lg backdrop-blur-sm transition-all hover:border-neutral-300 hover:bg-neutral-900 disabled:cursor-not-allowed disabled:opacity-50 supports-[backdrop-filter]:bg-neutral-950/90"
          >
            <ChevronRight className="size-5" />
          </button>
        </div>
        <motion.div
          ref={carouselRef}
          className="flex gap-10 overflow-x-auto pb-6 scrollbar-hide"
        >
          <AnimatePresence initial={false} mode="popLayout">
            {filtered.map((cat, i) => (
              <CategoryCard
                key={cat.name}
                cat={cat}
                index={i}
                selected={activeCats.includes(cat.name)}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

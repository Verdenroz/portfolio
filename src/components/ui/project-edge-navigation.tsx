"use client";

import React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./button";
import { useProjectNavigation } from "@/hooks/use-project-navigation";
import { createSlug } from "@/lib/projects";
import type { Project } from "@/types";

interface ProjectEdgeNavigationProps {
  prev: Project | null;
  next: Project | null;
}

export function ProjectEdgeNavigation({ prev, next }: ProjectEdgeNavigationProps) {
  const {
    isLeftHovered,
    isRightHovered,
    isMobile,
    handleLeftHover,
    handleRightHover,
    hasNavigation
  } = useProjectNavigation({ prev, next });

  if (!hasNavigation) return null;

  // Mobile floating action buttons
  if (isMobile) {
    return (
      <div className="fixed bottom-6 left-0 right-0 z-50 pointer-events-none">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            {/* Previous button */}
            {prev && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="pointer-events-auto"
              >
                <Button
                  asChild
                  size="lg"
                  className="h-14 w-14 rounded-full bg-background/80 backdrop-blur-lg
                           border border-border/50 shadow-lg hover:shadow-xl
                           text-foreground hover:bg-primary hover:text-primary-foreground
                           transition-all duration-300"
                >
                  <Link href={`/projects/${createSlug(prev.title)}`} aria-label={`Previous project: ${prev.title}`}>
                    <ChevronLeft className="h-6 w-6" />
                  </Link>
                </Button>
              </motion.div>
            )}

            {/* Next button */}
            {next && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="pointer-events-auto"
              >
                <Button
                  asChild
                  size="lg"
                  className="h-14 w-14 rounded-full bg-background/80 backdrop-blur-lg
                           border border-border/50 shadow-lg hover:shadow-xl
                           text-foreground hover:bg-primary hover:text-primary-foreground
                           transition-all duration-300"
                >
                  <Link href={`/projects/${createSlug(next.title)}`} aria-label={`Next project: ${next.title}`}>
                    <ChevronRight className="h-6 w-6" />
                  </Link>
                </Button>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Desktop edge navigation
  return (
    <div className="fixed inset-0 z-40 pointer-events-none">
      {/* Left edge trigger */}
      {prev && (
        <div className="fixed left-0 top-0 h-screen w-96 pointer-events-auto">
          <div
            className="h-full w-full"
            onMouseEnter={() => handleLeftHover(true)}
            onMouseLeave={() => handleLeftHover(false)}
          >
            <AnimatePresence>
              {isLeftHovered && (
                <>
                  {/* Left semicircle backdrop overlay with background image */}
                  <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="fixed left-0 top-0 h-screen w-96 cursor-pointer border-0 p-0 bg-transparent"
                    style={{
                      backgroundImage: `url(${prev.image})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      clipPath: 'circle(480px at 0% 50%)'
                    }}
                    onClick={() => window.location.href = `/projects/${createSlug(prev.title)}`}
                    aria-label={`Navigate to previous project: ${prev.title}`}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        window.location.href = `/projects/${createSlug(prev.title)}`;
                      }
                    }}
                  />
                  
                  {/* Gradient overlay for readability */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="fixed left-0 top-0 h-screen w-96 bg-gradient-to-r from-black/60 via-black/40 to-black/20 backdrop-blur-sm pointer-events-none"
                    style={{
                      clipPath: 'circle(480px at 0% 50%)'
                    }}
                  />
                  
                  {/* Navigation card */}
                  <motion.div
                    initial={{ opacity: 0, x: -200 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -200 }}
                    transition={{ 
                      type: "spring", 
                      stiffness: 300, 
                      damping: 30,
                      opacity: { duration: 0.2 }
                    }}
                    className="fixed left-18 top-1/4 -translate-x-1/2 -translate-y-1/2 w-80 z-50"
                  >
                    <Link 
                      href={`/projects/${createSlug(prev.title)}`}
                      className="block group cursor-pointer"
                      aria-label={`Previous project: ${prev.title}`}
                    >
                      <div className="bg-background/20 backdrop-blur-md border border-white/20 
                                    rounded-2xl p-8 shadow-2xl hover:shadow-3xl
                                    hover:border-white/30 transition-all duration-300
                                    hover:bg-background/30">
                        <div className="flex items-center gap-3 mb-6">
                          <ArrowLeft className="h-6 w-6 text-white group-hover:text-primary transition-colors" />
                          <span className="text-sm font-medium text-white/80">Previous Project</span>
                        </div>
                        
                        <div className="space-y-4">
                          <h3 className="text-2xl font-bold text-white group-hover:text-primary 
                                       transition-colors line-clamp-2">
                            {prev.title}
                          </h3>
                          
                          <p className="text-base text-white/90 line-clamp-4 leading-relaxed">
                            {prev.description}
                          </p>
                          
                          <div className="pt-2">
                            <span className="text-sm text-white/70 font-medium">Click to explore →</span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
        </div>
      )}

      {/* Right edge trigger */}
      {next && (
        <div className="fixed right-0 top-0 h-screen w-96 pointer-events-auto">
          <div
            className="h-full w-full"
            onMouseEnter={() => handleRightHover(true)}
            onMouseLeave={() => handleRightHover(false)}
          >
            <AnimatePresence>
              {isRightHovered && (
                <>
                  {/* Right semicircle backdrop overlay with background image */}
                  <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="fixed right-0 top-0 h-screen w-96 cursor-pointer border-0 p-0 bg-transparent"
                    style={{
                      backgroundImage: `url(${next.image})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      clipPath: 'circle(480px at 100% 50%)'
                    }}
                    onClick={() => window.location.href = `/projects/${createSlug(next.title)}`}
                    aria-label={`Navigate to next project: ${next.title}`}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        window.location.href = `/projects/${createSlug(next.title)}`;
                      }
                    }}
                  />
                  
                  {/* Gradient overlay for readability */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="fixed right-0 top-0 h-screen w-96 bg-gradient-to-l from-black/60 via-black/40 to-black/20 backdrop-blur-sm pointer-events-none"
                    style={{
                      clipPath: 'circle(480px at 100% 50%)'
                    }}
                  />
                  
                  {/* Navigation card */}
                  <motion.div
                    initial={{ opacity: 0, x: 200 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 200 }}
                    transition={{ 
                      type: "spring", 
                      stiffness: 300, 
                      damping: 30,
                      opacity: { duration: 0.2 }
                    }}
                    className="fixed right-18 top-1/4 translate-x-1/2 -translate-y-1/2 w-80 z-50"
                  >
                    <Link 
                      href={`/projects/${createSlug(next.title)}`}
                      className="block group cursor-pointer"
                      aria-label={`Next project: ${next.title}`}
                    >
                      <div className="bg-background/20 backdrop-blur-md border border-white/20 
                                    rounded-2xl p-8 shadow-2xl hover:shadow-3xl
                                    hover:border-white/30 transition-all duration-300
                                    hover:bg-background/30">
                        <div className="flex items-center justify-end gap-3 mb-6">
                          <span className="text-sm font-medium text-white/80">Next Project</span>
                          <ArrowRight className="h-6 w-6 text-white group-hover:text-primary transition-colors" />
                        </div>
                        
                        <div className="space-y-4 text-right">
                          <h3 className="text-2xl font-bold text-white group-hover:text-primary 
                                       transition-colors line-clamp-2">
                            {next.title}
                          </h3>
                          
                          <p className="text-base text-white/90 line-clamp-4 leading-relaxed">
                            {next.description}
                          </p>
                          
                          <div className="pt-2">
                            <span className="text-sm text-white/70 font-medium">← Click to explore</span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
        </div>
      )}

      {/* Accessibility hint */}
      <div className="sr-only" role="region" aria-label="Project navigation">
        Use left and right arrow keys to navigate between projects.
        {prev && ` Previous: ${prev.title}.`}
        {next && ` Next: ${next.title}.`}
      </div>
    </div>
  );
}
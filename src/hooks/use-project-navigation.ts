"use client";

import { useState, useEffect, useCallback } from "react";
import { useMotionValue } from "framer-motion";
import { createSlug } from "@/lib/projects";
import type { Project } from "@/types";

interface UseProjectNavigationProps {
  prev: Project | null;
  next: Project | null;
}

export function useProjectNavigation({ prev, next }: UseProjectNavigationProps) {
  const [isLeftHovered, setIsLeftHovered] = useState(false);
  const [isRightHovered, setIsRightHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Detect mobile/tablet devices
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024 || !window.matchMedia('(hover: hover)').matches);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Mouse position tracking
  useEffect(() => {
    if (isMobile) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY, isMobile]);

  // Debounced hover state management
  const handleLeftHover = useCallback((hovered: boolean) => {
    if (!prev || isMobile) return;
    
    if (hovered) {
      setIsLeftHovered(true);
    } else {
      // Small delay to prevent flickering
      setTimeout(() => setIsLeftHovered(false), 100);
    }
  }, [prev, isMobile]);

  const handleRightHover = useCallback((hovered: boolean) => {
    if (!next || isMobile) return;
    
    if (hovered) {
      setIsRightHovered(true);
    } else {
      // Small delay to prevent flickering
      setTimeout(() => setIsRightHovered(false), 100);
    }
  }, [next, isMobile]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      
      switch (e.key) {
        case 'ArrowLeft':
          if (prev) {
            e.preventDefault();
            window.location.href = `/projects/${createSlug(prev.title)}`;
          }
          break;
        case 'ArrowRight':
          if (next) {
            e.preventDefault();
            window.location.href = `/projects/${createSlug(next.title)}`;
          }
          break;
        case 'Escape':
          setIsLeftHovered(false);
          setIsRightHovered(false);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [prev, next]);

  return {
    isLeftHovered,
    isRightHovered,
    isMobile,
    mouseX,
    mouseY,
    handleLeftHover,
    handleRightHover,
    hasNavigation: !!(prev || next)
  };
}


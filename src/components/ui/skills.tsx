"use client";

import { useState } from "react";
import Image from "next/image";
import { getSkillBadgeWithFallback, getSkillIconWithFallback } from "@/lib/projects";

interface BaseSkillProps {
  skillName: string;
  width?: number;
  height?: number;
  className?: string;
}

interface SkillBadgeProps extends BaseSkillProps {
  skillSlug: string;
}

/**
 * Shared hook for image fallback handling
 * Cycles through fallback URLs when an image fails to load
 */
function useImageFallback(urls: string[]) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleError = () => {
    if (currentIndex < urls.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  return { currentUrl: urls[currentIndex], handleError };
}

/**
 * Skill badge component with text label
 * Used in project carousel and skill sections
 */
export function SkillBadge({
  skillName,
  skillSlug,
  width = 80,
  height = 24,
  className = "h-6 w-auto",
}: SkillBadgeProps) {
  const fallbackUrls = getSkillBadgeWithFallback(skillName, skillSlug);
  const { currentUrl, handleError } = useImageFallback(fallbackUrls);

  return (
    <Image
      src={currentUrl}
      alt={skillName}
      aria-label={skillName}
      title={skillName}
      width={width}
      height={height}
      className={className}
      onError={handleError}
    />
  );
}

/**
 * Skill icon component (icon only, no text)
 * Used in project detail pages
 */
export function SkillIcon({
  skillName,
  width = 16,
  height = 16,
  className = "object-contain",
}: BaseSkillProps) {
  const fallbackUrls = getSkillIconWithFallback(skillName);
  const { currentUrl, handleError } = useImageFallback(fallbackUrls);

  return (
    <Image
      src={currentUrl}
      alt={skillName}
      width={width}
      height={height}
      className={className}
      onError={handleError}
    />
  );
}

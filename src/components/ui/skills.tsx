"use client";

import { useState } from "react";
import Image from "next/image";
import { getSkillBadgeWithFallback, getSkillIconWithFallback } from "@/lib/projects";
import { skillCategories } from "@/config/skills";

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
 *
 * For skills with custom logos (slugOverride), renders a custom badge
 * For standard skills, uses shields.io badges
 */
export function SkillBadge({
  skillName,
  skillSlug,
  width = 80,
  height = 24,
  className = "h-6 w-auto",
}: SkillBadgeProps) {
  // Check if skill has a custom logo override
  const allSkills = skillCategories.flatMap(category => category.badges);
  const matchedSkill = allSkills.find(skill =>
    skill.name.toLowerCase() === skillName.toLowerCase()
  );

  const hasCustomLogo = matchedSkill?.slugOverride &&
    (matchedSkill.slugOverride.startsWith('http://') || matchedSkill.slugOverride.startsWith('https://'));

  // Call both hooks unconditionally
  const iconUrls = getSkillIconWithFallback(skillName);
  const iconFallback = useImageFallback(iconUrls);

  const badgeUrls = getSkillBadgeWithFallback(skillName, skillSlug);
  const badgeFallback = useImageFallback(badgeUrls);

  // If custom logo exists, render custom badge
  if (hasCustomLogo) {
    return (
      <div className="inline-flex items-center gap-1.5 px-2 py-1 rounded" style={{ backgroundColor: '#3d3d3d' }}>
        <Image
          src={iconFallback.currentUrl}
          alt=""
          width={16}
          height={16}
          className="w-4 h-4 object-contain"
          onError={iconFallback.handleError}
        />
        <span className="text-xs font-medium text-white">{skillName}</span>
      </div>
    );
  }

  // Otherwise, use shields.io badges with fallback
  return (
    <Image
      src={badgeFallback.currentUrl}
      alt={skillName}
      aria-label={skillName}
      title={skillName}
      width={width}
      height={height}
      className={className}
      onError={badgeFallback.handleError}
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

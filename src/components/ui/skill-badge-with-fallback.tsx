"use client";

import { useState } from "react";
import Image from "next/image";
import { getSkillBadgeWithFallback } from "@/lib/projects";

interface SkillBadgeWithFallbackProps {
  skillName: string;
  skillSlug: string;
  width?: number;
  height?: number;
  className?: string;
}

export function SkillBadgeWithFallback({
  skillName,
  skillSlug,
  width = 80,
  height = 24,
  className = "h-6 w-auto",
}: SkillBadgeWithFallbackProps) {
  const [currentUrlIndex, setCurrentUrlIndex] = useState(0);
  const fallbackUrls = getSkillBadgeWithFallback(skillName, skillSlug);

  const handleError = () => {
    if (currentUrlIndex < fallbackUrls.length - 1) {
      setCurrentUrlIndex(currentUrlIndex + 1);
    }
  };

  return (
    <Image
      src={fallbackUrls[currentUrlIndex]}
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
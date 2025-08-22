"use client";

import { useState } from "react";
import Image from "next/image";
import { getSkillIconWithFallback } from "@/lib/projects";

interface SkillIconWithFallbackProps {
  skillName: string;
  width?: number;
  height?: number;
  className?: string;
}

export function SkillIconWithFallback({
  skillName,
  width = 16,
  height = 16,
  className = "object-contain",
}: SkillIconWithFallbackProps) {
  const [currentUrlIndex, setCurrentUrlIndex] = useState(0);
  const fallbackUrls = getSkillIconWithFallback(skillName);

  const handleError = () => {
    if (currentUrlIndex < fallbackUrls.length - 1) {
      setCurrentUrlIndex(currentUrlIndex + 1);
    }
  };

  return (
    <Image
      src={fallbackUrls[currentUrlIndex]}
      alt={skillName}
      width={width}
      height={height}
      className={className}
      onError={handleError}
    />
  );
}
"use client";

import React, { useState } from "react";
import Image from "next/image";
import { 
  Code, 
  Database, 
  CreditCard, 
  Brain, 
  Server, 
  Palette, 
  Zap, 
  Activity, 
  CheckCircle, 
  Users, 
  BookOpen,
  BarChart3,
  Search,
  GitBranch,
  Sparkles,
  Component,
  Layers,
  Calculator,
  GraduationCap
} from "lucide-react";

interface TechnologyBadgeProps {
  technology: string;
  className?: string;
}

// Icon mapping for fallback badges
const TECHNOLOGY_ICONS = {
  // Frontend
  "React": Code,
  "Next.js": Component,
  "Material-UI": Palette,
  "MUI": Palette,
  "UI/UX": Palette,
  "Tailwind CSS": Layers,
  
  // Backend & Languages
  "Python": Server,
  "Node.js": Server,
  "JavaScript": Code,
  "TypeScript": Code,
  
  // Databases
  "PostgreSQL": Database,
  "Supabase": Database,
  "PowerBI": BarChart3,
  
  // Payments & APIs
  "Stripe": CreditCard,
  "APIs": Zap,
  
  // AI & ML
  "AI": Brain,
  "OpenAI": Sparkles,
  "Machine Learning": Brain,
  "ML": Brain,
  
  // Tools & Processes
  "Git": GitBranch,
  "GitHub": GitBranch,
  "Agile": Activity,
  "Testing": CheckCircle,
  "Selenium": CheckCircle,
  
  // Data & Analytics
  "Data Analysis": BarChart3,
  "Data Analytics": BarChart3,
  "Market Research": Search,
  "Competitive Analysis": Search,
  "Strategic Planning": BarChart3,
  
  // Soft Skills & Others
  "Teaching": GraduationCap,
  "Tutoring": BookOpen,
  "Mentoring": Users,
  "Customer Service": Users,
  "Sales": Users,
  "Teamwork": Users,
  "Mathematics": Calculator,
  "Game Development": Code,
} as const;

// Technology to shields.io logo mapping for known cases
const SHIELDS_LOGO_MAP = {
  "React": "react",
  "Next.js": "next.js",
  "Python": "python",
  "JavaScript": "javascript",
  "TypeScript": "typescript",
  "Node.js": "node.js",
  "PostgreSQL": "postgresql",
  "Git": "git",
  "GitHub": "github",
  "Stripe": "stripe",
  "Material-UI": "mui",
  "MUI": "mui",
  "Tailwind CSS": "tailwindcss",
  "Supabase": "supabase",
  "AI": "openai",
  "Selenium": "selenium",
  "PowerBI": "powerbi",
  "APIs": "api",
  "OpenAI": "openai",
  "Machine Learning": "scikit-learn",
  "ML": "tensorflow",
  "Agile": "agile",
  "Testing": "jest",
  "Data Analysis": "pandas",
  "Data Analytics": "tableau",
  "Game Development": "unity",
} as const;

// Generate shields.io URL for a technology
function getShieldsBadgeUrl(technology: string): string {
  const encodedName = encodeURIComponent(technology);
  
  // Check if we have a specific logo mapping
  const specificLogo = SHIELDS_LOGO_MAP[technology as keyof typeof SHIELDS_LOGO_MAP];
  if (specificLogo) {
    return `https://img.shields.io/badge/${encodedName}-333333?style=flat&logo=${specificLogo}`;
  }
  
  // Try with the technology name as logo (many technologies work this way)
  const logoName = technology.toLowerCase().replace(/[^a-z0-9]/g, '');
  return `https://img.shields.io/badge/${encodedName}-333333?style=flat&logo=${logoName}`;
}

// Fallback icon badge component - styled to match shields.io badges
function IconBadge({ technology, className = "" }: { technology: string; className?: string }) {
  const IconComponent = TECHNOLOGY_ICONS[technology as keyof typeof TECHNOLOGY_ICONS] || Code;
  
  return (
    <span className={`inline-flex items-center gap-2 px-3 py-1.5 bg-[#333333] text-white rounded text-sm font-medium transition-all duration-200 hover:scale-105 ${className}`} style={{ height: '28px' }}>
      <IconComponent className="h-4 w-4 flex-shrink-0" />
      <span className="whitespace-nowrap text-sm font-medium">{technology}</span>
    </span>
  );
}

export function TechnologyBadge({ technology, className = "" }: TechnologyBadgeProps) {
  // Check if this technology has a known shields.io logo
  const hasShieldsLogo = SHIELDS_LOGO_MAP[technology as keyof typeof SHIELDS_LOGO_MAP];
  
  // If no shields logo exists, go directly to Lucide icon badge
  if (!hasShieldsLogo) {
    return <IconBadge technology={technology} className={className} />;
  }
  
  // For technologies with shields logos, try shields.io first
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);
  
  const shieldsUrl = getShieldsBadgeUrl(technology);
  
  const handleImageLoad = () => {
    setImageLoading(false);
    setImageError(false);
  };
  
  const handleImageError = () => {
    setImageLoading(false);
    setImageError(true);
  };
  
  // If image failed to load, show icon badge
  if (imageError) {
    return <IconBadge technology={technology} className={className} />;
  }
  
  return (
    <div className={`inline-block ${className}`}>
      <Image
        src={shieldsUrl}
        alt={technology}
        width={140}
        height={28}
        className={`h-7 w-auto transition-all duration-200 hover:scale-105 ${imageLoading ? 'opacity-0' : 'opacity-100'}`}
        onLoad={handleImageLoad}
        onError={handleImageError}
        unoptimized
      />
      {/* Loading state */}
      {imageLoading && (
        <div className="h-7 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
      )}
    </div>
  );
}


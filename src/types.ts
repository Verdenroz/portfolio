// Projects section types
interface SkillBadge {
  name: string;
  slug: string; // Simple Icons slug, optionally with color code (e.g., "python/3776AB")
  slugOverride?: string; // Full URL to icon image if not using Simple Icons
  description: string;
  proficiency: "Proficient" | "Familiar" | "Learning";
}

export interface SkillCategory {
  name: string;
  color: string; // Tailwind CSS color code (e.g., "F97316" for orange-500)
  badges: SkillBadge[];
}

export interface ProjectSkill {
  name: string;
  slug: string;
}

export interface Project {
  title: string;
  description: string;
  keypoints: string[];
  date: string;
  skills: ProjectSkill[];
  image: string;
  gallery: string[];
  links: {
    github?: string;
    docs?: string;
    play?: string;
    demo?: string;
    pypi?: string;
  };
  badges?: string[];
}

// Contributions section types
export type ContributionDay = {
  date: string;
  contributionCount: number;
};

export type ContributionWeek = {
  contributionDays: ContributionDay[];
};

// Experience section types
export interface Experience {
  id: string;
  company: string;
  position: string;
  location: string;
  timeframe: string;
  startDate: Date;
  endDate: Date | null; // null for current positions
  description: string;
  achievements: string[];
  technologies: string[];
  type: "internship" | "freelance" | "full-time" | "part-time" | "volunteer";
}


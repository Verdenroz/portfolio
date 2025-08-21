// Skills section types
export interface SkillBadge {
  name: string;
  slug: string;
  slugOverride?: string;
  description: string;
  proficiency: "Proficient" | "Familiar" | "Learning";
}

export interface SkillCategory {
  name: string;
  color: string; // accent color (hex)
  badges: SkillBadge[];
}

// Projects section types
export interface ProjectSkill {
  name: string;
  slug: string;
}

export interface Project {
  title: string;
  description: string;
  longDescription: string;
  date: string;
  skills: ProjectSkill[];
  image: string;
  gallery: string[];
  links: {
    github?: string;
    docs?: string;
    play?: string;
    demo?: string;
  };
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
  experienceGroup?: string; // Group category for current experiences (e.g., "Full Stack Development")
}

export interface TreeNodeDatum {
  name: string;
  attributes: {
    company: string;
    timeframe: string;
    description: string;
    technologies?: string;
    achievements?: string;
    location?: string;
    type?: string;
  };
  children?: TreeNodeDatum[];
}

// Activities section types
export interface Mention {
  text: string;
  link: string;
}

export interface Activity {
  title: string;
  date: string;
  duration: string;
  description: string;
  tags: string[];
  mentions?: Mention[];
  projectLink?: string;
}
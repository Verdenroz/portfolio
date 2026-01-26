interface SkillBadge {
  name: string;
  slug: string;
  slugOverride?: string; // Full URL to icon image if not using Simple Icons
  description: string;
  proficiency: "Proficient" | "Familiar" | "Learning";
}

export interface SkillCategory {
  name: string;
  color: string;
  badges: SkillBadge[];
}

export interface ProjectSkill {
  name: string;
  slug: string;
}

export interface Project {
  title: string;
  description: string;
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
  color?: string;
  status?: "Active" | "Stable" | "Maintained" | "Archived";
}

export type ContributionDay = {
  date: string;
  contributionCount: number;
};

export type ContributionWeek = {
  contributionDays: ContributionDay[];
};

export interface Experience {
  id: string;
  company: string;
  position: string;
  location: string;
  timeframe: string;
  startDate: Date;
  endDate: Date | null; // null for current positions
  description: string;
  technologies: string[];
  image: string;
}


export interface Skill {
  name: string;
  slug: string;
}

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

export interface Experience {
  company: string;
  position: string;
  timeframe: string;
  description: string;
  technologies: string[];
}

export type ContributionDay = {
  date: string;
  contributionCount: number;
};

export type ContributionWeek = {
  contributionDays: ContributionDay[];
};

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
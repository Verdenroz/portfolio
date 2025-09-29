// Projects section types
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
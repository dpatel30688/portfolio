export interface Profile {
  name: string;
  title: string;
  location: string;
  mobile: string;
  email: string[];
  summary: string;
}

/** Category label -> list of technology tags, e.g. "Frontend Technologies": ["React JS", ...] */
export type SkillMatrix = Record<string, string[]>;

export interface ExperienceEntry {
  role: string;
  company: string;
  location: string;
  period: string;
  bullets: string[];
}

export interface ProjectItem {
  name: string;
  company?: string;
  duration?: string;
  role?: string;
  description: string;
  technologies: string[];
  integrations?: string[];
  highlights?: string[];
  link?: string;
}

export interface DomainSection {
  id: string;
  domain: string;
  icon?: string;
  tagline: string;
  summary: string;
  featuredProjects: ProjectItem[];
}

export interface PortfolioData {
  profile: Profile;
  skills: SkillMatrix;
  experience: ExperienceEntry[];
  portfolioProjects: DomainSection[];
}

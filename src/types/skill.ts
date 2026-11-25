import { ProjectCategory } from "./project";

export type SkillLevel = "Core" | "Proficient" | "Familiar" | "Learning";

export type EvidenceTier =
  | "production"  // Verified in production client/internship projects
  | "portfolio"   // Implemented in this personal portfolio web architecture
  | "academic"    // Independent or academic coursework implementation
  | "learning";   // Actively researching / exploring

export interface SkillItem {
  name: string;
  level?: SkillLevel;
  evidenceTier?: EvidenceTier;
  evidenceSummary?: string;
}

export interface SkillCategory {
  id: string;
  title: string;
  description?: string;
  skills: SkillItem[];
}

export interface LinkedProjectSummary {
  slug: string;
  title: string;
  tagline: string;
  category: ProjectCategory;
  role: string;
  githubUrl?: string;
  liveUrl?: string;
}

export interface ResolvedTechnology {
  id: string;
  name: string;
  categoryId: string;
  categoryTitle: string;
  level: SkillLevel;
  prominence: number;
  evidenceTier: EvidenceTier;
  evidenceSummary: string;
  linkedProjects: LinkedProjectSummary[];
  relatedTechnologies: string[];
  aliases: string[];
}


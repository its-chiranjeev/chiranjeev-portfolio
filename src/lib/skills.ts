import { skillsData } from "@/data/skills";
import { projectsData } from "@/data/projects";
import { ProjectCaseStudy } from "@/types/project";
import {
  SkillCategory,
  LinkedProjectSummary,
  ResolvedTechnology,
  SkillLevel,
} from "@/types/skill";
import { isProjectPublished } from "./projects";

/**
 * Authoritative explicit alias mapping.
 * Maps CMS skill item names to exact techStack names in project case studies.
 * Strictly centralized: no uncontrolled fuzzy or regex matching is permitted.
 */
export const TECH_ALIASES: Record<string, string[]> = {
  PostgreSQL: ["PostgreSQL", "PostgreSQL (Neon)"],
  "JWT Authentication": ["JWT & RBAC"],
  "Role-Based Access Control (RBAC)": ["JWT & RBAC"],
  "CSRF Protection": ["CSRF Guard"],
  "Helmet Security Headers": ["Helmet"],
  "Rate Limiting (@nestjs/throttler)": ["@nestjs/throttler"],
  "AWS S3 & Presigned URLs": ["AWS S3"],
  Jest: ["Jest & Supertest"],
  Supertest: ["Jest & Supertest"],
  "class-validator & class-transformer": [
    "class-validator",
    "class-transformer",
  ],
};

/**
 * Normalizes a technology or skill name for strict case-insensitive equality comparison.
 */
export function normalizeTechName(name: string): string {
  return name.trim().toLowerCase();
}

/**
 * Generates a URL-safe, unique kebab-case identifier from a skill name.
 */
export function slugifySkillName(name: string): string {
  return name
    .toLowerCase()
    .replace(/[@&()+/]/g, " ")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

/**
 * Resolves all CMS skill items to their authoritative project references and evidence tiers.
 *
 * Rules:
 * 1. Preserves all CMS skill items without altering source records.
 * 2. Only associates technologies supported by authoritative project techStack entries.
 * 3. Supports explicit aliases defined in TECH_ALIASES.
 * 4. De-duplicates matching projects so each project appears at most once per technology.
 * 5. Accurately tracks evidence tiers (production, portfolio, academic, learning).
 * 6. Calculates visual prominence based on skill proficiency:
 *    Core: 1.3, Proficient: 1.0, Familiar: 0.85, Learning: 0.70.
 * 7. Derives related technologies from the same category.
 */
export function getResolvedTechnologies(
  skills: SkillCategory[] = skillsData,
  projects: ProjectCaseStudy[] = projectsData
): ResolvedTechnology[] {
  // Only search within published projects
  const publishedProjects = projects.filter(isProjectPublished);

  const resolved: ResolvedTechnology[] = [];

  for (const category of skills) {
    const siblingNames = category.skills.map((s) => s.name);

    for (const skill of category.skills) {
      const explicitAliases = TECH_ALIASES[skill.name] || [];
      const matchCandidateNames = [skill.name, ...explicitAliases];
      const normalizedCandidates = new Set(
        matchCandidateNames.map(normalizeTechName)
      );

      // Match against projects whose techStack contains any of the normalized candidate names
      const matchedProjectsMap = new Map<string, LinkedProjectSummary>();

      for (const project of publishedProjects) {
        const hasMatch = project.techStack.some((tech) =>
          normalizedCandidates.has(normalizeTechName(tech.name))
        );

        if (hasMatch && !matchedProjectsMap.has(project.slug)) {
          matchedProjectsMap.set(project.slug, {
            slug: project.slug,
            title: project.title,
            tagline: project.tagline,
            category: project.category,
            role: project.role,
            githubUrl: project.githubUrl,
            liveUrl: project.liveUrl,
          });
        }
      }

      const linkedProjects = Array.from(matchedProjectsMap.values());

      // Prominence multiplier: Core (1.3), Proficient (1.0), Familiar (0.85), Learning (0.70)
      const level: SkillLevel = skill.level || "Proficient";
      let prominence = 1.0;
      if (level === "Core") {
        prominence = 1.3;
      } else if (level === "Familiar") {
        prominence = 0.85;
      } else if (level === "Learning") {
        prominence = 0.7;
      }

      // Related technologies are other skills in the same category
      const relatedTechnologies = siblingNames.filter((n) => n !== skill.name);

      resolved.push({
        id: slugifySkillName(skill.name),
        name: skill.name,
        categoryId: category.id,
        categoryTitle: category.title,
        level,
        prominence,
        evidenceTier: skill.evidenceTier || "academic",
        evidenceSummary: skill.evidenceSummary || "Verified in engineering implementation.",
        linkedProjects,
        relatedTechnologies,
        aliases: explicitAliases,
      });
    }
  }

  return resolved;
}

/**
 * Retrieves a single resolved technology by slugified ID.
 */
export function getResolvedTechnologyById(
  id: string,
  technologies?: ResolvedTechnology[]
): ResolvedTechnology | undefined {
  const techList = technologies || getResolvedTechnologies();
  return techList.find((tech) => tech.id === id);
}

/**
 * Retrieves resolved technologies filtered by CMS category ID.
 */
export function getResolvedTechnologiesByCategory(
  categoryId: string,
  technologies?: ResolvedTechnology[]
): ResolvedTechnology[] {
  const techList = technologies || getResolvedTechnologies();
  if (!categoryId || categoryId === "all") {
    return techList;
  }
  return techList.filter((tech) => tech.categoryId === categoryId);
}

/**
 * Returns raw skill categories from CMS data.
 */
export function getSkillCategories(): SkillCategory[] {
  return skillsData;
}

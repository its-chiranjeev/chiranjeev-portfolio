import { projectsData } from "@/data/projects";
import { ProjectCaseStudy } from "@/types/project";

/**
 * Retrieves all published project case studies sorted by display order.
 * Synchronous local data access function.
 */
export function getAllProjects(): ProjectCaseStudy[] {
  return projectsData
    .filter((project) => project.published)
    .sort((a, b) => a.order - b.order);
}

/**
 * Retrieves only published projects marked as featured.
 */
export function getFeaturedProjects(): ProjectCaseStudy[] {
  return getAllProjects().filter((project) => project.featured);
}

/**
 * Retrieves a single published project case study by unique route slug.
 * Explicitly validates that the project is published. Returns null for unknown or unpublished slugs.
 */
export function getProjectBySlug(slug: string): ProjectCaseStudy | null {
  const project = projectsData.find(
    (p) => p.slug === slug && p.published === true
  );
  return project || null;
}

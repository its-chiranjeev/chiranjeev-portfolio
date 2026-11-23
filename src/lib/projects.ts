import { projectsData } from "@/data/projects";
import { ProjectCaseStudy } from "@/types/project";

/**
 * Validates whether a project record is considered published.
 * In the canonical architecture, 'published: boolean' is the authoritative field.
 */
export function isProjectPublished(project: ProjectCaseStudy): boolean {
  return project.published === true;
}

/**
 * Explicit migration adapter for raw or legacy project data.
 * Resolves contradictory legacy fields to their canonical counterpart:
 * 1. Publication: 'published: boolean' is authoritative. If only legacy status is present,
 *    status === 'published' maps to true, status === 'draft' maps to false.
 * 2. Ordering: 'order: number' is authoritative over legacy displayOrder.
 * 3. Live URL: 'liveUrl: string' is authoritative over legacy liveDemoUrl.
 */
export function normalizeProjectRecord(
  raw: Partial<ProjectCaseStudy> & {
    status?: "draft" | "published" | string;
    displayOrder?: number;
    liveDemoUrl?: string;
  }
): ProjectCaseStudy {
  // If published is explicitly boolean, it takes precedence. Otherwise evaluate legacy status.
  const published =
    typeof raw.published === "boolean"
      ? raw.published
      : raw.status === "published";

  // order takes precedence over legacy displayOrder
  const order =
    typeof raw.order === "number"
      ? raw.order
      : (typeof raw.displayOrder === "number" ? raw.displayOrder : 99);

  // liveUrl takes precedence over legacy liveDemoUrl
  const liveUrl = raw.liveUrl || raw.liveDemoUrl;

  const { ...rest } = raw;
  delete (rest as Record<string, unknown>).status;
  delete (rest as Record<string, unknown>).displayOrder;
  delete (rest as Record<string, unknown>).liveDemoUrl;

  return {
    ...rest,
    published,
    order,
    liveUrl,
  } as ProjectCaseStudy;
}

/**
 * Validates project records against the portfolio contract.
 * Used in test suites, CI checks, and build-time verification.
 */
export function validateFeaturedProjectsCount(
  projects: ProjectCaseStudy[] = projectsData
): {
  isValid: boolean;
  count: number;
  slugs: string[];
  error?: string;
} {
  const published = projects.filter((p) => p.published === true);
  const featured = published.filter((p) => p.featured === true);
  const isValid = featured.length === 3;
  const slugs = featured.map((p) => p.slug);

  return {
    isValid,
    count: featured.length,
    slugs,
    error: isValid
      ? undefined
      : `[Portfolio Configuration Error]: Expected exactly 3 published featured projects, but found ${featured.length} (${slugs.join(", ") || "none"}).`,
  };
}

/**
 * Retrieves all published project case studies sorted by canonical display order.
 * Synchronous local data access function. CMS-ready contract.
 */
export function getAllProjects(): ProjectCaseStudy[] {
  return projectsData
    .filter(isProjectPublished)
    .sort((a, b) => a.order - b.order);
}

/**
 * Retrieves only published projects marked as featured for the main portfolio (/portfolio).
 * Strictly enforces that exactly 3 published projects are featured.
 * Produces an actionable configuration error during development, build, and CI
 * if the count is zero, one, two, or more than three.
 * Never silently selects arbitrary projects or hides configuration defects.
 */
export function getFeaturedProjects(): ProjectCaseStudy[] {
  const validation = validateFeaturedProjectsCount(projectsData);

  if (!validation.isValid) {
    throw new Error(
      `${validation.error} Please ensure exactly three published projects have 'featured: true' in src/data/projects.ts.`
    );
  }

  const published = getAllProjects();
  return published.filter((project) => project.featured === true);
}

/**
 * Retrieves a single published project case study by unique route slug.
 * Explicitly validates that the project is published. Returns null for unknown or draft slugs.
 */
export function getProjectBySlug(slug: string): ProjectCaseStudy | null {
  const project = projectsData.find(
    (p) => p.slug === slug && isProjectPublished(p)
  );
  return project || null;
}

/**
 * Retrieves adjacent previous and next published projects for case study navigation.
 */
export function getAdjacentProjects(currentSlug: string): {
  prev: ProjectCaseStudy | null;
  next: ProjectCaseStudy | null;
} {
  const published = getAllProjects();
  const currentIndex = published.findIndex((p) => p.slug === currentSlug);
  if (currentIndex === -1) {
    return { prev: null, next: null };
  }
  const prev = currentIndex > 0 ? published[currentIndex - 1] : null;
  const next = currentIndex < published.length - 1 ? published[currentIndex + 1] : null;
  return { prev, next };
}

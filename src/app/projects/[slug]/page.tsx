import { PortfolioFooter } from "@/components/layout/PortfolioFooter";
import { ProjectDetailHero } from "@/components/projects/ProjectDetailHero";
import { ProjectDetailNavbar } from "@/components/projects/ProjectDetailNavbar";
import { ProjectFooterCTA } from "@/components/projects/ProjectFooterCTA";
import { ProjectNavigation } from "@/components/projects/ProjectNavigation";
import { ProjectSectionRenderer } from "@/components/projects/ProjectSectionRenderer";
import { Container } from "@/components/ui/Container";
import { getAdjacentProjects, getAllProjects, getProjectBySlug, isProjectPublished } from "@/lib/projects";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const projects = getAllProjects();
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project || !isProjectPublished(project)) {
    return {
      title: "Project Not Found | Chiranjeev Rastogi",
      description: "The requested project case study could not be found.",
    };
  }

  const siteUrl = (process.env.SITE_URL?.trim() || "http://localhost:3000").replace(/\/+$/, "");
  const canonicalUrl = `${siteUrl}/projects/${project.slug}`;

  return {
    title: `${project.title} — Technical Case Study | Chiranjeev Rastogi`,
    description: `${project.tagline}. ${project.shortDescription}`,
    ...(canonicalUrl
      ? {
          alternates: {
            canonical: canonicalUrl,
          },
        }
      : {}),
    openGraph: {
      title: `${project.title} — Technical Case Study | Chiranjeev Rastogi`,
      description: project.shortDescription,
      type: "article",
      ...(canonicalUrl ? { url: canonicalUrl } : {}),
      images: [
        {
          url: project.coverImage || project.thumbnail || "/images/og-image-v2.png",
          width: 2560,
          height: 1440,
          alt: project.coverImageAlt || `${project.title} Cover`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} — Technical Case Study | Chiranjeev Rastogi`,
      description: project.shortDescription,
      images: [project.coverImage || project.thumbnail || "/images/og-image-v2.png"],
    },
  };
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project || !isProjectPublished(project)) {
    notFound();
  }

  const { prev, next } = getAdjacentProjects(slug);

  return (
    <div className="min-h-screen flex flex-col bg-[var(--bg-canvas)] text-[var(--text-primary)]">
      <ProjectDetailNavbar projectTitle={project.title} />

      <main id="main-content" className="flex-1">
        <article>
          <ProjectDetailHero project={project} />

          <Container className="py-12">
            <div className="space-y-4">
              {project.sections.map((section) => (
                <ProjectSectionRenderer key={section.id} section={section} />
              ))}
            </div>

            <ProjectNavigation prev={prev} next={next} />

            <ProjectFooterCTA />
          </Container>
        </article>
      </main>

      <PortfolioFooter />
    </div>
  );
}

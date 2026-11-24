import { PortfolioNavbar } from "@/components/layout/PortfolioNavbar";
import { PortfolioFooter } from "@/components/layout/PortfolioFooter";
import { ProjectsView } from "@/components/projects/ProjectsView";
import { getAllProjects } from "@/lib/projects";
import { getAbsoluteUrl } from "@/lib/env";
import type { Metadata } from "next";

const canonicalUrl = getAbsoluteUrl("/projects");

export const metadata: Metadata = {
  title: "All Projects",
  description:
    "An overview of the applications, experiments, and engineering projects I've built. Specializing in full-stack web applications and distributed backend architectures with TypeScript, Next.js, and NestJS.",
  ...(canonicalUrl
    ? {
        alternates: {
          canonical: canonicalUrl,
        },
        openGraph: {
          title: "All Projects | Chiranjeev Rastogi",
          description:
            "An overview of the applications, experiments, and engineering projects I've built. Specializing in full-stack web applications and distributed backend architectures with TypeScript, Next.js, and NestJS.",
          url: canonicalUrl,
          images: [
            {
              url: "/images/og-image-v2.png",
              width: 1200,
              height: 630,
              type: "image/png",
              alt: "Chiranjeev Rastogi — All Projects Archive",
            },
          ],
        },
      }
    : {}),
  twitter: {
    card: "summary_large_image",
    title: "All Projects | Chiranjeev Rastogi",
    description:
      "An overview of the applications, experiments, and engineering projects I've built. Specializing in full-stack web applications and distributed backend architectures with TypeScript, Next.js, and NestJS.",
    images: ["/images/og-image-v2.png"],
  },
};

export default function ProjectsPage() {
  const projects = getAllProjects();

  return (
    <div className="min-h-screen flex flex-col bg-[var(--bg-canvas)] text-[var(--text-primary)]">
      <PortfolioNavbar />
      <main id="main-content" className="flex-1">
        <ProjectsView projects={projects} />
      </main>
      <PortfolioFooter />
    </div>
  );
}

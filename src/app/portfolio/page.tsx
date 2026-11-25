import { AboutSection } from "@/components/portfolio/AboutSection";
import { ContactSection } from "@/components/portfolio/ContactSection";
import { EducationSection } from "@/components/portfolio/EducationSection";
import { ExperienceSection } from "@/components/portfolio/ExperienceSection";
import { PortfolioFooter } from "@/components/layout/PortfolioFooter";
import { PortfolioHero } from "@/components/portfolio/PortfolioHero";
import { PortfolioNavbar } from "@/components/layout/PortfolioNavbar";
import { ProjectsSection } from "@/components/portfolio/ProjectsSection";
import { SkillsSection } from "@/components/portfolio/SkillsSection";
import {
  getAllSkills,
  getCertifications,
  getEducation,
  getExperience,
  getSiteConfig,
} from "@/lib/content";
import { getFeaturedProjects } from "@/lib/projects";
import type { Metadata } from "next";

const siteUrl = (process.env.SITE_URL?.trim() || "http://localhost:3000").replace(/\/+$/, "");
const canonicalUrl = `${siteUrl}/portfolio`;

export const metadata: Metadata = {
  title: "Main Portfolio",
  description:
    "Explore the engineering portfolio of Chiranjeev Rastogi: Full-stack web applications, NestJS and PostgreSQL case studies, technical skills taxonomy, internship experience, and education.",
  ...(canonicalUrl
    ? {
        alternates: {
          canonical: canonicalUrl,
        },
        openGraph: {
          title: "Main Portfolio | Chiranjeev Rastogi",
          description:
            "Explore the engineering portfolio of Chiranjeev Rastogi: Full-stack web applications, NestJS and PostgreSQL case studies, technical skills taxonomy, internship experience, and education.",
          url: canonicalUrl,
          images: [
            {
              url: "/images/og-image-v2.png",
              width: 1200,
              height: 630,
              type: "image/png",
              alt: "Chiranjeev Rastogi — Main Portfolio",
            },
          ],
        },
      }
    : {}),
  twitter: {
    card: "summary_large_image",
    title: "Main Portfolio | Chiranjeev Rastogi",
    description:
      "Explore the engineering portfolio of Chiranjeev Rastogi: Full-stack web applications, NestJS and PostgreSQL case studies, technical skills taxonomy, internship experience, and education.",
    images: ["/images/og-image-v2.png"],
  },
};

export default function PortfolioPage() {
  const site = getSiteConfig();
  const skills = getAllSkills();
  const experiences = getExperience();
  const projects = getFeaturedProjects();
  const education = getEducation();
  const certifications = getCertifications();

  return (
    <div className="min-h-screen flex flex-col bg-[var(--bg-canvas)] text-[var(--text-primary)]">
      <PortfolioNavbar />
      <main id="main-content" className="flex-1">
        <PortfolioHero
          name={site.name}
          title={site.title}
          location={site.location}
        />
        <AboutSection />
        <SkillsSection categories={skills} />
        <ExperienceSection experiences={experiences} />
        <ProjectsSection projects={projects} />
        <EducationSection
          education={education}
          certifications={certifications}
        />
        <ContactSection site={site} />
      </main>
      <PortfolioFooter isPortfolioPage />
    </div>
  );
}

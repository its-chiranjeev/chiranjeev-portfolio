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
import { getAllProjects } from "@/lib/projects";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Main Portfolio",
  description:
    "Explore the full engineering portfolio of Chiranjeev Rastogi: Node.js, NestJS, and PostgreSQL case studies, technical skills taxonomy, internship experience, and education.",
};

export default function PortfolioPage() {
  const site = getSiteConfig();
  const skills = getAllSkills();
  const experiences = getExperience();
  const projects = getAllProjects();
  const education = getEducation();
  const certifications = getCertifications();

  return (
    <div className="min-h-screen flex flex-col bg-[var(--bg-canvas)] text-[var(--text-primary)]">
      <PortfolioNavbar />
      <main id="hero" className="flex-1">
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
      <PortfolioFooter />
    </div>
  );
}

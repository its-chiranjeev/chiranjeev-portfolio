import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { ProjectCaseStudy } from "@/types/project";
import { ArrowRight, Grid, Terminal } from "lucide-react";

interface ProjectsSectionProps {
  projects: ProjectCaseStudy[];
}

export function ProjectsSection({ projects }: ProjectsSectionProps) {
  return (
    <section id="projects" className="py-20 border-b border-[var(--border-subtle)]">
      <Container>
        <SectionHeading
          badge="PROJECTS"
          number="04"
          title="Featured Projects & Case Studies"
          description="In-depth technical case studies highlighting individual backend engineering, API topologies, and data architecture."
        />

        {/* Featured Projects Stack */}
        <div className="space-y-8">
          {projects.map((project, idx) => (
            <ProjectCard
              key={project.slug}
              project={project}
              priority={idx === 0}
            />
          ))}
        </div>

        {/* Engineering Studio "View All Projects" CTA Banner */}
        <div className="mt-12 p-6 sm:p-8 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] hover:border-[var(--accent-lime)]/40 transition-all duration-300 relative overflow-hidden group">
          {/* Subtle background glow */}
          <div
            className="absolute top-0 right-0 w-80 h-80 bg-[var(--accent-lime)] opacity-5 blur-3xl pointer-events-none rounded-full"
            aria-hidden="true"
          />

          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-xl">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] text-[11px] font-mono text-[var(--accent-lime)]">
                <Terminal className="w-3.5 h-3.5" />
                <span>PROJECT_ARCHIVE // SYSTEM_EXPLORATION</span>
              </div>
              <h4 className="text-xl sm:text-2xl font-bold tracking-tight text-[var(--text-primary)]">
                Looking for more projects?
              </h4>
              <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                Explore the complete collection of my development work.
              </p>
            </div>

            <Button
              href="/projects"
              variant="primary"
              size="md"
              className="font-mono text-xs uppercase tracking-wider shrink-0 w-full sm:w-auto"
            >
              <Grid className="w-4 h-4 mr-2" />
              <span>VIEW ALL PROJECTS</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}

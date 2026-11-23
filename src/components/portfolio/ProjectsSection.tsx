import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GithubIcon } from "@/components/ui/icons";
import { ProjectCaseStudy } from "@/types/project";
import { ArrowRight, ExternalLink, Layers } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

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

        <div className="space-y-8">
          {projects.map((project) => (
            <Card
              key={project.slug}
              className="p-6 sm:p-8 bg-[var(--bg-surface)] hover:border-[var(--border-strong)] transition-all relative overflow-hidden group"
            >
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
                {/* Left: Main Details */}
                <div className="flex-1">
                  {/* Top strip */}
                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    <span className="font-mono text-sm font-bold text-[var(--accent-lime)]">
                      0{project.order}.
                    </span>
                    <Badge variant={project.category === "Professional Experience" ? "lime" : "default"}>
                      {project.category}
                    </Badge>
                    <span className="text-xs font-mono text-[var(--text-tertiary)] inline-flex items-center gap-1.5 flex-wrap">
                      <span>{project.role}</span>
                      {project.organization && (
                        <>
                          <span>&bull;</span>
                          {project.organizationLogo && (
                            <span className="w-4 h-4 rounded bg-black border border-[var(--border-subtle)] inline-flex items-center justify-center p-0.5 shrink-0 overflow-hidden">
                              <Image
                                src={project.organizationLogo}
                                alt={project.organization}
                                width={16}
                                height={16}
                                className="object-contain"
                              />
                            </span>
                          )}
                          <span>{project.organization}</span>
                        </>
                      )}
                    </span>
                  </div>

                  {/* Title & Tagline */}
                  <h3 className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)] mb-2 group-hover:text-[var(--accent-lime)] transition-colors">
                    <Link href={`/projects/${project.slug}`}>
                      {project.title}
                    </Link>
                  </h3>

                  <p className="font-mono text-xs sm:text-sm text-[var(--text-secondary)] mb-4">
                    {project.tagline}
                  </p>

                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-6 max-w-3xl">
                    {project.shortDescription}
                  </p>

                  {/* Tech stack badges */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech.name}
                        className="px-2.5 py-1 rounded-md bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] text-xs font-mono text-[var(--text-secondary)]"
                      >
                        {tech.name}
                      </span>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex flex-wrap items-center gap-3.5 pt-2">
                    <Button
                      href={`/projects/${project.slug}`}
                      variant="primary"
                      size="sm"
                      className="font-mono text-xs uppercase tracking-wider"
                    >
                      <span>View Case Study</span>
                      <ArrowRight className="w-3.5 h-3.5 ml-1" />
                    </Button>

                    {project.liveUrl && (
                      <Button
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        variant="secondary"
                        size="sm"
                        className="font-mono text-xs"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>Live Site</span>
                      </Button>
                    )}

                    {project.githubUrl && (
                      <Button
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        variant="secondary"
                        size="sm"
                        className="font-mono text-xs"
                      >
                        <GithubIcon className="w-3.5 h-3.5" />
                        <span>Source Code</span>
                      </Button>
                    )}
                  </div>
                </div>

                {/* Right: Section Meta Summary */}
                <div className="lg:w-64 shrink-0 p-4 rounded-xl bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] text-xs font-mono">
                  <div className="flex items-center gap-2 mb-3 pb-2 border-b border-[var(--border-subtle)] text-[var(--accent-lime)] font-semibold">
                    <Layers className="w-4 h-4" />
                    <span>Case Study Structure</span>
                  </div>
                  <div className="space-y-2 text-[var(--text-tertiary)]">
                    {project.sections.map((sec) => (
                      <div key={sec.id} className="flex items-center justify-between text-[11px]">
                        <span>{sec.sectionNumber}. {sec.title.split("&")[0].trim()}</span>
                        <span className="uppercase text-[9px] text-[var(--accent-lime)]">
                          {sec.type}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}

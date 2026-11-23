import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { GithubIcon } from "@/components/ui/icons";
import { ProjectCaseStudy } from "@/types/project";
import { Calendar, ExternalLink, ShieldCheck, User } from "lucide-react";
import Image from "next/image";

interface ProjectDetailHeroProps {
  project: ProjectCaseStudy;
}

export function ProjectDetailHero({ project }: ProjectDetailHeroProps) {
  return (
    <section className="pt-12 pb-16 border-b border-[var(--border-subtle)] bg-[var(--bg-canvas)]">
      <Container>
        {/* Top Indicator */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <span className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--accent-lime)] px-2.5 py-1 rounded bg-[var(--accent-lime-muted)] border border-[var(--accent-lime)]/30">
            CASE STUDY 0{project.order}
          </span>
          <Badge variant={project.category === "Professional Experience" ? "lime" : "default"}>
            {project.category}
          </Badge>
        </div>

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[var(--text-primary)] mb-4">
          {project.title}
        </h1>

        {/* Tagline */}
        <p className="font-mono text-base sm:text-lg text-[var(--text-secondary)] mb-6 max-w-3xl leading-relaxed">
          {project.tagline}
        </p>

        {/* Metadata Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-5 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] mb-8">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-[var(--bg-surface-elevated)] text-[var(--accent-lime)] shrink-0">
              <User className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--text-tertiary)] block">
                Engineering Role
              </span>
              <span className="text-xs sm:text-sm font-semibold text-[var(--text-primary)]">
                {project.role}
              </span>
            </div>
          </div>

          {project.organization && (
            <div className="flex items-start gap-3">
              {project.organizationLogo ? (
                <div className="w-8 h-8 rounded-lg bg-black border border-[var(--border-subtle)] shrink-0 flex items-center justify-center p-1 overflow-hidden">
                  <Image
                    src={project.organizationLogo}
                    alt={project.organization}
                    width={28}
                    height={28}
                    className="object-contain"
                  />
                </div>
              ) : (
                <div className="p-2 rounded-lg bg-[var(--bg-surface-elevated)] text-[var(--accent-lime)] shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
              )}
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--text-tertiary)] block">
                  Organization
                </span>
                <span className="text-xs sm:text-sm font-semibold text-[var(--text-primary)]">
                  {project.organization}
                </span>
              </div>
            </div>
          )}

          {project.duration && (
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-[var(--bg-surface-elevated)] text-[var(--accent-lime)] shrink-0">
                <Calendar className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--text-tertiary)] block">
                  Timeline
                </span>
                <span className="text-xs sm:text-sm font-semibold text-[var(--text-primary)] font-mono">
                  {project.duration}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Executive Summary */}
        <div className="mb-8 max-w-4xl">
          <h2 className="text-xs font-mono uppercase tracking-wider text-[var(--text-tertiary)] mb-2">
            Executive Summary
          </h2>
          <p className="text-base text-[var(--text-secondary)] leading-relaxed">
            {project.shortDescription}
          </p>
        </div>

        {/* Tech Stack Pills */}
        <div className="mb-8">
          <h2 className="text-xs font-mono uppercase tracking-wider text-[var(--text-tertiary)] mb-3">
            Core Technologies & Tooling
          </h2>
          <div className="flex flex-wrap gap-2">
            {project.techStack.map((tech) => (
              <span
                key={tech.name}
                className="px-3 py-1.5 rounded-lg bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] text-xs font-mono text-[var(--text-secondary)] flex items-center gap-2 hover:border-[var(--border-strong)] transition-colors"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-lime)]" />
                <span>{tech.name}</span>
                <span className="text-[10px] text-[var(--text-tertiary)] border-l border-[var(--border-subtle)] pl-1.5">
                  {tech.category}
                </span>
              </span>
            ))}
          </div>
        </div>

        {/* Actions / Outgoing Links */}
        {(project.githubUrl || project.liveUrl) && (
          <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-[var(--border-subtle)]">
            {project.githubUrl && (
              <Button
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                variant="primary"
                size="sm"
                className="font-mono text-xs"
              >
                <GithubIcon className="w-4 h-4" />
                <span>View GitHub Repository</span>
              </Button>
            )}

            {project.liveUrl && (
              <Button
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                variant="secondary"
                size="sm"
                className="font-mono text-xs"
              >
                <ExternalLink className="w-4 h-4" />
                <span>View Live Deployment</span>
              </Button>
            )}
          </div>
        )}

        {/* Project Detail Cover Image */}
        {(project.coverImage || project.thumbnail) && (
          <div className="mt-8 rounded-2xl overflow-hidden border border-[var(--border-subtle)] bg-[var(--bg-surface)] shadow-2xl relative aspect-video w-full">
            <Image
              src={project.coverImage || project.thumbnail!}
              alt={project.coverImageAlt || `${project.title} Cover`}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
              className="object-cover object-center"
              priority
            />
          </div>
        )}
      </Container>
    </section>
  );
}

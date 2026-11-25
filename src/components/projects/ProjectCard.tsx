import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { GithubIcon } from "@/components/ui/icons";
import { ProjectCaseStudy } from "@/types/project";
import { ArrowRight, ExternalLink } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface ProjectCardProps {
  project: ProjectCaseStudy;
  priority?: boolean;
  showFeaturedBadge?: boolean;
  index?: number;
}

export function ProjectCard({
  project,
  priority = false,
  showFeaturedBadge = false,
  index,
}: ProjectCardProps) {
  const displayNum = String(project.order ?? 1).padStart(2, "0");
  const liveUrl = project.liveUrl;
  const imageSrc = project.coverImage || project.thumbnail;

  // Alternating layout: even cards (0, 2, ...) have Image Left, Content Right.
  // Odd cards (1, 3, ...) have Content Left, Image Right.
  const isEven = (index ?? (project.order ? project.order - 1 : 0)) % 2 === 0;

  return (
    <Card className="p-5 sm:p-6 lg:p-7 bg-[var(--bg-surface)] border border-[var(--border-subtle)] hover:border-[var(--border-strong)] transition-all duration-300 relative overflow-hidden group rounded-2xl">
      <div
        className={`flex flex-col ${
          isEven ? "lg:flex-row" : "lg:flex-row-reverse"
        } gap-6 lg:gap-8 items-stretch`}
      >
        {/* Project Card Visual Preview (40-42% on desktop) */}
        {imageSrc && (
          <Link
            href={`/projects/${project.slug}`}
            className="block relative w-full aspect-[16/10] sm:aspect-[16/9] lg:aspect-[4/3] lg:w-[42%] xl:w-[40%] shrink-0 rounded-xl overflow-hidden border border-[var(--border-subtle)] bg-[var(--bg-surface-elevated)] group/img hover:border-[var(--accent-lime)]/40 transition-colors"
            tabIndex={-1}
            aria-hidden="true"
          >
            <Image
              src={imageSrc}
              alt={project.coverImageAlt || `${project.title} Cover Preview`}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 480px"
              className="object-cover object-center group-hover/img:scale-[1.02] transition-transform duration-500"
              priority={priority}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-canvas)]/30 via-transparent to-transparent opacity-60 pointer-events-none" />
          </Link>
        )}

        {/* Project Information (58-60% on desktop) */}
        <div className="flex-1 min-w-0 flex flex-col justify-between">
          <div>
            {/* Top Metadata Strip */}
            <div className="flex flex-wrap items-center gap-2.5 mb-2.5">
              <span className="font-mono text-xs sm:text-sm font-bold text-[var(--accent-lime)]">
                {displayNum}.
              </span>
              <Badge variant={project.category === "Professional Experience" ? "lime" : "default"}>
                {project.category}
              </Badge>

              {showFeaturedBadge && project.featured && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-[var(--accent-lime-muted)] text-[var(--accent-lime)] border border-[var(--accent-lime)]/20">
                  FEATURED
                </span>
              )}

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

            {/* Title */}
            <h3 className="text-xl sm:text-2xl font-bold text-[var(--text-primary)] mb-1.5 group-hover:text-[var(--accent-lime)] transition-colors">
              <Link href={`/projects/${project.slug}`}>
                {project.title}
              </Link>
            </h3>

            {/* Tagline */}
            <p className="font-mono text-xs sm:text-sm text-[var(--text-secondary)] mb-2.5 line-clamp-1">
              {project.tagline}
            </p>

            {/* Short Description */}
            <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed mb-4 max-w-2xl line-clamp-3">
              {project.shortDescription}
            </p>

            {/* Tech Stack Badges */}
            <div className="flex flex-wrap gap-1.5 mb-4">
              {project.techStack.map((tech) => (
                <span
                  key={tech.name}
                  className="px-2 py-0.5 rounded-md bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] text-[11px] font-mono text-[var(--text-secondary)]"
                >
                  {tech.name}
                </span>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 pt-3.5 border-t border-[var(--border-subtle)] mt-auto">
            <Button
              href={`/projects/${project.slug}`}
              variant="primary"
              size="sm"
              className="font-mono text-xs uppercase tracking-wider"
            >
              <span>View Case Study</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
            </Button>

            {project.githubUrl && (
              <Button
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                variant="secondary"
                size="sm"
                className="font-mono text-xs"
                aria-label={`View ${project.title} source code on GitHub`}
              >
                <GithubIcon className="w-3.5 h-3.5 mr-1.5" />
                <span>GitHub</span>
              </Button>
            )}

            {liveUrl && (
              <Button
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                variant="secondary"
                size="sm"
                className="font-mono text-xs"
                aria-label={`View live demo of ${project.title}`}
              >
                <ExternalLink className="w-3.5 h-3.5 mr-1.5 text-[var(--accent-lime)]" />
                <span>Live Demo</span>
              </Button>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}

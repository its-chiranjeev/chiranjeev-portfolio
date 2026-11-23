import { ProjectCaseStudy } from "@/types/project";
import { ArrowLeft, ArrowRight, Grid } from "lucide-react";
import Link from "next/link";

interface ProjectNavigationProps {
  prev: ProjectCaseStudy | null;
  next: ProjectCaseStudy | null;
}

export function ProjectNavigation({ prev, next }: ProjectNavigationProps) {
  return (
    <nav aria-label="Case Study Navigation" className="pt-16 pb-12 border-b border-[var(--border-subtle)]">
      <div className="flex items-center justify-between mb-6">
        <span className="text-xs font-mono uppercase tracking-wider text-[var(--text-tertiary)]">
          Case Study Navigation
        </span>
        <Link
          href="/projects"
          className="inline-flex items-center gap-1.5 text-xs font-mono text-[var(--text-secondary)] hover:text-[var(--accent-lime)] transition-colors"
        >
          <Grid className="w-3.5 h-3.5" />
          <span>All Projects</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Previous Project */}
        {prev ? (
          <Link
            href={`/projects/${prev.slug}`}
            className="p-5 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] hover:border-[var(--accent-lime)] transition-all group flex flex-col justify-between"
          >
            <div className="flex items-center gap-2 text-xs font-mono text-[var(--text-tertiary)] group-hover:text-[var(--accent-lime)] mb-2 transition-colors">
              <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
              <span>PREVIOUS PROJECT</span>
            </div>
            <div>
              <h4 className="text-base font-bold text-[var(--text-primary)] group-hover:text-[var(--accent-lime)] transition-colors mb-1">
                {prev.title}
              </h4>
              <p className="text-xs text-[var(--text-secondary)] line-clamp-1 font-mono">
                {prev.tagline}
              </p>
            </div>
          </Link>
        ) : (
          <div className="p-5 rounded-xl bg-[var(--bg-surface)]/40 border border-[var(--border-subtle)]/40 opacity-40 select-none flex flex-col justify-between">
            <span className="text-xs font-mono text-[var(--text-tertiary)] mb-2 block">
              &mdash; FIRST PROJECT
            </span>
            <span className="text-sm font-semibold text-[var(--text-tertiary)]">
              Beginning of Case Studies
            </span>
          </div>
        )}

        {/* Next Project */}
        {next ? (
          <Link
            href={`/projects/${next.slug}`}
            className="p-5 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] hover:border-[var(--accent-lime)] transition-all group flex flex-col justify-between sm:text-right"
          >
            <div className="flex items-center gap-2 sm:justify-end text-xs font-mono text-[var(--text-tertiary)] group-hover:text-[var(--accent-lime)] mb-2 transition-colors">
              <span>NEXT PROJECT</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
            <div>
              <h4 className="text-base font-bold text-[var(--text-primary)] group-hover:text-[var(--accent-lime)] transition-colors mb-1">
                {next.title}
              </h4>
              <p className="text-xs text-[var(--text-secondary)] line-clamp-1 font-mono">
                {next.tagline}
              </p>
            </div>
          </Link>
        ) : (
          <div className="p-5 rounded-xl bg-[var(--bg-surface)]/40 border border-[var(--border-subtle)]/40 opacity-40 select-none flex flex-col justify-between sm:text-right">
            <span className="text-xs font-mono text-[var(--text-tertiary)] mb-2 block">
              FINAL PROJECT &mdash;
            </span>
            <span className="text-sm font-semibold text-[var(--text-tertiary)]">
              End of Case Studies
            </span>
          </div>
        )}
      </div>
    </nav>
  );
}

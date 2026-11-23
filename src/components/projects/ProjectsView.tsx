"use client";

import { Container } from "@/components/ui/Container";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { ProjectCaseStudy } from "@/types/project";
import { ArrowLeft, Filter, FolderGit2, Layers, Terminal } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";

interface ProjectsViewProps {
  projects: ProjectCaseStudy[];
}

export function ProjectsView({ projects }: ProjectsViewProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");

  // Derive unique categories from published projects
  const categories = useMemo(() => {
    const set = new Set<string>();
    projects.forEach((p) => {
      if (p.category) set.add(p.category);
    });
    return ["ALL", ...Array.from(set)];
  }, [projects]);

  // Filter projects dynamically
  const filteredProjects = useMemo(() => {
    if (selectedCategory === "ALL") return projects;
    return projects.filter((p) => p.category === selectedCategory);
  }, [projects, selectedCategory]);

  return (
    <div className="py-12 sm:py-16">
      <Container>
        {/* Navigation Breadcrumb */}
        <div className="mb-8 flex items-center justify-between">
          <Link
            href="/portfolio#projects"
            className="inline-flex items-center gap-2 text-xs font-mono text-[var(--text-secondary)] hover:text-[var(--accent-lime)] transition-colors p-1"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Main Portfolio</span>
          </Link>

          <span className="text-[11px] font-mono text-[var(--text-tertiary)] hidden sm:inline-flex items-center gap-1.5">
            <Terminal className="w-3.5 h-3.5 text-[var(--accent-lime)]" />
            <span>ARCHIVE // TOTAL_ENTRIES: {projects.length}</span>
          </span>
        </div>

        {/* Header Block */}
        <div className="mb-12 border-b border-[var(--border-subtle)] pb-10">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] text-[11px] font-mono text-[var(--accent-lime)] mb-4">
            <FolderGit2 className="w-3.5 h-3.5" />
            <span>SYSTEM_REPOSITORY // ALL_PROJECTS</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[var(--text-primary)] mb-4">
            All Projects
          </h1>

          <p className="text-sm sm:text-base text-[var(--text-secondary)] max-w-2xl leading-relaxed mb-6">
            An overview of the applications, experiments, and engineering projects I&apos;ve built.
          </p>

          {/* Quick Metrics Bar */}
          <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-[var(--text-tertiary)]">
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[var(--bg-surface)] border border-[var(--border-subtle)]">
              <span className="w-2 h-2 rounded-full bg-[var(--accent-lime)]" />
              <span>Published Systems:</span>
              <strong className="text-[var(--text-primary)] font-semibold">{projects.length}</strong>
            </span>

            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[var(--bg-surface)] border border-[var(--border-subtle)]">
              <span>Featured Highlights:</span>
              <strong className="text-[var(--accent-lime)] font-semibold">
                {projects.filter((p) => p.featured).length}
              </strong>
            </span>
          </div>
        </div>

        {/* Category Filters Bar */}
        {categories.length > 2 && (
          <div className="mb-8 flex flex-wrap items-center gap-2">
            <span className="text-xs font-mono text-[var(--text-tertiary)] flex items-center gap-1.5 mr-2">
              <Filter className="w-3.5 h-3.5" />
              <span>Filter:</span>
            </span>
            {categories.map((cat) => {
              const count =
                cat === "ALL"
                  ? projects.length
                  : projects.filter((p) => p.category === cat).length;
              const isActive = selectedCategory === cat;

              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                    isActive
                      ? "bg-[var(--accent-lime)] text-black font-semibold shadow-[0_0_12px_rgba(163,230,53,0.3)]"
                      : "bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--border-strong)]"
                  }`}
                >
                  {cat === "ALL" ? "All Categories" : cat} ({count})
                </button>
              );
            })}
          </div>
        )}

        {/* Project Collection List / Grid */}
        {filteredProjects.length > 0 ? (
          <div className="space-y-8">
            {filteredProjects.map((project, idx) => (
              <ProjectCard
                key={project.slug}
                project={project}
                priority={idx === 0}
                showFeaturedBadge={true}
              />
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="p-12 text-center rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] max-w-xl mx-auto my-12">
            <div className="w-12 h-12 rounded-xl bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] flex items-center justify-center mx-auto mb-4 text-[var(--text-tertiary)]">
              <Layers className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-[var(--text-primary)] mb-2">
              No Projects Found
            </h3>
            <p className="text-xs sm:text-sm text-[var(--text-secondary)] mb-6">
              No published projects currently match the selected category.
            </p>
            <button
              type="button"
              onClick={() => setSelectedCategory("ALL")}
              className="px-4 py-2 rounded-lg bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] text-xs font-mono text-[var(--accent-lime)] hover:border-[var(--accent-lime)] transition-colors"
            >
              Reset Category Filter
            </button>
          </div>
        )}
      </Container>
    </div>
  );
}

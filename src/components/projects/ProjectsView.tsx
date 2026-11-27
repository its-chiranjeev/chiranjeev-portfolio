"use client";

import { Container } from "@/components/ui/Container";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { ProjectNavSidebar } from "@/components/projects/ProjectNavSidebar";
import { ProjectCaseStudy } from "@/types/project";
import { scrollToTarget } from "@/lib/smoothScroll";
import { ArrowLeft, ChevronDown, Filter, FolderGit2, Layers, Terminal } from "lucide-react";
import Link from "next/link";
import { useMemo, useState, useCallback, useEffect, useRef } from "react";
import { BottomSheet, BottomSheetOption } from "@/components/ui/BottomSheet";

interface ProjectsViewProps {
  projects: ProjectCaseStudy[];
}

export function ProjectsView({ projects }: ProjectsViewProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const pendingScrollSlugRef = useRef<string | null>(null);

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

  const [isFilterSheetOpen, setIsFilterSheetOpen] = useState(false);

  const currentCount = useMemo(() => {
    return selectedCategory === "ALL"
      ? projects.length
      : projects.filter((p) => p.category === selectedCategory).length;
  }, [projects, selectedCategory]);

  const bottomSheetOptions: BottomSheetOption[] = useMemo(() => {
    return categories.map((cat) => {
      const count =
        cat === "ALL"
          ? projects.length
          : projects.filter((p) => p.category === cat).length;
      return {
        id: cat,
        label: cat === "ALL" ? "All Categories" : cat,
        count,
      };
    });
  }, [categories, projects]);

  // Filter-safe project selection
  const handleSelectProject = useCallback(
    (slug: string) => {
      const isCurrentlyVisible = filteredProjects.some((p) => p.slug === slug);
      if (isCurrentlyVisible) {
        scrollToTarget(`#project-${slug}`, { offset: 80, duration: 0.85 });
      } else {
        // If hidden by current category filter, reset filter to "ALL"
        // and record the target slug in ref
        pendingScrollSlugRef.current = slug;
        setSelectedCategory("ALL");
      }
    },
    [filteredProjects]
  );

  // Execute scheduled scroll as soon as React renders the complete collection into the DOM
  useEffect(() => {
    const slug = pendingScrollSlugRef.current;
    if (!slug) return;

    const targetElement = document.getElementById(`project-${slug}`);
    if (targetElement) {
      pendingScrollSlugRef.current = null;
      scrollToTarget(`#project-${slug}`, { offset: 80, duration: 0.85 });
    }
  }, [filteredProjects]);

  return (
    <div className="py-12 sm:py-16">
      <Container size="wide">
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
            <span>Total Projects: {projects.length}</span>
          </span>
        </div>

        {/* Header Block */}
        <div className="mb-12 border-b border-[var(--border-subtle)] pb-10">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] text-[11px] font-mono text-[var(--accent-lime)] mb-4">
            <FolderGit2 className="w-3.5 h-3.5" />
            <span>Curated Project Catalog</span>
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
              <span>Published Projects:</span>
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

        {/* Main Content Layout: Collapsible Sidebar + Complete Projects Directory */}
        <div className="flex flex-col md:flex-row items-start gap-8 lg:gap-10">
          {/* Desktop Sticky Navigation Sidebar & Mobile Trigger/Drawer */}
          <div className="w-full md:w-auto shrink-0 md:sticky md:top-24 md:self-start z-20">
            <ProjectNavSidebar
              projects={projects}
              onSelectProject={handleSelectProject}
            />
          </div>

          {/* Directory Content Column: Category Filters Bar + Projects Collection */}
          <div className="flex-1 min-w-0 w-full">
            {/* Category Filters Bar */}
            {categories.length > 2 && (
              <>
                {/* Mobile Filter Trigger (Below sm) */}
                <div className="sm:hidden mb-6">
                  <button
                    type="button"
                    onClick={() => setIsFilterSheetOpen(true)}
                    className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-xs font-mono text-[var(--text-primary)] hover:border-[var(--accent-lime)] transition-colors cursor-pointer shadow-xs min-h-[48px]"
                    aria-label="Filter projects by category"
                    aria-haspopup="dialog"
                    aria-expanded={isFilterSheetOpen}
                  >
                    <div className="flex items-center gap-2.5 min-w-0 pr-2">
                      <Filter className="w-4 h-4 text-[var(--accent-lime)] shrink-0" />
                      <span className="text-[11px] text-[var(--text-tertiary)] uppercase tracking-wider shrink-0">
                        Filter:
                      </span>
                      <span className="font-bold text-xs text-[var(--text-primary)] truncate">
                        {selectedCategory === "ALL" ? "All Categories" : selectedCategory}
                      </span>
                      <span className="text-[10px] px-1.5 py-0.2 rounded-full font-mono bg-[var(--bg-surface-elevated)] text-[var(--text-secondary)] border border-[var(--border-subtle)] shrink-0">
                        {currentCount}
                      </span>
                    </div>
                    <ChevronDown className="w-4 h-4 text-[var(--text-tertiary)] shrink-0" />
                  </button>
                </div>

                {/* Desktop Category Filters Bar (sm and Above) */}
                <div className="hidden sm:flex sm:items-center gap-3 mb-8">
                  <span className="text-xs font-mono text-[var(--text-tertiary)] flex items-center gap-1.5 shrink-0">
                    <Filter className="w-3.5 h-3.5 text-[var(--accent-lime)]" />
                    <span>Filter:</span>
                  </span>
                  <div className="flex flex-wrap items-center gap-2">
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
                          className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono whitespace-nowrap cursor-pointer transition-all border ${
                            isActive
                              ? "bg-[var(--accent-lime)] text-[var(--accent-lime-fg)] border-[var(--accent-lime)] font-bold shadow-xs shadow-[0_0_12px_rgba(163,230,53,0.25)]"
                              : "bg-[var(--bg-surface-elevated)] text-[var(--text-secondary)] border-[var(--border-subtle)] hover:text-[var(--text-primary)] hover:border-[var(--border-strong)]"
                          }`}
                        >
                          <span>{cat === "ALL" ? "All Categories" : cat}</span>
                          <span
                            className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                              isActive
                                ? "bg-black/15 text-[var(--accent-lime-fg)] font-semibold"
                                : "bg-[var(--bg-surface-subtle)] text-[var(--text-tertiary)]"
                            }`}
                          >
                            {count}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Mobile Bottom Sheet Filter Dialog */}
                <BottomSheet
                  isOpen={isFilterSheetOpen}
                  onClose={() => setIsFilterSheetOpen(false)}
                  title="Filter Projects"
                  description="Select a category to narrow the catalog"
                  options={bottomSheetOptions}
                  selectedId={selectedCategory}
                  onSelect={(cat) => setSelectedCategory(cat)}
                />
              </>
            )}

            {/* Project Collection List */}
            {filteredProjects.length > 0 ? (
              <div className="space-y-6 sm:space-y-8">
                {filteredProjects.map((project, idx) => (
                  <div
                    key={project.slug}
                    id={`project-${project.slug}`}
                    data-project-slug={project.slug}
                    className="scroll-mt-24 sm:scroll-mt-28"
                  >
                    <ProjectCard
                      project={project}
                      index={idx}
                      priority={idx === 0}
                      showFeaturedBadge={true}
                    />
                  </div>
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
          </div>
        </div>
      </Container>
    </div>
  );
}

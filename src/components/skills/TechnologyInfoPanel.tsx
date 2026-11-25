"use client";

import React from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  FolderGit2,
  Sparkles,
  Layers,
  Code2,
  GraduationCap,
  Compass,
  CheckCircle2,
  X,
} from "lucide-react";
import { ResolvedTechnology } from "@/types/skill";

export interface TechnologyInfoPanelProps {
  selectedTech: ResolvedTechnology | null;
  onSelectRelated: (techName: string) => void;
  onClose?: () => void;
  isSideBySide?: boolean;
}

export function TechnologyInfoPanel({
  selectedTech,
  onSelectRelated,
  onClose,
  isSideBySide = false,
}: TechnologyInfoPanelProps) {
  if (!selectedTech) {
    if (isSideBySide) {
      return (
        <div
          id="technology-details"
          data-section="technology-analysis"
          className="w-full p-6 sm:p-8 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] shadow-sm space-y-3"
        >
          <div className="flex items-center gap-2 text-xs font-mono text-[var(--accent-lime)]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>TECHNOLOGY ANALYSIS</span>
          </div>
          <h3 className="text-lg font-bold text-[var(--text-primary)]">
            Select a Skill to Inspect Evidence
          </h3>
          <p className="text-xs text-[var(--text-tertiary)] leading-relaxed">
            Click any technology chip on the left to review verified production implementation,
            portfolio architecture, academic coursework, and architectural relationships.
          </p>
        </div>
      );
    }

    return (
      <div
        id="technology-details"
        data-section="technology-analysis"
        className="w-full p-6 sm:p-8 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] shadow-sm"
      >
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-1.5 max-w-xl">
            <div className="flex items-center gap-2 text-xs font-mono text-[var(--accent-lime)]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>INTERACTIVE EVIDENCE INSPECTION</span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-[var(--text-primary)]">
              Select Any Skill to Inspect Evidence
            </h3>
            <p className="text-xs text-[var(--text-tertiary)] leading-relaxed">
              Click any technology chip above to review verified production implementation,
              portfolio architecture, academic coursework, and architectural relationships.
            </p>
          </div>

          <div className="w-full md:w-auto shrink-0 flex flex-col sm:flex-row items-start sm:items-center gap-2.5">
            <span className="text-[11px] font-mono uppercase text-[var(--text-tertiary)] whitespace-nowrap">
              Suggested:
            </span>
            <div className="flex flex-wrap gap-2">
              {["TypeScript", "NestJS", "Next.js", "React", "PostgreSQL"].map((name) => (
                <button
                  key={name}
                  type="button"
                  onClick={() => onSelectRelated(name)}
                  className="px-2.5 py-1 text-xs font-mono rounded-md bg-[var(--bg-surface-elevated)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--accent-lime)] border border-[var(--border-subtle)] cursor-pointer transition-colors"
                >
                  {name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  const isCore = selectedTech.level === "Core";
  const tier = selectedTech.evidenceTier;

  return (
    <div
      id="technology-details"
      data-section="technology-analysis"
      className="w-full p-6 sm:p-7 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-strong)]/80 shadow-lg scroll-mt-28 transition-all"
    >
      {/* Top Header Row */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-5 border-b border-[var(--border-subtle)]">
        <div className="flex flex-wrap items-center gap-2">
          {isSideBySide && (
            <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--accent-lime)] bg-[var(--accent-lime-muted)] px-2 py-0.5 rounded font-bold border border-[var(--accent-lime)]/30">
              Technology Analysis
            </span>
          )}
          <span className="text-xs font-mono uppercase tracking-wider text-[var(--text-tertiary)] bg-[var(--bg-surface-elevated)] px-2.5 py-1 rounded-md border border-[var(--border-subtle)]">
            {selectedTech.categoryTitle}
          </span>
          <span
            className={`text-xs font-mono font-bold uppercase px-2.5 py-1 rounded-md ${
              isCore
                ? "bg-[var(--accent-lime)] text-[var(--accent-lime-fg)]"
                : selectedTech.level === "Proficient"
                ? "bg-[var(--bg-surface-elevated)] text-[var(--text-primary)] border border-[var(--border-strong)]"
                : selectedTech.level === "Familiar"
                ? "bg-[var(--bg-surface-subtle)] text-[var(--text-secondary)] border border-[var(--border-subtle)]"
                : "bg-[var(--badge-learning-bg)] text-[var(--badge-learning-fg)] border border-[var(--badge-learning-border)]"
            }`}
          >
            {selectedTech.level} Proficiency
          </span>
        </div>

        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-mono text-[var(--text-tertiary)] hover:text-[var(--text-primary)] bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] hover:border-[var(--border-strong)] cursor-pointer transition-colors"
            title="Deselect technology"
          >
            <span>Close Details</span>
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {isSideBySide ? (
        /* Vertical Flow for Side-by-Side Right Column */
        <div className="space-y-6 pt-6">
          {/* Identity & Evidence Summary */}
          <div className="space-y-3">
            <div>
              <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--text-primary)]">
                {selectedTech.name}
              </h3>

              {/* Evidence Banner */}
              <div className="mt-2.5">
                {tier === "production" && (
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md text-xs font-mono bg-[var(--badge-production-bg)] text-[var(--badge-production-fg)] border border-[var(--badge-production-border)]">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                    <span>Verified in Production Client Platforms</span>
                  </div>
                )}
                {tier === "portfolio" && (
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md text-xs font-mono bg-[var(--badge-portfolio-bg)] text-[var(--badge-portfolio-fg)] border border-[var(--badge-portfolio-border)]">
                    <Code2 className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
                    <span>Implemented in Personal Portfolio Architecture</span>
                  </div>
                )}
                {tier === "academic" && (
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md text-xs font-mono bg-[var(--badge-academic-bg)] text-[var(--badge-academic-fg)] border border-[var(--badge-academic-border)]">
                    <GraduationCap className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
                    <span>Academic Coursework & Independent Implementation</span>
                  </div>
                )}
                {tier === "learning" && (
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md text-xs font-mono bg-[var(--badge-learning-bg)] text-[var(--badge-learning-fg)] border border-[var(--badge-learning-border)]">
                    <Compass className="w-4 h-4 text-purple-600 dark:text-purple-400 shrink-0" />
                    <span>Actively Learning & Exploring</span>
                  </div>
                )}
              </div>
            </div>

            <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
              {selectedTech.evidenceSummary}
            </p>

            {selectedTech.aliases.length > 0 && (
              <p className="text-xs font-mono text-[var(--text-tertiary)]">
                Project techStack alias:{" "}
                <span className="text-[var(--text-secondary)] font-medium">
                  {selectedTech.aliases.join(", ")}
                </span>
              </p>
            )}
          </div>

          {/* Verified Applications & Case Studies */}
          <div className="space-y-3 pt-2 border-t border-[var(--border-subtle)]">
            <div className="flex items-center gap-2 text-xs font-mono font-semibold text-[var(--text-primary)]">
              <FolderGit2 className="w-4 h-4 text-[var(--accent-lime)]" />
              <span>VERIFIED APPLICATIONS & CASE STUDIES</span>
            </div>

            {selectedTech.linkedProjects.length > 0 ? (
              <div className="grid grid-cols-1 gap-2.5">
                {selectedTech.linkedProjects.map((project) => (
                  <Link
                    key={project.slug}
                    href={`/projects/${project.slug}`}
                    className="group block p-3.5 rounded-xl bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] hover:border-[var(--accent-lime)]/50 transition-all"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="space-y-1">
                        <h4 className="text-sm font-bold text-[var(--text-primary)] group-hover:text-[var(--accent-lime)] transition-colors flex items-center gap-1.5">
                          <span>{project.title}</span>
                          <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </h4>
                        <p className="text-xs text-[var(--text-tertiary)] line-clamp-2">
                          {project.tagline}
                        </p>
                      </div>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[var(--bg-surface-subtle)] text-[var(--text-secondary)] shrink-0 border border-[var(--border-subtle)]">
                        {project.role}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="p-4 rounded-xl bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)]/70 space-y-1.5">
                <p className="text-xs font-mono text-[var(--text-primary)]">
                  {tier === "portfolio"
                    ? "Demonstrated directly in this personal portfolio repository."
                    : tier === "academic"
                    ? "Evidenced in university degree coursework and independent development."
                    : "Explored in independent technical research."}
                </p>
                <p className="text-xs text-[var(--text-tertiary)] leading-relaxed">
                  {tier === "portfolio"
                    ? "Employed to construct responsive components, dynamic routing, animations, and theme systems across this site."
                    : tier === "academic"
                    ? "Applied across BCA/MCA laboratory assignments, coursework exams, and algorithmic problem-solving."
                    : "Applied in technical sandboxes without claiming commercial production implementation."}
                </p>
                <div className="pt-1">
                  <span className="text-[10px] font-mono text-[var(--text-tertiary)] uppercase tracking-wider bg-[var(--bg-surface-subtle)] px-2 py-0.5 rounded border border-[var(--border-subtle)]">
                    Truthful Evidence Contract &bull; No Client Link Claimed
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Related Domain Technologies */}
          {selectedTech.relatedTechnologies.length > 0 && (
            <div className="pt-2 border-t border-[var(--border-subtle)]">
              <div className="flex items-center gap-1.5 text-xs font-mono text-[var(--text-tertiary)] mb-2.5">
                <Layers className="w-3.5 h-3.5" />
                <span>RELATED DOMAIN TECHNOLOGIES</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {selectedTech.relatedTechnologies.map((siblingName) => (
                  <button
                    key={siblingName}
                    type="button"
                    onClick={() => onSelectRelated(siblingName)}
                    className="px-2.5 py-1 text-xs font-mono rounded-md bg-[var(--bg-surface-elevated)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--accent-lime)]/50 border border-[var(--border-subtle)] cursor-pointer transition-colors"
                  >
                    {siblingName}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Full-Width 2-Column Content for All Categories Mode */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-6 items-start">
          {/* Left Column: Technology Identity & Evidence Summary */}
          <div className="lg:col-span-6 space-y-4">
            <div>
              <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--text-primary)]">
                {selectedTech.name}
              </h3>

              {/* Evidence Banner */}
              <div className="mt-3">
                {tier === "production" && (
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md text-xs font-mono bg-[var(--badge-production-bg)] text-[var(--badge-production-fg)] border border-[var(--badge-production-border)]">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                    <span>Verified in Production Client Platforms</span>
                  </div>
                )}
                {tier === "portfolio" && (
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md text-xs font-mono bg-[var(--badge-portfolio-bg)] text-[var(--badge-portfolio-fg)] border border-[var(--badge-portfolio-border)]">
                    <Code2 className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
                    <span>Implemented in Personal Portfolio Architecture</span>
                  </div>
                )}
                {tier === "academic" && (
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md text-xs font-mono bg-[var(--badge-academic-bg)] text-[var(--badge-academic-fg)] border border-[var(--badge-academic-border)]">
                    <GraduationCap className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
                    <span>Academic Coursework & Independent Implementation</span>
                  </div>
                )}
                {tier === "learning" && (
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md text-xs font-mono bg-[var(--badge-learning-bg)] text-[var(--badge-learning-fg)] border border-[var(--badge-learning-border)]">
                    <Compass className="w-4 h-4 text-purple-600 dark:text-purple-400 shrink-0" />
                    <span>Actively Learning & Exploring</span>
                  </div>
                )}
              </div>
            </div>

            <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
              {selectedTech.evidenceSummary}
            </p>

            {selectedTech.aliases.length > 0 && (
              <p className="text-xs font-mono text-[var(--text-tertiary)] pt-1">
                Alternative name:{" "}
                <span className="text-[var(--text-secondary)] font-medium">
                  {selectedTech.aliases.join(", ")}
                </span>
              </p>
            )}

            {/* Related Domain Technologies */}
            {selectedTech.relatedTechnologies.length > 0 && (
              <div className="pt-2">
                <div className="flex items-center gap-1.5 text-xs font-mono text-[var(--text-tertiary)] mb-2.5">
                  <Layers className="w-3.5 h-3.5" />
                  <span>RELATED DOMAIN TECHNOLOGIES</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {selectedTech.relatedTechnologies.map((siblingName) => (
                    <button
                      key={siblingName}
                      type="button"
                      onClick={() => onSelectRelated(siblingName)}
                      className="px-2.5 py-1 text-xs font-mono rounded-md bg-[var(--bg-surface-elevated)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--accent-lime)]/50 border border-[var(--border-subtle)] cursor-pointer transition-colors"
                    >
                      {siblingName}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Applications & Verified Projects */}
          <div className="lg:col-span-6 space-y-4">
            <div className="flex items-center gap-2 text-xs font-mono font-semibold text-[var(--text-primary)]">
              <FolderGit2 className="w-4 h-4 text-[var(--accent-lime)]" />
              <span>VERIFIED APPLICATIONS & CASE STUDIES</span>
            </div>

            {selectedTech.linkedProjects.length > 0 ? (
              <div className="grid grid-cols-1 gap-3">
                {selectedTech.linkedProjects.map((project) => (
                  <Link
                    key={project.slug}
                    href={`/projects/${project.slug}`}
                    className="group block p-4 rounded-xl bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] hover:border-[var(--accent-lime)]/50 transition-all"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="space-y-1">
                        <h4 className="text-sm font-bold text-[var(--text-primary)] group-hover:text-[var(--accent-lime)] transition-colors flex items-center gap-1.5">
                          <span>{project.title}</span>
                          <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </h4>
                        <p className="text-xs text-[var(--text-tertiary)] line-clamp-2">
                          {project.tagline}
                        </p>
                      </div>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[var(--bg-surface-subtle)] text-[var(--text-secondary)] shrink-0 border border-[var(--border-subtle)]">
                        {project.role}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="p-5 rounded-xl bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)]/70 space-y-2">
                <p className="text-xs font-mono text-[var(--text-primary)]">
                  {tier === "portfolio"
                    ? "Demonstrated directly in this personal portfolio repository."
                    : tier === "academic"
                    ? "Evidenced in university degree coursework and independent development."
                    : "Explored in independent technical research."}
                </p>
                <p className="text-xs text-[var(--text-tertiary)] leading-relaxed">
                  {tier === "portfolio"
                    ? "Employed to construct responsive components, dynamic routing, animations, and theme systems across this site."
                    : tier === "academic"
                    ? "Applied across BCA/MCA laboratory assignments, coursework exams, and algorithmic problem-solving."
                    : "Applied in technical sandboxes without claiming commercial production implementation."}
                </p>
                <div className="pt-2">
                  <span className="text-[10px] font-mono text-[var(--text-tertiary)] uppercase tracking-wider bg-[var(--bg-surface-subtle)] px-2 py-0.5 rounded border border-[var(--border-subtle)]">
                    Truthful Evidence Contract &bull; No Client Link Claimed
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

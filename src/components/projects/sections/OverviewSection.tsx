import { OverviewSection as OverviewSectionType } from "@/types/project";
import { AlertCircle, Target } from "lucide-react";

interface OverviewSectionProps {
  section: OverviewSectionType;
}

export function OverviewSection({ section }: OverviewSectionProps) {
  return (
    <section id={section.id} className="py-12 border-b border-[var(--border-subtle)]">
      {/* Section Header */}
      <div className="flex items-center gap-3 mb-6">
        <span className="font-mono text-sm font-bold text-[var(--accent-lime)]">
          {section.sectionNumber} {"//"}
        </span>
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[var(--text-primary)]">
          {section.title}
        </h2>
      </div>

      <div className="space-y-6">
        {/* Problem Statement Card */}
        <div className="p-6 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-subtle)]">
          <div className="flex items-start gap-3 mb-3">
            <div className="p-2 rounded-lg bg-[var(--accent-lime-muted)] text-[var(--accent-lime)] shrink-0">
              <AlertCircle className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-[var(--accent-lime)] font-semibold block">
                The Core Challenge & Problem Space
              </span>
              <h3 className="text-base font-semibold text-[var(--text-primary)]">
                Problem Statement
              </h3>
            </div>
          </div>
          <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed pl-11">
            {section.problemStatement}
          </p>
        </div>

        {/* Objectives Grid */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Target className="w-4 h-4 text-[var(--accent-lime)]" />
            <h3 className="text-xs font-mono uppercase tracking-wider text-[var(--text-tertiary)]">
              Core Architectural Objectives
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {section.objectives.map((objective, idx) => (
              <div
                key={idx}
                className="p-4 rounded-lg bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] flex items-start gap-3"
              >
                <span className="font-mono text-xs font-bold text-[var(--accent-lime)] px-1.5 py-0.5 rounded bg-[var(--bg-canvas)] border border-[var(--border-subtle)] shrink-0">
                  0{idx + 1}
                </span>
                <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                  {objective}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

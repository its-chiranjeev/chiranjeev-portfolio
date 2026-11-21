import { ChallengesSolutionsSection as ChallengesSolutionsSectionType } from "@/types/project";
import { AlertTriangle, CheckCircle } from "lucide-react";

interface ChallengesSolutionsSectionProps {
  section: ChallengesSolutionsSectionType;
}

export function ChallengesSolutionsSection({ section }: ChallengesSolutionsSectionProps) {
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
        {section.items.map((item, idx) => (
          <div
            key={idx}
            className="p-6 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] space-y-4"
          >
            {/* Context Badge if provided */}
            {item.context && (
              <div className="flex items-center gap-2">
                <span className="font-mono text-[11px] px-2.5 py-0.5 rounded bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] text-[var(--accent-lime)] font-semibold uppercase tracking-wider">
                  Domain: {item.context}
                </span>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Challenge */}
              <div className="p-4 rounded-lg bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)]">
                <div className="flex items-center gap-2 text-amber-500 mb-2">
                  <AlertTriangle className="w-4 h-4 shrink-0" />
                  <span className="font-mono text-xs font-bold uppercase tracking-wider">
                    Engineering Challenge
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                  {item.challenge}
                </p>
              </div>

              {/* Solution */}
              <div className="p-4 rounded-lg bg-[var(--bg-surface-elevated)] border border-[var(--accent-lime)]/30">
                <div className="flex items-center gap-2 text-[var(--accent-lime)] mb-2">
                  <CheckCircle className="w-4 h-4 shrink-0" />
                  <span className="font-mono text-xs font-bold uppercase tracking-wider">
                    Architectural Solution
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-[var(--text-primary)] leading-relaxed">
                  {item.solution}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

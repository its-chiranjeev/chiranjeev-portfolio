import { ContributionsSection as ContributionsSectionType } from "@/types/project";
import { GitCommit, Tag } from "lucide-react";

interface ContributionsSectionProps {
  section: ContributionsSectionType;
}

export function ContributionsSection({ section }: ContributionsSectionProps) {
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

      <div className="space-y-4">
        {section.items.map((item, idx) => (
          <div
            key={idx}
            className="p-5 sm:p-6 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] hover:border-[var(--border-strong)] transition-all"
          >
            <div className="flex items-start gap-3.5">
              <div className="p-2 rounded-lg bg-[var(--bg-surface-elevated)] text-[var(--accent-lime)] shrink-0 mt-0.5">
                <GitCommit className="w-4 h-4" />
              </div>

              <div className="flex-1">
                <h3 className="text-base font-bold text-[var(--text-primary)] mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-4">
                  {item.description}
                </p>

                {item.tags && item.tags.length > 0 && (
                  <div className="flex flex-wrap items-center gap-1.5">
                    <Tag className="w-3 h-3 text-[var(--text-tertiary)] mr-1" />
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] font-mono text-[11px] text-[var(--text-secondary)]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

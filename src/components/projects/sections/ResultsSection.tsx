import { ResultsSection as ResultsSectionType } from "@/types/project";
import { CheckCircle2, Lightbulb } from "lucide-react";

interface ResultsSectionProps {
  section: ResultsSectionType;
}

export function ResultsSection({ section }: ResultsSectionProps) {
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
        {/* Results Bullet Points */}
        <div className="p-6 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-subtle)]">
          <h3 className="text-xs font-mono uppercase tracking-wider text-[var(--accent-lime)] font-semibold mb-4">
            Verified Outcomes & Technical Milestones
          </h3>
          <ul className="space-y-3">
            {section.bulletPoints.map((point, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-[var(--accent-lime)] shrink-0 mt-0.5" />
                <span className="text-sm text-[var(--text-secondary)] leading-relaxed">
                  {point}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Takeaways if present */}
        {section.takeaways && section.takeaways.length > 0 && (
          <div className="p-6 rounded-xl bg-[var(--bg-surface-elevated)] border border-[var(--accent-lime)]/30">
            <div className="flex items-center gap-2 mb-3">
              <Lightbulb className="w-4 h-4 text-[var(--accent-lime)]" />
              <h3 className="text-xs font-mono uppercase tracking-wider text-[var(--accent-lime)] font-semibold">
                Architectural Takeaways & Insights
              </h3>
            </div>
            <ul className="space-y-2.5">
              {section.takeaways.map((takeaway, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <span className="font-mono text-xs text-[var(--accent-lime)] mt-0.5">
                    &gt;
                  </span>
                  <span className="text-xs sm:text-sm text-[var(--text-primary)] leading-relaxed">
                    {takeaway}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}

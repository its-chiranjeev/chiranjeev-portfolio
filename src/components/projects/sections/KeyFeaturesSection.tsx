import { KeyFeaturesSection as KeyFeaturesSectionType } from "@/types/project";
import { CheckCircle2 } from "lucide-react";

interface KeyFeaturesSectionProps {
  section: KeyFeaturesSectionType;
}

export function KeyFeaturesSection({ section }: KeyFeaturesSectionProps) {
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

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {section.features.map((feature, idx) => (
          <div
            key={idx}
            className="p-5 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] flex items-start gap-3.5 hover:border-[var(--border-strong)] transition-all"
          >
            <div className="p-1.5 rounded-md bg-[var(--accent-lime-muted)] text-[var(--accent-lime)] shrink-0 mt-0.5">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-[var(--text-primary)] mb-1.5">
                {feature.title}
              </h3>
              <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                {feature.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

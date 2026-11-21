import { ArchitectureSection as ArchitectureSectionType } from "@/types/project";
import { ArrowRight, Cpu, Layers } from "lucide-react";

interface ArchitectureSectionProps {
  section: ArchitectureSectionType;
}

export function ArchitectureSection({ section }: ArchitectureSectionProps) {
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

      {/* Summary */}
      <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed mb-8 max-w-3xl">
        {section.summary}
      </p>

      {/* Components Grid */}
      {section.components && section.components.length > 0 && (
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-4">
            <Layers className="w-4 h-4 text-[var(--accent-lime)]" />
            <h3 className="text-xs font-mono uppercase tracking-wider text-[var(--text-tertiary)]">
              Topology & Service Components
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {section.components.map((comp) => (
              <div
                key={comp.name}
                className="p-5 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] hover:border-[var(--border-strong)] transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <h4 className="font-mono text-sm font-bold text-[var(--text-primary)]">
                      {comp.name}
                    </h4>
                    {comp.portOrLayer && (
                      <span className="font-mono text-[11px] px-2 py-0.5 rounded bg-[var(--accent-lime-muted)] text-[var(--accent-lime)] border border-[var(--accent-lime)]/30 shrink-0">
                        {comp.portOrLayer}
                      </span>
                    )}
                  </div>
                  <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                    {comp.role}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Request Flow Steps */}
      {section.flowSteps && section.flowSteps.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Cpu className="w-4 h-4 text-[var(--accent-lime)]" />
            <h3 className="text-xs font-mono uppercase tracking-wider text-[var(--text-tertiary)]">
              Execution Flow & Request Lifecycle
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {section.flowSteps.map((flow, idx) => (
              <div
                key={flow.step}
                className="p-5 rounded-xl bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] relative"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono text-xs font-bold text-[var(--accent-lime)] px-2 py-0.5 rounded bg-[var(--bg-canvas)] border border-[var(--border-subtle)]">
                    STEP {flow.step}
                  </span>
                  {idx < (section.flowSteps?.length ?? 0) - 1 && (
                    <ArrowRight className="w-4 h-4 text-[var(--text-tertiary)] hidden md:block" />
                  )}
                </div>
                <h4 className="text-sm font-bold text-[var(--text-primary)] mb-1.5">
                  {flow.title}
                </h4>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  {flow.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

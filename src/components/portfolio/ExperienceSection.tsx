import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ExperienceItem } from "@/types/experience";
import { Briefcase, Calendar, MapPin } from "lucide-react";

interface ExperienceSectionProps {
  experiences: ExperienceItem[];
}

export function ExperienceSection({ experiences }: ExperienceSectionProps) {
  return (
    <section id="experience" className="py-20 border-b border-[var(--border-subtle)]">
      <Container>
        <SectionHeading
          badge="EXPERIENCE"
          number="03"
          title="Professional Experience"
          description="Employment and independent development engineering history, focused on individual backend contributions."
        />

        <div className="space-y-8 relative before:absolute before:inset-0 before:left-3.5 sm:before:left-4 before:w-px before:bg-[var(--border-subtle)] before:hidden sm:before:block">
          {experiences.map((exp) => (
            <div key={exp.id} className="relative sm:pl-10">
              {/* Timeline marker icon */}
              <div className="hidden sm:flex absolute left-0 top-1.5 w-8 h-8 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-surface-elevated)] items-center justify-center text-[var(--accent-lime)]">
                <Briefcase className="w-3.5 h-3.5" />
              </div>

              <Card className="p-6 sm:p-8 bg-[var(--bg-surface)] hover:border-[var(--border-strong)] transition-all">
                {/* Header Strip */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[var(--border-subtle)] pb-4 mb-5">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-lg font-bold text-[var(--text-primary)]">
                        {exp.role}
                      </h3>
                      <Badge variant={exp.employmentType === "Internship" ? "lime" : "default"}>
                        {exp.employmentType}
                      </Badge>
                    </div>
                    <p className="font-mono text-sm text-[var(--accent-lime)] font-medium">
                      {exp.company}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-[var(--text-tertiary)]">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-[var(--accent-lime)]" />
                      {exp.period}
                    </span>
                    <span>&bull;</span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5" />
                      {exp.location}
                    </span>
                  </div>
                </div>

                {/* Summary */}
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-6">
                  {exp.summary}
                </p>

                {/* Highlights */}
                <div className="mb-6">
                  <h4 className="font-mono text-xs uppercase tracking-wider text-[var(--text-tertiary)] font-semibold mb-3">
                    Key Verified Contributions:
                  </h4>
                  <ul className="space-y-2.5 text-xs sm:text-sm text-[var(--text-secondary)]">
                    {exp.highlights.map((highlight, index) => (
                      <li key={index} className="flex items-start gap-2.5 leading-relaxed">
                        <span className="text-[var(--accent-lime)] font-mono text-xs mt-0.5 shrink-0">
                          &rsaquo;
                        </span>
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tech Pills */}
                <div className="pt-4 border-t border-[var(--border-subtle)] flex flex-wrap gap-1.5 items-center">
                  <span className="text-xs font-mono text-[var(--text-tertiary)] mr-2">
                    Stack:
                  </span>
                  {exp.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 rounded bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] text-[11px] font-mono text-[var(--text-secondary)]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </Card>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SkillCategory } from "@/types/skill";

interface SkillsSectionProps {
  categories: SkillCategory[];
}

export function SkillsSection({ categories }: SkillsSectionProps) {
  return (
    <section id="skills" className="py-20 border-b border-[var(--border-subtle)]">
      <Container>
        <SectionHeading
          badge="SKILLS"
          number="02"
          title="Technical Proficiencies & Tooling"
          description="Honest breakdown of technical skills, frameworks, database systems, and development tooling."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <Card
              key={category.id}
              className="p-6 bg-[var(--bg-surface)] hover:border-[var(--border-strong)] transition-all flex flex-col justify-between"
            >
              <div>
                <div className="border-b border-[var(--border-subtle)] pb-3 mb-4">
                  <h3 className="text-sm font-bold tracking-tight text-[var(--text-primary)]">
                    {category.title}
                  </h3>
                  {category.description && (
                    <p className="text-xs text-[var(--text-tertiary)] mt-1">
                      {category.description}
                    </p>
                  )}
                </div>

                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => {
                    const isCore = skill.level === "Core";
                    return (
                      <span
                        key={skill.name}
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-mono transition-colors border ${
                          isCore
                            ? "bg-[var(--accent-lime-muted)] text-[var(--accent-lime)] border-[var(--accent-lime)]/30 font-medium"
                            : "bg-[var(--bg-surface-elevated)] text-[var(--text-secondary)] border-[var(--border-subtle)]"
                        }`}
                      >
                        <span>{skill.name}</span>
                        {skill.level && (
                          <span
                            className={`text-[9px] uppercase px-1 rounded ${
                              isCore
                                ? "bg-[var(--accent-lime)] text-black font-bold"
                                : "text-[var(--text-tertiary)] bg-[var(--bg-canvas)]"
                            }`}
                          >
                            {skill.level}
                          </span>
                        )}
                      </span>
                    );
                  })}
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Legend */}
        <div className="mt-8 pt-4 border-t border-[var(--border-subtle)] flex flex-wrap items-center justify-between text-xs font-mono text-[var(--text-tertiary)] gap-4">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[var(--accent-lime)]" />
              <span>Core: Daily production focus</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[var(--text-tertiary)]" />
              <span>Proficient: Shipped in projects</span>
            </span>
          </div>
          <span>Total categories: {categories.length}</span>
        </div>
      </Container>
    </section>
  );
}

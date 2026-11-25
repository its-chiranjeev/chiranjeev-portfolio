import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CertificationItem, EducationItem } from "@/types/education";
import { Award, GraduationCap } from "lucide-react";

interface EducationSectionProps {
  education: EducationItem[];
  certifications: CertificationItem[];
}

export function EducationSection({
  education,
  certifications,
}: EducationSectionProps) {
  return (
    <section id="education" className="py-20 border-b border-[var(--border-subtle)]">
      <Container>
        <SectionHeading
          badge="ACADEMIC BACKGROUND"
          number="05"
          title="Academic Credentials & Certifications"
          description="Formal academic degrees in computer applications and verified technical certifications."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Degrees */}
          <div className="lg:col-span-7 space-y-6">
            <h3 className="text-sm font-mono uppercase tracking-wider text-[var(--text-tertiary)] font-semibold flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-[var(--accent-lime)]" />
              <span>Formal Degrees</span>
            </h3>

            {education.map((item) => (
              <Card
                key={item.id}
                className="p-6 bg-[var(--bg-surface)] hover:border-[var(--border-strong)] transition-all"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[var(--border-subtle)] pb-3 mb-4">
                  <div>
                    <h4 className="text-base font-bold text-[var(--text-primary)]">
                      {item.degree}
                    </h4>
                    <p className="font-mono text-xs text-[var(--accent-lime)] mt-0.5">
                      {item.institution}
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-mono text-[var(--text-tertiary)]">
                      {item.period}
                    </span>
                    <Badge variant={item.status === "Pursuing" ? "lime" : "default"}>
                      {item.status}
                    </Badge>
                  </div>
                </div>

                {item.highlights && item.highlights.length > 0 && (
                  <ul className="space-y-2 text-xs sm:text-sm text-[var(--text-secondary)]">
                    {item.highlights.map((highlight, index) => (
                      <li key={index} className="flex items-start gap-2 leading-relaxed">
                        <span className="text-[var(--accent-lime)] font-mono text-xs mt-0.5">
                          &rsaquo;
                        </span>
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </Card>
            ))}
          </div>

          {/* Right Column: Certifications */}
          <div className="lg:col-span-5 space-y-6">
            <h3 className="text-sm font-mono uppercase tracking-wider text-[var(--text-tertiary)] font-semibold flex items-center gap-2">
              <Award className="w-4 h-4 text-[var(--accent-lime)]" />
              <span>Verified Certifications</span>
            </h3>

            <div className="space-y-4">
              {certifications.map((cert) => (
                <Card
                  key={cert.id}
                  className="p-5 bg-[var(--bg-surface)] hover:border-[var(--border-strong)] transition-all"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="text-sm font-semibold text-[var(--text-primary)] mb-1">
                        {cert.title}
                      </h4>
                      <p className="font-mono text-xs text-[var(--accent-lime)]">
                        {cert.issuer}
                      </p>
                    </div>
                    <Badge variant="subtle" className="text-[10px]">
                      Verified
                    </Badge>
                  </div>
                </Card>
              ))}
            </div>

            {/* Quick Context Card */}
            <Card className="p-5 bg-[var(--bg-surface-elevated)] border-[var(--border-subtle)] text-xs text-[var(--text-secondary)] leading-relaxed">
              <span className="font-mono font-semibold text-[var(--text-primary)] block mb-1.5">
                Academic Focus:
              </span>
              Emphasizing computer application fundamentals, data structures, relational database management systems (RDBMS), and distributed web services.
            </Card>
          </div>
        </div>
      </Container>
    </section>
  );
}

import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CheckCircle2, Code, Cpu, Database, Shield } from "lucide-react";

export function AboutSection() {
  const pillars = [
    {
      icon: Cpu,
      title: "Full-Stack Application Architecture",
      description:
        "Building responsive Next.js and React user interfaces backed by modular NestJS and Node.js server pipelines with strict type safety.",
    },
    {
      icon: Database,
      title: "Relational Modeling & Migrations",
      description:
        "Building structured PostgreSQL schemas with TypeORM, managing reproducible migrations, and writing optimized relational queries.",
    },
    {
      icon: Code,
      title: "Modular Service & API Design",
      description:
        "Designing domain-driven microservices with clear boundaries, request pipeline DTO validation, and unified reverse-proxy gateways.",
    },
    {
      icon: Shield,
      title: "Defensive Security & RBAC",
      description:
        "Enforcing stateless JWT sessions, strict role-based route guards, double-submit CSRF cookie protection, and rate limiting with Helmet.",
    },
  ];

  return (
    <section id="about" className="py-20 border-b border-[var(--border-subtle)]">
      <Container>
        <SectionHeading
          badge="ABOUT ME"
          number="01"
          title="Engineering Focus & Background"
          description="A software engineer committed to robust full-stack architecture, data integrity, and clean interface design."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Narrative */}
          <div className="lg:col-span-7 space-y-5 text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
            <p>
              I am a <strong className="text-[var(--text-primary)] font-semibold">Software Engineer and Full-Stack Developer</strong> based in Ghaziabad, India. My engineering background focuses on building complete web applications—from modern React and Next.js frontend interfaces to scalable Node.js server architectures, resilient RESTful APIs, and transactional database systems.
            </p>
            <p>
              During my internship at <strong className="text-[var(--text-primary)] font-semibold">Digixito Media Pvt. Ltd.</strong>, I contributed individual backend engineering across production platforms (<span className="text-[var(--accent-lime)] font-mono text-xs">Poojawala</span> and <span className="text-[var(--accent-lime)] font-mono text-xs">HiChandra</span>). My responsibilities encompassed multi-role authentication (RBAC), complex booking lifecycles, Razorpay payments, RazorpayX payouts, and automated PDF tax invoice pipelines.
            </p>
            <p>
              In parallel, I develop and maintain independent, test-covered backend systems such as my open-source <strong className="text-[var(--text-primary)] font-semibold">NestJS URL Shortener</strong>, applying strict schema migrations, automated Jest and Supertest test suites, and OpenAPI contract documentation.
            </p>
            <p>
              Currently, I am pursuing my <strong className="text-[var(--text-primary)] font-semibold">Master of Computer Applications (MCA)</strong> at Dr. A.P.J. Abdul Kalam Technical University (2026–2028), having completed my <strong className="text-[var(--text-primary)] font-semibold">Bachelor of Computer Applications (BCA)</strong> at CCSU in 2026.
            </p>

            <div className="pt-2">
              <div className="flex flex-wrap gap-3">
                <span className="inline-flex items-center gap-1.5 text-xs font-mono text-[var(--text-tertiary)] bg-[var(--bg-surface-elevated)] px-3 py-1.5 rounded-lg border border-[var(--border-subtle)]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[var(--accent-lime)]" />
                  <span>Full-Stack Architecture</span>
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs font-mono text-[var(--text-tertiary)] bg-[var(--bg-surface-elevated)] px-3 py-1.5 rounded-lg border border-[var(--border-subtle)]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[var(--accent-lime)]" />
                  <span>REST & Microservices</span>
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs font-mono text-[var(--text-tertiary)] bg-[var(--bg-surface-elevated)] px-3 py-1.5 rounded-lg border border-[var(--border-subtle)]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[var(--accent-lime)]" />
                  <span>Relational Modeling & Testing</span>
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Architectural Pillars */}
          <div className="lg:col-span-5 grid grid-cols-1 gap-4">
            {pillars.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <Card
                  key={pillar.title}
                  className="p-5 bg-[var(--bg-surface)] hover:border-[var(--border-strong)] transition-all group"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-2 rounded-lg bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] text-[var(--accent-lime)] group-hover:border-[var(--accent-lime)]/40 transition-colors shrink-0">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-1">
                        {pillar.title}
                      </h3>
                      <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                        {pillar.description}
                      </p>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}

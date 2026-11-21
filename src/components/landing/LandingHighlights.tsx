import { Card } from "@/components/ui/Card";
import { ArrowUpRight, Cpu, Layers, Lock, Sparkles } from "lucide-react";
import Link from "next/link";

export function LandingHighlights() {
  const highlights = [
    {
      icon: Cpu,
      title: "Backend Architecture",
      description:
        "Modular microservices and REST gateways built with NestJS and Express.js, prioritizing strict contract validation and error handling.",
      tag: "NestJS / Node.js",
    },
    {
      icon: Layers,
      title: "Relational Modeling",
      description:
        "Schema design, versioned TypeORM migrations, indexed lookups, and transaction safety on PostgreSQL and MySQL.",
      tag: "PostgreSQL / TypeORM",
    },
    {
      icon: Lock,
      title: "Security & Governance",
      description:
        "Stateless JWT authorization, role-based access control (RBAC), double-submit CSRF guards, and rate limiting with Helmet.",
      tag: "JWT / RBAC / CSRF",
    },
    {
      icon: Sparkles,
      title: "Service Integrations",
      description:
        "Financial checkouts with Razorpay, technician payouts via RazorpayX, and automated PDF tax invoices via headless Puppeteer.",
      tag: "Razorpay / AWS S3 / PDF",
    },
  ];

  return (
    <section className="pb-16 sm:pb-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between mb-8 pb-3 border-b border-[var(--border-subtle)]">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs uppercase tracking-wider text-[var(--text-tertiary)] font-semibold">
              Core Capabilities Overview
            </span>
          </div>
          <Link
            href="/portfolio#skills"
            className="text-xs font-mono text-[var(--accent-lime)] hover:underline inline-flex items-center gap-1"
          >
            Full Tech Taxonomy <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {highlights.map((item) => {
            const Icon = item.icon;
            return (
              <Card
                key={item.title}
                className="p-5 flex flex-col justify-between hover:border-[var(--border-strong)] transition-all group"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="p-2 rounded-lg bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] text-[var(--accent-lime)] group-hover:border-[var(--accent-lime)]/40 transition-colors">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="font-mono text-[10px] text-[var(--text-tertiary)] bg-[var(--bg-surface-elevated)] px-2 py-0.5 rounded border border-[var(--border-subtle)]">
                      {item.tag}
                    </span>
                  </div>
                  <h2 className="text-base font-semibold text-[var(--text-primary)] mb-1.5">
                    {item.title}
                  </h2>
                  <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}

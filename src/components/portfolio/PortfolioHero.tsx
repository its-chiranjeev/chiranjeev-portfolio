import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { ArrowDown, Download, Terminal, Database, Server, ShieldCheck } from "lucide-react";

interface PortfolioHeroProps {
  name: string;
  title: string;
  location: string;
}

export function PortfolioHero({
  name,
  title,
  location,
}: PortfolioHeroProps) {
  return (
    <section className="relative pt-12 pb-20 sm:pt-20 sm:pb-28 border-b border-[var(--border-subtle)]">
      {/* Background subtle radial gradient */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20 dark:opacity-30"
        style={{
          backgroundImage:
            "radial-gradient(circle at 50% 0%, rgba(163, 230, 53, 0.15) 0%, transparent 70%)",
        }}
      />

      <Container className="relative">
        <div className="max-w-3xl">
          {/* Status and Session Tag */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-surface)] text-xs font-mono text-[var(--text-secondary)]">
              <Terminal className="w-3.5 h-3.5 text-[var(--accent-lime)]" />
              <span>portfolio.main_view</span>
            </div>
            <Badge variant="lime">
              Available for Opportunities
            </Badge>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[var(--text-primary)] mb-4">
            {name}
          </h1>

          {/* Subtitle / Positioning */}
          <p className="font-mono text-base sm:text-lg text-[var(--accent-lime)] font-semibold mb-6">
            {title} &bull; <span className="text-[var(--text-secondary)] font-normal">{location}</span>
          </p>

          {/* Hero Value Proposition */}
          <p className="text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed mb-8 max-w-2xl">
            Specializing in architecting modular REST microservices, transactional state machines, and relational database systems using <span className="text-[var(--text-primary)] font-medium">Node.js, NestJS, TypeScript,</span> and <span className="text-[var(--text-primary)] font-medium">PostgreSQL</span>. Experienced in shipping production-style internship platforms and verifiable open-source backend services.
          </p>

          {/* Fast Spec Tags */}
          <div className="flex flex-wrap items-center gap-2.5 mb-10">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] text-xs font-mono text-[var(--text-secondary)]">
              <Server className="w-3.5 h-3.5 text-[var(--accent-lime)]" />
              <span>NestJS / Express Microservices</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] text-xs font-mono text-[var(--text-secondary)]">
              <Database className="w-3.5 h-3.5 text-[var(--accent-lime)]" />
              <span>PostgreSQL / TypeORM Migrations</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] text-xs font-mono text-[var(--text-secondary)]">
              <ShieldCheck className="w-3.5 h-3.5 text-[var(--accent-lime)]" />
              <span>JWT / RBAC / CSRF Defense</span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-4">
            <Button
              href="#projects"
              variant="primary"
              size="md"
              className="font-mono text-xs uppercase tracking-wider"
            >
              <span>Explore Projects</span>
              <ArrowDown className="w-4 h-4 ml-1" />
            </Button>

            <Button
              href="/resume/Chiranjeev_Rastogi_Resume.pdf"
              download="Chiranjeev_Rastogi_Resume.pdf"
              variant="secondary"
              size="md"
              className="font-mono text-xs"
            >
              <Download className="w-4 h-4 text-[var(--accent-lime)]" />
              <span>Download Resume</span>
            </Button>

            <Button
              href="#contact"
              variant="outline"
              size="md"
              className="font-mono text-xs"
            >
              <span>Get in Touch</span>
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}

import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { GithubIcon, LinkedinIcon } from "@/components/ui/icons";
import { ArrowRight, Download, Mail, MapPin, Terminal, Server, ShieldCheck, Database } from "lucide-react";
import Image from "next/image";

interface LandingHeroProps {
  name: string;
  title: string;
  location: string;
  socials: {
    github: string;
    linkedin: string;
    email: string;
  };
}

export function LandingHero({
  name,
  title,
  location,
  socials,
}: LandingHeroProps) {
  return (
    <section className="relative pt-8 pb-16 sm:pt-16 sm:pb-24">
      {/* Visual background subtle grid glow */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20 dark:opacity-30"
        style={{
          backgroundImage:
            "radial-gradient(circle at 50% 20%, rgba(163, 230, 53, 0.15) 0%, transparent 60%)",
        }}
      />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6">
        {/* Terminal Header Tag */}
        <div className="flex items-center justify-between mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-surface)] text-xs font-mono text-[var(--text-secondary)]">
            <Terminal className="w-3.5 h-3.5 text-[var(--accent-lime)]" />
            <span>welcome.session // backend_profile</span>
          </div>

          <Badge variant="lime" className="hidden sm:inline-flex">
            Available for Opportunities
          </Badge>
        </div>

        {/* Main Hero Showcase Card */}
        <Card className="p-6 sm:p-10 relative overflow-hidden border-[var(--border-subtle)] bg-[var(--bg-surface)] shadow-2xl">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8 sm:gap-10">
            {/* Developer Photograph */}
            <div className="relative shrink-0">
              <div className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-2xl overflow-hidden border-2 border-[var(--border-subtle)] bg-[var(--bg-surface-elevated)] p-1 shadow-inner group">
                <Image
                  src="/images/avatar.jpg"
                  alt={`Photograph of ${name}`}
                  fill
                  priority
                  sizes="(max-width: 640px) 144px, 176px"
                  className="object-cover rounded-xl grayscale-[20%] contrast-[105%] group-hover:grayscale-0 transition-all duration-300"
                />
              </div>

              {/* Status Pill beneath photo */}
              <div className="mt-3 flex items-center justify-center gap-1.5 font-mono text-[11px] text-[var(--text-tertiary)] bg-[var(--bg-surface-elevated)] py-1 px-2.5 rounded-full border border-[var(--border-subtle)]">
                <span className="w-2 h-2 rounded-full bg-[var(--accent-lime)] inline-block" />
                <span>Backend Engineering</span>
              </div>
            </div>

            {/* Profile Bio & Content */}
            <div className="flex-1 text-center md:text-left">
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mb-2">
                <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[var(--text-primary)]">
                  {name}
                </h1>
              </div>

              {/* Professional Positioning */}
              <p className="font-mono text-xs sm:text-sm text-[var(--accent-lime)] font-semibold tracking-tight mb-3">
                {title} / Backend-focused Full-Stack Developer
              </p>

              {/* Location */}
              <div className="inline-flex items-center gap-1.5 text-xs text-[var(--text-tertiary)] mb-5">
                <MapPin className="w-3.5 h-3.5 text-[var(--accent-lime)]" />
                <span>{location}</span>
              </div>

              {/* Short Professional Introduction */}
              <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed mb-6 max-w-2xl">
                I engineer resilient REST APIs, transactional workflows, and relational
                database systems with <span className="text-[var(--text-primary)] font-medium">Node.js, NestJS, TypeScript,</span> and <span className="text-[var(--text-primary)] font-medium">PostgreSQL</span>. Experienced in production-style internship platforms and independent API development with an emphasis on defensive security, modular boundaries, and clean contracts.
              </p>

              {/* Core Technical Highlights Chips */}
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mb-8">
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] text-xs font-mono text-[var(--text-secondary)]">
                  <Server className="w-3 h-3 text-[var(--accent-lime)]" />
                  <span>NestJS & Express</span>
                </div>
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] text-xs font-mono text-[var(--text-secondary)]">
                  <Database className="w-3 h-3 text-[var(--accent-lime)]" />
                  <span>PostgreSQL & TypeORM</span>
                </div>
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] text-xs font-mono text-[var(--text-secondary)]">
                  <ShieldCheck className="w-3 h-3 text-[var(--accent-lime)]" />
                  <span>JWT & RBAC</span>
                </div>
              </div>

              {/* Call to Actions */}
              <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-3.5 mb-8">
                <Button
                  href="/portfolio"
                  variant="primary"
                  size="md"
                  className="w-full sm:w-auto font-mono text-xs uppercase tracking-wider"
                >
                  Explore Portfolio <ArrowRight className="w-4 h-4 ml-1" />
                </Button>

                <Button
                  href="/resume/Chiranjeev_Rastogi_Resume.pdf"
                  download="Chiranjeev_Rastogi_Resume.pdf"
                  variant="secondary"
                  size="md"
                  className="w-full sm:w-auto font-mono text-xs tracking-tight"
                >
                  <Download className="w-4 h-4 text-[var(--accent-lime)]" />
                  <span>Download Resume (PDF)</span>
                </Button>
              </div>

              {/* Verified External Social Links */}
              <div className="pt-6 border-t border-[var(--border-subtle)] flex flex-wrap items-center justify-center md:justify-start gap-5">
                <a
                  href={socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-mono text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                >
                  <GithubIcon className="w-4 h-4 text-[var(--text-tertiary)]" />
                  <span>github.com/its-chiranjeev</span>
                </a>

                <a
                  href={socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-mono text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                >
                  <LinkedinIcon className="w-4 h-4 text-[var(--text-tertiary)]" />
                  <span>linkedin.com/in/chiranjeev-rastogi</span>
                </a>

                <a
                  href={socials.email}
                  className="inline-flex items-center gap-2 text-xs font-mono text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                >
                  <Mail className="w-4 h-4 text-[var(--text-tertiary)]" />
                  <span>chiranjeevrastogi@gmail.com</span>
                </a>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}

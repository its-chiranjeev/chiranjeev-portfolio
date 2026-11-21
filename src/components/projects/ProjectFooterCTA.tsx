import { Button } from "@/components/ui/Button";
import { LinkedinIcon } from "@/components/ui/icons";
import { ArrowLeft, Mail } from "lucide-react";

export function ProjectFooterCTA() {
  return (
    <section className="py-16 text-center">
      <div className="max-w-2xl mx-auto p-8 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] relative overflow-hidden">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--accent-lime-muted)] text-[var(--accent-lime)] text-xs font-mono font-medium mb-4">
          <span className="w-2 h-2 rounded-full bg-[var(--accent-lime)] animate-pulse" />
          Open for Backend Opportunities
        </div>

        <h3 className="text-2xl font-bold tracking-tight text-[var(--text-primary)] mb-3">
          Interested in Technical Architecture or Collaboration?
        </h3>

        <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-6">
          I am actively looking for opportunities as a Node.js Backend Developer or Backend-focused Full-Stack Developer. Let&apos;s talk about distributed APIs, database optimization, or reliable system design.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <Button
            href="mailto:chiranjeev.rastogi@gmail.com"
            variant="primary"
            size="md"
            className="font-mono text-xs uppercase tracking-wider"
          >
            <Mail className="w-4 h-4 mr-2" />
            <span>Contact via Email</span>
          </Button>

          <Button
            href="https://linkedin.com/in/chiranjeev-rastogi"
            target="_blank"
            rel="noopener noreferrer"
            variant="secondary"
            size="md"
            className="font-mono text-xs"
          >
            <LinkedinIcon className="w-4 h-4 mr-2" />
            <span>LinkedIn Message</span>
          </Button>

          <Button
            href="/portfolio#projects"
            variant="outline"
            size="md"
            className="font-mono text-xs"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            <span>Back to Projects</span>
          </Button>
        </div>
      </div>
    </section>
  );
}

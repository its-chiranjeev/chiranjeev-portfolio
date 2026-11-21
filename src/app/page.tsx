import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { getFeaturedProjects } from "@/lib/projects";
import { getSiteConfig } from "@/lib/content";
import { Terminal, ArrowRight, Code2 } from "lucide-react";

export default async function Home() {
  const site = await getSiteConfig();
  const featuredProjects = await getFeaturedProjects();

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 bg-[var(--bg-canvas)] text-[var(--text-primary)]">
      <div className="max-w-xl w-full">
        <Card className="p-8">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-2">
              <Terminal className="w-5 h-5 text-[var(--accent-lime)]" />
              <span className="font-mono text-xs text-[var(--text-secondary)]">
                architecture.phase3_verified
              </span>
            </div>
            <ThemeToggle />
          </div>

          <h1 className="text-3xl font-bold tracking-tight mb-2 text-[var(--text-primary)]">
            {site.name}
          </h1>
          <p className="font-mono text-sm text-[var(--accent-lime)] mb-4">
            {site.title} &bull; {site.location}
          </p>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-6">
            {site.tagline}
          </p>

          <div className="border-t border-[var(--border-subtle)] pt-6 mb-6">
            <div className="flex items-center justify-between mb-3">
              <span className="font-mono text-xs uppercase tracking-wider text-[var(--text-tertiary)] font-semibold">
                Typed Data Layer ({featuredProjects.length} Verified Projects)
              </span>
              <Code2 className="w-4 h-4 text-[var(--accent-lime)]" />
            </div>

            <div className="space-y-2">
              {featuredProjects.map((p) => (
                <div
                  key={p.slug}
                  className="flex items-center justify-between p-3 rounded-lg bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] text-xs font-mono"
                >
                  <span className="font-semibold text-[var(--text-primary)]">
                    0{p.order}. {p.title}
                  </span>
                  <Badge variant="lime">
                    {p.sections.length} sections
                  </Badge>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <span className="text-xs text-[var(--text-tertiary)] font-mono">
              Phase 3 Foundation Ready
            </span>
            <Button
              href="/portfolio"
              size="sm"
              variant="outline"
              className="font-mono text-xs"
            >
              Preview Architecture <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </div>
        </Card>
      </div>
    </main>
  );
}

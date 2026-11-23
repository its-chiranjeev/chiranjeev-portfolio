import { Container } from "@/components/ui/Container";
import { GithubIcon, LinkedinIcon } from "@/components/ui/icons";
import { CRLogo } from "@/components/brand/CRLogo";
import { ArrowUp } from "lucide-react";
import Link from "next/link";

export function PortfolioFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-[var(--border-subtle)] bg-[var(--bg-canvas)] py-12 text-xs font-mono text-[var(--text-tertiary)]">
      <Container>
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-[var(--border-subtle)]">
          {/* Left: Identity */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start md:items-center gap-3.5 text-center sm:text-left">
            <CRLogo variant="monogram" size={32} withBadge />
            <div>
              <span className="font-semibold text-sm text-[var(--text-primary)] block">
                Chiranjeev Rastogi
              </span>
              <p className="text-xs text-[var(--text-secondary)]">
                Software Engineer &bull; Ghaziabad, Uttar Pradesh, India
              </p>
            </div>
          </div>

          {/* Center: In-page navigation */}
          <nav aria-label="Footer Navigation" className="flex flex-wrap items-center justify-center gap-5 text-[var(--text-secondary)]">
            <Link href="/portfolio#about" className="hover:text-[var(--accent-lime)] transition-colors">
              About
            </Link>
            <Link href="/portfolio#skills" className="hover:text-[var(--accent-lime)] transition-colors">
              Skills
            </Link>
            <Link href="/portfolio#experience" className="hover:text-[var(--accent-lime)] transition-colors">
              Experience
            </Link>
            <Link href="/portfolio#projects" className="hover:text-[var(--accent-lime)] transition-colors">
              Projects
            </Link>
            <Link href="/portfolio#education" className="hover:text-[var(--accent-lime)] transition-colors">
              Education
            </Link>
            <Link href="/portfolio#contact" className="hover:text-[var(--accent-lime)] transition-colors">
              Contact
            </Link>
          </nav>

          {/* Right: Actions */}
          <div className="flex items-center gap-4">
            <a
              href="#main-content"
              className="p-2 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface-elevated)] hover:text-[var(--text-primary)] transition-colors"
              title="Return to top"
              aria-label="Return to top"
            >
              <ArrowUp className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Bottom strip */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span>&copy; {currentYear} Chiranjeev Rastogi. All rights reserved.</span>

          <div className="flex items-center gap-4 text-[var(--text-secondary)]">
            <a
              href="https://github.com/its-chiranjeev"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="hover:text-[var(--text-primary)] transition-colors"
            >
              <GithubIcon className="w-4 h-4" />
            </a>
            <a
              href="https://linkedin.com/in/chiranjeev-rastogi"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="hover:text-[var(--text-primary)] transition-colors"
            >
              <LinkedinIcon className="w-4 h-4" />
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}

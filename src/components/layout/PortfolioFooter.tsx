import { Container } from "@/components/ui/Container";
import { GithubIcon, LinkedinIcon } from "@/components/ui/icons";
import { ArrowUp, ArrowLeft } from "lucide-react";
import Link from "next/link";

export function PortfolioFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-[var(--border-subtle)] bg-[var(--bg-canvas)] py-12 text-xs font-mono text-[var(--text-tertiary)]">
      <Container>
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-[var(--border-subtle)]">
          {/* Left: Identity */}
          <div className="text-center md:text-left">
            <span className="font-semibold text-sm text-[var(--text-primary)] block mb-1">
              Chiranjeev Rastogi
            </span>
            <p className="text-xs text-[var(--text-secondary)]">
              Node.js Backend Developer &bull; Ghaziabad, Uttar Pradesh, India
            </p>
          </div>

          {/* Center: In-page navigation */}
          <div className="flex flex-wrap items-center justify-center gap-5 text-[var(--text-secondary)]">
            <a href="#about" className="hover:text-[var(--accent-lime)] transition-colors">
              About
            </a>
            <a href="#skills" className="hover:text-[var(--accent-lime)] transition-colors">
              Skills
            </a>
            <a href="#experience" className="hover:text-[var(--accent-lime)] transition-colors">
              Experience
            </a>
            <a href="#projects" className="hover:text-[var(--accent-lime)] transition-colors">
              Projects
            </a>
            <a href="#education" className="hover:text-[var(--accent-lime)] transition-colors">
              Education
            </a>
            <a href="#contact" className="hover:text-[var(--accent-lime)] transition-colors">
              Contact
            </a>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs text-[var(--accent-lime)] hover:underline"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Welcome Page</span>
            </Link>

            <a
              href="#hero"
              className="p-2 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface-elevated)] hover:text-[var(--text-primary)] transition-colors"
              title="Return to top"
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

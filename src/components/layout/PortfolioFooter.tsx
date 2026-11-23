import { Container } from "@/components/ui/Container";
import { GithubIcon, LinkedinIcon, XIcon, InstagramIcon, LeetCodeIcon } from "@/components/ui/icons";
import { CRLogo } from "@/components/brand/CRLogo";
import { ArrowUp, Mail } from "lucide-react";
import Link from "next/link";
import { getSiteConfig } from "@/lib/content";

export function PortfolioFooter() {
  const currentYear = new Date().getFullYear();
  const site = getSiteConfig();

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

          <div className="flex flex-wrap items-center justify-center gap-4 text-[var(--text-secondary)]">
            <a
              href={site.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
              className="hover:text-[var(--text-primary)] transition-colors p-1"
            >
              <GithubIcon className="w-4 h-4" />
            </a>
            <a
              href={site.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
              className="hover:text-[var(--text-primary)] transition-colors p-1"
            >
              <LinkedinIcon className="w-4 h-4" />
            </a>
            <a
              href={site.socials.email}
              aria-label="Send Email"
              className="hover:text-[var(--text-primary)] transition-colors p-1"
            >
              <Mail className="w-4 h-4" />
            </a>
            <a
              href={site.socials.x}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X (formerly Twitter) Profile"
              className="hover:text-[var(--text-primary)] transition-colors p-1"
            >
              <XIcon className="w-4 h-4" />
            </a>
            <a
              href={site.socials.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram Profile"
              className="hover:text-[var(--text-primary)] transition-colors p-1"
            >
              <InstagramIcon className="w-4 h-4" />
            </a>
            <a
              href={site.socials.leetcode}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LeetCode Profile"
              className="hover:text-[var(--text-primary)] transition-colors p-1"
            >
              <LeetCodeIcon className="w-4 h-4" />
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}

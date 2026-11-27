"use client";

import { Container } from "@/components/ui/Container";
import { GithubIcon, LinkedinIcon, XIcon, InstagramIcon, LeetCodeIcon } from "@/components/ui/icons";
import { CRLogo } from "@/components/brand/CRLogo";
import { ArrowUp, Mail } from "lucide-react";
import { getSiteConfig } from "@/lib/content";
import { scrollToTarget } from "@/lib/smoothScroll";

interface PortfolioFooterProps {
  isPortfolioPage?: boolean;
}

export function PortfolioFooter({ isPortfolioPage = false }: PortfolioFooterProps) {
  const currentYear = new Date().getFullYear();
  const site = getSiteConfig();
  const basePath = isPortfolioPage ? "" : "/portfolio";

  const handleReturnToTop = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    scrollToTarget("#hero", {
      offset: 64,
      duration: 0.9,
      ease: "power2.inOut",
      updateHash: true,
    });
  };

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    sectionId: string
  ) => {
    if (isPortfolioPage) {
      e.preventDefault();
      scrollToTarget(sectionId, {
        offset: 64,
        duration: 0.9,
        ease: "power2.inOut",
        updateHash: true,
      });
    }
  };

  return (
    <footer className="border-t border-[var(--border-subtle)] bg-[var(--bg-canvas)] py-12 text-xs font-mono text-[var(--text-tertiary)]">
      <Container size="wide">
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
            <a
              href={`${basePath}#about`}
              onClick={(e) => handleNavClick(e, "#about")}
              className="hover:text-[var(--accent-lime)] transition-colors"
            >
              About
            </a>
            <a
              href={`${basePath}#skills`}
              onClick={(e) => handleNavClick(e, "#skills")}
              className="hover:text-[var(--accent-lime)] transition-colors"
            >
              Skills
            </a>
            <a
              href={`${basePath}#experience`}
              onClick={(e) => handleNavClick(e, "#experience")}
              className="hover:text-[var(--accent-lime)] transition-colors"
            >
              Experience
            </a>
            <a
              href={`${basePath}#projects`}
              onClick={(e) => handleNavClick(e, "#projects")}
              className="hover:text-[var(--accent-lime)] transition-colors"
            >
              Projects
            </a>
            <a
              href={`${basePath}#education`}
              onClick={(e) => handleNavClick(e, "#education")}
              className="hover:text-[var(--accent-lime)] transition-colors"
            >
              Education
            </a>
            <a
              href={`${basePath}#contact`}
              onClick={(e) => handleNavClick(e, "#contact")}
              className="hover:text-[var(--accent-lime)] transition-colors"
            >
              Contact
            </a>
          </nav>

          {/* Right: Actions */}
          <div className="flex items-center gap-4">
            <a
              href="#hero"
              onClick={handleReturnToTop}
              className="p-2 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface-elevated)] hover:text-[var(--text-primary)] transition-colors cursor-pointer"
              title="Return to top"
              aria-label="Return to top"
            >
              <ArrowUp className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Bottom strip */}
        <div className="pt-6 flex flex-col gap-3">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
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

          <div className="text-center sm:text-left text-[11px] text-[var(--text-secondary)] tracking-tight">
            Designed &amp; Developed by Chiranjeev Rastogi
          </div>
        </div>
      </Container>
    </footer>
  );
}

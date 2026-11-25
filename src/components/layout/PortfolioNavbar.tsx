"use client";

import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { GithubIcon, LinkedinIcon } from "@/components/ui/icons";
import { CRLogo } from "@/components/brand/CRLogo";
import { Menu, X, FileText } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { scrollToTarget, useHashScroll } from "@/lib/smoothScroll";

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Education", href: "#education" },
  { label: "Contact", href: "#contact" },
];

export function PortfolioNavbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();
  const router = useRouter();

  // Support direct navigation to existing hash URLs on mount / hashchange
  useHashScroll();

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    const isPortfolioPage = pathname === "/portfolio" || pathname === "/";

    if (isPortfolioPage) {
      e.preventDefault();
      setMobileMenuOpen(false);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          scrollToTarget(href, {
            offset: 64,
            duration: 0.9,
            ease: "power2.inOut",
            updateHash: true,
          });
        });
      });
    } else {
      setMobileMenuOpen(false);
      router.push(`/portfolio${href}`);
    }
  };

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const isPortfolioPage = pathname === "/portfolio" || pathname === "/";

    if (isPortfolioPage) {
      e.preventDefault();
      setMobileMenuOpen(false);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          scrollToTarget("#hero", {
            offset: 64,
            duration: 0.9,
            ease: "power2.inOut",
            updateHash: true,
          });
        });
      });
    }
  };

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mobileMenuOpen]);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[var(--border-subtle)] bg-[var(--bg-canvas)]/85 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Left: Brand Identity */}
        <div className="flex items-center gap-4">
          <CRLogo
            variant="navbar"
            href="/portfolio"
            size={24}
            onClick={handleLogoClick}
          />
        </div>

        {/* Center: Desktop Section Anchors */}
        <nav aria-label="Section Navigation" className="hidden lg:flex items-center gap-6">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="text-xs font-mono text-[var(--text-secondary)] hover:text-[var(--accent-lime)] transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right: Actions, Socials, Theme Toggle */}
        <div className="hidden sm:flex items-center gap-4">
          <a
            href="/resume/Chiranjeev_Rastogi_Resume.pdf"
            download="Chiranjeev_Rastogi_Resume.pdf"
            className="text-xs font-mono text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors flex items-center gap-1"
          >
            <FileText className="w-3.5 h-3.5 text-[var(--accent-lime)]" /> Resume
          </a>

          <div className="h-4 w-px bg-[var(--border-subtle)]" />

          <a
            href="https://github.com/its-chiranjeev"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub Profile"
            className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors p-1"
          >
            <GithubIcon className="w-4 h-4" />
          </a>

          <a
            href="https://linkedin.com/in/chiranjeev-rastogi"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn Profile"
            className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors p-1"
          >
            <LinkedinIcon className="w-4 h-4" />
          </a>

          <ThemeToggle />
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex sm:hidden items-center gap-2">
          <ThemeToggle />
          <button
            ref={menuButtonRef}
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
            aria-controls="portfolio-mobile-menu"
            className="p-2 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          id="portfolio-mobile-menu"
          role="region"
          aria-label="Portfolio Mobile Navigation"
          className="absolute top-full inset-x-0 sm:hidden border-b border-[var(--border-subtle)] bg-[var(--bg-surface)] px-4 py-5 space-y-3 shadow-xl"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="block p-2 rounded-lg text-xs font-mono text-[var(--text-primary)] hover:bg-[var(--bg-surface-elevated)] hover:text-[var(--accent-lime)]"
            >
              {link.label}
            </a>
          ))}

          <div className="border-t border-[var(--border-subtle)] pt-3 flex items-center justify-between">
            <a
              href="/resume/Chiranjeev_Rastogi_Resume.pdf"
              download="Chiranjeev_Rastogi_Resume.pdf"
              className="inline-flex items-center gap-1.5 text-xs font-mono text-[var(--accent-lime)]"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Resume PDF</span>
            </a>
            <div className="flex items-center gap-3 text-[var(--text-secondary)]">
              <a
                href="https://github.com/its-chiranjeev"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Profile"
                className="p-1 hover:text-[var(--text-primary)]"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com/in/chiranjeev-rastogi"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn Profile"
                className="p-1 hover:text-[var(--text-primary)]"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

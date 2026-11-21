"use client";

import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { GithubIcon, LinkedinIcon } from "@/components/ui/icons";
import { Menu, X, ArrowLeft, FileText } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

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
        {/* Left: Brand / Return to Landing */}
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="flex items-center gap-1.5 text-xs font-mono text-[var(--text-tertiary)] hover:text-[var(--text-primary)] transition-colors mr-2 hidden sm:flex"
            title="Return to Welcome Page"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Welcome</span>
          </Link>

          <div className="h-4 w-px bg-[var(--border-subtle)] hidden sm:block" />

          <Link href="/portfolio" className="flex items-center gap-2.5 group">
            <div className="w-7 h-7 rounded-md overflow-hidden border border-[var(--border-subtle)] bg-[var(--bg-surface-elevated)] flex items-center justify-center p-0.5 group-hover:border-[var(--accent-lime)] transition-colors">
              <Image
                src="/images/logo.png"
                alt="Logo"
                width={24}
                height={24}
                className="object-contain"
                priority
              />
            </div>
            <span className="font-semibold text-sm tracking-tight text-[var(--text-primary)]">
              Chiranjeev Rastogi
            </span>
          </Link>
        </div>

        {/* Center: Desktop Section Anchors */}
        <nav aria-label="Section Navigation" className="hidden lg:flex items-center gap-6">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
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
          className="sm:hidden border-b border-[var(--border-subtle)] bg-[var(--bg-surface)] px-4 py-5 space-y-3 shadow-xl"
        >
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2 p-2 rounded-lg text-xs font-mono text-[var(--text-tertiary)] hover:bg-[var(--bg-surface-elevated)]"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Welcome Page</span>
          </Link>

          <div className="border-t border-[var(--border-subtle)] pt-2" />

          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
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

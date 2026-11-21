"use client";

import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { GithubIcon, LinkedinIcon } from "@/components/ui/icons";
import { Menu, X, ArrowRight, FileText } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export function LandingNavbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mobileMenuOpen]);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[var(--border-subtle)] bg-[var(--bg-canvas)]/80 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand & Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-8 h-8 rounded-lg overflow-hidden border border-[var(--border-subtle)] bg-[var(--bg-surface-elevated)] flex items-center justify-center p-1 group-hover:border-[var(--accent-lime)] transition-colors">
            <Image
              src="/images/logo.png"
              alt="Chiranjeev Rastogi Logo"
              width={28}
              height={28}
              className="object-contain"
              priority
            />
          </div>
          <div className="flex flex-col">
            <span className="font-semibold text-sm tracking-tight text-[var(--text-primary)]">
              Chiranjeev Rastogi
            </span>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-lime)] animate-pulse motion-reduce:animate-none" />
              <span className="font-mono text-[10px] text-[var(--text-tertiary)] uppercase tracking-wider">
                Backend Dev
              </span>
            </div>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav aria-label="Desktop Navigation" className="hidden md:flex items-center gap-6">
          <Link
            href="/portfolio"
            className="text-xs font-mono font-medium text-[var(--text-secondary)] hover:text-[var(--accent-lime)] transition-colors flex items-center gap-1"
          >
            Explore Portfolio <ArrowRight className="w-3.5 h-3.5" />
          </Link>
          <a
            href="/resume/Chiranjeev_Rastogi_Resume.pdf"
            download="Chiranjeev_Rastogi_Resume.pdf"
            className="text-xs font-mono font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors flex items-center gap-1"
          >
            <FileText className="w-3.5 h-3.5" /> Resume
          </a>
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

          <div className="h-4 w-px bg-[var(--border-subtle)]" />
          <ThemeToggle />
        </nav>

        {/* Mobile Controls */}
        <div className="flex md:hidden items-center gap-2">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation"
            className="p-2 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          id="mobile-navigation"
          role="region"
          aria-label="Mobile Navigation Drawer"
          className="md:hidden border-b border-[var(--border-subtle)] bg-[var(--bg-surface)] px-4 py-5 space-y-4 shadow-xl"
        >
          <Link
            href="/portfolio"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center justify-between p-3 rounded-lg bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] font-mono text-xs text-[var(--accent-lime)] font-medium"
          >
            <span>Explore Full Portfolio</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <a
            href="/resume/Chiranjeev_Rastogi_Resume.pdf"
            download="Chiranjeev_Rastogi_Resume.pdf"
            className="flex items-center gap-2.5 p-2.5 rounded-lg text-xs font-mono text-[var(--text-secondary)] hover:bg-[var(--bg-surface-elevated)] transition-colors"
          >
            <FileText className="w-4 h-4 text-[var(--accent-lime)]" />
            <span>Download Verified Resume (PDF)</span>
          </a>
          <div className="pt-2 border-t border-[var(--border-subtle)] flex items-center justify-around">
            <a
              href="https://github.com/its-chiranjeev"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs font-mono text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
            >
              <GithubIcon className="w-4 h-4" />
              <span>@its-chiranjeev</span>
            </a>
            <a
              href="https://linkedin.com/in/chiranjeev-rastogi"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs font-mono text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
            >
              <LinkedinIcon className="w-4 h-4" />
              <span>LinkedIn</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

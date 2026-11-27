"use client";

import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { GithubIcon, LinkedinIcon } from "@/components/ui/icons";
import { CRMonogramSvg } from "@/components/brand/CRLogo";
import { ArrowLeft, ChevronRight, FileText } from "lucide-react";
import Link from "next/link";

interface ProjectDetailNavbarProps {
  projectTitle: string;
}

export function ProjectDetailNavbar({ projectTitle }: ProjectDetailNavbarProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-[var(--border-subtle)] bg-[var(--bg-canvas)]/85 backdrop-blur-md">
      <div className="max-w-6xl min-[1280px]:max-w-[1280px] min-[1600px]:max-w-[1400px] min-[1920px]:max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Left: Breadcrumbs navigation */}
        <div className="flex items-center gap-2 min-w-0">
          <Link
            href="/projects"
            className="flex items-center gap-1.5 text-xs font-mono text-[var(--text-secondary)] hover:text-[var(--accent-lime)] transition-colors shrink-0"
            title="Return to Projects list"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">All Projects</span>
          </Link>

          <span className="text-[var(--border-strong)] hidden sm:inline">
            <ChevronRight className="w-3.5 h-3.5" />
          </span>

          <Link
            href="/portfolio"
            className="items-center gap-2 group hidden md:flex shrink-0"
            title="Return to Portfolio"
            aria-label="Return to Portfolio"
          >
            <div className="rounded overflow-hidden border border-[var(--border-subtle)] bg-[var(--bg-surface-elevated)] flex items-center justify-center p-1 group-hover:border-[var(--accent-lime)] transition-colors">
              <CRMonogramSvg size={18} />
            </div>
          </Link>

          <span className="text-[var(--border-strong)] hidden md:inline">
            <ChevronRight className="w-3.5 h-3.5" />
          </span>

          <span className="text-xs font-mono text-[var(--text-primary)] font-semibold truncate">
            {projectTitle}
          </span>
        </div>

        {/* Right: Actions, Socials, Theme Toggle */}
        <div className="flex items-center gap-3 shrink-0">
          <a
            href="/resume/Chiranjeev_Rastogi_Resume.pdf"
            download="Chiranjeev_Rastogi_Resume.pdf"
            className="text-xs font-mono text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors hidden sm:flex items-center gap-1"
          >
            <FileText className="w-3.5 h-3.5 text-[var(--accent-lime)]" /> Resume
          </a>

          <div className="h-4 w-px bg-[var(--border-subtle)] hidden sm:block" />

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
      </div>
    </header>
  );
}

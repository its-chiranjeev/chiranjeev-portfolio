import React from "react";
import Link from "next/link";

export interface CRLogoProps {
  /**
   * Logo variant:
   * - "monogram": Standalone CR emblem (with or without badge)
   * - "wordmark": Monogram icon paired with full name and descriptor
   * - "navbar": Specifically tailored for navbar header with hover effects
   * - "loader": Prominent animated version for bootloader screen
   * - "favicon": 1:1 square icon variant
   */
  variant?: "monogram" | "wordmark" | "navbar" | "loader" | "favicon";
  /** Width and height of the monogram icon (e.g. 24, 28, 32, 48, 64) */
  size?: number;
  /** Whether to enclose the monogram in an engineered squircle container */
  withBadge?: boolean;
  /** Pure monochrome mode (strips neon lime accent and uses currentColor) */
  mono?: boolean;
  /** For wordmark/navbar: whether to display the engineering subtitle */
  showSubtitle?: boolean;
  /** Custom subtitle text (defaults to "Software Engineer") */
  subtitle?: string;
  /** Additional CSS class names */
  className?: string;
  /** Optional link destination if clickable (navbar defaults to /portfolio) */
  href?: string;
  /** Additional accessible label */
  ariaLabel?: string;
}

/**
 * Geometric Vector CR Monogram SVG
 * Scalable across 16px to 512px with mathematical precision.
 */
export function CRMonogramSvg({
  size = 32,
  mono = false,
  withBadge = false,
  className = "",
}: {
  size?: number;
  mono?: boolean;
  withBadge?: boolean;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 select-none ${className}`}
      aria-hidden="true"
    >
      {/* Optional Engineered Squircle Badge Background */}
      {withBadge && (
        <rect
          width="48"
          height="48"
          rx="11"
          className="fill-[var(--bg-surface-elevated)] stroke-[var(--border-subtle)] transition-colors group-hover:stroke-[var(--accent-lime)]"
          strokeWidth="1.5"
        />
      )}

      {/* Letter 'C' Spine & Arms */}
      <path
        d="M22 14.5H16C13.2386 14.5 11 16.7386 11 19.5V28.5C11 31.2614 13.2386 33.5 16 33.5H22"
        stroke="currentColor"
        strokeWidth="3.5"
        strokeLinecap="round"
      />

      {/* Letter 'R' Vertical Stem & Upper Loop */}
      <path
        d="M26 33.5V14.5H32C34.7614 14.5 37 16.7386 37 19.5C37 22.2614 34.7614 24.5 32 24.5H26"
        stroke="currentColor"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Letter 'R' Dynamic Diagonal Leg (Lime Accent) */}
      <path
        d="M31.5 24.5L37.5 33.5"
        stroke={mono ? "currentColor" : "var(--accent-lime, #a3e635)"}
        strokeWidth="3.5"
        strokeLinecap="round"
        className="transition-colors"
      />

      {/* Subtle Terminal Accent Dot in 'C' aperture */}
      <circle
        cx="21.5"
        cy="24"
        r="1.5"
        fill={mono ? "currentColor" : "var(--accent-lime, #a3e635)"}
        className="transition-colors"
      />
    </svg>
  );
}

/**
 * Universal Brand Identity Component for Chiranjeev Rastogi
 */
export function CRLogo({
  variant = "monogram",
  size,
  withBadge = true,
  mono = false,
  showSubtitle = false,
  subtitle = "Software Engineer",
  className = "",
  href,
  ariaLabel = "Chiranjeev Rastogi - Home",
}: CRLogoProps) {
  // 1. Loading Screen Variant
  if (variant === "loader") {
    const loaderSize = size ?? 64;
    return (
      <div
        className={`relative flex flex-col items-center justify-center ${className}`}
        aria-label="Chiranjeev Rastogi Brand System Initializing"
      >
        {/* Ambient neon lime glow */}
        <div
          className="absolute inset-0 rounded-2xl bg-[var(--accent-lime)] opacity-20 blur-xl animate-pulse pointer-events-none"
          aria-hidden="true"
        />

        {/* Squircle Emblem Container */}
        <div className="relative p-2.5 rounded-2xl bg-[#0e0e14] border border-[var(--border-subtle)] shadow-[0_0_30px_rgba(163,230,53,0.18)]">
          <CRMonogramSvg size={loaderSize} mono={mono} />
        </div>

        {/* Wordmark below loader emblem */}
        <div className="mt-3 text-center font-mono">
          <span className="text-sm font-bold tracking-wider text-[var(--text-primary)] block">
            CHIRANJEEV RASTOGI
          </span>
          <span className="text-[10px] tracking-widest uppercase text-[var(--accent-lime)] font-semibold flex items-center justify-center gap-1.5 mt-0.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-lime)] animate-ping" />
            CR//SYSTEM_INIT
          </span>
        </div>
      </div>
    );
  }

  // 2. Navbar Variant
  if (variant === "navbar") {
    const navSize = size ?? 28;
    const content = (
      <div className={`flex items-center gap-2.5 group cursor-pointer ${className}`}>
        <div className="rounded-lg overflow-hidden border border-[var(--border-subtle)] bg-[var(--bg-surface-elevated)] flex items-center justify-center p-1 group-hover:border-[var(--accent-lime)] group-hover:shadow-[0_0_12px_rgba(163,230,53,0.25)] transition-all">
          <CRMonogramSvg size={navSize} mono={mono} />
        </div>
        <div className="flex flex-col">
          <span className="font-semibold text-sm tracking-tight text-[var(--text-primary)] group-hover:text-[var(--text-primary)] transition-colors leading-tight">
            Chiranjeev Rastogi
          </span>
          {showSubtitle && (
            <span className="text-[10px] font-mono text-[var(--text-tertiary)] group-hover:text-[var(--accent-lime)] transition-colors leading-tight">
              {subtitle}
            </span>
          )}
        </div>
      </div>
    );

    if (href) {
      return (
        <Link href={href} aria-label={ariaLabel}>
          {content}
        </Link>
      );
    }

    return content;
  }

  // 3. Wordmark Variant (Used in Footer, Detail Hero, Posters)
  if (variant === "wordmark") {
    const wmSize = size ?? 36;
    const content = (
      <div className={`flex items-center gap-3 group ${className}`}>
        {withBadge ? (
          <div className="rounded-xl overflow-hidden border border-[var(--border-subtle)] bg-[var(--bg-surface-elevated)] flex items-center justify-center p-1.5 group-hover:border-[var(--accent-lime)] group-hover:shadow-[0_0_12px_rgba(163,230,53,0.2)] transition-all">
            <CRMonogramSvg size={wmSize} mono={mono} />
          </div>
        ) : (
          <CRMonogramSvg size={wmSize} mono={mono} />
        )}
        <div className="flex flex-col">
          <span className="font-bold text-base tracking-tight text-[var(--text-primary)]">
            Chiranjeev Rastogi
          </span>
          {showSubtitle && (
            <span className="text-xs font-mono text-[var(--text-secondary)]">
              {subtitle}
            </span>
          )}
        </div>
      </div>
    );

    if (href) {
      return (
        <Link href={href} aria-label={ariaLabel}>
          {content}
        </Link>
      );
    }

    return content;
  }

  // 4. Favicon / Monogram Base Variant
  const baseSize = size ?? 32;
  const monogramContent = (
    <div
      className={`inline-flex items-center justify-center text-[var(--text-primary)] ${className}`}
    >
      <CRMonogramSvg
        size={baseSize}
        mono={mono}
        withBadge={withBadge}
      />
    </div>
  );

  if (href) {
    return (
      <Link href={href} aria-label={ariaLabel}>
        {monogramContent}
      </Link>
    );
  }

  return monogramContent;
}

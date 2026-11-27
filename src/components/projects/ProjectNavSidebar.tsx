"use client";

import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
  useSyncExternalStore,
} from "react";
import { createPortal } from "react-dom";
import {
  PanelLeftClose,
  PanelLeftOpen,
  PanelLeft,
  ChevronRight,
  ListTree,
  X,
} from "lucide-react";
import { ProjectCaseStudy } from "@/types/project";
import { scrollToTarget } from "@/lib/smoothScroll";
import { cn } from "@/lib/utils";

export interface ProjectNavSidebarProps {
  projects: ProjectCaseStudy[];
  activeSlug?: string;
  onSelectProject?: (slug: string) => void;
  className?: string;
}

const emptySubscribe = () => () => {};

// Safe LocalStorage subscriber for SSR and React 19 hydration
function subscribeLocalStorage(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
}

function getStoredCollapsed(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return localStorage.getItem("portfolio_project_sidebar_collapsed") === "true";
  } catch {
    return false;
  }
}

function getServerCollapsed(): boolean {
  return false;
}

export function ProjectNavSidebar({
  projects,
  activeSlug: controlledActiveSlug,
  onSelectProject,
  className,
}: ProjectNavSidebarProps) {
  // SSR-safe client mount detection for portal
  const isClient = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  // Stored collapsed state via useSyncExternalStore (no setState in effect)
  const storedCollapsed = useSyncExternalStore(
    subscribeLocalStorage,
    getStoredCollapsed,
    getServerCollapsed
  );

  // User manual override for collapse state
  const [manualCollapsed, setManualCollapsed] = useState<boolean | null>(null);
  const isCollapsed = manualCollapsed !== null ? manualCollapsed : storedCollapsed;

  // Sort projects strictly by order
  const sortedProjects = React.useMemo(() => {
    return [...projects].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  }, [projects]);

  // Internal scroll-spy active slug
  const [scrollSpySlug, setScrollSpySlug] = useState<string>(
    controlledActiveSlug || sortedProjects[0]?.slug || ""
  );

  // Effective active slug (controlled or scroll-spy)
  const activeSlug = controlledActiveSlug || scrollSpySlug;

  // Mobile drawer states
  const [isMobileOpen, setIsMobileOpen] = useState<boolean>(false);
  const [isMobileVisible, setIsMobileVisible] = useState<boolean>(false);

  // References for focus and scroll-spy management
  const previousActiveElement = useRef<HTMLElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const isManualScrollingRef = useRef<boolean>(false);
  const currentActiveSlugRef = useRef<string>(activeSlug);
  const visibleEntriesRef = useRef<Map<string, IntersectionObserverEntry>>(
    new Map()
  );

  // Sync current active slug ref
  useEffect(() => {
    currentActiveSlugRef.current = activeSlug;
  }, [activeSlug]);

  const toggleCollapse = useCallback(() => {
    const next = !isCollapsed;
    setManualCollapsed(next);
    try {
      localStorage.setItem("portfolio_project_sidebar_collapsed", String(next));
    } catch {
      // Ignore storage access errors
    }
  }, [isCollapsed]);

  // IntersectionObserver scroll-spy targeting directory cards
  useEffect(() => {
    const cards = document.querySelectorAll<HTMLElement>("[data-project-slug]");
    if (!cards.length) return;

    const visibleEntries = visibleEntriesRef.current;

    const observer = new IntersectionObserver(
      (entries) => {
        // Ignore observer during manual programmatic smooth scroll
        if (isManualScrollingRef.current) return;

        entries.forEach((entry) => {
          const slug = entry.target.getAttribute("data-project-slug");
          if (!slug) return;

          if (entry.isIntersecting) {
            visibleEntries.set(slug, entry);
          } else {
            visibleEntries.delete(slug);
          }
        });

        if (visibleEntries.size === 0) return;

        // Deterministic selection: find card whose top is closest to reading zone (~120px)
        let bestSlug: string | null = null;
        let bestScore = -Infinity;

        visibleEntries.forEach((entry, slug) => {
          if (!entry.isIntersecting) return;
          const rect = entry.boundingClientRect;
          // Target line ~120px from viewport top (below navbar)
          const distanceFromTarget = Math.abs(rect.top - 120);
          // Prioritize high intersection ratio + close proximity
          const score = entry.intersectionRatio * 500 - distanceFromTarget;

          if (score > bestScore) {
            bestScore = score;
            bestSlug = slug;
          }
        });

        if (bestSlug && bestSlug !== currentActiveSlugRef.current) {
          currentActiveSlugRef.current = bestSlug;
          setScrollSpySlug(bestSlug);
        }
      },
      {
        root: null,
        rootMargin: "-15% 0px -40% 0px",
        threshold: [0, 0.2, 0.4, 0.6, 0.8, 1.0],
      }
    );

    cards.forEach((card) => observer.observe(card));

    return () => {
      observer.disconnect();
      visibleEntries.clear();
    };
  }, [sortedProjects]);

  // Mobile drawer opening & closing animation handling
  const handleOpenMobile = useCallback(() => {
    previousActiveElement.current = document.activeElement as HTMLElement | null;
    setIsMobileOpen(true);
    requestAnimationFrame(() => {
      setIsMobileVisible(true);
      setTimeout(() => {
        closeButtonRef.current?.focus();
      }, 50);
    });
  }, []);

  const handleCloseMobile = useCallback(() => {
    setIsMobileVisible(false);
    const timer = setTimeout(() => {
      setIsMobileOpen(false);
      previousActiveElement.current?.focus?.();
    }, 280);
    return () => clearTimeout(timer);
  }, []);

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    if (!isMobileOpen) {
      document.body.style.overflow = "";
      return;
    }
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isMobileOpen]);

  // Keyboard accessibility: Escape closes mobile drawer
  useEffect(() => {
    if (!isMobileOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        handleCloseMobile();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isMobileOpen, handleCloseMobile]);

  // Project item click handler
  const handleProjectClick = useCallback(
    (e: React.MouseEvent, slug: string) => {
      e.preventDefault();
      if (isMobileOpen) {
        handleCloseMobile();
      }

      setScrollSpySlug(slug);
      currentActiveSlugRef.current = slug;
      isManualScrollingRef.current = true;

      if (onSelectProject) {
        // Delegate to parent callback (which handles filter resets if hidden)
        onSelectProject(slug);
      } else {
        // Direct smooth scroll fallback
        scrollToTarget(`#project-${slug}`, {
          offset: 80,
          duration: 0.85,
          onComplete: () => {
            setTimeout(() => {
              isManualScrollingRef.current = false;
            }, 50);
          },
        });
      }

      // Safety unlock fallback
      setTimeout(() => {
        isManualScrollingRef.current = false;
      }, 1200);
    },
    [isMobileOpen, onSelectProject, handleCloseMobile]
  );

  // Active project data for mobile trigger button
  const activeProject =
    sortedProjects.find((p) => p.slug === activeSlug) || sortedProjects[0];
  const activeOrderDisplay = String(activeProject?.order ?? 1).padStart(2, "0");

  return (
    <div className={cn("w-full md:w-auto", className)}>
      {/* =========================================================================
          1. MOBILE TRIGGER BAR (< md)
          Compact, interactive developer bar displaying active project & counter
          ========================================================================= */}
      <div className="block md:hidden w-full mb-6">
        <button
          type="button"
          onClick={handleOpenMobile}
          aria-expanded={isMobileOpen}
          aria-controls="mobile-project-nav-drawer"
          className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] hover:border-[var(--border-strong)] transition-all shadow-sm group text-left active:scale-[0.99]"
        >
          <div className="flex items-center gap-2.5 min-w-0">
            <span className="inline-flex items-center justify-center p-1.5 rounded-lg bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] text-[var(--accent-lime)] shrink-0">
              <PanelLeft className="w-3.5 h-3.5" />
            </span>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 text-[11px] font-mono leading-none mb-1">
                <span className="text-[var(--accent-lime)] font-semibold tracking-wide">
                  PROJECT NAV
                </span>
                <span className="text-[var(--text-tertiary)]">·</span>
                <span className="text-[var(--text-secondary)]">
                  {activeOrderDisplay} / {String(sortedProjects.length).padStart(2, "0")}
                </span>
              </div>
              <p className="text-xs font-semibold text-[var(--text-primary)] truncate">
                {activeProject?.title || "Select Project"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1 text-[11px] font-mono text-[var(--text-secondary)] group-hover:text-[var(--accent-lime)] shrink-0 transition-colors pl-2">
            <span>Browse</span>
            <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </div>
        </button>
      </div>

      {/* =========================================================================
          2. DESKTOP STICKY SIDEBAR (>= md)
          Minimal Engineering & Developer Workspace Aesthetic
          Expanded: 260px | Collapsed: 64px with smooth transitions
          ========================================================================= */}
      <aside
        aria-label="Project Directory Navigation"
        className={cn(
          "hidden md:flex flex-col bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-2xl shadow-sm transition-[width] duration-300 ease-in-out select-none overflow-hidden",
          isCollapsed ? "w-[64px] p-2" : "w-[260px] p-3.5"
        )}
      >
        {/* Header Row */}
        {isCollapsed ? (
          <div className="flex justify-center pb-2 border-b border-[var(--border-subtle)]">
            <button
              type="button"
              onClick={toggleCollapse}
              className="w-10 h-10 flex items-center justify-center rounded-lg text-[var(--text-secondary)] hover:text-[var(--accent-lime)] hover:bg-[var(--bg-surface-elevated)] transition-colors focus-visible:ring-1 focus-visible:ring-[var(--accent-lime)] focus-visible:outline-none"
              title="Expand project navigation"
              aria-label="Expand project navigation"
            >
              <PanelLeftOpen className="w-4 h-4 text-[var(--accent-lime)]" />
            </button>
          </div>
        ) : (
          <div className="flex items-center justify-between pb-3 mb-2 border-b border-[var(--border-subtle)]">
            <div className="flex items-center gap-2 min-w-0">
              <ListTree className="w-3.5 h-3.5 text-[var(--accent-lime)] shrink-0" />
              <span className="font-mono text-[11px] font-semibold text-[var(--text-primary)] uppercase tracking-wider truncate">
                PROJECTS
              </span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] text-[var(--accent-lime)] shrink-0">
                0{sortedProjects.length}
              </span>
            </div>
            <button
              type="button"
              onClick={toggleCollapse}
              className="p-1.5 rounded-lg text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface-elevated)] transition-colors focus-visible:ring-1 focus-visible:ring-[var(--accent-lime)] focus-visible:outline-none"
              title="Collapse sidebar"
              aria-label="Collapse sidebar"
            >
              <PanelLeftClose className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Project Items List */}
        <div className="flex flex-col space-y-1.5 overflow-y-auto max-h-[calc(100vh-16rem)] py-1">
          {sortedProjects.map((project, idx) => {
            const isActive = project.slug === activeSlug;
            const displayNum = String(project.order ?? idx + 1).padStart(
              2,
              "0"
            );

            if (isCollapsed) {
              return (
                <button
                  key={project.slug}
                  type="button"
                  onClick={(e) => handleProjectClick(e, project.slug)}
                  title={`${displayNum} · ${project.title}`}
                  aria-label={`Jump to ${project.title}`}
                  className={cn(
                    "w-10 h-10 mx-auto flex items-center justify-center rounded-lg font-mono text-xs font-bold transition-all relative group focus-visible:ring-1 focus-visible:ring-[var(--accent-lime)] focus-visible:outline-none cursor-pointer",
                    isActive
                      ? "bg-[var(--accent-lime-muted)] text-[var(--accent-lime)] border border-[var(--accent-lime)]/40 shadow-sm"
                      : "bg-[var(--bg-surface-elevated)] text-[var(--text-secondary)] border border-[var(--border-subtle)] hover:text-[var(--text-primary)] hover:border-[var(--border-strong)]"
                  )}
                >
                  {displayNum}
                  {isActive && (
                    <span
                      className="absolute -left-1 top-2.5 bottom-2.5 w-1 bg-[var(--accent-lime)] rounded-full shadow-[0_0_6px_var(--accent-lime)]"
                      aria-hidden="true"
                    />
                  )}
                </button>
              );
            }

            return (
              <button
                key={project.slug}
                type="button"
                onClick={(e) => handleProjectClick(e, project.slug)}
                aria-label={`Jump to ${project.title}`}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-left transition-all duration-200 group relative border focus-visible:ring-1 focus-visible:ring-[var(--accent-lime)] focus-visible:outline-none cursor-pointer",
                  isActive
                    ? "bg-[var(--accent-lime-muted)] border-[var(--accent-lime)]/30 text-[var(--text-primary)]"
                    : "bg-transparent border-transparent text-[var(--text-secondary)] hover:bg-[var(--bg-surface-elevated)] hover:text-[var(--text-primary)]"
                )}
              >
                {/* Monospace Order Number */}
                <span
                  className={cn(
                    "font-mono text-[11px] font-semibold px-1.5 py-0.5 rounded border shrink-0 transition-colors",
                    isActive
                      ? "bg-[var(--bg-surface)] border-[var(--accent-lime)]/40 text-[var(--accent-lime)]"
                      : "bg-[var(--bg-surface-elevated)] border-[var(--border-subtle)] text-[var(--text-secondary)] group-hover:text-[var(--text-primary)]"
                  )}
                >
                  {displayNum}
                </span>

                {/* Project Metadata */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1">
                    <span
                      className={cn(
                        "text-xs font-semibold truncate transition-colors",
                        isActive
                          ? "text-[var(--accent-lime)]"
                          : "text-[var(--text-primary)]"
                      )}
                    >
                      {project.title}
                    </span>
                  </div>
                  <p className="text-[10px] text-[var(--text-secondary)] truncate font-mono">
                    {project.category === "Professional Experience"
                      ? "Production Backend"
                      : "Open Source"}
                  </p>
                </div>

                {/* Active Indicator Dot */}
                {isActive && (
                  <span
                    className="w-1.5 h-1.5 rounded-full bg-[var(--accent-lime)] shrink-0 shadow-[0_0_6px_var(--accent-lime)]"
                    aria-hidden="true"
                  />
                )}
              </button>
            );
          })}
        </div>
      </aside>

      {/* =========================================================================
          3. MOBILE SLIDE-OVER DRAWER (< md)
          Portaled, Accessible Modal Dialog with Escape & Focus Management
          ========================================================================= */}
      {isClient &&
        isMobileOpen &&
        createPortal(
          <div className="fixed inset-0 z-50 overflow-hidden md:hidden">
            {/* Subtle Backdrop */}
            <div
              className={cn(
                "fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300",
                isMobileVisible ? "opacity-100" : "opacity-0 pointer-events-none"
              )}
              onClick={handleCloseMobile}
              aria-hidden="true"
            />

            {/* Slide-over Drawer (From Left) */}
            <div
              id="mobile-project-nav-drawer"
              role="dialog"
              aria-modal="true"
              aria-label="Project Directory Navigation"
              className={cn(
                "fixed top-0 bottom-0 left-0 w-[84%] max-w-xs bg-[var(--bg-surface)] border-r border-[var(--border-subtle)] shadow-2xl flex flex-col transition-transform duration-300 ease-out z-10",
                isMobileVisible ? "translate-x-0" : "-translate-x-full"
              )}
            >
              {/* Drawer Header */}
              <div className="flex items-center justify-between p-4 border-b border-[var(--border-subtle)]">
                <div className="flex items-center gap-2">
                  <ListTree className="w-4 h-4 text-[var(--accent-lime)]" />
                  <h3 className="font-mono text-xs font-bold tracking-wider text-[var(--text-primary)] uppercase">
                    PROJECT DIRECTORY
                  </h3>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] text-[var(--accent-lime)]">
                    0{sortedProjects.length}
                  </span>
                </div>
                <button
                  ref={closeButtonRef}
                  type="button"
                  onClick={handleCloseMobile}
                  className="p-1.5 rounded-lg text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface-elevated)] transition-colors focus-visible:ring-1 focus-visible:ring-[var(--accent-lime)] focus-visible:outline-none"
                  aria-label="Close project navigation drawer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Drawer Project List */}
              <div className="flex-1 overflow-y-auto p-3 space-y-2">
                {sortedProjects.map((project, idx) => {
                  const isActive = project.slug === activeSlug;
                  const displayNum = String(project.order ?? idx + 1).padStart(
                    2,
                    "0"
                  );

                  return (
                    <button
                      key={project.slug}
                      type="button"
                      onClick={(e) => handleProjectClick(e, project.slug)}
                      aria-current={isActive ? "page" : undefined}
                      className={cn(
                        "w-full flex items-center gap-3 p-3 rounded-xl text-left transition-all duration-200 border active:scale-[0.99] focus-visible:ring-1 focus-visible:ring-[var(--accent-lime)] focus-visible:outline-none cursor-pointer",
                        isActive
                          ? "bg-[var(--accent-lime-muted)] border-[var(--accent-lime)]/40 text-[var(--text-primary)] shadow-sm"
                          : "bg-[var(--bg-surface-elevated)]/60 border-[var(--border-subtle)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--border-strong)]"
                      )}
                    >
                      <span
                        className={cn(
                          "font-mono text-xs font-bold px-2 py-1 rounded-md border shrink-0 transition-colors",
                          isActive
                            ? "bg-[var(--bg-surface)] border-[var(--accent-lime)]/40 text-[var(--accent-lime)]"
                            : "bg-[var(--bg-surface-elevated)] border-[var(--border-subtle)] text-[var(--text-secondary)]"
                        )}
                      >
                        {displayNum}
                      </span>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-1">
                          <span
                            className={cn(
                              "text-xs font-semibold truncate",
                              isActive
                                ? "text-[var(--accent-lime)]"
                                : "text-[var(--text-primary)]"
                            )}
                          >
                            {project.title}
                          </span>
                        </div>
                        <p className="text-[11px] text-[var(--text-secondary)] truncate font-mono mt-0.5">
                          {project.role}
                        </p>
                      </div>

                      {isActive && (
                        <span
                          className="w-2 h-2 rounded-full bg-[var(--accent-lime)] shrink-0 shadow-[0_0_8px_var(--accent-lime)]"
                          aria-hidden="true"
                        />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>,
          document.body
        )}
    </div>
  );
}

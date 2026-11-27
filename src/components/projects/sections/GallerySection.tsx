"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import Image from "next/image";
import {
  GallerySection as GallerySectionType,
  FeaturedShowcaseItem,
} from "@/types/project";
import {
  Maximize2,
  ChevronLeft,
  ChevronRight,
  X,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Sparkles,
  ArrowRight,
  Smartphone,
} from "lucide-react";

interface GallerySectionProps {
  section: GallerySectionType;
}

export function GallerySection({ section }: GallerySectionProps) {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  // Zoom & Pan state inside Lightbox
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [panPosition, setPanPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef<{ startX: number; startY: number; initialPanX: number; initialPanY: number }>({
    startX: 0,
    startY: 0,
    initialPanX: 0,
    initialPanY: 0,
  });

  // Touch swipe tracking on mobile
  const touchStartRef = useRef<{ x: number; y: number; time: number }>({ x: 0, y: 0, time: 0 });

  // Focus management & container refs
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const lightboxContainerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  // Exactly the 5 promotional artworks
  const showcaseItems: FeaturedShowcaseItem[] = useMemo(
    () => section.featuredShowcase || [],
    [section.featuredShowcase]
  );

  // Split into Primary (First 3) and Supporting Cross-Device (Remaining 2)
  const primaryItems = useMemo(() => showcaseItems.slice(0, 3), [showcaseItems]);
  const supportingItems = useMemo(() => showcaseItems.slice(3, 5), [showcaseItems]);

  // GSAP scroll entrance animation
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) return;

    let ctx: { revert: () => void } | null = null;

    const initAnimation = async () => {
      try {
        const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([
          import("gsap"),
          import("gsap/ScrollTrigger"),
        ]);

        gsap.registerPlugin(ScrollTrigger);

        ctx = gsap.context(() => {
          const cards = el.querySelectorAll(".showcase-card");
          if (cards.length > 0) {
            gsap.fromTo(
              cards,
              { y: 24, opacity: 0 },
              {
                y: 0,
                opacity: 1,
                duration: 0.7,
                stagger: 0.1,
                ease: "power2.out",
                scrollTrigger: {
                  trigger: el,
                  start: "top 90%",
                  toggleActions: "play none none none",
                  once: true,
                },
              }
            );
          }
        }, el);

        requestAnimationFrame(() => {
          ScrollTrigger.refresh();
        });
      } catch {
        // Fallback gracefully if GSAP is unavailable
      }
    };

    initAnimation();

    return () => {
      ctx?.revert();
    };
  }, []);

  // Lightbox handlers
  const openLightboxByIndex = (index: number) => {
    previousFocusRef.current = document.activeElement as HTMLElement | null;
    setLightboxIndex(index >= 0 && index < showcaseItems.length ? index : 0);
    setZoomLevel(1);
    setPanPosition({ x: 0, y: 0 });
    setIsLightboxOpen(true);
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false);
    setZoomLevel(1);
    setPanPosition({ x: 0, y: 0 });
    if (previousFocusRef.current) {
      previousFocusRef.current.focus();
    }
  };

  const navigateLightbox = (direction: "prev" | "next") => {
    setZoomLevel(1);
    setPanPosition({ x: 0, y: 0 });
    setLightboxIndex((prev) => {
      if (direction === "prev") {
        return prev === 0 ? showcaseItems.length - 1 : prev - 1;
      } else {
        return prev === showcaseItems.length - 1 ? 0 : prev + 1;
      }
    });
  };

  // Zoom controls
  const handleZoomIn = () => {
    setZoomLevel((z) => Math.min(2.5, +(z + 0.5).toFixed(1)));
  };

  const handleZoomOut = () => {
    setZoomLevel((z) => {
      const next = Math.max(1, +(z - 0.5).toFixed(1));
      if (next === 1) setPanPosition({ x: 0, y: 0 });
      return next;
    });
  };

  const handleResetZoom = () => {
    setZoomLevel(1);
    setPanPosition({ x: 0, y: 0 });
  };

  // Keyboard navigation & body scroll locking
  useEffect(() => {
    if (!isLightboxOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const total = showcaseItems.length;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsLightboxOpen(false);
        setZoomLevel(1);
        setPanPosition({ x: 0, y: 0 });
        if (previousFocusRef.current) {
          previousFocusRef.current.focus();
        }
      } else if (e.key === "ArrowLeft") {
        setZoomLevel(1);
        setPanPosition({ x: 0, y: 0 });
        setLightboxIndex((prev) => (prev === 0 ? total - 1 : prev - 1));
      } else if (e.key === "ArrowRight") {
        setZoomLevel(1);
        setPanPosition({ x: 0, y: 0 });
        setLightboxIndex((prev) => (prev === total - 1 ? 0 : prev + 1));
      } else if (e.key === "+" || e.key === "=") {
        setZoomLevel((z) => Math.min(2.5, +(z + 0.5).toFixed(1)));
      } else if (e.key === "-" || e.key === "_") {
        setZoomLevel((z) => {
          const next = Math.max(1, +(z - 0.5).toFixed(1));
          if (next === 1) setPanPosition({ x: 0, y: 0 });
          return next;
        });
      } else if (e.key === "0") {
        setZoomLevel(1);
        setPanPosition({ x: 0, y: 0 });
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isLightboxOpen, showcaseItems.length]);

  // Touch Swipe on mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    if (zoomLevel > 1) return;
    const touch = e.touches[0];
    touchStartRef.current = {
      x: touch.clientX,
      y: touch.clientY,
      time: Date.now(),
    };
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (zoomLevel > 1) return;
    const touch = e.changedTouches[0];
    const diffX = touch.clientX - touchStartRef.current.x;
    const diffY = touch.clientY - touchStartRef.current.y;
    const timeElapsed = Date.now() - touchStartRef.current.time;

    if (timeElapsed < 400 && Math.abs(diffX) > 45 && Math.abs(diffY) < 70) {
      if (diffX > 0) {
        navigateLightbox("prev");
      } else {
        navigateLightbox("next");
      }
    }
  };

  // Mouse Pan when Zoomed
  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoomLevel <= 1) return;
    setIsDragging(true);
    dragStartRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      initialPanX: panPosition.x,
      initialPanY: panPosition.y,
    };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || zoomLevel <= 1) return;
    const dx = e.clientX - dragStartRef.current.startX;
    const dy = e.clientY - dragStartRef.current.startY;
    setPanPosition({
      x: dragStartRef.current.initialPanX + dx,
      y: dragStartRef.current.initialPanY + dy,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const currentLightboxItem = showcaseItems[lightboxIndex] || showcaseItems[0];

  return (
    <section
      ref={sectionRef}
      id={section.id}
      className="py-14 sm:py-16 border-b border-[var(--border-subtle)] overflow-x-clip"
    >
      {/* 1. SECTION HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <span className="font-mono text-sm font-bold text-[var(--accent-lime)]">
              {section.eyebrow || `${section.sectionNumber} // PRODUCT EXPERIENCE`}
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-[var(--text-primary)] mb-3">
            {section.title}
          </h2>
          <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed max-w-3xl">
            {section.description}
          </p>
        </div>

        {/* Dynamic total count badge */}
        <div className="flex items-center gap-2 self-start sm:self-auto font-mono text-xs text-[var(--text-secondary)] bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] px-3.5 py-2 rounded-lg shadow-2xs shrink-0">
          <span className="w-2 h-2 rounded-full bg-[var(--accent-lime)] inline-block animate-pulse" />
          <span>{showcaseItems.length} Promotional Showcases Available</span>
        </div>
      </div>

      {/* 2. PRIMARY VISUAL SHOWCASE: 3 KEY PLATFORM ROLES */}
      <div className="mb-12">
        <div className="flex items-center justify-between gap-4 mb-5">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[var(--accent-lime)]" />
            <h3 className="text-xs font-mono uppercase tracking-wider text-[var(--text-tertiary)] font-semibold">
              Core Platform Experiences &bull; 16:9 Production Presentation
            </h3>
          </div>
          <span className="text-[11px] font-mono text-[var(--text-tertiary)] hidden sm:inline">
            Click any artwork to inspect in fullscreen
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {primaryItems.map((item, idx) => (
            <div
              key={item.id}
              onClick={() => openLightboxByIndex(idx)}
              className="showcase-card group relative flex flex-col rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] overflow-hidden shadow-lg hover:shadow-2xl hover:border-[var(--accent-lime)]/50 transition-all duration-300 cursor-pointer"
            >
              {/* Media Container (16:9 Widescreen) */}
              <div className="relative w-full aspect-video overflow-hidden bg-black/40">
                <Image
                  src={item.artworkSrc}
                  alt={item.title}
                  width={item.width}
                  height={item.height}
                  priority={idx === 0}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                />

                {/* Subtle vignette gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                {/* Top badges: Role & Product Showcase badge */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2 pointer-events-none">
                  <span className="px-2.5 py-1 text-[11px] font-mono font-semibold rounded-md bg-black/80 text-[var(--accent-lime)] backdrop-blur-md border border-white/10 shadow-xs">
                    {item.roleBadge}
                  </span>
                  <span className="px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider rounded-md bg-black/70 text-zinc-300 backdrop-blur-md border border-white/10 flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-[var(--accent-lime)]" />
                    <span>Product Showcase</span>
                  </span>
                </div>

                {/* Hover expand overlay hint */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                  <span className="px-3.5 py-2 rounded-lg bg-black/85 backdrop-blur-md text-white text-xs font-mono border border-white/20 flex items-center gap-2 shadow-2xl">
                    <Maximize2 className="w-3.5 h-3.5 text-[var(--accent-lime)]" />
                    Expand Showcase
                  </span>
                </div>
              </div>

              {/* Card Meta Content */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-[11px] font-mono text-[var(--text-tertiary)]">
                    <span>ROLE: {item.role.toUpperCase()}</span>
                    <span>&bull;</span>
                    <span className="truncate">{item.subtitle}</span>
                  </div>
                  <h4 className="text-lg font-bold text-[var(--text-primary)] group-hover:text-[var(--accent-lime)] transition-colors leading-snug">
                    {item.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Card Footer: Metadata and Expand Button */}
                <div className="pt-3 border-t border-[var(--border-subtle)] flex items-center justify-between gap-2">
                  <div className="flex flex-wrap items-center gap-1.5">
                    {item.techTags.slice(0, 2).map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] font-mono px-2 py-0.5 rounded bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] text-[var(--text-secondary)]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <span className="text-xs font-mono text-[var(--accent-lime)] flex items-center gap-1 font-semibold group-hover:translate-x-0.5 transition-transform">
                    <span>Inspect</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. SUPPORTING CROSS-DEVICE EXPERIENCES: TABLET & MOBILE */}
      <div>
        <div className="flex items-center justify-between gap-4 mb-5 pt-8 border-t border-[var(--border-subtle)]">
          <div className="flex items-center gap-2">
            <Smartphone className="w-4 h-4 text-[var(--accent-lime)]" />
            <h3 className="text-xs font-mono uppercase tracking-wider text-[var(--text-tertiary)] font-semibold">
              Supporting Cross-Device Product Experiences &bull; Tablet & Handheld Workflows
            </h3>
          </div>
          <span className="text-[11px] font-mono text-[var(--text-tertiary)] hidden sm:inline">
            Adaptive Touch & Mobile Captures
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {supportingItems.map((item, idx) => {
            const actualIndex = 3 + idx;
            return (
              <div
                key={item.id}
                onClick={() => openLightboxByIndex(actualIndex)}
                className="showcase-card group relative flex flex-col rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] overflow-hidden shadow-lg hover:shadow-2xl hover:border-[var(--accent-lime)]/50 transition-all duration-300 cursor-pointer"
              >
                {/* Media Container (16:9 Widescreen) */}
                <div className="relative w-full aspect-video overflow-hidden bg-black/40">
                  <Image
                    src={item.artworkSrc}
                    alt={item.title}
                    width={item.width}
                    height={item.height}
                    loading="lazy"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                  />

                  {/* Subtle vignette gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                  {/* Top badges: Role & Product Showcase badge */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2 pointer-events-none">
                    <span className="px-2.5 py-1 text-[11px] font-mono font-semibold rounded-md bg-black/80 text-[var(--accent-lime)] backdrop-blur-md border border-white/10 shadow-xs">
                      {item.roleBadge}
                    </span>
                    <span className="px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider rounded-md bg-black/70 text-zinc-300 backdrop-blur-md border border-white/10 flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-[var(--accent-lime)]" />
                      <span>Product Showcase</span>
                    </span>
                  </div>

                  {/* Hover expand overlay hint */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                    <span className="px-3.5 py-2 rounded-lg bg-black/85 backdrop-blur-md text-white text-xs font-mono border border-white/20 flex items-center gap-2 shadow-2xl">
                      <Maximize2 className="w-3.5 h-3.5 text-[var(--accent-lime)]" />
                      Expand Showcase
                    </span>
                  </div>
                </div>

                {/* Card Meta Content */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-[11px] font-mono text-[var(--text-tertiary)]">
                      <span>ROLE: {item.role.toUpperCase()}</span>
                      <span>&bull;</span>
                      <span className="truncate">{item.subtitle}</span>
                    </div>
                    <h4 className="text-lg font-bold text-[var(--text-primary)] group-hover:text-[var(--accent-lime)] transition-colors leading-snug">
                      {item.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  {/* Card Footer: Metadata and Expand Button */}
                  <div className="pt-3 border-t border-[var(--border-subtle)] flex items-center justify-between gap-2">
                    <div className="flex flex-wrap items-center gap-1.5">
                      {item.techTags.slice(0, 2).map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] font-mono px-2 py-0.5 rounded bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] text-[var(--text-secondary)]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <span className="text-xs font-mono text-[var(--accent-lime)] flex items-center gap-1 font-semibold group-hover:translate-x-0.5 transition-transform">
                      <span>Inspect</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. INTERACTIVE REUSABLE FULLSCREEN LIGHTBOX (EXACTLY 5 PROMOTIONAL ARTWORKS) */}
      {isLightboxOpen && currentLightboxItem && (
        <div
          ref={lightboxContainerRef}
          role="dialog"
          aria-modal="true"
          aria-label={currentLightboxItem.title}
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-lg flex flex-col justify-between p-3 sm:p-5 select-none animate-in fade-in duration-200"
          onClick={closeLightbox}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Lightbox Top Control Bar */}
          <div
            className="flex items-center justify-between gap-4 pb-3 border-b border-white/10 shrink-0"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Identity & Badges */}
            <div className="flex items-center gap-3 truncate">
              <span className="text-xs font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded border flex items-center gap-1.5 bg-amber-500/10 text-amber-300 border-amber-500/30">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Product Showcase</span>
              </span>

              <div className="truncate">
                <h3 className="text-sm sm:text-base font-bold text-white truncate max-w-sm sm:max-w-md lg:max-w-xl">
                  {currentLightboxItem.title}
                </h3>
                <span className="text-[11px] font-mono text-zinc-400">
                  {currentLightboxItem.role} &bull; {lightboxIndex + 1} / {showcaseItems.length}
                </span>
              </div>
            </div>

            {/* Right Controls: Zoom & Close */}
            <div className="flex items-center gap-2 shrink-0">
              {/* Zoom In */}
              <button
                onClick={handleZoomIn}
                disabled={zoomLevel >= 2.5}
                className="p-2 rounded-lg bg-zinc-900 border border-white/10 text-zinc-300 hover:text-white hover:bg-zinc-800 disabled:opacity-40 transition-colors cursor-pointer"
                title="Zoom In (+)"
                aria-label="Zoom in"
              >
                <ZoomIn className="w-4 h-4" />
              </button>

              {/* Zoom Out */}
              <button
                onClick={handleZoomOut}
                disabled={zoomLevel <= 1}
                className="p-2 rounded-lg bg-zinc-900 border border-white/10 text-zinc-300 hover:text-white hover:bg-zinc-800 disabled:opacity-40 transition-colors cursor-pointer"
                title="Zoom Out (-)"
                aria-label="Zoom out"
              >
                <ZoomOut className="w-4 h-4" />
              </button>

              {/* Reset Zoom */}
              {zoomLevel > 1 && (
                <button
                  onClick={handleResetZoom}
                  className="p-2 rounded-lg bg-zinc-900 border border-white/10 text-[var(--accent-lime)] hover:bg-zinc-800 transition-colors cursor-pointer font-mono text-xs flex items-center gap-1"
                  title="Reset Zoom (0)"
                  aria-label="Reset zoom"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>{zoomLevel}x</span>
                </button>
              )}

              {/* Close Button */}
              <button
                onClick={closeLightbox}
                className="p-2 rounded-lg bg-zinc-800 text-zinc-300 hover:text-white hover:bg-zinc-700 transition-colors cursor-pointer ml-1"
                title="Close Lightbox (Esc)"
                aria-label="Close fullscreen modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Lightbox Center Image Stage */}
          <div
            className="relative flex-1 flex items-center justify-center my-2 sm:my-3 overflow-hidden select-none"
            onClick={(e) => e.stopPropagation()}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            style={{
              cursor: zoomLevel > 1 ? (isDragging ? "grabbing" : "grab") : "zoom-in",
            }}
          >
            {/* Prev Navigation Arrow */}
            <button
              onClick={() => navigateLightbox("prev")}
              className="absolute left-2 sm:left-4 z-20 p-2.5 sm:p-3 rounded-full bg-zinc-900/85 hover:bg-zinc-800 text-white border border-white/15 backdrop-blur-md shadow-2xl transition-transform active:scale-95 cursor-pointer"
              title="Previous Showcase (ArrowLeft)"
              aria-label="Previous screenshot"
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>

            {/* Display Image Container with Pan & Zoom */}
            <div
              className="relative max-w-6xl max-h-[75vh] w-full h-full flex items-center justify-center transition-transform duration-100 ease-out"
              style={{
                transform: `scale(${zoomLevel}) translate(${panPosition.x / zoomLevel}px, ${panPosition.y / zoomLevel}px)`,
              }}
              onClick={() => {
                if (zoomLevel === 1) handleZoomIn();
                else handleResetZoom();
              }}
            >
              <Image
                src={currentLightboxItem.artworkSrc}
                alt={currentLightboxItem.title}
                width={currentLightboxItem.width}
                height={currentLightboxItem.height}
                priority
                className="max-w-full max-h-[75vh] w-auto h-auto object-contain rounded-lg border border-white/10 shadow-2xl pointer-events-none"
              />
            </div>

            {/* Next Navigation Arrow */}
            <button
              onClick={() => navigateLightbox("next")}
              className="absolute right-2 sm:right-4 z-20 p-2.5 sm:p-3 rounded-full bg-zinc-900/85 hover:bg-zinc-800 text-white border border-white/15 backdrop-blur-md shadow-2xl transition-transform active:scale-95 cursor-pointer"
              title="Next Showcase (ArrowRight)"
              aria-label="Next screenshot"
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </div>

          {/* Lightbox Bottom Caption Bar */}
          <div
            className="pt-3 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-zinc-400 font-mono shrink-0"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 truncate text-center sm:text-left">
              <span className="text-[var(--accent-lime)] hidden sm:inline">&bull;</span>
              <span className="truncate max-w-xl text-zinc-300">
                {currentLightboxItem.description}
              </span>
            </div>

            <div className="flex items-center gap-4 shrink-0 text-[11px] text-zinc-400">
              <span className="hidden md:inline">{currentLightboxItem.deviceMeta}</span>
              <span className="hidden md:inline text-zinc-600">|</span>
              <span>&larr; &rarr; Navigate &bull; + / - Zoom &bull; Esc to Close</span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

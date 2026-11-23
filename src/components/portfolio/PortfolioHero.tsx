"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import {
  ArrowDown,
  Download,
  Terminal,
  Database,
  Server,
  ShieldCheck,
  MapPin,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface PortfolioHeroProps {
  name: string;
  title?: string;
  location: string;
}

const TITLES = [
  "Software Engineer",
  "Backend Developer",
  "Full-Stack Developer",
  "API & Systems Engineer",
] as const;

export function PortfolioHero({
  name,
  location,
}: PortfolioHeroProps) {
  // Title rotation state
  const [currentTitleIndex, setCurrentTitleIndex] = useState(0);
  const [titleStatus, setTitleStatus] = useState<"visible" | "exiting" | "entering">("visible");
  const timersRef = useRef<NodeJS.Timeout[]>([]);

  // GSAP DOM refs
  const sectionRef = useRef<HTMLDivElement>(null);
  const pinStageRef = useRef<HTMLDivElement>(null);
  const watermarkRef = useRef<HTMLDivElement>(null);
  const initialMetaRef = useRef<HTMLDivElement>(null);
  const portraitWrapperRef = useRef<HTMLDivElement>(null);
  const rightContentRef = useRef<HTMLDivElement>(null);

  // Rotating title effect
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) return;

    let isMounted = true;

    const runAnimationCycle = () => {
      const holdTimer = setTimeout(() => {
        if (!isMounted) return;
        setTitleStatus("exiting");

        const exitTimer = setTimeout(() => {
          if (!isMounted) return;
          setCurrentTitleIndex((prev) => (prev + 1) % TITLES.length);
          setTitleStatus("entering");

          const frameId = requestAnimationFrame(() => {
            if (!isMounted) return;
            const enterTimer = setTimeout(() => {
              if (!isMounted) return;
              setTitleStatus("visible");
              runAnimationCycle();
            }, 20);
            timersRef.current.push(enterTimer);
          });
          timersRef.current.push(frameId as unknown as NodeJS.Timeout);
        }, 280);

        timersRef.current.push(exitTimer);
      }, 2000);

      timersRef.current.push(holdTimer);
    };

    runAnimationCycle();

    return () => {
      isMounted = false;
      timersRef.current.forEach((t) => clearTimeout(t));
      timersRef.current = [];
    };
  }, []);

  // GSAP ScrollTrigger Cinematic Scrubbed Timeline
  useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) {
      // Respect accessibility: Leave layout in static settled position
      gsap.set([portraitWrapperRef.current, rightContentRef.current], { clearProps: "all" });
      return;
    }

    const sectionEl = sectionRef.current;
    const pinStageEl = pinStageRef.current;
    const portraitEl = portraitWrapperRef.current;
    const rightContentEl = rightContentRef.current;
    const initialMetaEl = initialMetaRef.current;
    const watermarkEl = watermarkRef.current;

    if (!sectionEl || !pinStageEl || !portraitEl || !rightContentEl) return;

    const mm = gsap.matchMedia();

    // 1. DESKTOP ANIMATION (>= 1024px): Immersive scrubbed cinematic pinning timeline
    mm.add("(min-width: 1024px)", () => {
      // Compute geometric offsets for smooth cinematic centering at 0%
      const containerRect = pinStageEl.getBoundingClientRect();
      const portraitRect = portraitEl.getBoundingClientRect();

      const stageCenterX = containerRect.width / 2;
      const portraitCenterX = (portraitRect.left - containerRect.left) + portraitRect.width / 2;
      const deltaX = stageCenterX - portraitCenterX;
      const deltaY = 48; // Head appears lower initially matching downward gaze
      const initialScale = 1.16;
      const scrollDistance = 1300;

      // Initial visual setup for scroll 0% managed entirely by GSAP
      gsap.set(portraitEl, { x: deltaX, y: deltaY, scale: initialScale });
      gsap.set(rightContentEl, { opacity: 0, y: 35, pointerEvents: "none" });
      if (initialMetaEl) gsap.set(initialMetaEl, { opacity: 1, y: 0 });
      if (watermarkEl) gsap.set(watermarkEl, { opacity: 0.05, scale: 1 });

      // Master Scroll-Driven Timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionEl,
          start: "top 64px",
          end: `+=${scrollDistance}`,
          pin: pinStageEl,
          scrub: 0.8,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // Pointer events enabled automatically at 72% scroll progression (reverses on backward scrub)
      tl.set(rightContentEl, { pointerEvents: "auto" }, 0.72);

      // Stage 1 (0% -> 25%):
      // - Portrait begins moving upward
      // - Scale begins gentle adjustment
      // - Large name typography & initial cues transition away
      if (initialMetaEl) {
        tl.to(initialMetaEl, { opacity: 0, y: -20, duration: 0.2, ease: "power1.out" }, 0);
      }
      if (watermarkEl) {
        tl.to(watermarkEl, { opacity: 0, scale: 1.05, duration: 0.35, ease: "power1.out" }, 0);
      }
      tl.to(
        portraitEl,
        {
          x: deltaX * 0.78,
          y: deltaY * 0.35,
          scale: initialScale * 0.97,
          duration: 0.25,
          ease: "power1.inOut",
        },
        0
      );

      // Stage 2 (25% -> 50%):
      // - Portrait moves diagonally upward and towards the left
      // - Right content starts revealing gradually
      tl.to(
        portraitEl,
        {
          x: deltaX * 0.35,
          y: 12,
          scale: 1.03,
          duration: 0.25,
          ease: "power1.inOut",
        },
        0.25
      );
      tl.to(
        rightContentEl,
        {
          opacity: 0.45,
          y: 18,
          duration: 0.25,
          ease: "power1.out",
        },
        0.25
      );

      // Stage 3 (50% -> 75%):
      // - Portrait continues moving towards left, creating balanced composition
      // - Right content reveals further with staggered elements
      tl.to(
        portraitEl,
        {
          x: deltaX * 0.08,
          y: 0,
          scale: 1.01,
          duration: 0.25,
          ease: "power1.out",
        },
        0.5
      );
      tl.to(
        rightContentEl,
        {
          opacity: 0.85,
          y: 6,
          duration: 0.25,
          ease: "power1.out",
        },
        0.5
      );

      // Stage 4 (75% -> 100%):
      // - Portrait settles cleanly into its final left-side natural position
      // - Right introduction reaches full visibility and interactive controls
      tl.to(
        portraitEl,
        {
          x: 0,
          y: 0,
          scale: 1.0,
          duration: 0.25,
          ease: "power2.out",
        },
        0.75
      );
      tl.to(
        rightContentEl,
        {
          opacity: 1,
          y: 0,
          duration: 0.25,
          ease: "power2.out",
        },
        0.75
      );
    });

    // 2. MOBILE / TABLET (< 1024px): Natural document flow, zero horizontal displacement, 100% stable visibility
    mm.add("(max-width: 1023px)", () => {
      // Clear all GSAP inline styles to restore natural document flow and full visibility
      gsap.set([portraitEl, rightContentEl], { clearProps: "all" });
      if (initialMetaEl) gsap.set(initialMetaEl, { clearProps: "all" });
      if (watermarkEl) gsap.set(watermarkEl, { clearProps: "all" });
    });

    return () => {
      mm.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative border-b border-[var(--border-subtle)] bg-[var(--bg-canvas)] overflow-x-clip"
    >
      {/* Background subtle radial ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20 dark:opacity-30"
        style={{
          backgroundImage:
            "radial-gradient(circle at 50% 20%, rgba(163, 230, 53, 0.15) 0%, transparent 65%)",
        }}
      />

      {/* Pinned Stage Window on Desktop / Naturally Flowing Hero on Mobile */}
      <div
        ref={pinStageRef}
        className="relative w-full py-10 sm:py-14 lg:py-0 lg:h-[calc(100dvh-4rem)] lg:min-h-[580px] lg:max-h-[960px] lg:overflow-hidden flex flex-col justify-center"
      >
        {/* Stage 0 Watermark / Editorial Background Typography (Desktop only) */}
        <div
          ref={watermarkRef}
          className="absolute inset-0 hidden lg:flex flex-col justify-center items-center pointer-events-none select-none z-0"
        >
          <div className="font-extrabold text-[13vw] sm:text-[11vw] lg:text-[9.5vw] leading-[0.88] tracking-tight uppercase text-white/[0.04] text-center font-sans">
            CHIRANJEEV
          </div>
          <div className="font-extrabold text-[13vw] sm:text-[11vw] lg:text-[9.5vw] leading-[0.88] tracking-tight uppercase text-white/[0.04] text-center font-sans">
            RASTOGI
          </div>
        </div>

        {/* Initial View Floating Metadata & Scroll Cue (Desktop only) */}
        <div
          ref={initialMetaRef}
          className="absolute bottom-5 sm:bottom-8 inset-x-4 sm:inset-x-8 hidden lg:flex items-center justify-between z-20 pointer-events-none"
        >
          <div className="flex items-center gap-2.5 font-mono text-xs text-[var(--text-tertiary)] bg-[var(--bg-surface)]/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-[var(--border-subtle)]">
            <span className="w-2 h-2 rounded-full bg-[var(--accent-lime)] animate-pulse" />
            <span className="text-[var(--text-primary)] font-semibold">BACKEND ARCHITECTURE</span>
            <span className="hidden sm:inline">&bull;</span>
            <span className="hidden sm:inline text-[var(--text-secondary)]">DISTRIBUTED SYSTEMS</span>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs text-[var(--accent-lime)] bg-[var(--bg-surface)]/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-[var(--border-subtle)]">
            <span>SCROLL TO EXPLORE</span>
            <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
          </div>
        </div>

        {/* Main Hero Container */}
        <Container className="relative z-10 w-full">
          <div className="flex flex-col lg:flex-row items-center lg:items-center justify-between gap-6 sm:gap-8 lg:gap-10 xl:gap-14">

            {/* LEFT: Portrait Card */}
            <div
              ref={portraitWrapperRef}
              className="w-[200px] sm:w-[240px] lg:w-[350px] xl:w-[390px] h-[260px] sm:h-[310px] lg:h-[470px] xl:h-[510px] shrink-0 relative rounded-2xl overflow-hidden border border-[var(--border-subtle)] bg-[var(--bg-surface)] shadow-2xl group will-change-transform"
            >
              <Image
                src="/images/avatar.jpg"
                alt={name}
                fill
                priority
                sizes="(max-width: 640px) 200px, (max-width: 1024px) 240px, 390px"
                className="object-cover object-top filter grayscale contrast-[112%] brightness-[94%] transition-all duration-500 group-hover:contrast-[118%]"
              />

              {/* Cinematic Bottom Gradient Vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-canvas)] via-transparent to-transparent opacity-70 pointer-events-none" />

              {/* Inner subtle frame border */}
              <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10 pointer-events-none" />

              {/* Editorial Portrait Caption Bar */}
              <div className="absolute bottom-3 inset-x-3 flex items-center justify-between text-[10px] font-mono text-[var(--text-tertiary)] bg-[var(--bg-surface-elevated)]/85 backdrop-blur-md px-2.5 py-1.5 rounded-lg border border-[var(--border-subtle)]">
                <span className="flex items-center gap-1.5 text-[var(--text-primary)] font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-lime)]" />
                  <span>{name}</span>
                </span>
                <span className="text-[var(--text-tertiary)]">PORTRAIT // 01</span>
              </div>
            </div>

            {/* RIGHT: Content Section */}
            <div
              ref={rightContentRef}
              className="flex-1 min-w-0 w-full will-change-transform text-center lg:text-left"
            >
              {/* Session Tag */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5 sm:gap-3 mb-3 sm:mb-3.5">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-surface)] text-xs font-mono text-[var(--text-secondary)]">
                  <Terminal className="w-3.5 h-3.5 text-[var(--accent-lime)]" />
                  <span>portfolio.main_view</span>
                </div>
                <Badge variant="lime">Available for Opportunities</Badge>
              </div>

              {/* Headline */}
              <h1 className="text-2xl sm:text-3xl md:text-4xl xl:text-5xl font-extrabold tracking-tight text-[var(--text-primary)] mb-2 font-sans">
                {name}
              </h1>

              {/* Animated Two-Part Professional Title */}
              <div
                className="font-mono text-base sm:text-xl xl:text-2xl font-bold mb-2.5 flex items-center justify-center lg:justify-start flex-wrap gap-x-2 text-[var(--text-primary)]"
                aria-live="polite"
              >
                <span className="shrink-0 text-[var(--text-secondary)]">I&apos;m a</span>
                <div className="relative inline-flex items-center overflow-hidden h-[1.4em] align-middle">
                  <span
                    className={`text-[var(--accent-lime)] inline-flex items-center whitespace-nowrap will-change-transform ${titleStatus === "visible"
                        ? "transition-all duration-300 ease-out transform translate-y-0 opacity-100"
                        : titleStatus === "exiting"
                          ? "transition-all duration-300 ease-in transform -translate-y-full opacity-0"
                          : "transition-none transform translate-y-full opacity-0"
                      }`}
                  >
                    <span>{TITLES[currentTitleIndex]}</span>
                    <span
                      className="inline-block w-0.5 sm:w-[3px] h-[0.85em] bg-[var(--accent-lime)] ml-1.5 animate-pulse shadow-[0_0_8px_rgba(163,230,53,0.8)] align-middle"
                      aria-hidden="true"
                    />
                  </span>
                </div>
              </div>

              {/* Subtitle / Domain Focus & Location */}
              <div className="font-mono text-xs sm:text-sm text-[var(--text-secondary)] mb-3.5 sm:mb-4 flex flex-wrap items-center justify-center lg:justify-start gap-x-2 gap-y-1">
                <span className="text-[var(--text-primary)] font-medium">Backend Development &bull; Distributed Systems</span>
                <span className="text-[var(--text-tertiary)]">&bull;</span>
                <span className="flex items-center gap-1 text-[var(--text-tertiary)]">
                  <MapPin className="w-3 h-3 text-[var(--accent-lime)]" />
                  <span>{location}</span>
                </span>
              </div>

              {/* Value Proposition */}
              <p className="text-xs sm:text-sm xl:text-base text-[var(--text-secondary)] leading-relaxed mb-5 max-w-xl mx-auto lg:mx-0">
                Specializing in architecting modular REST microservices, transactional state machines, and relational database systems using <span className="text-[var(--text-primary)] font-medium">Node.js, NestJS, TypeScript,</span> and <span className="text-[var(--text-primary)] font-medium">PostgreSQL</span>. Experienced in shipping production-style internship platforms and verifiable open-source backend services.
              </p>

              {/* Spec Tags */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 mb-5 sm:mb-6">
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] text-[11px] font-mono text-[var(--text-secondary)]">
                  <Server className="w-3 h-3 text-[var(--accent-lime)]" />
                  <span>NestJS Microservices</span>
                </div>
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] text-[11px] font-mono text-[var(--text-secondary)]">
                  <Database className="w-3 h-3 text-[var(--accent-lime)]" />
                  <span>PostgreSQL / TypeORM</span>
                </div>
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] text-[11px] font-mono text-[var(--text-secondary)]">
                  <ShieldCheck className="w-3 h-3 text-[var(--accent-lime)]" />
                  <span>JWT / RBAC Defense</span>
                </div>
              </div>

              {/* Action CTAs */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5 sm:gap-3">
                <Button
                  href="#projects"
                  variant="primary"
                  size="sm"
                  className="font-mono text-xs uppercase tracking-wider"
                >
                  <span>Explore Projects</span>
                  <ArrowDown className="w-3.5 h-3.5 ml-1" />
                </Button>

                <Button
                  href="/resume/Chiranjeev_Rastogi_Resume.pdf"
                  download="Chiranjeev_Rastogi_Resume.pdf"
                  variant="secondary"
                  size="sm"
                  className="font-mono text-xs"
                >
                  <Download className="w-3.5 h-3.5 text-[var(--accent-lime)]" />
                  <span>Download Resume</span>
                </Button>

                <Button
                  href="#contact"
                  variant="outline"
                  size="sm"
                  className="font-mono text-xs"
                >
                  <span>Get in Touch</span>
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
}

"use client";

import { useEffect, useRef, useCallback } from "react";
import gsap from "gsap";

interface PortfolioBootLoaderProps {
  onComplete: () => void;
  onSkip: () => void;
}

const MODIFIER_KEYS = new Set([
  "Shift",
  "Control",
  "Alt",
  "Meta",
  "CapsLock",
  "NumLock",
  "ScrollLock",
  "Fn",
  "FnLock",
  "Symbol",
  "SymbolLock",
]);

export function PortfolioBootLoader({
  onComplete,
  onSkip,
}: PortfolioBootLoaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const scene1Ref = useRef<HTMLDivElement>(null);
  const scene2Ref = useRef<HTMLDivElement>(null);
  const scene3Ref = useRef<HTMLDivElement>(null);
  const scene3SubRef = useRef<HTMLParagraphElement>(null);
  const scene4Ref = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const hasFinishedRef = useRef<boolean>(false);

  // Safe finish invocation ensuring callback runs only once
  const triggerFinish = useCallback(() => {
    if (hasFinishedRef.current) return;
    hasFinishedRef.current = true;
    onComplete();
  }, [onComplete]);

  // Idempotent Skip Intro handler: immediately stops animation, fades out overlay, and resolves
  const handleSkip = useCallback(() => {
    if (hasFinishedRef.current) return;
    hasFinishedRef.current = true;

    if (timelineRef.current) {
      timelineRef.current.kill();
    }

    if (overlayRef.current) {
      gsap.to(overlayRef.current, {
        opacity: 0,
        duration: 0.2,
        ease: "power2.out",
        onComplete: () => {
          onSkip();
        },
      });
    } else {
      onSkip();
    }
  }, [onSkip]);

  // Master GSAP Scoped Timeline
  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Initial State Setup
      gsap.set(overlayRef.current, { opacity: 1 });
      gsap.set(progressBarRef.current, { scaleX: 0 });
      gsap.set(
        [
          scene1Ref.current,
          scene2Ref.current,
          scene3Ref.current,
          scene4Ref.current,
        ],
        {
          opacity: 0,
          y: 18,
        }
      );
      if (scene3SubRef.current) {
        gsap.set(scene3SubRef.current, { opacity: 0, y: 10, letterSpacing: "0.22em" });
      }

      // 2. Master Coordinated Timeline (~3.35s total)
      const tl = gsap.timeline({
        onComplete: triggerFinish,
      });
      timelineRef.current = tl;

      // Synchronized progress line from 0 to 1 across entire intro
      tl.to(
        progressBarRef.current,
        {
          scaleX: 1,
          duration: 3.35,
          ease: "none",
        },
        0
      );

      // --- SCENE 01: Hello. (0.0s -> ~0.85s) ---
      tl.to(
        scene1Ref.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.45,
          ease: "power2.out",
        },
        0.05
      );
      tl.to(
        scene1Ref.current,
        {
          opacity: 0,
          y: -12,
          duration: 0.35,
          ease: "power2.in",
        },
        0.8
      );

      // --- SCENE 02: नमस्ते। (0.85s -> ~1.65s) ---
      tl.to(
        scene2Ref.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.45,
          ease: "power2.out",
        },
        0.85
      );
      tl.to(
        scene2Ref.current,
        {
          opacity: 0,
          y: -12,
          duration: 0.35,
          ease: "power2.in",
        },
        1.6
      );

      // --- SCENE 03: I'm Chiranjeev. + SOFTWARE ENGINEER (1.65s -> ~2.7s) ---
      tl.to(
        scene3Ref.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.45,
          ease: "power2.out",
        },
        1.68
      );
      if (scene3SubRef.current) {
        tl.to(
          scene3SubRef.current,
          {
            opacity: 1,
            y: 0,
            letterSpacing: "0.32em",
            duration: 0.45,
            ease: "power2.out",
          },
          1.85
        );
      }
      tl.to(
        scene3Ref.current,
        {
          opacity: 0,
          y: -10,
          duration: 0.35,
          ease: "power2.in",
        },
        2.65
      );

      // --- SCENE 04: WELCOME TO MY PORTFOLIO (2.7s -> ~3.35s) ---
      tl.to(
        scene4Ref.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.35,
          ease: "power2.out",
        },
        2.72
      );
      // Final exit transition: subtle zoom and dissolve into the portfolio
      tl.to(
        overlayRef.current,
        {
          opacity: 0,
          scale: 1.015,
          duration: 0.35,
          ease: "power2.inOut",
        },
        3.05
      );
    }, containerRef);

    return () => {
      ctx.revert();
    };
  }, [triggerFinish]);

  // Comprehensive keyboard interaction: any non-modifier key skips the intro
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore repeated keydown events (user holding key down)
      if (e.repeat) return;

      // Ignore modifier-only keys
      if (MODIFIER_KEYS.has(e.key)) return;

      // Do not interfere with browser navigation, shortcuts, or devtools
      if (
        e.ctrlKey ||
        e.metaKey ||
        e.altKey ||
        (e.key.startsWith("F") && e.key.length > 1)
      ) {
        return;
      }

      // Any valid key skips the intro
      e.preventDefault();
      e.stopPropagation();
      handleSkip();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleSkip]);

  return (
    <div
      ref={containerRef}
      onClick={(e) => {
        e.stopPropagation();
        handleSkip();
      }}
      className="fixed inset-0 z-[100] bg-black text-white overflow-hidden select-none cursor-pointer"
      role="dialog"
      aria-modal="true"
      aria-label="Cinematic portfolio introduction"
    >
      {/* Master Animated Overlay */}
      <div
        ref={overlayRef}
        className="relative w-full h-full flex flex-col items-center justify-center bg-black px-4"
      >
        {/* Subtle cinematic grain texture overlay (imperceptible, non-intrusive) */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.025]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.08) 0%, transparent 80%)",
          }}
        />

        {/* Central Stage: Fixed-size container guaranteeing zero layout shift */}
        <div className="relative w-full max-w-4xl h-56 sm:h-64 md:h-72 flex items-center justify-center text-center pointer-events-none">
          {/* Scene 01: Hello. (Handwritten Script Typography) */}
          <div
            ref={scene1Ref}
            className="absolute inset-0 flex items-center justify-center"
          >
            <h1
              className="font-script text-white text-7xl sm:text-8xl md:text-9xl lg:text-[10rem] font-normal leading-none tracking-wide"
              style={{
                textShadow:
                  "0 0 25px rgba(255, 255, 255, 0.45), 0 0 50px rgba(255, 255, 255, 0.18)",
              }}
            >
              Hello.
            </h1>
          </div>

          {/* Scene 02: नमस्ते। (Devanagari Typography) */}
          <div
            ref={scene2Ref}
            className="absolute inset-0 flex items-center justify-center"
          >
            <h1
              className="font-devanagari text-white text-6xl sm:text-7xl md:text-8xl lg:text-[9rem] font-medium leading-none tracking-normal"
              style={{
                textShadow:
                  "0 0 25px rgba(255, 255, 255, 0.4), 0 0 50px rgba(255, 255, 255, 0.15)",
              }}
            >
              नमस्ते।
            </h1>
          </div>

          {/* Scene 03: I'm Chiranjeev. + SOFTWARE ENGINEER (Editorial Typography) */}
          <div
            ref={scene3Ref}
            className="absolute inset-0 flex flex-col items-center justify-center"
          >
            <h1
              className="font-sans text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-tight leading-tight"
              style={{
                textShadow:
                  "0 0 20px rgba(255, 255, 255, 0.35), 0 0 40px rgba(255, 255, 255, 0.12)",
              }}
            >
              I&apos;m Chiranjeev.
            </h1>
            <p
              ref={scene3SubRef}
              className="font-mono text-[11px] sm:text-xs md:text-sm text-zinc-400 uppercase tracking-[0.3em] sm:tracking-[0.35em] mt-3 sm:mt-4 font-normal"
            >
              Software Engineer
            </p>
          </div>

          {/* Scene 04: WELCOME TO MY PORTFOLIO (Transition) */}
          <div
            ref={scene4Ref}
            className="absolute inset-0 flex items-center justify-center"
          >
            <p
              className="font-mono text-xs sm:text-sm md:text-base text-zinc-300 uppercase tracking-[0.35em] sm:tracking-[0.4em] font-medium"
              style={{
                textShadow: "0 0 15px rgba(255, 255, 255, 0.3)",
              }}
            >
              Welcome to my portfolio
            </p>
          </div>
        </div>

        {/* Minimal Bottom Progress Indicator */}
        <div className="fixed bottom-0 left-0 right-0 h-[2px] bg-white/10 z-50 pointer-events-none">
          <div
            ref={progressBarRef}
            className="h-full bg-white origin-left shadow-[0_0_8px_rgba(255,255,255,0.7)]"
            style={{ transform: "scaleX(0)" }}
          />
        </div>

        {/* Minimal Skip Controls & Instruction */}
        <div className="fixed bottom-6 right-6 z-50 sm:bottom-8 sm:right-8 flex flex-col sm:flex-row items-end sm:items-center gap-2 sm:gap-3 pointer-events-auto">
          {/* Responsive instruction hint: tap on mobile/tablet, click or key on desktop */}
          <span className="text-[11px] font-mono text-zinc-400 select-none tracking-wide text-right">
            <span className="hidden md:inline">Press any key or click anywhere to skip</span>
            <span className="inline md:hidden">Tap anywhere to skip</span>
          </span>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleSkip();
            }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/10 bg-black/60 backdrop-blur-md text-zinc-300 hover:text-white hover:border-white/25 transition-all text-xs font-mono cursor-pointer focus:outline-none focus:ring-1 focus:ring-white shrink-0 shadow-lg"
            title="Skip Introduction"
            aria-label="Skip cinematic introduction"
          >
            <span>Skip Intro</span>
          </button>
        </div>
      </div>
    </div>
  );
}

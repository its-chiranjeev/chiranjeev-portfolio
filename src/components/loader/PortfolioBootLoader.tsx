"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import { Terminal, CheckCircle2, SkipForward } from "lucide-react";
import { CRLogo } from "@/components/brand/CRLogo";

interface BootStep {
  id: string;
  command: string;
  detail: string;
}

const BOOT_STEPS: BootStep[] = [
  {
    id: "01",
    command: "Initializing portfolio environment...",
    detail: "Node.js runtime & security contexts verified",
  },
  {
    id: "02",
    command: "Loading developer profile...",
    detail: "Chiranjeev Rastogi // Software Engineer & Full-Stack Developer",
  },
  {
    id: "03",
    command: "Connecting engineering projects...",
    detail: "Poojawala • HiChandra • NestJS URL Shortener",
  },
  {
    id: "04",
    command: "Preparing digital experience...",
    detail: "Subsystems compiled & telemetry active",
  },
  {
    id: "05",
    command: "SYSTEM READY.",
    detail: "Redirecting to portfolio...",
  },
];

export function PortfolioBootLoader() {
  const router = useRouter();
  const [completedSteps, setCompletedSteps] = useState<number>(0);
  const [progress, setProgress] = useState<number>(0);
  const [isReady, setIsReady] = useState<boolean>(false);
  const [isFadingOut, setIsFadingOut] = useState<boolean>(false);
  const hasRedirected = useRef<boolean>(false);

  // Instant navigation to /portfolio
  const navigateToPortfolio = useCallback(() => {
    if (hasRedirected.current) return;
    hasRedirected.current = true;
    setIsFadingOut(true);
    setTimeout(() => {
      router.replace("/portfolio");
    }, 200);
  }, [router]);

  // Skip Intro handler
  const handleSkip = useCallback(() => {
    setProgress(100);
    setCompletedSteps(BOOT_STEPS.length);
    setIsReady(true);
    navigateToPortfolio();
  }, [navigateToPortfolio]);

  // Main animation orchestrator (~2.4s sequence)
  useEffect(() => {
    // Prefetch /portfolio so navigation is instantaneous
    router.prefetch("/portfolio");

    // Accessibility check: immediately navigate if user prefers reduced motion
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) {
      router.replace("/portfolio");
      return;
    }

    // Timeline schedule for ~2.3 - 2.5 second boot
    const timeline = [
      { delay: 350, step: 1, progress: 25 },
      { delay: 850, step: 2, progress: 50 },
      { delay: 1350, step: 3, progress: 75 },
      { delay: 1850, step: 4, progress: 92 },
      { delay: 2200, step: 5, progress: 100, ready: true },
      { delay: 2500, redirect: true },
    ];

    const timers: NodeJS.Timeout[] = [];

    timeline.forEach((item) => {
      const timer = setTimeout(() => {
        if (hasRedirected.current) return;

        if (item.step !== undefined) {
          setCompletedSteps(item.step);
        }
        if (item.progress !== undefined) {
          setProgress(item.progress);
        }
        if (item.ready) {
          setIsReady(true);
        }
        if (item.redirect) {
          navigateToPortfolio();
        }
      }, item.delay);

      timers.push(timer);
    });

    return () => {
      timers.forEach((t) => clearTimeout(t));
    };
  }, [router, handleSkip, navigateToPortfolio]);

  // Keyboard shortcut listener (Escape, Enter, Space to skip)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        handleSkip();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleSkip]);

  return (
    <div
      className={`min-h-screen w-full flex flex-col items-center justify-center bg-[#070709] text-[#f4f4f6] relative px-4 py-8 overflow-hidden transition-opacity duration-300 ${
        isFadingOut ? "opacity-0 scale-[0.99]" : "opacity-100 scale-100"
      }`}
    >
      {/* Subtle radial ambient neon lime glow */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage:
            "radial-gradient(circle at 50% 50%, rgba(163, 230, 53, 0.12) 0%, rgba(163, 230, 53, 0.02) 40%, transparent 70%)",
        }}
      />

      {/* Screen Reader & Noscript Accessible Fallback */}
      <noscript>
        <div className="p-6 rounded-xl border border-[var(--border-subtle)] bg-[#121216] text-center space-y-4 max-w-md w-full">
          <p className="font-mono text-sm text-[var(--accent-lime)] font-bold">
            Chiranjeev Rastogi — Software Engineer & Full-Stack Developer
          </p>
          <p className="text-xs text-[var(--text-secondary)]">
            Engineering full-stack web applications, resilient backend architectures, and high-integrity systems.
          </p>
          <a
            href="/portfolio"
            className="inline-block px-4 py-2 rounded-lg bg-[var(--accent-lime)] text-black font-mono text-xs font-semibold hover:opacity-90 transition-opacity"
          >
            Enter Portfolio Directly &rarr;
          </a>
        </div>
      </noscript>

      {/* Main Terminal Loader Card */}
      <div className="w-full max-w-lg mx-auto relative z-10 space-y-4">
        {/* Prominent CR Brand Identity Reveal */}
        <CRLogo variant="loader" size={56} className="mb-2" />

        <div className="rounded-2xl border border-[var(--border-subtle)] bg-[#0d0d12]/95 backdrop-blur-xl shadow-[0_0_60px_-15px_rgba(163,230,53,0.12)] overflow-hidden">
          {/* Top Terminal Bar */}
          <div className="px-4 py-3 bg-[#13131a] border-b border-[var(--border-subtle)] flex items-center justify-between gap-3">
            {/* Terminal Window Dots */}
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
            </div>

            {/* Title / Identity Tag */}
            <div className="flex items-center gap-1.5 font-mono text-xs text-[var(--text-secondary)] truncate">
              <Terminal className="w-3.5 h-3.5 text-[var(--accent-lime)] shrink-0" />
              <span className="font-semibold text-[var(--text-primary)]">CR//SYSTEM_INIT</span>
            </div>

            {/* Status Indicator */}
            <div
              className={`flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-mono tracking-wider uppercase border transition-colors ${
                isReady
                  ? "border-[var(--accent-lime)]/40 bg-[var(--accent-lime-muted)] text-[var(--accent-lime)]"
                  : "border-amber-500/30 bg-amber-500/10 text-amber-400"
              }`}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  isReady ? "bg-[var(--accent-lime)] shadow-[0_0_8px_rgba(163,230,53,0.8)]" : "bg-amber-400 animate-pulse"
                }`}
              />
              <span>{isReady ? "ONLINE" : "BOOTING"}</span>
            </div>
          </div>

          {/* Terminal Content Body */}
          <div className="p-5 sm:p-6 font-mono space-y-4">
            {/* Shell Command Line */}
            <div className="flex items-center gap-2 text-xs text-[var(--text-secondary)] pb-1 border-b border-[var(--border-subtle)]/50">
              <span className="text-[var(--accent-lime)] font-bold">&gt;</span>
              <span className="text-[var(--text-primary)] font-medium">
                exec ./boot_sequence.sh --target=portfolio
              </span>
            </div>

            {/* Animated Boot Messages */}
            <div
              className="space-y-2.5 min-h-[140px]"
              role="status"
              aria-live="polite"
              aria-label="Portfolio boot sequence progress"
            >
              {BOOT_STEPS.map((step, idx) => {
                const isStepFinished = completedSteps > idx;
                const isStepActive = completedSteps === idx;

                if (completedSteps < idx) {
                  return null;
                }

                return (
                  <div
                    key={step.id}
                    className="space-y-0.5 animate-in fade-in slide-in-from-bottom-1 duration-200"
                  >
                    <div className="flex items-center justify-between text-xs sm:text-[13px] gap-2">
                      <div className="flex items-center gap-2 truncate">
                        <span className="text-[var(--text-tertiary)] font-bold shrink-0">
                          [{step.id}]
                        </span>
                        <span
                          className={
                            step.id === "05" && isReady
                              ? "text-[var(--accent-lime)] font-bold tracking-wide"
                              : "text-[var(--text-primary)]"
                          }
                        >
                          {step.command}
                        </span>
                      </div>

                      <div className="shrink-0 text-[11px]">
                        {isStepFinished ? (
                          <span className="text-[var(--accent-lime)] font-semibold inline-flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3 text-[var(--accent-lime)]" />
                            [OK]
                          </span>
                        ) : isStepActive ? (
                          <span className="text-amber-400 font-medium inline-flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping inline-block" />
                            [BUSY]
                          </span>
                        ) : (
                          <span className="text-[var(--text-tertiary)]">[WAIT]</span>
                        )}
                      </div>
                    </div>

                    {isStepFinished && (
                      <div className="pl-6 text-[11px] text-[var(--text-secondary)] flex items-center gap-1.5">
                        <span className="text-[var(--accent-lime)] font-bold">&rarr;</span>
                        <span className="truncate">{step.detail}</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Progress Bar Container */}
            <div className="pt-2 space-y-1.5">
              <div className="flex items-center justify-between text-[11px] text-[var(--text-tertiary)]">
                <span>PORTFOLIO INITIALIZATION</span>
                <span className="font-bold text-[var(--accent-lime)] tabular-nums font-mono">
                  {progress}%
                </span>
              </div>
              <div className="h-1.5 w-full bg-[#181822] rounded-full overflow-hidden border border-[var(--border-subtle)] p-0.5">
                <div
                  className="h-full bg-[var(--accent-lime)] rounded-full transition-all duration-300 ease-out shadow-[0_0_10px_rgba(163,230,53,0.7)]"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            {/* Active cursor blink / Ready state status */}
            <div className="pt-1 flex items-center justify-between text-[11px] text-[var(--text-tertiary)]">
              <div className="flex items-center gap-1.5">
                <span className="text-[var(--accent-lime)]">$</span>
                <span>
                  {isReady
                    ? "Mounting portfolio view..."
                    : "Synchronizing system telemetry..."}
                </span>
                {!isReady && (
                  <span className="inline-block w-2 h-3.5 bg-[var(--accent-lime)] animate-pulse align-middle" />
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Controls / Skip Action */}
        <div className="flex items-center justify-between px-2 text-xs font-mono">
          <span className="text-[11px] text-[var(--text-tertiary)]">
            ENV: PRODUCTION // V2.4
          </span>

          <button
            type="button"
            onClick={handleSkip}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[var(--border-subtle)] bg-[#101016] hover:border-[var(--accent-lime)] hover:text-[var(--accent-lime)] text-[var(--text-secondary)] transition-all cursor-pointer text-xs"
            title="Skip Intro (Escape)"
          >
            <span>Skip Intro</span>
            <span className="text-[10px] text-[var(--text-tertiary)] bg-[#181822] px-1 rounded border border-[var(--border-subtle)]">
              ESC
            </span>
            <SkipForward className="w-3 h-3 ml-0.5" />
          </button>
        </div>
      </div>
    </div>
  );
}

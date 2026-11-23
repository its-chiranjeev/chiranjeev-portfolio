"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle2, ArrowRight, ShieldCheck, Mail, Clock } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { CRLogo } from "@/components/brand/CRLogo";

const REDIRECT_SECONDS = 4;

export function ThankYouView() {
  const router = useRouter();
  const [secondsLeft, setSecondsLeft] = useState<number>(REDIRECT_SECONDS);
  const hasRedirected = useRef<boolean>(false);

  const handleReturn = useCallback(() => {
    if (hasRedirected.current) return;
    hasRedirected.current = true;
    router.replace("/portfolio");
  }, [router]);

  useEffect(() => {
    // Prefetch target route for instantaneous navigation
    router.prefetch("/portfolio");

    // Pure visual countdown interval (no side-effects in state updater)
    const intervalTimer = setInterval(() => {
      setSecondsLeft((prev) => (prev > 1 ? prev - 1 : 0));
    }, 1000);

    // Dedicated timeout for automatic redirection outside React render phase
    const redirectTimer = setTimeout(() => {
      handleReturn();
    }, REDIRECT_SECONDS * 1000);

    return () => {
      clearInterval(intervalTimer);
      clearTimeout(redirectTimer);
    };
  }, [handleReturn, router]);

  // Percentage of time elapsed for the progress indicator
  const progressPercent = Math.max(
    0,
    Math.min(100, ((REDIRECT_SECONDS - secondsLeft) / REDIRECT_SECONDS) * 100)
  );

  return (
    <div className="min-h-screen w-full flex flex-col justify-between bg-[var(--bg-canvas)] text-[var(--text-primary)] relative px-4 py-6 transition-colors">
      {/* Top Navigation Strip */}
      <header className="w-full max-w-5xl mx-auto flex items-center justify-between pb-6">
        <CRLogo variant="navbar" href="/portfolio" size={26} />
        <div className="flex items-center gap-2">
          <ThemeToggle />
        </div>
      </header>

      {/* Center Thank-You Card */}
      <main className="w-full max-w-xl mx-auto my-auto relative z-10">
        <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-6 sm:p-10 shadow-2xl relative overflow-hidden backdrop-blur-sm">
          {/* Subtle Ambient Radial Glow */}
          <div
            className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-[var(--accent-lime)] opacity-10 blur-3xl pointer-events-none"
            aria-hidden="true"
          />

          {/* Status Header & Icon */}
          <div className="flex flex-col items-center text-center space-y-4">
            {/* Animated Checkmark Indicator */}
            <div className="relative">
              <div
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[var(--accent-lime-muted)] border border-[var(--accent-lime)]/40 flex items-center justify-center text-[var(--accent-lime)] shadow-[0_0_24px_rgba(163,230,53,0.25)] animate-in zoom-in-90 duration-300"
              >
                <CheckCircle2
                  className="w-8 h-8 sm:w-10 sm:h-10 text-[var(--accent-lime)]"
                  aria-hidden="true"
                />
              </div>
            </div>

            {/* Monospace Badge */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono uppercase tracking-wider bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] text-[var(--accent-lime)]">
              <ShieldCheck className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Inquiry Confirmed // 200 OK</span>
            </div>

            {/* Primary Heading */}
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--text-primary)]">
              Thank You for Reaching Out!
            </h1>

            {/* Description */}
            <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed max-w-md">
              Your message has been successfully submitted. I&apos;ll review it and get back to you as soon as possible.
            </p>
          </div>

          {/* Telemetry / Direct Channel Details */}
          <div className="mt-8 pt-6 border-t border-[var(--border-subtle)] space-y-3">
            <div className="p-3.5 rounded-xl bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] flex items-center justify-between gap-3 text-xs font-mono">
              <div className="flex items-center gap-2 text-[var(--text-secondary)] truncate">
                <Mail className="w-4 h-4 text-[var(--accent-lime)] shrink-0" aria-hidden="true" />
                <span className="truncate">Destination: chiranjeevrastogi@gmail.com</span>
              </div>
              <span className="text-[10px] text-[var(--accent-lime)] font-semibold shrink-0 uppercase bg-[var(--accent-lime-muted)] px-2 py-0.5 rounded border border-[var(--accent-lime)]/20">
                Delivered
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] flex items-center gap-2.5 text-xs font-mono text-[var(--text-secondary)]">
              <Clock className="w-4 h-4 text-[var(--accent-lime)] shrink-0" aria-hidden="true" />
              <span>
                Response SLA: <strong className="text-[var(--text-primary)]">Within 24 Hours</strong>
              </span>
            </div>
          </div>

          {/* Countdown & Progress Bar */}
          <div
            className="mt-6 pt-5 border-t border-[var(--border-subtle)] space-y-2.5"
            role="status"
            aria-live="polite"
            aria-atomic="true"
          >
            <div className="flex items-center justify-between text-xs font-mono text-[var(--text-tertiary)]">
              <span>Automatic redirect in progress</span>
              <span className="font-semibold text-[var(--accent-lime)] tabular-nums">
                {secondsLeft}s remaining
              </span>
            </div>

            {/* Progress bar indicator */}
            <div
              className="h-1.5 w-full bg-[var(--bg-surface-elevated)] rounded-full overflow-hidden border border-[var(--border-subtle)]"
              aria-hidden="true"
            >
              <div
                className="h-full bg-[var(--accent-lime)] rounded-full transition-all duration-1000 ease-linear shadow-[0_0_8px_rgba(163,230,53,0.6)]"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Action Button */}
          <div className="mt-6">
            <Button
              type="button"
              onClick={handleReturn}
              variant="primary"
              size="lg"
              className="w-full font-mono text-xs uppercase tracking-wider justify-center"
            >
              <span>Return to Portfolio Now</span>
              <ArrowRight className="w-4 h-4 ml-2" aria-hidden="true" />
            </Button>
          </div>
        </div>
      </main>

      {/* Bottom Footer Notice */}
      <footer className="w-full max-w-5xl mx-auto text-center pt-6 text-[11px] font-mono text-[var(--text-tertiary)]">
        <span>&copy; {new Date().getFullYear()} Chiranjeev Rastogi &bull; All rights reserved.</span>
      </footer>
    </div>
  );
}

"use client";

import { useEffect } from "react";
import type { gsap as GsapType } from "gsap";

export interface SmoothScrollOptions {
  /** Offset in pixels from top (e.g. navbar height). Defaults to 64px. */
  offset?: number;
  /** Duration in seconds. Defaults to 0.9s (between 0.8s and 1.2s). */
  duration?: number;
  /** GSAP easing string. Defaults to "power2.inOut". */
  ease?: string;
  /** Whether to update the browser URL hash without causing an instant jump. Defaults to false. */
  updateHash?: boolean;
  /** Callback fired when the scroll animation completes. */
  onComplete?: () => void;
  /** Custom fallback target selector if primary is not found. */
  fallbackSelector?: string;
}

let gsapInstance: typeof GsapType | null = null;
let pluginRegistered = false;

/**
 * Dynamically imports GSAP and ScrollToPlugin on the client side,
 * registering the plugin once. Safe for Next.js SSR and build.
 */
export async function getGsap(): Promise<typeof GsapType | null> {
  if (typeof window === "undefined") return null;
  if (gsapInstance && pluginRegistered) return gsapInstance;

  try {
    const [{ default: gsap }, { ScrollToPlugin }] = await Promise.all([
      import("gsap"),
      import("gsap/ScrollToPlugin"),
    ]);

    gsap.registerPlugin(ScrollToPlugin);
    gsapInstance = gsap;
    pluginRegistered = true;
    return gsapInstance;
  } catch (error) {
    console.error("[smoothScroll] Failed to load GSAP ScrollToPlugin:", error);
    return null;
  }
}

/**
 * Resolves a target selector, ID, or HTMLElement to an existing DOM element.
 * Special-cases aliases like 'technology-analysis' <-> 'technology-details'.
 */
export function resolveTargetElement(
  target: string | HTMLElement
): HTMLElement | null {
  if (typeof window === "undefined") return null;
  if (typeof target !== "string") return target;

  const rawSelector = target.trim();
  const cleanId = rawSelector.replace(/^#/, "");

  // Special alias mapping: technology-analysis / technology-details
  if (cleanId === "technology-analysis" || cleanId === "technology-details") {
    return (
      document.getElementById("technology-analysis") ||
      document.getElementById("technology-details") ||
      document.querySelector('[data-section="technology-analysis"]') ||
      document.querySelector("#technology-details")
    );
  }

  // Direct ID match
  const byId = document.getElementById(cleanId);
  if (byId) return byId;

  // Query selector fallback
  try {
    const bySelector = document.querySelector<HTMLElement>(rawSelector);
    if (bySelector) return bySelector;
  } catch {
    // In case target is not a valid CSS selector
  }

  return null;
}

/**
 * Calculates the absolute clamped document scroll Y position for a given target and offset.
 */
export function calculateTargetY(
  target: string | HTMLElement,
  offset: number = 64
): number | null {
  if (typeof window === "undefined") return null;

  if (
    target === "#hero" ||
    target === "hero" ||
    target === "#top" ||
    target === "top"
  ) {
    return 0;
  }

  const element = resolveTargetElement(target);
  if (!element) return null;

  const rect = element.getBoundingClientRect();
  const rawY = rect.top + window.scrollY - offset;
  const maxScroll = Math.max(
    0,
    document.documentElement.scrollHeight - window.innerHeight
  );

  return Math.max(0, Math.min(rawY, maxScroll));
}

/**
 * Core GSAP Smooth Scroll function.
 * Smoothly animates window scroll position to a target element or position with:
 * - Fixed navbar offset support (default: 64px)
 * - Duration ~0.9s with "power2.inOut" easing
 * - overwrite: "auto" to prevent conflicting animations on rapid repeated clicks
 * - Respects prefers-reduced-motion (instant jump)
 * - Push state hash updating without instant browser jump
 * - Automatic body scroll lock unlocking
 */
export async function scrollToTarget(
  target: string | HTMLElement,
  options: SmoothScrollOptions = {}
): Promise<void> {
  if (typeof window === "undefined") return;

  const {
    offset = 64,
    duration = 0.9,
    ease = "power2.inOut",
    updateHash = false,
    onComplete,
    fallbackSelector,
  } = options;

  // Ensure body scroll is unlocked (e.g. if a modal/sheet was previously locking it)
  if (document.body.style.overflow === "hidden") {
    document.body.style.overflow = "";
  }

  // Calculate target position
  let targetY = calculateTargetY(target, offset);

  // Fallback selector resolution if primary target is not found
  if (targetY === null && fallbackSelector) {
    targetY = calculateTargetY(fallbackSelector, offset);
  }

  if (targetY === null) {
    // If target is #hero or top, fallback to 0
    if (
      typeof target === "string" &&
      (target === "#hero" || target === "#top" || target === "hero")
    ) {
      targetY = 0;
    } else {
      console.warn(`[smoothScroll] Target element not found:`, target);
      return;
    }
  }

  // Synchronize URL hash via pushState without instant browser jump
  if (updateHash && typeof target === "string" && target.startsWith("#")) {
    try {
      window.history.pushState(null, "", target);
    } catch {
      // Gracefully handle restricted environments
    }
  }

  // Check prefers-reduced-motion
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (prefersReducedMotion) {
    window.scrollTo({
      top: targetY,
      behavior: "instant" as ScrollBehavior,
    });
    onComplete?.();
    return;
  }

  // Load GSAP and trigger smooth animation
  const gsap = await getGsap();

  if (!gsap) {
    // Fallback to native smooth scroll if GSAP failed to load
    window.scrollTo({
      top: targetY,
      behavior: "smooth",
    });
    onComplete?.();
    return;
  }

  gsap.to(window, {
    duration,
    ease,
    scrollTo: {
      y: targetY,
      autoKill: true,
    },
    overwrite: "auto",
    onComplete: () => {
      onComplete?.();
    },
  });
}

/**
 * Hook to handle direct navigation to existing hash URLs on mount or hash change.
 * Waits for intro bootloader to finish before scrolling smoothly to the hash.
 */
export function useHashScroll() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const executeScroll = () => {
      const hash = window.location.hash;
      if (!hash || hash.length <= 1) return;

      // Do not scroll if intro is currently active
      if (document.documentElement.classList.contains("intro-active")) {
        return;
      }

      // Check if bootloader overlay is present
      const bootLoader = document.getElementById("portfolio-bootloader");
      if (bootLoader) return;

      // Double RAF ensures layout and dimensions are settled
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          scrollToTarget(hash, {
            offset: 64,
            updateHash: false,
          });
        });
      });
    };

    // Run on initial mount
    executeScroll();

    // Listen to intro state change, popstate and hashchange events
    window.addEventListener("intro-state-change", executeScroll);
    window.addEventListener("hashchange", executeScroll);
    window.addEventListener("popstate", executeScroll);

    return () => {
      window.removeEventListener("intro-state-change", executeScroll);
      window.removeEventListener("hashchange", executeScroll);
      window.removeEventListener("popstate", executeScroll);
    };
  }, []);
}

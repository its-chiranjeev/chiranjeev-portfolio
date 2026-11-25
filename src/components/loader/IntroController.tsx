"use client";

import { useEffect, useCallback, useRef, useSyncExternalStore } from "react";
import { usePathname, useRouter } from "next/navigation";
import { PortfolioBootLoader } from "./PortfolioBootLoader";

const INTRO_STORAGE_KEY = "chiranjeev_intro_seen";

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener("intro-state-change", callback);
  window.addEventListener("popstate", callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener("intro-state-change", callback);
    window.removeEventListener("popstate", callback);
  };
}

function getClientSnapshot(): boolean {
  try {
    if (typeof window === "undefined") return false;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return false;

    const path = window.location.pathname;
    const isRoot = path === "/" || path === "";
    if (isRoot) return true;

    const hasSeen = sessionStorage.getItem(INTRO_STORAGE_KEY) === "1";
    return !hasSeen;
  } catch {
    return false;
  }
}

function getServerSnapshot(): boolean {
  return false;
}

export function IntroController({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  const isIntroActive = useSyncExternalStore(
    subscribe,
    getClientSnapshot,
    getServerSnapshot
  );

  const hasCompletedRef = useRef<boolean>(false);

  // When pathname changes, notify subscribers and reset completion guard
  useEffect(() => {
    hasCompletedRef.current = false;
    window.dispatchEvent(new Event("intro-state-change"));
  }, [pathname]);

  // Synchronize DOM class and handle reduced-motion bypass on /
  useEffect(() => {
    if (!isIntroActive) {
      document.documentElement.classList.remove("intro-active");
      try {
        const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (prefersReduced && pathname === "/") {
          router.replace("/portfolio");
        }
      } catch {}
    }
  }, [isIntroActive, pathname, router]);

  const handleFinish = useCallback(() => {
    if (hasCompletedRef.current) return;
    hasCompletedRef.current = true;

    try {
      sessionStorage.setItem(INTRO_STORAGE_KEY, "1");
    } catch {
      // Gracefully handle restricted storage environments
    }

    document.documentElement.classList.remove("intro-active");

    if (pathname === "/") {
      router.replace("/portfolio");
    } else {
      window.dispatchEvent(new Event("intro-state-change"));
    }
  }, [pathname, router]);

  return (
    <>
      {isIntroActive && (
        <PortfolioBootLoader onComplete={handleFinish} onSkip={handleFinish} />
      )}
      <div
        id="main-content-wrapper"
        aria-hidden={isIntroActive ? "true" : undefined}
        className={isIntroActive ? "pointer-events-none select-none" : undefined}
      >
        {children}
      </div>
    </>
  );
}

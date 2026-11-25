"use client";

import React, { useEffect, useRef, useState, useCallback, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { X, Check } from "lucide-react";
import { cn } from "@/lib/utils";

export interface BottomSheetOption {
  id: string;
  label: string;
  count?: number;
  badge?: string;
  description?: string;
}

export interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  options?: BottomSheetOption[];
  selectedId?: string;
  onSelect?: (id: string) => void;
  children?: React.ReactNode;
}

const emptySubscribe = () => () => {};

export function BottomSheet({
  isOpen,
  onClose,
  title,
  description,
  options,
  selectedId,
  onSelect,
  children,
}: BottomSheetProps) {
  // SSR hydration safety for portal
  const isClient = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  const [isVisible, setIsVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [dragY, setDragY] = useState(0);

  const sheetRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const touchStartY = useRef<number>(0);
  const isDraggingRef = useRef<boolean>(false);
  const isClosingRef = useRef<boolean>(false);
  const previousActiveElement = useRef<HTMLElement | null>(null);

  // Trigger smooth closing animation
  const handleDismiss = useCallback(() => {
    if (isClosingRef.current) return;
    isClosingRef.current = true;
    setIsClosing(true);
    setIsVisible(false);

    const timer = setTimeout(() => {
      setIsClosing(false);
      setDragY(0);
      isDraggingRef.current = false;
      isClosingRef.current = false;
      onClose();
    }, 280);

    return () => clearTimeout(timer);
  }, [onClose]);

  // When isOpen changes, trigger transitions in requestAnimationFrame
  useEffect(() => {
    if (isOpen) {
      previousActiveElement.current = document.activeElement as HTMLElement | null;

      const rafId = requestAnimationFrame(() => {
        setIsVisible(true);
      });

      return () => cancelAnimationFrame(rafId);
    } else {
      const rafId = requestAnimationFrame(() => {
        setIsVisible(false);
      });

      return () => cancelAnimationFrame(rafId);
    }
  }, [isOpen]);

  // Handle body scroll lock
  useEffect(() => {
    if (!isOpen || isClosing) {
      document.body.style.overflow = "";
      return;
    }

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen, isClosing]);

  // Focus restoration & Escape key handling
  useEffect(() => {
    if (!isOpen && !isClosing) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        handleDismiss();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      previousActiveElement.current?.focus?.();
    };
  }, [isOpen, isClosing, handleDismiss]);

  // Touch handlers: only drag when user actually drags down (deltaY > 10)
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer && scrollContainer.scrollTop > 0) {
      touchStartY.current = 0;
      return;
    }

    touchStartY.current = e.touches[0].clientY;
    isDraggingRef.current = false;
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (touchStartY.current === 0) return;

    const currentY = e.touches[0].clientY;
    const deltaY = currentY - touchStartY.current;

    // Only engage drag if downward movement exceeds 10px
    if (deltaY > 10) {
      isDraggingRef.current = true;
      setDragY(deltaY);
    } else if (isDraggingRef.current && deltaY <= 0) {
      setDragY(0);
    }
  };

  const handleTouchEnd = () => {
    if (isDraggingRef.current) {
      if (dragY > 80) {
        handleDismiss();
      } else {
        setDragY(0);
      }
      isDraggingRef.current = false;
    }
    touchStartY.current = 0;
  };

  // Pointer drag handlers on grab handle area
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    touchStartY.current = e.clientY;
    isDraggingRef.current = false;
    try {
      (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
    } catch {
      // Ignore
    }
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (touchStartY.current === 0) return;

    const deltaY = e.clientY - touchStartY.current;
    if (deltaY > 8) {
      isDraggingRef.current = true;
      setDragY(deltaY);
    }
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    try {
      (e.target as HTMLElement).releasePointerCapture?.(e.pointerId);
    } catch {
      // Ignore
    }

    if (isDraggingRef.current) {
      if (dragY > 80) {
        handleDismiss();
      } else {
        setDragY(0);
      }
      isDraggingRef.current = false;
    }
    touchStartY.current = 0;
  };

  const handleOptionClick = (e: React.MouseEvent, optionId: string) => {
    // Prevent event from bubbling to backdrop or container
    e.stopPropagation();
    e.preventDefault();

    // 1. Immediately update parent selection state
    onSelect?.(optionId);

    // 2. Initiate sheet dismissal
    handleDismiss();
  };

  if (!isClient || (!isOpen && !isClosing)) return null;

  const content = (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="bottom-sheet-title"
      className="fixed inset-0 z-50 flex flex-col justify-end"
    >
      {/* Backdrop Overlay */}
      <div
        onClick={handleDismiss}
        aria-hidden="true"
        className={cn(
          "fixed inset-0 bg-black/60 backdrop-blur-xs cursor-pointer transition-opacity",
          isVisible && !isClosing
            ? "opacity-100 duration-300 ease-out"
            : "opacity-0 duration-250 ease-in"
        )}
      />

      {/* Bottom Sheet Modal Container */}
      <div
        ref={sheetRef}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onTouchCancel={handleTouchEnd}
        style={{
          transform:
            dragY > 0
              ? `translateY(${dragY}px)`
              : isVisible && !isClosing
              ? "translateY(0)"
              : "translateY(100%)",
          transition:
            dragY > 0
              ? "none"
              : isClosing
              ? "transform 250ms cubic-bezier(0.32, 0, 0.67, 0)"
              : "transform 300ms cubic-bezier(0.16, 1, 0.3, 1)",
        }}
        className={cn(
          "relative z-50 w-full max-h-[85vh] flex flex-col",
          "rounded-t-3xl bg-[var(--bg-surface)] border-t border-x border-[var(--border-subtle)]",
          "shadow-[0_-10px_30px_rgba(0,0,0,0.35)] outline-none overflow-hidden"
        )}
      >
        {/* Grab Handle Header */}
        <div
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          className="pt-3 pb-2 cursor-grab active:cursor-grabbing flex flex-col items-center shrink-0 select-none touch-none"
        >
          <div className="w-10 h-1.5 rounded-full bg-[var(--border-strong)] transition-colors hover:bg-[var(--accent-lime)]" />
        </div>

        {/* Title & Close Header Bar */}
        <div className="px-5 py-3 flex items-center justify-between border-b border-[var(--border-subtle)] shrink-0">
          <div>
            <h2
              id="bottom-sheet-title"
              className="text-base font-bold text-[var(--text-primary)] tracking-tight"
            >
              {title}
            </h2>
            {description && (
              <p className="text-xs text-[var(--text-tertiary)] mt-0.5">
                {description}
              </p>
            )}
          </div>

          <button
            type="button"
            onClick={handleDismiss}
            className="w-9 h-9 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-full text-[var(--text-tertiary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface-elevated)] transition-colors cursor-pointer"
            aria-label="Close bottom sheet"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Options Body */}
        <div
          ref={scrollContainerRef}
          className="overflow-y-auto px-4 py-4 space-y-2 no-scrollbar max-h-[calc(85vh-90px)]"
        >
          {options ? (
            options.map((option) => {
              const isSelected = selectedId === option.id;
              return (
                <button
                  key={option.id}
                  type="button"
                  onClick={(e) => handleOptionClick(e, option.id)}
                  className={cn(
                    "w-full min-h-[48px] px-4 py-3 rounded-xl flex items-center justify-between text-left transition-all cursor-pointer border",
                    isSelected
                      ? "bg-[var(--accent-lime-muted)] text-[var(--text-primary)] border-[var(--accent-lime)] shadow-[0_0_12px_rgba(163,230,53,0.15)]"
                      : "bg-[var(--bg-surface-elevated)]/60 text-[var(--text-secondary)] border-[var(--border-subtle)] hover:text-[var(--text-primary)] hover:border-[var(--border-strong)] hover:bg-[var(--bg-surface-elevated)]"
                  )}
                >
                  <div className="flex items-center gap-2.5 min-w-0 pr-2">
                    <span
                      className={cn(
                        "text-xs font-mono tracking-tight truncate",
                        isSelected ? "font-bold text-[var(--text-primary)]" : "font-medium"
                      )}
                    >
                      {option.label}
                    </span>
                    {option.badge && (
                      <span className="text-[10px] font-mono px-1.5 py-0.2 rounded-full bg-[var(--bg-surface-subtle)] text-[var(--text-tertiary)] shrink-0">
                        {option.badge}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    {typeof option.count === "number" && (
                      <span
                        className={cn(
                          "text-[11px] font-mono px-2 py-0.5 rounded-full",
                          isSelected
                            ? "bg-[var(--accent-lime)] text-[var(--accent-lime-fg)] font-bold"
                            : "bg-[var(--bg-surface-subtle)] text-[var(--text-tertiary)]"
                        )}
                      >
                        {option.count}
                      </span>
                    )}
                    {isSelected && (
                      <Check className="w-4 h-4 text-[var(--accent-lime)] stroke-[2.5]" />
                    )}
                  </div>
                </button>
              );
            })
          ) : (
            children
          )}
        </div>
      </div>
    </div>
  );

  return createPortal(content, document.body);
}

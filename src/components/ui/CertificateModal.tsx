"use client";

import React, { useEffect, useRef, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { X, ExternalLink, Download, FileText, ShieldCheck } from "lucide-react";

export interface CertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle: string;
  fileUrl: string;
  downloadName?: string;
}

const emptySubscribe = () => () => {};

export function CertificateModal({
  isOpen,
  onClose,
  title,
  subtitle,
  fileUrl,
  downloadName = "Chiranjeev-Rastogi-Digixito-Internship-Certificate.pdf",
}: CertificateModalProps) {
  const isClient = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);

  // Focus trap & restoration
  useEffect(() => {
    if (!isOpen) return;

    previousActiveElement.current = document.activeElement as HTMLElement | null;
    closeButtonRef.current?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }

      // Tab trap inside modal
      if (e.key === "Tab" && modalRef.current) {
        const focusableElements = modalRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusableElements.length === 0) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      previousActiveElement.current?.focus?.();
    };
  }, [isOpen, onClose]);

  // Body scroll lock
  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen]);

  if (!isClient || !isOpen) return null;

  const content = (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="certificate-modal-title"
      aria-describedby="certificate-modal-subtitle"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6"
    >
      {/* Backdrop */}
      <div
        onClick={onClose}
        aria-hidden="true"
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity animate-in fade-in duration-200 cursor-pointer"
      />

      {/* Modal Card */}
      <div
        ref={modalRef}
        onClick={(e) => e.stopPropagation()}
        className="relative z-10 w-full max-w-lg sm:max-w-3xl lg:max-w-4xl h-[92vh] sm:h-[86vh] max-h-[900px] flex flex-col rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200"
      >
        {/* Header */}
        <div className="flex items-center justify-between gap-3 px-5 sm:px-6 py-4 border-b border-[var(--border-subtle)] bg-[var(--bg-surface)] shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-9 h-9 rounded-xl bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] flex items-center justify-center text-[var(--accent-lime)] shrink-0">
              <FileText className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <h3
                id="certificate-modal-title"
                className="text-sm sm:text-base font-bold text-[var(--text-primary)] truncate leading-tight"
              >
                {title}
              </h3>
              <p
                id="certificate-modal-subtitle"
                className="font-mono text-xs text-[var(--accent-lime)] truncate mt-0.5"
              >
                {subtitle}
              </p>
            </div>
          </div>

          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label="Close certificate modal"
            className="p-2 rounded-xl text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface-elevated)] border border-transparent hover:border-[var(--border-subtle)] transition-colors cursor-pointer shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-lime)]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* PDF Preview Area */}
        <div className="flex-1 min-h-0 bg-[var(--bg-canvas)] p-2 sm:p-4 flex flex-col">
          <div className="w-full flex-1 min-h-0 rounded-xl overflow-hidden border border-[var(--border-subtle)] bg-[#1e1e24] shadow-inner relative flex flex-col">
            <iframe
              src={`${fileUrl}#toolbar=0&navpanes=0`}
              title={title}
              className="w-full flex-1 border-0 bg-white"
            />
          </div>

          <p className="text-[11px] font-mono text-[var(--text-tertiary)] mt-2 text-center shrink-0">
            Official document preview. For full-resolution multi-page view, tap &ldquo;View Full&rdquo;.
          </p>
        </div>

        {/* Footer Actions */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 px-5 sm:px-6 py-3.5 border-t border-[var(--border-subtle)] bg-[var(--bg-surface)] shrink-0">
          <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-[var(--accent-lime)]">
            <ShieldCheck className="w-4 h-4 text-[var(--accent-lime)] shrink-0" />
            <span>Verified 6-Month Internship Credential</span>
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <a
              href={fileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-mono font-medium bg-[var(--bg-surface-elevated)] hover:bg-[var(--accent-lime-muted)] text-[var(--text-primary)] hover:text-[var(--accent-lime)] border border-[var(--border-subtle)] hover:border-[var(--accent-lime)]/40 transition-all cursor-pointer min-h-[42px] flex-1 sm:flex-initial"
              aria-label="Open complete certificate PDF in new tab"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>View Full</span>
            </a>

            <a
              href={fileUrl}
              download={downloadName}
              className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-mono font-semibold bg-[var(--accent-lime)] text-[var(--accent-lime-fg)] hover:opacity-90 shadow-xs transition-all cursor-pointer min-h-[42px] flex-1 sm:flex-initial"
              aria-label="Download official certificate PDF"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download PDF</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );

  return createPortal(content, document.body);
}

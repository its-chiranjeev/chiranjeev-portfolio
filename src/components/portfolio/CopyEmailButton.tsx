"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";

interface CopyEmailButtonProps {
  email: string;
  className?: string;
}

export function CopyEmailButton({ email, className }: CopyEmailButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    let success = false;
    try {
      if (typeof navigator !== "undefined" && navigator.clipboard) {
        await navigator.clipboard.writeText(email);
        success = true;
      }
    } catch {
      // Fallback if clipboard API is restricted or not permitted
    }

    if (!success && typeof document !== "undefined") {
      try {
        const textArea = document.createElement("textarea");
        textArea.value = email;
        textArea.style.position = "fixed";
        textArea.style.left = "-999999px";
        textArea.style.top = "-999999px";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        success = document.execCommand("copy");
        document.body.removeChild(textArea);
      } catch {
        success = false;
      }
    }

    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className={
        className ??
        `relative inline-flex items-center justify-center w-9 h-9 sm:w-8 sm:h-8 rounded-lg border transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)] after:absolute after:-inset-1 sm:after:hidden after:content-[''] ${
          copied
            ? "border-[var(--accent-lime)]/40 bg-[var(--accent-lime-muted)] text-[var(--accent-lime)]"
            : "border-[var(--btn-tertiary-border)] bg-[var(--btn-tertiary-bg)] hover:bg-[var(--btn-tertiary-hover-bg)] hover:border-[var(--border-strong)] text-[var(--btn-tertiary-fg)] hover:text-[var(--btn-tertiary-hover-fg)]"
        }`
      }
      aria-label={copied ? "Email address copied to clipboard" : "Copy email address"}
      title={copied ? "Copied!" : "Copy email address"}
    >
      <span className="sr-only" aria-live="polite">
        {copied ? "Email address copied to clipboard" : ""}
      </span>
      {copied ? (
        <Check className="w-3.5 h-3.5 text-[var(--accent-lime)]" aria-hidden="true" />
      ) : (
        <Copy className="w-3.5 h-3.5" aria-hidden="true" />
      )}
    </button>
  );
}

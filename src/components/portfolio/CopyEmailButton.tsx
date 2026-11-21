"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";

export function CopyEmailButton({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback if clipboard API is restricted
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface-elevated)] hover:border-[var(--border-strong)] text-xs font-mono text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-all cursor-pointer"
      aria-label={copied ? "Email address copied to clipboard" : "Copy email address to clipboard"}
    >
      <span className="sr-only" aria-live="polite">
        {copied ? "Email address copied to clipboard" : ""}
      </span>
      {copied ? (
        <>
          <Check className="w-3.5 h-3.5 text-[var(--accent-lime)]" aria-hidden="true" />
          <span className="text-[var(--accent-lime)] font-medium">Copied to Clipboard!</span>
        </>
      ) : (
        <>
          <Copy className="w-3.5 h-3.5" aria-hidden="true" />
          <span>Copy Address</span>
        </>
      )}
    </button>
  );
}

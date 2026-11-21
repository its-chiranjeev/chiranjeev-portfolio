import Link from "next/link";
import { ArrowLeft, Terminal } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-[var(--bg-canvas)] text-[var(--text-primary)]">
      <div className="max-w-md w-full border border-[var(--border-subtle)] rounded-xl p-8 bg-[var(--bg-surface)] shadow-2xl">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2.5 rounded-lg bg-[var(--accent-lime-muted)] border border-[var(--accent-lime)] text-[var(--accent-lime)]">
            <Terminal className="w-6 h-6" />
          </div>
          <div>
            <span className="font-mono text-xs uppercase tracking-wider text-[var(--accent-lime)] font-semibold">
              HTTP 404 Error
            </span>
            <h1 className="text-xl font-bold tracking-tight">Resource Not Found</h1>
          </div>
        </div>

        <p className="text-[var(--text-secondary)] text-sm mb-6 leading-relaxed">
          The requested route, case study, or resource does not exist or has been relocated.
        </p>

        <div className="pt-4 border-t border-[var(--border-subtle)] flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-mono font-medium text-[var(--accent-lime)] hover:underline"
          >
            <ArrowLeft className="w-4 h-4" /> Return to Welcome
          </Link>
          <Link
            href="/portfolio"
            className="text-xs font-mono text-[var(--text-tertiary)] hover:text-[var(--text-primary)] transition-colors"
          >
            Explore Portfolio &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}

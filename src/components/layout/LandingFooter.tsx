import Link from "next/link";

export function LandingFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-[var(--border-subtle)] bg-[var(--bg-canvas)] py-8 text-xs font-mono text-[var(--text-tertiary)]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span>&copy; {currentYear} Chiranjeev Rastogi.</span>
          <span>&bull;</span>
          <span>Ghaziabad, India</span>
        </div>

        <div className="flex items-center gap-6 text-[var(--text-secondary)]">
          <Link
            href="/portfolio"
            className="hover:text-[var(--accent-lime)] transition-colors"
          >
            Full Portfolio
          </Link>
          <a
            href="mailto:chiranjeevrastogi@gmail.com"
            className="hover:text-[var(--accent-lime)] transition-colors"
          >
            Direct Contact
          </a>
        </div>
      </div>
    </footer>
  );
}

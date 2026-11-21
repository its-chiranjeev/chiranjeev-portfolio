import { CodeExampleSection as CodeExampleSectionType } from "@/types/project";
import { FileCode, Terminal } from "lucide-react";

interface CodeExampleSectionProps {
  section: CodeExampleSectionType;
}

export function CodeExampleSection({ section }: CodeExampleSectionProps) {
  return (
    <section id={section.id} className="py-12 border-b border-[var(--border-subtle)]">
      {/* Section Header */}
      <div className="flex items-center gap-3 mb-6">
        <span className="font-mono text-sm font-bold text-[var(--accent-lime)]">
          {section.sectionNumber} {"//"}
        </span>
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[var(--text-primary)]">
          {section.title}
        </h2>
      </div>

      <div className="rounded-xl border border-[var(--border-strong)] bg-[#0d0e11] overflow-hidden shadow-2xl">
        {/* Code Header Bar */}
        <div className="flex items-center justify-between px-4 py-2.5 bg-[#14161b] border-b border-[var(--border-subtle)]">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 mr-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500/70 inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/70 inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-green-500/70 inline-block" />
            </div>
            <FileCode className="w-3.5 h-3.5 text-[var(--accent-lime)]" />
            <span className="font-mono text-xs text-zinc-300 font-medium">
              {section.filename}
            </span>
          </div>

          <span className="font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 rounded bg-zinc-800 text-zinc-400 border border-zinc-700">
            {section.language}
          </span>
        </div>

        {/* Code Body */}
        <div className="p-4 sm:p-6 overflow-x-auto">
          <pre className="font-mono text-xs sm:text-sm text-zinc-200 leading-relaxed">
            <code>{section.code}</code>
          </pre>
        </div>

        {/* Explanation Footer */}
        {section.explanation && (
          <div className="px-4 py-3 bg-[#111317] border-t border-[var(--border-subtle)] flex items-start gap-2.5 text-xs text-zinc-400">
            <Terminal className="w-4 h-4 text-[var(--accent-lime)] shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              <strong className="text-zinc-200 font-mono">Design Note: </strong>
              {section.explanation}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

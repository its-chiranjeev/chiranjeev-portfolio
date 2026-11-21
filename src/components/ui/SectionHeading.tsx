import { Badge } from "./Badge";
import { cn } from "@/lib/utils";
import React from "react";

interface SectionHeadingProps {
  badge?: string;
  number?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeading({
  badge,
  number,
  title,
  description,
  align = "left",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "mb-10",
        align === "center" ? "text-center max-w-2xl mx-auto" : "max-w-3xl",
        className
      )}
    >
      <div
        className={cn(
          "flex items-center gap-2 mb-3",
          align === "center" ? "justify-center" : "justify-start"
        )}
      >
        {number && (
          <span className="font-mono text-xs font-semibold text-[var(--accent-lime)]">
            /{number}
          </span>
        )}
        {badge && <Badge variant="lime">{badge}</Badge>}
      </div>

      <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--text-primary)]">
        {title}
      </h2>

      {description && (
        <p className="mt-3 text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}

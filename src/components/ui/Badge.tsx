import { cn } from "@/lib/utils";
import React from "react";

export type BadgeVariant = "default" | "lime" | "outline" | "subtle";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

export function Badge({
  children,
  variant = "default",
  className,
  ...props
}: BadgeProps) {
  const variantStyles: Record<BadgeVariant, string> = {
    default:
      "bg-[var(--bg-surface-subtle)] text-[var(--text-secondary)] border border-[var(--border-subtle)]",
    lime:
      "bg-[var(--accent-lime-muted)] text-[var(--accent-lime)] border border-[var(--accent-lime)]/30 font-medium",
    outline:
      "bg-transparent text-[var(--text-primary)] border border-[var(--border-strong)]",
    subtle:
      "bg-[var(--bg-surface-elevated)] text-[var(--text-tertiary)] border border-[var(--border-subtle)]/50",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-1 rounded-md text-xs font-mono tracking-tight transition-colors",
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}

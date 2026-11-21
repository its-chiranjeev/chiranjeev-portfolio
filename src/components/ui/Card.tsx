import { cn } from "@/lib/utils";
import React from "react";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  elevated?: boolean;
}

export function Card({
  children,
  className,
  elevated = false,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        "rounded-xl border border-[var(--border-subtle)] p-6 transition-all duration-200",
        elevated
          ? "bg-[var(--bg-surface-elevated)] shadow-lg"
          : "bg-[var(--bg-surface)] hover:border-[var(--border-strong)]",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

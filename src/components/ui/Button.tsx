import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";

export type ButtonVariant = "primary" | "secondary" | "outline" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";

interface BaseButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children: React.ReactNode;
}

type ButtonAsButton = BaseButtonProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined;
  };

type ButtonAsLink = BaseButtonProps & {
  href: string;
  target?: string;
  rel?: string;
  download?: boolean | string;
};

export type ButtonProps = ButtonAsButton | ButtonAsLink;

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: ButtonProps) {
  const variantStyles: Record<ButtonVariant, string> = {
    primary:
      "bg-[var(--accent-lime)] text-black hover:bg-[var(--accent-lime-hover)] font-semibold shadow-sm",
    secondary:
      "bg-[var(--bg-surface-elevated)] text-[var(--text-primary)] hover:bg-[var(--bg-surface-subtle)] border border-[var(--border-subtle)] hover:border-[var(--border-strong)]",
    outline:
      "bg-transparent text-[var(--text-primary)] border border-[var(--border-strong)] hover:border-[var(--accent-lime)] hover:text-[var(--accent-lime)]",
    ghost:
      "bg-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface-elevated)]",
  };

  const sizeStyles: Record<ButtonSize, string> = {
    sm: "px-3 py-1.5 text-xs rounded-md",
    md: "px-4 py-2 text-sm rounded-lg",
    lg: "px-6 py-3 text-base rounded-lg font-medium",
  };

  const combinedClassName = cn(
    "inline-flex items-center justify-center gap-2 transition-all duration-150 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed select-none",
    variantStyles[variant],
    sizeStyles[size],
    className
  );

  if ("href" in props && typeof props.href === "string") {
    const { href, target, rel, download } = props;
    const isExternal = href.startsWith("http") || href.startsWith("mailto:");

    return (
      <Link
        href={href}
        target={target || (isExternal && !href.startsWith("mailto:") ? "_blank" : undefined)}
        rel={rel || (isExternal ? "noopener noreferrer" : undefined)}
        download={download}
        className={combinedClassName}
      >
        {children}
      </Link>
    );
  }

  const buttonProps = props as React.ButtonHTMLAttributes<HTMLButtonElement>;

  return (
    <button className={combinedClassName} {...buttonProps}>
      {children}
    </button>
  );
}

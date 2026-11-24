import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "tertiary"
  | "outline"
  | "ghost";

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
      "bg-[var(--btn-primary-bg)] text-[var(--btn-primary-fg)] hover:bg-[var(--btn-primary-hover)] active:scale-[0.98] font-semibold shadow-xs focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)]",
    secondary:
      "bg-[var(--btn-secondary-bg)] text-[var(--btn-secondary-fg)] border border-[var(--btn-secondary-border)] hover:bg-[var(--btn-secondary-hover-bg)] hover:border-[var(--btn-secondary-hover-border)] active:scale-[0.98] font-medium shadow-2xs focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)]",
    tertiary:
      "bg-[var(--btn-tertiary-bg)] text-[var(--btn-tertiary-fg)] border border-[var(--btn-tertiary-border)] hover:bg-[var(--btn-tertiary-hover-bg)] hover:text-[var(--btn-tertiary-hover-fg)] active:scale-[0.98] font-medium focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)]",
    outline:
      "bg-[var(--btn-secondary-bg)] text-[var(--btn-secondary-fg)] border border-[var(--btn-secondary-border)] hover:bg-[var(--btn-secondary-hover-bg)] hover:border-[var(--btn-secondary-hover-border)] active:scale-[0.98] font-medium focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)]",
    ghost:
      "bg-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface-elevated)] active:scale-[0.98] font-medium",
  };

  const sizeStyles: Record<ButtonSize, string> = {
    sm: "px-3 py-1.5 text-xs rounded-lg min-h-[34px]",
    md: "px-4 py-2 text-sm rounded-lg min-h-[40px]",
    lg: "px-6 py-3 text-base rounded-lg font-medium min-h-[48px]",
  };

  const combinedClassName = cn(
    "inline-flex items-center justify-center gap-2 transition-all duration-150 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed select-none focus-visible:outline-none",
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

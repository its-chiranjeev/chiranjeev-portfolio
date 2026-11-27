import { cn } from "@/lib/utils";
import React from "react";

export type ContainerSize = "wide" | "default" | "narrow" | "full";

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  size?: ContainerSize;
}

const CONTAINER_SIZES: Record<ContainerSize, string> = {
  wide: "max-w-6xl min-[1280px]:max-w-[1280px] min-[1600px]:max-w-[1400px] min-[1920px]:max-w-[1520px]",
  default: "max-w-6xl",
  narrow: "max-w-5xl",
  full: "w-full",
};

export function Container({
  children,
  className,
  size = "default",
  ...props
}: ContainerProps) {
  return (
    <div
      className={cn(CONTAINER_SIZES[size], "mx-auto px-4 sm:px-6 lg:px-8", className)}
      {...props}
    >
      {children}
    </div>
  );
}

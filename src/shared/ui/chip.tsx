import type { ComponentProps } from "react";

import { cn } from "@/shared/lib/cn";

const toneClass = {
  neutral: "text-secondary",
  brand: "text-blue-700",
  success: "text-green-700",
  warning: "bg-warning-subtle px-3 text-yellow-700",
  error: "bg-error-subtle px-3 text-red-700",
  dark: "bg-inverse px-3 text-on-brand",
} as const;

const dotClass: Partial<Record<keyof typeof toneClass, string>> = {
  brand: "bg-blue-700",
  success: "bg-green-700",
};

export type ChipTone = keyof typeof toneClass;

export interface ChipProps extends ComponentProps<"span"> {
  tone?: ChipTone;
}

export function Chip({ tone = "neutral", className, children, ...props }: ChipProps) {
  const dot = dotClass[tone];

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-xs py-1 text-label-sm whitespace-nowrap",
        toneClass[tone],
        className,
      )}
      {...props}
    >
      {dot && <span className={cn("size-1.5 shrink-0 rounded-full", dot)} />}
      {children}
    </span>
  );
}

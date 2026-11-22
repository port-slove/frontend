import type { ComponentProps } from "react";

import { cn } from "@/shared/lib/cn";

// Figma 에는 success 만 정의되어 있고, 나머지는 같은 규칙(state/* + *-subtle)으로 확장한 값입니다.
const toneClass = {
  success: "bg-success-subtle text-success",
  error: "bg-error-subtle text-error",
  warning: "bg-warning-subtle text-yellow-700",
  brand: "bg-brand-subtle text-brand",
} as const;

export type BadgeTone = keyof typeof toneClass;

export interface BadgeProps extends ComponentProps<"span"> {
  tone?: BadgeTone;
}

export function Badge({ tone = "success", className, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-sm px-2.5 py-1 text-label-sm",
        toneClass[tone],
        className,
      )}
      {...props}
    />
  );
}

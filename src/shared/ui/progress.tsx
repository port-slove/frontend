import type { ComponentProps } from "react";

import { cn } from "@/shared/lib/cn";

const fillClass = {
  brand: "bg-brand",
  success: "bg-success",
  warning: "bg-warning",
  error: "bg-error",
} as const;

export type ProgressTone = keyof typeof fillClass;

export interface ProgressProps extends ComponentProps<"div"> {
  tone?: ProgressTone;
  value: number;
}

export function Progress({ tone = "brand", value, className, ...props }: ProgressProps) {
  const percent = Math.min(100, Math.max(0, value));

  return (
    <div
      role="progressbar"
      aria-valuenow={percent}
      aria-valuemin={0}
      aria-valuemax={100}
      className={cn("h-1.5 w-full rounded-xs bg-black/[0.08]", className)}
      {...props}
    >
      <div className={cn("h-1.5 rounded-xs", fillClass[tone])} style={{ width: `${percent}%` }} />
    </div>
  );
}

import type { ComponentProps } from "react";

import { cn } from "@/shared/lib/cn";

export interface TooltipRowProps extends ComponentProps<"div"> {
  label: string;
  value: string;
}

export function TooltipRow({ label, value, className, ...props }: TooltipRowProps) {
  return (
    <div
      className={cn("flex h-5 items-center justify-between gap-4 whitespace-nowrap", className)}
      {...props}
    >
      <p className="text-caption-md text-secondary">{label}</p>
      <p className="text-label-sm text-primary">{value}</p>
    </div>
  );
}

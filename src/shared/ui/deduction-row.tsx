import type { ComponentProps } from "react";

import { cn } from "@/shared/lib/cn";
import { Chip } from "./chip";

export interface DeductionRowProps extends ComponentProps<"div"> {
  reason: string;
  detail: string;
  points: string;
}

export function DeductionRow({ reason, detail, points, className, ...props }: DeductionRowProps) {
  return (
    <div className={cn("flex h-15 items-center gap-3 py-3", className)} {...props}>
      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
        <p className="text-label-md whitespace-nowrap text-primary">{reason}</p>
        <p className="text-caption-md whitespace-nowrap text-secondary">{detail}</p>
      </div>
      <Chip tone="error" className="shrink-0">
        {points}
      </Chip>
    </div>
  );
}

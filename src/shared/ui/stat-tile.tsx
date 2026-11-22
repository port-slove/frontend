import type { ComponentProps } from "react";

import { cn } from "@/shared/lib/cn";
import { Progress, type ProgressTone } from "./progress";

export interface StatTileProps extends ComponentProps<"div"> {
  tone?: ProgressTone;
  label: string;
  value: string;
  unit?: string;
  progress: number;
}

export function StatTile({
  tone = "brand",
  label,
  value,
  unit,
  progress,
  className,
  ...props
}: StatTileProps) {
  return (
    <div className={cn("flex flex-col gap-2 rounded-2xl bg-page p-4", className)} {...props}>
      <p className="text-caption-md whitespace-nowrap text-secondary">{label}</p>
      <div className="flex items-baseline gap-1 whitespace-nowrap">
        <p className="text-h1 text-primary">{value}</p>
        {unit && <p className="text-body-sm text-secondary">{unit}</p>}
      </div>
      <Progress tone={tone} value={progress} />
    </div>
  );
}

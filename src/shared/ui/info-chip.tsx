import type { ComponentProps } from "react";

import { cn } from "@/shared/lib/cn";

export interface InfoChipProps extends ComponentProps<"span"> {
  label: string;
  value: string;
}

export function InfoChip({ label, value, className, ...props }: InfoChipProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-xs bg-page px-3 py-1.5 whitespace-nowrap",
        className,
      )}
      {...props}
    >
      <span className="text-caption-md text-tertiary">{label}</span>
      <span className="text-label-sm text-primary">{value}</span>
    </span>
  );
}

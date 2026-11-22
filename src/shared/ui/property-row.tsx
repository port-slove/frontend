import type { ComponentProps } from "react";

import { cn } from "@/shared/lib/cn";

export interface PropertyRowProps extends ComponentProps<"div"> {
  label: string;
  value: string;
}

export function PropertyRow({ label, value, className, ...props }: PropertyRowProps) {
  return (
    <div className={cn("flex h-6 items-center gap-2 whitespace-nowrap", className)} {...props}>
      <p className="text-body-sm text-secondary">{label}</p>
      <p className="text-label-md text-primary">{value}</p>
    </div>
  );
}

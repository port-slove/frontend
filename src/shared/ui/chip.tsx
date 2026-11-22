import type { ComponentProps } from "react";

import { cn } from "@/shared/lib/cn";

export function Chip({ className, ...props }: ComponentProps<"span">) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full bg-brand-subtle px-4 py-2 text-label-md text-brand",
        className,
      )}
      {...props}
    />
  );
}

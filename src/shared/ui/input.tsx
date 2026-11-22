import type { ComponentProps } from "react";

import { cn } from "@/shared/lib/cn";

export interface InputProps extends ComponentProps<"input"> {
  invalid?: boolean;
}

export function Input({ invalid = false, className, ...props }: InputProps) {
  return (
    <input
      aria-invalid={invalid || undefined}
      className={cn(
        "h-13 w-full rounded-lg border border-default bg-surface px-4 text-body-md text-primary transition-colors",
        "placeholder:text-tertiary",
        "focus:border-brand focus:outline-none",
        "aria-invalid:border-error",
        "disabled:bg-disabled disabled:text-disabled",
        className,
      )}
      {...props}
    />
  );
}

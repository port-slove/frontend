import type { ComponentProps } from "react";

import { cn } from "@/shared/lib/cn";

const fieldClass =
  "w-full rounded-lg border border-default bg-surface px-3.5 py-3 text-body-sm text-primary placeholder:text-tertiary transition-colors focus:border-brand focus:outline-none disabled:bg-disabled disabled:text-disabled";

export type TextFieldProps =
  | ({ multiline?: false } & ComponentProps<"input">)
  | ({ multiline: true } & ComponentProps<"textarea">);

export function TextField({ multiline, className, ...props }: TextFieldProps) {
  if (multiline) {
    return (
      <textarea
        className={cn(fieldClass, "h-35 resize-none", className)}
        {...(props as ComponentProps<"textarea">)}
      />
    );
  }

  return (
    <input className={cn(fieldClass, "h-11", className)} {...(props as ComponentProps<"input">)} />
  );
}

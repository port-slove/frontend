import type { ComponentProps } from "react";

import { cn } from "@/shared/lib/cn";

export interface SelectFieldProps extends ComponentProps<"button"> {
  value: string;
  count?: string;
}

export function SelectField({ value, count, className, ...props }: SelectFieldProps) {
  return (
    <button
      type="button"
      className={cn(
        "inline-flex h-11 w-full items-center gap-2 rounded-lg border border-default bg-surface px-3.5 py-2.5",
        className,
      )}
      {...props}
    >
      <span className="text-body-sm text-primary">{value}</span>
      <span className="flex-1" />
      {count && (
        <span className="rounded-xs bg-brand-subtle px-2 py-0.5 text-label-sm text-brand">
          {count}
        </span>
      )}
      <svg viewBox="0 0 16 16" fill="none" className="size-4 shrink-0 text-tertiary">
        <path
          d="M4 6l4 4 4-4"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}

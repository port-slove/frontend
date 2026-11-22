"use client";

import type { ComponentProps } from "react";

import { cn } from "@/shared/lib/cn";

export interface FilterChipProps extends Omit<ComponentProps<"div">, "children"> {
  field: string;
  value: string;
  onRemove?: () => void;
}

export function FilterChip({ field, value, onRemove, className, ...props }: FilterChipProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 rounded-md border border-dashed border-gray-300 bg-surface py-1.5 pr-2 pl-3.5",
        className,
      )}
      {...props}
    >
      <span className="text-caption-md whitespace-nowrap text-tertiary">{field}</span>
      <span className="text-label-sm whitespace-nowrap text-primary">{value}</span>
      <button
        type="button"
        aria-label={`${field} 필터 제거`}
        onClick={onRemove}
        className="flex size-5 shrink-0 items-center justify-center rounded-full bg-surface-muted text-primary"
      >
        <svg viewBox="0 0 14 14" fill="none" className="size-3">
          <path
            d="M1 1l12 12M13 1 1 13"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </button>
    </div>
  );
}

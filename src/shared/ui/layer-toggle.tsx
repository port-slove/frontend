"use client";

import type { ComponentProps } from "react";

import { cn } from "@/shared/lib/cn";

export interface LayerToggleProps extends Omit<ComponentProps<"button">, "type"> {
  checked: boolean;
  onCheckedChange?: (checked: boolean) => void;
  label: string;
}

export function LayerToggle({
  checked,
  onCheckedChange,
  label,
  className,
  ...props
}: LayerToggleProps) {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={checked}
      onClick={() => onCheckedChange?.(!checked)}
      className={cn(
        "flex items-center gap-2 rounded-md py-2 pr-3.5 pl-2.5",
        checked ? "bg-brand-subtle" : "border border-default bg-surface",
        className,
      )}
      {...props}
    >
      <span
        className={cn(
          "flex size-5 shrink-0 items-center justify-center rounded-md",
          checked ? "bg-brand" : "border-[1.5px] border-gray-300 bg-surface",
        )}
      >
        {checked && (
          <svg viewBox="0 0 14 14" fill="none" className="size-3.5">
            <path
              d="M2.5 7.3 5.6 10.4 11.5 3.6"
              stroke="white"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </span>
      <span
        className={cn("text-label-sm whitespace-nowrap", checked ? "text-brand" : "text-secondary")}
      >
        {label}
      </span>
    </button>
  );
}

"use client";

import type { ComponentProps } from "react";

import { cn } from "@/shared/lib/cn";

export interface CheckboxProps extends Omit<ComponentProps<"button">, "type"> {
  checked: boolean;
  onCheckedChange?: (checked: boolean) => void;
}

export function Checkbox({ checked, onCheckedChange, className, ...props }: CheckboxProps) {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={checked}
      onClick={() => onCheckedChange?.(!checked)}
      className={cn(
        "flex size-5 shrink-0 items-center justify-center rounded-md",
        checked ? "bg-brand" : "border-[1.5px] border-gray-300 bg-surface",
        className,
      )}
      {...props}
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
    </button>
  );
}

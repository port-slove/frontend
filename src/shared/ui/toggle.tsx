"use client";

import type { ComponentProps } from "react";

import { cn } from "@/shared/lib/cn";

export interface ToggleProps extends Omit<ComponentProps<"button">, "onChange" | "type"> {
  checked: boolean;
  onCheckedChange?: (checked: boolean) => void;
}

export function Toggle({ checked, onCheckedChange, disabled, className, ...props }: ToggleProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => onCheckedChange?.(!checked)}
      className={cn(
        "inline-flex h-6 w-10 shrink-0 items-center rounded-full p-[3px] transition-colors",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand",
        checked ? "justify-end bg-brand" : "justify-start bg-gray-300",
        disabled && "pointer-events-none opacity-50",
        className,
      )}
      {...props}
    >
      <span className="size-[18px] rounded-full bg-white" />
    </button>
  );
}

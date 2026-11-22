"use client";

import type { ComponentProps } from "react";

import { cn } from "@/shared/lib/cn";

export interface DateRangeProps extends Omit<ComponentProps<"div">, "children"> {
  range: string;
  onPrev?: () => void;
  onNext?: () => void;
}

export function DateRange({ range, onPrev, onNext, className, ...props }: DateRangeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-lg border border-default bg-surface text-primary",
        className,
      )}
      {...props}
    >
      <button type="button" aria-label="이전" onClick={onPrev} className="p-2.5">
        <svg viewBox="0 0 18 18" fill="none" className="size-[18px]">
          <path
            d="M11 4.5 7 9l4 4.5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      <div className="flex shrink-0 items-center gap-2 px-2 py-2.5">
        <svg viewBox="0 0 18 18" fill="none" className="size-[18px]">
          <rect
            x="2.5"
            y="3.5"
            width="13"
            height="12"
            rx="2"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <path d="M2.5 7.5h13" stroke="currentColor" strokeWidth="1.5" />
          <path d="M6 2v3M12 2v3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
        <span className="text-label-md whitespace-nowrap">{range}</span>
      </div>
      <button type="button" aria-label="다음" onClick={onNext} className="p-2.5">
        <svg viewBox="0 0 18 18" fill="none" className="size-[18px]">
          <path
            d="M7 4.5 11 9l-4 4.5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  );
}

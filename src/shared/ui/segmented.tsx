"use client";

import type { ComponentProps } from "react";

import { cn } from "@/shared/lib/cn";
import { Tab } from "./tab";

export interface SegmentedProps<T extends string> extends Omit<ComponentProps<"div">, "onChange"> {
  options: readonly T[];
  value: T;
  onValueChange?: (value: T) => void;
}

/** 탭 여러 개를 묶은 단일 선택 컨트롤 (Figma: Segmented) */
export function Segmented<T extends string>({
  options,
  value,
  onValueChange,
  className,
  ...props
}: SegmentedProps<T>) {
  return (
    <div
      role="radiogroup"
      className={cn("inline-flex items-center gap-1 rounded-md bg-surface p-1.5", className)}
      {...props}
    >
      {options.map((option) => (
        <Tab
          key={option}
          role="radio"
          aria-checked={option === value}
          active={option === value}
          onClick={() => onValueChange?.(option)}
        >
          {option}
        </Tab>
      ))}
    </div>
  );
}

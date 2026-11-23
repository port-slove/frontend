"use client";

import type { ComponentProps, ReactNode } from "react";

import { cn } from "@/shared/lib/cn";
import { Tab } from "./tab";

export interface SegmentedProps<T extends string> extends Omit<ComponentProps<"div">, "onChange"> {
  options: readonly T[];
  value: T;
  onValueChange?: (value: T) => void;
  /** 값과 다른 문구(예: 개수 포함)를 보여줄 때 사용합니다. */
  renderLabel?: (option: T) => ReactNode;
}

/** 탭 여러 개를 묶은 단일 선택 컨트롤 (Figma: Segmented) */
export function Segmented<T extends string>({
  options,
  value,
  onValueChange,
  renderLabel,
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
          {renderLabel ? renderLabel(option) : option}
        </Tab>
      ))}
    </div>
  );
}

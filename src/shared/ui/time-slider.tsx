"use client";

import type { ComponentProps, ReactNode } from "react";

import { cn } from "@/shared/lib/cn";
import { IconCircle } from "./icon-circle";

export interface TimeSliderProps extends ComponentProps<"div"> {
  progress: number;
  labels: string[];
  current: string;
  playIcon: ReactNode;
  onPlayClick?: () => void;
}

export function TimeSlider({
  progress,
  labels,
  current,
  playIcon,
  onPlayClick,
  className,
  ...props
}: TimeSliderProps) {
  const percent = Math.min(100, Math.max(0, progress));

  return (
    <div
      className={cn(
        "flex h-16 items-center gap-4 rounded-md border border-default bg-surface py-3 pr-4 pl-3",
        className,
      )}
      {...props}
    >
      <button type="button" aria-label="재생" onClick={onPlayClick}>
        <IconCircle tone="dark" icon={playIcon} />
      </button>
      <div className="flex min-w-0 flex-1 flex-col gap-1.5">
        <div className="h-1.5 w-full rounded-xs bg-black/[0.08]">
          <div className="h-1.5 rounded-xs bg-brand-sub" style={{ width: `${percent}%` }} />
        </div>
        <div className="flex w-full items-start justify-between text-caption-sm whitespace-nowrap text-tertiary">
          {labels.map((label) => (
            <span key={label}>{label}</span>
          ))}
        </div>
      </div>
      <p className="text-label-sm whitespace-nowrap text-brand">{current}</p>
    </div>
  );
}

import type { ComponentProps } from "react";

import { cn } from "@/shared/lib/cn";

const statusClass = {
  "하역 중": "bg-brand text-on-brand",
  "접안 예정": "bg-brand-sub text-brand",
  "대기 예상": "border border-dashed border-warning bg-warning-subtle text-warning",
  지연: "bg-error-subtle text-error",
  보류: "bg-disabled text-secondary",
} as const;

export type TimelineBarStatus = keyof typeof statusClass;

export interface TimelineBarProps extends ComponentProps<"div"> {
  status?: TimelineBarStatus;
  label: string;
  meta: string;
}

export function TimelineBar({
  status = "하역 중",
  label,
  meta,
  className,
  ...props
}: TimelineBarProps) {
  return (
    <div
      className={cn(
        "flex h-11 flex-col items-start justify-center overflow-hidden rounded-lg px-3 py-1.5",
        statusClass[status],
        className,
      )}
      {...props}
    >
      <p className="text-label-sm whitespace-nowrap">{label}</p>
      <p className="text-caption-sm whitespace-nowrap">{meta}</p>
    </div>
  );
}

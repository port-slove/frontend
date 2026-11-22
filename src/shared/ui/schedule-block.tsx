import type { ComponentProps } from "react";

import { cn } from "@/shared/lib/cn";

const statusClass = {
  "하역 중": "border border-blue-200 bg-blue-100",
  "접안 예정": "border border-default bg-surface",
  "대기 예상": "bg-warning-subtle",
  지연: "bg-error-subtle",
  보류: "bg-disabled",
  추천: "border-[1.5px] border-dashed border-brand bg-surface",
} as const;

const nameClass = {
  "하역 중": "text-primary",
  "접안 예정": "text-primary",
  "대기 예상": "text-primary",
  지연: "text-error",
  보류: "text-secondary",
  추천: "text-brand",
} as const;

export type ScheduleBlockStatus = keyof typeof statusClass;

export interface ScheduleBlockProps extends ComponentProps<"button"> {
  status?: ScheduleBlockStatus;
  time: string;
  name: string;
  meta?: string;
}

export function ScheduleBlock({
  status = "하역 중",
  time,
  name,
  meta,
  className,
  ...props
}: ScheduleBlockProps) {
  return (
    <button
      type="button"
      className={cn(
        "flex h-15 w-50 flex-col items-start justify-center gap-0.5 overflow-hidden rounded-lg py-2 pr-2.5 pl-3.5 text-left",
        statusClass[status],
        className,
      )}
      {...props}
    >
      <span className="text-caption-sm text-secondary">{time}</span>
      <span className={cn("text-label-sm", nameClass[status])}>{name}</span>
      {meta && <span className="text-caption-sm text-tertiary">{meta}</span>}
    </button>
  );
}

import type { ComponentProps, ReactNode } from "react";

import { cn } from "@/shared/lib/cn";

export interface KpiCardProps extends ComponentProps<"div"> {
  hero?: boolean;
  label: string;
  value: string;
  unit?: string;
  delta?: string;
  sub?: string;
  /** 라벨 오른쪽 아이콘 (예: 확인 필요 카드의 IconCircle) */
  icon?: ReactNode;
}

export function KpiCard({
  hero = false,
  label,
  value,
  unit,
  delta,
  sub,
  icon,
  className,
  ...props
}: KpiCardProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-start gap-3 rounded-2xl border p-4",
        hero ? "border-brand bg-brand text-on-brand" : "border-default bg-surface",
        className,
      )}
      {...props}
    >
      <div className="flex w-full items-center justify-between">
        <p className={cn("text-body-sm whitespace-nowrap", hero ? "opacity-85" : "text-secondary")}>
          {label}
        </p>
        {icon}
      </div>
      <div className="flex items-baseline gap-2 whitespace-nowrap">
        <p className={cn("text-display-md", !hero && "text-primary")}>{value}</p>
        {unit && <p className={cn("text-body-lg", !hero && "text-secondary")}>{unit}</p>}
        {delta && (
          <span
            className={cn(
              "rounded-xs px-2 py-0.5 text-label-sm",
              hero ? "bg-white/22" : "bg-surface-muted text-secondary",
            )}
          >
            {delta}
          </span>
        )}
      </div>
      {sub && (
        <p
          className={cn("text-caption-md whitespace-nowrap", hero ? "opacity-85" : "text-tertiary")}
        >
          {sub}
        </p>
      )}
    </div>
  );
}

import type { ComponentProps } from "react";

import { cn } from "@/shared/lib/cn";
import { TooltipRow } from "./tooltip-row";

export interface TooltipProps extends ComponentProps<"div"> {
  label: string;
  title: string;
  code: string;
  rows: { label: string; value: string }[];
}

export function Tooltip({ label, title, code, rows, className, ...props }: TooltipProps) {
  return (
    <div
      className={cn(
        "flex w-83 flex-col items-start gap-3 rounded-2xl border border-default bg-surface p-5 shadow-sm",
        className,
      )}
      {...props}
    >
      <div className="flex w-full flex-col items-start gap-1 whitespace-nowrap">
        <p className="text-caption-md text-tertiary">{label}</p>
        <div className="flex items-baseline gap-1.5">
          <p className="text-label-lg text-primary">{title}</p>
          <p className="text-label-lg text-brand">{code}</p>
        </div>
      </div>
      <div className="h-px w-full bg-gray-200" />
      <div className="flex w-full flex-col items-start gap-2">
        {rows.map((row) => (
          <TooltipRow key={row.label} label={row.label} value={row.value} className="w-full" />
        ))}
      </div>
    </div>
  );
}

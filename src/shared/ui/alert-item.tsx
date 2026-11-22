import type { ComponentProps, ReactNode } from "react";

import { cn } from "@/shared/lib/cn";
import { IconCircle, type IconCircleTone } from "./icon-circle";

const severityTone: Record<"error" | "warning" | "success", IconCircleTone> = {
  error: "error",
  warning: "warning",
  success: "success",
};

export interface AlertItemProps extends ComponentProps<"div"> {
  severity?: "error" | "warning" | "success";
  icon: ReactNode;
  title: string;
  meta: string;
  time: string;
}

export function AlertItem({
  severity = "error",
  icon,
  title,
  meta,
  time,
  className,
  ...props
}: AlertItemProps) {
  return (
    <div className={cn("flex h-15 items-center gap-3 py-2", className)} {...props}>
      <IconCircle tone={severityTone[severity]} icon={icon} />
      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
        <p className="text-label-md whitespace-nowrap text-primary">{title}</p>
        <p className="text-caption-md whitespace-nowrap text-secondary">{meta}</p>
      </div>
      <p className="shrink-0 text-caption-md whitespace-nowrap text-tertiary">{time}</p>
    </div>
  );
}

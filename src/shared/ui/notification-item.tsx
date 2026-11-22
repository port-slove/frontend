import type { ComponentProps } from "react";

import { cn } from "@/shared/lib/cn";

const dotClass = {
  warning: "bg-warning",
  error: "bg-error",
  success: "bg-success",
  neutral: "bg-gray-300",
} as const;

export type NotificationTone = keyof typeof dotClass;

export interface NotificationItemProps extends ComponentProps<"div"> {
  tone?: NotificationTone;
  unread?: boolean;
  title: string;
  description: string;
  time: string;
}

export function NotificationItem({
  tone = "neutral",
  unread = false,
  title,
  description,
  time,
  className,
  ...props
}: NotificationItemProps) {
  return (
    <div
      className={cn("flex w-full gap-2.5 px-4 py-2.5", unread && "bg-brand-subtle", className)}
      {...props}
    >
      <span className={cn("mt-1.5 size-1.5 shrink-0 rounded-full", dotClass[tone])} />
      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
        <p className="text-label-md text-primary">{title}</p>
        <p className="text-body-sm text-secondary">{description}</p>
      </div>
      <p className="shrink-0 text-caption-md whitespace-nowrap text-tertiary">{time}</p>
    </div>
  );
}

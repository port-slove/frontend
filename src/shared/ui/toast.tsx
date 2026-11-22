"use client";

import type { ComponentProps, ReactNode } from "react";

import { cn } from "@/shared/lib/cn";
import { Button } from "./button";
import { IconCircle } from "./icon-circle";

const titleClass = {
  error: "text-error",
  warning: "text-warning",
  info: "text-brand",
} as const;

export type ToastTone = keyof typeof titleClass;

export interface ToastProps extends ComponentProps<"div"> {
  tone?: ToastTone;
  icon: ReactNode;
  title: string;
  description: string;
  time: string;
  actionLabel?: string;
  actionIcon?: ReactNode;
  onAction?: () => void;
  onClose?: () => void;
  closeIcon: ReactNode;
}

export function Toast({
  tone = "error",
  icon,
  title,
  description,
  time,
  actionLabel = "확인하기",
  actionIcon,
  onAction,
  onClose,
  closeIcon,
  className,
  ...props
}: ToastProps) {
  return (
    <div
      className={cn(
        "flex w-100 items-start gap-3 rounded-2xl border border-default bg-surface p-4 shadow-lg",
        className,
      )}
      {...props}
    >
      <IconCircle tone={tone === "info" ? "brand" : tone} icon={icon} />
      <div className="flex min-w-0 flex-1 flex-col gap-1.5">
        <p className={cn("text-label-md whitespace-nowrap", titleClass[tone])}>{title}</p>
        <p className="text-caption-md text-secondary">{description}</p>
        <div className="flex items-center gap-2">
          <Button
            variant="secondary"
            className="h-9.5 rounded-md px-5 text-label-md"
            onClick={onAction}
          >
            {actionLabel}
            {actionIcon}
          </Button>
          <p className="text-caption-md whitespace-nowrap text-tertiary">{time}</p>
        </div>
      </div>
      <button
        type="button"
        aria-label="닫기"
        onClick={onClose}
        className="flex size-7 shrink-0 items-center justify-center rounded-full bg-page [&_svg]:size-3.5"
      >
        {closeIcon}
      </button>
    </div>
  );
}

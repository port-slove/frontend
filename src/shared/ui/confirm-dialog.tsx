"use client";

import type { ComponentProps, ReactNode } from "react";

import { cn } from "@/shared/lib/cn";
import { Button } from "./button";
import { IconCircle } from "./icon-circle";

export interface ConfirmDialogProps extends ComponentProps<"div"> {
  icon: ReactNode;
  title: string;
  description: string;
  cancelLabel?: string;
  confirmLabel?: string;
  onCancel?: () => void;
  onConfirm?: () => void;
}

export function ConfirmDialog({
  icon,
  title,
  description,
  cancelLabel = "취소",
  confirmLabel = "확인",
  onCancel,
  onConfirm,
  className,
  ...props
}: ConfirmDialogProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-start gap-5 rounded-3xl bg-surface p-8 shadow-xl",
        className,
      )}
      {...props}
    >
      <IconCircle tone="brand" icon={icon} />
      <div className="flex w-full flex-col items-start gap-2">
        <p className="text-h3 whitespace-nowrap text-primary">{title}</p>
        <p className="text-body-sm text-secondary">{description}</p>
      </div>
      <div className="flex w-full items-start justify-end gap-3">
        <Button variant="outline" className="h-10 px-5" onClick={onCancel}>
          {cancelLabel}
        </Button>
        <Button className="h-10 px-5" onClick={onConfirm}>
          {confirmLabel}
        </Button>
      </div>
    </div>
  );
}

import type { ComponentProps, ReactNode } from "react";

import { cn } from "@/shared/lib/cn";

const toneClass = {
  error: { bg: "bg-error-subtle", text: "text-error" },
  warning: { bg: "bg-warning-subtle", text: "text-warning" },
  info: { bg: "bg-brand-subtle", text: "text-brand" },
} as const;

export type BannerTone = keyof typeof toneClass;

export interface BannerProps extends ComponentProps<"div"> {
  tone?: BannerTone;
  icon: ReactNode;
  title: string;
  description: string;
}

export function Banner({
  tone = "error",
  icon,
  title,
  description,
  className,
  ...props
}: BannerProps) {
  return (
    <div
      className={cn(
        "flex h-14 items-center gap-3 rounded-2xl px-4 py-3",
        toneClass[tone].bg,
        toneClass[tone].text,
        className,
      )}
      {...props}
    >
      <span className="flex size-5 shrink-0 items-center justify-center">{icon}</span>
      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
        <p className="text-label-md whitespace-nowrap">{title}</p>
        <p className="text-caption-md whitespace-nowrap text-secondary">{description}</p>
      </div>
    </div>
  );
}

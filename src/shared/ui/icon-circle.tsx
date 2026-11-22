import type { ComponentProps, ReactNode } from "react";

import { cn } from "@/shared/lib/cn";

const toneClass = {
  brand: "text-brand",
  neutral: "text-primary",
  error: "text-error",
  warning: "text-warning",
  success: "text-success",
  white: "size-11 rounded-lg bg-surface text-brand",
  dark: "size-11 rounded-lg bg-inverse text-on-brand",
} as const;

export type IconCircleTone = keyof typeof toneClass;

export interface IconCircleProps extends ComponentProps<"span"> {
  tone?: IconCircleTone;
  icon: ReactNode;
}

export function IconCircle({ tone = "brand", icon, className, ...props }: IconCircleProps) {
  return (
    <span
      className={cn(
        "inline-flex size-6 shrink-0 items-center justify-center [&_svg]:size-5",
        toneClass[tone],
        className,
      )}
      {...props}
    >
      {icon}
    </span>
  );
}

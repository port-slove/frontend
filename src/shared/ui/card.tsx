import type { ComponentProps } from "react";

import { cn } from "@/shared/lib/cn";

const variantClass = {
  elevated: "rounded-xl p-6 shadow-md",
  // 대시보드 화면의 테두리 카드 (Figma: border/default, radius/xl, padding 16)
  outlined: "rounded-2xl border border-default p-4",
} as const;

export type CardVariant = keyof typeof variantClass;

export interface CardProps extends ComponentProps<"div"> {
  variant?: CardVariant;
}

export function Card({ variant = "elevated", className, ...props }: CardProps) {
  return (
    <div
      className={cn("flex flex-col gap-3 bg-surface", variantClass[variant], className)}
      {...props}
    />
  );
}

export function CardTitle({ className, ...props }: ComponentProps<"h3">) {
  return <h3 className={cn("text-h3 text-primary", className)} {...props} />;
}

export function CardDescription({ className, ...props }: ComponentProps<"p">) {
  return <p className={cn("text-body-sm text-secondary", className)} {...props} />;
}

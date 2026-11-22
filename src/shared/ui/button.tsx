import type { ComponentProps } from "react";

import { cn } from "@/shared/lib/cn";

const variantClass = {
  primary: "bg-brand text-on-brand shadow-md hover:bg-brand-pressed active:bg-brand-pressed",
  secondary: "bg-surface-muted text-primary hover:bg-gray-200 active:bg-gray-200",
  outline: "border border-default bg-surface text-primary hover:bg-page active:bg-surface-muted",
  ghost: "text-secondary hover:bg-page active:bg-surface-muted",
  danger: "bg-error text-on-brand hover:bg-red-700 active:bg-red-700",
  dark: "bg-inverse text-on-brand hover:bg-gray-800 active:bg-gray-800",
} as const;

export type ButtonVariant = keyof typeof variantClass;

export interface ButtonProps extends ComponentProps<"button"> {
  variant?: ButtonVariant;
  fullWidth?: boolean;
}

export function Button({
  variant = "primary",
  fullWidth = false,
  type = "button",
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3.5 text-label-lg whitespace-nowrap transition-colors",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand",
        "disabled:pointer-events-none disabled:border-transparent disabled:bg-disabled disabled:text-disabled disabled:shadow-none",
        variantClass[variant],
        fullWidth && "w-full",
        className,
      )}
      {...props}
    />
  );
}

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

const sizeClass = {
  lg: "rounded-lg px-6 py-3.5 text-label-lg",
  md: "h-10 rounded-md px-5 text-label-md [&_svg]:size-4",
} as const;

export type ButtonVariant = keyof typeof variantClass;
export type ButtonSize = keyof typeof sizeClass;

export interface ButtonProps extends ComponentProps<"button"> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
}

export interface ButtonClassOptions {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  className?: string;
}

/** `<Link>` 등 button 이 아닌 요소에 버튼 스타일을 입힐 때 사용합니다. */
export function buttonClassName({
  variant = "primary",
  size = "lg",
  fullWidth = false,
  className,
}: ButtonClassOptions = {}) {
  return cn(
    "inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap transition-colors",
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand",
    "disabled:pointer-events-none disabled:border-transparent disabled:bg-disabled disabled:text-disabled disabled:shadow-none",
    sizeClass[size],
    variantClass[variant],
    fullWidth && "w-full",
    className,
  );
}

export function Button({
  variant,
  size,
  fullWidth,
  type = "button",
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={buttonClassName({ variant, size, fullWidth, className })}
      {...props}
    />
  );
}

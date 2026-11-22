import type { ComponentProps } from "react";

import { cn } from "@/shared/lib/cn";

export interface TabProps extends ComponentProps<"button"> {
  active?: boolean;
}

export function Tab({ active = false, type = "button", className, ...props }: TabProps) {
  return (
    <button
      type={type}
      className={cn(
        "rounded-md px-5 py-2.5 text-label-md whitespace-nowrap",
        active ? "bg-brand text-on-brand" : "text-secondary",
        className,
      )}
      {...props}
    />
  );
}

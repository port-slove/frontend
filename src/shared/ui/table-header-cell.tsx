import type { ComponentProps } from "react";

import { cn } from "@/shared/lib/cn";

export interface TableHeaderCellProps extends ComponentProps<"th"> {
  align?: "left" | "center";
}

export function TableHeaderCell({
  align = "left",
  className,
  children,
  ...props
}: TableHeaderCellProps) {
  return (
    <th
      className={cn(
        "h-11 px-3 text-label-sm whitespace-nowrap text-secondary",
        align === "center" ? "text-center" : "text-left",
        className,
      )}
      {...props}
    >
      {children}
    </th>
  );
}

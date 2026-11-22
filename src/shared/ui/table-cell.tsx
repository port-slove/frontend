import type { ComponentProps } from "react";

import { cn } from "@/shared/lib/cn";

const typeClass = {
  text: "text-body-sm text-primary",
  strong: "text-label-md text-primary",
  muted: "text-body-sm text-secondary",
} as const;

export type TableCellType = keyof typeof typeClass;

export interface TableCellProps extends ComponentProps<"td"> {
  type?: TableCellType;
  align?: "left" | "center";
}

export function TableCell({
  type = "text",
  align = "left",
  className,
  children,
  ...props
}: TableCellProps) {
  return (
    <td
      className={cn(
        "h-14 px-3 whitespace-nowrap",
        typeClass[type],
        align === "center" ? "text-center" : "text-left",
        className,
      )}
      {...props}
    >
      {children}
    </td>
  );
}

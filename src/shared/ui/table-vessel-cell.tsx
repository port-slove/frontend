import type { ComponentProps } from "react";

import { cn } from "@/shared/lib/cn";

export interface TableVesselCellProps extends ComponentProps<"td"> {
  name: string;
  imo: string;
}

export function TableVesselCell({ name, imo, className, ...props }: TableVesselCellProps) {
  return (
    <td className={cn("h-14 px-3", className)} {...props}>
      <div className="flex flex-col gap-0.5">
        <p className="text-label-md whitespace-nowrap text-primary">{name}</p>
        <p className="text-caption-md whitespace-nowrap text-tertiary">{imo}</p>
      </div>
    </td>
  );
}

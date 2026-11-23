import type { ComponentProps } from "react";

import { cn } from "@/shared/lib/cn";
import { MapMarker, type MapMarkerStatus } from "./map-marker";

export interface LegendItemProps extends ComponentProps<"div"> {
  status?: MapMarkerStatus;
  label: string;
}

export function LegendItem({ status = "항해 중", label, className, ...props }: LegendItemProps) {
  return (
    <div className={cn("flex items-center gap-1.5", className)} {...props}>
      <MapMarker status={status} />
      <p className="text-caption-md whitespace-nowrap text-secondary">{label}</p>
    </div>
  );
}

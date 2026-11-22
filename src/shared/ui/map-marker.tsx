import type { ComponentProps } from "react";

import { cn } from "@/shared/lib/cn";

const shapeClass = {
  "항해 중": "size-3 rounded-full bg-brand",
  "대기 예상": "size-3 rounded-full bg-warning",
  묘박: "size-3 rounded-xs bg-gray-600",
  "검증 필요": "size-3 -rotate-45 rounded-xs bg-error",
} as const;

export type MapMarkerStatus = keyof typeof shapeClass;

export const MAP_MARKER_STATUSES = Object.keys(shapeClass) as MapMarkerStatus[];

export interface MapMarkerProps extends ComponentProps<"span"> {
  status?: MapMarkerStatus;
}

export function MapMarker({ status = "항해 중", className, ...props }: MapMarkerProps) {
  return (
    <span
      className={cn("inline-flex size-6 shrink-0 items-center justify-center", className)}
      {...props}
    >
      <span className={cn("border-2 border-white", shapeClass[status])} />
    </span>
  );
}

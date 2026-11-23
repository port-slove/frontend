import type { ComponentProps } from "react";

import { cn } from "@/shared/lib/cn";

export const MAP_MARKER_STATUSES = ["항해 중", "대기 예상", "묘박", "검증 필요"] as const;

export type MapMarkerStatus = (typeof MAP_MARKER_STATUSES)[number];

export interface MapMarkerProps extends ComponentProps<"div"> {
  status?: MapMarkerStatus;
}

export function MapMarker({ status = "항해 중", className, ...props }: MapMarkerProps) {
  return (
    <div className={cn("flex size-6 shrink-0 items-center justify-center", className)} {...props}>
      {status === "항해 중" && (
        <span className="size-4 rounded-full border-2 border-white bg-brand" />
      )}
      {status === "대기 예상" && (
        <span className="size-4 rounded-full border-2 border-white bg-warning" />
      )}
      {status === "묘박" && (
        <span className="size-3 rounded-xs border-2 border-white bg-gray-600" />
      )}
      {status === "검증 필요" && (
        <span className="flex size-4 rotate-45 items-center justify-center">
          <span className="size-3 rounded-xs border-2 border-white bg-error" />
        </span>
      )}
    </div>
  );
}

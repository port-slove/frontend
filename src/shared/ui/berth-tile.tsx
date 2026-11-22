import type { ComponentProps } from "react";

import { cn } from "@/shared/lib/cn";
import { Progress } from "./progress";

export interface BerthTileProps extends ComponentProps<"div"> {
  status?: "normal" | "delayed";
  berth: string;
  state: string;
  meta: string;
  progress: number;
}

export function BerthTile({
  status = "normal",
  berth,
  state,
  meta,
  progress,
  className,
  ...props
}: BerthTileProps) {
  const isDelayed = status === "delayed";

  return (
    <div
      className={cn(
        "flex flex-col items-start gap-1.5 rounded-2xl p-4",
        isDelayed ? "bg-error-subtle text-error" : "bg-page",
        className,
      )}
      {...props}
    >
      <p className={cn("text-caption-md whitespace-nowrap", !isDelayed && "text-secondary")}>
        {berth}
      </p>
      <p className={cn("text-h4 whitespace-nowrap", !isDelayed && "text-primary")}>{state}</p>
      <Progress tone={isDelayed ? "error" : "brand"} value={progress} />
      <p className={cn("text-caption-md whitespace-nowrap", !isDelayed && "text-tertiary")}>
        {meta}
      </p>
    </div>
  );
}

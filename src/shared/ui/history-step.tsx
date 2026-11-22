import type { ComponentProps } from "react";

import { cn } from "@/shared/lib/cn";

export interface HistoryStepProps extends ComponentProps<"div"> {
  done?: boolean;
  time: string;
  title: string;
  description: string;
}

export function HistoryStep({
  done = true,
  time,
  title,
  description,
  className,
  ...props
}: HistoryStepProps) {
  return (
    <div className={cn("flex w-full items-start gap-4 pb-3.5", className)} {...props}>
      <p
        className={cn(
          "w-12 shrink-0 text-label-md whitespace-nowrap",
          done ? "text-primary" : "text-tertiary",
        )}
      >
        {time}
      </p>
      <span
        className={cn("mt-1 size-2 shrink-0 rounded-full", done ? "bg-brand" : "bg-gray-300")}
      />
      <div className="flex min-w-0 flex-1 flex-col gap-0.5 whitespace-nowrap">
        <p className={cn("text-label-md", done ? "text-primary" : "text-secondary")}>{title}</p>
        <p className="text-body-sm text-tertiary">{description}</p>
      </div>
    </div>
  );
}

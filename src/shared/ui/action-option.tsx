import type { ComponentProps, ReactNode } from "react";

import { cn } from "@/shared/lib/cn";
import { IconCircle } from "./icon-circle";

export interface ActionOptionProps extends Omit<ComponentProps<"button">, "title"> {
  selected?: boolean;
  icon: ReactNode;
  title: string;
  description: string;
}

export function ActionOption({
  selected = false,
  icon,
  title,
  description,
  className,
  ...props
}: ActionOptionProps) {
  return (
    <button
      type="button"
      className={cn(
        "flex h-18 w-full items-center gap-3 rounded-2xl bg-surface p-4 text-left",
        selected ? "border-[1.5px] border-brand" : "border border-default",
        className,
      )}
      {...props}
    >
      <IconCircle tone={selected ? "brand" : "neutral"} icon={icon} />
      <span className="flex min-w-0 flex-1 flex-col gap-0.5">
        <span className="text-label-md text-primary">{title}</span>
        <span className="text-caption-md text-secondary">{description}</span>
      </span>
      <span
        className={cn(
          "flex size-5 shrink-0 items-center justify-center rounded-full",
          selected ? "bg-brand" : "border-[1.5px] border-gray-300 bg-surface",
        )}
      >
        {selected && <span className="size-2 rounded-full bg-white" />}
      </span>
    </button>
  );
}

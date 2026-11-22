import type { ComponentProps, ReactNode } from "react";

import { cn } from "@/shared/lib/cn";

export interface CardHeaderProps extends ComponentProps<"div"> {
  title: string;
  badge?: ReactNode;
}

export function CardHeader({ title, badge, className, ...props }: CardHeaderProps) {
  return (
    <div className={cn("flex h-8 items-center justify-between gap-2", className)} {...props}>
      <p className="text-h3 whitespace-nowrap text-primary">{title}</p>
      {badge}
    </div>
  );
}

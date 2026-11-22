import type { ComponentProps } from "react";

import { cn } from "@/shared/lib/cn";

export interface PageTitleProps extends ComponentProps<"div"> {
  title: string;
  subtitle?: string;
}

export function PageTitle({ title, subtitle, className, ...props }: PageTitleProps) {
  return (
    <div className={cn("flex flex-col items-start gap-1", className)} {...props}>
      <p className="text-h1 whitespace-nowrap text-primary">{title}</p>
      {subtitle && <p className="text-body-sm text-secondary">{subtitle}</p>}
    </div>
  );
}

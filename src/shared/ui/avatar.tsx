import type { ComponentProps, ReactNode } from "react";

import { cn } from "@/shared/lib/cn";

export interface AvatarProps extends ComponentProps<"span"> {
  icon: ReactNode;
}

export function Avatar({ icon, className, ...props }: AvatarProps) {
  return (
    <span
      className={cn(
        "flex size-10 shrink-0 items-center justify-center rounded-full bg-brand-sub [&_svg]:size-5",
        className,
      )}
      {...props}
    >
      {icon}
    </span>
  );
}

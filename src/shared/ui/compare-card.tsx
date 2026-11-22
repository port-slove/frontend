import type { ComponentProps } from "react";

import { cn } from "@/shared/lib/cn";
import { Chip } from "./chip";

export interface CompareCardProps extends ComponentProps<"div"> {
  recommended?: boolean;
  title: string;
  speed: string;
  arrival: string;
  wait: string;
  fuel: string;
  co2: string;
}

function Row({
  label,
  value,
  recommended,
}: {
  label: string;
  value: string;
  recommended: boolean;
}) {
  return (
    <div className="flex w-full items-center justify-between whitespace-nowrap">
      <p className="text-body-sm text-secondary">{label}</p>
      <p className={cn("text-label-md", recommended ? "text-brand" : "text-primary")}>{value}</p>
    </div>
  );
}

export function CompareCard({
  recommended = false,
  title,
  speed,
  arrival,
  wait,
  fuel,
  co2,
  className,
  ...props
}: CompareCardProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-start gap-4 rounded-2xl p-4",
        recommended ? "border-[1.5px] border-brand bg-surface" : "bg-page",
        className,
      )}
      {...props}
    >
      <div className="flex w-full items-center justify-between gap-2 whitespace-nowrap">
        <p className={cn("text-label-lg", recommended ? "text-brand" : "text-secondary")}>
          {title}
        </p>
        {recommended && (
          <Chip tone="brand" className="py-1">
            권고
          </Chip>
        )}
      </div>
      <div className="flex items-baseline gap-1 whitespace-nowrap">
        <p className={cn("text-display-md", recommended ? "text-brand" : "text-primary")}>
          {speed}
        </p>
        <p className="text-body-lg text-secondary">kn</p>
      </div>
      <Row label="도착 시각" value={arrival} recommended={recommended} />
      <Row label="묘박 대기" value={wait} recommended={recommended} />
      <Row label="연료 소비" value={fuel} recommended={recommended} />
      <Row label="CO₂ 배출" value={co2} recommended={recommended} />
    </div>
  );
}

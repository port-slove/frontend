import { cn } from "@/shared/lib/cn";
import { HISTORY_STATS } from "./history-mock-data";

export function HistoryStats() {
  return (
    <div className="flex w-full items-stretch rounded-2xl border border-default bg-surface p-4">
      {HISTORY_STATS.map((stat, index) => (
        <div
          key={stat.label}
          className={cn(
            "flex flex-1 flex-col gap-2 px-4 first:pl-0 last:pr-0",
            index > 0 && "border-l border-default",
          )}
        >
          <p className="text-caption-md whitespace-nowrap text-secondary">{stat.label}</p>
          <div className="flex items-baseline gap-1 whitespace-nowrap">
            <p className="text-h1 text-primary">{stat.value}</p>
            {stat.unit && <p className="text-body-sm text-secondary">{stat.unit}</p>}
          </div>
          {stat.sub && (
            <p className="text-caption-md whitespace-nowrap text-tertiary">{stat.sub}</p>
          )}
        </div>
      ))}
    </div>
  );
}

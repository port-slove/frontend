import { CardHeader, PropertyRow } from "@/shared/ui";
import { SEA_STATE_ROWS } from "./dashboard-mock-data";

export function SeaStateCard() {
  return (
    <div className="flex w-full flex-col gap-3 rounded-2xl border border-default bg-surface p-4">
      <div className="flex items-center gap-3">
        <CardHeader title="해상 상태" className="flex-1" />
        <p className="text-caption-md whitespace-nowrap text-tertiary">기상청 · 10분 전</p>
      </div>
      {SEA_STATE_ROWS.map((row) => (
        <PropertyRow key={row.label} label={row.label} value={row.value} />
      ))}
    </div>
  );
}

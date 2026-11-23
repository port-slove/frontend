import { Card, CardHeader, PropertyRow } from "@/shared/ui";

import type { SeaState } from "./types";

export function SeaStateCard({ seaState }: { seaState: SeaState }) {
  return (
    <Card variant="outlined">
      <div className="flex items-center gap-3">
        <CardHeader title="해상 상태" className="flex-1" />
        <p className="text-caption-md whitespace-nowrap text-tertiary">{seaState.source}</p>
      </div>
      {seaState.rows.map((row) => (
        <PropertyRow key={row.label} label={row.label} value={row.value} />
      ))}
    </Card>
  );
}

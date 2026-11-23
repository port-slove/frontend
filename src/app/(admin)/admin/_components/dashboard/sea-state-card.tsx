import type { ReactNode } from "react";

import { Card, CardHeader, PropertyRow } from "@/shared/ui";

import type { SeaState } from "./types";

export interface SeaStateCardProps {
  seaState?: SeaState;
  /** seaState 대신 보여 줄 로딩·빈 상태·에러 안내 */
  message?: ReactNode;
}

export function SeaStateCard({ seaState, message }: SeaStateCardProps) {
  return (
    <Card variant="outlined">
      <div className="flex items-center gap-3">
        <CardHeader title="해상 상태" className="flex-1" />
        {seaState && (
          <p className="text-caption-md whitespace-nowrap text-tertiary">{seaState.source}</p>
        )}
      </div>
      {seaState
        ? seaState.rows.map((row) => (
            <PropertyRow key={row.label} label={row.label} value={row.value} />
          ))
        : message}
    </Card>
  );
}

"use client";

import { useState } from "react";

import { Button, Card, ChevronDownIcon, PageTitle, Segmented } from "@/shared/ui";

import {
  VESSEL_ZONE_FILTERS,
  type VesselDetail,
  type VesselRow,
  type VesselZoneFilter,
} from "./types";
import { VesselDetailPanel } from "./vessel-detail-panel";
import { VesselTable } from "./vessel-table";

export interface VesselMonitorProps {
  summary: string;
  vessels: VesselRow[];
  total: number;
  details: VesselDetail[];
  initialSelectedImo?: string;
}

export function VesselMonitor({
  summary,
  vessels,
  total,
  details,
  initialSelectedImo,
}: VesselMonitorProps) {
  // TODO: API 연동 시 필터를 쿼리 파라미터로 넘겨 목록을 다시 조회합니다.
  const [zone, setZone] = useState<VesselZoneFilter>("전체");
  const [selectedImo, setSelectedImo] = useState<string | null>(initialSelectedImo ?? null);

  const detail = details.find((d) => d.imo === selectedImo);

  return (
    <>
      <div className="flex items-center justify-between">
        <PageTitle title="선박 모니터링" subtitle={summary} />
        <div className="flex items-center gap-3">
          <Segmented options={VESSEL_ZONE_FILTERS} value={zone} onValueChange={setZone} />
          <Button variant="outline" size="md">
            선종 전체
            <ChevronDownIcon />
          </Button>
        </div>
      </div>

      <div className="flex items-stretch gap-4">
        <VesselTable
          vessels={vessels}
          total={total}
          selectedImo={selectedImo}
          onSelect={setSelectedImo}
        />
        {detail ? (
          <VesselDetailPanel detail={detail} onClose={() => setSelectedImo(null)} />
        ) : (
          <Card
            variant="outlined"
            className="w-100 shrink-0 items-center justify-center text-body-sm text-tertiary"
          >
            {selectedImo ? "선박 상세 정보가 없습니다." : "선박을 선택하면 상세 정보가 표시됩니다."}
          </Card>
        )}
      </div>
    </>
  );
}

"use client";

import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";

import { Button, Card, ChevronDownIcon, PageTitle, Segmented } from "@/shared/ui";

import { aisQueries, toShipNameMap } from "../../_api/ais";
import { mvpQueries } from "../../_api/mvp";
import { formatKstTime } from "../../_lib/format";
import { CardMessage } from "../../_components/card-message";
import { toVesselDetail, toVesselRow } from "./mappers";
import { VESSEL_ZONE_FILTERS, type VesselZoneFilter } from "./types";
import { VesselDetailPanel } from "./vessel-detail-panel";
import { VesselTable } from "./vessel-table";

export function VesselMonitor() {
  const vesselsQuery = useQuery(mvpQueries.vessels());
  // 선명은 보조 정보라 실패해도 목록은 MMSI 로 보여 줍니다.
  const { data: ais } = useQuery(aisQueries.positions());

  const [zone, setZone] = useState<VesselZoneFilter>("전체");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const names = useMemo(() => (ais ? toShipNameMap(ais) : new Map<number, string>()), [ais]);
  const data = vesselsQuery.data;
  const rows = useMemo(
    () => (data ? data.vessels.map((v) => toVesselRow(v, names, data.evaluated_at_utc)) : []),
    [data, names],
  );
  const visibleRows = zone === "전체" ? rows : rows.filter((row) => row.zone === zone);

  const selectedVessel = data?.vessels.find((vessel) => String(vessel.mmsi) === selectedId);
  const detail =
    data && selectedVessel
      ? toVesselDetail(selectedVessel, names, data.evaluated_at_utc)
      : undefined;

  let summary = "불러오는 중";
  if (vesselsQuery.data) {
    const fresh = vesselsQuery.data.vessels.filter((v) => v.freshness === "fresh").length;
    summary = `총 ${rows.length}척 · 실시간 ${fresh}척 · 마지막 갱신 ${formatKstTime(vesselsQuery.data.evaluated_at_utc)}`;
  } else if (vesselsQuery.isError) {
    summary = "갱신 실패";
  }

  let message = null;
  if (vesselsQuery.isPending) message = <CardMessage message="선박 목록을 불러오는 중" />;
  else if (vesselsQuery.isError)
    message = (
      <CardMessage message="데이터를 불러오지 못했어요" onRetry={() => vesselsQuery.refetch()} />
    );
  else if (visibleRows.length === 0) message = <CardMessage message="해당하는 선박이 없어요" />;

  return (
    <>
      <div className="flex items-center justify-between">
        <PageTitle title="선박 모니터링" subtitle={summary} />
        <div className="flex items-center gap-3">
          <Segmented options={VESSEL_ZONE_FILTERS} value={zone} onValueChange={setZone} />
          {/* TODO: 선종 데이터가 API 에 생기면 필터로 연결 */}
          <Button variant="outline" size="md">
            선종 전체
            <ChevronDownIcon />
          </Button>
        </div>
      </div>

      <div className="flex items-start gap-4">
        <VesselTable
          vessels={visibleRows}
          total={visibleRows.length}
          selectedId={selectedId}
          onSelect={setSelectedId}
          message={message}
        />
        {detail ? (
          <VesselDetailPanel detail={detail} onClose={() => setSelectedId(null)} />
        ) : (
          <Card
            variant="outlined"
            className="min-h-100 w-100 shrink-0 items-center justify-center text-body-sm text-tertiary"
          >
            선박을 선택하면 상세 정보가 표시됩니다.
          </Card>
        )}
      </div>
    </>
  );
}

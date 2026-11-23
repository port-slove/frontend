"use client";

import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";

import { CardHeader, Chip, TableCell, TableHeaderCell, TableVesselCell } from "@/shared/ui";
import { cn } from "@/shared/lib/cn";
import { ApiError } from "@/shared/api/client";
import { aisQueries, toShipNameMap } from "@/app/(admin)/admin/_api/ais";
import { mvpQueries, type MvpVessel } from "@/app/(admin)/admin/_api/mvp";
import { CardMessage } from "@/app/(admin)/admin/_components/card-message";
import {
  arrivalOrderQueries,
  MAX_SIMULATED_VESSELS,
  type PlannedCall,
} from "../_api/arrival-order";

const UNKNOWN_NAME = "선명 미수신";

function byDistanceToPort(a: MvpVessel, b: MvpVessel) {
  return a.distance_to_port_nm - b.distance_to_port_nm;
}

function formatTime(iso: string) {
  return new Intl.DateTimeFormat("ko-KR", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "Asia/Seoul",
  }).format(new Date(iso));
}

function formatBerth(berthId: string) {
  return `${berthId[0]}부두 ${berthId.slice(1)}`;
}

function formatWait(hours: number) {
  if (hours <= 0) return "대기 없음";
  const minutes = Math.round(hours * 60);
  return minutes < 60 ? `${minutes}분` : `${Math.floor(minutes / 60)}시간 ${minutes % 60}분`;
}

interface Row {
  order: number;
  name: string;
  imo: string;
  eta: string;
  berth: string | null;
  wait: string | null;
  acceptance: "배정 완료" | "보류" | "배정 불가";
}

export function OptimizationQueueCard() {
  const vesselsQuery = useQuery(mvpQueries.vessels());
  // 선명은 보조 정보라 실패해도 목록은 MMSI 로 보여 줍니다.
  const { data: ais } = useQuery(aisQueries.positions());
  const names = useMemo(() => (ais ? toShipNameMap(ais) : new Map<number, string>()), [ais]);

  const sortedVessels = useMemo(
    () => (vesselsQuery.data ? [...vesselsQuery.data.vessels].sort(byDistanceToPort) : []),
    [vesselsQuery.data],
  );
  const simulatedVessels = sortedVessels.slice(0, MAX_SIMULATED_VESSELS);
  const heldVessel = sortedVessels[MAX_SIMULATED_VESSELS];

  const { data, isPending, error } = useQuery(arrivalOrderQueries.plan(simulatedVessels));

  function vesselLabel(mmsi: number) {
    return { name: names.get(mmsi) ?? UNKNOWN_NAME, imo: `MMSI ${mmsi}` };
  }

  const rows: Row[] = [];
  if (data) {
    for (const call of data.calls as PlannedCall[]) {
      rows.push({
        order: 0,
        ...vesselLabel(Number(call.ship_id)),
        eta: formatTime(call.eta),
        berth: formatBerth(call.berth_id),
        wait: formatWait(call.wait_hours),
        acceptance: data.incompatible_ship_ids.includes(call.ship_id) ? "배정 불가" : "배정 완료",
      });
    }
    if (heldVessel) {
      const heldEta = new Date(new Date(data.computed_at).getTime() + 125 * 60_000);
      rows.push({
        order: 0,
        ...vesselLabel(heldVessel.mmsi),
        eta: formatTime(heldEta.toISOString()),
        berth: null,
        wait: null,
        acceptance: "보류",
      });
    }
    rows.sort((a, b) => a.eta.localeCompare(b.eta));
    rows.forEach((row, i) => {
      row.order = i + 1;
    });
  }

  const pending = vesselsQuery.isPending || (simulatedVessels.length > 0 && isPending);
  const queryError = vesselsQuery.error ?? error;

  return (
    <div className="flex w-full flex-col gap-1 rounded-2xl border border-default bg-surface p-4">
      <div className="flex items-center gap-3">
        <CardHeader
          title="입항 순서"
          badge={<span className="text-label-sm text-secondary">{rows.length || "—"}건</span>}
          className="flex-1"
        />
      </div>

      {pending && <p className="text-body-sm text-secondary">배정 계산 중...</p>}
      {queryError && (
        <p className="text-body-sm text-error">
          {queryError instanceof ApiError ? queryError.message : "입항 순서를 불러오지 못했습니다"}
        </p>
      )}
      {!pending && !queryError && rows.length === 0 && (
        <CardMessage message="표시할 선박이 없어요" onRetry={() => vesselsQuery.refetch()} />
      )}

      {rows.length > 0 && (
        <table className="w-full">
          <thead>
            <tr className="bg-page">
              <TableHeaderCell align="center" className="w-12">
                순서
              </TableHeaderCell>
              <TableHeaderCell className="w-47.5">선박</TableHeaderCell>
              <TableHeaderCell className="w-22.5">ETA</TableHeaderCell>
              <TableHeaderCell className="w-30">배정 선석</TableHeaderCell>
              <TableHeaderCell className="w-30">대기</TableHeaderCell>
              <TableHeaderCell align="center" className="w-30">
                수용 상태
              </TableHeaderCell>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.imo} className={cn(row.acceptance === "보류" && "bg-brand-subtle")}>
                <TableCell align="center" type="muted">
                  {row.order}
                </TableCell>
                <TableVesselCell name={row.name} imo={row.imo} />
                <TableCell>{row.eta}</TableCell>
                <TableCell type="strong">{row.berth ?? "—"}</TableCell>
                <TableCell>{row.wait ?? "—"}</TableCell>
                <TableCell align="center">
                  <Chip tone={row.acceptance === "배정 완료" ? "success" : "error"}>
                    {row.acceptance}
                  </Chip>
                </TableCell>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

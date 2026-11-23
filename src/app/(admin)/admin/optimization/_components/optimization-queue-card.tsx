"use client";

import { useQuery } from "@tanstack/react-query";

import { CardHeader, Chip, TableCell, TableHeaderCell, TableVesselCell } from "@/shared/ui";
import { cn } from "@/shared/lib/cn";
import { ApiError } from "@/shared/api/client";
import {
  arrivalOrderQueries,
  HELD_VESSEL_ID,
  VESSEL_IMO,
  type PlannedCall,
} from "../_api/arrival-order";

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
  eta: string;
  berth: string | null;
  wait: string | null;
  acceptance: "배정 완료" | "보류" | "배정 불가";
}

export function OptimizationQueueCard() {
  const { data, isPending, error } = useQuery(arrivalOrderQueries.plan());

  const rows: Row[] = [];
  if (data) {
    for (const call of data.calls as PlannedCall[]) {
      rows.push({
        order: 0,
        name: call.ship_id,
        eta: formatTime(call.eta),
        berth: formatBerth(call.berth_id),
        wait: formatWait(call.wait_hours),
        acceptance: data.incompatible_ship_ids.includes(call.ship_id) ? "배정 불가" : "배정 완료",
      });
    }
    const heldEta = new Date(new Date(data.computed_at).getTime() + 125 * 60_000);
    rows.push({
      order: 0,
      name: HELD_VESSEL_ID,
      eta: formatTime(heldEta.toISOString()),
      berth: null,
      wait: null,
      acceptance: "보류",
    });
    rows.sort((a, b) => a.eta.localeCompare(b.eta));
    rows.forEach((row, i) => {
      row.order = i + 1;
    });
  }

  return (
    <div className="flex w-full flex-col gap-1 rounded-2xl border border-default bg-surface p-4">
      <div className="flex items-center gap-3">
        <CardHeader
          title="입항 순서"
          badge={<span className="text-label-sm text-secondary">{rows.length || "—"}건</span>}
          className="flex-1"
        />
      </div>

      {isPending && <p className="text-body-sm text-secondary">배정 계산 중...</p>}
      {error && (
        <p className="text-body-sm text-error">
          {error instanceof ApiError ? error.message : "입항 순서를 불러오지 못했습니다"}
        </p>
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
              <tr key={row.name} className={cn(row.acceptance === "보류" && "bg-brand-subtle")}>
                <TableCell align="center" type="muted">
                  {row.order}
                </TableCell>
                <TableVesselCell name={row.name} imo={VESSEL_IMO[row.name] ?? ""} />
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

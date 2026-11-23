"use client";

import { useQuery } from "@tanstack/react-query";

import { AlertItem, CardHeader, Chip } from "@/shared/ui";
import { ApiError } from "@/shared/api/client";
import { cn } from "@/shared/lib/cn";
import { aisQueries, toShipNameMap } from "../../_api/ais";
import { ADMIN_PORT, mvpQueries } from "../../_api/mvp";
import { formatKstTime } from "../../_lib/format";
import { REASON_LABELS, trustTone } from "../../_lib/reliability";
import { NEEDS_REVIEW, RESOLVED_TODAY } from "./reliability-mock-data";

function WarningIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" className="size-5">
      <path
        d="M10 3.5 2.5 16h15L10 3.5Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path d="M10 8v3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="10" cy="13.5" r="0.75" fill="currentColor" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" className="size-5">
      <path
        d="m4 10.5 4 4 8-9"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function VesselReviewList() {
  const alertsQuery = useQuery(mvpQueries.alerts(ADMIN_PORT));
  const positionsQuery = useQuery(aisQueries.positions());
  const shipNames = positionsQuery.data
    ? toShipNameMap(positionsQuery.data)
    : new Map<number, string>();

  return (
    <div className="flex w-90 shrink-0 flex-col gap-2 rounded-2xl border border-default bg-surface p-4">
      <CardHeader
        title="검증 필요"
        badge={<span className="text-label-sm text-secondary">8건</span>}
      />
      {NEEDS_REVIEW.map((item) => (
        <div
          key={item.id}
          className={cn("rounded-xl px-3 py-1", item.selected && "bg-brand-subtle")}
        >
          <AlertItem
            severity="error"
            icon={<WarningIcon />}
            title={item.title}
            meta={item.meta}
            time={item.time}
          />
        </div>
      ))}

      <div className="h-px w-full border-t border-default" />
      <div className="flex items-center gap-2">
        <p className="text-label-md text-secondary">실시간 확인 필요</p>
        <Chip tone="brand">인천항 실제 AIS</Chip>
      </div>
      {alertsQuery.isPending && (
        <p className="px-3 text-caption-md text-secondary">선박 조회 중...</p>
      )}
      {alertsQuery.error && (
        <p className="px-3 text-caption-md text-error">
          {alertsQuery.error instanceof ApiError
            ? alertsQuery.error.message
            : "선박 목록을 불러오지 못했습니다"}
        </p>
      )}
      {alertsQuery.data && alertsQuery.data.alerts.length === 0 && (
        <p className="px-3 text-caption-md text-secondary">
          지금 신뢰도 40점 미만이거나 항적 이상인 선박이 없어요.
        </p>
      )}
      {alertsQuery.data?.alerts.map((alert) => (
        <div key={alert.mmsi} className="px-3 py-1">
          <AlertItem
            severity={trustTone(alert.score)}
            icon={<WarningIcon />}
            title={`${shipNames.get(alert.mmsi) ?? `MMSI ${alert.mmsi}`} · ${alert.score}점`}
            meta={alert.reasons.map((r) => REASON_LABELS[r.code]).join(" · ")}
            time={formatKstTime(alert.received_at_utc)}
          />
        </div>
      ))}

      <div className="h-px w-full border-t border-default" />
      <p className="text-label-md text-secondary">오늘 처리 완료</p>
      {RESOLVED_TODAY.map((item) => (
        <div key={item.id} className="px-3 py-1">
          <AlertItem
            severity="success"
            icon={<CheckIcon />}
            title={item.title}
            meta={item.meta}
            time={item.time}
          />
        </div>
      ))}
    </div>
  );
}

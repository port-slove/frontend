"use client";

import { useQuery } from "@tanstack/react-query";

import { CardHeader, Chip, PropertyRow } from "@/shared/ui";
import { ApiError } from "@/shared/api/client";
import { recommendationRecordQueries } from "../_api/recommendation-record";

function formatTime(iso: string) {
  return new Intl.DateTimeFormat("ko-KR", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "Asia/Seoul",
  }).format(new Date(iso));
}

function eventRow(
  events: { action: string; occurred_at: string; actor: string; note?: string }[],
  action: string,
) {
  const event = events.find((e) => e.action === action);
  if (!event) return null;
  const parts = [formatTime(event.occurred_at), event.actor, event.note].filter(Boolean);
  return parts.join(" · ");
}

export function TrackingCard() {
  const { data, isPending, error } = useQuery(recommendationRecordQueries.badaLink());

  const sendEvent = data?.input.events.find((e) => e.action === "send");
  const waitMinutes =
    sendEvent && data
      ? Math.round(
          (new Date(data.computed_at).getTime() - new Date(sendEvent.occurred_at).getTime()) /
            60_000,
        )
      : null;

  const responseLabel =
    data?.status === "pending"
      ? "대기 중"
      : data?.status === "accepted"
        ? "수용"
        : data?.status === "rejected"
          ? "조정 요청"
          : (data?.status ?? "—");

  return (
    <div className="flex w-full flex-col gap-2.5 rounded-2xl border border-default bg-surface p-4">
      <div className="flex items-center gap-3">
        <CardHeader title={`전송·수용 추적 · BADA LINK`} className="flex-1" />
        {data?.status === "pending" && waitMinutes !== null && (
          <Chip tone="warning">응답 대기 {waitMinutes}분</Chip>
        )}
        {data?.status === "accepted" && <Chip tone="success">수용 완료</Chip>}
        {data?.status === "rejected" && <Chip tone="error">조정 요청</Chip>}
      </div>

      {isPending && <p className="text-body-sm text-secondary">불러오는 중...</p>}
      {error && (
        <p className="text-body-sm text-error">
          {error instanceof ApiError ? error.message : "추적 정보를 불러오지 못했습니다"}
        </p>
      )}

      {data && (
        <>
          <PropertyRow label="권고 생성" value={eventRow(data.input.events, "create") ?? "—"} />
          <PropertyRow label="관제사 승인" value={eventRow(data.input.events, "approve") ?? "—"} />
          <PropertyRow label="전송" value={eventRow(data.input.events, "send") ?? "—"} />
          <PropertyRow label="선박 응답" value={responseLabel} />
          <PropertyRow label="재전송" value="미응답 10분 후 자동 (기준 미정)" />
        </>
      )}
    </div>
  );
}

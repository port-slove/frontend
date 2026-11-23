"use client";

import Image from "next/image";
import { useQuery } from "@tanstack/react-query";

import { CardHeader, Chip, DeductionRow, MapMarker, Progress } from "@/shared/ui";
import { ApiError } from "@/shared/api/client";
import { DEDUCTION_LABEL, reliabilityQueries } from "../_api/reliability";
import { MAP_POSITIONS, SELECTED_VESSEL } from "./reliability-mock-data";

function formatTime(iso: string) {
  return new Intl.DateTimeFormat("ko-KR", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "Asia/Seoul",
  }).format(new Date(iso));
}

export function VesselEvidenceCard() {
  const { data, isPending, error } = useQuery(reliabilityQueries.seohaeStar());

  return (
    <div className="flex w-full flex-1 flex-col gap-4 rounded-2xl border border-default bg-surface p-4">
      <div className="flex items-center gap-3">
        <div className="flex flex-1 flex-col gap-1">
          <p className="text-h2 text-primary">{SELECTED_VESSEL.name}</p>
          <p className="text-caption-md text-secondary">{SELECTED_VESSEL.meta}</p>
        </div>
        {data?.score != null && <Chip tone="error">신뢰도 {data.score}점</Chip>}
      </div>

      <div className="relative h-60 w-full overflow-hidden rounded-lg">
        <Image
          src="/images/dashboard-map.png"
          alt="AIS·레이더 위치 비교"
          fill
          className="object-cover"
        />
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="pointer-events-none absolute inset-0 size-full"
        >
          <line
            x1={MAP_POSITIONS.ais.left}
            y1={MAP_POSITIONS.ais.top}
            x2={MAP_POSITIONS.radar.left}
            y2={MAP_POSITIONS.radar.top}
            stroke="var(--color-error, #f04452)"
            strokeWidth="0.6"
            strokeDasharray="2 1.5"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
        <MapMarker
          status="검증 필요"
          className="absolute -translate-x-1/2 -translate-y-1/2"
          style={{ left: `${MAP_POSITIONS.ais.left}%`, top: `${MAP_POSITIONS.ais.top}%` }}
        />
        <MapMarker
          status="항해 중"
          className="absolute -translate-x-1/2 -translate-y-1/2"
          style={{ left: `${MAP_POSITIONS.radar.left}%`, top: `${MAP_POSITIONS.radar.top}%` }}
        />
        <Chip
          tone="error"
          className="absolute -translate-x-1/2 -translate-y-1/2"
          style={{ left: `${MAP_POSITIONS.aisChip.left}%`, top: `${MAP_POSITIONS.aisChip.top}%` }}
        >
          AIS 위치
        </Chip>
        <Chip
          tone="brand"
          className="absolute -translate-x-1/2 -translate-y-1/2"
          style={{
            left: `${MAP_POSITIONS.radarChip.left}%`,
            top: `${MAP_POSITIONS.radarChip.top}%`,
          }}
        >
          레이더 위치
        </Chip>
      </div>

      {isPending && <p className="text-body-sm text-secondary">신뢰도 계산 중...</p>}
      {error && (
        <p className="text-body-sm text-error">
          {error instanceof ApiError ? error.message : "신뢰도 점수를 불러오지 못했습니다"}
        </p>
      )}

      {data?.score != null && (
        <>
          <div className="flex items-start gap-3">
            <div className="flex flex-1 flex-col gap-2 rounded-lg bg-page p-4">
              <p className="text-caption-md whitespace-nowrap text-secondary">신뢰도</p>
              <div className="flex items-baseline gap-1 whitespace-nowrap">
                <p className="text-h1 text-primary">{data.score}</p>
                <p className="text-body-sm text-secondary">/ 100</p>
              </div>
              <Progress tone={data.score < 40 ? "error" : "success"} value={data.score} />
            </div>
            <div className="flex flex-1 flex-col gap-2 rounded-lg bg-page p-4">
              <p className="text-caption-md whitespace-nowrap text-secondary">공급자 상태</p>
              <p className="text-h1 text-primary">{data.inputs.provider_valid ? "정상" : "실패"}</p>
              <Progress
                tone={data.inputs.provider_valid ? "success" : "error"}
                value={data.inputs.provider_valid ? 100 : 0}
              />
            </div>
            <div className="flex flex-1 flex-col gap-2 rounded-lg bg-page p-4">
              <p className="text-caption-md whitespace-nowrap text-secondary">레이더 일치</p>
              <p className="text-h1 text-primary">{data.inputs.radar_match ? "일치" : "불일치"}</p>
              <Progress
                tone={data.inputs.radar_match ? "success" : "error"}
                value={data.inputs.radar_match ? 100 : 0}
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <CardHeader title="감점 내역" className="flex-1" />
            <p className="text-label-md whitespace-nowrap text-error">100 → {data.score}점</p>
          </div>
          {data.deductions.map((item) => (
            <DeductionRow
              key={item.reason}
              reason={DEDUCTION_LABEL[item.reason] ?? item.reason}
              detail={`관측 ${formatTime(data.inputs.observed_at)}`}
              points={`-${item.points}`}
            />
          ))}
        </>
      )}
    </div>
  );
}

"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import {
  Button,
  CardHeader,
  Chip,
  CompareCard,
  ConfirmDialog,
  InfoChip,
  PropertyRow,
  Toast,
} from "@/shared/ui";
import { ApiError } from "@/shared/api/client";
import { JIT_SCENARIO, jitQueries } from "../_api/jit";

function SendIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" className="size-4">
      <path
        d="M14 2 2 7.2l4.5 1.8L8.5 14 14 2Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path d="M6.5 9 14 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function BellIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" className="size-5">
      <path
        d="M10 3a4 4 0 0 0-4 4v2.5L4.5 12h11L14 9.5V7a4 4 0 0 0-4-4Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path d="M8.5 15a1.5 1.5 0 0 0 3 0" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function ChevronRightIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" className="size-4">
      <path
        d="M6 3.5 10 8l-4 4.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 14 14" fill="none" className="size-3.5">
      <path
        d="M1 1l12 12M13 1 1 13"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function formatTime(iso: string | null) {
  if (!iso) return "—";
  return new Intl.DateTimeFormat("ko-KR", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "Asia/Seoul",
  }).format(new Date(iso));
}

function formatMinutes(hours: number | null) {
  if (hours === null) return "—";
  return `${Math.round(hours * 60)}분`;
}

export function JitCompareCard() {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [showHoldToast, setShowHoldToast] = useState(true);
  const { data, isPending, error } = useQuery(jitQueries.recommendation());

  const current =
    data && data.current_fuel_t !== null
      ? {
          speed: JIT_SCENARIO.currentSpeedKn.toFixed(1),
          arrival: formatTime(data.eta),
          wait: formatMinutes(data.current_wait_hours),
          fuel: `${data.current_fuel_t.toFixed(1)} t`,
          co2: `${(data.current_fuel_t * JIT_SCENARIO.co2TPerFuelT).toFixed(1)} tCO₂`,
        }
      : null;

  const recommended =
    data && data.recommended_speed_kn !== null && data.recommended_fuel_t !== null
      ? {
          speed: data.recommended_speed_kn.toFixed(1),
          arrival: formatTime(data.target_eta),
          wait: formatMinutes(data.recommended_wait_hours),
          fuel: `${data.recommended_fuel_t.toFixed(1)} t`,
          co2: `${(data.recommended_fuel_t * JIT_SCENARIO.co2TPerFuelT).toFixed(1)} tCO₂`,
        }
      : null;

  const waitSavedMinutes =
    data?.current_wait_hours != null && data.recommended_wait_hours != null
      ? Math.round((data.current_wait_hours - data.recommended_wait_hours) * 60)
      : null;

  return (
    <div className="relative flex w-full flex-1 flex-col gap-5 rounded-2xl border border-default bg-surface p-4">
      <div className="flex items-center gap-3">
        <CardHeader title="JIT 권고 비교" className="flex-1" />
        <Chip tone="brand">HANBIT PIONEER</Chip>
      </div>
      <p className="text-caption-md text-secondary">
        {data?.target_eta
          ? `Target ETA ${formatTime(data.target_eta)} · 3부두 B2 가용 시각 기준`
          : "Target ETA 계산 중 · 3부두 B2 가용 시각 기준"}
      </p>

      {isPending && <p className="text-body-sm text-secondary">권고 계산 중...</p>}
      {error && (
        <p className="text-body-sm text-error">
          {error instanceof ApiError ? error.message : "권고 계산에 실패했습니다"}
        </p>
      )}

      {current && recommended && (
        <>
          <div className="flex items-start gap-3">
            <CompareCard
              title="현재 속도 유지"
              speed={current.speed}
              arrival={current.arrival}
              wait={current.wait}
              fuel={current.fuel}
              co2={current.co2}
              className="flex-1"
            />
            <CompareCard
              recommended
              title="JIT 권고 속도"
              speed={recommended.speed}
              arrival={recommended.arrival}
              wait={recommended.wait}
              fuel={recommended.fuel}
              co2={recommended.co2}
              className="flex-1"
            />
          </div>

          <div className="flex items-center gap-2">
            <p className="text-label-md text-secondary">절감 효과</p>
            {waitSavedMinutes !== null && (
              <Chip tone="success">
                대기 {waitSavedMinutes >= 0 ? "-" : "+"}
                {Math.abs(waitSavedMinutes)}분
              </Chip>
            )}
            {data?.fuel_saved_t != null && (
              <Chip tone="success">연료 {data.fuel_saved_t.toFixed(1)} t</Chip>
            )}
            {data?.co2_saved_t != null && (
              <Chip tone="success">CO₂ {data.co2_saved_t.toFixed(1)} tCO₂</Chip>
            )}
          </div>
        </>
      )}

      <div className="flex flex-col gap-2.5">
        <p className="text-label-md text-secondary">반영된 기상 보정 조건</p>
        <div className="flex flex-wrap gap-2">
          <InfoChip label="풍속" value={`${JIT_SCENARIO.windSpeedMps.toFixed(1)} m/s`} />
          <InfoChip label="파고" value={`${JIT_SCENARIO.waveHeightM.toFixed(2)} m`} />
          <InfoChip
            label="조류(항로방향)"
            value={`${JIT_SCENARIO.currentAlongTrackKn.toFixed(2)} kn`}
          />
          {data?.weather_speed_loss_fraction != null && (
            <InfoChip
              label="출력 손실"
              value={`-${(data.weather_speed_loss_fraction * 100).toFixed(1)}%`}
            />
          )}
        </div>
      </div>

      <PropertyRow label="VSR 저속해역" value="준수 · 권고 11.6 kn ≤ 12 kn" />

      <div className="flex items-start gap-2">
        <Button variant="outline" className="h-10 w-30 px-5 text-label-md">
          속도 조정
        </Button>
        <Button
          variant="primary"
          className="h-10 flex-1 px-5 text-label-md"
          onClick={() => setConfirmOpen(true)}
        >
          권고 승인·전송
          <SendIcon />
        </Button>
      </div>

      {showHoldToast && (
        <div className="absolute top-4 right-4 z-20 w-100">
          <Toast
            tone="error"
            icon={<BellIcon />}
            closeIcon={<CloseIcon />}
            actionIcon={<ChevronRightIcon />}
            title="SEOHAE STAR 권고 자동 보류"
            description="신뢰도 32점 · 위치 검증 후 Target ETA의 권고 속도를 다시 계산합니다."
            actionLabel="위치 검증하기"
            time="방금"
            onClose={() => setShowHoldToast(false)}
          />
        </div>
      )}

      {confirmOpen && recommended && (
        <div className="fixed inset-0 z-30 flex items-center justify-center bg-black/40">
          <ConfirmDialog
            icon={<SendIcon />}
            title="HANBIT PIONEER에 권고를 전송할까요?"
            description={`권고 ${recommended.speed} kn · Target ETA ${recommended.arrival} · 3부두 B2`}
            confirmLabel="전송"
            onCancel={() => setConfirmOpen(false)}
            onConfirm={() => setConfirmOpen(false)}
            className="w-105"
          />
        </div>
      )}
    </div>
  );
}

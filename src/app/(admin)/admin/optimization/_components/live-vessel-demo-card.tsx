"use client";

import { useQuery } from "@tanstack/react-query";

import { CardHeader, Chip, CompareCard } from "@/shared/ui";
import { ApiError } from "@/shared/api/client";
import {
  liveVesselJitQueries,
  pickDemoVessel,
  realVesselQueries,
  type RealVessel,
} from "../_api/live-vessel-jit";

const PLACEHOLDER_VESSEL: RealVessel = {
  mmsi: 0,
  port_code: "incheon",
  source_mode: "live",
  position: { latitude: 0, longitude: 0 },
  sog_kn: 0,
  cog_deg: 0,
  received_at_utc: new Date(0).toISOString(),
  freshness: "stale",
  distance_to_port_nm: 0,
  map_state: "stationary",
  reliability: {
    score: 0,
    status: "unknown",
    anomaly: false,
    reasons: [],
    observation_count: 0,
    rule_version: "n/a",
  },
};

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

export function LiveVesselDemoCard() {
  const vesselsQuery = useQuery(realVesselQueries.incheon());
  const vessel = vesselsQuery.data ? pickDemoVessel(vesselsQuery.data.vessels) : null;

  const jitQuery = useQuery({
    ...liveVesselJitQueries.recommendation(vessel ?? PLACEHOLDER_VESSEL),
    enabled: vessel !== null,
  });

  return (
    <div className="flex w-full flex-col gap-4 rounded-2xl border border-dashed border-brand bg-surface p-4">
      <div className="flex items-center gap-3">
        <CardHeader title="실시간 선박 예시 (인천항)" className="flex-1" />
        <Chip tone="brand">인천항 실제 AIS</Chip>
      </div>
      <p className="text-caption-md text-secondary">
        입항 순서·JIT 비교는 Figma 데모 시나리오를 쓰지만, 이 카드만 실제 `/v1/mvp/vessels`에서 지금
        운항 중인 실제 선박 하나를 골라 그 선박의 실제 거리·속도로 JIT을 계산합니다.
      </p>

      {vesselsQuery.isPending && <p className="text-body-sm text-secondary">선박 조회 중...</p>}
      {vesselsQuery.error && (
        <p className="text-body-sm text-error">
          {vesselsQuery.error instanceof ApiError
            ? vesselsQuery.error.message
            : "선박 목록을 불러오지 못했습니다"}
        </p>
      )}
      {vesselsQuery.data && !vessel && (
        <p className="text-body-sm text-secondary">
          지금 조건(운항 중 · 신선한 관측 · 3kn 이상)에 맞는 선박이 없어요.
        </p>
      )}

      {vessel && (
        <>
          <p className="text-label-md text-primary">
            MMSI {vessel.mmsi} · 실제 거리 {vessel.distance_to_port_nm.toFixed(2)}nm · 실제 속도{" "}
            {vessel.sog_kn.toFixed(1)}kn · 신뢰도 {vessel.reliability.score}점
          </p>

          {jitQuery.isPending && <p className="text-body-sm text-secondary">권고 계산 중...</p>}
          {jitQuery.error && (
            <p className="text-body-sm text-error">
              {jitQuery.error instanceof ApiError
                ? jitQuery.error.message
                : "권고 계산에 실패했습니다"}
            </p>
          )}

          {jitQuery.data &&
            (jitQuery.data.current_fuel_t != null && jitQuery.data.recommended_speed_kn != null ? (
              <div className="flex items-start gap-3">
                <CompareCard
                  title="현재 속도 유지"
                  speed={vessel.sog_kn.toFixed(1)}
                  arrival={formatTime(jitQuery.data.eta)}
                  wait={formatMinutes(jitQuery.data.current_wait_hours)}
                  fuel={`${jitQuery.data.current_fuel_t.toFixed(1)} t`}
                  co2={`${(jitQuery.data.current_fuel_t * 3.114).toFixed(1)} tCO₂`}
                  className="flex-1"
                />
                <CompareCard
                  recommended
                  title="JIT 권고 속도"
                  speed={jitQuery.data.recommended_speed_kn.toFixed(1)}
                  arrival={formatTime(jitQuery.data.target_eta)}
                  wait={formatMinutes(jitQuery.data.recommended_wait_hours)}
                  fuel={`${(jitQuery.data.recommended_fuel_t ?? 0).toFixed(1)} t`}
                  co2={`${((jitQuery.data.recommended_fuel_t ?? 0) * 3.114).toFixed(1)} tCO₂`}
                  className="flex-1"
                />
              </div>
            ) : (
              <p className="text-body-sm text-secondary">
                이 선박은 지금 조건으로는 권고를 계산할 수 없어요 (status: {jitQuery.data.status}
                {jitQuery.data.reason ? ` · ${jitQuery.data.reason}` : ""})
              </p>
            ))}
        </>
      )}
    </div>
  );
}

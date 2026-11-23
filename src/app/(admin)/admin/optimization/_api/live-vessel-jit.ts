import { queryOptions } from "@tanstack/react-query";

import { apiClient } from "@/shared/api/client";
import type { JitInput, JitResult } from "./jit";

export interface RealVessel {
  mmsi: number;
  port_code: string;
  source_mode: "live";
  position: { latitude: number; longitude: number };
  sog_kn: number;
  cog_deg: number;
  received_at_utc: string;
  freshness: "fresh" | "stale";
  distance_to_port_nm: number;
  map_state: "stationary" | "under_way" | "verification_required";
  reliability: {
    score: number;
    status: string;
    anomaly: boolean;
    reasons: string[];
    observation_count: number;
    rule_version: string;
  };
}

export interface RealVesselsResult {
  port: string;
  evaluated_at_utc: string;
  data_status: "ok" | "no_observations";
  vessels: RealVessel[];
}

export const realVesselQueries = {
  all: () => ["real-vessels"] as const,
  incheon: () =>
    queryOptions({
      queryKey: [...realVesselQueries.all(), "incheon"],
      queryFn: () =>
        apiClient
          .get<RealVesselsResult>("/v1/mvp/vessels", { params: { port: "incheon" } })
          .then((res) => res.data),
      // AIS 피드는 자주 갱신되므로 짧게 캐싱합니다.
      staleTime: 15_000,
    }),
};

// 입항 중이면서 최근 관측이 신선한 선박 중, 속도가 가장 빠른(=의미 있게 이동 중인) 선박을 고릅니다.
export function pickDemoVessel(vessels: RealVessel[]): RealVessel | null {
  const candidates = vessels.filter(
    (v) => v.map_state === "under_way" && v.freshness === "fresh" && v.sog_kn >= 3,
  );
  if (candidates.length === 0) return null;
  return candidates.reduce((best, v) => (v.sog_kn > best.sog_kn ? v : best));
}

function buildJitInputFromVessel(vessel: RealVessel): JitInput {
  const now = new Date();
  const transitHours = vessel.distance_to_port_nm / vessel.sog_kn;
  // 가용 시각까지 자연 도착 시간의 1.3배를 주어, 거리·속도와 무관하게 항상 실현 가능한
  // 감속 폭(출발 속도 대비) 안에 들어오게 합니다. 고정 분(分) 버퍼는 입항 직전처럼
  // 자연 도착이 몇 분 안 남은 선박에서 required_speed_outside_limits를 유발했습니다.
  const berthAvailableAt = new Date(now.getTime() + transitHours * 1.3 * 3_600_000);
  const minSpeed = Math.max(3, Math.round(vessel.sog_kn * 0.5));
  const maxSpeed = Math.round(vessel.sog_kn * 1.3) + 2;

  return {
    ship_id: `MMSI ${vessel.mmsi}`,
    position_status: "verified",
    observed_at: now.toISOString(),
    received_at: now.toISOString(),
    berth_available_at: berthAvailableAt.toISOString(),
    distance_nm: vessel.distance_to_port_nm,
    current_speed_kn: vessel.sog_kn,
    min_speed_kn: minSpeed,
    max_speed_kn: maxSpeed,
    // 기상 관측(/v1/marine-observation)은 현재 수집 실패 상태라 가정값을 그대로 씁니다.
    wind_speed_mps: 5.0,
    wind_incidence_deg: 90,
    wave_height_m: 0.75,
    current_along_track_kn: 0.58,
    fuel_reference_speed_kn: vessel.sog_kn,
    fuel_reference_t_per_hour: 10,
    anchorage_fuel_t_per_hour: 0.5,
    co2_t_per_fuel_t: 3.114,
  };
}

export const liveVesselJitQueries = {
  recommendation: (vessel: RealVessel) =>
    queryOptions({
      queryKey: ["jit", "live-vessel", vessel],
      queryFn: () =>
        apiClient
          .post<JitResult>("/v1/simulation/jit", buildJitInputFromVessel(vessel))
          .then((res) => res.data),
    }),
};

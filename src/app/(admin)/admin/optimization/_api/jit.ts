import { queryOptions } from "@tanstack/react-query";

import { apiClient } from "@/shared/api/client";

export interface JitInput {
  ship_id: string;
  position_status: "verified" | "unverified" | "invalid";
  observed_at: string;
  received_at: string;
  berth_available_at: string;
  distance_nm: number;
  current_speed_kn: number;
  min_speed_kn: number;
  max_speed_kn: number;
  wind_speed_mps: number;
  wind_incidence_deg: number;
  wave_height_m: number;
  current_along_track_kn: number;
  fuel_reference_speed_kn: number;
  fuel_reference_t_per_hour: number;
  anchorage_fuel_t_per_hour: number;
  co2_t_per_fuel_t: number;
}

export interface JitResult {
  source_mode: "simulation";
  kind: "example_estimate";
  model_version: string;
  status: "held" | "infeasible" | "unavailable" | "available";
  reason: string | null;
  computed_at: string;
  inputs: JitInput;
  weather_speed_loss_fraction: number | null;
  distance_remaining_nm: number | null;
  eta: string | null;
  target_eta: string | null;
  recommended_speed_kn: number | null;
  current_wait_hours: number | null;
  recommended_wait_hours: number | null;
  current_fuel_t: number | null;
  recommended_fuel_t: number | null;
  fuel_saved_t: number | null;
  co2_saved_t: number | null;
}

// HANBIT PIONEER(3부두 B2) 시나리오의 시간 무관 상수값. 백엔드 /v1/simulation/jit는 저장소
// 없이 입력을 그대로 계산해 돌려주는 "계산기" API라, 다른 선박 시나리오는 이 값만 바꾸면 됩니다.
export const JIT_SCENARIO = {
  shipId: "HBP2611",
  distanceNm: 20.4,
  currentSpeedKn: 13.6,
  minSpeedKn: 8,
  maxSpeedKn: 16,
  windSpeedMps: 5.0,
  windIncidenceDeg: 90,
  waveHeightM: 0.75,
  currentAlongTrackKn: 0.58,
  fuelReferenceSpeedKn: 13.6,
  fuelReferenceTPerHour: 12.0,
  anchorageFuelTPerHour: 0.5,
  co2TPerFuelT: 3.114,
};

// observed_at은 서버의 실제 현재 시각 기준으로 잔여 거리를 다시 계산하므로, 호출 시점
// 기준으로 생성해야 과거 시각 때문에 target_time_elapsed로 infeasible 처리되지 않습니다.
// queryFn 안에서만 호출해 렌더링 중 new Date()를 읽지 않도록 합니다.
function buildJitInput(): JitInput {
  // received_at은 observed_at과 같게 둡니다. 약간이라도 미래로 설정하면 요청이 서버에
  // 도달하는 사이 서버 시각을 앞질러 received_in_future로 거절될 수 있습니다.
  const now = new Date();
  const berthAvailableAt = new Date(now.getTime() + (1.5 * 60 + 25) * 60_000);

  return {
    ship_id: JIT_SCENARIO.shipId,
    position_status: "verified",
    observed_at: now.toISOString(),
    received_at: now.toISOString(),
    berth_available_at: berthAvailableAt.toISOString(),
    distance_nm: JIT_SCENARIO.distanceNm,
    current_speed_kn: JIT_SCENARIO.currentSpeedKn,
    min_speed_kn: JIT_SCENARIO.minSpeedKn,
    max_speed_kn: JIT_SCENARIO.maxSpeedKn,
    wind_speed_mps: JIT_SCENARIO.windSpeedMps,
    wind_incidence_deg: JIT_SCENARIO.windIncidenceDeg,
    wave_height_m: JIT_SCENARIO.waveHeightM,
    current_along_track_kn: JIT_SCENARIO.currentAlongTrackKn,
    fuel_reference_speed_kn: JIT_SCENARIO.fuelReferenceSpeedKn,
    fuel_reference_t_per_hour: JIT_SCENARIO.fuelReferenceTPerHour,
    anchorage_fuel_t_per_hour: JIT_SCENARIO.anchorageFuelTPerHour,
    co2_t_per_fuel_t: JIT_SCENARIO.co2TPerFuelT,
  };
}

export const jitQueries = {
  all: () => ["jit"] as const,
  recommendation: () =>
    queryOptions({
      queryKey: [...jitQueries.all(), "recommendation", JIT_SCENARIO.shipId],
      queryFn: () =>
        apiClient.post<JitResult>("/v1/simulation/jit", buildJitInput()).then((res) => res.data),
    }),
};

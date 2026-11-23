import { queryOptions } from "@tanstack/react-query";

import { apiClient } from "@/shared/api/client";
import type { MvpVessel } from "@/app/(admin)/admin/_api/mvp";

export interface ArrivalVessel {
  ship_id: string;
  ship_type: string;
  length_m: number;
  draft_m: number;
  position_status: "verified" | "unverified" | "invalid";
  eta: string;
  service_minutes: number;
}

export interface BerthCandidate {
  berth_id: string;
  available_at: string;
  max_length_m: number;
  max_draft_m: number;
  allowed_ship_types: string[];
}

export interface PlannedCall {
  ship_id: string;
  berth_id: string;
  eta: string;
  starts_at: string;
  ends_at: string;
  wait_hours: number;
}

export interface ArrivalOrderResult {
  source_mode: "simulation";
  kind: "example_plan";
  model_version: string;
  status: "available" | "held" | "unavailable" | "infeasible";
  reason: string | null;
  computed_at: string;
  held_ship_ids: string[];
  incompatible_ship_ids: string[];
  total_wait_hours: number | null;
  calls: PlannedCall[];
}

// 시뮬레이션에 넣을 수 있는 선박 수(선석 후보 3곳 기준 고정값)
export const MAX_SIMULATED_VESSELS = 4;

// 실시간 API(mvpQueries.vessels)에는 선종·길이·흘수·서비스 소요시간이 없어
// 당분간 고정값을 사용합니다. ship_id(MMSI)·선박명만 실데이터로 대체합니다.
const ETA_OFFSET_MINUTES = [90, 165, 215, 265];
const SERVICE_MINUTES = [360, 300, 420, 240];
const SHIP_TYPES = ["container", "container", "tanker", "container"];

// 선석 후보는 아직 실시간 조회 API가 없어 당분간 고정값을 사용합니다.
function buildSimulationBerths(minutes: (m: number) => string): BerthCandidate[] {
  return [
    {
      berth_id: "3B2",
      available_at: minutes(0),
      max_length_m: 220,
      max_draft_m: 12,
      allowed_ship_types: ["container", "bulk", "tanker"],
    },
    {
      berth_id: "4A1",
      available_at: minutes(30),
      max_length_m: 200,
      max_draft_m: 11,
      allowed_ship_types: ["container", "bulk", "tanker"],
    },
    {
      berth_id: "3B1",
      available_at: minutes(60),
      max_length_m: 210,
      max_draft_m: 12,
      allowed_ship_types: ["container", "bulk", "tanker"],
    },
  ];
}

function buildArrivalOrderInput(vessels: MvpVessel[]): {
  observed_at: string;
  received_at: string;
  vessels: ArrivalVessel[];
  berths: BerthCandidate[];
} {
  const now = new Date();
  const minutes = (m: number) => new Date(now.getTime() + m * 60_000).toISOString();

  return {
    observed_at: now.toISOString(),
    received_at: now.toISOString(),
    vessels: vessels.slice(0, MAX_SIMULATED_VESSELS).map((vessel, index) => ({
      ship_id: String(vessel.mmsi),
      ship_type: SHIP_TYPES[index] ?? "container",
      length_m: 190,
      draft_m: 10,
      position_status: "verified",
      eta: minutes(ETA_OFFSET_MINUTES[index] ?? 90 + index * 50),
      service_minutes: SERVICE_MINUTES[index] ?? 300,
    })),
    berths: buildSimulationBerths(minutes),
  };
}

export const arrivalOrderQueries = {
  all: () => ["arrival-order"] as const,
  plan: (vessels: MvpVessel[]) =>
    queryOptions({
      queryKey: [...arrivalOrderQueries.all(), "plan", vessels.map((v) => v.mmsi).join(",")],
      queryFn: () =>
        apiClient
          .post<ArrivalOrderResult>("/v1/simulation/arrival-order", buildArrivalOrderInput(vessels))
          .then((res) => res.data),
      enabled: vessels.length > 0,
    }),
};

import { queryOptions } from "@tanstack/react-query";

import { apiClient } from "@/shared/api/client";

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

// IMO는 arrival-order 응답에 없어 화면 표시용으로만 보유합니다.
export const VESSEL_IMO: Record<string, string> = {
  "HANBIT PIONEER": "IMO 1234561",
  "SEOHAE STAR": "IMO 1234567",
  "BADA LINK": "IMO 9812345",
  "GEUMJEONG 7": "IMO 9734120",
  "NURI TRADER": "IMO 9655011",
};

// SEOHAE STAR는 위치 미검증 상태라 arrival-order에 넣으면 전체 계획이 통째로 보류되므로
// (신뢰도 검사 페이지의 동일 시나리오와 일관되게) 호출 대상에서 빼고 화면에서 "보류"로 고정 표시합니다.
export const HELD_VESSEL_ID = "SEOHAE STAR";

function buildArrivalOrderInput(): {
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
    vessels: [
      {
        ship_id: "HANBIT PIONEER",
        ship_type: "container",
        length_m: 200,
        draft_m: 10,
        position_status: "verified",
        eta: minutes(90),
        service_minutes: 360,
      },
      {
        ship_id: "BADA LINK",
        ship_type: "container",
        length_m: 190,
        draft_m: 10,
        position_status: "verified",
        eta: minutes(165),
        service_minutes: 300,
      },
      {
        ship_id: "GEUMJEONG 7",
        ship_type: "tanker",
        length_m: 170,
        draft_m: 11,
        position_status: "verified",
        eta: minutes(215),
        service_minutes: 420,
      },
      {
        ship_id: "NURI TRADER",
        ship_type: "container",
        length_m: 160,
        draft_m: 8,
        position_status: "verified",
        eta: minutes(265),
        service_minutes: 240,
      },
    ],
    berths: [
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
    ],
  };
}

export const arrivalOrderQueries = {
  all: () => ["arrival-order"] as const,
  plan: () =>
    queryOptions({
      queryKey: [...arrivalOrderQueries.all(), "plan"],
      queryFn: () =>
        apiClient
          .post<ArrivalOrderResult>("/v1/simulation/arrival-order", buildArrivalOrderInput())
          .then((res) => res.data),
    }),
};

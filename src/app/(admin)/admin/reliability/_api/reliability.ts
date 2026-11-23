import { queryOptions } from "@tanstack/react-query";

import { apiClient } from "@/shared/api/client";

export interface ReliabilityInput {
  ship_id: string;
  observed_at: string;
  received_at: string;
  coordinate_valid: boolean;
  provider_valid: boolean;
  position_jump: boolean | null;
  speed_anomaly: boolean | null;
  radar_match: boolean | null;
}

export interface Deduction {
  reason: string;
  points: number;
}

export interface ReliabilityResult {
  source_mode: "simulation";
  kind: "example_estimate";
  model_version: string;
  status: "available" | "unavailable";
  reason: string | null;
  computed_at: string;
  inputs: ReliabilityInput;
  score: number | null;
  deductions: Deduction[];
  alert: boolean | null;
  position_status: "unverified";
  recommendation_status: "held";
  berth_assignment_status: "held";
}

// 백엔드는 감점 사유를 영문 슬러그로 반환합니다 (고정 5개 카테고리, 고정 배점).
export const DEDUCTION_LABEL: Record<string, string> = {
  coordinate_invalid: "좌표 부적합",
  provider_invalid: "공급자 실패",
  position_jump: "위치 급변",
  speed_anomaly: "속도 이상",
  radar_mismatch: "레이더 불일치",
};

// SEOHAE STAR 시나리오: 연속 위치 점프 + AIS·레이더 위치 불일치.
function buildReliabilityInput(): ReliabilityInput {
  const now = new Date();

  return {
    ship_id: "SEOHAE STAR",
    observed_at: now.toISOString(),
    received_at: now.toISOString(),
    coordinate_valid: true,
    provider_valid: true,
    position_jump: true,
    speed_anomaly: false,
    radar_match: false,
  };
}

export const reliabilityQueries = {
  all: () => ["reliability"] as const,
  seohaeStar: () =>
    queryOptions({
      queryKey: [...reliabilityQueries.all(), "seohae-star"],
      queryFn: () =>
        apiClient
          .post<ReliabilityResult>("/v1/simulation/reliability", buildReliabilityInput())
          .then((res) => res.data),
    }),
};

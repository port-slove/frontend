import type { ChipTone } from "@/shared/ui";

import type { MvpMapState, ReliabilityReasonCode } from "../_api/mvp";

export const REASON_LABELS: Record<ReliabilityReasonCode, string> = {
  position_unavailable: "위치 정보 없음",
  position_out_of_range: "위치 범위 이탈",
  provider_invalid: "AIS 수신 무효",
  provider_time_reversal: "수신 시각 역전",
  impossible_speed: "연속 위치 점프 감지",
  sog_mismatch: "보고 속력 불일치",
  duplicate_observation: "중복 수신",
  provider_time_missing: "수신 시각 누락",
};

export const MAP_STATE_LABELS = {
  under_way: "항해 중",
  stationary: "묘박",
  verification_required: "검증 필요",
} as const satisfies Record<MvpMapState, string>;

// 40점: 백엔드 ALERT_SCORE_THRESHOLD
export function trustTone(score: number): Extract<ChipTone, "success" | "warning" | "error"> {
  if (score < 40) return "error";
  if (score < 70) return "warning";
  return "success";
}

import { queryOptions } from "@tanstack/react-query";

import { apiClient } from "@/shared/api/client";

export interface ReliabilityReason {
  code: string;
  points: number;
}

export interface RealVessel {
  mmsi: number;
  port_code: string;
  source_mode: "live";
  sog_kn: number;
  received_at_utc: string;
  freshness: "fresh" | "stale";
  distance_to_port_nm: number;
  map_state: "stationary" | "under_way" | "verification_required";
  reliability: {
    score: number;
    status: string;
    anomaly: boolean;
    reasons: ReliabilityReason[];
    observation_count: number;
  };
}

export interface RealVesselsResult {
  port: string;
  evaluated_at_utc: string;
  data_status: "ok" | "no_observations";
  vessels: RealVessel[];
}

// 백엔드가 주는 건 코드뿐이라(rule_version: mvp-reliability-v1) 화면 표시용으로 번역합니다.
// 목록에 없는 코드는 원문 코드를 그대로 보여줍니다.
export const REASON_LABEL: Record<string, string> = {
  sog_mismatch: "AIS 속력(SOG) 불일치",
  position_jump: "위치 급변",
  stale_observation: "관측 지연",
};

export const liveReviewQueries = {
  all: () => ["live-review-vessels"] as const,
  incheon: () =>
    queryOptions({
      queryKey: [...liveReviewQueries.all(), "incheon"],
      queryFn: () =>
        apiClient
          .get<RealVesselsResult>("/v1/mvp/vessels", { params: { port: "incheon" } })
          .then((res) => res.data),
      staleTime: 15_000,
    }),
};

// 신뢰도 100점 미만(= 감점 사유가 하나라도 있음)인 선박만 "확인 필요"로 봅니다.
export function selectFlaggedVessels(vessels: RealVessel[]): RealVessel[] {
  return vessels
    .filter((v) => v.reliability.score < 100)
    .sort((a, b) => a.reliability.score - b.reliability.score);
}

export function formatReasons(reasons: ReliabilityReason[]) {
  return reasons.map((r) => REASON_LABEL[r.code] ?? r.code).join(" · ");
}

export function formatTime(iso: string) {
  return new Intl.DateTimeFormat("ko-KR", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "Asia/Seoul",
  }).format(new Date(iso));
}

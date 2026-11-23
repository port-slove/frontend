import { queryOptions } from "@tanstack/react-query";

import { apiClient } from "@/shared/api/client";

export type RecommendationStatus =
  "draft" | "approved" | "pending" | "accepted" | "rejected" | "requested" | "completed";

export interface RecommendationEvent {
  action: "create" | "approve" | "send" | "accept" | "reject" | "complete";
  occurred_at: string;
  actor: string;
  note?: string;
}

export interface RecommendationInput {
  record_id: string;
  vessel_id: string;
  events: RecommendationEvent[];
  position_verified: boolean;
}

export interface OperationResult {
  source_mode: "simulation";
  storage: "client_supplied_not_persisted";
  external_transmission: false;
  computed_at: string;
  status: RecommendationStatus;
  input: RecommendationInput;
}

// BADA LINK 권고 전송 시나리오. create(권고 생성) → approve(관제사 승인) → send(전송) 이후
// 아직 선박 응답이 없는 상태로, 호출 시점 기준 과거 오프셋으로 이벤트 시각을 생성합니다.
function buildRecommendationInput(): RecommendationInput {
  const now = new Date();
  const minutesAgo = (m: number) => new Date(now.getTime() - m * 60_000).toISOString();

  return {
    record_id: "bada-link-recommendation",
    vessel_id: "BADA LINK",
    position_verified: true,
    events: [
      { action: "create", occurred_at: minutesAgo(17), actor: "시스템", note: "12.4 → 10.8 kn" },
      { action: "approve", occurred_at: minutesAgo(15), actor: "REVLIS" },
      { action: "send", occurred_at: minutesAgo(8), actor: "REVLIS", note: "채널 미정" },
    ],
  };
}

export const recommendationRecordQueries = {
  all: () => ["recommendation-record"] as const,
  badaLink: () =>
    queryOptions({
      queryKey: [...recommendationRecordQueries.all(), "bada-link"],
      queryFn: () =>
        apiClient
          .post<OperationResult>("/v1/simulation/recommendation-record", buildRecommendationInput())
          .then((res) => res.data),
    }),
};

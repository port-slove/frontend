import { apiClient } from "@/shared/api/client";

export interface IncidentEvent {
  action: "create" | "approve" | "send" | "accept" | "reject" | "complete";
  occurred_at: string;
  actor: string;
  note?: string;
}

export interface IncidentInput {
  record_id: string;
  vessel_id: string;
  events: IncidentEvent[];
  target: "vts" | "coast_guard";
  reason: string;
}

export interface OperationResult {
  source_mode: "simulation";
  storage: "client_supplied_not_persisted";
  external_transmission: false;
  computed_at: string;
  status: "draft" | "approved" | "pending" | "accepted" | "rejected" | "requested" | "completed";
  input: unknown;
}

// "VTS 무선 확인 요청" / "해경 통보"만 실제 target(vts/coast_guard)이 있어 이 API로 기록합니다.
// "레이더 위치로 대체" / "오탐 처리"는 외부 통보가 아니라 내부 판정이라 API 대상이 없습니다.
export const INCIDENT_TARGET: Record<string, "vts" | "coast_guard" | undefined> = {
  vts: "vts",
  "coast-guard": "coast_guard",
};

export function recordIncident(params: {
  target: "vts" | "coast_guard";
  vesselId: string;
  reason: string;
}) {
  const now = new Date();
  const input: IncidentInput = {
    record_id: `${params.vesselId.toLowerCase().replace(/\s+/g, "-")}-${now.getTime()}`,
    vessel_id: params.vesselId,
    target: params.target,
    reason: params.reason,
    events: [
      { action: "create", occurred_at: now.toISOString(), actor: "REVLIS", note: params.reason },
    ],
  };

  return apiClient
    .post<OperationResult>("/v1/simulation/incident-record", input)
    .then((res) => res.data);
}

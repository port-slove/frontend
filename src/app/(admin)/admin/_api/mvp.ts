import { queryOptions } from "@tanstack/react-query";

import { apiClient } from "@/shared/api/client";

// 백엔드 app/api/mvp_routes.py 의 응답 형태를 옮긴 타입입니다.
// OpenAPI 문서에는 응답 스키마가 비어 있어(string) 소스 코드를 기준으로 정의했습니다.

export type PortCode = "incheon" | "busan";

/** 실제 AIS 관측이 쌓여 있는 항만. 부산은 아직 관측 데이터가 없습니다. */
export const ADMIN_PORT: PortCode = "incheon";

/** 화면이 안내하는 자동 갱신 주기(5분)와 맞춥니다. */
const REFETCH_INTERVAL = 5 * 60 * 1000;

export type ReliabilityReasonCode =
  | "position_unavailable"
  | "position_out_of_range"
  | "provider_invalid"
  | "provider_time_reversal"
  | "impossible_speed"
  | "sog_mismatch"
  | "duplicate_observation"
  | "provider_time_missing";

export interface ReliabilityReason {
  code: ReliabilityReasonCode;
  points: number;
}

export interface Reliability {
  score: number;
  status: "ok" | "alert" | "no_data";
  anomaly: boolean;
  reasons: ReliabilityReason[];
  observation_count: number;
  rule_version: string;
}

export type MvpMapState = "under_way" | "stationary" | "verification_required";

export interface MvpVessel {
  mmsi: number;
  port_code: PortCode;
  source_mode: "live";
  position: { latitude: number; longitude: number };
  sog_kn: number;
  cog_deg: number;
  received_at_utc: string;
  freshness: "fresh" | "stale";
  distance_to_port_nm: number;
  map_state: MvpMapState;
  reliability: Reliability;
}

export interface MvpVesselsResponse {
  port: PortCode;
  evaluated_at_utc: string;
  data_status: "ok" | "no_observations";
  vessels: MvpVessel[];
  assumptions: string[];
}

export interface MvpAlert {
  mmsi: number;
  severity: "high" | "medium";
  score: number;
  anomaly: boolean;
  reasons: ReliabilityReason[];
  received_at_utc: string;
  action: "verification_required";
}

export interface MvpAlertsResponse {
  port: PortCode;
  evaluated_at_utc: string;
  alerts: MvpAlert[];
}

export interface MvpKpis {
  port: PortCode;
  evaluated_at_utc: string;
  approaching_vessel_count: number;
  stationary_approaching_count: number;
  alert_count: number;
  acceptance_rate: number | null;
  acceptance_rate_reason: string;
  recommendation_run_id: number | null;
  advised_count: number | null;
  held_count: number | null;
  average_wait_hours_current: number | null;
  fuel_saved_t: number | null;
  co2_saved_tco2: number | null;
  data_status: "ok" | "no_recommendation_run";
  assumptions: string[];
}

export const mvpQueries = {
  all: () => ["mvp"] as const,
  vessels: (port: PortCode = ADMIN_PORT) =>
    queryOptions({
      queryKey: [...mvpQueries.all(), "vessels", port],
      queryFn: () =>
        apiClient
          .get<MvpVesselsResponse>("/v1/mvp/vessels", { params: { port } })
          .then((res) => res.data),
      refetchInterval: REFETCH_INTERVAL,
    }),
  alerts: (port: PortCode = ADMIN_PORT) =>
    queryOptions({
      queryKey: [...mvpQueries.all(), "alerts", port],
      queryFn: () =>
        apiClient
          .get<MvpAlertsResponse>("/v1/mvp/alerts", { params: { port } })
          .then((res) => res.data),
      refetchInterval: REFETCH_INTERVAL,
    }),
  kpis: (port: PortCode = ADMIN_PORT) =>
    queryOptions({
      queryKey: [...mvpQueries.all(), "kpis", port],
      queryFn: () =>
        apiClient.get<MvpKpis>("/v1/mvp/kpis", { params: { port } }).then((res) => res.data),
      refetchInterval: REFETCH_INTERVAL,
    }),
};

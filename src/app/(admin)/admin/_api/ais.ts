import { queryOptions } from "@tanstack/react-query";

import { apiClient } from "@/shared/api/client";

export interface AisStreamMetaData {
  MMSI: number;
  ShipName?: string;
  latitude?: number;
  longitude?: number;
  time_utc?: string;
}

export interface LivePosition {
  source_mode?: "live";
  source?: "aisstream";
  received_at: string;
  observed_at?: null;
  position_status: "invalid" | "unverified";
  reason_codes: string[];
  recommendation_status?: "held";
  berth_assignment_status?: "held";
  raw: {
    MessageType: "PositionReport";
    MetaData: AisStreamMetaData;
  };
}

export interface LiveAisResponse {
  source_mode?: "live";
  status:
    | "not_configured"
    | "invalid_configuration"
    | "dependency_missing"
    | "connecting"
    | "subscribed"
    | "disconnected";
  freshness?: "not_assessed";
  positions?: LivePosition[];
}

export const aisQueries = {
  all: () => ["ais"] as const,
  positions: () =>
    queryOptions({
      queryKey: [...aisQueries.all(), "positions"],
      queryFn: () => apiClient.get<LiveAisResponse>("/v1/ais/positions").then((res) => res.data),
      refetchInterval: 5 * 60 * 1000,
    }),
};

export function toShipNameMap(response: LiveAisResponse) {
  const names = new Map<number, string>();
  for (const position of response.positions ?? []) {
    const name = position.raw.MetaData.ShipName?.trim();
    if (name) names.set(position.raw.MetaData.MMSI, name);
  }
  return names;
}

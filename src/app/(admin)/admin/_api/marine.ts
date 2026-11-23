import { queryOptions } from "@tanstack/react-query";

import { apiClient } from "@/shared/api/client";

// GET /v1/marine-observation (OpenAPI: MarineResponse)

export interface MarineObservation {
  station_id: string;
  observed_at: string;
  received_at: string;
  source: "kma_marine_observation";
  source_mode: "live";
  wind_direction_deg: number | null;
  wind_speed_mps: number | null;
  significant_wave_height_m: number | null;
}

export interface MarineResponse {
  status: "available" | "unavailable";
  attempted_at: string | null;
  observation: MarineObservation | null;
  reason: string | null;
  freshness?: "not_assessed";
}

export const marineQueries = {
  all: () => ["marine"] as const,
  observation: () =>
    queryOptions({
      queryKey: [...marineQueries.all(), "observation"],
      queryFn: () =>
        apiClient.get<MarineResponse>("/v1/marine-observation").then((res) => res.data),
      refetchInterval: 10 * 60 * 1000,
    }),
};

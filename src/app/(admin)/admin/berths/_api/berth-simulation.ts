import { queryOptions } from "@tanstack/react-query";

import { apiClient } from "@/shared/api/client";

import { SCENARIO_ASSIGNMENT, SCENARIO_SEGMENTS, type SegmentKind } from "./scenario";

export interface TimelineSegment {
  segment_id: string;
  berth_id: string;
  ship_id: string;
  kind: SegmentKind;
  starts_at: string;
  ends_at: string;
}

export interface TimelineInput {
  observed_at: string;
  received_at: string;
  view: "today" | "12h" | "48h";
  segments: TimelineSegment[];
}

export interface TimelineResult {
  source_mode?: "simulation";
  status: "available" | "unavailable";
  reason?: string | null;
  computed_at: string;
  inputs: TimelineInput;
  window_starts_at?: string | null;
  window_ends_at?: string | null;
  items?: { segment: TimelineSegment; visible_starts_at: string; visible_ends_at: string }[];
  conflicts?: { berth_id: string; segment_ids: [string, string] }[];
}

export interface BerthCandidate {
  berth_id: string;
  available_at: string;
  max_length_m: number;
  max_draft_m: number;
  allowed_ship_types: string[];
}

export interface BerthInput {
  ship_id: string;
  ship_type: string;
  length_m: number;
  draft_m: number;
  position_status: "verified" | "unverified" | "invalid";
  observed_at: string;
  received_at: string;
  eta: string;
  candidates: BerthCandidate[];
}

export type BerthReasonCode =
  "ship_type_incompatible" | "length_exceeds_limit" | "draft_exceeds_limit";

export interface BerthOptionResult {
  berth_id: string;
  compatible: boolean;
  reason_codes: BerthReasonCode[];
  waiting_hours?: number | null;
  target_eta?: string | null;
}

export interface BerthResult {
  source_mode?: "simulation";
  kind?: "example_estimate";
  model_version?: "example-berth-v1";
  status: "held" | "unavailable" | "available";
  reason?: string | null;
  computed_at: string;
  inputs: BerthInput;
  options?: BerthOptionResult[];
  recommended_berth_id?: string | null;
  target_eta?: string | null;
  waiting_hours?: number | null;
}

// 기기 시계가 서버보다 빠르면 received_in_future 로 거절되므로 기준을 1분 앞당깁니다.
function scenarioClock() {
  const base = Date.now() - 60_000;
  const at = (minutes: number) => new Date(base + minutes * 60_000).toISOString();
  return { now: at(0), at };
}

function buildTimelineInput(): TimelineInput {
  const { now, at } = scenarioClock();
  return {
    observed_at: now,
    received_at: now,
    view: "48h",
    segments: SCENARIO_SEGMENTS.map((segment) => ({
      segment_id: segment.id,
      berth_id: segment.berth,
      ship_id: segment.voyage ?? segment.id,
      kind: segment.kind,
      starts_at: at(segment.startMin),
      ends_at: at(segment.endMin),
    })),
  };
}

function buildBerthInput(): BerthInput {
  const { now, at } = scenarioClock();
  const s = SCENARIO_ASSIGNMENT;
  return {
    ship_id: s.shipId,
    ship_type: s.shipType,
    length_m: s.lengthM,
    draft_m: s.draftM,
    position_status: "verified",
    observed_at: now,
    received_at: now,
    eta: at(s.etaMin),
    candidates: s.candidates.map((c) => ({
      berth_id: c.berth,
      available_at: at(c.availableMin),
      max_length_m: c.maxLengthM,
      max_draft_m: c.maxDraftM,
      allowed_ship_types: c.shipTypes,
    })),
  };
}

export const berthQueries = {
  all: () => ["berth-simulation"] as const,
  timeline: () =>
    queryOptions({
      queryKey: [...berthQueries.all(), "timeline"],
      queryFn: () =>
        apiClient
          .post<TimelineResult>("/v1/simulation/berth-timeline", buildTimelineInput())
          .then((res) => res.data),
    }),
  recommendation: () =>
    queryOptions({
      queryKey: [...berthQueries.all(), "recommendation", SCENARIO_ASSIGNMENT.shipId],
      queryFn: () =>
        apiClient
          .post<BerthResult>("/v1/simulation/berth-recommendation", buildBerthInput())
          .then((res) => res.data),
    }),
};

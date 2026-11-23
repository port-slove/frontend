import type { ChipTone } from "@/shared/ui";

export const VESSEL_ZONE_FILTERS = ["전체", "항해 중", "묘박", "검증 필요"] as const;
export type VesselZoneFilter = (typeof VESSEL_ZONE_FILTERS)[number];

export interface LabeledTone {
  label: string;
  tone: ChipTone;
}

export interface VesselRow {
  id: string;
  name: string;
  identifier: string;
  zone: Exclude<VesselZoneFilter, "전체">;
  distance: string;
  sogCog: string;
  trust: LabeledTone;
  lastReceived: LabeledTone;
}

export interface VesselDetail {
  id: string;
  name: string;
  identifiers: string;
  warning?: { title: string; description: string };
  trust: { value: string; progress: number; tone: "brand" | "error" | "warning" | "success" };
  sog: { value: string; progress: number };
  specs: { label: string; value: string }[];
  tags: LabeledTone[];
}

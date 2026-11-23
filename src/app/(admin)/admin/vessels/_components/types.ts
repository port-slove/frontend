import type { ChipTone } from "@/shared/ui";

// 선박 모니터링 화면 표시용 타입. API 응답은 mappers.ts 에서 이 형태로 바꿉니다.

/** 구역 필터. 백엔드 map_state 로 구분할 수 있는 값만 둡니다. */
export const VESSEL_ZONE_FILTERS = ["전체", "항해 중", "묘박", "검증 필요"] as const;
export type VesselZoneFilter = (typeof VESSEL_ZONE_FILTERS)[number];

export interface LabeledTone {
  label: string;
  tone: ChipTone;
}

export interface VesselRow {
  /** MMSI 문자열. 행 선택 키로 씁니다. */
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

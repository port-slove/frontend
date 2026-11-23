import type { ChipTone } from "@/shared/ui";

// 선박 모니터링 화면 표시용 타입. 백엔드 스펙이 정해지면 API 응답 타입에서 변환합니다.

export const VESSEL_ZONE_FILTERS = [
  "전체",
  "VSR 해역 내",
  "묘박",
  "대기 예상",
  "검증 필요",
] as const;
export type VesselZoneFilter = (typeof VESSEL_ZONE_FILTERS)[number];

export interface LabeledTone {
  label: string;
  tone: ChipTone;
}

export interface VesselRow {
  imo: string;
  name: string;
  typeAndSize: string;
  zone: string;
  sogCog: string;
  advisory: LabeledTone;
  trust: LabeledTone;
  lastReceived: string;
}

export interface VesselDetail {
  imo: string;
  name: string;
  identifiers: string;
  warning?: { title: string; description: string };
  trust: { value: string; progress: number; tone: "brand" | "error" | "warning" | "success" };
  sog: { value: string; progress: number };
  specs: { label: string; value: string }[];
  tags: LabeledTone[];
  /** 최근 2시간 속도. 막대 높이 비율(0~100), 마지막 값이 현재 */
  speedHistory: number[];
}

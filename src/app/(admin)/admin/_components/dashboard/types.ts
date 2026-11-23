import type { ChipTone, MapMarkerStatus } from "@/shared/ui";

// 운영 현황 화면 표시용 타입. 백엔드 스펙이 정해지면 API 응답 타입에서 변환합니다.

export interface DashboardKpi {
  id: string;
  label: string;
  value: string;
  unit?: string;
  delta?: string;
  sub?: string;
  alert?: boolean;
}

export interface VesselMapPoint {
  id: string;
  status: MapMarkerStatus;
  /** 지도 영역 기준 가로 위치 (0~100 %) */
  x: number;
  /** 지도 영역 기준 세로 위치 (0~100 %) */
  y: number;
}

export interface SeaState {
  source: string;
  rows: { label: string; value: string }[];
}

export interface DashboardAlert {
  id: string;
  severity: "error" | "warning";
  title: string;
  meta: string;
  time: string;
}

export interface ArrivalQueueItem {
  order: number;
  vesselName: string;
  imo: string;
  eta: string;
  targetEta: string;
  speed: string;
  berth: string;
  acceptance: { label: string; tone: ChipTone };
}

export interface BerthStatus {
  berth: string;
  state: string;
  meta: string;
  progress: number;
  delayed?: boolean;
}

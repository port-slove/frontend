import type { ScheduleBlockStatus, ToastTone } from "@/shared/ui";

export const BERTH_STATUS_FILTERS = ["전체", "하역 중", "접안 예정", "대기·지연", "보류"] as const;
export type BerthStatusFilter = (typeof BERTH_STATUS_FILTERS)[number];

export interface Pier {
  name: string;
  operator: string;
  berths: string[];
}

/** 시각은 "YYYY-MM-DDTHH:mm" (현지 시각) 형식입니다. */
export interface ScheduleItem {
  id: string;
  berth: string;
  status: ScheduleBlockStatus;
  name: string;
  voyage?: string;
  meta: string;
  start: string;
  end: string;
  /** 툴팁의 상태 문구가 블록 상태와 다를 때만 넣습니다. */
  statusLabel?: string;
  advisory?: string;
}

export interface GanttRange {
  start: string;
  hours: number;
  now: string;
}

export interface AppliedFilter {
  field: string;
  value: string;
}

export interface ScheduleFilterValues {
  searchField: string;
  searchPlaceholder: string;
  period: string;
  periodPreset: string;
  pierCount: string;
  vesselTypeCount: string;
}

export interface BerthOption {
  id: string;
  title: string;
  description: string;
}

export interface AssignmentDraft {
  vesselName: string;
  vesselMeta: string;
  options: BerthOption[];
  selectedOptionId: string;
  message?: string;
}

export interface ScheduleToast {
  id: string;
  tone: ToastTone;
  title: string;
  description: string;
  actionLabel: string;
  time: string;
}

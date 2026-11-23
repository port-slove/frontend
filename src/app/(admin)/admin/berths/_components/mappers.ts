import type { ScheduleBlockStatus } from "@/shared/ui";

import type { BerthReasonCode, BerthResult, TimelineResult } from "../_api/berth-simulation";
import {
  berthLabel,
  SCENARIO_ASSIGNMENT,
  SCENARIO_SEGMENTS,
  type SegmentKind,
} from "../_api/scenario";
import type { AssignmentDraft, BerthStatusFilter, GanttRange, ScheduleItem } from "./types";

const HOUR_MS = 60 * 60 * 1000;
const KST_OFFSET_MS = 9 * HOUR_MS;
const GANTT_HOURS = 48;
const WEEKDAYS = ["일", "월", "화", "수", "목", "금", "토"];

function toKstLocal(ms: number) {
  return new Date(ms + KST_OFFSET_MS).toISOString().slice(0, 16);
}

function kstLocalFromIso(iso: string) {
  return toKstLocal(Date.parse(iso));
}

// 현재 시각이 속한 6시간 구간의 직전 구간부터 48시간
export function toGanttRange(timeline: TimelineResult): GanttRange {
  const nowMs = Date.parse(timeline.computed_at);
  const blockMs = 6 * HOUR_MS;
  const startKstMs = Math.floor((nowMs + KST_OFFSET_MS) / blockMs) * blockMs - blockMs;
  return {
    start: new Date(startKstMs).toISOString().slice(0, 16),
    hours: GANTT_HOURS,
    now: toKstLocal(nowMs),
  };
}

const KIND_STATUS: Record<SegmentKind, ScheduleBlockStatus> = {
  loading: "하역 중",
  scheduled: "접안 예정",
  waiting: "대기 예상",
};

// visible_* 는 지금부터 48h 로 잘린 값이라, 지난 구간도 보이도록 원래 segment 시각으로 그립니다.
export function toScheduleItems(timeline: TimelineResult): ScheduleItem[] {
  const conflicted = new Set((timeline.conflicts ?? []).flatMap((c) => c.segment_ids));
  const meta = new Map(SCENARIO_SEGMENTS.map((s) => [s.id, s]));

  return (timeline.items ?? []).flatMap(({ segment }) => {
    const scenario = meta.get(segment.segment_id);
    if (!scenario) return [];
    return [
      {
        id: segment.segment_id,
        berth: segment.berth_id,
        status: scenario.status ?? KIND_STATUS[segment.kind],
        name: scenario.name,
        voyage: scenario.voyage,
        meta: conflicted.has(segment.segment_id) ? `${scenario.meta} · 일정 겹침` : scenario.meta,
        start: kstLocalFromIso(segment.starts_at),
        end: kstLocalFromIso(segment.ends_at),
        statusLabel: scenario.statusLabel,
        advisory: scenario.advisory,
      },
    ];
  });
}

function minutesLabel(hours: number) {
  return `${Math.round(hours * 60)}분`;
}

export function toRecommendationItem(result: BerthResult): ScheduleItem | null {
  if (result.status !== "available" || !result.recommended_berth_id || !result.target_eta) {
    return null;
  }
  const startMs = Date.parse(result.target_eta);
  return {
    id: `${SCENARIO_ASSIGNMENT.shipId}-recommend`,
    berth: result.recommended_berth_id,
    status: "추천",
    name: SCENARIO_ASSIGNMENT.name,
    voyage: SCENARIO_ASSIGNMENT.shipId,
    meta: `추천 · 대기 ${minutesLabel(result.waiting_hours ?? 0)}`,
    start: toKstLocal(startMs),
    end: toKstLocal(startMs + SCENARIO_ASSIGNMENT.serviceMin * 60_000),
  };
}

const STATUS_GROUP: Record<ScheduleBlockStatus, BerthStatusFilter | null> = {
  "하역 중": "하역 중",
  "접안 예정": "접안 예정",
  "대기 예상": "대기·지연",
  지연: "대기·지연",
  보류: "보류",
  추천: null,
};

// 추천 블록은 필터와 상관없이 보여 줍니다.
export function filterByStatus(items: ScheduleItem[], filter: BerthStatusFilter) {
  if (filter === "전체") return items;
  return items.filter((item) => {
    const group = STATUS_GROUP[item.status];
    return group === null || group === filter;
  });
}

export function toStatusLabels(items: ScheduleItem[]): Record<BerthStatusFilter, string> {
  const count = (filter: BerthStatusFilter) =>
    items.filter((item) => STATUS_GROUP[item.status] === filter).length;
  return {
    전체: `전체 ${items.filter((item) => STATUS_GROUP[item.status] !== null).length}척`,
    "하역 중": `하역 중 ${count("하역 중")}`,
    "접안 예정": `접안 예정 ${count("접안 예정")}`,
    "대기·지연": `대기·지연 ${count("대기·지연")}`,
    보류: `보류 ${count("보류")}`,
  };
}

function dayLabel(local: string) {
  const weekday = WEEKDAYS[new Date(`${local.slice(0, 10)}T00:00:00Z`).getUTCDay()];
  return `${local.slice(5, 7)}.${local.slice(8, 10)}(${weekday})`;
}

export function toScheduleSummary(range: GanttRange) {
  return `시뮬레이션 시나리오 · 현재 ${dayLabel(range.now)} ${range.now.slice(11, 16)}`;
}

export function toPeriodLabel(range: GanttRange) {
  const endMs = Date.parse(`${range.start}:00Z`) + range.hours * HOUR_MS - 1;
  const end = new Date(endMs).toISOString();
  const dot = (local: string) => local.slice(0, 10).replaceAll("-", ".");
  return `${dot(range.start)} – ${dot(end)}`;
}

const BERTH_REASON_LABELS: Record<BerthReasonCode, string> = {
  ship_type_incompatible: "선종 불가",
  length_exceeds_limit: "길이 초과",
  draft_exceeds_limit: "흘수 초과",
};

const RESULT_REASON_LABELS: Record<string, string> = {
  position_not_verified: "위치 검증 전이라 추천이 보류됐어요",
  eta_in_past: "ETA 가 이미 지났어요",
  no_compatible_berth: "입항 가능한 선석이 없어요",
  received_in_future: "기기 시각이 서버보다 빨라 계산하지 못했어요",
};

export function toAssignmentDraft(result: BerthResult): AssignmentDraft {
  const s = SCENARIO_ASSIGNMENT;
  const { inputs } = result;
  const nowMs = Date.parse(result.computed_at);
  const availableAt = new Map(inputs.candidates.map((c) => [c.berth_id, c.available_at]));

  const options = (result.options ?? []).map((option) => {
    const tags = [
      option.berth_id === result.recommended_berth_id && "추천",
      option.berth_id === s.currentBerth && "기존 배정",
    ].filter(Boolean);
    const title = [berthLabel(option.berth_id), ...tags].join(" · ");

    if (!option.compatible) {
      return {
        id: option.berth_id,
        title,
        description: option.reason_codes.map((code) => BERTH_REASON_LABELS[code]).join(" · "),
      };
    }
    const available = availableAt.get(option.berth_id);
    const availability =
      !available || Date.parse(available) <= nowMs
        ? "지금 가용"
        : `${kstLocalFromIso(available).slice(11, 16)} 가용`;
    return {
      id: option.berth_id,
      title,
      description: `${availability} · 예상 묘박 대기 ${minutesLabel(option.waiting_hours ?? 0)}`,
    };
  });

  return {
    vesselName: s.name,
    vesselMeta: `ETA ${kstLocalFromIso(inputs.eta).slice(11, 16)} · ${s.shipType} ${s.dwtLabel} · 흘수 ${s.draftM}m`,
    options,
    selectedOptionId: result.recommended_berth_id ?? options[0]?.id ?? "",
    message:
      result.status === "available"
        ? undefined
        : (RESULT_REASON_LABELS[result.reason ?? ""] ?? "추천을 계산하지 못했어요"),
  };
}

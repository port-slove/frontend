// 퍼블리싱 단계 임시 데이터. 백엔드 API 연동 시 이 파일만 교체하면 됩니다.
export const NEEDS_REVIEW = [
  {
    id: "seohae-star",
    title: "SEOHAE STAR · 32점",
    meta: "AIS·레이더 위치 1.8 NM 불일치",
    time: "14:35",
    selected: true,
  },
  {
    id: "bada-link",
    title: "BADA LINK · 38점",
    meta: "연속 위치 점프 3회",
    time: "14:31",
    selected: false,
  },
];

export const RESOLVED_TODAY = [
  {
    id: "hana-ocean",
    title: "HANA OCEAN · 오탐 처리",
    meta: "묘박 중 GPS 드리프트 · REVLIS",
    time: "11:02",
  },
  {
    id: "dongbang-3",
    title: "DONGBANG 3 · 레이더 대체",
    meta: "AIS 송신기 이상 · REVLIS",
    time: "09:47",
  },
];

export const SELECTED_VESSEL = {
  name: "SEOHAE STAR",
  meta: "IMO 1234567 · 벌크선 82,000DWT · 접근 수로",
  score: "신뢰도 32점",
};

export const MAP_POSITIONS = {
  ais: { left: 36.9, top: 62.5 },
  radar: { left: 64.1, top: 37.5 },
  distanceLabel: { left: 46.5, top: 53.3 },
  aisChip: { left: 27.2, top: 70.8 },
  radarChip: { left: 60.9, top: 20 },
};

export const STATS = [
  { label: "신뢰도", value: "32", unit: "/ 100", tone: "error" as const, progress: 32 },
  { label: "AIS 수신 간격", value: "12", unit: "초", tone: "warning" as const, progress: 40 },
  { label: "레이더 일치율", value: "41", unit: "%", tone: "error" as const, progress: 41 },
];

export const DEDUCTIONS = [
  { reason: "AIS·레이더 위치 불일치", detail: "1.8 NM 차이 · 14:35", points: "-30" },
  { reason: "연속 위치 점프", detail: "3회 · 14:20–14:33", points: "-25" },
  { reason: "AIS 수신 공백", detail: "최대 4분 · 14:12", points: "-13" },
];

export const ACTION_HISTORY = [
  { time: "14:36 · 시스템", action: "권고·배정 자동 보류" },
  { time: "14:35 · 시스템", action: "신뢰도 32점 경고" },
  { time: "14:33 · 시스템", action: "연속 위치 점프 감지" },
];

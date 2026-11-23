import type { MapMarkerStatus } from "@/shared/ui";

// 퍼블리싱 단계 임시 데이터. 백엔드 API 연동 시 이 파일만 교체하면 됩니다.
export const KPI_ITEMS = [
  { label: "접근 선박", value: "18", unit: "척", delta: "↑ 3", sub: "1시간 전 15척" },
  { label: "묘박 대기", value: "4", unit: "척", delta: "↓ 1", sub: "평균 대기 6h 30m" },
  { label: "권고 수용률", value: "82", unit: "%", delta: "↑ 4%", sub: "오늘 권고 22건 중 18건" },
  { label: "오늘 절감 연료", value: "3.5", unit: "t", delta: "↑ 0.6", sub: "CO₂ 10.9 tCO₂ 감축" },
  { label: "확인 필요", value: "8", unit: "건", delta: "↑ 3", sub: "검증 필요 2 · 지연 1" },
];

export const MAP_MARKERS: { left: number; top: number; status: MapMarkerStatus }[] = [
  { left: 47.3, top: 54.3, status: "항해 중" },
  { left: 58.6, top: 71.7, status: "항해 중" },
  { left: 68.7, top: 45.7, status: "항해 중" },
  { left: 42.8, top: 87.0, status: "항해 중" },
  { left: 78.8, top: 82.6, status: "대기 예상" },
  { left: 33.8, top: 78.3, status: "대기 예상" },
  { left: 85.6, top: 65.2, status: "묘박" },
  { left: 89.0, top: 69.6, status: "묘박" },
  { left: 63.1, top: 30.4, status: "검증 필요" },
];

export const SEA_STATE_ROWS = [
  { label: "풍향 · 풍속", value: "NE 76° · 5.0 m/s" },
  { label: "파고 · 주기", value: "0.75 m · 5.5 s" },
  { label: "조류", value: "0.3 m/s · 70°" },
  { label: "가시거리", value: "10.4 km" },
];

export const NEEDS_REVIEW_ALERTS: {
  id: string;
  severity: "error" | "warning";
  title: string;
  meta: string;
  time: string;
}[] = [
  {
    id: "ais-mismatch",
    severity: "error",
    title: "AIS·레이더 위치 불일치",
    meta: "SEOHAE STAR IMO 1234567 · 신뢰도 32",
    time: "14:35",
  },
  {
    id: "position-jump",
    severity: "error",
    title: "연속 위치 점프 감지",
    meta: "BADA LINK IMO 9812345 · 신뢰도 38",
    time: "14:31",
  },
  {
    id: "berth-delay",
    severity: "warning",
    title: "3부두 B2 하역 지연 예측",
    meta: "가용 16:00 → 16:30 · 영향 2척",
    time: "14:27",
  },
];

export const ARRIVAL_QUEUE: {
  order: number;
  name: string;
  imo: string;
  eta: string;
  targetEta: string;
  speed: string;
  berth: string;
  acceptance: "수용" | "보류" | "응답 대기" | "미전송";
}[] = [
  {
    order: 1,
    name: "HANBIT PIONEER",
    imo: "IMO 1234561",
    eta: "16:05",
    targetEta: "16:30",
    speed: "13.6 → 11.6 kn",
    berth: "3부두 B2",
    acceptance: "수용",
  },
  {
    order: 2,
    name: "SEOHAE STAR",
    imo: "IMO 1234567",
    eta: "16:40",
    targetEta: "17:10",
    speed: "—",
    berth: "3부두 B1",
    acceptance: "보류",
  },
  {
    order: 3,
    name: "BADA LINK",
    imo: "IMO 9812345",
    eta: "17:20",
    targetEta: "17:45",
    speed: "12.4 → 10.8 kn",
    berth: "4부두 A2",
    acceptance: "응답 대기",
  },
  {
    order: 4,
    name: "GEUMJEONG 7",
    imo: "IMO 9734120",
    eta: "18:10",
    targetEta: "18:30",
    speed: "15.0 → 11.6 kn",
    berth: "4부두 A1",
    acceptance: "수용",
  },
  {
    order: 5,
    name: "NURI TRADER",
    imo: "IMO 9655011",
    eta: "19:00",
    targetEta: "19:20",
    speed: "11.8 kn 유지",
    berth: "3부두 B3",
    acceptance: "미전송",
  },
];

export const BERTH_TILES: {
  berth: string;
  state: string;
  meta: string;
  progress: number;
  status: "normal" | "delayed";
}[] = [
  { berth: "3부두 B1", state: "하역 중", meta: "~15:30 · 82%", progress: 82, status: "normal" },
  { berth: "3부두 B2", state: "지연 예측", meta: "~16:30 · 64%", progress: 64, status: "delayed" },
  { berth: "3부두 B3", state: "하역 중", meta: "~18:40 · 45%", progress: 45, status: "normal" },
  { berth: "4부두 A1", state: "하역 중", meta: "~18:30 · 70%", progress: 70, status: "normal" },
  { berth: "4부두 A2", state: "하역 중", meta: "~17:20 · 91%", progress: 91, status: "normal" },
  { berth: "4부두 A3", state: "비어 있음", meta: "가용", progress: 0, status: "normal" },
];

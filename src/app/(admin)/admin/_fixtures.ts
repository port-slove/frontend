import type { ArrivalQueueItem, BerthStatus } from "./_components/dashboard/types";

// 퍼블리싱용 Figma 샘플 데이터입니다. 백엔드 API 연동 시 TanStack Query 로 교체합니다.
// 운영 현황의 KPI·지도·해상 상태·확인 필요 카드는 연동을 마쳤고, 입항 순서·선석 현황만 남았습니다.

export const adminUserFixture = {
  name: "REVLIS",
};

export const dashboardFixture = {
  arrivalTotal: 8,
  arrivals: [
    {
      order: 1,
      vesselName: "HANBIT PIONEER",
      imo: "IMO 1234561",
      eta: "16:05",
      targetEta: "16:30",
      speed: "13.6 → 11.6 kn",
      berth: "3부두 B2",
      acceptance: { label: "수용", tone: "success" },
    },
    {
      order: 2,
      vesselName: "SEOHAE STAR",
      imo: "IMO 1234567",
      eta: "16:40",
      targetEta: "17:10",
      speed: "—",
      berth: "3부두 B1",
      acceptance: { label: "보류", tone: "error" },
    },
    {
      order: 3,
      vesselName: "BADA LINK",
      imo: "IMO 9812345",
      eta: "17:20",
      targetEta: "17:45",
      speed: "12.4 → 10.8 kn",
      berth: "4부두 A2",
      acceptance: { label: "응답 대기", tone: "warning" },
    },
    {
      order: 4,
      vesselName: "GEUMJEONG 7",
      imo: "IMO 9734120",
      eta: "18:10",
      targetEta: "18:30",
      speed: "15.0 → 11.6 kn",
      berth: "4부두 A1",
      acceptance: { label: "수용", tone: "success" },
    },
    {
      order: 5,
      vesselName: "NURI TRADER",
      imo: "IMO 9655011",
      eta: "19:00",
      targetEta: "19:20",
      speed: "11.8 kn 유지",
      berth: "3부두 B3",
      acceptance: { label: "미전송", tone: "neutral" },
    },
  ] satisfies ArrivalQueueItem[],
  berths: [
    { berth: "3부두 B1", state: "하역 중", meta: "~15:30 · 82%", progress: 82 },
    { berth: "3부두 B2", state: "지연 예측", meta: "~16:30 · 64%", progress: 64, delayed: true },
    { berth: "3부두 B3", state: "하역 중", meta: "~18:40 · 45%", progress: 45 },
    { berth: "4부두 A1", state: "하역 중", meta: "~18:30 · 70%", progress: 70 },
    { berth: "4부두 A2", state: "하역 중", meta: "~17:20 · 91%", progress: 91 },
    { berth: "4부두 A3", state: "비어 있음", meta: "가용", progress: 0 },
  ] satisfies BerthStatus[],
};

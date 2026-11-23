import type { ChipTone } from "@/shared/ui";

// 퍼블리싱 단계 임시 데이터. 백엔드 API 연동 시 이 파일만 교체하면 됩니다.
export type VsrStatus = "준수" | "감속 필요" | "—";
export type AcceptanceStatus = "검토 중" | "보류" | "응답 대기" | "수용" | "미전송";

export const VSR_TONE: Record<VsrStatus, ChipTone> = {
  준수: "success",
  "감속 필요": "warning",
  "—": "neutral",
};

export const ACCEPTANCE_TONE: Record<AcceptanceStatus, ChipTone> = {
  "검토 중": "brand",
  보류: "error",
  "응답 대기": "warning",
  수용: "success",
  미전송: "neutral",
};

export const ARRIVAL_QUEUE: {
  order: number;
  name: string;
  imo: string;
  eta: string;
  targetEta: string;
  speed: string;
  vsr: VsrStatus;
  acceptance: AcceptanceStatus;
  selected?: boolean;
}[] = [
  {
    order: 1,
    name: "HANBIT PIONEER",
    imo: "IMO 1234561",
    eta: "16:05",
    targetEta: "16:30",
    speed: "13.6 → 11.6 kn",
    vsr: "준수",
    acceptance: "검토 중",
    selected: true,
  },
  {
    order: 2,
    name: "SEOHAE STAR",
    imo: "IMO 1234567",
    eta: "16:40",
    targetEta: "—",
    speed: "—",
    vsr: "—",
    acceptance: "보류",
  },
  {
    order: 3,
    name: "BADA LINK",
    imo: "IMO 9812345",
    eta: "17:20",
    targetEta: "17:45",
    speed: "12.4 → 10.8 kn",
    vsr: "준수",
    acceptance: "응답 대기",
  },
  {
    order: 4,
    name: "GEUMJEONG 7",
    imo: "IMO 9734120",
    eta: "18:10",
    targetEta: "18:30",
    speed: "15.0 → 11.6 kn",
    vsr: "감속 필요",
    acceptance: "수용",
  },
  {
    order: 5,
    name: "NURI TRADER",
    imo: "IMO 9655011",
    eta: "19:00",
    targetEta: "19:20",
    speed: "11.8 kn 유지",
    vsr: "준수",
    acceptance: "미전송",
  },
];

export const TRACKING = {
  vessel: "BADA LINK",
  waitingMinutes: "응답 대기 8분",
  createdAt: "14:18 · 12.4 → 10.8 kn",
  approvedAt: "14:20 · REVLIS",
  sentAt: "14:27 · 채널 미정",
  response: "대기 중",
  resend: "미응답 10분 후 자동 (기준 미정)",
};

export const JIT_COMPARE = {
  vessel: "HANBIT PIONEER",
  code: "HBP2611",
  targetEtaNote: "Target ETA 16:30 · 3부두 B2 가용 시각 기준 (하역 지연 +30분 반영)",
  current: { speed: "13.6", arrival: "16:05", wait: "25분", fuel: "18.4 t", co2: "57.3 tCO₂" },
  recommended: { speed: "11.6", arrival: "16:30", wait: "0분", fuel: "14.9 t", co2: "46.4 tCO₂" },
  savings: [{ label: "대기 -25분" }, { label: "연료 -3.5 t" }, { label: "CO₂ -10.9 tCO₂" }],
  weather: [
    { label: "풍향", value: "NE 76°" },
    { label: "풍속", value: "5.0 m/s" },
    { label: "파고", value: "0.75 m" },
    { label: "조류", value: "0.3 m/s" },
    { label: "출력 손실", value: "-4.2%" },
  ],
  vsrNote: "준수 · 권고 11.6 kn ≤ 12 kn",
};

import type { ChipTone } from "@/shared/ui";

// 퍼블리싱 단계 임시 데이터. 백엔드 API 연동 시 이 파일만 교체하면 됩니다.
export const HISTORY_STATS = [
  { label: "보낸 권고", value: "22", unit: "건" },
  { label: "수용", value: "17", unit: "건", sub: "82%" },
  { label: "조정 요청", value: "2", unit: "건" },
  { label: "수용 불가", value: "1", unit: "건" },
  { label: "미응답", value: "2", unit: "건", sub: "재전송 2" },
  { label: "평균 응답", value: "3분 40초" },
  { label: "절감 연료", value: "41.2", unit: "t", sub: "CO₂ 128t" },
];

export type HistoryResult = "수용" | "조정 요청" | "수용 불가" | "자동 보류" | "미응답";

export const RESULT_TONE: Record<HistoryResult, ChipTone> = {
  수용: "success",
  "조정 요청": "warning",
  "수용 불가": "error",
  "자동 보류": "neutral",
  미응답: "neutral",
};

export const HISTORY_ROWS: {
  sentAt: string;
  name: string;
  recommendation: string;
  targetEta: string;
  result: HistoryResult;
  response: string;
  owner: string;
  note: string;
}[] = [
  {
    sentAt: "14:33",
    name: "BADA LINK",
    recommendation: "12.4 → 10.8 kn",
    targetEta: "17:45",
    result: "조정 요청",
    response: "2분",
    owner: "REVLIS",
    note: "12.0 kn 요청 검토 중",
  },
  {
    sentAt: "14:31",
    name: "HANBIT PIONEER",
    recommendation: "13.6 → 11.6 kn",
    targetEta: "16:30",
    result: "수용",
    response: "4분",
    owner: "REVLIS",
    note: "—",
  },
  {
    sentAt: "14:30",
    name: "GEUMJEONG 7",
    recommendation: "15.0 → 11.6 kn",
    targetEta: "18:30",
    result: "수용 불가",
    response: "6분",
    owner: "REVLIS",
    note: "기관 점검",
  },
  {
    sentAt: "14:22",
    name: "NURI TRADER",
    recommendation: "11.8 kn 유지",
    targetEta: "19:20",
    result: "수용",
    response: "3분",
    owner: "REVLIS",
    note: "—",
  },
  {
    sentAt: "13:58",
    name: "SEOHAE STAR",
    recommendation: "—",
    targetEta: "—",
    result: "자동 보류",
    response: "—",
    owner: "시스템",
    note: "신뢰도 32점",
  },
  {
    sentAt: "12:40",
    name: "PACIFIC LINK",
    recommendation: "12.9 → 11.2 kn",
    targetEta: "03:00",
    result: "수용",
    response: "2분",
    owner: "JINHO",
    note: "하역 완료",
  },
  {
    sentAt: "11:15",
    name: "OCEAN GRACE",
    recommendation: "14.1 → 12.3 kn",
    targetEta: "06:00",
    result: "수용",
    response: "5분",
    owner: "JINHO",
    note: "하역 중",
  },
  {
    sentAt: "10:02",
    name: "BLUE WAVE",
    recommendation: "13.0 → 11.9 kn",
    targetEta: "06:00",
    result: "미응답",
    response: "—",
    owner: "JINHO",
    note: "VHF로 재안내",
  },
  {
    sentAt: "09:47",
    name: "DONGBANG 3",
    recommendation: "12.2 → 10.9 kn",
    targetEta: "12:00 (11.08)",
    result: "수용",
    response: "1분",
    owner: "JINHO",
    note: "—",
  },
];

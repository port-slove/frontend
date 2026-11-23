import type { ScheduleBlockStatus } from "@/shared/ui";

// 퍼블리싱 단계 임시 데이터. 백엔드 API 연동 시 이 파일만 교체하면 됩니다.
export interface GanttBlock {
  id: string;
  start: number;
  end: number;
  status: ScheduleBlockStatus;
  name: string;
  meta: string;
}

export interface GanttRow {
  berth: string;
  blocks: GanttBlock[];
}

export interface GanttGroup {
  pier: string;
  subtitle: string;
  rows: GanttRow[];
}

export const MOCK_BERTH_GROUPS: GanttGroup[] = [
  {
    pier: "3부두",
    subtitle: "정보서비스",
    rows: [
      {
        berth: "B1",
        blocks: [
          {
            id: "b1-1",
            start: 1,
            end: 10,
            status: "하역 중",
            name: "HANBIT PIONEER",
            meta: "HBP2611 · 컨테이너",
          },
          {
            id: "b1-2",
            start: 12,
            end: 22,
            status: "접안 예정",
            name: "SEOHAE STAR",
            meta: "SHS1123 · 벌크",
          },
        ],
      },
      {
        berth: "B2",
        blocks: [
          {
            id: "b2-1",
            start: 3,
            end: 14,
            status: "하역 중",
            name: "GEUMJEONG 7",
            meta: "GJ0007 · 탱커",
          },
          {
            id: "b2-2",
            start: 16,
            end: 28,
            status: "대기 예상",
            name: "BADA LINK",
            meta: "BDL4502 · 컨테이너",
          },
        ],
      },
      {
        berth: "B3",
        blocks: [
          {
            id: "b3-1",
            start: 5,
            end: 17,
            status: "지연",
            name: "BLUE WAVE",
            meta: "BLW2290 · 벌크",
          },
        ],
      },
    ],
  },
  {
    pier: "4부두",
    subtitle: "정보서비스",
    rows: [
      {
        berth: "A1",
        blocks: [
          {
            id: "a1-1",
            start: 0,
            end: 9,
            status: "보류",
            name: "ORION SUN",
            meta: "ORS7781 · 컨테이너",
          },
          {
            id: "a1-2",
            start: 24,
            end: 36,
            status: "하역 중",
            name: "NEPTUNE 3",
            meta: "NPT0033 · 탱커",
          },
        ],
      },
      {
        berth: "A2",
        blocks: [
          {
            id: "a2-1",
            start: 10,
            end: 24,
            status: "추천",
            name: "SILVER TIDE",
            meta: "SLT1890 · 벌크",
          },
        ],
      },
      {
        berth: "A3",
        blocks: [
          {
            id: "a3-1",
            start: 18,
            end: 32,
            status: "접안 예정",
            name: "GOLDEN BAY",
            meta: "GLB4471 · 컨테이너",
          },
        ],
      },
    ],
  },
];

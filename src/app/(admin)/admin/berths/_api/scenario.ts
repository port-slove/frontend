import type { ScheduleBlockStatus } from "@/shared/ui";

import type { Pier } from "../_components/types";

// /v1/simulation/berth-* 입력용 시나리오. 시각은 요청 시점 기준 분 단위 오프셋이며 Figma(14:35 기준)에서 옮겼습니다.
// TODO: 선석 일정 API 가 생기면 교체합니다.

export const SCENARIO_PIERS: Pier[] = [
  { name: "3부두", operator: "정보서비스", berths: ["B1", "B2", "B3"] },
  { name: "4부두", operator: "정보서비스", berths: ["A1", "A2", "A3"] },
];

export type SegmentKind = "loading" | "scheduled" | "waiting";

export interface ScenarioSegment {
  id: string;
  berth: string;
  kind: SegmentKind;
  startMin: number;
  endMin: number;
  name: string;
  voyage?: string;
  meta: string;
  status?: ScheduleBlockStatus;
  statusLabel?: string;
  advisory?: string;
}

export const SCENARIO_SEGMENTS: ScenarioSegment[] = [
  {
    id: "kst2610",
    berth: "B1",
    kind: "loading",
    startMin: -755,
    endMin: 55,
    name: "KOREA STAR",
    voyage: "KST2610",
    meta: "KST2610 · 컨테이너",
  },
  {
    id: "seohae-star",
    berth: "B1",
    kind: "scheduled",
    startMin: 155,
    endMin: 925,
    name: "SEOHAE STAR",
    meta: "배정 보류 · 신뢰도 32",
    status: "보류",
  },
  {
    id: "pcl2611",
    berth: "B2",
    kind: "loading",
    startMin: -695,
    endMin: 85,
    name: "PACIFIC LINK",
    voyage: "PCL2611",
    meta: "PCL2611 · 컨테이너",
  },
  {
    id: "hbp2611",
    berth: "B2",
    kind: "scheduled",
    startMin: 115,
    endMin: 1045,
    name: "HANBIT PIONEER",
    voyage: "HBP2611",
    meta: "HBP2611 · 컨테이너",
    status: "지연",
    statusLabel: "접안 예정",
    advisory: "13.6 → 11.6 kn · 수용",
  },
  {
    id: "dbg2611",
    berth: "B2",
    kind: "scheduled",
    startMin: 1285,
    endMin: 2125,
    name: "DONGBANG 3",
    voyage: "DBG2611",
    meta: "DBG2611 · RO-RO",
  },
  {
    id: "ocg2611",
    berth: "B3",
    kind: "loading",
    startMin: -515,
    endMin: 245,
    name: "OCEAN GRACE",
    voyage: "OCG2611",
    meta: "OCG2611 · 벌크",
  },
  {
    id: "nrt2611",
    berth: "B3",
    kind: "scheduled",
    startMin: 285,
    endMin: 1165,
    name: "NURI TRADER",
    voyage: "NRT2611",
    meta: "NRT2611 · 일반화물",
  },
  {
    id: "snr2611",
    berth: "A1",
    kind: "loading",
    startMin: -515,
    endMin: 235,
    name: "SUNRISE",
    voyage: "SNR2611",
    meta: "SNR2611 · 탱커",
  },
  {
    id: "gj72611",
    berth: "A1",
    kind: "scheduled",
    startMin: 235,
    endMin: 985,
    name: "GEUMJEONG 7",
    voyage: "GJ72611",
    meta: "GJ72611 · 탱커",
  },
  {
    id: "blw2611",
    berth: "A2",
    kind: "loading",
    startMin: -515,
    endMin: 165,
    name: "BLUE WAVE",
    voyage: "BLW2611",
    meta: "BLW2611 · 컨테이너",
  },
  {
    id: "bdl2611",
    berth: "A2",
    kind: "scheduled",
    startMin: 190,
    endMin: 1105,
    name: "BADA LINK",
    voyage: "BDL2611",
    meta: "BDL2611 · 컨테이너",
  },
  {
    id: "hana-ocean",
    berth: "A2",
    kind: "waiting",
    startMin: 1405,
    endMin: 2245,
    name: "HANA OCEAN",
    meta: "묘박 대기 예상",
  },
];

export const SCENARIO_ASSIGNMENT = {
  shipId: "GJ72611",
  name: "GEUMJEONG 7",
  shipType: "탱커",
  dwtLabel: "45,000DWT",
  lengthM: 183,
  draftM: 12.1,
  etaMin: 215,
  serviceMin: 760,
  currentBerth: "A1",
  candidates: [
    {
      berth: "A3",
      availableMin: 0,
      maxLengthM: 300,
      maxDraftM: 14,
      shipTypes: ["탱커", "컨테이너"],
    },
    {
      berth: "A1",
      availableMin: 235,
      maxLengthM: 250,
      maxDraftM: 13,
      shipTypes: ["탱커"],
    },
  ],
};

export function berthLabel(berth: string) {
  const pier = SCENARIO_PIERS.find((p) => p.berths.includes(berth));
  return pier ? `${pier.name} ${berth}` : berth;
}

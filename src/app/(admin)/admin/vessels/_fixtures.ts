import type { VesselDetail, VesselRow } from "./_components/types";

// 퍼블리싱용 Figma 샘플 데이터입니다. 백엔드 API 연동 시 TanStack Query 로 교체합니다.
// 상세 정보는 Figma 에 SEOHAE STAR 한 척만 있어서 그 선박만 넣었습니다.

export const vesselMonitorFixture = {
  summary: "총 18척 · 실시간 수신 중",
  total: 8,
  initialSelectedImo: "IMO 1234567",
  vessels: [
    {
      imo: "IMO 1234561",
      name: "HANBIT PIONEER",
      typeAndSize: "컨테이너 · 13,000TEU",
      zone: "VSR 해역",
      sogCog: "13.6kn · 342°",
      advisory: { label: "수용", tone: "success" },
      trust: { label: "92", tone: "success" },
      lastReceived: "2초 전",
    },
    {
      imo: "IMO 1234567",
      name: "SEOHAE STAR",
      typeAndSize: "벌크 · 82,000DWT",
      zone: "접근 수로",
      sogCog: "11.8kn · 015°",
      advisory: { label: "보류", tone: "error" },
      trust: { label: "32", tone: "error" },
      lastReceived: "5초 전",
    },
    {
      imo: "IMO 9812345",
      name: "BADA LINK",
      typeAndSize: "컨테이너 · 8,600TEU",
      zone: "VSR 해역",
      sogCog: "12.4kn · 330°",
      advisory: { label: "응답 대기", tone: "warning" },
      trust: { label: "38", tone: "error" },
      lastReceived: "3초 전",
    },
    {
      imo: "IMO 9734120",
      name: "GEUMJEONG 7",
      typeAndSize: "탱커 · 45,000DWT",
      zone: "외항",
      sogCog: "15.0kn · 290°",
      advisory: { label: "수용", tone: "success" },
      trust: { label: "88", tone: "success" },
      lastReceived: "1초 전",
    },
    {
      imo: "IMO 9655011",
      name: "NURI TRADER",
      typeAndSize: "일반화물 · 12,000DWT",
      zone: "외항",
      sogCog: "11.8kn · 300°",
      advisory: { label: "미전송", tone: "neutral" },
      trust: { label: "76", tone: "warning" },
      lastReceived: "4초 전",
    },
    {
      imo: "IMO 9581223",
      name: "HANA OCEAN",
      typeAndSize: "컨테이너 · 4,200TEU",
      zone: "묘박지",
      sogCog: "0.2kn · —",
      advisory: { label: "대기", tone: "neutral" },
      trust: { label: "90", tone: "success" },
      lastReceived: "6초 전",
    },
    {
      imo: "IMO 9477802",
      name: "DONGBANG 3",
      typeAndSize: "RO-RO · 6,500CEU",
      zone: "묘박지",
      sogCog: "0.1kn · —",
      advisory: { label: "대기", tone: "neutral" },
      trust: { label: "56", tone: "warning" },
      lastReceived: "8초 전",
    },
  ] satisfies VesselRow[],
  details: [
    {
      imo: "IMO 1234567",
      name: "SEOHAE STAR",
      identifiers: "IMO 1234567 · MMSI 440198765",
      warning: {
        title: "위치 검증 필요 · 권고 자동 보류",
        description: "AIS·레이더 위치 1.8 NM 불일치 (14:35)",
      },
      trust: { value: "32", progress: 32, tone: "error" },
      sog: { value: "11.8", progress: 60 },
      specs: [
        { label: "선종 · 크기", value: "벌크선 · 82,000DWT" },
        { label: "길이 · 폭", value: "229m · 32.3m" },
        { label: "흘수", value: "14.2m" },
        { label: "배정 선석", value: "3부두 B1 (보류)" },
        { label: "선사", value: "[선사명] · 운항팀" },
      ],
      tags: [
        { label: "접근 수로", tone: "brand" },
        { label: "벌크", tone: "neutral" },
        { label: "검증 필요", tone: "error" },
      ],
      // Figma 막대 높이(px, 최대 64)를 % 로 환산한 값
      speedHistory: [62.5, 68.75, 71.88, 65.63, 75, 81.25, 78.13, 84.38, 90.63, 87.5, 93.75, 71.88],
    },
  ] satisfies VesselDetail[],
};

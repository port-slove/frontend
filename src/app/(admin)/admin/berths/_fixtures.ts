import type { ScheduleFilterValues, ScheduleToast } from "./_components/types";

// 아직 API 가 없는 필터 문구와 알림 토스트입니다.

export const scheduleFilterFixture = {
  searchField: "선명 / 항차",
  searchPlaceholder: "선명 또는 항차를 입력하세요 (HANBIT PIONEER, HBP2611 …)",
  periodPreset: "오늘 ~ +2일",
  pierCount: "6/6",
  vesselTypeCount: "5/5",
} satisfies Omit<ScheduleFilterValues, "period">;

export const scheduleInitialFilters = [{ field: "선명", value: "GEUMJEONG 7" }];

export const scheduleToastsFixture = [
  {
    id: "b2-delay",
    tone: "warning",
    title: "3부두 B2 하역 지연 예측 +30분",
    description: "진행률 64% · 가용 16:00 → 16:30 · HANBIT PIONEER 권고가 자동 갱신됐습니다",
    actionLabel: "영향 권고 확인",
    time: "1분 전",
  },
  {
    id: "seohae-hold",
    tone: "error",
    title: "SEOHAE STAR 선석 배정 보류",
    description: "신뢰도 32점 · 위치 검증 전까지 3부두 B1 배정이 보류됩니다",
    actionLabel: "위치 검증하기",
    time: "방금",
  },
] satisfies ScheduleToast[];

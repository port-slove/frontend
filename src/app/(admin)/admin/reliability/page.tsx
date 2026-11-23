import { PageTitle, Tab } from "@/shared/ui";
import { VesselActionPanel } from "./_components/vessel-action-panel";
import { VesselEvidenceCard } from "./_components/vessel-evidence-card";
import { VesselReviewList } from "./_components/vessel-review-list";

function HistoryIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" className="size-4">
      <circle cx="8" cy="8.5" r="5.5" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M8 5.5V8.5L10 10"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Page() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <PageTitle title="신뢰도 검사" subtitle="기준 40점 미만 또는 항적 이상 · 검증 필요 2척" />
        <div className="flex items-center gap-3">
          <button
            type="button"
            className="flex h-10 items-center gap-2 px-5 text-label-md whitespace-nowrap text-secondary"
          >
            조치 이력
            <HistoryIcon />
          </button>
          <div className="flex items-center gap-1 rounded-md bg-surface p-1.5">
            <Tab active>검증 필요</Tab>
            <Tab>처리 완료</Tab>
            <Tab>전체</Tab>
          </div>
        </div>
      </div>

      <div className="flex items-start gap-4">
        <VesselReviewList />
        <VesselEvidenceCard />
        <VesselActionPanel />
      </div>
    </div>
  );
}

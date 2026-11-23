import { Button, PageTitle } from "@/shared/ui";
import { ArrivalQueueCard } from "./_components/arrival-queue-card";
import { BerthStatusCard } from "./_components/berth-status-card";
import { DashboardKpis } from "./_components/dashboard-kpis";
import { NeedsReviewCard } from "./_components/needs-review-card";
import { SeaStateCard } from "./_components/sea-state-card";
import { VesselMapCard } from "./_components/vessel-map-card";

function ChevronDownIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" className="size-4">
      <path
        d="M4 6l4 4 4-4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ExportIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" className="size-4">
      <path
        d="M8 2v8m0 0L5 7m3 3 3-3M3 13h10"
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
        <PageTitle title="항만 운항 현황" subtitle="마지막 갱신 14:35 · 5분마다 자동 갱신" />
        <div className="flex items-center gap-3">
          <Button variant="outline" className="h-10 px-5 text-label-md">
            오늘
            <ChevronDownIcon />
          </Button>
          <Button variant="outline" className="h-10 px-5 text-label-md">
            내보내기
            <ExportIcon />
          </Button>
        </div>
      </div>

      <DashboardKpis />

      <div className="flex items-start gap-4">
        <VesselMapCard />
        <div className="flex h-full flex-1 flex-col gap-4">
          <SeaStateCard />
          <NeedsReviewCard />
        </div>
      </div>

      <div className="flex items-start gap-4">
        <ArrivalQueueCard />
        <BerthStatusCard />
      </div>
    </div>
  );
}

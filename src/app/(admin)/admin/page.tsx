import { Button, ChevronDownIcon, ExportIcon } from "@/shared/ui";

import { ArrivalQueueCard } from "./_components/dashboard/arrival-queue-card";
import { BerthStatusCard } from "./_components/dashboard/berth-status-card";
import {
  AlertsSection,
  DashboardTitle,
  KpiSection,
  SeaStateSection,
  VesselMapSection,
} from "./_components/dashboard/dashboard-sections";
import { dashboardFixture as data } from "./_fixtures";

export default function Page() {
  return (
    <>
      <div className="flex items-center justify-between">
        <DashboardTitle />
        <div className="flex items-center gap-3">
          <Button variant="outline" size="md">
            오늘
            <ChevronDownIcon />
          </Button>
          <Button variant="outline" size="md">
            내보내기
            <ExportIcon />
          </Button>
        </div>
      </div>

      <KpiSection />

      <div className="flex gap-4">
        <VesselMapSection />
        <div className="flex w-128 shrink-0 flex-col gap-4">
          <SeaStateSection />
          <AlertsSection />
        </div>
      </div>

      {/* TODO: 선석 가용 시각·선박 제원을 받을 API 가 생기면 POST /v1/mvp/recommendations 로 연동 */}
      <div className="flex items-start gap-4">
        <ArrivalQueueCard items={data.arrivals} total={data.arrivalTotal} />
        <BerthStatusCard berths={data.berths} />
      </div>
    </>
  );
}

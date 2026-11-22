import { Button, ChevronDownIcon, ExportIcon, PageTitle } from "@/shared/ui";

import { AlertsCard } from "./_components/dashboard/alerts-card";
import { ArrivalQueueCard } from "./_components/dashboard/arrival-queue-card";
import { BerthStatusCard } from "./_components/dashboard/berth-status-card";
import { KpiRow } from "./_components/dashboard/kpi-row";
import { SeaStateCard } from "./_components/dashboard/sea-state-card";
import { VesselMapCard } from "./_components/dashboard/vessel-map-card";
import { dashboardFixture as data } from "./_fixtures";

export default function Page() {
  return (
    <>
      <div className="flex items-center justify-between">
        <PageTitle title="항만 운항 현황" subtitle={data.updatedAt} />
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

      <KpiRow items={data.kpis} />

      <div className="flex gap-4">
        <VesselMapCard points={data.mapPoints} total={data.mapTotal} />
        <div className="flex w-128 shrink-0 flex-col gap-4">
          <SeaStateCard seaState={data.seaState} />
          <AlertsCard alerts={data.alerts} total={data.alertTotal} />
        </div>
      </div>

      <div className="flex items-start gap-4">
        <ArrivalQueueCard items={data.arrivals} total={data.arrivalTotal} />
        <BerthStatusCard berths={data.berths} />
      </div>
    </>
  );
}

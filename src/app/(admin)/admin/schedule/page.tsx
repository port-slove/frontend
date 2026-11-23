import { PageTitle } from "@/shared/ui";
import { AssignmentDrawer } from "./_components/assignment-drawer";
import { BerthGantt } from "./_components/berth-gantt";
import { ScheduleActions, ScheduleFilters } from "./_components/schedule-filters";
import { ScheduleLegend } from "./_components/schedule-legend";
import { MOCK_BERTH_GROUPS } from "./_components/schedule-mock-data";
import { ScheduleToasts } from "./_components/schedule-toasts";

export default function Page() {
  return (
    <div className="relative flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <PageTitle title="선석 스케줄" subtitle="부두별 선석 배정 현황을 확인하고 관리하세요" />
        <ScheduleActions />
      </div>

      <ScheduleFilters />

      <div className="absolute top-32 right-0 z-20">
        <ScheduleToasts />
      </div>

      <div className="flex items-start gap-5">
        <div className="flex min-w-0 flex-1 flex-col gap-3">
          <BerthGantt groups={MOCK_BERTH_GROUPS} />
          <ScheduleLegend />
        </div>
        <AssignmentDrawer />
      </div>
    </div>
  );
}

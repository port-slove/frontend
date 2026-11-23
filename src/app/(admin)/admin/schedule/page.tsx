import { DateRange, FilterChip, PageTitle, SelectField, Toggle } from "@/shared/ui";
import { AssignmentDrawer } from "./_components/assignment-drawer";
import { BerthGantt } from "./_components/berth-gantt";
import { ScheduleLegend } from "./_components/schedule-legend";
import { MOCK_BERTH_GROUPS } from "./_components/schedule-mock-data";

export default function Page() {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <PageTitle title="선석 스케줄" subtitle="부두별 선석 배정 현황을 확인하고 관리하세요" />
        <div className="flex items-center gap-3">
          <DateRange range="11.07(토) – 11.08(일)" />
          <div className="w-40">
            <SelectField value="부두 전체" />
          </div>
          <FilterChip field="상태" value="전체" />
          <label className="flex items-center gap-2">
            <span className="text-label-md text-secondary">항적 표시</span>
            <Toggle checked={false} />
          </label>
        </div>
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

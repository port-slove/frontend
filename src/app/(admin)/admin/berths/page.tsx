import { BerthSchedule } from "./_components/berth-schedule";
import { scheduleFilterFixture, scheduleInitialFilters, scheduleToastsFixture } from "./_fixtures";

export default function Page() {
  return (
    <BerthSchedule
      filterValues={scheduleFilterFixture}
      initialFilters={scheduleInitialFilters}
      toasts={scheduleToastsFixture}
    />
  );
}

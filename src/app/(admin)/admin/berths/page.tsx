import { BerthSchedule } from "./_components/berth-schedule";
import { berthScheduleFixture } from "./_fixtures";

export default function Page() {
  return <BerthSchedule {...berthScheduleFixture} />;
}

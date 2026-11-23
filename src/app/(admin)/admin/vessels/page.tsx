import { VesselMonitor } from "./_components/vessel-monitor";
import { vesselMonitorFixture } from "./_fixtures";

export default function Page() {
  return <VesselMonitor {...vesselMonitorFixture} />;
}

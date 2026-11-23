import { KpiCard } from "@/shared/ui";
import { KPI_ITEMS } from "./dashboard-mock-data";

export function DashboardKpis() {
  return (
    <div className="flex w-full items-start gap-4">
      {KPI_ITEMS.map((item) => (
        <KpiCard key={item.label} className="flex-1" {...item} />
      ))}
    </div>
  );
}

import { AlertIcon, IconCircle, KpiCard } from "@/shared/ui";

import type { DashboardKpi } from "./types";

export function KpiRow({ items }: { items: DashboardKpi[] }) {
  return (
    <section className="grid grid-cols-5 gap-4">
      {items.map(({ id, alert, ...kpi }) => (
        <KpiCard
          key={id}
          {...kpi}
          icon={alert ? <IconCircle tone="error" icon={<AlertIcon />} /> : undefined}
        />
      ))}
    </section>
  );
}

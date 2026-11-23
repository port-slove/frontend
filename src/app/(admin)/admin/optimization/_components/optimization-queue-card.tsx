import { CardHeader, Chip, TableCell, TableHeaderCell, TableVesselCell } from "@/shared/ui";
import { ACCEPTANCE_TONE, ARRIVAL_QUEUE, VSR_TONE } from "./optimization-mock-data";
import { cn } from "@/shared/lib/cn";

export function OptimizationQueueCard() {
  return (
    <div className="flex w-full flex-col gap-1 rounded-2xl border border-default bg-surface p-4">
      <div className="flex items-center gap-3">
        <CardHeader
          title="입항 순서"
          badge={<span className="text-label-sm text-secondary">8건</span>}
          className="flex-1"
        />
        <Chip tone="warning">VSR 기준 12 kn</Chip>
      </div>
      <table className="w-full">
        <thead>
          <tr className="bg-page">
            <TableHeaderCell align="center" className="w-12">
              순서
            </TableHeaderCell>
            <TableHeaderCell className="w-47.5">선박</TableHeaderCell>
            <TableHeaderCell className="w-22.5">ETA</TableHeaderCell>
            <TableHeaderCell className="w-25">Target ETA</TableHeaderCell>
            <TableHeaderCell className="w-37.5">현재 → 권고</TableHeaderCell>
            <TableHeaderCell align="center" className="w-25.5">
              VSR
            </TableHeaderCell>
            <TableHeaderCell align="center" className="w-30">
              수용 상태
            </TableHeaderCell>
          </tr>
        </thead>
        <tbody>
          {ARRIVAL_QUEUE.map((row) => (
            <tr key={row.order} className={cn(row.selected && "bg-brand-subtle")}>
              <TableCell align="center" type="muted">
                {row.order}
              </TableCell>
              <TableVesselCell name={row.name} imo={row.imo} />
              <TableCell>{row.eta}</TableCell>
              <TableCell type="strong">{row.targetEta}</TableCell>
              <TableCell>{row.speed}</TableCell>
              <TableCell align="center">
                <Chip tone={VSR_TONE[row.vsr]}>{row.vsr}</Chip>
              </TableCell>
              <TableCell align="center">
                <Chip tone={ACCEPTANCE_TONE[row.acceptance]}>{row.acceptance}</Chip>
              </TableCell>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

import { Button, CardHeader, Chip, TableCell, TableHeaderCell, TableVesselCell } from "@/shared/ui";
import { ARRIVAL_QUEUE } from "./dashboard-mock-data";

const ACCEPTANCE_TONE = {
  수용: "success",
  보류: "error",
  "응답 대기": "warning",
  미전송: "neutral",
} as const;

function ArrowRightIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" className="size-4">
      <path
        d="M3 8h10M9 4l4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ArrivalQueueCard() {
  return (
    <div className="flex h-full w-230 shrink-0 flex-col gap-1 rounded-2xl border border-default bg-surface p-4">
      <div className="flex items-center gap-3">
        <CardHeader
          title="입항 순서"
          badge={<span className="text-label-sm text-secondary">8건</span>}
          className="flex-1"
        />
        <Button variant="ghost" className="h-10 px-5 text-label-md text-secondary">
          입항 최적화
          <ArrowRightIcon />
        </Button>
      </div>
      <table className="w-full">
        <thead>
          <tr className="bg-page">
            <TableHeaderCell align="center" className="w-14">
              순서
            </TableHeaderCell>
            <TableHeaderCell className="w-50">선박</TableHeaderCell>
            <TableHeaderCell className="w-27.5">ETA</TableHeaderCell>
            <TableHeaderCell className="w-27.5">Target ETA</TableHeaderCell>
            <TableHeaderCell className="w-39">현재 → 권고</TableHeaderCell>
            <TableHeaderCell className="w-30">배정 선석</TableHeaderCell>
            <TableHeaderCell align="center" className="w-30">
              수용 상태
            </TableHeaderCell>
          </tr>
        </thead>
        <tbody>
          {ARRIVAL_QUEUE.map((row) => (
            <tr key={row.order}>
              <TableCell align="center" type="muted">
                {row.order}
              </TableCell>
              <TableVesselCell name={row.name} imo={row.imo} />
              <TableCell>{row.eta}</TableCell>
              <TableCell type="strong">{row.targetEta}</TableCell>
              <TableCell>{row.speed}</TableCell>
              <TableCell>{row.berth}</TableCell>
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

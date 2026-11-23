import {
  ArrowRightIcon,
  Button,
  Card,
  CardHeader,
  Chip,
  TableCell,
  TableHeaderCell,
  TableVesselCell,
} from "@/shared/ui";

import type { ArrivalQueueItem } from "./types";

export function ArrivalQueueCard({ items, total }: { items: ArrivalQueueItem[]; total: number }) {
  return (
    <Card variant="outlined" className="flex-1 gap-1">
      <div className="flex items-center gap-3">
        <CardHeader title="입항 순서" badge={<Chip>{total}건</Chip>} className="flex-1" />
        {/* TODO: 입항 최적화 화면이 생기면 링크로 연결 */}
        <Button variant="ghost" size="md">
          입항 최적화
          <ArrowRightIcon />
        </Button>
      </div>

      <table className="w-full table-fixed border-separate border-spacing-0">
        <colgroup>
          <col className="w-14" />
          <col className="w-50" />
          <col className="w-27.5" />
          <col className="w-27.5" />
          <col className="w-39" />
          <col className="w-30" />
          <col className="w-30" />
        </colgroup>
        <thead>
          <tr className="bg-page [&>th:first-child]:rounded-l-md [&>th:last-child]:rounded-r-md">
            <TableHeaderCell align="center">순서</TableHeaderCell>
            <TableHeaderCell>선박</TableHeaderCell>
            <TableHeaderCell>ETA</TableHeaderCell>
            <TableHeaderCell>Target ETA</TableHeaderCell>
            <TableHeaderCell>현재 → 권고</TableHeaderCell>
            <TableHeaderCell>배정 선석</TableHeaderCell>
            <TableHeaderCell align="center">수용 상태</TableHeaderCell>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.imo}>
              <TableCell type="muted" align="center">
                {item.order}
              </TableCell>
              <TableVesselCell name={item.vesselName} imo={item.imo} />
              <TableCell>{item.eta}</TableCell>
              <TableCell type="strong">{item.targetEta}</TableCell>
              <TableCell>{item.speed}</TableCell>
              <TableCell>{item.berth}</TableCell>
              <TableCell align="center">
                <Chip tone={item.acceptance.tone}>{item.acceptance.label}</Chip>
              </TableCell>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
}

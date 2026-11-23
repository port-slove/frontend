import { Button, Chip, TableCell, TableHeaderCell } from "@/shared/ui";
import { HISTORY_ROWS, RESULT_TONE } from "./history-mock-data";

export function HistoryTable() {
  return (
    <div className="flex w-full flex-col gap-3 rounded-2xl border border-default bg-surface p-4">
      <table className="w-full">
        <thead>
          <tr className="bg-page">
            <TableHeaderCell className="w-22.5">보낸 시각</TableHeaderCell>
            <TableHeaderCell className="w-40">선박</TableHeaderCell>
            <TableHeaderCell className="w-35">권고</TableHeaderCell>
            <TableHeaderCell className="w-27.5">Target ETA</TableHeaderCell>
            <TableHeaderCell className="w-25">결과</TableHeaderCell>
            <TableHeaderCell className="w-20">응답</TableHeaderCell>
            <TableHeaderCell className="w-22.5">담당</TableHeaderCell>
            <TableHeaderCell>비고</TableHeaderCell>
          </tr>
        </thead>
        <tbody>
          {HISTORY_ROWS.map((row) => (
            <tr key={`${row.sentAt}-${row.name}`}>
              <TableCell type="muted">{row.sentAt}</TableCell>
              <TableCell type="strong">{row.name}</TableCell>
              <TableCell>{row.recommendation}</TableCell>
              <TableCell>{row.targetEta}</TableCell>
              <TableCell>
                <Chip tone={RESULT_TONE[row.result]}>{row.result}</Chip>
              </TableCell>
              <TableCell type="muted">{row.response}</TableCell>
              <TableCell>{row.owner}</TableCell>
              <TableCell type="muted">{row.note}</TableCell>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex items-center justify-between">
        <p className="text-caption-md text-tertiary">22건 중 9건 표시</p>
        <Button variant="outline" className="h-10 px-5 text-label-md">
          더 보기
        </Button>
      </div>
    </div>
  );
}

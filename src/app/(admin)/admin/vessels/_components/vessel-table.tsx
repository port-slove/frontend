import { cn } from "@/shared/lib/cn";
import {
  Button,
  Card,
  CardHeader,
  Checkbox,
  Chip,
  ExportIcon,
  TableCell,
  TableHeaderCell,
  TableVesselCell,
} from "@/shared/ui";

import type { ReactNode } from "react";

import type { VesselRow } from "./types";

export interface VesselTableProps {
  vessels: VesselRow[];
  total: number;
  selectedId: string | null;
  onSelect: (id: string | null) => void;
  /** 행 대신 보여 줄 로딩·빈 상태·에러 안내 */
  message?: ReactNode;
}

export function VesselTable({ vessels, total, selectedId, onSelect, message }: VesselTableProps) {
  return (
    <Card variant="outlined" className="flex-1 gap-1">
      <div className="flex items-center gap-3">
        <CardHeader title="선박 목록" badge={<Chip>{total}건</Chip>} className="flex-1" />
        <Button variant="ghost" size="md">
          내보내기
          <ExportIcon />
        </Button>
      </div>

      {/* 선박이 수백 척이라 표 영역만 스크롤합니다. */}
      <div className="max-h-160 overflow-y-auto">
        <table className="w-full table-fixed border-separate border-spacing-0">
          <colgroup>
            <col className="w-14" />
            <col className="w-55" />
            <col className="w-27.5" />
            <col className="w-27.5" />
            <col className="w-35" />
            <col className="w-21" />
            <col className="w-25" />
          </colgroup>
          <thead className="sticky top-0 z-10">
            <tr className="bg-page [&>th:first-child]:rounded-l-md [&>th:last-child]:rounded-r-md">
              <TableHeaderCell align="center">선택</TableHeaderCell>
              <TableHeaderCell>선박</TableHeaderCell>
              <TableHeaderCell>구역</TableHeaderCell>
              <TableHeaderCell>항만까지</TableHeaderCell>
              <TableHeaderCell>SOG · COG</TableHeaderCell>
              <TableHeaderCell align="center">신뢰도</TableHeaderCell>
              <TableHeaderCell align="center">마지막 수신</TableHeaderCell>
            </tr>
          </thead>
          <tbody>
            {vessels.map((vessel) => {
              const selected = vessel.id === selectedId;
              return (
                <tr
                  key={vessel.id}
                  onClick={() => onSelect(selected ? null : vessel.id)}
                  className={cn(
                    "cursor-pointer [&>td:first-child]:rounded-l-md [&>td:last-child]:rounded-r-md",
                    selected ? "bg-brand-subtle" : "hover:bg-page",
                  )}
                >
                  <TableCell align="center">
                    <Checkbox
                      checked={selected}
                      aria-label={`${vessel.name} 선택`}
                      className="mx-auto"
                      // 행 클릭과 같은 동작이므로 이벤트가 두 번 처리되지 않게 막습니다.
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelect(selected ? null : vessel.id);
                      }}
                    />
                  </TableCell>
                  <TableVesselCell name={vessel.name} imo={vessel.identifier} />
                  <TableCell>{vessel.zone}</TableCell>
                  <TableCell>{vessel.distance}</TableCell>
                  <TableCell>{vessel.sogCog}</TableCell>
                  <TableCell align="center">
                    <Chip tone={vessel.trust.tone}>{vessel.trust.label}</Chip>
                  </TableCell>
                  <TableCell align="center">
                    <Chip tone={vessel.lastReceived.tone}>{vessel.lastReceived.label}</Chip>
                  </TableCell>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {message}
    </Card>
  );
}

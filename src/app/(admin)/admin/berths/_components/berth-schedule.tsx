"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import {
  AlertIcon,
  ArrowRightIcon,
  Button,
  CloseIcon,
  ExpandIcon,
  PageTitle,
  RefreshIcon,
  Toast,
  Toggle,
  WarningIcon,
} from "@/shared/ui";

import { AssignmentDrawer } from "./assignment-drawer";
import { BerthGantt } from "./berth-gantt";
import { ScheduleFilters } from "./schedule-filters";
import type {
  AppliedFilter,
  AssignmentDraft,
  BerthStatusFilter,
  GanttRange,
  Pier,
  ScheduleFilterValues,
  ScheduleItem,
  ScheduleToast,
} from "./types";

export interface BerthScheduleProps {
  summary: string;
  filterValues: ScheduleFilterValues;
  statusLabels: Record<BerthStatusFilter, string>;
  initialFilters: AppliedFilter[];
  range: GanttRange;
  piers: Pier[];
  items: ScheduleItem[];
  assignment: AssignmentDraft;
  toasts: ScheduleToast[];
}

export function BerthSchedule({
  summary,
  filterValues,
  statusLabels,
  initialFilters,
  range,
  piers,
  items,
  assignment,
  toasts: initialToasts,
}: BerthScheduleProps) {
  const router = useRouter();
  const [detailEnabled, setDetailEnabled] = useState(true);
  // TODO: API 연동 시 상태·검색 필터를 쿼리 파라미터로 넘겨 스케줄을 다시 조회합니다.
  const [status, setStatus] = useState<BerthStatusFilter>("전체");
  const [filters, setFilters] = useState(initialFilters);
  const [drawerOpen, setDrawerOpen] = useState(true);
  const [toasts, setToasts] = useState(initialToasts);

  const addSearchFilter = (query: string) => {
    setFilters((prev) =>
      prev.some((f) => f.value === query) ? prev : [...prev, { field: "선명", value: query }],
    );
  };

  const removeFilter = (target: AppliedFilter) => {
    setFilters((prev) =>
      prev.filter((f) => !(f.field === target.field && f.value === target.value)),
    );
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <PageTitle title="선석 스케줄" subtitle={summary} />
        <div className="flex items-center gap-2">
          {/* TODO: 간트 전체 화면 보기 */}
          <Button variant="outline" size="md">
            크게보기
            <ExpandIcon />
          </Button>
          <Button variant="outline" size="md" onClick={() => router.refresh()}>
            데이터 새로고침
            <RefreshIcon />
          </Button>
          <div className="flex items-center gap-2">
            <span className="text-label-md text-secondary">상세 조회</span>
            <Toggle
              checked={detailEnabled}
              onCheckedChange={setDetailEnabled}
              aria-label="상세 조회"
            />
          </div>
        </div>
      </div>

      <ScheduleFilters
        values={filterValues}
        statusLabels={statusLabels}
        status={status}
        onStatusChange={setStatus}
        filters={filters}
        onSearch={addSearchFilter}
        onRemoveFilter={removeFilter}
        onClearFilters={() => setFilters([])}
      />

      <div className="flex items-stretch gap-4">
        <BerthGantt range={range} piers={piers} items={items} detailEnabled={detailEnabled} />
        {drawerOpen && <AssignmentDrawer draft={assignment} onClose={() => setDrawerOpen(false)} />}
      </div>

      {toasts.length > 0 && (
        <div aria-live="polite" className="fixed top-31 right-10 z-50 flex flex-col gap-3">
          {toasts.map((toast) => (
            <Toast
              key={toast.id}
              tone={toast.tone}
              icon={toast.tone === "warning" ? <WarningIcon /> : <AlertIcon />}
              title={toast.title}
              description={toast.description}
              time={toast.time}
              actionLabel={toast.actionLabel}
              actionIcon={<ArrowRightIcon />}
              // TODO: 영향 권고 / 위치 검증 화면이 생기면 연결
              closeIcon={<CloseIcon />}
              onClose={() => setToasts((prev) => prev.filter((t) => t.id !== toast.id))}
            />
          ))}
        </div>
      )}
    </>
  );
}

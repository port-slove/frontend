"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

import {
  AlertIcon,
  ArrowRightIcon,
  Button,
  Card,
  CloseIcon,
  ExpandIcon,
  PageTitle,
  RefreshIcon,
  Toast,
  Toggle,
  WarningIcon,
} from "@/shared/ui";

import { CardMessage } from "@/app/(admin)/admin/_components/card-message";
import { berthQueries } from "../_api/berth-simulation";
import { SCENARIO_PIERS } from "../_api/scenario";
import { AssignmentDrawer } from "./assignment-drawer";
import { BerthGantt } from "./berth-gantt";
import {
  filterByStatus,
  toAssignmentDraft,
  toGanttRange,
  toPeriodLabel,
  toRecommendationItem,
  toScheduleItems,
  toScheduleSummary,
  toStatusLabels,
} from "./mappers";
import { ScheduleFilters } from "./schedule-filters";
import type {
  AppliedFilter,
  BerthStatusFilter,
  ScheduleFilterValues,
  ScheduleToast,
} from "./types";

export interface BerthScheduleProps {
  filterValues: Omit<ScheduleFilterValues, "period">;
  initialFilters: AppliedFilter[];
  toasts: ScheduleToast[];
}

const EMPTY_STATUS_LABELS = toStatusLabels([]);

export function BerthSchedule({
  filterValues,
  initialFilters,
  toasts: initialToasts,
}: BerthScheduleProps) {
  const queryClient = useQueryClient();
  const timeline = useQuery(berthQueries.timeline());
  const recommendation = useQuery(berthQueries.recommendation());

  const [detailEnabled, setDetailEnabled] = useState(true);
  // TODO: 검색 필터는 선석 일정 API 가 생기면 쿼리로 넘깁니다.
  const [status, setStatus] = useState<BerthStatusFilter>("전체");
  const [filters, setFilters] = useState(initialFilters);
  const [drawerOpen, setDrawerOpen] = useState(true);
  const [toasts, setToasts] = useState(initialToasts);

  const addSearchFilter = (query: string) => {
    setFilters((prev) =>
      prev.some((f) => f.value === query) ? prev : [...prev, { field: "선명", value: query }],
    );
  };

  const range = timeline.data ? toGanttRange(timeline.data) : null;
  const scheduleItems = timeline.data ? toScheduleItems(timeline.data) : [];
  const recommendItem = recommendation.data ? toRecommendationItem(recommendation.data) : null;
  const items = recommendItem ? [...scheduleItems, recommendItem] : scheduleItems;
  const draft = recommendation.data ? toAssignmentDraft(recommendation.data) : null;

  let summary = "불러오는 중";
  if (range) summary = toScheduleSummary(range);
  else if (timeline.isError) summary = "갱신 실패";

  const refresh = () => queryClient.invalidateQueries({ queryKey: berthQueries.all() });

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
          <Button variant="outline" size="md" onClick={refresh}>
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
        values={{ ...filterValues, period: range ? toPeriodLabel(range) : "—" }}
        statusLabels={timeline.data ? toStatusLabels(items) : EMPTY_STATUS_LABELS}
        status={status}
        onStatusChange={setStatus}
        filters={filters}
        onSearch={addSearchFilter}
        onRemoveFilter={removeFilter}
        onClearFilters={() => setFilters([])}
      />

      <div className="flex items-stretch gap-4">
        {range ? (
          <BerthGantt
            range={range}
            piers={SCENARIO_PIERS}
            items={filterByStatus(items, status)}
            detailEnabled={detailEnabled}
          />
        ) : (
          <Card variant="outlined" className="min-h-120 min-w-0 flex-1">
            {timeline.isError ? (
              <CardMessage
                message="스케줄을 불러오지 못했어요"
                onRetry={() => timeline.refetch()}
              />
            ) : (
              <CardMessage message="스케줄을 불러오는 중" />
            )}
          </Card>
        )}
        {drawerOpen &&
          (draft ? (
            <AssignmentDrawer
              key={draft.selectedOptionId}
              draft={draft}
              onClose={() => setDrawerOpen(false)}
            />
          ) : (
            <Card variant="outlined" className="w-106 shrink-0">
              {recommendation.isError ? (
                <CardMessage
                  message="배정 추천을 불러오지 못했어요"
                  onRetry={() => recommendation.refetch()}
                />
              ) : (
                <CardMessage message="배정 추천을 계산하는 중" />
              )}
            </Card>
          ))}
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

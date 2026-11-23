"use client";

import { type FormEvent, useState } from "react";

import {
  Button,
  Card,
  DateRange,
  FilterChip,
  SearchIcon,
  Segmented,
  SelectField,
} from "@/shared/ui";

import {
  type AppliedFilter,
  BERTH_STATUS_FILTERS,
  type BerthStatusFilter,
  type ScheduleFilterValues,
} from "./types";

export interface ScheduleFiltersProps {
  values: ScheduleFilterValues;
  statusLabels: Record<BerthStatusFilter, string>;
  status: BerthStatusFilter;
  onStatusChange: (status: BerthStatusFilter) => void;
  filters: AppliedFilter[];
  onSearch: (query: string) => void;
  onRemoveFilter: (filter: AppliedFilter) => void;
  onClearFilters: () => void;
}

export function ScheduleFilters({
  values,
  statusLabels,
  status,
  onStatusChange,
  filters,
  onSearch,
  onRemoveFilter,
  onClearFilters,
}: ScheduleFiltersProps) {
  const [query, setQuery] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) return;
    onSearch(trimmed);
    setQuery("");
  };

  return (
    <Card variant="outlined" className="gap-4 p-5">
      <form
        role="search"
        onSubmit={handleSubmit}
        className="flex items-center gap-2 rounded-2xl bg-page p-1.5"
      >
        {/* TODO: 검색 대상(선명/항차) 드롭다운 */}
        <SelectField value={values.searchField} className="w-37.5" />
        <label className="flex flex-1 items-center gap-2.5 px-3.5 py-2.5 text-tertiary">
          <SearchIcon className="size-5 shrink-0" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={values.searchPlaceholder}
            aria-label="선명 또는 항차 검색"
            className="min-w-0 flex-1 bg-transparent text-body-md text-primary placeholder:text-tertiary focus:outline-none"
          />
        </label>
        <Button type="submit" size="md" className="shadow-none">
          검색
          <SearchIcon />
        </Button>
      </form>

      {/* TODO: 조회기간 · 부두 · 선종 변경은 API 연동 시 쿼리 파라미터로 처리합니다. */}
      <div className="flex items-center gap-3">
        <span className="text-label-md whitespace-nowrap text-secondary">조회기간</span>
        <DateRange range={values.period} />
        <SelectField value={values.periodPreset} className="w-35" />
        <Button variant="outline" size="md">
          오늘
        </Button>
        <span className="flex-1" />
        <span className="text-label-md whitespace-nowrap text-secondary">부두</span>
        <SelectField value="전체" count={values.pierCount} className="w-37.5" />
        <span className="text-label-md whitespace-nowrap text-secondary">선종</span>
        <SelectField value="전체" count={values.vesselTypeCount} className="w-37.5" />
      </div>

      <div className="flex items-center gap-3">
        <span className="text-label-md whitespace-nowrap text-secondary">상태</span>
        <Segmented
          options={BERTH_STATUS_FILTERS}
          value={status}
          onValueChange={onStatusChange}
          renderLabel={(option) => statusLabels[option]}
          className="bg-page p-1"
        />
        <span className="flex-1" />
        <span className="text-label-md whitespace-nowrap text-secondary">적용된 필터</span>
        {filters.map((filter) => (
          <FilterChip
            key={`${filter.field}:${filter.value}`}
            field={filter.field}
            value={filter.value}
            onRemove={() => onRemoveFilter(filter)}
          />
        ))}
        {/* TODO: 꺼 둔 필터를 다시 켜는 동작은 필터 on/off 스펙이 정해지면 연결합니다. */}
        <Button variant="secondary" size="md">
          모두 켜기
        </Button>
        <Button variant="dark" size="md" onClick={onClearFilters}>
          전체 삭제
        </Button>
      </div>
    </Card>
  );
}

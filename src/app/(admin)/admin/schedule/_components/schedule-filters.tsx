import { Button, DateRange, FilterChip, SelectField, Tab, Toggle } from "@/shared/ui";

const STATUS_TABS = [
  { label: "전체 14척", active: true },
  { label: "하역 중 5", active: false },
  { label: "접안 예정 6", active: false },
  { label: "대기·지연 2", active: false },
  { label: "보류 1", active: false },
];

function SearchIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" className="size-5">
      <circle cx="9" cy="9" r="6" stroke="currentColor" strokeWidth="1.5" />
      <path d="m17 17-3.5-3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function ScheduleFilters() {
  return (
    <div className="flex flex-col gap-5 rounded-2xl border border-default bg-surface p-5">
      <div className="flex items-center gap-1.5">
        <div className="w-37.5">
          <SelectField value="선명 / 항차" />
        </div>
        <label className="flex h-11 flex-1 items-center gap-2 rounded-lg border border-default bg-surface px-3.5">
          <span className="text-tertiary">
            <SearchIcon />
          </span>
          <input
            type="search"
            placeholder="선명 또는 항차를 입력하세요 (HANBIT PIONEER, HBP2611 ...)"
            className="w-full bg-transparent text-body-sm text-primary placeholder:text-tertiary focus:outline-none"
          />
        </label>
        <Button variant="primary" className="h-11 px-5 text-label-md">
          검색
        </Button>
      </div>

      <div className="flex items-center gap-3">
        <p className="w-13 shrink-0 text-label-md text-secondary">조회기간</p>
        <DateRange range="11.07(토) – 11.09(월)" />
        <div className="w-35">
          <SelectField value="오늘 ~ +2일" />
        </div>
        <Button variant="outline" className="h-10 px-4 text-label-md">
          오늘
        </Button>
        <span className="flex-1" />
        <p className="shrink-0 text-label-md text-secondary">부두</p>
        <div className="w-37.5">
          <SelectField value="전체" count="6/6" />
        </div>
        <p className="shrink-0 text-label-md text-secondary">선종</p>
        <div className="w-37.5">
          <SelectField value="전체" count="5/5" />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <p className="shrink-0 text-label-md text-secondary">상태</p>
        <div className="flex items-center gap-1 rounded-md bg-page p-1">
          {STATUS_TABS.map((tab) => (
            <Tab key={tab.label} active={tab.active}>
              {tab.label}
            </Tab>
          ))}
        </div>
        <span className="flex-1" />
        <p className="shrink-0 text-label-md text-secondary">적용된 필터</p>
        <FilterChip field="선명" value="GEUMJEONG 7" />
        <Button variant="outline" className="h-10 px-4 text-label-md">
          모두 켜기
        </Button>
        <Button variant="dark" className="h-10 px-4 text-label-md">
          전체 삭제
        </Button>
      </div>
    </div>
  );
}

export function ScheduleActions() {
  return (
    <div className="flex items-center gap-2">
      <Button variant="outline" className="h-10 px-4 text-label-md">
        크게보기
      </Button>
      <Button variant="outline" className="h-10 px-4 text-label-md">
        데이터 새로고침
      </Button>
      <label className="flex items-center gap-2 pl-2">
        <span className="text-label-md text-secondary">상세 조회</span>
        <Toggle checked={false} />
      </label>
    </div>
  );
}

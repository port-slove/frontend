import { DateRange, SelectField } from "@/shared/ui";

function SearchIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" className="size-5">
      <circle cx="9" cy="9" r="6" stroke="currentColor" strokeWidth="1.5" />
      <path d="m17 17-3.5-3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function HistoryFilters() {
  return (
    <div className="flex items-center gap-3">
      <DateRange range="2026.11.07" />
      <div className="w-40">
        <SelectField value="결과 전체" />
      </div>
      <div className="w-40">
        <SelectField value="부두 전체" />
      </div>
      <span className="flex-1" />
      <label className="flex h-11 w-70 items-center gap-2 rounded-lg border border-default bg-surface px-3.5">
        <span className="text-tertiary">
          <SearchIcon />
        </span>
        <input
          type="search"
          placeholder="선박명 검색"
          className="w-full bg-transparent text-body-sm text-primary placeholder:text-tertiary focus:outline-none"
        />
      </label>
    </div>
  );
}

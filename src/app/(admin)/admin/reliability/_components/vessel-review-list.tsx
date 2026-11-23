import { AlertItem, CardHeader } from "@/shared/ui";
import { cn } from "@/shared/lib/cn";
import { NEEDS_REVIEW, RESOLVED_TODAY } from "./reliability-mock-data";

function WarningIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" className="size-5">
      <path
        d="M10 3.5 2.5 16h15L10 3.5Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path d="M10 8v3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="10" cy="13.5" r="0.75" fill="currentColor" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" className="size-5">
      <path
        d="m4 10.5 4 4 8-9"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function VesselReviewList() {
  return (
    <div className="flex w-90 shrink-0 flex-col gap-2 rounded-2xl border border-default bg-surface p-4">
      <CardHeader
        title="검증 필요"
        badge={<span className="text-label-sm text-secondary">8건</span>}
      />
      {NEEDS_REVIEW.map((item) => (
        <div
          key={item.id}
          className={cn("rounded-xl px-3 py-1", item.selected && "bg-brand-subtle")}
        >
          <AlertItem
            severity="error"
            icon={<WarningIcon />}
            title={item.title}
            meta={item.meta}
            time={item.time}
          />
        </div>
      ))}

      <div className="h-px w-full border-t border-default" />
      <p className="text-label-md text-secondary">오늘 처리 완료</p>
      {RESOLVED_TODAY.map((item) => (
        <div key={item.id} className="px-3 py-1">
          <AlertItem
            severity="success"
            icon={<CheckIcon />}
            title={item.title}
            meta={item.meta}
            time={item.time}
          />
        </div>
      ))}
    </div>
  );
}

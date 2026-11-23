import { AlertItem, Button, CardHeader } from "@/shared/ui";
import { NEEDS_REVIEW_ALERTS } from "./dashboard-mock-data";

function AlertIcon() {
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

export function NeedsReviewCard() {
  return (
    <div className="flex w-full flex-col gap-2 rounded-2xl border border-default bg-surface p-4">
      <CardHeader
        title="확인 필요"
        badge={<span className="text-label-sm text-secondary">8건</span>}
      />
      {NEEDS_REVIEW_ALERTS.map((alert) => (
        <AlertItem
          key={alert.id}
          severity={alert.severity}
          icon={<AlertIcon />}
          title={alert.title}
          meta={alert.meta}
          time={alert.time}
        />
      ))}
      <Button variant="ghost" className="h-10 px-5 text-label-md text-secondary">
        신뢰도 검사에서 보기
        <ArrowRightIcon />
      </Button>
    </div>
  );
}

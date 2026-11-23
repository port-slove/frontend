import type { ScheduleBlockStatus } from "@/shared/ui";

const LEGEND_ITEMS: { status: ScheduleBlockStatus; dotClass: string }[] = [
  { status: "하역 중", dotClass: "bg-blue-600" },
  { status: "접안 예정", dotClass: "border border-default bg-surface" },
  { status: "대기 예상", dotClass: "bg-warning" },
  { status: "지연", dotClass: "bg-error" },
  { status: "보류", dotClass: "bg-gray-400" },
  { status: "추천", dotClass: "border border-dashed border-brand" },
];

export function ScheduleLegend() {
  return (
    <div className="flex items-center gap-5 rounded-lg bg-page px-4 py-3">
      {LEGEND_ITEMS.map((item) => (
        <div key={item.status} className="flex items-center gap-1.5">
          <span className={`size-3 shrink-0 rounded-xs ${item.dotClass}`} />
          <span className="text-caption-md text-secondary">{item.status}</span>
        </div>
      ))}
      <span className="flex-1" />
      <p className="text-caption-md text-tertiary">
        블록을 누르면 상세, 길게 누르면 코멘트를 남길 수 있어요
      </p>
    </div>
  );
}

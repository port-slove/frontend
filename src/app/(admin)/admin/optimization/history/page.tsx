import { Button, PageTitle } from "@/shared/ui";
import { HistoryFilters } from "./_components/history-filters";
import { HistoryStats } from "./_components/history-stats";
import { HistoryTable } from "./_components/history-table";

function ExportIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" className="size-4">
      <path
        d="M8 2v8m0 0L5 7m3 3 3-3M3 13h10"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Page() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <PageTitle title="권고 이력" subtitle="보낸 권고와 선박 응답 기록" />
        <Button variant="outline" className="h-10 px-5 text-label-md">
          CSV 내보내기
          <ExportIcon />
        </Button>
      </div>

      <HistoryStats />
      <HistoryFilters />
      <HistoryTable />
    </div>
  );
}

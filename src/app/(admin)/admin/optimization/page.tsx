import Link from "next/link";

import { Button, PageTitle } from "@/shared/ui";
import { cn } from "@/shared/lib/cn";
import { JitCompareCard } from "./_components/jit-compare-card";
import { OptimizationQueueCard } from "./_components/optimization-queue-card";
import { TrackingCard } from "./_components/tracking-card";

function RefreshIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" className="size-4">
      <path
        d="M13.5 8A5.5 5.5 0 1 1 11.8 4M13.5 2v3.5H10"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function HistoryIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" className="size-4">
      <circle cx="8" cy="8.5" r="5.5" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M8 5.5V8.5L10 10"
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
        <PageTitle
          title="입항 최적화"
          subtitle="Target ETA 기준 JIT 권고 · 기상 보정 반영 · 현재 14:35"
        />
        <div className="flex items-center gap-3">
          <Button variant="ghost" className="h-10 px-5 text-label-md text-secondary">
            재최적화
            <RefreshIcon />
          </Button>
          <Link
            href="/admin/optimization/history"
            className={cn(
              "inline-flex items-center justify-center gap-2 rounded-lg px-5 text-label-md whitespace-nowrap transition-colors",
              "h-10 text-secondary hover:bg-page active:bg-surface-muted",
            )}
          >
            권고 이력
            <HistoryIcon />
          </Link>
        </div>
      </div>

      <div className="flex items-start gap-4">
        <div className="flex w-212 shrink-0 flex-col gap-4">
          <OptimizationQueueCard />
          <TrackingCard />
        </div>
        <JitCompareCard />
      </div>
    </div>
  );
}

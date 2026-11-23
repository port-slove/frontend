import { BerthTile, Button, CardHeader } from "@/shared/ui";
import { BERTH_TILES } from "./dashboard-mock-data";

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

export function BerthStatusCard() {
  return (
    <div className="flex h-full flex-1 flex-col gap-4 rounded-2xl border border-default bg-surface p-4">
      <div className="flex items-center gap-3">
        <CardHeader title="선석 현황" className="flex-1" />
        <Button variant="ghost" className="h-10 px-5 text-label-md text-secondary">
          선석 스케줄
          <ArrowRightIcon />
        </Button>
      </div>
      <div className="flex flex-wrap items-start gap-3">
        {BERTH_TILES.map((tile) => (
          <BerthTile
            key={tile.berth}
            status={tile.status}
            berth={tile.berth}
            state={tile.state}
            meta={tile.meta}
            progress={tile.progress}
            className="w-53.5"
          />
        ))}
      </div>
    </div>
  );
}

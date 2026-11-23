import Link from "next/link";

import { ArrowRightIcon, BerthTile, buttonClassName, Card, CardHeader } from "@/shared/ui";

import type { BerthStatus } from "./types";

export function BerthStatusCard({ berths }: { berths: BerthStatus[] }) {
  return (
    <Card variant="outlined" className="w-128 shrink-0 gap-4">
      <div className="flex items-center gap-3">
        <CardHeader title="선석 현황" className="flex-1" />
        <Link href="/admin/berths" className={buttonClassName({ variant: "ghost", size: "md" })}>
          선석 스케줄
          <ArrowRightIcon />
        </Link>
      </div>
      <div className="grid grid-cols-2 gap-3 pr-10">
        {berths.map(({ delayed, ...berth }) => (
          <BerthTile key={berth.berth} status={delayed ? "delayed" : "normal"} {...berth} />
        ))}
      </div>
    </Card>
  );
}

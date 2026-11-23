import Image from "next/image";

import { Button, CardHeader, LegendItem, MapMarker } from "@/shared/ui";
import { MAP_MARKERS } from "./dashboard-mock-data";

function ExpandIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" className="size-4">
      <path
        d="M6 2H2v4M10 2h4v4M6 14H2v-4M10 14h4v-4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function VesselMapCard() {
  return (
    <div className="flex w-230 shrink-0 flex-col gap-4 rounded-2xl border border-default bg-surface p-4">
      <div className="flex items-center gap-3">
        <CardHeader
          title="실시간 선박 지도"
          badge={<span className="text-label-sm text-secondary">8건</span>}
          className="flex-1"
        />
        <Button variant="outline" className="h-10 px-5 text-label-md">
          지도 관제
          <ExpandIcon />
        </Button>
      </div>

      <div className="relative h-96 shrink-0 overflow-hidden rounded-lg">
        <Image
          src="/images/dashboard-map.png"
          alt="실시간 선박 지도"
          fill
          className="object-cover"
        />
        {MAP_MARKERS.map((marker, index) => (
          <MapMarker
            key={index}
            status={marker.status}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${marker.left}%`, top: `${marker.top}%` }}
          />
        ))}
      </div>

      <div className="flex items-start gap-5">
        <LegendItem status="항해 중" label="항해 중" />
        <LegendItem status="대기 예상" label="대기 예상" />
        <LegendItem status="묘박" label="묘박" />
        <LegendItem status="검증 필요" label="검증 필요" />
      </div>
    </div>
  );
}

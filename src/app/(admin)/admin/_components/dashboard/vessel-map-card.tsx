import Image from "next/image";

import {
  Button,
  Card,
  CardHeader,
  Chip,
  ExpandIcon,
  MAP_MARKER_STATUSES,
  MapMarker,
} from "@/shared/ui";

import type { VesselMapPoint } from "./types";

export function VesselMapCard({ points, total }: { points: VesselMapPoint[]; total: number }) {
  return (
    <Card variant="outlined" className="flex-1 gap-4">
      <div className="flex items-center gap-3">
        <CardHeader title="실시간 선박 지도" badge={<Chip>{total}건</Chip>} className="flex-1" />
        {/* TODO: 지도 관제 화면이 생기면 링크로 연결 */}
        <Button variant="outline" size="md">
          지도 관제
          <ExpandIcon />
        </Button>
      </div>

      <div className="relative min-h-103 flex-1 overflow-hidden rounded-2xl">
        <Image
          src="/images/admin/port-map.png"
          alt="부산항 주변 지도"
          fill
          sizes="888px"
          loading="eager"
          className="object-cover"
        />
        {points.map((point) => (
          <MapMarker
            key={point.id}
            status={point.status}
            className="absolute"
            style={{ left: `${point.x}%`, top: `${point.y}%` }}
          />
        ))}
      </div>

      <ul className="flex gap-5">
        {MAP_MARKER_STATUSES.map((status) => (
          <li key={status} className="flex items-center gap-1.5">
            <MapMarker status={status} />
            <span className="text-caption-md text-secondary">{status}</span>
          </li>
        ))}
      </ul>
    </Card>
  );
}

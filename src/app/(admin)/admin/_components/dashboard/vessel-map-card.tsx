import Image from "next/image";
import type { ReactNode } from "react";

import {
  Button,
  Card,
  CardHeader,
  Chip,
  ExpandIcon,
  LegendItem,
  MAP_MARKER_STATUSES,
  MapMarker,
} from "@/shared/ui";

import type { VesselMapPoint } from "./types";

export interface VesselMapCardProps {
  points: VesselMapPoint[];
  total: number;
  image: { src: string; alt: string };
  overlay?: ReactNode;
}

export function VesselMapCard({ points, total, image, overlay }: VesselMapCardProps) {
  return (
    <Card variant="outlined" className="flex-1 gap-4">
      <div className="flex items-center gap-3">
        <CardHeader title="실시간 선박 지도" badge={<Chip>{total}척</Chip>} className="flex-1" />
        {/* TODO: 지도 관제 화면이 생기면 링크로 연결 */}
        <Button variant="outline" size="md">
          지도 관제
          <ExpandIcon />
        </Button>
      </div>

      <div className="relative aspect-888/412 w-full overflow-hidden rounded-2xl">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes="888px"
          loading="eager"
          className="object-cover"
        />
        {points.map((point) => (
          <MapMarker
            key={point.id}
            status={point.status}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${point.x}%`, top: `${point.y}%` }}
          />
        ))}
        {overlay && (
          <div className="absolute inset-0 flex items-center justify-center bg-surface/70">
            {overlay}
          </div>
        )}
      </div>

      <div className="flex gap-5">
        {MAP_MARKER_STATUSES.map((status) => (
          <LegendItem key={status} status={status} label={status} />
        ))}
      </div>
    </Card>
  );
}

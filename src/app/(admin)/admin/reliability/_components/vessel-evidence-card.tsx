import Image from "next/image";

import { CardHeader, Chip, DeductionRow, MapMarker, Progress } from "@/shared/ui";
import { DEDUCTIONS, MAP_POSITIONS, SELECTED_VESSEL, STATS } from "./reliability-mock-data";

export function VesselEvidenceCard() {
  const totalDeduction = DEDUCTIONS.reduce((sum, item) => sum + Number(item.points), 0);

  return (
    <div className="flex w-full flex-1 flex-col gap-4 rounded-2xl border border-default bg-surface p-4">
      <div className="flex items-center gap-3">
        <div className="flex flex-1 flex-col gap-1">
          <p className="text-h2 text-primary">{SELECTED_VESSEL.name}</p>
          <p className="text-caption-md text-secondary">{SELECTED_VESSEL.meta}</p>
        </div>
        <Chip tone="error">{SELECTED_VESSEL.score}</Chip>
      </div>

      <div className="relative h-60 w-full overflow-hidden rounded-lg">
        <Image
          src="/images/dashboard-map.png"
          alt="AIS·레이더 위치 비교"
          fill
          className="object-cover"
        />
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="pointer-events-none absolute inset-0 size-full"
        >
          <line
            x1={MAP_POSITIONS.ais.left}
            y1={MAP_POSITIONS.ais.top}
            x2={MAP_POSITIONS.radar.left}
            y2={MAP_POSITIONS.radar.top}
            stroke="var(--color-error, #f04452)"
            strokeWidth="0.6"
            strokeDasharray="2 1.5"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
        <MapMarker
          status="검증 필요"
          className="absolute -translate-x-1/2 -translate-y-1/2"
          style={{ left: `${MAP_POSITIONS.ais.left}%`, top: `${MAP_POSITIONS.ais.top}%` }}
        />
        <MapMarker
          status="항해 중"
          className="absolute -translate-x-1/2 -translate-y-1/2"
          style={{ left: `${MAP_POSITIONS.radar.left}%`, top: `${MAP_POSITIONS.radar.top}%` }}
        />
        <Chip
          tone="error"
          className="absolute -translate-x-1/2 -translate-y-1/2"
          style={{ left: `${MAP_POSITIONS.aisChip.left}%`, top: `${MAP_POSITIONS.aisChip.top}%` }}
        >
          AIS 위치
        </Chip>
        <Chip
          tone="brand"
          className="absolute -translate-x-1/2 -translate-y-1/2"
          style={{
            left: `${MAP_POSITIONS.radarChip.left}%`,
            top: `${MAP_POSITIONS.radarChip.top}%`,
          }}
        >
          레이더 위치
        </Chip>
        <Chip
          tone="dark"
          className="absolute -translate-x-1/2 -translate-y-1/2"
          style={{
            left: `${MAP_POSITIONS.distanceLabel.left}%`,
            top: `${MAP_POSITIONS.distanceLabel.top}%`,
          }}
        >
          1.8 NM
        </Chip>
      </div>

      <div className="flex items-start gap-3">
        {STATS.map((stat) => (
          <div key={stat.label} className="flex flex-1 flex-col gap-2 rounded-lg bg-page p-4">
            <p className="text-caption-md whitespace-nowrap text-secondary">{stat.label}</p>
            <div className="flex items-baseline gap-1 whitespace-nowrap">
              <p className="text-h1 text-primary">{stat.value}</p>
              <p className="text-body-sm text-secondary">{stat.unit}</p>
            </div>
            <Progress tone={stat.tone} value={stat.progress} />
          </div>
        ))}
      </div>

      <div className="flex items-center gap-3">
        <CardHeader title="감점 내역" className="flex-1" />
        <p className="text-label-md whitespace-nowrap text-error">100 → {100 + totalDeduction}점</p>
      </div>
      {DEDUCTIONS.map((item) => (
        <DeductionRow
          key={item.reason}
          reason={item.reason}
          detail={item.detail}
          points={item.points}
        />
      ))}
    </div>
  );
}

import Link from "next/link";

import {
  AlertIcon,
  ArrowRightIcon,
  Banner,
  Button,
  buttonClassName,
  Card,
  Chip,
  CollapseIcon,
  MapIcon,
  PropertyRow,
  StatTile,
} from "@/shared/ui";

import type { VesselDetail } from "./types";

export interface VesselDetailPanelProps {
  detail: VesselDetail;
  onClose: () => void;
}

export function VesselDetailPanel({ detail, onClose }: VesselDetailPanelProps) {
  return (
    <Card variant="outlined" className="w-100 shrink-0 gap-5">
      <div className="flex items-center justify-between gap-2">
        <div className="flex flex-col gap-1 whitespace-nowrap">
          <p className="text-h3 text-primary">{detail.name}</p>
          <p className="text-caption-md text-secondary">{detail.identifiers}</p>
        </div>
        <button
          type="button"
          aria-label="상세 닫기"
          onClick={onClose}
          className="flex size-6 shrink-0 items-center justify-center rounded-lg text-primary"
        >
          <CollapseIcon />
        </button>
      </div>

      {detail.warning && (
        <Banner
          tone="error"
          icon={<AlertIcon />}
          title={detail.warning.title}
          description={detail.warning.description}
        />
      )}

      <div className="flex gap-3">
        <StatTile
          label="신뢰도"
          value={detail.trust.value}
          unit="점"
          tone={detail.trust.tone}
          progress={detail.trust.progress}
          className="flex-1"
        />
        <StatTile
          label="속도 (SOG)"
          value={detail.sog.value}
          unit="kn"
          progress={detail.sog.progress}
          className="flex-1"
        />
      </div>

      <section className="flex flex-col gap-2.5">
        <h4 className="text-h4 text-primary">제원</h4>
        {detail.specs.map((spec) => (
          <PropertyRow key={spec.label} label={spec.label} value={spec.value} />
        ))}
      </section>

      <div className="flex gap-2">
        {detail.tags.map((tag) => (
          <Chip key={tag.label} tone={tag.tone}>
            {tag.label}
          </Chip>
        ))}
      </div>

      <div className="flex gap-2">
        {/* TODO: 지도 관제 화면이 생기면 링크로 연결 */}
        <Button variant="outline" size="md" className="flex-1">
          지도에서 보기
          <MapIcon />
        </Button>
        <Link
          href="/admin/reliability"
          className={buttonClassName({ size: "md", className: "flex-1 shadow-none" })}
        >
          신뢰도 검사
          <ArrowRightIcon />
        </Link>
      </div>
    </Card>
  );
}

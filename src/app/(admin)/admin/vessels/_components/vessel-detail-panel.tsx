import { cn } from "@/shared/lib/cn";
import {
  AlertIcon,
  ArrowRightIcon,
  Banner,
  Button,
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
  const lastIndex = detail.speedHistory.length - 1;

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

      <section className="flex flex-col gap-2.5">
        <h4 className="text-h4 text-primary">최근 2시간 속도</h4>
        <div className="flex h-16 items-end gap-1.5">
          {detail.speedHistory.map((height, index) => (
            <div
              // 시간순 고정 길이 배열이라 index 를 key 로 씁니다.
              key={index}
              className={cn("flex-1 rounded-xs", index === lastIndex ? "bg-brand" : "bg-brand-sub")}
              style={{ height: `${height}%` }}
            />
          ))}
        </div>
        <div className="flex justify-between text-caption-sm text-tertiary">
          <span>-2h</span>
          <span>-1h</span>
          <span>지금</span>
        </div>
      </section>

      <div className="flex gap-2">
        {/* TODO: 지도 관제 / 신뢰도 검사 화면이 생기면 링크로 연결 */}
        <Button variant="outline" size="md" className="flex-1">
          지도에서 보기
          <MapIcon />
        </Button>
        <Button size="md" className="flex-1 shadow-none">
          신뢰도 검사
          <ArrowRightIcon />
        </Button>
      </div>
    </Card>
  );
}

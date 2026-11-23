"use client";

import { useQuery } from "@tanstack/react-query";

import { PageTitle } from "@/shared/ui";

import { marineQueries } from "@/app/(admin)/admin/_api/marine";
import { mvpQueries } from "@/app/(admin)/admin/_api/mvp";
import { formatKstTime } from "@/app/(admin)/admin/_lib/format";
import { AlertsCard } from "./alerts-card";
import { CardMessage } from "@/app/(admin)/admin/_components/card-message";
import { KpiRow } from "./kpi-row";
import {
  type MapBounds,
  toDashboardAlert,
  toDashboardKpis,
  toMapPoints,
  toSeaState,
} from "./mappers";
import { SeaStateCard } from "./sea-state-card";
import type { DashboardKpi } from "./types";
import { VesselMapCard } from "./vessel-map-card";

const LOAD_ERROR = "데이터를 불러오지 못했어요";

export function DashboardTitle() {
  const { data, isError } = useQuery(mvpQueries.kpis());
  let updatedAt = "불러오는 중";
  if (data) updatedAt = `마지막 갱신 ${formatKstTime(data.evaluated_at_utc)}`;
  else if (isError) updatedAt = "갱신 실패";
  return <PageTitle title="항만 운항 현황" subtitle={`${updatedAt} · 5분마다 자동 갱신`} />;
}

const KPI_PLACEHOLDER: DashboardKpi[] = [
  "접근 선박",
  "묘박 대기",
  "권고 수용률",
  "절감 연료",
  "확인 필요",
].map((label) => ({ id: label, label, value: "—" }));

export function KpiSection() {
  const { data } = useQuery(mvpQueries.kpis());
  return <KpiRow items={data ? toDashboardKpis(data) : KPI_PLACEHOLDER} />;
}

// TODO: 부산항 이미지입니다. bounds 범위(888×412 비율)의 인천항 지도로 교체해야 합니다.
const PORT_MAP = {
  image: { src: "/images/admin/port-map.png", alt: "인천항 주변 지도" },
  bounds: { north: 37.55, south: 37.3, west: 126.21, east: 126.89 } satisfies MapBounds,
};

export function VesselMapSection() {
  const { data, isPending, refetch } = useQuery(mvpQueries.vessels());
  const points = data ? toMapPoints(data.vessels, PORT_MAP.bounds) : [];

  let overlay = null;
  if (isPending) overlay = <CardMessage message="선박 위치를 불러오는 중" />;
  else if (!data) overlay = <CardMessage message={LOAD_ERROR} onRetry={() => refetch()} />;
  else if (data.data_status === "no_observations")
    overlay = <CardMessage message="수신된 AIS 관측이 없어요" />;

  return (
    <VesselMapCard
      points={points}
      total={data?.vessels.length ?? 0}
      image={PORT_MAP.image}
      overlay={overlay}
    />
  );
}

export function SeaStateSection() {
  const { data, isPending, refetch } = useQuery(marineQueries.observation());
  const seaState = data ? toSeaState(data) : null;

  let message = null;
  if (isPending) message = <CardMessage message="해상 관측을 불러오는 중" />;
  else if (!data) message = <CardMessage message={LOAD_ERROR} onRetry={() => refetch()} />;
  else if (!seaState) message = <CardMessage message="해상 관측 정보를 받을 수 없어요" />;

  return <SeaStateCard seaState={seaState ?? undefined} message={message} />;
}

const VISIBLE_ALERTS = 3;

export function AlertsSection() {
  const { data, isPending, refetch } = useQuery(mvpQueries.alerts());
  const alerts = data?.alerts ?? [];

  let message = null;
  if (isPending) message = <CardMessage message="알림을 불러오는 중" />;
  else if (!data) message = <CardMessage message={LOAD_ERROR} onRetry={() => refetch()} />;
  else if (alerts.length === 0) message = <CardMessage message="확인이 필요한 선박이 없어요" />;

  return (
    <AlertsCard
      alerts={alerts.slice(0, VISIBLE_ALERTS).map(toDashboardAlert)}
      total={alerts.length}
      message={message}
    />
  );
}

import type { MarineResponse } from "../../_api/marine";
import type { MvpAlert, MvpKpis, MvpVessel } from "../../_api/mvp";
import { EMPTY_VALUE as EMPTY, formatKstTime } from "../../_lib/format";
import { MAP_STATE_LABELS, REASON_LABELS } from "../../_lib/reliability";
import type { DashboardAlert, DashboardKpi, SeaState, VesselMapPoint } from "./types";

// API 응답을 운영 현황 카드의 표시용 타입으로 바꿉니다.

function formatHours(hours: number) {
  const total = Math.round(hours * 60);
  return `${Math.floor(total / 60)}h ${total % 60}m`;
}

/** 백엔드 ARRIVAL_RADIUS_NM(A6). 접근 선박은 이 반경 안의 최신 관측 선박입니다. */
const ARRIVAL_RADIUS_NM = 30;

export function toDashboardKpis(kpis: MvpKpis): DashboardKpi[] {
  return [
    {
      id: "approaching",
      label: "접근 선박",
      value: String(kpis.approaching_vessel_count),
      unit: "척",
      sub: `항만 ${ARRIVAL_RADIUS_NM}해리 이내`,
    },
    {
      id: "anchored",
      label: "묘박 대기",
      value: String(kpis.stationary_approaching_count),
      unit: "척",
      sub:
        kpis.average_wait_hours_current === null
          ? "평균 대기 산출 전"
          : `평균 대기 ${formatHours(kpis.average_wait_hours_current)}`,
    },
    {
      id: "acceptance",
      label: "권고 수용률",
      value: kpis.acceptance_rate === null ? EMPTY : String(Math.round(kpis.acceptance_rate)),
      unit: kpis.acceptance_rate === null ? undefined : "%",
      sub:
        kpis.advised_count === null
          ? "권고 전송 전"
          : `권고 ${kpis.advised_count}건 · 보류 ${kpis.held_count ?? 0}건`,
    },
    {
      id: "fuel",
      label: "절감 연료",
      value: kpis.fuel_saved_t === null ? EMPTY : String(kpis.fuel_saved_t),
      unit: kpis.fuel_saved_t === null ? undefined : "t",
      sub: kpis.co2_saved_tco2 === null ? "권고 실행 전" : `CO₂ ${kpis.co2_saved_tco2} tCO₂ 감축`,
    },
    {
      id: "attention",
      label: "확인 필요",
      value: String(kpis.alert_count),
      unit: "건",
      sub: "신뢰도 40점 미만 · 항적 이상",
      alert: kpis.alert_count > 0,
    },
  ];
}

/** 지도 이미지가 덮는 위경도 범위 */
export interface MapBounds {
  north: number;
  south: number;
  west: number;
  east: number;
}

/**
 * 위경도를 지도 이미지 기준 % 좌표로 환산합니다. 범위를 벗어난 선박은 제외합니다.
 * 좁은 영역이라 등장방형(위경도 선형) 투영으로 근사합니다.
 */
export function toMapPoints(vessels: MvpVessel[], bounds: MapBounds): VesselMapPoint[] {
  return vessels.flatMap((vessel) => {
    const { latitude, longitude } = vessel.position;
    const x = ((longitude - bounds.west) / (bounds.east - bounds.west)) * 100;
    const y = ((bounds.north - latitude) / (bounds.north - bounds.south)) * 100;
    if (x < 0 || x > 100 || y < 0 || y > 100) return [];
    return [{ id: String(vessel.mmsi), status: MAP_STATE_LABELS[vessel.map_state], x, y }];
  });
}

const COMPASS = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"] as const;

function toCompass(deg: number) {
  return COMPASS[Math.round((((deg % 360) + 360) % 360) / 45) % 8];
}

export function toSeaState(marine: MarineResponse): SeaState | null {
  const obs = marine.observation;
  if (marine.status !== "available" || obs === null) return null;

  const wind =
    obs.wind_direction_deg === null || obs.wind_speed_mps === null
      ? EMPTY
      : `${toCompass(obs.wind_direction_deg)} ${Math.round(obs.wind_direction_deg)}° · ${obs.wind_speed_mps} m/s`;
  const wave =
    obs.significant_wave_height_m === null ? EMPTY : `${obs.significant_wave_height_m} m`;

  return {
    source: `기상청 · ${formatKstTime(obs.observed_at)} 관측`,
    rows: [
      { label: "풍향 · 풍속", value: wind },
      { label: "유의파고", value: wave },
    ],
  };
}

export function toDashboardAlert(alert: MvpAlert): DashboardAlert {
  // reasons 는 감점이 큰 순서로 정렬되어 옵니다.
  const [main] = alert.reasons;
  return {
    id: String(alert.mmsi),
    severity: alert.severity === "high" ? "error" : "warning",
    title: main ? REASON_LABELS[main.code] : "신뢰도 기준 미달",
    meta: `MMSI ${alert.mmsi} · 신뢰도 ${alert.score}`,
    time: formatKstTime(alert.received_at_utc),
  };
}

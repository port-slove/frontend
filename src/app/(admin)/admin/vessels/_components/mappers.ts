import type { MvpVessel } from "../../_api/mvp";
import { formatKstTimeFrom } from "../../_lib/format";
import { MAP_STATE_LABELS, REASON_LABELS, trustTone } from "../../_lib/reliability";
import type { VesselDetail, VesselRow } from "./types";

const UNKNOWN_NAME = "선명 미수신";

// 속도 막대 최대값(kn). 백엔드 상한 35kn 대신 일반 상선 기준입니다.
const SOG_SCALE_KN = 20;

function formatCog(deg: number) {
  return `${String(Math.round(deg) % 360).padStart(3, "0")}°`;
}

export function toVesselRow(
  vessel: MvpVessel,
  names: Map<number, string>,
  evaluatedAt: string,
): VesselRow {
  const { score } = vessel.reliability;
  return {
    id: String(vessel.mmsi),
    name: names.get(vessel.mmsi) ?? UNKNOWN_NAME,
    identifier: `MMSI ${vessel.mmsi}`,
    zone: MAP_STATE_LABELS[vessel.map_state],
    distance: `${vessel.distance_to_port_nm.toFixed(1)} NM`,
    sogCog: `${vessel.sog_kn.toFixed(1)}kn · ${formatCog(vessel.cog_deg)}`,
    trust: { label: String(score), tone: trustTone(score) },
    lastReceived: {
      label: formatKstTimeFrom(vessel.received_at_utc, evaluatedAt),
      tone: vessel.freshness === "fresh" ? "neutral" : "warning",
    },
  };
}

export function toVesselDetail(
  vessel: MvpVessel,
  names: Map<number, string>,
  evaluatedAt: string,
): VesselDetail {
  const { reliability } = vessel;
  const { latitude, longitude } = vessel.position;
  const isAlert = reliability.status === "alert";

  return {
    id: String(vessel.mmsi),
    name: names.get(vessel.mmsi) ?? UNKNOWN_NAME,
    identifiers: `MMSI ${vessel.mmsi}`,
    warning: isAlert
      ? {
          title: "위치 검증 필요 · 권고 자동 보류",
          description:
            reliability.reasons.map((r) => `${REASON_LABELS[r.code]} -${r.points}`).join(" · ") ||
            "신뢰도 기준 미달",
        }
      : undefined,
    trust: {
      value: String(reliability.score),
      progress: reliability.score,
      tone: trustTone(reliability.score),
    },
    sog: {
      value: vessel.sog_kn.toFixed(1),
      progress: Math.min(100, (vessel.sog_kn / SOG_SCALE_KN) * 100),
    },
    specs: [
      { label: "위치", value: `${latitude.toFixed(4)}°N · ${longitude.toFixed(4)}°E` },
      { label: "침로 (COG)", value: formatCog(vessel.cog_deg) },
      { label: "항만까지", value: `${vessel.distance_to_port_nm.toFixed(1)} NM` },
      { label: "마지막 수신", value: formatKstTimeFrom(vessel.received_at_utc, evaluatedAt) },
      { label: "검증 관측 수", value: `최근 ${reliability.observation_count}건` },
    ],
    tags: [
      { label: MAP_STATE_LABELS[vessel.map_state], tone: isAlert ? "error" : "brand" },
      vessel.freshness === "fresh"
        ? { label: "실시간", tone: "success" }
        : { label: "수신 지연 30분+", tone: "warning" },
    ],
  };
}

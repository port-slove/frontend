import Link from "next/link";
import type { ReactNode } from "react";

import {
  AlertIcon,
  AlertItem,
  ArrowRightIcon,
  buttonClassName,
  Card,
  CardHeader,
  Chip,
  WarningIcon,
} from "@/shared/ui";

import type { DashboardAlert } from "./types";

export interface AlertsCardProps {
  alerts: DashboardAlert[];
  total: number;
  /** alerts 대신 보여 줄 로딩·빈 상태·에러 안내 */
  message?: ReactNode;
}

export function AlertsCard({ alerts, total, message }: AlertsCardProps) {
  return (
    <Card variant="outlined" className="flex-1 gap-2">
      <CardHeader title="확인 필요" badge={<Chip>{total}건</Chip>} />
      {message ??
        alerts.map(({ id, severity, ...alert }) => (
          <AlertItem
            key={id}
            severity={severity}
            icon={severity === "error" ? <AlertIcon /> : <WarningIcon />}
            {...alert}
          />
        ))}
      <Link
        href="/admin/reliability"
        className={buttonClassName({ variant: "ghost", size: "md", className: "self-start" })}
      >
        신뢰도 검사에서 보기
        <ArrowRightIcon />
      </Link>
    </Card>
  );
}

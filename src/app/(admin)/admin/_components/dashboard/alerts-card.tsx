import {
  AlertIcon,
  AlertItem,
  ArrowRightIcon,
  Button,
  Card,
  CardHeader,
  Chip,
  WarningIcon,
} from "@/shared/ui";

import type { DashboardAlert } from "./types";

export function AlertsCard({ alerts, total }: { alerts: DashboardAlert[]; total: number }) {
  return (
    <Card variant="outlined" className="flex-1 gap-2">
      <CardHeader title="확인 필요" badge={<Chip>{total}건</Chip>} />
      {alerts.map(({ id, severity, ...alert }) => (
        <AlertItem
          key={id}
          severity={severity}
          icon={severity === "error" ? <AlertIcon /> : <WarningIcon />}
          {...alert}
        />
      ))}
      {/* TODO: 신뢰도 검사 화면이 생기면 링크로 연결 */}
      <Button variant="ghost" size="md" className="self-start">
        신뢰도 검사에서 보기
        <ArrowRightIcon />
      </Button>
    </Card>
  );
}

import { CardHeader, Chip, PropertyRow } from "@/shared/ui";
import { TRACKING } from "./optimization-mock-data";

export function TrackingCard() {
  return (
    <div className="flex w-full flex-col gap-2.5 rounded-2xl border border-default bg-surface p-4">
      <div className="flex items-center gap-3">
        <CardHeader title={`전송·수용 추적 · ${TRACKING.vessel}`} className="flex-1" />
        <Chip tone="warning">{TRACKING.waitingMinutes}</Chip>
      </div>
      <PropertyRow label="권고 생성" value={TRACKING.createdAt} />
      <PropertyRow label="관제사 승인" value={TRACKING.approvedAt} />
      <PropertyRow label="전송" value={TRACKING.sentAt} />
      <PropertyRow label="선박 응답" value={TRACKING.response} />
      <PropertyRow label="재전송" value={TRACKING.resend} />
    </div>
  );
}

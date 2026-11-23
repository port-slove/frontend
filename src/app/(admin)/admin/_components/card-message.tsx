import { Button } from "@/shared/ui";

export interface CardMessageProps {
  message: string;
  /** 있으면 다시 시도 버튼을 보여 줍니다 (에러 상태) */
  onRetry?: () => void;
}

/** 카드 안의 로딩·빈 상태·에러 안내 */
export function CardMessage({ message, onRetry }: CardMessageProps) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-2 py-6">
      <p className="text-body-sm text-tertiary">{message}</p>
      {onRetry && (
        <Button variant="outline" size="md" onClick={onRetry}>
          다시 시도
        </Button>
      )}
    </div>
  );
}

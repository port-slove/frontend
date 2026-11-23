import { Button } from "@/shared/ui";

export interface CardMessageProps {
  message: string;
  onRetry?: () => void;
}

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

"use client";

import { useState } from "react";

import { Toast, type ToastTone } from "@/shared/ui";

function BellIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" className="size-5">
      <path
        d="M10 3a4 4 0 0 0-4 4v2.5L4.5 12h11L14 9.5V7a4 4 0 0 0-4-4Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path d="M8.5 15a1.5 1.5 0 0 0 3 0" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function ChevronRightIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" className="size-4">
      <path
        d="M6 3.5 10 8l-4 4.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 14 14" fill="none" className="size-3.5">
      <path
        d="M1 1l12 12M13 1 1 13"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

interface ScheduleToastData {
  id: string;
  tone: ToastTone;
  title: string;
  description: string;
  actionLabel: string;
  time: string;
}

const INITIAL_TOASTS: ScheduleToastData[] = [
  {
    id: "delay-forecast",
    tone: "warning",
    title: "3부두 B2 하역 지연 예측 +30분",
    description: "진행률 64% · 기존 16:00 → 16:30 HANBIT PIONEER 권고안 자동 갱신됐습니다.",
    actionLabel: "영향 권고 확인",
    time: "1분 전",
  },
  {
    id: "assignment-hold",
    tone: "error",
    title: "SEOHAE STAR 선석 배정 보류",
    description: "신뢰도 32점 · 위치 검증 전까지 3부두 B1 배정이 보류됩니다.",
    actionLabel: "위치 검증하기",
    time: "방금",
  },
];

export function ScheduleToasts() {
  const [toasts, setToasts] = useState(INITIAL_TOASTS);

  if (toasts.length === 0) {
    return null;
  }

  return (
    <div className="flex w-100 flex-col gap-3">
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          tone={toast.tone}
          icon={<BellIcon />}
          closeIcon={<CloseIcon />}
          actionIcon={<ChevronRightIcon />}
          title={toast.title}
          description={toast.description}
          actionLabel={toast.actionLabel}
          time={toast.time}
          onClose={() => setToasts((prev) => prev.filter((t) => t.id !== toast.id))}
        />
      ))}
    </div>
  );
}

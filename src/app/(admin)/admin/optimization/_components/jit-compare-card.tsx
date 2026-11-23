"use client";

import { useState } from "react";

import {
  Button,
  CardHeader,
  Chip,
  CompareCard,
  ConfirmDialog,
  InfoChip,
  PropertyRow,
  Toast,
} from "@/shared/ui";
import { JIT_COMPARE } from "./optimization-mock-data";

function SendIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" className="size-4">
      <path
        d="M14 2 2 7.2l4.5 1.8L8.5 14 14 2Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path d="M6.5 9 14 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

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

export function JitCompareCard() {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [showHoldToast, setShowHoldToast] = useState(true);

  return (
    <div className="relative flex w-full flex-1 flex-col gap-5 rounded-2xl border border-default bg-surface p-4">
      <div className="flex items-center gap-3">
        <CardHeader title="JIT 권고 비교" className="flex-1" />
        <Chip tone="brand">{JIT_COMPARE.vessel}</Chip>
      </div>
      <p className="text-caption-md text-secondary">{JIT_COMPARE.targetEtaNote}</p>

      <div className="flex items-start gap-3">
        <CompareCard
          title="현재 속도 유지"
          speed={JIT_COMPARE.current.speed}
          arrival={JIT_COMPARE.current.arrival}
          wait={JIT_COMPARE.current.wait}
          fuel={JIT_COMPARE.current.fuel}
          co2={JIT_COMPARE.current.co2}
          className="flex-1"
        />
        <CompareCard
          recommended
          title="JIT 권고 속도"
          speed={JIT_COMPARE.recommended.speed}
          arrival={JIT_COMPARE.recommended.arrival}
          wait={JIT_COMPARE.recommended.wait}
          fuel={JIT_COMPARE.recommended.fuel}
          co2={JIT_COMPARE.recommended.co2}
          className="flex-1"
        />
      </div>

      <div className="flex items-center gap-2">
        <p className="text-label-md text-secondary">절감 효과</p>
        {JIT_COMPARE.savings.map((item) => (
          <Chip key={item.label} tone="success">
            {item.label}
          </Chip>
        ))}
      </div>

      <div className="flex flex-col gap-2.5">
        <p className="text-label-md text-secondary">반영된 기상 보정 조건</p>
        <div className="flex flex-wrap gap-2">
          {JIT_COMPARE.weather.map((item) => (
            <InfoChip key={item.label} label={item.label} value={item.value} />
          ))}
        </div>
      </div>

      <PropertyRow label="VSR 저속해역" value={JIT_COMPARE.vsrNote} />

      <div className="flex items-start gap-2">
        <Button variant="outline" className="h-10 w-30 px-5 text-label-md">
          속도 조정
        </Button>
        <Button
          variant="primary"
          className="h-10 flex-1 px-5 text-label-md"
          onClick={() => setConfirmOpen(true)}
        >
          권고 승인·전송
          <SendIcon />
        </Button>
      </div>

      {showHoldToast && (
        <div className="absolute top-4 right-4 z-20 w-100">
          <Toast
            tone="error"
            icon={<BellIcon />}
            closeIcon={<CloseIcon />}
            actionIcon={<ChevronRightIcon />}
            title="SEOHAE STAR 권고 자동 보류"
            description="신뢰도 32점 · 위치 검증 후 Target ETA의 권고 속도를 다시 계산합니다."
            actionLabel="위치 검증하기"
            time="방금"
            onClose={() => setShowHoldToast(false)}
          />
        </div>
      )}

      {confirmOpen && (
        <div className="fixed inset-0 z-30 flex items-center justify-center bg-black/40">
          <ConfirmDialog
            icon={<SendIcon />}
            title={`${JIT_COMPARE.vessel}에 권고를 전송할까요?`}
            description={`권고 ${JIT_COMPARE.recommended.speed} kn · Target ETA ${JIT_COMPARE.recommended.arrival} · 3부두 B2`}
            confirmLabel="전송"
            onCancel={() => setConfirmOpen(false)}
            onConfirm={() => setConfirmOpen(false)}
            className="w-105"
          />
        </div>
      )}
    </div>
  );
}

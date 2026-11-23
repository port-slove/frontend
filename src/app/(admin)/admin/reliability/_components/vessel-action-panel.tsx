"use client";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";

import { ActionOption, Button, CardHeader, PropertyRow, TextField, Toast } from "@/shared/ui";
import { ApiError } from "@/shared/api/client";
import { INCIDENT_TARGET, recordIncident } from "../_api/incident-record";
import { ACTION_HISTORY } from "./reliability-mock-data";

function RadioIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" className="size-5">
      <path
        d="M6 10h8M10 3v2M10 15v2M3 10h2M15 10h2"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function RadarIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" className="size-5">
      <circle cx="10" cy="10" r="6.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M10 10 14 6.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function CloseCircleIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" className="size-5">
      <circle cx="10" cy="10" r="6.5" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="m7.5 7.5 5 5m0-5-5 5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CoastGuardIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" className="size-5">
      <path
        d="M10 3 4 5.5v4c0 4 2.5 6.5 6 7.5 3.5-1 6-3.5 6-7.5v-4L10 3Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" className="size-4">
      <path
        d="m3 8.5 3 3 7-7"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
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

const ACTIONS = [
  {
    id: "vts",
    icon: <RadioIcon />,
    title: "VTS 무선 확인 요청",
    description: "선박에 위치 재확인을 요청합니다",
  },
  {
    id: "radar",
    icon: <RadarIcon />,
    title: "레이더 위치로 대체",
    description: "레이더 추적 위치로 권고를 계산합니다",
  },
  {
    id: "false-alarm",
    icon: <CloseCircleIcon />,
    title: "오탐 처리",
    description: "정상 선박으로 판정하고 경고를 닫습니다",
  },
  {
    id: "coast-guard",
    icon: <CoastGuardIcon />,
    title: "해경 통보",
    description: "이상 항적을 해양경찰에 통보합니다",
  },
] as const;

export function VesselActionPanel() {
  const [selected, setSelected] = useState<string>("vts");
  const [memo, setMemo] = useState("");
  const [showToast, setShowToast] = useState(true);
  const [localResult, setLocalResult] = useState<string | null>(null);

  const mutation = useMutation({
    mutationFn: recordIncident,
  });

  const selectedAction = ACTIONS.find((action) => action.id === selected)!;

  function handleSubmit() {
    const target = INCIDENT_TARGET[selected];
    const reason = memo.trim() || selectedAction.title;

    if (!target) {
      setLocalResult(`${selectedAction.title}로 기록했습니다 (내부 판정 · 외부 통보 없음)`);
      return;
    }

    setLocalResult(null);
    mutation.mutate({ target, vesselId: "SEOHAE STAR", reason });
  }

  return (
    <div className="relative flex w-100 shrink-0 flex-col gap-4">
      <div className="flex flex-col gap-3 rounded-2xl border border-default bg-surface p-4">
        <CardHeader title="이상 선박 조치" />
        {ACTIONS.map((action) => (
          <ActionOption
            key={action.id}
            icon={action.icon}
            title={action.title}
            description={action.description}
            selected={selected === action.id}
            onClick={() => setSelected(action.id)}
          />
        ))}
        <TextField
          multiline
          value={memo}
          onChange={(e) => setMemo(e.target.value)}
          placeholder="판단 메모를 입력하세요"
          className="h-22"
        />
        <Button
          variant="primary"
          fullWidth
          className="h-10 text-label-md"
          disabled={mutation.isPending}
          onClick={handleSubmit}
        >
          {mutation.isPending ? "기록하는 중..." : "조치 기록"}
          <CheckIcon />
        </Button>
        {localResult && <p className="text-caption-md text-success">{localResult}</p>}
        {mutation.isSuccess && (
          <p className="text-caption-md text-success">
            {selectedAction.title} 접수됨 · 상태: {mutation.data.status} ·{" "}
            {new Intl.DateTimeFormat("ko-KR", {
              hour: "2-digit",
              minute: "2-digit",
              hour12: false,
              timeZone: "Asia/Seoul",
            }).format(new Date(mutation.data.computed_at))}
          </p>
        )}
        {mutation.isError && (
          <p className="text-caption-md text-error">
            {mutation.error instanceof ApiError
              ? mutation.error.message
              : "조치 기록에 실패했습니다"}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-2.5 rounded-2xl border border-default bg-surface p-4">
        <CardHeader title="처리 이력" />
        {ACTION_HISTORY.map((item) => (
          <PropertyRow key={item.time} label={item.time} value={item.action} />
        ))}
      </div>

      {showToast && (
        <div className="absolute -top-20 right-0 left-0 z-20">
          <Toast
            tone="error"
            icon={<BellIcon />}
            closeIcon={<CloseIcon />}
            actionIcon={<ChevronRightIcon />}
            title="SEOHAE STAR 권고·선석 배정 보류 중"
            description="조치를 기록하기 전까지는 JIT 권고와 3부두 B1 배정이 보류됩니다."
            actionLabel="조치하기"
            time="방금"
            onClose={() => setShowToast(false)}
            className="w-full"
          />
        </div>
      )}
    </div>
  );
}

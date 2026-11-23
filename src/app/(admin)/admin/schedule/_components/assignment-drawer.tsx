"use client";

import { useState } from "react";

import { ActionOption, Button, IconCircle, SelectField, TextField, Toggle } from "@/shared/ui";

function CloseIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" className="size-5">
      <path
        d="M5 5l10 10M15 5 5 15"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function BerthIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" className="size-5">
      <rect x="3" y="4" width="14" height="12" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M3 9h14" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

const RECOMMENDATIONS = [
  {
    id: "a2",
    title: "A2 선석",
    description: "공선 처리 예상 09:40 · 접안 가능 10:10",
  },
  {
    id: "b2",
    title: "B2 선석",
    description: "공선 처리 예상 11:20 · 접안 가능 11:50",
  },
];

export interface AssignmentDrawerProps {
  onClose?: () => void;
}

export function AssignmentDrawer({ onClose }: AssignmentDrawerProps) {
  const [selectedBerth, setSelectedBerth] = useState(RECOMMENDATIONS[0].id);
  const [shared, setShared] = useState(false);
  const [comment, setComment] = useState("");

  return (
    <div className="flex w-105 shrink-0 flex-col gap-6 rounded-2xl border border-default bg-surface p-5">
      <div className="flex items-center justify-between">
        <p className="text-h3 text-primary">선석 배정 추천</p>
        <button
          type="button"
          aria-label="닫기"
          onClick={onClose}
          className="flex size-8 items-center justify-center rounded-full text-secondary"
        >
          <IconCircle tone="neutral" icon={<CloseIcon />} />
        </button>
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-label-md text-secondary">선박 선택 *</p>
        <SelectField value="SILVER TIDE (SLT1890)" />
        <p className="text-caption-sm text-tertiary">ETA 11.08 09:00 · 벌크 · 흘수 9.2m</p>
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-label-md text-secondary">추천 선석</p>
        {RECOMMENDATIONS.map((option) => (
          <ActionOption
            key={option.id}
            icon={<BerthIcon />}
            title={option.title}
            description={option.description}
            selected={selectedBerth === option.id}
            onClick={() => setSelectedBerth(option.id)}
          />
        ))}
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <p className="text-label-md text-secondary">코멘트</p>
          <label className="flex items-center gap-2">
            <span className="text-caption-md text-tertiary">내 조직에 함께 공유</span>
            <Toggle checked={shared} onCheckedChange={setShared} />
          </label>
        </div>
        <TextField
          multiline
          value={comment}
          onChange={(e) => setComment(e.target.value.slice(0, 500))}
          placeholder="배정 사유나 참고 사항을 남겨주세요"
        />
        <p className="self-end text-caption-sm text-tertiary">{comment.length}/500</p>
      </div>

      <div className="mt-auto flex gap-2">
        <Button variant="outline" className="flex-1" onClick={onClose}>
          기존 배정 유지
        </Button>
        <Button variant="primary" className="flex-1">
          재배정
        </Button>
      </div>
    </div>
  );
}

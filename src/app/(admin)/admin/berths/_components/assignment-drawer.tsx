"use client";

import { useState } from "react";

import {
  ActionOption,
  AnchorIcon,
  Button,
  CheckIcon,
  CloseIcon,
  TextField,
  Toggle,
} from "@/shared/ui";

import type { AssignmentDraft } from "./types";

const COMMENT_MAX = 500;

export interface AssignmentDrawerProps {
  draft: AssignmentDraft;
  onClose: () => void;
}

export function AssignmentDrawer({ draft, onClose }: AssignmentDrawerProps) {
  const [vesselSelected, setVesselSelected] = useState(true);
  const [optionId, setOptionId] = useState(draft.selectedOptionId);
  const [shareWithOrg, setShareWithOrg] = useState(false);
  const [comment, setComment] = useState("");

  return (
    <aside
      aria-label="선석 배정 추천"
      className="flex w-106 shrink-0 flex-col gap-5 rounded-2xl bg-surface p-4 shadow-md"
    >
      <div className="flex items-center justify-between gap-2">
        <h2 className="text-h3 text-primary">선석 배정 추천</h2>
        <button
          type="button"
          aria-label="배정 추천 닫기"
          onClick={onClose}
          className="flex size-6 items-center justify-center rounded-lg text-primary"
        >
          <CloseIcon />
        </button>
      </div>

      <section className="flex flex-col gap-2">
        <p className="text-label-md text-secondary">선박 선택 *</p>
        {/* TODO: 선박 검색/선택 드롭다운 */}
        <div className="flex items-center gap-2 rounded-lg bg-page px-3.5 py-3">
          <p className="flex-1 text-label-md text-primary">
            {vesselSelected ? (
              draft.vesselName
            ) : (
              <span className="text-tertiary">선박을 선택하세요</span>
            )}
          </p>
          {vesselSelected && (
            <button
              type="button"
              aria-label="선박 선택 해제"
              onClick={() => setVesselSelected(false)}
              className="text-secondary"
            >
              <CloseIcon className="size-4" />
            </button>
          )}
        </div>
        {vesselSelected && <p className="text-caption-md text-tertiary">{draft.vesselMeta}</p>}
      </section>

      <section role="radiogroup" aria-label="추천 선석" className="flex flex-col gap-2">
        <p className="text-label-md text-secondary">추천 선석</p>
        {draft.message && <p className="text-body-sm text-error">{draft.message}</p>}
        {draft.options.map((option) => (
          <ActionOption
            key={option.id}
            role="radio"
            aria-checked={option.id === optionId}
            selected={option.id === optionId}
            icon={<AnchorIcon />}
            title={option.title}
            description={option.description}
            onClick={() => setOptionId(option.id)}
          />
        ))}
      </section>

      <section className="flex flex-col gap-2">
        <div className="flex items-center justify-between gap-2">
          <label htmlFor="assignment-comment" className="text-label-md text-secondary">
            코멘트
          </label>
          <div className="flex items-center gap-2">
            <span className="text-caption-md text-secondary">내 조직에 함께 공유</span>
            <Toggle
              checked={shareWithOrg}
              onCheckedChange={setShareWithOrg}
              aria-label="내 조직에 함께 공유"
            />
          </div>
        </div>
        <TextField
          multiline
          id="assignment-comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          maxLength={COMMENT_MAX}
          placeholder="재배정 사유나 전달 사항을 입력해주세요."
          className="h-26"
        />
        <p className="text-caption-md text-tertiary">
          {comment.length} / {COMMENT_MAX}
        </p>
      </section>

      <span className="flex-1" />

      {/* TODO: 배정 API 가 생기면 mutation 으로 연결 */}
      <div className="flex gap-2">
        <Button variant="outline" size="md" className="flex-1">
          기존 배정 유지
        </Button>
        <Button size="md" className="flex-1 shadow-none" disabled={!vesselSelected}>
          재배정
          <CheckIcon />
        </Button>
      </div>
    </aside>
  );
}

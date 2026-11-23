"use client";

import { useState } from "react";

import { cn } from "@/shared/lib/cn";
import { Card, ScheduleBlock, Tooltip } from "@/shared/ui";

import { formatDateTime, formatTime, getDays, getTicks, hoursFrom, toPercent } from "./gantt-time";
import type { GanttRange, Pier, ScheduleItem } from "./types";

const LEGEND: { label: string; swatch: string }[] = [
  { label: "하역 중", swatch: "bg-brand" },
  { label: "접안 예정", swatch: "bg-blue-400" },
  { label: "대기 예상", swatch: "bg-warning" },
  { label: "지연", swatch: "bg-error" },
  { label: "보류", swatch: "bg-gray-400" },
  { label: "추천", swatch: "border-[1.5px] border-dashed border-brand" },
];

export interface BerthGanttProps {
  range: GanttRange;
  piers: Pier[];
  items: ScheduleItem[];
  /** 꺼져 있으면 블록을 눌러도 상세 툴팁을 띄우지 않습니다. */
  detailEnabled: boolean;
}

export function BerthGantt({ range, piers, items, detailEnabled }: BerthGanttProps) {
  const [openId, setOpenId] = useState<string | null>(null);

  const days = getDays(range);
  const ticks = getTicks(range);
  const nowPercent = toPercent(range, hoursFrom(range, range.now));
  const rowCount = piers.reduce((sum, pier) => sum + pier.berths.length, 0);
  let rowIndex = 0;

  return (
    <Card variant="outlined" className="min-w-0 flex-1 gap-0 p-0">
      <div className="flex">
        {/* 부두 · 선석 라벨 열 */}
        <div className="flex shrink-0 flex-col">
          <div className="flex h-17 items-center rounded-tl-2xl border-b border-default bg-page text-label-sm text-secondary">
            <span className="flex w-24 items-center self-stretch border-r border-default px-6">
              부두
            </span>
            <span className="flex w-18 items-center self-stretch border-r border-gray-300 px-4">
              선석
            </span>
          </div>
          {piers.map((pier, index) => (
            <div key={pier.name} className={cn("flex", index > 0 && "border-t-2 border-brand/80")}>
              <div className="flex w-24 flex-col justify-center border-r border-default px-4">
                <p className="text-h4 text-primary">{pier.name}</p>
                <p className="text-caption-md text-brand">{pier.operator}</p>
              </div>
              <div className="flex w-18 flex-col border-r border-gray-300">
                {pier.berths.map((berth) => (
                  <p
                    key={berth}
                    className="flex h-22 items-center border-b border-default px-6 text-label-md text-primary"
                  >
                    {berth}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* 타임라인 열 */}
        <div className="relative min-w-0 flex-1">
          <div className="relative h-17 overflow-hidden rounded-tr-2xl border-b border-default bg-page">
            {days.map((day) => (
              <div
                key={day.label}
                className="absolute inset-y-0 flex justify-center border-l border-default first:border-l-0"
                style={{
                  left: `${toPercent(range, day.startHour)}%`,
                  width: `${toPercent(range, day.endHour) - toPercent(range, day.startHour)}%`,
                }}
              >
                <span
                  className={cn(
                    "mt-2 text-label-md whitespace-nowrap",
                    day.today ? "text-brand" : "text-primary",
                  )}
                >
                  {day.label}
                </span>
              </div>
            ))}
            {ticks.map((tick) => (
              <span
                key={tick.hour}
                className="absolute top-10.5 -translate-x-1/2 text-caption-md text-tertiary"
                style={{ left: `${toPercent(range, tick.hour)}%` }}
              >
                {tick.label}
              </span>
            ))}
          </div>

          {/* 배경: 오늘 구간 · 눈금선 · 현재 시각 */}
          <div className="absolute inset-x-0 top-17 bottom-0">
            {days
              .filter((day) => day.today)
              .map((day) => (
                <div
                  key={day.label}
                  className="absolute inset-y-0 bg-brand-subtle opacity-60"
                  style={{
                    left: `${toPercent(range, day.startHour)}%`,
                    width: `${toPercent(range, day.endHour) - toPercent(range, day.startHour)}%`,
                  }}
                />
              ))}
            {ticks
              .filter((tick) => tick.hour < range.hours)
              .map((tick) => (
                <div
                  key={tick.hour}
                  className="absolute inset-y-0 w-px bg-gray-200 opacity-70"
                  style={{ left: `${toPercent(range, tick.hour)}%` }}
                />
              ))}
            <div
              className="absolute inset-y-0 border-l-[1.5px] border-dashed border-brand"
              style={{ left: `${nowPercent}%` }}
            />
          </div>

          {piers.map((pier, pierIndex) => (
            <div key={pier.name} className={cn(pierIndex > 0 && "border-t-2 border-brand/80")}>
              {pier.berths.map((berth) => {
                const currentRow = rowIndex++;
                // 아래쪽 두 줄은 툴팁이 카드 밖으로 넘치지 않게 위로 띄웁니다.
                const openAbove = currentRow >= rowCount - 2;
                return (
                  <div key={berth} className="relative h-22 border-b border-default">
                    {items
                      .filter((item) => item.berth === berth)
                      .map((item) => {
                        const left = toPercent(range, hoursFrom(range, item.start));
                        const right = toPercent(range, hoursFrom(range, item.end));
                        const open = detailEnabled && openId === item.id;
                        return (
                          <div
                            key={item.id}
                            className={cn("absolute top-2.5 px-0.5", open && "z-20")}
                            style={{ left: `${left}%`, width: `${right - left}%` }}
                          >
                            <ScheduleBlock
                              status={item.status}
                              time={`${formatTime(item.start)} – ${formatTime(item.end)}`}
                              name={item.name}
                              meta={item.meta}
                              aria-expanded={detailEnabled ? open : undefined}
                              onClick={() => detailEnabled && setOpenId(open ? null : item.id)}
                              onBlur={() => setOpenId(null)}
                              className="h-17 w-full whitespace-nowrap"
                            />
                            {open && (
                              <Tooltip
                                role="tooltip"
                                label="선박명"
                                title={item.name}
                                code={item.voyage ? `(${item.voyage})` : ""}
                                rows={tooltipRows(pier.name, item)}
                                className={cn(
                                  "absolute shadow-md",
                                  openAbove ? "bottom-full mb-1" : "top-full mt-1",
                                  left > 60 ? "right-2" : "left-2",
                                )}
                              />
                            )}
                          </div>
                        );
                      })}
                  </div>
                );
              })}
            </div>
          ))}

          <span
            className="absolute top-14 z-10 -translate-x-1/2 rounded-full bg-brand px-2 py-0.5 text-label-sm whitespace-nowrap text-on-brand"
            style={{ left: `${nowPercent}%` }}
          >
            현재 {formatTime(range.now)}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-5 p-4">
        {LEGEND.map((item) => (
          <span key={item.label} className="flex items-center gap-1.5">
            <span className={cn("size-3 rounded-xs", item.swatch)} />
            <span className="text-caption-md text-secondary">{item.label}</span>
          </span>
        ))}
        <span className="flex-1" />
        <span className="text-caption-md text-tertiary">
          블록을 누르면 상세, 길게 누르면 코멘트
        </span>
      </div>
    </Card>
  );
}

function tooltipRows(pierName: string, item: ScheduleItem) {
  const rows = [
    { label: "상태", value: item.statusLabel ?? item.status },
    { label: "선석", value: `${pierName} ${item.berth}` },
    { label: "접안 예정", value: formatDateTime(item.start) },
    { label: "출항 예정", value: formatDateTime(item.end) },
  ];
  if (item.advisory) rows.push({ label: "권고 속도", value: item.advisory });
  return rows;
}

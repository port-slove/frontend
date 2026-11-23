import { ScheduleBlock, Tooltip } from "@/shared/ui";
import { cn } from "@/shared/lib/cn";
import type { GanttGroup } from "./schedule-mock-data";

// 2일(48시간) 범위를 보여주는 간트. 실제 날짜 연동 전 퍼블리싱 단계라 "타임라인 시작 시각 기준 경과 시간(h)"으로 단순화했습니다.
const TOTAL_HOURS = 48;
const HOUR_TICKS = [0, 6, 12, 18, 24, 30, 36, 42, 48];
const TODAY_RANGE: [number, number] = [2, 20];
const NOW_HOUR = 20.5;

export interface BerthGanttProps {
  groups: GanttGroup[];
}

function pct(hour: number) {
  return `${(hour / TOTAL_HOURS) * 100}%`;
}

function formatHour(hour: number) {
  const h = Math.floor(hour) % 24;
  const m = Math.round((hour % 1) * 60);
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

export function BerthGantt({ groups }: BerthGanttProps) {
  return (
    <div className="relative rounded-2xl border border-default bg-surface">
      <div className="flex border-b border-default">
        <div className="flex w-42 shrink-0">
          <div className="flex w-24 items-center px-4 py-4.5 text-label-sm text-secondary">
            부두
          </div>
          <div className="flex w-18 items-center text-label-sm text-secondary">선석</div>
        </div>
        <div className="relative h-17 flex-1">
          {[0, 24].map((h) => (
            <p
              key={h}
              className="absolute top-2 text-label-sm whitespace-nowrap text-primary"
              style={{ left: pct(h), transform: h === 0 ? undefined : "translateX(-50%)" }}
            >
              {h === 0 ? "11.07(토)" : "11.08(일)"}
            </p>
          ))}
          {HOUR_TICKS.map((h) => (
            <div
              key={h}
              className="bg-default absolute top-10 bottom-0 w-px"
              style={{ left: pct(h) }}
            />
          ))}
          {HOUR_TICKS.filter((h) => h !== 0 && h !== TOTAL_HOURS).map((h) => (
            <p
              key={h}
              className="absolute top-10 -translate-x-1/2 text-caption-sm text-tertiary"
              style={{ left: pct(h) }}
            >
              {String(h % 24).padStart(2, "0")}
            </p>
          ))}
        </div>
      </div>

      {groups.map((group) => (
        <div key={group.pier} className="flex border-b border-default last:border-b-0">
          <div className="flex w-24 shrink-0 flex-col justify-center gap-0.5 border-r border-default px-4 py-2">
            <p className="text-h4 text-primary">{group.pier}</p>
            <p className="text-caption-md text-tertiary">{group.subtitle}</p>
          </div>
          <div className="flex flex-1 flex-col">
            {group.rows.map((row, i) => (
              <div
                key={row.berth}
                className={cn("flex", i !== group.rows.length - 1 && "border-b border-default")}
              >
                <div className="flex w-18 shrink-0 items-center justify-center border-r border-default text-label-md text-secondary">
                  {row.berth}
                </div>
                <div className="relative h-22 flex-1">
                  <div
                    className="absolute inset-y-0 bg-brand-subtle"
                    style={{
                      left: pct(TODAY_RANGE[0]),
                      width: pct(TODAY_RANGE[1] - TODAY_RANGE[0]),
                    }}
                  />
                  {HOUR_TICKS.map((h) => (
                    <div
                      key={h}
                      className="bg-default absolute inset-y-0 w-px"
                      style={{ left: pct(h) }}
                    />
                  ))}
                  {row.blocks.map((block) => (
                    <div
                      key={block.id}
                      className="group absolute top-2.5"
                      style={{ left: pct(block.start), width: pct(block.end - block.start) }}
                    >
                      <ScheduleBlock
                        status={block.status}
                        time={`${formatHour(block.start)} – ${formatHour(block.end)}`}
                        name={block.name}
                        meta={block.meta}
                        className="w-full"
                      />
                      <Tooltip
                        label="선박명"
                        title={block.name}
                        code={`(${block.detail.code})`}
                        rows={[
                          { label: "상태", value: block.status },
                          { label: "선석", value: block.detail.berth },
                          { label: "접안 예정", value: block.detail.arrival },
                          { label: "출항 예정", value: block.detail.departure },
                          { label: "권고 속도", value: block.detail.speed },
                        ]}
                        className="pointer-events-none invisible absolute top-full left-0 z-20 mt-2 opacity-0 transition-opacity group-hover:visible group-hover:opacity-100"
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      <div
        className="pointer-events-none absolute top-0 bottom-0 w-px bg-brand"
        style={{ left: `calc(10.5rem + (100% - 10.5rem) * ${NOW_HOUR / TOTAL_HOURS})` }}
      >
        <span className="absolute -top-0.5 left-1/2 -translate-x-1/2 -translate-y-full rounded-md bg-brand px-3 py-1 text-label-sm whitespace-nowrap text-on-brand">
          현재 {formatHour(NOW_HOUR)}
        </span>
      </div>
    </div>
  );
}

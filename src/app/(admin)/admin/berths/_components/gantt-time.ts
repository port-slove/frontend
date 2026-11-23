import type { GanttRange } from "./types";

// 간트 좌표 계산용 헬퍼입니다. 시각 문자열은 "YYYY-MM-DDTHH:mm" 형식이며,
// 화면에 보이는 문구는 Date 포맷 대신 문자열을 잘라 만들어 서버·클라이언트 결과가 같게 합니다.

const HOUR_MS = 60 * 60 * 1000;
const TICK_HOURS = 6;
const WEEKDAYS = ["일", "월", "화", "수", "목", "금", "토"];

function toMs(value: string) {
  return Date.parse(value);
}

/** 범위 시작으로부터 몇 시간 뒤인지 */
export function hoursFrom(range: GanttRange, value: string) {
  return (toMs(value) - toMs(range.start)) / HOUR_MS;
}

/** 범위 대비 위치(%) */
export function toPercent(range: GanttRange, hours: number) {
  const clamped = Math.min(Math.max(hours, 0), range.hours);
  return (clamped / range.hours) * 100;
}

/** "11.07 16:30" */
export function formatDateTime(value: string) {
  return `${value.slice(5, 7)}.${value.slice(8, 10)} ${value.slice(11, 16)}`;
}

/** "16:30" */
export function formatTime(value: string) {
  return value.slice(11, 16);
}

function dayLabel(date: string) {
  const [year, month, day] = date.split("-").map(Number);
  const weekday = WEEKDAYS[new Date(year, month - 1, day).getDay()];
  return `${date.slice(5, 7)}.${date.slice(8, 10)}(${weekday})`;
}

function addDays(date: string, days: number) {
  const [year, month, day] = date.split("-").map(Number);
  const next = new Date(year, month - 1, day + days);
  const mm = String(next.getMonth() + 1).padStart(2, "0");
  const dd = String(next.getDate()).padStart(2, "0");
  return `${next.getFullYear()}-${mm}-${dd}`;
}

export interface GanttDay {
  label: string;
  startHour: number;
  endHour: number;
  today: boolean;
}

/** 범위를 날짜별 구간으로 나눕니다. */
export function getDays(range: GanttRange): GanttDay[] {
  const days: GanttDay[] = [];
  const today = range.now.slice(0, 10);
  let date = range.start.slice(0, 10);
  let startHour = 0;

  while (startHour < range.hours) {
    const nextDate = addDays(date, 1);
    const endHour = Math.min(hoursFrom(range, `${nextDate}T00:00`), range.hours);
    days.push({ label: dayLabel(date), startHour, endHour, today: date === today });
    date = nextDate;
    startHour = endHour;
  }
  return days;
}

export interface GanttTick {
  hour: number;
  label: string;
}

/** 6시간 간격 눈금. 자정은 Figma 처럼 "24" 로 표시합니다. */
export function getTicks(range: GanttRange): GanttTick[] {
  const startHourOfDay = Number(range.start.slice(11, 13));
  const ticks: GanttTick[] = [];
  for (let hour = TICK_HOURS; hour <= range.hours; hour += TICK_HOURS) {
    const hourOfDay = (startHourOfDay + hour) % 24;
    ticks.push({ hour, label: String(hourOfDay === 0 ? 24 : hourOfDay).padStart(2, "0") });
  }
  return ticks;
}

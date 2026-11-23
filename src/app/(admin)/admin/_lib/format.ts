const kstTime = new Intl.DateTimeFormat("ko-KR", {
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
  timeZone: "Asia/Seoul",
});

/** ISO 시각을 한국 시간 HH:mm 으로 표시합니다. */
export function formatKstTime(iso: string) {
  return kstTime.format(new Date(iso));
}

export const EMPTY_VALUE = "—";

const kstDate = new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Seoul" });

/** 기준 시각과 날짜(한국 시간)가 다르면 MM.DD 를 붙여 HH:mm 으로 표시합니다. */
export function formatKstTimeFrom(iso: string, referenceIso: string) {
  const date = kstDate.format(new Date(iso));
  if (date === kstDate.format(new Date(referenceIso))) return formatKstTime(iso);
  const [, month, day] = date.split("-");
  return `${month}.${day} ${formatKstTime(iso)}`;
}

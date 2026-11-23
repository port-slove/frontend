const kstTime = new Intl.DateTimeFormat("ko-KR", {
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
  timeZone: "Asia/Seoul",
});

export function formatKstTime(iso: string) {
  return kstTime.format(new Date(iso));
}

export const EMPTY_VALUE = "—";

const kstDate = new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Seoul" });

export function formatKstTimeFrom(iso: string, referenceIso: string) {
  const date = kstDate.format(new Date(iso));
  if (date === kstDate.format(new Date(referenceIso))) return formatKstTime(iso);
  const [, month, day] = date.split("-");
  return `${month}.${day} ${formatKstTime(iso)}`;
}

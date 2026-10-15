import type { SarapiquiEvent } from "@/data/events";

export type DateFilter = "hoy" | "manana" | "semana" | "mes" | "futuros";

export const DATE_FILTERS: { id: DateFilter; label: string }[] = [
  { id: "hoy", label: "Hoy" },
  { id: "manana", label: "Mañana" },
  { id: "semana", label: "Esta semana" },
  { id: "mes", label: "Este mes" },
  { id: "futuros", label: "Próximos" },
];

export const DEFAULT_FILTER: DateFilter = "mes";

const DOW_SHORT = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];
const DOW_LONG = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
const MONTH_SHORT = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "set", "oct", "nov", "dic"];
const MONTH_LONG = [
  "enero", "febrero", "marzo", "abril", "mayo", "junio",
  "julio", "agosto", "setiembre", "octubre", "noviembre", "diciembre",
];

function startOfDay(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function addDays(date: Date, days: number) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() + days);
}

function endOfMonth(date: Date) {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0);
}

/** Domingo de la semana actual (la semana termina el domingo). */
function endOfWeek(date: Date) {
  const day = date.getDay();
  return addDays(date, day === 0 ? 0 : 7 - day);
}

export function getEventDate(event: SarapiquiEvent, today: Date) {
  const base = startOfDay(today);
  const date = addDays(base, event.dayOffset);
  if (event.keepInMonth) {
    const last = endOfMonth(base);
    return date > last ? last : date;
  }
  return date;
}

export function matchesFilter(date: Date, filter: DateFilter, today: Date) {
  const t = startOfDay(today).getTime();
  const d = startOfDay(date).getTime();
  switch (filter) {
    case "hoy":
      return d === t;
    case "manana":
      return d === addDays(today, 1).getTime();
    case "semana":
      return d >= t && d <= endOfWeek(startOfDay(today)).getTime();
    case "mes":
      return d >= t && d <= endOfMonth(today).getTime();
    case "futuros":
      return d > endOfMonth(today).getTime();
  }
}

export function isToday(date: Date, today: Date) {
  return startOfDay(date).getTime() === startOfDay(today).getTime();
}

export function relativeDayLabel(date: Date, today: Date) {
  const diff = Math.round((startOfDay(date).getTime() - startOfDay(today).getTime()) / 86_400_000);
  if (diff === 0) return "Hoy";
  if (diff === 1) return "Mañana";
  return `${DOW_SHORT[date.getDay()]} ${date.getDate()} ${MONTH_SHORT[date.getMonth()]}`;
}

export function longDateLabel(date: Date) {
  return `${DOW_LONG[date.getDay()]} ${date.getDate()} de ${MONTH_LONG[date.getMonth()]}`;
}

export function monthShort(date: Date) {
  return MONTH_SHORT[date.getMonth()];
}

export function filterRangeLabel(filter: DateFilter, today: Date) {
  switch (filter) {
    case "hoy":
      return longDateLabel(today);
    case "manana":
      return longDateLabel(addDays(today, 1));
    case "semana": {
      const end = endOfWeek(startOfDay(today));
      return `${today.getDate()} – ${end.getDate()} de ${MONTH_LONG[end.getMonth()]}`;
    }
    case "mes":
      return `${capitalize(MONTH_LONG[today.getMonth()])} ${today.getFullYear()}`;
    case "futuros": {
      const next = new Date(today.getFullYear(), today.getMonth() + 1, 1);
      return `${capitalize(MONTH_LONG[next.getMonth()])} en adelante`;
    }
  }
}

/** "18:00" → "6:00 p.m." */
export function formatTime(time: string) {
  const [h, m] = time.split(":").map(Number);
  const suffix = h < 12 ? "a.m." : "p.m.";
  const hour12 = h % 12 === 0 ? 12 : h % 12;
  return `${hour12}:${String(m).padStart(2, "0")} ${suffix}`;
}

function capitalize(text: string) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

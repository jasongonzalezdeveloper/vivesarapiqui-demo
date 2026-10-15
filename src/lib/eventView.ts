import type { SarapiquiEvent } from "@/data/events";
import { formatTime, getEventDate, isToday, longDateLabel, monthShort, relativeDayLabel } from "./dates";

/** Evento con su fecha ya calculada y las etiquetas listas para mostrar. */
export type EventView = SarapiquiEvent & {
  date: Date;
  isToday: boolean;
  day: number;
  month: string;
  dayLabel: string;
  longDate: string;
  time: string;
  when: string;
};

export function toEventView(event: SarapiquiEvent, today: Date): EventView {
  const date = getEventDate(event, today);
  const dayLabel = relativeDayLabel(date, today);
  const time = formatTime(event.startTime);
  return {
    ...event,
    date,
    isToday: isToday(date, today),
    day: date.getDate(),
    month: monthShort(date),
    dayLabel,
    longDate: longDateLabel(date),
    time,
    when: `${dayLabel} · ${time}`,
  };
}

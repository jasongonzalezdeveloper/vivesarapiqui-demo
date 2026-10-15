"use client";

import clsx from "clsx";
import type { EventView } from "@/lib/eventView";
import { DateTile } from "./EventBits";

type Props = {
  events: EventView[];
  selectedId: string | null;
  title: string;
  subtitle: string;
  onSelect: (id: string) => void;
};

/** Lista lateral de eventos en escritorio. */
export function EventListPanel({ events, selectedId, title, subtitle, onSelect }: Props) {
  return (
    <section
      aria-label="Eventos"
      className="hidden w-96 shrink-0 flex-col overflow-hidden rounded-2xl border border-linea bg-white lg:flex"
    >
      <div className="flex items-baseline justify-between border-b border-linea px-4.5 pt-4 pb-3">
        <h2 className="font-display text-xl font-extrabold">{title}</h2>
        <span className="text-[13px] font-semibold text-gris">{subtitle}</span>
      </div>
      <div className="flex-1 overflow-y-auto">
        {events.length === 0 && (
          <p className="m-4 rounded-xl bg-arena px-4 py-6 text-center text-sm text-tinta-2">
            No hay eventos en estas fechas. Pruebe con otro filtro.
          </p>
        )}
        {events.map((event) => {
          const active = event.id === selectedId;
          return (
            <button
              key={event.id}
              type="button"
              aria-pressed={active}
              onClick={() => onSelect(event.id)}
              className={clsx(
                "flex w-full gap-3.5 border-b border-l-4 border-b-[#efebe2] px-4.5 py-3.5 text-left transition-colors hover:bg-arena-200",
                active ? "border-l-selva-700 bg-arena-200" : "border-l-transparent",
              )}
            >
              <DateTile event={event} className="h-14.5 w-13 justify-center border border-linea" />
              <span className="flex min-w-0 flex-col gap-0.5">
                <span className="text-[15px] leading-tight font-bold">{event.name}</span>
                <span className="text-[13px] text-tinta-2">
                  <span className={event.isToday ? "font-bold text-rana" : undefined}>{event.dayLabel}</span> ·{" "}
                  {event.time} · {event.place}
                </span>
                <span className="text-xs text-gris">{event.organizer}</span>
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}

"use client";

import { useState } from "react";
import clsx from "clsx";
import { ChevronDown, X } from "lucide-react";
import type { EventView } from "@/lib/eventView";
import { PhotoPlaceholder } from "@/components/ui/PhotoPlaceholder";
import { CategoryTag, DateTile, DayBadge, EventActions, EventFacts, PhotoStrip } from "./EventBits";

type Props = {
  events: EventView[];
  selected: EventView | null;
  title: string;
  subtitle: string;
  onSelect: (id: string) => void;
  onClose: () => void;
};

/**
 * Panel inferior del mapa en el teléfono: lista horizontal o detalle del evento elegido.
 * La lista se puede ocultar para ver el mapa completo; queda solo la barra con el total.
 */
export function EventSheet({ events, selected, title, subtitle, onSelect, onClose }: Props) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <section
      aria-label={selected ? "Detalle del evento" : "Lista de eventos"}
      className={clsx(
        "absolute inset-x-0 bottom-0 z-30 rounded-t-[20px] bg-white shadow-[0_-6px_24px_rgb(16_48_42/0.16)] lg:hidden",
        selected ? "pt-4 pb-3.5" : collapsed ? "pt-1 pb-1" : "pt-1 pb-3.5",
      )}
    >
      {selected ? (
        <>
          <button
            type="button"
            aria-label="Cerrar detalle"
            onClick={onClose}
            className="absolute top-1.5 right-2.5 flex size-11 items-center justify-center rounded-full bg-arena"
          >
            <X size={18} strokeWidth={2.4} aria-hidden="true" />
          </button>
          <div className="flex h-8 items-center gap-2 px-4">
            <CategoryTag category={selected.category} />
            <DayBadge event={selected} />
          </div>
          <div className="px-4 pt-1">
            <PhotoStrip event={selected} />
          </div>
          <div className="flex flex-col gap-2 px-4 pt-3">
            <h2 className="font-display text-[22px] leading-tight font-extrabold tracking-tight">{selected.name}</h2>
            <EventFacts event={selected} />
            <div className="mt-1.5">
              <EventActions event={selected} />
            </div>
          </div>
        </>
      ) : (
        <>
          <button
            type="button"
            aria-expanded={!collapsed}
            aria-controls="lista-eventos-movil"
            onClick={() => setCollapsed((c) => !c)}
            className="flex min-h-12 w-full items-center gap-2 px-4 text-left"
          >
            <h2 className="font-display text-[19px] font-extrabold tracking-tight">{title}</h2>
            <span className="min-w-0 flex-1 truncate text-right text-[13px] font-semibold text-gris">{subtitle}</span>
            <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-arena">
              <ChevronDown
                size={18}
                strokeWidth={2.4}
                className={clsx("transition-transform", collapsed && "rotate-180")}
                aria-hidden="true"
              />
            </span>
            <span className="sr-only">{collapsed ? "Mostrar lista" : "Ocultar lista"}</span>
          </button>
          <div id="lista-eventos-movil" hidden={collapsed}>
            {events.length === 0 ? (
              <p className="mx-4 rounded-xl bg-arena px-4 py-6 text-center text-sm text-tinta-2">
                No hay eventos en estas fechas. Pruebe con otro filtro.
              </p>
            ) : (
              <div className="no-scrollbar flex snap-x gap-2.5 overflow-x-auto px-4 pb-0.5">
                {events.map((event) => (
                  <button
                    key={event.id}
                    type="button"
                    onClick={() => onSelect(event.id)}
                    className="flex w-68 shrink-0 snap-start gap-3 rounded-[14px] border border-linea bg-arena p-2.5 text-left"
                  >
                    <PhotoPlaceholder className="flex h-25 w-19 shrink-0 items-end rounded-[10px] p-1.5">
                      <DateTile event={event} />
                    </PhotoPlaceholder>
                    <span className="flex min-w-0 flex-col gap-1">
                      <CategoryTag category={event.category} />
                      <span className="text-[15px] leading-tight font-bold">{event.name}</span>
                      <span className="text-[13px] text-gris">{event.when}</span>
                      <span className="text-[13px] text-gris">{event.place}</span>
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </section>
  );
}

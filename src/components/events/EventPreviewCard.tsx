"use client";

import { X } from "lucide-react";
import type { EventView } from "@/lib/eventView";
import { PhotoPlaceholder } from "@/components/ui/PhotoPlaceholder";
import { CategoryLabel, DayBadge, EventActions, EventFacts } from "./EventBits";

/** Tarjeta flotante sobre el mapa en escritorio. */
export function EventPreviewCard({ event, onClose }: { event: EventView; onClose: () => void }) {
  return (
    <article className="absolute top-4 right-4 z-30 hidden w-80 overflow-hidden rounded-2xl bg-white shadow-[0_10px_30px_rgb(16_48_42/0.22)] lg:block">
      <div className="flex h-32 gap-1">
        <PhotoPlaceholder label={`Foto principal de ${event.name}`} className="flex-2" />
        <div className="flex flex-1 flex-col gap-1">
          <PhotoPlaceholder className="flex-1" />
          <PhotoPlaceholder className="flex flex-1 items-center justify-center">
            {event.photos > 3 && (
              <span className="rounded-full bg-tinta/75 px-2 py-0.5 text-xs font-bold text-white">+{event.photos - 3}</span>
            )}
          </PhotoPlaceholder>
        </div>
      </div>
      <button
        type="button"
        aria-label="Cerrar detalle"
        onClick={onClose}
        className="absolute top-2 right-2 flex size-9 items-center justify-center rounded-full bg-white/95 shadow"
      >
        <X size={16} strokeWidth={2.4} aria-hidden="true" />
      </button>
      <div className="flex flex-col gap-2.5 p-4">
        <div className="flex items-center gap-2">
          <CategoryLabel>{event.category}</CategoryLabel>
          <DayBadge event={event} />
        </div>
        <h2 className="font-display text-xl leading-tight font-extrabold">{event.name}</h2>
        <EventFacts event={event} />
        <EventActions event={event} size="sm" />
      </div>
    </article>
  );
}

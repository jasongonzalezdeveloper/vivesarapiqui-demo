import Link from "next/link";
import clsx from "clsx";
import { Calendar, MapPin, Navigation, User } from "lucide-react";
import type { EventView } from "@/lib/eventView";
import { getCategory, type EventCategory } from "@/data/categories";
import { directionsUrl } from "@/lib/maps";
import { PhotoPlaceholder } from "@/components/ui/PhotoPlaceholder";

export function DayBadge({ event }: { event: EventView }) {
  return (
    <span
      className={clsx(
        "rounded-full px-2 py-0.5 text-[11px] font-bold",
        event.isToday ? "bg-rana text-white" : "bg-celeste-100 text-rio",
      )}
    >
      {event.dayLabel}
    </span>
  );
}

/** Tipo de evento con su color (el mismo del pin en el mapa). */
export function CategoryTag({ category, className }: { category: EventCategory; className?: string }) {
  const c = getCategory(category);
  return (
    <span
      style={{ color: c.color }}
      className={clsx("inline-flex items-center gap-1.5 text-[11px] font-bold tracking-[0.05em] uppercase", className)}
    >
      <span style={{ backgroundColor: c.color }} className="size-2 shrink-0 rounded-full" aria-hidden="true" />
      {c.label}
    </span>
  );
}

/** Píldora con el tipo de evento, para la página de detalle. */
export function CategoryPill({ category }: { category: EventCategory }) {
  const c = getCategory(category);
  const Icon = c.icon;
  return (
    <span
      style={{ backgroundColor: c.tint, color: c.color }}
      className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-bold tracking-[0.05em] uppercase"
    >
      <Icon size={13} strokeWidth={2.5} aria-hidden="true" />
      {c.label}
    </span>
  );
}

export function CategoryLabel({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={clsx("text-[11px] font-bold tracking-[0.05em] text-rio uppercase", className)}>
      {children}
    </span>
  );
}

/** Fecha en formato de calendario (mes arriba, día abajo). */
export function DateTile({ event, className }: { event: EventView; className?: string }) {
  return (
    <span className={clsx("flex flex-col items-center rounded-md bg-white px-2 py-1 leading-none", className)}>
      <span className={clsx("text-[10px] font-bold uppercase", event.isToday ? "text-rana" : "text-rio")}>
        {event.month}
      </span>
      <span className="font-display text-lg font-extrabold">{event.day}</span>
    </span>
  );
}

export function EventFacts({ event }: { event: EventView }) {
  return (
    <div className="flex flex-col gap-2 text-sm text-tinta-2">
      <div className="flex items-start gap-2.5">
        <User size={18} className="mt-px shrink-0 text-selva-700" aria-hidden="true" />
        <span>
          Organiza: <strong className="font-bold text-tinta">{event.organizer}</strong>
        </span>
      </div>
      <div className="flex items-start gap-2.5">
        <Calendar size={18} className="mt-px shrink-0 text-selva-700" aria-hidden="true" />
        <span>
          <strong className="font-bold text-tinta">{event.longDate}</strong> · {event.time}
        </span>
      </div>
      <div className="flex items-start gap-2.5">
        <MapPin size={18} className="mt-px shrink-0 text-selva-700" aria-hidden="true" />
        <span>
          {event.address}, {event.place}
        </span>
      </div>
    </div>
  );
}

export function EventActions({ event, size = "md" }: { event: EventView; size?: "sm" | "md" }) {
  const h = size === "sm" ? "h-10 text-sm" : "h-12 text-[15px]";
  return (
    <div className="flex gap-2.5">
      <Link
        href={`/eventos/${event.id}`}
        className={clsx("flex flex-1 items-center justify-center rounded-xl bg-selva-700 font-bold text-white hover:bg-selva-900", h)}
      >
        Ver evento
      </Link>
      <a
        href={directionsUrl(event)}
        target="_blank"
        rel="noopener noreferrer"
        className={clsx(
          "flex flex-1 items-center justify-center gap-2 rounded-xl border-[1.5px] border-selva-700 bg-white font-bold text-selva-900 hover:bg-arena-200",
          h,
        )}
      >
        <Navigation size={17} aria-hidden="true" />
        Cómo llegar
      </a>
    </div>
  );
}

export function PhotoStrip({ event, height = "h-31" }: { event: EventView; height?: string }) {
  return (
    <div className="no-scrollbar flex snap-x gap-2 overflow-x-auto">
      {Array.from({ length: event.photos }, (_, i) => (
        <PhotoPlaceholder
          key={i}
          label={`Foto ${i + 1} de ${event.photos} de ${event.name}`}
          className={clsx("flex w-60 shrink-0 snap-start items-end justify-end rounded-xl p-2", height)}
        >
          <span className="rounded-full bg-tinta/75 px-2 py-0.5 text-[11px] font-bold text-white">
            {i + 1} / {event.photos}
          </span>
        </PhotoPlaceholder>
      ))}
    </div>
  );
}

"use client";

import Link from "next/link";
import { useState } from "react";
import clsx from "clsx";
import {
  ArrowLeft,
  Bell,
  BellRing,
  Calendar,
  CalendarPlus,
  ChevronLeft,
  ChevronRight,
  Clock,
  Heart,
  MapPin,
  MessageCircle,
  Navigation,
  Phone,
  Share2,
} from "lucide-react";
import { EVENTS, getEventById } from "@/data/events";
import { toEventView, type EventView } from "@/lib/eventView";
import { formatTime } from "@/lib/dates";
import { useToday } from "@/lib/useToday";
import { directionsUrl, wazeUrl } from "@/lib/maps";
import { downloadIcs } from "@/lib/calendar";
import { useFavorite } from "@/lib/favorites";
import { PhotoPlaceholder } from "@/components/ui/PhotoPlaceholder";
import { CategoryLabel, DateTile } from "./EventBits";

function initials(name: string) {
  return name
    .split(" ")
    .filter((w) => w.length > 3)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

export function EventDetail({ eventId }: { eventId: string }) {
  const base = getEventById(eventId)!;
  const today = useToday();
  const event: EventView | null = today ? toEventView(base, today) : null;
  const [photo, setPhoto] = useState(0);
  const [fav, toggleFav] = useFavorite(base.id);
  const [shared, setShared] = useState(false);

  const nearby = today
    ? EVENTS.filter((e) => e.id !== base.id && e.place === base.place).map((e) => toEventView(e, today)).slice(0, 4)
    : [];

  const share = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({ title: base.name, url });
      } catch {}
      return;
    }
    await navigator.clipboard?.writeText(url);
    setShared(true);
    setTimeout(() => setShared(false), 2000);
  };

  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(`${base.name} en ${base.place}`)}`;

  return (
    <article className="flex flex-col pb-6 lg:overflow-hidden lg:rounded-2xl lg:border lg:border-linea lg:bg-white">
      <div className="flex h-14 items-center justify-between bg-white px-1.5 lg:hidden">
        <Link href="/" aria-label="Volver al mapa" className="flex size-11 items-center justify-center rounded-xl">
          <ArrowLeft size={22} aria-hidden="true" />
        </Link>
        <span className="font-display text-[17px] font-extrabold">Evento</span>
        <div className="flex">
          <button
            type="button"
            aria-label={fav ? "Quitar de favoritos" : "Guardar en favoritos"}
            aria-pressed={fav}
            onClick={toggleFav}
            className="flex size-11 items-center justify-center rounded-xl text-rana"
          >
            <Heart size={22} fill={fav ? "currentColor" : "none"} aria-hidden="true" />
          </button>
          <button type="button" aria-label="Compartir" onClick={share} className="flex size-11 items-center justify-center rounded-xl">
            <Share2 size={22} aria-hidden="true" />
          </button>
        </div>
      </div>

      <section aria-label="Fotos del evento" className="relative">
        <PhotoPlaceholder
          label={`Foto ${photo + 1} de ${base.photos} de ${base.name}`}
          className="flex h-68 items-center justify-center lg:h-80"
        >
          <span className="rounded-full bg-white/85 px-3 py-1.5 text-[13px] font-bold text-[#3e6b5c]">
            [Foto {photo + 1} del evento]
          </span>
        </PhotoPlaceholder>
        <button
          type="button"
          aria-label="Foto anterior"
          onClick={() => setPhoto((p) => (p + base.photos - 1) % base.photos)}
          className="absolute top-1/2 left-2.5 flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/92"
        >
          <ChevronLeft size={20} aria-hidden="true" />
        </button>
        <button
          type="button"
          aria-label="Foto siguiente"
          onClick={() => setPhoto((p) => (p + 1) % base.photos)}
          className="absolute top-1/2 right-2.5 flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/92"
        >
          <ChevronRight size={20} aria-hidden="true" />
        </button>
        <span className="absolute right-3 bottom-3 rounded-full bg-tinta/75 px-2.5 py-1 text-xs font-bold text-white">
          {photo + 1} / {base.photos}
        </span>
      </section>
      <div className="flex gap-2 px-4 pt-2.5 lg:px-6">
        {Array.from({ length: base.photos }, (_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Ver foto ${i + 1}`}
            aria-pressed={i === photo}
            onClick={() => setPhoto(i)}
            className={clsx(
              "photo-placeholder h-16 flex-1 rounded-[10px] border-[3px]",
              i === photo ? "border-selva-700" : "border-transparent",
            )}
          />
        ))}
      </div>

      <div className="flex flex-col gap-4 px-5 pt-5 lg:px-6">
        <div className="flex flex-wrap gap-2">
          <span className="rounded-full bg-celeste-100 px-2.5 py-1 text-xs font-bold tracking-[0.05em] text-[#1d5f69] uppercase">
            {base.category}
          </span>
          {event && (
            <span
              className={clsx(
                "rounded-full px-2.5 py-1 text-xs font-bold",
                event.isToday ? "bg-rana text-white" : "bg-lima text-tinta",
              )}
            >
              {event.when}
            </span>
          )}
          <span className="rounded-full border border-[#cbd6c6] bg-white px-2.5 py-1 text-xs font-bold">{base.price}</span>
        </div>

        <div className="flex items-start justify-between gap-4">
          <h1 className="font-display text-[30px] leading-[1.08] font-extrabold tracking-tight lg:text-4xl">{base.name}</h1>
          <div className="hidden shrink-0 gap-2 lg:flex">
            <button
              type="button"
              aria-pressed={fav}
              onClick={toggleFav}
              className="flex h-11 items-center gap-2 rounded-xl border border-linea px-3.5 text-sm font-bold text-rana hover:bg-menta"
            >
              <Heart size={18} fill={fav ? "currentColor" : "none"} aria-hidden="true" />
              {fav ? "Guardado" : "Guardar"}
            </button>
            <button
              type="button"
              onClick={share}
              className="flex h-11 items-center gap-2 rounded-xl border border-linea px-3.5 text-sm font-bold hover:bg-menta"
            >
              <Share2 size={18} aria-hidden="true" />
              {shared ? "Enlace copiado" : "Compartir"}
            </button>
          </div>
        </div>

        <div className="flex items-center gap-3 rounded-[14px] border border-linea bg-white p-3">
          <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-selva-700 text-[15px] font-extrabold text-white">
            {initials(base.organizer)}
          </span>
          <span className="flex flex-1 flex-col">
            <span className="text-xs font-semibold text-gris">Organiza</span>
            <span className="text-[15px] font-bold">{base.organizer}</span>
          </span>
          <a
            href={`tel:${base.organizerPhone}`}
            aria-label="Llamar al organizador"
            className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-selva-100 text-selva-700"
          >
            <Phone size={20} aria-hidden="true" />
          </a>
        </div>

        <div className="flex flex-col rounded-[14px] border border-linea bg-white">
          <InfoRow icon={Calendar} label="Fecha">
            {event ? `${event.longDate}, ${event.date.getFullYear()}` : "…"}
          </InfoRow>
          <div className="mx-3.5 h-px bg-linea" />
          <InfoRow icon={Clock} label="Hora de inicio">
            {formatTime(base.startTime)}
            {base.endTime && <span className="font-medium text-gris"> · hasta las {formatTime(base.endTime)}</span>}
          </InfoRow>
          <div className="mx-3.5 h-px bg-linea" />
          <InfoRow icon={MapPin} label="Dirección exacta">
            {base.address}. {base.place}, Sarapiquí, Heredia.
          </InfoRow>
          <div className="flex gap-2.5 px-3.5 pt-1 pb-3.5">
            <a
              href={directionsUrl(base)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-11.5 flex-1 items-center justify-center gap-2 rounded-xl bg-selva-700 text-sm font-bold text-white hover:bg-selva-900"
            >
              <Navigation size={17} aria-hidden="true" />
              Google Maps
            </a>
            <a
              href={wazeUrl(base)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-11.5 flex-1 items-center justify-center rounded-xl border-[1.5px] border-selva-700 text-sm font-bold text-selva-900 hover:bg-selva-100"
            >
              Abrir en Waze
            </a>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2">
          <ActionTile icon={CalendarPlus} label="Al calendario" onClick={() => event && downloadIcs(event)} />
          <ActionTile icon={MessageCircle} label="Por WhatsApp" href={whatsappUrl} />
          <ActionTile icon={fav ? BellRing : Bell} label={fav ? "Te avisaremos" : "Recordarme"} onClick={toggleFav} />
        </div>

        <section className="flex flex-col gap-2">
          <h2 className="font-display text-xl font-extrabold">Sobre el evento</h2>
          <p className="text-[15px] leading-relaxed text-tinta-2">{base.description}</p>
        </section>

        {nearby.length > 0 && (
          <section className="flex flex-col gap-2.5">
            <div className="flex items-baseline justify-between">
              <h2 className="font-display text-xl font-extrabold">También en {base.place}</h2>
              <Link href="/" className="text-sm font-bold text-selva-700">
                Ver en el mapa
              </Link>
            </div>
            <div className="no-scrollbar -mx-5 flex gap-2.5 overflow-x-auto px-5 lg:-mx-6 lg:px-6">
              {nearby.map((e) => (
                <Link
                  key={e.id}
                  href={`/eventos/${e.id}`}
                  className="w-50 shrink-0 overflow-hidden rounded-[14px] border border-linea bg-white"
                >
                  <PhotoPlaceholder className="flex h-24 items-end p-2">
                    <DateTile event={e} />
                  </PhotoPlaceholder>
                  <div className="flex flex-col gap-0.5 px-3 py-2.5">
                    <CategoryLabel>{e.when}</CategoryLabel>
                    <span className="text-sm font-bold">{e.name}</span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </article>
  );
}

function InfoRow({
  icon: Icon,
  label,
  children,
}: {
  icon: typeof Calendar;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex gap-3 p-3.5">
      <Icon size={20} className="mt-0.5 shrink-0 text-selva-700" aria-hidden="true" />
      <span className="flex flex-col gap-0.5">
        <span className="text-xs font-semibold text-gris">{label}</span>
        <span className="text-[15px] leading-snug font-bold">{children}</span>
      </span>
    </div>
  );
}

function ActionTile({
  icon: Icon,
  label,
  onClick,
  href,
}: {
  icon: typeof Calendar;
  label: string;
  onClick?: () => void;
  href?: string;
}) {
  const className =
    "flex h-18 flex-col items-center justify-center gap-1.5 rounded-[14px] border border-linea bg-white text-xs font-semibold hover:bg-menta";
  const content = (
    <>
      <Icon size={20} className="text-selva-700" aria-hidden="true" />
      {label}
    </>
  );
  return href ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
      {content}
    </a>
  ) : (
    <button type="button" onClick={onClick} className={className}>
      {content}
    </button>
  );
}

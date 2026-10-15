"use client";

import Link from "next/link";
import { useState } from "react";
import clsx from "clsx";
import { MapPin, MessageCircle, Navigation, Phone, Plus, Search } from "lucide-react";
import { BUSINESS_CATEGORIES, BUSINESSES, type Business } from "@/data/businesses";
import { directionsUrl } from "@/lib/maps";
import { PhotoPlaceholder } from "@/components/ui/PhotoPlaceholder";

type Category = (typeof BUSINESS_CATEGORIES)[number];

function whatsappUrl(business: Business) {
  return `https://wa.me/${business.phone.replace(/\D/g, "")}`;
}

export function BusinessDirectory() {
  const [category, setCategory] = useState<Category>("Todos");
  const [query, setQuery] = useState("");

  const q = query.trim().toLowerCase();
  const featured = BUSINESSES.find((b) => b.featured)!;
  const list = BUSINESSES.filter(
    (b) =>
      !b.featured &&
      (category === "Todos" || b.category === category) &&
      (!q || `${b.name} ${b.category} ${b.place}`.toLowerCase().includes(q)),
  );

  return (
    <div className="flex flex-col gap-4">
      <label className="flex h-12 items-center gap-2.5 rounded-xl border border-[#d9d4c7] bg-white px-3.5">
        <Search size={20} className="text-gris" aria-hidden="true" />
        <span className="sr-only">Buscar comercios</span>
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Restaurantes, hospedaje, tours…"
          className="min-w-0 flex-1 bg-transparent text-[15px] outline-none placeholder:text-gris"
        />
      </label>

      <nav aria-label="Categorías" className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 lg:mx-0 lg:px-0">
        {BUSINESS_CATEGORIES.map((c) => (
          <button
            key={c}
            type="button"
            aria-pressed={c === category}
            onClick={() => setCategory(c)}
            className={clsx(
              "h-10 shrink-0 rounded-full border px-4 text-sm font-semibold",
              c === category ? "border-selva-700 bg-selva-700 text-white" : "border-[#d9d4c7] bg-white hover:bg-arena-200",
            )}
          >
            {c}
          </button>
        ))}
      </nav>

      <article className="overflow-hidden rounded-2xl border border-linea bg-white">
        <PhotoPlaceholder label={`Foto de ${featured.name}`} className="relative h-38 lg:h-52">
          <span className="absolute top-3 left-3 rounded-full bg-rana px-2.5 py-1 text-[11px] font-extrabold tracking-[0.06em] text-white uppercase">
            Destacado
          </span>
        </PhotoPlaceholder>
        <div className="flex flex-col gap-1.5 px-4 pt-3.5 pb-4">
          <span className="text-xs font-bold tracking-[0.05em] text-rio uppercase">
            Restaurante · {featured.place}
          </span>
          <h2 className="font-display text-[22px] font-extrabold">{featured.name}</h2>
          <span className="text-sm text-tinta-2">
            {featured.description} {featured.status}.
          </span>
          <div className="mt-2 flex gap-2">
            <a
              href={whatsappUrl(featured)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-11.5 flex-1 items-center justify-center gap-2 rounded-xl bg-selva-700 text-sm font-bold text-white hover:bg-selva-900"
            >
              <MessageCircle size={18} aria-hidden="true" />
              Escribir por WhatsApp
            </a>
            <a
              href={directionsUrl(featured)}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Cómo llegar"
              className="flex size-11.5 items-center justify-center rounded-xl border-[1.5px] border-selva-700 text-selva-700"
            >
              <MapPin size={20} aria-hidden="true" />
            </a>
          </div>
        </div>
      </article>

      <div className="flex items-baseline justify-between">
        <h2 className="font-display text-xl font-extrabold">
          {list.length} {list.length === 1 ? "comercio" : "comercios"}
        </h2>
        <span className="text-[13px] font-semibold text-gris">Más cercanos primero</span>
      </div>

      <ul className="grid gap-2.5 sm:grid-cols-2">
        {list.map((b) => (
          <li key={b.id} className="flex gap-3 rounded-[14px] border border-linea bg-white p-3">
            <PhotoPlaceholder className="size-21 shrink-0 rounded-[10px]" />
            <div className="flex min-w-0 flex-1 flex-col gap-0.5">
              <span className="text-[11px] font-bold tracking-[0.05em] text-rio uppercase">
                {b.category} · {b.place}
              </span>
              <span className="text-base font-bold">{b.name}</span>
              <span className={clsx("text-[13px] font-semibold", b.open ? "text-selva-700" : "text-[#7a4a2e]")}>
                {b.status}
              </span>
              <div className="mt-1 flex gap-1.5">
                <IconLink href={whatsappUrl(b)} label={`WhatsApp de ${b.name}`} icon={MessageCircle} external />
                <IconLink href={`tel:${b.phone}`} label={`Llamar a ${b.name}`} icon={Phone} />
                <IconLink href={directionsUrl(b)} label={`Cómo llegar a ${b.name}`} icon={Navigation} external />
              </div>
            </div>
          </li>
        ))}
        {list.length === 0 && (
          <li className="rounded-xl bg-white px-4 py-6 text-center text-sm text-tinta-2 sm:col-span-2">
            No encontramos comercios con esa búsqueda.
          </li>
        )}
      </ul>

      <Link href="/contacto" className="flex items-center gap-3.5 rounded-2xl bg-celeste-100 p-4 hover:bg-[#d6e9ee]">
        <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-selva-700 text-white">
          <Plus size={20} strokeWidth={2.4} aria-hidden="true" />
        </span>
        <span className="flex flex-col">
          <span className="text-base font-extrabold">¿Tiene un negocio en Sarapiquí?</span>
          <span className="text-[13px] text-tinta-2">Regístrelo o destáquelo en el directorio.</span>
        </span>
      </Link>
    </div>
  );
}

function IconLink({
  href,
  label,
  icon: Icon,
  external,
}: {
  href: string;
  label: string;
  icon: typeof Phone;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      aria-label={label}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className="flex h-9 w-11 items-center justify-center rounded-[10px] bg-arena-200 text-selva-700 hover:bg-linea"
    >
      <Icon size={18} aria-hidden="true" />
    </a>
  );
}

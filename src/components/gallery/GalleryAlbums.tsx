"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import clsx from "clsx";
import { Camera, ChevronLeft, ChevronRight, X } from "lucide-react";
import { ALBUMS, type Album } from "@/data/gallery";

const MONTHS = ["Todos", "Octubre", "Setiembre"] as const;
type MonthFilter = (typeof MONTHS)[number];

/** Patrón de mosaico: índice de la foto → clases de grid. */
const MOSAIC: Record<string, string[]> = {
  verde: ["col-span-2 row-span-2", "", "", "", "", ""],
  celeste: ["", "", "row-span-2", "col-span-2", "", "", ""],
};

function tone(album: Album) {
  return album.tone === "celeste"
    ? "bg-[#cde8ec] bg-[repeating-linear-gradient(45deg,rgb(29_95_105/0.12)_0_8px,transparent_8px_16px)]"
    : "photo-placeholder";
}

export function GalleryAlbums() {
  const [month, setMonth] = useState<MonthFilter>("Todos");
  const [viewer, setViewer] = useState<{ album: Album; index: number } | null>(null);

  useEffect(() => {
    if (!viewer) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setViewer(null);
      if (e.key === "ArrowRight") setViewer((v) => v && { ...v, index: (v.index + 1) % v.album.photoCount });
      if (e.key === "ArrowLeft")
        setViewer((v) => v && { ...v, index: (v.index + v.album.photoCount - 1) % v.album.photoCount });
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [viewer]);

  const albums = ALBUMS.filter((a) => month === "Todos" || a.month === month);

  return (
    <>
      <div className="flex gap-2">
        {MONTHS.map((m) => (
          <button
            key={m}
            type="button"
            aria-pressed={m === month}
            onClick={() => setMonth(m)}
            className={clsx(
              "h-10 rounded-full border px-4 text-sm font-semibold",
              m === month ? "border-selva-700 bg-selva-700 font-bold text-white" : "border-[#cbd6c6] bg-white hover:bg-selva-100",
            )}
          >
            {m}
          </button>
        ))}
      </div>

      {albums.map((album) => {
        const pattern = MOSAIC[album.tone];
        const shown = pattern.length;
        return (
          <section key={album.id} className="flex flex-col gap-2.5">
            <div className="flex items-end justify-between gap-3">
              <div className="flex flex-col gap-0.5">
                <span className="text-xs font-bold tracking-[0.05em] text-selva-700 uppercase">
                  {album.dateLabel} · {album.place}
                </span>
                <h2 className="font-display text-xl font-extrabold">{album.title}</h2>
              </div>
              <button
                type="button"
                onClick={() => setViewer({ album, index: 0 })}
                className="text-sm font-bold whitespace-nowrap text-selva-700"
              >
                {album.photoCount} fotos
              </button>
            </div>
            <div className="grid auto-rows-[108px] grid-cols-3 gap-1.5 lg:auto-rows-[150px]">
              {pattern.map((span, i) => {
                const last = i === shown - 1;
                return (
                  <button
                    key={i}
                    type="button"
                    aria-label={`Abrir foto ${i + 1} de ${album.title}`}
                    onClick={() => setViewer({ album, index: i })}
                    className={clsx("flex items-center justify-center rounded-xl", tone(album), span)}
                  >
                    {last && (
                      <span className="rounded-full bg-tinta/75 px-3 py-1.5 text-[15px] font-extrabold text-white">
                        +{album.photoCount - shown + 1}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </section>
        );
      })}

      <Link href="/contacto" className="flex items-center gap-3.5 rounded-2xl bg-selva-700 p-4 text-white hover:bg-selva-900">
        <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-lima text-tinta">
          <Camera size={22} aria-hidden="true" />
        </span>
        <span className="flex flex-col">
          <span className="text-base font-extrabold">¿Estuvo en el evento?</span>
          <span className="text-[13px]">Envíenos sus fotos para el álbum.</span>
        </span>
      </Link>

      {viewer && (
        <div role="dialog" aria-modal="true" aria-label={viewer.album.title} className="fixed inset-0 z-50 flex flex-col bg-tinta/95 text-white">
          <div className="flex h-14 items-center justify-between pr-1.5 pl-4">
            <span className="text-sm font-bold">
              {viewer.album.title} · {viewer.index + 1} / {viewer.album.photoCount}
            </span>
            <button
              type="button"
              aria-label="Cerrar"
              onClick={() => setViewer(null)}
              className="flex size-11 items-center justify-center rounded-xl hover:bg-white/10"
            >
              <X size={22} aria-hidden="true" />
            </button>
          </div>
          <div className="relative flex flex-1 items-center justify-center p-4">
            <div className={clsx("flex aspect-[4/3] w-full max-w-3xl items-center justify-center rounded-xl", tone(viewer.album))}>
              <span className="rounded-full bg-white/85 px-3 py-1.5 text-[13px] font-bold text-[#3e6b5c]">
                [Foto {viewer.index + 1}]
              </span>
            </div>
            <button
              type="button"
              aria-label="Foto anterior"
              onClick={() =>
                setViewer((v) => v && { ...v, index: (v.index + v.album.photoCount - 1) % v.album.photoCount })
              }
              className="absolute left-3 flex size-11 items-center justify-center rounded-full bg-white/15 hover:bg-white/25"
            >
              <ChevronLeft size={22} aria-hidden="true" />
            </button>
            <button
              type="button"
              aria-label="Foto siguiente"
              onClick={() => setViewer((v) => v && { ...v, index: (v.index + 1) % v.album.photoCount })}
              className="absolute right-3 flex size-11 items-center justify-center rounded-full bg-white/15 hover:bg-white/25"
            >
              <ChevronRight size={22} aria-hidden="true" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}

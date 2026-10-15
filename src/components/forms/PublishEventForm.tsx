"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Info, LocateFixed, Plus, X } from "lucide-react";
import { Field, FormSuccess, inputClass, textareaClass } from "@/components/ui/Field";

const CATEGORIES = ["Cultura", "Música", "Feria", "Deporte", "Naturaleza", "Aventura", "Gastronomía", "Tradición", "Religioso"];
const DISTRICTS = ["Puerto Viejo", "La Virgen", "Las Horquetas", "Llanuras del Gaspar", "Cureña"];
const MAX_PHOTOS = 6;

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <fieldset className="flex flex-col gap-3.5 rounded-2xl border border-linea bg-white p-4 lg:p-5">
      <legend className="px-1.5 font-display text-[17px] font-extrabold">{title}</legend>
      {children}
    </fieldset>
  );
}

/**
 * Formulario para organizadores. Solo frontend: en el proyecto real envía los
 * datos y las fotos a la API, y el evento queda pendiente de revisión.
 */
export function PublishEventForm() {
  const [sent, setSent] = useState(false);
  const [photos, setPhotos] = useState<{ name: string; url: string }[]>([]);
  const [location, setLocation] = useState<string | null>(null);

  const photosRef = useRef(photos);
  useEffect(() => {
    photosRef.current = photos;
  }, [photos]);
  // Libera las vistas previas al salir de la página.
  useEffect(() => () => photosRef.current.forEach((p) => URL.revokeObjectURL(p.url)), []);

  const removePhoto = (url: string) => {
    URL.revokeObjectURL(url);
    setPhotos((prev) => prev.filter((x) => x.url !== url));
  };

  const addPhotos = (files: FileList | null) => {
    if (!files) return;
    const next = Array.from(files)
      .slice(0, MAX_PHOTOS - photos.length)
      .map((file) => ({ name: file.name, url: URL.createObjectURL(file) }));
    setPhotos((prev) => [...prev, ...next]);
  };

  const useMyLocation = () => {
    if (!navigator.geolocation) return setLocation("Su navegador no permite obtener la ubicación.");
    navigator.geolocation.getCurrentPosition(
      (pos) => setLocation(`Ubicación marcada: ${pos.coords.latitude.toFixed(5)}, ${pos.coords.longitude.toFixed(5)}`),
      () => setLocation("No pudimos obtener su ubicación. Marque el punto en el mapa."),
    );
  };

  if (sent) {
    return (
      <FormSuccess title="¡Evento enviado para revisión!" onReset={() => setSent(false)}>
        Lo revisaremos y, si todo está en orden, aparecerá en el mapa. (Demo: los datos no se guardaron.){" "}
        <Link href="/" className="font-bold text-selva-700">
          Volver al mapa
        </Link>
      </FormSuccess>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
      className="flex flex-col gap-4.5"
    >
      <Section title="1 · El evento">
        <Field label="Nombre del evento">
          <input name="nombre" required placeholder="Ej.: Feria del Agricultor" className={inputClass} />
        </Field>
        <Field label="¿Quién lo organiza?">
          <input name="organizador" required placeholder="Persona, grupo o institución" className={inputClass} />
        </Field>
        <Field label="Categoría">
          <select name="categoria" className={inputClass}>
            {CATEGORIES.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </Field>
      </Section>

      <Section title="2 · Fecha y hora">
        <div className="grid grid-cols-2 gap-2.5">
          <Field label="Fecha">
            <input name="fecha" type="date" required className={inputClass} />
          </Field>
          <Field label="Hora de inicio">
            <input name="hora" type="time" required className={inputClass} />
          </Field>
        </div>
        <label className="flex min-h-11 items-center gap-2.5 text-sm font-semibold">
          <input type="checkbox" name="repite" className="size-5.5 accent-selva-700" />
          Se repite (cada semana o cada mes)
        </label>
      </Section>

      <Section title="3 · Ubicación">
        <Field label="Distrito">
          <select name="distrito" className={inputClass}>
            {DISTRICTS.map((d) => (
              <option key={d}>{d}</option>
            ))}
          </select>
        </Field>
        <Field label="Dirección exacta">
          <textarea name="direccion" rows={2} required placeholder="Ej.: 200 m sur de la plaza de deportes" className={textareaClass} />
        </Field>
        <div className="flex flex-col gap-1.5">
          <span className="text-sm font-bold">Marque el punto en el mapa</span>
          <div className="relative h-44 overflow-hidden rounded-xl border border-[#d5decf] bg-mapa">
            <svg width="100%" height="100%" viewBox="0 0 320 170" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
              <path d="M40 170C70 120 110 90 160 80S250 40 290 0" fill="none" stroke="#a9dee7" strokeWidth="10" strokeLinecap="round" />
              <path d="M0 120C80 110 200 120 320 100" fill="none" stroke="#fff" strokeWidth="6" />
              <path d="M180 0L170 170" fill="none" stroke="#fff" strokeWidth="4" />
              <rect x="196" y="112" width="70" height="40" rx="6" fill="#bcd8a4" />
            </svg>
            <span className="absolute top-1/2 left-1/2 -mt-10 -ml-[17px] size-[34px] rotate-[-45deg] rounded-[50%_50%_50%_0] border-[3px] border-white bg-selva-700 shadow-md" />
            <span className="absolute bottom-2.5 left-2.5 rounded-md bg-white/92 px-2 py-1 text-xs font-semibold text-[#3b5750]">
              Aquí irá el selector de Google Maps
            </span>
          </div>
          <button
            type="button"
            onClick={useMyLocation}
            className="flex h-11 items-center justify-center gap-2 rounded-xl border-[1.5px] border-selva-700 text-sm font-bold text-selva-900 hover:bg-selva-100"
          >
            <LocateFixed size={18} aria-hidden="true" />
            Usar mi ubicación actual
          </button>
          {location && <p className="text-[13px] text-tinta-2">{location}</p>}
        </div>
      </Section>

      <Section title="4 · Fotos y detalles">
        <div className="grid grid-cols-3 gap-2">
          {photos.map((p, i) => (
            <div key={p.url} className="relative h-23 overflow-hidden rounded-[10px]">
              {/* eslint-disable-next-line @next/next/no-img-element -- vista previa local de un archivo */}
              <img src={p.url} alt={`Foto ${i + 1}: ${p.name}`} className="size-full object-cover" />
              <button
                type="button"
                aria-label={`Quitar ${p.name}`}
                onClick={() => removePhoto(p.url)}
                className="absolute top-1 right-1 flex size-7 items-center justify-center rounded-full bg-white/90"
              >
                <X size={14} aria-hidden="true" />
              </button>
              {i === 0 && (
                <span className="absolute bottom-1 left-1 rounded-full bg-tinta/75 px-1.5 text-[10px] font-bold text-white">
                  Portada
                </span>
              )}
            </div>
          ))}
          {photos.length < MAX_PHOTOS && (
            <label className="flex h-23 cursor-pointer flex-col items-center justify-center gap-1 rounded-[10px] border-[1.5px] border-dashed border-[#7d958c] bg-menta text-xs font-bold text-selva-900 focus-within:ring-2 focus-within:ring-selva-700/30">
              <Plus size={22} aria-hidden="true" />
              Agregar foto
              <input type="file" accept="image/*" multiple className="sr-only" onChange={(e) => addPhotos(e.target.files)} />
            </label>
          )}
        </div>
        <span className="text-xs text-gris">Hasta {MAX_PHOTOS} fotos. La primera será la portada.</span>
        <Field label="Descripción">
          <textarea name="descripcion" rows={3} placeholder="¿Qué habrá? ¿Tiene costo? ¿Es apto para niños?" className={textareaClass} />
        </Field>
        <Field label="WhatsApp de contacto">
          <input name="whatsapp" type="tel" placeholder="8888 8888" className={inputClass} />
        </Field>
      </Section>

      <label className="flex items-start gap-2.5 text-sm leading-snug text-tinta-2">
        <input type="checkbox" required className="mt-0.5 size-5.5 shrink-0 accent-selva-700" />
        Confirmo que la información es correcta y tengo permiso para publicar estas fotos.
      </label>
      <button type="submit" className="h-13 rounded-xl bg-selva-700 text-base font-bold text-white hover:bg-selva-900">
        Enviar para revisión
      </button>
      <div className="flex items-start gap-2.5 rounded-xl bg-celeste-100 px-3.5 py-3 text-[13px] leading-snug text-[#1d4c55]">
        <Info size={18} className="mt-px shrink-0" aria-hidden="true" />
        <span>
          ¿Quiere más visibilidad? Pida que su evento aparezca{" "}
          <Link href="/contacto#anunciese" className="font-bold text-selva-900 underline">
            destacado en el mapa
          </Link>
          .
        </span>
      </div>
    </form>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { PageIntro, PageShell } from "@/components/layout/PageShell";
import { PhotoPlaceholder } from "@/components/ui/PhotoPlaceholder";

export const metadata: Metadata = { title: "Historia de Sarapiquí" };

const FACTS = [
  { label: "Provincia", value: "Heredia" },
  { label: "Cantón", value: "N.º 10" },
  { label: "Cabecera", value: "Puerto Viejo" },
  { label: "Distritos", value: "5" },
];

// Contenido de muestra: validar fechas y datos con la Municipalidad antes de publicar.
const MILESTONES = [
  { year: "[Época]", title: "Pueblos originarios", text: "Las riberas de los ríos fueron habitadas y recorridas por pueblos originarios. [Detalle por investigar]" },
  { year: "1856", title: "Batalla de Sardinal", text: "Durante la Campaña Nacional, tropas costarricenses enfrentaron a los filibusteros a orillas del río Sarapiquí." },
  { year: "1968", title: "La Selva, ciencia en el trópico", text: "La estación biológica se convierte en un centro de investigación del bosque tropical reconocido en todo el mundo." },
  { year: "1970", title: "Nace el cantón", text: "Se crea Sarapiquí como el décimo cantón de la provincia de Heredia, con Puerto Viejo como cabecera." },
  { year: "Hoy", title: "Naturaleza, aventura y comunidad", text: "Rafting, observación de aves, agricultura y ferias mantienen viva la identidad sarapiqueña." },
];

const DISTRICTS = [
  { name: "Puerto Viejo", note: "Cabecera" },
  { name: "La Virgen", note: "Distrito 2" },
  { name: "Las Horquetas", note: "Distrito 3" },
  { name: "Llanuras del Gaspar", note: "Distrito 4" },
  { name: "Cureña", note: "Distrito 5" },
];

const STAR = "M0 -9L7.8 4.5L-7.8 4.5Z M0 9L7.8 -4.5L-7.8 -4.5Z";

function Flag() {
  return (
    <svg
      viewBox="0 0 350 190"
      preserveAspectRatio="none"
      className="h-48 w-full"
      role="img"
      aria-label="Bandera de Sarapiquí: franjas celeste, verde claro y verde oscuro con cinco estrellas blancas"
    >
      <rect width="350" height="56" fill="#8fd3de" />
      <rect y="56" width="350" height="8" fill="#fff" />
      <rect y="64" width="350" height="60" fill="#c7db8f" />
      <path d="M0 100C60 70 120 74 175 92S290 118 350 82" fill="none" stroke="#b3cc7a" strokeWidth="16" />
      <rect y="124" width="350" height="8" fill="#fff" />
      <rect y="132" width="350" height="58" fill="#1e7b66" />
      <g fill="#fff">
        {[
          [110, 84],
          [143, 90],
          [176, 95],
          [209, 100],
          [242, 104],
        ].map(([x, y]) => (
          <path key={x} d={STAR} transform={`translate(${x} ${y})`} />
        ))}
      </g>
    </svg>
  );
}

export default function HistoriaPage() {
  return (
    <PageShell>
      <div className="lg:overflow-hidden lg:rounded-2xl lg:border lg:border-linea lg:bg-white">
        <PhotoPlaceholder label="Río Sarapiquí" className="flex h-58 items-end p-4 lg:h-72">
          <span className="rounded-full bg-tinta/75 px-2.5 py-1 text-xs font-bold text-white">[Foto: río Sarapiquí]</span>
        </PhotoPlaceholder>

        <div className="flex flex-col gap-6 px-5 pt-6 pb-8 lg:px-8">
          <PageIntro eyebrow="Conozca el cantón" title="Historia de Sarapiquí">
            Tierra de ríos, selva y gente trabajadora en el norte de Heredia. Su río dio nombre al cantón y fue
            durante siglos el camino hacia el Caribe y el río San Juan.
          </PageIntro>

          <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
            {FACTS.map((f) => (
              <div key={f.label} className="flex flex-col gap-1 rounded-[14px] border border-linea bg-white p-3.5">
                <span className="text-xs font-semibold text-gris">{f.label}</span>
                <span className="font-display text-xl font-extrabold">{f.value}</span>
              </div>
            ))}
          </div>

          <section className="overflow-hidden rounded-2xl border border-linea bg-white">
            <Flag />
            <div className="flex flex-col gap-1.5 px-4 pt-3.5 pb-4">
              <h2 className="font-display text-xl font-extrabold">La bandera del cantón</h2>
              <p className="text-sm leading-relaxed text-tinta-2">
                Sus colores guían la identidad visual de este sitio. [Significado oficial de los colores y de las cinco
                estrellas]
              </p>
            </div>
          </section>

          <section className="flex flex-col gap-3.5">
            <h2 className="font-display text-2xl font-extrabold">Línea del tiempo</h2>
            <ol className="flex flex-col">
              {MILESTONES.map((m) => (
                <li key={m.year} className="flex gap-3.5">
                  <div className="flex w-5 shrink-0 flex-col items-center">
                    <span className="mt-1 size-3.5 rounded-full border-[3px] border-celeste bg-selva-700" />
                    <span className="w-0.5 flex-1 bg-[#ddd7c9]" />
                  </div>
                  <div className="flex flex-col gap-1 pb-5">
                    <span className="font-display text-xl font-extrabold text-selva-700">{m.year}</span>
                    <span className="text-base font-bold">{m.title}</span>
                    <span className="text-sm leading-relaxed text-tinta-2">{m.text}</span>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          <section className="flex flex-col gap-2.5">
            <h2 className="font-display text-2xl font-extrabold">Sus cinco distritos</h2>
            <ul className="flex flex-col rounded-[14px] border border-linea bg-white">
              {DISTRICTS.map((d) => (
                <li key={d.name} className="flex items-center gap-3 border-b border-[#efebe2] px-4 py-3.5 last:border-b-0">
                  <svg width="18" height="18" viewBox="-10 -10 20 20" aria-hidden="true">
                    <path d={STAR} fill="#1e7b66" />
                  </svg>
                  <span className="flex-1 text-[15px] font-bold">{d.name}</span>
                  <span className="text-[13px] text-gris">{d.note}</span>
                </li>
              ))}
            </ul>
          </section>

          <Link href="/contacto" className="flex flex-col gap-1.5 rounded-2xl bg-rio p-4.5 text-white hover:bg-rio-900">
            <span className="font-display text-xl font-extrabold">¿Tiene fotos o historias de Sarapiquí?</span>
            <span className="text-sm">Compártalas con nosotros y ayúdenos a construir la memoria del cantón.</span>
          </Link>

          <p className="text-xs text-gris">Contenido de muestra: validar fechas y datos con la Municipalidad antes de publicar.</p>
        </div>
      </div>
    </PageShell>
  );
}

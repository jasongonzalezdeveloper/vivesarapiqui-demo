import type { Metadata } from "next";
import { Mail, MessageCircle, Phone } from "lucide-react";
import { PageIntro, PageShell } from "@/components/layout/PageShell";
import { ContactForm } from "@/components/forms/ContactForm";

export const metadata: Metadata = { title: "Contáctenos" };

const PLANS = [
  { name: "Banner móvil fijo", desc: "320 × 50, abajo en todas las páginas del teléfono", price: "[PRECIO] /mes", box: "h-2.5 w-10" },
  { name: "Banners laterales", desc: "160 × 600, a los lados en computadora", price: "[PRECIO] /mes", box: "h-9.5 w-3" },
  { name: "Comercio destacado", desc: "Primer lugar en el directorio de comercios", price: "[PRECIO] /mes", box: "h-6.5 w-9" },
  { name: "Evento destacado", desc: "Pin resaltado en el mapa y portada de la lista", price: "[PRECIO] /evento", box: "size-5" },
];

const QUICK = [
  { href: "https://wa.me/50600000000", label: "WhatsApp", icon: MessageCircle, primary: true },
  { href: "tel:+50600000000", label: "Llamar", icon: Phone },
  { href: "mailto:hola@ejemplo.com", label: "Correo", icon: Mail },
];

export default function ContactoPage() {
  return (
    <PageShell>
      <div className="flex flex-col gap-6 px-5 pt-5 pb-8 lg:px-0 lg:pt-0">
        <PageIntro title="Hablemos">
          ¿Dudas, un evento que falta o quiere anunciarse? Escríbanos y le respondemos pronto.
        </PageIntro>

        <div className="grid grid-cols-3 gap-2">
          {QUICK.map(({ href, label, icon: Icon, primary }) => (
            <a
              key={label}
              href={href}
              className={
                primary
                  ? "flex h-19 flex-col items-center justify-center gap-1.5 rounded-[14px] bg-selva-700 text-[13px] font-bold text-white hover:bg-selva-900"
                  : "flex h-19 flex-col items-center justify-center gap-1.5 rounded-[14px] border border-linea bg-white text-[13px] font-bold hover:bg-arena-200"
              }
            >
              <Icon size={22} className={primary ? undefined : "text-selva-700"} aria-hidden="true" />
              {label}
            </a>
          ))}
        </div>

        <ContactForm />

        <section id="anunciese" className="flex scroll-mt-24 flex-col gap-3">
          <div className="flex flex-col gap-1">
            <span className="text-xs font-bold tracking-[0.08em] text-rio uppercase">Publicidad</span>
            <h2 className="font-display text-2xl font-extrabold">Anúnciese con nosotros</h2>
          </div>
          {PLANS.map((p) => (
            <div key={p.name} className="flex items-center gap-3.5 rounded-[14px] border border-linea bg-white p-3.5">
              <div className="flex size-14 shrink-0 items-center justify-center rounded-xl bg-arena-200">
                <span className={`block rounded-[3px] border-[1.5px] border-dashed border-selva-700 bg-white ${p.box}`} />
              </div>
              <div className="flex flex-1 flex-col gap-0.5">
                <span className="text-[15px] font-extrabold">{p.name}</span>
                <span className="text-[13px] text-tinta-2">{p.desc}</span>
              </div>
              <span className="text-right text-[13px] font-extrabold text-selva-900">{p.price}</span>
            </div>
          ))}
        </section>

        <div className="flex flex-col gap-2">
          <span className="text-sm font-bold">Síganos</span>
          <div className="flex flex-wrap gap-2">
            {["Facebook", "Instagram", "TikTok"].map((s) => (
              <a key={s} href="#" className="flex h-11 items-center rounded-full border border-[#d9d4c7] bg-white px-4 text-sm font-semibold hover:bg-arena-200">
                {s}
              </a>
            ))}
          </div>
        </div>
      </div>
    </PageShell>
  );
}

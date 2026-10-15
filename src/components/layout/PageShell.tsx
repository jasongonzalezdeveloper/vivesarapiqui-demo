import type { ReactNode } from "react";
import { FlagStripe } from "@/components/brand/FlagStripe";
import { BottomAdBar, SideAd } from "@/components/ads/AdSlots";

/**
 * Marco de las páginas de contenido: franja de la bandera, columna central
 * pensada para teléfono, banners laterales en escritorio y banner fijo abajo en todos los tamaños.
 * El relleno inferior deja espacio para el banner fijo (62 px en teléfono, 102 px desde tableta).
 */
export function PageShell({ children, ads = true }: { children: ReactNode; ads?: boolean }) {
  return (
    <>
      <FlagStripe />
      <div
        className={
          ads
            ? "flex flex-1 justify-center gap-8 px-0 pb-[62px] md:pb-[102px] lg:px-6 lg:pt-8 lg:pb-[134px]"
            : "flex flex-1 justify-center lg:py-8"
        }
      >
        {ads && <SideAd variant="a" />}
        <main className="w-full max-w-2xl min-w-0">{children}</main>
        {ads && <SideAd variant="b" />}
      </div>
      {ads && <BottomAdBar />}
    </>
  );
}

export function PageIntro({ eyebrow, title, children }: { eyebrow?: string; title: string; children?: ReactNode }) {
  return (
    <div className="flex flex-col gap-2.5">
      {eyebrow && <span className="text-xs font-bold tracking-[0.08em] text-rio uppercase">{eyebrow}</span>}
      <h1 className="font-display text-[32px] leading-[1.05] font-extrabold tracking-tight lg:text-[40px]">{title}</h1>
      {children && <p className="text-base leading-relaxed text-tinta-2">{children}</p>}
    </div>
  );
}

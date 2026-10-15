import Link from "next/link";
import clsx from "clsx";

/**
 * Espacios publicitarios. En el proyecto real cada slot recibe la creatividad
 * (imagen + enlace) desde el backend o desde un servidor de anuncios.
 */

/**
 * Banner 320 × 50 pegado abajo. Se muestra en todo ancho donde no caben los
 * banners laterales (menos de 1280 px), así siempre hay un espacio publicitario.
 * `fixed` lo pega al borde inferior de la pantalla.
 */
export function MobileAdBar({ fixed = true }: { fixed?: boolean }) {
  return (
    <aside
      aria-label="Publicidad"
      className={clsx(
        "z-30 flex h-[62px] shrink-0 items-center justify-center border-t border-selva-950 bg-selva-900 xl:hidden",
        fixed && "fixed inset-x-0 bottom-0",
      )}
    >
      <Link
        href="/contacto#anunciese"
        className="relative flex h-[50px] w-[320px] items-center gap-2.5 rounded-md border border-dashed border-[#7d958c] bg-white px-2.5"
      >
        <span className="absolute top-0.5 right-1.5 text-[9px] font-bold tracking-[0.08em] text-gris uppercase">
          Anuncio
        </span>
        <span className="photo-placeholder size-9 shrink-0 rounded-md" />
        <span className="flex flex-col gap-0.5 leading-tight">
          <span className="text-[13px] font-bold">Su negocio aquí</span>
          <span className="text-[11px] text-gris">Banner móvil fijo · 320 × 50</span>
        </span>
      </Link>
    </aside>
  );
}

/** Banner lateral 160 × 600, solo visible en pantallas grandes. */
export function SideAd({ variant = "a", sticky = true }: { variant?: "a" | "b"; sticky?: boolean }) {
  return (
    <aside
      aria-label="Publicidad"
      className={clsx("hidden w-40 shrink-0 flex-col gap-1.5 self-start xl:flex", sticky && "sticky top-24")}
    >
      <span className="text-[10px] font-bold tracking-[0.08em] text-gris uppercase">Publicidad</span>
      <Link
        href="/contacto#anunciese"
        className={clsx(
          "flex h-[600px] w-40 flex-col overflow-hidden rounded-lg border border-dashed border-[#7d958c] bg-white",
          variant === "b" && "flex-col-reverse",
        )}
      >
        <span className="photo-placeholder h-80 shrink-0" />
        <span className="flex flex-col gap-1.5 p-3.5">
          <span className="font-display text-lg leading-tight font-extrabold">
            {variant === "a" ? "Su marca frente a todo Sarapiquí" : "Hospedaje, tours y restaurantes"}
          </span>
          <span className="text-xs text-gris">Banner lateral 160 × 600 · solo escritorio</span>
        </span>
      </Link>
    </aside>
  );
}

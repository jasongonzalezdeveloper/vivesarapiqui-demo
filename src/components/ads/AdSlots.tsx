import Link from "next/link";
import clsx from "clsx";

/**
 * Espacios publicitarios. En el proyecto real cada slot recibe la creatividad
 * (imagen + enlace) desde el backend o desde un servidor de anuncios.
 */

/**
 * Banner pegado abajo, visible en todos los tamaños de pantalla:
 * 320 × 50 en el teléfono y 728 × 90 desde tableta y computadora.
 * `fixed` lo pega al borde inferior de la pantalla.
 */
export function BottomAdBar({ fixed = true }: { fixed?: boolean }) {
  return (
    <aside
      aria-label="Publicidad"
      className={clsx(
        "z-30 flex h-[62px] shrink-0 items-center justify-center border-t border-selva-950 bg-selva-900 md:h-[102px]",
        fixed && "fixed inset-x-0 bottom-0",
      )}
    >
      <Link
        href="/contacto#anunciese"
        className="relative flex h-[50px] w-[320px] items-center gap-2.5 rounded-md border border-dashed border-[#7d958c] bg-white px-2.5 md:h-[90px] md:w-[728px] md:gap-4 md:px-4"
      >
        <span className="absolute top-0.5 right-1.5 text-[9px] font-bold tracking-[0.08em] text-gris uppercase">
          Anuncio
        </span>
        <span className="photo-placeholder size-9 shrink-0 rounded-md md:h-[66px] md:w-[120px]" />
        <span className="flex flex-col gap-0.5 leading-tight">
          <span className="text-[13px] font-bold md:font-display md:text-xl md:font-extrabold">Su negocio aquí</span>
          <span className="text-[11px] text-gris md:text-[13px]">
            <span className="md:hidden">Banner fijo · 320 × 50</span>
            <span className="hidden md:inline">Banner fijo · 728 × 90 · visible en todas las páginas</span>
          </span>
        </span>
      </Link>
    </aside>
  );
}

/**
 * Banner lateral 160 × 600, solo en pantallas grandes (1280 px o más).
 * Con `sticky={false}` se ajusta al alto disponible (lo usa el mapa, que ocupa toda la pantalla).
 */
export function SideAd({ variant = "a", sticky = true }: { variant?: "a" | "b"; sticky?: boolean }) {
  return (
    <aside
      aria-label="Publicidad"
      className={clsx(
        "hidden w-40 shrink-0 flex-col gap-1.5 xl:flex",
        sticky ? "sticky top-24 self-start" : "min-h-0 self-stretch",
      )}
    >
      <span className="text-[10px] font-bold tracking-[0.08em] text-gris uppercase">Publicidad</span>
      <Link
        href="/contacto#anunciese"
        className={clsx(
          "flex w-40 flex-col overflow-hidden rounded-lg border border-dashed border-[#7d958c] bg-white",
          sticky ? "h-[600px]" : "max-h-[600px] min-h-0 flex-1",
          variant === "b" && "flex-col-reverse",
        )}
      >
        <span className={clsx("photo-placeholder", sticky ? "h-80 shrink-0" : "min-h-0 flex-1")} />
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

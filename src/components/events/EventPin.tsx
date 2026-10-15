import clsx from "clsx";

/**
 * Marcador en forma de gota con el número del día.
 * - El relleno es el color del tipo de evento.
 * - Los eventos de hoy llevan borde rojo rana y la etiqueta "HOY".
 * - El seleccionado se agranda y lleva un anillo oscuro.
 */
export function EventPin({
  day,
  color,
  selected,
  today,
}: {
  day: number;
  color: string;
  selected?: boolean;
  today?: boolean;
}) {
  return (
    <span className="relative flex flex-col items-center">
      {today && (
        <span className="absolute -top-5 z-10 rounded-full bg-rana px-1.5 text-[9px] leading-[15px] font-extrabold tracking-[0.06em] text-white shadow-sm">
          HOY
        </span>
      )}
      <span
        style={{ backgroundColor: color }}
        className={clsx(
          "flex rotate-[-45deg] items-center justify-center rounded-[50%_50%_50%_0] border-[3px] shadow-[0_3px_8px_rgb(27_36_33/0.35)] transition-all",
          selected ? "size-[42px] ring-2 ring-tinta/70 ring-offset-1" : "size-[34px]",
          today ? "border-rana" : "border-white",
        )}
      >
        <span className="rotate-45 text-[13px] leading-none font-extrabold text-white">{day}</span>
      </span>
    </span>
  );
}

export function MapLegend() {
  return (
    <div className="flex items-center gap-2.5 rounded-lg bg-white/92 px-2.5 py-1.5 text-[11px] font-bold text-tinta shadow-sm">
      <span className="flex items-center gap-1.5">
        <span className="rounded-full bg-rana px-1.5 text-[9px] leading-[15px] font-extrabold text-white">HOY</span>
        Eventos de hoy
      </span>
      <span className="font-semibold text-gris">· Color = tipo</span>
    </div>
  );
}

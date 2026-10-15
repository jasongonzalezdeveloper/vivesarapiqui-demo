import clsx from "clsx";

/** Marcador en forma de gota con el número del día. */
export function EventPin({
  day,
  selected,
  today,
}: {
  day: number;
  selected?: boolean;
  today?: boolean;
}) {
  return (
    <span
      className={clsx(
        "flex rotate-[-45deg] items-center justify-center rounded-[50%_50%_50%_0] border-[3px] border-white shadow-[0_3px_8px_rgb(16_48_42/0.35)] transition-all",
        selected ? "size-[42px] bg-rio text-white" : today ? "size-[34px] bg-rana text-white" : "size-[34px] bg-selva-700 text-white",
      )}
    >
      <span className="rotate-45 text-[13px] leading-none font-extrabold">{day}</span>
    </span>
  );
}

export function MapLegend() {
  return (
    <div className="flex gap-2.5 rounded-lg bg-white/92 px-2.5 py-1.5 text-[11px] font-bold text-tinta shadow-sm">
      <span className="flex items-center gap-1.5">
        <span className="size-2.5 rounded-full bg-rana" />
        Hoy
      </span>
      <span className="flex items-center gap-1.5">
        <span className="size-2.5 rounded-full bg-selva-700" />
        Próximos
      </span>
    </div>
  );
}

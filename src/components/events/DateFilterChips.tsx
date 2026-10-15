"use client";

import clsx from "clsx";
import { DATE_FILTERS, type DateFilter } from "@/lib/dates";

export function DateFilterChips({
  value,
  counts,
  onChange,
}: {
  value: DateFilter;
  counts: Record<DateFilter, number> | null;
  onChange: (filter: DateFilter) => void;
}) {
  return (
    <nav
      aria-label="Filtrar eventos por fecha"
      className="no-scrollbar flex h-15 shrink-0 items-center gap-2 overflow-x-auto border-b border-linea bg-white px-4 lg:px-6"
    >
      {DATE_FILTERS.map((f) => {
        const active = f.id === value;
        return (
          <button
            key={f.id}
            type="button"
            aria-pressed={active}
            onClick={() => onChange(f.id)}
            className={clsx(
              "flex h-10 shrink-0 items-center gap-2 rounded-full border pr-2 pl-3.5 text-sm font-semibold transition-colors",
              active
                ? "border-selva-700 bg-selva-700 text-white"
                : "border-[#d9d4c7] bg-white text-tinta hover:bg-arena",
            )}
          >
            {f.label}
            <span
              className={clsx(
                "flex h-6 min-w-6 items-center justify-center rounded-full px-1.5 text-xs font-bold",
                active ? "bg-white/20 text-white" : "bg-arena-200 text-tinta",
              )}
            >
              {counts ? counts[f.id] : "·"}
            </span>
          </button>
        );
      })}
    </nav>
  );
}

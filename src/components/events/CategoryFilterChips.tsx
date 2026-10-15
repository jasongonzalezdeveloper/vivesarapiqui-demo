"use client";

import clsx from "clsx";
import { LayoutGrid } from "lucide-react";
import { CATEGORIES, type EventCategory } from "@/data/categories";

export type CategoryFilter = EventCategory | "todos";

/** Filtro por tipo de evento. Los chips también sirven de leyenda del color de los pines. */
export function CategoryFilterChips({
  value,
  counts,
  onChange,
}: {
  value: CategoryFilter;
  counts: Record<CategoryFilter, number> | null;
  onChange: (filter: CategoryFilter) => void;
}) {
  const allActive = value === "todos";
  return (
    <nav
      aria-label="Filtrar eventos por tipo"
      className="no-scrollbar flex h-13 shrink-0 items-center gap-2 overflow-x-auto border-b border-linea bg-white px-4 lg:px-6"
    >
      <button
        type="button"
        aria-pressed={allActive}
        onClick={() => onChange("todos")}
        className={clsx(
          "flex h-10 shrink-0 items-center gap-1.5 rounded-full border px-3 text-[13px] font-semibold",
          allActive ? "border-tinta bg-tinta text-white" : "border-[#d9d4c7] bg-white text-tinta hover:bg-arena",
        )}
      >
        <LayoutGrid size={15} aria-hidden="true" />
        Todos
        {counts && <span className={allActive ? "text-white/75" : "text-gris"}>{counts.todos}</span>}
      </button>
      {CATEGORIES.map((c) => {
        const active = value === c.id;
        const Icon = c.icon;
        return (
          <button
            key={c.id}
            type="button"
            aria-pressed={active}
            onClick={() => onChange(active ? "todos" : c.id)}
            style={active ? { backgroundColor: c.color, borderColor: c.color } : undefined}
            className={clsx(
              "flex h-10 shrink-0 items-center gap-1.5 rounded-full border px-3 text-[13px] font-semibold",
              active ? "text-white" : "border-[#d9d4c7] bg-white text-tinta hover:bg-arena",
            )}
          >
            <span
              style={{ backgroundColor: active ? "rgb(255 255 255 / 0.22)" : c.color }}
              className="flex size-5 items-center justify-center rounded-full text-white"
            >
              <Icon size={12} strokeWidth={2.5} aria-hidden="true" />
            </span>
            {c.label}
            {counts && <span className={active ? "text-white/75" : "text-gris"}>{counts[c.id]}</span>}
          </button>
        );
      })}
    </nav>
  );
}

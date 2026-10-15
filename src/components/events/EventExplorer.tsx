"use client";

import { useMemo, useState } from "react";
import { EVENTS } from "@/data/events";
import { DATE_FILTERS, DEFAULT_FILTER, filterRangeLabel, matchesFilter, type DateFilter } from "@/lib/dates";
import { toEventView } from "@/lib/eventView";
import { useToday } from "@/lib/useToday";
import { FlagStripe } from "@/components/brand/FlagStripe";
import { MobileAdBar, SideAd } from "@/components/ads/AdSlots";
import { EventsMap } from "@/components/map/EventsMap";
import { DateFilterChips } from "./DateFilterChips";
import { EventSheet } from "./EventSheet";
import { EventListPanel } from "./EventListPanel";
import { EventPreviewCard } from "./EventPreviewCard";

/** Página principal: filtros por fecha + mapa + lista de eventos. */
export function EventExplorer() {
  const today = useToday();
  const [filter, setFilter] = useState<DateFilter>(DEFAULT_FILTER);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const allEvents = useMemo(
    () =>
      today
        ? EVENTS.map((event) => toEventView(event, today)).sort((a, b) => a.date.getTime() - b.date.getTime())
        : [],
    [today],
  );

  const counts = useMemo(() => {
    if (!today) return null;
    return Object.fromEntries(
      DATE_FILTERS.map((f) => [f.id, allEvents.filter((e) => matchesFilter(e.date, f.id, today)).length]),
    ) as Record<DateFilter, number>;
  }, [allEvents, today]);

  const visible = today ? allEvents.filter((e) => matchesFilter(e.date, filter, today)) : [];
  const selected = visible.find((e) => e.id === selectedId) ?? null;

  const title = today ? `${visible.length} ${visible.length === 1 ? "evento" : "eventos"}` : "Cargando eventos…";
  const subtitle = today ? filterRangeLabel(filter, today) : "";

  const changeFilter = (next: DateFilter) => {
    setFilter(next);
    setSelectedId(null);
  };

  return (
    <div className="flex h-[calc(100dvh-3.5rem)] flex-col lg:h-[calc(100dvh-4rem)]">
      <DateFilterChips value={filter} counts={counts} onChange={changeFilter} />
      <FlagStripe />

      <div className="flex min-h-0 flex-1 overflow-hidden lg:gap-6 lg:p-6">
        <SideAd variant="a" sticky={false} />
        <EventListPanel
          events={visible}
          selectedId={selectedId}
          title={title}
          subtitle={subtitle}
          onSelect={setSelectedId}
        />
        <main className="relative min-h-0 min-w-0 flex-1 overflow-hidden lg:rounded-2xl lg:border lg:border-linea">
          <EventsMap events={visible} selectedId={selectedId} onSelect={setSelectedId} />
          <EventSheet
            events={visible}
            selected={selected}
            title={title}
            subtitle={subtitle}
            onSelect={setSelectedId}
            onClose={() => setSelectedId(null)}
          />
          {selected && <EventPreviewCard event={selected} onClose={() => setSelectedId(null)} />}
        </main>
        <SideAd variant="b" sticky={false} />
      </div>

      <MobileAdBar fixed={false} />
    </div>
  );
}

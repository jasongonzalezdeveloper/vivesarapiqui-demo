"use client";

import type { EventView } from "@/lib/eventView";
import { GOOGLE_MAPS_API_KEY } from "@/lib/maps";
import { GoogleEventsMap } from "./GoogleEventsMap";
import { IllustratedMap } from "./IllustratedMap";

export type EventsMapProps = {
  events: EventView[];
  selectedId: string | null;
  onSelect: (id: string) => void;
};

/**
 * Usa Google Maps cuando hay una clave configurada en
 * NEXT_PUBLIC_GOOGLE_MAPS_API_KEY; si no, muestra un mapa ilustrado
 * para que el demo funcione sin configuración.
 */
export function EventsMap(props: EventsMapProps) {
  return GOOGLE_MAPS_API_KEY ? <GoogleEventsMap {...props} /> : <IllustratedMap {...props} />;
}

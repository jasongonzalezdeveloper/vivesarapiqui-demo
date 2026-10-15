"use client";

import { useEffect } from "react";
import { AdvancedMarker, APIProvider, Map, useMap } from "@vis.gl/react-google-maps";
import { SARAPIQUI_CENTER } from "@/data/events";
import { GOOGLE_MAPS_API_KEY, GOOGLE_MAPS_MAP_ID } from "@/lib/maps";
import { EventPin, MapLegend } from "@/components/events/EventPin";
import type { EventsMapProps } from "./EventsMap";

function PanToSelected({ events, selectedId }: Pick<EventsMapProps, "events" | "selectedId">) {
  const map = useMap();
  useEffect(() => {
    const event = events.find((e) => e.id === selectedId);
    if (map && event) map.panTo({ lat: event.lat, lng: event.lng });
  }, [map, events, selectedId]);
  return null;
}

export function GoogleEventsMap({ events, selectedId, onSelect }: EventsMapProps) {
  return (
    <APIProvider apiKey={GOOGLE_MAPS_API_KEY} language="es" region="CR">
      <div className="absolute inset-0">
        <Map
          mapId={GOOGLE_MAPS_MAP_ID}
          defaultCenter={SARAPIQUI_CENTER}
          defaultZoom={11}
          gestureHandling="greedy"
          disableDefaultUI
          zoomControl
          clickableIcons={false}
          className="size-full"
        >
          {events.map((event) => (
            <AdvancedMarker
              key={event.id}
              position={{ lat: event.lat, lng: event.lng }}
              title={`${event.name}, ${event.when}`}
              zIndex={event.id === selectedId ? 20 : event.isToday ? 15 : 10}
              onClick={() => onSelect(event.id)}
            >
              <EventPin day={event.day} today={event.isToday} selected={event.id === selectedId} />
            </AdvancedMarker>
          ))}
          <PanToSelected events={events} selectedId={selectedId} />
        </Map>
      </div>
      <div className="pointer-events-none absolute top-3 left-3">
        <MapLegend />
      </div>
    </APIProvider>
  );
}

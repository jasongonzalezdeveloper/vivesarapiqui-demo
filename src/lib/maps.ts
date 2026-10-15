import type { SarapiquiEvent } from "@/data/events";

export const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? "";
export const GOOGLE_MAPS_MAP_ID = process.env.NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID || "DEMO_MAP_ID";

export function directionsUrl(event: Pick<SarapiquiEvent, "lat" | "lng">) {
  return `https://www.google.com/maps/dir/?api=1&destination=${event.lat},${event.lng}`;
}

export function wazeUrl(event: Pick<SarapiquiEvent, "lat" | "lng">) {
  return `https://waze.com/ul?ll=${event.lat},${event.lng}&navigate=yes`;
}

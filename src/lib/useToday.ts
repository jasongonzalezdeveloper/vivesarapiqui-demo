"use client";

import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

let cached: Date | null = null;
function getSnapshot() {
  // Una sola instancia estable por carga de página.
  cached ??= new Date();
  return cached;
}

/**
 * Fecha de hoy en el navegador del visitante. En el servidor devuelve null,
 * así el HTML prerenderizado no depende de la hora del build y no hay
 * diferencias al hidratar.
 */
export function useToday(): Date | null {
  return useSyncExternalStore(subscribe, getSnapshot, () => null);
}

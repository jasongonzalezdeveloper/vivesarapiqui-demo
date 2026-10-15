"use client";

import { useSyncExternalStore } from "react";

/**
 * Favoritos guardados en el navegador. En el proyecto real, con cuentas de
 * usuario, esto pasaría a la API.
 */
const KEY = "vs:favoritos";
const EVENT = "vs:favoritos-cambio";

function read(): string {
  try {
    return localStorage.getItem(KEY) ?? "[]";
  } catch {
    return "[]";
  }
}

function subscribe(onChange: () => void) {
  window.addEventListener(EVENT, onChange);
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener(EVENT, onChange);
    window.removeEventListener("storage", onChange);
  };
}

function parse(raw: string): string[] {
  try {
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function useFavorite(id: string) {
  const raw = useSyncExternalStore(subscribe, read, () => "[]");
  const isFavorite = parse(raw).includes(id);

  const toggle = () => {
    const list = parse(read());
    const next = list.includes(id) ? list.filter((x) => x !== id) : [...list, id];
    try {
      localStorage.setItem(KEY, JSON.stringify(next));
    } catch {}
    window.dispatchEvent(new Event(EVENT));
  };

  return [isFavorite, toggle] as const;
}

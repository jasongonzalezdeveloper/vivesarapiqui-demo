"use client";

import { useEffect, useRef, useState } from "react";
import { EventPin, MapLegend } from "@/components/events/EventPin";
import type { EventsMapProps } from "./EventsMap";

/** Tamaño del dibujo base. */
const W = 390;
const H = 700;

/** Posición de cada evento sobre el dibujo (solo para el mapa ilustrado). */
const POSITIONS: Record<string, [number, number]> = {
  "mercado-nocturno-artesanias": [206, 166],
  "caminata-aves-chilamate": [142, 262],
  "feria-del-agricultor": [178, 204],
  "descenso-rio-sarapiqui": [92, 372],
  "cabalgata-horquetas": [300, 372],
  "festival-cacao": [60, 410],
  "noche-de-marimba": [236, 192],
  "carrera-mtb": [318, 334],
  "expoferia-ganadera": [356, 416],
  "festival-de-luces": [214, 132],
};

const ROADS = [
  "M-420 520L0 440C40 428 70 404 92 374C120 322 150 272 176 232S202 186 214 170",
  "M214 170C240 222 270 282 300 372S352 472 390 500L800 640",
  "M92 374C80 412 66 442 60 500S50 610 40 700L20 1000",
  "M214 170C220 120 230 70 228 0L240 -400",
  "M300 372C322 384 340 402 362 414L800 520",
];
const SARAPIQUI_RIVER = "M0 1000C20 860 30 760 30 700C60 580 70 456 90 382S130 292 150 256S196 196 210 168S232 70 250 0C262 -100 300 -260 320 -400";

const LABELS: [string, number, number][] = [
  ["PUERTO VIEJO", 214, 236],
  ["CHILAMATE", 142, 282],
  ["LA VIRGEN", 96, 392],
  ["SAN MIGUEL", 58, 430],
  ["HORQUETAS", 300, 392],
  ["RÍO FRÍO", 356, 436],
];

function useBoxSize<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new ResizeObserver(([entry]) => {
      setSize({ width: entry.contentRect.width, height: entry.contentRect.height });
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return [ref, size] as const;
}

export function IllustratedMap({ events, selectedId, onSelect }: EventsMapProps) {
  const [ref, { width, height }] = useBoxSize<HTMLDivElement>();

  // Igual que preserveAspectRatio="xMidYMid meet": el dibujo se ve completo y centrado.
  const scale = Math.min(width / W, height / H) || 1;
  const offsetX = (width - W * scale) / 2;
  const offsetY = (height - H * scale) / 2;

  return (
    <div ref={ref} className="absolute inset-0 overflow-hidden bg-mapa">
      <svg
        width="100%"
        height="100%"
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="xMidYMid meet"
        className="absolute inset-0 overflow-visible"
        aria-hidden="true"
      >
        <g fill="#bcd8a4">
          <path d="M-600 -400H150C130 40 90 70 40 80C20 85 -600 92 -600 92Z" />
          <path d="M262 252C300 226 360 236 420 250C520 270 640 300 700 340V420C560 410 380 394 272 322Z" />
          <path d="M-600 520C-200 480 40 500 112 560C132 600 104 1100 60 1100H-600Z" />
          <path d="M300 540C330 516 390 512 520 500C640 490 800 520 800 520V1100H262C270 620 280 566 300 540Z" />
          <path d="M118 84C160 74 192 96 182 126C172 148 130 150 114 130C104 114 106 92 118 84Z" />
          <path d="M330 60C360 50 420 40 520 30C640 20 800 60 800 60V170C600 170 330 140 320 110C315 90 318 66 330 60Z" />
          <path d="M-600 220C-400 200 -120 210 -40 240C0 260 -20 320 -80 330C-200 350 -600 330 -600 330Z" />
        </g>
        <text x="330" y="300" textAnchor="middle" fontSize="10" fontStyle="italic" fill="#3e6b5c">
          Área protegida
        </text>
        <g fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path d="M-500 330C-200 300 50 290 150 255" stroke="#7cc3cf" strokeWidth="5" />
          <path d="M800 760C560 700 400 600 340 460C300 360 280 300 252 254S222 186 210 168" stroke="#7cc3cf" strokeWidth="7" />
          <path d={SARAPIQUI_RIVER} stroke="#7cc3cf" strokeWidth="11" />
          <path d={SARAPIQUI_RIVER} stroke="#a9dee7" strokeWidth="6" />
        </g>
        <g fill="none" strokeLinecap="round" strokeLinejoin="round">
          {ROADS.map((d) => (
            <path key={`c${d}`} d={d} stroke="#c5d0b8" strokeWidth="7" />
          ))}
          {ROADS.map((d) => (
            <path key={d} d={d} stroke="#ffffff" strokeWidth="4" />
          ))}
        </g>
        <g fontSize="10" fontWeight="700">
          <rect x="250" y="256" width="18" height="14" rx="3" fill="#fff" stroke="#a8b79e" />
          <text x="259" y="267" textAnchor="middle" fill="#3b5750">4</text>
          <rect x="56" y="452" width="26" height="14" rx="3" fill="#fff" stroke="#a8b79e" />
          <text x="69" y="463" textAnchor="middle" fill="#3b5750">126</text>
        </g>
        <text transform="translate(52 600) rotate(-76)" fontSize="11" fontStyle="italic" fontWeight="600" fill="#2f7f8c">
          Río Sarapiquí
        </text>
        <g
          fontSize="11"
          fontWeight="700"
          fill="#3b5750"
          stroke="#eef5e8"
          strokeWidth="3"
          paintOrder="stroke"
          textAnchor="middle"
          letterSpacing="0.06em"
        >
          {LABELS.map(([text, x, y]) => (
            <text key={text} x={x} y={y}>
              {text}
            </text>
          ))}
        </g>
      </svg>

      {width > 0 &&
        events.map((event) => {
          const [x, y] = POSITIONS[event.id] ?? [W / 2, H / 2];
          const selected = event.id === selectedId;
          return (
            <button
              key={event.id}
              type="button"
              aria-label={`${event.name}, ${event.when}, ${event.place}`}
              aria-pressed={selected}
              onClick={() => onSelect(event.id)}
              className="absolute flex h-14 w-12 -translate-x-1/2 -translate-y-full cursor-pointer items-end justify-center pb-2"
              style={{
                left: offsetX + x * scale,
                top: offsetY + y * scale,
                zIndex: selected ? 20 : event.isToday ? 15 : 10,
              }}
            >
              <EventPin day={event.day} today={event.isToday} selected={selected} />
            </button>
          );
        })}

      <div className="pointer-events-none absolute top-3 left-3 flex flex-col items-start gap-1.5">
        <div className="rounded-lg bg-white/92 px-2.5 py-1.5 text-[11px] font-semibold text-[#3b5750] shadow-sm">
          Mapa ilustrado · configure la clave de Google Maps
        </div>
        <MapLegend />
      </div>
    </div>
  );
}

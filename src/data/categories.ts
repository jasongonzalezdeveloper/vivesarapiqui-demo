import { Briefcase, Drama, Mountain, Trophy, UtensilsCrossed, type LucideIcon } from "lucide-react";

/** Tipos de evento. Cada uno tiene su color de pin en el mapa. */
export type EventCategory = "Turismo" | "Deporte" | "Comida" | "Empresas" | "Cultura";

export type CategoryInfo = {
  id: EventCategory;
  /** Texto corto para el filtro y las etiquetas. */
  label: string;
  /** Qué tipo de eventos entran aquí (se muestra en el formulario de publicar). */
  hint: string;
  /** Color del pin y de la etiqueta. Todos tienen contraste suficiente con texto blanco. */
  color: string;
  /** Fondo suave para chips y etiquetas. */
  tint: string;
  icon: LucideIcon;
};

export const CATEGORIES: CategoryInfo[] = [
  { id: "Turismo", label: "Turismo", hint: "Naturaleza, aventura, tours", color: "#1e7b66", tint: "#e3f0eb", icon: Mountain },
  { id: "Deporte", label: "Deporte", hint: "Carreras, torneos, ciclismo", color: "#1f6f8b", tint: "#e3eff4", icon: Trophy },
  { id: "Comida", label: "Comida", hint: "Ferias, festivales gastronómicos", color: "#a35c14", tint: "#f6ebdd", icon: UtensilsCrossed },
  { id: "Empresas", label: "Empresas", hint: "Emprendimientos, expoferias, negocios", color: "#4b4f8c", tint: "#e9e9f4", icon: Briefcase },
  { id: "Cultura", label: "Cultura", hint: "Música, tradiciones, arte", color: "#8e3b73", tint: "#f4e6ef", icon: Drama },
];

export function getCategory(id: EventCategory): CategoryInfo {
  return CATEGORIES.find((c) => c.id === id)!;
}

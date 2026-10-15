export type Album = {
  id: string;
  title: string;
  dateLabel: string;
  place: string;
  month: "Octubre" | "Setiembre";
  photoCount: number;
  hasVideo?: boolean;
  tone: "verde" | "celeste";
};

/** Álbumes de eventos recientes (datos de ejemplo). */
export const ALBUMS: Album[] = [
  { id: "feria-agricultor-oct", title: "Feria del Agricultor", dateLabel: "Sáb 10 oct", place: "Puerto Viejo", month: "Octubre", photoCount: 18, tone: "verde" },
  { id: "desfile-15-setiembre", title: "Desfile del 15 de setiembre", dateLabel: "Mar 15 set", place: "Puerto Viejo", month: "Setiembre", photoCount: 32, hasVideo: true, tone: "celeste" },
  { id: "desfile-faroles", title: "Desfile de faroles", dateLabel: "Lun 14 set", place: "Varios distritos", month: "Setiembre", photoCount: 24, tone: "verde" },
];

export type BusinessCategory = "Comer" | "Hospedaje" | "Tours" | "Tiendas" | "Servicios";

export type Business = {
  id: string;
  name: string;
  category: BusinessCategory;
  place: string;
  /** Texto de horario. En el proyecto real se calcula con los horarios del comercio. */
  status: string;
  open: boolean;
  phone: string;
  lat: number;
  lng: number;
  featured?: boolean;
  description?: string;
};

export const BUSINESS_CATEGORIES: ("Todos" | BusinessCategory)[] = [
  "Todos",
  "Comer",
  "Hospedaje",
  "Tours",
  "Tiendas",
  "Servicios",
];

export const BUSINESSES: Business[] = [
  {
    id: "mirador-del-rio",
    name: "Mirador del Río",
    category: "Comer",
    place: "Puerto Viejo",
    status: "Abierto hoy hasta las 9:00 p.m.",
    open: true,
    phone: "+50600000000",
    lat: 10.4561,
    lng: -84.0172,
    featured: true,
    description: "Comida típica frente al río.",
  },
  { id: "soda-la-ribera", name: "Soda La Ribera", category: "Comer", place: "Puerto Viejo", status: "Abierto · cierra 8:00 p.m.", open: true, phone: "+50600000000", lat: 10.4553, lng: -84.0193 },
  { id: "tours-rio-bravo", name: "Tours Río Bravo", category: "Tours", place: "La Virgen", status: "Abierto · salidas 8 a.m. y 1 p.m.", open: true, phone: "+50600000000", lat: 10.3941, lng: -84.1229 },
  { id: "cabinas-el-guarumo", name: "Cabinas El Guarumo", category: "Hospedaje", place: "La Virgen", status: "Recepción 24 horas", open: true, phone: "+50600000000", lat: 10.3925, lng: -84.1248 },
  { id: "cafe-de-la-finca", name: "Café de la Finca", category: "Comer", place: "Chilamate", status: "Cerrado · abre 7:00 a.m.", open: false, phone: "+50600000000", lat: 10.4489, lng: -84.0731 },
  { id: "ecolodge-heliconias", name: "Ecolodge Las Heliconias", category: "Hospedaje", place: "Chilamate", status: "Recepción hasta 10:00 p.m.", open: true, phone: "+50600000000", lat: 10.4505, lng: -84.0702 },
  { id: "ferreteria-central", name: "Ferretería Central", category: "Tiendas", place: "Puerto Viejo", status: "Abierto · cierra 6:00 p.m.", open: true, phone: "+50600000000", lat: 10.4558, lng: -84.0181 },
  { id: "pulperia-la-esquina", name: "Pulpería La Esquina", category: "Tiendas", place: "Horquetas", status: "Abierto · cierra 9:00 p.m.", open: true, phone: "+50600000000", lat: 10.3371, lng: -83.9649 },
  { id: "taller-don-beto", name: "Taller Don Beto", category: "Servicios", place: "Horquetas", status: "Cerrado · abre 7:30 a.m.", open: false, phone: "+50600000000", lat: 10.3359, lng: -83.9661 },
];

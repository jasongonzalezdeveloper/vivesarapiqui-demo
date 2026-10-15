import type { EventCategory } from "./categories";

export type { EventCategory };

export type SarapiquiEvent = {
  id: string;
  name: string;
  category: EventCategory;
  organizer: string;
  organizerPhone: string;
  place: string;
  address: string;
  lat: number;
  lng: number;
  /**
   * Días a partir de hoy. El demo calcula las fechas en relación con el día
   * actual para que siempre haya eventos que mostrar. En el proyecto real
   * esto se reemplaza por una fecha ISO que viene del backend.
   */
  dayOffset: number;
  /** Si es true, la fecha nunca pasa al mes siguiente (se ajusta al último día del mes). */
  keepInMonth?: boolean;
  startTime: string;
  endTime?: string;
  price: string;
  description: string;
  photos: number;
  featured?: boolean;
};

export const EVENTS: SarapiquiEvent[] = [
  {
    id: "mercado-nocturno-artesanias",
    name: "Mercado Nocturno de Artesanías",
    category: "Empresas",
    organizer: "Asociación de Artesanos de Sarapiquí",
    organizerPhone: "+50600000000",
    place: "Puerto Viejo",
    address: "Parque central de Puerto Viejo, costado norte de la iglesia católica",
    lat: 10.4566,
    lng: -84.0187,
    dayOffset: 0,
    startTime: "18:00",
    endTime: "22:00",
    price: "Entrada gratuita",
    description:
      "Artesanos de la zona exhiben y venden trabajos en madera, semillas, fibras naturales y textiles. Habrá música en vivo, comidas típicas y un espacio para niños.",
    photos: 3,
    featured: true,
  },
  {
    id: "caminata-aves-chilamate",
    name: "Caminata de avistamiento de aves",
    category: "Turismo",
    organizer: "Club de Observadores de Aves",
    organizerPhone: "+50600000000",
    place: "Chilamate",
    address: "Entrada al sendero, 300 m este de la escuela de Chilamate",
    lat: 10.4497,
    lng: -84.0718,
    dayOffset: 1,
    startTime: "05:30",
    endTime: "09:00",
    price: "₡3 000 por persona",
    description:
      "Recorrido guiado al amanecer para observar tucanes, loras y aves migratorias. Traiga binoculares si tiene; el club presta algunos.",
    photos: 2,
  },
  {
    id: "feria-del-agricultor",
    name: "Feria del Agricultor",
    category: "Comida",
    organizer: "Centro Agrícola Cantonal",
    organizerPhone: "+50600000000",
    place: "Puerto Viejo",
    address: "Campo ferial, 200 m sur de la plaza de deportes",
    lat: 10.4528,
    lng: -84.0215,
    dayOffset: 3,
    keepInMonth: true,
    startTime: "06:00",
    endTime: "13:00",
    price: "Entrada gratuita",
    description:
      "Frutas, verduras, quesos, pejibayes y productos de la zona directamente de quienes los producen.",
    photos: 4,
  },
  {
    id: "descenso-rio-sarapiqui",
    name: "Descenso recreativo del río",
    category: "Turismo",
    organizer: "Operadores de Rafting de La Virgen",
    organizerPhone: "+50600000000",
    place: "La Virgen",
    address: "Puente de La Virgen, margen este del río",
    lat: 10.3936,
    lng: -84.1236,
    dayOffset: 4,
    keepInMonth: true,
    startTime: "08:00",
    endTime: "12:00",
    price: "Desde ₡15 000",
    description:
      "Descenso familiar en balsa por un tramo tranquilo del río Sarapiquí, con guías certificados y equipo incluido.",
    photos: 3,
  },
  {
    id: "carrera-5k-la-virgen",
    name: "Carrera 5K Río Sarapiquí",
    category: "Deporte",
    organizer: "Comité de Deportes de La Virgen",
    organizerPhone: "+50600000000",
    place: "La Virgen",
    address: "Salida y meta en la plaza de deportes de La Virgen",
    lat: 10.3958,
    lng: -84.1212,
    dayOffset: 4,
    keepInMonth: true,
    startTime: "07:00",
    endTime: "10:00",
    price: "Inscripción ₡8 000",
    description:
      "Carrera recreativa de 5 km a lo largo del río, con categorías por edad y caminata familiar de 2 km.",
    photos: 3,
  },
  {
    id: "cabalgata-horquetas",
    name: "Cabalgata Tradicional",
    category: "Cultura",
    organizer: "Comité de Festejos de Horquetas",
    organizerPhone: "+50600000000",
    place: "Horquetas",
    address: "Salida desde la plaza de deportes de Horquetas",
    lat: 10.3365,
    lng: -83.9653,
    dayOffset: 10,
    keepInMonth: true,
    startTime: "09:00",
    price: "Entrada gratuita",
    description:
      "Desfile de caballistas por las calles principales, con cimarrona y venta de comidas al final del recorrido.",
    photos: 3,
  },
  {
    id: "festival-cacao",
    name: "Festival del Cacao y el Chocolate",
    category: "Comida",
    organizer: "Productores de Cacao de Sarapiquí",
    organizerPhone: "+50600000000",
    place: "San Miguel",
    address: "Salón comunal de San Miguel",
    lat: 10.3266,
    lng: -84.1752,
    dayOffset: 11,
    keepInMonth: true,
    startTime: "10:00",
    endTime: "17:00",
    price: "₡2 000",
    description:
      "Del árbol a la taza: talleres de chocolate artesanal, degustaciones y venta de productos de cacao local.",
    photos: 2,
  },
  {
    id: "noche-de-marimba",
    name: "Noche de Marimba y Cimarrona",
    category: "Cultura",
    organizer: "Casa de la Cultura de Sarapiquí",
    organizerPhone: "+50600000000",
    place: "Puerto Viejo",
    address: "Anfiteatro del parque central de Puerto Viejo",
    lat: 10.4572,
    lng: -84.0165,
    dayOffset: 16,
    keepInMonth: true,
    startTime: "19:00",
    endTime: "22:00",
    price: "Entrada gratuita",
    description:
      "Concierto al aire libre con grupos de marimba y cimarrona de distintos distritos del cantón.",
    photos: 2,
  },
  {
    id: "carrera-mtb",
    name: "Carrera MTB Ruta de la Selva",
    category: "Deporte",
    organizer: "Club de Ciclismo Sarapiquí",
    organizerPhone: "+50600000000",
    place: "Horquetas",
    address: "Salida frente a la escuela central de Horquetas",
    lat: 10.3402,
    lng: -83.9588,
    dayOffset: 35,
    startTime: "07:00",
    price: "Inscripción ₡12 000",
    description:
      "Recorrido de 45 km entre fincas y caminos de lastre. Categorías recreativa y competitiva.",
    photos: 3,
  },
  {
    id: "expoferia-ganadera",
    name: "Expoferia Ganadera",
    category: "Empresas",
    organizer: "Cámara de Ganaderos de la zona",
    organizerPhone: "+50600000000",
    place: "Río Frío",
    address: "Redondel y campo ferial de Río Frío",
    lat: 10.3283,
    lng: -83.8885,
    dayOffset: 47,
    startTime: "10:00",
    price: "₡3 000",
    description: "Exposición de ganado, monta tradicional, juegos y comidas típicas.",
    photos: 3,
  },
  {
    id: "festival-de-luces",
    name: "Festival de Luces de Sarapiquí",
    category: "Cultura",
    organizer: "Comisión de Festejos Navideños",
    organizerPhone: "+50600000000",
    place: "Puerto Viejo",
    address: "Calle principal, del puente al parque central",
    lat: 10.4591,
    lng: -84.0179,
    dayOffset: 60,
    startTime: "18:00",
    price: "Entrada gratuita",
    description: "Desfile de carrozas iluminadas, bandas y fuegos artificiales al cierre.",
    photos: 4,
  },
];

export function getEventById(id: string) {
  return EVENTS.find((event) => event.id === id);
}

/** Centro aproximado del cantón para el mapa. */
export const SARAPIQUI_CENTER = { lat: 10.405, lng: -84.04 };

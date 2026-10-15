import { BookOpen, Images, Mail, Map as MapIcon, Store, type LucideIcon } from "lucide-react";

export type NavItem = { href: string; label: string; icon: LucideIcon };

export const NAV_ITEMS: NavItem[] = [
  { href: "/", label: "Mapa de eventos", icon: MapIcon },
  { href: "/historia", label: "Historia", icon: BookOpen },
  { href: "/comercios", label: "Comercios", icon: Store },
  { href: "/galeria", label: "Galería", icon: Images },
  { href: "/contacto", label: "Contáctenos", icon: Mail },
];

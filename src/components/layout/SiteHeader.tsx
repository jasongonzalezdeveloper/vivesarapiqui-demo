"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import clsx from "clsx";
import { Menu, Plus, X } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { FlagStripe } from "@/components/brand/FlagStripe";
import { NAV_ITEMS } from "./nav";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <>
      <header className="sticky top-0 z-40 flex h-14 shrink-0 items-center justify-between gap-6 bg-selva-900 pr-1.5 pl-4 text-white lg:h-16 lg:px-6">
        <Logo />

        <nav aria-label="Principal" className="hidden items-center gap-1 lg:flex">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? "page" : undefined}
              className={clsx(
                "rounded-lg px-3.5 py-2.5 text-[15px] font-semibold transition-colors hover:bg-white/10",
                isActive(item.href) && "bg-white/15 font-bold",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/publicar"
          className="hidden h-11 items-center gap-2 rounded-xl bg-lima px-4 text-[15px] font-bold text-selva-900 hover:bg-[#d4e5a3] lg:flex"
        >
          <Plus size={18} strokeWidth={2.4} aria-hidden="true" />
          Publicar evento
        </Link>

        <button
          type="button"
          aria-label="Abrir menú"
          aria-expanded={open}
          onClick={() => setOpen(true)}
          className="flex size-11 items-center justify-center rounded-xl hover:bg-white/10 lg:hidden"
        >
          <Menu size={24} aria-hidden="true" />
        </button>
      </header>

      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            aria-label="Cerrar menú"
            onClick={() => setOpen(false)}
            className="absolute inset-0 size-full bg-tinta/50"
          />
          <nav
            aria-label="Menú principal"
            className="absolute inset-y-0 right-0 flex w-[19rem] max-w-[85vw] flex-col bg-white shadow-2xl"
          >
            <div className="flex h-14 items-center justify-between pr-1.5 pl-5">
              <span className="font-display text-lg font-extrabold">Menú</span>
              <button
                type="button"
                aria-label="Cerrar menú"
                onClick={() => setOpen(false)}
                className="flex size-11 items-center justify-center rounded-xl hover:bg-menta"
              >
                <X size={22} aria-hidden="true" />
              </button>
            </div>
            <FlagStripe />
            <div className="flex flex-col py-2.5">
              {NAV_ITEMS.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    aria-current={active ? "page" : undefined}
                    className={clsx(
                      "flex min-h-13 items-center gap-3.5 px-5 text-base",
                      active ? "bg-selva-100 font-bold text-selva-900" : "font-semibold",
                    )}
                  >
                    <Icon size={20} className="text-selva-700" aria-hidden="true" />
                    {item.label}
                  </Link>
                );
              })}
            </div>
            <div className="mx-5 h-px bg-linea" />
            <div className="flex flex-col gap-2.5 p-5">
              <Link
                href="/publicar"
                onClick={() => setOpen(false)}
                className="flex h-12 items-center justify-center gap-2 rounded-xl bg-selva-700 font-bold text-white"
              >
                <Plus size={18} strokeWidth={2.4} aria-hidden="true" />
                Publicar un evento
              </Link>
              <Link
                href="/contacto#anunciese"
                onClick={() => setOpen(false)}
                className="flex h-12 items-center justify-center rounded-xl border-[1.5px] border-selva-700 font-bold text-selva-900"
              >
                Anúnciese con nosotros
              </Link>
            </div>
            <div className="mt-auto flex flex-col gap-2 px-5 pt-4 pb-6 text-sm text-gris">
              <span className="font-bold text-tinta">Síganos</span>
              <div className="flex gap-4 font-semibold text-selva-700">
                <a href="#">Facebook</a>
                <a href="#">Instagram</a>
                <a href="#">WhatsApp</a>
              </div>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}

import Link from "next/link";
import { PageShell } from "@/components/layout/PageShell";

export default function NotFound() {
  return (
    <PageShell ads={false}>
      <div className="flex flex-col items-start gap-3 px-5 py-12">
        <span className="text-xs font-bold tracking-[0.08em] text-rio uppercase">Error 404</span>
        <h1 className="font-display text-3xl font-extrabold">No encontramos esta página</h1>
        <p className="text-tinta-2">Puede que el evento ya no exista o que el enlace esté incompleto.</p>
        <Link href="/" className="mt-2 flex h-12 items-center rounded-xl bg-selva-700 px-5 font-bold text-white">
          Ir al mapa de eventos
        </Link>
      </div>
    </PageShell>
  );
}

import type { Metadata } from "next";
import { PageIntro, PageShell } from "@/components/layout/PageShell";
import { PublishEventForm } from "@/components/forms/PublishEventForm";

export const metadata: Metadata = { title: "Publicar un evento" };

export default function PublicarPage() {
  return (
    <PageShell ads={false}>
      <div className="flex flex-col gap-5 px-5 pt-5 pb-8 lg:px-0 lg:pt-0">
        <PageIntro title="Comparta su evento">
          Es gratis. Revisamos cada evento antes de mostrarlo en el mapa.
        </PageIntro>
        <PublishEventForm />
      </div>
    </PageShell>
  );
}

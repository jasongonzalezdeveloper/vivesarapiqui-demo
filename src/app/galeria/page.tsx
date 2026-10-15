import type { Metadata } from "next";
import { PageIntro, PageShell } from "@/components/layout/PageShell";
import { GalleryAlbums } from "@/components/gallery/GalleryAlbums";

export const metadata: Metadata = { title: "Galería de eventos" };

export default function GaleriaPage() {
  return (
    <PageShell>
      <div className="flex flex-col gap-6 px-5 pt-5 pb-8 lg:px-0 lg:pt-0">
        <PageIntro title="Eventos recientes">Reviva lo que pasó en Sarapiquí, álbum por álbum.</PageIntro>
        <GalleryAlbums />
      </div>
    </PageShell>
  );
}

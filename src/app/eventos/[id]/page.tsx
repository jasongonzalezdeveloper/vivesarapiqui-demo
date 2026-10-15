import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { EVENTS, getEventById } from "@/data/events";
import { PageShell } from "@/components/layout/PageShell";
import { EventDetail } from "@/components/events/EventDetail";

// Sitio estático: solo existen las páginas generadas en el build.
export const dynamicParams = false;

export function generateStaticParams() {
  return EVENTS.map((event) => ({ id: event.id }));
}

export async function generateMetadata({ params }: PageProps<"/eventos/[id]">): Promise<Metadata> {
  const { id } = await params;
  const event = getEventById(id);
  if (!event) return {};
  return {
    title: event.name,
    description: `${event.name} en ${event.place}. Organiza: ${event.organizer}.`,
  };
}

export default async function EventPage({ params }: PageProps<"/eventos/[id]">) {
  const { id } = await params;
  const event = getEventById(id);
  if (!event) notFound();

  return (
    <PageShell>
      <EventDetail eventId={event.id} />
    </PageShell>
  );
}

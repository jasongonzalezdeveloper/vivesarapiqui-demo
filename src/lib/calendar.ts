import type { EventView } from "./eventView";

function icsDate(date: Date, time: string) {
  const [h, m] = time.split(":").map(Number);
  const d = new Date(date.getFullYear(), date.getMonth(), date.getDate(), h, m);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}T${pad(d.getHours())}${pad(d.getMinutes())}00`;
}

/** Descarga un archivo .ics para agregar el evento al calendario del teléfono. */
export function downloadIcs(event: EventView) {
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Vive Sarapiqui//Eventos//ES",
    "BEGIN:VEVENT",
    `UID:${event.id}@vivesarapiqui`,
    `DTSTART:${icsDate(event.date, event.startTime)}`,
    `DTEND:${icsDate(event.date, event.endTime ?? event.startTime)}`,
    `SUMMARY:${event.name}`,
    `LOCATION:${event.address}, ${event.place}, Sarapiquí`,
    `DESCRIPTION:Organiza: ${event.organizer}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ];
  const blob = new Blob([lines.join("\r\n")], { type: "text/calendar" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${event.id}.ics`;
  a.click();
  URL.revokeObjectURL(url);
}

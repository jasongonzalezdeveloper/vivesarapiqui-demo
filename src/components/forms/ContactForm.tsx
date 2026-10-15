"use client";

import { useState } from "react";
import { Field, FormSuccess, inputClass, textareaClass } from "@/components/ui/Field";

/** Formulario de contacto. Solo frontend: en el proyecto real se conecta a un endpoint o servicio de correo. */
export function ContactForm() {
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <FormSuccess title="¡Gracias por escribirnos!" onReset={() => setSent(false)}>
        Recibimos su mensaje y le responderemos lo antes posible. (Demo: el mensaje no se envió a ningún lado.)
      </FormSuccess>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
      className="flex flex-col gap-3.5 rounded-2xl border border-linea bg-white px-4 py-4.5 lg:p-6"
    >
      <h2 className="font-display text-xl font-extrabold">Envíenos un mensaje</h2>
      <Field label="Nombre">
        <input name="nombre" required autoComplete="name" className={inputClass} />
      </Field>
      <Field label="Correo electrónico">
        <input name="correo" type="email" required autoComplete="email" className={inputClass} />
      </Field>
      <Field label="Teléfono" hint="(opcional)">
        <input name="telefono" type="tel" autoComplete="tel" className={inputClass} />
      </Field>
      <Field label="Motivo">
        <select name="motivo" className={inputClass}>
          <option>Consulta general</option>
          <option>Publicar un evento</option>
          <option>Quiero anunciarme</option>
          <option>Registrar mi comercio</option>
          <option>Enviar fotos para la galería</option>
        </select>
      </Field>
      <Field label="Mensaje">
        <textarea name="mensaje" rows={4} required className={textareaClass} />
      </Field>
      <button type="submit" className="h-12.5 rounded-xl bg-selva-700 text-base font-bold text-white hover:bg-selva-900">
        Enviar mensaje
      </button>
    </form>
  );
}

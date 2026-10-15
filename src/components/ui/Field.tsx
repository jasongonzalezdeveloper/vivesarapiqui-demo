import clsx from "clsx";

export const inputClass =
  "h-12 w-full min-w-0 rounded-xl border border-[#b9c7b3] bg-[#fbfcf9] px-3.5 text-[15px] text-tinta outline-none placeholder:text-gris focus:border-selva-700 focus:ring-2 focus:ring-selva-700/20";

export const textareaClass = clsx(inputClass, "h-auto resize-y py-3");

export function Field({
  label,
  hint,
  children,
}: {
  label: React.ReactNode;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="flex flex-col gap-1.5 text-sm font-bold">
      <span>
        {label}
        {hint && <span className="font-medium text-gris"> {hint}</span>}
      </span>
      {children}
    </label>
  );
}

export function FormSuccess({ title, children, onReset }: { title: string; children: React.ReactNode; onReset: () => void }) {
  return (
    <div role="status" className="flex flex-col items-start gap-2 rounded-2xl border border-linea bg-white p-5">
      <span className="rounded-full bg-lima px-2.5 py-1 text-xs font-bold text-selva-900">Enviado</span>
      <h2 className="font-display text-xl font-extrabold">{title}</h2>
      <p className="text-sm leading-relaxed text-tinta-2">{children}</p>
      <button type="button" onClick={onReset} className="mt-1 text-sm font-bold text-selva-700">
        Enviar otro
      </button>
    </div>
  );
}

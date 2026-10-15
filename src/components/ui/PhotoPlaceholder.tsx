import clsx from "clsx";

/**
 * Espacio reservado para fotos. En el proyecto real se reemplaza por
 * `next/image` con las fotos que suben los organizadores.
 */
export function PhotoPlaceholder({
  label,
  className,
  children,
}: {
  label?: string;
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <div role={label ? "img" : undefined} aria-label={label} className={clsx("photo-placeholder", className)}>
      {children}
    </div>
  );
}

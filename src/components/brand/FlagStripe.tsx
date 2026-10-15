export function FlagStripe({ className = "" }: { className?: string }) {
  return (
    <div className={`flex h-1.5 shrink-0 ${className}`} aria-hidden="true">
      <div className="flex-1 bg-celeste" />
      <div className="flex-1 bg-lima" />
      <div className="flex-1 bg-selva-700" />
    </div>
  );
}

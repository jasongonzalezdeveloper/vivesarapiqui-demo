import Link from "next/link";

const STAR = "M0 -3.2L2.8 1.6L-2.8 1.6Z M0 3.2L2.8 -1.6L-2.8 -1.6Z";
const STARS: [number, number][] = [
  [6, 15],
  [11.5, 17.5],
  [17, 16],
  [22.5, 18.5],
  [28, 17],
];

/** Insignia circular con las tres franjas y las cinco estrellas de la bandera. */
export function FlagBadge({ size = 34 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 34 34" aria-hidden="true">
      <defs>
        <clipPath id="vs-badge">
          <circle cx="17" cy="17" r="17" />
        </clipPath>
      </defs>
      <g clipPath="url(#vs-badge)">
        <rect width="34" height="11" fill="#8fd3de" />
        <rect y="11" width="34" height="12" fill="#c7db8f" />
        <rect y="23" width="34" height="11" fill="#1e7b66" />
      </g>
      <g fill="#fff">
        {STARS.map(([x, y]) => (
          <path key={x} d={STAR} transform={`translate(${x} ${y})`} />
        ))}
      </g>
    </svg>
  );
}

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2.5 text-white no-underline">
      <FlagBadge />
      <span className="font-display text-xl font-extrabold tracking-tight">
        Vive <span className="text-lima">Sarapiquí</span>
      </span>
    </Link>
  );
}

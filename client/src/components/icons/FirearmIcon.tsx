import { SVGProps } from "react";

/**
 * Traditional revolver silhouette icon.
 * Drop-in replacement for emoji-based firearm icons.
 * Accepts standard SVG props (className, width, height, style, etc.)
 */
export default function FirearmIcon({ className, width = 24, height = 24, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 64 64"
      width={width}
      height={height}
      className={className}
      fill="currentColor"
      aria-label="Firearm"
      role="img"
      {...props}
    >
      {/* Barrel */}
      <rect x="2" y="22" width="36" height="7" rx="2" />
      {/* Front sight */}
      <rect x="4" y="19" width="3" height="3" rx="0.5" />
      {/* Frame / receiver */}
      <path d="M36 22 L42 22 L44 29 L36 29 Z" />
      {/* Trigger guard */}
      <path d="M38 29 Q40 38 34 38 L30 38 L30 29 Z" />
      {/* Grip */}
      <path d="M30 29 L30 50 Q30 53 27 53 L22 53 Q19 53 19 50 L19 38 L30 38 Z" />
      {/* Cylinder */}
      <circle cx="44" cy="25.5" r="9" />
      <circle cx="44" cy="25.5" r="5.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
      {/* Cylinder chambers */}
      <circle cx="44" cy="19" r="1.5" />
      <circle cx="44" cy="32" r="1.5" />
      <circle cx="38" cy="22" r="1.5" />
      <circle cx="50" cy="22" r="1.5" />
      <circle cx="38" cy="29" r="1.5" />
      <circle cx="50" cy="29" r="1.5" />
      {/* Hammer */}
      <path d="M52 18 L56 14 L58 16 L55 20 L53 22 L51 21 Z" />
      {/* Trigger */}
      <path d="M33 33 L35 38 L33 39 L31 34 Z" />
    </svg>
  );
}

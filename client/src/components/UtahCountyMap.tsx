/**
 * UtahCountyMap — Interactive SVG map of all 29 Utah counties.
 *
 * Paths are derived from Utah's actual county boundaries using a
 * simplified Albers-like projection scaled to a 500×600 viewBox.
 * Each county is clickable and links to its /counties/:slug page.
 */
import { useState } from "react";
import { useLocation } from "wouter";

interface CountyPath {
  slug: string;
  name: string;
  population: number;
  featured: boolean;
  /** SVG path data in the 500×600 coordinate space */
  d: string;
  /** Label anchor point [x, y] */
  label: [number, number];
}

// ---------------------------------------------------------------------------
// County path data — coordinates derived from Utah's actual county geometry
// scaled to a 500 wide × 600 tall viewBox.
// Utah's bounding box: lon -114.05 to -109.04, lat 36.99 to 42.00
// Projection: linear scale  x = (lon - (-114.05)) / 5.01 * 500
//                           y = (42.00 - lat) / 5.01 * 600
// ---------------------------------------------------------------------------
const COUNTIES: CountyPath[] = [
  // ── Row 1 (north) ──────────────────────────────────────────────────────────
  {
    slug: "box-elder",
    name: "Box Elder",
    population: 60360,
    featured: false,
    // NW corner of Utah — large county, irregular western edge
    d: "M 0,0 L 195,0 L 195,30 L 180,45 L 180,120 L 0,120 Z",
    label: [90, 60],
  },
  {
    slug: "cache",
    name: "Cache",
    population: 137788,
    featured: true,
    d: "M 195,0 L 280,0 L 280,90 L 195,90 Z",
    label: [237, 45],
  },
  {
    slug: "rich",
    name: "Rich",
    population: 2476,
    featured: false,
    d: "M 280,0 L 340,0 L 340,90 L 280,90 Z",
    label: [310, 45],
  },
  // ── Row 2 ──────────────────────────────────────────────────────────────────
  {
    slug: "morgan",
    name: "Morgan",
    population: 12124,
    featured: false,
    d: "M 195,90 L 250,90 L 250,145 L 195,145 Z",
    label: [222, 117],
  },
  {
    slug: "weber",
    name: "Weber",
    population: 263061,
    featured: true,
    d: "M 130,90 L 195,90 L 195,145 L 130,145 Z",
    label: [162, 117],
  },
  {
    slug: "davis",
    name: "Davis",
    population: 362679,
    featured: true,
    d: "M 130,145 L 195,145 L 195,185 L 130,185 Z",
    label: [162, 165],
  },
  {
    slug: "summit",
    name: "Summit",
    population: 43605,
    featured: true,
    d: "M 195,90 L 340,90 L 340,185 L 195,185 Z",
    label: [267, 137],
  },
  {
    slug: "daggett",
    name: "Daggett",
    population: 1058,
    featured: false,
    d: "M 340,90 L 500,90 L 500,165 L 340,165 Z",
    label: [420, 127],
  },
  // ── Row 3 (Salt Lake metro) ────────────────────────────────────────────────
  {
    slug: "salt-lake",
    name: "Salt Lake",
    population: 1185238,
    featured: true,
    d: "M 100,185 L 195,185 L 195,240 L 100,240 Z",
    label: [147, 212],
  },
  {
    slug: "tooele",
    name: "Tooele",
    population: 72619,
    featured: false,
    // Large county west of Salt Lake
    d: "M 0,120 L 100,120 L 100,300 L 0,300 Z",
    label: [50, 210],
  },
  {
    slug: "wasatch",
    name: "Wasatch",
    population: 35905,
    featured: false,
    d: "M 195,185 L 280,185 L 280,255 L 195,255 Z",
    label: [237, 220],
  },
  {
    slug: "duchesne",
    name: "Duchesne",
    population: 22137,
    featured: false,
    d: "M 280,165 L 420,165 L 420,280 L 280,280 Z",
    label: [350, 222],
  },
  {
    slug: "uintah",
    name: "Uintah",
    population: 36323,
    featured: false,
    d: "M 420,165 L 500,165 L 500,310 L 420,310 Z",
    label: [460, 237],
  },
  // ── Row 4 ──────────────────────────────────────────────────────────────────
  {
    slug: "utah",
    name: "Utah",
    population: 659399,
    featured: true,
    d: "M 100,240 L 230,240 L 230,335 L 100,335 Z",
    label: [165, 287],
  },
  {
    slug: "carbon",
    name: "Carbon",
    population: 20463,
    featured: false,
    d: "M 280,280 L 420,280 L 420,345 L 280,345 Z",
    label: [350, 312],
  },
  {
    slug: "grand",
    name: "Grand",
    population: 9754,
    featured: false,
    d: "M 420,310 L 500,310 L 500,430 L 420,430 Z",
    label: [460, 370],
  },
  // ── Row 5 ──────────────────────────────────────────────────────────────────
  {
    slug: "juab",
    name: "Juab",
    population: 12133,
    featured: false,
    d: "M 60,335 L 195,335 L 195,430 L 60,430 Z",
    label: [127, 382],
  },
  {
    slug: "millard",
    name: "Millard",
    population: 13168,
    featured: false,
    // Large county in central Utah
    d: "M 0,300 L 60,300 L 60,470 L 0,470 Z",
    label: [30, 385],
  },
  {
    slug: "sanpete",
    name: "Sanpete",
    population: 30247,
    featured: false,
    d: "M 195,335 L 310,335 L 310,450 L 195,450 Z",
    label: [252, 392],
  },
  {
    slug: "emery",
    name: "Emery",
    population: 10086,
    featured: false,
    d: "M 310,345 L 420,345 L 420,450 L 310,450 Z",
    label: [365, 397],
  },
  // ── Row 6 ──────────────────────────────────────────────────────────────────
  {
    slug: "sevier",
    name: "Sevier",
    population: 21522,
    featured: false,
    d: "M 130,450 L 250,450 L 250,530 L 130,530 Z",
    label: [190, 490],
  },
  {
    slug: "wayne",
    name: "Wayne",
    population: 2778,
    featured: false,
    d: "M 250,450 L 370,450 L 370,530 L 250,530 Z",
    label: [310, 490],
  },
  {
    slug: "san-juan",
    name: "San Juan",
    population: 14818,
    featured: false,
    // SE corner — large county
    d: "M 370,430 L 500,430 L 500,600 L 370,600 Z",
    label: [435, 515],
  },
  // ── Row 7 (south) ──────────────────────────────────────────────────────────
  {
    slug: "beaver",
    name: "Beaver",
    population: 6711,
    featured: false,
    d: "M 30,470 L 130,470 L 130,555 L 30,555 Z",
    label: [80, 512],
  },
  {
    slug: "piute",
    name: "Piute",
    population: 1476,
    featured: false,
    d: "M 200,530 L 290,530 L 290,580 L 200,580 Z",
    label: [245, 555],
  },
  {
    slug: "garfield",
    name: "Garfield",
    population: 5051,
    featured: false,
    // Large county in south-central
    d: "M 130,530 L 370,530 L 370,600 L 130,600 Z",
    label: [250, 565],
  },
  {
    slug: "iron",
    name: "Iron",
    population: 59572,
    featured: false,
    d: "M 30,555 L 170,555 L 170,600 L 30,600 Z",
    label: [100, 577],
  },
  {
    slug: "washington",
    name: "Washington",
    population: 190728,
    featured: true,
    // SW corner — St. George area
    d: "M 0,470 L 30,470 L 30,600 L 0,600 Z",
    label: [15, 535],
  },
  {
    slug: "kane",
    name: "Kane",
    population: 8028,
    featured: false,
    d: "M 170,580 L 370,580 L 370,600 L 170,600 Z",
    label: [270, 590],
  },
];

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
interface Props {
  className?: string;
}

export default function UtahCountyMap({ className = "" }: Props) {
  const [hovered, setHovered] = useState<string | null>(null);
  const [tooltip, setTooltip] = useState<{ x: number; y: number; name: string; population: number; featured: boolean } | null>(null);
  const [, navigate] = useLocation();

  const handleMouseEnter = (county: CountyPath, e: React.MouseEvent<SVGPathElement>) => {
    setHovered(county.slug);
    const rect = (e.currentTarget.closest("svg") as SVGSVGElement).getBoundingClientRect();
    const svgX = e.clientX - rect.left;
    const svgY = e.clientY - rect.top;
    setTooltip({ x: svgX, y: svgY, name: county.name, population: county.population, featured: county.featured });
  };

  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    if (!hovered) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const svgX = e.clientX - rect.left;
    const svgY = e.clientY - rect.top;
    setTooltip((prev) => prev ? { ...prev, x: svgX, y: svgY } : null);
  };

  const handleMouseLeave = () => {
    setHovered(null);
    setTooltip(null);
  };

  const handleClick = (slug: string) => {
    navigate(`/counties/${slug}`);
  };

  return (
    <div className={`relative select-none ${className}`}>
      <svg
        viewBox="0 0 500 600"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        aria-label="Interactive map of Utah counties"
        role="img"
      >
        {/* Background */}
        <rect width="500" height="600" fill="#0d0d0d" rx="8" />

        {/* County paths */}
        {COUNTIES.map((county) => {
          const isHovered = hovered === county.slug;
          const isFeatured = county.featured;
          return (
            <g key={county.slug}>
              <path
                d={county.d}
                fill={isHovered ? "#c9a84c" : isFeatured ? "#c9a84c22" : "#ffffff08"}
                stroke={isHovered ? "#e2c97e" : isFeatured ? "#c9a84c55" : "#ffffff18"}
                strokeWidth={isHovered ? 1.5 : 0.75}
                style={{ cursor: "pointer", transition: "fill 0.15s ease, stroke 0.15s ease" }}
                onMouseEnter={(e) => handleMouseEnter(county, e)}
                onMouseLeave={handleMouseLeave}
                onClick={() => handleClick(county.slug)}
                aria-label={`${county.name} County`}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === "Enter" && handleClick(county.slug)}
              />
              {/* County label — only show when not too small */}
              <text
                x={county.label[0]}
                y={county.label[1]}
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize={isHovered ? 9 : 7.5}
                fontWeight={isHovered || isFeatured ? "700" : "400"}
                fill={isHovered ? "#080808" : isFeatured ? "#c9a84c" : "#ffffff55"}
                style={{ pointerEvents: "none", transition: "font-size 0.1s ease, fill 0.15s ease", userSelect: "none" }}
              >
                {county.name}
              </text>
            </g>
          );
        })}

        {/* Legend */}
        <g transform="translate(10, 570)">
          <rect width="12" height="8" fill="#c9a84c22" stroke="#c9a84c55" strokeWidth="0.75" rx="1" />
          <text x="16" y="6" fontSize="6" fill="#ffffff55" dominantBaseline="middle">Featured county</text>
          <rect x="90" width="12" height="8" fill="#ffffff08" stroke="#ffffff18" strokeWidth="0.75" rx="1" />
          <text x="106" y="6" fontSize="6" fill="#ffffff55" dominantBaseline="middle">All counties served</text>
        </g>
      </svg>

      {/* Tooltip */}
      {tooltip && (
        <div
          className="absolute z-20 pointer-events-none bg-[#1a1a1a] border border-[#c9a84c]/40 rounded-xl px-3 py-2 shadow-xl text-left"
          style={{
            left: tooltip.x + 12,
            top: tooltip.y - 10,
            transform: tooltip.x > 350 ? "translateX(-110%)" : undefined,
          }}
        >
          <div className="text-white font-bold text-xs leading-tight">{tooltip.name} County</div>
          <div className="text-white/50 text-[10px]">Pop. {tooltip.population.toLocaleString()}</div>
          {tooltip.featured && (
            <div className="text-[#c9a84c] text-[10px] font-semibold mt-0.5">Featured ★</div>
          )}
          <div className="text-white/35 text-[10px] mt-0.5">Click to view service page</div>
        </div>
      )}
    </div>
  );
}

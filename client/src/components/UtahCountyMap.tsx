import { useState, useRef } from "react";
import { useLocation } from "wouter";
import { COUNTY_PATHS } from "@/lib/utahCountyPaths";

interface Props {
  className?: string;
  /** Called when a county is clicked. If not provided, navigates to /counties/:slug */
  onCountyClick?: (slug: string) => void;
}

interface Tooltip {
  x: number;
  y: number;
  name: string;
  featured: boolean;
}

export default function UtahCountyMap({ className = "", onCountyClick }: Props) {
  const [, navigate] = useLocation();
  const [hovered, setHovered] = useState<string | null>(null);
  const [tooltip, setTooltip] = useState<Tooltip | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  const handleMouseMove = (e: React.MouseEvent<SVGPathElement>, county: typeof COUNTY_PATHS[number]) => {
    if (!svgRef.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    setTooltip({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      name: county.name,
      featured: county.featured,
    });
  };

  const handleClick = (slug: string) => {
    if (onCountyClick) {
      onCountyClick(slug);
    } else {
      navigate(`/counties/${slug}`);
    }
  };

  return (
    <div className={`relative select-none ${className}`} style={{ background: "#0d0d0d" }}>
      <svg
        ref={svgRef}
        viewBox="0 0 500 600"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto"
        style={{ display: "block" }}
      >
        {/* Background */}
        <rect width="500" height="600" fill="#0d0d0d" />

        {/* County paths */}
        {COUNTY_PATHS.map((county) => {
          const isHovered = hovered === county.slug;
          const isFeatured = county.featured;

          return (
            <g key={county.slug}>
              <path
                d={county.d}
                fill={
                  isHovered
                    ? "#c9a84c"
                    : isFeatured
                    ? "rgba(201,168,76,0.18)"
                    : "rgba(255,255,255,0.06)"
                }
                stroke={isHovered ? "#c9a84c" : isFeatured ? "rgba(201,168,76,0.5)" : "rgba(255,255,255,0.18)"}
                strokeWidth={isHovered ? 1.5 : 0.8}
                style={{ cursor: "pointer", transition: "fill 0.15s, stroke 0.15s" }}
                onMouseEnter={() => setHovered(county.slug)}
                onMouseLeave={() => { setHovered(null); setTooltip(null); }}
                onMouseMove={(e) => handleMouseMove(e, county)}
                onClick={() => handleClick(county.slug)}
              />
              {/* County label */}
              <text
                x={county.label[0]}
                y={county.label[1]}
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize={isHovered ? "9" : "7.5"}
                fontWeight={isHovered || isFeatured ? "700" : "400"}
                fill={isHovered ? "#080808" : isFeatured ? "#c9a84c" : "rgba(255,255,255,0.45)"}
                style={{ pointerEvents: "none", transition: "all 0.15s", fontFamily: "system-ui, sans-serif" }}
              >
                {county.name}
              </text>
            </g>
          );
        })}
      </svg>

      {/* Tooltip */}
      {tooltip && (
        <div
          className="absolute z-20 pointer-events-none"
          style={{
            left: tooltip.x + 12,
            top: tooltip.y - 36,
            transform: "translateY(-50%)",
          }}
        >
          <div className="bg-[#1a1a1a] border border-[#c9a84c]/40 rounded-lg px-3 py-1.5 shadow-xl whitespace-nowrap">
            <div className="text-white text-xs font-bold">{tooltip.name} County</div>
            {tooltip.featured && (
              <div className="text-[#c9a84c] text-[10px] font-medium">★ Featured service page</div>
            )}
            {!tooltip.featured && (
              <div className="text-white/70 text-[10px]">Click to view service page</div>
            )}
          </div>
        </div>
      )}

      {/* Legend */}
      <div className="absolute bottom-3 right-3 flex flex-col gap-1.5 bg-black/60 backdrop-blur-sm rounded-lg px-3 py-2 border border-white/10">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-sm bg-[#c9a84c]/30 border border-[#c9a84c]/60" />
          <span className="text-[10px] text-white/60">Featured county</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-sm bg-white/8 border border-white/20" />
          <span className="text-[10px] text-white/60">All counties served</span>
        </div>
      </div>
    </div>
  );
}

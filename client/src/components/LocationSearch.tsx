import { useState, useRef, useEffect, useCallback } from "react";
import { useLocation } from "wouter";
import { Search, MapPin, Building2, ArrowRight, X } from "lucide-react";
import { COUNTIES, CITIES } from "@/lib/utahLocations";

interface SearchResult {
  type: "county" | "city";
  name: string;
  slug: string;
  subtitle: string;
  featured: boolean;
}

interface Props {
  /** Placeholder text for the input */
  placeholder?: string;
  /** Filter to only show counties, only cities, or both (default) */
  filter?: "counties" | "cities" | "both";
  /** Extra classes for the wrapper div */
  className?: string;
  /** Max results to show in dropdown (default 8) */
  maxResults?: number;
}

export default function LocationSearch({
  placeholder = "Search counties or cities in Utah...",
  filter = "both",
  className = "",
  maxResults = 8,
}: Props) {
  const [, navigate] = useLocation();
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const results: SearchResult[] = (() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();

    const countyResults: SearchResult[] =
      filter !== "cities"
        ? COUNTIES.filter(
            (c) =>
              c.name.toLowerCase().includes(q) ||
              c.seat.toLowerCase().includes(q) ||
              c.keyIndustries.some((i) => i.toLowerCase().includes(q))
          )
            .sort((a, b) => {
              // Featured first, then by population
              if (a.featured !== b.featured) return a.featured ? -1 : 1;
              return b.population - a.population;
            })
            .slice(0, filter === "counties" ? maxResults : Math.ceil(maxResults / 2))
            .map((c) => ({
              type: "county" as const,
              name: c.name,
              slug: c.slug,
              subtitle: `County · Seat: ${c.seat} · ${c.population.toLocaleString()} pop.`,
              featured: c.featured,
            }))
        : [];

    const cityResults: SearchResult[] =
      filter !== "counties"
        ? CITIES.filter(
            (c) =>
              c.name.toLowerCase().includes(q) ||
              c.county.toLowerCase().includes(q) ||
              c.keyIndustries?.some((i) => i.toLowerCase().includes(q))
          )
            .sort((a, b) => {
              if (a.featured !== b.featured) return a.featured ? -1 : 1;
              return b.population - a.population;
            })
            .slice(0, filter === "cities" ? maxResults : Math.floor(maxResults / 2))
            .map((c) => ({
              type: "city" as const,
              name: c.name,
              slug: c.slug,
              subtitle: `City · ${c.county} County · ${c.population.toLocaleString()} pop.`,
              featured: c.featured,
            }))
        : [];

    return [...countyResults, ...cityResults].slice(0, maxResults);
  })();

  const handleSelect = useCallback(
    (result: SearchResult) => {
      setQuery("");
      setOpen(false);
      setActiveIndex(-1);
      navigate(result.type === "county" ? `/counties/${result.slug}` : `/cities/${result.slug}`);
    },
    [navigate]
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!open || results.length === 0) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, -1));
    } else if (e.key === "Enter" && activeIndex >= 0) {
      e.preventDefault();
      handleSelect(results[activeIndex]);
    } else if (e.key === "Escape") {
      setOpen(false);
      setActiveIndex(-1);
    }
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
        setActiveIndex(-1);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className={`relative ${className}`}>
      {/* Input */}
      <div className="relative">
        <Search
          size={16}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none"
        />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
            setActiveIndex(-1);
          }}
          onFocus={() => query && setOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="w-full bg-white/8 border border-white/15 hover:border-white/25 focus:border-[#c9a84c]/60 rounded-xl pl-10 pr-10 py-3.5 text-sm text-white placeholder-white/35 focus:outline-none transition-colors"
          autoComplete="off"
        />
        {query && (
          <button
            onClick={() => { setQuery(""); setOpen(false); inputRef.current?.focus(); }}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
          >
            <X size={14} />
          </button>
        )}
      </div>

      {/* Dropdown */}
      {open && query.trim() && (
        <div
          ref={dropdownRef}
          className="absolute top-full left-0 right-0 mt-1.5 bg-[#141414] border border-white/12 rounded-xl shadow-2xl overflow-hidden z-50"
        >
          {results.length === 0 ? (
            <div className="px-4 py-5 text-center">
              <p className="text-white/50 text-sm mb-1">No results for "{query}"</p>
              <p className="text-white/30 text-xs">
                UBC Unlimited serves all of Utah — use the form below to request a consultation for your area.
              </p>
            </div>
          ) : (
            <>
              {/* Group headers when showing both */}
              {filter === "both" && results.some((r) => r.type === "county") && (
                <div className="px-4 pt-3 pb-1">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-white/30">Counties</span>
                </div>
              )}
              {results
                .filter((r) => r.type === "county")
                .map((result, i) => (
                  <ResultRow
                    key={`county-${result.slug}`}
                    result={result}
                    isActive={activeIndex === i}
                    onSelect={handleSelect}
                    onHover={() => setActiveIndex(i)}
                  />
                ))}

              {filter === "both" && results.some((r) => r.type === "city") && (
                <div className={`px-4 pb-1 ${results.some((r) => r.type === "county") ? "pt-2 border-t border-white/8 mt-1" : "pt-3"}`}>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-white/30">Cities</span>
                </div>
              )}
              {results
                .filter((r) => r.type === "city")
                .map((result, i) => {
                  const offset = results.filter((r) => r.type === "county").length;
                  return (
                    <ResultRow
                      key={`city-${result.slug}`}
                      result={result}
                      isActive={activeIndex === offset + i}
                      onSelect={handleSelect}
                      onHover={() => setActiveIndex(offset + i)}
                    />
                  );
                })}

              <div className="px-4 py-2.5 border-t border-white/8 flex items-center justify-between">
                <span className="text-[10px] text-white/30">{results.length} result{results.length !== 1 ? "s" : ""} found</span>
                <span className="text-[10px] text-white/25">↑↓ navigate · Enter select · Esc close</span>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

function ResultRow({
  result,
  isActive,
  onSelect,
  onHover,
}: {
  result: SearchResult;
  isActive: boolean;
  onSelect: (r: SearchResult) => void;
  onHover: () => void;
}) {
  return (
    <button
      className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors ${
        isActive ? "bg-[#c9a84c]/15" : "hover:bg-white/5"
      }`}
      onClick={() => onSelect(result)}
      onMouseEnter={onHover}
    >
      <div
        className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
          result.type === "county"
            ? "bg-[#c9a84c]/15"
            : "bg-blue-500/15"
        }`}
      >
        {result.type === "county" ? (
          <MapPin size={13} className="text-[#c9a84c]" />
        ) : (
          <Building2 size={13} className="text-blue-400" />
        )}
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-1.5">
          <span className={`text-sm font-semibold truncate ${isActive ? "text-[#c9a84c]" : "text-white"}`}>
            {result.name}
          </span>
          {result.featured && (
            <span className="text-[9px] font-bold text-[#c9a84c] bg-[#c9a84c]/10 border border-[#c9a84c]/30 px-1.5 py-0.5 rounded-full shrink-0">
              FEATURED
            </span>
          )}
        </div>
        <div className="text-[11px] text-white/40 truncate">{result.subtitle}</div>
      </div>
      <ArrowRight size={12} className={`shrink-0 transition-colors ${isActive ? "text-[#c9a84c]" : "text-white/20"}`} />
    </button>
  );
}

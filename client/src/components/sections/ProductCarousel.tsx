// ProductCarousel — UBC Unlimited
// Horizontally scrollable card carousel for POS systems, solutions, or any product list.
// Usage: <ProductCarousel items={[...]} title="Our Most Popular POS Systems" />

import { useRef } from "react";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { Link } from "wouter";

export interface ProductCard {
  /** Product/solution name */
  name: string;
  /** Short description */
  description: string;
  /** CDN URL for product image */
  image?: string;
  /** Link to learn more */
  href?: string;
  /** Optional badge label e.g. "Most Popular" */
  badge?: string;
}

interface ProductCarouselProps {
  items: ProductCard[];
  title?: string;
  subtitle?: string;
  dark?: boolean;
}

export default function ProductCarousel({
  items,
  title = "Our Most Popular POS Systems",
  subtitle,
  dark = false,
}: ProductCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: dir === "right" ? 320 : -320, behavior: "smooth" });
  };

  return (
    <section className={`py-16 ${dark ? "bg-[#080808]" : "bg-[#f8fafc]"}`}>
      <div className="container">
        {(title || subtitle) && (
          <div className="flex items-end justify-between mb-8 gap-4">
            <div>
              {title && (
                <h2
                  className={`text-2xl md:text-3xl font-bold ${dark ? "text-white" : "text-[#080808]"}`}
                  style={{ fontFamily: "Sora, sans-serif" }}
                >
                  {title}
                </h2>
              )}
              {subtitle && (
                <p className={`text-sm mt-1 ${dark ? "text-white/70" : "text-gray-600"}`}>{subtitle}</p>
              )}
            </div>
            {/* Scroll buttons */}
            <div className="flex gap-2 shrink-0">
              <button
                onClick={() => scroll("left")}
                aria-label="Scroll left"
                className={`w-9 h-9 rounded-full border flex items-center justify-center transition-all ${
                  dark
                    ? "border-white/20 text-white/70 hover:border-[#c9a84c] hover:text-[#c9a84c]"
                    : "border-gray-200 text-gray-600 hover:border-[#c9a84c] hover:text-[#c9a84c]"
                }`}
              >
                <ChevronLeft size={17} />
              </button>
              <button
                onClick={() => scroll("right")}
                aria-label="Scroll right"
                className={`w-9 h-9 rounded-full border flex items-center justify-center transition-all ${
                  dark
                    ? "border-white/20 text-white/70 hover:border-[#c9a84c] hover:text-[#c9a84c]"
                    : "border-gray-200 text-gray-600 hover:border-[#c9a84c] hover:text-[#c9a84c]"
                }`}
              >
                <ChevronRight size={17} />
              </button>
            </div>
          </div>
        )}

        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto pb-2 scroll-smooth"
          style={{ scrollbarWidth: "none" }}
        >
          {items.map((item) => (
            <div
              key={item.name}
              className={`shrink-0 w-72 rounded-xl border overflow-hidden flex flex-col transition-all ${
                dark
                  ? "bg-white/[0.03] border-white/10 hover:border-[#c9a84c]/40"
                  : "bg-white border-gray-100 hover:border-[#c9a84c]/40 hover:shadow-md"
              }`}
            >
              {/* Image */}
              {item.image && (
                <div className="relative h-44 bg-[#111] overflow-hidden">
                  <img
                    src={item.image}
                    alt={`${item.name} POS system`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  {item.badge && (
                    <span className="absolute top-3 left-3 bg-[#c9a84c] text-[#080808] text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full">
                      {item.badge}
                    </span>
                  )}
                </div>
              )}

              {/* Content */}
              <div className="p-5 flex flex-col gap-3 flex-1">
                <h3
                  className={`text-base font-bold ${dark ? "text-white" : "text-[#080808]"}`}
                  style={{ fontFamily: "Sora, sans-serif" }}
                >
                  {item.name}
                </h3>
                <p className={`text-sm leading-relaxed flex-1 ${dark ? "text-white/70" : "text-gray-600"}`}>
                  {item.description}
                </p>
                {item.href && (
                  <Link
                    href={item.href}
                    className="text-[#c9a84c] text-sm font-semibold flex items-center gap-1 hover:gap-2 transition-all"
                  >
                    Learn More <ArrowRight size={14} />
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// KeywordTicker — UBC Unlimited
// Horizontally scrolling marquee of service keywords. Mirrors the GoPayBright-style ticker.
// Usage: <KeywordTicker items={[...]} dark />

interface KeywordTickerProps {
  /** Array of keyword strings to display */
  items?: string[];
  /** Dark background variant */
  dark?: boolean;
  /** Speed multiplier — lower = faster (default 40s) */
  duration?: number;
}

const DEFAULT_ITEMS = [
  "Credit Card Processing",
  "Cash Discount",
  "Surcharging & Cash Discount Solutions",
  "Same Day Funding",
  "ACH Processing",
  "Payment Gateway",
  "Surcharge Program",
  "Medical Payments",
  "POS Systems",
  "Next Day Funding",
  "Gift Cards",
  "Loyalty Programs",
  "eCommerce",
  "High-Risk Processing",
  "Mobile Payments",
  "Invoicing",
  "Restaurant POS",
  "Retail POS",
  "B2B Payments",
  "Chargeback Protection",
];

export default function KeywordTicker({
  items = DEFAULT_ITEMS,
  dark = true,
  duration = 40,
}: KeywordTickerProps) {
  // Duplicate items so the marquee loops seamlessly
  const doubled = [...items, ...items];

  return (
    <div
      className={`overflow-hidden py-4 ${dark ? "bg-[#c9a84c]" : "bg-[#080808]"}`}
      aria-hidden="true"
    >
      <div
        className="flex items-center gap-0 whitespace-nowrap"
        style={{
          animation: `ticker-scroll ${duration}s linear infinite`,
        }}
      >
        {doubled.map((item, i) => (
          <span
            key={i}
            className={`inline-flex items-center gap-3 text-xs font-bold tracking-widest uppercase px-5 ${
              dark ? "text-[#080808]" : "text-[#c9a84c]"
            }`}
          >
            {item}
            <span className={`w-1.5 h-1.5 rounded-full ${dark ? "bg-[#080808]/30" : "bg-[#c9a84c]/40"}`} />
          </span>
        ))}
      </div>

      <style>{`
        @keyframes ticker-scroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}

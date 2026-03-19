// StatsBar — UBC Unlimited
// Horizontal bar of large social-proof numbers.
// Usage: <StatsBar stats={[...]} dark />

interface Stat {
  value: string;
  label: string;
}

interface StatsBarProps {
  stats?: Stat[];
  dark?: boolean;
}

const DEFAULT_STATS: Stat[] = [
  { value: "20+", label: "Years in Business" },
  { value: "1,000+", label: "Utah Businesses Served" },
  { value: "$500M+", label: "Volume Processed" },
  { value: "1 Day", label: "Avg. Approval Time" },
  { value: "24/7", label: "Local Support" },
];

export default function StatsBar({ stats = DEFAULT_STATS, dark = true }: StatsBarProps) {
  return (
    <section className={`py-10 ${dark ? "bg-[#c9a84c]" : "bg-[#080808]"}`}>
      <div className="container">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 text-center">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col items-center gap-1">
              <span
                className={`text-3xl md:text-4xl font-extrabold leading-none ${dark ? "text-[#080808]" : "text-[#c9a84c]"}`}
                style={{ fontFamily: "Sora, sans-serif" }}
              >
                {stat.value}
              </span>
              <span
                className={`text-xs font-semibold tracking-widest uppercase ${dark ? "text-[#080808]/60" : "text-white/50"}`}
              >
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

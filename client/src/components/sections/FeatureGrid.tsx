// FeatureGrid — UBC Unlimited
// Configurable 2/3/4-column grid of icon + headline + body cards.
// Usage: <FeatureGrid features={[...]} columns={4} dark />

import type { LucideIcon } from "lucide-react";
import {
  ShieldCheck,
  Zap,
  Users,
  TrendingDown,
  Clock,
  HeartHandshake,
} from "lucide-react";

export interface Feature {
  /** Lucide icon component */
  icon?: LucideIcon;
  /** Short headline */
  title: string;
  /** Descriptive body text */
  body: string;
}

interface FeatureGridProps {
  features?: Feature[];
  /** Number of columns on desktop (2, 3, or 4) */
  columns?: 2 | 3 | 4 | 6;
  title?: string;
  subtitle?: string;
  dark?: boolean;
  /** Show icon in gold circle (default true) */
  showIcon?: boolean;
}

const DEFAULT_FEATURES: Feature[] = [
  {
    icon: ShieldCheck,
    title: "No Contracts",
    body: "We don't lock you in. UBC Unlimited operates on simple month-to-month agreements because we earn your business through service, not fine print.",
  },
  {
    icon: Zap,
    title: "Free Equipment",
    body: "Qualified merchants receive free terminals and POS hardware. Get the technology your business needs without the upfront cost.",
  },
  {
    icon: Users,
    title: "Dedicated Local Support",
    body: "You get a real person — a local Utah rep who knows your business. Not a 1-800 number. A direct line to someone who picks up.",
  },
  {
    icon: TrendingDown,
    title: "No Rate Increases",
    body: "We never raise our processing fees. You know exactly what you'll pay, year after year — no surprises, no renegotiations.",
  },
  {
    icon: Clock,
    title: "Same Day Funding",
    body: "Access your money faster with same-day and next-day funding options for qualified merchants. Keep your cash flow moving.",
  },
  {
    icon: HeartHandshake,
    title: "Transparent Pricing",
    body: "No hidden fees. No gotcha charges. Just clear, competitive rates that help your business thrive — exactly as quoted.",
  },
];

const colClass: Record<number, string> = {
  2: "grid-cols-1 sm:grid-cols-2",
  3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
  4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
  6: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
};

export default function FeatureGrid({
  features = DEFAULT_FEATURES,
  columns = 3,
  title,
  subtitle,
  dark = false,
  showIcon = true,
}: FeatureGridProps) {
  return (
    <section className={`py-16 ${dark ? "bg-[#080808]" : "bg-white"}`}>
      <div className="container">
        {(title || subtitle) && (
          <div className="text-center mb-12">
            {title && (
              <h2
                className={`text-3xl md:text-4xl font-bold mb-3 ${dark ? "text-white" : "text-[#080808]"}`}
                style={{ fontFamily: "Sora, sans-serif" }}
              >
                {title}
              </h2>
            )}
            {subtitle && (
              <p className={`text-base max-w-2xl mx-auto ${dark ? "text-white/60" : "text-gray-500"}`}>
                {subtitle}
              </p>
            )}
          </div>
        )}

        <div className={`grid ${colClass[columns] ?? colClass[3]} gap-6`}>
          {features.map((feat) => {
            const Icon = feat.icon;
            return (
              <div
                key={feat.title}
                className={`rounded-xl p-6 flex flex-col gap-4 border transition-all ${
                  dark
                    ? "bg-white/[0.03] border-white/10 hover:bg-white/[0.06]"
                    : "bg-[#f8fafc] border-gray-100 hover:border-[#c9a84c]/30 hover:shadow-sm"
                }`}
              >
                {showIcon && Icon && (
                  <div className="w-11 h-11 rounded-xl bg-[#c9a84c]/15 flex items-center justify-center shrink-0">
                    <Icon size={20} className="text-[#c9a84c]" aria-hidden="true" />
                  </div>
                )}
                <div>
                  <h3
                    className={`text-base font-bold mb-2 ${dark ? "text-white" : "text-[#080808]"}`}
                    style={{ fontFamily: "Sora, sans-serif" }}
                  >
                    {feat.title}
                  </h3>
                  <p className={`text-sm leading-relaxed ${dark ? "text-white/60" : "text-gray-500"}`}>
                    {feat.body}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

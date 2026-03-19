// DualAudienceCTA — UBC Unlimited
// Split-panel section with separate CTAs for two distinct audiences (e.g., Merchants vs. Agents/ISOs).
// Usage: <DualAudienceCTA />

import { Link } from "wouter";
import { ArrowRight, Store, Briefcase } from "lucide-react";

interface AudiencePanel {
  icon: React.ReactNode;
  eyebrow: string;
  headline: string;
  body: string;
  ctaLabel: string;
  ctaHref: string;
  /** "gold" | "dark" */
  variant?: "gold" | "dark";
}

interface DualAudienceCTAProps {
  left?: AudiencePanel;
  right?: AudiencePanel;
}

const DEFAULT_LEFT: AudiencePanel = {
  icon: <Store size={28} />,
  eyebrow: "For Merchants",
  headline: "Start Saving on Payment Processing",
  body: "Get a free, no-obligation statement review and see exactly how much you can save with UBC Unlimited's transparent, local merchant services.",
  ctaLabel: "Become a Merchant",
  ctaHref: "/contact",
  variant: "gold",
};

const DEFAULT_RIGHT: AudiencePanel = {
  icon: <Briefcase size={28} />,
  eyebrow: "For Agents & ISOs",
  headline: "The ISO Other Companies Don't Want You to Know About",
  body: "Top-tier residuals, free equipment program, 25+ POS options, and real support from a team that's built for agents — not excuses.",
  ctaLabel: "Become an Agent",
  ctaHref: "/agents",
  variant: "dark",
};

export default function DualAudienceCTA({
  left = DEFAULT_LEFT,
  right = DEFAULT_RIGHT,
}: DualAudienceCTAProps) {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-2">
      {[left, right].map((panel) => (
        <div
          key={panel.eyebrow}
          className={`flex flex-col justify-center px-10 py-16 md:px-16 ${
            panel.variant === "gold"
              ? "bg-[#c9a84c]"
              : "bg-[#080808]"
          }`}
        >
          <div
            className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 ${
              panel.variant === "gold" ? "bg-[#080808]/15" : "bg-[#c9a84c]/15"
            }`}
          >
            <span className={panel.variant === "gold" ? "text-[#080808]" : "text-[#c9a84c]"}>
              {panel.icon}
            </span>
          </div>

          <p
            className={`text-xs font-bold tracking-widest uppercase mb-2 ${
              panel.variant === "gold" ? "text-[#080808]/60" : "text-[#c9a84c]"
            }`}
          >
            {panel.eyebrow}
          </p>

          <h2
            className={`text-2xl md:text-3xl font-extrabold mb-4 leading-tight ${
              panel.variant === "gold" ? "text-[#080808]" : "text-white"
            }`}
            style={{ fontFamily: "Sora, sans-serif" }}
          >
            {panel.headline}
          </h2>

          <p
            className={`text-sm leading-relaxed mb-7 max-w-sm ${
              panel.variant === "gold" ? "text-[#080808]/70" : "text-white/60"
            }`}
          >
            {panel.body}
          </p>

          <Link
            href={panel.ctaHref}
            className={`inline-flex items-center gap-2 font-semibold text-sm py-3 px-7 rounded-lg transition-all w-fit ${
              panel.variant === "gold"
                ? "bg-[#080808] text-white hover:bg-[#1a1a1a]"
                : "bg-[#c9a84c] text-[#080808] hover:bg-[#e2c97e]"
            }`}
          >
            {panel.ctaLabel} <ArrowRight size={15} />
          </Link>
        </div>
      ))}
    </section>
  );
}

// PullQuoteBanner — UBC Unlimited
// Full-width dark banner with a large centered quote and attribution.
// Usage: <PullQuoteBanner quote="..." attribution="..." />

import { Quote } from "lucide-react";

interface PullQuoteBannerProps {
  quote: string;
  attribution?: string;
  /** Optional rotating quotes array — cycles every 5 seconds */
  quotes?: { quote: string; attribution: string }[];
  dark?: boolean;
}

export default function PullQuoteBanner({
  quote,
  attribution,
  dark = true,
}: PullQuoteBannerProps) {
  return (
    <section
      className={`py-14 ${dark ? "bg-[#0d0d0d] border-y border-white/5" : "bg-[#f7f3ec] border-y border-gray-100"}`}
    >
      <div className="container">
        <div className="max-w-3xl mx-auto text-center">
          <Quote
            size={36}
            className="text-[#c9a84c] mx-auto mb-5 opacity-60"
            aria-hidden="true"
          />
          <blockquote
            className={`text-xl md:text-2xl font-semibold leading-relaxed mb-5 ${
              dark ? "text-white" : "text-[#080808]"
            }`}
            style={{ fontFamily: "Sora, sans-serif" }}
          >
            "{quote}"
          </blockquote>
          {attribution && (
            <p
              className={`text-sm font-medium tracking-wide ${
                dark ? "text-[#c9a84c]" : "text-[#c9a84c]"
              }`}
            >
              — {attribution}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

import { Link } from "wouter";
import { ArrowRight, CheckCircle, X, Info, TrendingDown, Sliders, DollarSign, Minus } from "lucide-react";

const models = [
  {
    name: "Interchange-Plus",
    badge: "Most Transparent",
    badgeColor: "bg-[#c9a84c] text-white",
    range: "Interchange + 0.10% – 0.50%",
    rangeNote: "above true interchange cost",
    best: "High-volume retail, restaurants, B2B",
    desc: "You pay the exact interchange rate set by Visa/Mastercard plus a small fixed markup. As your card mix shifts toward debit and commercial cards, your effective rate drops automatically.",
    highlights: [
      "Rate moves with your actual card mix",
      "Full visibility into every fee line",
      "Best for businesses processing $10K+/mo",
    ],
    cta: "Best for most businesses",
    ctaColor: "text-[#c9a84c]",
  },
  {
    name: "Flat-Rate / Tiered",
    badge: "Simple & Predictable",
    badgeColor: "bg-[#2a7a6f] text-white",
    range: "1.50% – 2.90% + $0.10 – $0.30",
    rangeNote: "per transaction, all card types",
    best: "Low-volume, seasonal, or startup businesses",
    desc: "One blended rate covers all card types. Easier to budget month-to-month, though businesses with a favorable card mix (high debit, low rewards) often pay more than necessary.",
    highlights: [
      "Predictable monthly processing costs",
      "No interchange knowledge required",
      "May cost more if debit volume is high",
    ],
    cta: "Good for under $5K/mo",
    ctaColor: "text-[#2a7a6f]",
  },
  {
    name: "Cash Discount / Cash Discount & Surcharging",
    badge: "Zero-Cost Option",
    badgeColor: "bg-[#080808] text-[#c9a84c] border border-[#c9a84c]/30",
    range: "0% to you",
    rangeNote: "card fee passed to card-paying customers",
    best: "Retail, food service, service businesses",
    desc: "Post a cash price and a card price. Card-paying customers cover the processing fee (typically 3–4% added to their total). Fully compliant with Visa/Mastercard rules when implemented correctly.",
    highlights: [
      "Eliminate processing costs entirely",
      "Compliant with all card network rules",
      "Requires proper signage & disclosure",
    ],
    cta: "Eliminate fees completely",
    ctaColor: "text-[#080808]",
  },
];

const cardMixFactors = [
  {
    icon: Sliders,
    title: "Card Mix",
    desc: "Debit cards cost significantly less to process than premium rewards cards. A business with 60% debit volume pays far less than one dominated by corporate Amex.",
  },
  {
    icon: TrendingDown,
    title: "Average Ticket Size",
    desc: "Flat per-transaction fees ($0.10–$0.30) hit small-ticket businesses harder. High average tickets benefit more from percentage-based interchange-plus pricing.",
  },
  {
    icon: DollarSign,
    title: "Monthly Volume",
    desc: "Higher monthly volume unlocks lower markup rates. Most businesses processing over $20K/month qualify for our most competitive interchange-plus tiers.",
  },
];

type CellValue = string | boolean | null;

const comparisonRows: { feature: string; ubc: CellValue; stripe: CellValue; square: CellValue; note?: string }[] = [
  {
    feature: "Pricing Model",
    ubc: "Interchange-Plus, Flat-Rate, or Cash Discount",
    stripe: "Flat-Rate (2.7–2.9% + $0.05–$0.30)",
    square: "Flat-Rate (2.6–3.5% + $0.10–$0.15)",
    note: "UBC tailors the model to your card mix — you're not forced into one structure.",
  },
  {
    feature: "Effective Rate Range",
    ubc: "As low as 1.2%–2.2%¹ (card-present, high debit)",
    stripe: "2.7%–3.5%+ blended",
    square: "2.6%–3.5%+ blended",
    note: "Interchange-plus pricing can save 0.5–1.5% vs. flat-rate for businesses with favorable card mix.",
  },
  {
    feature: "Cash Discount / Cash Discount & Surcharging",
    ubc: true,
    stripe: false,
    square: false,
    note: "Eliminate processing costs entirely — not available through Stripe or Square.",
  },
  {
    feature: "High-Risk Business Support",
    ubc: true,
    stripe: false,
    square: false,
    note: "Stripe and Square routinely terminate high-risk accounts without warning.",
  },
  {
    feature: "Local Dedicated Rep",
    ubc: true,
    stripe: false,
    square: false,
    note: "A real Utah-based person who knows your business — not a support ticket.",
  },
  {
    feature: "Month-to-Month Agreement²",
    ubc: true,
    stripe: true,
    square: true,
    note: "Standard accounts are month-to-month. Certain solutions and equipment programs may require an agreement.",
  },
  {
    feature: "Statement Review",
    ubc: true,
    stripe: false,
    square: false,
  },
  {
    feature: "POS Hardware Options",
    ubc: "SkyTab, Dejavoo, PAX + more",
    stripe: "Stripe Terminal only",
    square: "Square hardware only",
    note: "UBC is hardware-agnostic — we find the right fit for your business.",
  },
  {
    feature: "ACH / eCheck Processing",
    ubc: true,
    stripe: true,
    square: false,
  },
  {
    feature: "Chargeback Support",
    ubc: "Hands-on local assistance",
    stripe: "Self-serve portal",
    square: "Self-serve portal",
    note: "We fight chargebacks with you, not just notify you of them.",
  },
];

function Cell({ value }: { value: CellValue }) {
  if (value === true) return <CheckCircle size={18} className="text-[#2a7a6f] mx-auto" />;
  if (value === false) return <X size={18} className="text-red-400 mx-auto" />;
  if (value === null) return <Minus size={16} className="text-gray-300 mx-auto" />;
  return <span className="text-xs text-gray-700 leading-snug">{value}</span>;
}

export default function PricingTransparency() {
  return (
    <section className="py-20 bg-white" id="pricing">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-4">
          <div className="teal-divider mx-auto mb-4" />
          <h2
            className="text-3xl md:text-4xl font-bold text-[#080808] mb-3"
            style={{ fontFamily: "DM Serif Display, Georgia, serif" }}
          >
            Transparent Pricing, Tailored to Your Business
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-sm leading-relaxed">
            There is no single "best rate" in merchant services — the right pricing model depends on your{" "}
            <strong className="text-[#080808]">card mix, average ticket, and monthly volume</strong>. We analyze your
            statement and build a structure that actually optimizes your savings.
          </p>
        </div>

        {/* Disclaimer banner */}
        <div className="flex items-start gap-3 bg-[#f7f3ec] border border-[#c9a84c]/20 rounded-xl px-5 py-4 mb-10 max-w-3xl mx-auto">
          <Info size={18} className="text-[#c9a84c] shrink-0 mt-0.5" />
          <p className="text-xs text-gray-600 leading-relaxed">
            <strong className="text-[#080808]">Ranges shown are illustrative.</strong> Your actual effective rate is
            determined by your unique card mix, industry classification, transaction type (card-present vs. card-not-present),
            and monthly volume. A statement review gives you exact numbers — no obligation.
          </p>
        </div>

        {/* Pricing model cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
          {models.map((model) => (
            <div
              key={model.name}
              className="rounded-2xl border border-gray-100 hover:border-[#c9a84c]/30 hover:shadow-xl transition-all p-6 flex flex-col"
            >
              <div className="flex items-start justify-between mb-4">
                <h3 className="font-bold text-[#080808] text-base leading-tight">{model.name}</h3>
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full shrink-0 ml-2 ${model.badgeColor}`}>
                  {model.badge}
                </span>
              </div>

              <div className="mb-4">
                <div
                  className="text-2xl font-extrabold text-[#c9a84c] leading-tight"
                  style={{ fontFamily: "DM Serif Display, Georgia, serif" }}
                >
                  {model.range}
                </div>
                <div className="text-xs text-gray-400 mt-0.5">{model.rangeNote}</div>
              </div>

              <p className="text-xs text-gray-500 leading-relaxed mb-4 flex-1">{model.desc}</p>

              <div className="space-y-2 mb-5">
                {model.highlights.map((h) => (
                  <div key={h} className="flex items-start gap-2">
                    <CheckCircle size={13} className="text-[#c9a84c] shrink-0 mt-0.5" />
                    <span className="text-xs text-gray-600">{h}</span>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-100 pt-4">
                <div className="text-xs text-gray-400 mb-1">Best for</div>
                <div className="text-xs font-semibold text-[#080808]">{model.best}</div>
                <div className={`text-xs font-bold mt-2 ${model.ctaColor}`}>{model.cta}</div>
              </div>
            </div>
          ))}
        </div>

        {/* What affects your rate */}
        <div className="bg-[#080808] rounded-2xl p-8 md:p-10 mb-14">
          <div className="text-center mb-8">
            <h3
              className="text-2xl font-bold text-white mb-2"
              style={{ fontFamily: "DM Serif Display, Georgia, serif" }}
            >
              What Actually Determines Your Rate
            </h3>
            <p className="text-white/50 text-sm max-w-xl mx-auto">
              Understanding these three factors is why a statement review is worth more than any rate quote we could give you upfront.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {cardMixFactors.map((factor) => (
              <div key={factor.title} className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#c9a84c]/10 flex items-center justify-center shrink-0">
                  <factor.icon size={20} className="text-[#c9a84c]" />
                </div>
                <div>
                  <div className="font-semibold text-white text-sm mb-1">{factor.title}</div>
                  <div className="text-white/50 text-xs leading-relaxed">{factor.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Comparison Table */}
        <div className="mb-14">
          <div className="text-center mb-8">
            <h3
              className="text-2xl md:text-3xl font-bold text-[#080808] mb-2"
              style={{ fontFamily: "DM Serif Display, Georgia, serif" }}
            >
              How We Compare
            </h3>
            <p className="text-gray-500 text-sm max-w-xl mx-auto">
              UBC Unlimited vs. national platforms — on the factors that actually matter to your bottom line.
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-gray-100 shadow-sm">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#080808]">
                  <th className="text-left px-5 py-4 text-white/60 font-medium text-xs w-[30%]">Feature</th>
                  <th className="px-5 py-4 text-center w-[23%]">
                    <div className="text-[#c9a84c] font-bold text-sm">UBC Unlimited</div>
                    <div className="text-white/40 text-xs font-normal">Local Utah Expert</div>
                  </th>
                  <th className="px-5 py-4 text-center w-[23%]">
                    <div className="text-white/70 font-semibold text-sm">Stripe</div>
                    <div className="text-white/30 text-xs font-normal">National Platform</div>
                  </th>
                  <th className="px-5 py-4 text-center w-[23%]">
                    <div className="text-white/70 font-semibold text-sm">Square</div>
                    <div className="text-white/30 text-xs font-normal">National Platform</div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row, i) => (
                  <tr
                    key={row.feature}
                    className={i % 2 === 0 ? "bg-white" : "bg-[#fafaf9]"}
                  >
                    <td className="px-5 py-4 align-top">
                      <div className="font-semibold text-[#080808] text-xs mb-0.5">{row.feature}</div>
                      {row.note && (
                        <div className="text-gray-400 text-xs leading-snug">{row.note}</div>
                      )}
                    </td>
                    <td className="px-5 py-4 text-center align-middle bg-[#c9a84c]/5 border-x border-[#c9a84c]/10">
                      <Cell value={row.ubc} />
                    </td>
                    <td className="px-5 py-4 text-center align-middle">
                      <Cell value={row.stripe} />
                    </td>
                    <td className="px-5 py-4 text-center align-middle">
                      <Cell value={row.square} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-400 mt-3 text-center">
            Competitor data based on publicly available pricing as of 2025. Actual rates vary. UBC Unlimited rates depend on your specific card mix and volume.
          </p>
          <div className="mt-4 space-y-1">
            <p className="text-xs text-gray-400"><sup>1</sup> Rates shown reflect low-risk merchants. Medium- and high-risk businesses may see different costs based on industry classification and risk profile.</p>
            <p className="text-xs text-gray-400"><sup>2</sup> Certain solutions and equipment programs may require a contract. This will be clearly disclosed prior to entering any agreement.</p>
          </div>
        </div>

        {/* CTA row */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-center">
          <Link href="/contact" className="btn-gold text-sm py-3 px-8 justify-center">
            Get My Statement Review <ArrowRight size={16} />
          </Link>
          <Link href="/contact" className="btn-outline-teal text-sm py-3 px-8 justify-center">
            Request a Custom Quote
          </Link>
        </div>
        <p className="text-center text-xs text-gray-400 mt-4">
          No obligation. No pressure. Just an honest comparison of what you're paying vs. what you should be paying.
        </p>
      </div>
    </section>
  );
}

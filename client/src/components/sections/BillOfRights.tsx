// BillOfRights — UBC Unlimited
// A numbered or bulleted "Bill of Rights" / guarantee list section.
// Mirrors the GoPayBright Merchants Bill of Rights and Agent Bill of Rights pattern.
// Usage: <BillOfRights title="Merchant Bill of Rights" items={[...]} />

import { CheckCircle2 } from "lucide-react";

export interface RightsItem {
  title: string;
  description?: string;
}

interface BillOfRightsProps {
  title?: string;
  subtitle?: string;
  items?: RightsItem[];
  /** Show numbered list (true) or checkmark list (false) */
  numbered?: boolean;
  dark?: boolean;
}

const DEFAULT_MERCHANT_RIGHTS: RightsItem[] = [
  { title: "No Long-Term Contracts", description: "You are never locked in. Month-to-month agreements only — we earn your business through service." },
  { title: "Transparent Pricing", description: "You will always know exactly what you're paying. No hidden fees, no surprise rate hikes, ever." },
  { title: "No Rate Increases", description: "Your processing rate is your processing rate. We never raise fees after you sign up." },
  { title: "Free Equipment for Qualified Merchants", description: "You deserve the right tools. Qualified merchants receive free terminals and POS hardware." },
  { title: "Dedicated Local Support", description: "You get a real person — a local Utah rep with a direct number who knows your business." },
  { title: "Same Day & Next Day Funding Options", description: "Your money is your money. Qualified merchants can access funds the same or next business day." },
  { title: "Right to a Statement Review", description: "Any merchant can request a no-obligation analysis of their current processing statement at any time." },
  { title: "Right to Cancel Without Penalty", description: "If you're ever unsatisfied, you can cancel without early termination fees or penalties." },
];

export default function BillOfRights({
  title = "Merchant Bill of Rights",
  subtitle = "At UBC Unlimited, we believe every business owner deserves fair, transparent merchant services. These are our commitments to you.",
  items = DEFAULT_MERCHANT_RIGHTS,
  numbered = true,
  dark = false,
}: BillOfRightsProps) {
  return (
    <section className={`py-16 ${dark ? "bg-[#080808]" : "bg-[#f8fafc]"}`}>
      <div className="container max-w-3xl">
        <div className="text-center mb-12">
          <h2
            className={`text-3xl md:text-4xl font-bold mb-4 ${dark ? "text-white" : "text-[#080808]"}`}
            style={{ fontFamily: "Sora, sans-serif" }}
          >
            {title}
          </h2>
          {subtitle && (
            <p className={`text-base leading-relaxed ${dark ? "text-white/60" : "text-gray-600"}`}>
              {subtitle}
            </p>
          )}
        </div>

        <ol className="space-y-4" role="list">
          {items.map((item, i) => (
            <li
              key={item.title}
              className={`flex gap-5 p-5 rounded-xl border transition-all ${
                dark
                  ? "bg-white/[0.03] border-white/10 hover:bg-white/[0.06]"
                  : "bg-white border-gray-100 hover:border-[#c9a84c]/30 hover:shadow-sm"
              }`}
            >
              {/* Number or check */}
              <div className="shrink-0 w-9 h-9 rounded-full bg-[#c9a84c]/15 flex items-center justify-center mt-0.5">
                {numbered ? (
                  <span
                    className="text-sm font-bold text-[#c9a84c]"
                    style={{ fontFamily: "Sora, sans-serif" }}
                  >
                    {i + 1}
                  </span>
                ) : (
                  <CheckCircle2 size={18} className="text-[#c9a84c]" aria-hidden="true" />
                )}
              </div>

              <div>
                <h3
                  className={`text-base font-bold mb-1 ${dark ? "text-white" : "text-[#080808]"}`}
                  style={{ fontFamily: "Sora, sans-serif" }}
                >
                  {item.title}
                </h3>
                {item.description && (
                  <p className={`text-sm leading-relaxed ${dark ? "text-white/70" : "text-gray-600"}`}>
                    {item.description}
                  </p>
                )}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

import { Link } from "wouter";
import { ArrowRight, ChevronRight } from "lucide-react";
import PageLayout from "@/components/layout/PageLayout";
import CTABanner from "@/components/sections/CTABanner";
import SEO from "@/components/SEO";
import { NAV_SOLUTIONS } from "@/lib/config";

const solutionDetails: Record<string, { desc: string; features: string[] }> = {
  "/solutions/credit-card-processing": {
    desc: "Accept Visa, Mastercard, Amex, and Discover with competitive interchange-plus pricing.",
    features: ["Interchange-plus pricing", "Next-day funding", "EMV & NFC ready", "No hidden fees"],
  },
  "/solutions/ach-echeck-processing": {
    desc: "Process bank transfers and electronic checks at a fraction of card processing costs.",
    features: ["Lower cost than credit cards", "Recurring billing", "Fast ACH settlement", "Batch processing"],
  },
  "/solutions/check-guarantee": {
    desc: "Accept checks with confidence — we guarantee payment even if the check bounces.",
    features: ["100% guarantee", "Check verification service", "No chargebacks", "Risk-free acceptance"],
  },
  "/solutions/pos-systems": {
    desc: "Full-featured POS systems for restaurants, retail, and service businesses.",
    features: ["SkyTab & Clover", "Inventory management", "Employee tracking", "Reporting & analytics"],
  },
  "/solutions/ecommerce-payments": {
    desc: "Secure online payment gateways that integrate with your website and shopping cart.",
    features: ["100+ integrations", "Fraud protection", "Recurring billing", "Mobile optimized"],
  },
  "/solutions/mobile-processing": {
    desc: "Accept payments anywhere with mobile card readers and smartphone apps.",
    features: ["Bluetooth readers", "Offline mode", "Fast funding options", "iOS & Android"],
  },
  "/solutions/virtual-terminals": {
    desc: "Process card-not-present transactions from any browser — no hardware required.",
    features: ["Browser-based", "MOTO transactions", "Batch processing", "Secure vault"],
  },
  "/solutions/invoicing": {
    desc: "Send professional invoices and get paid faster with online payment links.",
    features: ["Custom branding", "Auto-reminders", "Payment links", "Recurring invoices"],
  },
  "/solutions/gift-loyalty": {
    desc: "Increase repeat visits and average ticket size with branded gift cards and a built-in loyalty rewards program — all integrated directly with your POS.",
    features: ["Branded physical & digital gift cards", "Points, rewards & tier-based loyalty", "POS-integrated — no manual tracking", "Email & SMS marketing tools", "$0 annual program fees"],
  },
  "/solutions/surcharge-cash-discount": {
    desc: "Legally eliminate up to 100% of your credit card processing fees with a compliant surcharge or cash discount program — available in all 50 states.",
    features: ["Up to 100% of fees eliminated", "Legal in all 50 states (program-dependent)", "Compliant signage & receipt language included", "Works with most POS systems & terminals", "$0 monthly program fee"],
  },
  "/solutions/high-risk-processing": {
    desc: "Secure a stable merchant account for your high-risk or hard-to-place business — with competitive rates, multiple acquiring bank relationships, and a dedicated local Utah rep.",
    features: ["50+ high-risk verticals supported", "Multiple acquiring bank options", "Competitive rates for high-risk accounts", "Rolling reserve minimized for qualified merchants", "Local Utah rep assigned"],
  },
};

export default function Solutions() {
  return (
    <PageLayout>
      <SEO
        title="Payment Processing Solutions for Utah Businesses | UBC Unlimited"
        description="Credit card processing, POS systems, cash discount & dual pricing, ACH, ecommerce gateways, and more. UBC Unlimited offers tailored payment solutions for Utah businesses of every size."
        canonical="/solutions"
        schema={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "name": "Payment Processing Solutions",
          "description": "UBC Unlimited offers a full suite of payment processing solutions for Utah businesses including credit card processing, POS systems, cash discount & dual pricing, ACH, and ecommerce gateways.",
          "url": "https://ubcunlimited.com/solutions",
          "provider": {
            "@type": "LocalBusiness",
            "name": "UBC Unlimited",
            "url": "https://ubcunlimited.com"
          }
        }}
      />
      <section className="bg-[#080808] py-20">
        <div className="container">
          <div className="max-w-2xl">
            <div className="stat-badge mb-5">Payment Solutions</div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-5" style={{ fontFamily: 'Sora, sans-serif' }}>
              Every Way Your Business Accepts Payments
            </h1>
            <p className="text-white/70 text-lg leading-relaxed">
              From in-person card swipes to online invoicing, UBC Unlimited has the complete payment stack for Utah businesses.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {NAV_SOLUTIONS.map((sol) => {
              const detail = solutionDetails[sol.href];
              return (
                <Link
                  key={sol.href}
                  href={sol.href}
                  className="group block p-6 rounded-2xl border border-gray-100 hover:border-[#c9a84c]/30 hover:shadow-xl transition-all bg-white"
                >
                  <div className="text-3xl mb-4">{sol.icon}</div>
                  <h2 className="text-lg font-bold text-[#080808] mb-2 group-hover:text-[#c9a84c] transition-colors" style={{ fontFamily: 'Sora, sans-serif' }}>
                    {sol.label}
                  </h2>
                  {detail && (
                    <>
                      <p className="text-gray-500 text-sm mb-4">{detail.desc}</p>
                      <ul className="space-y-1.5 mb-5">
                        {detail.features.map((f) => (
                          <li key={f} className="flex items-center gap-2 text-xs text-gray-500">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#c9a84c]" />
                            {f}
                          </li>
                        ))}
                      </ul>
                    </>
                  )}
                  <div className="flex items-center gap-1 text-sm font-semibold text-[#c9a84c]">
                    Learn more <ChevronRight size={14} />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <CTABanner />
    </PageLayout>
  );
}

import { Link } from "wouter";
import { ChevronRight, ShieldAlert } from "lucide-react";
import PageLayout from "@/components/layout/PageLayout";
import CTABanner from "@/components/sections/CTABanner";
import SEO from "@/components/SEO";
import { NAV_INDUSTRIES } from "@/lib/config";

const industryDetails: Record<string, string> = {
  "/industries/restaurants": "Tableside ordering, kitchen displays, online ordering, and tip management for full-service and quick-service restaurants.",
  "/industries/bars-nightclubs": "Fast tab management, bar tabs, split checks, and age verification integrations for bars and nightclubs.",
  "/industries/retail": "Inventory management, barcode scanning, employee management, and loyalty programs for retail stores.",
  "/industries/medical": "HIPAA-aware payment solutions, recurring billing, and patient payment plans for medical practices.",
  "/industries/ecommerce": "Secure payment gateways, fraud protection, and shopping cart integrations for online stores.",
  "/industries/automotive": "Parts inventory, service scheduling, and high-ticket payment solutions for auto dealers and repair shops.",
  "/industries/professional-services": "Invoicing, recurring billing, and virtual terminals for law firms, accountants, and consultants.",
  "/industries/salons-spas": "Appointment booking integration, tip management, and gift cards for salons and spas.",
  "/industries/property-management": "Recurring rent payments, ACH processing, and tenant payment portals for property managers.",
  "/industries/firearms": "Stable FFL dealer accounts, in-store POS, and online gateway solutions for firearms retailers and shooting ranges.",
  "/industries/cbd-hemp": "Farm Bill-compliant merchant accounts for CBD retailers, hemp product brands, and online CBD stores.",
  "/industries/nutraceuticals": "Supplement brands, continuity programs, and subscription billing with chargeback management tools.",
  "/industries/adult-entertainment": "Discreet, compliant merchant accounts for adult content platforms, subscription sites, and adult retail.",
  "/industries/travel": "Stable accounts for travel agencies, booking platforms, and tour operators with chargeback prevention.",
  "/industries/online-gaming": "Skill-based gaming, fantasy sports, and esports merchant accounts with advanced fraud prevention.",
};

const standardIndustries = NAV_INDUSTRIES.filter((i) => !(i as any).highRisk);
const highRiskIndustries = NAV_INDUSTRIES.filter((i) => (i as any).highRisk);

export default function Industries() {
  return (
    <PageLayout>
      <SEO
        title="Industries We Serve — Merchant Services for Every Business"
        description="UBC Unlimited provides tailored payment processing for restaurants, retail, medical, automotive, firearms, CBD, nutraceuticals, travel, adult entertainment, and more across Utah."
        canonical="/industries"
      />

      {/* Hero */}
      <section className="bg-[#040c1c] py-20">
        <div className="container">
          <div className="max-w-2xl">
            <div className="stat-badge mb-5">Industries We Serve</div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-5" style={{ fontFamily: 'Sora, sans-serif' }}>
              Payment Solutions Built for Your Industry
            </h1>
            <p className="text-white/70 text-lg leading-relaxed">
              Every industry has unique payment challenges. We specialize in tailored solutions that fit how your business actually operates — including specialized high-risk merchant accounts for industries other processors decline.
            </p>
          </div>
        </div>
      </section>

      {/* Standard Industries */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="teal-divider mb-4" />
          <h2 className="text-2xl font-bold text-[#040c1c] mb-2" style={{ fontFamily: 'Sora, sans-serif' }}>
            Standard Industries
          </h2>
          <p className="text-gray-500 text-sm mb-8">Competitive rates and tailored solutions for businesses across all major sectors.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {standardIndustries.map((ind) => (
              <Link
                key={ind.href}
                href={ind.href}
                className="group block p-6 rounded-2xl border border-gray-100 hover:border-[#169fa8]/30 hover:shadow-xl transition-all bg-white"
              >
                <div className="text-3xl mb-4">{ind.icon}</div>
                <h3 className="text-lg font-bold text-[#040c1c] mb-2 group-hover:text-[#169fa8] transition-colors" style={{ fontFamily: 'Sora, sans-serif' }}>
                  {ind.label}
                </h3>
                <p className="text-gray-500 text-sm mb-4 leading-relaxed">{industryDetails[ind.href]}</p>
                <div className="flex items-center gap-1 text-sm font-semibold text-[#169fa8]">
                  Learn more <ChevronRight size={14} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* High-Risk Industries */}
      <section className="py-16 bg-[#0d1b2a]" aria-labelledby="high-risk-heading">
        <div className="container">
          <div className="flex items-center gap-3 mb-2">
            <ShieldAlert size={22} className="text-[#d4a843]" aria-hidden="true" />
            <h2 id="high-risk-heading" className="text-2xl font-bold text-white" style={{ fontFamily: 'Sora, sans-serif' }}>
              High-Risk Industries
            </h2>
            <span className="px-2 py-0.5 rounded text-xs font-bold bg-[#d4a843]/20 text-[#d4a843] uppercase tracking-wide">Specialized</span>
          </div>
          <p className="text-white/60 text-sm mb-8 max-w-2xl">
            Many legitimate businesses are classified as high-risk by traditional banks. We work with specialized acquiring banks to secure stable merchant accounts for industries other processors decline — with transparent pricing and dedicated local support.
          </p>

          {/* High-Risk Overview CTA */}
          <Link
            href="/solutions/high-risk-processing"
            className="flex items-center gap-4 p-5 rounded-2xl bg-[#d4a843]/10 border border-[#d4a843]/25 hover:bg-[#d4a843]/15 transition-all mb-8 group"
          >
            <span className="text-3xl" aria-hidden="true">🛡️</span>
            <div className="flex-1">
              <div className="text-[#d4a843] font-bold text-base mb-0.5">High-Risk Merchant Processing Overview</div>
              <div className="text-white/50 text-sm">Understand rates, rolling reserves, approval requirements, and how to get started</div>
            </div>
            <ChevronRight size={18} className="text-[#d4a843] group-hover:translate-x-1 transition-transform" aria-hidden="true" />
          </Link>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {highRiskIndustries.map((ind) => (
              <Link
                key={ind.href}
                href={ind.href}
                className="group block p-6 rounded-2xl border border-white/10 hover:border-[#d4a843]/40 hover:shadow-xl transition-all bg-[#152234]"
              >
                <div className="text-3xl mb-4">{ind.icon}</div>
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#d4a843] transition-colors" style={{ fontFamily: 'Sora, sans-serif' }}>
                  {ind.label}
                </h3>
                <p className="text-white/50 text-sm mb-4 leading-relaxed">{industryDetails[ind.href]}</p>
                <div className="flex items-center gap-1 text-sm font-semibold text-[#d4a843]">
                  Learn more <ChevronRight size={14} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTABanner
        title="Not Sure Which Category Fits Your Business?"
        subtitle="Contact us for a free consultation. We'll evaluate your business, explain your options, and find the right processing solution — regardless of your risk classification."
      />
    </PageLayout>
  );
}

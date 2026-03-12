import { Link } from "wouter";
import { ChevronRight } from "lucide-react";
import PageLayout from "@/components/layout/PageLayout";
import CTABanner from "@/components/sections/CTABanner";
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
};

export default function Industries() {
  return (
    <PageLayout>
      <section className="bg-[#040c1c] py-20">
        <div className="container">
          <div className="max-w-2xl">
            <div className="stat-badge mb-5">Industries We Serve</div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-5" style={{ fontFamily: 'Sora, sans-serif' }}>
              Payment Solutions Built for Your Industry
            </h1>
            <p className="text-white/70 text-lg leading-relaxed">
              Every industry has unique payment challenges. We specialize in tailored solutions that fit how your business actually operates.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {NAV_INDUSTRIES.map((ind) => (
              <Link
                key={ind.href}
                href={ind.href}
                className="group block p-6 rounded-2xl border border-gray-100 hover:border-[#169fa8]/30 hover:shadow-xl transition-all bg-white"
              >
                <div className="text-3xl mb-4">{ind.icon}</div>
                <h2 className="text-lg font-bold text-[#040c1c] mb-2 group-hover:text-[#169fa8] transition-colors" style={{ fontFamily: 'Sora, sans-serif' }}>
                  {ind.label}
                </h2>
                <p className="text-gray-500 text-sm mb-4 leading-relaxed">{industryDetails[ind.href]}</p>
                <div className="flex items-center gap-1 text-sm font-semibold text-[#169fa8]">
                  Learn more <ChevronRight size={14} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTABanner />
    </PageLayout>
  );
}

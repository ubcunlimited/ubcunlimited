// Wasatch County — Dedicated Local SEO Landing Page
// Target keywords: merchant services Wasatch County, credit card processing Wasatch County Utah, payment processing Heber City
import { Link } from "wouter";
import { motion } from "framer-motion";
import { MapPin, Phone, ArrowRight, CheckCircle, Building2, TrendingDown, Clock, ShieldCheck, Users, DollarSign, ChevronRight } from "lucide-react";
import PageLayout from "@/components/layout/PageLayout";
import SEO from "@/components/SEO";
import CTABanner from "@/components/sections/CTABanner";
import { SITE } from "@/lib/config";

export default function WasatchCounty() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "UBC Unlimited — Wasatch County Merchant Services",
    description: "UBC Unlimited provides credit card processing, POS systems, ACH payments, cash discount programs, and merchant services to businesses throughout Wasatch County, Utah.",
    url: `https://ubcunlimited.com/locations/wasatch-county`,
    telephone: SITE.phone,
    email: SITE.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Heber City",
      addressRegion: "UT",
      addressCountry: "US",
    },
    geo: { "@type": "GeoCoordinates", latitude: 40.5069, longitude: -111.4133 },
    areaServed: { "@type": "AdministrativeArea", name: "Wasatch County, Utah" },
    openingHoursSpecification: [{ "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday"], opens: "08:00", closes: "18:00" }],
    priceRange: "$$",
  };

  const cities = ["Heber City", "Midway", "Daniel", "Charleston", "Wallsburg", "Timber Lakes", "Center Creek", "Soldier Hollow", "Deer Creek", "Strawberry Valley"];
  const industries = ["Restaurants", "Retail", "Hotels", "Outdoor Recreation", "Professional Services", "Agricultural Services"];

  return (
    <PageLayout>
      <SEO
        title="Merchant Services Wasatch County, Utah"
        description="UBC Unlimited provides credit card processing, POS systems, and merchant services to businesses throughout Wasatch County, Utah. Local support, no contracts*, statement review."
        canonical="/locations/wasatch-county"
        schema={schema}
      />

      {/* Hero */}
      <section className="relative bg-[#080808] overflow-hidden pt-24 pb-20">
        <div className="absolute inset-0 bg-gradient-to-br from-[#c9a84c]/8 via-transparent to-transparent pointer-events-none" />
        <div className="container relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <nav aria-label="Breadcrumb" className="flex items-center justify-center gap-1.5 text-xs text-white/60 mb-5">
                <Link href="/" className="hover:text-white/60 transition-colors">Home</Link>
                <ChevronRight size={12} />
                <Link href="/locations" className="hover:text-white/60 transition-colors">Locations</Link>
                <ChevronRight size={12} />
                <span className="text-white/60">Wasatch County</span>
              </nav>
              <span className="inline-flex items-center gap-2 bg-[#c9a84c]/12 border border-[#c9a84c]/25 text-[#c9a84c] text-xs font-semibold px-4 py-1.5 rounded-full mb-5">
                <MapPin size={12} /> Wasatch County, Utah
              </span>
              <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-5 leading-tight">
                Merchant Services<br /><span className="text-[#c9a84c]">Wasatch County</span>
              </h1>
              <p className="text-white/60 text-lg leading-relaxed mb-4">Wasatch County is a growing mountain community anchored by Heber City and Midway, with a booming outdoor recreation economy, proximity to Park City, and a diverse local business community.</p>
              <p className="text-white/70 text-base leading-relaxed mb-8">UBC Unlimited serves every city and community in Wasatch County with credit card processing, POS systems, cash discount programs, and merchant accounts — backed by local Utah support that national processors can't match.</p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link href="/contact" className="btn-gold text-sm py-3 px-7 justify-center">Request a Quote</Link>
                <Link href="/statement-review" className="btn-outline-gold text-sm py-3 px-7 justify-center">Statement Review</Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Cities Served */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-[#080808] mb-3">Cities & Communities We Serve in Wasatch County</h2>
            <p className="text-gray-600 text-base mb-8">UBC Unlimited provides on-site consultations and local support to businesses throughout Wasatch County, including the following communities:</p>
            <div className="flex flex-wrap justify-center gap-2.5">
              <span className="inline-flex items-center gap-1.5 bg-white border border-gray-200 text-[#080808] text-sm font-medium px-4 py-2 rounded-full shadow-sm"><MapPin size={12} className="text-[#c9a84c]" />Heber City</span>
              <span className="inline-flex items-center gap-1.5 bg-white border border-gray-200 text-[#080808] text-sm font-medium px-4 py-2 rounded-full shadow-sm"><MapPin size={12} className="text-[#c9a84c]" />Midway</span>
              <span className="inline-flex items-center gap-1.5 bg-white border border-gray-200 text-[#080808] text-sm font-medium px-4 py-2 rounded-full shadow-sm"><MapPin size={12} className="text-[#c9a84c]" />Daniel</span>
              <span className="inline-flex items-center gap-1.5 bg-white border border-gray-200 text-[#080808] text-sm font-medium px-4 py-2 rounded-full shadow-sm"><MapPin size={12} className="text-[#c9a84c]" />Charleston</span>
              <span className="inline-flex items-center gap-1.5 bg-white border border-gray-200 text-[#080808] text-sm font-medium px-4 py-2 rounded-full shadow-sm"><MapPin size={12} className="text-[#c9a84c]" />Wallsburg</span>
              <span className="inline-flex items-center gap-1.5 bg-white border border-gray-200 text-[#080808] text-sm font-medium px-4 py-2 rounded-full shadow-sm"><MapPin size={12} className="text-[#c9a84c]" />Timber Lakes</span>
              <span className="inline-flex items-center gap-1.5 bg-white border border-gray-200 text-[#080808] text-sm font-medium px-4 py-2 rounded-full shadow-sm"><MapPin size={12} className="text-[#c9a84c]" />Center Creek</span>
              <span className="inline-flex items-center gap-1.5 bg-white border border-gray-200 text-[#080808] text-sm font-medium px-4 py-2 rounded-full shadow-sm"><MapPin size={12} className="text-[#c9a84c]" />Soldier Hollow</span>
              <span className="inline-flex items-center gap-1.5 bg-white border border-gray-200 text-[#080808] text-sm font-medium px-4 py-2 rounded-full shadow-sm"><MapPin size={12} className="text-[#c9a84c]" />Deer Creek</span>
              <span className="inline-flex items-center gap-1.5 bg-white border border-gray-200 text-[#080808] text-sm font-medium px-4 py-2 rounded-full shadow-sm"><MapPin size={12} className="text-[#c9a84c]" />Strawberry Valley</span>
            </div>
          </div>
        </div>
      </section>

      {/* Industries */}
      <section className="py-20 bg-[#f8fafc]">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#080808] mb-3">Industries We Serve in Wasatch County</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-base">UBC Unlimited serves every major industry in Wasatch County with tailored payment solutions and local support.</p>
          </div>
          <div className="flex flex-wrap justify-center gap-2.5">
              <span className="inline-flex items-center gap-1.5 bg-white border border-gray-200 text-[#080808] text-sm font-medium px-4 py-2 rounded-full shadow-sm"><Building2 size={12} className="text-[#c9a84c]" />Restaurants</span>
              <span className="inline-flex items-center gap-1.5 bg-white border border-gray-200 text-[#080808] text-sm font-medium px-4 py-2 rounded-full shadow-sm"><Building2 size={12} className="text-[#c9a84c]" />Retail</span>
              <span className="inline-flex items-center gap-1.5 bg-white border border-gray-200 text-[#080808] text-sm font-medium px-4 py-2 rounded-full shadow-sm"><Building2 size={12} className="text-[#c9a84c]" />Hotels</span>
              <span className="inline-flex items-center gap-1.5 bg-white border border-gray-200 text-[#080808] text-sm font-medium px-4 py-2 rounded-full shadow-sm"><Building2 size={12} className="text-[#c9a84c]" />Outdoor Recreation</span>
              <span className="inline-flex items-center gap-1.5 bg-white border border-gray-200 text-[#080808] text-sm font-medium px-4 py-2 rounded-full shadow-sm"><Building2 size={12} className="text-[#c9a84c]" />Professional Services</span>
              <span className="inline-flex items-center gap-1.5 bg-white border border-gray-200 text-[#080808] text-sm font-medium px-4 py-2 rounded-full shadow-sm"><Building2 size={12} className="text-[#c9a84c]" />Agricultural Services</span>
          </div>
        </div>
      </section>

      {/* Why Choose UBC */}
      <section className="py-20 bg-[#080808]">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">Why Wasatch County Businesses Choose UBC Unlimited</h2>
            <p className="text-white/70 max-w-2xl mx-auto text-base">Local support, transparent pricing, and payment solutions built for Utah businesses.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { icon: MapPin, title: "Truly Local — Utah Based", desc: "We're not a national call center. UBC Unlimited serves Wasatch County businesses with a local rep who knows the Utah market." },
              { icon: TrendingDown, title: "Lower Rates Than National Processors", desc: "Most Wasatch County businesses overpay Stripe, Square, or their bank. Our statement review shows you exactly where you can save." },
              { icon: Clock, title: "Approved & Processing in 24–48 Hours", desc: "Most Wasatch County businesses are live and processing within one to two business days. We handle setup, equipment, and training." },
              { icon: ShieldCheck, title: "No Contracts*, No Rate Increases", desc: "Month-to-month agreements only. Your rate is your rate — we never raise fees after you sign up." },
              { icon: Users, title: "Dedicated Local Account Rep", desc: "You get a direct line to a real person who knows your account. Not a ticket queue. Not a chatbot." },
              { icon: DollarSign, title: "Cash Discount & Dual Pricing Available", desc: "Eliminate processing fees entirely with our cash discount program — popular with Wasatch County restaurants, retail, and service businesses." },
            ].map((benefit, i) => (
              <motion.div key={benefit.title} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.07 }} className="bg-white/4 border border-white/8 rounded-2xl p-6">
                <div className="w-10 h-10 rounded-xl bg-[#c9a84c]/12 flex items-center justify-center mb-4">
                  <benefit.icon size={20} className="text-[#c9a84c]" />
                </div>
                <h3 className="text-white font-bold text-base mb-2">{benefit.title}</h3>
                <p className="text-white/70 text-sm leading-relaxed">{benefit.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
          <p className="text-white/70 text-xs mt-6">* Certain platforms and equipment programs may require a contract. This will be clearly disclosed prior to entering any agreement.</p>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-white">
        <div className="container max-w-3xl">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-[#080808] mb-2">Frequently Asked Questions — Wasatch County</h2>
            <p className="text-gray-600 text-base">Common questions from Wasatch County business owners about merchant services.</p>
          </div>
          <div className="space-y-3">
            {[
              { q: "Does UBC Unlimited serve businesses in Wasatch County?", a: "Yes — UBC Unlimited serves businesses throughout Wasatch County, including Heber City and all surrounding communities. We offer on-site consultations and local support." },
              { q: "How much does merchant services cost for a Wasatch County business?", a: "Rates are tailored to your card mix and volume. Most Wasatch County businesses qualify for interchange-plus pricing ranging from interchange + 0.10% to 0.50% — significantly lower than Stripe (2.9% + $0.30) or Square (2.6%–3.5%). We offer a statement review to show your exact savings." },
              { q: "What POS systems do you offer for Wasatch County businesses?", a: "We offer SkyTab (ideal for restaurants and bars), Clover (popular with retail and professional services), and several other systems. We handle delivery, setup, and training — typically within 24–48 hours of approval." },
              { q: "Do you offer a cash discount program for Wasatch County businesses?", a: "Yes. Utah law permits cash discount programs, which allow businesses to pass the processing fee to card-paying customers. This effectively eliminates your processing costs. We handle the full setup and compliance documentation." },
              { q: "How quickly can a Wasatch County business get approved and start processing?", a: "Most Wasatch County businesses are approved and live within 24–48 hours. We handle the setup, equipment, and training so you can focus on running your business." },
            ].map((faq, i) => (
              <details key={i} className="bg-[#f8fafc] border border-gray-100 rounded-xl overflow-hidden group">
                <summary className="flex items-center justify-between gap-3 px-5 py-4 cursor-pointer text-[#080808] font-semibold text-sm list-none select-none hover:bg-gray-50 transition-colors">
                  {faq.q}<ChevronRight size={16} className="text-[#c9a84c] shrink-0 transition-transform group-open:rotate-90" />
                </summary>
                <div className="px-5 pb-4 text-gray-600 text-sm leading-relaxed border-t border-gray-100 pt-3">{faq.a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      <CTABanner
        title="Ready to Lower Your Processing Costs in Wasatch County?"
        subtitle="Get a statement review and see exactly how much your Wasatch County business can save. Most businesses find meaningful savings on their processing costs after a statement review."
        primaryLabel="Request a Quote"
        primaryHref="/contact"
        secondaryLabel="Statement Review"
        secondaryHref="/statement-review"
      />
    </PageLayout>
  );
}

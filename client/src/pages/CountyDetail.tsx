import { Link, useParams } from "wouter";
import { motion } from "framer-motion";
import { MapPin, ArrowRight, CheckCircle, Phone, Building2, Users, TrendingDown, Clock, ChevronRight, Star } from "lucide-react";
import PageLayout from "@/components/layout/PageLayout";
import { getCounty, FEATURED_COUNTIES } from "@/lib/utahLocations";
import { SITE } from "@/lib/config";
import SEO from "@/components/SEO";

const HOW_IT_WORKS = [
  { step: "01", title: "Free Statement Review", desc: "Submit your current processing statement. We analyze every line and show you exactly where you're overpaying — no obligation." },
  { step: "02", title: "Custom Local Proposal", desc: "Our Utah-based team builds a tailored solution with transparent, competitive pricing that fits your business type and volume." },
  { step: "03", title: "Seamless Setup", desc: "We handle everything — equipment, software integration, and staff training. Most businesses are live within 24–48 hours." },
];

const SOLUTIONS = [
  { href: "/solutions/credit-card-processing", label: "Credit Card Processing", desc: "Competitive rates with transparent pricing and no hidden fees." },
  { href: "/solutions/pos-systems", label: "POS Systems", desc: "SkyTab and other industry-leading POS solutions, fully configured." },
  { href: "/solutions/dual-pricing", label: "Surcharging & Cash Discount Solutions / Cash Discount", desc: "Eliminate up to 100% of processing fees legally and transparently." },
  { href: "/solutions/high-risk-processing", label: "High-Risk Processing", desc: "Approved accounts for industries other processors decline." },
];

export default function CountyDetail() {
  const { slug } = useParams<{ slug: string }>();
  const county = getCounty(slug || "");

  if (!county || !county.featured) {
    // Non-featured county — redirect to counties index
    return (
      <PageLayout>
        <SEO
          title={`Merchant Services in ${county?.name || "Your County"} | UBC Unlimited`}
          description={`UBC Unlimited provides merchant services and payment processing throughout all of Utah, including ${county?.name || "your county"}. Contact us for a free consultation.`}
        />
        <section className="relative min-h-[60vh] flex items-center bg-[#080808] overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#c9a84c]/5 to-transparent" />
          <div className="container relative z-10 py-20 text-center">
            <div className="inline-flex items-center gap-2 bg-[#c9a84c]/10 border border-[#c9a84c]/30 text-[#c9a84c] text-xs font-semibold uppercase tracking-widest px-4 py-2 rounded-full mb-6">
              <MapPin size={12} /> {county?.name || "Your County"}, Utah
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4" style={{ fontFamily: "DM Serif Display, Georgia, serif" }}>
              We Serve All of Utah —<br />
              <span className="text-[#c9a84c]">Including {county?.name || "Your County"}</span>
            </h1>
            <p className="text-white/65 text-lg max-w-2xl mx-auto mb-8">
              UBC Unlimited provides merchant services, POS systems, and payment processing to businesses throughout every county in Utah. Our local team is ready to help your business save on processing costs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/consultation" className="btn-gold py-3 px-8">
                Request a Consultation <ArrowRight size={16} />
              </Link>
              <a href={SITE.phoneHref} className="btn-outline-white py-3 px-8">
                <Phone size={15} /> Call {SITE.phone}
              </a>
            </div>
            <div className="mt-12">
              <Link href="/counties" className="text-[#c9a84c] hover:text-[#e2c97e] text-sm flex items-center justify-center gap-1">
                <ChevronRight size={14} /> View all featured Utah counties
              </Link>
            </div>
          </div>
        </section>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <SEO
        title={`Merchant Services in ${county.name} | UBC Unlimited`}
        description={`UBC Unlimited provides merchant services, POS systems, and payment processing to businesses in ${county.name}, Utah. Local support, competitive rates, fast setup.`}
        canonical={`/locations/${county.slug}`}
        schema={[
          {
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "UBC Unlimited",
            "url": "https://ubcunlimited.com",
            "telephone": "+18014576500",
            "description": `UBC Unlimited provides merchant services, POS systems, and payment processing to businesses in ${county.name}, Utah.`,
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Salt Lake City",
              "addressRegion": "UT",
              "postalCode": "84101",
              "addressCountry": "US"
            },
            "areaServed": [
              { "@type": "AdministrativeArea", "name": `${county.name}, Utah` },
              { "@type": "State", "name": "Utah" }
            ],
            "sameAs": ["https://ubcunlimited.com"]
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://ubcunlimited.com" },
              { "@type": "ListItem", "position": 2, "name": "Locations", "item": "https://ubcunlimited.com/locations" },
              { "@type": "ListItem", "position": 3, "name": `${county.name}`, "item": `https://ubcunlimited.com/locations/${county.slug}` }
            ]
          }
        ]}
      />

      {/* Hero */}
      <section className="relative bg-[#080808] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#c9a84c]/8 via-transparent to-transparent" />
        <div className="container relative z-10 py-16 md:py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <div className="inline-flex items-center gap-2 bg-[#c9a84c]/10 border border-[#c9a84c]/30 text-[#c9a84c] text-xs font-semibold uppercase tracking-widest px-4 py-2 rounded-full mb-5">
                <MapPin size={12} /> {county.name}, Utah
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-4 leading-tight" style={{ fontFamily: "DM Serif Display, Georgia, serif" }}>
                {county.tagline}
              </h1>
              <p className="text-white/65 text-base md:text-lg mb-6 leading-relaxed">{county.description}</p>
              <div className="flex flex-col sm:flex-row gap-3 mb-6">
                <Link href="/consultation" className="btn-gold text-sm py-2.5 px-6 justify-center">
                  Request a Consultation <ArrowRight size={15} />
                </Link>
                <a href={SITE.phoneHref} className="btn-outline-white text-sm py-2.5 px-6 justify-center">
                  <Phone size={14} /> {SITE.phone}
                </a>
              </div>
              <div className="flex flex-wrap gap-3">
                {county.keyIndustries.map((ind) => (
                  <span key={ind} className="flex items-center gap-1.5 text-xs text-white/55 bg-white/5 border border-white/10 px-3 py-1.5 rounded-full">
                    <CheckCircle size={11} className="text-[#c9a84c]" /> {ind}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Right — stats card */}
            <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.15 }}>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8">
                <div className="grid grid-cols-2 gap-4 mb-6">
                  {county.stats.map((s) => (
                    <div key={s.label} className="bg-[#080808] border border-white/10 rounded-xl p-4 text-center">
                      <div className="text-2xl font-extrabold text-[#c9a84c] mb-1" style={{ fontFamily: "DM Serif Display, Georgia, serif" }}>{s.value}</div>
                      <div className="text-white/50 text-xs leading-tight">{s.label}</div>
                    </div>
                  ))}
                </div>
                <div className="border-t border-white/10 pt-5">
                  <p className="text-white/50 text-xs mb-3 uppercase tracking-widest font-semibold">Cities We Serve in {county.name}</p>
                  <div className="flex flex-wrap gap-2">
                    {county.cities.map((city) => (
                      <span key={city} className="text-xs text-white/65 bg-white/5 px-2.5 py-1 rounded-md border border-white/10">
                        {city}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <div className="bg-[#c9a84c]/10 border-y border-[#c9a84c]/20">
        <div className="container py-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            {[
              { icon: TrendingDown, label: "Avg Processing Savings", value: "Up to 40%" },
              { icon: Clock, label: "Typical Setup Time", value: "24–48 Hours" },
              { icon: Users, label: "Utah Businesses Served", value: "1,000+" },
              { icon: Star, label: "Years of Local Experience", value: `${SITE.yearsInBusiness}+` },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex flex-col items-center gap-1">
                <Icon size={16} className="text-[#c9a84c]" />
                <div className="text-lg font-extrabold text-white" style={{ fontFamily: "DM Serif Display, Georgia, serif" }}>{value}</div>
                <div className="text-white/50 text-xs">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Solutions */}
      <section className="bg-[#080808] py-16">
        <div className="container">
          <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-2" style={{ fontFamily: "DM Serif Display, Georgia, serif" }}>
            Solutions for {county.name} Businesses
          </h2>
          <p className="text-white/55 mb-8 max-w-2xl">
            From credit card processing to full POS systems, we tailor every solution to your industry and business size — with transparent pricing and no long-term contracts.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {SOLUTIONS.map((sol) => (
              <Link key={sol.href} href={sol.href} className="group bg-white/5 hover:bg-[#c9a84c]/10 border border-white/10 hover:border-[#c9a84c]/30 rounded-xl p-5 transition-all">
                <div className="text-white font-semibold text-sm mb-2 group-hover:text-[#c9a84c] transition-colors">{sol.label}</div>
                <div className="text-white/50 text-xs leading-relaxed">{sol.desc}</div>
                <div className="mt-3 flex items-center gap-1 text-[#c9a84c] text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                  Learn more <ArrowRight size={11} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-[#111] py-16 border-y border-white/5">
        <div className="container">
          <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-2 text-center" style={{ fontFamily: "DM Serif Display, Georgia, serif" }}>
            How It Works
          </h2>
          <p className="text-white/50 text-center mb-10 max-w-xl mx-auto">Getting started with UBC Unlimited is simple. Most {county.name} businesses are approved and processing within 24–48 hours.</p>
          <div className="grid md:grid-cols-3 gap-6">
            {HOW_IT_WORKS.map((step) => (
              <div key={step.step} className="relative bg-white/5 border border-white/10 rounded-2xl p-6">
                <div className="text-4xl font-extrabold text-[#c9a84c]/20 mb-3" style={{ fontFamily: "DM Serif Display, Georgia, serif" }}>{step.step}</div>
                <h3 className="text-white font-bold text-base mb-2">{step.title}</h3>
                <p className="text-white/55 text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why UBC */}
      <section className="bg-[#080808] py-16">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-4" style={{ fontFamily: "DM Serif Display, Georgia, serif" }}>
                Why {county.name} Businesses Choose UBC Unlimited
              </h2>
              <div className="space-y-3 mb-6">
                {[
                  "Local Utah team — not a call center",
                  "Industry-specific solutions, not one-size-fits-all",
                  "Transparent pricing with no hidden fees",
                  "Fast approval — most businesses live in 24–48 hours",
                  "Dedicated account rep who knows your business",
                  "Free statement review — see your savings before you commit",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <CheckCircle size={16} className="text-[#c9a84c] mt-0.5 shrink-0" />
                    <span className="text-white/75 text-sm">{item}</span>
                  </div>
                ))}
              </div>
              <Link href="/consultation" className="btn-gold text-sm py-2.5 px-6 inline-flex">
                Get a Free Statement Review <ArrowRight size={15} />
              </Link>
            </div>
            <div className="bg-[#c9a84c]/5 border border-[#c9a84c]/20 rounded-2xl p-8">
              <blockquote className="text-white/80 text-base italic leading-relaxed mb-4">
                "UBC Unlimited saved our restaurant over $400 a month in processing fees. Their team came out, reviewed our statement, and had us set up on a better system within two days. The local support is night and day compared to our old processor."
              </blockquote>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#c9a84c]/20 flex items-center justify-center">
                  <Building2 size={18} className="text-[#c9a84c]" />
                </div>
                <div>
                  <div className="text-white font-semibold text-sm">Utah Restaurant Owner</div>
                  <div className="text-white/40 text-xs">{county.name}, Utah</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Other featured counties */}
      <section className="bg-[#111] py-12 border-t border-white/5">
        <div className="container">
          <h2 className="text-lg font-bold text-white mb-6">Other Featured Utah Counties</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {FEATURED_COUNTIES.filter((c) => c.slug !== county.slug).map((c) => (
              <Link key={c.slug} href={`/counties/${c.slug}`} className="group flex items-center gap-2 bg-white/5 hover:bg-[#c9a84c]/10 border border-white/10 hover:border-[#c9a84c]/30 rounded-xl px-4 py-3 transition-all text-sm text-white/70 hover:text-white">
                <MapPin size={13} className="text-[#c9a84c] shrink-0" /> {c.name}
              </Link>
            ))}
          </div>
          <div className="mt-4">
            <Link href="/counties" className="text-[#c9a84c] hover:text-[#e2c97e] text-sm flex items-center gap-1">
              View all Utah counties <ArrowRight size={13} />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#c9a84c] py-14">
        <div className="container text-center">
          <h2 className="text-2xl md:text-3xl font-extrabold text-[#080808] mb-3" style={{ fontFamily: "DM Serif Display, Georgia, serif" }}>
            Ready to Save on Payment Processing in {county.name}?
          </h2>
          <p className="text-[#080808]/70 mb-6 max-w-xl mx-auto">
            Submit your current statement for a free review, or call us directly. Our local Utah team typically responds within one business hour.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/consultation" className="bg-[#080808] text-white font-bold py-3 px-8 rounded-xl hover:bg-[#111] transition-colors inline-flex items-center gap-2">
              Request a Consultation <ArrowRight size={16} />
            </Link>
            <a href={SITE.phoneHref} className="bg-white/20 hover:bg-white/30 text-[#080808] font-bold py-3 px-8 rounded-xl transition-colors inline-flex items-center gap-2">
              <Phone size={15} /> {SITE.phone}
            </a>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}

import { useState } from "react";
import { Link, useParams } from "wouter";
import { motion } from "framer-motion";
import { MapPin, ArrowRight, CheckCircle, Phone, Building2, Users, TrendingDown, Clock, Star } from "lucide-react";
import PageLayout from "@/components/layout/PageLayout";
import { getCity, FEATURED_CITIES, getCounty } from "@/lib/utahLocations";
import { SITE } from "@/lib/config";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import SEO from "@/components/SEO";

const HOW_IT_WORKS = [
  { step: "01", title: "Free Statement Review", desc: "Submit your current processing statement. We analyze every line and show you exactly where you're overpaying — no obligation." },
  { step: "02", title: "Custom Local Proposal", desc: "Our Utah-based team builds a tailored solution with transparent, competitive pricing that fits your business type and volume." },
  { step: "03", title: "Seamless Setup", desc: "We handle everything — equipment, software integration, and staff training. Most businesses are live within 24–48 hours." },
];

const SOLUTIONS = [
  { href: "/solutions/credit-card-processing", label: "Credit Card Processing", desc: "Competitive rates with transparent pricing and no hidden fees." },
  { href: "/solutions/pos-systems", label: "POS Systems", desc: "SkyTab and other industry-leading POS solutions, fully configured." },
  { href: "/solutions/surcharge-cash-discount", label: "Surcharge & Cash Discount Solutions", desc: "Eliminate up to 100% of processing fees legally and transparently." },
  { href: "/solutions/high-risk-processing", label: "High-Risk Processing", desc: "Approved accounts for industries other processors decline." },
];

export default function CityDetail() {
  const { slug } = useParams<{ slug: string }>();
  const city = getCity(slug || "");
  const county = city ? getCounty(city.county) : undefined;

  if (!city || !city.featured) {
    // Non-featured city — show "we serve all of Utah" page with form
    const cityName = city?.name || "Your City";
    return (
      <PageLayout>
        <SEO
          title={`Merchant Services in ${cityName}, Utah | UBC Unlimited`}
          description={`UBC Unlimited provides merchant services and payment processing throughout all of Utah, including ${cityName}. Contact us for a consultation.`}
        />
        <section className="relative min-h-[60vh] flex items-center bg-[#080808] overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#c9a84c]/5 to-transparent" />
          <div className="container relative z-10 py-20 text-center">
            <div className="inline-flex items-center gap-2 bg-[#c9a84c]/10 border border-[#c9a84c]/30 text-[#c9a84c] text-xs font-semibold uppercase tracking-widest px-4 py-2 rounded-full mb-6">
              <MapPin size={12} /> {cityName}, Utah
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4" style={{ fontFamily: "DM Serif Display, Georgia, serif" }}>
              We Serve All of Utah —<br />
              <span className="text-[#c9a84c]">Including {cityName}</span>
            </h1>
            <p className="text-white/65 text-lg max-w-2xl mx-auto mb-8">
              UBC Unlimited provides merchant services, POS systems, and payment processing to businesses throughout every city in Utah. Our local team is ready to help your business save on processing costs — wherever you're located.
            </p>
            {/* Unlisted city form */}
            <div className="max-w-md mx-auto bg-white/5 border border-white/10 rounded-2xl p-6 text-left mb-8">
              <h2 className="text-white font-bold text-lg mb-1">Request a Consultation</h2>
              <p className="text-white/50 text-sm mb-4">Tell us about your business in {cityName} and we'll reach out with a tailored solution.</p>
              <UnlistedCityForm cityName={cityName} />
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href={SITE.phoneHref} className="btn-outline-white py-3 px-8">
                <Phone size={15} /> Call {SITE.phone}
              </a>
              <Link href="/cities" className="text-[#c9a84c] hover:text-[#e2c97e] text-sm flex items-center justify-center gap-1 py-3 px-8">
                View all featured cities <ArrowRight size={13} />
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
        title={`Merchant Services in ${city.name}, Utah | UBC Unlimited`}
        description={`UBC Unlimited provides merchant services, POS systems, and payment processing to businesses in ${city.name}, Utah. Local support, competitive rates, fast setup.`}
        canonical={`/locations/${city.slug}`}
        schema={[
          {
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "UBC Unlimited",
            "url": "https://ubcunlimited.com",
            "telephone": "+18014576500",
            "description": `UBC Unlimited provides merchant services, POS systems, and payment processing to businesses in ${city.name}, Utah.`,
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Salt Lake City",
              "addressRegion": "UT",
              "postalCode": "84101",
              "addressCountry": "US"
            },
            "areaServed": [
              { "@type": "City", "name": `${city.name}, Utah` },
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
              { "@type": "ListItem", "position": 3, "name": `${city.name}`, "item": `https://ubcunlimited.com/locations/${city.slug}` }
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
              <div className="flex items-center gap-2 mb-5 flex-wrap">
                <div className="inline-flex items-center gap-2 bg-[#c9a84c]/10 border border-[#c9a84c]/30 text-[#c9a84c] text-xs font-semibold uppercase tracking-widest px-4 py-2 rounded-full">
                  <MapPin size={12} /> {city.name}, Utah
                </div>
                {county && (
                  <Link href={`/counties/${county.slug}`} className="inline-flex items-center gap-1 text-white/40 hover:text-white/70 text-xs transition-colors">
                    {county.name} <ArrowRight size={10} />
                  </Link>
                )}
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-4 leading-tight" style={{ fontFamily: "DM Serif Display, Georgia, serif" }}>
                {city.tagline}
              </h1>
              <p className="text-white/65 text-base md:text-lg mb-6 leading-relaxed">{city.description}</p>
              <div className="flex flex-col sm:flex-row gap-3 mb-6">
                <Link href="/consultation" className="btn-gold text-sm py-2.5 px-6 justify-center">
                  Request a Consultation <ArrowRight size={15} />
                </Link>
                <a href={SITE.phoneHref} className="btn-outline-white text-sm py-2.5 px-6 justify-center">
                  <Phone size={14} /> {SITE.phone}
                </a>
              </div>
              <div className="flex flex-wrap gap-3">
                {city.keyIndustries.map((ind) => (
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
                  {[
                    { label: "Population", value: city.population.toLocaleString() },
                    { label: "Avg Savings", value: "Up to 40%" },
                    { label: "Setup Time", value: "24–48 hrs" },
                    { label: "Local Support", value: "Utah-Based" },
                  ].map((s) => (
                    <div key={s.label} className="bg-[#080808] border border-white/10 rounded-xl p-4 text-center">
                      <div className="text-xl font-extrabold text-[#c9a84c] mb-1" style={{ fontFamily: "DM Serif Display, Georgia, serif" }}>{s.value}</div>
                      <div className="text-white/50 text-xs leading-tight">{s.label}</div>
                    </div>
                  ))}
                </div>
                {county && (
                  <div className="border-t border-white/10 pt-5">
                    <p className="text-white/50 text-xs mb-2 uppercase tracking-widest font-semibold">Part of</p>
                    <Link href={`/counties/${county.slug}`} className="flex items-center gap-2 text-white/70 hover:text-[#c9a84c] transition-colors text-sm font-medium">
                      <MapPin size={13} className="text-[#c9a84c]" /> {county.name}
                      <ArrowRight size={12} className="ml-auto" />
                    </Link>
                  </div>
                )}
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
            Solutions for {city.name} Businesses
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
          <p className="text-white/50 text-center mb-10 max-w-xl mx-auto">
            Getting started with UBC Unlimited is simple. Most {city.name} businesses are approved and processing within 24–48 hours.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {HOW_IT_WORKS.map((step) => (
              <div key={step.step} className="bg-white/5 border border-white/10 rounded-2xl p-6">
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
                Why {city.name} Businesses Choose UBC Unlimited
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
                "UBC Unlimited saved our business over $400 a month in processing fees. Their team came out, reviewed our statement, and had us set up on a better system within two days. The local support is night and day compared to our old processor."
              </blockquote>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#c9a84c]/20 flex items-center justify-center">
                  <Building2 size={18} className="text-[#c9a84c]" />
                </div>
                <div>
                  <div className="text-white font-semibold text-sm">Utah Business Owner</div>
                  <div className="text-white/40 text-xs">{city.name}, Utah</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Other featured cities */}
      <section className="bg-[#111] py-12 border-t border-white/5">
        <div className="container">
          <h2 className="text-lg font-bold text-white mb-6">Other Cities We Serve</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {FEATURED_CITIES.filter((c) => c.slug !== city.slug).slice(0, 8).map((c) => (
              <Link key={c.slug} href={`/cities/${c.slug}`} className="group flex items-center gap-2 bg-white/5 hover:bg-[#c9a84c]/10 border border-white/10 hover:border-[#c9a84c]/30 rounded-xl px-4 py-3 transition-all text-sm text-white/70 hover:text-white">
                <MapPin size={13} className="text-[#c9a84c] shrink-0" /> {c.name}
              </Link>
            ))}
          </div>
          <div className="mt-4">
            <Link href="/cities" className="text-[#c9a84c] hover:text-[#e2c97e] text-sm flex items-center gap-1">
              View all featured Utah cities <ArrowRight size={13} />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#c9a84c] py-14">
        <div className="container text-center">
          <h2 className="text-2xl md:text-3xl font-extrabold text-[#080808] mb-3" style={{ fontFamily: "DM Serif Display, Georgia, serif" }}>
            Ready to Save on Payment Processing in {city.name}?
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

// ─── Unlisted city form component ────────────────────────────────────────────

function UnlistedCityForm({ cityName }: { cityName: string }) {
  const [form, setForm] = useState({ name: "", phone: "", email: "", businessType: "", city: cityName });
  const [submitted, setSubmitted] = useState(false);

  const submit = trpc.forms.submitHeroLead.useMutation({
    onSuccess: () => {
      setSubmitted(true);
      toast.success("Request received! We'll reach out within one business hour.");
    },
    onError: () => {
      toast.error("Something went wrong. Please call us directly at " + SITE.phone);
    },
  });

  // Keep city in sync if cityName prop changes (e.g. navigation)
  const cityDisplay = form.city || cityName;

  if (submitted) {
    return (
      <div className="text-center py-6">
        <CheckCircle size={32} className="text-[#c9a84c] mx-auto mb-3" />
        <div className="text-white font-bold text-base mb-1">Request Received!</div>
        <div className="text-white/55 text-sm">Our team will reach out within one business hour.</div>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        submit.mutate({ name: form.name, phone: form.phone, businessType: `${form.businessType || "Not specified"} — ${cityDisplay}, Utah` });
      }}
      className="space-y-3"
    >
      {/* Pre-filled city field */}
      <div className="w-full bg-[#c9a84c]/10 border border-[#c9a84c]/30 rounded-xl px-4 py-3 text-sm flex items-center gap-2">
        <MapPin size={13} className="text-[#c9a84c] shrink-0" />
        <span className="text-[#c9a84c] font-semibold">{cityDisplay}, Utah</span>
        <span className="text-white/40 text-xs ml-auto">Pre-filled</span>
      </div>
      <input
        type="text"
        required
        placeholder="Your Name"
        value={form.name}
        onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
        className="w-full bg-white/8 border border-white/15 rounded-xl px-4 py-3 text-sm text-white placeholder-white/35 focus:outline-none focus:border-[#c9a84c]/60 transition-colors"
      />
      <input
        type="tel"
        required
        placeholder="Phone Number"
        value={form.phone}
        onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
        className="w-full bg-white/8 border border-white/15 rounded-xl px-4 py-3 text-sm text-white placeholder-white/35 focus:outline-none focus:border-[#c9a84c]/60 transition-colors"
      />
      <input
        type="email"
        placeholder="Email (optional)"
        value={form.email}
        onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
        className="w-full bg-white/8 border border-white/15 rounded-xl px-4 py-3 text-sm text-white placeholder-white/35 focus:outline-none focus:border-[#c9a84c]/60 transition-colors"
      />
      <input
        type="text"
        placeholder="Business Type (e.g. Restaurant, Retail)"
        value={form.businessType}
        onChange={(e) => setForm((f) => ({ ...f, businessType: e.target.value }))}
        className="w-full bg-white/8 border border-white/15 rounded-xl px-4 py-3 text-sm text-white placeholder-white/35 focus:outline-none focus:border-[#c9a84c]/60 transition-colors"
      />
      <button
        type="submit"
        disabled={submit.isPending}
        className="w-full bg-[#c9a84c] hover:bg-[#e2c97e] text-[#080808] font-bold py-3 rounded-xl transition-colors text-sm flex items-center justify-center gap-2 disabled:opacity-60"
      >
        {submit.isPending ? "Sending..." : <>Request a Consultation <ArrowRight size={14} /></>}
      </button>
    </form>
  );
}

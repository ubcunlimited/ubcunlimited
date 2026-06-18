import { Link, useParams } from "wouter";
import { motion } from "framer-motion";
import { MapPin, ArrowRight, CheckCircle, Phone, Building2, Users, TrendingDown, Clock, ChevronRight, Star } from "lucide-react";
import PageLayout from "@/components/layout/PageLayout";
import { getCounty, FEATURED_COUNTIES } from "@/lib/utahLocations";
import { SITE } from "@/lib/config";
import SEO from "@/components/SEO";

// ─── Unique county meta description generator ─────────────────────────────────
// 4 rotating sentence templates using county seat + key industries
// so each county page has a structurally distinct description.
const COUNTY_INDUSTRY_MAP: Record<string, [string, string, string]> = {
  'salt-lake': ['Salt Lake City', 'restaurants', 'retail'],
  'utah': ['Provo', 'technology', 'restaurants'],
  'davis': ['Farmington', 'retail', 'restaurants'],
  'weber': ['Ogden', 'restaurants', 'outdoor retail'],
  'washington': ['St. George', 'tourism', 'restaurants'],
  'cache': ['Logan', 'restaurants', 'retail'],
  'tooele': ['Tooele', 'retail', 'restaurants'],
  'summit': ['Coalville', 'hospitality', 'restaurants'],
  'box-elder': ['Brigham City', 'agriculture', 'retail'],
  'uintah': ['Vernal', 'oil and gas', 'tourism'],
  'sevier': ['Richfield', 'agriculture', 'restaurants'],
  'duchesne': ['Duchesne', 'energy', 'ranching'],
  'carbon': ['Price', 'energy', 'tourism'],
  'millard': ['Fillmore', 'agriculture', 'manufacturing'],
  'emery': ['Castle Dale', 'energy', 'agriculture'],
  'kane': ['Kanab', 'tourism', 'hospitality'],
  'beaver': ['Beaver', 'agriculture', 'mining'],
  'grand': ['Moab', 'tourism', 'outdoor recreation'],
  'san-juan': ['Monticello', 'tourism', 'agriculture'],
  'garfield': ['Panguitch', 'tourism', 'agriculture'],
  'wayne': ['Loa', 'tourism', 'agriculture'],
  'piute': ['Junction', 'agriculture', 'tourism'],
  'rich': ['Randolph', 'agriculture', 'tourism'],
  'morgan': ['Morgan', 'agriculture', 'retail'],
  'wasatch': ['Heber City', 'tourism', 'real estate'],
  'juab': ['Nephi', 'agriculture', 'mining'],
  'daggett': ['Manila', 'tourism', 'agriculture'],
  'iron': ['Parowan', 'tourism', 'retail'],
  'sanpete': ['Manti', 'agriculture', 'tourism'],
};
function countyMetaDescription(countyName: string, countySlug: string): string {
  const [seat, ind1, ind2] = COUNTY_INDUSTRY_MAP[countySlug] ?? ['Utah', 'retail', 'restaurants'];
  const hash = countySlug.split('').reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
  const t = hash % 4;
  if (t === 0) return `Merchant services in ${countyName}, Utah. Credit card processing, POS & cash discount for ${ind1} & ${ind2} businesses. Local support near ${seat}.`;
  if (t === 1) return `UBC Unlimited serves ${countyName} businesses near ${seat}. SkyTab POS, dual pricing & ACH for ${ind1} & ${ind2} industries. Free statement review.`;
  if (t === 2) return `Credit card processing & POS for ${countyName}. Serving ${seat} & surrounding Utah communities — ${ind1}, ${ind2} & more. Competitive rates.`;
  return `Payment processing for ${countyName}'s ${ind1} & ${ind2} businesses. Merchant services near ${seat} — competitive rates, fast setup, local Utah team.`;
}

const HOW_IT_WORKS = [
  { step: "01", title: "Free Statement Review", desc: "Submit your current processing statement. We analyze every line and show you exactly where you're overpaying — no obligation." },
  { step: "02", title: "Custom Local Proposal", desc: "Our Utah-based team builds a tailored solution with transparent, competitive pricing that fits your business type and volume." },
  { step: "03", title: "Seamless Setup", desc: "We handle everything — equipment, software integration, and staff training. Most accounts are active within 24–48 hours. POS system installations typically require a 14-day lead time from approval." },
];

const SOLUTIONS = [
  { href: "/solutions/credit-card-processing", label: "Credit Card Processing", desc: "Competitive rates with transparent pricing and no hidden fees." },
  { href: "/solutions/pos-systems", label: "POS Systems", desc: "SkyTab and other industry-leading POS solutions, fully configured." },
  { href: "/solutions/surcharge-cash-discount", label: "Cash Discount & Dual Pricing", desc: "Eliminate up to 100% of processing fees legally and transparently." },
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
          description={countyMetaDescription(county?.name ?? 'Your County', county?.slug ?? 'utah')}
          canonical={county?.slug ? `/counties/${county.slug}` : "/counties"}
        />
        <section className="relative min-h-[60vh] flex items-center bg-[#080808] overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#c9a84c]/5 to-transparent" />
          <div className="container relative z-10 py-20 text-center">
            <div className="inline-flex items-center gap-2 bg-[#c9a84c]/10 border border-[#c9a84c]/30 text-[#c9a84c] text-xs font-semibold uppercase tracking-widest px-4 py-2 rounded-full mb-6">
              <MapPin size={12} /> {county?.name || "Your County"}, Utah
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4" style={{ fontFamily: "DM Serif Display, Georgia, serif" }}>
              We Serve All of Utah —<br />
              <span className="text-[#c9a84c]">Including {county?.name || "Your County"}</span>
            </h2>
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

        {/* Body content section — localized per county using county data */}
        <section className="py-16 bg-white">
          <div className="container max-w-4xl">
            <h2 className="text-2xl md:text-3xl font-extrabold text-[#080808] mb-6" style={{ fontFamily: "DM Serif Display, Georgia, serif" }}>
              Payment Processing Services for {county?.name || "Your County"} Businesses
            </h2>
            <p className="text-gray-700 text-base leading-relaxed mb-4">
              {county?.name || "This county"} is one of Utah’s 29 counties, and UBC Unlimited is proud to serve businesses throughout the area{county?.seat ? ` including ${county.seat} and surrounding communities` : ""}. Whether you run a retail shop, restaurant, service business, or eCommerce store in {county?.name || "this county"}, our team offers tailored merchant services designed to reduce your processing costs and simplify how you accept payments.
            </p>
            {county?.keyIndustries && county.keyIndustries.length > 0 && (
              <p className="text-gray-700 text-base leading-relaxed mb-4">
                {county.name} has a diverse business community with strong representation in {county.keyIndustries.slice(0, 3).join(", ").toLowerCase()}. UBC Unlimited has deep experience serving these industries across Utah, providing payment solutions that match the specific transaction patterns, chargeback profiles, and cash flow needs of each business type.
              </p>
            )}
            <p className="text-gray-700 text-base leading-relaxed mb-4">
              Our team provides a free statement review for any {county?.name || "Utah county"} business currently accepting credit cards. We analyze your current processing statement line by line, identify where you are overpaying, and show you a clear cost comparison before you make any changes. Most businesses we work with save meaningfully on their monthly processing costs after switching to interchange-plus pricing or implementing a compliant cash discount program.
            </p>
            <p className="text-gray-700 text-base leading-relaxed mb-6">
              UBC Unlimited is a Utah-based company, not a national call center. When you call us, you reach a local representative who understands the Utah business environment and can provide hands-on support for equipment setup, software integration, and ongoing account management. We serve businesses throughout all 29 Utah counties.
            </p>

            <h2 className="text-xl font-bold text-[#080808] mb-4" style={{ fontFamily: "DM Serif Display, Georgia, serif" }}>
              Merchant Services We Offer in {county?.name || "Your County"}
            </h2>
            <ul className="list-disc list-inside text-gray-700 text-base space-y-2 mb-6">
              <li>Credit card and debit card processing with transparent interchange-plus pricing</li>
              <li>SkyTab POS systems for restaurants, bars, retail, and service businesses</li>
              <li>Cash discount and dual pricing programs to offset or eliminate processing fees</li>
              <li>ACH and eCheck processing for recurring billing and large transactions</li>
              <li>eCommerce payment gateways for online businesses</li>
              <li>High-risk merchant accounts for specialty industries</li>
              <li>Virtual terminals for phone and mail order businesses</li>
              <li>Gift card and loyalty programs to drive repeat business</li>
            </ul>

            <h2 className="text-xl font-bold text-[#080808] mb-4" style={{ fontFamily: "DM Serif Display, Georgia, serif" }}>
              Why {county?.name || "Utah"} Businesses Choose UBC Unlimited
            </h2>
            <p className="text-gray-700 text-base leading-relaxed mb-4">
              Unlike national processors that route your calls through a generic support queue, UBC Unlimited assigns a dedicated local representative to your account. Your rep knows your business, your processing history, and your industry — and is available when you need help. We have helped businesses across Utah reduce their processing costs, upgrade their POS systems, and access payment solutions that were previously unavailable to them.
            </p>
            {county?.cities && county.cities.length > 0 && (
              <p className="text-gray-700 text-base leading-relaxed mb-4">
                In {county.name}, we serve businesses in {county.cities.slice(0, 4).join(", ")} and all surrounding communities. Our local presence means faster response times, on-site equipment support, and a team that understands the specific business landscape of your area.
              </p>
            )}
            <p className="text-gray-700 text-base leading-relaxed mb-6">
              We work with businesses throughout {county?.name || "Utah"} on a no-pressure basis. Our process starts with a free consultation and statement review, and we only recommend changes that make financial sense for your specific situation. There are no long-term contracts required, and our pricing is fully transparent from day one.
            </p>

            {/* FAQ section */}
            <h2 className="text-xl font-bold text-[#080808] mb-4" style={{ fontFamily: "DM Serif Display, Georgia, serif" }}>
              Frequently Asked Questions
            </h2>
            <div className="space-y-4 mb-8">
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-[#080808] mb-2">Do you serve businesses in {county?.name || "this county"}?</h3>
                <p className="text-gray-700 text-sm leading-relaxed">Yes. UBC Unlimited serves businesses in every county across Utah, including {county?.name || "this county"}. We provide the same level of service and competitive pricing to businesses in smaller communities as we do to businesses in Salt Lake City and other major markets. There are no geographic restrictions on our services.</p>
              </div>
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-[#080808] mb-2">How do I get started with merchant services in {county?.name || "Utah"}?</h3>
                <p className="text-gray-700 text-sm leading-relaxed">The easiest way to get started is to call us or submit a consultation request. We’ll schedule a brief call to learn about your business, then provide a free statement review if you’re currently processing. Most accounts are approved and active within 24–48 hours for standard business types. POS system installations typically require a 14-day lead time from approval.</p>
              </div>
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-[#080808] mb-2">What is a cash discount program and is it right for my business?</h3>
                <p className="text-gray-700 text-sm leading-relaxed">A cash discount program lets you post a standard price and automatically apply a discount when customers pay with cash. This offsets your credit card processing costs without technically charging a fee to card users. It is legal in all 50 states and can eliminate a significant portion of your monthly processing expense. We’ll walk you through whether it’s a good fit for your specific business type and customer base in {county?.name || "Utah"}.</p>
              </div>
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-[#080808] mb-2">Do you offer POS systems for businesses in {county?.name || "this county"}?</h3>
                <p className="text-gray-700 text-sm leading-relaxed">Yes. We install and support SkyTab POS systems throughout {county?.name || "Utah"}{county?.seat ? `, including ${county.seat}` : ""} and surrounding communities. Our local team handles the full installation, menu or product configuration, staff training, and ongoing support. SkyTab is built for restaurants, bars, quick-service, and retail environments and includes built-in online ordering, loyalty programs, and real-time analytics.</p>
              </div>
            </div>

            <div className="bg-[#f9f6f0] border border-[#c9a84c]/20 rounded-xl p-6">
              <h2 className="text-lg font-bold text-[#080808] mb-2">Ready to Get Started?</h2>
              <p className="text-gray-700 text-sm mb-3">
                Contact UBC Unlimited today for a free consultation and statement review. We serve {county?.name || "all Utah counties"} with local support and competitive rates.
              </p>
              <div className="flex flex-wrap gap-3">
                <a href={SITE.phoneHref} className="inline-flex items-center gap-2 bg-[#c9a84c] text-[#080808] font-semibold text-sm px-4 py-2 rounded-lg hover:bg-[#e2c97e] transition-colors">
                  <Phone size={14} /> Call {SITE.phone}
                </a>
                <Link href="/consultation" className="inline-flex items-center gap-2 border border-[#c9a84c] text-[#c9a84c] font-semibold text-sm px-4 py-2 rounded-lg hover:bg-[#c9a84c]/10 transition-colors">
                  Request a Consultation
                </Link>
              </div>
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
        description={countyMetaDescription(county.name, county.slug)}
        canonical={`/counties/${county.slug}`}
        schema={[
          {
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "UBC Unlimited",
            "url": "https://ubcunlimited.com",
            "telephone": "+18014620923",
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
                  <span key={ind} className="flex items-center gap-1.5 text-xs text-white/70 bg-white/5 border border-white/10 px-3 py-1.5 rounded-full">
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
                      <div className="text-white/70 text-xs leading-tight">{s.label}</div>
                    </div>
                  ))}
                </div>
                <div className="border-t border-white/10 pt-5">
                  <p className="text-white/70 text-xs mb-3 uppercase tracking-widest font-semibold">Cities We Serve in {county.name}</p>
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
              { icon: Clock, label: "Acct. Activation", value: "24–48 Hrs" },
              { icon: Users, label: "Utah Businesses Served", value: "1,000+" },
              { icon: Star, label: "Years of Local Experience", value: `${SITE.yearsInBusiness}+` },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex flex-col items-center gap-1">
                <Icon size={16} className="text-[#c9a84c]" />
                <div className="text-lg font-extrabold text-white" style={{ fontFamily: "DM Serif Display, Georgia, serif" }}>{value}</div>
                <div className="text-white/70 text-xs">{label}</div>
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
          <p className="text-white/70 mb-8 max-w-2xl">
            From credit card processing to full POS systems, we tailor every solution to your industry and business size — with transparent pricing and no long-term contracts.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {SOLUTIONS.map((sol) => (
              <Link key={sol.href} href={sol.href} className="group bg-white/5 hover:bg-[#c9a84c]/10 border border-white/10 hover:border-[#c9a84c]/30 rounded-xl p-5 transition-all">
                <div className="text-white font-semibold text-sm mb-2 group-hover:text-[#c9a84c] transition-colors">{sol.label}</div>
                <div className="text-white/70 text-xs leading-relaxed">{sol.desc}</div>
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
          <p className="text-white/70 text-center mb-10 max-w-xl mx-auto">Getting started with UBC Unlimited is simple. Most {county.name} businesses are approved and processing within 24–48 hours. POS system installations typically require a 14-day lead time from approval.</p>
          <div className="grid md:grid-cols-3 gap-6">
            {HOW_IT_WORKS.map((step) => (
              <div key={step.step} className="relative bg-white/5 border border-white/10 rounded-2xl p-6">
                <div className="text-4xl font-extrabold text-[#c9a84c]/20 mb-3" style={{ fontFamily: "DM Serif Display, Georgia, serif" }}>{step.step}</div>
                <h3 className="text-white font-bold text-base mb-2">{step.title}</h3>
                <p className="text-white/70 text-sm leading-relaxed">{step.desc}</p>
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
                  <div className="text-white/70 text-xs">{county.name}, Utah</div>
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

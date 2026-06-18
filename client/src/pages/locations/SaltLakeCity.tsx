// Salt Lake City — Dedicated Local SEO Landing Page
// Target keywords: merchant services Salt Lake City, credit card processing Salt Lake City,
// payment processing SLC, POS systems Salt Lake City, merchant account SLC Utah
import { Link } from "wouter";
import { motion } from "framer-motion";
import {
  MapPin,
  Phone,
  ArrowRight,
  CheckCircle,
  Star,
  Building2,
  Utensils,
  ShoppingBag,
  Stethoscope,
  Hotel,
  Wrench,
  TrendingDown,
  Clock,
  ShieldCheck,
  Users,
  DollarSign,
  ChevronRight,
} from "lucide-react";
import PageLayout from "@/components/layout/PageLayout";
import SEO from "@/components/SEO";
import CTABanner from "@/components/sections/CTABanner";
import { SITE } from "@/lib/config";

// ─── Local Data ───────────────────────────────────────────────────────────────

const SLC_INDUSTRIES = [
  {
    icon: Utensils,
    name: "Restaurants & Food Service",
    desc: "From downtown SLC fine dining to food trucks in Sugar House — we support tableside payments, split checks, and SkyTab POS built for the Utah dining scene.",
    href: "/industries/restaurants",
  },
  {
    icon: ShoppingBag,
    name: "Retail & Boutique",
    desc: "Independent retailers on Main Street, 9th & 9th, and the Gateway need fast, reliable checkout. We offer Clover and SkyTab retail setups with inventory sync.",
    href: "/industries/retail",
  },
  {
    icon: Stethoscope,
    name: "Medical & Healthcare",
    desc: "Salt Lake City's medical corridor — from private practices to specialty clinics — benefits from HIPAA-aware payment workflows and patient-friendly billing.",
    href: "/industries/medical",
  },
  {
    icon: Hotel,
    name: "Hotels & Hospitality",
    desc: "Downtown SLC hotels and boutique properties need property management integrations and seamless guest payment experiences. We handle both.",
    href: "/industries/hotels-hospitality",
  },
  {
    icon: Wrench,
    name: "Home Services & Contractors",
    desc: "Plumbers, electricians, and HVAC contractors across the Salt Lake Valley use our mobile processing to collect payment on-site, every time.",
    href: "/industries/home-services",
  },
  {
    icon: Building2,
    name: "Professional Services",
    desc: "Law firms, accountants, and consultants in the SLC business district use our virtual terminals and invoicing to get paid faster.",
    href: "/industries/professional-services",
  },
];

const SLC_BENEFITS = [
  {
    icon: MapPin,
    title: "Truly Local — Salt Lake City Based",
    desc: "We're not a national call center. UBC Unlimited serves Salt Lake City businesses with a local rep who knows the market, the neighborhoods, and the unique needs of Utah businesses.",
  },
  {
    icon: TrendingDown,
    title: "Lower Rates Than National Processors",
    desc: "Most SLC businesses overpay Stripe, Square, or their bank. Our statement review shows you exactly where you're losing money — and how much you can save.",
  },
  {
    icon: Clock,
    title: "Approved & Processing in 24–48 Hours",
    desc: "Most Salt Lake City businesses are live and processing within one to two business days. We handle the setup, equipment, and training so you don't have to.",
  },
  {
    icon: ShieldCheck,
    title: "No Contracts*, No Rate Increases",
    desc: "Month-to-month agreements only. Your rate is your rate — we never raise fees after you sign up, unlike many national processors.",
  },
  {
    icon: Users,
    title: "Dedicated SLC Account Rep",
    desc: "You get a direct line to a real person who knows your account. Not a ticket queue. Not a chatbot. A local rep who picks up the phone.",
  },
  {
    icon: DollarSign,
    title: "Cash Discount & Dual Pricing Available",
    desc: "Eliminate processing fees entirely with our cash discount program — popular with SLC restaurants, retail, and service businesses looking to protect margins.",
  },
];

const SLC_FAQS = [
  {
    q: "Does UBC Unlimited serve businesses in Salt Lake City?",
    a: "Yes — UBC Unlimited is based in Utah and serves businesses throughout Salt Lake City and the entire Salt Lake Valley, including downtown, Sugar House, The Avenues, Sugarhouse, Rose Park, and surrounding neighborhoods. We offer on-site consultations and local support.",
  },
  {
    q: "How much does merchant services cost for a Salt Lake City business?",
    a: "Rates are tailored to your card mix, average ticket size, and monthly volume. Most SLC businesses qualify for interchange-plus pricing ranging from interchange + 0.10% to 0.50%, which is significantly lower than flat-rate processors like Stripe (2.9% + $0.30) or Square (2.6%–3.5%). We offer a statement review to show you your exact savings.",
  },
  {
    q: "What POS systems do you offer for Salt Lake City businesses?",
    a: "We offer SkyTab (ideal for restaurants and bars), Clover (popular with retail and professional services), and several other systems tailored to specific industries. We handle delivery, setup, and training for all hardware — typically within 24–48 hours of approval.",
  },
  {
    q: "Can you help a high-risk business in Salt Lake City get a merchant account?",
    a: "Yes. We specialize in high-risk merchant accounts for industries that national processors often decline — including CBD, firearms, supplement companies, and more. Salt Lake City has a growing number of businesses in these verticals, and we have direct relationships with processors that specialize in high-risk approvals.",
  },
  {
    q: "Do you offer a consultation for SLC businesses?",
    a: "Absolutely. We offer a no-obligation consultation for any business in Salt Lake City or the surrounding area. We'll review your current processing statement, identify savings opportunities, and recommend the best solution for your business type and volume.",
  },
  {
    q: "How does the cash discount program work in Utah?",
    a: "Utah law permits cash discount programs, which allow businesses to pass the processing fee to card-paying customers while offering a discount to cash customers. This effectively eliminates your processing costs. We set up the signage, programming, and compliance documentation so you're fully covered.",
  },
];

const SLC_NEIGHBORHOODS = [
  "Downtown Salt Lake City",
  "Sugar House",
  "The Avenues",
  "9th & 9th District",
  "Marmalade Hill",
  "Rose Park",
  "Glendale",
  "Millcreek",
  "East Bench",
  "Liberty Wells",
];

const TESTIMONIALS = [
  {
    name: "Maria T.",
    business: "Restaurant Owner, Sugar House",
    rating: 5,
    text: "We were paying over 3% with our old processor. UBC Unlimited got us down to interchange-plus and saved us over $400 a month. The local support is night and day compared to calling a 1-800 number.",
  },
  {
    name: "David K.",
    business: "Retail Boutique, 9th & 9th",
    rating: 5,
    text: "Setup was done in two days. The rep came to our store, set up the Clover, trained my staff, and was available by phone the whole time. That's not something you get from Square.",
  },
  {
    name: "Jennifer R.",
    business: "Medical Practice, Downtown SLC",
    rating: 5,
    text: "We needed a solution that worked with our billing software and was HIPAA-aware. UBC Unlimited handled everything and our patients love the new payment experience.",
  },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function SaltLakeCity() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "UBC Unlimited — Salt Lake City Merchant Services",
    description:
      "UBC Unlimited provides credit card processing, POS systems, ACH payments, cash discount programs, and merchant services to businesses throughout Salt Lake City, Utah.",
    url: "https://ubcunlimited.com/locations/salt-lake-city",
    telephone: SITE.phone,
    email: SITE.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Salt Lake City",
      addressRegion: "UT",
      postalCode: "84101",
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 40.7608,
      longitude: -111.891,
    },
    areaServed: [
      { "@type": "City", name: "Salt Lake City" },
      { "@type": "City", name: "Murray" },
      { "@type": "City", name: "Millcreek" },
      { "@type": "City", name: "Holladay" },
      { "@type": "City", name: "Cottonwood Heights" },
    ],
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "08:00",
        closes: "18:00",
      },
    ],
    priceRange: "$$",
    sameAs: [SITE.social.facebook, SITE.social.linkedin],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Merchant Services",
      itemListElement: [
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Credit Card Processing" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "POS Systems" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Cash Discount Program" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "ACH / eCheck Processing" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "High-Risk Merchant Accounts" } },
      ],
    },
  };

  return (
    <PageLayout>
      <SEO
        title="Merchant Services Salt Lake City, Utah"
        description="UBC Unlimited provides credit card processing, POS systems, cash discount programs, and merchant services to Salt Lake City businesses. Local support, no contracts*, statement review."
        canonical="/locations/salt-lake-city"
        schema={schema}
      />

      {/* ── Hero ── */}
      <section className="relative bg-[#080808] overflow-hidden pt-24 pb-20">
        <div className="absolute inset-0 bg-gradient-to-br from-[#c9a84c]/8 via-transparent to-transparent pointer-events-none" />
        <div className="container relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Breadcrumb */}
              <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-white/60 mb-5">
                <Link href="/" className="hover:text-white/60 transition-colors">Home</Link>
                <ChevronRight size={12} />
                <Link href="/locations" className="hover:text-white/60 transition-colors">Locations</Link>
                <ChevronRight size={12} />
                <span className="text-white/60">Salt Lake City</span>
              </nav>

              <span className="inline-flex items-center gap-1.5 bg-[#c9a84c]/10 border border-[#c9a84c]/25 text-[#c9a84c] text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full mb-5">
                <MapPin size={11} /> Salt Lake City, Utah
              </span>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-5">
                Merchant Services in{" "}
                <span className="text-[#c9a84c]">Salt Lake City</span>
              </h1>

              <p className="text-white/60 text-lg leading-relaxed mb-4 max-w-xl">
                UBC Unlimited provides credit card processing, POS systems, cash discount programs,
                and merchant accounts to businesses throughout Salt Lake City and the Salt Lake
                Valley — with local support that national processors simply can't match.
              </p>

              <p className="text-white/70 text-sm leading-relaxed mb-8 max-w-xl">
                From the restaurants and retail shops of Sugar House to the medical practices and
                professional services firms of downtown SLC, we help Utah businesses accept payments
                smarter, save on processing costs, and grow with confidence.
              </p>

              {/* Quick proof points */}
              <ul className="space-y-2.5 mb-8">
                {[
                  "Local Utah rep — not a call center",
                  "Most SLC businesses approved in 24–48 hours",
                  "Free statement review — see your exact savings",
                  "No contracts*, no rate increases, ever",
                  "Cash discount program available — eliminate fees entirely",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-white/70 text-sm">
                    <CheckCircle size={15} className="text-[#c9a84c] mt-0.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>

              <div className="flex flex-col sm:flex-row gap-3">
                <Link href="/contact" className="btn-gold text-sm py-3 px-7 justify-center">
                  Request a Quote <ArrowRight size={15} />
                </Link>
                <Link href="/statement-review" className="btn-outline-white text-sm py-3 px-7 justify-center">
                  Statement Review
                </Link>
              </div>
            </motion.div>

            {/* Right — stats card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="space-y-4"
            >
              {/* SLC market card */}
              <div className="bg-white/4 border border-white/10 rounded-2xl p-6">
                <h2 className="text-white font-bold text-base mb-4 flex items-center gap-2">
                  <MapPin size={16} className="text-[#c9a84c]" />
                  Salt Lake City Market Overview
                </h2>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: "Population", value: "200,000+" },
                    { label: "Metro Area", value: "1.2M+" },
                    { label: "Active Businesses", value: "30,000+" },
                    { label: "GDP Growth", value: "Top 10 US" },
                  ].map((stat) => (
                    <div key={stat.label} className="bg-white/4 rounded-xl p-3 text-center">
                      <p className="text-[#c9a84c] font-extrabold text-xl">{stat.value}</p>
                      <p className="text-white/70 text-xs mt-0.5">{stat.label}</p>
                    </div>
                  ))}
                </div>
                <p className="text-white/60 text-xs mt-4 leading-relaxed">
                  Salt Lake City is one of the fastest-growing business markets in the United States,
                  with a diverse economy spanning tech, healthcare, hospitality, and professional
                  services.
                </p>
              </div>

              {/* Contact card */}
              <div className="bg-[#c9a84c]/8 border border-[#c9a84c]/20 rounded-2xl p-5 flex items-center justify-between gap-4">
                <div>
                  <p className="text-white font-semibold text-sm">Talk to a local SLC rep today</p>
                  <p className="text-white/70 text-xs mt-0.5">Free consultation, no obligation</p>
                </div>
                <a
                  href={SITE.phoneHref}
                  className="btn-gold text-sm py-2.5 px-5 shrink-0 justify-center"
                >
                  <Phone size={14} /> Call Now
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Industries Served in SLC ── */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#080808] mb-3">
              Industries We Serve in Salt Lake City
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-base">
              From the restaurant row on South Temple to the medical corridor near the University of
              Utah, UBC Unlimited serves every major industry in the Salt Lake City market.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {SLC_INDUSTRIES.map((industry, i) => (
              <motion.div
                key={industry.name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
              >
                <Link
                  href={industry.href}
                  className="block bg-[#f8fafc] border border-gray-100 rounded-2xl p-6 hover:border-[#c9a84c]/40 hover:shadow-md transition-all group h-full"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#c9a84c]/10 flex items-center justify-center mb-4 group-hover:bg-[#c9a84c]/20 transition-colors">
                    <industry.icon size={20} className="text-[#c9a84c]" />
                  </div>
                  <h3 className="text-[#080808] font-bold text-base mb-2 group-hover:text-[#c9a84c] transition-colors">
                    {industry.name}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{industry.desc}</p>
                  <span className="inline-flex items-center gap-1 text-[#c9a84c] text-xs font-semibold mt-3">
                    Learn more <ArrowRight size={11} />
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why Choose UBC Unlimited in SLC ── */}
      <section className="py-20 bg-[#080808]">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
              Why Salt Lake City Businesses Choose UBC Unlimited
            </h2>
            <p className="text-white/70 max-w-2xl mx-auto text-base">
              There are dozens of payment processors competing for your business. Here's why SLC
              business owners choose us — and stay with us.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {SLC_BENEFITS.map((benefit, i) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                className="bg-white/4 border border-white/8 rounded-2xl p-6"
              >
                <div className="w-10 h-10 rounded-xl bg-[#c9a84c]/12 flex items-center justify-center mb-4">
                  <benefit.icon size={20} className="text-[#c9a84c]" />
                </div>
                <h3 className="text-white font-bold text-base mb-2">{benefit.title}</h3>
                <p className="text-white/70 text-sm leading-relaxed">{benefit.desc}</p>
              </motion.div>
            ))}
          </div>
          <p className="text-white/70 text-xs mt-6">* Certain platforms and equipment programs may require a contract. This will be clearly disclosed prior to entering any agreement.</p>
        </div>
      </section>

      {/* ── Neighborhoods We Serve ── */}
      <section className="py-16 bg-[#f8fafc]">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-[#080808] mb-3">
              Serving Every Neighborhood in Salt Lake City
            </h2>
            <p className="text-gray-600 text-base mb-8">
              Whether your business is in the heart of downtown or in one of SLC's vibrant
              neighborhoods, UBC Unlimited provides on-site consultations and local support
              throughout the city.
            </p>
            <div className="flex flex-wrap justify-center gap-2.5">
              {SLC_NEIGHBORHOODS.map((n) => (
                <span
                  key={n}
                  className="inline-flex items-center gap-1.5 bg-white border border-gray-200 text-[#080808] text-sm font-medium px-4 py-2 rounded-full shadow-sm"
                >
                  <MapPin size={12} className="text-[#c9a84c]" />
                  {n}
                </span>
              ))}
            </div>
            <p className="text-gray-600 text-sm mt-6">
              Also serving Murray, Millcreek, Holladay, Cottonwood Heights, and surrounding Salt
              Lake Valley communities.
            </p>
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-[#080808] mb-2">
              What Salt Lake City Business Owners Say
            </h2>
            <p className="text-gray-600 text-base">
              Real feedback from real businesses in the Salt Lake City area.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {TESTIMONIALS.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="bg-[#f8fafc] border border-gray-100 rounded-2xl p-6"
              >
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} size={14} className="fill-[#c9a84c] text-[#c9a84c]" />
                  ))}
                </div>
                <p className="text-gray-700 text-sm leading-relaxed mb-5 italic">"{t.text}"</p>
                <div>
                  <p className="text-[#080808] font-bold text-sm">{t.name}</p>
                  <p className="text-gray-600 text-xs">{t.business}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-20 bg-[#080808]">
        <div className="container max-w-3xl">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
              Frequently Asked Questions — Salt Lake City
            </h2>
            <p className="text-white/70 text-base">
              Common questions from Salt Lake City business owners about merchant services.
            </p>
          </div>
          <div className="space-y-3">
            {SLC_FAQS.map((faq, i) => (
              <details
                key={i}
                className="bg-white/4 border border-white/8 rounded-xl overflow-hidden group"
              >
                <summary className="flex items-center justify-between gap-3 px-5 py-4 cursor-pointer text-white font-semibold text-sm list-none select-none hover:bg-white/4 transition-colors">
                  {faq.q}
                  <ChevronRight
                    size={16}
                    className="text-[#c9a84c] shrink-0 transition-transform group-open:rotate-90"
                  />
                </summary>
                <div className="px-5 pb-4 text-white/60 text-sm leading-relaxed border-t border-white/8 pt-3">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── Nearby Locations ── */}
      <section className="py-14 bg-white">
        <div className="container">
          <h2 className="text-xl font-bold text-[#080808] mb-6 text-center">
            Also Serving Nearby Communities
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              { city: "Murray", slug: "murray" },
              { city: "Sandy", slug: "sandy" },
              { city: "Draper", slug: "draper" },
              { city: "South Jordan", slug: "south-jordan" },
              { city: "West Jordan", slug: "west-jordan" },
              { city: "Millcreek", slug: "millcreek" },
            ].map((loc) => (
              <Link
                key={loc.slug}
                href={`/locations/${loc.slug}`}
                className="inline-flex items-center gap-1.5 bg-[#f8fafc] border border-gray-200 text-[#080808] text-sm font-medium px-4 py-2 rounded-full hover:border-[#c9a84c]/50 hover:text-[#c9a84c] transition-colors"
              >
                <MapPin size={12} className="text-[#c9a84c]" />
                {loc.city}
              </Link>
            ))}
            <Link
              href="/locations"
              className="inline-flex items-center gap-1.5 bg-[#c9a84c]/10 border border-[#c9a84c]/30 text-[#c9a84c] text-sm font-semibold px-4 py-2 rounded-full hover:bg-[#c9a84c]/20 transition-colors"
            >
              View All Locations <ArrowRight size={12} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Bottom CTA ── */}
      <CTABanner
        title="Ready to Lower Your Processing Costs in Salt Lake City?"
        subtitle="Get a statement review and see exactly how much your Salt Lake City business can save. Most businesses find meaningful savings on their processing costs after a statement review."
        primaryLabel="Request a Quote"
        primaryHref="/contact"
        secondaryLabel="Statement Review"
        secondaryHref="/statement-review"
      />
    </PageLayout>
  );
}

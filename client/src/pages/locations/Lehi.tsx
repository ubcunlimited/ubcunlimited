// Lehi — Dedicated Local SEO Landing Page
// Target keywords: merchant services Lehi, credit card processing Lehi, payment processing Lehi Utah
import { Link } from "wouter";
import { motion } from "framer-motion";
import {
  MapPin, Phone, ArrowRight, CheckCircle, Star, Building2, Utensils, ShoppingBag,
  Stethoscope, Hotel, Wrench, TrendingDown, Clock, ShieldCheck, Users, DollarSign, ChevronRight,
} from "lucide-react";
import PageLayout from "@/components/layout/PageLayout";
import SEO from "@/components/SEO";
import CTABanner from "@/components/sections/CTABanner";
import { SITE } from "@/lib/config";

const LEHI_INDUSTRIES = [
  {
    icon: Building2,
    name: "Tech & SaaS Companies",
    desc: "Lehi's Silicon Slopes tech companies need integrated payment solutions, subscription billing, and high-volume eCommerce processing. We deliver.",
    href: "/industries/ecommerce",
  },
  {
    icon: Utensils,
    name: "Restaurants & Food Service",
    desc: "From Thanksgiving Point dining to fast casual near I-15 — we support tableside payments, split checks, and SkyTab POS built for the Utah dining scene.",
    href: "/industries/restaurants",
  },
  {
    icon: ShoppingBag,
    name: "Retail & Boutique",
    desc: "Lehi's growing retail scene needs fast, reliable checkout. We offer Clover and SkyTab retail setups with inventory sync.",
    href: "/industries/retail",
  },
  {
    icon: Building2,
    name: "Professional Services",
    desc: "Law firms, financial advisors, and consultants in Lehi use our virtual terminals and invoicing to get paid faster.",
    href: "/industries/professional-services",
  },
  {
    icon: Wrench,
    name: "Home Services & Contractors",
    desc: "Lehi's rapid growth means high demand for home services. Our mobile processing lets contractors collect payment on-site, every time.",
    href: "/industries/home-services",
  },
  {
    icon: Stethoscope,
    name: "Medical & Healthcare",
    desc: "Lehi medical practices benefit from HIPAA-aware payment workflows and patient-friendly billing solutions.",
    href: "/industries/medical",
  }
];

const LEHI_BENEFITS = [
  {
    icon: MapPin,
    title: "Truly Local — Utah Based",
    desc: "We're not a national call center. UBC Unlimited serves Lehi businesses with a local rep who knows the market and the unique needs of Utah businesses.",
  },
  {
    icon: TrendingDown,
    title: "Lower Rates Than National Processors",
    desc: "Most Lehi businesses overpay Stripe, Square, or their bank. Our statement review shows you exactly where you're losing money — and how much you can save.",
  },
  {
    icon: Clock,
    title: "Approved & Processing in 24–48 Hours",
    desc: "Most Lehi businesses are live and processing within one to two business days. We handle the setup, equipment, and training so you don't have to.",
  },
  {
    icon: ShieldCheck,
    title: "No Contracts*, No Rate Increases",
    desc: "Month-to-month agreements only. Your rate is your rate — we never raise fees after you sign up, unlike many national processors.",
  },
  {
    icon: Users,
    title: "Dedicated Local Account Rep",
    desc: "You get a direct line to a real person who knows your account. Not a ticket queue. Not a chatbot. A local rep who picks up the phone.",
  },
  {
    icon: DollarSign,
    title: "Cash Discount & Dual Pricing Available",
    desc: "Eliminate processing fees entirely with our cash discount program — popular with Lehi restaurants, retail, and service businesses looking to protect margins.",
  }
];

const LEHI_FAQS = [
  {
    q: "Does UBC Unlimited serve businesses in Lehi, Utah?",
    a: "Yes — UBC Unlimited serves businesses throughout Lehi and the Silicon Slopes tech corridor, including Thanksgiving Point, Traverse Mountain, and surrounding areas. We offer on-site consultations and local support.",
  },
  {
    q: "Do you support tech startups and SaaS companies in Lehi?",
    a: "Yes. We specialize in payment solutions for Lehi's growing tech sector, including integrated online checkout, subscription billing, and high-volume processing through major payment gateways like Authorize.Net, NMI, and Stripe.",
  },
  {
    q: "How much does merchant services cost for a Lehi business?",
    a: "Rates are tailored to your card mix and volume. Most Lehi businesses qualify for interchange-plus pricing ranging from interchange + 0.10% to 0.50% — significantly lower than Stripe (2.9% + $0.30) or Square (2.6%–3.5%). We offer a statement review to show your exact savings.",
  },
  {
    q: "What POS systems do you offer for Lehi restaurants and retailers?",
    a: "We offer SkyTab (ideal for restaurants and bars), Clover (popular with retail and professional services), and several other systems. We handle delivery, setup, and training — typically within 24–48 hours of approval.",
  },
  {
    q: "Do you offer a cash discount program for Lehi businesses?",
    a: "Yes. Utah law permits cash discount programs, which allow businesses to pass the processing fee to card-paying customers. This effectively eliminates your processing costs. We handle the full setup and compliance documentation.",
  },
  {
    q: "How quickly can a Lehi business get approved and start processing?",
    a: "Most Lehi businesses are approved and live within 24–48 hours. We handle the setup, equipment, and training so you can focus on running your business.",
  }
];

const LEHI_NEIGHBORHOODS = [
  "Silicon Slopes",
  "Thanksgiving Point",
  "North Lehi",
  "Traverse Mountain",
  "Ivory Ridge",
  "Dry Creek",
  "Saratoga Springs Border",
  "Vineyard Border",
  "Lehi City Center",
  "Traverse Ridge"
];

const TESTIMONIALS = [
  {
    name: "Brandon H.",
    business: "SaaS Startup, Silicon Slopes",
    rating: 5,
    text: "We needed a payment processor that understood subscription billing and high-risk tech. UBC Unlimited got us set up with the right gateway in two days.",
  },
  {
    name: "Ashley N.",
    business: "Restaurant Owner, Thanksgiving Point",
    rating: 5,
    text: "The SkyTab system is perfect for our high-volume lunch crowd. Tableside ordering cut our ticket times in half and our processing costs dropped significantly.",
  },
  {
    name: "Mike T.",
    business: "Retail Store, Lehi",
    rating: 5,
    text: "Local support makes all the difference. When we had an issue on a Saturday, our rep answered the phone and had it resolved in 20 minutes.",
  }
];

export default function Lehi() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "UBC Unlimited — Lehi Merchant Services",
    description: "UBC Unlimited provides credit card processing, POS systems, ACH payments, cash discount programs, and merchant services to businesses throughout Lehi, Utah.",
    url: `https://ubcunlimited.com/locations/lehi`,
    telephone: SITE.phone,
    email: SITE.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Lehi",
      addressRegion: "UT",
      addressCountry: "US",
    },
    geo: { "@type": "GeoCoordinates", latitude: 40.3916, longitude: -111.8508 },
    areaServed: [
      { "@type": "City", "name": "Lehi" },
      { "@type": "City", "name": "American Fork" },
      { "@type": "City", "name": "Saratoga Springs" },
      { "@type": "City", "name": "Vineyard" },
      { "@type": "City", "name": "Eagle Mountain" }
    ],
    openingHoursSpecification: [{ "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday"], opens: "08:00", closes: "18:00" }],
    priceRange: "$$",
    sameAs: [SITE.social.facebook, SITE.social.linkedin],
  };

  return (
    <PageLayout>
      <SEO
        title="Merchant Services Lehi, Utah"
        description="UBC Unlimited provides credit card processing, POS systems, and merchant services to Lehi, Utah businesses. Local support, no contracts*, statement review."
        canonical="/locations/lehi"
        schema={schema}
      />

      {/* Hero */}
      <section className="relative bg-[#080808] overflow-hidden pt-24 pb-20">
        <div className="absolute inset-0 bg-gradient-to-br from-[#c9a84c]/8 via-transparent to-transparent pointer-events-none" />
        <div className="container relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-white/60 mb-5">
                <Link href="/" className="hover:text-white/60 transition-colors">Home</Link>
                <ChevronRight size={12} />
                <Link href="/locations" className="hover:text-white/60 transition-colors">Locations</Link>
                <ChevronRight size={12} />
                <span className="text-white/60">Lehi</span>
              </nav>
              <span className="inline-flex items-center gap-1.5 bg-[#c9a84c]/10 border border-[#c9a84c]/25 text-[#c9a84c] text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full mb-5">
                <MapPin size={11} /> Lehi, Utah
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-5">
                Merchant Services in{" "}
                <span className="text-[#c9a84c]">Lehi</span>
              </h1>
              <p className="text-white/60 text-lg leading-relaxed mb-4 max-w-xl">UBC Unlimited serves Lehi businesses with credit card processing, POS systems, cash discount programs, and merchant accounts — with local Utah support built for Silicon Slopes and beyond.</p>
              <p className="text-white/70 text-sm leading-relaxed mb-8 max-w-xl">From the tech companies of Silicon Slopes to the restaurants and retailers near Thanksgiving Point, we help Lehi businesses accept payments smarter, save on processing costs, and scale with confidence.</p>
              <ul className="space-y-2.5 mb-8">
                {["Local Utah rep — not a call center","Most businesses approved in 24–48 hours","Free statement review — see your exact savings","No contracts*, no rate increases, ever","Cash discount program available — eliminate fees entirely"].map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-white/70 text-sm">
                    <CheckCircle size={15} className="text-[#c9a84c] mt-0.5 shrink-0" />{item}
                  </li>
                ))}
              </ul>
              <p className="text-white/70 text-xs mt-3">* Certain platforms and equipment programs may require a contract. This will be clearly disclosed prior to entering any agreement.</p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link href="/contact" className="btn-gold text-sm py-3 px-7 justify-center">Request a Quote <ArrowRight size={15} /></Link>
                <Link href="/statement-review" className="btn-outline-white text-sm py-3 px-7 justify-center">Statement Review</Link>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.15 }} className="space-y-4">
              <div className="bg-white/4 border border-white/10 rounded-2xl p-6">
                <h2 className="text-white font-bold text-base mb-4 flex items-center gap-2">
                  <MapPin size={16} className="text-[#c9a84c]" />Lehi Market Overview
                </h2>
                <div className="grid grid-cols-2 gap-3">
                  {[{ label: "Population", value: "75,000+" },{ label: "County", value: "Utah County" },{ label: "State", value: "Utah" },{ label: "Support", value: "Local Rep" }].map((stat) => (
                    <div key={stat.label} className="bg-white/4 rounded-xl p-3 text-center">
                      <p className="text-[#c9a84c] font-extrabold text-xl">{stat.value}</p>
                      <p className="text-white/70 text-xs mt-0.5">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-[#c9a84c]/8 border border-[#c9a84c]/20 rounded-2xl p-5 flex items-center justify-between gap-4">
                <div>
                  <p className="text-white font-semibold text-sm">Talk to a local rep today</p>
                  <p className="text-white/70 text-xs mt-0.5">Free consultation, no obligation</p>
                </div>
                <a href={SITE.phoneHref} className="btn-gold text-sm py-2.5 px-5 shrink-0 justify-center"><Phone size={14} /> Call Now</a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Industries */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#080808] mb-3">Industries We Serve in Lehi</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-base">UBC Unlimited serves every major industry in the Lehi market with tailored payment solutions.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {LEHI_INDUSTRIES.map((industry, i) => (
              <motion.div key={industry.name} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.07 }}>
                <Link href={industry.href} className="block bg-[#f8fafc] border border-gray-100 rounded-2xl p-6 hover:border-[#c9a84c]/40 hover:shadow-md transition-all group h-full">
                  <div className="w-10 h-10 rounded-xl bg-[#c9a84c]/10 flex items-center justify-center mb-4 group-hover:bg-[#c9a84c]/20 transition-colors">
                    <industry.icon size={20} className="text-[#c9a84c]" />
                  </div>
                  <h3 className="text-[#080808] font-bold text-base mb-2 group-hover:text-[#c9a84c] transition-colors">{industry.name}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{industry.desc}</p>
                  <span className="inline-flex items-center gap-1 text-[#c9a84c] text-xs font-semibold mt-3">Learn more <ArrowRight size={11} /></span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose UBC */}
      <section className="py-20 bg-[#080808]">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">Why Lehi Businesses Choose UBC Unlimited</h2>
            <p className="text-white/70 max-w-2xl mx-auto text-base">There are dozens of payment processors competing for your business. Here's why Lehi business owners choose us — and stay with us.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {LEHI_BENEFITS.map((benefit, i) => (
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
      </section>

      {/* Neighborhoods */}
      <section className="py-16 bg-[#f8fafc]">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-[#080808] mb-3">Serving Every Neighborhood in Lehi</h2>
            <p className="text-gray-600 text-base mb-8">Whether your business is in the heart of Lehi or in one of its surrounding neighborhoods, UBC Unlimited provides on-site consultations and local support.</p>
            <div className="flex flex-wrap justify-center gap-2.5">
              {LEHI_NEIGHBORHOODS.map((n) => (
                <span key={n} className="inline-flex items-center gap-1.5 bg-white border border-gray-200 text-[#080808] text-sm font-medium px-4 py-2 rounded-full shadow-sm">
                  <MapPin size={12} className="text-[#c9a84c]" />{n}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-[#080808] mb-2">What Lehi Business Owners Say</h2>
            <p className="text-gray-600 text-base">Real feedback from real businesses in the Lehi area.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {TESTIMONIALS.map((t, i) => (
              <motion.div key={t.name} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.1 }} className="bg-[#f8fafc] border border-gray-100 rounded-2xl p-6">
                <div className="flex gap-0.5 mb-4">{Array.from({ length: t.rating }).map((_, j) => (<Star key={j} size={14} className="fill-[#c9a84c] text-[#c9a84c]" />))}</div>
                <p className="text-gray-700 text-sm leading-relaxed mb-5 italic">"{t.text}"</p>
                <div><p className="text-[#080808] font-bold text-sm">{t.name}</p><p className="text-gray-600 text-xs">{t.business}</p></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-[#080808]">
        <div className="container max-w-3xl">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">Frequently Asked Questions — Lehi</h2>
            <p className="text-white/70 text-base">Common questions from Lehi business owners about merchant services.</p>
          </div>
          <div className="space-y-3">
            {LEHI_FAQS.map((faq, i) => (
              <details key={i} className="bg-white/4 border border-white/8 rounded-xl overflow-hidden group">
                <summary className="flex items-center justify-between gap-3 px-5 py-4 cursor-pointer text-white font-semibold text-sm list-none select-none hover:bg-white/4 transition-colors">
                  {faq.q}<ChevronRight size={16} className="text-[#c9a84c] shrink-0 transition-transform group-open:rotate-90" />
                </summary>
                <div className="px-5 pb-4 text-white/60 text-sm leading-relaxed border-t border-white/8 pt-3">{faq.a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Nearby */}
      <section className="py-14 bg-white">
        <div className="container">
          <h2 className="text-xl font-bold text-[#080808] mb-6 text-center">Also Serving Nearby Communities</h2>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              key="american-fork"
              href={`/locations/american-fork`}
              className="inline-flex items-center gap-1.5 bg-[#f8fafc] border border-gray-200 text-[#080808] text-sm font-medium px-4 py-2 rounded-full hover:border-[#c9a84c]/50 hover:text-[#c9a84c] transition-colors"
            >
              <MapPin size={12} className="text-[#c9a84c]" />
              American Fork
            </Link>
            <Link
              key="orem"
              href={`/locations/orem`}
              className="inline-flex items-center gap-1.5 bg-[#f8fafc] border border-gray-200 text-[#080808] text-sm font-medium px-4 py-2 rounded-full hover:border-[#c9a84c]/50 hover:text-[#c9a84c] transition-colors"
            >
              <MapPin size={12} className="text-[#c9a84c]" />
              Orem
            </Link>
            <Link
              key="provo"
              href={`/locations/provo`}
              className="inline-flex items-center gap-1.5 bg-[#f8fafc] border border-gray-200 text-[#080808] text-sm font-medium px-4 py-2 rounded-full hover:border-[#c9a84c]/50 hover:text-[#c9a84c] transition-colors"
            >
              <MapPin size={12} className="text-[#c9a84c]" />
              Provo
            </Link>
            <Link
              key="south-jordan"
              href={`/locations/south-jordan`}
              className="inline-flex items-center gap-1.5 bg-[#f8fafc] border border-gray-200 text-[#080808] text-sm font-medium px-4 py-2 rounded-full hover:border-[#c9a84c]/50 hover:text-[#c9a84c] transition-colors"
            >
              <MapPin size={12} className="text-[#c9a84c]" />
              South Jordan
            </Link>
            <Link
              key="draper"
              href={`/locations/draper`}
              className="inline-flex items-center gap-1.5 bg-[#f8fafc] border border-gray-200 text-[#080808] text-sm font-medium px-4 py-2 rounded-full hover:border-[#c9a84c]/50 hover:text-[#c9a84c] transition-colors"
            >
              <MapPin size={12} className="text-[#c9a84c]" />
              Draper
            </Link>
            <Link
              key="salt-lake-city"
              href={`/locations/salt-lake-city`}
              className="inline-flex items-center gap-1.5 bg-[#f8fafc] border border-gray-200 text-[#080808] text-sm font-medium px-4 py-2 rounded-full hover:border-[#c9a84c]/50 hover:text-[#c9a84c] transition-colors"
            >
              <MapPin size={12} className="text-[#c9a84c]" />
              Salt Lake City
            </Link>
            <Link href="/locations" className="inline-flex items-center gap-1.5 bg-[#c9a84c]/10 border border-[#c9a84c]/30 text-[#c9a84c] text-sm font-semibold px-4 py-2 rounded-full hover:bg-[#c9a84c]/20 transition-colors">
              View All Locations <ArrowRight size={12} />
            </Link>
          </div>
        </div>
      </section>

      <CTABanner
        title="Ready to Lower Your Processing Costs in Lehi?"
        subtitle="Get a statement review and see exactly how much your Lehi business can save. Most businesses find meaningful savings on their processing costs after a statement review."
        primaryLabel="Request a Quote"
        primaryHref="/contact"
        secondaryLabel="Statement Review"
        secondaryHref="/statement-review"
      />
    </PageLayout>
  );
}

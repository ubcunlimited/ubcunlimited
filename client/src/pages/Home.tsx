import { useState } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle, Phone, TrendingDown, Shield, Clock, Users, Star, ChevronRight, MapPin, Award, Handshake, Loader2 } from "lucide-react";
import { trpc } from "@/lib/trpc";
import PageLayout from "@/components/layout/PageLayout";
import TrustBadges from "@/components/sections/TrustBadges";
import TestimonialBlock from "@/components/sections/TestimonialBlock";
import CTABanner from "@/components/sections/CTABanner";
import FAQ from "@/components/sections/FAQ";
import PricingTransparency from "@/components/sections/PricingTransparency";
import { SITE, NAV_SOLUTIONS, NAV_INDUSTRIES, TRUST_SIGNALS } from "@/lib/config";
import SEO from "@/components/SEO";

const HERO_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663396807781/BUvnwzJnwMZHoEGpybj36j/hero-main_02a49aab.jpg";
const CONSULT_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663396807781/BUvnwzJnwMZHoEGpybj36j/team-consultation_77637e8d.jpg";
const ABSTRACT_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663396807781/BUvnwzJnwMZHoEGpybj36j/payment-abstract_ee7158df.jpg";

const whyUs = [
  { icon: Award, title: "20+ Years of Expertise", desc: "Josh Cornia and the UBC Unlimited team bring over two decades of merchant services experience to every client relationship." },
  { icon: Handshake, title: "Industry-Specific Solutions", desc: "We don't offer one-size-fits-all packages. Every setup is tailored to your specific industry and business needs." },
  { icon: MapPin, title: "Local Utah Support", desc: "Real people who know Utah business. Not a call center — your dedicated local rep who answers when you call." },
  { icon: Clock, title: "Fast Onboarding", desc: "Most businesses are approved and processing within 24–48 hours. We handle the setup so you can focus on your business." },
];

const howItWorks = [
  { step: "01", title: "Book a Consultation", desc: "Schedule a free, no-pressure conversation with a local Utah expert. We learn about your business and current setup." },
  { step: "02", title: "Statement Review", desc: "Submit your current processing statement. We analyze it line by line and show you exactly where you can save." },
  { step: "03", title: "Custom Proposal", desc: "We build a tailored solution with transparent, competitive pricing that fits your business type and volume." },
  { step: "04", title: "Seamless Setup & Support", desc: "Our local team handles everything — equipment, training, and integration. Ongoing support from a team that knows your name." },
];

const homeFAQ = [
  {
    question: "What makes UBC Unlimited different from other processors?",
    answer: "Better service, industry-specific expertise, and local support. With 20+ years in the industry and a wide range of partner relationships, we can tailor solutions to individual needs — something a national call center simply can't do."
  },
  {
    question: "How long does it take to get set up?",
    answer: "Most low-risk businesses are approved within 24–48 hours and can be approved as quickly as same day. Lead time for most POS system installations requires at least 14 days from complete paperwork submission."
  },
  {
    question: "Do you offer month-to-month agreements?",
    answer: "Yes, in most situations we offer a month-to-month agreement because we believe you must set yourself apart with service. We do have certain products that require agreements due to solution requirements, and we do our best to minimize the impact in those situations."
  },
  {
    question: "What types of businesses do you serve?",
    answer: "We serve a wide range of businesses including restaurants, retail, medical, automotive, salons, eCommerce, professional services, and more. We can also service medium and high-risk businesses, though those are evaluated on a case-by-case basis. If you accept payments, reach out and we'll find a solution that works for you."
  },
  {
    question: "Is the statement review really free?",
    answer: "Yes, completely free with no obligation. We analyze your current statement, identify overcharges, and present a comparison. You decide if it makes sense to switch."
  },
  {
    question: "Do you work with SkyTab POS systems?",
    answer: "Yes — UBC Unlimited is an authorized SkyTab reseller in Utah. SkyTab is one of the most powerful POS systems available for restaurants and bars, and we provide full local installation and support."
  },
];

const recentPosts = [
  { slug: "how-to-lower-credit-card-processing-fees", title: "How to Lower Your Credit Card Processing Fees in 2025", category: "Pricing & Fees", date: "Jan 15, 2025" },
  { slug: "best-pos-systems-utah-restaurants-2025", title: "Best POS Systems for Utah Restaurants in 2025", category: "POS Systems", date: "Feb 1, 2025" },
  { slug: "interchange-plus-vs-flat-rate-pricing", title: "Interchange-Plus vs. Flat-Rate Pricing: Which Is Better?", category: "Credit Card Processing", date: "Jan 22, 2025" },
];

const BUSINESS_TYPES = [
  "Restaurant / Bar",
  "Retail Store",
  "Medical / Healthcare",
  "Automotive",
  "eCommerce",
  "Professional Services",
  "Salon / Spa",
  "High-Risk Business",
  "Other",
];

export default function Home() {
  const [heroName, setHeroName] = useState("");
  const [heroPhone, setHeroPhone] = useState("");
  const [heroType, setHeroType] = useState("");
  const [heroSubmitted, setHeroSubmitted] = useState(false);
  const [heroError, setHeroError] = useState("");
  const [heroAgreed, setHeroAgreed] = useState(false);

  const heroMutation = trpc.forms.submitHeroLead.useMutation({
    onSuccess: () => {
      setHeroSubmitted(true);
      setHeroError("");
    },
    onError: () => {
      setHeroError("Something went wrong. Please call us directly.");
    },
  });

  const handleHeroSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!heroName.trim() || !heroPhone.trim() || !heroType) {
      setHeroError("Please fill in all three fields.");
      return;
    }
    if (!heroAgreed) {
      setHeroError("Please accept the Privacy Policy and Terms of Service to continue.");
      return;
    }
    setHeroError("");
    heroMutation.mutate({ name: heroName.trim(), phone: heroPhone.trim(), businessType: heroType });
  };

  return (
    <PageLayout>
      <SEO
        canonical="/"
        description="Utah merchant services provider. Credit card processing, cash discounting, SkyTab POS, ACH payments. Serving Salt Lake City, Provo & statewide. Free statement review."
        schema={[
          {
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "@id": "https://ubcunlimited.com/#business",
            "name": "UBC Unlimited",
            "alternateName": "UBC Unlimited Merchant Services",
            "description": "Utah merchant services provider offering credit card processing, POS systems, ACH payments, cash discounting, and payment gateway solutions for businesses across Utah.",
            "url": "https://ubcunlimited.com",
            "telephone": "+18014576500",
            "email": "sales@ubcunlimited.com",
            "logo": "https://d2xsxph8kpxj0f.cloudfront.net/310519663396807781/BUvnwzJnwMZHoEGpybj36j/og-image-main-7CEjeR5kzdsRUjBNtKwoS8.png",
            "image": "https://d2xsxph8kpxj0f.cloudfront.net/310519663396807781/BUvnwzJnwMZHoEGpybj36j/og-image-main-7CEjeR5kzdsRUjBNtKwoS8.png",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Salt Lake City",
              "addressRegion": "UT",
              "postalCode": "84101",
              "addressCountry": "US"
            },
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": 40.7608,
              "longitude": -111.8910
            },
            "areaServed": {
              "@type": "State",
              "name": "Utah"
            },
            "openingHoursSpecification": [
              {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday"],
                "opens": "08:00",
                "closes": "18:00"
              }
            ],
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": "Merchant Services",
              "itemListElement": [
                {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Credit Card Processing"}},
                {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Cash Discounting & Dual Pricing"}},
                {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "POS Systems"}},
                {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "ACH & eCheck Processing"}},
                {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "High-Risk Merchant Accounts"}},
                {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "eCommerce Payment Gateway"}}
              ]
            },
            "priceRange": "$$",
            "foundingDate": "2004",
            "founder": {
              "@type": "Person",
              "name": "Josh Cornia"
            },
            "sameAs": []
          },
          {
            "@context": "https://schema.org",
            "@type": "WebSite",
            "@id": "https://ubcunlimited.com/#website",
            "url": "https://ubcunlimited.com",
            "name": "UBC Unlimited",
            "description": "Utah merchant services — credit card processing, POS systems, cash discounting, and payment solutions for Utah businesses.",
            "publisher": {"@id": "https://ubcunlimited.com/#business"},
            "potentialAction": {
              "@type": "SearchAction",
              "target": {"@type": "EntryPoint", "urlTemplate": "https://ubcunlimited.com/blog?q={search_term_string}"},
              "query-input": "required name=search_term_string"
            }
          }
        ]}
      />
      {/* Hero */}
      <section className="relative min-h-[92vh] flex items-center overflow-hidden bg-[#080808]">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url(${HERO_IMG})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#080808] via-[#080808]/85 to-[#080808]/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-transparent" />

        <div className="container relative z-10 py-16 pb-20">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            {/* Left column — headline + stats + CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="stat-badge mb-4">Utah's Local Merchant Services Experts</div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-4 leading-tight" style={{ fontFamily: 'DM Serif Display, Georgia, serif' }}>
                Smarter POS &amp; Payment Solutions
                <br />
                <span className="gradient-text">With Local Expertise</span>
              </h1>
              <p className="text-white/70 text-base md:text-lg mb-3 leading-relaxed">
                {SITE.tagline}
              </p>
              <p className="text-white/55 text-sm mb-5 leading-relaxed">
                Competitive pricing, fast onboarding, and industry-specific solutions — backed by {SITE.yearsInBusiness} years of experience and a team that knows Utah business.
              </p>
              {/* Stats row — hidden on mobile to keep hero compact; form takes priority */}
              <div className="hidden sm:grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                {TRUST_SIGNALS.map((s) => (
                  <div key={s.label} className="glass-card rounded-xl p-3 text-center">
                    <div className="text-xl font-extrabold text-[#c9a84c] mb-0.5" style={{ fontFamily: 'DM Serif Display, Georgia, serif' }}>{s.value}</div>
                    <div className="text-white/55 text-xs leading-tight">{s.label}</div>
                  </div>
                ))}
              </div>
              <div className="hidden sm:flex flex-col sm:flex-row gap-3 mb-5">
                <Link href="/consultation" className="btn-gold text-sm py-2.5 px-6 justify-center">
                  Book a Consultation <ArrowRight size={16} />
                </Link>
                <Link href="/industries" className="btn-outline-white text-sm py-2.5 px-6 justify-center opacity-80 hover:opacity-100">
                  See Industries We Serve
                </Link>
              </div>
              <div className="hidden sm:flex flex-wrap gap-4">
                {["Competitive pricing", "Fast onboarding", "Local expertise", "Tailored setups"].map((item) => (
                  <div key={item} className="flex items-center gap-1.5 text-sm text-white/60">
                    <CheckCircle size={14} className="text-[#c9a84c]" />
                    {item}
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right column — lead capture form (always visible) */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {heroSubmitted ? (
                <div className="bg-[#c9a84c]/10 border border-[#c9a84c]/30 rounded-2xl px-8 py-10 text-center">
                  <CheckCircle size={40} className="text-[#c9a84c] mx-auto mb-4" />
                  <p className="text-white font-bold text-lg mb-2">We'll be in touch shortly!</p>
                  <p className="text-white/60 text-sm">Our team typically responds within one business hour. You can also call us directly at <a href="tel:+18013096988" className="text-[#c9a84c] hover:underline">(801) 309-6988</a>.</p>
                </div>
              ) : (
                <form onSubmit={handleHeroSubmit} aria-label="Request a consultation" className="bg-white/5 border border-white/10 rounded-2xl p-7 backdrop-blur-sm">
                  <p className="text-white font-bold text-lg mb-1">Request a Consultation</p>
                  <p className="text-white/50 text-sm mb-5">Tell us about your business and we'll reach out with a tailored solution — no obligation.</p>
                  <div className="space-y-3 mb-4">
                    <input
                      type="text"
                      placeholder="Your Name"
                      value={heroName}
                      onChange={(e) => setHeroName(e.target.value)}
                      className="w-full bg-white/10 border border-white/15 rounded-xl px-4 py-3 text-sm text-white placeholder-white/35 focus:outline-none focus:border-[#c9a84c]/60 transition-colors"
                      aria-label="Your name"
                    />
                    <input
                      type="tel"
                      placeholder="Phone Number"
                      value={heroPhone}
                      onChange={(e) => setHeroPhone(e.target.value)}
                      className="w-full bg-white/10 border border-white/15 rounded-xl px-4 py-3 text-sm text-white placeholder-white/35 focus:outline-none focus:border-[#c9a84c]/60 transition-colors"
                      aria-label="Phone number"
                    />
                    <select
                      value={heroType}
                      onChange={(e) => setHeroType(e.target.value)}
                      className="w-full bg-white/10 border border-white/15 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#c9a84c]/60 transition-colors appearance-none"
                      aria-label="Business type"
                    >
                      <option value="" disabled className="bg-[#1a1a1a]">Business Type</option>
                      {BUSINESS_TYPES.map((t) => (
                        <option key={t} value={t} className="bg-[#1a1a1a]">{t}</option>
                      ))}
                    </select>
                  </div>
                  {/* Acceptance checkbox */}
                  <label className="flex items-start gap-2.5 cursor-pointer mb-3">
                    <input
                      type="checkbox"
                      checked={heroAgreed}
                      onChange={(e) => {
                        setHeroAgreed(e.target.checked);
                        if (heroError.includes("Privacy")) setHeroError("");
                      }}
                      className="mt-0.5 w-4 h-4 rounded border-white/20 bg-white/10 accent-[#c9a84c] cursor-pointer flex-shrink-0"
                    />
                    <span className="text-white/40 text-[11px] leading-relaxed">
                      I agree to the{" "}
                      <Link href="/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-[#c9a84c] hover:underline" onClick={(e) => e.stopPropagation()}>Privacy Policy</Link>{" "}
                      and{" "}
                      <Link href="/terms-of-service" target="_blank" rel="noopener noreferrer" className="text-[#c9a84c] hover:underline" onClick={(e) => e.stopPropagation()}>Terms of Service</Link>.
                    </span>
                  </label>
                  {heroError && (
                    <p className="text-red-400 text-xs mb-3">{heroError}</p>
                  )}
                  <button
                    type="submit"
                    disabled={heroMutation.isPending}
                    className="w-full btn-gold py-3 justify-center text-sm font-bold disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {heroMutation.isPending ? (
                      <><Loader2 size={15} className="animate-spin" /> Sending...</>
                    ) : (
                      <>Get Started <ArrowRight size={15} /></>
                    )}
                  </button>
                  <p className="text-white/30 text-xs text-center mt-4">No contracts. No pressure. Just honest advice from a local Utah team.</p>
                </form>
              )}
            </motion.div>
          </div>
        </div>

        {/* Bottom phone strip */}
        <div className="absolute bottom-0 left-0 right-0 bg-[#c9a84c]/10 border-t border-[#c9a84c]/20 backdrop-blur-sm">
          <div className="container py-3 flex flex-col sm:flex-row items-center justify-between gap-2">
            <span className="text-white/60 text-sm">Questions? Talk to a local Utah expert today.</span>
            <a href={SITE.phoneHref} className="flex items-center gap-2 text-[#c9a84c] font-bold text-sm hover:text-[#e2c97e] transition-colors">
              <Phone size={14} /> {SITE.phone}
            </a>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <TrustBadges dark={false} />

      {/* Stats bar */}
      <div className="bg-[#080808] py-10 border-t border-white/5">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {TRUST_SIGNALS.map((s) => (
              <div key={s.label}>
                <div className="text-3xl font-extrabold text-[#c9a84c] mb-1" style={{ fontFamily: 'DM Serif Display, Georgia, serif' }}>{s.value}</div>
                <div className="text-white/50 text-sm">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Solutions */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="text-center mb-10">
            <div className="teal-divider mx-auto mb-4" />
            <h2 className="text-3xl md:text-4xl font-bold text-[#080808] mb-3" style={{ fontFamily: 'DM Serif Display, Georgia, serif' }}>
              Payment Solutions for Every Business
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto text-sm">
              From credit card processing to full POS systems — tailored to your industry, backed by local Utah expertise.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {NAV_SOLUTIONS.map((sol) => (
              <Link
                key={sol.href}
                href={sol.href}
                className="group p-5 rounded-xl border border-gray-100 hover:border-[#c9a84c]/30 hover:shadow-lg transition-all bg-white"
              >
                <div className="text-2xl mb-3">{sol.icon}</div>
                <div className="font-semibold text-sm text-[#080808] group-hover:text-[#c9a84c] transition-colors mb-1">
                  {sol.label}
                </div>
                <div className="text-xs text-gray-400 leading-snug mb-2">{sol.desc}</div>
                <div className="flex items-center gap-1 text-xs text-[#c9a84c] opacity-0 group-hover:opacity-100 transition-opacity">
                  Learn more <ChevronRight size={12} />
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/solutions" className="btn-outline-teal text-sm py-2.5 px-6">
              View All Solutions <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-[#f7f3ec]">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="teal-divider mb-5" />
              <h2 className="text-3xl md:text-4xl font-bold text-[#080808] mb-4" style={{ fontFamily: 'DM Serif Display, Georgia, serif' }}>
                Better Service. Industry Specific. Local Support.
              </h2>
              <p className="text-gray-500 mb-8 text-sm leading-relaxed">
                With {SITE.yearsInBusiness} years in the industry and a wide range of partner relationships, {SITE.founder} and the UBC Unlimited team can tailor solutions to your individual needs — something a national call center simply can't do.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {whyUs.map((item) => (
                  <div key={item.title} className="flex gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#c9a84c]/10 flex items-center justify-center shrink-0">
                      <item.icon size={20} className="text-[#c9a84c]" />
                    </div>
                    <div>
                      <div className="font-semibold text-sm text-[#080808] mb-1">{item.title}</div>
                      <div className="text-xs text-gray-500 leading-relaxed">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-8">
                <Link href="/about" className="btn-teal text-sm py-2.5 px-6">
                  About UBC Unlimited <ArrowRight size={16} />
                </Link>
              </div>
            </div>
            <div className="relative">
              <img
                src={CONSULT_IMG}
                alt="UBC Unlimited merchant services consultant reviewing payment processing options with Utah business owner"
                className="rounded-2xl shadow-2xl w-full object-cover aspect-[4/3]"
              />
              <div className="absolute -bottom-4 -left-4 glass-card-light rounded-xl p-4 shadow-xl border border-[#c9a84c]/20">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#c9a84c] flex items-center justify-center">
                    <Star size={16} className="text-white fill-white" />
                  </div>
                  <div>
                    <div className="font-bold text-sm text-[#080808]">5-Star Rated</div>
                    <div className="text-xs text-gray-500">1000+ of Utah businesses served</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Industries */}
      <section className="py-16 bg-[#080808]">
        <div className="container">
          <div className="text-center mb-10">
            <div className="teal-divider mx-auto mb-4" />
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-3" style={{ fontFamily: 'DM Serif Display, Georgia, serif' }}>
              Industry-Specific Solutions
            </h2>
            <p className="text-white/50 max-w-xl mx-auto text-sm">
              We specialize in restaurants, service companies, and businesses across the Wasatch Front — with solutions tailored to how your industry actually operates.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 mb-8">
            {NAV_INDUSTRIES.map((ind) => (
              <Link
                key={ind.href}
                href={ind.href}
                className="group glass-card rounded-xl p-4 text-center hover:bg-white/10 transition-all"
              >
                <div className="text-2xl mb-2">{ind.icon}</div>
                <div className="font-medium text-xs text-white/80 group-hover:text-white transition-colors">{ind.label}</div>
              </Link>
            ))}
          </div>
          <div className="text-center">
            <Link href="/industries" className="btn-outline-white text-sm py-2.5 px-6">
              See Industries We Serve <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <TestimonialBlock />

      {/* How It Works */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="text-center mb-10">
            <div className="teal-divider mx-auto mb-4" />
            <h2 className="text-3xl md:text-4xl font-bold text-[#080808] mb-3" style={{ fontFamily: 'DM Serif Display, Georgia, serif' }}>
              How It Works
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto text-sm">
              Getting started is simple. Our local team handles everything so you can focus on running your business.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {howItWorks.map((step, i) => (
              <div key={step.step} className="relative">
                {i < howItWorks.length - 1 && (
                  <div className="hidden lg:block absolute top-6 left-full w-full h-px bg-gradient-to-r from-[#c9a84c]/30 to-transparent z-0" />
                )}
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-full bg-[#c9a84c]/10 border-2 border-[#c9a84c]/20 flex items-center justify-center mb-4">
                    <span className="text-[#c9a84c] font-bold text-sm">{step.step}</span>
                  </div>
                  <h3 className="font-bold text-[#080808] mb-2 text-sm">{step.title}</h3>
                  <p className="text-gray-500 text-xs leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/consultation" className="btn-teal py-3 px-8">
              Book a Consultation <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Pricing Transparency */}
      <PricingTransparency />

      {/* Blog Preview */}
      <section className="py-16 bg-[#f7f3ec]">
        <div className="container">
          <div className="flex items-end justify-between mb-8">
            <div>
              <div className="teal-divider mb-4" />
              <h2 className="text-2xl md:text-3xl font-bold text-[#080808]" style={{ fontFamily: 'DM Serif Display, Georgia, serif' }}>
                News &amp; Updates
              </h2>
              <p className="text-gray-500 text-sm mt-1">Expert insights for Utah businesses</p>
            </div>
            <Link href="/blog" className="hidden sm:flex items-center gap-1 text-[#c9a84c] text-sm font-medium hover:underline">
              View all posts <ChevronRight size={14} />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {recentPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group bg-white rounded-xl border border-gray-100 hover:border-[#c9a84c]/30 hover:shadow-lg transition-all p-5"
              >
                <div className="text-xs text-[#c9a84c] font-medium mb-2">{post.category}</div>
                <h3 className="font-bold text-[#080808] text-sm leading-snug mb-3 group-hover:text-[#c9a84c] transition-colors">
                  {post.title}
                </h3>
                <div className="text-xs text-gray-400">{post.date}</div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-6 sm:hidden">
            <Link href="/blog" className="btn-outline-teal text-sm py-2.5 px-6">
              View All Posts <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-white">
        <div className="container max-w-3xl">
          <div className="text-center mb-10">
            <div className="teal-divider mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-[#080808] mb-3" style={{ fontFamily: 'DM Serif Display, Georgia, serif' }}>
              FAQ's
            </h2>
          </div>
          <FAQ items={homeFAQ} />
        </div>
      </section>

      {/* Service Area — Counties & Cities */}
      <section className="bg-[#111] py-14 border-t border-white/5">
        <div className="container">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-[#c9a84c]/10 border border-[#c9a84c]/30 text-[#c9a84c] text-xs font-semibold uppercase tracking-widest px-4 py-2 rounded-full mb-4">
              <MapPin size={12} /> Statewide Coverage
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-3" style={{ fontFamily: "DM Serif Display, Georgia, serif" }}>
              Serving Businesses Across All of Utah
            </h2>
            <p className="text-white/55 max-w-xl mx-auto text-sm">
              From Salt Lake City to rural communities — our local Utah team provides merchant services and payment processing in every county and city across the state.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* Counties card */}
            <Link href="/counties" className="group block bg-white/5 hover:bg-[#c9a84c]/8 border border-white/10 hover:border-[#c9a84c]/30 rounded-2xl p-6 transition-all">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-[#c9a84c]/15 flex items-center justify-center">
                  <MapPin size={18} className="text-[#c9a84c]" />
                </div>
                <div>
                  <div className="text-white font-bold text-base group-hover:text-[#c9a84c] transition-colors">Browse by County</div>
                  <div className="text-white/45 text-xs">All 29 Utah counties covered</div>
                </div>
              </div>
              <p className="text-white/55 text-sm mb-4 leading-relaxed">
                Find dedicated service information for your county — including local industry insights, featured cities, and tailored solutions for your area.
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                {["Salt Lake", "Utah", "Davis", "Weber", "Washington", "Cache"].map((c) => (
                  <span key={c} onClick={(e) => { e.preventDefault(); e.stopPropagation(); window.location.href = `/counties/${c.toLowerCase().replace(" ", "-")}`; }} className="text-xs text-white/55 bg-white/5 hover:bg-[#c9a84c]/15 border border-white/10 hover:border-[#c9a84c]/30 px-3 py-1 rounded-full transition-colors cursor-pointer">
                    {c} County
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-1 text-[#c9a84c] text-xs font-semibold">
                View all counties <ArrowRight size={11} />
              </div>
            </Link>
            {/* Cities card */}
            <Link href="/cities" className="group block bg-white/5 hover:bg-[#c9a84c]/8 border border-white/10 hover:border-[#c9a84c]/30 rounded-2xl p-6 transition-all">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-[#c9a84c]/15 flex items-center justify-center">
                  <Users size={18} className="text-[#c9a84c]" />
                </div>
                <div>
                  <div className="text-white font-bold text-base group-hover:text-[#c9a84c] transition-colors">Browse by City</div>
                  <div className="text-white/45 text-xs">20+ featured Utah cities</div>
                </div>
              </div>
              <p className="text-white/55 text-sm mb-4 leading-relaxed">
                Find merchant services information specific to your city — or use our city finder to request a consultation if your city isn't listed.
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                {["Salt Lake City", "Provo", "Ogden", "St. George", "Lehi", "Sandy"].map((c) => (
                  <span key={c} onClick={(e) => { e.preventDefault(); e.stopPropagation(); window.location.href = `/cities/${c.toLowerCase().replace(/[. ]/g, "-").replace(/--/g, "-")}`; }} className="text-xs text-white/55 bg-white/5 hover:bg-[#c9a84c]/15 border border-white/10 hover:border-[#c9a84c]/30 px-3 py-1 rounded-full transition-colors cursor-pointer">
                    {c}
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-1 text-[#c9a84c] text-xs font-semibold">
                View all cities <ArrowRight size={11} />
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <CTABanner />

      {/* Sticky Mobile CTA Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-[#080808] border-t border-[#c9a84c]/20 shadow-2xl">
        <div className="flex">
          <a
            href={SITE.phoneHref}
            className="flex-1 flex items-center justify-center gap-2 py-3.5 text-sm font-semibold text-white bg-[#111111] hover:bg-[#1a1a1a] transition-colors border-r border-white/10"
          >
            <Phone size={15} /> Call Now
          </a>
          <Link
            href="/consultation"
            className="flex-1 flex items-center justify-center gap-2 py-3.5 text-sm font-semibold text-white bg-[#c9a84c] hover:bg-[#e2c97e] transition-colors"
          >
            Book a Consultation <ArrowRight size={15} />
          </Link>
        </div>
      </div>
      {/* Bottom padding for sticky bar on mobile */}
      <div className="h-14 md:hidden" />
    </PageLayout>
  );
}

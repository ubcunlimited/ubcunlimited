import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle, Phone, TrendingDown, Shield, Clock, Users, Star, ChevronRight, MapPin, Award, Handshake } from "lucide-react";
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
  { step: "02", title: "Free Statement Review", desc: "Submit your current processing statement. We analyze it line by line and show you exactly where you can save." },
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

export default function Home() {
  // The userAuth hooks provides authentication state
  // To implement login/logout functionality, simply call logout() or redirect to getLoginUrl()
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

        <div className="container relative z-10 py-20">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="stat-badge mb-5">Utah's Local Merchant Services Experts</div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-5 leading-tight" style={{ fontFamily: 'DM Serif Display, Georgia, serif' }}>
                Smarter POS &amp; Payment Solutions
                <br />
                <span className="gradient-text">With Local Expertise</span>
              </h1>
              <p className="text-white/70 text-lg md:text-xl mb-3 leading-relaxed max-w-xl">
                {SITE.tagline}
              </p>
              <p className="text-white/55 text-base mb-8 leading-relaxed max-w-xl">
                Competitive pricing, fast onboarding, and industry-specific solutions — backed by {SITE.yearsInBusiness} years of experience and a team that knows Utah business.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-10">
                <Link href="/consultation" className="btn-gold text-base py-3.5 px-8 justify-center">
                  Book a Consultation <ArrowRight size={18} />
                </Link>
                <Link href="/industries" className="btn-outline-white text-base py-3.5 px-8 justify-center">
                  See Industries We Serve
                </Link>
              </div>
              <div className="flex flex-wrap gap-4">
                {["Competitive pricing", "Fast onboarding", "Local expertise", "Tailored setups"].map((item) => (
                  <div key={item} className="flex items-center gap-1.5 text-sm text-white/60">
                    <CheckCircle size={14} className="text-[#c9a84c]" />
                    {item}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Floating stats */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="hidden lg:grid grid-cols-2 gap-3 absolute right-0 top-1/2 -translate-y-1/2 w-64"
          >
            {TRUST_SIGNALS.map((s) => (
              <div key={s.label} className="glass-card rounded-xl p-4 text-center">
                <div className="text-2xl font-extrabold text-[#c9a84c] mb-1" style={{ fontFamily: 'DM Serif Display, Georgia, serif' }}>{s.value}</div>
                <div className="text-white/60 text-xs">{s.label}</div>
              </div>
            ))}
          </motion.div>
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
              Book a Free Consultation <ArrowRight size={16} />
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

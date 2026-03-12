import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle, Phone, TrendingDown, Shield, Clock, Users, Star, ChevronRight } from "lucide-react";
import PageLayout from "@/components/layout/PageLayout";
import TrustBadges from "@/components/sections/TrustBadges";
import TestimonialBlock from "@/components/sections/TestimonialBlock";
import CTABanner from "@/components/sections/CTABanner";
import FAQ from "@/components/sections/FAQ";
import { SITE, NAV_SOLUTIONS, NAV_INDUSTRIES } from "@/lib/config";

const HERO_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663396807781/BUvnwzJnwMZHoEGpybj36j/hero-main_02a49aab.jpg";
const CONSULT_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663396807781/BUvnwzJnwMZHoEGpybj36j/team-consultation_77637e8d.jpg";
const ABSTRACT_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663396807781/BUvnwzJnwMZHoEGpybj36j/payment-abstract_ee7158df.jpg";

const stats = [
  { value: "500+", label: "Utah Businesses Served" },
  { value: "24/7", label: "Local Support" },
  { value: "30%", label: "Avg. Savings" },
  { value: "1 Day", label: "Approval Time" },
];

const whyUs = [
  { icon: TrendingDown, title: "Lower Rates", desc: "Interchange-plus pricing with no hidden fees. We show you exactly what you pay." },
  { icon: Shield, title: "PCI Compliant", desc: "Bank-grade security and full PCI DSS compliance to protect your business and customers." },
  { icon: Users, title: "Local Utah Team", desc: "Real people who know Utah business. Not a call center — your dedicated local rep." },
  { icon: Clock, title: "24/7 Support", desc: "Technical issues don't wait for business hours. Neither do we." },
];

const howItWorks = [
  { step: "01", title: "Free Statement Review", desc: "Submit your current processing statement. We analyze it for free and show you exactly where you're overpaying." },
  { step: "02", title: "Custom Proposal", desc: "We build a tailored solution with transparent pricing that fits your business type and volume." },
  { step: "03", title: "Seamless Setup", desc: "Our local team handles everything — equipment, training, and integration. Same-day approval available." },
  { step: "04", title: "Ongoing Support", desc: "Your dedicated rep is always available. Monthly reviews ensure you're always getting the best rates." },
];

const homeFAQ = [
  { question: "How much can I save by switching to UBC Unlimited?", answer: "Most Utah businesses save between 20–40% on their monthly processing costs. Our free statement review will show you exactly how much you can save before you commit to anything." },
  { question: "How long does it take to get set up?", answer: "Most businesses are approved and processing within 24–48 hours. POS hardware installations are typically completed within 3–5 business days." },
  { question: "Do you charge cancellation fees?", answer: "We believe in earning your business every month. We offer flexible month-to-month agreements with no long-term lock-in contracts." },
  { question: "What types of businesses do you serve?", answer: "We serve all types of Utah businesses — restaurants, retail, medical, automotive, salons, eCommerce, and more. If you accept payments, we can help." },
  { question: "Is the statement review really free?", answer: "Yes, completely free with no obligation. We analyze your current statement, identify overcharges, and present a comparison. You decide if it makes sense to switch." },
];

export default function Home() {
  return (
    <PageLayout>
      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-[#040c1c]">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-25"
          style={{ backgroundImage: `url(${HERO_IMG})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#040c1c] via-[#040c1c]/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#040c1c] via-transparent to-transparent" />

        <div className="container relative z-10 py-20">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="stat-badge mb-5">Utah's Local Merchant Services Experts</div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-5 leading-tight" style={{ fontFamily: 'Sora, sans-serif' }}>
                Accept Payments
                <br />
                <span className="gradient-text">Smarter & Cheaper</span>
              </h1>
              <p className="text-white/70 text-lg md:text-xl mb-8 leading-relaxed max-w-xl">
                Utah's trusted local merchant services provider. Lower rates, better technology, and real human support — from a team that actually knows your business.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-10">
                <Link href="/consultation" className="btn-gold text-base py-3.5 px-8 justify-center">
                  Get a Free Quote <ArrowRight size={18} />
                </Link>
                <Link href="/statement-review" className="btn-outline-white text-base py-3.5 px-8 justify-center">
                  Free Statement Review
                </Link>
              </div>
              <div className="flex flex-wrap gap-4">
                {["No hidden fees", "Month-to-month", "Same-day approval", "Local Utah team"].map((item) => (
                  <div key={item} className="flex items-center gap-1.5 text-sm text-white/60">
                    <CheckCircle size={14} className="text-[#169fa8]" />
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
            {stats.map((s) => (
              <div key={s.label} className="glass-card rounded-xl p-4 text-center">
                <div className="text-2xl font-extrabold text-[#169fa8] mb-1" style={{ fontFamily: 'Sora, sans-serif' }}>{s.value}</div>
                <div className="text-white/60 text-xs">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Phone CTA bar */}
        <div className="absolute bottom-0 left-0 right-0 bg-[#169fa8]/10 border-t border-[#169fa8]/20 backdrop-blur-sm">
          <div className="container py-3 flex flex-col sm:flex-row items-center justify-between gap-2">
            <span className="text-white/60 text-sm">Questions? Talk to a local expert today.</span>
            <a href={SITE.phoneHref} className="flex items-center gap-2 text-[#d4a843] font-bold text-sm hover:text-[#e8c06a] transition-colors">
              <Phone size={14} /> {SITE.phone}
            </a>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <TrustBadges dark={false} />

      {/* Stats bar */}
      <div className="bg-[#040c1c] py-10">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {stats.map((s) => (
              <div key={s.label}>
                <div className="text-3xl font-extrabold text-[#169fa8] mb-1" style={{ fontFamily: 'Sora, sans-serif' }}>{s.value}</div>
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
            <h2 className="text-3xl md:text-4xl font-bold text-[#040c1c] mb-3" style={{ fontFamily: 'Sora, sans-serif' }}>
              Payment Solutions for Every Business
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              From credit card processing to full POS systems, we have everything your Utah business needs to accept payments.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {NAV_SOLUTIONS.map((sol) => (
              <Link
                key={sol.href}
                href={sol.href}
                className="group p-5 rounded-xl border border-gray-100 hover:border-[#169fa8]/30 hover:shadow-lg transition-all bg-white"
              >
                <div className="text-2xl mb-3">{sol.icon}</div>
                <div className="font-semibold text-sm text-[#040c1c] group-hover:text-[#169fa8] transition-colors mb-1" style={{ fontFamily: 'Sora, sans-serif' }}>
                  {sol.label}
                </div>
                <div className="flex items-center gap-1 text-xs text-[#169fa8] opacity-0 group-hover:opacity-100 transition-opacity">
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
      <section className="py-16 bg-[#f8fafc]">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="teal-divider mb-5" />
              <h2 className="text-3xl md:text-4xl font-bold text-[#040c1c] mb-4" style={{ fontFamily: 'Sora, sans-serif' }}>
                Why Utah Businesses Choose UBC Unlimited
              </h2>
              <p className="text-gray-500 mb-8">
                We're not a national call center. We're your local Utah merchant services partner — with real people, real savings, and real accountability.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {whyUs.map((item) => (
                  <div key={item.title} className="flex gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#169fa8]/10 flex items-center justify-center shrink-0">
                      <item.icon size={20} className="text-[#169fa8]" />
                    </div>
                    <div>
                      <div className="font-semibold text-sm text-[#040c1c] mb-1" style={{ fontFamily: 'Sora, sans-serif' }}>{item.title}</div>
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
                alt="UBC Unlimited team consultation with Utah business owner"
                className="rounded-2xl shadow-2xl w-full object-cover aspect-[4/3]"
              />
              <div className="absolute -bottom-4 -left-4 glass-card-light rounded-xl p-4 shadow-xl border border-[#169fa8]/20">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#169fa8] flex items-center justify-center">
                    <Star size={16} className="text-white fill-white" />
                  </div>
                  <div>
                    <div className="font-bold text-sm text-[#040c1c]">5-Star Rated</div>
                    <div className="text-xs text-gray-500">500+ Utah businesses</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Industries */}
      <section className="py-16 bg-[#040c1c]">
        <div className="container">
          <div className="text-center mb-10">
            <div className="teal-divider mx-auto mb-4" />
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-3" style={{ fontFamily: 'Sora, sans-serif' }}>
              Built for Your Industry
            </h2>
            <p className="text-white/50 max-w-xl mx-auto">
              Every industry has unique payment needs. We specialize in solutions tailored to how your business actually works.
            </p>
          </div>
          <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-9 gap-3">
            {NAV_INDUSTRIES.map((ind) => (
              <Link
                key={ind.href}
                href={ind.href}
                className="group flex flex-col items-center gap-2 p-3 rounded-xl border border-white/10 hover:border-[#169fa8]/40 hover:bg-white/5 transition-all text-center"
              >
                <span className="text-2xl">{ind.icon}</span>
                <span className="text-white/60 group-hover:text-white text-xs font-medium transition-colors leading-tight">{ind.label}</span>
              </Link>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/industries" className="btn-outline-white text-sm py-2.5 px-6">
              View All Industries <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <div className="teal-divider mx-auto mb-4" />
            <h2 className="text-3xl md:text-4xl font-bold text-[#040c1c] mb-3" style={{ fontFamily: 'Sora, sans-serif' }}>
              How It Works
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              Getting started with UBC Unlimited is simple. Most businesses are up and running within 24 hours.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {howItWorks.map((step, i) => (
              <div key={step.step} className="relative">
                {i < howItWorks.length - 1 && (
                  <div className="hidden lg:block absolute top-6 left-full w-full h-px bg-gradient-to-r from-[#169fa8]/30 to-transparent -translate-x-4 z-0" />
                )}
                <div className="relative z-10">
                  <div className="text-4xl font-extrabold text-[#169fa8]/20 mb-3" style={{ fontFamily: 'Sora, sans-serif' }}>{step.step}</div>
                  <h3 className="font-bold text-[#040c1c] mb-2" style={{ fontFamily: 'Sora, sans-serif' }}>{step.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/consultation" className="btn-teal text-sm py-3 px-8">
              Start Your Free Review <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Abstract section */}
      <section className="relative py-20 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${ABSTRACT_IMG})` }}
        />
        <div className="absolute inset-0 bg-[#040c1c]/85" />
        <div className="container relative z-10 text-center">
          <div className="teal-divider mx-auto mb-5" />
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4" style={{ fontFamily: 'Sora, sans-serif' }}>
            Powering Utah's Payment Infrastructure
          </h2>
          <p className="text-white/60 max-w-xl mx-auto mb-8">
            From Salt Lake City to St. George, we connect Utah businesses to the payment networks that keep commerce moving.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
            {[
              { v: "$50M+", l: "Processed Monthly" },
              { v: "99.9%", l: "Uptime Guarantee" },
              { v: "256-bit", l: "Encryption" },
              { v: "< 2s", l: "Transaction Speed" },
            ].map((s) => (
              <div key={s.l} className="glass-card rounded-xl p-4 text-center">
                <div className="text-xl font-extrabold text-[#169fa8] mb-1" style={{ fontFamily: 'Sora, sans-serif' }}>{s.v}</div>
                <div className="text-white/50 text-xs">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <TestimonialBlock dark={false} />

      {/* FAQ */}
      <FAQ items={homeFAQ} title="Common Questions" subtitle="Everything you need to know about switching to UBC Unlimited" />

      {/* CTA */}
      <CTABanner />
    </PageLayout>
  );
}

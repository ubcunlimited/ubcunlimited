import { Link } from "wouter";
import { ArrowRight, Award, Users, MapPin, Handshake, CheckCircle, Star } from "lucide-react";
import PageLayout from "@/components/layout/PageLayout";
import CTABanner from "@/components/sections/CTABanner";
import TestimonialBlock from "@/components/sections/TestimonialBlock";
import { SITE, TRUST_SIGNALS } from "@/lib/config";
import SEO from "@/components/SEO";

const CONSULT_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663396807781/BUvnwzJnwMZHoEGpybj36j/team-consultation_39f98a43.webp";
const TERMINAL_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663396807781/BUvnwzJnwMZHoEGpybj36j/hero-main-v2_1e6bdb8d.webp";
const ABSTRACT_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663396807781/BUvnwzJnwMZHoEGpybj36j/payment-abstract-v2_b990fdb5.webp";

const values = [
  {
    icon: Award,
    title: "Set Yourself Apart with Service",
    desc: "Our core value isn't a slogan — it's the standard we hold ourselves to every day. We believe the best way to earn your business is to out-serve everyone else in the room.",
  },
  {
    icon: Handshake,
    title: "Relationships Over Transactions",
    desc: "We're not here to sign you up and move on. We're here to build a long-term partnership that grows with your business.",
  },
  {
    icon: Users,
    title: "Industry-Specific Expertise",
    desc: "Restaurants, bars, retail, medical, automotive — every industry has unique needs. We've spent 20+ years learning them so we can give you advice that actually fits.",
  },
  {
    icon: MapPin,
    title: "Rooted in Utah",
    desc: "We're a local Utah business serving local Utah businesses. When you call, you reach someone who knows your market, your challenges, and your community.",
  },
];

const differentiators = [
  "Competitive pricing with transparent fee structures",
  "Fast onboarding — most accounts active within 24–48 hours (POS systems: 14-day lead time from approval)",
  "Local, dedicated support — not a national call center",
  "Tailored setups based on your industry and volume",
  "Industry-specific recommendations from real experience",
  "Access to a wide range of payment technology solutions",
  "Month-to-month agreements — no long-term lock-in*",
];

export default function About() {
  return (
    <PageLayout>
      <SEO
        title="About UBC Unlimited — Utah Merchant Services"
        description="UBC Unlimited — locally owned Utah merchant services. 20+ years of payment processing expertise. We help businesses eliminate fees & save money. Meet our team."
        canonical="/about"
      />
      {/* Hero */}
      <section className="relative py-20 bg-[#080808] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-10"
          style={{ backgroundImage: `url(${ABSTRACT_IMG})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#080808]/60 to-[#080808]" />
        <div className="container relative z-10 text-center max-w-3xl mx-auto">
          <div className="stat-badge mx-auto mb-5 inline-block">About UBC Unlimited</div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-5 leading-tight" style={{ fontFamily: 'DM Serif Display, Georgia, serif' }}>
            Set Yourself Apart<br />
            <span className="gradient-text">with Service</span>
          </h1>
          <p className="text-white/65 text-lg leading-relaxed">
            Utah's trusted local merchant services partner — built on {SITE.yearsInBusiness} years of experience, broad industry relationships, and an unwavering commitment to putting clients first.
          </p>
        </div>
      </section>

      {/* Stats */}
      <div className="bg-[#111111] border-y border-white/5">
        <div className="container py-8">
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

      {/* Founder Story */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="teal-divider mb-5" />
              <h2 className="text-3xl md:text-4xl font-bold text-[#080808] mb-4" style={{ fontFamily: 'DM Serif Display, Georgia, serif' }}>
                The UBC Unlimited Story
              </h2>
              <p className="text-gray-600 mb-5 leading-relaxed">
                UBC Unlimited was founded by <strong>{SITE.founder}</strong> on a simple but powerful belief: the value that matters most is to <em>set yourself apart with service</em>.
              </p>
              <p className="text-gray-600 mb-5 leading-relaxed">
                With {SITE.yearsInBusiness} years in the merchant services industry, {SITE.founder} built UBC Unlimited to give Utah businesses something they rarely find from a payment processor — a real partner who takes the time to understand your business before recommending anything.
              </p>
              <p className="text-gray-600 mb-5 leading-relaxed">
                That means industry-specific solutions, not one-size-fits-all packages. It means local support from someone who answers when you call. And it means honest, transparent pricing — because you deserve to know exactly what you're paying and why.
              </p>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Today, UBC Unlimited serves hundreds of Utah businesses — from restaurants and bars along the Wasatch Front to retail shops, medical offices, automotive dealers, and service companies across Salt Lake, Utah, Davis, and Weber counties.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link href="/consultation" className="btn-teal py-3 px-6">
                  Book a Consultation <ArrowRight size={16} />
                </Link>
                <Link href="/contact" className="btn-outline-teal py-3 px-6">
                  Get in Touch
                </Link>
              </div>
            </div>
            <div className="relative">
              <img
                src={TERMINAL_IMG}
                alt="Modern credit card terminal with Salt Lake City skyline — UBC Unlimited merchant services"
                className="rounded-2xl shadow-2xl w-full object-cover aspect-[4/3]"
              />
              <div className="absolute -bottom-4 -right-4 bg-white rounded-xl p-4 shadow-xl border border-[#c9a84c]/15">
                <div className="flex items-center gap-1 mb-1">
                  {[1,2,3,4,5].map(i => <Star key={i} size={13} className="text-[#c9a84c] fill-[#c9a84c]" />)}
                </div>
                <div className="font-bold text-sm text-[#080808]">{SITE.founder}</div>
                <div className="text-xs text-gray-500">Founder, UBC Unlimited</div>
                <div className="text-xs text-[#c9a84c] mt-1">{SITE.yearsInBusiness} Years in Merchant Services</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 bg-[#f7f3ec]">
        <div className="container">
          <div className="text-center mb-10">
            <div className="teal-divider mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-[#080808] mb-3" style={{ fontFamily: 'DM Serif Display, Georgia, serif' }}>
              What We Stand For
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto text-sm">
              These aren't just values on a wall — they're the principles that guide every client relationship and every recommendation we make.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {values.map((v) => (
              <div key={v.title} className="bg-white rounded-2xl p-6 border border-gray-100 hover:border-[#c9a84c]/20 hover:shadow-lg transition-all">
                <div className="w-12 h-12 rounded-xl bg-[#c9a84c]/10 flex items-center justify-center mb-4">
                  <v.icon size={22} className="text-[#c9a84c]" />
                </div>
                <h3 className="font-bold text-[#080808] mb-2">{v.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose UBC */}
      <section className="py-16 bg-[#080808]">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="teal-divider mb-5" />
              <h2 className="text-3xl font-bold text-white mb-4" style={{ fontFamily: 'DM Serif Display, Georgia, serif' }}>
                What Makes UBC Unlimited Different
              </h2>
              <p className="text-white/60 mb-8 text-sm leading-relaxed">
                Better service. Industry-specific expertise. Local support. These aren't marketing phrases — they're the three things every Utah business owner tells us they were missing before they found us.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {differentiators.map((item) => (
                  <div key={item} className="flex items-start gap-2.5">
                    <CheckCircle size={15} className="text-[#c9a84c] mt-0.5 shrink-0" />
                    <span className="text-white/70 text-sm">{item}</span>
                  </div>
                ))}
              </div>
              <p className="text-white/40 text-xs mt-4 leading-relaxed">
                * Month-to-month agreements apply to most standard accounts. Certain solutions or equipment financing programs may require a formal agreement with specific terms. All such terms will be clearly disclosed before you sign anything.
              </p>
            </div>
            <div className="glass-card rounded-2xl p-8">
              <div className="text-white/40 text-xs uppercase tracking-widest font-medium mb-6">Our Commitment to You</div>
              <div className="space-y-5">
                {[
                  { title: "Independent Advice", desc: "We evaluate your business needs first, then recommend the solution that fits — not the one that benefits us most." },
                  { title: "Transparent Pricing", desc: "No hidden fees, no surprise rate increases. You'll always know exactly what you're paying and why." },
                  { title: "Local Accountability", desc: "We're a Utah business serving Utah businesses. When you call, a real person who knows your account answers." },
                  { title: "Long-Term Partnership", desc: "Our goal isn't a one-time sale. We're here to grow with your business and adjust your setup as your needs change." },
                ].map((item) => (
                  <div key={item.title} className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#c9a84c] mt-2 shrink-0" />
                    <div>
                      <div className="text-white font-semibold text-sm mb-0.5">{item.title}</div>
                      <div className="text-white/60 text-sm leading-relaxed">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <TestimonialBlock />
      <CTABanner title="Ready to Work with a Local Partner?" subtitle="Join hundreds of Utah businesses who trust UBC Unlimited for their payment processing needs." />
    </PageLayout>
  );
}

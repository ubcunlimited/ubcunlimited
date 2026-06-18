import { Link } from "wouter";
import { CheckCircle, ArrowRight, Phone, Clock, FileText, Star } from "lucide-react";
import PageLayout from "@/components/layout/PageLayout";
import SEO from "@/components/SEO";
import { SITE } from "@/lib/config";

const HERO_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663396807781/BUvnwzJnwMZHoEGpybj36j/hero-thank-you-9yQwsCCDkHfmdSEfYPMs9N.webp";

const NEXT_STEPS = [
  {
    icon: Clock,
    title: "We'll reach out within 1 business hour",
    desc: "A local Utah payment specialist will review your request and contact you by phone or email — whichever you prefer.",
  },
  {
    icon: FileText,
    title: "Prepare your latest processing statement",
    desc: "If you have a recent merchant statement, having it handy lets us give you a precise savings estimate on your first call.",
  },
  {
    icon: Star,
    title: "We'll build a custom proposal",
    desc: "No generic packages. We'll tailor a solution to your business type, volume, and goals — and walk you through it line by line.",
  },
];

export default function ThankYou() {
  return (
    <PageLayout>
      <SEO
        title="Thank You — We'll Be in Touch"
        description="Your request has been received. A UBC Unlimited Utah payment specialist will contact you within 1 business hour to discuss your merchant services needs."
        canonical="/thank-you"
      />

      {/* Hero */}
      <section className="relative bg-[#080808] py-24 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${HERO_IMG})`, opacity: 0.15 }}
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#080808] via-[#080808]/85 to-[#080808]/40" aria-hidden="true" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-transparent" aria-hidden="true" />

        <div className="container relative z-10">
          <div className="max-w-2xl">
            {/* Success badge */}
            <div className="inline-flex items-center gap-2 bg-[#22c55e]/10 border border-[#22c55e]/30 rounded-full px-4 py-1.5 mb-6">
              <CheckCircle size={16} className="text-[#22c55e]" aria-hidden="true" />
              <span className="text-[#22c55e] text-sm font-semibold">Request Received</span>
            </div>

            <h1
              className="text-4xl md:text-5xl font-extrabold text-white mb-5"
              style={{ fontFamily: "Sora, sans-serif" }}
            >
              Thank You — We're On It
            </h1>
            <p className="text-white/70 text-lg mb-8 leading-relaxed">
              Your request has been submitted successfully. A local Utah merchant services specialist will
              review your information and reach out within <strong className="text-white">1 business hour</strong>.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href={SITE.phoneHref}
                className="btn-gold inline-flex items-center gap-2"
                aria-label={`Call UBC Unlimited at ${SITE.phone}`}
              >
                <Phone size={16} aria-hidden="true" />
                Call Us Now: {SITE.phone}
              </a>
              <Link href="/" className="btn-outline-white inline-flex items-center gap-2">
                Back to Home <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Next Steps */}
      <section className="py-16 bg-white" aria-labelledby="next-steps-heading">
        <div className="container">
          <div className="text-center mb-10">
            <div className="teal-divider mx-auto mb-4" aria-hidden="true" />
            <h2
              id="next-steps-heading"
              className="text-3xl font-bold text-[#080808]"
              style={{ fontFamily: "Sora, sans-serif" }}
            >
              What Happens Next
            </h2>
            <p className="text-gray-600 mt-2 max-w-xl mx-auto">
              Here's exactly what to expect after submitting your request.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {NEXT_STEPS.map((step, i) => (
              <div
                key={step.title}
                className="p-6 rounded-xl border border-gray-100 hover:border-[#c9a84c]/30 hover:shadow-md transition-all"
              >
                <div className="w-10 h-10 rounded-lg bg-[#c9a84c]/10 flex items-center justify-center mb-4" aria-hidden="true">
                  <step.icon size={20} className="text-[#c9a84c]" />
                </div>
                <div className="text-xs font-bold text-[#c9a84c] uppercase tracking-wider mb-2">
                  Step {i + 1}
                </div>
                <h3
                  className="font-bold text-[#080808] mb-2"
                  style={{ fontFamily: "Sora, sans-serif" }}
                >
                  {step.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Secondary CTAs */}
      <section className="py-16 bg-[#f8fafc]" aria-labelledby="explore-heading">
        <div className="container">
          <div className="text-center mb-10">
            <h2
              id="explore-heading"
              className="text-2xl font-bold text-[#080808]"
              style={{ fontFamily: "Sora, sans-serif" }}
            >
              While You Wait, Explore Our Resources
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-4xl mx-auto">
            <Link
              href="/solutions"
              className="group p-5 rounded-xl bg-white border border-gray-100 hover:border-[#c9a84c]/40 hover:shadow-md transition-all flex items-start gap-4"
              aria-label="Browse all payment solutions"
            >
              <div className="w-10 h-10 rounded-lg bg-[#c9a84c]/10 flex items-center justify-center shrink-0" aria-hidden="true">
                <span className="text-xl">💳</span>
              </div>
              <div>
                <div className="font-bold text-[#080808] mb-1 group-hover:text-[#c9a84c] transition-colors" style={{ fontFamily: "Sora, sans-serif" }}>
                  Browse Solutions
                </div>
                <p className="text-gray-600 text-sm">Explore all our payment processing options.</p>
              </div>
            </Link>

            <Link
              href="/industries"
              className="group p-5 rounded-xl bg-white border border-gray-100 hover:border-[#c9a84c]/40 hover:shadow-md transition-all flex items-start gap-4"
              aria-label="Find solutions for your industry"
            >
              <div className="w-10 h-10 rounded-lg bg-[#c9a84c]/10 flex items-center justify-center shrink-0" aria-hidden="true">
                <span className="text-xl">🏪</span>
              </div>
              <div>
                <div className="font-bold text-[#080808] mb-1 group-hover:text-[#c9a84c] transition-colors" style={{ fontFamily: "Sora, sans-serif" }}>
                  Your Industry
                </div>
                <p className="text-gray-600 text-sm">See solutions tailored to your business type.</p>
              </div>
            </Link>

            <Link
              href="/faq"
              className="group p-5 rounded-xl bg-white border border-gray-100 hover:border-[#c9a84c]/40 hover:shadow-md transition-all flex items-start gap-4"
              aria-label="Read frequently asked questions"
            >
              <div className="w-10 h-10 rounded-lg bg-[#c9a84c]/10 flex items-center justify-center shrink-0" aria-hidden="true">
                <span className="text-xl">❓</span>
              </div>
              <div>
                <div className="font-bold text-[#080808] mb-1 group-hover:text-[#c9a84c] transition-colors" style={{ fontFamily: "Sora, sans-serif" }}>
                  FAQ
                </div>
                <p className="text-gray-600 text-sm">Answers to the most common questions we receive.</p>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}

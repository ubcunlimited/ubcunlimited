import { useState } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle,
  DollarSign,
  TrendingUp,
  Users,
  Handshake,
  BarChart3,
  Zap,
  ShieldCheck,
  Phone,
  Mail,
  Loader2,
  Award,
  Clock,
  HeartHandshake,
} from "lucide-react";
import PageLayout from "@/components/layout/PageLayout";
import SEO from "@/components/SEO";
import FeatureGrid from "@/components/sections/FeatureGrid";
import BillOfRights from "@/components/sections/BillOfRights";
import StatsBar from "@/components/sections/StatsBar";
import CTABanner from "@/components/sections/CTABanner";
import { SITE } from "@/lib/config";
import { trpc } from "@/lib/trpc";

// ─── Data ────────────────────────────────────────────────────────────────────

const AGENT_FEATURES = [
  {
    icon: DollarSign,
    title: "Competitive Residual Splits",
    body: "Earn industry-leading residual splits on every account you bring in. Your portfolio grows — and so does your monthly income.",
  },
  {
    icon: TrendingUp,
    title: "Lifetime Residuals",
    body: "Every merchant you sign stays in your portfolio for life. No clawbacks, no account reassignments — your book of business is yours.",
  },
  {
    icon: Zap,
    title: "Fast Merchant Approvals",
    body: "Most merchants are approved and processing within 24–48 hours. Quick turnaround means you close deals faster and start earning sooner.",
  },
  {
    icon: ShieldCheck,
    title: "High-Risk Merchant Support",
    body: "We process for industries most ISOs turn away — CBD, firearms, adult, nutraceuticals, and more. Expand your market and close deals others can't.",
  },
  {
    icon: Users,
    title: "Dedicated Agent Support",
    body: "You get a direct line to a real underwriter and support team. No ticket queues — just fast answers so you can focus on selling.",
  },
  {
    icon: BarChart3,
    title: "Real-Time Reporting Portal",
    body: "Log in anytime to see your full portfolio, residual statements, merchant activity, and pipeline — all in one clean dashboard.",
  },
];

const AGENT_RIGHTS: import("@/components/sections/BillOfRights").RightsItem[] = [
  {
    title: "Transparent Residual Statements",
    description:
      "You receive clear, itemized residual statements every month — no hidden deductions, no mystery fees.",
  },
  {
    title: "Lifetime Portfolio Ownership",
    description:
      "Your merchants are yours. We never reassign accounts or reduce your split without cause.",
  },
  {
    title: "No Upfront Costs",
    description:
      "There are no fees to join the UBC Unlimited agent program. Your investment is your time and effort.",
  },
  {
    title: "Access to All Verticals",
    description:
      "Standard and high-risk merchants, retail, eCommerce, restaurants, medical — you can sell into any industry we serve.",
  },
  {
    title: "Marketing & Sales Support",
    description:
      "We provide co-branded materials, proposal templates, and rate analysis tools to help you close more deals.",
  },
  {
    title: "Sub-Agent & ISO Program",
    description:
      "Build your own team. Recruit sub-agents under your ISO and earn overrides on their portfolios.",
  },
  {
    title: "Direct Processor Relationships",
    description:
      "We work directly with multiple processors, giving you competitive buy rates and flexibility to match any merchant's needs.",
  },
  {
    title: "No Non-Compete Restrictions",
    description:
      "We respect your independence. Our program has no non-compete clauses — you run your business your way.",
  },
];

const AGENT_STATS = [
  { value: "20+", label: "Years in Business" },
  { value: "$500M+", label: "Annual Volume Processed" },
  { value: "24h", label: "Avg. Merchant Approval" },
  { value: "100%", label: "Residual Transparency" },
];

const HOW_IT_WORKS = [
  {
    step: "01",
    title: "Apply to Partner",
    desc: "Fill out the short partner application below. Our agent team reviews every submission and responds within one business day.",
  },
  {
    step: "02",
    title: "Get Onboarded",
    desc: "We walk you through our systems, pricing tools, and merchant application process. Most agents are ready to sell within 48 hours.",
  },
  {
    step: "03",
    title: "Submit Merchants",
    desc: "Use our online portal or work directly with your agent rep to submit merchant applications. We handle underwriting and boarding.",
  },
  {
    step: "04",
    title: "Earn Residuals",
    desc: "Once your merchant is live, you start earning. Residuals are paid monthly and grow as your portfolio expands.",
  },
];

const BUSINESS_TYPES = [
  "Independent Sales Agent",
  "ISO / Sub-ISO",
  "Financial Advisor / Consultant",
  "Insurance Agent",
  "Business Broker",
  "Accountant / CPA",
  "Other",
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AgentISO() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [agentType, setAgentType] = useState("");
  const [experience, setExperience] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [formError, setFormError] = useState("");
  const [termsAgreed, setTermsAgreed] = useState(false);

  const agentMutation = trpc.forms.submitAgentLead.useMutation({
    onSuccess: () => {
      setSubmitted(true);
      setFormError("");
    },
    onError: () => {
      setFormError("Something went wrong. Please email us directly at " + SITE.email);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !phone.trim() || !agentType) {
      setFormError("Please fill in all required fields.");
      return;
    }
    if (!termsAgreed) {
      setFormError("Please accept the Privacy Policy and Terms of Service to continue.");
      return;
    }
    setFormError("");
    agentMutation.mutate({
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      agentType,
      experience: experience.trim(),
    });
  };

  return (
    <PageLayout>
      <SEO
        title="Agent & ISO Partner Program"
        description="Join UBC Unlimited's Agent & ISO partner program. Earn lifetime residuals, competitive splits, and high-risk merchant access. Utah's top merchant services ISO opportunity."
        canonical="/agent-iso"
        schema={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Agent & ISO Partner Program — UBC Unlimited",
          description:
            "Earn lifetime residuals selling merchant services with UBC Unlimited. Competitive splits, high-risk support, and a dedicated agent team.",
          url: "https://ubcunlimited.com/agent-iso",
        }}
      />

      {/* ── Hero ── */}
      <section className="relative bg-[#080808] overflow-hidden pt-24 pb-20">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#c9a84c]/8 via-transparent to-transparent pointer-events-none" />
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#c9a84c]/4 to-transparent pointer-events-none" />

        <div className="container relative z-10">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            {/* Left — copy */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block bg-[#c9a84c]/10 border border-[#c9a84c]/25 text-[#c9a84c] text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full mb-6">
                Agent & ISO Partner Program
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-5">
                Earn More.{" "}
                <span className="text-[#c9a84c]">Sell Smarter.</span>
                <br />
                Build a Real Residual Income.
              </h1>
              <p className="text-white/60 text-lg leading-relaxed mb-8 max-w-xl">
                Partner with UBC Unlimited and earn lifetime residuals on every merchant you sign.
                Competitive splits, high-risk access, fast approvals, and a team that actually
                supports your growth.
              </p>

              {/* Quick bullets */}
              <ul className="space-y-3 mb-10">
                {[
                  "Lifetime residuals — your portfolio, your income",
                  "High-risk verticals most ISOs won't touch",
                  "24–48 hour merchant approvals",
                  "No upfront costs to join",
                  "Sub-agent & ISO build-out available",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-white/75 text-sm">
                    <CheckCircle size={16} className="text-[#c9a84c] mt-0.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>

              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href="#apply"
                  className="btn-gold text-sm py-3 px-7 justify-center"
                >
                  Apply to Partner <ArrowRight size={16} />
                </a>
                <a
                  href={`tel:${SITE.phone}`}
                  className="btn-outline-white text-sm py-3 px-7 justify-center"
                >
                  <Phone size={15} /> Call {SITE.phone}
                </a>
              </div>
            </motion.div>

            {/* Right — partner highlights card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="bg-white/4 border border-white/10 rounded-3xl p-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-[#c9a84c]/15 flex items-center justify-center">
                  <Handshake size={20} className="text-[#c9a84c]" />
                </div>
                <div>
                  <p className="text-white font-bold text-sm">Why Partner With UBC Unlimited</p>
                  <p className="text-white/40 text-xs">Built for serious agent partners</p>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                {[
                  { icon: ShieldCheck, title: "High-Risk Merchant Access", desc: "Verticals most ISOs won't touch — CBD, firearms, nutraceuticals, and more." },
                  { icon: Clock, title: "Fast Merchant Approvals", desc: "Most merchants approved and processing within 24–48 hours." },
                  { icon: Users, title: "Dedicated Agent Support", desc: "A real team behind every deal — underwriting, tech, and training included." },
                  { icon: Award, title: "Transparent Monthly Statements", desc: "Clear, itemized statements every month with no hidden deductions." },
                ].map((item) => (
                  <div key={item.title} className="flex items-start gap-3 bg-white/4 rounded-xl px-4 py-3">
                    <item.icon size={18} className="text-[#c9a84c] mt-0.5 shrink-0" />
                    <div>
                      <p className="text-white text-sm font-semibold">{item.title}</p>
                      <p className="text-white/45 text-xs leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <a href="#apply" className="btn-gold w-full text-sm py-3 flex items-center justify-center gap-2">
                Apply to Partner Today <ArrowRight size={15} />
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Stats Bar ── */}
      <StatsBar stats={AGENT_STATS} dark={false} />

      {/* ── Why Partner With Us ── */}
      <FeatureGrid
        title="Why Agents Choose UBC Unlimited"
        subtitle="We built our agent program around one principle: your success is our success. Here's what that looks like in practice."
        features={AGENT_FEATURES}
        columns={3}
        dark={false}
      />

      {/* ── How It Works ── */}
      <section className="py-20 bg-[#080808]">
        <div className="container">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
              How the Partner Program Works
            </h2>
            <p className="text-white/50 max-w-xl mx-auto text-base">
              From application to your first residual check — here's the process.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {HOW_IT_WORKS.map((step, i) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="bg-white/4 border border-white/8 rounded-2xl p-6"
              >
                <span className="text-4xl font-extrabold text-[#c9a84c]/30 block mb-4">
                  {step.step}
                </span>
                <h3 className="text-white font-bold text-base mb-2">{step.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Agent Bill of Rights ── */}
      <BillOfRights
        title="Agent Bill of Rights"
        subtitle="When you partner with UBC Unlimited, these are our commitments to you — in writing."
        items={AGENT_RIGHTS}
        numbered={true}
        dark={false}
      />

      {/* ── Testimonial pull quote ── */}
      <section className="py-16 bg-[#c9a84c]">
        <div className="container max-w-3xl text-center">
          <Award size={36} className="text-[#080808]/40 mx-auto mb-5" />
          <blockquote className="text-[#080808] text-2xl md:text-3xl font-bold leading-snug mb-5">
            "I've been with three ISOs in my career. UBC Unlimited is the first one that actually
            pays on time, answers the phone, and never messed with my splits."
          </blockquote>
          <p className="text-[#080808]/60 text-sm font-semibold uppercase tracking-wider">
            — Independent Sales Agent, Salt Lake City, UT
          </p>
        </div>
      </section>

      {/* ── Application Form ── */}
      <section id="apply" className="py-20 bg-[#0d0d0d] scroll-mt-20">
        <div className="container max-w-2xl">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
              Apply to Partner with UBC Unlimited
            </h2>
            <p className="text-white/50 text-base">
              Fill out the form below and our agent team will reach out within one business day to
              discuss your goals and get you set up.
            </p>
          </div>

          {submitted ? (
            <div className="bg-[#c9a84c]/10 border border-[#c9a84c]/30 rounded-2xl px-8 py-10 text-center">
              <CheckCircle size={40} className="text-[#c9a84c] mx-auto mb-4" />
              <h3 className="text-white font-bold text-xl mb-2">Application Received!</h3>
              <p className="text-white/60 text-sm mb-6">
                Our agent team will review your application and reach out within one business day.
                In the meantime, feel free to call us directly.
              </p>
              <a
                href={`tel:${SITE.phone}`}
                className="btn-gold text-sm py-3 px-8 justify-center inline-flex"
              >
                <Phone size={15} /> Call {SITE.phone}
              </a>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="bg-white/4 border border-white/10 rounded-2xl p-8 space-y-4"
              aria-label="Agent partner application"
            >
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-white/60 text-xs font-semibold mb-1.5 uppercase tracking-wider">
                    Full Name <span className="text-[#c9a84c]">*</span>
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Jane Smith"
                    className="w-full bg-white/8 border border-white/12 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#c9a84c]/60 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-white/60 text-xs font-semibold mb-1.5 uppercase tracking-wider">
                    Phone <span className="text-[#c9a84c]">*</span>
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="(801) 555-0100"
                    className="w-full bg-white/8 border border-white/12 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#c9a84c]/60 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-white/60 text-xs font-semibold mb-1.5 uppercase tracking-wider">
                  Email Address <span className="text-[#c9a84c]">*</span>
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="jane@example.com"
                  className="w-full bg-white/8 border border-white/12 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#c9a84c]/60 transition-colors"
                />
              </div>

              <div>
                <label className="block text-white/60 text-xs font-semibold mb-1.5 uppercase tracking-wider">
                  I Am A <span className="text-[#c9a84c]">*</span>
                </label>
                <select
                  value={agentType}
                  onChange={(e) => setAgentType(e.target.value)}
                  className="w-full bg-white/8 border border-white/12 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#c9a84c]/60 transition-colors appearance-none"
                >
                  <option value="" disabled className="bg-[#1a1a1a]">
                    Select your role
                  </option>
                  {BUSINESS_TYPES.map((t) => (
                    <option key={t} value={t} className="bg-[#1a1a1a]">
                      {t}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-white/60 text-xs font-semibold mb-1.5 uppercase tracking-wider">
                  Current Experience in Merchant Services{" "}
                  <span className="text-white/30">(optional)</span>
                </label>
                <textarea
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                  placeholder="e.g. 3 years as an independent ISO, currently have 20 active merchants..."
                  rows={3}
                  className="w-full bg-white/8 border border-white/12 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#c9a84c]/60 transition-colors resize-none"
                />
              </div>

              {/* Acceptance checkbox */}
              <label className="flex items-start gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={termsAgreed}
                  onChange={(e) => { setTermsAgreed(e.target.checked); if (formError.includes("Privacy")) setFormError(""); }}
                  className="mt-0.5 w-4 h-4 rounded border-white/20 bg-white/10 accent-[#c9a84c] cursor-pointer flex-shrink-0"
                />
                <span className="text-white/40 text-[11px] leading-relaxed">
                  I agree to the{" "}
                  <Link href="/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-[#c9a84c] hover:underline" onClick={(e) => e.stopPropagation()}>Privacy Policy</Link>{" "}
                  and{" "}
                  <Link href="/terms-of-service" target="_blank" rel="noopener noreferrer" className="text-[#c9a84c] hover:underline" onClick={(e) => e.stopPropagation()}>Terms of Service</Link>.
                </span>
              </label>

              {formError && <p className="text-red-400 text-xs">{formError}</p>}

              <button
                type="submit"
                disabled={agentMutation.isPending}
                className="w-full btn-gold py-3 justify-center text-sm font-bold disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {agentMutation.isPending ? (
                  <>
                    <Loader2 size={15} className="animate-spin" /> Submitting...
                  </>
                ) : (
                  <>
                    Submit Partner Application <ArrowRight size={15} />
                  </>
                )}
              </button>

              <p className="text-white/25 text-xs text-center">
                By submitting you agree to be contacted by UBC Unlimited regarding the agent
                program. We never share your information.
              </p>
            </form>
          )}

          {/* Direct contact strip */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={`tel:${SITE.phone}`}
              className="flex items-center gap-2 text-white/50 hover:text-[#c9a84c] text-sm transition-colors"
            >
              <Phone size={14} /> {SITE.phone}
            </a>
            <a
              href={`mailto:${SITE.email}`}
              className="flex items-center gap-2 text-white/50 hover:text-[#c9a84c] text-sm transition-colors"
            >
              <Mail size={14} /> {SITE.email}
            </a>
          </div>
        </div>
      </section>

      {/* ── Bottom CTA ── */}
      <CTABanner
        title="Ready to Build Your Residual Income?"
        subtitle="Join a growing network of agent partners with UBC Unlimited. Apply today and start selling within 48 hours."
        primaryLabel="Apply Now"
        primaryHref="#apply"
        secondaryLabel="Call Us"
        secondaryHref={`tel:${SITE.phone}`}
      />
    </PageLayout>
  );
}

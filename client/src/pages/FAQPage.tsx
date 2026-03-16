import { Link } from "wouter";
import { motion } from "framer-motion";
import { ChevronDown, Phone, ArrowRight, HelpCircle } from "lucide-react";
import { useState } from "react";
import PageLayout from "@/components/layout/PageLayout";
import CTABanner from "@/components/sections/CTABanner";
import { SITE } from "@/lib/config";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQCategory {
  title: string;
  icon: string;
  items: FAQItem[];
}

const faqCategories: FAQCategory[] = [
  {
    title: "Getting Started",
    icon: "🚀",
    items: [
      {
        question: "How do I get started with UBC Unlimited?",
        answer: "The easiest way is to book a free consultation or submit your current processing statement for a free review. We'll analyze your current setup, identify savings opportunities, and build a custom proposal — no obligation.",
      },
      {
        question: "How long does it take to get approved and set up?",
        answer: "Most low-risk businesses are approved within 24–48 hours and can be approved as quickly as same day. Lead time for most POS system installations requires at least 14 days from complete paperwork submission. High-risk and specialty industries may take longer depending on underwriting requirements.",
      },
      {
        question: "What information do I need to apply?",
        answer: "Typically you'll need your business name, EIN, bank account information for deposits, a voided check, and recent processing statements if you're switching from another processor. We'll walk you through everything during your consultation.",
      },
      {
        question: "Is there a setup fee?",
        answer: "Setup fees vary by solution. Many of our standard merchant accounts have no setup fee. POS hardware and specialized integrations may have associated costs, which we'll outline clearly in your proposal before you commit to anything.",
      },
    ],
  },
  {
    title: "Pricing & Fees",
    icon: "💰",
    items: [
      {
        question: "How does your pricing work?",
        answer: "We work with you to set up pricing that optimizes your profitability. Depending on your business type and volume, we can structure Flat Rate, Multi-Tiered, or Interchange-Plus pricing. We can also set you up to be compliant for surcharging, cash discounting, or dual pricing models — all designed to maximize your profits while minimizing the cost to accept payments. We'll recommend the best model based on your specific transaction mix.",
      },
      {
        question: "Are there hidden fees?",
        answer: "No. We believe in full transparency. Every fee is disclosed upfront in your merchant agreement. We'll also do a line-by-line comparison against your current statement so you can see exactly where you'll save.",
      },
      {
        question: "What is interchange-plus pricing?",
        answer: "Interchange-plus (also called cost-plus) pricing passes through the actual card network interchange rates plus a fixed markup. It's the most transparent pricing model and typically saves businesses more money than flat-rate or tiered pricing, especially at higher volumes.",
      },
      {
        question: "Can you beat my current rates?",
        answer: "In most cases, yes. Submit your current processing statement for a free review and we'll show you a side-by-side comparison. We work with multiple processing partners, which allows us to find the most competitive rates for your specific industry and volume.",
      },
      {
        question: "Do you charge for customer support?",
        answer: "No. Support is included. You'll have direct access to your local rep during business hours at no additional charge.",
      },
    ],
  },
  {
    title: "Contracts & Agreements",
    icon: "📋",
    items: [
      {
        question: "Do you offer month-to-month agreements?",
        answer: "Yes, in most situations we offer a month-to-month agreement because we believe you must set yourself apart with service. We do have certain products that require agreements due to solution requirements, and we do our best to minimize the impact in those situations.",
      },
      {
        question: "Are there cancellation fees?",
        answer: "Generally, no cancellation fees apply — we believe in earning your business every month, not locking you in. However, certain types of businesses or solutions require a formal agreement, and in those cases cancellation fees are based on the terms of the individual agreement. We are always upfront about this before you sign anything.",
      },
      {
        question: "Can I cancel at any time on a month-to-month plan?",
        answer: "Yes. Month-to-month accounts can be cancelled with standard notice. We don't believe in trapping customers — we believe in earning your business every single month. For accounts that require a term agreement, cancellation terms will be clearly outlined in your individual agreement.",
      },
    ],
  },
  {
    title: "Industries & Business Types",
    icon: "🏢",
    items: [
      {
        question: "What types of businesses do you serve?",
        answer: "We serve a wide range of businesses including restaurants, retail, medical, automotive, salons & spas, eCommerce, professional services, property management, bars & nightclubs, and more. We can also service medium and high-risk businesses, though those are evaluated on a case-by-case basis. If you accept payments, reach out and we'll find a solution that works for you.",
      },
      {
        question: "Do you work with high-risk businesses?",
        answer: "Yes, we work with certain medium and high-risk categories including firearms dealers, automotive, and others. High-risk accounts are reviewed on a case-by-case basis and may have different pricing and underwriting requirements. Contact us to discuss your specific situation.",
      },
      {
        question: "Do you work with firearms dealers and FFL holders?",
        answer: "Yes. UBC Unlimited has experience placing firearms retailers, FFL dealers, gun shops, and shooting ranges with processors that specialize in this industry. Firearms is considered high-risk by most banks, but we have the relationships to find compliant, reliable solutions.",
      },
      {
        question: "Can you help eCommerce businesses?",
        answer: "Absolutely. We offer payment gateway integrations, virtual terminals, and hosted payment pages for online businesses. We work with major shopping cart platforms and can help you find the right gateway for your tech stack.",
      },
      {
        question: "Do you serve businesses outside the Wasatch Front?",
        answer: "Yes — we are happy to serve Utah businesses statewide. While our team is based along the Wasatch Front, we work with businesses all across Utah. Remote setup and support is available for businesses outside our immediate service area.",
      },
    ],
  },
  {
    title: "POS Systems & Hardware",
    icon: "🖥️",
    items: [
      {
        question: "What POS systems do you offer?",
        answer: "We are an authorized SkyTab POS reseller in Utah. SkyTab is one of the most powerful restaurant and bar POS systems available, with tableside ordering, online ordering integration, and robust reporting. We also work with other POS solutions depending on your industry and needs.",
      },
      {
        question: "How long does POS installation take?",
        answer: "Lead time for most POS system installations requires at least 14 days from complete paperwork submission. This includes equipment procurement, configuration, and scheduling your on-site installation. We handle everything so you can focus on running your business.",
      },
      {
        question: "Do you provide training on new POS systems?",
        answer: "Yes. Our local team provides hands-on training for you and your staff during installation. We also offer ongoing support if you have questions after go-live.",
      },
      {
        question: "Can you integrate with my existing software?",
        answer: "In many cases, yes. We work with a variety of accounting, inventory, and reservation systems. During your consultation, we'll review your current tech stack and identify the best integration options.",
      },
    ],
  },
  {
    title: "Support & Service",
    icon: "🤝",
    items: [
      {
        question: "What are your support hours?",
        answer: "Our local team is available during normal business hours. You'll have a dedicated local rep — a real person who knows your account — not a call center. For after-hours technical emergencies, processor-level support is available 24/7 through your payment processor.",
      },
      {
        question: "Who do I call if I have a problem?",
        answer: `You call us directly. You'll have Josh Cornia's direct contact information and can reach our team at ${SITE.phone} or ${SITE.email} during business hours. We believe in being accessible and responsive.`,
      },
      {
        question: "What happens if my terminal stops working?",
        answer: "Contact us immediately. We'll troubleshoot with you over the phone and, if needed, arrange for a replacement terminal as quickly as possible. Downtime costs you money and we take that seriously.",
      },
      {
        question: "Do you help with chargebacks?",
        answer: "Yes. We can help you understand the chargeback process, gather the right documentation, and submit your rebuttal. We also offer guidance on best practices to reduce your chargeback rate proactively.",
      },
    ],
  },
  {
    title: "Statement Review",
    icon: "📊",
    items: [
      {
        question: "What is a free statement review?",
        answer: "We analyze your current processing statement line by line, identify all fees you're being charged, and compare them against what we can offer. You'll get a clear, honest comparison showing your potential savings — with no obligation to switch.",
      },
      {
        question: "How do I submit my statement?",
        answer: "You can submit your statement through our Statement Review page on this site, email it to us directly, or bring it to a consultation. We'll typically have your analysis back to you within 1 business day.",
      },
      {
        question: "What if I'm locked into a contract with my current processor?",
        answer: "We'll review your current agreement and help you understand your options. In some cases, the savings from switching are significant enough to justify an early termination fee. We'll do the math with you so you can make an informed decision.",
      },
    ],
  },
];

function FAQAccordionItem({ item, index }: { item: FAQItem; index: number }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-5 text-left bg-white hover:bg-gray-50 transition-colors"
        aria-expanded={open}
      >
        <span className="font-semibold text-[#0d1b2a] pr-4">{item.question}</span>
        <ChevronDown
          size={18}
          className={`shrink-0 text-[#1e6fa8] transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <div className="px-5 pb-5 bg-white border-t border-gray-100">
          <p className="text-gray-600 leading-relaxed pt-4">{item.answer}</p>
        </div>
      )}
    </div>
  );
}

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const displayed = activeCategory
    ? faqCategories.filter((c) => c.title === activeCategory)
    : faqCategories;

  return (
    <PageLayout>
      {/* Hero */}
      <section className="bg-[#0d1b2a] py-16 md:py-20">
        <div className="container">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-4">
              <HelpCircle size={20} className="text-[#1e6fa8]" />
              <span className="text-[#1e6fa8] text-sm font-semibold uppercase tracking-widest">FAQ's</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-4 leading-tight" style={{ fontFamily: "DM Serif Display, Georgia, serif" }}>
              Frequently Asked Questions
            </h1>
            <p className="text-white/65 text-lg leading-relaxed mb-6">
              Answers to the most common questions about merchant services, payment processing, POS systems, and working with UBC Unlimited.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/consultation" className="btn-gold text-sm py-3 px-6">
                Book a Free Consultation <ArrowRight size={16} />
              </Link>
              <a href={SITE.phoneHref} className="btn-outline-white text-sm py-3 px-6">
                <Phone size={16} /> Call {SITE.phone}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="bg-white border-b border-gray-200 sticky top-[93px] z-30">
        <div className="container py-3">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveCategory(null)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                activeCategory === null
                  ? "bg-[#1e6fa8] text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              All Topics
            </button>
            {faqCategories.map((cat) => (
              <button
                key={cat.title}
                onClick={() => setActiveCategory(activeCategory === cat.title ? null : cat.title)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  activeCategory === cat.title
                    ? "bg-[#1e6fa8] text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {cat.icon} {cat.title}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-14 bg-gray-50">
        <div className="container max-w-4xl">
          {displayed.map((category, ci) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: ci * 0.05 }}
              className="mb-12"
            >
              <div className="flex items-center gap-3 mb-5">
                <span className="text-2xl">{category.icon}</span>
                <h2 className="text-xl font-bold text-[#0d1b2a]" style={{ fontFamily: "DM Serif Display, Georgia, serif" }}>
                  {category.title}
                </h2>
              </div>
              <div className="space-y-3">
                {category.items.map((item, ii) => (
                  <FAQAccordionItem key={ii} item={item} index={ii} />
                ))}
              </div>
            </motion.div>
          ))}

          {/* Still have questions */}
          <div className="bg-[#0d1b2a] rounded-2xl p-8 text-center mt-8">
            <h3 className="text-xl font-bold text-white mb-2" style={{ fontFamily: "DM Serif Display, Georgia, serif" }}>
              Still have questions?
            </h3>
            <p className="text-white/60 mb-5">
              Talk to a real person. Our local Utah team is happy to answer any questions about your specific situation.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/consultation" className="btn-gold text-sm py-3 px-6">
                Book a Free Consultation <ArrowRight size={16} />
              </Link>
              <a href={SITE.phoneHref} className="btn-outline-white text-sm py-3 px-6">
                <Phone size={16} /> {SITE.phone}
              </a>
            </div>
          </div>
        </div>
      </section>

      <CTABanner />
    </PageLayout>
  );
}

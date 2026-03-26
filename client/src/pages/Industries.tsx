import { Link } from "wouter";
import { ChevronRight, ShieldAlert, TrendingDown, Zap, Shield, Clock, ArrowRight } from "lucide-react";
import PageLayout from "@/components/layout/PageLayout";
import CTABanner from "@/components/sections/CTABanner";
import SEO from "@/components/SEO";
import { NAV_INDUSTRIES } from "@/lib/config";
import IndustryIcon from "@/components/icons/IndustryIcon";

interface IndustryDetail {
  tagline: string;
  painPoints: string[];
  solutions: { icon: string; title: string; desc: string }[];
  cta: string;
}

const industryDetails: Record<string, IndustryDetail> = {
  "/industries/restaurants": {
    tagline: "From fast-casual to fine dining — payment systems that keep tables turning and revenue flowing.",
    painPoints: ["High transaction volume with thin margins", "Tip management complexity", "Online ordering integration gaps", "Staff turnover and training costs"],
    solutions: [
      { icon: "🍽️", title: "Tableside Ordering & Pay", desc: "Handheld terminals let servers take orders and process payments at the table — reducing errors and speeding up turns." },
      { icon: "🖥️", title: "Kitchen Display Systems", desc: "Eliminate ticket confusion with real-time order routing from POS to kitchen, bar, and expo stations." },
      { icon: "📱", title: "Online Ordering Integration", desc: "Connect your POS to DoorDash, Uber Eats, and your own website — all orders flow into one system." },
      { icon: "💳", title: "Cash Discount & Dual Pricing", desc: "Eliminate up to 100% of your processing fees by offering a small discount to cash-paying customers." },
    ],
    cta: "Get a Restaurant Payment Consultation",
  },
  "/industries/bars-nightclubs": {
    tagline: "Fast tabs, split checks, and age verification — built for high-volume nightlife.",
    painPoints: ["Slow tab management during peak hours", "Disputed charges and chargebacks", "Split check complexity", "Age verification compliance"],
    solutions: [
      { icon: "🍺", title: "Open Tab Management", desc: "Pre-authorize cards and manage open tabs with one tap — no more lost cards or end-of-night disputes." },
      { icon: "⚡", title: "High-Speed Processing", desc: "Process hundreds of transactions per hour without slowdowns — critical during peak service windows." },
      { icon: "🔀", title: "Split Check & Tip Adjust", desc: "Split any check any way, and allow tip adjustments after the fact — reducing disputes and increasing gratuity." },
      { icon: "🛡️", title: "Chargeback Protection", desc: "Signature capture and transaction records that win disputes before they become chargebacks." },
    ],
    cta: "Get a Bar & Nightclub Payment Consultation",
  },
  "/industries/retail": {
    tagline: "Inventory-aware POS systems that sync your in-store and online sales in real time.",
    painPoints: ["Inventory discrepancies between channels", "Slow checkout lines losing customers", "Loyalty program fragmentation", "Employee theft and shrinkage"],
    solutions: [
      { icon: "📦", title: "Real-Time Inventory Sync", desc: "Every sale updates your inventory instantly across all registers and online channels — no more overselling." },
      { icon: "🏷️", title: "Barcode & SKU Management", desc: "Scan-to-checkout with full product catalog, variant, and pricing support for thousands of SKUs." },
      { icon: "🎁", title: "Loyalty & Gift Cards", desc: "Built-in loyalty points, digital gift cards, and promotional pricing that keep customers coming back." },
      { icon: "👥", title: "Employee Management", desc: "Time clock, role-based permissions, and sales reporting by employee — reduce theft and reward top performers." },
    ],
    cta: "Get a Retail Payment Consultation",
  },
  "/industries/medical": {
    tagline: "HIPAA-aware payment solutions that simplify patient billing and reduce collection costs.",
    painPoints: ["Complex insurance co-pay collection", "Patient payment plan management", "HIPAA compliance requirements", "High accounts receivable balances"],
    solutions: [
      { icon: "🏥", title: "Patient Payment Plans", desc: "Offer flexible payment plans at the point of care — reduce collections costs and improve patient satisfaction." },
      { icon: "🔒", title: "HIPAA-Aware Processing", desc: "Payment workflows designed with healthcare privacy requirements in mind — protecting patient data at every step." },
      { icon: "🔄", title: "Recurring Billing", desc: "Automate monthly payment plan installments with card-on-file billing — reduce staff time and improve cash flow." },
      { icon: "💻", title: "Virtual Terminal", desc: "Accept phone and mail-order payments from any browser — ideal for billing departments and telehealth practices." },
    ],
    cta: "Get a Medical Payment Consultation",
  },
  "/industries/ecommerce": {
    tagline: "Secure payment gateways with fraud protection built for online merchants at any volume.",
    painPoints: ["High chargeback rates from card-not-present fraud", "Shopping cart abandonment at checkout", "Multiple gateway integrations", "International payment complexity"],
    solutions: [
      { icon: "🛒", title: "Shopping Cart Integration", desc: "Native plugins for WooCommerce, Shopify, Magento, and BigCommerce — no custom development required." },
      { icon: "🛡️", title: "Fraud Prevention Suite", desc: "AVS, CVV, velocity checks, and 3D Secure authentication reduce fraud losses before they hit your account." },
      { icon: "🌍", title: "Multi-Currency Support", desc: "Accept payments in 135+ currencies with automatic conversion — expand your market without adding complexity." },
      { icon: "📊", title: "Chargeback Management", desc: "Dispute management tools and representment support to recover revenue from fraudulent chargebacks." },
    ],
    cta: "Get an eCommerce Payment Consultation",
  },
  "/industries/automotive": {
    tagline: "High-ticket payment solutions for dealerships, service centers, and auto parts retailers.",
    painPoints: ["High average ticket sizes increasing processing costs", "Parts inventory management complexity", "Service authorization and deposit workflows", "Fleet account billing"],
    solutions: [
      { icon: "🚗", title: "High-Ticket Processing", desc: "Interchange-plus pricing optimized for large transactions — save significantly vs. flat-rate on $1,000+ tickets." },
      { icon: "🔧", title: "Parts & Service POS", desc: "Integrated parts inventory, labor tracking, and repair order management in one system." },
      { icon: "💰", title: "Deposit & Authorization", desc: "Pre-authorize deposits for service work and hold funds securely until job completion." },
      { icon: "🏢", title: "Fleet & B2B Billing", desc: "Net-30 invoicing, fleet account management, and Level 2/3 processing for commercial customers." },
    ],
    cta: "Get an Automotive Payment Consultation",
  },
  "/industries/professional-services": {
    tagline: "Invoicing, recurring billing, and virtual terminals for service-based businesses.",
    painPoints: ["Slow invoice payment cycles", "Recurring retainer billing management", "Remote payment collection", "Trust account compliance for legal"],
    solutions: [
      { icon: "📄", title: "Digital Invoicing", desc: "Send branded invoices with a pay-now link — clients pay online in seconds, funds arrive in 1–2 business days." },
      { icon: "🔄", title: "Recurring Retainers", desc: "Automate monthly retainer billing with card-on-file — eliminate manual invoicing and late payments." },
      { icon: "💻", title: "Virtual Terminal", desc: "Accept payments over the phone from any browser — no hardware required for office or remote billing." },
      { icon: "🏛️", title: "Trust Account Compliance", desc: "IOLTA-compliant payment workflows for law firms — keep operating and trust funds properly separated." },
    ],
    cta: "Get a Professional Services Consultation",
  },
  "/industries/salons-spas": {
    tagline: "Appointment-integrated payments with tip management and gift cards for beauty businesses.",
    painPoints: ["Tip management and reporting complexity", "Appointment no-shows and cancellation fees", "Gift card and package tracking", "Staff commission calculations"],
    solutions: [
      { icon: "💇", title: "Appointment Integration", desc: "Connect your booking software (Vagaro, Mindbody, Booksy) directly to your payment system." },
      { icon: "💸", title: "Tip Management", desc: "Prompt customers for tips at checkout and automatically calculate staff tip distributions at close." },
      { icon: "🎁", title: "Gift Cards & Packages", desc: "Sell and redeem physical and digital gift cards, service packages, and memberships in one system." },
      { icon: "📊", title: "Staff Commission Reports", desc: "Track sales by stylist and generate commission reports automatically — save hours of manual calculation." },
    ],
    cta: "Get a Salon & Spa Payment Consultation",
  },
  "/industries/property-management": {
    tagline: "Recurring rent collection, ACH processing, and tenant payment portals for property managers.",
    painPoints: ["Manual rent collection and tracking", "High credit card processing fees on large payments", "Late payment management", "Multi-property accounting complexity"],
    solutions: [
      { icon: "🏠", title: "ACH Rent Collection", desc: "Collect rent via ACH bank transfer at a fraction of credit card costs — ideal for large monthly payments." },
      { icon: "🔄", title: "Recurring Auto-Pay", desc: "Tenants enroll once and rent is collected automatically each month — reduce late payments by up to 80%." },
      { icon: "💻", title: "Tenant Payment Portal", desc: "Branded online portal where tenants pay rent, view history, and manage payment methods 24/7." },
      { icon: "📊", title: "Multi-Property Reporting", desc: "Consolidated payment reporting across all properties — simplify reconciliation and owner distributions." },
    ],
    cta: "Get a Property Management Consultation",
  },
  "/industries/firearms": {
    tagline: "Stable FFL dealer accounts with in-store POS and online gateway solutions.",
    painPoints: ["Account terminations from mainstream processors", "Online sales gateway restrictions", "FFL compliance documentation", "High chargeback risk from online sales"],
    solutions: [
      { icon: "__firearm__", title: "Stable FFL Merchant Account", desc: "Accounts through acquiring banks that specialize in firearms — no surprise terminations or holds." },
      { icon: "🛒", title: "Online Gateway Support", desc: "Accept online payments for firearms accessories, ammunition, and legal transfers through compliant gateways." },
      { icon: "🏪", title: "In-Store POS", desc: "Full-featured retail POS with inventory management, layaway, and background check workflow integration." },
      { icon: "🛡️", title: "Chargeback Management", desc: "Transaction documentation and dispute management tools to protect your account and win disputes." },
    ],
    cta: "Get a Firearms Dealer Consultation",
  },
  "/industries/cbd-hemp": {
    tagline: "Farm Bill-compliant merchant accounts for CBD retailers and hemp product brands.",
    painPoints: ["Mainstream processor account terminations", "Online sales gateway restrictions", "Compliance documentation requirements", "High rolling reserve demands"],
    solutions: [
      { icon: "🌿", title: "Compliant Merchant Account", desc: "Accounts through banks familiar with Farm Bill compliance — stable processing without surprise holds." },
      { icon: "🛒", title: "eCommerce Gateway", desc: "Accept online payments for CBD products through compliant gateways that understand the industry." },
      { icon: "📋", title: "Compliance Support", desc: "We help you prepare the documentation banks require — COAs, lab results, and business verification." },
      { icon: "💰", title: "Competitive Rates", desc: "Interchange-plus pricing that reflects your actual risk profile — not a blanket high-risk surcharge." },
    ],
    cta: "Get a CBD & Hemp Consultation",
  },
  "/industries/nutraceuticals": {
    tagline: "Supplement brands and subscription billing with chargeback management built in.",
    painPoints: ["High chargeback rates from subscription billing", "Continuity program compliance", "Negative option billing restrictions", "Account holds during disputes"],
    solutions: [
      { icon: "💊", title: "Subscription Billing", desc: "Recurring billing with dunning management — retry failed payments automatically before they become chargebacks." },
      { icon: "🛡️", title: "Chargeback Management", desc: "Dispute management tools, transaction documentation, and representment support to protect your account." },
      { icon: "📋", title: "Continuity Compliance", desc: "Billing workflows designed to meet FTC and card network requirements for subscription and continuity programs." },
      { icon: "📊", title: "Decline Recovery", desc: "Smart retry logic and account updater services recover failed payments that would otherwise be lost revenue." },
    ],
    cta: "Get a Nutraceuticals Consultation",
  },
  "/industries/adult-entertainment": {
    tagline: "Discreet, compliant merchant accounts for adult content platforms and subscription sites.",
    painPoints: ["Mainstream processor refusals", "High chargeback rates from subscription disputes", "Age verification compliance", "Discreet billing descriptor requirements"],
    solutions: [
      { icon: "🔒", title: "Compliant Merchant Account", desc: "Accounts through specialized banks with experience in adult content — stable processing with transparent terms." },
      { icon: "🔄", title: "Subscription Billing", desc: "Recurring billing with chargeback management and dunning tools designed for content subscription models." },
      { icon: "🛡️", title: "Discreet Billing", desc: "Customizable billing descriptors that protect customer privacy and reduce friendly fraud chargebacks." },
      { icon: "✅", title: "Age Verification Integration", desc: "Compliant age verification workflows that satisfy card network and regulatory requirements." },
    ],
    cta: "Get an Adult Entertainment Consultation",
  },
  "/industries/travel": {
    tagline: "Stable accounts for travel agencies and booking platforms with chargeback prevention.",
    painPoints: ["High chargeback rates from cancellations", "Advance purchase and delayed delivery risk", "Seasonal cash flow volatility", "Multi-currency complexity"],
    solutions: [
      { icon: "✈️", title: "Travel Merchant Account", desc: "Accounts through banks familiar with travel industry risk — stable processing through seasonal fluctuations." },
      { icon: "🛡️", title: "Chargeback Prevention", desc: "Cancellation policy documentation, dispute management, and representment support to protect your account." },
      { icon: "🌍", title: "Multi-Currency Processing", desc: "Accept payments in 135+ currencies with competitive conversion rates for international bookings." },
      { icon: "📊", title: "Advance Deposit Workflows", desc: "Secure deposit collection and balance billing workflows that satisfy card network requirements for travel." },
    ],
    cta: "Get a Travel Payment Consultation",
  },
  "/industries/online-gaming": {
    tagline: "Skill-based gaming and esports merchant accounts with advanced fraud prevention.",
    painPoints: ["Mainstream processor account terminations", "High fraud rates from anonymous players", "Rapid transaction velocity", "Regulatory compliance complexity"],
    solutions: [
      { icon: "🎮", title: "Gaming Merchant Account", desc: "Accounts through banks that understand skill-based gaming — stable processing without surprise terminations." },
      { icon: "🛡️", title: "Fraud Prevention Suite", desc: "Velocity checks, device fingerprinting, and behavioral analytics to catch fraud before it hits your account." },
      { icon: "⚡", title: "High-Volume Processing", desc: "Infrastructure built for rapid transaction velocity — handle thousands of micro-transactions without slowdowns." },
      { icon: "📋", title: "Compliance Support", desc: "We help you navigate card network rules and state regulations for skill-based gaming and esports." },
    ],
    cta: "Get an Online Gaming Consultation",
  },
  "/industries/telemarketing": {
    tagline: "Stable merchant accounts for outbound sales and call centers with chargeback tools.",
    painPoints: ["High chargeback rates from phone sales", "Account terminations from mainstream processors", "TCPA compliance requirements", "Recurring billing management"],
    solutions: [
      { icon: "📞", title: "Telemarketing Merchant Account", desc: "Accounts through banks familiar with MOTO and outbound sales — stable processing with transparent terms." },
      { icon: "🛡️", title: "Chargeback Management", desc: "Call recording integration, transaction documentation, and dispute management to protect your account." },
      { icon: "🔄", title: "Recurring Billing", desc: "Subscription and installment billing with dunning management for continuity and membership programs." },
      { icon: "💻", title: "Virtual Terminal", desc: "Accept phone payments from any browser with full transaction documentation for dispute protection." },
    ],
    cta: "Get a Telemarketing Consultation",
  },
  "/industries/credit-repair": {
    tagline: "Compliant merchant accounts for credit counseling services with recurring billing support.",
    painPoints: ["TSR compliance for advance fee restrictions", "High chargeback rates from dissatisfied clients", "Recurring billing management", "Account terminations from mainstream processors"],
    solutions: [
      { icon: "💳", title: "Credit Repair Merchant Account", desc: "Accounts through banks familiar with credit services — compliant processing that meets TSR requirements." },
      { icon: "🔄", title: "Compliant Billing Workflows", desc: "Billing structures designed to meet FTC Telemarketing Sales Rule requirements for credit repair services." },
      { icon: "🛡️", title: "Chargeback Management", desc: "Service agreement documentation, dispute management, and representment support to protect your account." },
      { icon: "📊", title: "Client Payment Portals", desc: "Branded payment portals where clients manage their payment plans and view billing history." },
    ],
    cta: "Get a Credit Repair Consultation",
  },
  "/industries/subscription-continuity": {
    tagline: "Recurring billing and subscription merchant accounts with chargeback prevention built in.",
    painPoints: ["High chargeback rates from negative option billing", "Failed payment recovery", "Dunning management complexity", "Card network compliance for continuity"],
    solutions: [
      { icon: "🔄", title: "Subscription Billing Engine", desc: "Flexible recurring billing with trial periods, upgrades, downgrades, and pause functionality built in." },
      { icon: "📊", title: "Dunning Management", desc: "Automated retry logic, account updater, and email sequences recover failed payments before they churn." },
      { icon: "🛡️", title: "Chargeback Prevention", desc: "Clear billing descriptors, cancellation workflows, and dispute documentation to minimize chargebacks." },
      { icon: "📋", title: "Compliance Workflows", desc: "Billing flows designed to meet FTC and card network requirements for continuity and subscription programs." },
    ],
    cta: "Get a Subscription Business Consultation",
  },
  "/industries/vape-ecig": {
    tagline: "Stable accounts for vape shops and online stores with age-verification tools.",
    painPoints: ["Mainstream processor account terminations", "Age verification compliance requirements", "Online sales gateway restrictions", "Regulatory uncertainty"],
    solutions: [
      { icon: "💨", title: "Vape Merchant Account", desc: "Accounts through banks that understand the vape industry — stable processing without surprise holds." },
      { icon: "✅", title: "Age Verification Integration", desc: "Compliant age verification workflows for online sales that satisfy card network and regulatory requirements." },
      { icon: "🛒", title: "eCommerce Gateway", desc: "Accept online payments for vape products through compliant gateways with fraud prevention built in." },
      { icon: "🏪", title: "In-Store POS", desc: "Retail POS with inventory management, age verification prompts, and loyalty programs for vape shops." },
    ],
    cta: "Get a Vape & E-Cigarette Consultation",
  },
  "/industries/online-pharmacy": {
    tagline: "Compliant payment solutions for telehealth platforms and online pharmacies.",
    painPoints: ["Mainstream processor refusals", "HIPAA compliance requirements", "Prescription verification workflows", "High fraud risk from online orders"],
    solutions: [
      { icon: "💊", title: "Pharmacy Merchant Account", desc: "Accounts through banks familiar with online pharmacy compliance — stable processing with transparent terms." },
      { icon: "🔒", title: "HIPAA-Aware Processing", desc: "Payment workflows designed with healthcare privacy requirements in mind — protecting patient data." },
      { icon: "🛡️", title: "Fraud Prevention Suite", desc: "Advanced fraud detection tools to identify suspicious orders before they ship and before chargebacks occur." },
      { icon: "🔄", title: "Recurring Prescription Billing", desc: "Auto-refill billing for maintenance medications with card-on-file and account updater services." },
    ],
    cta: "Get an Online Pharmacy Consultation",
  },
  "/industries/cryptocurrency": {
    tagline: "Merchant accounts for crypto exchanges and digital asset platforms.",
    painPoints: ["Mainstream processor refusals for crypto-adjacent businesses", "High chargeback risk from volatile assets", "Regulatory compliance complexity", "KYC/AML requirements"],
    solutions: [
      { icon: "₿", title: "Crypto Business Merchant Account", desc: "Accounts through banks familiar with digital asset businesses — stable fiat processing alongside crypto." },
      { icon: "🛡️", title: "Chargeback Management", desc: "Transaction documentation and dispute management tools designed for the unique risks of crypto businesses." },
      { icon: "📋", title: "Compliance Support", desc: "We help you prepare the KYC/AML documentation and business verification banks require for approval." },
      { icon: "🔒", title: "Fraud Prevention", desc: "Advanced fraud detection to protect your platform from chargebacks and fraudulent transactions." },
    ],
    cta: "Get a Cryptocurrency Business Consultation",
  },
};

const standardIndustries = NAV_INDUSTRIES.filter((i) => !(i as any).highRisk);
const highRiskIndustries = NAV_INDUSTRIES.filter((i) => (i as any).highRisk);

const whyItMatters = [
  { icon: TrendingDown, title: "Pricing Tailored to Your Card Mix", desc: "A restaurant's card mix differs from a firearms dealer's. We analyze your actual transaction data and build a pricing model that reflects your real cost — not a generic rate." },
  { icon: Zap, title: "Industry-Specific Integrations", desc: "Your POS, booking software, eCommerce platform, and accounting system all need to talk to each other. We connect the dots so your payment system works with your workflow." },
  { icon: Shield, title: "Stable Accounts, No Surprises", desc: "Mainstream processors terminate accounts without warning. We work with acquiring banks that understand your industry — so your account stays open and your cash flow stays predictable." },
  { icon: Clock, title: "Local Support That Knows Your Business", desc: "When something goes wrong at 7pm on a Friday, you need a real person who knows your setup. Our Utah-based team provides direct support — not a call center ticket." },
];

export default function Industries() {
  return (
    <PageLayout>
      <SEO
        title="Industries We Serve — Tailored Merchant Services for Every Business"
        description="Payment solutions built for your industry. Restaurants, retail, medical, automotive, eCommerce, firearms, CBD, nutraceuticals, high-risk & more. Utah merchant services with local support."
        canonical="/industries"
      />

      {/* Hero */}
      <section className="bg-[#080808] py-20">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="stat-badge mb-5">Industries We Serve</div>
              <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-5 leading-tight" style={{ fontFamily: 'DM Serif Display, Georgia, serif' }}>
                Payment Solutions Built<br />
                <span className="gradient-text">For Your Industry</span>
              </h1>
              <p className="text-white/70 text-lg leading-relaxed mb-8">
                Every industry has unique payment challenges, compliance requirements, and cost structures. We specialize in tailored solutions that fit how your business actually operates — not a one-size-fits-all package.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link href="/contact" className="btn-gold text-sm py-2.5 px-6 justify-center">
                  Find Your Industry Solution <ArrowRight size={16} />
                </Link>
                <Link href="/contact?tab=statement" className="btn-outline-white text-sm py-2.5 px-6 justify-center opacity-80 hover:opacity-100">
                  Get a Statement Analysis
                </Link>
              </div>
            </div>
            <div className="hidden lg:grid grid-cols-2 gap-3">
              {whyItMatters.map((item) => (
                <div key={item.title} className="glass-card rounded-2xl p-5">
                  <item.icon size={22} className="text-[#c9a84c] mb-3" />
                  <div className="text-white font-bold text-sm mb-1">{item.title}</div>
                  <div className="text-white/50 text-xs leading-relaxed">{item.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Standard Industries */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="teal-divider mb-4" />
          <h2 className="text-3xl font-bold text-[#080808] mb-2" style={{ fontFamily: 'DM Serif Display, Georgia, serif' }}>
            Standard Industries
          </h2>
          <p className="text-gray-500 text-sm mb-10 max-w-2xl">
            Competitive interchange-plus pricing, industry-specific integrations, and local Utah support for businesses across all major sectors.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {standardIndustries.map((ind) => {
              const detail = industryDetails[ind.href];
              if (!detail) return null;
              return (
                <div key={ind.href} className="rounded-2xl border border-gray-100 bg-white shadow-sm hover:shadow-lg hover:border-[#c9a84c]/30 transition-all flex flex-col">
                  <div className="p-6 pb-4 border-b border-gray-50">
                    <div className="flex items-center gap-3 mb-3">
                      <IndustryIcon icon={ind.icon} size={30} className="text-[#080808]" />
                      <h3 className="text-lg font-bold text-[#080808]" style={{ fontFamily: 'DM Serif Display, Georgia, serif' }}>{ind.label}</h3>
                    </div>
                    <p className="text-gray-500 text-sm leading-relaxed">{detail.tagline}</p>
                  </div>
                  <div className="px-6 py-4 border-b border-gray-50">
                    <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-2">Common Challenges</p>
                    <ul className="space-y-1">
                      {detail.painPoints.map((p) => (
                        <li key={p} className="flex items-start gap-2 text-xs text-gray-500">
                          <span className="text-[#c9a84c] mt-0.5">•</span>{p}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="px-6 py-4 flex-1">
                    <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3">Our Solutions</p>
                    <div className="grid grid-cols-2 gap-2">
                      {detail.solutions.map((s) => (
                        <div key={s.title} className="bg-gray-50 rounded-xl p-3">
                          <div className="text-lg mb-1"><IndustryIcon icon={s.icon} size={20} className="text-[#080808]" /></div>
                          <div className="text-xs font-bold text-[#080808] mb-0.5">{s.title}</div>
                          <div className="text-xs text-gray-400 leading-tight">{s.desc}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="px-6 pb-6 pt-2">
                    <Link
                      href={ind.href}
                      className="flex items-center justify-between w-full px-4 py-2.5 rounded-xl bg-[#080808] text-white text-sm font-semibold hover:bg-[#c9a84c] transition-colors group"
                    >
                      <span>{detail.cta}</span>
                      <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Industry-Specific Matters */}
      <section className="py-16 bg-[#f7f3ec]">
        <div className="container">
          <div className="text-center mb-10">
            <div className="teal-divider mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-[#080808] mb-3" style={{ fontFamily: 'DM Serif Display, Georgia, serif' }}>
              Why Industry-Specific Processing Matters
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto text-sm">
              Generic payment processors apply the same rates and restrictions to every business. The result is overpaying on processing costs, missing integrations, and accounts that get terminated without warning.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyItMatters.map((item) => (
              <div key={item.title} className="bg-white rounded-2xl p-6 shadow-sm">
                <item.icon size={28} className="text-[#c9a84c] mb-4" />
                <h3 className="font-bold text-[#080808] mb-2 text-sm">{item.title}</h3>
                <p className="text-gray-500 text-xs leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* High-Risk Industries */}
      <section className="py-16 bg-[#080808]" aria-labelledby="high-risk-heading">
        <div className="container">
          <div className="flex items-center gap-3 mb-2">
            <ShieldAlert size={22} className="text-[#d4a843]" aria-hidden="true" />
            <h2 id="high-risk-heading" className="text-3xl font-bold text-white" style={{ fontFamily: 'DM Serif Display, Georgia, serif' }}>
              High-Risk Industries
            </h2>
            <span className="px-2 py-0.5 rounded text-xs font-bold bg-[#d4a843]/20 text-[#d4a843] uppercase tracking-wide">Specialized</span>
          </div>
          <p className="text-white/60 text-sm mb-4 max-w-2xl">
            Many legitimate businesses are classified as high-risk by traditional banks. We work with specialized acquiring banks to secure stable merchant accounts — with transparent pricing, dedicated local support, and no surprise terminations.
          </p>
          <div className="flex flex-wrap gap-3 mb-10">
            {[
              { icon: "✅", text: "Stable accounts through specialized banks" },
              { icon: "💰", text: "Transparent pricing — no hidden surcharges" },
              { icon: "🛡️", text: "Chargeback management included" },
              { icon: "📞", text: "Dedicated local support team" },
            ].map((item) => (
              <div key={item.text} className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-2 text-sm text-white/70">
                <span>{item.icon}</span>{item.text}
              </div>
            ))}
          </div>
          <Link
            href="/solutions/high-risk-processing"
            className="flex items-center gap-4 p-5 rounded-2xl bg-[#d4a843]/10 border border-[#d4a843]/25 hover:bg-[#d4a843]/15 transition-all mb-8 group"
          >
            <span className="text-3xl" aria-hidden="true">🛡️</span>
            <div className="flex-1">
              <div className="text-[#d4a843] font-bold text-base mb-0.5">High-Risk Merchant Processing Overview</div>
              <div className="text-white/50 text-sm">Understand rates, rolling reserves, approval requirements, and how to get started with a high-risk account</div>
            </div>
            <ChevronRight size={18} className="text-[#d4a843] group-hover:translate-x-1 transition-transform" aria-hidden="true" />
          </Link>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {highRiskIndustries.map((ind) => {
              const detail = industryDetails[ind.href];
              if (!detail) return null;
              return (
                <div key={ind.href} className="rounded-2xl border border-white/10 bg-[#111111] hover:border-[#d4a843]/40 hover:shadow-xl transition-all flex flex-col">
                  <div className="p-6 pb-4 border-b border-white/5">
                    <div className="flex items-center gap-3 mb-3">
                      <IndustryIcon icon={ind.icon} size={30} className="text-white" />
                      <h3 className="text-lg font-bold text-white" style={{ fontFamily: 'DM Serif Display, Georgia, serif' }}>{ind.label}</h3>
                    </div>
                    <p className="text-white/50 text-sm leading-relaxed">{detail.tagline}</p>
                  </div>
                  <div className="px-6 py-4 border-b border-white/5">
                    <p className="text-xs font-semibold uppercase tracking-widest text-white/30 mb-2">Common Challenges</p>
                    <ul className="space-y-1">
                      {detail.painPoints.map((p) => (
                        <li key={p} className="flex items-start gap-2 text-xs text-white/40">
                          <span className="text-[#d4a843] mt-0.5">•</span>{p}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="px-6 py-4 flex-1">
                    <p className="text-xs font-semibold uppercase tracking-widest text-white/30 mb-3">Our Solutions</p>
                    <div className="grid grid-cols-2 gap-2">
                      {detail.solutions.map((s) => (
                        <div key={s.title} className="bg-white/5 rounded-xl p-3">
                          <div className="text-lg mb-1"><IndustryIcon icon={s.icon} size={20} className="text-white" /></div>
                          <div className="text-xs font-bold text-white mb-0.5">{s.title}</div>
                          <div className="text-xs text-white/35 leading-tight">{s.desc}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="px-6 pb-6 pt-2">
                    <Link
                      href={ind.href}
                      className="flex items-center justify-between w-full px-4 py-2.5 rounded-xl bg-[#d4a843]/20 border border-[#d4a843]/30 text-[#d4a843] text-sm font-semibold hover:bg-[#d4a843]/30 transition-colors group"
                    >
                      <span>{detail.cta}</span>
                      <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Proof strip */}
      <section className="py-12 bg-white border-t border-gray-100">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            {[
              { value: "22+", label: "Industries Served", sub: "From restaurants to high-risk verticals" },
              { value: "20+", label: "Years of Experience", sub: "the UBC Unlimited team" },
              { value: "24–48h", label: "Typical Approval Time", sub: "Most accounts approved and processing" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-4xl font-extrabold text-[#c9a84c] mb-1" style={{ fontFamily: 'DM Serif Display, Georgia, serif' }}>{stat.value}</div>
                <div className="font-bold text-[#080808] text-sm mb-0.5">{stat.label}</div>
                <div className="text-gray-400 text-xs">{stat.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTABanner
        title="Not Sure Which Category Fits Your Business?"
        subtitle="Contact us for a consultation. We'll evaluate your business, explain your options, and find the right processing solution — regardless of your risk classification."
      />
    </PageLayout>
  );
}

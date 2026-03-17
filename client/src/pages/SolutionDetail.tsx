import { Link } from "wouter";
import { ArrowRight, CheckCircle, ChevronRight } from "lucide-react";
import PageLayout from "@/components/layout/PageLayout";
import CTABanner from "@/components/sections/CTABanner";
import FAQ from "@/components/sections/FAQ";
import { NAV_SOLUTIONS } from "@/lib/config";

export interface SolutionData {
  slug: string;
  icon: string;
  title: string;
  subtitle: string;
  description: string;
  heroPoints: string[];
  features: { title: string; desc: string }[];
  benefits: string[];
  faqs: { question: string; answer: string }[];
  relatedSolutions?: string[];
}

const solutionsData: SolutionData[] = [
  {
    slug: "credit-card-processing",
    icon: "💳",
    title: "Credit Card Processing",
    subtitle: "Accept all major cards with transparent, competitive rates",
    description: "UBC Unlimited offers interchange-plus credit card processing with no hidden fees, next-day funding, and full EMV/NFC support. Whether you're a restaurant, retailer, or service business, we have the right solution.",
    heroPoints: ["Interchange-plus pricing", "Next-day funding available", "Visa, MC, Amex, Discover", "No long-term contracts"],
    features: [
      { title: "Interchange-Plus Pricing", desc: "The most transparent pricing model in the industry. You see exactly what the card networks charge and exactly what we charge." },
      { title: "Next-Day Funding", desc: "Get your money faster. Funds deposited directly to your bank account the next business day." },
      { title: "EMV & Contactless", desc: "Accept chip cards, tap-to-pay, Apple Pay, Google Pay, and all modern payment methods." },
      { title: "Fraud Protection", desc: "Advanced fraud detection and chargeback management to protect your revenue." },
      { title: "Detailed Reporting", desc: "Real-time transaction reporting, batch summaries, and monthly statements." },
      { title: "No Hidden Fees", desc: "We show you every fee upfront. No surprises on your monthly statement." },
    ],
    benefits: ["Maximize profits while minimizing the cost to accept payments", "Dedicated local Utah support", "Free equipment with qualifying accounts", "Month-to-month agreements"],
    faqs: [
      { question: "What credit card processing rates do you offer?", answer: "We work with you to set up pricing that optimizes your profitability. Depending on your business type and volume, we can structure Flat Rate, Multi-Tiered, or Interchange-Plus pricing. We can also set you up to be compliant for surcharging, cash discounting, or dual pricing models — all designed to maximize your profits while minimizing the cost to accept payments." },
      { question: "How quickly will I receive my funds?", answer: "Standard funding is next business day. Expedited funding may be available for qualifying accounts — ask us about your options." },
      { question: "Do I need new equipment?", answer: "We can often reprogram your existing equipment. If you need new terminals, we offer free equipment with qualifying accounts." },
      { question: "Are there cancellation fees?", answer: "Generally, no cancellation fees apply — we believe in earning your business every month, not locking you in. However, certain types of businesses or solutions require a formal agreement, and in those cases cancellation fees are based on the terms of the individual agreement. We are upfront about this before you sign anything." },
    ],
    relatedSolutions: ["/solutions/pos-systems", "/solutions/mobile-processing", "/solutions/virtual-terminals"],
  },
  {
    slug: "ach-echeck-processing",
    icon: "🏦",
    title: "ACH & eCheck Processing",
    subtitle: "Process bank transfers at a fraction of card costs",
    description: "ACH and eCheck processing lets you accept bank transfers directly, bypassing card network fees. Ideal for recurring billing, B2B payments, and high-ticket transactions.",
    heroPoints: ["Lower cost than credit cards", "Recurring billing support", "Fast ACH settlement", "No card network fees"],
    features: [
      { title: "Lower Costs Than Credit Cards", desc: "ACH transactions typically cost a fraction of credit card processing fees — a significant savings for businesses with high transaction volumes." },
      { title: "Recurring Billing", desc: "Set up automatic recurring payments for subscriptions, memberships, and installment plans." },
      { title: "Fast ACH Settlement", desc: "Faster settlement options available for time-sensitive transactions — ask us about eligibility." },
      { title: "Batch Processing", desc: "Process hundreds of transactions at once with our bulk ACH upload tool." },
      { title: "Bank Verification", desc: "Real-time bank account verification to reduce failed transactions." },
      { title: "Detailed Reporting", desc: "Full transaction history, return reports, and reconciliation tools." },
    ],
    benefits: ["Dramatically lower costs for high-volume businesses", "Ideal for B2B and recurring payments", "Reduce chargebacks vs. credit cards", "Seamless integration with your accounting software"],
    faqs: [
      { question: "What is ACH processing?", answer: "ACH (Automated Clearing House) processing allows you to accept electronic bank transfers directly from your customers' bank accounts, bypassing credit card networks and their fees." },
      { question: "How long does ACH take to settle?", answer: "Standard ACH typically settles in 3–5 business days. Settlement timelines can vary based on your bank and transaction type." },
      { question: "Can I use ACH for recurring payments?", answer: "Yes. ACH is ideal for recurring billing — subscriptions, memberships, rent payments, and installment plans." },
    ],
    relatedSolutions: ["/solutions/invoicing", "/solutions/virtual-terminals", "/solutions/check-guarantee"],
  },
  {
    slug: "check-guarantee",
    icon: "✅",
    title: "Check Guarantee",
    subtitle: "Accept checks with confidence — guaranteed payment",
    description: "Our check guarantee service eliminates the risk of bounced checks. We verify checks in real-time and guarantee payment, so you can accept checks without worry.",
    heroPoints: ["100% payment guarantee", "Check verification service", "No chargeback risk", "Instant approval"],
    features: [
      { title: "Check Verification Service", desc: "Checks are verified against a database of bad check writers to help reduce your risk before you accept them." },
      { title: "Guaranteed Payment", desc: "If a guaranteed check bounces, we pay you — then we collect from the check writer." },
      { title: "Electronic Check Conversion", desc: "Convert paper checks to electronic transactions for faster processing." },
      { title: "Check Recovery", desc: "We handle all collections on returned items so you don't have to." },
      { title: "Reporting Dashboard", desc: "Track all check transactions and guarantee claims in one place." },
      { title: "POS Integration", desc: "Works with most POS systems and check readers." },
    ],
    benefits: ["Eliminate bad check losses", "Accept more payment methods", "Reduce collection headaches", "Increase sales by accepting checks"],
    faqs: [
      { question: "What happens if a guaranteed check bounces?", answer: "If we approved the check and it bounces, we pay you the full amount. We then pursue collection from the check writer — you're completely protected." },
      { question: "How does the verification work?", answer: "We check the account and routing number against a national database of bad check writers and closed accounts in real-time, usually in under 5 seconds." },
    ],
    relatedSolutions: ["/solutions/ach-echeck-processing", "/solutions/credit-card-processing"],
  },
  {
    slug: "pos-systems",
    icon: "🖥️",
    title: "POS Systems",
    subtitle: "Full-featured point-of-sale for restaurants, retail & more",
    description: "We offer industry-leading POS systems including SkyTab and Clover, tailored to your business type. From table management to inventory tracking, we have the complete solution.",
    heroPoints: ["SkyTab & Clover systems", "Restaurant & retail ready", "Inventory management", "Local expert support"],
    features: [
      { title: "SkyTab POS", desc: "The industry's leading restaurant POS with tableside ordering, kitchen display systems, and online ordering integration." },
      { title: "Clover POS", desc: "Flexible POS for retail, service, and quick-service businesses with a rich app marketplace." },
      { title: "Inventory Management", desc: "Track stock levels, set reorder alerts, and manage suppliers from your POS." },
      { title: "Employee Management", desc: "Time clocks, scheduling, tip management, and performance reporting." },
      { title: "Loyalty Programs", desc: "Built-in customer loyalty and gift card programs to drive repeat business." },
      { title: "Reporting & Analytics", desc: "Real-time sales reports, labor cost analysis, and trend insights." },
    ],
    benefits: ["Industry-specific configurations", "Free installation and training", "Ongoing local support", "Seamless payment integration"],
    faqs: [
      { question: "Which POS system is right for my business?", answer: "It depends on your business type. SkyTab is ideal for restaurants and bars. Clover is great for retail, salons, and service businesses. We'll help you choose during a free consultation." },
      { question: "Do you provide training?", answer: "Yes. Our local team provides on-site installation and training for all POS systems." },
      { question: "What if I have issues after setup?", answer: "We provide ongoing technical support during business hours. For local Utah businesses, we can also dispatch a technician for on-site support when needed." },
    ],
    relatedSolutions: ["/solutions/credit-card-processing", "/solutions/mobile-processing", "/solutions/invoicing"],
  },
  {
    slug: "ecommerce-payments",
    icon: "🛒",
    title: "eCommerce Payments",
    subtitle: "Secure online payment gateways for your website",
    description: "Accept payments on your website with our secure payment gateway solutions. We work with a variety of payment gateways — including Authorize.net, Fluidpay, Quantum Gateway, NMI, and many more — to find the best fit for your platform, business type, and transaction volume.",
    heroPoints: ["Multiple gateway options", "Advanced fraud protection", "Recurring billing", "Mobile optimized checkout"],
    features: [
      { title: "Multiple Gateway Options", desc: "We partner with Authorize.net, Fluidpay, Quantum Gateway, NMI, and many more. We work together to determine the best gateway for your specific needs." },
      { title: "Shopping Cart Integration", desc: "Works with WooCommerce, Shopify, Magento, BigCommerce, and 100+ more platforms." },
      { title: "Fraud Protection", desc: "Advanced fraud screening with AVS, CVV, velocity filters, and customizable rules to protect your business." },
      { title: "Recurring Billing", desc: "Subscription management and recurring payment tools built in." },
      { title: "Mobile Checkout", desc: "Optimized checkout experience for mobile shoppers." },
      { title: "Hosted Payment Pages", desc: "Secure, branded payment pages that don't require PCI compliance on your server." },
    ],
    benefits: ["Right gateway for your business — not a one-size-fits-all approach", "Accept international payments", "Lower fraud losses", "Increase conversions with optimized checkout"],
    faqs: [
      { question: "What payment gateways do you support?", answer: "We work with a wide variety of gateways including Authorize.net, Fluidpay, Quantum Gateway, NMI, and many more. During your consultation, we'll evaluate your platform, volume, and business type to recommend the best fit." },
      { question: "What platforms do you integrate with?", answer: "We integrate with all major eCommerce platforms including WooCommerce, Shopify, Magento, BigCommerce, and custom-built websites via API." },
      { question: "How do you handle fraud?", answer: "Our gateway options include AVS verification, CVV checking, velocity filters, and machine learning fraud detection to protect your revenue." },
      { question: "Can you support high-risk eCommerce businesses?", answer: "Yes, on a case-by-case basis. Certain gateways in our network are specifically designed for high-risk and specialty merchants. We'll evaluate your business and connect you with the right solution." },
    ],
    relatedSolutions: ["/solutions/virtual-terminals", "/solutions/invoicing", "/solutions/mobile-processing"],
  },
  {
    slug: "mobile-processing",
    icon: "📱",
    title: "Mobile Processing",
    subtitle: "Accept payments anywhere with your smartphone",
    description: "Turn your smartphone or tablet into a payment terminal. Our mobile processing solutions are perfect for businesses on the go — farmers markets, trade shows, food trucks, and more.",
    heroPoints: ["Bluetooth card readers", "iOS & Android apps", "Offline mode", "Instant deposits"],
    features: [
      { title: "Bluetooth Card Reader", desc: "Compact, durable card readers that pair with your smartphone via Bluetooth." },
      { title: "Mobile App", desc: "Full-featured payment app for iOS and Android with inventory and reporting." },
      { title: "Offline Mode", desc: "Accept payments even without an internet connection — transactions sync when you reconnect." },
      { title: "Digital Receipts", desc: "Send receipts via email or SMS — no paper required." },
      { title: "Tip Management", desc: "Built-in tip prompts and tip reporting for service businesses." },
      { title: "Inventory Tracking", desc: "Manage your product catalog and track sales from your mobile device." },
    ],
    benefits: ["No monthly fees on basic plans", "Accept all payment types", "Perfect for mobile businesses", "Fast funding options available"],
    faqs: [
      { question: "What card reader do you use?", answer: "We offer Bluetooth card readers that accept chip, swipe, and tap-to-pay. They work with both iOS and Android devices." },
      { question: "Can I use it without internet?", answer: "This varies depending on the individual solution. Some of our mobile processing solutions include an offline mode that allows you to accept swiped transactions without an active internet connection — transactions queue locally and sync automatically when you reconnect. Ask us which solutions support offline mode for your specific setup." },
    ],
    relatedSolutions: ["/solutions/credit-card-processing", "/solutions/pos-systems"],
  },
  {
    slug: "virtual-terminals",
    icon: "💻",
    title: "Virtual Terminals",
    subtitle: "Process payments from any browser, no hardware needed",
    description: "Our virtual terminal lets you process credit card payments from any computer or tablet — perfect for phone orders, mail orders, and card-not-present transactions.",
    heroPoints: ["Browser-based, no hardware", "MOTO transactions", "Secure card vault", "Batch processing"],
    features: [
      { title: "Browser-Based", desc: "Access your virtual terminal from any computer, tablet, or smartphone with a browser." },
      { title: "Card Vault", desc: "Securely store customer card information for repeat transactions and recurring billing." },
      { title: "MOTO Transactions", desc: "Process mail order and telephone order transactions securely." },
      { title: "Batch Processing", desc: "Upload and process multiple transactions at once." },
      { title: "Recurring Billing", desc: "Set up automatic recurring charges for subscriptions and installment plans." },
      { title: "Detailed Reporting", desc: "Full transaction history with search, filter, and export capabilities." },
    ],
    benefits: ["No hardware investment required", "Process from anywhere", "Ideal for phone and mail orders", "Secure PCI-compliant environment"],
    faqs: [
      { question: "What is a virtual terminal?", answer: "A virtual terminal is a web-based application that lets you manually enter credit card information to process payments — no physical card reader required." },
      { question: "Is it secure?", answer: "Yes. Our virtual terminal is fully PCI DSS compliant with SSL encryption and tokenization to protect cardholder data." },
    ],
    relatedSolutions: ["/solutions/ecommerce-payments", "/solutions/invoicing", "/solutions/ach-echeck-processing"],
  },
  {
    slug: "invoicing",
    icon: "📄",
    title: "Invoicing",
    subtitle: "Send professional invoices and get paid faster",
    description: "Create and send professional invoices with online payment links. Customers pay instantly by card or ACH — no more waiting for checks in the mail.",
    heroPoints: ["Custom branded invoices", "Online payment links", "Auto-reminders", "Recurring invoices"],
    features: [
      { title: "Professional Templates", desc: "Customizable invoice templates with your logo and branding." },
      { title: "Online Payment Links", desc: "Customers click a link and pay instantly by card or bank transfer." },
      { title: "Automatic Reminders", desc: "Set up automatic payment reminders to reduce late payments." },
      { title: "Recurring Invoices", desc: "Automate recurring billing for retainer clients and subscriptions." },
      { title: "Payment Tracking", desc: "See which invoices are paid, pending, or overdue at a glance." },
      { title: "QuickBooks Integration", desc: "Sync with QuickBooks and other accounting software." },
    ],
    benefits: ["Get paid 2x faster than paper invoices", "Reduce accounts receivable", "Professional brand presentation", "Reduce manual data entry"],
    faqs: [
      { question: "Can customers pay by credit card and ACH?", answer: "Yes. Your invoices include payment links that accept all major credit cards and ACH bank transfers." },
      { question: "Does it integrate with my accounting software?", answer: "We integrate with QuickBooks, Xero, FreshBooks, and other popular accounting platforms." },
    ],
    relatedSolutions: ["/solutions/ach-echeck-processing", "/solutions/virtual-terminals", "/solutions/ecommerce-payments"],
  },
];

interface SolutionDetailPageProps {
  slug: string;
}

export default function SolutionDetailPage({ slug }: SolutionDetailPageProps) {
  const data = solutionsData.find((s) => s.slug === slug);

  if (!data) {
    return (
      <PageLayout>
        <div className="container py-20 text-center">
          <h1 className="text-2xl font-bold text-[#040c1c]">Solution not found</h1>
          <Link href="/solutions" className="btn-teal mt-4 inline-flex">Back to Solutions</Link>
        </div>
      </PageLayout>
    );
  }

  const relatedItems = NAV_SOLUTIONS.filter((s) => data.relatedSolutions?.includes(s.href));

  const TERMINAL_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663396807781/BUvnwzJnwMZHoEGpybj36j/hero-main_f46e2fbc.jpg";
  const isCreditCard = data.slug === "credit-card-processing";

  return (
    <PageLayout>
      {/* Hero */}
      <section className="relative bg-[#040c1c] py-20 overflow-hidden">
        {isCreditCard && (
          <>
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${TERMINAL_IMG})`, opacity: 0.18 }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#040c1c] via-[#040c1c]/80 to-[#040c1c]/30" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#040c1c] via-transparent to-transparent" />
          </>
        )}
        <div className="container relative z-10">
          {isCreditCard ? (
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="flex items-center gap-2 text-white/40 text-sm mb-5">
                  <Link href="/" className="hover:text-white transition-colors">Home</Link>
                  <ChevronRight size={14} />
                  <Link href="/solutions" className="hover:text-white transition-colors">Solutions</Link>
                  <ChevronRight size={14} />
                  <span className="text-white/70">{data.title}</span>
                </div>
                <div className="text-4xl mb-4">{data.icon}</div>
                <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4" style={{ fontFamily: 'Sora, sans-serif' }}>
                  {data.title}
                </h1>
                <p className="text-white/70 text-lg mb-6">{data.subtitle}</p>
                <p className="text-white/60 mb-8 leading-relaxed">{data.description}</p>
                <div className="flex flex-wrap gap-3 mb-8">
                  {data.heroPoints.map((p) => (
                    <div key={p} className="flex items-center gap-1.5 text-sm text-white/70">
                      <CheckCircle size={14} className="text-[#169fa8]" />
                      {p}
                    </div>
                  ))}
                </div>
                <div className="flex gap-4">
                  <Link href="/consultation" className="btn-gold">Get a Free Quote <ArrowRight size={16} /></Link>
                  <Link href="/statement-review" className="btn-outline-white">Free Statement Review</Link>
                </div>
              </div>
              <div className="hidden lg:block">
                <img
                  src={TERMINAL_IMG}
                  alt="Modern credit card terminal with city skyline — UBC Unlimited merchant services"
                  className="rounded-2xl shadow-2xl w-full object-cover aspect-[4/3]"
                />
              </div>
            </div>
          ) : (
            <>
              <div className="flex items-center gap-2 text-white/40 text-sm mb-5">
                <Link href="/" className="hover:text-white transition-colors">Home</Link>
                <ChevronRight size={14} />
                <Link href="/solutions" className="hover:text-white transition-colors">Solutions</Link>
                <ChevronRight size={14} />
                <span className="text-white/70">{data.title}</span>
              </div>
              <div className="max-w-2xl">
                <div className="text-4xl mb-4">{data.icon}</div>
                <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4" style={{ fontFamily: 'Sora, sans-serif' }}>
                  {data.title}
                </h1>
                <p className="text-white/70 text-lg mb-6">{data.subtitle}</p>
                <p className="text-white/60 mb-8 leading-relaxed">{data.description}</p>
                <div className="flex flex-wrap gap-3 mb-8">
                  {data.heroPoints.map((p) => (
                    <div key={p} className="flex items-center gap-1.5 text-sm text-white/70">
                      <CheckCircle size={14} className="text-[#169fa8]" />
                      {p}
                    </div>
                  ))}
                </div>
                <div className="flex gap-4">
                  <Link href="/consultation" className="btn-gold">Get a Free Quote <ArrowRight size={16} /></Link>
                  <Link href="/statement-review" className="btn-outline-white">Free Statement Review</Link>
                </div>
              </div>
            </>
          )}
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="text-center mb-10">
            <div className="teal-divider mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-[#040c1c]" style={{ fontFamily: 'Sora, sans-serif' }}>Features & Capabilities</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {data.features.map((f) => (
              <div key={f.title} className="p-5 rounded-xl border border-gray-100 hover:border-[#169fa8]/30 hover:shadow-md transition-all">
                <h3 className="font-bold text-[#040c1c] mb-2" style={{ fontFamily: 'Sora, sans-serif' }}>{f.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-14 bg-[#f8fafc]">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-[#040c1c] mb-6" style={{ fontFamily: 'Sora, sans-serif' }}>Why Choose UBC Unlimited</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {data.benefits.map((b) => (
                <div key={b} className="flex items-center gap-2.5 bg-white rounded-lg p-3.5 border border-gray-100 text-sm text-[#040c1c]">
                  <CheckCircle size={16} className="text-[#169fa8] shrink-0" />
                  {b}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Gateway Logos — eCommerce only */}
      {data.slug === "ecommerce-payments" && (
        <section className="py-16 bg-white border-t border-gray-100">
          <div className="container">
            <div className="text-center mb-10">
              <div className="teal-divider mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-[#040c1c] mb-3" style={{ fontFamily: 'Sora, sans-serif' }}>Gateway Partners We Work With</h2>
              <p className="text-gray-500 max-w-2xl mx-auto">We work with a variety of payment gateways and collaborate with you to determine the best option based on your platform, business type, and transaction needs.</p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
              {/* Authorize.net */}
              <div className="flex flex-col items-center gap-3 group">
                <div className="w-44 h-20 bg-white rounded-xl border border-gray-200 shadow-sm flex items-center justify-center p-4 group-hover:border-[#169fa8]/40 group-hover:shadow-md transition-all">
                  <img src="https://d2xsxph8kpxj0f.cloudfront.net/310519663396807781/BUvnwzJnwMZHoEGpybj36j/authorize-net_4b70b746.png" alt="Authorize.net" className="max-h-10 max-w-full object-contain" />
                </div>
                <span className="text-xs text-gray-400 font-medium">Authorize.net</span>
              </div>
              {/* NMI */}
              <div className="flex flex-col items-center gap-3 group">
                <div className="w-44 h-20 bg-white rounded-xl border border-gray-200 shadow-sm flex items-center justify-center p-4 group-hover:border-[#169fa8]/40 group-hover:shadow-md transition-all">
                  <img src="https://d2xsxph8kpxj0f.cloudfront.net/310519663396807781/BUvnwzJnwMZHoEGpybj36j/nmi_cc167af1.png" alt="NMI" className="max-h-10 max-w-full object-contain" />
                </div>
                <span className="text-xs text-gray-400 font-medium">NMI</span>
              </div>
              {/* Quantum Gateway */}
              <div className="flex flex-col items-center gap-3 group">
                <div className="w-44 h-20 bg-white rounded-xl border border-gray-200 shadow-sm flex items-center justify-center p-4 group-hover:border-[#169fa8]/40 group-hover:shadow-md transition-all">
                  <img src="https://d2xsxph8kpxj0f.cloudfront.net/310519663396807781/BUvnwzJnwMZHoEGpybj36j/quantum-gateway_fd6105e8.jpg" alt="Quantum Gateway" className="max-h-10 max-w-full object-contain" />
                </div>
                <span className="text-xs text-gray-400 font-medium">Quantum Gateway</span>
              </div>
              {/* Fluidpay */}
              <div className="flex flex-col items-center gap-3 group">
                <div className="w-44 h-20 bg-white rounded-xl border border-gray-200 shadow-sm flex items-center justify-center p-4 group-hover:border-[#169fa8]/40 group-hover:shadow-md transition-all">
                  <img src="https://www.fluidpay.com/images/general/logo.svg" alt="Fluidpay" className="max-h-10 max-w-full object-contain" />
                </div>
                <span className="text-xs text-gray-400 font-medium">Fluidpay</span>
              </div>
              {/* iPosPays */}
              <div className="flex flex-col items-center gap-3 group">
                <div className="w-44 h-20 bg-white rounded-xl border border-gray-200 shadow-sm flex items-center justify-center p-4 group-hover:border-[#169fa8]/40 group-hover:shadow-md transition-all">
                  <img src="https://d2xsxph8kpxj0f.cloudfront.net/310519663396807781/BUvnwzJnwMZHoEGpybj36j/ipospays-logo_6aaa431d.png" alt="iPosPays" className="max-h-10 max-w-full object-contain" />
                </div>
                <span className="text-xs text-gray-400 font-medium">iPosPays</span>
              </div>
              {/* And More */}
              <div className="flex flex-col items-center gap-3 group">
                <div className="w-44 h-20 bg-[#f8fafc] rounded-xl border border-dashed border-[#169fa8]/40 shadow-sm flex items-center justify-center p-4 group-hover:bg-[#169fa8]/5 transition-all">
                  <span className="text-[#169fa8] font-semibold text-sm text-center leading-tight">+ Many More<br /><span className="text-gray-400 font-normal text-xs">Ask us about your platform</span></span>
                </div>
                <span className="text-xs text-gray-400 font-medium">And More</span>
              </div>
            </div>
            <div className="text-center mt-10">
              <p className="text-gray-500 text-sm mb-4">Not sure which gateway is right for you? We'll help you choose.</p>
              <a href="/consultation" className="btn-teal inline-flex items-center gap-2">Book a Free Consultation <ArrowRight size={15} /></a>
            </div>
          </div>
        </section>
      )}

      <FAQ items={data.faqs} />

      {/* Related */}
      {relatedItems.length > 0 && (
        <section className="py-12 bg-white">
          <div className="container">
            <h2 className="text-xl font-bold text-[#040c1c] mb-5" style={{ fontFamily: 'Sora, sans-serif' }}>Related Solutions</h2>
            <div className="flex flex-wrap gap-3">
              {relatedItems.map((item) => (
                <Link key={item.href} href={item.href} className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-gray-200 hover:border-[#169fa8]/40 hover:bg-[#169fa8]/5 transition-all text-sm font-medium text-[#040c1c]">
                  <span>{item.icon}</span> {item.label} <ChevronRight size={13} className="text-[#169fa8]" />
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <CTABanner />
    </PageLayout>
  );
}

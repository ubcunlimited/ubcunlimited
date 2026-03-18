import { Link } from "wouter";
import { ArrowRight, CheckCircle, ChevronRight } from "lucide-react";
import PageLayout from "@/components/layout/PageLayout";
import CTABanner from "@/components/sections/CTABanner";
import FAQ from "@/components/sections/FAQ";
import SkyTabPOSBuilder from "@/components/sections/SkyTabPOSBuilder";
import { NAV_INDUSTRIES, NAV_SOLUTIONS } from "@/lib/config";

export interface IndustryData {
  slug: string;
  icon: string;
  title: string;
  subtitle: string;
  description: string;
  challenges: string[];
  solutions: { title: string; desc: string }[];
  recommendedSolutions: string[];
  faqs: { question: string; answer: string }[];
}

const industriesData: IndustryData[] = [
  {
    slug: "restaurants",
    icon: "🍽️",
    title: "Restaurants",
    subtitle: "Payment solutions built for the pace of restaurant service",
    description: "From fast-casual to fine dining, UBC Unlimited provides restaurant-specific POS systems and payment processing that keep your kitchen and front-of-house running smoothly.",
    challenges: ["High transaction volume during rushes", "Tip management complexity", "Table management and splitting checks", "Online ordering integration"],
    solutions: [
      { title: "SkyTab POS", desc: "Industry-leading restaurant POS with tableside ordering, kitchen display systems, and online ordering built in." },
      { title: "Tip Management", desc: "Automatic tip prompts, tip pooling, and end-of-day tip reports for your entire staff." },
      { title: "Online Ordering", desc: "Integrated online ordering that flows directly into your kitchen — no third-party tablet chaos." },
      { title: "Table Management", desc: "Visual floor plan, table status tracking, and server assignment from one screen." },
    ],
    recommendedSolutions: ["/solutions/pos-systems", "/solutions/credit-card-processing", "/solutions/mobile-processing"],
    faqs: [
      { question: "What POS system do you recommend for restaurants?", answer: "We typically recommend SkyTab for full-service restaurants. It offers tableside ordering, kitchen display systems, online ordering integration, and robust reporting — all in one system." },
      { question: "Can I accept tips with your system?", answer: "Yes. Our restaurant POS systems include tip prompts on customer-facing screens, tip pooling, and automatic tip reporting for payroll." },
      { question: "Do you integrate with online ordering platforms?", answer: "Yes. We integrate with major online ordering platforms and also offer our own integrated online ordering solution that flows directly into your POS." },
    ],
  },
  {
    slug: "bars-nightclubs",
    icon: "🍺",
    title: "Bars & Nightclubs",
    subtitle: "Fast, reliable payment solutions for high-volume bar environments",
    description: "Bars and nightclubs need payment systems that can keep up with the pace — fast tab management, split checks, and reliable processing even during your busiest nights.",
    challenges: ["Fast tab opening and closing", "Split check complexity", "High transaction volume", "Staff tip management"],
    solutions: [
      { title: "Fast Tab Management", desc: "Open, transfer, and close tabs in seconds. Keep the line moving even on your busiest nights." },
      { title: "Pre-Auth Holds", desc: "Hold a card on file for a tab and capture the final amount at close — reduce walkouts." },
      { title: "Split Checks", desc: "Split any check by item, by amount, or evenly between multiple cards." },
      { title: "Bar-Specific Reporting", desc: "Track your best-selling drinks, busiest hours, and staff performance." },
    ],
    recommendedSolutions: ["/solutions/pos-systems", "/solutions/credit-card-processing", "/solutions/mobile-processing"],
    faqs: [
      { question: "Can I pre-authorize cards for tabs?", answer: "Yes. Our bar POS systems support pre-authorization holds, so you can hold a card on file and capture the final amount when the customer closes out." },
      { question: "How do you handle walkouts?", answer: "Pre-auth holds significantly reduce walkouts. For additional protection, we offer chargeback management services." },
    ],
  },
  {
    slug: "retail",
    icon: "🛍️",
    title: "Retail",
    subtitle: "Complete retail payment and POS solutions for Utah stores",
    description: "From boutiques to hardware stores, UBC Unlimited provides retail-optimized POS systems with inventory management, barcode scanning, and customer loyalty programs.",
    challenges: ["Inventory tracking across multiple locations", "Barcode scanning and SKU management", "Customer loyalty and gift cards", "Employee management"],
    solutions: [
      { title: "Inventory Management", desc: "Track stock levels, set reorder points, and manage suppliers from your POS." },
      { title: "Barcode Scanning", desc: "Fast checkout with barcode scanning and automatic price lookup." },
      { title: "Loyalty Programs", desc: "Built-in customer loyalty points and gift card programs to drive repeat business." },
      { title: "Multi-Location Support", desc: "Manage inventory and reporting across multiple store locations from one dashboard." },
    ],
    recommendedSolutions: ["/solutions/pos-systems", "/solutions/credit-card-processing", "/solutions/ecommerce-payments"],
    faqs: [
      { question: "Can I manage inventory across multiple locations?", answer: "Yes. Our retail POS systems support multi-location inventory management with centralized reporting." },
      { question: "Do you offer gift card programs?", answer: "Yes. We offer both physical and digital gift card programs that integrate with your POS." },
    ],
  },
  {
    slug: "medical",
    icon: "🏥",
    title: "Medical & Healthcare",
    subtitle: "HIPAA-aware payment solutions for medical practices",
    description: "Medical practices need payment solutions that handle insurance co-pays, patient payment plans, and high-ticket procedures — all while maintaining patient privacy.",
    challenges: ["Insurance co-pay processing", "Patient payment plans", "HIPAA compliance considerations", "Recurring billing for ongoing care"],
    solutions: [
      { title: "Patient Payment Plans", desc: "Set up installment plans for high-cost procedures and collect automatically." },
      { title: "Recurring Billing", desc: "Automate recurring charges for ongoing care, memberships, and subscription services." },
      { title: "Virtual Terminal", desc: "Process payments over the phone for telehealth and remote consultations." },
      { title: "Secure Card Vault", desc: "Store patient payment information securely for future transactions." },
    ],
    recommendedSolutions: ["/solutions/virtual-terminals", "/solutions/ach-echeck-processing", "/solutions/invoicing"],
    faqs: [
      { question: "Are your payment solutions HIPAA compliant?", answer: "Our payment processing solutions are PCI DSS compliant. We recommend working with your compliance officer to ensure your full payment workflow meets HIPAA requirements." },
      { question: "Can I set up payment plans for patients?", answer: "Yes. We offer recurring billing and installment plan tools that allow patients to pay over time automatically." },
    ],
  },
  {
    slug: "ecommerce",
    icon: "🌐",
    title: "eCommerce",
    subtitle: "Secure online payment solutions for Utah online stores",
    description: "Whether you're on Shopify, WooCommerce, or a custom platform, UBC Unlimited provides secure payment gateways with fraud protection and competitive rates.",
    challenges: ["Cart abandonment from poor checkout", "Fraud and chargebacks", "International payment acceptance", "Recurring subscription billing"],
    solutions: [
      { title: "Payment Gateway", desc: "Secure, fast payment gateway that integrates with all major eCommerce platforms." },
      { title: "Fraud Protection", desc: "Advanced fraud screening to reduce chargebacks and protect your revenue." },
      { title: "Optimized Checkout", desc: "Streamlined checkout flows that reduce abandonment and increase conversions." },
      { title: "Subscription Billing", desc: "Full subscription management for recurring revenue businesses." },
    ],
    recommendedSolutions: ["/solutions/ecommerce-payments", "/solutions/virtual-terminals", "/solutions/invoicing"],
    faqs: [
      { question: "What payment gateways do you support for eCommerce?", answer: "We work with a wide variety of payment gateways to ensure your online store has the right integration. Our supported gateways include Authorize.net, Fluidpay, Quantum Gateway, NMI, iPosPays, and many more. We work together with you to determine the best gateway option based on your business requirements, shopping cart platform, and transaction volume." },
      { question: "What eCommerce platforms do you support?", answer: "We support Shift4Shop, Shopify, WooCommerce, Magento, BigCommerce, and custom platforms via our API. Shift4Shop is our preferred end-to-end solution — it combines the website builder and payment gateway in one platform with no monthly fee when processing through UBC Unlimited." },
      { question: "How do you reduce chargebacks?", answer: "We use AVS verification, CVV checking, velocity filters, and machine learning fraud detection to minimize chargebacks." },
    ],
  },
  {
    slug: "automotive",
    icon: "🚗",
    title: "Automotive",
    subtitle: "Payment solutions for dealerships and auto repair shops",
    description: "Auto dealerships and repair shops need payment solutions that handle high-ticket transactions, parts inventory, and service scheduling — all in one system.",
    challenges: ["High-ticket transaction processing", "Parts and service inventory", "Customer financing integration", "Fleet account management"],
    solutions: [
      { title: "High-Ticket Processing", desc: "Accept large payments for vehicles and major repairs with competitive rates." },
      { title: "Parts Inventory", desc: "Track parts inventory and automatically update pricing at the point of sale." },
      { title: "Service Scheduling", desc: "Integrate payment collection with your service scheduling system." },
      { title: "Fleet Accounts", desc: "Manage fleet accounts and commercial billing for business customers." },
    ],
    recommendedSolutions: ["/solutions/credit-card-processing", "/solutions/virtual-terminals", "/solutions/invoicing"],
    faqs: [
      { question: "Do you offer competitive rates for high-ticket transactions?", answer: "Yes. We offer interchange-plus pricing which is especially beneficial for high-ticket transactions where flat-rate processors charge significantly more." },
    ],
  },
  {
    slug: "professional-services",
    icon: "💼",
    title: "Professional Services",
    subtitle: "Payment solutions for law firms, accountants, and consultants",
    description: "Professional service firms need invoicing, retainer billing, and virtual terminals that integrate with their practice management software.",
    challenges: ["Retainer and recurring billing", "Invoice payment collection", "Trust account compliance", "Remote payment acceptance"],
    solutions: [
      { title: "Professional Invoicing", desc: "Send branded invoices with online payment links — get paid faster." },
      { title: "Retainer Billing", desc: "Automate recurring retainer charges and track billing against retainer balances." },
      { title: "Virtual Terminal", desc: "Process payments over the phone or by mail without hardware." },
      { title: "ACH Processing", desc: "Accept bank transfers at lower cost — ideal for large invoices." },
    ],
    recommendedSolutions: ["/solutions/invoicing", "/solutions/virtual-terminals", "/solutions/ach-echeck-processing"],
    faqs: [
      { question: "Can I accept payments for retainers?", answer: "Yes. We offer recurring billing tools specifically designed for retainer-based billing, including automatic charges and balance tracking." },
      { question: "Do you integrate with legal practice management software?", answer: "We integrate with many practice management platforms. Contact us to discuss your specific software." },
    ],
  },
  {
    slug: "salons-spas",
    icon: "💅",
    title: "Salons & Spas",
    subtitle: "Complete payment solutions for beauty and wellness businesses",
    description: "Salons and spas need POS systems that handle appointments, tips, gift cards, and retail product sales — all in one seamless experience.",
    challenges: ["Appointment-integrated payments", "Tip management for stylists", "Gift card and loyalty programs", "Retail product sales"],
    solutions: [
      { title: "Appointment Integration", desc: "Collect payments seamlessly at checkout, tied directly to appointment records." },
      { title: "Tip Management", desc: "Tip prompts, tip pooling, and automatic tip reporting for your staff." },
      { title: "Gift Cards", desc: "Physical and digital gift cards that drive new customers and repeat visits." },
      { title: "Retail Sales", desc: "Sell retail products alongside services from the same POS system." },
    ],
    recommendedSolutions: ["/solutions/pos-systems", "/solutions/credit-card-processing", "/solutions/invoicing"],
    faqs: [
      { question: "Can I integrate with my booking software?", answer: "We integrate with many popular salon booking platforms. Contact us to discuss your specific software." },
      { question: "How do you handle tip distribution?", answer: "Our POS systems include tip pooling, individual tip tracking, and automatic tip reports for payroll processing." },
    ],
  },
  {
    slug: "property-management",
    icon: "🏢",
    title: "Property Management",
    subtitle: "Recurring rent payments and tenant payment portals",
    description: "Property managers need reliable recurring payment collection, ACH processing, and tenant-facing payment portals that reduce late payments and manual collection work.",
    challenges: ["Recurring rent collection", "Late payment reduction", "Multiple property management", "Tenant payment convenience"],
    solutions: [
      { title: "Recurring ACH Payments", desc: "Automate monthly rent collection via ACH bank transfer at very low cost." },
      { title: "Tenant Payment Portal", desc: "Give tenants a branded online portal to pay rent by card or bank transfer." },
      { title: "Late Payment Reminders", desc: "Automatic payment reminders reduce late payments without awkward conversations." },
      { title: "Multi-Property Reporting", desc: "Track payment status across all your properties from one dashboard." },
    ],
    recommendedSolutions: ["/solutions/ach-echeck-processing", "/solutions/invoicing", "/solutions/virtual-terminals"],
    faqs: [
      { question: "Can tenants pay online?", answer: "Yes. We provide a branded tenant payment portal where tenants can pay rent by credit card or ACH bank transfer." },
      { question: "Can I use ACH for recurring payments?", answer: "Yes. ACH is ideal for recurring billing \u2014 subscriptions, memberships, rent payments, and installment plans. We can set up automatic recurring drafts with customer authorization." },],
  },
  {
    slug: "firearms",
    icon: "🎯",
    title: "Firearms & Shooting Sports",
    subtitle: "Compliant payment processing for FFL dealers, gun shops, and shooting ranges",
    description: "Firearms retailers and shooting ranges operate in a highly regulated industry that many payment processors won't touch. UBC Unlimited works with specialized banking partners to provide reliable, compliant payment processing for FFL dealers, gun shops, ammo retailers, and shooting ranges across Utah.",
    challenges: [
      "High-risk merchant account approval",
      "Processor drop risk and sudden account termination",
      "Age verification and compliance requirements",
      "Online sales and FFL transfer payment processing",
    ],
    solutions: [
      { title: "High-Risk Merchant Accounts", desc: "We work with banking partners experienced in firearms retail — no surprise terminations or holds on your funds." },
      { title: "In-Store POS Systems", desc: "Full POS systems for gun shops with inventory tracking, layaway management, and compliance reporting." },
      { title: "Online Payment Gateways", desc: "Accept payments on your eCommerce site for accessories, ammo, and FFL transfer fees — with compliant processors." },
      { title: "Virtual Terminal", desc: "Process phone orders and FFL transfer fees over the phone without hardware." },
    ],
    recommendedSolutions: ["/solutions/credit-card-processing", "/solutions/pos-systems", "/solutions/ecommerce-payments"],
    faqs: [
      { question: "Can you get a merchant account for a firearms dealer?", answer: "Yes. We work with specialized banking partners who understand and support the firearms industry. We can help FFL dealers, gun shops, ammo retailers, and shooting ranges get approved for reliable merchant accounts." },
      { question: "Will my account get shut down?", answer: "That's a real concern in this industry. We place firearms businesses with processors who specialize in high-risk retail and have a track record of stable, long-term accounts for gun shops and FFL dealers." },
      { question: "Can I accept payments online for accessories and ammo?", answer: "Yes. We can set up compliant eCommerce payment gateways for firearms accessories, ammunition, and FFL transfer fees. Physical firearms sales online require additional compliance steps we can walk you through." },
      { question: "Do you serve shooting ranges?", answer: "Absolutely. Shooting ranges have unique needs — range time booking, membership billing, retail sales, and food & beverage. We can set up a complete payment solution tailored to your range." },
    ],
  },
];

interface IndustryDetailPageProps {
  slug: string;
}

export default function IndustryDetailPage({ slug }: IndustryDetailPageProps) {
  const data = industriesData.find((i) => i.slug === slug);

  if (!data) {
    return (
      <PageLayout>
        <div className="container py-20 text-center">
          <h1 className="text-2xl font-bold text-[#040c1c]">Industry page not found</h1>
          <Link href="/industries" className="btn-teal mt-4 inline-flex">Back to Industries</Link>
        </div>
      </PageLayout>
    );
  }

  const recommendedItems = NAV_SOLUTIONS.filter((s) => data.recommendedSolutions.includes(s.href));
  const relatedIndustries = NAV_INDUSTRIES.filter((i) => !i.href.endsWith(slug)).slice(0, 4);

  return (
    <PageLayout>
      {/* Hero */}
      <section className="bg-[#040c1c] py-20">
        <div className="container">
          <div className="flex items-center gap-2 text-white/40 text-sm mb-5">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight size={14} />
            <Link href="/industries" className="hover:text-white transition-colors">Industries</Link>
            <ChevronRight size={14} />
            <span className="text-white/70">{data.title}</span>
          </div>
          <div className="max-w-2xl">
            <div className="text-4xl mb-4">{data.icon}</div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4" style={{ fontFamily: 'Sora, sans-serif' }}>
              {data.title}
            </h1>
            <p className="text-white/70 text-lg mb-4">{data.subtitle}</p>
            <p className="text-white/60 mb-8 leading-relaxed">{data.description}</p>
            <div className="flex gap-4">
              <Link href="/consultation" className="btn-gold">Get a Free Quote <ArrowRight size={16} /></Link>
              <Link href="/statement-review" className="btn-outline-white">Free Statement Review</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Challenges */}
      <section className="py-14 bg-[#f8fafc]">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <div className="teal-divider mb-5" />
              <h2 className="text-2xl font-bold text-[#040c1c] mb-4" style={{ fontFamily: 'Sora, sans-serif' }}>
                Common {data.title} Payment Challenges
              </h2>
              <div className="space-y-3">
                {data.challenges.map((c) => (
                  <div key={c} className="flex items-start gap-3 bg-white rounded-lg p-3.5 border border-gray-100">
                    <div className="w-2 h-2 rounded-full bg-[#d4a843] mt-1.5 shrink-0" />
                    <span className="text-sm text-gray-600">{c}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-[#040c1c] mb-4" style={{ fontFamily: 'Sora, sans-serif' }}>
                How We Solve Them
              </h2>
              <div className="space-y-4">
                {data.solutions.map((s) => (
                  <div key={s.title} className="bg-white rounded-xl p-4 border border-gray-100 hover:border-[#169fa8]/30 transition-all">
                    <div className="flex items-center gap-2 mb-1.5">
                      <CheckCircle size={15} className="text-[#169fa8]" />
                      <span className="font-semibold text-sm text-[#040c1c]" style={{ fontFamily: 'Sora, sans-serif' }}>{s.title}</span>
                    </div>
                    <p className="text-gray-500 text-sm pl-5">{s.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Recommended Solutions */}
      <section className="py-12 bg-white">
        <div className="container">
          <h2 className="text-xl font-bold text-[#040c1c] mb-5" style={{ fontFamily: 'Sora, sans-serif' }}>
            Recommended Solutions for {data.title}
          </h2>
          <div className="flex flex-wrap gap-3">
            {recommendedItems.map((item) => (
              <Link key={item.href} href={item.href} className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-gray-200 hover:border-[#169fa8]/40 hover:bg-[#169fa8]/5 transition-all text-sm font-medium text-[#040c1c]">
                <span>{item.icon}</span> {item.label} <ChevronRight size={13} className="text-[#169fa8]" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* SkyTab POS Builder — shown for restaurant & bar industries */}
      {(data.slug === "restaurants" || data.slug === "bars-nightclubs") && <SkyTabPOSBuilder />}

      <FAQ items={data.faqs} />

      {/* Related Industries */}
      <section className="py-12 bg-[#f8fafc]">
        <div className="container">
          <h2 className="text-xl font-bold text-[#040c1c] mb-5" style={{ fontFamily: 'Sora, sans-serif' }}>Other Industries We Serve</h2>
          <div className="flex flex-wrap gap-3">
            {relatedIndustries.map((item) => (
              <Link key={item.href} href={item.href} className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-gray-200 hover:border-[#169fa8]/40 hover:bg-[#169fa8]/5 transition-all text-sm font-medium text-[#040c1c]">
                <span>{item.icon}</span> {item.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTABanner title={`Ready to Upgrade Your ${data.title} Payment System?`} subtitle="Get a free consultation and see how UBC Unlimited can save you money and improve your operations." />
    </PageLayout>
  );
}

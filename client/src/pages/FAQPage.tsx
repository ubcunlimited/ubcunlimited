/**
 * UBC Unlimited — Comprehensive FAQ Page
 * Design: Modern Fintech Edge — dark navy hero, teal/gold accents, Sora + Inter
 * All FAQ questions collected from every solution and industry page, organized by category.
 */
import { useState } from "react";
import type React from "react";
import { Link } from "wouter";
import PageLayout from "@/components/layout/PageLayout";
import SEO from "@/components/SEO";
import { SITE } from "@/lib/config";
import { ChevronDown, ChevronUp, Search, Phone, Mail } from "lucide-react";

const faqCategories = [
  {
    id: "general",
    label: "General & Getting Started",
    icon: "🏢",
    questions: [
      {
        question: "What makes UBC Unlimited different from other processors?",
        answer:
          "Better service, industry-specific expertise, and local support. With 20+ years in the industry and a wide range of partner relationships, we can tailor solutions to individual needs — something a national call center simply can't do. You get a dedicated local rep, not a ticket number.",
      },
      {
        question: "How long does it take to get set up?",
        answer:
          "Most low-risk businesses are approved and active within 24–48 hours. POS system installations require a 14-day lead time from approval. High-risk and specialty industries may have longer timelines depending on the underwriting process.",
      },
      {
        question: "Do you offer month-to-month agreements?",
        answer:
          "Yes, in most situations we offer a month-to-month agreement because we believe you must set yourself apart with service. We do have certain products that require agreements due to solution requirements, and we do our best to minimize the impact in those situations.",
      },
      {
        question: "What types of businesses do you serve?",
        answer:
          "We serve a wide range of businesses including restaurants, retail, medical, automotive, salons, eCommerce, professional services, and more. We can also service medium and high-risk businesses, though those are evaluated on a case-by-case basis. If you accept payments, reach out and we'll find a solution that works for you.",
      },
      {
        question: "Are there cancellation fees?",
        answer:
          "Generally, no cancellation fees apply — we believe in earning your business every month, not locking you in. However, certain types of businesses or solutions require a formal agreement, and in those cases cancellation fees are based on the terms of the individual agreement. We are always upfront about this before you sign anything.",
      },
      {
        question: "Do you work with businesses outside Utah?",
        answer:
          "Our primary focus is serving Utah businesses along the Wasatch Front and across the state. However, we can work with businesses in other states on a case-by-case basis. Contact us to discuss your specific situation.",
      },
    ],
  },
  {
    id: "pricing",
    label: "Pricing & Rates",
    icon: "💰",
    questions: [
      {
        question: "What credit card processing rates do you offer?",
        answer:
          "We work with you to set up pricing that optimizes your profitability. Depending on your business type and volume, we can structure Flat Rate, Multi-Tiered, or Interchange-Plus pricing. We can also set you up to be compliant for surcharging, cash discount & dual pricing, or cash discount & dual pricing models — all designed to maximize your profits while minimizing the cost to accept payments.",
      },
      {
        question: "What is interchange-plus pricing?",
        answer:
          "Interchange-plus pricing passes the actual interchange cost (set by Visa/Mastercard) directly to you, plus a small fixed markup. It's the most transparent pricing model and is especially beneficial for businesses with high-ticket transactions or a mix of card types.",
      },
      {
        question: "What is cash discount & dual pricing and how does it work?",
        answer: (
          <div className="space-y-3">
            <p>
              Dual pricing is a compliant payment strategy where your business displays two prices at the point of sale — a lower price for customers who pay with cash, and a slightly higher price for customers who pay with a credit or debit card. The difference between the two prices reflects your card processing cost, which is passed to the customer transparently before the transaction is completed.
            </p>
            <p>
              Dual pricing is <strong>legal in all 50 states</strong> and applies to all card types — credit, debit, and prepaid. It is distinct from surcharging (which is limited to credit cards only and is prohibited in some states) and from cash discount & dual pricing (which posts one price and applies a discount at checkout for cash payers). Dual pricing is generally considered the most transparent and consumer-friendly approach because both prices are shown upfront.
            </p>
            <p>
              When implemented correctly with proper signage and receipt language, most businesses report minimal customer pushback. UBC Unlimited provides all required compliance materials, staff training, and compatible hardware or equipment programming as part of our setup.
            </p>
            <p>
              <a href="/solutions/surcharge-cash-discount" className="text-[#c9a84c] font-semibold hover:underline">Learn more about our Cash Discount & Dual Pricing &amp; Cash Discount program →</a>
            </p>
          </div>
        ),
      },
      {
        question: "How quickly will I receive my funds?",
        answer:
          "Standard funding is next business day. Expedited funding may be available for qualifying accounts — ask us about your options during your consultation.",
      },
      {
        question: "Is the statement review really free?",
        answer:
          "Yes, completely free with no obligation. We analyze your current statement, identify overcharges, and present a clear comparison. You decide if it makes sense to switch — there's no pressure.",
      },
      {
        question: "Do you offer competitive rates for high-ticket transactions?",
        answer:
          "Yes. We offer interchange-plus pricing which is especially beneficial for high-ticket transactions where flat-rate processors charge significantly more. We'll show you the exact savings during a statement review.",
      },
    ],
  },
  {
    id: "credit-card",
    label: "Credit Card Processing",
    icon: "💳",
    questions: [
      {
        question: "What card types do you accept?",
        answer:
          "We support all major card brands including Visa, Mastercard, American Express, Discover, and contactless payments including Apple Pay, Google Pay, and Samsung Pay.",
      },
      {
        question: "Do I need new equipment?",
        answer:
          "We can often reprogram your existing equipment. If you need new terminals, we offer free equipment with qualifying accounts. We'll assess your current setup during the consultation.",
      },
      {
        question: "Is my equipment PCI compliant?",
        answer:
          "PCI compliance is required for all businesses that accept card payments. We help you understand your compliance requirements and ensure your equipment and processes meet current standards.",
      },
      {
        question: "What is a chargeback and how do you handle them?",
        answer:
          "A chargeback is when a customer disputes a transaction with their bank. We can help you understand the chargeback process, gather the right documentation, and submit your rebuttal. We also offer guidance on best practices to reduce your chargeback rate proactively.",
      },
    ],
  },
  {
    id: "ach",
    label: "ACH & eCheck Processing",
    icon: "🏦",
    questions: [
      {
        question: "What is ACH processing?",
        answer:
          "ACH (Automated Clearing House) processing allows you to accept electronic bank transfers directly from your customers' bank accounts, bypassing credit card networks and their fees. It's ideal for recurring billing, large transactions, and B2B payments.",
      },
      {
        question: "How long does ACH take to settle?",
        answer:
          "Standard ACH typically settles in 3–5 business days. Settlement timelines can vary based on your bank and transaction type.",
      },
      {
        question: "Can I use ACH for recurring payments?",
        answer:
          "Yes. ACH is ideal for recurring billing — subscriptions, memberships, rent payments, and installment plans. We can set up automatic recurring drafts with customer authorization.",
      },
      {
        question: "What are the fees for ACH processing?",
        answer:
          "ACH processing is very cost-effective — typically a fraction of credit card processing fees. Exact pricing depends on your volume and transaction type. Contact us for a custom quote.",
      },
    ],
  },
  {
    id: "pos",
    label: "POS Systems",
    icon: "🖥️",
    questions: [
      {
        question: "Which POS system is right for my business?",
        answer:
          "It depends on your business type. SkyTab is ideal for restaurants and bars with tableside ordering, kitchen display systems, and online ordering. Clover is great for retail, salons, and service businesses. We'll help you choose during a consultation.",
      },
      {
        question: "Do you work with SkyTab POS systems?",
        answer:
          "Yes — UBC Unlimited is an authorized SkyTab reseller in Utah. SkyTab is one of the most powerful POS systems available for restaurants and bars, and we provide full local installation and support.",
      },
      {
        question: "Do you provide training?",
        answer:
          "Yes. Our local team provides on-site installation and training for you and your staff. We also offer ongoing support if you have questions after go-live.",
      },
      {
        question: "What if I have issues after setup?",
        answer:
          "We provide ongoing technical support during business hours. For local Utah businesses, we can also dispatch a technician for on-site support when needed. You'll always have a direct contact — not a call center.",
      },
      {
        question: "How long does POS installation take?",
        answer:
          "Most POS system installations require at least 14 days from complete paperwork submission. This allows time for hardware delivery, configuration, and scheduling your on-site installation and training.",
      },
      {
        question: "Can I manage inventory across multiple locations?",
        answer:
          "Yes. Our retail POS systems support multi-location inventory management with centralized reporting and consolidated dashboards.",
      },
      {
        question: "Do you offer gift card programs?",
        answer:
          "Yes. We offer both physical and digital gift card programs that integrate directly with your POS system.",
      },
      {
        question: "Can I pre-authorize cards for tabs?",
        answer:
          "Yes. Our bar and restaurant POS systems support pre-authorization holds, so you can hold a card on file and capture the final amount when the customer closes out.",
      },
      {
        question: "How does SkyTab compare to Toast, Square, and Clover?",
        answer: (
          <div className="overflow-x-auto -mx-2">
            <table className="w-full text-xs border-collapse min-w-[480px]">
              <thead>
                <tr className="bg-[#080808] text-white">
                  <th className="text-left px-3 py-2 font-semibold">Feature</th>
                  <th className="px-3 py-2 font-bold text-[#22c55e] text-center">SkyTab<br/><span className="text-[10px] font-normal text-gray-300">by Shift4</span></th>
                  <th className="px-3 py-2 font-semibold text-center">Toast</th>
                  <th className="px-3 py-2 font-semibold text-center">Square</th>
                  <th className="px-3 py-2 font-semibold text-center">Clover</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Starting monthly price", "$29.99/mo", "$69/mo", "$60/mo", "$44.95/mo"],
                  ["Hardware warranty", "Lifetime", "1 year", "1 year", "1 year"],
                  ["Tableside ordering (handheld)", "✅", "✅", "⚠️", "⚠️"],
                  ["Built-in online ordering", "✅", "✅", "✅", "⚠️"],
                  ["No online ordering commission", "✅", "❌", "❌", "⚠️"],
                  ["Built-in loyalty program", "✅", "⚠️", "⚠️", "⚠️"],
                  ["Cloud-based back office", "✅", "✅", "✅", "✅"],
                  ["Real-time mobile app", "✅", "✅", "✅", "✅"],
                  ["DoorDash / Uber Eats integration", "✅", "✅", "✅", "⚠️"],
                  ["Kitchen display system (KDS)", "✅", "✅", "⚠️", "⚠️"],
                  ["Offline mode", "✅", "✅", "⚠️", "⚠️"],
                  ["Long-term contract required", "✅", "✅", "❌", "✅"],
                  ["Local onsite installation (Utah)", "✅", "❌", "❌", "⚠️"],
                  ["4G LTE handheld POS option", "✅", "⚠️", "❌", "❌"],
                  ["Brewery & taproom features", "✅", "⚠️", "⚠️", "⚠️"],
                ].map(([feature, skytab, toast, square, clover], i) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                    <td className="px-3 py-2 text-gray-700 font-medium">{feature}</td>
                    <td className="px-3 py-2 text-center font-semibold text-[#c9a84c]">{skytab}</td>
                    <td className="px-3 py-2 text-center text-gray-600">{toast}</td>
                    <td className="px-3 py-2 text-center text-gray-600">{square}</td>
                    <td className="px-3 py-2 text-center text-gray-600">{clover}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="text-[10px] text-gray-600 mt-2 italic">✅ Included &nbsp; ⚠️ Limited/add-on &nbsp; ❌ Not available. Pricing and features based on publicly available information as of early 2026 and may vary.</p>
          </div>
        ),
      },
    ],
  },
  {
    id: "ecommerce",
    label: "eCommerce & Payment Gateways",
    icon: "🛒",
    questions: [
      {
        question: "Do you offer a free eCommerce website solution?",
        answer: (
          <>
            <p className="mb-3">Yes! Through our partnership with Shift4, we offer a <strong>free eCommerce website</strong> powered by <strong>Shift4Shop</strong> — one of the most feature-rich online store platforms available. Shift4Shop is our first recommended eCommerce solution and includes everything you need to sell online:</p>
            <ul className="list-disc list-inside space-y-1 mb-3">
              <li>Unlimited products, orders, and bandwidth</li>
              <li>Built-in SEO tools, marketing, and email campaigns</li>
              <li>100+ professional themes</li>
              <li>Integrated payment processing through Shift4 Payments</li>
              <li>No monthly platform fee when processing with UBC Unlimited</li>
            </ul>
            <p className="mb-3">It&apos;s a fully hosted, enterprise-grade platform — completely free when you process payments through us.</p>
            <a
              href="https://launch.shift4shop.com/partners?oid=SS149-149JC"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#c9a84c] hover:bg-[#127d85] text-white text-xs font-semibold px-4 py-2 rounded-lg transition-colors"
            >
              Get Your Free Shift4Shop Store →
            </a>
          </>
        ),
      },
      {
        question: "How does Shift4Shop compare to Shopify, BigCommerce, Wix, and Squarespace?",
        answer: (
          <>
            <p className="mb-4">Shift4Shop offers two plans: a <strong>free entry-level plan</strong> (enterprise-grade when processing with Shift4/UBC Unlimited) and an <strong>Enterprise plan at $41/month</strong> for businesses using their own payment processor. Here's how it stacks up against the major platforms:</p>
            <div className="overflow-x-auto mb-4">
              <table className="w-full text-xs border-collapse">
                <thead>
                  <tr className="bg-[#080808] text-white">
                    <th className="px-3 py-2 text-left font-semibold">Feature</th>
                    <th className="px-3 py-2 text-center font-semibold text-[#4ade80]">Shift4Shop</th>
                    <th className="px-3 py-2 text-center font-semibold">Shopify</th>
                    <th className="px-3 py-2 text-center font-semibold">BigCommerce</th>
                    <th className="px-3 py-2 text-center font-semibold">Wix</th>
                    <th className="px-3 py-2 text-center font-semibold">Squarespace</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Starting Price", "Free / $41/mo", "$39/mo", "$39/mo", "$17/mo", "$23/mo"],
                    ["Transaction Fees", "✅ None", "❌ 0.5–2%", "✅ None", "✅ None", "✅ None"],
                    ["Unlimited Products", "✅ All plans", "✅ All plans", "✅ All plans", "⚠️ Limited", "⚠️ Limited"],
                    ["Unlimited Staff Users", "✅ All plans", "❌ 2–15 users", "⚠️ Varies", "⚠️ Varies", "⚠️ Varies"],
                    ["Built-in SEO Tools", "✅ Advanced", "⚠️ Basic", "✅ Good", "⚠️ Basic", "⚠️ Basic"],
                    ["Built-in Blog", "✅ Yes", "✅ Yes", "✅ Yes", "✅ Yes", "✅ Yes"],
                    ["Abandoned Cart Recovery", "✅ Free", "❌ Paid plan", "✅ Free", "❌ Paid plan", "❌ Paid plan"],
                    ["Email Marketing (built-in)", "✅ 25k/mo", "❌ Add-on", "❌ Add-on", "⚠️ Limited", "⚠️ Limited"],
                    ["Free SSL Certificate", "✅ Yes", "✅ Yes", "✅ Yes", "✅ Yes", "✅ Yes"],
                    ["Free Domain Name", "✅ Yes", "❌ No", "❌ No", "❌ No", "❌ No"],
                    ["Real-Time Shipping Rates", "✅ Yes", "❌ Higher plans", "✅ Yes", "⚠️ Limited", "⚠️ Limited"],
                    ["API Access", "✅ All plans", "✅ All plans", "✅ All plans", "⚠️ Limited", "❌ No"],
                    ["PCI Compliance", "✅ Built-in", "✅ Built-in", "✅ Built-in", "✅ Built-in", "✅ Built-in"],
                    ["24/7 Support", "✅ All plans", "✅ All plans", "✅ All plans", "⚠️ Business hrs", "⚠️ Business hrs"],
                  ].map(([feature, s4s, shopify, bc, wix, sqsp], idx) => (
                    <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-3 py-2 font-medium text-[#080808] border-b border-gray-100">{feature}</td>
                      <td className="px-3 py-2 text-center border-b border-gray-100 bg-[#f0fdf4] font-semibold text-[#166534]">{s4s}</td>
                      <td className="px-3 py-2 text-center border-b border-gray-100 text-gray-600">{shopify}</td>
                      <td className="px-3 py-2 text-center border-b border-gray-100 text-gray-600">{bc}</td>
                      <td className="px-3 py-2 text-center border-b border-gray-100 text-gray-600">{wix}</td>
                      <td className="px-3 py-2 text-center border-b border-gray-100 text-gray-600">{sqsp}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="bg-[#f0fdf4] border border-[#86efac] rounded-lg p-3 mb-3">
              <p className="text-xs text-[#166534] font-medium">💡 <strong>UBC Unlimited Advantage:</strong> When you process payments through UBC Unlimited using Shift4, you get the full enterprise-grade Shift4Shop plan at <strong>$0/month</strong> — no platform fee, no transaction fees, and no revenue caps. The $41/month plan is available if you prefer to use a different payment processor.</p>
            </div>
            <a
              href="https://launch.shift4shop.com/partners?oid=SS149-149JC"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#c9a84c] hover:bg-[#127d85] text-white text-xs font-semibold px-4 py-2 rounded-lg transition-colors"
            >
              Start Your Free Shift4Shop Store →
            </a>
          </>
        ),
      },
      {
        question: "Do you have an end-to-end eCommerce solution that includes both a website builder and a payment gateway?",
        answer: (
          <>
            <p className="mb-3">Yes — we have partnered with <strong>Shift4Shop</strong> to offer a complete end-to-end eCommerce solution that combines a powerful website builder with fully integrated payment processing in a single platform. There is no need to stitch together a separate builder, gateway, and processor — it is all included.</p>
            <p className="mb-3">Shift4Shop handles your storefront, checkout, inventory, SEO, marketing tools, and payment processing seamlessly. When you process payments through UBC Unlimited, the full enterprise-grade platform is available at <strong>no monthly cost</strong>. An enterprise plan is also available at <strong>$41/month</strong> if you prefer to use a different processor.</p>
            <div className="flex flex-wrap gap-2 mt-3">
              <a
                href="https://launch.shift4shop.com/partners?oid=SS149-149JC"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#c9a84c] hover:bg-[#127d85] text-white text-xs font-semibold px-4 py-2 rounded-lg transition-colors"
              >
                Start Your Free Shift4Shop Store →
              </a>
              <a
                href="https://launch.shift4shop.com/partners?oid=SS149-149JC"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-[#c9a84c] text-[#c9a84c] hover:bg-[#c9a84c]/10 text-xs font-semibold px-4 py-2 rounded-lg transition-colors"
              >
                Learn More About Shift4Shop →
              </a>
            </div>
          </>
        ),
      },
      {
        question: "What payment gateways do you support for eCommerce?",
        answer:
          "We work with a wide variety of payment gateways to ensure your online store has the right integration. Our supported gateways include Authorize.net, Fluidpay, Quantum Gateway, NMI, iPosPays, and many more. We work together with you to determine the best gateway option based on your business requirements, shopping cart platform, and transaction volume.",
      },
      {
        question: "How do I know which gateway is right for my business?",
        answer:
          "During your consultation, we'll review your eCommerce platform, expected transaction volume, and any specific integration requirements. From there, we'll recommend the gateway that best fits your needs — whether that's Authorize.net for widespread compatibility, NMI for advanced features, Fluidpay for high-risk or specialty businesses, Quantum Gateway for specific platform integrations, iPosPays for modern payment experiences, or another solution entirely.",
      },
      {
        question: "What eCommerce platforms do you integrate with?",
        answer:
          "We integrate with all major eCommerce platforms including Shift4Shop, WooCommerce, Shopify, Magento, BigCommerce, and custom-built websites via API. Shift4Shop is our preferred end-to-end solution — it combines the website builder and payment gateway in one platform with no monthly fee when processing through UBC Unlimited.",
      },
      {
        question: "How do you handle fraud prevention?",
        answer:
          "Our gateway options include AVS verification, CVV checking, velocity filters, and machine learning fraud detection to protect your revenue and reduce chargebacks.",
      },
      {
        question: "Can you help me switch gateways without disrupting my store?",
        answer:
          "Yes. We have experience migrating merchants between gateways with minimal disruption. We'll coordinate the technical setup, test the integration before going live, and ensure your checkout experience remains seamless for your customers.",
      },
      {
        question: "Do you support high-risk eCommerce businesses?",
        answer:
          "Yes, on a case-by-case basis. Certain gateways in our network are specifically designed to support high-risk and specialty eCommerce merchants. We'll evaluate your business type and connect you with the right processing and gateway solution.",
      },
    ],
  },
  {
    id: "mobile-virtual",
    label: "Mobile & Virtual Terminals",
    icon: "📱",
    questions: [
      {
        question: "What card reader do you use for mobile processing?",
        answer:
          "We offer Bluetooth card readers that accept chip, swipe, and tap-to-pay. They work with both iOS and Android devices and connect to our mobile app.",
      },
      {
        question: "Can I use mobile processing without internet?",
        answer:
          "This varies depending on the individual solution. Some of our mobile processing solutions include an offline mode that allows you to accept swiped transactions without an active internet connection — transactions queue locally and sync automatically when you reconnect. Ask us which solutions support offline mode for your specific setup.",
      },
      {
        question: "What is a virtual terminal?",
        answer:
          "A virtual terminal is a web-based application that lets you manually enter credit card information to process payments — no physical card reader required. It's ideal for phone orders, mail orders, and service businesses that invoice clients.",
      },
      {
        question: "Is the virtual terminal secure?",
        answer:
          "Yes. Our virtual terminal is fully PCI DSS compliant with SSL encryption and tokenization to protect cardholder data. No sensitive card data is stored on your device.",
      },
      {
        question: "Can I send invoices with payment links?",
        answer:
          "Yes. Our invoicing solution lets you send professional invoices with embedded payment links that accept all major credit cards and ACH bank transfers. Customers can pay in seconds from any device.",
      },
      {
        question: "Does invoicing integrate with my accounting software?",
        answer:
          "We integrate with QuickBooks, Xero, FreshBooks, and other popular accounting platforms to keep your books in sync automatically.",
      },
    ],
  },
  {
    id: "industry",
    label: "Industry-Specific Questions",
    icon: "🏪",
    questions: [
      {
        question: "Do you serve restaurants and bars?",
        answer:
          "Yes. We specialize in restaurant and bar payment solutions including SkyTab POS with tableside ordering, kitchen display systems, online ordering integration, tip management, pre-authorization holds for tabs, and chargeback management.",
      },
      {
        question: "Are your payment solutions HIPAA compliant for medical practices?",
        answer:
          "Our payment processing solutions are PCI DSS compliant. We recommend working with your compliance officer to ensure your full payment workflow meets HIPAA requirements. We can set up patient payment plans and recurring billing for healthcare providers.",
      },
      {
        question: "Can you get a merchant account for a firearms dealer?",
        answer:
          "Yes. We work with specialized banking partners who understand and support the firearms industry. We can help FFL dealers, gun shops, ammo retailers, and shooting ranges get approved for reliable merchant accounts.",
      },
      {
        question: "Will my firearms merchant account get shut down?",
        answer:
          "That's a real concern in this industry. We place firearms businesses with processors who specialize in high-risk retail and have a track record of stable, long-term accounts for gun shops and FFL dealers.",
      },
      {
        question: "Can I accept payments online for firearms accessories and ammo?",
        answer:
          "Yes. We can set up compliant eCommerce payment gateways for firearms accessories, ammunition, and FFL transfer fees. Physical firearms sales online require additional compliance steps we can walk you through.",
      },
      {
        question: "Do you serve shooting ranges?",
        answer:
          "Absolutely. Shooting ranges have unique needs — range time booking, membership billing, retail sales, and food & beverage. We can set up a complete payment solution tailored to your range.",
      },
      {
        question: "Can tenants pay rent online?",
        answer:
          "Yes. We provide a branded tenant payment portal where tenants can pay rent by credit card or ACH bank transfer. ACH is especially cost-effective for rent collection, with significantly lower per-transaction costs than credit cards.",
      },
      {
        question: "Can I accept payments for retainers and legal services?",
        answer:
          "Yes. We offer recurring billing tools specifically designed for retainer-based billing, including automatic charges and balance tracking. We also integrate with many legal practice management platforms.",
      },
      {
        question: "Do you integrate with salon booking software?",
        answer:
          "We integrate with many popular salon booking platforms. Contact us to discuss your specific software and we'll confirm compatibility before you commit.",
      },
      {
        question: "Do you serve medium and high-risk businesses?",
        answer:
          "Yes. In addition to standard low-risk businesses, we can also service medium and high-risk businesses. These are evaluated on a case-by-case basis. Industries we've helped include firearms, CBD, automotive, and other specialty categories. Reach out and we'll assess your situation.",
      },
    ],
  },
  {
    id: "support",
    label: "Support & Service",
    icon: "🤝",
    questions: [
      {
        question: "What are your support hours?",
        answer:
          "Our local team is available during normal business hours. You'll have a dedicated local rep — a real person who knows your account — not a call center. For after-hours technical emergencies, processor-level support is available through your payment processor.",
      },
      {
        question: "Who do I call if I have a problem?",
        answer: `You call us directly. You'll have a direct line to the UBC Unlimited team and can reach us at ${SITE.phone} or ${SITE.email} during business hours. We believe in being accessible and responsive.`,
      },
      {
        question: "What happens if my terminal stops working?",
        answer:
          "Contact us immediately. We'll troubleshoot with you over the phone and, if needed, arrange for a replacement terminal as quickly as possible. Downtime costs you money and we take that seriously.",
      },
      {
        question: "Can you integrate with my existing software?",
        answer:
          "In many cases, yes. We work with a variety of accounting, inventory, and reservation systems. During your consultation, we'll review your current tech stack and identify the best integration options.",
      },
      {
        question: "Do you help with chargebacks?",
        answer:
          "Yes. We can help you understand the chargeback process, gather the right documentation, and submit your rebuttal. We also offer guidance on best practices to reduce your chargeback rate proactively.",
      },
    ],
  },
  {
    id: "statement-review",
    label: "Statement Review & Switching",
    icon: "📄",
    questions: [
      {
        question: "What is a statement review?",
        answer:
          "We analyze your current processing statement line by line, identify all fees you're being charged, and compare them against what we can offer. You'll get a clear, honest comparison showing your potential savings — with no obligation to switch.",
      },
      {
        question: "How do I submit my statement?",
        answer:
          "You can submit your statement through our Statement Review page on this site, email it to us directly, or bring it to a consultation. We'll typically have your analysis back to you within 1 business day.",
      },
      {
        question: "What if I'm locked into a contract with my current processor?",
        answer:
          "We'll review your current agreement and help you understand your options. In some cases, the savings from switching are significant enough to justify an early termination fee. We'll do the math with you so you can make an informed decision.",
      },
      {
        question: "How long does it take to switch processors?",
        answer:
          "For most businesses, switching is straightforward. Once your application is approved (typically 1 day for low-risk), we'll coordinate equipment setup and ensure you have zero downtime during the transition.",
      },
      {
        question: "Will switching processors disrupt my business?",
        answer:
          "We plan every transition carefully to minimize disruption. For POS systems, we schedule installation during off-hours when possible. For gateway switches, we test thoroughly before going live. Our goal is a seamless handoff.",
      },
    ],
  },
];

function FAQItem({ question, answer }: { question: string; answer: string | React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`border rounded-xl overflow-hidden transition-all duration-200 ${open ? 'border-[#c9a84c]/60 shadow-sm' : 'border-gray-200 hover:border-[#c9a84c]/40'}`}>
      <button
        className="w-full text-left flex items-center justify-between gap-4 px-6 py-4 bg-white hover:bg-[#f8fafc] transition-colors"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <span className="font-semibold text-[#080808] text-base leading-snug pr-4" style={{ fontFamily: "Sora, sans-serif" }}>
          {question}
        </span>
        <span className={`flex-shrink-0 text-[#c9a84c] transition-transform duration-200 ${open ? 'rotate-180' : ''}`}>
          <ChevronDown size={20} />
        </span>
      </button>
      <div
        className="overflow-hidden transition-all duration-300 ease-in-out"
        style={{ maxHeight: open ? '2000px' : '0px', opacity: open ? 1 : 0 }}
      >
        <div className="px-6 pb-5 pt-3 bg-white border-t border-gray-100">
          <div className="text-gray-600 leading-relaxed text-sm">{answer}</div>
        </div>
      </div>
    </div>
  );
}

export default function FAQPage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  const filtered = faqCategories
    .map((cat) => ({
      ...cat,
      questions: cat.questions.filter(
        (q) =>
          (activeCategory === "all" || activeCategory === cat.id) &&
          (search === "" ||
            q.question.toLowerCase().includes(search.toLowerCase()) ||
            (typeof q.answer === "string" && q.answer.toLowerCase().includes(search.toLowerCase())))
      ),
    }))
    .filter((cat) => cat.questions.length > 0);

  const totalQuestions = faqCategories.reduce((sum, cat) => sum + cat.questions.length, 0);

  return (
    <PageLayout>
      <SEO
        title="FAQ — Merchant Services Questions Answered | UBC Unlimited"
        description="Answers to common questions about credit card processing, POS systems, ACH payments, cash discount & dual pricing, eCommerce, and more. Utah's local merchant services experts."
        canonical="/faq"
        schema={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            // ── General & Getting Started ──
            { "@type": "Question", "name": "What makes UBC Unlimited different from other processors?", "acceptedAnswer": { "@type": "Answer", "text": "Better service, industry-specific expertise, and local support. With 20+ years in the industry and a wide range of partner relationships, we can tailor solutions to individual needs — something a national call center simply can't do. You get a dedicated local rep, not a ticket number." } },
            { "@type": "Question", "name": "How long does it take to get set up?", "acceptedAnswer": { "@type": "Answer", "text": "Most low-risk businesses are approved and active within 24–48 hours. POS system installations require a 14-day lead time from approval. High-risk and specialty industries may have longer timelines depending on the underwriting process." } },
            { "@type": "Question", "name": "Do you offer month-to-month agreements?", "acceptedAnswer": { "@type": "Answer", "text": "Yes, in most situations we offer a month-to-month agreement because we believe you must set yourself apart with service. We do have certain products that require agreements due to solution requirements, and we do our best to minimize the impact in those situations." } },
            { "@type": "Question", "name": "What types of businesses do you serve?", "acceptedAnswer": { "@type": "Answer", "text": "We serve a wide range of businesses including restaurants, retail, medical, automotive, salons, eCommerce, professional services, and more. We can also service medium and high-risk businesses, though those are evaluated on a case-by-case basis. If you accept payments, reach out and we'll find a solution that works for you." } },
            { "@type": "Question", "name": "Are there cancellation fees?", "acceptedAnswer": { "@type": "Answer", "text": "Generally, no cancellation fees apply — we believe in earning your business every month, not locking you in. However, certain types of businesses or solutions require a formal agreement, and in those cases cancellation fees are based on the terms of the individual agreement. We are always upfront about this before you sign anything." } },
            { "@type": "Question", "name": "Do you work with businesses outside Utah?", "acceptedAnswer": { "@type": "Answer", "text": "Our primary focus is serving Utah businesses along the Wasatch Front and across the state. However, we can work with businesses in other states on a case-by-case basis. Contact us to discuss your specific situation." } },
            // ── Pricing & Rates ──
            { "@type": "Question", "name": "What credit card processing rates do you offer?", "acceptedAnswer": { "@type": "Answer", "text": "We work with you to set up pricing that optimizes your profitability. Depending on your business type and volume, we can structure Flat Rate, Multi-Tiered, or Interchange-Plus pricing. We can also set you up to be compliant for surcharging, cash discount and dual pricing models — all designed to maximize your profits while minimizing the cost to accept payments." } },
            { "@type": "Question", "name": "What is interchange-plus pricing?", "acceptedAnswer": { "@type": "Answer", "text": "Interchange-plus pricing passes the actual interchange cost (set by Visa/Mastercard) directly to you, plus a small fixed markup. It's the most transparent pricing model and is especially beneficial for businesses with high-ticket transactions or a mix of card types." } },
            { "@type": "Question", "name": "What is cash discount and dual pricing and how does it work?", "acceptedAnswer": { "@type": "Answer", "text": "Dual pricing is a compliant payment strategy where your business displays two prices at the point of sale — a lower price for customers who pay with cash, and a slightly higher price for customers who pay with a credit or debit card. The difference between the two prices reflects your card processing cost, which is passed to the customer transparently before the transaction is completed. Dual pricing is legal in all 50 states and applies to all card types — credit, debit, and prepaid." } },
            { "@type": "Question", "name": "How quickly will I receive my funds?", "acceptedAnswer": { "@type": "Answer", "text": "Standard funding is next business day. Expedited funding may be available for qualifying accounts — ask us about your options during your consultation." } },
            { "@type": "Question", "name": "Is the statement review really free?", "acceptedAnswer": { "@type": "Answer", "text": "Yes, completely free with no obligation. We analyze your current statement, identify overcharges, and present a clear comparison. You decide if it makes sense to switch — there's no pressure." } },
            { "@type": "Question", "name": "Do you offer competitive rates for high-ticket transactions?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. We offer interchange-plus pricing which is especially beneficial for high-ticket transactions where flat-rate processors charge significantly more. We'll show you the exact savings during a statement review." } },
            // ── Credit Card Processing ──
            { "@type": "Question", "name": "What card types do you accept?", "acceptedAnswer": { "@type": "Answer", "text": "We support all major card brands including Visa, Mastercard, American Express, Discover, and contactless payments including Apple Pay, Google Pay, and Samsung Pay." } },
            { "@type": "Question", "name": "Do I need new equipment?", "acceptedAnswer": { "@type": "Answer", "text": "We can often reprogram your existing equipment. If you need new terminals, we offer free equipment with qualifying accounts. We'll assess your current setup during the consultation." } },
            { "@type": "Question", "name": "Is my equipment PCI compliant?", "acceptedAnswer": { "@type": "Answer", "text": "PCI compliance is required for all businesses that accept card payments. We help you understand your compliance requirements and ensure your equipment and processes meet current standards." } },
            { "@type": "Question", "name": "What is a chargeback and how do you handle them?", "acceptedAnswer": { "@type": "Answer", "text": "A chargeback is when a customer disputes a transaction with their bank. We can help you understand the chargeback process, gather the right documentation, and submit your rebuttal. We also offer guidance on best practices to reduce your chargeback rate proactively." } },
            // ── ACH & eCheck Processing ──
            { "@type": "Question", "name": "What is ACH processing?", "acceptedAnswer": { "@type": "Answer", "text": "ACH (Automated Clearing House) processing allows you to accept electronic bank transfers directly from your customers' bank accounts, bypassing credit card networks and their fees. It's ideal for recurring billing, large transactions, and B2B payments." } },
            { "@type": "Question", "name": "How long does ACH take to settle?", "acceptedAnswer": { "@type": "Answer", "text": "Standard ACH typically settles in 3–5 business days. Settlement timelines can vary based on your bank and transaction type." } },
            { "@type": "Question", "name": "Can I use ACH for recurring payments?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. ACH is ideal for recurring billing — subscriptions, memberships, rent payments, and installment plans. We can set up automatic recurring drafts with customer authorization." } },
            { "@type": "Question", "name": "What are the fees for ACH processing?", "acceptedAnswer": { "@type": "Answer", "text": "ACH processing is very cost-effective — typically a fraction of credit card processing fees. Exact pricing depends on your volume and transaction type. Contact us for a custom quote." } },
            // ── POS Systems ──
            { "@type": "Question", "name": "Which POS system is right for my business?", "acceptedAnswer": { "@type": "Answer", "text": "It depends on your business type. SkyTab is ideal for restaurants and bars with tableside ordering, kitchen display systems, and online ordering. Clover is great for retail, salons, and service businesses. We'll help you choose during a consultation." } },
            { "@type": "Question", "name": "Do you work with SkyTab POS systems?", "acceptedAnswer": { "@type": "Answer", "text": "Yes — UBC Unlimited is an authorized SkyTab reseller in Utah. SkyTab is one of the most powerful POS systems available for restaurants and bars, and we provide full local installation and support." } },
            { "@type": "Question", "name": "Do you provide POS training?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. Our local team provides on-site installation and training for you and your staff. We also offer ongoing support if you have questions after go-live." } },
            { "@type": "Question", "name": "What if I have issues after POS setup?", "acceptedAnswer": { "@type": "Answer", "text": "We provide ongoing technical support during business hours. For local Utah businesses, we can also dispatch a technician for on-site support when needed. You'll always have a direct contact — not a call center." } },
            { "@type": "Question", "name": "How long does POS installation take?", "acceptedAnswer": { "@type": "Answer", "text": "Most POS system installations require at least 14 days from complete paperwork submission. This allows time for hardware delivery, configuration, and scheduling your on-site installation and training." } },
            { "@type": "Question", "name": "Can I manage inventory across multiple locations?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. Our retail POS systems support multi-location inventory management with centralized reporting and consolidated dashboards." } },
            { "@type": "Question", "name": "Can I pre-authorize cards for tabs?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. Our bar and restaurant POS systems support pre-authorization holds, so you can hold a card on file and capture the final amount when the customer closes out." } },
            // ── eCommerce & Payment Gateways ──
            { "@type": "Question", "name": "Do you offer a free eCommerce website solution?", "acceptedAnswer": { "@type": "Answer", "text": "Yes! Through our partnership with Shift4, we offer a free eCommerce website powered by Shift4Shop — one of the most feature-rich online store platforms available. It includes unlimited products, orders, and bandwidth; built-in SEO tools, marketing, and email campaigns; 100+ professional themes; integrated payment processing through Shift4 Payments; and no monthly platform fee when processing with UBC Unlimited." } },
            { "@type": "Question", "name": "What payment gateways do you support for eCommerce?", "acceptedAnswer": { "@type": "Answer", "text": "We work with a wide variety of payment gateways to ensure your online store has the right integration. Our supported gateways include Authorize.net, Fluidpay, Quantum Gateway, NMI, iPosPays, and many more. We work together with you to determine the best gateway option based on your business requirements, shopping cart platform, and transaction volume." } },
            { "@type": "Question", "name": "How do I know which payment gateway is right for my business?", "acceptedAnswer": { "@type": "Answer", "text": "During your consultation, we'll review your eCommerce platform, expected transaction volume, and any specific integration requirements. From there, we'll recommend the gateway that best fits your needs — whether that's Authorize.net for widespread compatibility, NMI for advanced features, Fluidpay for high-risk or specialty businesses, Quantum Gateway for specific platform integrations, iPosPays for modern payment experiences, or another solution entirely." } },
            { "@type": "Question", "name": "What eCommerce platforms do you integrate with?", "acceptedAnswer": { "@type": "Answer", "text": "We integrate with all major eCommerce platforms including Shift4Shop, WooCommerce, Shopify, Magento, BigCommerce, and custom-built websites via API. Shift4Shop is our preferred end-to-end solution — it combines the website builder and payment gateway in one platform with no monthly fee when processing through UBC Unlimited." } },
            { "@type": "Question", "name": "How do you handle eCommerce fraud prevention?", "acceptedAnswer": { "@type": "Answer", "text": "Our gateway options include AVS verification, CVV checking, velocity filters, and machine learning fraud detection to protect your revenue and reduce chargebacks." } },
            { "@type": "Question", "name": "Can you help me switch payment gateways without disrupting my store?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. We have experience migrating merchants between gateways with minimal disruption. We'll coordinate the technical setup, test the integration before going live, and ensure your checkout experience remains seamless for your customers." } },
            { "@type": "Question", "name": "Do you support high-risk eCommerce businesses?", "acceptedAnswer": { "@type": "Answer", "text": "Yes, on a case-by-case basis. Certain gateways in our network are specifically designed to support high-risk and specialty eCommerce merchants. We'll evaluate your business type and connect you with the right processing and gateway solution." } },
            // ── Mobile & Virtual Terminals ──
            { "@type": "Question", "name": "What card reader do you use for mobile processing?", "acceptedAnswer": { "@type": "Answer", "text": "We offer Bluetooth card readers that accept chip, swipe, and tap-to-pay. They work with both iOS and Android devices and connect to our mobile app." } },
            { "@type": "Question", "name": "Can I use mobile processing without internet?", "acceptedAnswer": { "@type": "Answer", "text": "This varies depending on the individual solution. Some of our mobile processing solutions include an offline mode that allows you to accept swiped transactions without an active internet connection — transactions queue locally and sync automatically when you reconnect." } },
            { "@type": "Question", "name": "What is a virtual terminal?", "acceptedAnswer": { "@type": "Answer", "text": "A virtual terminal is a web-based application that lets you manually enter credit card information to process payments — no physical card reader required. It's ideal for phone orders, mail orders, and service businesses that invoice clients." } },
            { "@type": "Question", "name": "Is the virtual terminal secure?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. Our virtual terminal is fully PCI DSS compliant with SSL encryption and tokenization to protect cardholder data. No sensitive card data is stored on your device." } },
            { "@type": "Question", "name": "Can I send invoices with payment links?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. Our invoicing solution lets you send professional invoices with embedded payment links that accept all major credit cards and ACH bank transfers. Customers can pay in seconds from any device." } },
            { "@type": "Question", "name": "Does invoicing integrate with my accounting software?", "acceptedAnswer": { "@type": "Answer", "text": "We integrate with QuickBooks, Xero, FreshBooks, and other popular accounting platforms to keep your books in sync automatically." } },
            // ── Industry-Specific ──
            { "@type": "Question", "name": "Do you serve restaurants and bars?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. We specialize in restaurant and bar payment solutions including SkyTab POS with tableside ordering, kitchen display systems, online ordering integration, tip management, pre-authorization holds for tabs, and chargeback management." } },
            { "@type": "Question", "name": "Are your payment solutions HIPAA compliant for medical practices?", "acceptedAnswer": { "@type": "Answer", "text": "Our payment processing solutions are PCI DSS compliant. We recommend working with your compliance officer to ensure your full payment workflow meets HIPAA requirements. We can set up patient payment plans and recurring billing for healthcare providers." } },
            { "@type": "Question", "name": "Can you get a merchant account for a firearms dealer?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. We work with specialized banking partners who understand and support the firearms industry. We can help FFL dealers, gun shops, ammo retailers, and shooting ranges get approved for reliable merchant accounts." } },
            { "@type": "Question", "name": "Will my firearms merchant account get shut down?", "acceptedAnswer": { "@type": "Answer", "text": "That's a real concern in this industry. We place firearms businesses with processors who specialize in high-risk retail and have a track record of stable, long-term accounts for gun shops and FFL dealers." } },
            { "@type": "Question", "name": "Can I accept payments online for firearms accessories and ammo?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. We can set up compliant eCommerce payment gateways for firearms accessories, ammunition, and FFL transfer fees. Physical firearms sales online require additional compliance steps we can walk you through." } },
            { "@type": "Question", "name": "Do you serve shooting ranges?", "acceptedAnswer": { "@type": "Answer", "text": "Absolutely. Shooting ranges have unique needs — range time booking, membership billing, retail sales, and food and beverage. We can set up a complete payment solution tailored to your range." } },
            { "@type": "Question", "name": "Can tenants pay rent online?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. We provide a branded tenant payment portal where tenants can pay rent by credit card or ACH bank transfer. ACH is especially cost-effective for rent collection, with significantly lower per-transaction costs than credit cards." } },
            { "@type": "Question", "name": "Can I accept payments for retainers and legal services?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. We offer recurring billing tools specifically designed for retainer-based billing, including automatic charges and balance tracking. We also integrate with many legal practice management platforms." } },
            { "@type": "Question", "name": "Do you integrate with salon booking software?", "acceptedAnswer": { "@type": "Answer", "text": "We integrate with many popular salon booking platforms. Contact us to discuss your specific software and we'll confirm compatibility before you commit." } },
            { "@type": "Question", "name": "Do you serve medium and high-risk businesses?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. In addition to standard low-risk businesses, we can also service medium and high-risk businesses. These are evaluated on a case-by-case basis. Industries we've helped include firearms, CBD, automotive, and other specialty categories." } },
            // ── Support & Service ──
            { "@type": "Question", "name": "What are your support hours?", "acceptedAnswer": { "@type": "Answer", "text": "Our local team is available during normal business hours. You'll have a dedicated local rep — a real person who knows your account — not a call center. For after-hours technical emergencies, processor-level support is available through your payment processor." } },
            { "@type": "Question", "name": "Who do I call if I have a problem?", "acceptedAnswer": { "@type": "Answer", "text": "You call us directly. You'll have a direct line to the UBC Unlimited team and can reach us at (801) 462-0923 or info@ubcunlimited.com during business hours. We believe in being accessible and responsive." } },
            { "@type": "Question", "name": "What happens if my terminal stops working?", "acceptedAnswer": { "@type": "Answer", "text": "Contact us immediately. We'll troubleshoot with you over the phone and, if needed, arrange for a replacement terminal as quickly as possible. Downtime costs you money and we take that seriously." } },
            { "@type": "Question", "name": "Can you integrate with my existing software?", "acceptedAnswer": { "@type": "Answer", "text": "In many cases, yes. We work with a variety of accounting, inventory, and reservation systems. During your consultation, we'll review your current tech stack and identify the best integration options." } },
            { "@type": "Question", "name": "Do you help with chargebacks?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. We can help you understand the chargeback process, gather the right documentation, and submit your rebuttal. We also offer guidance on best practices to reduce your chargeback rate proactively." } },
            // ── Statement Review & Switching ──
            { "@type": "Question", "name": "What is a statement review?", "acceptedAnswer": { "@type": "Answer", "text": "We analyze your current processing statement line by line, identify all fees you're being charged, and compare them against what we can offer. You'll get a clear, honest comparison showing your potential savings — with no obligation to switch." } },
            { "@type": "Question", "name": "How do I submit my statement for review?", "acceptedAnswer": { "@type": "Answer", "text": "You can submit your statement through our Statement Review page on this site, email it to us directly, or bring it to a consultation. We'll typically have your analysis back to you within 1 business day." } },
            { "@type": "Question", "name": "What if I'm locked into a contract with my current processor?", "acceptedAnswer": { "@type": "Answer", "text": "We'll review your current agreement and help you understand your options. In some cases, the savings from switching are significant enough to justify an early termination fee. We'll do the math with you so you can make an informed decision." } },
            { "@type": "Question", "name": "How long does it take to switch processors?", "acceptedAnswer": { "@type": "Answer", "text": "For most businesses, switching is straightforward. Once your application is approved (typically 1 day for low-risk), we'll coordinate equipment setup and ensure you have zero downtime during the transition." } },
            { "@type": "Question", "name": "Will switching processors disrupt my business?", "acceptedAnswer": { "@type": "Answer", "text": "We plan every transition carefully to minimize disruption. For POS systems, we schedule installation during off-hours when possible. For gateway switches, we test thoroughly before going live. Our goal is a seamless handoff." } }
          ]
        }}
      />
      {/* Hero */}
      <section className="bg-[#080808] pt-20 pb-16">
        <div className="container max-w-4xl mx-auto text-center">
          <span className="inline-block text-xs font-bold tracking-widest text-[#c9a84c] uppercase mb-4">
            UBC Unlimited — FAQ's
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4" style={{ fontFamily: "Sora, sans-serif" }}>
            Frequently Asked Questions
          </h1>
          <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
            {totalQuestions} answers across {faqCategories.length} categories — from pricing and setup to industry-specific questions. Can't find what you're looking for? Call us directly.
          </p>
          {/* Search */}
          <div className="relative max-w-xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" size={18} />
            <input
              type="text"
              placeholder="Search all questions..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-[#c9a84c] transition-colors text-sm"
            />
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="bg-white border-b border-gray-100 sticky top-[93px] z-30 shadow-sm">
        <div className="container overflow-x-auto">
          <div className="flex gap-1 py-3 min-w-max">
            <button
              onClick={() => setActiveCategory("all")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                activeCategory === "all"
                  ? "bg-[#080808] text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              All Questions
            </button>
            {faqCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                  activeCategory === cat.id
                    ? "bg-[#080808] text-white"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                {cat.icon} {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-16 bg-[#f8fafc]">
        <div className="container max-w-4xl mx-auto">
          {filtered.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-gray-600 text-lg mb-4">No questions match your search.</p>
              <button
                onClick={() => { setSearch(""); setActiveCategory("all"); }}
                className="btn-primary"
              >
                Clear Search
              </button>
            </div>
          ) : (
            <div className="space-y-12">
              {filtered.map((cat) => (
                <div key={cat.id} id={cat.id}>
                  <div className="flex items-center gap-3 mb-6">
                    <span className="text-2xl">{cat.icon}</span>
                    <h2 className="text-2xl font-bold text-[#080808]" style={{ fontFamily: "Sora, sans-serif" }}>
                      {cat.label}
                    </h2>
                    <span className="ml-auto text-xs text-gray-600 font-medium bg-gray-100 px-2 py-1 rounded-full">
                      {cat.questions.length} questions
                    </span>
                  </div>
                  <div className="space-y-3">
                    {cat.questions.map((item, i) => (
                      <FAQItem key={i} question={item.question} answer={item.answer} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Still Have Questions CTA */}
      <section className="py-16 bg-[#080808]">
        <div className="container max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4" style={{ fontFamily: "Sora, sans-serif" }}>
            Still Have Questions?
          </h2>
          <p className="text-gray-300 mb-8 text-lg">
            Our local team is here during business hours. You'll speak with a real person who knows Utah businesses — not a call center.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <a href={SITE.phoneHref} className="btn-gold flex items-center gap-2">
              <Phone size={18} /> {SITE.phone}
            </a>
            <a href={`mailto:${SITE.email}`} className="btn-outline-white flex items-center gap-2">
              <Mail size={18} /> {SITE.email}
            </a>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/consultation" className="btn-primary">
              Book a Consultation
            </Link>
            <Link href="/statement-review" className="btn-outline-white">
              Get a Statement Review
            </Link>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}

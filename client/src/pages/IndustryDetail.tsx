import { Link } from "wouter";
import type React from "react";
import { ArrowRight, CheckCircle, ChevronRight } from "lucide-react";
import PageLayout from "@/components/layout/PageLayout";
import CTABanner from "@/components/sections/CTABanner";
import FAQ from "@/components/sections/FAQ";
import SkyTabPOSBuilder from "@/components/sections/SkyTabPOSBuilder";
import { NAV_INDUSTRIES, NAV_SOLUTIONS } from "@/lib/config";
import SEO from "@/components/SEO";

export interface IndustryData {
  slug: string;
  icon: string;
  title: string;
  subtitle: string;
  description: string;
  challenges: string[];
  solutions: { title: string; desc: string }[];
  recommendedSolutions: string[];
  faqs: { question: string; answer: string | React.ReactNode }[];
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
      { title: "Gift Cards & Loyalty", desc: "Branded physical and digital gift cards plus a points-based loyalty program that rewards repeat diners, drives return visits, and builds a customer database for targeted email and SMS marketing campaigns." },
      { title: "Dual Pricing Program", desc: "Eliminate or significantly reduce your credit card processing costs with our compliant dual pricing program. Display a cash price and a card price at the point of sale — fully legal in Utah and all 50 states — and let your customers choose how they pay." },
    ],
    recommendedSolutions: ["/solutions/pos-systems", "/solutions/credit-card-processing", "/solutions/gift-loyalty", "/solutions/dual-pricing"],
    faqs: [
      { question: "Can I reduce my credit card processing costs as a restaurant?", answer: "Yes. Our dual pricing program lets you display a cash price and a card price at the point of sale. Customers who pay by card cover the processing cost, which can effectively eliminate your fees. The program is fully compliant with card network rules, legal in all 50 states, and includes all required signage and staff training. Most restaurant owners see minimal customer pushback when the pricing is displayed clearly upfront. Learn more at our Dual Pricing & Cash Discount page." },
      { question: "What POS system do you recommend for restaurants?", answer: "We typically recommend SkyTab for full-service restaurants. It offers tableside ordering, kitchen display systems, online ordering integration, and robust reporting — all in one system." },
      { question: "Can I accept tips with your system?", answer: "Yes. Our restaurant POS systems include tip prompts on customer-facing screens, tip pooling, and automatic tip reporting for payroll." },
      { question: "Do you integrate with online ordering platforms?", answer: "Yes. We integrate with major online ordering platforms and also offer our own integrated online ordering solution that flows directly into your POS." },
      { question: "Do you offer gift cards and loyalty programs for restaurants?", answer: "Yes. We offer fully integrated gift card and loyalty solutions that work seamlessly with your POS and payment processing. Branded physical and digital gift cards help you acquire new customers — gift card recipients typically spend 20–40% more than the card's face value. A points-based loyalty program rewards repeat diners, increases visit frequency, and builds a customer database you can market to directly with email and SMS campaigns. No punch cards, no manual tracking — everything runs automatically at the point of sale." },
      { question: "How does SkyTab compare to Toast, Square, and Clover?", answer: (
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
          <p className="text-[10px] text-gray-400 mt-2 italic">✅ Included &nbsp; ⚠️ Limited/add-on &nbsp; ❌ Not available. Pricing and features based on publicly available information as of early 2026 and may vary.</p>
        </div>
      ) },
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
      { title: "Gift Cards & Loyalty", desc: "Branded gift cards and a loyalty rewards program that turns one-time visitors into regulars. Reward frequent guests with points, run targeted promotions during slow nights, and build a customer list for SMS and email marketing." },
    ],
    recommendedSolutions: ["/solutions/pos-systems", "/solutions/credit-card-processing", "/solutions/gift-loyalty"],
    faqs: [
      { question: "Can I pre-authorize cards for tabs?", answer: "Yes. Our bar POS systems support pre-authorization holds, so you can hold a card on file and capture the final amount when the customer closes out." },
      { question: "Do you offer gift cards and loyalty programs for bars?", answer: "Yes. Branded gift cards are a proven revenue driver — they're purchased upfront and often never fully redeemed, providing float income. A loyalty program rewards your regulars with points for every visit or dollar spent, encouraging them to choose your bar over competitors. Both integrate directly with your POS so there's no manual tracking or separate system to manage." },
      { question: "How does SkyTab compare to Toast, Square, and Clover?", answer: (
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
          <p className="text-[10px] text-gray-400 mt-2 italic">✅ Included &nbsp; ⚠️ Limited/add-on &nbsp; ❌ Not available. Pricing and features based on publicly available information as of early 2026 and may vary.</p>
        </div>
      ) },
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
      { title: "Gift Cards & Loyalty", desc: "Branded physical and digital gift cards plus a customizable loyalty rewards program. Increase average transaction size, drive repeat visits, and build a customer database for targeted promotions — all managed from your POS." },
      { title: "Dual Pricing Program", desc: "Reduce or eliminate your processing costs with a compliant dual pricing setup. Post both a cash price and a card price — customers who pay by card cover the fee. Works with your existing POS and requires no monthly fee to participate." },
    ],
    recommendedSolutions: ["/solutions/pos-systems", "/solutions/credit-card-processing", "/solutions/gift-loyalty", "/solutions/dual-pricing"],
    faqs: [
      { question: "Can I reduce my processing costs as a retail store?", answer: "Yes. Our dual pricing program is one of the most effective ways for retail stores to offset or eliminate credit card processing fees. You post two prices — a cash price and a card price — and customers who pay by card cover the processing cost. The program is fully compliant, legal in all 50 states, and we provide all required signage and receipt language. Most retailers report minimal impact on customer experience when pricing is clearly displayed." },
      { question: "Can I manage inventory across multiple locations?", answer: "Yes. Our retail POS systems support multi-location inventory management with centralized reporting." },
      { question: "Do you offer gift card programs?", answer: "Yes. We offer both physical and digital gift card programs that integrate directly with your POS. Customers can purchase, redeem, and check balances at the register or online. Gift cards are one of the highest-margin products a retail store can sell — they bring in new customers and drive incremental spending above the card's face value." },
      { question: "How does a loyalty program benefit my retail store?", answer: "A points-based loyalty program rewards customers for every purchase, increasing visit frequency and average spend. You can offer bonus points on slow days, birthday rewards, and tiered status levels to keep your best customers engaged. All customer activity is tracked automatically at the POS — no paper punch cards or manual entry required." },
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
    subtitle: "Complete payment solutions for dealerships and auto repair shops",
    description: "Auto dealerships and repair shops face unique payment challenges — high-ticket vehicle transactions, check acceptance risk, and the need for fast, reliable funding. We offer an all-in-one suite of payment solutions designed specifically for the automotive industry, helping you increase sales, reduce risk, and get paid faster.",
    challenges: ["High-ticket vehicle transaction processing", "Returned check risk and funding delays", "Down payment and multi-check acceptance", "Remote and phone-based payment authorization"],
    solutions: [
      { title: "Check Guarantee", desc: "Accept checks with confidence — we guarantee payment so you never have to chase down returned checks or absorb the loss." },
      { title: "Remote Deposit Capture (RDC)", desc: "Scan and deposit guaranteed checks directly from your dealership via desktop or mobile app. Funds are deposited into your account within 48–72 hours." },
      { title: "Multiple Check Acceptance", desc: "Allow customers to split a down payment across up to four checks deposited over an agreed period (typically 30 days) — each one guaranteed." },
      { title: "COD (Check on Delivery)", desc: "Pre-authorize checks over the phone before delivery occurs. Ideal for parts and service orders — get an authorization number before the driver leaves, then process for guaranteed payment on return." },
      { title: "Dual Pricing Program", desc: "Offset your credit card processing costs with a compliant dual pricing program. For high-ticket vehicle and service transactions, dual pricing can represent significant monthly savings — display both a cash and card price at checkout and let customers choose." },
    ],
    recommendedSolutions: ["/solutions/credit-card-processing", "/solutions/virtual-terminals", "/solutions/ach-echeck-processing", "/solutions/dual-pricing"],
    faqs: [
      { question: "Can dual pricing help reduce processing costs on high-ticket vehicle sales?", answer: "Yes. For dealerships and auto repair shops, dual pricing can be especially impactful because even a small percentage saved on a $30,000 vehicle transaction adds up quickly. Our dual pricing program displays both a cash price and a card price at the point of sale — customers who pay by card cover the processing cost. The program is fully compliant with card network rules, legal in all 50 states, and we handle all required signage and setup." },
      { question: "Do you offer competitive rates for high-ticket transactions?", answer: "Yes. We structure pricing specifically around your transaction profile — for high-ticket vehicle sales and major service repairs, the right pricing model can represent substantial savings compared to what most flat-rate national processors charge. We'll analyze your current processing costs and show you a clear comparison before you make any decision." },
      { question: "How does check guarantee work for auto dealerships?", answer: "Our check guarantee service verifies and guarantees customer checks at the point of sale. If a check is returned for any reason, we cover the loss — you keep the funds. Checks are scanned and transmitted electronically via desktop or mobile app, with funds deposited into your dealership account within 48–72 hours. The service includes 24/7 processing, transaction reporting, and tech support, plus paperless recordkeeping." },
      { question: "Can customers split a down payment across multiple checks?", answer: "Yes. Our Multiple Check service allows customers to write up to four checks for a single sale or down payment. The checks are deposited over an agreed period — typically 30 days — on dates set by you and the customer. Each check is individually guaranteed, so you're protected throughout the entire payment schedule." },
      { question: "Can I pre-authorize a check payment before a parts delivery?", answer: "Yes. Our COD (Check on Delivery) service lets you pre-approve a check payment over the phone before the delivery happens. Your parts department enters the estimated sale amount and the customer's phone number to receive an authorization number. The driver delivers the order, collects the check, and you process it for guaranteed payment — eliminating the risk of non-payment on delivery." },
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
      { title: "Gift Cards & Loyalty", desc: "Branded gift cards are one of the most effective marketing tools for salons and spas — perfect for holidays, birthdays, and bridal parties. Pair them with a loyalty rewards program that tracks visits, awards points for services and retail purchases, and keeps clients coming back." },
    ],
    recommendedSolutions: ["/solutions/pos-systems", "/solutions/credit-card-processing", "/solutions/gift-loyalty"],
    faqs: [
      { question: "Can I integrate with my booking software?", answer: "We integrate with many popular salon booking platforms. Contact us to discuss your specific software." },
      { question: "How do you handle tip distribution?", answer: "Our POS systems include tip pooling, individual tip tracking, and automatic tip reports for payroll processing." },
      { question: "Do you offer gift cards and loyalty programs for salons and spas?", answer: "Yes. Gift cards are one of the top revenue drivers for salons and spas — especially around holidays, Mother's Day, and bridal season. We offer branded physical and digital gift cards that integrate with your POS for easy redemption and balance tracking. Our loyalty program rewards clients for every service and retail purchase, encouraging rebooking and increasing average ticket size. Everything is tracked automatically — no paper cards, no manual entry." },
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
  {
    slug: "cbd-hemp",
    icon: "🌿",
    title: "CBD & Hemp",
    subtitle: "Stable, compliant merchant accounts for CBD and hemp retailers",
    description: "CBD and hemp businesses face one of the most challenging payment processing environments of any retail category. Most major banks and processors — including Square, Stripe, and PayPal — prohibit CBD sales outright, leaving merchants scrambling for accounts that don't get shut down without warning. UBC Unlimited works with specialized acquiring banks that have deep experience in the hemp and CBD space, providing stable, compliant merchant accounts for CBD retailers, hemp product manufacturers, online CBD stores, and wellness brands across Utah and nationwide.",
    challenges: [
      "Frequent account terminations from mainstream processors",
      "Difficulty distinguishing hemp-derived CBD from marijuana for bank underwriting",
      "Evolving state and federal regulations (Farm Bill compliance)",
      "High chargeback rates from subscription billing and online sales",
      "Age verification and product labeling compliance requirements",
    ],
    solutions: [
      { title: "Specialized High-Risk Merchant Accounts", desc: "We place CBD and hemp businesses with acquiring banks that specialize in this category — providing stable accounts with no surprise terminations or fund holds." },
      { title: "eCommerce Payment Gateways", desc: "CBD-friendly payment gateways compatible with WooCommerce, Shopify (via third-party checkout), BigCommerce, and custom storefronts — so you can sell online without workarounds." },
      { title: "Subscription & Recurring Billing", desc: "Automate subscription billing for CBD wellness products with pre-dunning notifications and transparent billing descriptors to reduce chargebacks." },
      { title: "Chargeback Management", desc: "Real-time chargeback monitoring and dispute response tools to keep your ratio below the 1% threshold required by most high-risk processors." },
      { title: "Cash Discount Program", desc: "Offset elevated processing rates with a compliant cash discount program — legal in all 50 states and applicable to all card types." },
    ],
    recommendedSolutions: ["/solutions/high-risk-processing", "/solutions/ecommerce-payments", "/solutions/credit-card-processing", "/solutions/dual-pricing"],
    faqs: [
      { question: "Why do most processors decline CBD businesses?", answer: "Most mainstream processors — including Square, Stripe, and PayPal — prohibit CBD sales in their terms of service due to the regulatory complexity of hemp-derived cannabidiol, the risk of chargebacks from online sales, and the reputational risk associated with cannabis-adjacent products. This is a policy decision, not a legal requirement. Specialized high-risk processors have underwriting frameworks specifically designed for the CBD category and can provide stable, long-term accounts." },
      { question: "Is CBD processing legal?", answer: "Yes. Hemp-derived CBD with less than 0.3% THC was federally legalized under the 2018 Farm Bill. Selling CBD products and accepting payment for them is legal at the federal level. However, individual states have varying regulations on CBD sales, and payment processors have their own policies that may be more restrictive than the law. We work with processors who are comfortable with Farm Bill-compliant CBD products." },
      { question: "What documentation do I need to apply?", answer: "High-risk underwriting for CBD typically requires: proof of Farm Bill compliance (Certificate of Analysis from an accredited lab showing <0.3% THC), your business license, a copy of your website and product descriptions, processing history (if available), and your EIN and bank statements. We'll walk you through the complete documentation checklist during your application." },
      { question: "Can I accept payments on my CBD website?", answer: "Yes. We work with CBD-friendly payment gateways that integrate with major eCommerce platforms. Depending on your platform, the integration may require a third-party checkout or a direct API connection — we handle the technical setup on your behalf." },
    ],
  },
  {
    slug: "nutraceuticals",
    icon: "💊",
    title: "Nutraceuticals & Supplements",
    subtitle: "Payment processing for supplement brands, health products, and continuity programs",
    description: "The nutraceutical and dietary supplement industry is one of the most consistently high-risk categories in payment processing. Elevated chargeback rates from subscription and continuity billing, aggressive marketing practices across the industry, and heavy FTC regulatory scrutiny make it difficult for supplement brands to maintain stable merchant accounts with traditional processors. UBC Unlimited works with acquiring banks that specialize in nutraceuticals, dietary supplements, weight loss products, sports nutrition, and health and wellness brands — providing stable accounts with the chargeback management tools you need to stay compliant.",
    challenges: [
      "High chargeback rates from continuity and subscription billing",
      "FTC scrutiny of health claims and marketing practices",
      "Frequent account terminations from mainstream processors",
      "Rolling reserve requirements from acquiring banks",
      "Multi-product SKU management and recurring billing complexity",
    ],
    solutions: [
      { title: "Nutraceutical-Specialist Merchant Accounts", desc: "We place supplement brands with acquiring banks that understand the category — stable accounts with transparent terms and no surprise terminations." },
      { title: "Subscription & Continuity Billing", desc: "Compliant recurring billing with pre-dunning notifications, clear billing descriptors, and flexible retry logic to reduce chargebacks from subscription disputes." },
      { title: "Chargeback Prevention & Monitoring", desc: "Real-time chargeback alerts, dispute response tools, and proactive fraud screening to keep your chargeback ratio below the 1% threshold." },
      { title: "Multiple MID Structure", desc: "For brands with multiple product lines, we can structure separate merchant accounts by product category to isolate chargeback risk and protect your highest-volume accounts." },
      { title: "eCommerce & Funnel Integration", desc: "Compatible with leading supplement sales funnels, shopping carts, and order management systems including NMI, Authorize.net, and USAePay gateways." },
    ],
    recommendedSolutions: ["/solutions/high-risk-processing", "/solutions/ecommerce-payments", "/solutions/virtual-terminals"],
    faqs: [
      { question: "Why are nutraceuticals considered high-risk?", answer: "The supplement industry has historically high chargeback rates, largely driven by continuity and subscription billing models where customers dispute charges they don't recognize or forgot they signed up for. The FTC has also brought enforcement actions against supplement companies for deceptive marketing practices, which increases regulatory scrutiny across the entire category. These factors make acquiring banks cautious about the industry, resulting in high-risk classification even for brands with clean compliance records." },
      { question: "Can I run a subscription or continuity program?", answer: "Yes. We work with processors that specialize in subscription billing for nutraceuticals. The key to maintaining a stable account is keeping your chargeback ratio below 1%, using clear billing descriptors that customers recognize, sending pre-billing notifications, and making cancellation easy. We provide the tools and guidance to implement these practices from day one." },
      { question: "What are typical processing rates for supplement brands?", answer: "High-risk processing rates for nutraceuticals typically range from 3.5% to 5.5% per transaction, plus a monthly account fee of $25–$100 and chargeback fees of $25–$50 per dispute. Some accounts also require a rolling reserve. The exact rate depends on your volume, chargeback history, and product category. We provide a full fee disclosure before you sign anything." },
      { question: "Can I get approved if I've been terminated before?", answer: "In many cases, yes. If your previous account was terminated due to chargebacks, we'll work with you to understand the root cause and implement the controls needed to demonstrate to a new acquiring bank that the issue has been addressed. Approval is not guaranteed, but we have placed many previously terminated supplement brands with stable new processors." },
    ],
  },
  {
    slug: "non-profit",
    icon: "🤝",
    title: "Non-Profit & Charity",
    subtitle: "Donation processing and fund management for non-profits, charities, and foundations",
    description: "Non-profit organizations and charities have unique payment processing needs that differ significantly from for-profit businesses. From one-time donations to recurring giving programs, event ticket sales, and membership dues, UBC Unlimited provides non-profits with cost-effective payment solutions that maximize the portion of every dollar that reaches your mission. We offer competitive rates, transparent pricing, and the tools your team needs to manage donations, issue receipts, and reconcile funds — without the complexity or high fees that eat into your budget.",
    challenges: [
      "High processing fees reducing the impact of every donation",
      "Managing recurring monthly giving programs reliably",
      "Accepting donations across multiple channels (online, in-person, events)",
      "Generating donor receipts and tax documentation",
      "Integrating payments with donor management and CRM systems",
    ],
    solutions: [
      { title: "Low-Cost Donation Processing", desc: "Competitive interchange-plus pricing structured for non-profit transaction patterns — lower average fees than standard retail accounts, keeping more of every donation working toward your mission." },
      { title: "Recurring Giving Programs", desc: "Automated monthly giving with card-on-file billing, pre-dunning notifications, and automatic card updater to minimize failed payments and donor attrition." },
      { title: "Online Donation Pages", desc: "Branded, mobile-optimized donation pages with flexible giving amounts, custom fields, and instant email receipts — no coding required." },
      { title: "Event & Ticket Payments", desc: "Accept payments at fundraising events, galas, and auctions with mobile card readers, virtual terminals, and contactless payment options." },
      { title: "Donor Receipt Automation", desc: "Automatic tax receipt generation for every donation, with customizable templates that include your organization's EIN and mission statement." },
    ],
    recommendedSolutions: ["/solutions/credit-card-processing", "/solutions/ecommerce-payments", "/solutions/virtual-terminals", "/solutions/ach-payments"],
    faqs: [
      { question: "Do non-profits get lower processing rates?", answer: "Non-profits are eligible for reduced interchange rates on qualifying donations through Visa and Mastercard's non-profit interchange programs. The discount is typically 0.10%–0.20% lower than standard retail rates. To qualify, your organization must be registered as a 501(c)(3) and the transactions must be coded correctly as charitable donations. UBC Unlimited handles the qualification process and ensures your account is set up to receive the reduced rates automatically." },
      { question: "Can we set up recurring monthly donations?", answer: "Yes. We offer fully automated recurring giving programs with card-on-file billing, automatic card updater (which updates expired cards automatically to reduce failed payments), and pre-dunning email notifications. Recurring donors give 42% more annually than one-time donors on average, making a well-managed monthly giving program one of the highest-ROI fundraising tools available." },
      { question: "Can donors pay by ACH bank transfer?", answer: "Yes. ACH bank transfers are an excellent option for non-profits because the processing cost is significantly lower than credit cards — typically $0.25–$0.75 per transaction regardless of amount. For large donations, this can save hundreds of dollars in processing fees. We can set up both one-time and recurring ACH giving options on your donation page." },
      { question: "How do we handle donation receipts for tax purposes?", answer: "Our system automatically generates IRS-compliant donation receipts for every transaction, including your organization's name, EIN, donation amount, date, and a statement that no goods or services were provided in exchange for the donation. Receipts are emailed to donors immediately after each transaction and can also be downloaded from your reporting dashboard." },
    ],
  },
  {
    slug: "adult-entertainment",
    icon: "🔞",
    title: "Adult Entertainment",
    subtitle: "Discreet, stable payment processing for adult content and entertainment businesses",
    description: "Adult entertainment is one of the most restricted categories in payment processing. Visa and Mastercard have implemented strict content and compliance requirements for adult merchants following the 2020 policy changes, and most mainstream processors have exited the category entirely. UBC Unlimited works with specialized acquiring banks that remain active in the adult space and have the compliance frameworks to support adult content platforms, subscription sites, live streaming, and adult retail businesses — with discreet billing descriptors and stable, long-term accounts.",
    challenges: [
      "Mainstream processor prohibitions on adult content",
      "Visa/Mastercard compliance requirements (age verification, content moderation)",
      "High chargeback rates from subscription billing and friendly fraud",
      "Discreet billing descriptor requirements",
      "Rolling reserve and account stability concerns",
    ],
    solutions: [
      { title: "Adult-Specialist Merchant Accounts", desc: "We work with acquiring banks that remain active in the adult category and have the compliance infrastructure to support adult content platforms, subscription sites, and retail businesses." },
      { title: "Age Verification Compliance", desc: "Guidance on implementing the age verification and content moderation requirements mandated by Visa and Mastercard for adult merchants." },
      { title: "Discreet Billing Descriptors", desc: "Billing descriptors configured to minimize customer confusion and reduce friendly fraud chargebacks — one of the primary chargeback drivers in the adult category." },
      { title: "Subscription & Recurring Billing", desc: "Compliant recurring billing with pre-dunning notifications, easy cancellation flows, and transparent billing practices to keep chargeback rates in check." },
      { title: "Chargeback Management", desc: "Real-time chargeback monitoring and dispute response tools to protect your account from the elevated chargeback exposure common in adult subscription billing." },
    ],
    recommendedSolutions: ["/solutions/high-risk-processing", "/solutions/ecommerce-payments", "/solutions/virtual-terminals"],
    faqs: [
      { question: "Can you get a merchant account for an adult content platform?", answer: "Yes, in most cases. We work with specialized acquiring banks that remain active in the adult category. Approval depends on your specific business model, content type, compliance posture, and processing history. We'll evaluate your situation and recommend the best path forward during your consultation." },
      { question: "What compliance requirements apply to adult merchants?", answer: "Following Visa and Mastercard's 2020 policy updates, adult merchants are required to implement age verification for all content, content moderation processes to prevent non-consensual content, clear billing descriptors, and easy cancellation mechanisms. We provide guidance on implementing these requirements as part of our onboarding process." },
      { question: "What are typical rates for adult entertainment processing?", answer: "Adult entertainment is among the highest-risk categories, and rates reflect that. Expect processing fees of 4%–7% per transaction, monthly account fees, and chargeback fees of $35–$50 per dispute. Rolling reserves are common. We provide a full fee disclosure before you commit to anything." },
      { question: "How do I reduce chargebacks on my adult subscription site?", answer: "The most effective chargeback reduction strategies for adult subscription businesses are: using a recognizable, discreet billing descriptor; sending pre-billing email notifications before each charge; making cancellation easy and prominently displayed; and responding to disputes quickly with transaction evidence. We provide chargeback monitoring tools and dispute response support as part of your account." },
    ],
  },
  {
    slug: "travel",
    icon: "✈️",
    title: "Travel & Hospitality",
    subtitle: "Payment processing for travel agencies, booking platforms, and hospitality businesses",
    description: "Travel businesses face a unique combination of high-risk factors: large average ticket sizes, advance payment for future services, high chargeback rates from cancellations and disputes, and significant exposure to fraud. These factors cause many mainstream processors to classify travel agencies, online booking platforms, tour operators, and vacation rental companies as high-risk — even when the business is well-established and financially healthy. UBC Unlimited works with acquiring banks experienced in the travel vertical to provide stable merchant accounts with the chargeback management tools and fraud prevention capabilities that travel businesses need.",
    challenges: [
      "High chargeback rates from cancellations and travel disruptions",
      "Large average ticket sizes triggering fraud flags",
      "Advance payment for future services (delayed delivery risk)",
      "Seasonal revenue fluctuations affecting underwriting",
      "International transactions and multi-currency requirements",
    ],
    solutions: [
      { title: "Travel-Specialist Merchant Accounts", desc: "We place travel businesses with acquiring banks that understand the advance-payment model and seasonal revenue patterns of the travel industry." },
      { title: "Chargeback Prevention", desc: "Real-time chargeback monitoring, dispute response tools, and proactive fraud screening designed for the specific chargeback triggers common in travel — cancellations, no-shows, and service disputes." },
      { title: "Multi-Currency Processing", desc: "Accept payments in multiple currencies for international bookings, with competitive foreign exchange rates and transparent currency conversion fees." },
      { title: "Fraud Screening", desc: "Advanced fraud detection tools calibrated for high-ticket travel transactions, including velocity checks, AVS verification, and 3D Secure authentication." },
      { title: "Flexible Payment Options", desc: "Deposit-and-balance billing, installment payment plans, and pay-at-travel options to reduce cancellation rates and improve cash flow." },
    ],
    recommendedSolutions: ["/solutions/high-risk-processing", "/solutions/ecommerce-payments", "/solutions/virtual-terminals", "/solutions/credit-card-processing"],
    faqs: [
      { question: "Why is the travel industry considered high-risk?", answer: "Travel businesses are classified as high-risk primarily because of the advance-payment model — customers pay for services weeks or months before they're delivered. If the business closes, a natural disaster occurs, or the customer cancels, the processor is exposed to chargebacks on transactions that may have already been paid out. High average ticket sizes amplify this exposure. These factors make acquiring banks cautious about the category, even for established, reputable travel agencies." },
      { question: "How can I reduce chargebacks as a travel business?", answer: "The most effective strategies are: clear, prominently displayed cancellation and refund policies; booking confirmation emails with detailed itinerary and policy information; proactive communication when travel disruptions occur; and a responsive customer service process that resolves disputes before they become chargebacks. We provide chargeback monitoring tools and dispute response support as part of your account." },
      { question: "Can I accept international payments?", answer: "Yes. We can structure your account for multi-currency acceptance and cross-border transaction support. International processing capabilities are typically broader with high-risk processors than with standard accounts." },
      { question: "What are typical rates for travel agency processing?", answer: "Travel processing rates typically range from 3.5% to 5% per transaction, with monthly account fees and chargeback fees of $25–$50 per dispute. Rolling reserves are common for new accounts. Rates improve as your account establishes a clean processing history. We provide a full fee disclosure before you commit to anything." },
    ],
  },
  {
    slug: "online-gaming",
    icon: "🎮",
    title: "Online Gaming & Fantasy Sports",
    subtitle: "Payment processing for skill-based gaming, fantasy sports, and gaming platforms",
    description: "Online gaming and fantasy sports platforms operate in a complex regulatory and payment processing environment. While skill-based gaming and daily fantasy sports are legal in most U.S. states, many payment processors treat the entire category as high-risk due to regulatory uncertainty, high chargeback rates, and the association with gambling. UBC Unlimited works with specialized acquiring banks that distinguish between skill-based gaming, fantasy sports, and gambling — providing compliant merchant accounts for legitimate gaming platforms, esports organizations, gaming merchandise retailers, and arcade businesses.",
    challenges: [
      "Processor classification as gambling even for skill-based games",
      "State-by-state regulatory complexity for daily fantasy sports",
      "High chargeback rates from disputed gaming transactions",
      "Age verification and responsible gaming compliance",
      "High transaction velocity and fraud exposure",
    ],
    solutions: [
      { title: "Gaming-Specialist Merchant Accounts", desc: "We work with acquiring banks that understand the distinction between skill-based gaming, fantasy sports, and gambling — and can provide compliant accounts for legitimate gaming platforms." },
      { title: "Fraud Prevention & Velocity Controls", desc: "Advanced fraud detection tools calibrated for high-velocity gaming transactions, including velocity limits, device fingerprinting, and behavioral analytics." },
      { title: "Chargeback Management", desc: "Real-time chargeback monitoring and dispute response tools to manage the elevated chargeback exposure common in gaming and fantasy sports." },
      { title: "Recurring & Subscription Billing", desc: "Compliant subscription billing for gaming memberships, season passes, and premium content — with transparent billing descriptors and easy cancellation." },
      { title: "eCommerce & In-App Payments", desc: "Payment gateway integration for gaming merchandise, in-app purchases, and digital content sales — compatible with NMI, Authorize.net, and custom API integrations." },
    ],
    recommendedSolutions: ["/solutions/high-risk-processing", "/solutions/ecommerce-payments", "/solutions/virtual-terminals"],
    faqs: [
      { question: "Is daily fantasy sports processing legal?", answer: "Daily fantasy sports (DFS) is legal in most U.S. states and has been explicitly exempted from the Unlawful Internet Gambling Enforcement Act (UIGEA) by many state legislatures. However, a small number of states have restricted or prohibited DFS. We work with processors that have experience in the DFS category and can advise on the regulatory landscape for your specific platform and target states." },
      { question: "Why do processors classify gaming as high-risk?", answer: "Most processors apply a broad high-risk classification to any business associated with gaming, gambling, or wagering — even when the business is clearly skill-based and legally compliant. This is a conservative underwriting posture driven by regulatory uncertainty and the historically high chargeback rates in the broader gaming category. Specialized processors who understand the distinction between skill-based gaming and gambling can provide more appropriate terms." },
      { question: "Can I accept payments for gaming merchandise?", answer: "Yes. Gaming merchandise retail is generally easier to process than gaming platform transactions and may qualify for standard or near-standard processing rates depending on your business model. We'll evaluate your complete business and recommend the optimal account structure." },
      { question: "What fraud prevention tools do you offer for gaming platforms?", answer: "We provide advanced fraud detection tools including velocity controls, device fingerprinting, IP geolocation, AVS verification, and 3D Secure authentication. For high-volume gaming platforms, we can also integrate with specialized fraud prevention services that use behavioral analytics and machine learning to identify suspicious transaction patterns." },
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
          <h1 className="text-2xl font-bold text-[#080808]">Industry page not found</h1>
          <Link href="/industries" className="btn-teal mt-4 inline-flex">Back to Industries</Link>
        </div>
      </PageLayout>
    );
  }

  const recommendedItems = NAV_SOLUTIONS.filter((s) => data.recommendedSolutions.includes(s.href));
  const relatedIndustries = NAV_INDUSTRIES.filter((i) => !i.href.endsWith(slug)).slice(0, 4);

  return (
    <PageLayout>
      <SEO
        title={`${data.title} Payment Processing in Utah`}
        description={`${data.description.slice(0, 140)} UBC Unlimited serves Utah ${data.title.toLowerCase()} businesses with tailored payment solutions.`}
        canonical={`/industries/${data.slug}`}
        schema={{
          "@context": "https://schema.org",
          "@type": "Service",
          "name": `${data.title} Payment Processing`,
          "description": data.description,
          "provider": {
            "@type": "LocalBusiness",
            "name": "UBC Unlimited",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Salt Lake City",
              "addressRegion": "UT",
              "addressCountry": "US"
            }
          },
          "areaServed": {
            "@type": "State",
            "name": "Utah"
          }
        }}
      />
      {/* Hero */}
      <section className="bg-[#080808] py-20">
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
              <h2 className="text-2xl font-bold text-[#080808] mb-4" style={{ fontFamily: 'Sora, sans-serif' }}>
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
              <h2 className="text-2xl font-bold text-[#080808] mb-4" style={{ fontFamily: 'Sora, sans-serif' }}>
                How We Solve Them
              </h2>
              <div className="space-y-4">
                {data.solutions.map((s) => (
                  <div key={s.title} className="bg-white rounded-xl p-4 border border-gray-100 hover:border-[#c9a84c]/30 transition-all">
                    <div className="flex items-center gap-2 mb-1.5">
                      <CheckCircle size={15} className="text-[#c9a84c]" />
                      <span className="font-semibold text-sm text-[#080808]" style={{ fontFamily: 'Sora, sans-serif' }}>{s.title}</span>
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
          <h2 className="text-xl font-bold text-[#080808] mb-5" style={{ fontFamily: 'Sora, sans-serif' }}>
            Recommended Solutions for {data.title}
          </h2>
          <div className="flex flex-wrap gap-3">
            {recommendedItems.map((item) => (
              <Link key={item.href} href={item.href} className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-gray-200 hover:border-[#c9a84c]/40 hover:bg-[#c9a84c]/5 transition-all text-sm font-medium text-[#080808]">
                <span>{item.icon}</span> {item.label} <ChevronRight size={13} className="text-[#c9a84c]" />
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
          <h2 className="text-xl font-bold text-[#080808] mb-5" style={{ fontFamily: 'Sora, sans-serif' }}>Other Industries We Serve</h2>
          <div className="flex flex-wrap gap-3">
            {relatedIndustries.map((item) => (
              <Link key={item.href} href={item.href} className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-gray-200 hover:border-[#c9a84c]/40 hover:bg-[#c9a84c]/5 transition-all text-sm font-medium text-[#080808]">
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

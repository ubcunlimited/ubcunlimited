import { Link } from "wouter";
import { ArrowRight, CheckCircle, ChevronRight, Clock, Phone, Shield, TrendingUp, Zap, Star, AlertCircle } from "lucide-react";
import { SOLUTION_PAIRS } from "@/lib/solutionPairs";
import { getSolutionPath } from "@/lib/solutionTagMap";
import PageLayout from "@/components/layout/PageLayout";
import CTABanner from "@/components/sections/CTABanner";
import FAQ from "@/components/sections/FAQ";
import { NAV_SOLUTIONS } from "@/lib/config";
import SEO from "@/components/SEO";

export interface SolutionData {
  slug: string;
  icon: string;
  title: string;
  subtitle: string;
  description: string;
  metaDescription?: string;
  heroPoints: string[];
  features: { title: string; desc: string }[];
  benefits: string[];
  faqs: { question: string; answer: string }[];
  relatedSolutions?: string[];
}

// Per-solution stats shown in the stats bar
const SOLUTION_STATS: Record<string, { value: string; label: string }[]> = {
  "credit-card-processing": [
    { value: "20+", label: "Years in Business" },
    { value: "Next Day", label: "Funding Available" },
    { value: "$0", label: "Setup Fees on Qualifying Accounts" },
    { value: "24–48h", label: "Avg. Activation (Low Risk)¹" },
  ],
  "ach-echeck-processing": [
    { value: "60–80%", label: "Lower Cost vs. Cards" },
    { value: "Same Day", label: "ACH Available" },
    { value: "$0", label: "NSF Risk w/ Guarantee" },
    { value: "Unlimited", label: "Batch Size" },
  ],
  "check-guarantee": [
    { value: "48–72h", label: "Fund Deposit Time" },
    { value: "100%", label: "Reimbursement on Approved Checks" },
    { value: "24/7", label: "Processing & Support" },
    { value: "$0", label: "Loaner Equipment" },
  ],
  "pos-systems": [
    { value: "Lifetime", label: "Hardware Warranty" },
    { value: "0%", label: "Online Order Commission" },
    { value: "24/7", label: "Local Support" },
    { value: "14-Day", label: "Launch From Approval¹" },
  ],
  "ecommerce-payments": [
    { value: "350+", label: "Platform Integrations" },
    { value: "99.9%", label: "Gateway Uptime" },
    { value: "Multi", label: "Gateway Options" },
    { value: "24/7", label: "Fraud Monitoring" },
  ],
  "mobile-processing": [
    { value: "$0", label: "Hardware (Tap-to-Pay)" },
    { value: "1–2s", label: "Transaction Speed" },
    { value: "Offline", label: "Mode Available" },
    { value: "Next Day", label: "Funding" },
  ],
  "virtual-terminals": [
    { value: "Browser", label: "Based — No Install" },
    { value: "Unlimited", label: "Users & Locations" },
    { value: "Any Device", label: "No Hardware Required" },
    { value: "PCI", label: "DSS Compliant" },
  ],
  "invoicing": [
    { value: "2,000+", label: "Platform Integrations" },
    { value: "60s", label: "Avg. Customer Pay Time" },
    { value: "Next Day", label: "Funding" },
    { value: "$0", label: "Gateway Fees (Qualifying)" },
  ],
  "gift-loyalty": [
    { value: "More Spent", label: "Gift Card Redemption" },
    { value: "Higher", label: "Spend by Loyalty Members" },
    { value: "$0", label: "Annual Program Fees" },
    { value: "POS", label: "Integrated — No Manual Tracking" },
  ],
  "surcharge-cash-discount": [
    { value: "Up to 100%", label: "Fees Eliminated" },
    { value: "All 50", label: "States (Cash Discount)" },
    { value: "$0", label: "Monthly Program Fee" },
    { value: "Included", label: "Signage & Training" },
  ],
  "high-risk-processing": [
    { value: "24–72h", label: "Approval Time" },
    { value: "Multiple", label: "Acquiring Bank Options" },
    { value: "50+", label: "High-Risk Verticals" },
    { value: "Local", label: "Utah Rep Assigned" },
  ],
};

// Per-solution "How It Works" steps
const SOLUTION_HOW_IT_WORKS: Record<string, { step: string; title: string; desc: string }[]> = {
  default: [
    { step: "01", title: "Book a Consultation", desc: "Schedule an in-depth, no-pressure conversation with a local Utah expert. We will take time to learn about your setup and help find a solution that is right for you." },
    { step: "02", title: "Review & Proposal", desc: "We analyze your current costs and build a tailored proposal with transparent pricing — no surprises, no hidden fees." },
    { step: "03", title: "Seamless Setup", desc: "Our team handles everything — equipment, integration, and training. Depending on the solution, businesses can be up and processing as fast as same day." },
  ],
  "pos-systems": [
    { step: "01", title: "Consultation & Demo", desc: "We walk you through SkyTab's features and configure a demo around your specific menu, floor plan, and service model." },
    { step: "02", title: "Custom Configuration", desc: "We build your menu, set up your floor plan, configure staff permissions, and integrate your online ordering before installation day." },
    { step: "03", title: "On-Site Installation & Go-Live", desc: "Our Utah-based team installs your hardware, trains your staff, and stays until everything is running smoothly — targeting a full go-live within 14 days of approval." },
  ],
  "high-risk-processing": [
    { step: "01", title: "Consultation & Assessment", desc: "We evaluate your business model, processing history, and risk profile to identify the best acquiring bank partners for your situation." },
    { step: "02", title: "Application & Underwriting", desc: "We guide you through the documentation requirements and advocate on your behalf with the acquiring bank to maximize approval odds." },
    { step: "03", title: "Approval & Activation", desc: "Most high-risk accounts are approved within 24–72 hours. We handle gateway setup, integration, and ongoing account management." },
  ],
  "surcharge-cash-discount": [
    { step: "01", title: "Program Selection", desc: "We review your business type, card mix, and customer base to recommend the right program — cash discount, surcharging, or surcharge & cash discount solutions." },
    { step: "02", title: "Equipment & Compliance Setup", desc: "We configure your terminals or POS, provide all required signage and receipt language, and ensure full card brand compliance." },
    { step: "03", title: "Training & Launch", desc: "We train your staff on how to explain the program to customers and monitor your first month of savings to confirm performance." },
  ],
};

const solutionsData: SolutionData[] = [
  {
    slug: "credit-card-processing",
    icon: "💳",
    title: "Credit Card Processing",
    subtitle: "Accept all major cards with pricing tailored to your business",
    metaDescription: "Utah credit card processing with surcharge & cash discount solutions, surcharge & cash discount solutions & surcharging options. Eliminate processing fees, get next-day funding & local support.",
    description: "UBC Unlimited provides end-to-end credit card processing solutions designed around your business — not a one-size-fits-all rate sheet. We work with you to identify the pricing model and payment infrastructure that best fits your transaction volume, industry, and customer base. Whether you're accepting payments in-person, online, or on the go, we deliver a seamless, secure, and cost-effective solution.",
    heroPoints: ["Pricing tailored to your business", "Next-day funding available", "Visa, MC, Amex, Discover & more", "EMV, NFC & digital wallets"],
    features: [
      { title: "Flexible Pricing Models", desc: "We structure pricing around your specific business needs. Options include flat rate, tiered, and pass-through pricing models — as well as cost-reduction programs like Surcharge & Cash Discount Solutions and surcharging that can significantly lower or eliminate your processing costs." },
      { title: "In-Person, Online & Mobile Payments", desc: "Accept payments anywhere — countertop terminals, wireless and mobile devices, online checkout, virtual terminals, and pay-by-link. We provide a unified commerce experience across all your sales channels." },
      { title: "EMV, Contactless & Digital Wallets", desc: "Full support for chip cards, tap-to-pay, Apple Pay, Google Pay, Samsung Pay, and all modern payment methods — keeping you current with how customers want to pay." },
      { title: "Next-Day Funding", desc: "Get your money faster. Funds deposited directly to your business bank account the next business day for most qualifying accounts." },
      { title: "Advanced Fraud & Chargeback Protection", desc: "Multi-layer fraud detection, real-time transaction monitoring, and dedicated chargeback management tools to protect your revenue and reduce dispute losses. Includes up to $100,000 in data breach protection coverage for qualifying accounts." },
      { title: "Payment Gateway Integration", desc: "Seamlessly connect to 350+ software platforms, shopping carts, and business systems through our supported payment gateways — with no gateway fees on qualifying accounts." },
      { title: "Recurring Billing & Invoicing", desc: "Automate subscription billing, installment plans, and recurring charges. Send professional digital invoices with embedded payment links for fast, frictionless collection." },
      { title: "Reporting & Business Intelligence", desc: "Real-time transaction reporting, batch summaries, reconciliation tools, and actionable business analytics — all accessible from a single dashboard, anytime and anywhere." },
      { title: "PCI DSS Compliance Support", desc: "Full suite of PCI security tools and compliance resources to keep your business protected and audit-ready, with dedicated support to guide you through the process." },
      { title: "Customer Management & Loyalty", desc: "Built-in customer tracking, loyalty program support, and email and text marketing tools to help you retain customers and drive repeat business." },
    ],
    benefits: [
      "Pricing structured to maximize your profitability",
      "Dedicated local Utah support — a real person, not a call center",
      "Complimentary or low-cost equipment with qualifying accounts",
      "Month-to-month agreements for most business types",
      "Eliminate or reduce processing fees with cost-pass-through programs",
      "Accept every payment type your customers use",
      "Fast onboarding — many accounts activated same day",
      "$100,000 data breach protection for qualifying accounts",
    ],
    faqs: [
      { question: "What credit card processing rates do you offer?", answer: "We tailor pricing to each business individually — there is no single rate that applies to everyone. Factors like your industry, monthly volume, average ticket size, and card mix all influence the best pricing structure for your account. We offer flat rate, tiered, and pass-through pricing models. We can also structure your account to Surcharge or use a Dual Pricing or Cash Discount Model that will shift processing costs to the cardholder — legally and compliantly — which can reduce or eliminate your out-of-pocket processing expense entirely. We'll walk you through every option and show you a clear cost comparison before you make any decision." },
      { question: "What is Dual Pricing & Cash Discount and how is it different from surcharging?", answer: "Dual pricing displays two prices at the point of sale — one for cash and one for card — so customers can see the difference and choose their preferred payment method. Surcharging adds a fee to credit card transactions at checkout. Cash discounting posts a single (card) price and then applies a discount when the customer pays with cash. All three approaches are designed to offset processing costs, but they operate differently and have distinct compliance requirements. Dual pricing & cash discount apply to all card types; surcharging is limited to credit cards only and is prohibited in certain states. We'll help you determine which model is right for your business and ensure you're fully compliant." },
      { question: "How quickly will I receive my funds?", answer: "Most qualifying accounts receive next-business-day funding, with deposits going directly to your business bank account. Settlement timelines can vary based on your industry, processing history, and account type. We'll be transparent about your specific funding schedule before you get started." },
      { question: "Do I need to buy new equipment?", answer: "Not necessarily. We can often reprogram your existing terminals and equipment at no charge. If you do need new hardware — whether a countertop terminal, wireless device, or full POS system — we offer complimentary and low-cost equipment options with qualifying accounts. We'll assess what you currently have and recommend the most cost-effective path forward." },
      { question: "What payment types can I accept?", answer: "With our solutions you can accept all major credit and debit cards (Visa, Mastercard, American Express, Discover), contactless and tap-to-pay, Apple Pay, Google Pay, Samsung Pay, digital wallets, ACH/eCheck bank transfers, and alternative payment methods. We also support corporate and purchasing cards, which are common in B2B environments." },
      { question: "What is PCI compliance and do I need it?", answer: "PCI DSS (Payment Card Industry Data Security Standard) compliance is a set of security standards required of all businesses that accept, store, or transmit cardholder data. Every merchant that accepts credit cards is required to be PCI compliant. Non-compliance can result in fines, higher processing rates, and increased liability in the event of a data breach. We provide a full suite of PCI compliance tools, annual questionnaire support, and up to $100,000 in breach protection coverage for qualifying accounts." },
      { question: "What is a chargeback and how do you help?", answer: "A chargeback occurs when a customer disputes a transaction with their card-issuing bank, resulting in the funds being reversed from your account. Chargebacks can be costly — not just in the disputed amount, but in fees and potential account penalties. We provide chargeback management tools, dispute response support, and proactive fraud detection to help you minimize chargebacks and win disputes when they do occur." },
      { question: "Are there cancellation fees?", answer: "For most business types, we offer month-to-month agreements with no cancellation fees — we believe in earning your business every month. Certain specialized solutions or equipment financing arrangements may involve a formal agreement with specific terms. We are fully transparent about any such terms before you sign anything, so there are never any surprises." },
    ],
    relatedSolutions: ["/solutions/pos-systems", "/solutions/mobile-processing", "/solutions/virtual-terminals"],
  },
  {
    slug: "ach-echeck-processing",
    icon: "🏦",
    title: "ACH & eCheck Processing",
    subtitle: "Accept bank transfers directly — lower cost, faster reconciliation, fewer chargebacks",
    metaDescription: "ACH & eCheck processing for Utah businesses. Lower cost than credit cards, same-day settlement, recurring billing & fewer chargebacks. Request a quote.",
    description: "ACH (Automated Clearing House) and eCheck processing allow businesses to accept electronic bank transfers directly from customers' checking or savings accounts, bypassing card networks and their associated fees. It's one of the most cost-effective payment methods available — especially for recurring billing, high-ticket transactions, B2B payments, and businesses that want to reduce their overall cost of accepting payments.",
    heroPoints: ["Dramatically lower cost than credit cards", "Recurring & subscription billing", "Same-day & next-day ACH options", "Batch & bulk processing"],
    features: [
      { title: "Significantly Lower Processing Costs", desc: "ACH transactions typically cost a fraction of credit card processing fees. For businesses with high transaction volumes or large average ticket sizes, the savings compared to card processing can be substantial — often reducing payment acceptance costs by 60–80%." },
      { title: "Recurring & Subscription Billing", desc: "Set up automated recurring payment schedules for subscriptions, memberships, installment plans, rent collection, and service retainers. Customers authorize once and payments run automatically on your defined schedule." },
      { title: "Same-Day & Next-Day ACH", desc: "Standard ACH settles in 1–3 business days. Same-day ACH options are available for time-sensitive transactions, enabling faster access to funds for qualifying accounts and transaction types." },
      { title: "Batch & Bulk Processing", desc: "Process large volumes of transactions simultaneously with bulk ACH upload tools. Ideal for payroll, vendor payments, insurance disbursements, and any scenario requiring high-volume outbound or inbound bank transfers." },
      { title: "Real-Time Bank Account Verification", desc: "Verify customer bank account and routing numbers in real time before initiating transactions, significantly reducing failed payments, NSF returns, and associated fees." },
      { title: "eCheck Conversion", desc: "Convert paper checks into electronic ACH transactions at the point of sale or remotely. Eliminates manual check handling, speeds up deposit timelines, and reduces the risk of lost or returned paper checks." },
      { title: "Pay-Ins & Payouts", desc: "Support both inbound collections (pay-ins) and outbound disbursements (payouts) through a single platform. Ideal for marketplaces, platforms, insurance companies, and businesses that need to both collect and distribute funds." },
      { title: "Fraud & Risk Management", desc: "Multi-layer risk controls including transaction monitoring, velocity checks, return rate management, and account validation tools to protect your business from unauthorized transactions and ACH fraud." },
      { title: "Reconciliation & Reporting", desc: "Comprehensive transaction history, return and reject reports, settlement summaries, and reconciliation tools — all accessible from a centralized dashboard to simplify your accounting and audit processes." },
      { title: "API & Software Integration", desc: "Flexible integration options via API, hosted payment pages, and direct connections to popular accounting and business management platforms including QuickBooks, WooCommerce, and custom ERP systems." },
    ],
    benefits: [
      "Reduce payment acceptance costs dramatically vs. credit cards",
      "Automate recurring billing with zero manual intervention",
      "Fewer chargebacks than card transactions",
      "Same-day ACH available for qualifying transactions",
      "Verify bank accounts in real time to reduce failed payments",
      "Process high volumes with batch and bulk upload tools",
      "Seamlessly integrate with your accounting and business software",
      "Support both collections and disbursements from one platform",
    ],
    faqs: [
      { question: "What is ACH processing and how does it work?", answer: "ACH (Automated Clearing House) processing is an electronic network used to transfer funds directly between bank accounts in the United States. When a customer pays via ACH, funds move from their checking or savings account directly to your business bank account through the Federal Reserve's ACH network — bypassing credit card networks entirely. This makes ACH one of the lowest-cost payment methods available. Transactions are initiated via authorization (written, verbal, or electronic) from the account holder and processed in batches throughout the day." },
      { question: "What is the difference between ACH and eCheck?", answer: "ACH and eCheck are closely related but not identical. ACH is the electronic network and processing infrastructure. An eCheck is a digital version of a paper check that is processed electronically through the ACH network. In practice, both terms are often used interchangeably. eCheck processing typically refers to converting a paper check or check information into an electronic ACH transaction, while ACH more broadly refers to any electronic bank-to-bank transfer — including direct deposits, bill payments, and recurring billing." },
      { question: "How long does ACH take to settle?", answer: "Standard ACH transactions typically settle in 1–3 business days, though the exact timeline depends on your bank, the transaction type, and when the batch is submitted. Same-day ACH is available for qualifying transactions and account types, enabling same-business-day settlement for time-sensitive payments. We'll be clear about your specific settlement timeline when setting up your account." },
      { question: "Can I use ACH for recurring payments?", answer: "Yes — ACH is one of the best tools available for recurring billing. You can set up automated payment schedules for subscriptions, memberships, installment plans, rent collection, utility billing, and service retainers. Customers authorize the recurring draft once, and payments process automatically on the schedule you define. This reduces manual collection effort, improves cash flow predictability, and lowers your cost per transaction compared to recurring card billing." },
      { question: "What is an ACH return and how do I handle it?", answer: "An ACH return occurs when a transaction cannot be completed — typically due to insufficient funds (NSF), a closed account, incorrect account information, or an unauthorized transaction claim. Returns are identified by standard return codes (e.g., R01 for NSF, R02 for closed account). We provide return reporting tools so you can quickly identify and act on returned items. High return rates can affect your processing privileges, so real-time bank account verification and proper authorization practices are important safeguards." },
      { question: "Is ACH processing secure?", answer: "Yes. ACH transactions are governed by NACHA (the National Automated Clearing House Association) operating rules, which establish strict standards for authorization, security, and fraud prevention. Our platform includes multi-layer risk controls — account verification, transaction monitoring, velocity limits, and return rate management — to protect both your business and your customers. All data is encrypted in transit and at rest, and we maintain PCI DSS compliance standards across our processing infrastructure." },
      { question: "What types of businesses benefit most from ACH processing?", answer: "ACH is particularly valuable for businesses with recurring billing models (SaaS, gyms, property management, utilities), high-ticket B2B transactions where card fees would be prohibitive, government and municipal payment collection, healthcare and insurance billing, payroll and vendor disbursements, and any business looking to reduce its overall cost of accepting payments. If your average transaction is over $500 or you bill customers on a recurring basis, ACH can deliver significant cost savings compared to card processing." },
      { question: "Can I use ACH for payouts and disbursements as well as collections?", answer: "Yes. Our ACH platform supports both pay-ins (collecting funds from customers) and payouts (disbursing funds to vendors, contractors, employees, or customers). This makes it ideal for marketplaces, insurance companies, gig economy platforms, and any business that needs to both collect and distribute funds through a single, unified system." },
    ],
    relatedSolutions: ["/solutions/invoicing", "/solutions/virtual-terminals", "/solutions/check-guarantee"],
  },
  {
    slug: "check-guarantee",
    icon: "✅",
    title: "Check Guarantee",
    subtitle: "Accept checks risk-free — we guarantee payment so you never absorb a loss",
    metaDescription: "Check guarantee services for Utah merchants. Accept checks risk-free — we cover returned checks so you never absorb a loss. Fast approval, low cost.",
    description: "Check guarantee services protect merchants from the financial loss of accepting bad, bounced, or returned checks — whether due to insufficient funds (NSF), closed accounts, or stop payment orders. We offer an industry-leading approval rate, nationwide check acceptance across the U.S., Canada, and U.S. territories, and a full suite of services that can be tailored to your business type and volume.",
    heroPoints: ["Nationwide check approval", "Funds deposited in 48–72 hours", "24/7 processing & support", "Loaner equipment at no charge"],
    features: [
      { title: "Standard Check Guarantee", desc: "Request check approval at the point of sale via phone, terminal, or web portal before making a deposit. If an approved check is returned unpaid, submit a claim for full reimbursement — you're covered." },
      { title: "Electronic Check Processing with Guarantee", desc: "Capture check images with desktop scanners or smart devices and submit them electronically. Returned items go directly to us — no claim submission required. Available via Conversion or Remote Deposit Capture (RDC)." },
      { title: "Remote Deposit Capture (RDC)", desc: "Automate check authorizations and deposits electronically. Accept and deposit guaranteed checks remotely using desktop scanners or smart devices, with funds deposited into your account within 48–72 hours." },
      { title: "Multiple Check", desc: "Allow customers to write up to four checks for a single sale or down payment, deposited over an agreed period (typically 30 days). Each check is individually guaranteed — ideal for high-ticket purchases where customers need payment flexibility." },
      { title: "Check on Delivery (COD)", desc: "Pre-authorize check payments over the phone before delivery occurs. Enter the estimated sale amount and customer phone number to receive an authorization number. Drivers collect the check on delivery and you process it for guaranteed payment." },
      { title: "Plus Sales Service", desc: "Guarantees checks that have been declined by other check guarantee providers, giving you a second chance to approve more sales. Can be used on an as-needed basis to reduce lost revenue." },
      { title: "Check Verification", desc: "Reduces the chance of accepting bad checks by recommending whether to accept or decline specific checks. Assists in minimizing risk — ideal as a standalone service for lower-volume merchants." },
      { title: "Premium Add-Ons", desc: "Customizable enhancements to your check guarantee service, including Multiple Check, Stop Payment Protection, Bank Fee coverage, Partial Payment, and Premium Payment options — tailored to your specific business needs." },
    ],
    benefits: [
      "Eliminate bad check losses entirely",
      "Approve checks other providers decline",
      "Accept checks from any customer — not just regulars",
      "Funds deposited in 48–72 hours with no collection hassle",
      "24/7 processing, reporting, and tech support",
      "Paperless, green-friendly recordkeeping",
      "Loaner equipment available at no additional charge",
      "Increase sales by accepting all payment types",
    ],
    faqs: [
      { question: "What is check guarantee and how does it protect my business?", answer: "Check guarantee services protect merchants from financial losses caused by bad, bounced, or returned checks — whether due to insufficient funds (NSF), closed accounts, or stop payment orders. When you accept a check through our guarantee service, if that check is returned unpaid for any covered reason, we reimburse you the full amount. We then handle all collection efforts on your behalf. You keep the funds and never have to chase down a bad check." },
      { question: "What are the two types of check guarantee services?", answer: "We offer Standard Check Guarantee and Electronic Check Processing with Guarantee. With Standard Check Guarantee, merchants request check approval at the point of sale via phone, terminal, or web portal before depositing. If an approved check is returned, merchants submit a claim by mailing the check for reimbursement. Electronic Check Processing with Guarantee allows merchants to capture check images electronically via desktop scanner or smart device. Returned items are sent directly to us — no claim submission required. This service is available via Conversion or Remote Deposit Capture (RDC)." },
      { question: "How quickly will I receive funds from guaranteed checks?", answer: "Funds from guaranteed checks are deposited into your business bank account within 48–72 hours. The service includes 24/7 processing, transaction reporting, and tech support, along with paperless, green-friendly recordkeeping. Loaner equipment is available at no additional charge." },
      { question: "Can customers split a large purchase across multiple checks?", answer: "Yes. Our Multiple Check service allows customers to write up to four checks for a single sale or down payment. The checks are deposited over an agreed period — typically 30 days — on dates set by you and the customer. Each check is individually guaranteed. This is especially valuable for high-ticket purchases where customers prefer not to use credit or may not qualify for financing." },
      { question: "What is the Plus Sales Service?", answer: "Plus Sales is a service that guarantees checks that have been declined by other check guarantee providers. If a customer's check is turned down by a competing service, we can run it through our system for a second approval attempt. This helps you save sales that would otherwise be lost and can be used on an as-needed basis without a long-term commitment." },
      { question: "What types of businesses use check guarantee?", answer: "Check guarantee is widely used by businesses that regularly accept checks for high-value transactions, including automotive and powersport dealerships, home furnishing and building supply stores, heavy equipment dealers, medical, dental, and veterinary offices, specialty retail, and contracting businesses. Any business that accepts checks and wants to eliminate the risk of non-payment can benefit from this service." },
      { question: "We rarely get returned checks — do we still need this service?", answer: "Check guarantee's primary goal is to help you increase sales, not just protect against losses. For example, the Multiple Check service helps customers short on cash make large purchases without using credit — expanding your customer base. The Plus Sales service lets you approve checks other providers decline. Even if your returned check rate is low, the service pays for itself by enabling more sales to more customers." },
      { question: "We already have a check guarantee provider — why switch?", answer: "Our service approves checks that other providers decline, giving you a higher approval rate and fewer lost sales. If your current provider is turning away checks that we would approve, you're leaving revenue on the table. We also offer Plus Sales as a standalone service to handle your current provider's declines without requiring you to switch your primary service." },
    ],
    relatedSolutions: ["/solutions/ach-echeck-processing", "/solutions/credit-card-processing", "/solutions/virtual-terminals"],
  },
  {
    slug: "pos-systems",
    icon: "🖥️",
    title: "POS Systems",
    subtitle: "Industry-leading point-of-sale systems built for restaurants, bars, retail, and beyond",
    metaDescription: "SkyTab POS systems for Utah restaurants, bars & retail. Built-in payment processing, online ordering, loyalty programs & local support — go-live target 14 days from approval.",
    description: "UBC Unlimited partners with SkyTab — powered by Shift4, one of the largest payment technology companies in the world — to deliver a complete, all-in-one POS platform for restaurants, bars, quick-service, and multi-location businesses. From tableside ordering and kitchen display systems to online ordering, loyalty programs, and real-time analytics, our POS solutions are designed to transform your operations from front-of-house to back-of-house. Every system comes with local installation, training, and ongoing support from our Utah-based team.",
    heroPoints: ["SkyTab — powered by Shift4", "Restaurant, bar & quick-service ready", "Online ordering & tableside payments", "Go-live target: 14 days from approval", "Local install, training & support", "Lifetime hardware warranty included"],
    features: [
      { title: "SkyTab POS Workstation", desc: "A sleekly designed, commercial-grade POS workstation built for demanding restaurant environments. Features a high-resolution touchscreen, powerful processor, and a lifetime hardware warranty — the only POS system in the industry to offer one. Handles high-volume service without slowdowns, freezes, or crashes." },
      { title: "SkyTab Air — Tableside & Mobile Ordering", desc: "A handheld mobile device that lets servers take orders and accept payments at the table, curbside, or for delivery. Reduces ticket times, increases table turns, and eliminates the back-and-forth to a fixed terminal. Works on Wi-Fi or 4G LTE so your team stays connected anywhere on your property." },
      { title: "Online Ordering Integration", desc: "Built-in online ordering lets customers place orders directly from your website or a branded ordering page — with zero third-party commission fees. Orders flow directly into your POS and kitchen display system in real time, eliminating manual re-entry and order errors." },
      { title: "Kitchen Display System (KDS)", desc: "Replace paper tickets with a digital kitchen display that shows orders in real time as they're placed from the POS, tableside devices, or online. Reduce kitchen errors, improve ticket times, and keep your kitchen team organized during peak service." },
      { title: "Contactless & QR Code Ordering", desc: "Guests can scan a QR code at the table to view your menu, place orders, and pay — all from their own smartphone. Reduces server workload, speeds up table turns, and provides a modern, contactless dining experience that today's guests expect." },
      { title: "Reservations & Waitlist Management", desc: "Manage reservations and digital waitlists directly from your POS. Seat guests efficiently, reduce wait times, and send automated text notifications when tables are ready — all without a separate reservation platform." },
      { title: "Marketing & Loyalty Programs", desc: "Built-in customer loyalty tools let you reward repeat guests with points, discounts, and special offers. Integrated marketing tools allow you to send targeted email and SMS campaigns to your customer database — driving repeat visits without a separate marketing platform." },
      { title: "Reporting & Analytics — Lighthouse Back Office", desc: "The Lighthouse back-office command center gives you real-time access to sales reports, labor cost analysis, menu performance data, and business trend insights from any device. Make informed decisions about staffing, menu pricing, and promotions based on your actual data." },
      { title: "Labor Management", desc: "Track employee hours, manage shift scheduling, set role-based permissions, and evaluate individual performance directly from your POS. Reduce labor costs with data-driven scheduling and eliminate time clock fraud with biometric or PIN-based clock-in." },
      { title: "Multi-Location Management", desc: "Manage menus, pricing, reporting, and staff across multiple locations from a single dashboard. Push menu updates to all locations simultaneously, compare location performance side-by-side, and maintain brand consistency across your entire operation." },
      { title: "InCharge Mobile App", desc: "Monitor your business remotely from anywhere with the InCharge mobile app. View real-time sales data, check labor costs, update your menu, and manage operations from your smartphone — even when you're not on-site." },
      { title: "Kiosk Self-Ordering", desc: "Self-service ordering kiosks let guests place their own orders, reducing front-of-house labor costs and increasing average ticket size through upsell prompts. Ideal for quick-service restaurants, fast casual concepts, and high-volume counter service operations." },
    ],
    benefits: [
      "Lifetime hardware warranty — the only POS in the industry to offer one",
      "Zero online ordering commission fees — keep 100% of every online order",
      "Reduce kitchen errors and ticket times with integrated KDS",
      "Increase table turns with tableside ordering and QR code pay",
      "Manage your entire business remotely from the InCharge app",
      "Drive repeat business with built-in loyalty and marketing tools",
      "Scale seamlessly from single-location to multi-location enterprise",
      "Local Utah installation, training, and ongoing support from our team",
    ],
    faqs: [
      { question: "What types of businesses is SkyTab POS designed for?", answer: "SkyTab is purpose-built for food and beverage operations: full-service restaurants, quick-service and fast casual restaurants, bars and nightclubs, pizza shops, coffee shops, food trucks, and multi-location enterprise operations. It's specifically designed for the demands of the restaurant industry — high transaction volume, complex menu management, tableside service, and kitchen coordination. For retail, salon, and service businesses, we offer additional POS options tailored to those environments. We'll help you identify the right system during a consultation." },
      { question: "Does SkyTab come with a hardware warranty?", answer: "Yes. SkyTab is the only POS system in the industry to offer a lifetime hardware warranty on its commercial-grade equipment. If your hardware fails, it's replaced — no questions asked, no repair fees. This eliminates the risk of unexpected hardware replacement costs that can run $500–$2,000+ per terminal with other systems." },
      { question: "How does online ordering work with SkyTab?", answer: "SkyTab includes a built-in online ordering platform that lets customers place orders directly from your website or a branded ordering page. Orders flow directly into your POS and kitchen display system in real time — no manual re-entry required. Critically, SkyTab charges zero commission on online orders. By contrast, third-party platforms like DoorDash, Uber Eats, and Grubhub charge 15–30% commission per order. For a restaurant doing $10,000/month in online orders, that's $1,500–$3,000/month saved." },
      { question: "What is the Lighthouse back office and what can I do with it?", answer: "Lighthouse is SkyTab's cloud-based back-office management platform. It gives you real-time access to sales reports, labor cost analysis, menu performance data, and business trend insights from any computer, tablet, or smartphone. You can update your menu remotely, push changes to all locations simultaneously, manage employee schedules and permissions, and monitor your business from anywhere using the InCharge mobile app. It's a complete business intelligence tool, not just a reporting dashboard." },
      { question: "Do you provide installation and training?", answer: "Yes. Our Utah-based team provides local, on-site installation and hands-on training for every SkyTab system we deploy. We don't ship you a box and leave you to figure it out — we're there in person to set up your hardware, configure your menu, train your staff, and make sure everything is running smoothly before we leave. Ongoing technical support is available after installation, and for local Utah businesses, we can dispatch a technician for on-site support when needed." },
      { question: "Can SkyTab handle multiple locations?", answer: "Yes. SkyTab's multi-location management tools let you manage menus, pricing, reporting, and staff across all your locations from a single dashboard. Push menu updates to every location simultaneously, compare performance side-by-side, and maintain brand consistency across your entire operation. The InCharge mobile app lets you monitor all locations remotely from your smartphone." },
      { question: "What accessories are available for SkyTab?", answer: "SkyTab supports a full ecosystem of accessories including the SkyTab Air handheld for tableside ordering, Kitchen Display Systems (KDS) in 16\" and 22\" sizes, KDS bump bars, remote thermal and dot matrix printers, self-order kiosks, customer-facing displays, digital scales, and caller ID units. We'll help you design the right hardware configuration for your specific floor plan and service model." },
    ],
    relatedSolutions: ["/solutions/credit-card-processing", "/solutions/mobile-processing", "/solutions/invoicing"],
  },
  {
    slug: "ecommerce-payments",
    icon: "🛒",
    title: "eCommerce Payments",
    subtitle: "Secure online payment gateways for your website",
    metaDescription: "eCommerce payment gateway solutions for Utah online stores. Secure checkout, 350+ integrations, fraud protection & no-fee processing options. Get started.",
    description: "Accept payments on your website with our secure payment gateway solutions. We work with a variety of payment gateways to find the best fit for your platform, business type, and transaction volume.",
    heroPoints: ["Multiple gateway options", "Advanced fraud protection", "Recurring billing", "Mobile optimized checkout"],
    features: [
      { title: "Multiple Gateway Options", desc: "We work with a wide range of payment gateways and collaborate with you to determine the best option based on your platform, business type, and transaction needs." },
      { title: "Shopping Cart Integration", desc: "Works with WooCommerce, Shopify, Magento, BigCommerce, and 100+ more platforms." },
      { title: "Fraud Protection", desc: "Advanced fraud screening with AVS, CVV, velocity filters, and customizable rules to protect your business." },
      { title: "Recurring Billing", desc: "Subscription management and recurring payment tools built in." },
      { title: "Mobile Checkout", desc: "Optimized checkout experience for mobile shoppers." },
      { title: "Hosted Payment Pages", desc: "Secure, branded payment pages that don't require PCI compliance on your server." },
    ],
    benefits: ["Right gateway for your business — not a one-size-fits-all approach", "Accept international payments", "Lower fraud losses", "Increase conversions with optimized checkout"],
    faqs: [
      { question: "What payment gateways do you support?", answer: "We work with a wide variety of payment gateways. During your consultation, we'll evaluate your platform, volume, and business type to recommend the best fit for your specific setup." },
      { question: "What platforms do you integrate with?", answer: "We integrate with all major eCommerce platforms including WooCommerce, Shopify, Magento, BigCommerce, and custom-built websites via API." },
      { question: "How do you handle fraud?", answer: "Our gateway options include AVS verification, CVV checking, velocity filters, and machine learning fraud detection to protect your revenue. We also support 3D Secure (3DS2) authentication — an additional layer of cardholder verification that shifts chargeback liability to the issuing bank on qualifying transactions, significantly reducing your fraud exposure on online orders." },
      { question: "Can you support high-risk eCommerce businesses?", answer: "Yes, on a case-by-case basis. Certain gateways in our network are specifically designed for high-risk and specialty merchants. We'll evaluate your business and connect you with the right solution." },
    ],
    relatedSolutions: ["/solutions/virtual-terminals", "/solutions/invoicing", "/solutions/mobile-processing"],
  },
  {
    slug: "mobile-processing",
    icon: "📱",
    title: "Mobile Processing",
    subtitle: "Turn your smartphone into a full payment terminal — accept payments anywhere, anytime",
    metaDescription: "Mobile credit card processing for Utah businesses. Accept payments anywhere with your smartphone — EMV, tap-to-pay & digital wallets. Equipment options available.",
    description: "Mobile processing solutions from UBC Unlimited let you accept payments wherever your business takes you. Whether you're at a farmers market, trade show, customer's home, food truck, or delivering on the road, our mobile solutions give you the same professional payment experience as a countertop terminal — right from your smartphone or tablet. Accept all major cards, contactless payments, and digital wallets with no extra hardware required on qualifying setups.",
    heroPoints: ["No card reader needed on qualifying setups", "iOS & Android compatible", "Offline mode available", "All cards & digital wallets"],
    features: [
      { title: "Tap to Pay on Your Smartphone", desc: "Accept contactless cards and digital wallets directly on your iPhone or Android phone — no card reader, dongle, or adapter required. The NFC chip built into your phone processes payments in 1–2 seconds. Works with Visa, Mastercard, Amex, Discover, Apple Pay, Google Pay, Samsung Pay, and any NFC-enabled wallet." },
      { title: "Bluetooth Card Readers", desc: "For businesses that need to accept chip and swipe transactions, compact Bluetooth card readers pair wirelessly with your smartphone or tablet. Durable, portable, and compatible with both iOS and Android — ideal for food trucks, trade shows, and field service teams." },
      { title: "Offline Mode", desc: "Keep accepting payments even when your internet connection drops. Transactions are stored securely on your device and automatically sync when connectivity is restored. Essential for farmers markets, outdoor events, and rural service calls." },
      { title: "Digital Receipts & Customer Management", desc: "Send receipts instantly via email or SMS — no paper required. Collect customer contact information at the point of sale, build customer profiles, and enroll customers in loyalty programs directly from your mobile device." },
      { title: "Tip Management", desc: "Built-in tip prompts let customers add gratuity at checkout. Tip amounts are tracked per transaction and included in your reporting — ideal for food service, delivery, personal care, and any service-based business." },
      { title: "Inventory & Catalog Management", desc: "Build and manage your product or service catalog directly in the app. Track sales by item, manage quantities, and generate item-level reports — all from your smartphone." },
      { title: "Multi-User & Team Management", desc: "Each team member can use the app on their own device with unique login credentials. Track sales by employee, set role-based permissions, and manage your entire mobile team from a single dashboard — no shared hardware required." },
      { title: "Real-Time Reporting & Analytics", desc: "Access live transaction data, daily sales summaries, refund tracking, and business analytics from your mobile device or web dashboard. Reconcile at the end of every shift with complete transaction history." },
      { title: "Recurring Billing & Invoicing", desc: "Set up recurring payment schedules for repeat customers or send pay-by-link invoices directly from your phone. Customers pay online with any card — no in-person visit required." },
      { title: "Bank-Level Security", desc: "Every transaction is protected with end-to-end encryption, tokenization, and EMV contactless security standards. PCI DSS Level 1 compliant. No card numbers are stored on your device — only encrypted tokens that are useless if intercepted." },
    ],
    benefits: [
      "Accept payments anywhere — no storefront required",
      "No card reader hardware needed on qualifying setups — save $50–$300 per device",
      "Process transactions in 1–2 seconds with tap-to-pay",
      "Scale instantly — every employee's phone becomes a payment terminal",
      "Offline mode keeps you running even without internet",
      "Accept all cards and digital wallets your customers use",
      "Build customer profiles and loyalty programs on the go",
      "Bank-level security with PCI DSS Level 1 compliance",
    ],
    faqs: [
      { question: "Do I need to buy a card reader to accept mobile payments?", answer: "Not necessarily. With tap-to-pay enabled on a compatible iPhone (XS or newer) or Android phone (Android 9.0+), you can accept contactless cards and digital wallets directly on your phone — no card reader, dongle, or adapter required. For businesses that also need to accept chip cards or magnetic stripe swipes, we offer compact Bluetooth card readers that pair wirelessly with your device. We'll help you determine the right setup based on how your customers typically pay." },
      { question: "What payment types can I accept with mobile processing?", answer: "Our mobile solutions accept all major credit and debit cards (Visa, Mastercard, American Express, Discover), contactless tap-to-pay cards, Apple Pay, Google Pay, Samsung Pay, and other NFC-enabled digital wallets. If your customer's card or phone works at a contactless terminal in a store, it works with our mobile solution." },
      { question: "Can I accept payments without an internet connection?", answer: "Yes. Our mobile processing solutions include an offline mode that allows you to accept payments even when your internet connection is unavailable. Transactions are stored securely on your device and automatically sync when connectivity is restored. This is critical for farmers markets, outdoor events, rural service calls, and anywhere with spotty connectivity. Note that some transaction types (such as refunds) may require an active connection." },
      { question: "How secure is mobile payment processing?", answer: "Mobile payment processing is equally or more secure than traditional card terminals. Every transaction uses the same EMV contactless security standards, end-to-end encryption, and tokenization — replacing actual card numbers with encrypted tokens that are useless if intercepted. Our solutions are PCI DSS Level 1 compliant (the highest certification level), and no card data is ever stored on your device. Your phone also requires biometric or PIN unlock before accepting payments, adding an additional layer of protection." },
      { question: "Can multiple employees use mobile processing on their own phones?", answer: "Yes. Our mobile solutions support unlimited users, so each team member can download the app on their own device and accept payments independently with unique login credentials. You can track sales by employee, set role-based permissions, and manage your entire team from a central dashboard. This is significantly more cost-effective than purchasing multiple card readers and eliminates the need to share hardware." },
      { question: "What types of businesses use mobile processing?", answer: "Mobile processing is ideal for any business that accepts payments outside of a fixed location: food trucks and mobile restaurants, farmers market and trade show vendors, home service professionals (plumbers, electricians, HVAC, cleaners, landscapers), personal care professionals (hair stylists, massage therapists, personal trainers), delivery drivers, pop-up retail and mobile boutiques, field sales teams, and any brick-and-mortar business that wants to add a mobile payment option for curbside or at-table transactions." },
      { question: "How quickly will I receive my funds from mobile transactions?", answer: "Most qualifying accounts receive next-business-day funding for mobile transactions, with deposits going directly to your business bank account. Settlement timelines can vary based on your account type and processing history. We'll be clear about your specific funding schedule before you get started." },
    ],
    relatedSolutions: ["/solutions/credit-card-processing", "/solutions/pos-systems", "/solutions/virtual-terminals"],
  },
  {
    slug: "virtual-terminals",
    icon: "💻",
    title: "Virtual Terminals",
    subtitle: "Process payments from any browser — no hardware, no limits",
    metaDescription: "Virtual terminal payment processing for Utah businesses. Accept MOTO, phone & mail-order payments from any browser — no hardware required. Request a quote.",
    description: "A virtual terminal is a secure, browser-based application that lets you manually enter credit card information and process payments from any computer, tablet, or smartphone — no card reader or physical terminal required. It's the essential tool for businesses that take phone orders, mail orders, and card-not-present transactions, as well as call centers, multi-location operations, and any team that needs a flexible, software-based payment solution.",
    heroPoints: ["Browser-based — any device, anywhere", "Phone & mail order (MOTO)", "Secure card vault & recurring billing", "Multi-user & multi-location"],
    features: [
      { title: "Browser-Based — No Hardware Required", desc: "Access your virtual terminal from any internet-connected computer, tablet, or smartphone. No software installation, no card readers, no dongles. Log in from the office, home, or on the road — your payment terminal is always with you." },
      { title: "Phone & Mail Order (MOTO) Processing", desc: "Process credit and debit card payments taken over the phone, by mail, or by fax. Manually enter card details directly into the secure terminal interface. Ideal for call centers, service businesses, and any operation that takes orders remotely." },
      { title: "Secure Card Vault", desc: "Securely store customer card information in an encrypted, PCI-compliant card vault for future transactions. Eliminate the need to re-enter card details for repeat customers — simply select the stored profile and process. No sensitive card data is ever stored on your servers." },
      { title: "Recurring Billing & Scheduled Payments", desc: "Set up automatic recurring charges for subscriptions, memberships, retainer clients, and installment plans. Define billing frequency, amount, and duration — payments process automatically on schedule with no manual intervention required." },
      { title: "Pay-Now Links & Email Invoicing", desc: "Generate secure, unique payment links and send them to customers via email or SMS. Customers click the link and pay online with any card — no login required. Ideal for remote invoicing, deposits, and follow-up collections." },
      { title: "Multi-User & Multi-Location Support", desc: "Support unlimited users across multiple locations or departments, each with their own login credentials and role-based permissions. Departmental branding, custom data fields, and location-specific reporting keep your operation organized at any scale." },
      { title: "Batch Processing", desc: "Upload and process multiple transactions simultaneously using batch import tools. Ideal for high-volume billing scenarios, insurance collections, and any operation that needs to process large numbers of transactions at once." },
      { title: "Custom Data Fields & Reporting", desc: "Add custom fields to capture the data your business needs — order numbers, customer IDs, department codes, and more. Full transaction history with advanced search, filter, and export capabilities for reconciliation and accounting." },
      { title: "QuickBooks & Accounting Integration", desc: "Sync transaction data directly with QuickBooks and other popular accounting platforms. Eliminate manual data entry, reduce reconciliation time, and keep your books accurate with automated payment records." },
      { title: "PCI DSS Compliance & Security", desc: "Fully PCI DSS compliant with SSL/TLS encryption, tokenization, and a secure hosted environment. Cardholder data is never stored on your servers — only encrypted tokens. Includes a simplified PCI compliance questionnaire (SAQ A or SAQ C-VT) to reduce your compliance burden." },
    ],
    benefits: [
      "No hardware investment — start accepting payments immediately",
      "Process phone and mail orders securely from any device",
      "Eliminate re-entry for repeat customers with the card vault",
      "Automate recurring billing with zero manual intervention",
      "Scale across unlimited users and locations from one platform",
      "Send pay-now links for fast remote collection",
      "Reduce gateway fees — no per-transaction gateway charges on qualifying accounts",
      "Simplify PCI compliance with a hosted, secure environment",
    ],
    faqs: [
      { question: "What is a virtual terminal and how does it work?", answer: "A virtual terminal is a secure, web-based application that lets you manually enter credit card information to process payments — no physical card reader or terminal required. You log in through any internet browser, enter the customer's card details (card number, expiration, CVV, and billing address), and submit the transaction. The payment is processed in real time and funds are deposited to your account on your normal settlement schedule. It's the same payment processing infrastructure as a physical terminal, delivered entirely through software." },
      { question: "What types of transactions is a virtual terminal best suited for?", answer: "Virtual terminals are ideal for any card-not-present (CNP) transaction: phone orders (customers calling in to place orders or make payments), mail order and fax order processing, in-person transactions where you want a software-only solution without hardware, call center billing, remote invoicing and collections, and any scenario where you need to enter card details manually. They're also widely used for recurring billing, installment plans, and storing cards on file for repeat customers." },
      { question: "Is a virtual terminal secure for processing card-not-present transactions?", answer: "Yes. Our virtual terminal is fully PCI DSS compliant and uses SSL/TLS encryption to protect data in transit, tokenization to replace card numbers with encrypted tokens in storage, and a hosted secure environment so no sensitive cardholder data ever touches your servers. For card-not-present transactions, we recommend collecting the CVV and billing zip code for AVS (Address Verification Service) verification, which helps reduce fraud and chargeback risk on manually entered transactions." },
      { question: "Can I store customer card information for future use?", answer: "Yes. Our secure card vault allows you to store customer card information in an encrypted, PCI-compliant environment for future transactions. When a repeat customer calls in, you simply select their stored profile and process the payment — no need to re-enter card details. Card data is stored as encrypted tokens, not actual card numbers, so your servers never hold sensitive cardholder information." },
      { question: "Can I set up recurring billing through the virtual terminal?", answer: "Yes. You can set up automated recurring payment schedules directly through the virtual terminal — defining the billing amount, frequency (weekly, monthly, quarterly, etc.), and duration. Payments process automatically on schedule with no manual intervention. This is ideal for subscription services, membership billing, retainer clients, and installment payment plans." },
      { question: "How many users can access the virtual terminal?", answer: "Our virtual terminal supports unlimited users across multiple locations or departments. Each user has their own login credentials, and you can set role-based permissions to control what each user can see and do — for example, restricting refund capabilities to managers only. Multi-location support with departmental branding and location-specific reporting keeps large organizations organized." },
      { question: "Are there gateway fees for using a virtual terminal?", answer: "Gateway fees vary by setup. On qualifying accounts, we can eliminate per-transaction gateway fees entirely — saving businesses that process significant volume hundreds or thousands of dollars per year compared to standard gateway pricing. We'll review your current setup and show you a clear cost comparison before you make any decisions." },
    ],
    relatedSolutions: ["/solutions/ecommerce-payments", "/solutions/invoicing", "/solutions/ach-echeck-processing"],
  },
  {
    slug: "invoicing",
    icon: "📄",
    title: "Invoicing",
    subtitle: "Send professional invoices and get paid significantly faster",
    metaDescription: "Digital invoicing & payment links for Utah businesses. Send professional invoices, collect payments online & automate recurring billing. No monthly fees.",
    description: "Stop chasing payments. Our invoicing solutions let you create and send professional, branded invoices with secure online payment links — so customers can pay instantly by credit card, debit card, or ACH bank transfer from any device. With automated reminders, recurring billing, and real-time payment tracking, you spend less time on accounts receivable and more time running your business. Integrates with QuickBooks, Xero, FreshBooks, and 2,000+ other platforms.",
    heroPoints: ["Custom branded invoices", "Pay-by-link — card or ACH", "Automated reminders & recurring billing", "QuickBooks & accounting sync"],
    features: [
      { title: "Professional Branded Invoices", desc: "Create polished, professional invoices with your logo, brand colors, and custom fields. Choose from customizable templates that reflect your business identity — not generic, unbranded billing forms. Customers receive a clean, professional document that builds trust and encourages prompt payment." },
      { title: "Secure Pay-by-Link", desc: "Every invoice includes a unique, secure payment link. Customers click the link and pay instantly by credit card, debit card, or ACH bank transfer from any device — no login, no app, no friction. Payment links are hosted on a PCI-compliant, encrypted payment page so no sensitive card data ever touches your servers." },
      { title: "Multiple Payment Methods", desc: "Accept all major credit and debit cards (Visa, Mastercard, Amex, Discover), ACH bank transfers, Apple Pay, Google Pay, and other digital wallets. Offering multiple payment options reduces friction and increases the likelihood of same-day payment." },
      { title: "Automated Payment Reminders", desc: "Set up automatic email and SMS reminders that go out before and after the due date. Customize the reminder schedule, message, and frequency. Automated follow-up eliminates the awkward manual chase and consistently reduces days sales outstanding (DSO) without any extra effort." },
      { title: "Recurring Invoices & Subscription Billing", desc: "Automate billing for retainer clients, subscriptions, memberships, and installment plans. Define the billing amount, frequency, and duration — invoices generate and send automatically on schedule. Customers can authorize automatic payment so funds are collected without any manual action on either side." },
      { title: "Real-Time Payment Tracking", desc: "See the status of every invoice at a glance — paid, pending, overdue, or viewed. Get instant notifications when a customer opens an invoice and when payment is received. No more guessing whether a check is in the mail." },
      { title: "Partial Payments & Deposits", desc: "Accept partial payments and deposits on invoices. Ideal for project-based businesses, contractors, and service providers who collect a deposit upfront and the balance on completion. Track partial payment history and outstanding balances automatically." },
      { title: "QuickBooks & Accounting Integration", desc: "Sync invoice and payment data directly with QuickBooks, Xero, FreshBooks, and other popular accounting platforms. Eliminate manual data entry, reduce reconciliation time, and keep your books accurate with automated payment records that flow directly into your accounting software." },
      { title: "2,000+ Platform Integrations", desc: "Connect your invoicing to over 2,000 software platforms including CRMs, project management tools, e-commerce platforms, and industry-specific software. Build automated workflows that create invoices from your existing systems without manual intervention." },
      { title: "Batch Invoicing", desc: "Generate and send invoices to multiple customers simultaneously. Ideal for businesses that bill a large number of clients on the same schedule — such as property managers, membership organizations, and service businesses with recurring client rosters." },
    ],
    benefits: [
      "Get paid significantly faster — online payment links dramatically reduce collection time vs. paper invoices",
      "Eliminate manual follow-up with automated reminders and recurring billing",
      "Accept credit cards, ACH, and digital wallets in a single invoice",
      "Reduce accounts receivable and improve cash flow predictability",
      "Professional branded invoices build trust and reflect your business quality",
      "Eliminate gateway fees on qualifying accounts — saving hundreds to thousands per year",
      "Seamless accounting sync eliminates manual data entry and reconciliation errors",
      "Scale from single invoices to batch billing for hundreds of clients simultaneously",
    ],
    faqs: [
      { question: "How do customers pay an invoice?", answer: "Every invoice includes a secure, unique payment link. When a customer receives the invoice by email or SMS, they click the link and are taken to a hosted, PCI-compliant payment page where they can pay by credit card, debit card, or ACH bank transfer — no login, no app, and no sensitive data stored on your systems. The entire process takes less than 60 seconds for the customer." },
      { question: "What payment methods can customers use to pay an invoice?", answer: "Customers can pay invoices using all major credit and debit cards (Visa, Mastercard, American Express, Discover), ACH bank transfers, Apple Pay, Google Pay, and other digital wallets. Offering multiple payment options reduces friction and increases the likelihood of same-day payment — particularly for business clients who prefer ACH over card." },
      { question: "Can I set up recurring invoices for subscription or retainer clients?", answer: "Yes. You can automate billing for any recurring arrangement — monthly retainers, annual subscriptions, installment plans, membership dues, and more. Define the billing amount, frequency, and duration, and invoices generate and send automatically on schedule. Customers can authorize automatic payment so funds are collected without any manual action on either side." },
      { question: "Does invoicing integrate with QuickBooks or my accounting software?", answer: "Yes. Our invoicing solutions integrate with QuickBooks, Xero, FreshBooks, and over 2,000 other platforms. Payment data syncs automatically, eliminating manual data entry and keeping your books accurate without reconciliation effort. If you use a specific accounting or CRM platform, we can confirm compatibility during your consultation." },
      { question: "Are there gateway fees for invoicing?", answer: "On qualifying accounts, we can eliminate per-transaction gateway fees entirely — a significant cost savings for businesses that send a high volume of invoices. We'll review your current setup and show you a clear cost comparison before you make any decisions." },
      { question: "Can I accept partial payments or deposits through invoicing?", answer: "Yes. You can configure invoices to accept partial payments and deposits. This is ideal for contractors, consultants, event planners, and any service business that collects a deposit upfront and the balance on delivery or completion. Partial payment history and outstanding balances are tracked automatically." },
      { question: "How quickly will I receive funds from invoice payments?", answer: "Most qualifying accounts receive next-business-day funding for card payments and 1–2 business days for ACH payments, with deposits going directly to your business bank account. We'll be clear about your specific settlement timeline before you get started." },
    ],
    relatedSolutions: ["/solutions/ach-echeck-processing", "/solutions/virtual-terminals", "/solutions/ecommerce-payments"],
  },
  {
     slug: "gift-loyalty",
    icon: "🎁",
    title: "Gift & Loyalty Programs",
    subtitle: "Acquire new customers, maximize return visits, and build lasting brand loyalty",
    metaDescription: "Gift card & loyalty programs for Utah merchants. Boost repeat visits, increase average ticket & grow revenue with branded gift cards and rewards programs.",
    description: "Gift card and loyalty programs are among the most cost-effective tools a business can use to acquire new customers and maximize revenue from existing ones. UBC Unlimited offers fully integrated gift card and loyalty solutions that work seamlessly with your payment processing and POS system — no separate platform, no manual tracking, and no complicated setup. From branded physical gift cards to digital rewards programs, we'll build a program that fits your business and your customers.",
    heroPoints: ["Branded physical & digital gift cards", "Points, rewards & tier-based loyalty", "Integrated with your POS & payments", "Email & SMS marketing tools included"],
    features: [
      { title: "Branded Gift Cards", desc: "Custom-designed physical and digital gift cards with your logo, brand colors, and artwork. Physical cards are available in standard credit card format for countertop display and sale. Digital gift cards can be purchased and sent online, expanding your gift card sales beyond your physical location to customers anywhere." },
      { title: "Points-Based Loyalty Rewards", desc: "Reward customers with points for every dollar spent. Points accumulate automatically at the point of sale — no punch cards, no manual tracking. Customers redeem points for discounts, free items, or exclusive rewards. The program runs in the background of every transaction without slowing down your checkout." },
      { title: "Tiered Loyalty Programs", desc: "Create multi-tier loyalty structures (e.g., Silver, Gold, Platinum) that reward your best customers with escalating benefits. Higher tiers unlock exclusive perks, higher earn rates, and special offers — incentivizing customers to increase their spending to reach the next level." },
      { title: "POS & Payment Integration", desc: "Our gift card and loyalty programs integrate directly with your POS system and payment processing — no separate app, no manual entry, and no reconciliation headaches. Gift card balances are tracked automatically, loyalty points are applied at checkout, and all activity is visible in your reporting dashboard." },
      { title: "Email & SMS Marketing", desc: "Engage your customer database with targeted email and SMS campaigns. Send promotions, birthday offers, loyalty milestone rewards, and re-engagement campaigns to customers who haven't visited recently. Intelligent segmentation lets you target the right customers with the right message at the right time." },
      { title: "Online & Social Media Promotions", desc: "Run digital promotions and gift card sales through your website and social media channels. Customers can purchase digital gift cards online and send them directly to recipients — expanding your gift card revenue beyond in-store sales and reaching customers who may never visit in person." },
      { title: "Customer Database & CRM", desc: "Build a rich customer database automatically as customers enroll in your loyalty program. Track purchase history, visit frequency, average spend, and lifetime value for every enrolled customer. Use this data to identify your most valuable customers and tailor your marketing accordingly." },
      { title: "Reporting & Analytics", desc: "Track gift card sales, outstanding balances, redemptions, loyalty enrollment, point accumulation, and redemption rates from your reporting dashboard. Measure the ROI of your loyalty program and identify which promotions and rewards drive the most repeat visits." },
      { title: "No Annual or Membership Fees", desc: "Our gift card and loyalty programs are available with no annual fees, no membership fees, and no hidden charges. The program is designed to pay for itself through increased customer retention and higher average transaction values — not to be an additional overhead cost." },
    ],
    benefits: [
      "Acquire new customers — gift cards are a proven customer acquisition tool",
      "Maximize return visits — loyalty members visit more frequently and spend more per visit",
      "Increase average transaction value through upsell prompts and tier incentives",
      "Build a customer database for targeted marketing without a separate CRM",
      "Drive revenue during slow periods with targeted promotional campaigns",
      "No annual or membership fees — the program pays for itself",
      "Seamless POS integration — no manual tracking or separate systems",
      "Expand gift card sales online and through social media",
    ],
    faqs: [
      { question: "How do gift cards help acquire new customers?", answer: "Gift cards are one of the most effective customer acquisition tools available to local businesses. When a current customer purchases a gift card for a friend or family member, they're introducing your business to a new customer at no marketing cost to you. According to research from Capital One Shopping, 61% of consumers spend more than a gift card's face value when redeeming — an average of $31.75 more — making each gift card sale both an acquisition event and a revenue driver." },
      { question: "How does a loyalty program increase revenue?", answer: "Loyalty programs increase revenue through three mechanisms: increased visit frequency (customers return more often to earn and redeem rewards), increased average spend (customers spend more per visit to reach point thresholds or tier levels), and reduced churn (customers with loyalty points are significantly less likely to switch to a competitor). According to Accenture research, loyalty program members generate 12–18% more revenue for retailers than non-members. Businesses that invest in retention consistently outperform those focused solely on acquisition, because the cost of keeping a customer is a fraction of the cost of finding a new one." },
      { question: "How does the loyalty program integrate with my POS?", answer: "Our loyalty programs integrate directly with your POS system and payment processing. When a customer pays, their loyalty account is identified by phone number, email, or a loyalty card, and points are applied automatically — no separate app, no manual entry, and no extra steps for your staff. Gift card balances are tracked in real time and redeemable at any location." },
      { question: "Can I run promotions and campaigns to my loyalty members?", answer: "Yes. Our platform includes integrated email and SMS marketing tools that let you send targeted campaigns to your customer database. You can segment by purchase history, visit frequency, loyalty tier, or last visit date — sending the right offer to the right customer at the right time. Common campaigns include birthday offers, re-engagement campaigns for lapsed customers, double-points events, and seasonal promotions." },
      { question: "Can customers purchase gift cards online?", answer: "Yes. Digital gift cards can be purchased and sent online through your website or social media channels. Customers can buy a digital gift card, enter the recipient's email, and send it instantly — no physical card required. This expands your gift card sales beyond your physical location and makes your gift cards available 24/7 to customers who may not be able to visit in person." },
      { question: "Are there fees for the gift card and loyalty program?", answer: "Our programs are available with no annual fees and no membership fees. We'll review the specific program structure and any applicable costs during your consultation, but our goal is to design a program that generates measurable ROI — not to add overhead. The incremental revenue from increased visit frequency and higher average spend typically far exceeds any program costs." },
    ],
    relatedSolutions: ["/solutions/pos-systems", "/solutions/credit-card-processing", "/solutions/mobile-processing"],
  },
  {
    slug: "surcharge-cash-discount",
    icon: "💰",
    title: "Surcharge & Cash Discount Solutions & Surcharging",
    subtitle: "Keep more of every sale — legally pass processing costs to the card, not your bottom line",
    metaDescription: "Cash discounting, surcharge & cash discount solutions & surcharging programs for Utah businesses. Eliminate credit card processing fees legally & keep more of every sale.",
    description: "Credit card processing fees quietly drain 2.5% to 4% from every card transaction. UBC Unlimited offers three proven, fully compliant programs — Surcharge & Cash Discount Solutions, Credit Card Surcharging, and Surcharge & Cash Discount Solutions — that let your business recover those costs without raising prices across the board. We'll walk you through each option, show you a real cost comparison, and set up the program that fits your business, your customers, and your state's regulations.",
    heroPoints: ["Legal in all 50 states (program-dependent)", "Eliminate up to 100% of processing fees", "Compliant signage & receipt language included", "Works with most POS systems & terminals"],
    features: [
      { title: "Cash Discount Program", desc: "Your most customer-friendly option. Post a single standard price — which reflects your card price — and automatically apply a discount at checkout when the customer pays with cash. The discount shows on the receipt, customers feel rewarded for paying cash, and you recover your processing cost on every card transaction. Legal in all 50 states, applies to credit, debit, and prepaid cards." },
      { title: "Credit Card Surcharging", desc: "Add a clearly disclosed fee to credit card transactions at the point of sale. Surcharging is capped at 3% (or your actual cost, whichever is lower) and must be disclosed before the transaction is completed. It applies to credit cards only — not debit or prepaid — and is currently prohibited in a small number of states. We handle all compliance requirements, signage, and registration with card brands on your behalf." },
      { title: "Surcharge & Cash Discount Solutions", desc: "Display two prices side by side — a lower cash price and a standard card price — so customers see the difference upfront and choose their payment method before the transaction begins. A straightforward, transparent approach that works well in retail and restaurant environments where customers appreciate having the choice clearly presented." },
      { title: "Compliant Signage & Disclosure", desc: "Every program requires specific signage, receipt language, and customer-facing disclosures to stay compliant with Visa, Mastercard, and applicable state laws. We provide all of it — professionally designed, ready to post — so you're covered from day one." },
      { title: "Compatible Hardware & Software", desc: "Our programs work with a wide range of countertop terminals, wireless devices, and full POS systems. In most cases we can reprogram your existing equipment at no charge. If you need new hardware, we'll configure it for your program before it ships." },
      { title: "Applies to All Card Types (Surcharge & Cash Discount Solutions)", desc: "Cash discounting and surcharge & cash discount solutions recover costs on every card transaction — credit, debit, and prepaid. Surcharging is limited to credit cards only. We'll help you choose the program that gives you the broadest cost recovery for your specific card mix." },
      { title: "No Monthly Program Fees", desc: "Our surcharge & cash discount solutionss are available with no monthly program fees for qualifying accounts. You recover processing costs without adding new overhead to your operating budget." },
      { title: "Real-Time Savings Reporting", desc: "See exactly how much your program is saving you every month — cash vs. card splits, total fees recovered, and program performance — all from your reporting dashboard." },
      { title: "Staff Training & Onboarding", desc: "A well-trained team is the difference between a smooth customer experience and unnecessary friction. We provide training materials, talking points, and onboarding support so your staff can explain the program confidently and professionally." },
    ],
    benefits: [
      "Eliminate or dramatically reduce credit card processing costs",
      "Cash discounting and surcharge & cash discount solutions legal in all 50 states",
      "Surcharging available in most states with full compliance support",
      "Compliant signage and receipt language provided",
      "Compatible with most existing terminals and POS systems",
      "No monthly program fees for qualifying accounts",
      "Transparent customer experience reduces disputes",
      "Dedicated local Utah support for setup, training, and compliance",
    ],
    faqs: [
      { question: "What is a cash discount program and how does it work?", answer: "A cash discount program lets you post a single standard price — which reflects your card processing cost — and automatically apply a discount at checkout when the customer pays with cash. The customer sees the discount on their receipt and feels rewarded for paying cash. You recover your processing cost on every card transaction without raising prices for cash customers. Cash discount programs are legal in all 50 states and apply to credit, debit, and prepaid cards." },
      { question: "What is credit card surcharging?", answer: "Surcharging adds a disclosed fee to a transaction when the customer pays with a credit card. The fee is capped at your actual processing cost and must be clearly disclosed to the customer before the transaction is completed. Surcharging applies to credit cards only — it cannot be applied to debit or prepaid cards. It is currently prohibited in a small number of states. We handle card brand registration, signage, and all compliance requirements on your behalf." },
      { question: "What is the difference between surcharge & cash discount solutions, surcharging, and surcharge & cash discount solutions?", answer: "Cash discounting posts one price and applies a discount when the customer pays with cash — the customer feels rewarded rather than penalized. Surcharging adds a fee to credit card transactions at checkout — the customer sees the fee added to their total. Dual pricing shows two prices upfront (cash and card) before the transaction begins. Cash discounting and surcharge & cash discount solutions apply to all card types and are legal everywhere; surcharging is limited to credit cards and is prohibited in certain states. For most businesses, surcharge & cash discount solutions is the most customer-friendly and broadly compliant option." },
      { question: "Is surcharge & cash discount solutions legal in Utah?", answer: "Yes. Cash discount programs are legal in Utah and in all 50 states. There are no state-level restrictions. The key requirement is proper disclosure — customers must be clearly informed of the pricing structure before completing the transaction. We provide all required signage, receipt language, and disclosure materials as part of our program setup." },
      { question: "Who qualifies for these programs?", answer: "Most businesses qualify. Cash discounting and surcharging work well for retail stores, restaurants, bars, auto repair shops, salons and spas, medical and dental offices, service businesses, and many other business types. The programs are most effective where cash payment is a realistic option for customers. Businesses that process exclusively online may be better served by other pricing models. We'll assess your situation and recommend the right program during your consultation." },
      { question: "Will customers react negatively to these programs?", answer: "When implemented correctly and transparently, most businesses report minimal pushback. The key is clear signage and honest communication. Customers who pay cash feel rewarded. Card customers pay the standard market price — the same price they'd pay at most businesses that have adopted these programs. The experience is very different from a surprise fee added at the end of a transaction. Our team provides signage templates and staff training to ensure your program is presented clearly and professionally." },
      { question: "How much can I save?", answer: "Savings depend on your current processing rates, monthly volume, and how many customers shift to cash. For many businesses, these programs eliminate 80–100% of card processing costs on cash transactions. Even partial adoption can produce meaningful monthly savings. We'll provide a clear cost-benefit analysis based on your actual processing history before you make any decision." },
      { question: "Do I need new equipment?", answer: "In many cases, no. We can reprogram existing terminals and POS systems to support surcharge & cash discount solutions or surcharging at no charge. If your current equipment is not compatible, we offer new terminals configured for your program — often at no upfront cost for qualifying accounts. We'll assess your current setup and recommend the most cost-effective path during your consultation." },
    ],
    relatedSolutions: ["/solutions/credit-card-processing", "/solutions/pos-systems", "/solutions/mobile-processing"],
  },
  {
    slug: "high-risk-processing",
    icon: "🛡️",
    title: "High-Risk Merchant Accounts",
    subtitle: "Approved accounts for businesses other processors decline — with local Utah support",
    metaDescription: "High-risk merchant accounts for CBD, nutraceuticals, firearms, travel, gaming & more. Utah-based processor — fast approvals, competitive rates, local support.",
    description: "Many legitimate businesses are classified as high-risk by traditional banks and payment processors — not because they are untrustworthy, but because their industry, business model, or transaction profile carries elevated chargeback or regulatory exposure. UBC Unlimited works with specialized acquiring banks and high-risk processing networks to secure merchant accounts for businesses that have been declined, terminated, or placed on the MATCH list. We serve firearms dealers, CBD and hemp retailers, nutraceutical companies, travel agencies, adult entertainment businesses, online gaming platforms, telemarketing operations, and many other high-risk verticals — with the same local Utah service and transparent pricing we bring to every client.",
    heroPoints: ["Approved in 24–72 hours for most verticals", "Competitive rates for high-risk accounts", "Rolling reserve minimized or waived for qualified merchants", "Multiple acquiring bank relationships"],
    features: [
      { title: "Specialized Acquiring Bank Network", desc: "We maintain relationships with multiple domestic and international acquiring banks that specialize in high-risk merchant accounts. This gives us the flexibility to match your business with the right banking partner — one that understands your industry, your chargeback profile, and your growth trajectory." },
      { title: "Fast Underwriting & Approval", desc: "Most high-risk accounts are approved within 24–72 business hours. We guide you through the underwriting process, help you prepare the required documentation, and advocate on your behalf with the acquiring bank to maximize your approval odds and minimize reserve requirements." },
      { title: "Chargeback Management & Prevention", desc: "High-risk merchants face stricter chargeback thresholds — typically 1% or less of monthly transactions. We provide real-time chargeback monitoring, dispute response tools, and proactive fraud prevention to help you stay below the threshold and protect your processing account." },
      { title: "Rolling Reserve Negotiation", desc: "Many high-risk accounts require a rolling reserve — a percentage of daily transactions held for 90–180 days as a risk buffer for the acquiring bank. We negotiate reserve requirements on your behalf and work to reduce or eliminate the reserve as your account establishes a clean processing history." },
      { title: "Multi-Currency & International Processing", desc: "High-risk processors typically offer broader international processing capabilities than standard accounts. If your business sells to customers outside the United States, we can structure your account for multi-currency acceptance and cross-border transaction support." },
      { title: "Recurring Billing & Subscription Support", desc: "Subscription-based businesses are frequently classified as high-risk due to elevated chargeback rates from billing disputes. We work with processors that specialize in subscription billing and provide the tools — including pre-dunning notifications, flexible retry logic, and transparent billing descriptors — to reduce disputes before they become chargebacks." },
      { title: "Payment Gateway Integration", desc: "High-risk accounts are compatible with leading payment gateways. We handle gateway configuration, shopping cart integration, and API setup so your checkout experience is seamless for customers regardless of your risk classification." },
      { title: "Offshore & Domestic Account Options", desc: "Depending on your industry and processing history, a domestic or offshore acquiring bank may be the better fit. We evaluate both options and recommend the structure that gives you the best combination of approval likelihood, rate, reserve requirement, and stability." },
      { title: "MATCH List Recovery Assistance", desc: "If your business has been placed on the Terminated Merchant File (TMF/MATCH list) due to excessive chargebacks or other issues, processing options are significantly limited — but not impossible. We work with acquiring banks that accept MATCH-listed merchants in certain circumstances and help you build the case for reinstatement." },
      { title: "Transparent Pricing — No Hidden Fees", desc: "High-risk processing is more expensive than standard processing — typically 3.5%–5.5% per transaction plus a monthly account fee — but the exact cost depends heavily on your industry, volume, and chargeback history. We provide a full fee disclosure before you sign anything, so you know exactly what you're paying and why." },
    ],
    benefits: [
      "Approved accounts for businesses declined by standard processors",
      "Multiple acquiring bank relationships for maximum approval odds",
      "Dedicated local Utah rep — not a call center",
      "Rolling reserve minimized or waived for qualified accounts",
      "Chargeback monitoring and dispute tools included",
      "Compatible with leading payment gateways",
      "Multi-currency and international processing available",
      "Full fee transparency — no surprises on your statement",
    ],
    faqs: [
      { question: "What makes a business 'high-risk'?", answer: "A business is classified as high-risk when payment processors or acquiring banks determine that the account carries elevated exposure to chargebacks, fraud, regulatory scrutiny, or financial loss. The classification can be triggered by your industry (firearms, CBD, adult entertainment, travel, nutraceuticals, etc.), your business model (subscription billing, high-ticket items, card-not-present transactions), your processing history (previous chargebacks, terminated accounts, MATCH list placement), your credit score, or the countries where you do business. Being labeled high-risk does not mean your business is untrustworthy — it simply means you need a processor that specializes in your category." },
      { question: "What industries do you serve under high-risk processing?", answer: "We work with a wide range of high-risk verticals including: firearms and FFL dealers, CBD and hemp retailers, nutraceuticals and dietary supplements, adult entertainment, travel agencies and booking platforms, online gaming and fantasy sports, telemarketing and outbound sales, credit repair and debt settlement, subscription box and continuity programs, e-cigarettes and vape shops, online pharmacies and telemedicine, cryptocurrency exchanges, and more. If you've been declined by a standard processor, contact us — we can usually find a path forward." },
      { question: "How much does high-risk processing cost?", answer: "High-risk processing is priced based on your specific industry, monthly volume, chargeback history, and the acquiring bank we place you with — so there is no one-size-fits-all rate. We provide a full, itemized fee disclosure before you sign anything, so you know exactly what you're paying and why. The best way to get an accurate quote is to book a consultation." },
      { question: "What is a rolling reserve and how does it work?", answer: "A rolling reserve is a risk management tool used by acquiring banks for high-risk merchant accounts. A portion of your daily transaction volume is held in a reserve account for a set period. After the hold period, the funds are released on a rolling basis. The reserve protects the bank against potential chargebacks or account closure losses. We negotiate reserve requirements on your behalf and work to reduce or eliminate the reserve as your account establishes a clean processing history." },
      { question: "Can you help if I've been terminated or placed on the MATCH list?", answer: "Yes, in many cases. The MATCH list (formerly the Terminated Merchant File) is a database maintained by Mastercard that flags merchants whose accounts were terminated for cause — typically excessive chargebacks, fraud, or PCI violations. Being on the MATCH list severely limits your processing options, but it does not make processing impossible. We work with acquiring banks that accept MATCH-listed merchants in certain circumstances and can help you understand your options and build a case for reinstatement." },
      { question: "How long does approval take for a high-risk account?", answer: "Most high-risk accounts are approved within 24–72 business hours once we have a complete application package. The underwriting process for high-risk accounts is more thorough than standard accounts — the bank will review your business model, processing history, chargeback rates, website, and supporting documents. We guide you through every step and help you prepare the strongest possible application." },
      { question: "Do I need a separate account for each high-risk product or service?", answer: "In some cases, yes. If your business sells products across multiple high-risk categories — for example, both CBD and nutraceuticals — the acquiring bank may require separate merchant accounts for each product line. This is common in the industry and is designed to isolate chargeback risk by category. We'll advise you on the optimal account structure for your specific business during the application process." },
    ],
    relatedSolutions: ["/solutions/credit-card-processing", "/solutions/ecommerce-payments", "/solutions/virtual-terminals"],
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
          <h1 className="text-2xl font-bold text-[#080808]">Solution not found</h1>
          <Link href="/solutions" className="btn-teal mt-4 inline-flex">Back to Solutions</Link>
        </div>
      </PageLayout>
    );
  }

  const relatedItems = NAV_SOLUTIONS.filter((s) => data.relatedSolutions?.includes(s.href));

  const TERMINAL_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663396807781/BUvnwzJnwMZHoEGpybj36j/hero-main_f46e2fbc.jpg";
  const CASH_DISCOUNT_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663396807781/BUvnwzJnwMZHoEGpybj36j/hero-cash-discount-jfmB57PZVctCXZVaSjpwi2.webp";
  const isCreditCard = data.slug === "credit-card-processing";
  const isCashDiscount = data.slug === "surcharge-cash-discount";
  const hasHeroImage = isCreditCard || isCashDiscount;
  const heroImg = isCashDiscount ? CASH_DISCOUNT_IMG : TERMINAL_IMG;

  const solutionStats = SOLUTION_STATS[data.slug] ?? SOLUTION_STATS["credit-card-processing"];
  const howItWorks = SOLUTION_HOW_IT_WORKS[data.slug] ?? SOLUTION_HOW_IT_WORKS["default"];

  return (
    <PageLayout>
      <SEO
        title={`${data.title} in Utah`}
        description={data.metaDescription ?? data.description.slice(0, 155)}
        canonical={`/solutions/${data.slug}`}
        schema={[
          {
            "@context": "https://schema.org",
            "@type": "Service",
            "name": data.title,
            "description": data.description,
            "provider": {
              "@type": "LocalBusiness",
              "name": "UBC Unlimited",
              "url": "https://ubcunlimited.com",
              "telephone": "+18014576500",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Salt Lake City",
                "addressRegion": "UT",
                "addressCountry": "US"
              }
            },
            "areaServed": { "@type": "State", "name": "Utah" },
            "url": `https://ubcunlimited.com/solutions/${data.slug}`
          },
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": data.faqs.map((f) => ({
              "@type": "Question",
              "name": f.question,
              "acceptedAnswer": { "@type": "Answer", "text": f.answer }
            }))
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://ubcunlimited.com" },
              { "@type": "ListItem", "position": 2, "name": "Solutions", "item": "https://ubcunlimited.com/solutions" },
              { "@type": "ListItem", "position": 3, "name": data.title, "item": `https://ubcunlimited.com/solutions/${data.slug}` }
            ]
          }
        ]}
      />

      {/* ── Hero ── */}
      <section className="relative bg-[#080808] py-20 overflow-hidden">
        {hasHeroImage && (
          <>
            <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${heroImg})`, opacity: 0.18 }} />
            <div className="absolute inset-0 bg-gradient-to-r from-[#080808] via-[#080808]/80 to-[#080808]/30" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-transparent" />
          </>
        )}
        <div className="container relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left — copy */}
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
              <p className="text-white/70 text-lg mb-4">{data.subtitle}</p>
              <p className="text-white/55 mb-7 leading-relaxed text-sm">{data.description}</p>
              <ul className="space-y-2.5 mb-8">
                {data.heroPoints.map((p) => (
                  <li key={p} className="flex items-start gap-2.5 text-white/75 text-sm">
                    <CheckCircle size={15} className="text-[#c9a84c] mt-0.5 shrink-0" />
                    {p}
                  </li>
                ))}
              </ul>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link href="/consultation" className="btn-gold text-sm py-3 px-7 justify-center">Request a Consultation <ArrowRight size={16} /></Link>
                <Link href="/statement-review" className="btn-outline-white text-sm py-3 px-7 justify-center">Statement Review</Link>
              </div>
            </div>
            {/* Right — stats card or hero image */}
            {hasHeroImage ? (
              <div className="hidden lg:block">
                <img
                  src={heroImg}
                  alt={isCashDiscount ? "Cash discount payment terminal at retail checkout — UBC Unlimited" : "Modern credit card terminal — UBC Unlimited merchant services"}
                  className="rounded-2xl shadow-2xl w-full object-cover aspect-[4/3]"
                />
              </div>
            ) : (
              <div className="hidden lg:flex flex-col gap-4">
                {/* Stats card */}
                <div className="bg-white/4 border border-white/10 rounded-2xl p-7">
                  <div className="flex items-center gap-2 mb-5">
                    <Star size={16} className="text-[#c9a84c]" />
                    <span className="text-white/60 text-xs uppercase tracking-widest font-semibold">At a Glance</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    {solutionStats.map((s) => (
                      <div key={s.label} className="bg-white/4 rounded-xl p-4 border border-white/6">
                        <div className="text-2xl font-extrabold text-[#c9a84c] mb-1" style={{ fontFamily: 'Sora, sans-serif' }}>{s.value}</div>
                        <div className="text-white/50 text-xs leading-tight">{s.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
                {/* Trust signals */}
                <div className="bg-[#c9a84c]/8 border border-[#c9a84c]/20 rounded-2xl p-5 flex items-start gap-4">
                  <Shield size={22} className="text-[#c9a84c] shrink-0 mt-0.5" />
                  <div>
                    <p className="text-white font-semibold text-sm mb-1">Local Utah Support — Always</p>
                    <p className="text-white/50 text-xs leading-relaxed">Every UBC Unlimited client gets a dedicated local rep — not a call center ticket. We answer when you call and show up when it matters.</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── Stats Bar ── */}
      <div className="bg-[#c9a84c] py-8">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {solutionStats.map((s) => (
              <div key={s.label}>
                <div className="text-2xl font-extrabold text-[#080808] mb-0.5" style={{ fontFamily: 'Sora, sans-serif' }}>{s.value}</div>
                <div className="text-[#080808]/65 text-xs font-medium">{s.label}</div>
              </div>
            ))}
          </div>
          {data.slug === "credit-card-processing" && (
            <p className="text-center text-[#080808]/50 text-[11px] mt-4">
              ¹ Activation timeframe applies to low-risk merchant accounts. High-risk or complex accounts may require additional review time.
            </p>
          )}
          {data.slug === "pos-systems" && (
            <p className="text-center text-[#080808]/50 text-[11px] mt-4">
              ¹ 14-day launch timeline is a target from approval to go-live. Actual timeline depends on system complexity, menu size, and installation scope.
            </p>
          )}
        </div>
      </div>

      {/* ── How It Works ── */}
      <section className="py-16 bg-[#080808]">
        <div className="container">
          <div className="text-center mb-12">
            <div className="teal-divider mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-white mb-3" style={{ fontFamily: 'Sora, sans-serif' }}>How It Works</h2>
            <p className="text-white/50 max-w-xl mx-auto text-sm">From first conversation to live processing — here's what to expect when you work with UBC Unlimited.</p>
          </div>
          <div className="grid sm:grid-cols-3 gap-6 relative">
            {/* Connector line */}
            <div className="hidden sm:block absolute top-10 left-1/6 right-1/6 h-px bg-gradient-to-r from-transparent via-[#c9a84c]/30 to-transparent" />
            {howItWorks.map((step, i) => (
              <div key={step.step} className="relative bg-white/4 border border-white/8 rounded-2xl p-7 flex flex-col gap-3">
                <span className="text-5xl font-extrabold text-[#c9a84c]/20 leading-none" style={{ fontFamily: 'Sora, sans-serif' }}>{step.step}</span>
                <div className="w-8 h-8 rounded-full bg-[#c9a84c] flex items-center justify-center text-[#080808] font-bold text-sm shrink-0">{i + 1}</div>
                <h3 className="text-white font-bold text-base" style={{ fontFamily: 'Sora, sans-serif' }}>{step.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/consultation" className="btn-gold inline-flex items-center gap-2">Book a Consultation <ArrowRight size={15} /></Link>
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      {/* ── Challenges & Solutions (Option B: Paired Card Rows) ── */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="text-center mb-10">
            <div className="teal-divider mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-[#080808] mb-3" style={{ fontFamily: 'Sora, sans-serif' }}>Common Problems We Solve</h2>
            <p className="text-gray-500 max-w-2xl mx-auto text-sm">Real challenges Utah businesses face with payment processing — and exactly how our {data.title} solution addresses each one.</p>
          </div>
          {/* Column headers — desktop only */}
          <div className="hidden md:grid md:grid-cols-2 gap-6 mb-3 px-1">
            <div className="flex items-center gap-2">
              <AlertCircle size={14} className="text-red-400" />
              <span className="text-[11px] font-bold uppercase tracking-widest text-gray-400">The Problem</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle size={14} className="text-[#c9a84c]" />
              <span className="text-[11px] font-bold uppercase tracking-widest text-gray-400">Our Solution</span>
            </div>
          </div>
          {/* Paired rows */}
          <div className="space-y-3">
            {(SOLUTION_PAIRS[data.slug] ?? data.features.map((f, i) => ({
              challenge: f.title,
              challengeDetail: '',
              solution: f.title,
              solutionDetail: f.desc,
              solutionTag: 'Feature',
              impact: '',
            }))).map((pair, i) => (
              <div key={i} className="grid md:grid-cols-2 gap-0 rounded-2xl overflow-hidden shadow-sm border border-gray-100">
                {/* Challenge card */}
                <div className="bg-[#f8fafc] p-5 border-b md:border-b-0 md:border-r border-gray-100 flex flex-col gap-2">
                  <div className="flex items-start gap-3">
                    <div className="w-7 h-7 rounded-full bg-red-50 flex items-center justify-center shrink-0 mt-0.5">
                      <span className="text-red-400 text-xs font-bold">{i + 1}</span>
                    </div>
                    <div>
                      <p className="font-bold text-sm text-[#080808] leading-snug mb-1" style={{ fontFamily: 'Sora, sans-serif' }}>{pair.challenge}</p>
                      {pair.challengeDetail && <p className="text-gray-500 text-xs leading-relaxed">{pair.challengeDetail}</p>}
                    </div>
                  </div>
                </div>
                {/* Solution card */}
                <div className="bg-[#080808] p-5 flex flex-col gap-2">
                  <div className="flex items-start gap-3">
                    <div className="w-7 h-7 rounded-full bg-[#c9a84c]/20 flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle size={13} className="text-[#c9a84c]" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <p className="font-bold text-sm text-white leading-snug" style={{ fontFamily: 'Sora, sans-serif' }}>{pair.solution}</p>
                        {(() => {
                          const tagPath = getSolutionPath(pair.solutionTag);
                          return tagPath ? (
                            <Link
                              href={tagPath}
                              onClick={(e) => e.stopPropagation()}
                              className="text-[10px] font-bold uppercase tracking-wider bg-[#c9a84c]/20 text-[#c9a84c] px-2 py-0.5 rounded-full hover:bg-[#c9a84c]/40 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#c9a84c]"
                            >
                              {pair.solutionTag}
                            </Link>
                          ) : (
                            <span className="text-[10px] font-bold uppercase tracking-wider bg-[#c9a84c]/20 text-[#c9a84c] px-2 py-0.5 rounded-full">{pair.solutionTag}</span>
                          );
                        })()}
                      </div>
                      {pair.solutionDetail && <p className="text-white/60 text-xs leading-relaxed">{pair.solutionDetail}</p>}
                    </div>
                  </div>
                  {pair.impact && (
                    <div className="ml-10 flex items-center gap-1.5">
                      <TrendingUp size={11} className="text-[#c9a84c] shrink-0" />
                      <span className="text-[#c9a84c] text-[11px] font-semibold">{pair.impact}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
          {/* Features grid below the pairs — still show all features */}
          {data.features.length > 0 && (
            <div className="mt-12">
              <h3 className="text-lg font-bold text-[#080808] mb-6 text-center" style={{ fontFamily: 'Sora, sans-serif' }}>All Features & Capabilities</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {data.features.map((f, i) => (
                  <div key={f.title} className="group p-5 rounded-xl border border-gray-100 hover:border-[#c9a84c]/40 hover:shadow-md transition-all">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-6 h-6 rounded-lg bg-[#c9a84c]/10 flex items-center justify-center text-xs font-bold text-[#c9a84c]">{i + 1}</div>
                      <h4 className="font-bold text-[#080808] text-sm" style={{ fontFamily: 'Sora, sans-serif' }}>{f.title}</h4>
                    </div>
                    <p className="text-gray-500 text-xs leading-relaxed">{f.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ── Why UBC Unlimited ── */}
      <section className="py-16 bg-[#f8fafc]">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left — benefits */}
            <div>
              <div className="teal-divider mb-5" />
              <h2 className="text-2xl font-bold text-[#080808] mb-3" style={{ fontFamily: 'Sora, sans-serif' }}>Why Utah Businesses Choose UBC Unlimited</h2>
              <p className="text-gray-500 text-sm mb-6 leading-relaxed">We're not a national call center. We're a local Utah team that knows your market, answers when you call, and builds solutions around your business — not the other way around.</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {data.benefits.map((b) => (
                  <div key={b} className="flex items-start gap-2.5 bg-white rounded-lg p-3.5 border border-gray-100 text-sm text-[#080808]">
                    <CheckCircle size={15} className="text-[#c9a84c] mt-0.5 shrink-0" />
                    <span>{b}</span>
                  </div>
                ))}
              </div>
            </div>
            {/* Right — trust block */}
            <div className="flex flex-col gap-5">
              {/* Pull quote */}
              <div className="bg-[#080808] rounded-2xl p-7 relative overflow-hidden">
                <div className="absolute top-4 right-5 text-6xl text-[#c9a84c]/10 font-serif leading-none select-none">&ldquo;</div>
                <p className="text-white/80 text-base leading-relaxed mb-5 relative z-10 italic">
                  "We've worked with several processors over the years. UBC Unlimited is the first team that actually reviewed our statement line by line and showed us exactly where we were overpaying. We saved over $800 a month."
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#c9a84c]/20 flex items-center justify-center">
                    <span className="text-[#c9a84c] font-bold text-sm">JM</span>
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm">Jason M.</p>
                    <p className="text-white/40 text-xs">Utah Restaurant Owner</p>
                  </div>
                  <div className="ml-auto flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={13} className="text-[#c9a84c] fill-[#c9a84c]" />
                    ))}
                  </div>
                </div>
              </div>
              {/* Quick stats */}
              <div className="grid grid-cols-3 gap-3">
                {[
                  { icon: Clock, label: data.slug === "pos-systems" ? "14-Day" : "24–48h", sub: data.slug === "pos-systems" ? "Launch From Approval" : "Launch (Most Low Risk Businesses)" },
                  { icon: TrendingUp, label: "20+", sub: "Years Experience" },
                  { icon: Zap, label: "Local", sub: "Utah Support" },
                ].map((item) => (
                  <div key={item.label} className="bg-white rounded-xl border border-gray-100 p-4 text-center">
                    <item.icon size={18} className="text-[#c9a84c] mx-auto mb-2" />
                    <div className="font-extrabold text-[#080808] text-lg" style={{ fontFamily: 'Sora, sans-serif' }}>{item.label}</div>
                    <div className="text-gray-400 text-xs">{item.sub}</div>
                  </div>
                ))}
              </div>
              {/* CTA */}
              <div className="bg-[#c9a84c]/8 border border-[#c9a84c]/25 rounded-xl p-5 flex items-center gap-4">
                <Phone size={20} className="text-[#c9a84c] shrink-0" />
                <div className="flex-1">
                  <p className="text-[#080808] font-semibold text-sm">Talk to a local expert today</p>
                  <p className="text-gray-500 text-xs">No obligation. No pressure. Just honest advice.</p>
                </div>
                <a href="tel:+18013096988" className="btn-gold text-xs py-2 px-4 shrink-0">Call Now</a>
              </div>
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
              <h2 className="text-3xl font-bold text-[#080808] mb-3" style={{ fontFamily: 'Sora, sans-serif' }}>Gateway Partners We Work With</h2>
              <p className="text-gray-500 max-w-2xl mx-auto">We work with a variety of payment gateways and collaborate with you to determine the best option based on your platform, business type, and transaction needs.</p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
              {/* Secure Gateway */}
              <div className="flex flex-col items-center gap-3 group">
                <div className="w-44 h-20 bg-[#f8fafc] rounded-xl border border-gray-200 shadow-sm flex items-center justify-center p-4 group-hover:border-[#c9a84c]/40 group-hover:shadow-md transition-all">
                  <span className="text-[#080808] font-semibold text-sm text-center leading-tight">Secure<br />Checkout</span>
                </div>
                <span className="text-xs text-gray-400 font-medium">Secure Checkout</span>
              </div>
              {/* Recurring Billing */}
              <div className="flex flex-col items-center gap-3 group">
                <div className="w-44 h-20 bg-[#f8fafc] rounded-xl border border-gray-200 shadow-sm flex items-center justify-center p-4 group-hover:border-[#c9a84c]/40 group-hover:shadow-md transition-all">
                  <span className="text-[#080808] font-semibold text-sm text-center leading-tight">Recurring<br />Billing</span>
                </div>
                <span className="text-xs text-gray-400 font-medium">Recurring Billing</span>
              </div>
              {/* Fraud Protection */}
              <div className="flex flex-col items-center gap-3 group">
                <div className="w-44 h-20 bg-[#f8fafc] rounded-xl border border-gray-200 shadow-sm flex items-center justify-center p-4 group-hover:border-[#c9a84c]/40 group-hover:shadow-md transition-all">
                  <span className="text-[#080808] font-semibold text-sm text-center leading-tight">Fraud<br />Protection</span>
                </div>
                <span className="text-xs text-gray-400 font-medium">Fraud Protection</span>
              </div>
              {/* Platform Integrations */}
              <div className="flex flex-col items-center gap-3 group">
                <div className="w-44 h-20 bg-[#f8fafc] rounded-xl border border-gray-200 shadow-sm flex items-center justify-center p-4 group-hover:border-[#c9a84c]/40 group-hover:shadow-md transition-all">
                  <span className="text-[#080808] font-semibold text-sm text-center leading-tight">350+<br />Integrations</span>
                </div>
                <span className="text-xs text-gray-400 font-medium">Platform Integrations</span>
              </div>
              {/* And More */}
              <div className="flex flex-col items-center gap-3 group">
                <div className="w-44 h-20 bg-[#f8fafc] rounded-xl border border-dashed border-[#c9a84c]/40 shadow-sm flex items-center justify-center p-4 group-hover:bg-[#c9a84c]/5 transition-all">
                  <span className="text-[#c9a84c] font-semibold text-sm text-center leading-tight">+ Many More<br /><span className="text-gray-400 font-normal text-xs">Ask us about your platform</span></span>
                </div>
                <span className="text-xs text-gray-400 font-medium">And More</span>
              </div>
            </div>
            <div className="text-center mt-10">
              <p className="text-gray-500 text-sm mb-4">Not sure which gateway is right for you? We'll help you choose.</p>
              <a href="/consultation" className="btn-teal inline-flex items-center gap-2">Book a Consultation <ArrowRight size={15} /></a>
            </div>
          </div>
        </section>
      )}

      {/* High-Risk Industries Grid — shown only on high-risk-processing page */}
      {data.slug === "high-risk-processing" && (
        <section className="py-16 bg-[#080808]">
          <div className="container">
            <div className="text-center mb-10">
              <div className="teal-divider mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-white mb-3" style={{ fontFamily: 'Sora, sans-serif' }}>
                High-Risk Industries We Serve
              </h2>
              <p className="text-white/50 max-w-2xl mx-auto text-sm">
                We work with specialized acquiring banks to secure merchant accounts for businesses across all high-risk verticals. Click any industry to learn more about the specific challenges and solutions we provide.
              </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {[
                { icon: "🌿", label: "CBD & Hemp", href: "/industries/cbd-hemp", desc: "Stable accounts for hemp & CBD retailers" },
                { icon: "💊", label: "Nutraceuticals & Supplements", href: "/industries/nutraceuticals", desc: "Supplement brands & continuity programs" },
                { icon: "🔞", label: "Adult Entertainment", href: "/industries/adult-entertainment", desc: "Discreet, compliant adult merchant accounts" },
                { icon: "✈️", label: "Travel & Hospitality", href: "/industries/travel", desc: "Travel agencies & booking platforms" },
                { icon: "🎮", label: "Online Gaming & Fantasy Sports", href: "/industries/online-gaming", desc: "Skill-based gaming & fantasy sports platforms" },
                { icon: "🎯", label: "Firearms & Shooting Sports", href: "/industries/firearms", desc: "FFL dealer & range payment solutions" },
                { icon: "📞", label: "Telemarketing & Outbound Sales", href: "/industries/telemarketing", desc: "Outbound sales & telemarketing operations" },
                { icon: "💳", label: "Credit Repair & Debt Settlement", href: "/industries/credit-repair", desc: "Credit services & debt relief programs" },
                { icon: "🔄", label: "Subscription & Continuity", href: "/industries/subscription-continuity", desc: "Subscription box & recurring billing" },
                { icon: "💨", label: "E-Cigarettes & Vape", href: "/industries/vape-ecig", desc: "Vape shops & e-cigarette retailers" },
                { icon: "💊", label: "Online Pharmacy & Telemedicine", href: "/industries/online-pharmacy", desc: "Online health & telemedicine platforms" },
                { icon: "₿", label: "Cryptocurrency & Fintech", href: "/industries/cryptocurrency", desc: "Crypto exchanges & fintech platforms" },
              ].map((ind) => (
                <Link
                  key={ind.label}
                  href={ind.href}
                  className="group glass-card rounded-xl p-5 hover:bg-white/10 transition-all border border-white/5 hover:border-[#c9a84c]/30"
                >
                  <div className="text-3xl mb-3">{ind.icon}</div>
                  <div className="font-semibold text-white text-sm mb-1 group-hover:text-[#c9a84c] transition-colors" style={{ fontFamily: 'Sora, sans-serif' }}>{ind.label}</div>
                  <div className="text-white/40 text-xs leading-relaxed">{ind.desc}</div>
                  <div className="mt-3 flex items-center gap-1 text-[#c9a84c] text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                    Learn more <ChevronRight size={12} />
                  </div>
                </Link>
              ))}
            </div>
            <div className="text-center mt-10">
              <p className="text-white/40 text-sm mb-4">Don't see your industry? We serve many more high-risk verticals — contact us to discuss your situation.</p>
              <Link href="/consultation" className="btn-gold">Get a High-Risk Quote <ArrowRight size={16} /></Link>
            </div>
          </div>
        </section>
      )}

      <FAQ items={data.faqs} />

      {/* Related */}
      {relatedItems.length > 0 && (
        <section className="py-12 bg-white">
          <div className="container">
            <h2 className="text-xl font-bold text-[#080808] mb-5" style={{ fontFamily: 'Sora, sans-serif' }}>Related Solutions</h2>
            <div className="flex flex-wrap gap-3">
              {relatedItems.map((item) => (
                <Link key={item.href} href={item.href} className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-gray-200 hover:border-[#c9a84c]/40 hover:bg-[#c9a84c]/5 transition-all text-sm font-medium text-[#080808]">
                  <span>{item.icon}</span> {item.label} <ChevronRight size={13} className="text-[#c9a84c]" />
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

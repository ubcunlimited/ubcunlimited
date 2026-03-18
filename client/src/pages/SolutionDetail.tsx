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
    subtitle: "Accept all major cards with pricing tailored to your business",
    description: "UBC Unlimited provides end-to-end credit card processing solutions designed around your business — not a one-size-fits-all rate sheet. We work with you to identify the pricing model and payment infrastructure that best fits your transaction volume, industry, and customer base. Whether you're accepting payments in-person, online, or on the go, we deliver a seamless, secure, and cost-effective solution.",
    heroPoints: ["Pricing tailored to your business", "Next-day funding available", "Visa, MC, Amex, Discover & more", "EMV, NFC & digital wallets"],
    features: [
      { title: "Flexible Pricing Models", desc: "We structure pricing around your specific business needs. Options include flat rate, tiered, and pass-through pricing models — as well as cost-reduction programs like dual pricing, surcharging, and cash discounting that can significantly lower or eliminate your processing costs." },
      { title: "In-Person, Online & Mobile Payments", desc: "Accept payments anywhere — countertop terminals, wireless and mobile devices, online checkout, virtual terminals, and pay-by-link. We provide a unified commerce experience across all your sales channels." },
      { title: "EMV, Contactless & Digital Wallets", desc: "Full support for chip cards, tap-to-pay, Apple Pay, Google Pay, Samsung Pay, and all modern payment methods — keeping you current with how customers want to pay." },
      { title: "Next-Day Funding", desc: "Get your money faster. Funds deposited directly to your business bank account the next business day for most qualifying accounts." },
      { title: "Advanced Fraud & Chargeback Protection", desc: "Multi-layer fraud detection, real-time transaction monitoring, and dedicated chargeback management tools to protect your revenue and reduce dispute losses. Includes up to $100,000 in data breach protection coverage for qualifying accounts." },
      { title: "Payment Gateway Integration", desc: "Seamlessly connect to 350+ software platforms, shopping carts, and business systems through leading payment gateways including Quantum Gateway, Authorize.net, NMI, and others — with no gateway fees on qualifying accounts." },
      { title: "Recurring Billing & Invoicing", desc: "Automate subscription billing, installment plans, and recurring charges. Send professional digital invoices with embedded payment links for fast, frictionless collection." },
      { title: "Reporting & Business Intelligence", desc: "Real-time transaction reporting, batch summaries, reconciliation tools, and actionable business analytics — all accessible from a single dashboard, anytime and anywhere." },
      { title: "PCI DSS Compliance Support", desc: "Full suite of PCI security tools and compliance resources to keep your business protected and audit-ready, with dedicated support to guide you through the process." },
      { title: "Customer Management & Loyalty", desc: "Built-in customer tracking, loyalty program support, and email and text marketing tools to help you retain customers and drive repeat business." },
    ],
    benefits: [
      "Pricing structured to maximize your profitability",
      "Dedicated local Utah support — a real person, not a call center",
      "Free or low-cost equipment with qualifying accounts",
      "Month-to-month agreements for most business types",
      "Eliminate or reduce processing fees with cost-pass-through programs",
      "Accept every payment type your customers use",
      "Fast onboarding — many accounts activated same day",
      "$100,000 data breach protection for qualifying accounts",
    ],
    faqs: [
      { question: "What credit card processing rates do you offer?", answer: "We tailor pricing to each business individually — there is no single rate that applies to everyone. Factors like your industry, monthly volume, average ticket size, and card mix all influence the best pricing structure for your account. We offer flat rate, tiered, and pass-through pricing models. We can also structure your account for surcharging, dual pricing, or cash discounting programs that shift processing costs to the cardholder — legally and compliantly — which can reduce or eliminate your out-of-pocket processing expense entirely. We'll walk you through every option and show you a clear cost comparison before you make any decision." },
      { question: "What is dual pricing and how is it different from surcharging?", answer: "Dual pricing displays two prices at the point of sale — one for cash and one for card — so customers can see the difference and choose their preferred payment method. Surcharging adds a fee to credit card transactions at checkout. Cash discounting posts a single (card) price and then applies a discount when the customer pays with cash. All three approaches are designed to offset processing costs, but they operate differently and have distinct compliance requirements. Dual pricing and cash discounting apply to all card types; surcharging is limited to credit cards only and is prohibited in certain states. We'll help you determine which model is right for your business and ensure you're fully compliant." },
      { question: "How quickly will I receive my funds?", answer: "Most qualifying accounts receive next-business-day funding, with deposits going directly to your business bank account. Settlement timelines can vary based on your industry, processing history, and account type. We'll be transparent about your specific funding schedule before you get started." },
      { question: "Do I need to buy new equipment?", answer: "Not necessarily. We can often reprogram your existing terminals and equipment at no charge. If you do need new hardware — whether a countertop terminal, wireless device, or full POS system — we offer free and low-cost equipment options with qualifying accounts. We'll assess what you currently have and recommend the most cost-effective path forward." },
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
    subtitle: "Turn your smartphone into a full payment terminal — accept payments anywhere, anytime",
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

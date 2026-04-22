// UBC Unlimited — Site Configuration
// Updated from 55-question site brief

export const SITE = {
  name: "UBC Unlimited",
  tagline: "Set Yourself Apart with Service",
  description:
    "Utah's trusted local merchant services provider. Competitive pricing, fast onboarding, local expertise, and tailored setups for restaurants, service companies, and businesses across the Wasatch Front.",
  url: "https://ubcunlimited.com",
  phone: "(801) 462-0923",
  phoneHref: "tel:+18014620923",
  phoneRaw: "8014620923",
  email: "info@ubcunlimited.com",
  founder: "Josh Cornia",
  yearsInBusiness: "20+",
  address: {
    street: "Utah, USA",
    city: "Salt Lake City",
    state: "UT",
    zip: "84101",
  },
  social: {
    facebook: "https://facebook.com/ubcunlimited",
    linkedin: "https://linkedin.com/company/ubcunlimited",
    instagram: "https://instagram.com/ubcunlimited",
  },
  primaryCTA: "Book a Consultation",
  primaryCTAHref: "/consultation",
  secondaryCTA: "See Industries We Serve",
  secondaryCTAHref: "/industries",
};

export const NAV_SOLUTIONS = [
  { label: "Credit Card Processing", href: "/solutions/credit-card-processing", desc: "Competitive rates with transparent pricing", icon: "💳" },
  { label: "ACH / eCheck Processing", href: "/solutions/ach-echeck-processing", desc: "Bank-to-bank transfers and eCheck acceptance for lower processing costs", icon: "🏦" },
  { label: "Check Guarantee", href: "/solutions/check-guarantee", desc: "Accept paper checks with protection against returned or fraudulent checks", icon: "✅" },
  { label: "POS Systems", href: "/solutions/pos-systems", desc: "SkyTab, Clover & more for your industry", icon: "🖥️" },
  { label: "eCommerce Payments", href: "/solutions/ecommerce-payments", desc: "Seamless online payment gateways", icon: "🛒" },
  { label: "Mobile Processing", href: "/solutions/mobile-processing", desc: "Accept payments anywhere — in the field, at events, or on the go", icon: "📱" },
  { label: "Virtual Terminals", href: "/solutions/virtual-terminals", desc: "Process payments by phone, mail order, or manual entry from any browser", icon: "💻" },
  { label: "Invoicing", href: "/solutions/invoicing", desc: "Send digital invoices and collect payments online without a physical terminal", icon: "📄" },
  { label: "Gift Cards & Loyalty", href: "/solutions/gift-loyalty", desc: "Custom-branded gift cards and loyalty programs to increase repeat business", icon: "🎁" },
  { label: "Cash Discount & Dual Pricing", href: "/solutions/surcharge-cash-discount", desc: "Pass processing costs to card-paying customers legally and transparently", icon: "💲" },
  { label: "High-Risk Processing", href: "/solutions/high-risk-processing", desc: "Stable merchant accounts for high-risk industries that standard processors won't approve", icon: "🛡️", highRisk: true },
];

export const NAV_INDUSTRIES = [
  { label: "Restaurants", href: "/industries/restaurants", desc: "POS systems and payment solutions for full-service and quick-service dining", icon: "🍽️" },
  { label: "Bars & Nightclubs", href: "/industries/bars-nightclubs", desc: "High-volume bar payment solutions", icon: "🍺" },
  { label: "Retail", href: "/industries/retail", desc: "In-store, mobile, and omnichannel payment solutions for retail businesses", icon: "🛍️" },
  { label: "Medical", href: "/industries/medical", desc: "HIPAA-aware payment processing for medical offices, clinics, and health services", icon: "🏥" },
  { label: "eCommerce", href: "/industries/ecommerce", desc: "Online store payment solutions", icon: "🌐" },
  { label: "Automotive", href: "/industries/automotive", desc: "Auto dealers & service centers", icon: "🚗" },
  { label: "Professional Services", href: "/industries/professional-services", desc: "Law, accounting, consulting & more", icon: "💼" },
  { label: "Salons & Spas", href: "/industries/salons-spas", desc: "Appointment-based payment solutions for salons, spas, and wellness studios", icon: "💅" },
  { label: "Property Management", href: "/industries/property-management", desc: "Rent & HOA payment processing", icon: "🏢" },
  { label: "Firearms & Shooting Sports", href: "/industries/firearms", desc: "FFL dealer and shooting range merchant accounts with stable processing", icon: "🎯", highRisk: true },
  { label: "CBD & Hemp", href: "/industries/cbd-hemp", desc: "Stable accounts for hemp & CBD retailers", icon: "🌿", highRisk: true },
  { label: "Nutraceuticals & Supplements", href: "/industries/nutraceuticals", desc: "Supplement brands & continuity programs", icon: "💊", highRisk: true },
  { label: "Non-Profit & Charity", href: "/industries/non-profit", desc: "Donation processing & fund management", icon: "🤝" },
  { label: "Travel & Hospitality", href: "/industries/travel", desc: "Travel agencies & booking platforms", icon: "✈️", highRisk: true },
  { label: "Online Gaming & Fantasy Sports", href: "/industries/online-gaming", desc: "Skill-based gaming & fantasy sports platforms", icon: "🎮", highRisk: true },
  { label: "Telemarketing", href: "/industries/telemarketing", desc: "Outbound sales & call center merchant accounts", icon: "📞", highRisk: true },
  { label: "Credit Repair", href: "/industries/credit-repair", desc: "Credit counseling & repair service accounts", icon: "📈", highRisk: true },
  { label: "Subscription & Continuity", href: "/industries/subscription-continuity", desc: "Recurring billing & membership programs", icon: "🔄", highRisk: true },
  { label: "Vape & E-Cigarettes", href: "/industries/vape-ecig", desc: "Vape shops & e-cigarette retailers", icon: "💨", highRisk: true },
  { label: "Online Pharmacy", href: "/industries/online-pharmacy", desc: "Telehealth & online pharmacy payment solutions", icon: "💊", highRisk: true },
  { label: "Cryptocurrency", href: "/industries/cryptocurrency", desc: "Crypto exchange & blockchain business accounts", icon: "₿", highRisk: true },
  { label: "Adult Entertainment", href: "/industries/adult-entertainment", desc: "Discreet, compliant merchant accounts for adult content platforms and subscription sites", icon: "🔞", highRisk: true },
];

export const BLOG_CATEGORIES = [
  "Credit Card Processing",
  "POS Systems",
  "ACH Payments",
  "eCommerce Payments",
  "Industry Guides",
  "Pricing & Fees",
  "Compliance & Security",
  "Business Growth",
  "High-Risk Processing",
  "News & Updates",
] as const;

export type BlogCategory = (typeof BLOG_CATEGORIES)[number];

export const UTAH_CITIES = [
  "Salt Lake City", "Provo", "Orem", "Lehi", "American Fork",
  "Draper", "South Jordan", "West Jordan", "Sandy", "Murray",
  "Springville", "Spanish Fork", "Bluffdale", "Bountiful",
  "Woods Cross", "Farmington", "Layton", "Clearfield", "Ogden",
  "Morgan", "Park City", "Heber City",
];

export const UTAH_COUNTIES = [
  "Salt Lake County", "Utah County", "Davis County", "Weber County",
  "Box Elder County", "Sanpete County", "Summit County",
  "Wasatch County", "Cache County",
];

export const TRUST_SIGNALS = [
  { value: "20+", label: "Years in Business" },
  { value: "All 50", label: "States Served" },
  { value: "1-on-1", label: "Dedicated Local Rep" },
  { value: "1 Day", label: "Approval Time (Most Industries)" },
];

export const TESTIMONIALS = [
  {
    name: "Maria T.",
    business: "Salt Lake City Restaurant",
    quote: "UBC Unlimited cut our processing fees significantly. The UBC Unlimited team actually took the time to understand our business before recommending anything.",
    rating: 5,
  },
  {
    name: "Derek S.",
    business: "Utah County Auto Dealer",
    quote: "We've been with three different processors in five years. UBC Unlimited is the first one that feels like a real partner, not just a vendor.",
    rating: 5,
  },
  {
    name: "Amber L.",
    business: "Provo Salon & Spa",
    quote: "The POS system they set up for us is perfect for our workflow. Setup was fast and the ongoing support has been outstanding.",
    rating: 5,
  },
  {
    name: "Kevin R.",
    business: "Ogden Bar & Grill",
    quote: "Finally found a processor that understands the bar business. SkyTab has been a game changer for our high-volume nights.",
    rating: 5,
  },
];

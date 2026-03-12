// UBC Unlimited — Site Configuration
// Update these values before launching

export const SITE = {
  name: "UBC Unlimited",
  tagline: "Utah's Local Merchant Services Experts",
  description:
    "UBC Unlimited provides merchant services, payment processing, POS systems, and more to Utah businesses. Local experts, competitive rates, 24/7 support.",
  url: "https://ubcunlimited.com",
  phone: "(801) 000-0000",
  phoneHref: "tel:+18010000000",
  email: "sales@ubcunlimited.com",
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
};

export const NAV_SOLUTIONS = [
  { label: "Credit Card Processing", href: "/solutions/credit-card-processing", icon: "💳" },
  { label: "ACH & eCheck Processing", href: "/solutions/ach-echeck-processing", icon: "🏦" },
  { label: "Check Guarantee", href: "/solutions/check-guarantee", icon: "✅" },
  { label: "POS Systems", href: "/solutions/pos-systems", icon: "🖥️" },
  { label: "eCommerce Payments", href: "/solutions/ecommerce-payments", icon: "🛒" },
  { label: "Mobile Processing", href: "/solutions/mobile-processing", icon: "📱" },
  { label: "Virtual Terminals", href: "/solutions/virtual-terminals", icon: "💻" },
  { label: "Invoicing", href: "/solutions/invoicing", icon: "📄" },
];

export const NAV_INDUSTRIES = [
  { label: "Restaurants", href: "/industries/restaurants", icon: "🍽️" },
  { label: "Bars & Nightclubs", href: "/industries/bars-nightclubs", icon: "🍺" },
  { label: "Retail", href: "/industries/retail", icon: "🛍️" },
  { label: "Medical & Healthcare", href: "/industries/medical", icon: "🏥" },
  { label: "eCommerce", href: "/industries/ecommerce", icon: "🌐" },
  { label: "Automotive", href: "/industries/automotive", icon: "🚗" },
  { label: "Professional Services", href: "/industries/professional-services", icon: "💼" },
  { label: "Salons & Spas", href: "/industries/salons-spas", icon: "💅" },
  { label: "Property Management", href: "/industries/property-management", icon: "🏢" },
];

export const BLOG_CATEGORIES = [
  "Payment Processing",
  "POS Systems",
  "Business Tips",
  "Industry News",
  "Local Utah",
] as const;

export type BlogCategory = (typeof BLOG_CATEGORIES)[number];

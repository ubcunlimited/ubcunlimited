// Shared blog post metadata — used by Blog.tsx (listing) and BlogPost.tsx (related articles)
// Design: UBC Unlimited — deep navy / steel-blue / copper accent palette, Sora + DM Serif Display

export interface BlogPostMeta {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  featured?: boolean;
}

export const blogPosts: BlogPostMeta[] = [
  {
    slug: "how-to-lower-credit-card-processing-fees",
    title: "How to Lower Your Credit Card Processing Fees in 2025",
    excerpt:
      "Credit card processing fees typically cost 1.5%–3.5% per transaction. Learn the three fee components, four pricing models, and six proven strategies to reduce what you pay every month.",
    category: "Credit Card Processing",
    date: "2025-01-15",
    readTime: "8 min read",
    featured: true,
  },
  {
    slug: "interchange-plus-vs-flat-rate-pricing",
    title: "Interchange-Plus vs. Flat-Rate Pricing: Which Is Better for Your Business?",
    excerpt:
      "Square charges 2.6% + $0.15 in-person. Interchange-plus passes the real interchange cost plus a transparent markup. For businesses over $5,000/month, the savings are significant.",
    category: "Pricing & Fees",
    date: "2025-01-22",
    readTime: "6 min read",
  },
  {
    slug: "best-pos-systems-utah-restaurants-2025",
    title: "Best POS Systems for Utah Restaurants in 2025",
    excerpt:
      "SkyTab at $29.99/workstation/month vs. Toast at $69–$110+. We've installed hundreds of Utah restaurant POS systems — here's our honest, side-by-side comparison.",
    category: "POS Systems",
    date: "2025-02-01",
    readTime: "10 min read",
  },
  {
    slug: "ach-processing-guide-utah-businesses",
    title: "The Complete Guide to ACH Processing for Utah Businesses",
    excerpt:
      "The ACH Network processed 33.6 billion payments totaling $86.2 trillion in 2024. For Utah businesses with large or recurring transactions, ACH can save thousands per year in fees.",
    category: "ACH Payments",
    date: "2025-02-10",
    readTime: "7 min read",
  },
  {
    slug: "utah-small-business-payment-trends-2025",
    title: "Utah Small Business Payment Trends to Watch in 2025",
    excerpt:
      "Contactless payments, Same-Day ACH growth of 16.7% in 2025, AI fraud prevention, and cash discount programs going mainstream — here's what Utah businesses need to know.",
    category: "News & Updates",
    date: "2025-02-18",
    readTime: "5 min read",
  },
  {
    slug: "how-to-read-merchant-statement",
    title: "How to Read Your Merchant Processing Statement",
    excerpt:
      "Interchange fees, assessment fees, processor markup, junk fees — your statement has it all. This guide breaks down every line item so you know exactly what you're paying and what's negotiable.",
    category: "Pricing & Fees",
    date: "2025-03-01",
    readTime: "9 min read",
  },
  {
    slug: "chargeback-prevention-guide",
    title: "Chargeback Prevention: A Practical Guide for Utah Merchants",
    excerpt:
      "eCommerce chargebacks are projected to cost $33.79 billion in 2025. Every $1 lost to fraud costs merchants $4.61 total. Here's a practical prevention guide for Utah merchants.",
    category: "Compliance & Security",
    date: "2025-03-08",
    readTime: "8 min read",
  },
  {
    slug: "mobile-payment-solutions-utah",
    title: "Mobile Payment Solutions for Utah's On-the-Go Businesses",
    excerpt:
      "From farmers markets to trade shows, Utah's mobile businesses need reliable card acceptance. We compare Square, Clover Go, SkyTab Mobile, and merchant-provided solutions.",
    category: "Credit Card Processing",
    date: "2025-03-15",
    readTime: "6 min read",
  },
  {
    slug: "restaurant-payment-processing-guide",
    title: "The Restaurant Owner's Guide to Payment Processing",
    excerpt:
      "Tip adjustments, pre-authorizations, split checks, online ordering integration — restaurant payment processing is complex. Here's how to optimize your setup and reduce costs.",
    category: "Industry Guides",
    date: "2025-03-22",
    readTime: "7 min read",
  },
  {
    slug: "pci-compliance-guide-small-business",
    title: "PCI DSS 4.0 Compliance: What Utah Small Businesses Need to Know",
    excerpt:
      "PCI DSS v4.0 became mandatory April 1, 2024 with 51 new requirements. Here's what Utah small businesses (most are Level 4) need to do to stay compliant.",
    category: "Compliance & Security",
    date: "2025-04-01",
    readTime: "8 min read",
  },
  {
    slug: "cash-discounting-surcharging-utah",
    title: "Cash Discounting vs. Surcharging: What Utah Businesses Need to Know",
    excerpt:
      "Cash discounting is legal in all 50 states. Surcharging is banned in CT, ME, MA, and OK. Colorado caps surcharges at 2%. Here's how to choose and implement the right program.",
    category: "Pricing & Fees",
    date: "2025-04-08",
    readTime: "7 min read",
  },
  {
    slug: "ecommerce-payment-gateway-guide",
    title: "Choosing the Right eCommerce Payment Gateway for Your Utah Business",
    excerpt:
      "Authorize.net and NMI don't sell directly to merchants — you need a reseller. Stripe does. Here's the gateway vs. processor vs. merchant account distinction every Utah eCommerce business needs to understand.",
    category: "eCommerce Payments",
    date: "2025-04-15",
    readTime: "8 min read",
  },
  {
    slug: "pos-systems-for-bars-utah",
    title: "Best POS Systems for Bars and Nightclubs in Utah",
    excerpt:
      "Tab management, pre-authorizations, split bills, and Utah liquor compliance — bars have unique POS requirements. Here's our honest comparison of SkyTab, Toast, Clover, and Square for Utah bar owners.",
    category: "POS Systems",
    date: "2025-04-22",
    readTime: "9 min read",
  },
  {
    slug: "merchant-services-utah-county",
    title: "Merchant Services in Utah County: What Local Businesses Need to Know",
    excerpt:
      "Utah County's Silicon Slopes corridor is booming. Here's why Provo, Orem, and Lehi businesses should avoid bank-provided merchant accounts and long-term contracts — and what to look for instead.",
    category: "Industry Guides",
    date: "2025-05-01",
    readTime: "6 min read",
  },
  {
    slug: "skytab-pos-review-utah",
    title: "SkyTab POS Review: Is It the Right System for Your Utah Business?",
    excerpt:
      "$29.99/workstation/month includes hardware, software, installation, training, and support. As Utah's authorized SkyTab reseller, we give you the honest review — strengths, limitations, and who it's right for.",
    category: "POS Systems",
    date: "2025-05-08",
    readTime: "10 min read",
  },
  {
    slug: "high-risk-industries-dropped-by-stripe",
    title: "5 Industries That Get Dropped by Stripe (And How to Get a Stable Merchant Account)",
    excerpt:
      "Stripe, Square, and PayPal terminate accounts in CBD, nutraceuticals, firearms, adult entertainment, and travel without warning. Here's why it happens and how to get a stable high-risk merchant account.",
    category: "High-Risk Processing",
    date: "2026-03-19",
    readTime: "9 min read",
    featured: true,
  },
  {
    slug: "growing-business-with-better-payments",
    title: "How Better Payment Processing Can Help Your Business Grow",
    excerpt:
      "Contactless checkout, ACH for B2B, real-time sales data, loyalty programs, and lower processing costs — here's how modern payment infrastructure drives measurable business growth.",
    category: "Business Growth",
    date: "2025-05-15",
    readTime: "7 min read",
  },
];

/**
 * Returns up to `count` posts from the same category, excluding the current slug.
 * Falls back to posts from any category if the same-category pool is insufficient.
 */
export function getRelatedPosts(currentSlug: string, category: string, count = 3): BlogPostMeta[] {
  const sameCategory = blogPosts.filter(
    (p) => p.slug !== currentSlug && p.category === category
  );
  if (sameCategory.length >= count) return sameCategory.slice(0, count);

  // Pad with posts from other categories if needed
  const others = blogPosts.filter(
    (p) => p.slug !== currentSlug && p.category !== category
  );
  return [...sameCategory, ...others].slice(0, count);
}

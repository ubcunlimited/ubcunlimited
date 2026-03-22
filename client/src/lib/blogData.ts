// Design: UBC Unlimited — deep navy / steel-blue / copper accent palette, Sora + DM Serif Display
// Blog post metadata — all content is original, written in UBC Unlimited's voice

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
    title: "How to Lower Your Credit Card Processing Fees",
    excerpt:
      "Most Utah business owners are overpaying on processing fees — not because better options don't exist, but because no one has ever walked them through the statement line by line. We break down what you're actually paying, which fees are negotiable, and the practical steps our clients use to reduce their monthly processing costs.",
    category: "Credit Card Processing",
    date: "2025-01-15",
    readTime: "8 min read",
    featured: true,
  },
  {
    slug: "interchange-plus-vs-flat-rate-pricing",
    title: "Interchange-Plus vs. Flat-Rate Pricing: Which Is Right for Your Business?",
    excerpt:
      "Flat-rate pricing is simple, but simplicity has a cost. Interchange-plus passes the actual card network cost through to you with a transparent markup on top — and for most Utah businesses processing more than a few thousand dollars a month, the difference adds up. Here's how to tell which model works in your favor.",
    category: "Pricing & Fees",
    date: "2025-01-22",
    readTime: "6 min read",
  },
  {
    slug: "best-pos-systems-utah-restaurants-2025",
    title: "Best POS Systems for Utah Restaurants",
    excerpt:
      "After installing POS systems in hundreds of Utah restaurants, we've seen what works and what creates headaches. This guide compares the leading options on price, features, and real-world reliability — so you can make a confident decision without sitting through a dozen sales demos.",
    category: "POS Systems",
    date: "2025-02-01",
    readTime: "10 min read",
  },
  {
    slug: "ach-processing-guide-utah-businesses",
    title: "The Complete Guide to ACH Processing for Utah Businesses",
    excerpt:
      "If your business regularly handles large invoices, recurring billing, or B2B payments, ACH processing can dramatically reduce what you spend on transaction fees. This guide explains how ACH works, when it makes sense, and how Utah businesses are using it to keep more of what they earn.",
    category: "ACH Payments",
    date: "2025-02-10",
    readTime: "7 min read",
  },
  {
    slug: "utah-small-business-payment-trends-2025",
    title: "Payment Trends Utah Small Businesses Should Know About",
    excerpt:
      "The way Utah customers pay is shifting — and businesses that adapt early tend to come out ahead. From contactless checkout to same-day settlement and cash discount programs, we cover the trends our local clients are asking about most and what they mean for your bottom line.",
    category: "News & Updates",
    date: "2025-02-18",
    readTime: "5 min read",
  },
  {
    slug: "how-to-read-merchant-statement",
    title: "How to Read Your Merchant Processing Statement",
    excerpt:
      "Your monthly processing statement contains more information than most business owners ever look at — and buried in those line items are often fees that shouldn't be there. This guide walks you through every section of a typical statement so you know exactly what you're paying and what questions to ask.",
    category: "Pricing & Fees",
    date: "2025-03-01",
    readTime: "9 min read",
  },
  {
    slug: "chargeback-prevention-guide",
    title: "Chargeback Prevention: A Practical Guide for Utah Merchants",
    excerpt:
      "A single chargeback costs far more than the disputed transaction amount once you factor in fees, lost merchandise, and staff time. Utah merchants — especially those in eCommerce and high-ticket retail — face this risk daily. Here's a straightforward prevention framework that our clients have used to reduce disputes significantly.",
    category: "High-Risk Processing",
    date: "2025-03-08",
    readTime: "8 min read",
  },
  {
    slug: "mobile-payment-solutions-utah",
    title: "Mobile Payment Solutions for Utah's On-the-Go Businesses",
    excerpt:
      "Farmers markets, trade shows, job sites, and pop-up events — Utah has no shortage of businesses that need to accept payments away from a fixed location. We compare the mobile processing options available today, including what our own clients use and why, so you can find the right fit without overpaying.",
    category: "Credit Card Processing",
    date: "2025-03-15",
    readTime: "6 min read",
  },
  {
    slug: "restaurant-payment-processing-guide",
    title: "The Restaurant Owner's Guide to Payment Processing",
    excerpt:
      "Restaurant payment processing is more complex than most industries — tips, pre-authorizations, split checks, online ordering, and high transaction volume all create unique challenges. This guide covers the setup decisions that matter most and how to structure your processing to reduce costs without sacrificing speed or reliability.",
    category: "Industry Guides",
    date: "2025-03-22",
    readTime: "7 min read",
  },
  {
    slug: "pci-compliance-guide-small-business",
    title: "PCI Compliance: What Utah Small Businesses Actually Need to Do",
    excerpt:
      "PCI compliance sounds intimidating, but for most small Utah businesses it comes down to a handful of practical steps. This guide cuts through the jargon, explains what Level 4 merchants are actually required to do, and shows you how to stay compliant without hiring a consultant or spending a fortune.",
    category: "Compliance & Security",
    date: "2025-04-01",
    readTime: "8 min read",
  },
  {
    slug: "cash-discounting-surcharging-utah",
    title: "Surcharging & Cash Discount Solutions vs. Surcharging: What Utah Businesses Need to Know",
    excerpt:
      "Both surcharging & cash discount solutions and surcharging can help offset processing costs, but they work differently and carry different rules. Utah businesses have more flexibility than most states, but getting the implementation wrong can create compliance problems. Here's a clear breakdown of both options and how to choose the right one.",
    category: "Pricing & Fees",
    date: "2025-04-08",
    readTime: "7 min read",
  },
  {
    slug: "ecommerce-payment-gateway-guide",
    title: "Choosing the Right eCommerce Payment Gateway for Your Utah Business",
    excerpt:
      "A payment gateway is not the same as a merchant account, and confusing the two leads to costly mistakes. Utah eCommerce businesses need both — and the right combination depends on your platform, transaction volume, and risk profile. This guide explains the difference and helps you find the setup that fits.",
    category: "eCommerce Payments",
    date: "2025-04-15",
    readTime: "8 min read",
  },
  {
    slug: "pos-systems-for-bars-utah",
    title: "Best POS Systems for Bars and Nightclubs in Utah",
    excerpt:
      "Running a bar in Utah comes with a specific set of POS requirements: fast tab management, pre-authorization holds, split bills, and compliance with state liquor regulations. We've set up systems in Utah bars across the Wasatch Front and can tell you honestly which platforms hold up under pressure and which ones don't.",
    category: "POS Systems",
    date: "2025-04-22",
    readTime: "9 min read",
  },
  {
    slug: "merchant-services-utah-county",
    title: "Merchant Services in Utah County: What Local Businesses Need to Know",
    excerpt:
      "Utah County's business landscape has changed dramatically over the past decade. From Provo's growing restaurant scene to Lehi's tech corridor, local businesses have different payment processing needs than they did five years ago. Here's what Utah County merchants should look for — and what to avoid — when choosing a processor.",
    category: "Industry Guides",
    date: "2025-05-01",
    readTime: "6 min read",
  },
  {
    slug: "skytab-pos-review-utah",
    title: "SkyTab POS: An Honest Review from Utah's Authorized Reseller",
    excerpt:
      "We install and support SkyTab systems across Utah, which means we see exactly how the platform performs in real businesses — not just in demos. This review covers what SkyTab does well, where it has limitations, and which types of Utah businesses are the best fit. No sales spin, just our honest experience.",
    category: "POS Systems",
    date: "2025-05-08",
    readTime: "10 min read",
  },
  {
    slug: "rolling-reserve-merchant-account",
    title: "What Is a Rolling Reserve and How Do You Get It Released?",
    excerpt:
      "If your processor is withholding a percentage of your daily settlements, you're dealing with a rolling reserve. It's common for newer businesses and high-risk industries — but it doesn't have to be permanent. Here's how rolling reserves work, why processors require them, and the steps our clients take to get them reduced or eliminated.",
    category: "High-Risk Processing",
    date: "2026-03-19",
    readTime: "8 min read",
  },
  {
    slug: "high-risk-industries-dropped-by-stripe",
    title: "5 Industries That Get Dropped by Stripe — And What to Do Instead",
    excerpt:
      "Stripe, Square, and PayPal are convenient for getting started, but they're known to terminate accounts in certain industries without much warning. If your business operates in CBD, firearms, nutraceuticals, adult entertainment, or travel, you need a processor built for your risk profile — not one that will shut you down at the worst possible moment.",
    category: "High-Risk Processing",
    date: "2026-03-19",
    readTime: "9 min read",
    featured: true,
  },
  {
    slug: "how-interchange-rates-work",
    title: "How Interchange Rates Work: A Plain-English Guide for Utah Merchants",
    excerpt:
      "Interchange fees are the largest single component of your credit card processing costs — yet most business owners have never had them explained clearly. This guide breaks down exactly what interchange is, who sets the rates, why they vary so widely by card type, and how your pricing model determines whether you see the real cost or a hidden markup.",
    category: "Pricing & Fees",
    date: "2026-03-20",
    readTime: "10 min read",
    featured: true,
  },
  {
    slug: "growing-business-with-better-payments",
    title: "How Better Payment Processing Can Help Your Business Grow",
    excerpt:
      "Most business owners think of payment processing as a cost center — something to minimize and ignore. But the right setup can actually drive growth: faster checkout increases throughput, ACH reduces B2B friction, loyalty programs bring customers back, and real-time reporting helps you make smarter decisions. Here's how our Utah clients are using payments as a growth tool.",
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

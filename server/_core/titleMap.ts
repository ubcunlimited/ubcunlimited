/**
 * Server-side title injection for SPA routes.
 *
 * Because this is a client-side React SPA, crawlers that don't execute
 * JavaScript (or read the static HTML before hydration) see the generic
 * index.html <title> for every page. This module maps URL paths to
 * page-specific titles so the Express catch-all can inject the correct
 * <title> tag into the HTML response before sending it.
 *
 * Titles here must match what react-helmet-async renders client-side
 * (i.e., the value passed to <SEO title="..."> WITHOUT the "| UBC Unlimited"
 * suffix — SEO.tsx appends that automatically, and we do the same here).
 */

const SITE_NAME = "UBC Unlimited";

/** Build a full <title> string the same way SEO.tsx does. */
export function buildTitle(pageTitle: string | null): string {
  if (!pageTitle) return `${SITE_NAME} — Utah Merchant Services`;
  return `${pageTitle} | ${SITE_NAME}`;
}

/** Static route → page title map (without the "| UBC Unlimited" suffix). */
const STATIC_TITLES: Record<string, string> = {
  "/": "Utah Merchant Services & Payment Processing",
  "/solutions": "Payment Processing Solutions",
  "/industries": "Industries Served | Merchant Services Utah",
  "/about": "About Us — Utah Merchant Services Team",
  "/contact": "Contact Us — Merchant Services Utah",
  "/testimonials": "Client Testimonials — Utah Merchant Services",
  "/locations": "Utah Merchant Services Locations",
  "/counties": "Merchant Services Across All Utah Counties",
  "/cities": "Merchant Services in Utah Cities",
  "/blog": "Merchant Services Blog — Utah Business Insights",
  "/news": "News & Updates — UBC Unlimited",
  "/faq": "Frequently Asked Questions — Merchant Services Utah",
  "/consultation": "Book a Consultation — UBC Unlimited",
  "/statement-review": "Free Statement Review — Merchant Services Utah",
  "/build-a-pos": "Build Your POS System — SkyTab Configurator",
  "/privacy-policy": "Privacy Policy",
  "/terms-of-service": "Terms of Service",
  "/cookie-policy": "Cookie Policy",
  "/disclaimer": "Disclaimer",
  "/accessibility": "Accessibility Statement",
  "/thank-you": "Thank You — UBC Unlimited",
};

/** Industry slug → page title map. */
const INDUSTRY_TITLES: Record<string, string> = {
  "restaurants": "Restaurants Payment Processing in Utah",
  "bars-nightclubs": "Bars & Nightclubs Payment Processing in Utah",
  "retail": "Retail Payment Processing in Utah",
  "medical": "Medical & Healthcare Payment Processing in Utah",
  "ecommerce": "eCommerce Payment Processing in Utah",
  "automotive": "Automotive Payment Processing in Utah",
  "professional-services": "Professional Services Payment Processing in Utah",
  "salons-spas": "Salons & Spas Payment Processing in Utah",
  "property-management": "Property Management Payment Processing in Utah",
  "firearms": "Firearms & Shooting Sports Payment Processing in Utah",
  "cbd-hemp": "CBD & Hemp Payment Processing in Utah",
  "nutraceuticals": "Nutraceuticals & Supplements Payment Processing in Utah",
  "non-profit": "Non-Profit & Charity Payment Processing in Utah",
  "adult-entertainment": "Adult Entertainment Payment Processing in Utah",
  "travel": "Travel & Hospitality Payment Processing in Utah",
  "online-gaming": "Online Gaming & Fantasy Sports Payment Processing in Utah",
  "telemarketing": "Telemarketing Payment Processing in Utah",
  "credit-repair": "Credit Repair Payment Processing in Utah",
  "subscription-continuity": "Subscription & Continuity Payment Processing in Utah",
  "vape-ecig": "Vape & E-Cigarettes Payment Processing in Utah",
  "online-pharmacy": "Online Pharmacy Payment Processing in Utah",
  "cryptocurrency": "Cryptocurrency Payment Processing in Utah",
};

/** Solution slug → page title map. */
const SOLUTION_TITLES: Record<string, string> = {
  "credit-card-processing": "Credit Card Processing in Utah",
  "ach-echeck-processing": "ACH & eCheck Processing in Utah",
  "check-guarantee": "Check Guarantee Services in Utah",
  "pos-systems": "POS Systems for Utah Businesses",
  "ecommerce-payments": "eCommerce Payment Solutions in Utah",
  "mobile-processing": "Mobile Payment Processing in Utah",
  "virtual-terminals": "Virtual Terminal Payment Processing in Utah",
  "invoicing": "Online Invoicing for Utah Businesses",
  "gift-loyalty": "Gift & Loyalty Programs for Utah Businesses",
  "surcharge-cash-discount": "Cash Discount & Dual Pricing in Utah",
  "high-risk-processing": "High-Risk Merchant Accounts in Utah",
  "dual-pricing": "Dual Pricing for Utah Businesses",
};

/** Blog post slug → page title map. */
const BLOG_TITLES: Record<string, string> = {
  "how-to-lower-credit-card-processing-fees": "How to Lower Your Credit Card Processing Fees",
  "interchange-plus-vs-flat-rate-pricing": "Interchange-Plus vs. Flat-Rate Pricing",
  "best-pos-systems-utah-restaurants-2025": "Best POS Systems for Utah Restaurants",
  "ach-processing-guide-utah-businesses": "The Complete Guide to ACH Processing for Utah Businesses",
  "utah-small-business-payment-trends-2025": "Payment Trends Utah Small Businesses Should Know About",
  "how-to-read-merchant-statement": "How to Read Your Merchant Processing Statement",
  "chargeback-prevention-guide": "Chargeback Prevention: A Practical Guide for Utah Merchants",
  "mobile-payment-solutions-utah": "Mobile Payment Solutions for Utah's On-the-Go Businesses",
  "restaurant-payment-processing-guide": "The Restaurant Owner's Guide to Payment Processing",
  "pci-compliance-guide-small-business": "PCI Compliance: What Utah Small Businesses Actually Need to Do",
  "cash-discounting-surcharging-utah": "Cash Discount vs. Surcharging in Utah",
  "ecommerce-payment-gateway-guide": "Choosing the Right eCommerce Payment Gateway",
  "pos-systems-for-bars-utah": "Best POS Systems for Bars and Nightclubs in Utah",
  "merchant-services-utah-county": "Merchant Services in Utah County",
  "skytab-pos-review-utah": "SkyTab POS: An Honest Review from Utah's Authorized Reseller",
  "rolling-reserve-merchant-account": "What Is a Rolling Reserve and How Do You Get It Released?",
  "high-risk-industries-dropped-by-stripe": "5 Industries Stripe Drops & Better Alternatives",
  "how-interchange-rates-work": "How Interchange Rates Work: A Plain-English Guide",
  "growing-business-with-better-payments": "How Better Payment Processing Can Help Your Business Grow",
};

/** Utah city slug → city name map (non-featured cities). */
const UTAH_CITY_NAMES: Record<string, string> = {
  "alpine": "Alpine", "american-fork": "American Fork", "bountiful": "Bountiful",
  "brigham-city": "Brigham City", "cedar-city": "Cedar City", "clearfield": "Clearfield",
  "clinton": "Clinton", "cottonwood-heights": "Cottonwood Heights", "draper": "Draper",
  "eagle-mountain": "Eagle Mountain", "farmington": "Farmington", "herriman": "Herriman",
  "highland": "Highland", "holladay": "Holladay", "hurricane": "Hurricane",
  "ivins": "Ivins", "kaysville": "Kaysville", "layton": "Layton",
  "lehi": "Lehi", "logan": "Logan", "mapleton": "Mapleton",
  "midvale": "Midvale", "millcreek": "Millcreek", "moab": "Moab",
  "murray": "Murray", "north-ogden": "North Ogden", "north-salt-lake": "North Salt Lake",
  "ogden": "Ogden", "orem": "Orem", "park-city": "Park City",
  "payson": "Payson", "pleasant-grove": "Pleasant Grove", "provo": "Provo",
  "riverton": "Riverton", "roy": "Roy", "salt-lake-city": "Salt Lake City",
  "sandy": "Sandy", "saratoga-springs": "Saratoga Springs", "south-jordan": "South Jordan",
  "south-ogden": "South Ogden", "spanish-fork": "Spanish Fork", "springville": "Springville",
  "st-george": "St. George", "sunset": "Sunset", "syracuse": "Syracuse",
  "taylorsville": "Taylorsville", "tooele": "Tooele", "tremonton": "Tremonton",
  "washington": "Washington", "washington-terrace": "Washington Terrace",
  "west-jordan": "West Jordan", "west-valley-city": "West Valley City",
  "woods-cross": "Woods Cross",
};

/** Utah county slug → county name map. */
const UTAH_COUNTY_NAMES: Record<string, string> = {
  "beaver": "Beaver County", "box-elder": "Box Elder County", "cache": "Cache County",
  "carbon": "Carbon County", "daggett": "Daggett County", "davis": "Davis County",
  "duchesne": "Duchesne County", "emery": "Emery County", "garfield": "Garfield County",
  "grand": "Grand County", "iron": "Iron County", "juab": "Juab County",
  "kane": "Kane County", "millard": "Millard County", "morgan": "Morgan County",
  "piute": "Piute County", "rich": "Rich County", "salt-lake": "Salt Lake County",
  "san-juan": "San Juan County", "sanpete": "Sanpete County", "sevier": "Sevier County",
  "summit": "Summit County", "tooele": "Tooele County", "uintah": "Uintah County",
  "utah": "Utah County", "wasatch": "Wasatch County", "washington": "Washington County",
  "wayne": "Wayne County", "weber": "Weber County",
};

/**
 * Resolve a URL path to a page-specific title string (without the suffix).
 * Returns null if the path is unknown (falls back to generic title in buildTitle).
 */
export function resolveTitle(pathname: string): string | null {
  // Normalize: strip trailing slash (except root)
  const path = pathname.length > 1 ? pathname.replace(/\/$/, "") : pathname;

  // Static routes
  if (STATIC_TITLES[path]) return STATIC_TITLES[path];

  // /industries/:slug
  const industryMatch = path.match(/^\/industries\/([^/]+)$/);
  if (industryMatch) {
    const slug = industryMatch[1];
    return INDUSTRY_TITLES[slug] ?? `${slug.replace(/-/g, " ")} Payment Processing in Utah`;
  }

  // /solutions/:slug
  const solutionMatch = path.match(/^\/solutions\/([^/]+)$/);
  if (solutionMatch) {
    const slug = solutionMatch[1];
    return SOLUTION_TITLES[slug] ?? `${slug.replace(/-/g, " ")} in Utah`;
  }

  // /blog/:slug
  const blogMatch = path.match(/^\/blog\/([^/]+)$/);
  if (blogMatch) {
    const slug = blogMatch[1];
    return BLOG_TITLES[slug] ?? null;
  }

  // /cities/:slug
  const cityMatch = path.match(/^\/cities\/([^/]+)$/);
  if (cityMatch) {
    const slug = cityMatch[1];
    const name = UTAH_CITY_NAMES[slug];
    if (name) {
      return name.length > 14
        ? `${name} Merchant Services`
        : `Merchant Services in ${name}, Utah`;
    }
    return null;
  }

  // /counties/:slug
  const countyMatch = path.match(/^\/counties\/([^/]+)$/);
  if (countyMatch) {
    const slug = countyMatch[1];
    const name = UTAH_COUNTY_NAMES[slug];
    if (name) return `Merchant Services in ${name}, Utah`;
    return null;
  }

  // /locations/:slug (featured city pages)
  const locationMatch = path.match(/^\/locations\/([^/]+)$/);
  if (locationMatch) {
    const slug = locationMatch[1];
    const name = UTAH_CITY_NAMES[slug];
    if (name) return `Merchant Services in ${name}, Utah`;
    return null;
  }

  return null;
}

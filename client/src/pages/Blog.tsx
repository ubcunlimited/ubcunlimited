import { useState, useMemo } from "react";
import { Link } from "wouter";
import { Calendar, Clock, Tag, ArrowRight, Search, X } from "lucide-react";
import PageLayout from "@/components/layout/PageLayout";
import SEO from "@/components/SEO";
import CTABanner from "@/components/sections/CTABanner";

// Blog categories from Q35
const BLOG_CATEGORIES = [
  "Credit Card Processing",
  "POS Systems",
  "ACH Payments",
  "eCommerce Payments",
  "Industry Guides",
  "Pricing & Fees",
  "Compliance & Security",
  "Business Growth",
  "News & Updates",
];

const blogPosts = [
  {
    slug: "how-to-lower-credit-card-processing-fees",
    title: "How to Lower Your Credit Card Processing Fees in 2025",
    excerpt: "Most Utah businesses overpay for credit card processing. Here's a practical guide to understanding your statement and negotiating better rates.",
    category: "Credit Card Processing",
    date: "2025-01-15",
    readTime: "8 min read",
    featured: true,
  },
  {
    slug: "interchange-plus-vs-flat-rate-pricing",
    title: "Interchange-Plus vs. Flat-Rate Pricing: Which Is Better for Your Business?",
    excerpt: "Square and Stripe use flat-rate pricing. We use interchange-plus. Here's why the difference matters — and which one saves you more money.",
    category: "Pricing & Fees",
    date: "2025-01-22",
    readTime: "6 min read",
    featured: false,
  },
  {
    slug: "best-pos-systems-utah-restaurants-2025",
    title: "Best POS Systems for Utah Restaurants in 2025",
    excerpt: "We've installed hundreds of restaurant POS systems across Utah. Here's our honest breakdown of SkyTab, Clover, Toast, and Square for Restaurants.",
    category: "POS Systems",
    date: "2025-02-01",
    readTime: "10 min read",
    featured: false,
  },
  {
    slug: "ach-processing-guide-utah-businesses",
    title: "The Complete Guide to ACH Processing for Utah Businesses",
    excerpt: "ACH bank transfers can save businesses thousands per year in processing fees. Here's everything you need to know to get started.",
    category: "ACH Payments",
    date: "2025-02-10",
    readTime: "7 min read",
    featured: false,
  },
  {
    slug: "utah-small-business-payment-trends-2025",
    title: "Utah Small Business Payment Trends to Watch in 2025",
    excerpt: "From contactless payments to embedded finance, here are the payment trends shaping Utah's small business landscape this year.",
    category: "News & Updates",
    date: "2025-02-18",
    readTime: "5 min read",
    featured: false,
  },
  {
    slug: "how-to-read-merchant-statement",
    title: "How to Read Your Merchant Processing Statement",
    excerpt: "Your monthly processing statement is full of fees you may not understand. This guide breaks down every line item so you know exactly what you're paying.",
    category: "Pricing & Fees",
    date: "2025-03-01",
    readTime: "9 min read",
    featured: false,
  },
  {
    slug: "chargeback-prevention-guide",
    title: "Chargeback Prevention: A Practical Guide for Utah Merchants",
    excerpt: "Chargebacks cost U.S. merchants billions each year. Here's how to prevent them — and what to do when you get one.",
    category: "Compliance & Security",
    date: "2025-03-08",
    readTime: "8 min read",
    featured: false,
  },
  {
    slug: "mobile-payment-solutions-utah",
    title: "Mobile Payment Solutions for Utah's On-the-Go Businesses",
    excerpt: "Farmers markets, food trucks, trade shows — Utah's mobile businesses need reliable payment solutions. Here are the best options.",
    category: "Credit Card Processing",
    date: "2025-03-15",
    readTime: "6 min read",
    featured: false,
  },
  {
    slug: "restaurant-payment-processing-guide",
    title: "The Restaurant Owner's Guide to Payment Processing",
    excerpt: "Restaurant payment processing has unique challenges — tips, split checks, online ordering. Here's how to optimize your setup.",
    category: "Industry Guides",
    date: "2025-03-22",
    readTime: "7 min read",
    featured: false,
  },
  {
    slug: "pci-compliance-guide-small-business",
    title: "PCI Compliance: What Utah Small Businesses Need to Know",
    excerpt: "PCI DSS compliance isn't optional — but it doesn't have to be complicated. Here's a plain-English guide for small business owners.",
    category: "Compliance & Security",
    date: "2025-04-01",
    readTime: "8 min read",
    featured: false,
  },
  {
    slug: "cash-discounting-surcharging-utah",
    title: "Cash Discounting vs. Surcharging: What Utah Businesses Need to Know",
    excerpt: "Two popular strategies for offsetting processing costs — but they work very differently. Here's how to choose the right approach for your business.",
    category: "Pricing & Fees",
    date: "2025-04-08",
    readTime: "7 min read",
    featured: false,
  },
  {
    slug: "ecommerce-payment-gateway-guide",
    title: "Choosing the Right eCommerce Payment Gateway for Your Utah Business",
    excerpt: "Stripe, Authorize.net, NMI — there are dozens of options. Here's how to choose the right gateway for your online store.",
    category: "eCommerce Payments",
    date: "2025-04-15",
    readTime: "8 min read",
    featured: false,
  },
  {
    slug: "pos-systems-for-bars-utah",
    title: "Best POS Systems for Bars and Nightclubs in Utah",
    excerpt: "Bars have unique POS needs — tabs, split bills, fast service, and liquor compliance. Here are the best systems for Utah bar owners.",
    category: "POS Systems",
    date: "2025-04-22",
    readTime: "9 min read",
    featured: false,
  },
  {
    slug: "merchant-services-utah-county",
    title: "Merchant Services in Utah County: What Local Businesses Need to Know",
    excerpt: "Utah County is one of the fastest-growing business markets in the country. Here's what Provo, Orem, and Lehi businesses need to know about payment processing.",
    category: "Industry Guides",
    date: "2025-05-01",
    readTime: "6 min read",
    featured: false,
  },
  {
    slug: "skytab-pos-review-utah",
    title: "SkyTab POS Review: Is It the Right System for Your Utah Business?",
    excerpt: "As an authorized SkyTab reseller in Utah, we know this system inside and out. Here's an honest review of SkyTab's features, pricing, and best use cases.",
    category: "POS Systems",
    date: "2025-05-08",
    readTime: "10 min read",
    featured: false,
  },
  {
    slug: "growing-business-with-better-payments",
    title: "How Better Payment Processing Can Help Your Business Grow",
    excerpt: "The right payment setup isn't just about saving money — it's about creating a better customer experience that drives repeat business.",
    category: "Business Growth",
    date: "2025-05-15",
    readTime: "7 min read",
    featured: false,
  },
];

const categoryColors: Record<string, string> = {
  "Credit Card Processing": "bg-blue-50 text-blue-700",
  "POS Systems": "bg-purple-50 text-purple-700",
  "ACH Payments": "bg-green-50 text-green-700",
  "eCommerce Payments": "bg-orange-50 text-orange-700",
  "Industry Guides": "bg-teal-50 text-teal-700",
  "Pricing & Fees": "bg-amber-50 text-amber-700",
  "Compliance & Security": "bg-red-50 text-red-700",
  "Business Growth": "bg-indigo-50 text-indigo-700",
  "News & Updates": "bg-sky-50 text-sky-700",
};

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const categories = ["All", ...BLOG_CATEGORIES];

  const filtered = useMemo(() => {
    let posts = blogPosts;
    if (activeCategory !== "All") {
      posts = posts.filter((p) => p.category === activeCategory);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      posts = posts.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.excerpt.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
    }
    return posts;
  }, [activeCategory, searchQuery]);

  const featured = blogPosts.find((p) => p.featured);
  const rest = filtered.filter((p) => !p.featured || activeCategory !== "All" || searchQuery.trim());

  return (
    <PageLayout>
      <SEO
        title="Blog — Merchant Services Insights for Utah Businesses | UBC Unlimited"
        description="Expert articles on credit card processing, POS systems, payment gateways, dual pricing, and merchant services tips for Utah business owners."
        canonical="/blog"
      />
      {/* Hero */}
      <section className="bg-[#0d1b2a] py-16">
        <div className="container">
          <div className="max-w-2xl">
            <div className="stat-badge mb-4">News &amp; Updates</div>
            <h1 className="text-4xl font-extrabold text-white mb-4" style={{ fontFamily: 'DM Serif Display, Georgia, serif' }}>
              Merchant Services Insights<br />for Utah Businesses
            </h1>
            <p className="text-white/60 text-lg">
              Practical guides, industry news, and expert tips from {" "}
              <span className="text-[#1e6fa8] font-medium">UBC Unlimited</span> — Utah's local merchant services experts.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="container">
          {/* Search + Filter Bar */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            {/* Search */}
            <div className="relative flex-1 max-w-sm">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search articles..."
                className="w-full pl-9 pr-9 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#1e6fa8] focus:ring-2 focus:ring-[#1e6fa8]/20 transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X size={14} />
                </button>
              )}
            </div>

            {/* Category Pills */}
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                    activeCategory === cat
                      ? "bg-[#1e6fa8] text-white shadow-sm"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Featured Post */}
          {featured && activeCategory === "All" && !searchQuery.trim() && (
            <Link
              href={`/blog/${featured.slug}`}
              className="group block mb-10 rounded-2xl border border-gray-100 hover:border-[#1e6fa8]/30 hover:shadow-xl transition-all overflow-hidden bg-gradient-to-br from-[#0d1b2a] to-[#152234] p-8 md:p-10"
            >
              <div className="flex items-center gap-2 mb-4">
                <span className="bg-[#c47c2b] text-white text-xs font-bold px-2.5 py-1 rounded-full">Featured</span>
                <span className="text-[#1e6fa8] text-xs font-medium">{featured.category}</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-3 group-hover:text-[#1e6fa8] transition-colors" style={{ fontFamily: 'DM Serif Display, Georgia, serif' }}>
                {featured.title}
              </h2>
              <p className="text-white/60 mb-5 leading-relaxed max-w-2xl">{featured.excerpt}</p>
              <div className="flex items-center gap-4 text-white/40 text-xs">
                <span className="flex items-center gap-1"><Calendar size={12} />{featured.date}</span>
                <span className="flex items-center gap-1"><Clock size={12} />{featured.readTime}</span>
                <span className="flex items-center gap-1 text-[#1e6fa8] font-medium ml-auto">Read article <ArrowRight size={13} /></span>
              </div>
            </Link>
          )}

          {/* Search Results Info */}
          {searchQuery.trim() && (
            <div className="mb-6 text-sm text-gray-500">
              {filtered.length > 0
                ? `Found ${filtered.length} article${filtered.length !== 1 ? "s" : ""} matching "${searchQuery}"`
                : `No articles found for "${searchQuery}"`}
            </div>
          )}

          {/* Post Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rest.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group block rounded-xl border border-gray-100 hover:border-[#1e6fa8]/30 hover:shadow-lg transition-all overflow-hidden bg-white"
              >
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <Tag size={11} className="text-[#1e6fa8]" />
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${categoryColors[post.category] || "bg-gray-100 text-gray-600"}`}>
                      {post.category}
                    </span>
                  </div>
                  <h3 className="font-bold text-[#0d1b2a] mb-2 group-hover:text-[#1e6fa8] transition-colors leading-snug" style={{ fontFamily: 'DM Serif Display, Georgia, serif' }}>
                    {post.title}
                  </h3>
                  <p className="text-gray-500 text-sm mb-4 leading-relaxed line-clamp-3">{post.excerpt}</p>
                  <div className="flex items-center justify-between text-gray-400 text-xs">
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1"><Calendar size={11} />{post.date}</span>
                      <span className="flex items-center gap-1"><Clock size={11} />{post.readTime}</span>
                    </div>
                    <ArrowRight size={13} className="text-[#1e6fa8] opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-16">
              <div className="text-4xl mb-4">🔍</div>
              <h3 className="text-lg font-bold text-[#0d1b2a] mb-2">No articles found</h3>
              <p className="text-gray-400 text-sm mb-5">
                {searchQuery ? `No results for "${searchQuery}". Try a different search term.` : "No posts in this category yet — check back soon."}
              </p>
              <button
                onClick={() => { setSearchQuery(""); setActiveCategory("All"); }}
                className="btn-outline-teal text-sm py-2 px-5"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </section>

      <CTABanner />
    </PageLayout>
  );
}

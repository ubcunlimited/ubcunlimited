import { useState } from "react";
import { Link } from "wouter";
import { Calendar, Clock, Tag, ArrowRight, ChevronRight } from "lucide-react";
import PageLayout from "@/components/layout/PageLayout";
import CTABanner from "@/components/sections/CTABanner";
import { BLOG_CATEGORIES } from "@/lib/config";

const blogPosts = [
  {
    slug: "how-to-lower-credit-card-processing-fees",
    title: "How to Lower Your Credit Card Processing Fees in 2025",
    excerpt: "Most Utah businesses overpay for credit card processing. Here's a practical guide to understanding your statement and negotiating better rates.",
    category: "Payment Processing",
    date: "2025-01-15",
    readTime: "8 min read",
    featured: true,
  },
  {
    slug: "interchange-plus-vs-flat-rate-pricing",
    title: "Interchange-Plus vs. Flat-Rate Pricing: Which Is Better for Your Business?",
    excerpt: "Square and Stripe use flat-rate pricing. We use interchange-plus. Here's why the difference matters — and which one saves you more money.",
    category: "Payment Processing",
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
    category: "Payment Processing",
    date: "2025-02-10",
    readTime: "7 min read",
    featured: false,
  },
  {
    slug: "utah-small-business-payment-trends-2025",
    title: "Utah Small Business Payment Trends to Watch in 2025",
    excerpt: "From contactless payments to embedded finance, here are the payment trends shaping Utah's small business landscape this year.",
    category: "Industry News",
    date: "2025-02-18",
    readTime: "5 min read",
    featured: false,
  },
  {
    slug: "how-to-read-merchant-statement",
    title: "How to Read Your Merchant Processing Statement",
    excerpt: "Your monthly processing statement is full of fees you may not understand. This guide breaks down every line item so you know exactly what you're paying.",
    category: "Business Tips",
    date: "2025-03-01",
    readTime: "9 min read",
    featured: false,
  },
  {
    slug: "chargeback-prevention-guide",
    title: "Chargeback Prevention: A Practical Guide for Utah Merchants",
    excerpt: "Chargebacks cost U.S. merchants billions each year. Here's how to prevent them — and what to do when you get one.",
    category: "Business Tips",
    date: "2025-03-08",
    readTime: "8 min read",
    featured: false,
  },
  {
    slug: "mobile-payment-solutions-utah",
    title: "Mobile Payment Solutions for Utah's On-the-Go Businesses",
    excerpt: "Farmers markets, food trucks, trade shows — Utah's mobile businesses need reliable payment solutions. Here are the best options.",
    category: "Payment Processing",
    date: "2025-03-15",
    readTime: "6 min read",
    featured: false,
  },
  {
    slug: "restaurant-payment-processing-guide",
    title: "The Restaurant Owner's Guide to Payment Processing",
    excerpt: "Restaurant payment processing has unique challenges — tips, split checks, online ordering. Here's how to optimize your setup.",
    category: "Industry News",
    date: "2025-03-22",
    readTime: "7 min read",
    featured: false,
  },
  {
    slug: "pci-compliance-guide-small-business",
    title: "PCI Compliance: What Utah Small Businesses Need to Know",
    excerpt: "PCI DSS compliance isn't optional — but it doesn't have to be complicated. Here's a plain-English guide for small business owners.",
    category: "Business Tips",
    date: "2025-04-01",
    readTime: "8 min read",
    featured: false,
  },
];

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const categories = ["All", ...BLOG_CATEGORIES];

  const filtered = activeCategory === "All"
    ? blogPosts
    : blogPosts.filter((p) => p.category === activeCategory);

  const featured = blogPosts.find((p) => p.featured);
  const rest = filtered.filter((p) => !p.featured);

  return (
    <PageLayout>
      <section className="bg-[#040c1c] py-16">
        <div className="container">
          <div className="max-w-xl">
            <div className="stat-badge mb-4">UBC Unlimited Blog</div>
            <h1 className="text-4xl font-extrabold text-white mb-4" style={{ fontFamily: 'Sora, sans-serif' }}>
              Merchant Services Insights for Utah Businesses
            </h1>
            <p className="text-white/60 text-lg">
              Practical guides, industry news, and expert tips to help you accept payments smarter.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="container">
          {/* Featured Post */}
          {featured && activeCategory === "All" && (
            <Link href={`/blog/${featured.slug}`} className="group block mb-10 rounded-2xl border border-gray-100 hover:border-[#169fa8]/30 hover:shadow-xl transition-all overflow-hidden bg-gradient-to-br from-[#040c1c] to-[#0f2040] p-8 md:p-10">
              <div className="flex items-center gap-2 mb-4">
                <span className="bg-[#d4a843] text-[#040c1c] text-xs font-bold px-2.5 py-1 rounded-full">Featured</span>
                <span className="text-[#169fa8] text-xs font-medium">{featured.category}</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-3 group-hover:text-[#169fa8] transition-colors" style={{ fontFamily: 'Sora, sans-serif' }}>
                {featured.title}
              </h2>
              <p className="text-white/60 mb-5 leading-relaxed max-w-2xl">{featured.excerpt}</p>
              <div className="flex items-center gap-4 text-white/40 text-xs">
                <span className="flex items-center gap-1"><Calendar size={12} />{featured.date}</span>
                <span className="flex items-center gap-1"><Clock size={12} />{featured.readTime}</span>
                <span className="flex items-center gap-1 text-[#169fa8] font-medium ml-auto">Read article <ArrowRight size={13} /></span>
              </div>
            </Link>
          )}

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 mb-8">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                  activeCategory === cat
                    ? "bg-[#169fa8] text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Post Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rest.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group block rounded-xl border border-gray-100 hover:border-[#169fa8]/30 hover:shadow-lg transition-all overflow-hidden bg-white"
              >
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <Tag size={11} className="text-[#169fa8]" />
                    <span className="text-[#169fa8] text-xs font-medium">{post.category}</span>
                  </div>
                  <h3 className="font-bold text-[#040c1c] mb-2 group-hover:text-[#169fa8] transition-colors leading-snug" style={{ fontFamily: 'Sora, sans-serif' }}>
                    {post.title}
                  </h3>
                  <p className="text-gray-500 text-sm mb-4 leading-relaxed line-clamp-3">{post.excerpt}</p>
                  <div className="flex items-center gap-3 text-gray-400 text-xs">
                    <span className="flex items-center gap-1"><Calendar size={11} />{post.date}</span>
                    <span className="flex items-center gap-1"><Clock size={11} />{post.readTime}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-12 text-gray-400">No posts in this category yet.</div>
          )}
        </div>
      </section>

      <CTABanner />
    </PageLayout>
  );
}

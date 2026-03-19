// Design: UBC Unlimited — deep navy / steel-blue / copper accent palette, Sora + DM Serif Display
// Blog listing page — post metadata now lives in @/lib/blogData.ts (shared with BlogPost related articles)

import { useState, useMemo } from "react";
import { Link } from "wouter";
import { Calendar, Clock, Tag, ArrowRight, Search, X } from "lucide-react";
import PageLayout from "@/components/layout/PageLayout";
import SEO from "@/components/SEO";
import CTABanner from "@/components/sections/CTABanner";
import { blogPosts } from "@/lib/blogData";

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
        description="Expert articles on credit card processing, POS systems, payment gateways, cash discounting, surcharging, and merchant services tips for Utah business owners."
        canonical="/blog"
      />

      {/* Hero */}
      <section className="bg-[#0d1b2a] py-16">
        <div className="container">
          <div className="max-w-2xl">
            <div className="stat-badge mb-4">News &amp; Updates</div>
            <h1
              className="text-4xl font-extrabold text-white mb-4"
              style={{ fontFamily: "DM Serif Display, Georgia, serif" }}
            >
              Merchant Services Insights<br />for Utah Businesses
            </h1>
            <p className="text-white/60 text-lg">
              Practical guides, industry news, and expert tips from{" "}
              <span className="text-[#1e6fa8] font-medium">UBC Unlimited</span> — Utah's local merchant services experts.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="container">
          {/* Search + Filter Bar */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-1 max-w-sm">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" aria-hidden="true" />
              <label htmlFor="blog-search" className="sr-only">Search articles</label>
              <input
                id="blog-search"
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search articles..."
                className="w-full pl-9 pr-9 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#1e6fa8] focus:ring-2 focus:ring-[#1e6fa8]/20 transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  aria-label="Clear search"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X size={14} aria-hidden="true" />
                </button>
              )}
            </div>

            {/* Category Pills */}
            <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by category">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  aria-pressed={activeCategory === cat}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1e6fa8] ${
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
              className="group block mb-10 rounded-2xl border border-gray-100 hover:border-[#1e6fa8]/30 hover:shadow-xl transition-all overflow-hidden bg-gradient-to-br from-[#0d1b2a] to-[#152234] p-8 md:p-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1e6fa8]"
            >
              <div className="flex items-center gap-2 mb-4">
                <span className="bg-[#c47c2b] text-white text-xs font-bold px-2.5 py-1 rounded-full">Featured</span>
                <span className="text-[#1e6fa8] text-xs font-medium">{featured.category}</span>
              </div>
              <h2
                className="text-2xl md:text-3xl font-bold text-white mb-3 group-hover:text-[#1e6fa8] transition-colors"
                style={{ fontFamily: "DM Serif Display, Georgia, serif" }}
              >
                {featured.title}
              </h2>
              <p className="text-white/60 mb-5 leading-relaxed max-w-2xl">{featured.excerpt}</p>
              <div className="flex items-center gap-4 text-white/40 text-xs">
                <span className="flex items-center gap-1"><Calendar size={12} aria-hidden="true" />{featured.date}</span>
                <span className="flex items-center gap-1"><Clock size={12} aria-hidden="true" />{featured.readTime}</span>
                <span className="flex items-center gap-1 text-[#1e6fa8] font-medium ml-auto">
                  Read article <ArrowRight size={13} aria-hidden="true" />
                </span>
              </div>
            </Link>
          )}

          {/* Search Results Info */}
          {searchQuery.trim() && (
            <div className="mb-6 text-sm text-gray-500" role="status" aria-live="polite">
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
                className="group block rounded-xl border border-gray-100 hover:border-[#1e6fa8]/30 hover:shadow-lg transition-all overflow-hidden bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1e6fa8]"
              >
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <Tag size={11} className="text-[#1e6fa8]" aria-hidden="true" />
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${categoryColors[post.category] || "bg-gray-100 text-gray-600"}`}>
                      {post.category}
                    </span>
                  </div>
                  <h3
                    className="font-bold text-[#0d1b2a] mb-2 group-hover:text-[#1e6fa8] transition-colors leading-snug"
                    style={{ fontFamily: "DM Serif Display, Georgia, serif" }}
                  >
                    {post.title}
                  </h3>
                  <p className="text-gray-500 text-sm mb-4 leading-relaxed line-clamp-3">{post.excerpt}</p>
                  <div className="flex items-center justify-between text-gray-400 text-xs">
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1"><Calendar size={11} aria-hidden="true" />{post.date}</span>
                      <span className="flex items-center gap-1"><Clock size={11} aria-hidden="true" />{post.readTime}</span>
                    </div>
                    <ArrowRight size={13} className="text-[#1e6fa8] opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden="true" />
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-16">
              <div className="text-4xl mb-4" aria-hidden="true">🔍</div>
              <h3 className="text-lg font-bold text-[#0d1b2a] mb-2">No articles found</h3>
              <p className="text-gray-400 text-sm mb-5">
                {searchQuery
                  ? `No results for "${searchQuery}". Try a different search term.`
                  : "No posts in this category yet — check back soon."}
              </p>
              <button
                onClick={() => { setSearchQuery(""); setActiveCategory("All"); }}
                className="btn-outline-teal text-sm py-2 px-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1e6fa8]"
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

// Design: UBC Unlimited — deep navy / steel-blue / copper accent palette, Sora + DM Serif Display
// Blog listing page — two-column layout with sidebar (categories, archive, sort)

import { useState, useMemo } from "react";
import { Link } from "wouter";
import { Calendar, Clock, Tag, ArrowRight, Search, X, ChevronDown, ChevronRight, SortAsc } from "lucide-react";
import PageLayout from "@/components/layout/PageLayout";
import SEO from "@/components/SEO";
import CTABanner from "@/components/sections/CTABanner";
import BlogLeadCapture from "@/components/BlogLeadCapture";
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
  "High-Risk Processing",
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
  "High-Risk Processing": "bg-rose-50 text-rose-700",
  "News & Updates": "bg-sky-50 text-sky-700",
};

/** Parse "YYYY-MM-DD" → Date (UTC noon to avoid timezone edge cases) */
function parseDate(dateStr: string): Date {
  const [y, m, d] = dateStr.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d, 12));
}

/** Format "YYYY-MM-DD" → "January 15, 2025" */
function formatDate(dateStr: string): string {
  return parseDate(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

/** Format "YYYY-MM-DD" → "January 2025" (for archive labels) */
function formatMonthYear(dateStr: string): string {
  return parseDate(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    timeZone: "UTC",
  });
}

/** "YYYY-MM-DD" → "YYYY-MM" key */
function monthKey(dateStr: string): string {
  return dateStr.slice(0, 7);
}

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");
  const [activeMonth, setActiveMonth] = useState<string | null>(null);
  const [archiveOpen, setArchiveOpen] = useState<boolean>(true);

  // Build archive map: { "2025-01": { label: "January 2025", count: 2 }, ... }
  const archiveMap = useMemo(() => {
    const map: Record<string, { label: string; count: number }> = {};
    blogPosts.forEach((p) => {
      const key = monthKey(p.date);
      if (!map[key]) {
        map[key] = { label: formatMonthYear(p.date), count: 0 };
      }
      map[key].count++;
    });
    // Sort keys descending
    return Object.entries(map)
      .sort(([a], [b]) => b.localeCompare(a))
      .map(([key, val]) => ({ key, ...val }));
  }, []);

  // Category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { All: blogPosts.length };
    blogPosts.forEach((p) => {
      counts[p.category] = (counts[p.category] || 0) + 1;
    });
    return counts;
  }, []);

  const filtered = useMemo(() => {
    let posts = [...blogPosts];

    if (activeCategory !== "All") {
      posts = posts.filter((p) => p.category === activeCategory);
    }
    if (activeMonth) {
      posts = posts.filter((p) => monthKey(p.date) === activeMonth);
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

    // Sort
    posts.sort((a, b) => {
      const diff = parseDate(b.date).getTime() - parseDate(a.date).getTime();
      return sortOrder === "newest" ? diff : -diff;
    });

    return posts;
  }, [activeCategory, searchQuery, sortOrder, activeMonth]);

  const isFiltered = activeCategory !== "All" || !!activeMonth || !!searchQuery.trim();
  const featured = !isFiltered ? blogPosts.find((p) => p.featured) : null;
  const mainPosts = featured ? filtered.filter((p) => p.slug !== featured.slug) : filtered;

  function clearAll() {
    setSearchQuery("");
    setActiveCategory("All");
    setActiveMonth(null);
    setSortOrder("newest");
  }

  return (
    <PageLayout>
      <SEO
        title="Merchant Services Blog | UBC Unlimited"
        description="Expert articles on credit card processing, POS systems, payment gateways, cash discount & dual pricing, surcharging, and merchant services tips for Utah business owners."
        canonical="/blog"
      />

      {/* Hero */}
      <section className="bg-[#080808] py-10 sm:py-16">
        <div className="container">
          <div className="max-w-2xl">
            <div className="stat-badge mb-4">News &amp; Updates</div>
            <h1
              className="text-2xl sm:text-4xl font-extrabold text-white mb-4"
              style={{ fontFamily: "DM Serif Display, Georgia, serif" }}
            >
              Merchant Services Insights<br />for Utah Businesses
            </h1>
            <p className="text-white/60 text-sm sm:text-lg">
              Practical guides, industry news, and expert tips from{" "}
              <span className="text-[#c9a84c] font-medium">UBC Unlimited</span> — Utah's local merchant services experts.
            </p>
          </div>
        </div>
      </section>

      <section className="py-8 sm:py-12 bg-white">
        <div className="container">
          {/* Search + Sort Bar */}
          <div className="flex flex-col sm:flex-row gap-3 mb-8">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600" aria-hidden="true" />
              <label htmlFor="blog-search" className="sr-only">Search articles</label>
              <input
                id="blog-search"
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search articles..."
                className="w-full pl-9 pr-9 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#c9a84c] focus:ring-2 focus:ring-[#c9a84c]/20 transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  aria-label="Clear search"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-600"
                >
                  <X size={14} aria-hidden="true" />
                </button>
              )}
            </div>

            {/* Sort */}
            <div className="flex items-center gap-2">
              <SortAsc size={15} className="text-gray-600 shrink-0" aria-hidden="true" />
              <label htmlFor="blog-sort" className="sr-only">Sort articles</label>
              <select
                id="blog-sort"
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value as "newest" | "oldest")}
                className="border border-gray-200 rounded-lg text-sm py-2.5 px-3 focus:outline-none focus:border-[#c9a84c] focus:ring-2 focus:ring-[#c9a84c]/20 transition-all bg-white text-gray-700 cursor-pointer"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
              </select>
            </div>

            {/* Clear all filters */}
            {isFiltered && (
              <button
                onClick={clearAll}
                className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-[#c9a84c] transition-colors px-3 py-2.5 border border-gray-200 rounded-lg hover:border-[#c9a84c]/40"
              >
                <X size={13} aria-hidden="true" />
                Clear filters
              </button>
            )}
          </div>

          {/* Two-column layout */}
          <div className="flex flex-col lg:flex-row gap-10">
            {/* ── Main content ── */}
            <div className="flex-1 min-w-0">
              {/* Active filter indicator */}
              {isFiltered && (
                <div className="mb-5 text-sm text-gray-600" role="status" aria-live="polite">
                  {filtered.length > 0 ? (
                    <>
                      Showing <strong className="text-[#080808]">{filtered.length}</strong> article{filtered.length !== 1 ? "s" : ""}
                      {activeCategory !== "All" && <> in <strong className="text-[#c9a84c]">{activeCategory}</strong></>}
                      {activeMonth && <> from <strong className="text-[#c9a84c]">{archiveMap.find((a) => a.key === activeMonth)?.label}</strong></>}
                      {searchQuery.trim() && <> matching <strong className="text-[#c9a84c]">"{searchQuery}"</strong></>}
                    </>
                  ) : (
                    "No articles match your filters."
                  )}
                </div>
              )}

              {/* Featured Post (only when no filters active) */}
              {featured && (
                <Link
                  href={`/blog/${featured.slug}`}
                  className="group block mb-8 rounded-2xl border border-gray-100 hover:border-[#c9a84c]/30 hover:shadow-xl transition-all overflow-hidden bg-gradient-to-br from-[#080808] to-[#111111] p-5 sm:p-7 md:p-9 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a84c]"
                >
                  <div className="flex items-center gap-2 mb-4">
                    <span className="bg-[#c9a84c] text-white text-xs font-bold px-2.5 py-1 rounded-full">Featured</span>
                    <span className="text-[#c9a84c] text-xs font-medium">{featured.category}</span>
                  </div>
                  <h2
                    className="text-2xl md:text-3xl font-bold text-white mb-3 group-hover:text-[#c9a84c] transition-colors"
                    style={{ fontFamily: "DM Serif Display, Georgia, serif" }}
                  >
                    {featured.title}
                  </h2>
                  <p className="text-white/60 mb-5 leading-relaxed max-w-2xl">{featured.excerpt}</p>
                  <div className="flex items-center gap-4 text-white/70 text-xs">
                    <span className="flex items-center gap-1"><Calendar size={12} aria-hidden="true" />{formatDate(featured.date)}</span>
                    <span className="flex items-center gap-1"><Clock size={12} aria-hidden="true" />{featured.readTime}</span>
                    <span className="flex items-center gap-1 text-[#c9a84c] font-medium ml-auto">
                      Read article <ArrowRight size={13} aria-hidden="true" />
                    </span>
                  </div>
                </Link>
              )}

              {/* Post Grid */}
              {mainPosts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {mainPosts.map((post) => (
                    <Link
                      key={post.slug}
                      href={`/blog/${post.slug}`}
                      className="group block rounded-xl border border-gray-100 hover:border-[#c9a84c]/30 hover:shadow-lg transition-all overflow-hidden bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a84c]"
                    >
                      <div className="p-5">
                        <div className="flex items-center gap-2 mb-3">
                          <Tag size={11} className="text-[#c9a84c]" aria-hidden="true" />
                          <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${categoryColors[post.category] || "bg-gray-100 text-gray-600"}`}>
                            {post.category}
                          </span>
                        </div>
                        <h3
                          className="font-bold text-[#080808] mb-2 group-hover:text-[#c9a84c] transition-colors leading-snug"
                          style={{ fontFamily: "DM Serif Display, Georgia, serif" }}
                        >
                          {post.title}
                        </h3>
                        <p className="text-gray-600 text-sm mb-4 leading-relaxed line-clamp-3">{post.excerpt}</p>
                        <div className="flex items-center justify-between text-gray-600 text-xs">
                          <div className="flex items-center gap-3">
                            <span className="flex items-center gap-1"><Calendar size={11} aria-hidden="true" />{formatDate(post.date)}</span>
                            <span className="flex items-center gap-1"><Clock size={11} aria-hidden="true" />{post.readTime}</span>
                          </div>
                          <ArrowRight size={13} className="text-[#c9a84c] opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden="true" />
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : !featured ? (
                <div className="text-center py-16">
                  <div className="text-4xl mb-4" aria-hidden="true">🔍</div>
                  <h3 className="text-lg font-bold text-[#080808] mb-2">No articles found</h3>
                  <p className="text-gray-600 text-sm mb-5">
                    {searchQuery
                      ? `No results for "${searchQuery}". Try a different search term.`
                      : "No posts match the selected filters — check back soon."}
                  </p>
                  <button
                    onClick={clearAll}
                    className="btn-outline-teal text-sm py-2 px-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a84c]"
                  >
                    Clear Filters
                  </button>
                </div>
              ) : null}
            </div>

            {/* ── Sidebar ── */}
            <aside className="lg:w-72 shrink-0 space-y-6">
              {/* Categories */}
              <div className="rounded-xl border border-gray-100 overflow-hidden">
                <div className="bg-[#080808] px-5 py-3">
                  <h2 className="text-sm font-bold text-white uppercase tracking-wider">Categories</h2>
                </div>
                <div className="p-3">
                  {["All", ...BLOG_CATEGORIES].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => { setActiveCategory(cat); setActiveMonth(null); }}
                      aria-pressed={activeCategory === cat && !activeMonth}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-all text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a84c] ${
                        activeCategory === cat && !activeMonth
                          ? "bg-[#c9a84c]/10 text-[#c9a84c] font-semibold"
                          : "text-gray-600 hover:bg-gray-50 hover:text-[#080808]"
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        {activeCategory === cat && !activeMonth && (
                          <ChevronRight size={13} className="text-[#c9a84c]" aria-hidden="true" />
                        )}
                        {cat}
                      </span>
                      <span className={`text-xs px-1.5 py-0.5 rounded-full font-medium ${
                        activeCategory === cat && !activeMonth
                          ? "bg-[#c9a84c] text-white"
                          : "bg-gray-100 text-gray-600"
                      }`}>
                        {categoryCounts[cat] ?? 0}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Archive */}
              <div className="rounded-xl border border-gray-100 overflow-hidden">
                <button
                  onClick={() => setArchiveOpen((o) => !o)}
                  className="w-full flex items-center justify-between bg-[#080808] px-5 py-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a84c]"
                  aria-expanded={archiveOpen}
                >
                  <h2 className="text-sm font-bold text-white uppercase tracking-wider">Archive</h2>
                  <ChevronDown
                    size={15}
                    className={`text-white/60 transition-transform duration-200 ${archiveOpen ? "rotate-180" : ""}`}
                    aria-hidden="true"
                  />
                </button>
                {archiveOpen && (
                  <div className="p-3">
                    {archiveMap.map(({ key, label, count }) => (
                      <button
                        key={key}
                        onClick={() => { setActiveMonth(activeMonth === key ? null : key); setActiveCategory("All"); }}
                        aria-pressed={activeMonth === key}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-all text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a84c] ${
                          activeMonth === key
                            ? "bg-[#c9a84c]/10 text-[#c9a84c] font-semibold"
                            : "text-gray-600 hover:bg-gray-50 hover:text-[#080808]"
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          {activeMonth === key && (
                            <ChevronRight size={13} className="text-[#c9a84c]" aria-hidden="true" />
                          )}
                          {label}
                        </span>
                        <span className={`text-xs px-1.5 py-0.5 rounded-full font-medium ${
                          activeMonth === key
                            ? "bg-[#c9a84c] text-white"
                            : "bg-gray-100 text-gray-600"
                        }`}>
                          {count}
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Email Capture */}
              <BlogLeadCapture />

              {/* CTA Card */}
              <div className="rounded-xl bg-gradient-to-br from-[#080808] to-[#1a1a1a] p-5 border border-[#c9a84c]/20">
                <h3
                  className="text-white font-bold mb-2 text-base"
                  style={{ fontFamily: "DM Serif Display, Georgia, serif" }}
                >
                  Ready to Lower Your Processing Costs?
                </h3>
                <p className="text-white/60 text-sm mb-4 leading-relaxed">
                  Get a free statement review from Utah's local merchant services experts.
                </p>
                <Link
                  href="/consultation"
                  className="block w-full text-center bg-[#c9a84c] hover:bg-[#b8963e] text-white text-sm font-semibold py-2.5 px-4 rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a84c]"
                >
                  Request a Consultation
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <CTABanner />
    </PageLayout>
  );
}

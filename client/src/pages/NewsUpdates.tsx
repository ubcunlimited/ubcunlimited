import { useState, useMemo } from "react";
import { Link } from "wouter";
import { Calendar, Clock, ArrowRight, Search, X, Newspaper, Rss, Bell } from "lucide-react";
import PageLayout from "@/components/layout/PageLayout";
import SEO from "@/components/SEO";
import CTABanner from "@/components/sections/CTABanner";
import { blogPosts, type BlogPostMeta } from "@/lib/blogData";

// News & Updates page — shows all posts, with News & Updates category featured at top,
// plus company announcements and industry news sections.

const categoryColors: Record<string, string> = {
  "Credit Card Processing": "bg-blue-50 text-blue-700",
  "POS Systems": "bg-purple-50 text-purple-700",
  "ACH Payments": "bg-green-50 text-green-700",
  "eCommerce Payments": "bg-orange-50 text-orange-700",
  "Industry Guides": "bg-teal-50 text-teal-700",
  "Pricing & Fees": "bg-amber-50 text-amber-700",
  "Compliance & Security": "bg-red-50 text-red-700",
  "Business Growth": "bg-emerald-50 text-emerald-700",
  "News & Updates": "bg-[#c9a84c]/10 text-[#8a6d1e]",
  "High-Risk Processing": "bg-rose-50 text-rose-700",
};

const companyAnnouncements = [
  {
    date: "March 2026",
    title: "UBC Unlimited Now Serving All 29 Utah Counties",
    body: "We've expanded our local support coverage to include rural Utah communities. Businesses in Carbon, Emery, Grand, and San Juan counties can now access the same dedicated local rep service as our Wasatch Front clients.",
    tag: "Company News",
  },
  {
    date: "February 2026",
    title: "SkyTab POS Now Available with Same-Day Installation in Salt Lake Valley",
    body: "We've added two additional certified SkyTab installation technicians to our Salt Lake Valley team. Most restaurant and bar installations can now be completed same-day or next-day after approval.",
    tag: "Product Update",
  },
  {
    date: "January 2026",
    title: "New: Statement Review Now Available Online",
    body: "Our statement review is now available directly through the website. Upload your current processing statement securely and receive a line-by-line savings analysis within one business day — no phone call required to get started.",
    tag: "Feature Launch",
  },
  {
    date: "December 2025",
    title: "UBC Unlimited Joins the Utah Retail Merchants Association",
    body: "We're proud to join the Utah Retail Merchants Association as an associate member. This partnership gives our retail clients access to group resources, advocacy, and networking events across the state.",
    tag: "Partnership",
  },
];

const industryNews = [
  {
    date: "March 2026",
    headline: "Visa & Mastercard Interchange Rates Updated for 2026",
    summary: "Both networks published their annual interchange schedule updates effective April 2026. Key changes affect e-commerce card-not-present rates and commercial card categories. UBC Unlimited clients on interchange-plus pricing will see these changes reflected automatically.",
  },
  {
    date: "February 2026",
    headline: "FTC Issues New Guidance on Cash Discount Program Disclosures",
    summary: "The FTC clarified disclosure requirements for businesses using cash discount and dual pricing programs. All signage must clearly state the cash price and the card price at the point of sale. UBC Unlimited clients are already compliant under our standard implementation.",
  },
  {
    date: "January 2026",
    headline: "Same-Day ACH Volume Grew 16.7% in 2025",
    summary: "Nacha reported that Same-Day ACH processed 1.3 billion transactions in 2025, up 16.7% year-over-year. For Utah businesses with large or recurring payments, ACH remains one of the most cost-effective payment methods available.",
  },
  {
    date: "December 2025",
    headline: "Chargeback Rates Rising in eCommerce — What Merchants Need to Know",
    summary: "Industry data shows eCommerce chargeback rates increased 23% in 2025, driven by friendly fraud and subscription billing disputes. High-risk businesses and online sellers should review their chargeback prevention protocols heading into 2026.",
  },
];

function PostCard({ post }: { post: BlogPostMeta }) {
  const colorClass = categoryColors[post.category] ?? "bg-gray-100 text-gray-600";
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group bg-white rounded-xl border border-gray-100 hover:border-[#c9a84c]/30 hover:shadow-lg transition-all p-5 flex flex-col"
    >
      <div className="flex items-center gap-2 mb-3">
        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${colorClass}`}>
          {post.category}
        </span>
      </div>
      <h3 className="font-bold text-[#080808] text-sm leading-snug mb-2 group-hover:text-[#c9a84c] transition-colors flex-1">
        {post.title}
      </h3>
      <p className="text-xs text-gray-500 leading-relaxed mb-4 line-clamp-3">{post.excerpt}</p>
      <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-50">
        <div className="flex items-center gap-3 text-xs text-gray-400">
          <span className="flex items-center gap-1">
            <Calendar size={11} />
            {new Date(post.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
          </span>
          <span className="flex items-center gap-1">
            <Clock size={11} />
            {post.readTime}
          </span>
        </div>
        <span className="flex items-center gap-1 text-xs text-[#c9a84c] font-medium opacity-0 group-hover:opacity-100 transition-opacity">
          Read <ArrowRight size={11} />
        </span>
      </div>
    </Link>
  );
}

export default function NewsUpdates() {
  const [search, setSearch] = useState("");

  const newsAndUpdatesPosts = useMemo(
    () => blogPosts.filter((p) => p.category === "News & Updates"),
    []
  );

  const recentPosts = useMemo(
    () =>
      [...blogPosts]
        .filter((p) => p.category !== "News & Updates")
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, 6),
    []
  );

  const searchResults = useMemo(() => {
    if (!search.trim()) return [];
    const q = search.toLowerCase();
    return blogPosts.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.excerpt.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
    );
  }, [search]);

  return (
    <PageLayout>
      <SEO
        canonical="/news"
        description="Stay current with UBC Unlimited news, company announcements, industry updates, and expert insights for Utah merchants and payment processing professionals."
        title="News & Updates"
      />

      {/* Hero */}
      <section className="bg-[#080808] pt-16 pb-12">
        <div className="container">
          <div className="max-w-2xl">
            <div className="teal-divider mb-5" />
            <h1
              className="text-4xl md:text-5xl font-extrabold text-white mb-4 leading-tight"
              style={{ fontFamily: "DM Serif Display, Georgia, serif" }}
            >
              News &amp; Updates
            </h1>
            <p className="text-white/60 text-base leading-relaxed mb-6">
              Company announcements, industry news, and expert insights — everything Utah merchants need to stay ahead in payment processing.
            </p>
            {/* Search */}
            <div className="relative max-w-md">
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30" />
              <input
                type="text"
                placeholder="Search articles..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-white/10 border border-white/15 rounded-xl pl-10 pr-10 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#c9a84c]/50 transition-colors"
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60"
                >
                  <X size={14} />
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Search results */}
      {search.trim() && (
        <section className="py-10 bg-[#f7f3ec]">
          <div className="container">
            <h2 className="font-bold text-[#080808] mb-5 text-sm">
              {searchResults.length} result{searchResults.length !== 1 ? "s" : ""} for "{search}"
            </h2>
            {searchResults.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {searchResults.map((p) => (
                  <PostCard key={p.slug} post={p} />
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-sm">No articles matched your search. Try a different term or browse the sections below.</p>
            )}
          </div>
        </section>
      )}

      {!search.trim() && (
        <>
          {/* Company Announcements */}
          <section className="py-14 bg-white">
            <div className="container">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-9 h-9 rounded-xl bg-[#c9a84c]/10 flex items-center justify-center">
                  <Bell size={18} className="text-[#c9a84c]" />
                </div>
                <div>
                  <h2
                    className="text-2xl font-bold text-[#080808]"
                    style={{ fontFamily: "DM Serif Display, Georgia, serif" }}
                  >
                    Company Announcements
                  </h2>
                  <p className="text-gray-400 text-xs">Updates from the UBC Unlimited team</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {companyAnnouncements.map((item) => (
                  <div
                    key={item.title}
                    className="rounded-xl border border-gray-100 hover:border-[#c9a84c]/20 hover:shadow-md transition-all p-6"
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[#c9a84c]/10 text-[#8a6d1e]">
                        {item.tag}
                      </span>
                      <span className="text-xs text-gray-400">{item.date}</span>
                    </div>
                    <h3 className="font-bold text-[#080808] text-sm mb-2 leading-snug">{item.title}</h3>
                    <p className="text-xs text-gray-500 leading-relaxed">{item.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Industry News */}
          <section className="py-14 bg-[#f7f3ec]">
            <div className="container">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-9 h-9 rounded-xl bg-[#2a7a6f]/10 flex items-center justify-center">
                  <Newspaper size={18} className="text-[#2a7a6f]" />
                </div>
                <div>
                  <h2
                    className="text-2xl font-bold text-[#080808]"
                    style={{ fontFamily: "DM Serif Display, Georgia, serif" }}
                  >
                    Industry News
                  </h2>
                  <p className="text-gray-400 text-xs">Payment processing &amp; merchant services updates</p>
                </div>
              </div>
              <div className="space-y-4">
                {industryNews.map((item) => (
                  <div
                    key={item.headline}
                    className="bg-white rounded-xl border border-gray-100 p-5 flex gap-4 hover:border-[#c9a84c]/20 hover:shadow-sm transition-all"
                  >
                    <div className="w-1 rounded-full bg-[#c9a84c]/40 shrink-0" />
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs text-gray-400">{item.date}</span>
                      </div>
                      <h3 className="font-bold text-[#080808] text-sm mb-1.5">{item.headline}</h3>
                      <p className="text-xs text-gray-500 leading-relaxed">{item.summary}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* News & Updates Blog Posts */}
          {newsAndUpdatesPosts.length > 0 && (
            <section className="py-14 bg-white">
              <div className="container">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-[#c9a84c]/10 flex items-center justify-center">
                      <Rss size={18} className="text-[#c9a84c]" />
                    </div>
                    <div>
                      <h2
                        className="text-2xl font-bold text-[#080808]"
                        style={{ fontFamily: "DM Serif Display, Georgia, serif" }}
                      >
                        News &amp; Updates Articles
                      </h2>
                      <p className="text-gray-400 text-xs">In-depth coverage for Utah merchants</p>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  {newsAndUpdatesPosts.map((p) => (
                    <PostCard key={p.slug} post={p} />
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* Recent Expert Articles */}
          <section className="py-14 bg-[#f7f3ec]">
            <div className="container">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2
                    className="text-2xl font-bold text-[#080808]"
                    style={{ fontFamily: "DM Serif Display, Georgia, serif" }}
                  >
                    Recent Expert Articles
                  </h2>
                  <p className="text-gray-400 text-xs mt-0.5">Guides &amp; insights from the UBC Unlimited team</p>
                </div>
                <Link
                  href="/blog"
                  className="hidden sm:flex items-center gap-1 text-[#c9a84c] text-sm font-medium hover:underline"
                >
                  View all articles <ArrowRight size={14} />
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {recentPosts.map((p) => (
                  <PostCard key={p.slug} post={p} />
                ))}
              </div>
              <div className="text-center mt-8 sm:hidden">
                <Link href="/blog" className="btn-outline-teal text-sm py-2.5 px-6">
                  View All Articles <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </section>
        </>
      )}

      <CTABanner />
    </PageLayout>
  );
}

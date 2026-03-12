import { ReactNode } from "react";
import { Link } from "wouter";
import { Calendar, Clock, Tag, ChevronRight, ArrowLeft } from "lucide-react";
import PageLayout from "@/components/layout/PageLayout";
import CTABanner from "@/components/sections/CTABanner";

const posts: Record<string, { title: string; category: string; date: string; readTime: string; content: string }> = {
  "how-to-lower-credit-card-processing-fees": {
    title: "How to Lower Your Credit Card Processing Fees in 2025",
    category: "Payment Processing",
    date: "2025-01-15",
    readTime: "8 min read",
    content: `
Most Utah businesses are overpaying for credit card processing — often by 20–40% more than they should. The good news? With the right knowledge and the right partner, you can significantly reduce what you pay.

## Understanding Your Processing Fees

Your monthly processing statement contains several types of fees:

**Interchange fees** are set by Visa, Mastercard, and other card networks. These are non-negotiable — every processor pays them. They typically range from 1.5% to 2.5% depending on the card type.

**Processor markup** is what your payment processor charges on top of interchange. This is where the biggest savings opportunity lies.

**Monthly fees** include gateway fees, statement fees, PCI compliance fees, and sometimes "junk fees" with vague names.

## The Two Main Pricing Models

**Flat-rate pricing** (used by Square, Stripe, PayPal) charges a single percentage for all transactions — typically 2.6% + $0.10. Simple, but expensive for most businesses.

**Interchange-plus pricing** passes the actual interchange cost to you and adds a fixed markup. For most businesses processing over $5,000/month, this is significantly cheaper.

## 5 Ways to Lower Your Processing Costs

1. **Switch to interchange-plus pricing.** If you're on flat-rate, this is the single biggest change you can make.

2. **Eliminate junk fees.** Review your statement for fees like "regulatory compliance fees," "network access fees," or "statement fees." Many of these are negotiable or avoidable.

3. **Encourage debit card payments.** Debit cards have lower interchange rates than credit cards. A simple "debit preferred" sign can reduce your average rate.

4. **Batch your transactions daily.** Transactions that aren't batched within 24 hours often incur higher interchange rates.

5. **Get a free statement review.** A qualified merchant services provider can analyze your current statement and show you exactly where you're overpaying.

## The Bottom Line

The average Utah business we work with saves $300–$500 per month after switching to UBC Unlimited. That's $3,600–$6,000 per year that goes back into your business.

Ready to see how much you can save? [Request a free statement review](/statement-review) — no obligation, no pressure.
    `,
  },
  "interchange-plus-vs-flat-rate-pricing": {
    title: "Interchange-Plus vs. Flat-Rate Pricing: Which Is Better for Your Business?",
    category: "Payment Processing",
    date: "2025-01-22",
    readTime: "6 min read",
    content: `
When it comes to credit card processing, the pricing model you choose can make a significant difference in your monthly costs. The two most common models are interchange-plus and flat-rate pricing — and they're not created equal.

## What Is Flat-Rate Pricing?

Flat-rate pricing charges a single percentage for all transactions, regardless of card type. Square charges 2.6% + $0.10 for in-person transactions. Stripe charges 2.9% + $0.30 for online transactions.

**Pros:** Simple to understand, predictable monthly costs.
**Cons:** Expensive for most businesses, especially those with higher volumes.

## What Is Interchange-Plus Pricing?

Interchange-plus pricing separates the card network's interchange fee from the processor's markup. You pay the actual interchange rate (which varies by card type) plus a fixed markup.

For example: Interchange (1.8%) + Markup (0.2% + $0.10) = Your total rate.

**Pros:** Transparent, lower cost for most businesses.
**Cons:** More complex to understand, rates vary by card type.

## Which Is Right for Your Business?

For businesses processing **under $3,000/month**, flat-rate pricing may be simpler and cost-competitive.

For businesses processing **over $5,000/month**, interchange-plus almost always wins. The savings compound quickly at higher volumes.

## A Real Example

A restaurant processing $50,000/month on Square pays approximately $1,300 in fees.

The same restaurant on interchange-plus pricing with UBC Unlimited typically pays $800–$900 — saving $400–$500 per month.

That's $4,800–$6,000 per year in savings.

Want to see what you'd save? [Get a free statement review](/statement-review).
    `,
  },
};

// Generic post for slugs not in our detailed list
const genericPost = {
  title: "Merchant Services Insights",
  category: "Business Tips",
  date: "2025-03-01",
  readTime: "5 min read",
  content: `
This article covers important topics in merchant services and payment processing for Utah businesses. 

At UBC Unlimited, we're committed to helping Utah businesses understand their payment options and make informed decisions. Whether you're looking to reduce processing costs, upgrade your POS system, or add new payment methods, we're here to help.

## Get Expert Advice

Our local Utah team is available to answer your questions and provide personalized recommendations for your business.

[Book a free consultation](/consultation) or [request a free statement review](/statement-review) to get started.
  `,
};

interface BlogPostPageProps {
  slug: string;
}

export default function BlogPostPage({ slug }: BlogPostPageProps) {
  const post = posts[slug] || { ...genericPost };

  // Simple markdown-to-HTML conversion for display
  const renderContent = (content: string) => {
    const lines = content.trim().split("\n");
    const elements: ReactNode[] = [];
    let i = 0;

    while (i < lines.length) {
      const line = lines[i];
      if (line.startsWith("## ")) {
        elements.push(<h2 key={i} className="text-xl font-bold text-[#040c1c] mt-8 mb-3" style={{ fontFamily: 'Sora, sans-serif' }}>{line.slice(3)}</h2>);
      } else if (line.startsWith("**") && line.endsWith("**")) {
        elements.push(<p key={i} className="font-semibold text-[#040c1c] mt-4 mb-1">{line.slice(2, -2)}</p>);
      } else if (line.startsWith("- ")) {
        const items = [];
        while (i < lines.length && lines[i].startsWith("- ")) {
          items.push(<li key={i}>{lines[i].slice(2)}</li>);
          i++;
        }
        elements.push(<ul key={`ul-${i}`} className="list-disc list-inside space-y-1 text-gray-600 text-sm my-3 ml-2">{items}</ul>);
        continue;
      } else if (line.trim() === "") {
        // skip blank lines
      } else {
        // Handle inline links [text](/href)
        const withLinks = line.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_, text, href) => {
          return `<a href="${href}" class="text-[#169fa8] font-medium hover:underline">${text}</a>`;
        });
        // Handle inline bold **text**
        const withBold = withLinks.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
        elements.push(<p key={i} className="text-gray-600 leading-relaxed text-sm mb-3" dangerouslySetInnerHTML={{ __html: withBold }} />);
      }
      i++;
    }
    return elements;
  };

  return (
    <PageLayout>
      <section className="bg-[#040c1c] py-14">
        <div className="container">
          <div className="flex items-center gap-2 text-white/40 text-sm mb-5">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight size={14} />
            <Link href="/blog" className="hover:text-white transition-colors">Blog</Link>
            <ChevronRight size={14} />
            <span className="text-white/70 truncate max-w-xs">{post.title}</span>
          </div>
          <div className="flex items-center gap-3 mb-4">
            <Tag size={13} className="text-[#169fa8]" />
            <span className="text-[#169fa8] text-sm font-medium">{post.category}</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-4 max-w-2xl" style={{ fontFamily: 'Sora, sans-serif' }}>
            {post.title}
          </h1>
          <div className="flex items-center gap-4 text-white/40 text-xs">
            <span className="flex items-center gap-1"><Calendar size={12} />{post.date}</span>
            <span className="flex items-center gap-1"><Clock size={12} />{post.readTime}</span>
          </div>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="container">
          <div className="grid lg:grid-cols-3 gap-10">
            {/* Main content */}
            <div className="lg:col-span-2">
              <Link href="/blog" className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-[#169fa8] transition-colors mb-6">
                <ArrowLeft size={14} /> Back to Blog
              </Link>
              <div className="prose-content">
                {renderContent(post.content)}
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-5">
              <div className="bg-gradient-to-br from-[#040c1c] to-[#0f2040] rounded-2xl p-6 text-white">
                <h3 className="font-bold mb-2" style={{ fontFamily: 'Sora, sans-serif' }}>Free Statement Review</h3>
                <p className="text-white/60 text-sm mb-4">See exactly how much you can save. No obligation.</p>
                <Link href="/statement-review" className="btn-teal text-sm py-2.5 px-4 w-full justify-center">
                  Get My Free Review
                </Link>
              </div>
              <div className="bg-[#f8fafc] rounded-xl p-5 border border-gray-100">
                <h3 className="font-bold text-[#040c1c] mb-2 text-sm" style={{ fontFamily: 'Sora, sans-serif' }}>Talk to an Expert</h3>
                <p className="text-gray-500 text-xs mb-3">Our local Utah team is ready to answer your questions.</p>
                <Link href="/consultation" className="btn-outline-teal text-sm py-2 px-4 w-full justify-center">
                  Book a Consultation
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTABanner />
    </PageLayout>
  );
}

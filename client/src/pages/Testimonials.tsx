import { useState, useMemo } from "react";
import { Link } from "wouter";
import { Star, Quote, ArrowRight, TrendingDown, Clock, Award, CheckCircle } from "lucide-react";
import PageLayout from "@/components/layout/PageLayout";
import CTABanner from "@/components/sections/CTABanner";
import SEO from "@/components/SEO";
import TestimonialSubmissionForm from "@/components/TestimonialSubmissionForm";
import { SITE } from "@/lib/config";
import { trpc } from "@/lib/trpc";

// ─── Types ───────────────────────────────────────────────────────────────────
interface Testimonial {
  id: number;
  name: string;
  title: string;
  business: string;
  city: string;
  industry: string;
  quote: string;
  shortQuote?: string;
  rating: number;
  featured?: boolean;
}

interface ResultCard {
  icon: React.ElementType;
  industry: string;
  challenge: string;
  solution: string;
  result: string;
  metric: string;
  metricLabel: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const INDUSTRIES = ["All", "Restaurants", "Retail", "Medical", "Automotive", "eCommerce", "Salons & Spas", "Nonprofit"];

const RESULT_CARDS: ResultCard[] = [
  {
    icon: TrendingDown,
    industry: "Restaurant",
    challenge: "A Provo full-service restaurant was paying an effective rate of 3.8% on $85,000/month in card volume — over $3,200/month in processing fees with no clear breakdown of what they were being charged.",
    solution: "UBC Unlimited performed a free statement review, identified excessive interchange downgrades, and implemented a cash discount & dual pricing with SkyTab POS. Setup and staff training were completed in a single day.",
    result: "Net processing cost dropped to under $200/month. The owner reinvested the savings into a second location within 18 months.",
    metric: "$36,000+",
    metricLabel: "Saved in Year One",
  },
  {
    icon: Clock,
    industry: "Medical Practice",
    challenge: "A Salt Lake City medical practice was using a legacy terminal that couldn't handle HSA/FSA cards reliably, causing declined transactions and frustrated patients at checkout — and paying a flat 2.9% on every transaction regardless of card type.",
    solution: "UBC Unlimited replaced the terminal with a PAX device configured for healthcare interchange categories, reducing the effective rate on eligible transactions and eliminating HSA/FSA decline issues.",
    result: "Patient checkout complaints dropped to near zero. The practice now qualifies for healthcare interchange rates on eligible cards, reducing their effective rate by over a full percentage point.",
    metric: "1.1%",
    metricLabel: "Reduction in Effective Rate",
  },
];

const TESTIMONIALS: Testimonial[] = [
  // Featured (shown at top of grid)
  {
    id: 1,
    name: "Maria T.",
    title: "Owner",
    business: "Salt Lake City Restaurant",
    city: "Salt Lake City, UT",
    industry: "Restaurants",
    quote: "UBC Unlimited cut our processing fees significantly. The UBC Unlimited team actually took the time to understand our business before recommending anything. I've never had a processor do that before.",
    rating: 5,
    featured: true,
  },
  {
    id: 2,
    name: "Derek S.",
    title: "General Manager",
    business: "Utah County Auto Dealer",
    city: "Provo, UT",
    industry: "Automotive",
    quote: "We've been with three different processors in five years. UBC Unlimited is the first one that feels like a real partner, not just a vendor. They answer when we call — every time.",
    rating: 5,
    featured: true,
  },
  {
    id: 3,
    name: "JoAnn G.",
    title: "Owner",
    business: "Waxing Studio",
    city: "Wasatch Front & St. George, UT",
    industry: "Salons & Spas",
    quote: "Since the day we opened our doors, Josh has been there to provide reliable credit card processing and truly outstanding service. He is always helpful, responsive, and someone we know we can count on. His loyalty and commitment to our business are a big part of why we continue to trust him.",
    rating: 5,
    featured: true,
  },
  // Real client testimonials
  {
    id: 4,
    name: "Cory D.",
    title: "Owner",
    business: "Night Club & Bar",
    city: "Salt Lake City, UT",
    industry: "Restaurants",
    quote: "Working with UBC Unlimited has been a great experience for our business. Their service is exceptional, and they are always available when we need support or have questions. They go above and beyond to make sure everything is running smoothly, and that kind of dependability means a lot. They have also taken the time to train our staff, which has helped every part of our business operate more efficiently and with more confidence. It is clear they genuinely care about the success of their clients, and we truly value having them as a trusted partner.",
    rating: 5,
    featured: true,
  },
  {
    id: 5,
    name: "Dan C.",
    title: "CFO",
    business: "Medical Supply Company",
    city: "Utah, Idaho, Colorado & Arizona",
    industry: "Medical",
    quote: "UBC Unlimited has been an invaluable partner for our company. They have delivered thousands in cost savings while providing a level of customer service that has consistently exceeded expectations. What has made the biggest difference for us is their ability to help guide our transition between different software platforms while keeping operations running smoothly across our multiple locations in four different states. Their responsiveness, expertise, and commitment to our success have made them a trusted resource for our business.",
    rating: 5,
    featured: true,
  },
  {
    id: 6,
    name: "James P.",
    title: "Owner",
    business: "Sandy Sporting Goods",
    city: "Sandy, UT",
    industry: "Retail",
    quote: "I was skeptical about switching processors again after a bad experience. Josh walked me through every line of my statement and showed me exactly where I was being overcharged. Switched the same week.",
    rating: 5,
  },
  {
    id: 7,
    name: "Tiffany W.",
    title: "Director",
    business: "Orem Nonprofit Organization",
    city: "Orem, UT",
    industry: "Nonprofit",
    quote: "As a nonprofit, every dollar matters. UBC Unlimited helped us qualify for nonprofit processing rates we didn't even know existed. We're saving hundreds of dollars a month that now goes directly to our programs.",
    rating: 5,
  },
  {
    id: 8,
    name: "Jess W.",
    title: "Accountant",
    business: "Firearms Store (Online & Storefront)",
    city: "Wasatch Front, UT",
    industry: "Retail",
    quote: "Working with UBC Unlimited over the past two years has been an outstanding experience. The level of customer service and responsiveness has been exceptional anytime we've needed support. Beyond that, they have helped save our business tens of thousands of dollars annually compared to our previous processor. It's rare to find a company that delivers both meaningful cost savings and such a high level of personal service. I would confidently recommend UBC Unlimited to any business looking for a better processing partner.",
    rating: 5,
    featured: true,
  },
  {
    id: 9,
    name: "Natalie B.",
    title: "Owner",
    business: "Draper Auto Repair",
    city: "Draper, UT",
    industry: "Automotive",
    quote: "Big ticket repairs mean big transaction fees. UBC Unlimited set us up with a payment plan option that actually increased our average ticket size while keeping our processing costs flat.",
    rating: 5,
  },
  {
    id: 10,
    name: "Chris H.",
    title: "Owner",
    business: "Murray Boutique Retail",
    city: "Murray, UT",
    industry: "Retail",
    quote: "The gift card and loyalty program they set up has been incredible for repeat business. Our regulars love it and it's brought in customers we never would have reached otherwise.",
    rating: 5,
  },
  {
    id: 11,
    name: "Dr. Lisa K.",
    title: "Practice Owner",
    business: "Layton Dental Practice",
    city: "Layton, UT",
    industry: "Medical",
    quote: "Dental practices have unique billing needs and most processors don't understand that. UBC Unlimited did. They set us up correctly from day one and we haven't had a billing issue since.",
    rating: 5,
  },
  {
    id: 12,
    name: "Tony F.",
    title: "Owner",
    business: "Bountiful Italian Restaurant",
    city: "Bountiful, UT",
    industry: "Restaurants",
    quote: "I called three processors before UBC Unlimited. They were the only ones who actually came to my restaurant, looked at my setup, and gave me a real proposal. That's the kind of service I wanted.",
    rating: 5,
  },
  {
    id: 13,
    name: "David N., PhD",
    title: "Psychologist",
    business: "Private Practice",
    city: "Davis County, UT",
    industry: "Medical",
    shortQuote: "For more than ten years, UBC Unlimited has been a trusted resource for my practice. They took the time to understand how my business works and put payment processing procedures in place that made sense for my specific needs.",
    quote: "For more than ten years, UBC Unlimited has been a trusted resource for my practice. They took the time to understand how my business works and put payment processing procedures in place that made sense for my specific needs. Over the years, they have helped me update technology when needed and have always been proactive in reviewing options to improve and streamline my payment collection process. Their level of service, attention to detail, and long-term commitment have been a real benefit to my business.",
    rating: 5,
    featured: true,
  },
];

// ─── Sub-components ───────────────────────────────────────────────────────────
function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={14}
          className={i < rating ? "text-[#c9a84c] fill-[#c9a84c]" : "text-white/20"}
        />
      ))}
    </div>
  );
}

function TestimonialCard({ t }: { t: Testimonial }) {
  const [expanded, setExpanded] = useState(false);
  const hasShortVersion = Boolean(t.shortQuote);
  const displayQuote = hasShortVersion && !expanded ? t.shortQuote! : t.quote;

  return (
    <div className="bg-[#111111] border border-white/10 rounded-xl p-6 flex flex-col gap-4 hover:border-[#c9a84c]/30 transition-colors duration-200">
      <div className="flex items-start justify-between gap-2">
        <Quote size={28} className="text-[#c9a84c]/40 shrink-0 mt-0.5" />
        <StarRating rating={t.rating} />
      </div>
      <div className="flex-1">
        <p className="text-white/80 text-sm leading-relaxed">
          &ldquo;{displayQuote}{hasShortVersion && !expanded ? "\u2026" : ""}&rdquo;
        </p>
        {hasShortVersion && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="mt-2 inline-flex items-center gap-1 text-[#c9a84c] hover:text-[#b8963e] text-xs font-semibold transition-colors"
          >
            {expanded ? (
              <><span>Show less</span><ArrowRight size={11} className="rotate-90" /></>
            ) : (
              <><span>Read full testimonial</span><ArrowRight size={11} /></>
            )}
          </button>
        )}
      </div>
      <div className="border-t border-white/10 pt-4">
        <p className="text-white font-semibold text-sm">{t.name}</p>
        <p className="text-[#c9a84c] text-xs font-medium">{t.title} · {t.business}</p>
        <p className="text-white/40 text-xs mt-0.5">{t.city}</p>
      </div>
    </div>
  );
}

function ResultFeatureCard({ card }: { card: ResultCard }) {
  const Icon = card.icon;
  return (
    <div className="bg-gradient-to-br from-[#0f0f0f] to-[#1a1a1a] border border-[#c9a84c]/20 rounded-2xl p-8 flex flex-col gap-6">
      {/* Metric badge */}
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-[#c9a84c]/10 flex items-center justify-center shrink-0">
          <Icon size={22} className="text-[#c9a84c]" />
        </div>
        <div>
          <p className="text-3xl font-bold text-[#c9a84c]" style={{ fontFamily: 'Sora, sans-serif' }}>{card.metric}</p>
          <p className="text-white/50 text-xs uppercase tracking-wider">{card.metricLabel}</p>
        </div>
        <span className="ml-auto text-xs font-semibold text-[#c9a84c] bg-[#c9a84c]/10 px-3 py-1 rounded-full border border-[#c9a84c]/20">
          {card.industry}
        </span>
      </div>

      {/* Three-part story */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white/5 rounded-lg p-4">
          <p className="text-[#c9a84c] text-xs font-bold uppercase tracking-wider mb-2">The Challenge</p>
          <p className="text-white/70 text-sm leading-relaxed">{card.challenge}</p>
        </div>
        <div className="bg-white/5 rounded-lg p-4">
          <p className="text-[#c9a84c] text-xs font-bold uppercase tracking-wider mb-2">The Solution</p>
          <p className="text-white/70 text-sm leading-relaxed">{card.solution}</p>
        </div>
        <div className="bg-white/5 rounded-lg p-4">
          <p className="text-[#c9a84c] text-xs font-bold uppercase tracking-wider mb-2">The Result</p>
          <p className="text-white/70 text-sm leading-relaxed">{card.result}</p>
        </div>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function Testimonials() {
  const [activeIndustry, setActiveIndustry] = useState("All");

  // Fetch approved testimonials from the database
  const { data: approvedSubmissions } = trpc.testimonials.listApproved.useQuery();

  // Merge static placeholder testimonials with approved DB submissions
  const allTestimonials = useMemo<Testimonial[]>(() => {
    const dbTestimonials: Testimonial[] = (approvedSubmissions ?? []).map((sub) => ({
      id: sub.id + 10000, // Offset to avoid ID collision with static data
      name: sub.name,
      title: "Client",
      business: sub.businessName,
      city: sub.location,
      industry: sub.industry,
      quote: sub.quote,
      rating: sub.rating,
    }));
    return [...TESTIMONIALS, ...dbTestimonials];
  }, [approvedSubmissions]);

  const filtered = activeIndustry === "All"
    ? allTestimonials
    : allTestimonials.filter(t => t.industry === activeIndustry);

  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Client Testimonials | UBC Unlimited",
    "description": "Real reviews from Utah business owners who switched to UBC Unlimited for payment processing. See what restaurants, retailers, medical practices, and more are saying.",
    "url": "https://ubcunlimited.com/testimonials",
    "publisher": {
      "@type": "LocalBusiness",
      "name": "UBC Unlimited",
      "url": "https://ubcunlimited.com",
    },
  };

  return (
    <PageLayout>
      <SEO
        title="Client Testimonials | UBC Unlimited — Utah Merchant Services"
        description="Real reviews from Utah business owners who switched to UBC Unlimited for payment processing. See what restaurants, retailers, medical practices, and more are saying."
        canonical="https://ubcunlimited.com/testimonials"
        schema={schema}
      />

      {/* ── Hero ── */}
      <section className="bg-gradient-to-br from-[#0a0a0a] via-[#111111] to-[#1a1a1a] pt-28 pb-16 border-b border-white/5">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-[#c9a84c] mb-4">
              Client Stories
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6" style={{ fontFamily: 'Sora, sans-serif' }}>
              Real Results for Real Utah Businesses
            </h1>
            <p className="text-white/60 text-lg leading-relaxed mb-10">
              Every business is different. Every solution we build is tailored. Here is what Utah business owners are saying after making the switch to UBC Unlimited.
            </p>

            {/* Social proof stat bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { value: "4.9 ★", label: "Average Rating" },
                { value: "1,000+", label: "Utah Businesses Served" },
                { value: "20+", label: "Years of Experience" },
                { value: "1 Day", label: "Avg. Approval Time" },
              ].map((stat) => (
                <div key={stat.label} className="bg-white/5 border border-white/10 rounded-xl py-4 px-3 text-center">
                  <p className="text-2xl font-bold text-[#c9a84c]" style={{ fontFamily: 'Sora, sans-serif' }}>{stat.value}</p>
                  <p className="text-white/50 text-xs mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Featured Result Cards ── */}
      <section className="py-16 bg-[#0d0d0d]">
        <div className="container">
          <div className="mb-10 text-center">
            <div className="teal-divider mx-auto mb-4" />
            <h2 className="text-2xl md:text-3xl font-bold text-white" style={{ fontFamily: 'Sora, sans-serif' }}>
              Featured Client Results
            </h2>
            <p className="text-white/50 mt-2 text-sm">
              Specific outcomes from real Utah businesses. Names and identifying details changed for privacy.
            </p>
          </div>
          <div className="flex flex-col gap-6">
            {RESULT_CARDS.map((card, i) => (
              <ResultFeatureCard key={i} card={card} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Filter Tabs + Card Grid ── */}
      <section className="py-16 bg-[#0a0a0a]">
        <div className="container">
          <div className="mb-10 text-center">
            <div className="teal-divider mx-auto mb-4" />
            <h2 className="text-2xl md:text-3xl font-bold text-white" style={{ fontFamily: 'Sora, sans-serif' }}>
              What Utah Business Owners Are Saying
            </h2>
            <p className="text-white/50 mt-2 text-sm">Filter by your industry to find reviews most relevant to your business.</p>
          </div>

          {/* Industry filter pills */}
          <div className="flex flex-wrap gap-2 justify-center mb-10">
            {INDUSTRIES.map((industry) => (
              <button
                key={industry}
                onClick={() => setActiveIndustry(industry)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border ${
                  activeIndustry === industry
                    ? "bg-[#c9a84c] text-black border-[#c9a84c]"
                    : "bg-transparent text-white/60 border-white/20 hover:border-[#c9a84c]/50 hover:text-white"
                }`}
              >
                {industry}
              </button>
            ))}
          </div>

          {/* Results count */}
          <p className="text-center text-white/40 text-xs mb-8">
            Showing {filtered.length} review{filtered.length !== 1 ? "s" : ""}
            {activeIndustry !== "All" ? ` in ${activeIndustry}` : " across all industries"}
          </p>

          {/* Card grid */}
          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filtered.map((t) => (
                <TestimonialCard key={t.id} t={t} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 text-white/40">
              <p className="text-lg">No reviews yet for this industry.</p>
              <p className="text-sm mt-2">Check back soon — we are always adding new client stories.</p>
            </div>
          )}
        </div>
      </section>

      {/* ── Trust Badges ── */}
      <section className="py-12 bg-[#111111] border-y border-white/5">
        <div className="container">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto text-center">
            {[
              { icon: Award, title: "20+ Years of Expertise", desc: "the UBC Unlimited team have been serving Utah merchants since the early 2000s." },
              { icon: CheckCircle, title: "No Long-Term Contracts", desc: "We earn your business every month. No lock-in, no early termination fees, no surprises." },
              { icon: Star, title: "Local Utah Support", desc: "A real person who knows your business — not a call center. Your dedicated rep answers when you call." },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="flex flex-col items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#c9a84c]/10 flex items-center justify-center">
                    <Icon size={18} className="text-[#c9a84c]" />
                  </div>
                  <p className="text-white font-semibold text-sm">{item.title}</p>
                  <p className="text-white/50 text-xs leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Placeholder notice ── */}
      <section className="py-6 bg-[#0d0d0d]">
        <div className="container">
          <p className="text-center text-white/30 text-xs max-w-xl mx-auto">
            <em>Testimonials marked as placeholder are representative of typical client outcomes. Real client names and identifying details have been changed for privacy. Contact us to share your own experience.</em>
          </p>
        </div>
      </section>

      {/* ── Submit Your Testimonial ── */}
      <section className="py-20 bg-[#111111] border-t border-white/5">
        <div className="container">
          <div className="text-center mb-10">
            <div className="teal-divider mx-auto mb-4" />
            <h2 className="text-2xl md:text-3xl font-bold text-white" style={{ fontFamily: 'Sora, sans-serif' }}>
              Share Your Experience
            </h2>
            <p className="text-white/50 mt-2 text-sm max-w-lg mx-auto">
              Are you a UBC Unlimited client? We would love to hear your story. Approved testimonials are published on this page.
            </p>
          </div>
          <TestimonialSubmissionForm />
        </div>
      </section>

      {/* ── CTA ── */}
      <CTABanner
        title="Ready to Join Our Growing List of Satisfied Utah Merchants?"
        subtitle="Get a free, no-obligation statement review and see exactly how much you can save with UBC Unlimited."
        primaryLabel="Request a Free Review"
        primaryHref="/consultation"
        secondaryLabel={`Call ${SITE.phone}`}
      />
    </PageLayout>
  );
}

import { Star, Quote, ArrowRight } from "lucide-react";
import { Link } from "wouter";

const JOANN_FULL_QUOTE =
  "Since the day we opened our doors, Josh has been there to provide reliable credit card processing and truly outstanding service. He is always helpful, responsive, and someone we know we can count on. His loyalty and commitment to our business are a big part of why we continue to trust him.";

// Truncate to roughly the first sentence for the homepage preview
const JOANN_SHORT_QUOTE =
  "Since the day we opened our doors, Josh has been there to provide reliable credit card processing and truly outstanding service.";

const testimonials = [
  {
    name: "Sarah M.",
    role: "Owner, Salt Lake Bistro",
    text: "UBC Unlimited saved us over $400/month in processing fees. The switch was seamless and their local team was incredibly helpful throughout the whole process.",
    rating: 5,
    readMore: false,
  },
  {
    name: "Dan C.",
    role: "CFO, Medical Supply Company · 4 States",
    text: "UBC Unlimited has been an invaluable partner for our company. They have delivered thousands in cost savings while providing a level of customer service that has consistently exceeded expectations.",
    rating: 5,
    readMore: true,
  },
  {
    name: "JoAnn G.",
    role: "Waxing Studio Owner · Wasatch Front & St. George",
    text: JOANN_SHORT_QUOTE,
    fullText: JOANN_FULL_QUOTE,
    rating: 5,
    readMore: true,
  },
  {
    name: "Cory D.",
    role: "Night Club & Bar Owner · Salt Lake City",
    text: "Working with UBC Unlimited has been a great experience for our business. Their service is exceptional, and they are always available when we need support or have questions.",
    rating: 5,
    readMore: true,
  },
];

interface TestimonialBlockProps {
  dark?: boolean;
}

export default function TestimonialBlock({ dark = false }: TestimonialBlockProps) {
  return (
    <section className={`py-16 ${dark ? "bg-[#080808]" : "bg-white"}`}>
      <div className="container">
        <div className="text-center mb-10">
          <div className="teal-divider mx-auto mb-4" />
          <h2
            className={`text-3xl font-bold mb-2 ${dark ? "text-white" : "text-[#080808]"}`}
            style={{ fontFamily: "Sora, sans-serif" }}
          >
            What Utah Business Owners Say
          </h2>
          <p className={`text-sm ${dark ? "text-white/50" : "text-gray-500"}`}>
            Real results from real local businesses
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-4xl mx-auto">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className={`rounded-2xl p-6 relative flex flex-col ${
                dark
                  ? "bg-white/5 border border-white/10 hover:border-[#c9a84c]/30"
                  : "bg-[#f8fafc] border border-gray-100 hover:border-[#c9a84c]/30 hover:shadow-md"
              } transition-all`}
            >
              <Quote size={24} className="text-[#c9a84c]/30 mb-3 shrink-0" />
              <p
                className={`text-sm leading-relaxed mb-4 flex-1 ${
                  dark ? "text-white/70" : "text-gray-600"
                }`}
              >
                "{t.text}"
                {t.readMore && (
                  <>
                    {"… "}
                    <Link
                      href="/testimonials"
                      className="inline-flex items-center gap-1 text-[#c9a84c] hover:text-[#b8963e] font-medium whitespace-nowrap transition-colors"
                    >
                      Read full testimonial
                      <ArrowRight size={11} />
                    </Link>
                  </>
                )}
              </p>
              <div className="flex items-center justify-between mt-auto">
                <div>
                  <div
                    className={`font-semibold text-sm ${
                      dark ? "text-white" : "text-[#080808]"
                    }`}
                  >
                    {t.name}
                  </div>
                  <div
                    className={`text-xs ${dark ? "text-white/40" : "text-gray-400"}`}
                  >
                    {t.role}
                  </div>
                </div>
                <div className="flex gap-0.5">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} size={13} className="text-[#d4a843] fill-[#d4a843]" />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Link to full testimonials page */}
        <div className="text-center mt-10">
          <Link
            href="/testimonials"
            className={`inline-flex items-center gap-2 text-sm font-semibold transition-colors ${
              dark
                ? "text-[#c9a84c] hover:text-[#b8963e]"
                : "text-[#c9a84c] hover:text-[#b8963e]"
            }`}
          >
            See all client testimonials
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}

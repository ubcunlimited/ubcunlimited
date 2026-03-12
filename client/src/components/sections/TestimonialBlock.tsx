import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Sarah M.",
    role: "Owner, Salt Lake Bistro",
    text: "UBC Unlimited saved us over $400/month in processing fees. The switch was seamless and their local team was incredibly helpful throughout the whole process.",
    rating: 5,
  },
  {
    name: "Mike T.",
    role: "Manager, Wasatch Auto Group",
    text: "We were skeptical at first, but after the free statement review we saw we were overpaying by nearly 30%. UBC Unlimited made the transition painless.",
    rating: 5,
  },
  {
    name: "Jennifer L.",
    role: "Owner, Provo Day Spa",
    text: "The SkyTab POS system they set up for us has completely transformed how we run our salon. Booking, payments, and tips all in one place. Highly recommend.",
    rating: 5,
  },
  {
    name: "David R.",
    role: "Owner, Ogden Retail Co.",
    text: "What sets UBC apart is the local support. When I have a question, I call and get a real person who knows my business. That's rare in this industry.",
    rating: 5,
  },
];

interface TestimonialBlockProps {
  dark?: boolean;
}

export default function TestimonialBlock({ dark = false }: TestimonialBlockProps) {
  return (
    <section className={`py-16 ${dark ? "bg-[#040c1c]" : "bg-white"}`}>
      <div className="container">
        <div className="text-center mb-10">
          <div className="teal-divider mx-auto mb-4" />
          <h2 className={`text-3xl font-bold mb-2 ${dark ? "text-white" : "text-[#040c1c]"}`} style={{ fontFamily: 'Sora, sans-serif' }}>
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
              className={`rounded-2xl p-6 relative ${
                dark
                  ? "bg-white/5 border border-white/10 hover:border-[#169fa8]/30"
                  : "bg-[#f8fafc] border border-gray-100 hover:border-[#169fa8]/30 hover:shadow-md"
              } transition-all`}
            >
              <Quote size={24} className="text-[#169fa8]/30 mb-3" />
              <p className={`text-sm leading-relaxed mb-4 ${dark ? "text-white/70" : "text-gray-600"}`}>
                "{t.text}"
              </p>
              <div className="flex items-center justify-between">
                <div>
                  <div className={`font-semibold text-sm ${dark ? "text-white" : "text-[#040c1c]"}`}>{t.name}</div>
                  <div className={`text-xs ${dark ? "text-white/40" : "text-gray-400"}`}>{t.role}</div>
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
      </div>
    </section>
  );
}

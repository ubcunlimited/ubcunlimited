import { useState } from "react";
import { Link } from "wouter";
import { Calendar, CheckCircle, ArrowRight } from "lucide-react";
import PageLayout from "@/components/layout/PageLayout";
import { SITE } from "@/lib/config";

const benefits = [
  "No-obligation, 100% free consultation",
  "Review your current processing costs",
  "Custom solution tailored to your business",
  "Local Utah expert — not a call center",
];

export default function Consultation() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    window.location.href = "/thank-you";
  };

  return (
    <PageLayout>
      <section className="bg-[#040c1c] py-16">
        <div className="container">
          <div className="max-w-xl">
            <div className="stat-badge mb-4">Book a Consultation</div>
            <h1 className="text-4xl font-extrabold text-white mb-4" style={{ fontFamily: 'Sora, sans-serif' }}>
              Book Your Free Consultation
            </h1>
            <p className="text-white/60 text-lg">
              Speak with a local Utah merchant services expert. No pressure, no obligation — just honest advice.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-bold text-[#040c1c] mb-5" style={{ fontFamily: 'Sora, sans-serif' }}>What to Expect</h2>
              <div className="space-y-4 mb-8">
                {benefits.map((b) => (
                  <div key={b} className="flex items-start gap-3">
                    <CheckCircle size={18} className="text-[#169fa8] mt-0.5 shrink-0" />
                    <span className="text-gray-600 text-sm">{b}</span>
                  </div>
                ))}
              </div>
              <div className="bg-[#f8fafc] rounded-xl p-5 border border-gray-100">
                <div className="flex items-center gap-3 mb-3">
                  <Calendar size={18} className="text-[#169fa8]" />
                  <span className="font-semibold text-[#040c1c] text-sm">Available Mon–Fri, 8am–6pm MT</span>
                </div>
                <p className="text-gray-500 text-sm">Prefer to call? Reach us at <a href={SITE.phoneHref} className="text-[#169fa8] font-medium">{SITE.phone}</a></p>
              </div>
            </div>

            <div>
              <form onSubmit={handleSubmit} data-ghl-form="consultation" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[#040c1c] mb-1.5">First Name *</label>
                    <input type="text" required className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#169fa8] focus:ring-2 focus:ring-[#169fa8]/20" placeholder="John" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#040c1c] mb-1.5">Last Name *</label>
                    <input type="text" required className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#169fa8] focus:ring-2 focus:ring-[#169fa8]/20" placeholder="Smith" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#040c1c] mb-1.5">Business Name *</label>
                  <input type="text" required className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#169fa8] focus:ring-2 focus:ring-[#169fa8]/20" placeholder="Your Business Name" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#040c1c] mb-1.5">Business Type</label>
                  <select className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#169fa8] focus:ring-2 focus:ring-[#169fa8]/20 bg-white">
                    <option value="restaurant">Restaurant</option>
                    <option value="retail">Retail</option>
                    <option value="medical">Medical / Healthcare</option>
                    <option value="automotive">Automotive</option>
                    <option value="salon">Salon / Spa</option>
                    <option value="professional">Professional Services</option>
                    <option value="ecommerce">eCommerce</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#040c1c] mb-1.5">Email *</label>
                  <input type="email" required className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#169fa8] focus:ring-2 focus:ring-[#169fa8]/20" placeholder="john@yourbusiness.com" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#040c1c] mb-1.5">Phone *</label>
                  <input type="tel" required className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#169fa8] focus:ring-2 focus:ring-[#169fa8]/20" placeholder="(801) 000-0000" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#040c1c] mb-1.5">Monthly Processing Volume (approx.)</label>
                  <select className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#169fa8] focus:ring-2 focus:ring-[#169fa8]/20 bg-white">
                    <option value="">Select range...</option>
                    <option value="under5k">Under $5,000</option>
                    <option value="5k-20k">$5,000 – $20,000</option>
                    <option value="20k-50k">$20,000 – $50,000</option>
                    <option value="50k-100k">$50,000 – $100,000</option>
                    <option value="over100k">Over $100,000</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#040c1c] mb-1.5">What are you looking for?</label>
                  <textarea rows={3} className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#169fa8] focus:ring-2 focus:ring-[#169fa8]/20 resize-none" placeholder="Lower rates, new POS system, online payments..." />
                </div>
                <button type="submit" className="btn-teal w-full justify-center py-3">
                  Book My Free Consultation <ArrowRight size={16} />
                </button>
                <p className="text-xs text-gray-400 text-center">
                  By submitting, you agree to our <Link href="/legal/privacy-policy" className="text-[#169fa8] hover:underline">Privacy Policy</Link>. No spam, ever.
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}

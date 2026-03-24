import { useState } from "react";
import { Link } from "wouter";
import { Upload, CheckCircle, ArrowRight, TrendingDown } from "lucide-react";
import PageLayout from "@/components/layout/PageLayout";

const steps = [
  { step: "1", title: "Submit Your Statement", desc: "Upload or email us your most recent processing statement." },
  { step: "2", title: "We Analyze It", desc: "Our experts identify every fee and where you're overpaying." },
  { step: "3", title: "Get Your Report", desc: "We show you exactly how much you can save — in writing." },
];

export default function StatementReview() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    window.location.href = "/thank-you";
  };

  return (
    <PageLayout>
      <section className="bg-[#080808] py-10 sm:py-16">
        <div className="container">
          <div className="max-w-xl">
            <div className="stat-badge mb-4">Statement Review</div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-white mb-4" style={{ fontFamily: 'Sora, sans-serif' }}>
              See Exactly How Much You're Overpaying
            </h1>
            <p className="text-white/60 text-lg">
              Submit your current processing statement and we'll show you exactly how much you can save — for free, with no obligation.
            </p>
          </div>
        </div>
      </section>

      <section className="py-8 sm:py-12 bg-[#f8fafc]">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12">
            {steps.map((s) => (
              <div key={s.step} className="bg-white rounded-xl p-5 border border-gray-100 text-center">
                <div className="w-10 h-10 rounded-full bg-[#c9a84c]/10 text-[#c9a84c] font-bold text-lg flex items-center justify-center mx-auto mb-3" style={{ fontFamily: 'Sora, sans-serif' }}>{s.step}</div>
                <h3 className="font-bold text-[#080808] mb-1 text-sm" style={{ fontFamily: 'Sora, sans-serif' }}>{s.title}</h3>
                <p className="text-gray-500 text-xs">{s.desc}</p>
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-6 lg:gap-12">
            <div>
              <div className="bg-gradient-to-br from-[#080808] to-[#0f2040] rounded-2xl p-7 text-white mb-5">
                <TrendingDown size={28} className="text-[#c9a84c] mb-3" />
                <h3 className="text-xl font-bold mb-2" style={{ fontFamily: 'Sora, sans-serif' }}>Average Savings</h3>
                <div className="text-4xl font-extrabold text-[#c9a84c] mb-2" style={{ fontFamily: 'Sora, sans-serif' }}>$350/mo</div>
                <p className="text-white/60 text-sm">That's $4,200/year going back into your business.</p>
              </div>
              <div className="space-y-3">
                {["No obligation — ever", "Results within 1 business day", "Detailed line-by-line breakdown", "Local Utah expert review"].map((b) => (
                  <div key={b} className="flex items-center gap-2.5 text-sm text-gray-600">
                    <CheckCircle size={15} className="text-[#c9a84c] shrink-0" />
                    {b}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <form onSubmit={handleSubmit} data-ghl-form="statement-review" className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[#080808] mb-1.5">First Name *</label>
                    <input type="text" required className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#c9a84c] focus:ring-2 focus:ring-[#c9a84c]/20" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#080808] mb-1.5">Last Name *</label>
                    <input type="text" required className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#c9a84c] focus:ring-2 focus:ring-[#c9a84c]/20" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#080808] mb-1.5">Business Name *</label>
                  <input type="text" required className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#c9a84c] focus:ring-2 focus:ring-[#c9a84c]/20" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#080808] mb-1.5">Email *</label>
                  <input type="email" required className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#c9a84c] focus:ring-2 focus:ring-[#c9a84c]/20" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#080808] mb-1.5">Phone *</label>
                  <input type="tel" required className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#c9a84c] focus:ring-2 focus:ring-[#c9a84c]/20" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#080808] mb-1.5">Current Processor</label>
                  <input type="text" className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#c9a84c] focus:ring-2 focus:ring-[#c9a84c]/20" placeholder="e.g. Square, Stripe, First Data..." />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#080808] mb-1.5">
                    Upload Statement <span className="text-gray-400 font-normal">(optional — you can also email it)</span>
                  </label>
                  <div className="border-2 border-dashed border-gray-200 rounded-lg p-6 text-center hover:border-[#c9a84c]/40 transition-colors cursor-pointer">
                    <Upload size={20} className="text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-500">Click to upload or drag & drop</p>
                    <p className="text-xs text-gray-400 mt-1">PDF, JPG, PNG up to 10MB</p>
                    <input type="file" className="hidden" accept=".pdf,.jpg,.png" />
                  </div>
                </div>
                <button type="submit" className="btn-teal w-full justify-center py-3">
                  Get My Free Analysis <ArrowRight size={16} />
                </button>
                <p className="text-xs text-gray-400 text-center">
                  Your statement is kept strictly confidential. See our <Link href="/legal/privacy-policy" className="text-[#c9a84c] hover:underline">Privacy Policy</Link>.
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}

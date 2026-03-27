import { useState } from "react";
import { Link } from "wouter";
import { Calendar, CheckCircle, ArrowRight, Phone } from "lucide-react";
import PageLayout from "@/components/layout/PageLayout";
import { SITE } from "@/lib/config";
import { trackLead } from "@/lib/pixel";

const inputClass = "w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#c9a84c] focus:ring-2 focus:ring-[#c9a84c]/20 transition-all text-[#080808] placeholder-gray-400 bg-white";
const labelClass = "block text-sm font-medium text-[#080808] mb-1.5";

const benefits = [
  "No-obligation, 100% consultation",
  "Review your current processing costs with a local expert",
  "Custom solution tailored to your business type and volume",
  "Local Utah expert — not a national call center",
  "Get a side-by-side comparison of your current rates",
  "Receive a clear recommendation with no pressure to commit",
];

export default function Consultation() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    trackLead();
    setTimeout(() => { window.location.href = "/thank-you"; }, 1500);
  };

  return (
    <PageLayout>
      {/* Hero */}
      <section className="bg-[#080808] py-10 sm:py-16">
        <div className="container">
          <div className="max-w-xl">
            <div className="stat-badge mb-4">Book a Consultation</div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-white mb-4" style={{ fontFamily: 'DM Serif Display, Georgia, serif' }}>
              Book Your Consultation
            </h1>
            <p className="text-white/60 text-lg">
              Speak with {SITE.founder} — a local Utah merchant services expert with {SITE.yearsInBusiness} years of experience. No pressure, no obligation, just honest advice.
            </p>
          </div>
        </div>
      </section>

      <section className="py-10 sm:py-16 bg-white">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-6 lg:gap-12">
            {/* Left: Benefits */}
            <div>
              <h2 className="text-2xl font-bold text-[#080808] mb-5" style={{ fontFamily: 'DM Serif Display, Georgia, serif' }}>What to Expect</h2>
              <div className="space-y-3 mb-8">
                {benefits.map((b) => (
                  <div key={b} className="flex items-start gap-3">
                    <CheckCircle size={17} className="text-[#c9a84c] mt-0.5 shrink-0" />
                    <span className="text-gray-600 text-sm">{b}</span>
                  </div>
                ))}
              </div>
              <div className="bg-[#f7f3ec] rounded-xl p-5 border border-gray-100 mb-5">
                <div className="flex items-center gap-3 mb-2">
                  <Calendar size={17} className="text-[#c9a84c]" />
                  <span className="font-semibold text-[#080808] text-sm">Available Mon–Fri, 8am–6pm MT</span>
                </div>
                <p className="text-gray-500 text-sm">
                  Prefer to call directly? Reach {SITE.founder} at{" "}
                  <a href={SITE.phoneHref} className="text-[#c9a84c] font-medium hover:underline">{SITE.phone}</a>
                </p>
              </div>
              <div className="bg-[#c9a84c]/8 rounded-xl p-5 border border-[#c9a84c]/15">
                <p className="text-[#080808] font-semibold text-sm mb-1">Have a current statement?</p>
                <p className="text-gray-500 text-sm mb-3">
                  Upload it on our Statement Review page and we'll do a full cost analysis before your consultation.
                </p>
                <Link href="/statement-review" className="btn-outline-teal text-sm py-2 px-4">
                  Submit Statement <ArrowRight size={13} />
                </Link>
              </div>
            </div>

            {/* Right: Form */}
            <div>
              {submitted ? (
                <div className="bg-[#c9a84c]/10 border border-[#c9a84c]/20 rounded-2xl p-10 text-center">
                  <div className="text-4xl mb-4">✅</div>
                  <h3 className="text-xl font-bold text-[#080808] mb-2" style={{ fontFamily: 'DM Serif Display, Georgia, serif' }}>Request Received!</h3>
                  <p className="text-gray-500 mb-4">We'll reach out within 1 business hour to confirm your consultation time.</p>
                  <a href={SITE.phoneHref} className="btn-teal text-sm py-2.5 px-6">
                    <Phone size={14} /> Or Call Us Now
                  </a>
                </div>
              ) : (
                <form onSubmit={handleSubmit} data-ghl-form="consultation" className="space-y-4">
                  <h2 className="text-xl font-bold text-[#080808] mb-1" style={{ fontFamily: 'DM Serif Display, Georgia, serif' }}>Request Your Consultation</h2>
                  <p className="text-gray-500 text-sm mb-4">Fill out the form below and we'll be in touch within 1 business hour.</p>

                  {/* Business Name */}
                  <div>
                    <label className={labelClass}>Business Name <span className="text-red-500">*</span></label>
                    <input type="text" name="business_name" required className={inputClass} placeholder="Your business name" />
                  </div>

                  {/* Owner Name */}
                  <div>
                    <label className={labelClass}>Owner Name <span className="text-red-500">*</span></label>
                    <input type="text" name="owner_name" required className={inputClass} placeholder="Your full name" />
                  </div>

                  {/* Email */}
                  <div>
                    <label className={labelClass}>Email Address <span className="text-red-500">*</span></label>
                    <input type="email" name="email" required className={inputClass} placeholder="you@yourbusiness.com" />
                  </div>

                  {/* Phone */}
                  <div>
                    <label className={labelClass}>Phone Number <span className="text-red-500">*</span></label>
                    <input type="tel" name="phone" required className={inputClass} placeholder="(801) 000-0000" />
                  </div>

                  {/* Website */}
                  <div>
                    <label className={labelClass}>Business Website</label>
                    <input type="url" name="website" className={inputClass} placeholder="https://yourbusiness.com" />
                  </div>

                  {/* Monthly Volume */}
                  <div>
                    <label className={labelClass}>Monthly Processing Volume <span className="text-red-500">*</span></label>
                    <select name="monthly_volume" required className={inputClass}>
                      <option value="">Select your monthly volume</option>
                      <option value="under-5k">Under $5,000/month</option>
                      <option value="5k-15k">$5,000 – $15,000/month</option>
                      <option value="15k-50k">$15,000 – $50,000/month</option>
                      <option value="50k-100k">$50,000 – $100,000/month</option>
                      <option value="100k-plus">$100,000+/month</option>
                    </select>
                  </div>

                  {/* Average Ticket */}
                  <div>
                    <label className={labelClass}>Average Transaction / Ticket Size</label>
                    <select name="avg_ticket" className={inputClass}>
                      <option value="">Select average ticket size</option>
                      <option value="under-25">Under $25</option>
                      <option value="25-75">$25 – $75</option>
                      <option value="75-200">$75 – $200</option>
                      <option value="200-500">$200 – $500</option>
                      <option value="500-plus">$500+</option>
                    </select>
                  </div>

                  {/* Current Processor */}
                  <div>
                    <label className={labelClass}>Current Payment Processor</label>
                    <input type="text" name="current_processor" className={inputClass} placeholder="e.g. Square, Stripe, Toast, Heartland, First Data..." />
                  </div>

                  {/* Preferred Contact Method */}
                  <div>
                    <label className={labelClass}>Preferred Contact Method <span className="text-red-500">*</span></label>
                    <select name="preferred_contact" required className={inputClass}>
                      <option value="">Select preferred method</option>
                      <option value="phone">Phone Call</option>
                      <option value="text">Text Message</option>
                      <option value="email">Email</option>
                      <option value="video">Video Call (Zoom / Google Meet)</option>
                    </select>
                  </div>

                  {/* Current Challenges */}
                  <div>
                    <label className={labelClass}>Current Challenges or Goals</label>
                    <textarea name="challenges" rows={3} className={`${inputClass} resize-none`} placeholder="e.g. High processing fees, need a new POS, adding online payments, switching processors..." />
                  </div>

                  <button type="submit" className="btn-teal w-full justify-center py-3">
                    Book My Consultation <ArrowRight size={16} />
                  </button>
                  <p className="text-xs text-gray-400 text-center">
                    By submitting, you agree to our{" "}
                    <Link href="/legal/privacy-policy" className="text-[#c9a84c] hover:underline">Privacy Policy</Link>.
                    No spam, ever.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}

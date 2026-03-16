import { useState } from "react";
import { Phone, Mail, MapPin, Clock, Send, ArrowRight } from "lucide-react";
import { Link } from "wouter";
import PageLayout from "@/components/layout/PageLayout";
import { SITE } from "@/lib/config";

const inputClass = "w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#1e6fa8] focus:ring-2 focus:ring-[#1e6fa8]/20 transition-all text-[#0d1b2a] placeholder-gray-400";
const labelClass = "block text-sm font-medium text-[#0d1b2a] mb-1.5";
const smsConsentLabelClass = "text-xs text-gray-500 leading-relaxed cursor-pointer select-none";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [smsTransactional, setSmsTransactional] = useState(false);
  const [smsMarketing, setSmsMarketing] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <PageLayout>
      {/* Hero */}
      <section className="bg-[#0d1b2a] py-16">
        <div className="container">
          <div className="max-w-xl">
            <div className="stat-badge mb-4">Contact Us</div>
            <h1 className="text-4xl font-extrabold text-white mb-4" style={{ fontFamily: 'DM Serif Display, Georgia, serif' }}>
              Talk to a Local Expert
            </h1>
            <p className="text-white/60 text-lg">
              Have questions about merchant services? We're here to help — no sales pressure, just honest answers from a local Utah team.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div>
              <h2 className="text-2xl font-bold text-[#0d1b2a] mb-6" style={{ fontFamily: 'DM Serif Display, Georgia, serif' }}>Get in Touch</h2>
              <div className="space-y-5 mb-8">
                {[
                  { icon: Phone, label: "Phone", value: SITE.phone, href: SITE.phoneHref },
                  { icon: Mail, label: "Email", value: SITE.email, href: `mailto:${SITE.email}` },
                  { icon: MapPin, label: "Location", value: "Serving all of Utah — Wasatch Front & beyond", href: undefined },
                  { icon: Clock, label: "Hours", value: "Mon–Fri 8am–6pm MT · Real person, local team", href: undefined },
                ].map((item) => (
                  <div key={item.label} className="flex gap-4 items-start">
                    <div className="w-10 h-10 rounded-xl bg-[#1e6fa8]/10 flex items-center justify-center shrink-0">
                      <item.icon size={18} className="text-[#1e6fa8]" />
                    </div>
                    <div>
                      <div className="text-xs text-gray-400 font-medium uppercase tracking-wide mb-0.5">{item.label}</div>
                      {item.href ? (
                        <a href={item.href} className="text-[#0d1b2a] font-semibold hover:text-[#1e6fa8] transition-colors">{item.value}</a>
                      ) : (
                        <div className="text-[#0d1b2a] font-semibold">{item.value}</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-[#f4f7fa] rounded-xl p-5 border border-gray-100 mb-5">
                <h3 className="font-bold text-[#0d1b2a] mb-2">Prefer a free consultation?</h3>
                <p className="text-gray-500 text-sm mb-3">Book a no-pressure call with {SITE.founder} to discuss your business needs and get a custom quote.</p>
                <Link href="/consultation" className="btn-teal text-sm py-2.5 px-5">
                  Book a Consultation <ArrowRight size={14} />
                </Link>
              </div>

              <div className="bg-[#f4f7fa] rounded-xl p-5 border border-gray-100">
                <h3 className="font-bold text-[#0d1b2a] mb-2">Free Statement Review</h3>
                <p className="text-gray-500 text-sm mb-3">Upload your current processing statement and we'll show you exactly where you can save — at no cost, no obligation.</p>
                <Link href="/statement-review" className="btn-outline-teal text-sm py-2.5 px-5">
                  Submit Statement <ArrowRight size={14} />
                </Link>
              </div>
            </div>

            {/* Form */}
            <div>
              {submitted ? (
                <div className="bg-[#1e6fa8]/10 border border-[#1e6fa8]/20 rounded-2xl p-10 text-center">
                  <div className="text-4xl mb-4">✅</div>
                  <h3 className="text-xl font-bold text-[#0d1b2a] mb-2" style={{ fontFamily: 'DM Serif Display, Georgia, serif' }}>Message Received!</h3>
                  <p className="text-gray-500 mb-4">We'll get back to you within 1 business hour.</p>
                  <a href={SITE.phoneHref} className="btn-teal text-sm py-2.5 px-6">
                    <Phone size={14} /> Or Call Us Now
                  </a>
                </div>
              ) : (
                <form onSubmit={handleSubmit} data-ghl-form="contact" className="space-y-4">
                  <h2 className="text-xl font-bold text-[#0d1b2a] mb-2" style={{ fontFamily: 'DM Serif Display, Georgia, serif' }}>Send Us a Message</h2>
                  <p className="text-gray-500 text-sm mb-4">Fill out the form below and a local Utah expert will respond within 1 business hour.</p>

                  {/* Owner Name */}
                  <div>
                    <label className={labelClass}>Owner Name <span className="text-red-500">*</span></label>
                    <input type="text" name="owner_name" required className={inputClass} placeholder="Your full name" />
                  </div>

                  {/* Business Name */}
                  <div>
                    <label className={labelClass}>Business Name <span className="text-red-500">*</span></label>
                    <input type="text" name="business_name" required className={inputClass} placeholder="Your business name" />
                  </div>

                  {/* What the Business Sells */}
                  <div>
                    <label className={labelClass}>What Does Your Business Sell? <span className="text-red-500">*</span></label>
                    <input type="text" name="business_type" required className={inputClass} placeholder="e.g. Restaurant, Retail, Medical, Auto Repair..." />
                  </div>

                  {/* Owner Phone */}
                  <div>
                    <label className={labelClass}>Owner Phone <span className="text-red-500">*</span></label>
                    <input type="tel" name="owner_phone" required className={inputClass} placeholder="(801) 000-0000" />
                  </div>

                  {/* Email */}
                  <div>
                    <label className={labelClass}>Email Address</label>
                    <input type="email" name="email" className={inputClass} placeholder="you@yourbusiness.com" />
                  </div>

                  {/* Monthly Volume */}
                  <div>
                    <label className={labelClass}>Estimated Monthly Processing Volume <span className="text-red-500">*</span></label>
                    <select name="monthly_volume" required className={inputClass}>
                      <option value="">Select your monthly volume</option>
                      <option value="under-5k">Under $5,000/month</option>
                      <option value="5k-15k">$5,000 – $15,000/month</option>
                      <option value="15k-50k">$15,000 – $50,000/month</option>
                      <option value="50k-100k">$50,000 – $100,000/month</option>
                      <option value="100k-plus">$100,000+/month</option>
                    </select>
                  </div>

                  {/* Message */}
                  <div>
                    <label className={labelClass}>How Can We Help?</label>
                    <textarea name="message" rows={3} className={`${inputClass} resize-none`} placeholder="Tell us about your current setup or what you're looking for..." />
                  </div>

                  {/* A2P SMS Consent — Transactional */}
                  <div className="flex items-start gap-3 pt-1">
                    <input
                      type="checkbox"
                      id="sms_transactional"
                      name="sms_transactional"
                      checked={smsTransactional}
                      onChange={(e) => setSmsTransactional(e.target.checked)}
                      className="mt-0.5 h-4 w-4 shrink-0 rounded border-gray-300 accent-[#1e6fa8] cursor-pointer"
                    />
                    <label htmlFor="sms_transactional" className={smsConsentLabelClass}>
                      I agree to receive transactional and account-related text messages from UBC Unlimited at the number provided. Msg &amp; data rates may apply. Msg frequency varies. Reply STOP to unsubscribe. Reply HELP for assistance. See our{" "}
                      <Link href="/legal/privacy-policy" className="underline hover:text-[#1e6fa8] transition-colors">Privacy Policy</Link>{" "}and{" "}
                      <Link href="/legal/terms-of-service" className="underline hover:text-[#1e6fa8] transition-colors">Terms of Service</Link>.
                    </label>
                  </div>

                  {/* A2P SMS Consent — Marketing */}
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      id="sms_marketing"
                      name="sms_marketing"
                      checked={smsMarketing}
                      onChange={(e) => setSmsMarketing(e.target.checked)}
                      className="mt-0.5 h-4 w-4 shrink-0 rounded border-gray-300 accent-[#1e6fa8] cursor-pointer"
                    />
                    <label htmlFor="sms_marketing" className={smsConsentLabelClass}>
                      I agree to receive marketing and promotional text messages (offers, reminders, announcements, and follow-ups) from UBC Unlimited. Msg &amp; data rates may apply. Msg frequency varies. Reply STOP to unsubscribe. Reply HELP for assistance. See our{" "}
                      <Link href="/legal/privacy-policy" className="underline hover:text-[#1e6fa8] transition-colors">Privacy Policy</Link>{" "}and{" "}
                      <Link href="/legal/terms-of-service" className="underline hover:text-[#1e6fa8] transition-colors">Terms of Service</Link>.
                    </label>
                  </div>

                  <button type="submit" className="btn-teal w-full justify-center py-3">
                    <Send size={16} /> Send Message
                  </button>
                  <p className="text-xs text-gray-400 text-center">
                    We respond within 1 business hour. No spam, ever. View our{" "}
                    <Link href="/legal/privacy-policy" className="underline hover:text-[#1e6fa8]">Privacy Policy</Link>.
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

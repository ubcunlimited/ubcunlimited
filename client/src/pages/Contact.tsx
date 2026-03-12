import { useState } from "react";
import { Phone, Mail, MapPin, Clock, Send } from "lucide-react";
import PageLayout from "@/components/layout/PageLayout";
import { SITE } from "@/lib/config";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <PageLayout>
      <section className="bg-[#040c1c] py-16">
        <div className="container">
          <div className="max-w-xl">
            <div className="stat-badge mb-4">Contact Us</div>
            <h1 className="text-4xl font-extrabold text-white mb-4" style={{ fontFamily: 'Sora, sans-serif' }}>
              Talk to a Local Expert
            </h1>
            <p className="text-white/60 text-lg">
              Have questions about merchant services? We're here to help — no sales pressure, just honest answers.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div>
              <h2 className="text-2xl font-bold text-[#040c1c] mb-6" style={{ fontFamily: 'Sora, sans-serif' }}>Get in Touch</h2>
              <div className="space-y-5 mb-8">
                {[
                  { icon: Phone, label: "Phone", value: SITE.phone, href: SITE.phoneHref },
                  { icon: Mail, label: "Email", value: SITE.email, href: `mailto:${SITE.email}` },
                  { icon: MapPin, label: "Location", value: "Serving all of Utah", href: undefined },
                  { icon: Clock, label: "Hours", value: "Mon–Fri 8am–6pm MT · 24/7 Support", href: undefined },
                ].map((item) => (
                  <div key={item.label} className="flex gap-4 items-start">
                    <div className="w-10 h-10 rounded-xl bg-[#169fa8]/10 flex items-center justify-center shrink-0">
                      <item.icon size={18} className="text-[#169fa8]" />
                    </div>
                    <div>
                      <div className="text-xs text-gray-400 font-medium uppercase tracking-wide mb-0.5">{item.label}</div>
                      {item.href ? (
                        <a href={item.href} className="text-[#040c1c] font-semibold hover:text-[#169fa8] transition-colors">{item.value}</a>
                      ) : (
                        <div className="text-[#040c1c] font-semibold">{item.value}</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <div className="bg-[#f8fafc] rounded-xl p-5 border border-gray-100">
                <h3 className="font-bold text-[#040c1c] mb-2" style={{ fontFamily: 'Sora, sans-serif' }}>Prefer a callback?</h3>
                <p className="text-gray-500 text-sm mb-3">Leave your number and we'll call you back within 1 business hour.</p>
                <a href={SITE.phoneHref} className="btn-teal text-sm py-2.5 px-5">
                  <Phone size={14} /> Call Now
                </a>
              </div>
            </div>

            {/* Form */}
            <div>
              {submitted ? (
                <div className="bg-[#169fa8]/10 border border-[#169fa8]/20 rounded-2xl p-10 text-center">
                  <div className="text-4xl mb-4">✅</div>
                  <h3 className="text-xl font-bold text-[#040c1c] mb-2" style={{ fontFamily: 'Sora, sans-serif' }}>Message Sent!</h3>
                  <p className="text-gray-500">We'll get back to you within 1 business hour.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} data-ghl-form="contact" className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-[#040c1c] mb-1.5">First Name</label>
                      <input type="text" required className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#169fa8] focus:ring-2 focus:ring-[#169fa8]/20 transition-all" placeholder="John" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#040c1c] mb-1.5">Last Name</label>
                      <input type="text" required className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#169fa8] focus:ring-2 focus:ring-[#169fa8]/20 transition-all" placeholder="Smith" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#040c1c] mb-1.5">Business Name</label>
                    <input type="text" className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#169fa8] focus:ring-2 focus:ring-[#169fa8]/20 transition-all" placeholder="Your Business Name" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#040c1c] mb-1.5">Email</label>
                    <input type="email" required className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#169fa8] focus:ring-2 focus:ring-[#169fa8]/20 transition-all" placeholder="john@yourbusiness.com" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#040c1c] mb-1.5">Phone</label>
                    <input type="tel" className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#169fa8] focus:ring-2 focus:ring-[#169fa8]/20 transition-all" placeholder="(801) 000-0000" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#040c1c] mb-1.5">Message</label>
                    <textarea required rows={4} className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#169fa8] focus:ring-2 focus:ring-[#169fa8]/20 transition-all resize-none" placeholder="How can we help your business?" />
                  </div>
                  <button type="submit" className="btn-teal w-full justify-center py-3">
                    <Send size={16} /> Send Message
                  </button>
                  <p className="text-xs text-gray-400 text-center">We respond within 1 business hour. No spam, ever.</p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}

// LeadCaptureForm — UBC Unlimited
// Inline lead capture / demo request form for embedding on solution or industry pages.
// Usage: <LeadCaptureForm title="Ready to Transform Your Business?" />

import { useState } from "react";
import { Link } from "wouter";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { useRecaptcha } from "@/hooks/useRecaptcha";

interface LeadCaptureFormProps {
  title?: string;
  subtitle?: string;
  ctaLabel?: string;
  /** Show city/state fields */
  showLocation?: boolean;
  /** Show newsletter opt-in checkbox */
  showNewsletter?: boolean;
  dark?: boolean;
}

const inputClass =
  "w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#c9a84c] focus:ring-2 focus:ring-[#c9a84c]/20 transition-all text-[#080808] placeholder-gray-400 bg-white";

export default function LeadCaptureForm({
  title = "Ready to Transform Your Business?",
  subtitle = "Get in touch today. We're happy to answer any questions and provide a no-obligation quote.",
  ctaLabel = "Submit",
  showLocation = true,
  showNewsletter = false,
  dark = false,
}: LeadCaptureFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const [newsletter, setNewsletter] = useState(false);
  const { getToken } = useRecaptcha();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await getToken("submit_lead_capture");
    setSubmitted(true);
  };

  return (
    <section className={`py-16 ${dark ? "bg-[#0d0d0d]" : "bg-white"}`}>
      <div className="container max-w-2xl">
        <div className="text-center mb-8">
          <h2
            className={`text-2xl md:text-3xl font-bold mb-3 ${dark ? "text-white" : "text-[#080808]"}`}
            style={{ fontFamily: "Sora, sans-serif" }}
          >
            {title}
          </h2>
          {subtitle && (
            <p className={`text-sm ${dark ? "text-white/70" : "text-gray-600"}`}>{subtitle}</p>
          )}
        </div>

        {submitted ? (
          <div role="status" aria-live="polite" aria-atomic="true" className="flex flex-col items-center text-center py-10">
            <div className="w-14 h-14 rounded-full bg-[#c9a84c]/15 flex items-center justify-center mb-4">
              <CheckCircle2 size={28} className="text-[#c9a84c]" />
            </div>
            <h3
              className={`text-xl font-bold mb-2 ${dark ? "text-white" : "text-[#080808]"}`}
              style={{ fontFamily: "Sora, sans-serif" }}
            >
              Message Received!
            </h3>
            <p className={`text-sm ${dark ? "text-white/70" : "text-gray-600"}`}>
              A member of our team will be in touch within 1 business day.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className={`block text-sm font-medium mb-1.5 ${dark ? "text-white/80" : "text-[#080808]"}`} htmlFor="lcf-fname">
                  First Name <span className="text-red-500">*</span>
                </label>
                <input id="lcf-fname" type="text" required placeholder="Jane" className={inputClass} />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-1.5 ${dark ? "text-white/80" : "text-[#080808]"}`} htmlFor="lcf-lname">
                  Last Name <span className="text-red-500">*</span>
                </label>
                <input id="lcf-lname" type="text" required placeholder="Smith" className={inputClass} />
              </div>
            </div>

            <div>
              <label className={`block text-sm font-medium mb-1.5 ${dark ? "text-white/80" : "text-[#080808]"}`} htmlFor="lcf-email">
                Email <span className="text-red-500">*</span>
              </label>
              <input id="lcf-email" type="email" required placeholder="jane@yourbusiness.com" className={inputClass} />
            </div>

            <div>
              <label className={`block text-sm font-medium mb-1.5 ${dark ? "text-white/80" : "text-[#080808]"}`} htmlFor="lcf-phone">
                Phone <span className="text-red-500">*</span>
              </label>
              <input id="lcf-phone" type="tel" required placeholder="(801) 555-0100" className={inputClass} />
            </div>

            {showLocation && (
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className={`block text-sm font-medium mb-1.5 ${dark ? "text-white/80" : "text-[#080808]"}`} htmlFor="lcf-city">
                    City
                  </label>
                  <input id="lcf-city" type="text" placeholder="Salt Lake City" className={inputClass} />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-1.5 ${dark ? "text-white/80" : "text-[#080808]"}`} htmlFor="lcf-state">
                    State
                  </label>
                  <input id="lcf-state" type="text" placeholder="UT" className={inputClass} />
                </div>
              </div>
            )}

            <div>
              <label className={`block text-sm font-medium mb-1.5 ${dark ? "text-white/80" : "text-[#080808]"}`} htmlFor="lcf-message">
                Message
              </label>
              <textarea
                id="lcf-message"
                rows={3}
                placeholder="Tell us about your business or what you're looking for..."
                className={inputClass}
              />
            </div>

            {showNewsletter && (
              <label className="flex items-start gap-3 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={newsletter}
                  onChange={(e) => setNewsletter(e.target.checked)}
                  className="mt-0.5 accent-[#c9a84c]"
                />
                <span className={`text-xs leading-relaxed ${dark ? "text-white/70" : "text-gray-600"}`}>
                  Sign up for news and updates from UBC Unlimited.
                </span>
              </label>
            )}

            {/* SMS consent */}
            <p className={`text-xs leading-relaxed ${dark ? "text-white/60" : "text-gray-600"}`}>
              By submitting this form you agree to receive transactional SMS messages from UBC Unlimited. Message &amp; data rates may apply. Reply STOP to opt out. See our{" "}
              <Link href="/privacy-policy" className="underline hover:text-[#c9a84c]">Privacy Policy</Link>.
            </p>

            <button type="submit" className="btn-gold w-full justify-center py-3 text-sm font-semibold">
              {ctaLabel} <ArrowRight size={15} className="ml-1" />
            </button>
          </form>
        )}
      </div>
    </section>
  );
}

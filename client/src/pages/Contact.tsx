// Contact — UBC Unlimited
// Three distinct CTAs: Book a Consultation | Request a Quote | Statement Review (with file upload)
import { useState, useRef } from "react";
import { Phone, Mail, MapPin, Clock, CalendarCheck, FileText, Upload, ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import { Link } from "wouter";
import PageLayout from "@/components/layout/PageLayout";
import SEO from "@/components/SEO";
import { SITE } from "@/lib/config";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import { trackLead } from "@/lib/pixel";
import { useRecaptcha } from "@/hooks/useRecaptcha";

const inputClass =
  "w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#c9a84c] focus:ring-2 focus:ring-[#c9a84c]/20 transition-all text-[#080808] placeholder-gray-400 bg-white";
const labelClass = "block text-sm font-medium text-[#080808] mb-1.5";

type Tab = "consultation" | "quote" | "statement";

function LegalConsent({ smsChecked, onSmsChange, termsChecked, onTermsChange, termsError }: {
  smsChecked: boolean; onSmsChange: (v: boolean) => void;
  termsChecked: boolean; onTermsChange: (v: boolean) => void;
  termsError?: string;
}) {
  return (
    <div className="pt-1 space-y-3">
      {/* Terms & Privacy acceptance */}
      <div>
        <label className="flex items-start gap-3 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={termsChecked}
            onChange={(e) => onTermsChange(e.target.checked)}
            className="mt-0.5 accent-[#c9a84c]"
          />
          <span className="text-xs text-gray-500 leading-relaxed">
            I agree to the{" "}
            <Link href="/privacy-policy" target="_blank" rel="noopener noreferrer" className="underline hover:text-[#c9a84c]">Privacy Policy</Link>{" "}
            and{" "}
            <Link href="/terms-of-service" target="_blank" rel="noopener noreferrer" className="underline hover:text-[#c9a84c]">Terms of Service</Link>.
          </span>
        </label>
        {termsError && <p className="text-red-500 text-xs mt-1 ml-6">{termsError}</p>}
      </div>
      {/* SMS consent */}
      <label className="flex items-start gap-3 cursor-pointer select-none">
        <input
          type="checkbox"
          checked={smsChecked}
          onChange={(e) => onSmsChange(e.target.checked)}
          className="mt-0.5 accent-[#c9a84c]"
        />
        <span className="text-xs text-gray-500 leading-relaxed">
          I consent to receive transactional SMS messages (appointment confirmations, follow-ups) from UBC Unlimited at the number provided. Message &amp; data rates may apply. Reply STOP to opt out.
        </span>
      </label>
    </div>
  );
}

function SuccessCard({ title, message }: { title: string; message: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="w-16 h-16 rounded-full bg-[#c9a84c]/15 flex items-center justify-center mb-5">
        <CheckCircle2 size={32} className="text-[#c9a84c]" />
      </div>
      <h2 className="text-2xl font-bold text-[#080808] mb-3" style={{ fontFamily: "Sora, sans-serif" }}>{title}</h2>
      <p className="text-gray-500 text-sm max-w-md leading-relaxed">{message}</p>
    </div>
  );
}

// ─── Consultation Form ────────────────────────────────────────────────────────
function ConsultationForm({ onSuccess }: { onSuccess: () => void }) {
  const [form, setForm] = useState({
    firstName: "", lastName: "", email: "", phone: "",
    businessName: "", businessType: "Restaurant", preferredTime: "", message: "", smsConsent: false,
  });
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [termsError, setTermsError] = useState("");
  const { getToken: getConsultToken } = useRecaptcha();
  const mutation = trpc.forms.submitConsultation.useMutation({
    onSuccess: () => { trackLead(); onSuccess(); },
    onError: () => toast.error("Something went wrong. Please try again or call us directly."),
  });

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!termsAccepted) { setTermsError("Please accept the Privacy Policy and Terms of Service."); return; }
    setTermsError("");
    getConsultToken("submit_consultation").then((recaptchaToken) => {
      mutation.mutate({ ...form, recaptchaToken });
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <h2 className="text-2xl font-bold text-[#080808] mb-1" style={{ fontFamily: "Sora, sans-serif" }}>Book a Consultation</h2>
      <p className="text-gray-500 text-sm mb-5">Schedule a no-obligation call with {SITE.founder} to discuss your business's payment processing needs and explore your options.</p>
      <div className="grid sm:grid-cols-2 gap-4">
        <div><label className={labelClass} htmlFor="c-fname">First Name <span className="text-red-500">*</span></label><input id="c-fname" type="text" required value={form.firstName} onChange={set("firstName")} placeholder="Jane" className={inputClass} /></div>
        <div><label className={labelClass} htmlFor="c-lname">Last Name <span className="text-red-500">*</span></label><input id="c-lname" type="text" required value={form.lastName} onChange={set("lastName")} placeholder="Smith" className={inputClass} /></div>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <div><label className={labelClass} htmlFor="c-email">Email <span className="text-red-500">*</span></label><input id="c-email" type="email" required value={form.email} onChange={set("email")} placeholder="jane@yourbusiness.com" className={inputClass} /></div>
        <div><label className={labelClass} htmlFor="c-phone">Phone <span className="text-red-500">*</span></label><input id="c-phone" type="tel" required value={form.phone} onChange={set("phone")} placeholder="(801) 555-0100" className={inputClass} /></div>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <div><label className={labelClass} htmlFor="c-business">Business Name <span className="text-red-500">*</span></label><input id="c-business" type="text" required value={form.businessName} onChange={set("businessName")} placeholder="Your Business LLC" className={inputClass} /></div>
        <div>
          <label className={labelClass} htmlFor="c-type">Business Type <span className="text-red-500">*</span></label>
          <select id="c-type" value={form.businessType} onChange={set("businessType")} className={inputClass}>
            {["Restaurant", "Retail", "Medical / Healthcare", "Automotive", "Salon / Spa", "eCommerce", "Professional Services", "Bar / Nightclub", "Non-Profit", "High-Risk", "Other"].map(t => <option key={t}>{t}</option>)}
          </select>
        </div>
      </div>
      <div>
        <label className={labelClass} htmlFor="c-preferred">Preferred Time to Connect</label>
        <select id="c-preferred" value={form.preferredTime} onChange={set("preferredTime")} className={inputClass}>
          <option value="">Select a time window</option>
          <option>Morning (8am–12pm MT)</option>
          <option>Afternoon (12pm–4pm MT)</option>
          <option>Late Afternoon (4pm–6pm MT)</option>
        </select>
      </div>
      <div><label className={labelClass} htmlFor="c-notes">What would you like to discuss?</label><textarea id="c-notes" rows={3} value={form.message} onChange={set("message")} placeholder="e.g., I want to reduce my processing fees, explore POS options, or learn about high-risk accounts..." className={inputClass} /></div>
      <LegalConsent
        smsChecked={form.smsConsent} onSmsChange={(v) => setForm((f) => ({ ...f, smsConsent: v }))}
        termsChecked={termsAccepted} onTermsChange={(v) => { setTermsAccepted(v); if (v) setTermsError(""); }}
        termsError={termsError}
      />
      <button type="submit" disabled={mutation.isPending} className="btn-gold w-full sm:w-auto px-8 py-3 text-sm font-semibold flex items-center gap-2">
        {mutation.isPending ? <><Loader2 size={15} className="animate-spin" /> Sending…</> : <>Book My Consultation <ArrowRight size={15} /></>}
      </button>
    </form>
  );
}

// ─── Quote Form ───────────────────────────────────────────────────────────────
function QuoteForm({ onSuccess }: { onSuccess: () => void }) {
  const [form, setForm] = useState({
    firstName: "", lastName: "", email: "", phone: "",
    businessName: "", businessType: "Restaurant", monthlyVolume: "", currentProcessor: "",
    solutions: [] as string[], message: "", smsConsent: false,
  });
  const { getToken: getQuoteToken } = useRecaptcha();
  const mutation = trpc.forms.submitQuote.useMutation({
    onSuccess: () => { trackLead(); onSuccess(); },
    onError: () => toast.error("Something went wrong. Please try again or call us directly."),
  });

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const toggleSolution = (sol: string) =>
    setForm((f) => ({
      ...f,
      solutions: f.solutions.includes(sol) ? f.solutions.filter((s) => s !== sol) : [...f.solutions, sol],
    }));

  const [termsAccepted, setTermsAccepted] = useState(false);
  const [termsError, setTermsError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!termsAccepted) { setTermsError("Please accept the Privacy Policy and Terms of Service."); return; }
    setTermsError("");
    getQuoteToken("submit_quote").then((recaptchaToken) => {
      mutation.mutate({ ...form, recaptchaToken });
    });
  };

  const solutionOptions = ["Credit Card Processing", "Cash Discount & Dual Pricing / Cash Discount & Dual Pricing", "POS System", "eCommerce / Payment Gateway", "ACH / eCheck", "Mobile Processing", "Virtual Terminal", "Gift & Loyalty", "High-Risk Processing"];

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <h2 className="text-2xl font-bold text-[#080808] mb-1" style={{ fontFamily: "Sora, sans-serif" }}>Request a Custom Quote</h2>
      <p className="text-gray-500 text-sm mb-5">Tell us a bit about your business and we'll put together a tailored merchant services proposal with transparent pricing.</p>
      <div className="grid sm:grid-cols-2 gap-4">
        <div><label className={labelClass} htmlFor="q-fname">First Name <span className="text-red-500">*</span></label><input id="q-fname" type="text" required value={form.firstName} onChange={set("firstName")} placeholder="Jane" className={inputClass} /></div>
        <div><label className={labelClass} htmlFor="q-lname">Last Name <span className="text-red-500">*</span></label><input id="q-lname" type="text" required value={form.lastName} onChange={set("lastName")} placeholder="Smith" className={inputClass} /></div>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <div><label className={labelClass} htmlFor="q-email">Email <span className="text-red-500">*</span></label><input id="q-email" type="email" required value={form.email} onChange={set("email")} placeholder="jane@yourbusiness.com" className={inputClass} /></div>
        <div><label className={labelClass} htmlFor="q-phone">Phone <span className="text-red-500">*</span></label><input id="q-phone" type="tel" required value={form.phone} onChange={set("phone")} placeholder="(801) 555-0100" className={inputClass} /></div>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <div><label className={labelClass} htmlFor="q-business">Business Name <span className="text-red-500">*</span></label><input id="q-business" type="text" required value={form.businessName} onChange={set("businessName")} placeholder="Your Business LLC" className={inputClass} /></div>
        <div>
          <label className={labelClass} htmlFor="q-industry">Business Type <span className="text-red-500">*</span></label>
          <select id="q-industry" value={form.businessType} onChange={set("businessType")} className={inputClass}>
            {["Restaurant", "Retail", "Medical / Healthcare", "Automotive", "Salon / Spa", "eCommerce", "Professional Services", "Bar / Nightclub", "Non-Profit", "High-Risk", "Other"].map(t => <option key={t}>{t}</option>)}
          </select>
        </div>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className={labelClass} htmlFor="q-volume">Estimated Monthly Volume</label>
          <select id="q-volume" value={form.monthlyVolume} onChange={set("monthlyVolume")} className={inputClass}>
            <option value="">Select range</option>
            <option>Under $5,000</option><option>$5,000–$15,000</option><option>$15,000–$50,000</option>
            <option>$50,000–$150,000</option><option>$150,000+</option>
          </select>
        </div>
        <div><label className={labelClass} htmlFor="q-processor">Current Processor</label><input id="q-processor" type="text" value={form.currentProcessor} onChange={set("currentProcessor")} placeholder="e.g., Square, Stripe, Heartland…" className={inputClass} /></div>
      </div>
      <div>
        <label className={labelClass}>Solutions You're Interested In</label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {solutionOptions.map((sol) => (
            <label key={sol} className="flex items-center gap-2 text-xs text-gray-600 cursor-pointer select-none">
              <input type="checkbox" checked={form.solutions.includes(sol)} onChange={() => toggleSolution(sol)} className="accent-[#c9a84c]" />
              {sol}
            </label>
          ))}
        </div>
      </div>
      <div><label className={labelClass} htmlFor="q-notes">Additional Notes</label><textarea id="q-notes" rows={3} value={form.message} onChange={set("message")} placeholder="Anything else we should know about your business or current setup?" className={inputClass} /></div>
      <LegalConsent
        smsChecked={form.smsConsent} onSmsChange={(v) => setForm((f) => ({ ...f, smsConsent: v }))}
        termsChecked={termsAccepted} onTermsChange={(v) => { setTermsAccepted(v); if (v) setTermsError(""); }}
        termsError={termsError}
      />
      <button type="submit" disabled={mutation.isPending} className="btn-gold w-full sm:w-auto px-8 py-3 text-sm font-semibold flex items-center gap-2">
        {mutation.isPending ? <><Loader2 size={15} className="animate-spin" /> Sending…</> : <>Request My Quote <ArrowRight size={15} /></>}
      </button>
    </form>
  );
}

// ─── Statement Review Form ────────────────────────────────────────────────────
function StatementReviewForm({ onSuccess }: { onSuccess: () => void }) {
  const [form, setForm] = useState({
    firstName: "", lastName: "", email: "", phone: "",
    businessName: "", currentProcessor: "", message: "", smsConsent: false,
  });
  const [fileName, setFileName] = useState<string | null>(null);
  const [fileData, setFileData] = useState<string | null>(null);
  const [fileType, setFileType] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { getToken: getStatementToken } = useRecaptcha();

  const mutation = trpc.forms.submitStatementReview.useMutation({
    onSuccess: () => { trackLead(); onSuccess(); },
    onError: () => toast.error("Something went wrong. Please try again or call us directly."),
  });

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFileName(file.name);
    setFileType(file.type);
    const reader = new FileReader();
    reader.onload = (ev) => {
      const result = ev.target?.result as string;
      // Strip the data URL prefix to get raw base64
      setFileData(result.split(",")[1] ?? null);
    };
    reader.readAsDataURL(file);
  };

  const [termsAccepted, setTermsAccepted] = useState(false);
  const [termsError, setTermsError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!termsAccepted) { setTermsError("Please accept the Privacy Policy and Terms of Service."); return; }
    setTermsError("");
    getStatementToken("submit_statement_review").then((recaptchaToken) => {
      mutation.mutate({
        ...form,
        ...(fileData && fileName && fileType ? { fileData, fileName, fileType } : {}),
        recaptchaToken,
      });
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <h2 className="text-2xl font-bold text-[#080808] mb-1" style={{ fontFamily: "Sora, sans-serif" }}>Statement Review</h2>
      <p className="text-gray-500 text-sm mb-2">Upload your most recent processing statement and we'll do a line-by-line analysis to show you exactly what you're paying — and how much you could save with UBC Unlimited.</p>
      <div className="bg-[#f8fafc] border border-gray-100 rounded-xl p-4 flex flex-wrap gap-4 mb-2">
        {["No obligation", "Results in 1–2 business days", "Confidential & secure", "Real savings numbers"].map((item) => (
          <div key={item} className="flex items-center gap-1.5 text-sm text-gray-600">
            <CheckCircle2 size={14} className="text-[#c9a84c]" />{item}
          </div>
        ))}
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <div><label className={labelClass} htmlFor="s-fname">First Name <span className="text-red-500">*</span></label><input id="s-fname" type="text" required value={form.firstName} onChange={set("firstName")} placeholder="Jane" className={inputClass} /></div>
        <div><label className={labelClass} htmlFor="s-lname">Last Name <span className="text-red-500">*</span></label><input id="s-lname" type="text" required value={form.lastName} onChange={set("lastName")} placeholder="Smith" className={inputClass} /></div>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <div><label className={labelClass} htmlFor="s-email">Email <span className="text-red-500">*</span></label><input id="s-email" type="email" required value={form.email} onChange={set("email")} placeholder="jane@yourbusiness.com" className={inputClass} /></div>
        <div><label className={labelClass} htmlFor="s-phone">Phone <span className="text-red-500">*</span></label><input id="s-phone" type="tel" required value={form.phone} onChange={set("phone")} placeholder="(801) 555-0100" className={inputClass} /></div>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <div><label className={labelClass} htmlFor="s-business">Business Name <span className="text-red-500">*</span></label><input id="s-business" type="text" required value={form.businessName} onChange={set("businessName")} placeholder="Your Business LLC" className={inputClass} /></div>
        <div><label className={labelClass} htmlFor="s-processor">Current Processor</label><input id="s-processor" type="text" value={form.currentProcessor} onChange={set("currentProcessor")} placeholder="e.g., Square, Stripe, Heartland…" className={inputClass} /></div>
      </div>
      <div>
        <label className={labelClass} htmlFor="s-file">
          Upload Your Processing Statement <span className="text-gray-400 font-normal">(PDF, JPG, PNG — up to 10 MB)</span>
        </label>
        <div
          className="relative border-2 border-dashed border-gray-200 rounded-xl p-6 text-center cursor-pointer hover:border-[#c9a84c]/50 transition-all"
          onClick={() => fileInputRef.current?.click()}
          onKeyDown={(e) => e.key === "Enter" && fileInputRef.current?.click()}
          tabIndex={0}
          role="button"
          aria-label="Click to upload your processing statement"
        >
          <input ref={fileInputRef} id="s-file" type="file" accept=".pdf,.jpg,.jpeg,.png" className="sr-only" onChange={handleFileChange} />
          <Upload size={28} className="mx-auto mb-2 text-gray-300" aria-hidden="true" />
          {fileName ? (
            <p className="text-sm font-medium text-[#080808]">{fileName}</p>
          ) : (
            <>
              <p className="text-sm font-medium text-gray-500">Click to upload or drag and drop</p>
              <p className="text-xs text-gray-400 mt-1">PDF, JPG, or PNG · Max 10 MB</p>
            </>
          )}
        </div>
        <p className="text-xs text-gray-400 mt-2">Don't have a digital copy? Describe your current processor and monthly volume in the notes field below and we'll still provide an estimate.</p>
      </div>
      <div><label className={labelClass} htmlFor="s-notes">Current Processor / Notes</label><textarea id="s-notes" rows={3} value={form.message} onChange={set("message")} placeholder="e.g., Currently with Square, processing about $30k/month, mostly card-present transactions..." className={inputClass} /></div>
      <LegalConsent
        smsChecked={form.smsConsent} onSmsChange={(v) => setForm((f) => ({ ...f, smsConsent: v }))}
        termsChecked={termsAccepted} onTermsChange={(v) => { setTermsAccepted(v); if (v) setTermsError(""); }}
        termsError={termsError}
      />
      <button type="submit" disabled={mutation.isPending} className="btn-gold w-full sm:w-auto px-8 py-3 text-sm font-semibold flex items-center gap-2">
        {mutation.isPending ? <><Loader2 size={15} className="animate-spin" /> Uploading…</> : <>Submit for Free Review <ArrowRight size={15} /></>}
      </button>
    </form>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function Contact() {
  const [activeTab, setActiveTab] = useState<Tab>("consultation");
  const [submitted, setSubmitted] = useState<Tab | null>(null);

  const tabs: { id: Tab; label: string; icon: React.ReactNode; desc: string }[] = [
    { id: "consultation", label: "Book a Consultation", icon: <CalendarCheck size={18} />, desc: "Schedule an in-depth, no-pressure conversation with a local Utah expert. We will take time to learn about your setup and help find a solution that is right for you." },
    { id: "quote", label: "Request a Quote", icon: <FileText size={18} />, desc: "Tell us about your business and get a custom pricing proposal." },
    { id: "statement", label: "Statement Review", icon: <Upload size={18} />, desc: "Upload your statement and see exactly how much you can save." },
  ];

  const handleTabChange = (tab: Tab) => {
    setActiveTab(tab);
    setSubmitted(null);
  };

  return (
    <PageLayout>
      <SEO
        title="Contact UBC Unlimited — Book a Consultation, Get a Quote, Statement Review"
        description="Contact UBC Unlimited to book a consultation, request a custom merchant services quote, or upload your processing statement for a complimentary savings analysis. Utah's local payment experts."
        canonical="/contact"
      />

      {/* Hero */}
      <section className="bg-[#080808] py-16">
        <div className="container">
          <div className="max-w-2xl">
            <p className="text-[#c9a84c] text-xs font-semibold tracking-widest uppercase mb-3">Contact Us</p>
            <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 leading-tight" style={{ fontFamily: "Sora, sans-serif" }}>
              Talk to a Local Expert
            </h1>
            <p className="text-white/60 text-lg">
              No sales pressure — just honest answers from a Utah team that's been in merchant services for {SITE.yearsInBusiness} years. Choose how you'd like to connect below.
            </p>
          </div>
        </div>
      </section>

      {/* Contact info bar */}
      <section className="bg-[#111111] border-b border-white/10 py-5">
        <div className="container">
          <div className="flex flex-wrap gap-6 items-center">
            <a href={SITE.phoneHref} className="flex items-center gap-2 text-sm text-white/60 hover:text-[#c9a84c] transition-colors">
              <Phone size={15} className="text-[#c9a84c]" aria-hidden="true" />{SITE.phone}
            </a>
            <a href={`mailto:${SITE.email}`} className="flex items-center gap-2 text-sm text-white/60 hover:text-[#c9a84c] transition-colors">
              <Mail size={15} className="text-[#c9a84c]" aria-hidden="true" />{SITE.email}
            </a>
            <div className="flex items-center gap-2 text-sm text-white/60">
              <MapPin size={15} className="text-[#c9a84c]" aria-hidden="true" />Serving all of Utah
            </div>
            <div className="flex items-center gap-2 text-sm text-white/60">
              <Clock size={15} className="text-[#c9a84c]" aria-hidden="true" />Mon–Fri 8am–6pm MT
            </div>
          </div>
        </div>
      </section>

      {/* Tab selector + forms */}
      <section className="py-14 bg-white">
        <div className="container max-w-4xl">

          {/* Tab buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-10">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`flex flex-col items-start gap-2 p-4 rounded-xl border-2 text-left transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a84c] ${
                  activeTab === tab.id ? "border-[#c9a84c] bg-[#c9a84c]/5 shadow-sm" : "border-gray-200 hover:border-gray-300 bg-white"
                }`}
              >
                <span className={activeTab === tab.id ? "text-[#c9a84c]" : "text-gray-400"}>{tab.icon}</span>
                <span className={`text-sm font-semibold ${activeTab === tab.id ? "text-[#080808]" : "text-gray-500"}`} style={{ fontFamily: "Sora, sans-serif" }}>
                  {tab.label}
                </span>
                <span className="text-xs text-gray-400 leading-relaxed">{tab.desc}</span>
              </button>
            ))}
          </div>

          {/* Book a Consultation */}
          {activeTab === "consultation" && (
            submitted === "consultation" ? (
              <SuccessCard title="Consultation Request Received!" message={`Thanks! A member of our team will reach out within 1 business day to confirm your consultation time. You can also call us directly at ${SITE.phone}.`} />
            ) : (
              <ConsultationForm onSuccess={() => setSubmitted("consultation")} />
            )
          )}

          {/* Request a Quote */}
          {activeTab === "quote" && (
            submitted === "quote" ? (
              <SuccessCard title="Quote Request Received!" message="We'll review your information and send a custom pricing proposal within 1 business day. Questions? Call us anytime." />
            ) : (
              <QuoteForm onSuccess={() => setSubmitted("quote")} />
            )
          )}

          {/* Statement Review */}
          {activeTab === "statement" && (
            submitted === "statement" ? (
              <SuccessCard title="Statement Review Submitted!" message="We'll analyze your statement and send you a detailed savings breakdown within 1–2 business days. No obligation — just real numbers." />
            ) : (
              <StatementReviewForm onSuccess={() => setSubmitted("statement")} />
            )
          )}
        </div>
      </section>
    </PageLayout>
  );
}

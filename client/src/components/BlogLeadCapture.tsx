import { useState } from "react";
import { Link } from "wouter";
import { trpc } from "@/lib/trpc";
import { Mail, CheckCircle, Loader2 } from "lucide-react";
import { useRecaptcha } from "@/hooks/useRecaptcha";

interface BlogLeadCaptureProps {
  /** Optional slug of the current blog post for attribution */
  sourcePage?: string;
}

export default function BlogLeadCapture({ sourcePage }: BlogLeadCaptureProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<{ name?: string; email?: string; agreed?: string }>({});

  const { getToken } = useRecaptcha();

  const submitLead = trpc.forms.submitBlogLead.useMutation({
    onSuccess: () => {
      setSubmitted(true);
    },
  });

  const validate = () => {
    const errors: { name?: string; email?: string; agreed?: string } = {};
    if (!name.trim()) errors.name = "Please enter your name.";
    if (!email.trim()) errors.email = "Please enter your email.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      errors.email = "Please enter a valid email address.";
    if (!agreed) errors.agreed = "Please accept the terms to continue.";
    return errors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors = validate();
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }
    setFieldErrors({});
    getToken("submit_blog_lead").then((recaptchaToken) => {
      submitLead.mutate({ name: name.trim(), email: email.trim(), sourcePage, recaptchaToken });
    });
  };

  if (submitted) {
    return (
      <div role="status" aria-live="polite" aria-atomic="true" className="bg-[#1a1a1a] border border-[#c9a84c]/30 rounded-xl p-6 text-center">
        <div className="flex justify-center mb-3">
          <div className="w-12 h-12 rounded-full bg-[#c9a84c]/15 flex items-center justify-center">
            <CheckCircle size={24} className="text-[#c9a84c]" />
          </div>
        </div>
        <h3
          className="font-bold text-white text-base mb-1"
          style={{ fontFamily: "Sora, sans-serif" }}
        >
          You're on the list!
        </h3>
        <p className="text-gray-400 text-sm leading-relaxed">
          We'll be in touch with tips and resources to help you reduce your processing costs.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-[#1a1a1a] border border-[#c9a84c]/30 rounded-xl p-6">
      {/* Icon + heading */}
      <div className="flex items-start gap-3 mb-4">
        <div className="w-9 h-9 rounded-lg bg-[#c9a84c]/15 flex items-center justify-center flex-shrink-0 mt-0.5">
          <Mail size={16} className="text-[#c9a84c]" />
        </div>
        <div>
          <h3
            className="font-bold text-white text-[15px] leading-snug"
            style={{ fontFamily: "Sora, sans-serif" }}
          >
            Get the Free Processing Fee Guide
          </h3>
          <p className="text-gray-400 text-xs mt-1 leading-relaxed">
            Practical tips to lower your rates — no sales pitch, just useful information.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} noValidate className="space-y-3">
        {/* Name */}
        <div>
          <input
            type="text"
            placeholder="Your name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              if (fieldErrors.name) setFieldErrors((prev) => ({ ...prev, name: undefined }));
            }}
            className={`w-full bg-[#111] border rounded-lg px-3 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#c9a84c]/60 transition ${
              fieldErrors.name ? "border-red-500" : "border-white/10"
            }`}
          />
          {fieldErrors.name && (
            <p className="text-red-400 text-xs mt-1">{fieldErrors.name}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <input
            type="email"
            placeholder="Your email address"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (fieldErrors.email) setFieldErrors((prev) => ({ ...prev, email: undefined }));
            }}
            className={`w-full bg-[#111] border rounded-lg px-3 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#c9a84c]/60 transition ${
              fieldErrors.email ? "border-red-500" : "border-white/10"
            }`}
          />
          {fieldErrors.email && (
            <p className="text-red-400 text-xs mt-1">{fieldErrors.email}</p>
          )}
        </div>

        {/* Acceptance checkbox */}
        <div>
          <label className="flex items-start gap-2.5 cursor-pointer group">
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => {
                setAgreed(e.target.checked);
                if (fieldErrors.agreed) setFieldErrors((prev) => ({ ...prev, agreed: undefined }));
              }}
              className="mt-0.5 w-4 h-4 rounded border-white/20 bg-[#111] accent-[#c9a84c] cursor-pointer flex-shrink-0"
            />
            <span className="text-gray-400 text-[11px] leading-relaxed">
              I agree to the{" "}
              <Link
                href="/privacy-policy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#c9a84c] hover:underline"
                onClick={(e) => e.stopPropagation()}
              >
                Privacy Policy
              </Link>{" "}
              and{" "}
              <Link
                href="/terms-of-service"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#c9a84c] hover:underline"
                onClick={(e) => e.stopPropagation()}
              >
                Terms of Service
              </Link>
              .
            </span>
          </label>
          {fieldErrors.agreed && (
            <p className="text-red-400 text-xs mt-1 ml-6">{fieldErrors.agreed}</p>
          )}
        </div>

        {/* Error from server */}
        {submitLead.error && (
          <p className="text-red-400 text-xs">{submitLead.error.message}</p>
        )}

        <button
          type="submit"
          disabled={submitLead.isPending}
          className="w-full bg-[#c9a84c] hover:bg-[#b8963e] text-[#080808] font-semibold text-sm rounded-lg py-2.5 transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
        >
          {submitLead.isPending ? (
            <>
              <Loader2 size={14} className="animate-spin" />
              Sending…
            </>
          ) : (
            "Send Me the Guide"
          )}
        </button>

        <p className="text-gray-600 text-[11px] text-center leading-relaxed">
          No spam. Unsubscribe at any time.
        </p>
      </form>
    </div>
  );
}

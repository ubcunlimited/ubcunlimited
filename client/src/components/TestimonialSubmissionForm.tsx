import { useState } from "react";
import { Link } from "wouter";
import { trpc } from "@/lib/trpc";
import { MessageSquarePlus, CheckCircle, Loader2, Star } from "lucide-react";
import { useRecaptcha } from "@/hooks/useRecaptcha";

const INDUSTRIES = [
  "Restaurants",
  "Retail",
  "Medical",
  "Automotive",
  "eCommerce",
  "Salons & Spas",
  "Nonprofit",
  "Bars & Nightclubs",
  "Professional Services",
  "Other",
] as const;

type Industry = (typeof INDUSTRIES)[number];

interface FieldErrors {
  firstName?: string;
  lastName?: string;
  phone?: string;
  businessName?: string;
  location?: string;
  industry?: string;
  rating?: string;
  quote?: string;
  email?: string;
  agreed?: string;
}

export default function TestimonialSubmissionForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [location, setLocation] = useState("");
  const [industry, setIndustry] = useState<Industry | "">("");
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [quote, setQuote] = useState("");
  const [email, setEmail] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  const { getToken } = useRecaptcha();

  const submitTestimonial = trpc.testimonials.submit.useMutation({
    onSuccess: () => {
      setSubmitted(true);
    },
  });

  const clearError = (field: keyof FieldErrors) =>
    setFieldErrors((prev) => ({ ...prev, [field]: undefined }));

  const validate = (): FieldErrors => {
    const errors: FieldErrors = {};
    if (!firstName.trim()) errors.firstName = "Please enter your first name.";
    if (!lastName.trim()) errors.lastName = "Please enter your last name.";
    if (!businessName.trim()) errors.businessName = "Please enter your business name.";
    if (!location.trim()) errors.location = "Please enter your city or location.";
    if (!industry) errors.industry = "Please select your industry.";
    if (rating === 0) errors.rating = "Please select a star rating.";
    if (!quote.trim()) errors.quote = "Please share your experience.";
    else if (quote.trim().length < 20)
      errors.quote = "Please write at least 20 characters.";
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
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
    getToken("submit_testimonial").then((recaptchaToken) => {
      submitTestimonial.mutate({
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        phone: phone.trim() || undefined,
        businessName: businessName.trim(),
        location: location.trim(),
        industry: industry as Industry,
        rating,
        quote: quote.trim(),
        email: email.trim() || undefined,
        recaptchaToken,
      });
    });
  };

  const inputClass = (hasError: boolean) =>
    `w-full bg-[#111] border rounded-lg px-3 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#c9a84c]/60 transition ${
      hasError ? "border-red-500" : "border-white/10"
    }`;

  if (submitted) {
    return (
      <div role="status" aria-live="polite" aria-atomic="true" className="bg-[#1a1a1a] border border-[#c9a84c]/30 rounded-2xl p-10 text-center max-w-xl mx-auto">
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 rounded-full bg-[#c9a84c]/15 flex items-center justify-center">
            <CheckCircle size={32} className="text-[#c9a84c]" />
          </div>
        </div>
        <h3
          className="font-bold text-white text-xl mb-2"
          style={{ fontFamily: "Sora, sans-serif" }}
        >
          Thank you for sharing your experience!
        </h3>
        <p className="text-gray-600 text-sm leading-relaxed">
          Your testimonial has been submitted for review. Once approved by our team, it will
          appear on this page. We appreciate you taking the time to share your story.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-[#1a1a1a] border border-[#c9a84c]/30 rounded-2xl p-8 max-w-2xl mx-auto">
      {/* Header */}
      <div className="flex items-start gap-4 mb-6">
        <div className="w-11 h-11 rounded-xl bg-[#c9a84c]/15 flex items-center justify-center flex-shrink-0 mt-0.5">
          <MessageSquarePlus size={20} className="text-[#c9a84c]" />
        </div>
        <div>
          <h3
            className="font-bold text-white text-lg leading-snug"
            style={{ fontFamily: "Sora, sans-serif" }}
          >
            Share Your Experience
          </h3>
          <p className="text-gray-600 text-sm mt-1 leading-relaxed">
            Your story helps other Utah business owners make informed decisions.
            All submissions are reviewed before being published.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        {/* Row: First Name + Last Name */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-600 text-xs font-medium mb-1.5">
              First Name <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              placeholder="Jane"
              value={firstName}
              onChange={(e) => { setFirstName(e.target.value); clearError("firstName"); }}
              className={inputClass(!!fieldErrors.firstName)}
            />
            {fieldErrors.firstName && (
              <p className="text-red-400 text-xs mt-1">{fieldErrors.firstName}</p>
            )}
          </div>
          <div>
            <label className="block text-gray-600 text-xs font-medium mb-1.5">
              Last Name <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              placeholder="Smith"
              value={lastName}
              onChange={(e) => { setLastName(e.target.value); clearError("lastName"); }}
              className={inputClass(!!fieldErrors.lastName)}
            />
            {fieldErrors.lastName && (
              <p className="text-red-400 text-xs mt-1">{fieldErrors.lastName}</p>
            )}
          </div>
        </div>

        {/* Row: Business + Phone */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-600 text-xs font-medium mb-1.5">
              Business Name <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              placeholder="Smith's Bistro"
              value={businessName}
              onChange={(e) => { setBusinessName(e.target.value); clearError("businessName"); }}
              className={inputClass(!!fieldErrors.businessName)}
            />
            {fieldErrors.businessName && (
              <p className="text-red-400 text-xs mt-1">{fieldErrors.businessName}</p>
            )}
          </div>
          <div>
            <label className="block text-gray-600 text-xs font-medium mb-1.5">
              Phone Number{" "}
              <span className="text-gray-600 font-normal">(optional)</span>
            </label>
            <input
              type="tel"
              placeholder="(801) 555-0100"
              value={phone}
              onChange={(e) => { setPhone(e.target.value); clearError("phone"); }}
              className={inputClass(!!fieldErrors.phone)}
            />
            {fieldErrors.phone && (
              <p className="text-red-400 text-xs mt-1">{fieldErrors.phone}</p>
            )}
          </div>
        </div>

        {/* Row: Location + Industry */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-600 text-xs font-medium mb-1.5">
              City / Location <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              placeholder="Salt Lake City, UT"
              value={location}
              onChange={(e) => { setLocation(e.target.value); clearError("location"); }}
              className={inputClass(!!fieldErrors.location)}
            />
            {fieldErrors.location && (
              <p className="text-red-400 text-xs mt-1">{fieldErrors.location}</p>
            )}
          </div>
          <div>
            <label className="block text-gray-600 text-xs font-medium mb-1.5">
              Industry <span className="text-red-400">*</span>
            </label>
            <select
              value={industry}
              onChange={(e) => { setIndustry(e.target.value as Industry | ""); clearError("industry"); }}
              className={`${inputClass(!!fieldErrors.industry)} appearance-none`}
            >
              <option value="" disabled>Select your industry…</option>
              {INDUSTRIES.map((ind) => (
                <option key={ind} value={ind}>{ind}</option>
              ))}
            </select>
            {fieldErrors.industry && (
              <p className="text-red-400 text-xs mt-1">{fieldErrors.industry}</p>
            )}
          </div>
        </div>

        {/* Star Rating */}
        <div>
          <label className="block text-gray-600 text-xs font-medium mb-2">
            Overall Rating <span className="text-red-400">*</span>
          </label>
          <div
            className="flex gap-1"
            onMouseLeave={() => setHoveredRating(0)}
            role="group"
            aria-label="Star rating"
          >
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => { setRating(star); clearError("rating"); }}
                onMouseEnter={() => setHoveredRating(star)}
                aria-label={`${star} star${star > 1 ? "s" : ""}`}
                className="focus:outline-none transition-transform hover:scale-110"
              >
                <Star
                  size={28}
                  className={
                    star <= (hoveredRating || rating)
                      ? "text-[#c9a84c] fill-[#c9a84c]"
                      : "text-gray-600"
                  }
                />
              </button>
            ))}
            {rating > 0 && (
              <span className="ml-2 text-gray-600 text-sm self-center">
                {["", "Poor", "Fair", "Good", "Very Good", "Excellent"][rating]}
              </span>
            )}
          </div>
          {fieldErrors.rating && (
            <p className="text-red-400 text-xs mt-1">{fieldErrors.rating}</p>
          )}
        </div>

        {/* Testimonial Text */}
        <div>
          <label className="block text-gray-600 text-xs font-medium mb-1.5">
            Your Testimonial <span className="text-red-400">*</span>
          </label>
          <textarea
            rows={5}
            placeholder="Tell us about your experience with UBC Unlimited. What changed for your business? What would you tell another business owner?"
            value={quote}
            onChange={(e) => { setQuote(e.target.value); clearError("quote"); }}
            className={`${inputClass(!!fieldErrors.quote)} resize-none leading-relaxed`}
          />
          <div className="flex justify-between mt-1">
            {fieldErrors.quote ? (
              <p className="text-red-400 text-xs">{fieldErrors.quote}</p>
            ) : (
              <span />
            )}
            <span className={`text-xs ${quote.length > 1400 ? "text-red-400" : "text-gray-600"}`}>
              {quote.length}/1500
            </span>
          </div>
        </div>

        {/* Email (optional) */}
        <div>
          <label className="block text-gray-600 text-xs font-medium mb-1.5">
            Email Address{" "}
            <span className="text-gray-600 font-normal">(optional — not published)</span>
          </label>
          <input
            type="email"
            placeholder="jane@smithsbistro.com"
            value={email}
            onChange={(e) => { setEmail(e.target.value); clearError("email"); }}
            className={inputClass(!!fieldErrors.email)}
          />
          {fieldErrors.email && (
            <p className="text-red-400 text-xs mt-1">{fieldErrors.email}</p>
          )}
        </div>

        {/* Privacy / Terms checkbox */}
        <div>
          <label className="flex items-start gap-2.5 cursor-pointer group">
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => { setAgreed(e.target.checked); clearError("agreed"); }}
              className="mt-0.5 w-4 h-4 rounded border-white/20 bg-[#111] accent-[#c9a84c] cursor-pointer flex-shrink-0"
            />
            <span className="text-gray-600 text-[11px] leading-relaxed">
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
              , and I grant UBC Unlimited permission to publish my testimonial on their website.
            </span>
          </label>
          {fieldErrors.agreed && (
            <p className="text-red-400 text-xs mt-1 ml-6">{fieldErrors.agreed}</p>
          )}
        </div>

        {/* Server error */}
        {submitTestimonial.error && (
          <p className="text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-3">
            {submitTestimonial.error.message}
          </p>
        )}

        <button
          type="submit"
          disabled={submitTestimonial.isPending}
          className="w-full bg-[#c9a84c] hover:bg-[#b8963e] text-[#080808] font-semibold text-sm rounded-lg py-3 transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
        >
          {submitTestimonial.isPending ? (
            <>
              <Loader2 size={16} className="animate-spin" />
              Submitting…
            </>
          ) : (
            "Submit My Testimonial"
          )}
        </button>

        <p className="text-gray-600 text-[11px] text-center leading-relaxed">
          Submissions are reviewed within 1–2 business days before being published.
        </p>
      </form>
    </div>
  );
}

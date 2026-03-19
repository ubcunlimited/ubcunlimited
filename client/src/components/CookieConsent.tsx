import { useState, useEffect } from "react";
import { Link } from "wouter";
import { X, Cookie } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const STORAGE_KEY = "ubc_cookie_consent";

type ConsentState = "accepted" | "declined" | null;

export default function CookieConsent() {
  const [consent, setConsent] = useState<ConsentState>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Delay showing banner slightly so it doesn't flash on load
    const stored = localStorage.getItem(STORAGE_KEY) as ConsentState | null;
    if (!stored) {
      const timer = setTimeout(() => setVisible(true), 1200);
      return () => clearTimeout(timer);
    }
    setConsent(stored);
  }, []);

  const handleAccept = () => {
    localStorage.setItem(STORAGE_KEY, "accepted");
    setConsent("accepted");
    setVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem(STORAGE_KEY, "declined");
    setConsent("declined");
    setVisible(false);
  };

  if (consent !== null) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          role="dialog"
          aria-modal="false"
          aria-label="Cookie consent"
          aria-describedby="cookie-consent-desc"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed bottom-0 left-0 right-0 z-[200] p-4 sm:p-6"
        >
          <div className="max-w-4xl mx-auto bg-[#080808] border border-[#c9a84c]/30 rounded-2xl shadow-2xl shadow-black/50 p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            {/* Icon */}
            <div className="w-10 h-10 rounded-xl bg-[#c9a84c]/10 flex items-center justify-center shrink-0" aria-hidden="true">
              <Cookie size={20} className="text-[#c9a84c]" />
            </div>

            {/* Text */}
            <div className="flex-1 min-w-0">
              <p id="cookie-consent-desc" className="text-white text-sm leading-relaxed">
                <strong className="font-semibold">We use cookies</strong> to improve your experience, analyze site traffic, and support our marketing. By clicking "Accept All," you consent to our use of cookies.{" "}
                <Link
                  href="/legal/cookie-policy"
                  className="text-[#c9a84c] underline hover:text-[#e2c97e] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a84c] rounded"
                >
                  Cookie Policy
                </Link>
                {" "}·{" "}
                <Link
                  href="/legal/privacy-policy"
                  className="text-[#c9a84c] underline hover:text-[#e2c97e] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a84c] rounded"
                >
                  Privacy Policy
                </Link>
              </p>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto">
              <button
                onClick={handleDecline}
                className="flex-1 sm:flex-none px-4 py-2 text-sm font-medium text-white/60 hover:text-white border border-white/20 hover:border-white/40 rounded-lg transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#080808]"
                aria-label="Decline non-essential cookies"
              >
                Decline
              </button>
              <button
                onClick={handleAccept}
                className="flex-1 sm:flex-none px-4 py-2 text-sm font-semibold text-white bg-[#c9a84c] hover:bg-[#c9a84c] rounded-lg transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a84c] focus-visible:ring-offset-2 focus-visible:ring-offset-[#080808]"
                aria-label="Accept all cookies"
              >
                Accept All
              </button>
              <button
                onClick={handleDecline}
                className="p-2 text-white/40 hover:text-white transition-colors rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#080808]"
                aria-label="Close cookie banner"
              >
                <X size={16} aria-hidden="true" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

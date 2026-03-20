import { Link } from "wouter";
import { Phone, ArrowRight } from "lucide-react";
import { SITE } from "@/lib/config";

/**
 * Sticky bottom call bar — visible only on mobile (lg:hidden).
 * Provides a one-tap call button and a secondary "Get Started" link
 * so the CTA is always accessible regardless of scroll position.
 */
export default function MobileCallBar() {
  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 safe-area-inset-bottom">
      {/* Fade gradient so content above doesn't hard-clip into the bar */}
      <div className="h-6 bg-gradient-to-t from-[#080808]/60 to-transparent pointer-events-none" />

      <div className="bg-[#080808]/97 backdrop-blur-md border-t border-white/10 px-4 py-3 flex items-center gap-3">
        {/* Primary — tap to call */}
        <a
          href={SITE.phoneHref}
          aria-label={`Call UBC Unlimited at ${SITE.phone}`}
          className="flex-1 flex items-center justify-center gap-2 bg-[#c9a84c] hover:bg-[#e2c97e] active:bg-[#b8943e] text-[#080808] font-bold text-sm py-3 rounded-xl transition-colors"
        >
          <Phone size={15} aria-hidden="true" />
          <span>Call {SITE.phone}</span>
        </a>

        {/* Secondary — consultation form */}
        <Link
          href="/consultation"
          className="flex items-center justify-center gap-1.5 border border-white/20 hover:border-[#c9a84c]/50 text-white/80 hover:text-white text-sm font-semibold py-3 px-4 rounded-xl transition-colors whitespace-nowrap"
        >
          Get Started <ArrowRight size={13} aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
}

// BackToTop — UBC Unlimited design system
// Gold/black palette, Sora font, appears after 400px scroll

import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 400);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      onClick={scrollToTop}
      aria-label="Scroll back to top"
      className={[
        "fixed bottom-24 right-6 z-50",
        "w-11 h-11 rounded-full",
        "bg-[#c9a84c] hover:bg-[#b8972a] active:bg-[#a07820]",
        "flex items-center justify-center",
        "shadow-lg hover:shadow-xl",
        "transition-all duration-300",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a84c] focus-visible:ring-offset-2",
        visible
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 translate-y-4 pointer-events-none",
      ].join(" ")}
    >
      <ArrowUp size={18} className="text-[#080808]" aria-hidden="true" />
    </button>
  );
}

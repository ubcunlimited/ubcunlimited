// HeroTypewriter — UBC Unlimited
// Full-bleed page hero with a rotating typewriter phrase, headline, subheadline, and dual CTAs.
// Usage: <HeroTypewriter rotatingPhrases={[...]} headline="..." />

import { useState, useEffect } from "react";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";

interface HeroTypewriterProps {
  /** Static prefix before the rotating phrase */
  prefix?: string;
  /** Array of phrases to cycle through */
  rotatingPhrases?: string[];
  headline?: string;
  subheadline?: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  /** CDN URL for background image */
  backgroundImage?: string;
  /** Dark overlay opacity 0-100 */
  overlayOpacity?: number;
}

export default function HeroTypewriter({
  prefix = "Built for",
  rotatingPhrases = [
    "Restaurants",
    "Retailers",
    "Medical Practices",
    "Auto Dealers",
    "eCommerce Stores",
    "High-Risk Businesses",
  ],
  headline = "Merchant Services Done Right",
  subheadline = "Transparent pricing, local support, and payment solutions tailored to your Utah business.",
  primaryLabel = "Get a Free Quote",
  primaryHref = "/contact",
  secondaryLabel = "See Our Solutions",
  secondaryHref = "/solutions",
  backgroundImage,
  overlayOpacity = 65,
}: HeroTypewriterProps) {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [typing, setTyping] = useState(true);

  useEffect(() => {
    const target = rotatingPhrases[phraseIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (typing) {
      if (displayed.length < target.length) {
        timeout = setTimeout(() => setDisplayed(target.slice(0, displayed.length + 1)), 60);
      } else {
        timeout = setTimeout(() => setTyping(false), 1800);
      }
    } else {
      if (displayed.length > 0) {
        timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 35);
      } else {
        setPhraseIndex((i) => (i + 1) % rotatingPhrases.length);
        setTyping(true);
      }
    }

    return () => clearTimeout(timeout);
  }, [displayed, typing, phraseIndex, rotatingPhrases]);

  return (
    <section
      className="relative min-h-[80vh] flex items-center bg-[#080808]"
      style={
        backgroundImage
          ? { backgroundImage: `url(${backgroundImage})`, backgroundSize: "cover", backgroundPosition: "center" }
          : undefined
      }
    >
      {/* Overlay */}
      {backgroundImage && (
        <div
          className="absolute inset-0 bg-[#080808]"
          style={{ opacity: overlayOpacity / 100 }}
          aria-hidden="true"
        />
      )}

      <div className="container relative z-10 py-24">
        <div className="max-w-3xl">
          {/* Rotating phrase */}
          <div className="flex items-center gap-2 mb-4">
            <span className="text-[#c9a84c] text-sm font-semibold tracking-widest uppercase">
              {prefix}
            </span>
            <span
              className="text-[#c9a84c] text-sm font-bold tracking-widest uppercase border-b-2 border-[#c9a84c] min-w-[120px]"
              aria-live="polite"
              aria-label={`${prefix} ${rotatingPhrases[phraseIndex]}`}
            >
              {displayed}
              <span className="animate-pulse">|</span>
            </span>
          </div>

          {/* Main headline */}
          <h1
            className="text-5xl md:text-6xl font-extrabold text-white leading-tight mb-5"
            style={{ fontFamily: "Sora, sans-serif" }}
          >
            {headline}
          </h1>

          {/* Subheadline */}
          <p className="text-white/65 text-lg md:text-xl mb-8 max-w-xl leading-relaxed">
            {subheadline}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href={primaryHref} className="btn-gold text-base py-3.5 px-8 justify-center">
              {primaryLabel} <ArrowRight size={18} />
            </Link>
            <Link href={secondaryHref} className="btn-outline-white text-base py-3.5 px-8 justify-center">
              {secondaryLabel}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

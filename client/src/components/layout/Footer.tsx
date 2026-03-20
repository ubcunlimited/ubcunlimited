// Footer — UBC Unlimited
// Top-5 Solutions + See All | Top-5 Industries + See All | Company links | Legal in bottom bar
import { Link } from "wouter";
import { Phone, Mail, MapPin, Facebook, Linkedin, Instagram, ArrowRight } from "lucide-react";
import { SITE, NAV_SOLUTIONS, NAV_INDUSTRIES } from "@/lib/config";

const TOP_SOLUTIONS = NAV_SOLUTIONS.slice(0, 5);
const TOP_INDUSTRIES = NAV_INDUSTRIES.filter((i) => !(i as any).highRisk).slice(0, 5);

const COMPANY_LINKS = [
  { label: "About Us", href: "/about" },
  { label: "News & Updates", href: "/news" },
  { label: "Contact", href: "/contact" },
  { label: "Counties We Serve", href: "/counties" },
  { label: "Cities We Serve", href: "/cities" },
  { label: "Build a POS", href: "/solutions/pos-systems" },
  { label: "Agent / ISO Program", href: "/agent-iso" },
];

const LEGAL_LINKS = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms of Service", href: "/terms-of-service" },
  { label: "Cookie Policy", href: "/cookie-policy" },
  { label: "Disclaimer", href: "/disclaimer" },
  { label: "Accessibility", href: "/accessibility" },
];

const linkClass =
  "text-sm text-white/50 hover:text-[#c9a84c] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a84c] rounded";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer role="contentinfo" className="bg-[#080808] border-t border-white/10">

      {/* CTA Strip */}
      <div className="bg-gradient-to-r from-[#111111] via-[#1a1a1a] to-[#111111] border-b border-[#c9a84c]/15">
        <div className="container py-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-white text-xl font-bold mb-1" style={{ fontFamily: "Sora, sans-serif" }}>
              Ready to lower your processing costs?
            </h3>
            <p className="text-white/60 text-sm">Get a statement review and see exactly how much you can save.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <Link
              href="/statement-review"
              className="btn-outline-white text-sm py-2.5 px-5 whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#080808]"
            >
              Statement Review
            </Link>
            <Link
              href="/consultation"
              className="btn-teal text-sm py-2.5 px-5 whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a84c] focus-visible:ring-offset-2 focus-visible:ring-offset-[#080808]"
            >
              Book a Consultation
            </Link>
          </div>
        </div>
      </div>

      {/* Main footer grid */}
      <div className="container py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand column */}
          <div className="lg:col-span-1">
            <Link
              href="/"
              className="flex items-center mb-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a84c] rounded"
              aria-label="UBC Unlimited — Home"
            >
              <img
                src="https://d2xsxph8kpxj0f.cloudfront.net/310519663396807781/BUvnwzJnwMZHoEGpybj36j/shieldubclogotransparent3_53cdf614.png"
                alt="UBC Unlimited — Utah Merchant Services & Payment Processing"
                className="h-28 w-auto object-contain"
                style={{ maxWidth: "160px" }}
              />
            </Link>
            <p className="text-white/50 text-sm leading-relaxed mb-5">
              Utah's trusted local merchant services provider. Helping businesses accept payments smarter since day one.
            </p>
            <address className="not-italic space-y-2.5">
              <a
                href={SITE.phoneHref}
                className="flex items-center gap-2 text-sm text-white/60 hover:text-[#c9a84c] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a84c] rounded"
                aria-label={`Call UBC Unlimited at ${SITE.phone}`}
              >
                <Phone size={14} className="text-[#c9a84c]" aria-hidden="true" />
                {SITE.phone}
              </a>
              <a
                href={`mailto:${SITE.email}`}
                className="flex items-center gap-2 text-sm text-white/60 hover:text-[#c9a84c] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a84c] rounded"
                aria-label={`Email UBC Unlimited at ${SITE.email}`}
              >
                <Mail size={14} className="text-[#c9a84c]" aria-hidden="true" />
                {SITE.email}
              </a>
              <div className="flex items-center gap-2 text-sm text-white/60">
                <MapPin size={14} className="text-[#c9a84c]" aria-hidden="true" />
                <span>Salt Lake City, Utah</span>
              </div>
            </address>
            <div className="flex gap-3 mt-5" aria-label="Social media links">
              <a
                href={SITE.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-white/5 hover:bg-[#c9a84c]/20 flex items-center justify-center text-white/50 hover:text-[#c9a84c] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a84c]"
                aria-label="UBC Unlimited on Facebook"
              >
                <Facebook size={15} aria-hidden="true" />
              </a>
              <a
                href={SITE.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-white/5 hover:bg-[#c9a84c]/20 flex items-center justify-center text-white/50 hover:text-[#c9a84c] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a84c]"
                aria-label="UBC Unlimited on LinkedIn"
              >
                <Linkedin size={15} aria-hidden="true" />
              </a>
              <a
                href={SITE.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-white/5 hover:bg-[#c9a84c]/20 flex items-center justify-center text-white/50 hover:text-[#c9a84c] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a84c]"
                aria-label="UBC Unlimited on Instagram"
              >
                <Instagram size={15} aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Solutions — top 5 + See All */}
          <nav aria-label="Solutions navigation">
            <h4
              className="text-white font-semibold text-sm mb-4 tracking-wide"
              style={{ fontFamily: "Sora, sans-serif" }}
            >
              Solutions
            </h4>
            <ul className="space-y-2">
              {TOP_SOLUTIONS.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={linkClass}>
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/solutions"
                  className="flex items-center gap-1 text-sm text-[#c9a84c] hover:underline font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a84c] rounded"
                >
                  See All Solutions <ArrowRight size={12} aria-hidden="true" />
                </Link>
              </li>
            </ul>
          </nav>

          {/* Industries — top 5 + See All */}
          <nav aria-label="Industries navigation">
            <h4
              className="text-white font-semibold text-sm mb-4 tracking-wide"
              style={{ fontFamily: "Sora, sans-serif" }}
            >
              Industries
            </h4>
            <ul className="space-y-2">
              {TOP_INDUSTRIES.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={linkClass}>
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/industries"
                  className="flex items-center gap-1 text-sm text-[#c9a84c] hover:underline font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a84c] rounded"
                >
                  See All Industries <ArrowRight size={12} aria-hidden="true" />
                </Link>
              </li>
            </ul>
          </nav>

          {/* Company */}
          <nav aria-label="Company navigation">
            <h4
              className="text-white font-semibold text-sm mb-4 tracking-wide"
              style={{ fontFamily: "Sora, sans-serif" }}
            >
              Company
            </h4>
            <ul className="space-y-2">
              {COMPANY_LINKS.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={linkClass}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

        </div>
      </div>

      {/* Bottom copyright + legal bar */}
      <div className="border-t border-white/5 bg-[#050505]">
        <div className="container py-4 flex flex-wrap items-center justify-between gap-x-6 gap-y-2 text-xs text-white/30">
          <span className="shrink-0">© {year} UBC Unlimited. All rights reserved.</span>
          <nav aria-label="Legal navigation" className="flex flex-wrap items-center gap-x-1 gap-y-1.5">
            {LEGAL_LINKS.map((item, i) => (
              <span key={item.href} className="flex items-center">
                {i > 0 && <span className="mx-2 text-white/15" aria-hidden="true">·</span>}
                <Link
                  href={item.href}
                  className="text-white/35 hover:text-[#c9a84c] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#c9a84c] rounded"
                >
                  {item.label}
                </Link>
              </span>
            ))}
          </nav>
        </div>
      </div>

    </footer>
  );
}

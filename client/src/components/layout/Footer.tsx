import { Link } from "wouter";
import { Phone, Mail, MapPin, CreditCard, Facebook, Linkedin, Instagram } from "lucide-react";
import { SITE, NAV_SOLUTIONS, NAV_INDUSTRIES } from "@/lib/config";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer role="contentinfo" className="bg-[#040c1c] border-t border-white/10">
      {/* CTA Strip */}
      <div className="bg-gradient-to-r from-[#0f2040] via-[#0a1628] to-[#0f2040] border-b border-white/10">
        <div className="container py-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-white text-xl font-bold mb-1" style={{ fontFamily: 'Sora, sans-serif' }}>
              Ready to lower your processing costs?
            </h3>
            <p className="text-white/60 text-sm">Get a free statement review and see exactly how much you can save.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <Link href="/statement-review" className="btn-outline-white text-sm py-2.5 px-5 whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a1628]">
              Free Statement Review
            </Link>
            <Link href="/consultation" className="btn-teal text-sm py-2.5 px-5 whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#169fa8] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a1628]">
              Book a Consultation
            </Link>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="container py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand column */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 mb-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#169fa8] rounded" aria-label="UBC Unlimited — Home">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#169fa8] to-[#0f2040] flex items-center justify-center" aria-hidden="true">
                <CreditCard size={18} className="text-white" />
              </div>
              <div>
                <div className="text-white font-bold text-base" style={{ fontFamily: 'Sora, sans-serif' }}>UBC Unlimited</div>
                <div className="text-[#169fa8] text-[10px] font-medium tracking-widest uppercase">Merchant Services</div>
              </div>
            </Link>
            <p className="text-white/50 text-sm leading-relaxed mb-5">
              Utah's trusted local merchant services provider. Helping businesses accept payments smarter since day one.
            </p>
            <address className="not-italic space-y-2.5">
              <a href={SITE.phoneHref} className="flex items-center gap-2 text-sm text-white/60 hover:text-[#169fa8] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#169fa8] rounded" aria-label={`Call UBC Unlimited at ${SITE.phone}`}>
                <Phone size={14} className="text-[#169fa8]" aria-hidden="true" />
                {SITE.phone}
              </a>
              <a href={`mailto:${SITE.email}`} className="flex items-center gap-2 text-sm text-white/60 hover:text-[#169fa8] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#169fa8] rounded" aria-label={`Email UBC Unlimited at ${SITE.email}`}>
                <Mail size={14} className="text-[#169fa8]" aria-hidden="true" />
                {SITE.email}
              </a>
              <div className="flex items-center gap-2 text-sm text-white/60">
                <MapPin size={14} className="text-[#169fa8]" aria-hidden="true" />
                <span>Salt Lake City, Utah</span>
              </div>
            </address>
            <div className="flex gap-3 mt-5" aria-label="Social media links">
              <a href={SITE.social.facebook} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-lg bg-white/5 hover:bg-[#169fa8]/20 flex items-center justify-center text-white/50 hover:text-[#169fa8] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#169fa8]" aria-label="UBC Unlimited on Facebook">
                <Facebook size={15} aria-hidden="true" />
              </a>
              <a href={SITE.social.linkedin} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-lg bg-white/5 hover:bg-[#169fa8]/20 flex items-center justify-center text-white/50 hover:text-[#169fa8] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#169fa8]" aria-label="UBC Unlimited on LinkedIn">
                <Linkedin size={15} aria-hidden="true" />
              </a>
              <a href={SITE.social.instagram} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-lg bg-white/5 hover:bg-[#169fa8]/20 flex items-center justify-center text-white/50 hover:text-[#169fa8] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#169fa8]" aria-label="UBC Unlimited on Instagram">
                <Instagram size={15} aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Solutions */}
          <nav aria-label="Solutions navigation">
            <h4 className="text-white font-semibold text-sm mb-4 tracking-wide" style={{ fontFamily: 'Sora, sans-serif' }}>Solutions</h4>
            <ul className="space-y-2">
              {NAV_SOLUTIONS.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm text-white/50 hover:text-[#169fa8] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#169fa8] rounded">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Industries */}
          <nav aria-label="Industries navigation">
            <h4 className="text-white font-semibold text-sm mb-4 tracking-wide" style={{ fontFamily: 'Sora, sans-serif' }}>Industries</h4>
            <ul className="space-y-2">
              {NAV_INDUSTRIES.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm text-white/50 hover:text-[#169fa8] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#169fa8] rounded">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Company */}
          <nav aria-label="Company navigation">
            <h4 className="text-white font-semibold text-sm mb-4 tracking-wide" style={{ fontFamily: 'Sora, sans-serif' }}>Company</h4>
            <ul className="space-y-2 mb-6">
              {[
                { label: "About Us", href: "/about" },
                { label: "News & Updates", href: "/blog" },
                { label: "Locations", href: "/locations" },
                { label: "Contact", href: "/contact" },
                { label: "Book a Consultation", href: "/consultation" },
                { label: "Request a Quote", href: "/quote" },
                { label: "Free Statement Review", href: "/statement-review" },
              ].map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm text-white/50 hover:text-[#169fa8] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#169fa8] rounded">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <h4 className="text-white font-semibold text-sm mb-3 tracking-wide" style={{ fontFamily: 'Sora, sans-serif' }}>Legal</h4>
            <ul className="space-y-2">
              {[
                { label: "Privacy Policy", href: "/legal/privacy-policy" },
                { label: "Terms of Service", href: "/legal/terms-of-service" },
                { label: "Cookie Policy", href: "/legal/cookie-policy" },
                { label: "Disclaimer", href: "/legal/disclaimer" },
              ].map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm text-white/50 hover:text-[#169fa8] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#169fa8] rounded">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5">
        <div className="container py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/30">
          <span>© {year} UBC Unlimited. All rights reserved.</span>
          <span>Utah Merchant Services · Payment Processing · POS Systems</span>
        </div>
      </div>
    </footer>
  );
}

import { useState, useEffect, useRef, useCallback } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, Phone, ChevronDown, ArrowRight } from "lucide-react";
import { SITE, NAV_SOLUTIONS, NAV_INDUSTRIES } from "@/lib/config";
import { motion, AnimatePresence } from "framer-motion";

// Top 5 highest-converting Solutions for nav dropdown
const TOP_SOLUTIONS = NAV_SOLUTIONS.slice(0, 5);

// Top 5 highest-traffic Industries for nav dropdown (non-high-risk)
const TOP_INDUSTRIES = NAV_INDUSTRIES.filter((i) => !(i as any).highRisk).slice(0, 5);

const COMPANY_LINKS = [
  { href: "/about", label: "About Us" },
  { href: "/testimonials", label: "Client Testimonials" },
  { href: "/news", label: "News & Updates" },
  { href: "/contact", label: "Contact" },
  { href: "/locations", label: "Locations" },
  { href: "/build-a-pos", label: "Build a POS" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [location] = useLocation();
  const navRef = useRef<HTMLDivElement>(null);
  const solutionsBtnRef = useRef<HTMLButtonElement>(null);
  const industriesBtnRef = useRef<HTMLButtonElement>(null);
  const companyBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setOpenMenu(null);
  }, [location]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenMenu(null);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") {
      setOpenMenu(null);
      setMobileOpen(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  const isActive = (path: string) => location === path || location.startsWith(path + "/");

  const toggleMenu = (menuId: string) => {
    setOpenMenu(openMenu === menuId ? null : menuId);
  };

  const menuItemClass =
    "flex items-start gap-3 p-2.5 rounded-xl hover:bg-white/5 transition-colors group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a84c] focus-visible:ring-inset";

  return (
    <header
      role="banner"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#080808]/98 backdrop-blur-md shadow-xl shadow-black/20 border-b border-white/5"
          : "bg-[#080808]/95 backdrop-blur-sm"
      }`}
    >
      {/* Top bar */}
      <div
        className={`bg-[#c9a84c]/10 border-b border-[#c9a84c]/20 hidden md:block overflow-hidden transition-all duration-300 ${
          scrolled ? "max-h-0 opacity-0 border-0" : "max-h-12 opacity-100"
        }`}
        aria-hidden="true"
      >
        <div className="container flex justify-between items-center py-1.5 text-xs text-white/50">
          <span>Local Expertise &middot; Nationwide Reach &mdash; {SITE.yearsInBusiness} Years in Business</span>
          <div className="flex items-center gap-4">
            <a
              href={`mailto:${SITE.email}`}
              className="hover:text-white/80 transition-colors"
              aria-label={`Email us at ${SITE.email}`}
            >
              {SITE.email}
            </a>
            <a
              href={SITE.phoneHref}
              className="flex items-center gap-1.5 text-[#c9a84c] font-semibold hover:text-[#e2c97e] transition-colors"
              aria-label={`Call us at ${SITE.phone}`}
            >
              <Phone size={11} aria-hidden="true" /> {SITE.phone}
            </a>
          </div>
        </div>
      </div>

      <div className="container" ref={navRef}>
        <div
          className={`flex items-center justify-between transition-all duration-300 ${
            scrolled ? "h-16" : "h-16 lg:h-28"
          }`}
        >
          {/* Logo */}
          <Link href="/" className="flex items-center shrink-0 group" aria-label="UBC Unlimited — Home">
            <img
              src="https://d2xsxph8kpxj0f.cloudfront.net/310519663396807781/BUvnwzJnwMZHoEGpybj36j/logo_v2_480w_36563e62.webp"
              srcSet="https://d2xsxph8kpxj0f.cloudfront.net/310519663396807781/BUvnwzJnwMZHoEGpybj36j/logo_v2_240w_aa5f29cd.webp 240w, https://d2xsxph8kpxj0f.cloudfront.net/310519663396807781/BUvnwzJnwMZHoEGpybj36j/logo_v2_480w_36563e62.webp 480w, https://d2xsxph8kpxj0f.cloudfront.net/310519663396807781/BUvnwzJnwMZHoEGpybj36j/logo_v2_640w_fa1c6e9b.webp 640w"
              sizes="(max-width: 1024px) 200px, 320px"
              alt="UBC Unlimited — Processing Without Limits"
              width={320}
              height={51}
              className={`w-auto object-contain transition-all duration-300 ${scrolled ? "h-12" : "h-12 lg:h-20"}`}
              style={{ maxWidth: scrolled ? "240px" : "360px" }}
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-0.5" aria-label="Main navigation">

            {/* Solutions dropdown — top 5 + See All */}
            <div className="relative">
              <button
                ref={solutionsBtnRef}
                onClick={() => toggleMenu("solutions")}
                aria-expanded={openMenu === "solutions"}
                aria-haspopup="true"
                aria-controls="solutions-menu"
                className={`flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a84c] focus-visible:ring-offset-2 focus-visible:ring-offset-[#080808] ${
                  isActive("/solutions")
                    ? "text-[#c9a84c] bg-[#c9a84c]/10"
                    : "text-white/75 hover:text-white hover:bg-white/5"
                }`}
              >
                Solutions{" "}
                <ChevronDown
                  size={14}
                  className={`transition-transform ${openMenu === "solutions" ? "rotate-180" : ""}`}
                  aria-hidden="true"
                />
              </button>
              <AnimatePresence>
                {openMenu === "solutions" && (
                  <motion.div
                    id="solutions-menu"
                    role="menu"
                    aria-label="Solutions menu"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full left-0 mt-1 w-72 bg-[#111111] border border-white/10 rounded-2xl shadow-2xl shadow-black/50 overflow-hidden z-50"
                  >
                    <div className="p-3">
                      <div
                        className="text-[10px] font-semibold text-[#c9a84c] uppercase tracking-widest mb-2 px-1"
                        aria-hidden="true"
                      >
                        Payment Solutions
                      </div>
                      <div className="space-y-0.5">
                        {TOP_SOLUTIONS.map((item) => (
                          <Link key={item.href} href={item.href} role="menuitem" className={menuItemClass}>
                            <span className="text-base mt-0.5" aria-hidden="true">
                              {item.icon}
                            </span>
                            <div>
                              <div className="text-white text-sm font-medium group-hover:text-[#c9a84c] transition-colors">
                                {item.label}
                              </div>
                              <div className="text-white/40 text-xs mt-0.5">{item.desc}</div>
                            </div>
                          </Link>
                        ))}
                      </div>
                      <div className="pt-2.5 mt-2 border-t border-white/10">
                        <Link
                          href="/solutions"
                          role="menuitem"
                          className="flex items-center gap-1.5 px-2.5 py-2 rounded-lg text-[#c9a84c] text-sm font-semibold hover:bg-[#c9a84c]/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a84c]"
                        >
                          See All Solutions <ArrowRight size={13} aria-hidden="true" />
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Industries dropdown — top 5 + See All */}
            <div className="relative">
              <button
                ref={industriesBtnRef}
                onClick={() => toggleMenu("industries")}
                aria-expanded={openMenu === "industries"}
                aria-haspopup="true"
                aria-controls="industries-menu"
                className={`flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a84c] focus-visible:ring-offset-2 focus-visible:ring-offset-[#080808] ${
                  isActive("/industries")
                    ? "text-[#c9a84c] bg-[#c9a84c]/10"
                    : "text-white/75 hover:text-white hover:bg-white/5"
                }`}
              >
                Industries{" "}
                <ChevronDown
                  size={14}
                  className={`transition-transform ${openMenu === "industries" ? "rotate-180" : ""}`}
                  aria-hidden="true"
                />
              </button>
              <AnimatePresence>
                {openMenu === "industries" && (
                  <motion.div
                    id="industries-menu"
                    role="menu"
                    aria-label="Industries menu"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full left-0 mt-1 w-72 bg-[#111111] border border-white/10 rounded-2xl shadow-2xl shadow-black/50 overflow-hidden z-50"
                  >
                    <div className="p-3">
                      <div
                        className="text-[10px] font-semibold text-[#c9a84c] uppercase tracking-widest mb-2 px-1"
                        aria-hidden="true"
                      >
                        Industries We Serve
                      </div>
                      <div className="space-y-0.5">
                        {TOP_INDUSTRIES.map((item) => (
                          <Link key={item.href} href={item.href} role="menuitem" className={menuItemClass}>
                            <span className="text-base mt-0.5" aria-hidden="true">
                              {item.icon}
                            </span>
                            <div>
                              <div className="text-white text-sm font-medium group-hover:text-[#c9a84c] transition-colors">
                                {item.label}
                              </div>
                              <div className="text-white/40 text-xs mt-0.5">{item.desc}</div>
                            </div>
                          </Link>
                        ))}
                      </div>
                      <div className="pt-2.5 mt-2 border-t border-white/10">
                        <Link
                          href="/industries"
                          role="menuitem"
                          className="flex items-center gap-1.5 px-2.5 py-2 rounded-lg text-[#c9a84c] text-sm font-semibold hover:bg-[#c9a84c]/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a84c]"
                        >
                          See All Industries <ArrowRight size={13} aria-hidden="true" />
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Company dropdown */}
            <div className="relative">
              <button
                ref={companyBtnRef}
                onClick={() => toggleMenu("company")}
                aria-expanded={openMenu === "company"}
                aria-haspopup="true"
                aria-controls="company-menu"
                className={`flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a84c] focus-visible:ring-offset-2 focus-visible:ring-offset-[#080808] ${
                  isActive("/about") || isActive("/blog") || isActive("/contact") || isActive("/locations")
                    ? "text-[#c9a84c] bg-[#c9a84c]/10"
                    : "text-white/75 hover:text-white hover:bg-white/5"
                }`}
              >
                Company{" "}
                <ChevronDown
                  size={14}
                  className={`transition-transform ${openMenu === "company" ? "rotate-180" : ""}`}
                  aria-hidden="true"
                />
              </button>
              <AnimatePresence>
                {openMenu === "company" && (
                  <motion.div
                    id="company-menu"
                    role="menu"
                    aria-label="Company menu"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full right-0 mt-1 w-52 bg-[#111111] border border-white/10 rounded-2xl shadow-2xl shadow-black/50 overflow-hidden z-50"
                  >
                    <div className="p-2">
                      {COMPANY_LINKS.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          role="menuitem"
                          className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl hover:bg-white/5 transition-colors text-white/75 hover:text-white text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a84c] focus-visible:ring-inset"
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </nav>

          {/* Desktop CTAs */}
          <div className="hidden lg:flex items-center gap-3 shrink-0">
            <a
              href={SITE.phoneHref}
              className="flex items-center gap-1.5 text-white/55 text-sm hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a84c] focus-visible:ring-offset-2 focus-visible:ring-offset-[#080808] rounded"
              aria-label={`Call UBC Unlimited at ${SITE.phone}`}
            >
              <Phone size={13} aria-hidden="true" /> {SITE.phone}
            </a>
            <Link
              href="/consultation"
              className="btn-gold text-sm py-2 px-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a84c] focus-visible:ring-offset-2 focus-visible:ring-offset-[#080808]"
            >
              Book a Consultation
            </Link>
          </div>

          {/* Mobile: Call Now + hamburger */}
          <div className="lg:hidden flex items-center gap-2">
            <a
              href={SITE.phoneHref}
              aria-label={`Call UBC Unlimited at ${SITE.phone}`}
              className="flex items-center gap-1.5 bg-[#c9a84c] hover:bg-[#e2c97e] text-[#080808] font-bold text-xs px-3 py-2 rounded-lg transition-colors"
            >
              <Phone size={13} aria-hidden="true" />
              <span>Call Now</span>
            </a>
            <button
              className="p-2 text-white/75 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a84c] rounded"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
            >
              {mobileOpen ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-menu"
            role="navigation"
            aria-label="Mobile navigation"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden bg-[#080808] border-t border-white/10 overflow-hidden max-h-[80vh] overflow-y-auto"
          >
            <div className="container py-4 space-y-1">
              {/* Logo at top of mobile menu */}
              <div className="flex items-center px-3 pb-3 mb-1 border-b border-white/10">
                <Link href="/" aria-label="UBC Unlimited — Home">
                  <img
                    src="https://d2xsxph8kpxj0f.cloudfront.net/310519663396807781/BUvnwzJnwMZHoEGpybj36j/logo_160w_q70_148b8064.webp"
                    alt="UBC Unlimited — Processing Without Limits"
                    width={40}
                    height={40}
                    className="h-10 w-10 object-contain"
                  />
                </Link>
              </div>
              {/* Solutions */}
              <div
                className="text-[10px] font-semibold text-[#c9a84c] uppercase tracking-widest px-3 py-2"
                aria-hidden="true"
              >
                Solutions
              </div>
              {TOP_SOLUTIONS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/5 transition-colors text-white/75 hover:text-white text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a84c] focus-visible:ring-inset"
                >
                  <span aria-hidden="true">{item.icon}</span> {item.label}
                </Link>
              ))}
              <Link
                href="/solutions"
                className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-[#c9a84c] text-sm font-semibold hover:bg-[#c9a84c]/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a84c] focus-visible:ring-inset"
              >
                See All Solutions <ArrowRight size={13} aria-hidden="true" />
              </Link>

              {/* Industries */}
              <div
                className="text-[10px] font-semibold text-[#c9a84c] uppercase tracking-widest px-3 py-2 pt-4"
                aria-hidden="true"
              >
                Industries
              </div>
              {TOP_INDUSTRIES.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/5 transition-colors text-white/75 hover:text-white text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a84c] focus-visible:ring-inset"
                >
                  <span aria-hidden="true">{item.icon}</span> {item.label}
                </Link>
              ))}
              <Link
                href="/industries"
                className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-[#c9a84c] text-sm font-semibold hover:bg-[#c9a84c]/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a84c] focus-visible:ring-inset"
              >
                See All Industries <ArrowRight size={13} aria-hidden="true" />
              </Link>

              {/* Company */}
              <div
                className="text-[10px] font-semibold text-[#c9a84c] uppercase tracking-widest px-3 py-2 pt-4"
                aria-hidden="true"
              >
                Company
              </div>
              {COMPANY_LINKS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/5 transition-colors text-white/75 hover:text-white text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a84c] focus-visible:ring-inset"
                >
                  {item.label}
                </Link>
              ))}

              <div className="pt-4 border-t border-white/10 space-y-2">
                <a
                  href={SITE.phoneHref}
                  className="flex items-center justify-center gap-2 py-2.5 text-white/75 hover:text-white text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a84c] rounded"
                  aria-label={`Call UBC Unlimited at ${SITE.phone}`}
                >
                  <Phone size={14} aria-hidden="true" /> {SITE.phone}
                </a>
                <Link
                  href="/consultation"
                  className="btn-gold w-full justify-center py-2.5 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a84c]"
                >
                  Book a Consultation
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

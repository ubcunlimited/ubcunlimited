import { useState, useEffect, useRef, useCallback } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, Phone, ChevronDown, ArrowRight } from "lucide-react";
import { SITE, NAV_SOLUTIONS, NAV_INDUSTRIES } from "@/lib/config";
import { motion, AnimatePresence } from "framer-motion";

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
    const onScroll = () => setScrolled(window.scrollY > 20);
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

  // Close dropdown on Escape key
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

  return (
    <header
      role="banner"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#0d1b2a]/98 backdrop-blur-md shadow-xl shadow-black/20 border-b border-white/5"
          : "bg-[#0d1b2a]/95 backdrop-blur-sm"
      }`}
    >
      {/* Top bar */}
      <div className="bg-[#1e6fa8]/10 border-b border-[#1e6fa8]/20 hidden md:block" aria-hidden="true">
        <div className="container flex justify-between items-center py-1.5 text-xs text-white/50">
          <span>Utah's Local Merchant Services Experts — {SITE.yearsInBusiness} Years in Business</span>
          <div className="flex items-center gap-4">
            <a href={`mailto:${SITE.email}`} className="hover:text-white/80 transition-colors" aria-label={`Email us at ${SITE.email}`}>{SITE.email}</a>
            <a href={SITE.phoneHref} className="flex items-center gap-1.5 text-[#c47c2b] font-semibold hover:text-[#d9973e] transition-colors" aria-label={`Call us at ${SITE.phone}`}>
              <Phone size={11} aria-hidden="true" /> {SITE.phone}
            </a>
          </div>
        </div>
      </div>

      <div className="container" ref={navRef}>
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group shrink-0" aria-label="UBC Unlimited — Home">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#1e6fa8] to-[#152234] flex items-center justify-center shadow-lg" aria-hidden="true">
              <span className="text-white font-extrabold text-sm" style={{ fontFamily: 'DM Serif Display, Georgia, serif' }}>U</span>
            </div>
            <div className="leading-tight">
              <div className="text-white font-bold text-base" style={{ fontFamily: 'DM Serif Display, Georgia, serif' }}>
                UBC Unlimited
              </div>
              <div className="text-[#1e6fa8] text-[10px] font-medium tracking-widest uppercase hidden sm:block">
                Merchant Services
              </div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-0.5" aria-label="Main navigation">
            {/* Solutions dropdown */}
            <div className="relative">
              <button
                ref={solutionsBtnRef}
                onClick={() => toggleMenu("solutions")}
                aria-expanded={openMenu === "solutions"}
                aria-haspopup="true"
                aria-controls="solutions-menu"
                className={`flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#169fa8] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0d1b2a] ${
                  isActive("/solutions") ? "text-[#1e6fa8] bg-[#1e6fa8]/10" : "text-white/75 hover:text-white hover:bg-white/5"
                }`}
              >
                Solutions <ChevronDown size={14} className={`transition-transform ${openMenu === "solutions" ? "rotate-180" : ""}`} aria-hidden="true" />
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
                    className="absolute top-full left-0 mt-1 w-[540px] bg-[#152234] border border-white/10 rounded-2xl shadow-2xl shadow-black/50 overflow-hidden z-50"
                  >
                    <div className="p-4">
                      <div className="text-[10px] font-semibold text-[#1e6fa8] uppercase tracking-widest mb-3" aria-hidden="true">Payment Solutions</div>
                      <div className="grid grid-cols-2 gap-1">
                        {NAV_SOLUTIONS.map((item) => (
                          <Link key={item.href} href={item.href} role="menuitem" className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-white/5 transition-colors group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#169fa8] focus-visible:ring-inset">
                            <span className="text-lg mt-0.5" aria-hidden="true">{item.icon}</span>
                            <div>
                              <div className="text-white text-sm font-medium group-hover:text-[#1e6fa8] transition-colors">{item.label}</div>
                              <div className="text-white/40 text-xs mt-0.5">{item.desc}</div>
                            </div>
                          </Link>
                        ))}
                      </div>
                      <div className="pt-3 mt-2 border-t border-white/10">
                        <Link href="/solutions" role="menuitem" className="flex items-center gap-1 text-[#1e6fa8] text-xs font-medium hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#169fa8]">
                          View all solutions <ArrowRight size={12} aria-hidden="true" />
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Industries dropdown */}
            <div className="relative">
              <button
                ref={industriesBtnRef}
                onClick={() => toggleMenu("industries")}
                aria-expanded={openMenu === "industries"}
                aria-haspopup="true"
                aria-controls="industries-menu"
                className={`flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#169fa8] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0d1b2a] ${
                  isActive("/industries") ? "text-[#1e6fa8] bg-[#1e6fa8]/10" : "text-white/75 hover:text-white hover:bg-white/5"
                }`}
              >
                Industries <ChevronDown size={14} className={`transition-transform ${openMenu === "industries" ? "rotate-180" : ""}`} aria-hidden="true" />
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
                    className="absolute top-full left-0 mt-1 w-[540px] bg-[#152234] border border-white/10 rounded-2xl shadow-2xl shadow-black/50 overflow-hidden z-50"
                  >
                    <div className="p-4">
                      <div className="text-[10px] font-semibold text-[#1e6fa8] uppercase tracking-widest mb-3" aria-hidden="true">Industries We Serve</div>
                      <div className="grid grid-cols-2 gap-1">
                        {NAV_INDUSTRIES.map((item) => (
                          <Link key={item.href} href={item.href} role="menuitem" className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-white/5 transition-colors group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#169fa8] focus-visible:ring-inset">
                            <span className="text-lg mt-0.5" aria-hidden="true">{item.icon}</span>
                            <div>
                              <div className="text-white text-sm font-medium group-hover:text-[#1e6fa8] transition-colors">{item.label}</div>
                              <div className="text-white/40 text-xs mt-0.5">{item.desc}</div>
                            </div>
                          </Link>
                        ))}
                      </div>
                      <div className="pt-3 mt-2 border-t border-white/10">
                        <Link href="/industries" role="menuitem" className="flex items-center gap-1 text-[#1e6fa8] text-xs font-medium hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#169fa8]">
                          View all industries <ArrowRight size={12} aria-hidden="true" />
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link href="/blog" className={`px-3 py-2 text-sm font-medium rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#169fa8] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0d1b2a] ${isActive("/blog") ? "text-[#1e6fa8] bg-[#1e6fa8]/10" : "text-white/75 hover:text-white hover:bg-white/5"}`}>
              News &amp; Updates
            </Link>
            <Link href="/locations" className={`px-3 py-2 text-sm font-medium rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#169fa8] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0d1b2a] ${isActive("/locations") ? "text-[#1e6fa8] bg-[#1e6fa8]/10" : "text-white/75 hover:text-white hover:bg-white/5"}`}>
              Locations
            </Link>

            {/* Company dropdown */}
            <div className="relative">
              <button
                ref={companyBtnRef}
                onClick={() => toggleMenu("company")}
                aria-expanded={openMenu === "company"}
                aria-haspopup="true"
                aria-controls="company-menu"
                className={`flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#169fa8] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0d1b2a] ${
                  isActive("/about") || isActive("/faq") || isActive("/contact") ? "text-[#1e6fa8] bg-[#1e6fa8]/10" : "text-white/75 hover:text-white hover:bg-white/5"
                }`}
              >
                Company <ChevronDown size={14} className={`transition-transform ${openMenu === "company" ? "rotate-180" : ""}`} aria-hidden="true" />
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
                    className="absolute top-full right-0 mt-1 w-52 bg-[#152234] border border-white/10 rounded-2xl shadow-2xl shadow-black/50 overflow-hidden z-50"
                  >
                    <div className="p-2">
                      <Link href="/about" role="menuitem" className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl hover:bg-white/5 transition-colors text-white/75 hover:text-white text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#169fa8] focus-visible:ring-inset">
                        About Us
                      </Link>
                      <Link href="/faq" role="menuitem" className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl hover:bg-white/5 transition-colors text-white/75 hover:text-white text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#169fa8] focus-visible:ring-inset">
                        FAQ's
                      </Link>
                      <Link href="/contact" role="menuitem" className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl hover:bg-white/5 transition-colors text-white/75 hover:text-white text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#169fa8] focus-visible:ring-inset">
                        Contact Us
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </nav>

          {/* Desktop CTAs */}
          <div className="hidden lg:flex items-center gap-3 shrink-0">
            <a href={SITE.phoneHref} className="flex items-center gap-1.5 text-white/55 text-sm hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#169fa8] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0d1b2a] rounded" aria-label={`Call UBC Unlimited at ${SITE.phone}`}>
              <Phone size={13} aria-hidden="true" /> {SITE.phone}
            </a>
            <Link href="/consultation" className="btn-gold text-sm py-2 px-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c47c2b] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0d1b2a]">
              Book a Consultation
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            className="lg:hidden p-2 text-white/75 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#169fa8] rounded"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
          >
            {mobileOpen ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
          </button>
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
            className="lg:hidden bg-[#0d1b2a] border-t border-white/10 overflow-hidden max-h-[80vh] overflow-y-auto"
          >
            <div className="container py-4 space-y-1">
              <div className="text-[10px] font-semibold text-[#1e6fa8] uppercase tracking-widest px-3 py-2" aria-hidden="true">Solutions</div>
              {NAV_SOLUTIONS.map((item) => (
                <Link key={item.href} href={item.href} className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/5 transition-colors text-white/75 hover:text-white text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#169fa8] focus-visible:ring-inset">
                  <span aria-hidden="true">{item.icon}</span> {item.label}
                </Link>
              ))}
              <div className="text-[10px] font-semibold text-[#1e6fa8] uppercase tracking-widest px-3 py-2 pt-4" aria-hidden="true">Industries</div>
              {NAV_INDUSTRIES.map((item) => (
                <Link key={item.href} href={item.href} className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/5 transition-colors text-white/75 hover:text-white text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#169fa8] focus-visible:ring-inset">
                  <span aria-hidden="true">{item.icon}</span> {item.label}
                </Link>
              ))}
              <div className="text-[10px] font-semibold text-[#1e6fa8] uppercase tracking-widest px-3 py-2 pt-4" aria-hidden="true">Company</div>
              {[
                { href: "/blog", label: "News & Updates" },
                { href: "/locations", label: "Locations" },
                { href: "/about", label: "About Us" },
                { href: "/faq", label: "FAQ" },
                { href: "/contact", label: "Contact Us" },
              ].map((item) => (
                <Link key={item.href} href={item.href} className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/5 transition-colors text-white/75 hover:text-white text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#169fa8] focus-visible:ring-inset">
                  {item.label}
                </Link>
              ))}
              <div className="pt-4 border-t border-white/10 space-y-2">
                <a href={SITE.phoneHref} className="flex items-center justify-center gap-2 py-2.5 text-white/75 hover:text-white text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#169fa8] rounded" aria-label={`Call UBC Unlimited at ${SITE.phone}`}>
                  <Phone size={14} aria-hidden="true" /> {SITE.phone}
                </a>
                <Link href="/consultation" className="btn-gold w-full justify-center py-2.5 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c47c2b]">
                  Book a Free Consultation
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

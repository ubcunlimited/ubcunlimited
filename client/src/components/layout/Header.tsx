import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, Phone, ChevronDown, CreditCard } from "lucide-react";
import { SITE, NAV_SOLUTIONS, NAV_INDUSTRIES } from "@/lib/config";
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [solutionsOpen, setSolutionsOpen] = useState(false);
  const [industriesOpen, setIndustriesOpen] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setSolutionsOpen(false);
    setIndustriesOpen(false);
  }, [location]);

  const isActive = (path: string) => location === path;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#040c1c]/95 backdrop-blur-md shadow-lg shadow-black/20 border-b border-white/5"
          : "bg-[#040c1c]/80 backdrop-blur-sm"
      }`}
    >
      {/* Top bar */}
      <div className="bg-[#169fa8]/10 border-b border-[#169fa8]/20 hidden md:block">
        <div className="container flex justify-between items-center py-1.5 text-xs text-white/60">
          <span>Utah's Local Merchant Services Experts — Serving Businesses Statewide</span>
          <a href={SITE.phoneHref} className="flex items-center gap-1.5 text-[#d4a843] font-semibold hover:text-[#e8c06a] transition-colors">
            <Phone size={11} />
            {SITE.phone}
          </a>
        </div>
      </div>

      <div className="container">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#169fa8] to-[#0f2040] flex items-center justify-center shadow-lg group-hover:shadow-[#169fa8]/30 transition-shadow">
              <CreditCard size={18} className="text-white" />
            </div>
            <div className="leading-tight">
              <div className="text-white font-bold text-base tracking-tight" style={{ fontFamily: 'Sora, sans-serif' }}>
                UBC Unlimited
              </div>
              <div className="text-[#169fa8] text-[10px] font-medium tracking-widest uppercase">
                Merchant Services
              </div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            <Link href="/" className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${isActive("/") ? "text-[#169fa8]" : "text-white/80 hover:text-white hover:bg-white/5"}`}>
              Home
            </Link>

            {/* Solutions dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setSolutionsOpen(true)}
              onMouseLeave={() => setSolutionsOpen(false)}
            >
              <button className={`flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-md transition-colors ${location.startsWith("/solutions") ? "text-[#169fa8]" : "text-white/80 hover:text-white hover:bg-white/5"}`}>
                Solutions <ChevronDown size={14} className={`transition-transform ${solutionsOpen ? "rotate-180" : ""}`} />
              </button>
              <AnimatePresence>
                {solutionsOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full left-0 mt-1 w-64 bg-[#0a1628] border border-white/10 rounded-xl shadow-2xl shadow-black/50 overflow-hidden"
                  >
                    <div className="p-2">
                      <div className="px-3 py-2 text-[10px] font-semibold text-[#169fa8] uppercase tracking-widest">Payment Solutions</div>
                      {NAV_SOLUTIONS.map((item) => (
                        <Link key={item.href} href={item.href} className="flex items-center gap-2.5 px-3 py-2 text-sm text-white/80 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
                          <span className="text-base">{item.icon}</span>
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Industries dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setIndustriesOpen(true)}
              onMouseLeave={() => setIndustriesOpen(false)}
            >
              <button className={`flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-md transition-colors ${location.startsWith("/industries") ? "text-[#169fa8]" : "text-white/80 hover:text-white hover:bg-white/5"}`}>
                Industries <ChevronDown size={14} className={`transition-transform ${industriesOpen ? "rotate-180" : ""}`} />
              </button>
              <AnimatePresence>
                {industriesOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full left-0 mt-1 w-60 bg-[#0a1628] border border-white/10 rounded-xl shadow-2xl shadow-black/50 overflow-hidden"
                  >
                    <div className="p-2">
                      <div className="px-3 py-2 text-[10px] font-semibold text-[#169fa8] uppercase tracking-widest">Industries Served</div>
                      {NAV_INDUSTRIES.map((item) => (
                        <Link key={item.href} href={item.href} className="flex items-center gap-2.5 px-3 py-2 text-sm text-white/80 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
                          <span className="text-base">{item.icon}</span>
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link href="/blog" className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${location.startsWith("/blog") ? "text-[#169fa8]" : "text-white/80 hover:text-white hover:bg-white/5"}`}>
              Blog
            </Link>
            <Link href="/about" className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${isActive("/about") ? "text-[#169fa8]" : "text-white/80 hover:text-white hover:bg-white/5"}`}>
              About
            </Link>
            <Link href="/contact" className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${isActive("/contact") ? "text-[#169fa8]" : "text-white/80 hover:text-white hover:bg-white/5"}`}>
              Contact
            </Link>
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <Link href="/statement-review" className="btn-outline-white text-sm py-2 px-4">
              Free Statement Review
            </Link>
            <Link href="/consultation" className="btn-teal text-sm py-2 px-4">
              Get a Quote
            </Link>
          </div>

          {/* Mobile menu toggle */}
          <button
            className="lg:hidden p-2 text-white/80 hover:text-white"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden bg-[#0a1628] border-t border-white/10 overflow-hidden"
          >
            <div className="container py-4 space-y-1">
              <Link href="/" className="block px-3 py-2.5 text-sm font-medium text-white/80 hover:text-white hover:bg-white/5 rounded-lg">Home</Link>
              
              <div className="px-3 py-2 text-[10px] font-semibold text-[#169fa8] uppercase tracking-widest mt-3">Solutions</div>
              {NAV_SOLUTIONS.map((item) => (
                <Link key={item.href} href={item.href} className="flex items-center gap-2 px-3 py-2 text-sm text-white/70 hover:text-white hover:bg-white/5 rounded-lg">
                  <span>{item.icon}</span>{item.label}
                </Link>
              ))}
              
              <div className="px-3 py-2 text-[10px] font-semibold text-[#169fa8] uppercase tracking-widest mt-3">Industries</div>
              {NAV_INDUSTRIES.map((item) => (
                <Link key={item.href} href={item.href} className="flex items-center gap-2 px-3 py-2 text-sm text-white/70 hover:text-white hover:bg-white/5 rounded-lg">
                  <span>{item.icon}</span>{item.label}
                </Link>
              ))}

              <div className="pt-3 border-t border-white/10 mt-3 space-y-2">
                <Link href="/blog" className="block px-3 py-2.5 text-sm font-medium text-white/80 hover:text-white hover:bg-white/5 rounded-lg">Blog</Link>
                <Link href="/about" className="block px-3 py-2.5 text-sm font-medium text-white/80 hover:text-white hover:bg-white/5 rounded-lg">About</Link>
                <Link href="/contact" className="block px-3 py-2.5 text-sm font-medium text-white/80 hover:text-white hover:bg-white/5 rounded-lg">Contact</Link>
              </div>
              <div className="pt-3 space-y-2">
                <Link href="/statement-review" className="block w-full text-center btn-outline-white text-sm py-2.5">Free Statement Review</Link>
                <Link href="/consultation" className="block w-full text-center btn-teal text-sm py-2.5">Get a Quote</Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

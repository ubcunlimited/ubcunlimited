/**
 * FloatingLauncher — Expandable floating action button for UBC Unlimited
 *
 * Desktop fan-out stack (bottom → top, each slot 60px apart):
 *   base      — Main trigger (gold)
 *   base + 60 — Chat
 *   base + 120 — Accessibility
 *   base + 180 — Back to Top (only when scrolled)
 *
 * Mobile: dedicated 44×44px accessibility button fixed at bottom:72px right:16px.
 */

import { useState, useEffect, useRef } from "react";
import { MessageCircle, Accessibility, ArrowUp, X } from "lucide-react";
import { AnimatePresence, motion, useAnimation } from "framer-motion";
import ChatPanel from "./ChatPanel";
import AccessibilityPanel from "./AccessibilityPanel";

type ActivePanel = "chat" | "a11y" | null;

// Pixel offsets
const MOBILE_BASE  = 88;  // px — main trigger bottom on mobile (above sticky call bar)
const DESKTOP_BASE = 24;  // px — main trigger bottom on desktop
const STEP         = 60;  // px — vertical gap between fan-out buttons

// Attention animation: 3-beat scale pulse + icon wiggle
// Only fires once per page load; skipped when prefers-reduced-motion is set.
const ATTENTION_SEQUENCE = {
  scale:  [1, 1.18, 1, 1.14, 1, 1.10, 1],
  rotate: [0, -8, 8, -5, 5, -2, 0],
  transition: {
    duration: 1.4,
    ease: [0.42, 0, 0.58, 1] as [number, number, number, number],
    times: [0, 0.15, 0.30, 0.45, 0.60, 0.75, 1.0],
  },
};

export default function FloatingLauncher() {
  const [menuOpen, setMenuOpen]         = useState(false);
  const [activePanel, setActivePanel]   = useState<ActivePanel>(null);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [isMobile, setIsMobile]         = useState(false);
  const [showTooltip, setShowTooltip]   = useState(false);
  const [showRipple, setShowRipple]     = useState(false);

  const mobileA11yControls  = useAnimation();
  const desktopA11yControls = useAnimation();
  const animatedRef = useRef(false);

  // First-visit tooltip on mobile: show once for 2.5 s then persist the flag
  useEffect(() => {
    const seen = localStorage.getItem("ubc-a11y-tooltip-seen");
    if (seen || window.innerWidth >= 1024) return;
    const showTimer = setTimeout(() => setShowTooltip(true), 1500);
    const hideTimer = setTimeout(() => {
      setShowTooltip(false);
      localStorage.setItem("ubc-a11y-tooltip-seen", "1");
    }, 4000);
    return () => { clearTimeout(showTimer); clearTimeout(hideTimer); };
  }, []);

  // One-time attention animation 2 s after mount
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = setTimeout(async () => {
      if (animatedRef.current) return;
      animatedRef.current = true;
      setShowRipple(true);
      mobileA11yControls.start(ATTENTION_SEQUENCE);
      desktopA11yControls.start(ATTENTION_SEQUENCE);
      setTimeout(() => setShowRipple(false), 1600);
    }, 2000);
    return () => clearTimeout(timer);
  }, [mobileA11yControls, desktopA11yControls]);

  // Responsive breakpoint detection
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener("resize", check, { passive: true });
    return () => window.removeEventListener("resize", check);
  }, []);

  // Back-to-top visibility after 400 px scroll
  useEffect(() => {
    const onScroll = () => setShowBackToTop(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Custom event: cookie banner can open the accessibility panel
  useEffect(() => {
    const onOpenA11y = () => { setActivePanel("a11y"); setMenuOpen(false); };
    window.addEventListener("ubc:open-accessibility", onOpenA11y);
    return () => window.removeEventListener("ubc:open-accessibility", onOpenA11y);
  }, []);

  // Alt+A keyboard shortcut to toggle accessibility panel
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.altKey && e.key.toLowerCase() === "a") {
        e.preventDefault();
        setActivePanel((prev) => (prev === "a11y" ? null : "a11y"));
        setMenuOpen(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const scrollToTop = () => { window.scrollTo({ top: 0, behavior: "smooth" }); setMenuOpen(false); };
  const toggleMenu  = () => { setMenuOpen((v) => { if (v) setActivePanel(null); return !v; }); };
  const openPanel   = (panel: ActivePanel) => { setActivePanel(panel); setMenuOpen(false); };
  const closePanel  = () => setActivePanel(null);

  const base         = isMobile ? MOBILE_BASE : DESKTOP_BASE;
  const chatBottom   = base + STEP;
  const a11yBottom   = base + STEP * 2;
  const topBottom    = base + STEP * 3;
  const panelBottom  = base + 80;

  // ── Mobile layout ──────────────────────────────────────────────────────────

  if (isMobile) {
    return (
      <>
        {/* Ripple ring */}
        <AnimatePresence>
          {showRipple && (
            <motion.span
              key="ripple-mobile"
              initial={{ opacity: 0.7, scale: 1 }}
              animate={{ opacity: 0, scale: 2.6 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              data-a11y-ui="true"
              style={{
                position: "fixed",
                bottom: "72px",
                right: "16px",
                zIndex: 9899,
                width: "44px",
                height: "44px",
                borderRadius: "50%",
                backgroundColor: "rgba(0, 87, 184, 0.45)",
                pointerEvents: "none",
              }}
            />
          )}
        </AnimatePresence>

        {/* Accessibility button */}
        <motion.button
          onClick={() => setActivePanel((prev) => (prev === "a11y" ? null : "a11y"))}
          aria-label={activePanel === "a11y" ? "Close accessibility options" : "Open accessibility options"}
          aria-expanded={activePanel === "a11y"}
          data-a11y-ui="true"
          className="a11y-mobile-btn"
          animate={mobileA11yControls}
          style={{
            position: "fixed",
            bottom: "72px",
            right: "16px",
            zIndex: 9900,
            width: "44px",
            height: "44px",
            borderRadius: "50%",
            backgroundColor: "#0057B8",
            color: "#ffffff",
            border: "none",
            boxShadow: "0 4px 16px rgba(0,87,184,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            flexShrink: 0,
          }}
        >
          {activePanel === "a11y"
            ? <X size={18} aria-hidden="true" />
            : <Accessibility size={18} aria-hidden="true" />
          }
        </motion.button>

        {/* First-visit tooltip */}
        <AnimatePresence>
          {showTooltip && (
            <motion.div
              key="a11y-tooltip"
              initial={{ opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 8 }}
              transition={{ duration: 0.25 }}
              data-a11y-ui="true"
              style={{
                position: "fixed",
                bottom: "82px",
                right: "66px",
                zIndex: 9901,
                backgroundColor: "#0057B8",
                color: "#ffffff",
                fontSize: "12px",
                fontWeight: 600,
                letterSpacing: "0.03em",
                padding: "5px 10px",
                borderRadius: "6px",
                whiteSpace: "nowrap",
                pointerEvents: "none",
                boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
              }}
            >
              Accessibility
              <span style={{
                position: "absolute",
                right: "-6px",
                top: "50%",
                transform: "translateY(-50%)",
                width: 0,
                height: 0,
                borderTop: "5px solid transparent",
                borderBottom: "5px solid transparent",
                borderLeft: "6px solid #0057B8",
              }} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Accessibility panel */}
        <AnimatePresence>
          {activePanel === "a11y" && (
            <AccessibilityPanel onClose={closePanel} bottomClass="" bottomPx={120} />
          )}
        </AnimatePresence>
      </>
    );
  }

  // ── Desktop layout ─────────────────────────────────────────────────────────

  return (
    <>
      {/* Active panels */}
      <AnimatePresence>
        {activePanel === "chat" && (
          <ChatPanel onClose={closePanel} bottomClass="" bottomPx={panelBottom} />
        )}
        {activePanel === "a11y" && (
          <AccessibilityPanel onClose={closePanel} bottomClass="" bottomPx={panelBottom} />
        )}
      </AnimatePresence>

      {/* Ripple ring behind main trigger */}
      <AnimatePresence>
        {showRipple && (
          <motion.span
            key="ripple-desktop"
            initial={{ opacity: 0.6, scale: 1 }}
            animate={{ opacity: 0, scale: 2.8 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.3, ease: "easeOut" }}
            data-a11y-ui="true"
            style={{
              position: "fixed",
              bottom: `${base}px`,
              right: "24px",
              zIndex: 49,
              width: "56px",
              height: "56px",
              borderRadius: "50%",
              backgroundColor: "rgba(0, 87, 184, 0.35)",
              pointerEvents: "none",
            }}
          />
        )}
      </AnimatePresence>

      {/* Fan-out action buttons */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Back to Top — only when scrolled */}
            {showBackToTop && (
              <motion.button
                key="back-to-top"
                initial={{ opacity: 0, scale: 0.7, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.7, y: 10 }}
                transition={{ duration: 0.18, delay: 0.06 }}
                onClick={scrollToTop}
                aria-label="Scroll back to top"
                style={{ bottom: `${topBottom}px`, right: "24px" }}
                className="fixed z-50 w-11 h-11 rounded-full bg-[#1a1a1a] border border-[#c9a84c]/50 hover:border-[#c9a84c] hover:bg-[#222] text-[#c9a84c] shadow-lg flex items-center justify-center transition-colors"
              >
                <ArrowUp size={18} aria-hidden="true" />
              </motion.button>
            )}

            {/* Accessibility */}
            <motion.button
              key="a11y"
              initial={{ opacity: 0, scale: 0.7, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.7, y: 10 }}
              transition={{ duration: 0.18, delay: 0.04 }}
              onClick={() => openPanel("a11y")}
              aria-label="Open accessibility options"
              style={{ bottom: `${a11yBottom}px`, right: "24px", backgroundColor: "#0057B8" }}
              className="fixed z-50 w-11 h-11 rounded-full text-white shadow-lg flex items-center justify-center transition-colors"
            >
              <motion.span
                animate={desktopA11yControls}
                style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
              >
                <Accessibility size={18} aria-hidden="true" />
              </motion.span>
            </motion.button>

            {/* Chat */}
            <motion.button
              key="chat"
              initial={{ opacity: 0, scale: 0.7, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.7, y: 10 }}
              transition={{ duration: 0.18, delay: 0.02 }}
              onClick={() => openPanel("chat")}
              aria-label="Open live chat"
              style={{ bottom: `${chatBottom}px`, right: "24px" }}
              className="fixed z-50 w-11 h-11 rounded-full bg-[#1a1a1a] border border-[#c9a84c]/50 hover:border-[#c9a84c] hover:bg-[#222] text-[#c9a84c] shadow-lg flex items-center justify-center transition-colors"
            >
              <MessageCircle size={18} aria-hidden="true" />
            </motion.button>
          </>
        )}
      </AnimatePresence>

      {/* Main trigger button */}
      <button
        onClick={toggleMenu}
        aria-label={menuOpen ? "Close widget menu" : "Open widget menu"}
        aria-expanded={menuOpen}
        style={{ bottom: `${base}px`, right: "24px", boxShadow: "0 4px 24px rgba(201,168,76,0.45)" }}
        className={`fixed z-50 w-14 h-14 rounded-full bg-[#c9a84c] hover:bg-[#b8972a] active:bg-[#a07820] shadow-lg hover:shadow-xl flex items-center justify-center transition-all duration-200 ${menuOpen ? "rotate-45" : "rotate-0"}`}
      >
        {menuOpen
          ? <X size={22} className="text-[#080808]" aria-hidden="true" />
          : <MessageCircle size={24} className="text-[#080808]" aria-hidden="true" />
        }
      </button>
    </>
  );
}

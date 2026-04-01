/**
 * FloatingLauncher — Single expandable floating action button for UBC Unlimited
 *
 * Layout: uses explicit `bottom` pixel values (not mb-) so each button
 * sits at a fixed absolute position above the main trigger.
 *
 * Button stack (from bottom up):
 *   0 — Main trigger (gold)    bottom: 88px mobile / 24px desktop
 *   1 — Chat (blue)            bottom: 160px mobile / 96px desktop
 *   2 — Accessibility (teal)   bottom: 220px mobile / 156px desktop
 *   3 — Back to Top (green)    bottom: 280px mobile / 216px desktop  (only when scrolled)
 *
 * Each button is 44px tall, spaced 16px apart.
 */

import { useState, useEffect, useRef } from "react";
import { MessageCircle, Accessibility, ArrowUp, X } from "lucide-react";
import { AnimatePresence, motion, useAnimation } from "framer-motion";
import ChatPanel from "./ChatPanel";
import AccessibilityPanel from "./AccessibilityPanel";

type ActivePanel = "chat" | "a11y" | null;

// ── Pixel offsets ─────────────────────────────────────────────────────────────
// Mobile: sticky call bar is ~64px, so main trigger sits at 88px
// Desktop: main trigger sits at 24px (bottom-6)
const MOBILE_BASE = 88;   // px — main trigger bottom on mobile
const DESKTOP_BASE = 24;  // px — main trigger bottom on desktop
const STEP = 60;          // px — vertical gap between each fan-out button

// Attention animation: gentle 3-beat pulse + slight rotation
// Respects prefers-reduced-motion — skipped entirely if user has that set
const ATTENTION_SEQUENCE = {
  scale: [1, 1.18, 1, 1.14, 1, 1.10, 1],
  rotate: [0, -8, 8, -5, 5, -2, 0],
  transition: {
    duration: 1.4,
    ease: [0.42, 0, 0.58, 1] as [number, number, number, number],
    times: [0, 0.15, 0.30, 0.45, 0.60, 0.75, 1.0],
  },
};

export default function FloatingLauncher() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activePanel, setActivePanel] = useState<ActivePanel>(null);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // First-visit tooltip: show "Accessibility" label for 2.5s on first page load (mobile only)
  const [showTooltip, setShowTooltip] = useState(false);
  useEffect(() => {
    const seen = localStorage.getItem("ubc-a11y-tooltip-seen");
    if (!seen && window.innerWidth < 1024) {
      const showTimer = setTimeout(() => setShowTooltip(true), 1500);
      const hideTimer = setTimeout(() => {
        setShowTooltip(false);
        localStorage.setItem("ubc-a11y-tooltip-seen", "1");
      }, 4000);
      return () => { clearTimeout(showTimer); clearTimeout(hideTimer); };
    }
  }, []);

  // Attention animation controls — fires once on first load after 2s delay
  const mobileA11yControls = useAnimation();
  const desktopA11yControls = useAnimation();
  const [showRipple, setShowRipple] = useState(false);
  const animatedRef = useRef(false);

  useEffect(() => {
    // Respect prefers-reduced-motion
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const timer = setTimeout(async () => {
      if (animatedRef.current) return;
      animatedRef.current = true;
      setShowRipple(true);
      // Run on whichever control is relevant (both fire, only the rendered one matters)
      mobileA11yControls.start(ATTENTION_SEQUENCE);
      desktopA11yControls.start(ATTENTION_SEQUENCE);
      // Hide ripple after animation completes
      setTimeout(() => setShowRipple(false), 1600);
    }, 2000);

    return () => clearTimeout(timer);
  }, [mobileA11yControls, desktopA11yControls]);

  // Detect mobile breakpoint
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener("resize", check, { passive: true });
    return () => window.removeEventListener("resize", check);
  }, []);

  // Show back-to-top after 400px scroll
  useEffect(() => {
    const onScroll = () => setShowBackToTop(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Listen for cookie banner accessibility button click
  useEffect(() => {
    const onOpenA11y = () => {
      setActivePanel("a11y");
      setMenuOpen(false);
    };
    window.addEventListener("ubc:open-accessibility", onOpenA11y);
    return () => window.removeEventListener("ubc:open-accessibility", onOpenA11y);
  }, []);

  // Alt+A keyboard shortcut to open accessibility panel
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

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setMenuOpen(false);
  };

  const toggleMenu = () => {
    setMenuOpen((v) => {
      if (v) setActivePanel(null);
      return !v;
    });
  };

  const openPanel = (panel: ActivePanel) => {
    setActivePanel(panel);
    setMenuOpen(false);
  };

  const closePanel = () => setActivePanel(null);

  const base = isMobile ? MOBILE_BASE : DESKTOP_BASE;

  // Compute bottom px for each fan-out slot (0 = closest to trigger)
  const chatBottom    = base + STEP * 1;
  const a11yBottom    = base + STEP * 2;
  const topBottom     = base + STEP * 3;

  // Panels open 80px above the main trigger
  const panelBottomPx = base + 80;

  // ── Mobile layout ─────────────────────────────────────────────────────────
  if (isMobile) {
    return (
      <>
        {/* Ripple ring — expands outward from the button center */}
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

        {/* Accessibility button — always visible on mobile */}
        <motion.button
          onClick={() => setActivePanel((prev) => (prev === "a11y" ? null : "a11y"))}
          aria-label={activePanel === "a11y" ? "Close accessibility options" : "Open accessibility options"}
          aria-expanded={activePanel === "a11y"}
          data-a11y-ui="true"
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
          {activePanel === "a11y" ? (
            <X size={18} aria-hidden="true" />
          ) : (
            <Accessibility size={18} aria-hidden="true" />
          )}
        </motion.button>

        {/* First-visit tooltip label */}
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

        {/* Accessibility panel — opens above the button */}
        <AnimatePresence>
          {activePanel === "a11y" && (
            <AccessibilityPanel onClose={closePanel} bottomClass="" bottomPx={120} />
          )}
        </AnimatePresence>
      </>
    );
  }

  return (
    <>
      {/* ── Active panels ──────────────────────────────────────────────── */}
      <AnimatePresence>
        {activePanel === "chat" && (
          <ChatPanel onClose={closePanel} bottomClass="" bottomPx={panelBottomPx} />
        )}
        {activePanel === "a11y" && (
          <AccessibilityPanel onClose={closePanel} bottomClass="" bottomPx={panelBottomPx} />
        )}
      </AnimatePresence>

      {/* ── Desktop: ripple ring behind the main trigger button ─────────── */}
      {/* On desktop the a11y button is hidden until menu opens, so we animate
          the main trigger button with a subtle ring to draw attention */}
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

      {/* ── Fan-out action buttons ─────────────────────────────────────── */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Back to Top — green — only when scrolled */}
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

            {/* Accessibility — blue — with attention animation */}
            <motion.button
              key="a11y"
              initial={{ opacity: 0, scale: 0.7, y: 10 }}
              animate={desktopA11yControls}
              exit={{ opacity: 0, scale: 0.7, y: 10 }}
              transition={{ duration: 0.18, delay: 0.04 }}
              onClick={() => openPanel("a11y")}
              aria-label="Open accessibility options"
              style={{ bottom: `${a11yBottom}px`, right: "24px", backgroundColor: "#0057B8" }}
              className="fixed z-50 w-11 h-11 rounded-full text-white shadow-lg flex items-center justify-center transition-colors"
            >
              <Accessibility size={18} aria-hidden="true" />
            </motion.button>

            {/* Chat — blue-indigo */}
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

      {/* ── Main trigger button ────────────────────────────────────────── */}
      <button
        onClick={toggleMenu}
        aria-label={menuOpen ? "Close widget menu" : "Open widget menu"}
        aria-expanded={menuOpen}
        style={{ bottom: `${base}px`, right: "24px", boxShadow: "0 4px 24px rgba(201,168,76,0.45)" }}
        className={`fixed z-50 w-14 h-14 rounded-full bg-[#c9a84c] hover:bg-[#b8972a] active:bg-[#a07820] shadow-lg hover:shadow-xl flex items-center justify-center transition-all duration-200 ${menuOpen ? "rotate-45" : "rotate-0"}`}
      >
        {menuOpen ? (
          <X size={22} className="text-[#080808]" aria-hidden="true" />
        ) : (
          <MessageCircle size={24} className="text-[#080808]" aria-hidden="true" />
        )}
      </button>
    </>
  );
}

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

import { useState, useEffect } from "react";
import { MessageCircle, Accessibility, ArrowUp, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import ChatPanel from "./ChatPanel";
import AccessibilityPanel from "./AccessibilityPanel";

type ActivePanel = "chat" | "a11y" | null;

// ── Pixel offsets ─────────────────────────────────────────────────────────────
// Mobile: sticky call bar is ~64px, so main trigger sits at 88px
// Desktop: main trigger sits at 24px (bottom-6)
const MOBILE_BASE = 88;   // px — main trigger bottom on mobile
const DESKTOP_BASE = 24;  // px — main trigger bottom on desktop
const STEP = 60;          // px — vertical gap between each fan-out button

export default function FloatingLauncher() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activePanel, setActivePanel] = useState<ActivePanel>(null);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

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

  // On mobile: hide the launcher buttons but still render the accessibility panel
  // when triggered from the cookie banner (ubc:open-accessibility event)
  if (isMobile) {
    return (
      <AnimatePresence>
        {activePanel === "a11y" && (
          <AccessibilityPanel onClose={closePanel} bottomClass="" bottomPx={80} />
        )}
      </AnimatePresence>
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

            {/* Accessibility — teal/blue */}
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

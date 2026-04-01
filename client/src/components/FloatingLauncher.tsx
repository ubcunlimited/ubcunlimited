/**
 * FloatingLauncher — Single expandable floating action button for UBC Unlimited
 *
 * ADA Compliance:
 * - EVERY element in this component carries data-a11y-ui="true" so the entire
 *   launcher stack is excluded from all high-contrast and filter overrides in
 *   AccessibilityPanel's buildCSS function.
 * - Critical colors are also set via inline `style` props so they cannot be
 *   overridden by injected !important CSS rules that target class-based colors.
 *
 * Layout: uses explicit `bottom` pixel values (not mb-) so each button
 * sits at a fixed absolute position above the main trigger.
 *
 * Button stack (from bottom up):
 *   0 — Main trigger (gold)    bottom: 88px mobile / 24px desktop
 *   1 — Chat (charcoal/gold)   bottom: 160px mobile / 96px desktop
 *   2 — Accessibility (blue)   bottom: 220px mobile / 156px desktop
 *   3 — Back to Top (charcoal) bottom: 280px mobile / 216px desktop  (only when scrolled)
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
  const chatBottom = base + STEP * 1;
  const a11yBottom = base + STEP * 2;
  const topBottom  = base + STEP * 3;

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
            {/* Back to Top — only when scrolled */}
            {showBackToTop && (
              <motion.button
                key="back-to-top"
                data-a11y-ui="true"
                initial={{ opacity: 0, scale: 0.7, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.7, y: 10 }}
                transition={{ duration: 0.18, delay: 0.06 }}
                onClick={scrollToTop}
                aria-label="Scroll back to top"
                style={{
                  position: "fixed",
                  bottom: `${topBottom}px`,
                  right: "24px",
                  zIndex: 50,
                  width: "44px",
                  height: "44px",
                  borderRadius: "50%",
                  backgroundColor: "#1a1a1a",
                  border: "1px solid rgba(201,168,76,0.5)",
                  color: "#c9a84c",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.4)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                }}
              >
                <ArrowUp size={18} aria-hidden="true" />
              </motion.button>
            )}

            {/* Accessibility — ISA blue */}
            <motion.button
              key="a11y"
              data-a11y-ui="true"
              initial={{ opacity: 0, scale: 0.7, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.7, y: 10 }}
              transition={{ duration: 0.18, delay: 0.04 }}
              onClick={() => openPanel("a11y")}
              aria-label="Open accessibility options (Alt+A)"
              style={{
                position: "fixed",
                bottom: `${a11yBottom}px`,
                right: "24px",
                zIndex: 50,
                width: "44px",
                height: "44px",
                borderRadius: "50%",
                backgroundColor: "#0057B8",
                border: "2px solid rgba(77,166,255,0.6)",
                color: "#ffffff",
                boxShadow: "0 4px 16px rgba(0,87,184,0.5)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
              }}
            >
              <Accessibility size={18} aria-hidden="true" />
            </motion.button>

            {/* Chat */}
            <motion.button
              key="chat"
              data-a11y-ui="true"
              initial={{ opacity: 0, scale: 0.7, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.7, y: 10 }}
              transition={{ duration: 0.18, delay: 0.02 }}
              onClick={() => openPanel("chat")}
              aria-label="Open live chat"
              style={{
                position: "fixed",
                bottom: `${chatBottom}px`,
                right: "24px",
                zIndex: 50,
                width: "44px",
                height: "44px",
                borderRadius: "50%",
                backgroundColor: "#1a1a1a",
                border: "1px solid rgba(201,168,76,0.5)",
                color: "#c9a84c",
                boxShadow: "0 4px 12px rgba(0,0,0,0.4)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
              }}
            >
              <MessageCircle size={18} aria-hidden="true" />
            </motion.button>
          </>
        )}
      </AnimatePresence>

      {/* ── Main trigger button ────────────────────────────────────────── */}
      <button
        data-a11y-ui="true"
        onClick={toggleMenu}
        aria-label={menuOpen ? "Close widget menu" : "Open widget menu"}
        aria-expanded={menuOpen}
        style={{
          position: "fixed",
          bottom: `${base}px`,
          right: "24px",
          zIndex: 50,
          width: "56px",
          height: "56px",
          borderRadius: "50%",
          backgroundColor: "#c9a84c",
          color: "#080808",
          boxShadow: "0 4px 24px rgba(201,168,76,0.45)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          border: "none",
          transition: "transform 0.2s, background-color 0.2s",
          transform: menuOpen ? "rotate(45deg)" : "rotate(0deg)",
        }}
      >
        {menuOpen ? (
          <X size={22} aria-hidden="true" />
        ) : (
          <Accessibility size={24} aria-hidden="true" />
        )}
      </button>
    </>
  );
}

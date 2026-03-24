/**
 * FloatingLauncher — Single expandable floating action button for UBC Unlimited
 *
 * A single chat-bubble icon sits in the bottom-right corner.
 * Clicking it fans out three action buttons:
 *   1. Live Chat (opens the chat window)
 *   2. Accessibility (opens the ADA panel)
 *   3. Back to Top (scrolls to top)
 *
 * Positioning: bottom-[5.5rem] on mobile (above sticky call bar), bottom-6 on desktop.
 * The chat window and ADA panel are rendered inline here and controlled via callbacks.
 */

import { useState, useEffect, useRef, useCallback } from "react";
import { MessageCircle, Accessibility, ArrowUp, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

// ── Sub-panel imports ─────────────────────────────────────────────────────────
import ChatPanel from "./ChatPanel";
import AccessibilityPanel from "./AccessibilityPanel";

// ── Types ─────────────────────────────────────────────────────────────────────
type ActivePanel = "chat" | "a11y" | null;

export default function FloatingLauncher() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activePanel, setActivePanel] = useState<ActivePanel>(null);
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Show back-to-top after 400px scroll
  useEffect(() => {
    const onScroll = () => setShowBackToTop(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setMenuOpen(false);
  };

  const toggleMenu = () => {
    setMenuOpen((v) => !v);
    // Close any open panel when collapsing the menu
    if (menuOpen) setActivePanel(null);
  };

  const openPanel = (panel: ActivePanel) => {
    setActivePanel(panel);
    setMenuOpen(false);
  };

  const closePanel = () => setActivePanel(null);

  // Bottom positioning: above sticky mobile call bar on mobile, normal on desktop
  const baseBottom = "bottom-[5.5rem] lg:bottom-6";

  return (
    <>
      {/* ── Active panels ──────────────────────────────────────────────── */}
      <AnimatePresence>
        {activePanel === "chat" && (
          <ChatPanel
            onClose={closePanel}
            bottomClass="bottom-[5.5rem] lg:bottom-6"
          />
        )}
        {activePanel === "a11y" && (
          <AccessibilityPanel
            onClose={closePanel}
            bottomClass="bottom-[5.5rem] lg:bottom-6"
          />
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
                initial={{ opacity: 0, y: 12, scale: 0.85 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 12, scale: 0.85 }}
                transition={{ duration: 0.18, delay: 0.04 }}
                onClick={scrollToTop}
                aria-label="Scroll back to top"
                className={`fixed right-6 ${baseBottom} z-50 mb-[9.5rem] w-11 h-11 rounded-full bg-[#1a1a1a] border border-white/15 hover:border-[#c9a84c]/60 text-white/70 hover:text-[#c9a84c] shadow-lg flex items-center justify-center transition-colors`}
              >
                <ArrowUp size={17} aria-hidden="true" />
              </motion.button>
            )}

            {/* Accessibility */}
            <motion.button
              key="a11y"
              initial={{ opacity: 0, y: 12, scale: 0.85 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.85 }}
              transition={{ duration: 0.18, delay: showBackToTop ? 0.08 : 0.04 }}
              onClick={() => openPanel("a11y")}
              aria-label="Open accessibility options"
              className={`fixed right-6 ${baseBottom} z-50 ${showBackToTop ? "mb-[7rem]" : "mb-[4.5rem]"} w-11 h-11 rounded-full bg-[#1a1a1a] border border-white/15 hover:border-[#c9a84c]/60 text-white/70 hover:text-[#c9a84c] shadow-lg flex items-center justify-center transition-colors`}
            >
              <Accessibility size={17} aria-hidden="true" />
            </motion.button>

            {/* Chat */}
            <motion.button
              key="chat"
              initial={{ opacity: 0, y: 12, scale: 0.85 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.85 }}
              transition={{ duration: 0.18, delay: showBackToTop ? 0.12 : 0.08 }}
              onClick={() => openPanel("chat")}
              aria-label="Open live chat"
              className={`fixed right-6 ${baseBottom} z-50 mb-[2.5rem] w-11 h-11 rounded-full bg-[#1a1a1a] border border-white/15 hover:border-[#c9a84c]/60 text-white/70 hover:text-[#c9a84c] shadow-lg flex items-center justify-center transition-colors`}
            >
              <MessageCircle size={17} aria-hidden="true" />
            </motion.button>
          </>
        )}
      </AnimatePresence>

      {/* ── Main trigger button ────────────────────────────────────────── */}
      <button
        onClick={toggleMenu}
        aria-label={menuOpen ? "Close widget menu" : "Open widget menu"}
        aria-expanded={menuOpen}
        className={`fixed right-6 ${baseBottom} z-50 w-14 h-14 rounded-full bg-[#c9a84c] hover:bg-[#b8972a] active:bg-[#a07820] shadow-lg hover:shadow-xl flex items-center justify-center transition-all duration-200 ${menuOpen ? "rotate-45" : "rotate-0"}`}
        style={{ boxShadow: "0 4px 24px rgba(201,168,76,0.45)" }}
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

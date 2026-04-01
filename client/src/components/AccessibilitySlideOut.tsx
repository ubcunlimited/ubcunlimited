/**
 * AccessibilitySlideOut — ADA compliance slide-out tab anchored to bottom-right.
 *
 * Layout (mirrors RecaptchaBadge on the left):
 *   [PANEL slides in from right] [BLUE TAB — always visible on right edge]
 *
 * The blue "Accessibility" vertical tab is always visible on the RIGHT edge.
 * Clicking it slides the full AccessibilityPanel OUT TO THE LEFT.
 *
 * - Full size, fully opaque — no transparency
 * - Keyboard accessible (Escape to close, Alt+A shortcut)
 * - Wraps the existing AccessibilityPanel component (all 15+ controls preserved)
 */

import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import AccessibilityPanel from "./AccessibilityPanel";

const TAB_WIDTH = 28; // px — blue toggle tab

export default function AccessibilitySlideOut() {
  const [open, setOpen] = useState(false);

  // Keyboard shortcut: Alt+A
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.altKey && e.key.toLowerCase() === "a") {
        setOpen((v) => !v);
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Listen for the cookie-banner "open accessibility" event
  useEffect(() => {
    const onOpen = () => setOpen(true);
    window.addEventListener("ubc:open-accessibility", onOpen);
    return () => window.removeEventListener("ubc:open-accessibility", onOpen);
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        bottom: 14,
        right: 0,
        zIndex: 9997,
        display: "flex",
        alignItems: "flex-end",
      }}
    >
      {/* ── Panel slides in from the right ─────────────────────────────── */}
      <AnimatePresence>
        {open && (
          <AccessibilityPanel
            onClose={() => setOpen(false)}
            bottomClass=""
            bottomPx={0}
            inlineMode={true}
          />
        )}
      </AnimatePresence>

      {/* ── Toggle tab — always visible on the right edge ─────────────── */}
      <button
        aria-label={open ? "Close accessibility options" : "Open accessibility options (Alt+A)"}
        aria-expanded={open}
        aria-haspopup="dialog"
        onClick={() => setOpen((v) => !v)}
        style={{
          width: TAB_WIDTH,
          height: 60,
          background: "#1A73E8",
          border: "none",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "4px 0 0 4px",
          padding: 0,
          flexShrink: 0,
          alignSelf: "flex-end",
        }}
      >
        <span
          style={{
            writingMode: "vertical-rl",
            textOrientation: "mixed",
            transform: "rotate(180deg)",
            fontSize: 8,
            fontWeight: 700,
            color: "#ffffff",
            letterSpacing: "0.08em",
            userSelect: "none",
            lineHeight: 1,
          }}
        >
          Accessibility
        </span>
      </button>
    </div>
  );
}

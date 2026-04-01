/**
 * RecaptchaBadge — custom slide-out reCAPTCHA v3 disclosure panel.
 *
 * Replaces the native .grecaptcha-badge (hidden via CSS) with a branded
 * slide-out drawer anchored to the bottom-left. A blue vertical tab labelled
 * "reCAPTCHA" is always visible; clicking it reveals the full disclosure panel
 * with the shield logo and links to Google's Privacy Policy & Terms of Service.
 *
 * Only rendered on production domains (ubcunlimited.com / www.ubcunlimited.com)
 * to match the conditional script loading in index.html.
 */

import { useEffect, useState } from "react";

const PRODUCTION_HOSTS = ["ubcunlimited.com", "www.ubcunlimited.com"];

function isProduction() {
  if (typeof window === "undefined") return false;
  return PRODUCTION_HOSTS.includes(window.location.hostname);
}

export default function RecaptchaBadge() {
  const [open, setOpen] = useState(false);

  // Close on Escape key
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Only render on production
  if (!isProduction()) return null;

  const PANEL_WIDTH = 218; // px — matches terminalbroker.com

  return (
    <div
      className="recaptcha-custom-badge"
      aria-label="reCAPTCHA protection disclosure"
      style={{
        position: "fixed",
        bottom: 14,
        left: open ? 0 : -PANEL_WIDTH,
        zIndex: 9999,
        display: "flex",
        alignItems: "stretch",
        height: 60,
        transition: "left 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        filter: "drop-shadow(2px 2px 6px rgba(0,0,0,0.28))",
      }}
    >
      {/* ── Disclosure panel ───────────────────────────────────────────── */}
      <div
        style={{
          width: PANEL_WIDTH,
          background: "#fff",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "0 12px",
          borderRadius: "0 4px 0 0",
          borderTop: "1px solid #e0e0e0",
          borderRight: "1px solid #e0e0e0",
        }}
      >
        {/* Logo + label row */}
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 3 }}>
          {/* reCAPTCHA shield SVG (Google's official colours) */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 64 64"
            width={22}
            height={22}
            aria-hidden="true"
          >
            <path d="M32 2L6 14v18c0 16.6 11.1 32.1 26 36 14.9-3.9 26-19.4 26-36V14L32 2z" fill="#4A90D9" />
            <path d="M32 8L10 18v14c0 13.2 8.8 25.6 22 29.3V8z" fill="#1A73E8" />
            <path d="M32 8v53.3C45.2 57.6 54 45.2 54 32V18L32 8z" fill="#4A90D9" />
            <path d="M25 32l-5-5-3 3 8 8 14-14-3-3z" fill="#ffffff" />
          </svg>

          <div>
            <div style={{ fontSize: 9, color: "#757575", lineHeight: 1.2, letterSpacing: "0.02em" }}>
              protected by
            </div>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#333", lineHeight: 1.2, letterSpacing: "0.01em" }}>
              reCAPTCHA
            </div>
          </div>
        </div>

        {/* Privacy / Terms links */}
        <div style={{ fontSize: 9, color: "#757575", lineHeight: 1.4 }}>
          <a
            href="https://policies.google.com/privacy"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#1A73E8", textDecoration: "none" }}
          >
            Privacy Policy
          </a>
          {" - "}
          <a
            href="https://policies.google.com/terms"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#1A73E8", textDecoration: "none" }}
          >
            Terms of Service
          </a>
        </div>
      </div>

      {/* ── Toggle tab ─────────────────────────────────────────────────── */}
      <button
        aria-label={open ? "Hide reCAPTCHA badge" : "Show reCAPTCHA badge"}
        onClick={() => setOpen((v) => !v)}
        style={{
          width: 28,
          background: "#1A73E8",
          border: "none",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "0 4px 4px 0",
          padding: 0,
          flexShrink: 0,
        }}
      >
        <span
          style={{
            writingMode: "vertical-rl",
            textOrientation: "mixed",
            transform: "rotate(180deg)",
            fontSize: 8,
            fontWeight: 700,
            color: "#fff",
            letterSpacing: "0.08em",
            userSelect: "none",
            lineHeight: 1,
          }}
        >
          reCAPTCHA
        </span>
      </button>
    </div>
  );
}

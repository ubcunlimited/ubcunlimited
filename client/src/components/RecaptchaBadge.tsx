/**
 * RecaptchaBadge — Custom reCAPTCHA v3 disclosure slide-out
 *
 * Matches terminalbroker.com implementation:
 * - Blue vertical "reCAPTCHA" tab anchored to bottom-left
 * - Hover to slide the disclosure panel out to the right
 * - Native .grecaptcha-badge is hidden via CSS in index.css
 *
 * Only renders on production domains (ubcunlimited.com) and
 * Manus preview domains (*.manus.space, *.manus.computer) for testing.
 *
 * data-a11y-ui="true" ensures this element is excluded from
 * AccessibilityPanel's high-contrast and filter overrides.
 */

import { useState } from "react";

const PRODUCTION_HOSTS = [
  "ubcunlimited.com",
  "www.ubcunlimited.com",
];

function isAllowedHost(): boolean {
  const host = window.location.hostname;
  return (
    PRODUCTION_HOSTS.includes(host) ||
    host.endsWith(".manus.space") ||
    host.endsWith(".manus.computer") ||
    host === "localhost"
  );
}

export default function RecaptchaBadge() {
  const [open, setOpen] = useState(false);

  if (!isAllowedHost()) return null;

  return (
    <div
      data-a11y-ui="true"
      style={{
        position: "fixed",
        bottom: "14px",
        left: 0,
        zIndex: 9999,
        display: "flex",
        alignItems: "flex-end",
      }}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      {/* Disclosure panel — slides out to the right */}
      <div
        style={{
          width: "218px",
          background: "#f9f9f9",
          border: "1px solid #d3d3d3",
          borderRadius: "2px",
          padding: "10px 12px",
          fontSize: "11px",
          color: "#555",
          lineHeight: "1.4",
          transform: open ? "translateX(0)" : "translateX(-218px)",
          transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
          flexShrink: 0,
        }}
      >
        {/* reCAPTCHA logo row */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
          {/* Shield icon matching Google reCAPTCHA brand */}
          <svg width="32" height="32" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M32 4L8 14v18c0 14.5 10.2 28 24 32 13.8-4 24-17.5 24-32V14L32 4z" fill="#4A90D9"/>
            <path d="M32 4L8 14v18c0 14.5 10.2 28 24 32V4z" fill="#2C6DB5"/>
            <path d="M20 30l8 8 16-16" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <div>
            <div style={{ fontWeight: 700, fontSize: "12px", color: "#333" }}>reCAPTCHA</div>
            <div style={{ fontSize: "10px", color: "#777" }}>protected by Google</div>
          </div>
        </div>
        <div style={{ fontSize: "10px", color: "#888", lineHeight: "1.5" }}>
          <a
            href="https://policies.google.com/privacy"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#4A90D9", textDecoration: "none" }}
          >
            Privacy Policy
          </a>
          {" - "}
          <a
            href="https://policies.google.com/terms"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#4A90D9", textDecoration: "none" }}
          >
            Terms of Service
          </a>
        </div>
      </div>

      {/* Vertical tab — always visible */}
      <div
        style={{
          writingMode: "vertical-rl",
          textOrientation: "mixed",
          transform: "rotate(180deg)",
          background: "#4A90D9",
          color: "white",
          fontSize: "11px",
          fontWeight: 600,
          padding: "8px 5px",
          borderRadius: "0 2px 2px 0",
          cursor: "default",
          userSelect: "none",
          letterSpacing: "0.5px",
          flexShrink: 0,
        }}
      >
        reCAPTCHA
      </div>
    </div>
  );
}

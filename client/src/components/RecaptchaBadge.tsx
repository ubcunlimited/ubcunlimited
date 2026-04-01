import { useState, useRef } from "react";

/**
 * RecaptchaBadge — custom reCAPTCHA v3 disclosure badge
 *
 * Geometry (matches terminalbroker.com reference implementation):
 *   - Total width  : PANEL_W + TAB_W = 218 + 28 = 246px
 *   - Height       : 60px (panel and tab share the same height via align-items: stretch)
 *   - Collapsed    : left = -PANEL_W  →  only the 28px tab button peeks out from the left edge
 *   - Expanded     : left = 0         →  full panel visible
 *   - Animation    : transition on `left` property (avoids conflict with ADA CSS transforms)
 */

const PANEL_W = 218;
const TAB_W   = 28;
const HEIGHT  = 60;

export default function RecaptchaBadge() {
  const [open, setOpen] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const show = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setOpen(true);
  };

  const hide = () => {
    timerRef.current = setTimeout(() => setOpen(false), 300);
  };

  const leftPx = open ? 0 : -PANEL_W;

  return (
    <div
      data-a11y-ui="true"
      className="recaptcha-custom-badge"
      aria-label="reCAPTCHA protection disclosure"
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocusCapture={show}
      onBlurCapture={hide}
      style={{
        position: "fixed",
        bottom: "14px",
        left: `${leftPx}px`,
        zIndex: 9999,
        display: "flex",
        alignItems: "stretch",
        height: `${HEIGHT}px`,
        transition: "left 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        filter: "drop-shadow(2px 2px 6px rgba(0,0,0,0.28))",
        color: "#333",
        backgroundColor: "transparent",
      }}
    >
      <div
        style={{
          width: `${PANEL_W}px`,
          background: "#fff",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "0 12px",
          borderRadius: "0 4px 0 0",
          borderTop: "1px solid #e0e0e0",
          borderRight: "1px solid #e0e0e0",
          flexShrink: 0,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "3px" }}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 64 64"
            width="22"
            height="22"
            aria-hidden="true"
            style={{ flexShrink: 0 }}
          >
            <path
              d="M32 2L6 14v18c0 16.6 11.1 32.1 26 36 14.9-3.9 26-19.4 26-36V14L32 2z"
              fill="#4A90D9"
            />
            <path
              d="M32 10L12 20v12c0 11.6 7.8 22.5 20 25.8C44.2 54.5 52 43.6 52 32V20L32 10z"
              fill="#fff"
              opacity="0.25"
            />
            <text
              x="32"
              y="40"
              textAnchor="middle"
              fontSize="22"
              fontWeight="bold"
              fill="#fff"
              fontFamily="Arial, sans-serif"
            >
              rC
            </text>
          </svg>
          <div>
            <div style={{ fontSize: "9px", color: "#757575", lineHeight: 1.2 }}>protected by</div>
            <div style={{ fontSize: "11px", fontWeight: 700, color: "#333", lineHeight: 1.2 }}>reCAPTCHA</div>
          </div>
        </div>
        <div style={{ fontSize: "9px", color: "#757575", lineHeight: 1.4 }}>
          <a
            href="https://policies.google.com/privacy"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#1a73e8", textDecoration: "none" }}
          >
            Privacy
          </a>
          {" - "}
          <a
            href="https://policies.google.com/terms"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#1a73e8", textDecoration: "none" }}
          >
            Terms
          </a>
        </div>
      </div>

      <button
        aria-label="Toggle reCAPTCHA disclosure"
        onClick={() => setOpen(v => !v)}
        style={{
          width: `${TAB_W}px`,
          flexShrink: 0,
          background: "#1a73e8",
          border: "none",
          borderRadius: "0 4px 4px 0",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 0,
        }}
      >
        <span
          style={{
            writingMode: "vertical-rl",
            textOrientation: "mixed",
            transform: "rotate(180deg)",
            fontSize: "8px",
            fontWeight: 700,
            letterSpacing: "0.06em",
            color: "#fff",
            userSelect: "none",
            whiteSpace: "nowrap",
            fontFamily: "Arial, sans-serif",
          }}
        >
          reCAPTCHA
        </span>
      </button>
    </div>
  );
}

import { useState, useRef } from "react";

const PANEL_WIDTH = 256;
const TAB_WIDTH   = 20;

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

  const translateX = open ? 0 : -(PANEL_WIDTH - TAB_WIDTH);

  return (
    <div
      data-a11y-ui="true"
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocusCapture={show}
      onBlurCapture={hide}
      style={{
        position: "fixed",
        bottom: "14px",
        left: "0",
        zIndex: 9999,
        display: "flex",
        alignItems: "flex-end",
        transform: `translateX(${translateX}px)`,
        transition: "transform 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
        willChange: "transform",
        color: "#4a4a4a",
        backgroundColor: "transparent",
        filter: "none",
      }}
      aria-label="reCAPTCHA disclosure"
      role="complementary"
    >
      <div
        style={{
          width: `${PANEL_WIDTH}px`,
          backgroundColor: "#f9f9f9",
          border: "1px solid #d3d3d3",
          borderRadius: "0 4px 4px 0",
          padding: "10px 12px",
          boxShadow: "2px 2px 6px rgba(0,0,0,0.15)",
          fontSize: "10px",
          lineHeight: "1.5",
          color: "#4a4a4a",
          flexShrink: 0,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", marginBottom: "6px", gap: "6px" }}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="28" height="28" aria-hidden="true" style={{ flexShrink: 0 }}>
            <circle cx="32" cy="32" r="32" fill="#4A90D9" />
            <path d="M32 14a18 18 0 1 0 18 18A18 18 0 0 0 32 14zm0 4a14 14 0 1 1-14 14A14 14 0 0 1 32 18z" fill="#fff" />
            <path d="M32 22a10 10 0 1 0 10 10A10 10 0 0 0 32 22z" fill="#4A90D9" />
            <path d="M32 26a6 6 0 1 1-6 6 6 6 0 0 1 6-6z" fill="#fff" />
          </svg>
          <span style={{ fontWeight: 700, fontSize: "11px", color: "#333" }}>reCAPTCHA</span>
        </div>
        <p style={{ margin: 0, color: "#555" }}>
          This site is protected by reCAPTCHA and the Google{" "}
          <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" style={{ color: "#1a73e8", textDecoration: "underline" }}>Privacy Policy</a>{" "}
          and{" "}
          <a href="https://policies.google.com/terms" target="_blank" rel="noopener noreferrer" style={{ color: "#1a73e8", textDecoration: "underline" }}>Terms of Service</a>{" "}
          apply.
        </p>
      </div>
      <div
        aria-hidden="true"
        style={{
          width: `${TAB_WIDTH}px`,
          height: "80px",
          backgroundColor: "#4A90D9",
          borderRadius: "0 4px 4px 0",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          flexShrink: 0,
          boxShadow: "2px 2px 6px rgba(0,0,0,0.2)",
        }}
      >
        <span
          style={{
            writingMode: "vertical-rl",
            textOrientation: "mixed",
            transform: "rotate(180deg)",
            fontSize: "9px",
            fontWeight: 700,
            letterSpacing: "0.05em",
            color: "#fff",
            userSelect: "none",
            whiteSpace: "nowrap",
          }}
        >
          reCAPTCHA
        </span>
      </div>
    </div>
  );
}

/**
 * AccessibilityPanel — Comprehensive WCAG-aligned accessibility controls
 * Categories: Vision | Color & Contrast | Motor & Navigation | Cognitive & Reading
 * All settings persist to localStorage and apply via injected <style> on <html>.
 *
 * ADA Compliance Notes:
 * - data-a11y-ui="true" on the panel root AND the FloatingLauncher buttons ensures
 *   those elements are EXCLUDED from every high-contrast and filter override.
 * - High contrast rules target `html` (for background) AND `body :not([data-a11y-ui]):not([data-a11y-ui] *)`
 *   (for all page content), while explicitly re-asserting the panel's own colors.
 * - Grayscale/invert/colorblind filters target `body` only, with
 *   `[data-a11y-ui], [data-a11y-ui] *` re-excluded so the panel and launcher
 *   remain fully visible in all modes.
 */

import { useState, useEffect, useCallback, useRef } from "react";
import {
  Accessibility, X, ZoomIn, ZoomOut, Sun, Moon, Type, Wind,
  Eye, RotateCcw, MousePointer2, BookOpen, Contrast,
  Minus, AlignJustify, Underline, ChevronDown, ChevronUp,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// ── State shape ────────────────────────────────────────────────────────────────
interface A11yState {
  // Vision
  fontSize: number;          // 0.8 – 1.6 (multiplier)
  lineHeight: number;        // 1 – 2 (multiplier, applied as em)
  letterSpacing: number;     // 0 – 4 px extra
  // Color & Contrast
  highContrast: "off" | "dark" | "light" | "yellow";
  grayscale: boolean;
  invertColors: boolean;
  colorBlind: "off" | "protanopia" | "deuteranopia" | "tritanopia";
  // Motor & Navigation
  focusHighlight: boolean;
  largeCursor: boolean;
  highlightLinks: boolean;
  highlightHeadings: boolean;
  // Cognitive & Reading
  dyslexiaFont: boolean;
  reduceMotion: boolean;
  readingGuide: boolean;     // horizontal line follows cursor
  readingMask: boolean;      // dim everything except hovered paragraph
}

const DEFAULT_STATE: A11yState = {
  fontSize: 1,
  lineHeight: 1,
  letterSpacing: 0,
  highContrast: "off",
  grayscale: false,
  invertColors: false,
  colorBlind: "off",
  focusHighlight: false,
  largeCursor: false,
  highlightLinks: false,
  highlightHeadings: false,
  dyslexiaFont: false,
  reduceMotion: false,
  readingGuide: false,
  readingMask: false,
};

const STORAGE_KEY = "ubc_a11y_v2";
const STYLE_ID = "ubc-a11y-styles";
const FONT_LINK_ID = "ubc-a11y-font";

// ── CSS builder ────────────────────────────────────────────────────────────────
// IMPORTANT: [data-a11y-ui] and [data-a11y-ui] * are ALWAYS excluded from
// high-contrast and filter overrides. This keeps the accessibility panel,
// FloatingLauncher buttons, and reCAPTCHA badge readable in every mode.
function buildCSS(s: A11yState): string {
  const rules: string[] = [];

  // ── Vision ──────────────────────────────────────────────────────────────────
  if (s.fontSize !== 1) {
    rules.push(`html { font-size: ${Math.round(s.fontSize * 100)}% !important; }`);
  }
  if (s.lineHeight !== 1) {
    const lh = (1.4 + (s.lineHeight - 1) * 0.6).toFixed(2);
    rules.push(`body :not([data-a11y-ui]):not([data-a11y-ui] *) { line-height: ${lh} !important; }`);
  }
  if (s.letterSpacing > 0) {
    rules.push(`body :not([data-a11y-ui]):not([data-a11y-ui] *) { letter-spacing: ${s.letterSpacing}px !important; }`);
  }

  // ── Color & Contrast ────────────────────────────────────────────────────────
  // Strategy:
  //   1. Set html background so the page chrome (scrollbar gutters etc.) matches.
  //   2. Override all non-a11y-ui elements in the body.
  //   3. Explicitly restore the a11y panel's own colors so it is always readable.
  if (s.highContrast === "dark") {
    rules.push(`
/* Dark High Contrast — page */
html { background-color: #000 !important; }
body :not([data-a11y-ui]):not([data-a11y-ui] *) {
  background-color: #000 !important;
  color: #fff !important;
  border-color: #555 !important;
}
body :not([data-a11y-ui]):not([data-a11y-ui] *) a,
body :not([data-a11y-ui]):not([data-a11y-ui] *) button,
body :not([data-a11y-ui]):not([data-a11y-ui] *) [role="button"] {
  color: #ffff00 !important;
}
body :not([data-a11y-ui]):not([data-a11y-ui] *) img {
  filter: contrast(1.3) brightness(0.9) !important;
}
/* Restore a11y UI — always dark panel with white text */
[data-a11y-ui] {
  background-color: initial !important;
  color: initial !important;
  border-color: initial !important;
}
[data-a11y-ui] * {
  background-color: initial !important;
  color: initial !important;
  border-color: initial !important;
}
    `);
  } else if (s.highContrast === "light") {
    rules.push(`
/* Light High Contrast — page */
html { background-color: #fff !important; }
body :not([data-a11y-ui]):not([data-a11y-ui] *) {
  background-color: #fff !important;
  color: #000 !important;
  border-color: #333 !important;
}
body :not([data-a11y-ui]):not([data-a11y-ui] *) a,
body :not([data-a11y-ui]):not([data-a11y-ui] *) button,
body :not([data-a11y-ui]):not([data-a11y-ui] *) [role="button"] {
  color: #00008b !important;
}
/* Restore a11y UI */
[data-a11y-ui] {
  background-color: initial !important;
  color: initial !important;
  border-color: initial !important;
}
[data-a11y-ui] * {
  background-color: initial !important;
  color: initial !important;
  border-color: initial !important;
}
    `);
  } else if (s.highContrast === "yellow") {
    rules.push(`
/* Yellow-on-Black High Contrast — page */
html { background-color: #000 !important; }
body :not([data-a11y-ui]):not([data-a11y-ui] *) {
  background-color: #000 !important;
  color: #ffff00 !important;
  border-color: #ffff00 !important;
}
body :not([data-a11y-ui]):not([data-a11y-ui] *) a,
body :not([data-a11y-ui]):not([data-a11y-ui] *) button,
body :not([data-a11y-ui]):not([data-a11y-ui] *) [role="button"] {
  color: #00ffff !important;
}
body :not([data-a11y-ui]):not([data-a11y-ui] *) img {
  filter: contrast(1.2) !important;
}
/* Restore a11y UI */
[data-a11y-ui] {
  background-color: initial !important;
  color: initial !important;
  border-color: initial !important;
}
[data-a11y-ui] * {
  background-color: initial !important;
  color: initial !important;
  border-color: initial !important;
}
    `);
  }

  // ── Grayscale / Invert / Color-blind filters ─────────────────────────────────
  // Applied to body (not html) so [data-a11y-ui] elements can be re-excluded.
  // Both [data-a11y-ui] AND [data-a11y-ui] * need filter:none so children are
  // also excluded (CSS filter is inherited through stacking contexts).
  if (s.grayscale && s.invertColors) {
    rules.push(`
body { filter: grayscale(1) invert(1) !important; }
[data-a11y-ui], [data-a11y-ui] * { filter: none !important; }
    `);
  } else if (s.grayscale) {
    rules.push(`
body { filter: grayscale(1) !important; }
[data-a11y-ui], [data-a11y-ui] * { filter: none !important; }
    `);
  } else if (s.invertColors) {
    rules.push(`
body { filter: invert(1) hue-rotate(180deg) !important; }
[data-a11y-ui], [data-a11y-ui] * { filter: none !important; }
    `);
  }

  // Color blind SVG filters — exclude a11y UI
  if (s.colorBlind !== "off") {
    rules.push(`
body { filter: url(#ubc-a11y-cb-${s.colorBlind}) !important; }
[data-a11y-ui], [data-a11y-ui] * { filter: none !important; }
    `);
  }

  // ── Motor & Navigation ───────────────────────────────────────────────────────
  if (s.focusHighlight) {
    rules.push(`
*:focus, *:focus-visible {
  outline: 3px solid #0057B8 !important;
  outline-offset: 3px !important;
  box-shadow: 0 0 0 6px rgba(0,87,184,0.25) !important;
}
    `);
  }
  if (s.largeCursor) {
    rules.push(`
*, *::before, *::after {
  cursor: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 32 32'%3E%3Cpath d='M8 4l16 12-7 1 4 9-3 1-4-9-6 5z' fill='black' stroke='white' stroke-width='1.5'/%3E%3C/svg%3E") 0 0, auto !important;
}
    `);
  }
  if (s.highlightLinks) {
    rules.push(`
a:not([data-a11y-ui] a) {
  background-color: rgba(255,255,0,0.25) !important;
  text-decoration: underline !important;
  text-underline-offset: 3px !important;
}
    `);
  }
  if (s.highlightHeadings) {
    rules.push(`
h1:not([data-a11y-ui] h1),
h2:not([data-a11y-ui] h2),
h3:not([data-a11y-ui] h3),
h4:not([data-a11y-ui] h4),
h5:not([data-a11y-ui] h5),
h6:not([data-a11y-ui] h6) {
  border-left: 4px solid #0057B8 !important;
  padding-left: 0.5em !important;
}
    `);
  }

  // ── Cognitive & Reading ──────────────────────────────────────────────────────
  if (s.dyslexiaFont) {
    rules.push(`
body :not([data-a11y-ui]):not([data-a11y-ui] *) {
  font-family: 'Lexend', 'Comic Sans MS', cursive !important;
  word-spacing: 0.12em !important;
}
    `);
  }
  if (s.reduceMotion) {
    rules.push(`
*, *::before, *::after {
  animation-duration: 0.001ms !important;
  animation-iteration-count: 1 !important;
  transition-duration: 0.001ms !important;
  scroll-behavior: auto !important;
}
    `);
  }
  // readingGuide and readingMask are handled by JS event listeners, not CSS

  return rules.join("\n");
}

// ── SVG color-blind filter definitions ────────────────────────────────────────
const COLOR_BLIND_SVG = `
<svg xmlns="http://www.w3.org/2000/svg" style="position:absolute;width:0;height:0">
  <defs>
    <filter id="ubc-a11y-cb-protanopia">
      <feColorMatrix type="matrix" values="0.567,0.433,0,0,0 0.558,0.442,0,0,0 0,0.242,0.758,0,0 0,0,0,1,0"/>
    </filter>
    <filter id="ubc-a11y-cb-deuteranopia">
      <feColorMatrix type="matrix" values="0.625,0.375,0,0,0 0.7,0.3,0,0,0 0,0.3,0.7,0,0 0,0,0,1,0"/>
    </filter>
    <filter id="ubc-a11y-cb-tritanopia">
      <feColorMatrix type="matrix" values="0.95,0.05,0,0,0 0,0.433,0.567,0,0 0,0.475,0.525,0,0 0,0,0,1,0"/>
    </filter>
  </defs>
</svg>`;

function ensureColorBlindSVG() {
  if (!document.getElementById("ubc-a11y-cb-svg")) {
    const div = document.createElement("div");
    div.id = "ubc-a11y-cb-svg";
    div.innerHTML = COLOR_BLIND_SVG;
    document.body.insertBefore(div, document.body.firstChild);
  }
}

// ── Apply styles ───────────────────────────────────────────────────────────────
function applyStyles(s: A11yState) {
  let styleEl = document.getElementById(STYLE_ID) as HTMLStyleElement | null;
  if (!styleEl) {
    styleEl = document.createElement("style");
    styleEl.id = STYLE_ID;
    document.head.appendChild(styleEl);
  }
  styleEl.textContent = buildCSS(s);

  // Dyslexia font
  if (s.dyslexiaFont && !document.getElementById(FONT_LINK_ID)) {
    const link = document.createElement("link");
    link.id = FONT_LINK_ID;
    link.rel = "stylesheet";
    link.href = "https://fonts.googleapis.com/css2?family=Lexend:wght@300;400;500;600;700&display=swap";
    document.head.appendChild(link);
  }

  // Color blind SVG filters
  if (s.colorBlind !== "off") ensureColorBlindSVG();
}

// ── Persist ────────────────────────────────────────────────────────────────────
function loadState(): A11yState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return { ...DEFAULT_STATE, ...JSON.parse(raw) };
  } catch { /* ignore */ }
  return { ...DEFAULT_STATE };
}
function saveState(s: A11yState) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(s));
}

// ── Sub-components ─────────────────────────────────────────────────────────────
interface ToggleRowProps {
  icon: React.ReactNode;
  label: string;
  description: string;
  active: boolean;
  onToggle: () => void;
}
function ToggleRow({ icon, label, description, active, onToggle }: ToggleRowProps) {
  return (
    <button
      role="switch"
      aria-checked={active}
      onClick={onToggle}
      className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl border transition-all text-left ${active ? "bg-[#0057B8]/15 border-[#0057B8]/50 text-white" : "bg-white/3 border-white/8 text-white/60 hover:border-white/20 hover:text-white/80"}`}
    >
      <span className={`shrink-0 ${active ? "text-[#4da6ff]" : "text-white/40"}`}>{icon}</span>
      <div className="flex-1 min-w-0">
        <div className="text-xs font-medium leading-tight">{label}</div>
        <div className="text-[10px] text-white/35 mt-0.5 leading-tight">{description}</div>
      </div>
      <div className={`w-8 h-4 rounded-full transition-colors shrink-0 ${active ? "bg-[#0057B8]" : "bg-white/15"}`}>
        <div className={`w-3 h-3 rounded-full bg-white shadow-sm transition-transform mt-0.5 ${active ? "translate-x-4 ml-0.5" : "translate-x-0.5"}`} />
      </div>
    </button>
  );
}

interface SectionProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  defaultOpen?: boolean;
}
function Section({ title, icon, children, defaultOpen = true }: SectionProps) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border border-white/8 rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between px-3 py-2.5 bg-white/4 hover:bg-white/7 transition-colors"
        aria-expanded={open}
      >
        <div className="flex items-center gap-2 text-white/70">
          <span className="text-[#4da6ff]">{icon}</span>
          <span className="text-xs font-semibold uppercase tracking-wider">{title}</span>
        </div>
        {open ? <ChevronUp size={12} className="text-white/40" /> : <ChevronDown size={12} className="text-white/40" />}
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="overflow-hidden"
          >
            <div className="p-2.5 space-y-1.5">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Main component ─────────────────────────────────────────────────────────────
interface AccessibilityPanelProps {
  onClose: () => void;
  bottomClass: string;
  bottomPx?: number;
}

export default function AccessibilityPanel({ onClose, bottomClass, bottomPx }: AccessibilityPanelProps) {
  const [state, setState] = useState<A11yState>(DEFAULT_STATE);
  const readingGuideRef = useRef<HTMLDivElement | null>(null);
  const readingMaskRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const loaded = loadState();
    setState(loaded);
    applyStyles(loaded);
  }, []);

  // Reading guide — horizontal line follows cursor
  useEffect(() => {
    if (!state.readingGuide) {
      readingGuideRef.current?.remove();
      readingGuideRef.current = null;
      return;
    }
    if (!readingGuideRef.current) {
      const el = document.createElement("div");
      el.id = "ubc-reading-guide";
      el.setAttribute("data-a11y-ui", "true");
      el.style.cssText = "position:fixed;left:0;right:0;height:2px;background:rgba(0,87,184,0.5);pointer-events:none;z-index:99999;top:50%;transition:top 0.05s linear;";
      document.body.appendChild(el);
      readingGuideRef.current = el;
    }
    const move = (e: MouseEvent) => {
      if (readingGuideRef.current) readingGuideRef.current.style.top = `${e.clientY}px`;
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [state.readingGuide]);

  // Reading mask — dim page except hovered paragraph
  useEffect(() => {
    if (!state.readingMask) {
      readingMaskRef.current?.remove();
      readingMaskRef.current = null;
      return;
    }
    if (!readingMaskRef.current) {
      const el = document.createElement("div");
      el.id = "ubc-reading-mask";
      el.setAttribute("data-a11y-ui", "true");
      el.style.cssText = "position:fixed;inset:0;pointer-events:none;z-index:99998;";
      document.body.appendChild(el);
      readingMaskRef.current = el;
    }
    let styleEl = document.getElementById("ubc-reading-mask-style") as HTMLStyleElement | null;
    if (!styleEl) {
      styleEl = document.createElement("style");
      styleEl.id = "ubc-reading-mask-style";
      styleEl.textContent = `
        body.ubc-mask-active p:not(:hover),
        body.ubc-mask-active li:not(:hover) {
          opacity: 0.25 !important;
          transition: opacity 0.15s !important;
        }
      `;
      document.head.appendChild(styleEl);
    }
    document.body.classList.add("ubc-mask-active");
    return () => document.body.classList.remove("ubc-mask-active");
  }, [state.readingMask]);

  const update = useCallback((patch: Partial<A11yState>) => {
    setState((prev) => {
      const next = { ...prev, ...patch };
      saveState(next);
      applyStyles(next);
      return next;
    });
  }, []);

  const reset = useCallback(() => {
    saveState(DEFAULT_STATE);
    applyStyles(DEFAULT_STATE);
    setState({ ...DEFAULT_STATE });
    // Clean up DOM elements
    document.getElementById("ubc-reading-guide")?.remove();
    document.getElementById("ubc-reading-mask")?.remove();
    document.getElementById("ubc-reading-mask-style")?.remove();
    document.body.classList.remove("ubc-mask-active");
    readingGuideRef.current = null;
    readingMaskRef.current = null;
  }, []);

  const isModified = JSON.stringify(state) !== JSON.stringify(DEFAULT_STATE);
  const fontPct = Math.round(state.fontSize * 100);

  const contrastOptions: { value: A11yState["highContrast"]; label: string; color: string; textColor: string }[] = [
    { value: "off",    label: "Default",         color: "bg-[#1a1a1a] border-white/20",   textColor: "text-white" },
    { value: "dark",   label: "Dark HC",          color: "bg-black border-white/60",       textColor: "text-white" },
    { value: "light",  label: "Light HC",         color: "bg-white border-black/40",       textColor: "text-black" },
    { value: "yellow", label: "Yellow on Black",  color: "bg-yellow-400 border-yellow-600", textColor: "text-black" },
  ];

  const cbOptions: { value: A11yState["colorBlind"]; label: string }[] = [
    { value: "off",          label: "None" },
    { value: "protanopia",   label: "Protanopia (red-blind)" },
    { value: "deuteranopia", label: "Deuteranopia (green-blind)" },
    { value: "tritanopia",   label: "Tritanopia (blue-blind)" },
  ];

  return (
    <motion.div
      role="dialog"
      aria-modal="false"
      aria-label="Accessibility options"
      initial={{ opacity: 0, scale: 0.92, y: 8 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.92, y: 8 }}
      transition={{ type: "spring", stiffness: 320, damping: 28 }}
      data-a11y-ui="true"
      className="fixed right-6 z-[49] w-80 rounded-2xl shadow-2xl shadow-black/60 flex flex-col"
      style={{
        bottom: bottomPx !== undefined ? `${bottomPx}px` : undefined,
        maxHeight: "80vh",
        // Explicit inline styles guarantee these are never overridden by high-contrast CSS
        backgroundColor: "#111111",
        border: "1px solid rgba(0,87,184,0.4)",
        color: "#ffffff",
      }}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between px-4 py-3 border-b rounded-t-2xl shrink-0"
        style={{ backgroundColor: "#0d0d0d", borderColor: "rgba(255,255,255,0.08)" }}
      >
        <div className="flex items-center gap-2">
          <Accessibility size={16} style={{ color: "#4da6ff" }} aria-hidden="true" />
          <span style={{ color: "#ffffff" }} className="font-semibold text-sm">Accessibility</span>
          {isModified && <span className="w-2 h-2 rounded-full" style={{ backgroundColor: "#4da6ff" }} aria-label="Settings active" />}
        </div>
        <button
          onClick={onClose}
          aria-label="Close accessibility panel"
          className="p-1.5 rounded-lg transition-colors hover:bg-white/10"
          style={{ color: "rgba(255,255,255,0.4)" }}
        >
          <X size={14} aria-hidden="true" />
        </button>
      </div>

      {/* Scrollable controls */}
      <div
        className="overflow-y-auto flex-1 p-3 space-y-2.5"
        style={{ scrollbarWidth: "thin", scrollbarColor: "#333 transparent" }}
      >

        {/* ── Vision ── */}
        <Section title="Vision" icon={<Eye size={13} />}>
          {/* Font size */}
          <div>
            <p className="text-white/40 text-[10px] font-medium mb-1.5">Text Size — {fontPct}%</p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => update({ fontSize: Math.max(0.8, +(state.fontSize - 0.1).toFixed(1)) })}
                disabled={state.fontSize <= 0.8}
                aria-label="Decrease text size"
                className="flex-1 flex items-center justify-center gap-1 py-1.5 rounded-lg bg-white/5 border border-white/10 hover:border-[#0057B8]/50 disabled:opacity-30 disabled:cursor-not-allowed transition-all text-white text-xs"
              >
                <ZoomOut size={12} /> Smaller
              </button>
              <button
                onClick={() => update({ fontSize: 1 })}
                disabled={state.fontSize === 1}
                aria-label="Reset text size"
                className="px-2 py-1.5 rounded-lg bg-white/5 border border-white/10 hover:border-[#0057B8]/50 disabled:opacity-30 disabled:cursor-not-allowed transition-all text-white/40 text-xs"
              >
                Reset
              </button>
              <button
                onClick={() => update({ fontSize: Math.min(1.6, +(state.fontSize + 0.1).toFixed(1)) })}
                disabled={state.fontSize >= 1.6}
                aria-label="Increase text size"
                className="flex-1 flex items-center justify-center gap-1 py-1.5 rounded-lg bg-white/5 border border-white/10 hover:border-[#0057B8]/50 disabled:opacity-30 disabled:cursor-not-allowed transition-all text-white text-xs"
              >
                <ZoomIn size={12} /> Larger
              </button>
            </div>
          </div>

          {/* Line height */}
          <div>
            <p className="text-white/40 text-[10px] font-medium mb-1.5">Line Height — {state.lineHeight === 1 ? "Normal" : state.lineHeight === 1.5 ? "Relaxed" : "Spacious"}</p>
            <div className="flex gap-1.5">
              {[{ v: 1, label: "Normal" }, { v: 1.5, label: "Relaxed" }, { v: 2, label: "Spacious" }].map(({ v, label }) => (
                <button
                  key={v}
                  onClick={() => update({ lineHeight: v })}
                  aria-pressed={state.lineHeight === v}
                  className={`flex-1 py-1.5 rounded-lg text-xs border transition-all ${state.lineHeight === v ? "bg-[#0057B8]/20 border-[#0057B8]/50 text-white" : "bg-white/4 border-white/10 text-white/50 hover:border-white/25"}`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Letter spacing */}
          <div>
            <p className="text-white/40 text-[10px] font-medium mb-1.5">Letter Spacing — {state.letterSpacing === 0 ? "Normal" : `+${state.letterSpacing}px`}</p>
            <div className="flex gap-1.5">
              {[{ v: 0, label: "Normal" }, { v: 1, label: "+1px" }, { v: 2, label: "+2px" }, { v: 4, label: "+4px" }].map(({ v, label }) => (
                <button
                  key={v}
                  onClick={() => update({ letterSpacing: v })}
                  aria-pressed={state.letterSpacing === v}
                  className={`flex-1 py-1.5 rounded-lg text-xs border transition-all ${state.letterSpacing === v ? "bg-[#0057B8]/20 border-[#0057B8]/50 text-white" : "bg-white/4 border-white/10 text-white/50 hover:border-white/25"}`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </Section>

        {/* ── Color & Contrast ── */}
        <Section title="Color & Contrast" icon={<Contrast size={13} />}>
          {/* High contrast presets */}
          <div>
            <p className="text-white/40 text-[10px] font-medium mb-1.5">High Contrast Mode</p>
            <div className="grid grid-cols-2 gap-1.5">
              {contrastOptions.map(({ value, label, color, textColor }) => (
                <button
                  key={value}
                  onClick={() => update({ highContrast: value })}
                  aria-pressed={state.highContrast === value}
                  className={`py-1.5 px-2 rounded-lg text-xs border font-medium transition-all ${state.highContrast === value ? "ring-2 ring-[#4da6ff] ring-offset-1 ring-offset-[#111]" : "opacity-70 hover:opacity-100"} ${color} ${textColor}`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          <ToggleRow icon={<Minus size={13} />} label="Grayscale" description="Remove all color from the page" active={state.grayscale} onToggle={() => update({ grayscale: !state.grayscale })} />
          <ToggleRow icon={<Moon size={13} />} label="Invert Colors" description="Invert all page colors" active={state.invertColors} onToggle={() => update({ invertColors: !state.invertColors })} />

          {/* Color blind */}
          <div>
            <p className="text-white/40 text-[10px] font-medium mb-1.5">Color Blind Mode</p>
            <div className="space-y-1">
              {cbOptions.map(({ value, label }) => (
                <button
                  key={value}
                  onClick={() => update({ colorBlind: value })}
                  aria-pressed={state.colorBlind === value}
                  className={`w-full text-left px-3 py-1.5 rounded-lg text-xs border transition-all ${state.colorBlind === value ? "bg-[#0057B8]/20 border-[#0057B8]/50 text-white" : "bg-white/4 border-white/10 text-white/50 hover:border-white/25 hover:text-white/80"}`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </Section>

        {/* ── Motor & Navigation ── */}
        <Section title="Motor & Navigation" icon={<MousePointer2 size={13} />} defaultOpen={false}>
          <ToggleRow icon={<Eye size={13} />} label="Focus Indicators" description="Blue outline on focused elements" active={state.focusHighlight} onToggle={() => update({ focusHighlight: !state.focusHighlight })} />
          <ToggleRow icon={<MousePointer2 size={13} />} label="Large Cursor" description="Bigger mouse pointer for visibility" active={state.largeCursor} onToggle={() => update({ largeCursor: !state.largeCursor })} />
          <ToggleRow icon={<Underline size={13} />} label="Highlight Links" description="Yellow highlight on all links" active={state.highlightLinks} onToggle={() => update({ highlightLinks: !state.highlightLinks })} />
          <ToggleRow icon={<AlignJustify size={13} />} label="Highlight Headings" description="Blue left border on all headings" active={state.highlightHeadings} onToggle={() => update({ highlightHeadings: !state.highlightHeadings })} />
        </Section>

        {/* ── Cognitive & Reading ── */}
        <Section title="Cognitive & Reading" icon={<BookOpen size={13} />} defaultOpen={false}>
          <ToggleRow icon={<Type size={13} />} label="Dyslexia Font" description="Lexend — wider, more readable" active={state.dyslexiaFont} onToggle={() => update({ dyslexiaFont: !state.dyslexiaFont })} />
          <ToggleRow icon={<Wind size={13} />} label="Reduce Motion" description="Stops animations & transitions" active={state.reduceMotion} onToggle={() => update({ reduceMotion: !state.reduceMotion })} />
          <ToggleRow icon={<Sun size={13} />} label="Reading Guide" description="Horizontal line follows your cursor" active={state.readingGuide} onToggle={() => update({ readingGuide: !state.readingGuide })} />
          <ToggleRow icon={<BookOpen size={13} />} label="Reading Mask" description="Dims text except hovered paragraph" active={state.readingMask} onToggle={() => update({ readingMask: !state.readingMask })} />
        </Section>

        {/* Reset */}
        {isModified && (
          <button
            onClick={reset}
            className="w-full flex items-center justify-center gap-2 py-2 rounded-xl border border-white/15 hover:border-red-500/40 text-white/50 hover:text-red-400 text-xs font-medium transition-all hover:bg-red-500/5"
            aria-label="Reset all accessibility settings"
          >
            <RotateCcw size={12} aria-hidden="true" /> Reset all settings
          </button>
        )}
      </div>

      <div
        className="px-4 py-2.5 border-t shrink-0"
        style={{ borderColor: "rgba(255,255,255,0.08)" }}
      >
        <p className="text-[10px] text-center leading-relaxed" style={{ color: "rgba(255,255,255,0.25)" }}>
          Settings are saved in your browser and apply across all pages.
        </p>
      </div>
    </motion.div>
  );
}

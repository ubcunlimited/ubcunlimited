/**
 * AccessibilityPanel — Comprehensive WCAG-aligned accessibility controls
 * Categories: Vision | Color & Contrast | Motor & Navigation | Cognitive & Reading
 * All settings persist to localStorage and apply via injected <style> on <html>.
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
function buildCSS(s: A11yState): string {
  const rules: string[] = [];

  // Vision
  if (s.fontSize !== 1) rules.push(`html { font-size: ${Math.round(s.fontSize * 100)}% !important; }`);
  if (s.lineHeight !== 1) rules.push(`body, body * { line-height: ${(1.4 + (s.lineHeight - 1) * 0.6).toFixed(2)} !important; }`);
  if (s.letterSpacing > 0) rules.push(`body, body * { letter-spacing: ${s.letterSpacing}px !important; }`);

  // Color & Contrast
  if (s.highContrast === "dark") {
    rules.push(`
      body, body * { background-color: #000 !important; color: #fff !important; border-color: #555 !important; }
      a, button, [role="button"] { color: #ffff00 !important; }
      img { filter: contrast(1.3) brightness(0.9) !important; }
    `);
  } else if (s.highContrast === "light") {
    rules.push(`
      body, body * { background-color: #fff !important; color: #000 !important; border-color: #333 !important; }
      a, button, [role="button"] { color: #00008b !important; }
    `);
  } else if (s.highContrast === "yellow") {
    rules.push(`
      body, body * { background-color: #000 !important; color: #ffff00 !important; border-color: #ffff00 !important; }
      a, button, [role="button"] { color: #00ffff !important; }
      img { filter: contrast(1.2) !important; }
    `);
  }

  if (s.grayscale) rules.push(`html { filter: ${s.invertColors ? "grayscale(1) invert(1)" : "grayscale(1)"} !important; }`);
  else if (s.invertColors) rules.push(`html { filter: invert(1) hue-rotate(180deg) !important; }`);

  // Color blind SVG filters are injected separately; apply via class
  if (s.colorBlind !== "off") {
    rules.push(`html { filter: url(#ubc-a11y-cb-${s.colorBlind}) !important; }`);
  }

  // Motor & Navigation
  if (s.focusHighlight) {
    rules.push(`*:focus, *:focus-visible { outline: 3px solid #0057B8 !important; outline-offset: 3px !important; box-shadow: 0 0 0 6px rgba(0,87,184,0.25) !important; }`);
  }
  if (s.largeCursor) {
    rules.push(`*, *::before, *::after { cursor: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 32 32'%3E%3Cpath d='M8 4l16 12-7 1 4 9-3 1-4-9-6 5z' fill='black' stroke='white' stroke-width='1.5'/%3E%3C/svg%3E") 0 0, auto !important; }`);
  }
  if (s.highlightLinks) {
    rules.push(`a { background-color: rgba(255,255,0,0.25) !important; text-decoration: underline !important; text-underline-offset: 3px !important; }`);
  }
  if (s.highlightHeadings) {
    rules.push(`h1,h2,h3,h4,h5,h6 { border-left: 4px solid #0057B8 !important; padding-left: 0.5em !important; }`);
  }

  // Cognitive & Reading
  if (s.dyslexiaFont) {
    rules.push(`body, body * { font-family: 'Lexend', 'Comic Sans MS', cursive !important; word-spacing: 0.12em !important; }`);
  }
  if (s.reduceMotion) {
    rules.push(`*, *::before, *::after { animation-duration: 0.001ms !important; animation-iteration-count: 1 !important; transition-duration: 0.001ms !important; scroll-behavior: auto !important; }`);
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
  open: boolean;
  onToggle: () => void;
}
function Section({ title, icon, children, open, onToggle }: SectionProps) {
  return (
    <div className="border border-white/8 rounded-xl overflow-hidden">
      <button
        onClick={onToggle}
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

  // Derive which section has an active setting — used to auto-open on panel mount
  const getActiveSection = (s: A11yState): "vision" | "color" | "motor" | "cognitive" => {
    if (s.highContrast !== "off" || s.grayscale || s.invertColors || s.colorBlind !== "off") return "color";
    if (s.focusHighlight || s.largeCursor || s.highlightLinks || s.highlightHeadings) return "motor";
    if (s.dyslexiaFont || s.reduceMotion || s.readingGuide || s.readingMask) return "cognitive";
    if (s.fontSize !== 1 || s.lineHeight !== 1 || s.letterSpacing !== 0) return "vision";
    return "vision"; // default
  };

  // Accordion: only one section open at a time; auto-opens to active section on mount
  const [openSection, setOpenSection] = useState<"vision" | "color" | "motor" | "cognitive">("vision");
  const toggleSection = (s: "vision" | "color" | "motor" | "cognitive") =>
    setOpenSection(s);
  const readingGuideRef = useRef<HTMLDivElement | null>(null);
  const readingMaskRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const loaded = loadState();
    setState(loaded);
    applyStyles(loaded);
    // Auto-open the section that has an active setting
    setOpenSection(getActiveSection(loaded));
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

  // ── Exclusive activation helpers ─────────────────────────────────────────────
  // All boolean toggles are mutually exclusive — activating one turns off all others.
  // highContrast and colorBlind are also reset when a boolean toggle is activated.
  const BOOL_FIELDS = [
    "grayscale", "invertColors",
    "focusHighlight", "largeCursor", "highlightLinks", "highlightHeadings",
    "dyslexiaFont", "reduceMotion", "readingGuide", "readingMask",
  ] as const;

  const activate = useCallback((field: typeof BOOL_FIELDS[number]) => {
    setState((prev) => {
      const allOff: Partial<A11yState> = { highContrast: "off", colorBlind: "off" };
      BOOL_FIELDS.forEach((f) => { allOff[f] = false; });
      allOff[field] = true;
      const next = { ...prev, ...allOff };
      saveState(next);
      applyStyles(next);
      return next;
    });
  }, []);

  // highContrast radio: selecting any value deactivates all boolean toggles
  const setHighContrast = useCallback((value: A11yState["highContrast"]) => {
    setState((prev) => {
      const allOff: Partial<A11yState> = { colorBlind: "off", highContrast: value };
      BOOL_FIELDS.forEach((f) => { allOff[f] = false; });
      const next = { ...prev, ...allOff };
      saveState(next);
      applyStyles(next);
      return next;
    });
  }, []);

  // colorBlind radio: selecting any value deactivates all boolean toggles
  const setColorBlind = useCallback((value: A11yState["colorBlind"]) => {
    setState((prev) => {
      const allOff: Partial<A11yState> = { highContrast: "off", colorBlind: value };
      BOOL_FIELDS.forEach((f) => { allOff[f] = false; });
      const next = { ...prev, ...allOff };
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

  const contrastOptions: { value: A11yState["highContrast"]; label: string; color: string }[] = [
    { value: "off",    label: "Default",       color: "bg-white/10 border-white/20" },
    { value: "dark",   label: "Dark HC",        color: "bg-black border-white/40" },
    { value: "light",  label: "Light HC",       color: "bg-white border-black/30" },
    { value: "yellow", label: "Yellow on Black", color: "bg-yellow-400 border-yellow-600" },
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
      className="fixed right-6 z-[49] w-80 bg-[#111111] border border-[#0057B8]/40 rounded-2xl shadow-2xl shadow-black/60 flex flex-col"
      style={{ bottom: bottomPx !== undefined ? `${bottomPx}px` : undefined, maxHeight: "80vh" }}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/8 bg-[#0d0d0d] rounded-t-2xl shrink-0">
        <div className="flex items-center gap-2">
          <Accessibility size={16} className="text-[#4da6ff]" aria-hidden="true" />
          <span className="text-white font-semibold text-sm">Accessibility</span>
          {isModified && <span className="w-2 h-2 rounded-full bg-[#4da6ff]" aria-label="Settings active" />}
        </div>
        <button onClick={onClose} aria-label="Close accessibility panel" className="p-1.5 rounded-lg text-white/40 hover:text-white hover:bg-white/10 transition-colors">
          <X size={14} aria-hidden="true" />
        </button>
      </div>

      {/* Scrollable controls */}
      <div className="overflow-y-auto flex-1 p-3 space-y-2.5" style={{ scrollbarWidth: "thin", scrollbarColor: "#333 transparent" }}>

        {/* ── Vision ── */}
        <Section title="Vision" icon={<Eye size={13} />} open={openSection === "vision"} onToggle={() => toggleSection("vision")}>
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
        <Section title="Color & Contrast" icon={<Contrast size={13} />} open={openSection === "color"} onToggle={() => toggleSection("color")}>
          {/* High contrast presets */}
          <div>
            <p className="text-white/40 text-[10px] font-medium mb-1.5">High Contrast Mode</p>
            <div className="grid grid-cols-2 gap-1.5">
              {contrastOptions.map(({ value, label, color }) => (
                <button
                  key={value}
                  onClick={() => setHighContrast(value)}
                  aria-pressed={state.highContrast === value}
                  className={`py-1.5 px-2 rounded-lg text-xs border transition-all ${state.highContrast === value ? "ring-2 ring-[#0057B8] ring-offset-1 ring-offset-[#111]" : "opacity-70 hover:opacity-100"} ${color} ${value === "light" ? "text-black" : "text-white"}`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          <ToggleRow icon={<Minus size={13} />} label="Grayscale" description="Remove all color from the page" active={state.grayscale} onToggle={() => activate("grayscale")} />
          <ToggleRow icon={<Moon size={13} />} label="Invert Colors" description="Invert all page colors" active={state.invertColors} onToggle={() => activate("invertColors")} />

          {/* Color blind */}
          <div>
            <p className="text-white/40 text-[10px] font-medium mb-1.5">Color Blind Mode</p>
            <div className="space-y-1">
              {cbOptions.map(({ value, label }) => (
                <button
                  key={value}
                  onClick={() => setColorBlind(value)}
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
        <Section title="Motor & Navigation" icon={<MousePointer2 size={13} />} open={openSection === "motor"} onToggle={() => toggleSection("motor")}>
          <ToggleRow icon={<Eye size={13} />} label="Focus Indicators" description="Blue outline on focused elements" active={state.focusHighlight} onToggle={() => activate("focusHighlight")} />
          <ToggleRow icon={<MousePointer2 size={13} />} label="Large Cursor" description="Bigger mouse pointer for visibility" active={state.largeCursor} onToggle={() => activate("largeCursor")} />
          <ToggleRow icon={<Underline size={13} />} label="Highlight Links" description="Yellow highlight on all links" active={state.highlightLinks} onToggle={() => activate("highlightLinks")} />
          <ToggleRow icon={<AlignJustify size={13} />} label="Highlight Headings" description="Blue left border on all headings" active={state.highlightHeadings} onToggle={() => activate("highlightHeadings")} />
        </Section>

        {/* ── Cognitive & Reading ── */}
        <Section title="Cognitive & Reading" icon={<BookOpen size={13} />} open={openSection === "cognitive"} onToggle={() => toggleSection("cognitive")}>
          <ToggleRow icon={<Type size={13} />} label="Dyslexia Font" description="Lexend — wider, more readable" active={state.dyslexiaFont} onToggle={() => activate("dyslexiaFont")} />
          <ToggleRow icon={<Wind size={13} />} label="Reduce Motion" description="Stops animations & transitions" active={state.reduceMotion} onToggle={() => activate("reduceMotion")} />
          <ToggleRow icon={<Sun size={13} />} label="Reading Guide" description="Horizontal line follows your cursor" active={state.readingGuide} onToggle={() => activate("readingGuide")} />
          <ToggleRow icon={<BookOpen size={13} />} label="Reading Mask" description="Dims text except hovered paragraph" active={state.readingMask} onToggle={() => activate("readingMask")} />
        </Section>

      </div>

      {/* Footer: Reset to Default + info */}
      <div className="px-3 py-3 border-t border-white/8 shrink-0 space-y-2">
        <button
          onClick={reset}
          disabled={!isModified}
          className="w-full flex items-center justify-center gap-2 py-2 rounded-xl border transition-all text-xs font-semibold"
          style={{
            backgroundColor: isModified ? "rgba(220,38,38,0.08)" : "rgba(255,255,255,0.03)",
            borderColor: isModified ? "rgba(220,38,38,0.35)" : "rgba(255,255,255,0.10)",
            color: isModified ? "#f87171" : "rgba(255,255,255,0.25)",
            cursor: isModified ? "pointer" : "default",
          }}
          aria-label="Reset all accessibility settings to default"
        >
          <RotateCcw size={13} aria-hidden="true" />
          Reset to Default
        </button>
        <p className="text-white/25 text-[10px] text-center leading-relaxed">Settings are saved in your browser and apply across all pages.</p>
      </div>
    </motion.div>
  );
}

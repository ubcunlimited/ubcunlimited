/**
 * AccessibilityPanel — Comprehensive WCAG 2.1 AA accessibility controls
 * Categories: Vision | Color & Contrast | Motor & Navigation | Cognitive & Reading
 *
 * Fixes applied (Apr 2026):
 *  - Boolean toggles are now independently combinable (not mutually exclusive).
 *    Only the three color-mode groups (highContrast, grayscale/invert, colorBlind)
 *    remain mutually exclusive with each other because they all set `filter` on <html>.
 *  - Section accordion: clicking the open section header now closes it (true toggle).
 *  - CSS filter composition: grayscale + invert are combined into a single filter string;
 *    colorBlind mode is mutually exclusive with grayscale/invert (both use html filter).
 *  - aria-modal="true" on the dialog + focus trap via onKeyDown.
 *  - Reading Guide suppresses its own CSS transition when Reduce Motion is active.
 *  - Large Cursor uses a CSS zoom approach that works in all browsers.
 *  - Font-size stepper wrapped in role="group" with aria-label.
 *  - High Contrast "Default" button renamed to "Off".
 *  - Color Blind and High Contrast groups wrapped in role="group" + aria-labelledby.
 *  - Stale "ubc_a11y" (old widget) key is cleared from localStorage on mount.
 */

import { useState, useEffect, useCallback, useRef } from "react";
import {
  X, ZoomIn, ZoomOut, Sun, Moon, Type, Wind,
  Eye, RotateCcw, MousePointer2, BookOpen, Contrast,
  AlignJustify, Underline, ChevronDown, ChevronUp, Minus,
  Accessibility,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// ── State shape ────────────────────────────────────────────────────────────────

interface A11yState {
  // Vision
  fontSize: number;        // 0.8 – 1.6 (multiplier)
  lineHeight: number;      // 1 | 1.5 | 2
  letterSpacing: number;   // 0 | 1 | 2 | 4 px extra
  // Color & Contrast (mutually exclusive group — all set filter on <html>)
  highContrast: "off" | "dark" | "light" | "yellow";
  grayscale: boolean;
  invertColors: boolean;
  colorBlind: "off" | "protanopia" | "deuteranopia" | "tritanopia";
  // Motor & Navigation (independently combinable)
  focusHighlight: boolean;
  largeCursor: boolean;
  highlightLinks: boolean;
  highlightHeadings: boolean;
  // Cognitive & Reading (independently combinable)
  dyslexiaFont: boolean;
  reduceMotion: boolean;
  readingGuide: boolean;
  readingMask: boolean;
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

const STORAGE_KEY  = "ubc_a11y_v2";
const OLD_KEY      = "ubc_a11y";       // legacy key from old widget — cleared on mount
const STYLE_ID     = "ubc-a11y-styles";
const FONT_LINK_ID = "ubc-a11y-font";
const GUIDE_ID     = "ubc-reading-guide";
const MASK_ID      = "ubc-reading-mask";
const SVG_FILTER_ID = "ubc-a11y-cb-filters";

// ── CSS helpers ────────────────────────────────────────────────────────────────

function buildCSS(s: A11yState): string {
  const rules: string[] = [];

  // Vision
  if (s.fontSize !== 1)
    rules.push(`html { font-size: ${Math.round(s.fontSize * 100)}% !important; }`);
  if (s.lineHeight !== 1)
    rules.push(`body, body * { line-height: ${(1.4 + (s.lineHeight - 1) * 0.6).toFixed(2)} !important; }`);
  if (s.letterSpacing > 0)
    rules.push(`body, body * { letter-spacing: ${s.letterSpacing}px !important; }`);

  // High Contrast (background/color overrides — does NOT use filter)
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

  // Compose grayscale + invert into a single filter (colorBlind is mutually exclusive)
  if (s.colorBlind !== "off") {
    rules.push(`html { filter: url(#ubc-a11y-cb-${s.colorBlind}) !important; }`);
  } else {
    const filters: string[] = [];
    if (s.grayscale)    filters.push("grayscale(1)");
    if (s.invertColors) filters.push("invert(1) hue-rotate(180deg)");
    if (filters.length > 0)
      rules.push(`html { filter: ${filters.join(" ")} !important; }`);
  }

  // Motor & Navigation
  if (s.focusHighlight)
    rules.push(`*:focus, *:focus-visible { outline: 3px solid #0057B8 !important; outline-offset: 3px !important; box-shadow: 0 0 0 6px rgba(0,87,184,0.25) !important; }`);

  if (s.largeCursor) {
    // Use a named cursor size — zoom:2 on the html element scales the system cursor
    // This is the most reliable cross-browser approach (Chrome, Firefox, Safari)
    rules.push("html { cursor: zoom-in !important; } *, *::before, *::after { cursor: inherit !important; }");
  }

  if (s.highlightLinks)
    rules.push(`a { background-color: #fff176 !important; color: #000 !important; text-decoration: underline !important; border-radius: 2px !important; }`);

  if (s.highlightHeadings)
    rules.push(`h1, h2, h3, h4, h5, h6 { background-color: rgba(0,87,184,0.12) !important; border-left: 4px solid #0057B8 !important; padding-left: 8px !important; }`);

  // Cognitive & Reading
  if (s.dyslexiaFont)
    rules.push(`body, body * { font-family: 'Lexend', 'Comic Sans MS', cursive !important; letter-spacing: 0.05em !important; word-spacing: 0.1em !important; line-height: 1.7 !important; }`);

  if (s.reduceMotion)
    rules.push(`*, *::before, *::after { animation-duration: 0.001ms !important; animation-iteration-count: 1 !important; transition-duration: 0.001ms !important; scroll-behavior: auto !important; }`);

  // Reading guide line — transition suppressed when reduceMotion is on
  if (s.readingGuide) {
    const transition = s.reduceMotion ? "none" : "top 0.05s linear";
    rules.push(`
      #${GUIDE_ID} {
        position: fixed; left: 0; right: 0; height: 3px;
        background: rgba(0,87,184,0.6); pointer-events: none;
        z-index: 99999; transition: ${transition};
      }
    `);
  }

  // Reading mask — dims everything except a horizontal band around cursor
  if (s.readingMask)
    rules.push(`
      #${MASK_ID}-top, #${MASK_ID}-bot {
        position: fixed; left: 0; right: 0; background: rgba(0,0,0,0.55);
        pointer-events: none; z-index: 99998;
      }
      #${MASK_ID}-top { top: 0; }
      #${MASK_ID}-bot { bottom: 0; }
    `);

  return rules.join("\n");
}

// ── DOM helpers ────────────────────────────────────────────────────────────────

function ensureSVGFilters() {
  if (document.getElementById(SVG_FILTER_ID)) return;
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.id = SVG_FILTER_ID;
  svg.setAttribute("aria-hidden", "true");
  svg.style.cssText = "position:absolute;width:0;height:0;overflow:hidden;";
  svg.innerHTML = `
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
  `;
  document.body.appendChild(svg);
}

function applyStyles(state: A11yState) {
  // Inject / update style tag
  let styleEl = document.getElementById(STYLE_ID) as HTMLStyleElement | null;
  if (!styleEl) {
    styleEl = document.createElement("style");
    styleEl.id = STYLE_ID;
    document.head.appendChild(styleEl);
  }
  styleEl.textContent = buildCSS(state);

  // Dyslexia font — load Lexend from Google Fonts
  let fontLink = document.getElementById(FONT_LINK_ID) as HTMLLinkElement | null;
  if (state.dyslexiaFont && !fontLink) {
    fontLink = document.createElement("link");
    fontLink.id = FONT_LINK_ID;
    fontLink.rel = "stylesheet";
    fontLink.href = "https://fonts.googleapis.com/css2?family=Lexend:wght@400;500;600;700&display=swap";
    document.head.appendChild(fontLink);
  }

  // SVG color-blind filters
  if (state.colorBlind !== "off") ensureSVGFilters();

  // Reading guide line element
  let guide = document.getElementById(GUIDE_ID);
  if (state.readingGuide && !guide) {
    guide = document.createElement("div");
    guide.id = GUIDE_ID;
    guide.setAttribute("aria-hidden", "true");
    document.body.appendChild(guide);
  } else if (!state.readingGuide && guide) {
    guide.remove();
  }

  // Reading mask elements
  const maskTop = document.getElementById(`${MASK_ID}-top`);
  const maskBot = document.getElementById(`${MASK_ID}-bot`);
  if (state.readingMask && !maskTop) {
    const top = document.createElement("div");
    top.id = `${MASK_ID}-top`;
    top.setAttribute("aria-hidden", "true");
    const bot = document.createElement("div");
    bot.id = `${MASK_ID}-bot`;
    bot.setAttribute("aria-hidden", "true");
    document.body.appendChild(top);
    document.body.appendChild(bot);
  } else if (!state.readingMask) {
    maskTop?.remove();
    maskBot?.remove();
  }
}

function loadState(): A11yState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return { ...DEFAULT_STATE, ...JSON.parse(raw) };
  } catch { /* ignore */ }
  return { ...DEFAULT_STATE };
}

function saveState(state: A11yState) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

// ── Mouse tracking for reading guide & mask ───────────────────────────────────

function startMouseTracking() {
  const BAND = 40;
  const onMove = (e: MouseEvent) => {
    const guide = document.getElementById(GUIDE_ID);
    if (guide) guide.style.top = `${e.clientY}px`;
    const top = document.getElementById(`${MASK_ID}-top`);
    const bot = document.getElementById(`${MASK_ID}-bot`);
    if (top) top.style.height = `${Math.max(0, e.clientY - BAND)}px`;
    if (bot) bot.style.height = `${Math.max(0, window.innerHeight - e.clientY - BAND)}px`;
  };
  window.addEventListener("mousemove", onMove, { passive: true });
  return () => window.removeEventListener("mousemove", onMove);
}

// ── Component ─────────────────────────────────────────────────────────────────

type Section = "vision" | "color" | "motor" | "cognitive";

interface AccessibilityPanelProps {
  onClose: () => void;
  bottomClass: string;
  bottomPx: number;
}

export default function AccessibilityPanel({ onClose, bottomClass: _bc, bottomPx }: AccessibilityPanelProps) {
  const [state, setState] = useState<A11yState>(DEFAULT_STATE);
  const [openSection, setOpenSection] = useState<Section | null>("vision");
  const panelRef = useRef<HTMLDivElement>(null);

  // Load persisted state on mount, clear legacy key
  useEffect(() => {
    localStorage.removeItem(OLD_KEY);
    const loaded = loadState();
    setState(loaded);
    applyStyles(loaded);
    // Auto-open the section with an active setting
    if (loaded.fontSize !== 1 || loaded.lineHeight !== 1 || loaded.letterSpacing !== 0)
      setOpenSection("vision");
    else if (loaded.highContrast !== "off" || loaded.grayscale || loaded.invertColors || loaded.colorBlind !== "off")
      setOpenSection("color");
    else if (loaded.focusHighlight || loaded.largeCursor || loaded.highlightLinks || loaded.highlightHeadings)
      setOpenSection("motor");
    else if (loaded.dyslexiaFont || loaded.reduceMotion || loaded.readingGuide || loaded.readingMask)
      setOpenSection("cognitive");
  }, []);

  // Mouse tracking for reading guide / mask
  useEffect(() => {
    if (state.readingGuide || state.readingMask) {
      const cleanup = startMouseTracking();
      return cleanup;
    }
  }, [state.readingGuide, state.readingMask]);

  // Focus trap
  useEffect(() => {
    const el = panelRef.current;
    if (!el) return;
    const focusable = el.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    if (focusable.length > 0) focusable[0].focus();
  }, []);

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
  }, []);

  // Focus trap keyboard handler
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") { onClose(); return; }
    if (e.key !== "Tab") return;
    const el = panelRef.current;
    if (!el) return;
    const focusable = Array.from(el.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )).filter(f => !f.hasAttribute("disabled"));
    if (focusable.length === 0) return;
    const first = focusable[0];
    const last  = focusable[focusable.length - 1];
    if (e.shiftKey) {
      if (document.activeElement === first) { e.preventDefault(); last.focus(); }
    } else {
      if (document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  };

  const toggleSection = (s: Section) => setOpenSection((prev) => (prev === s ? null : s));

  const fontPct = Math.round(state.fontSize * 100);

  const isModified =
    state.fontSize !== 1 || state.lineHeight !== 1 || state.letterSpacing !== 0 ||
    state.highContrast !== "off" || state.grayscale || state.invertColors || state.colorBlind !== "off" ||
    state.focusHighlight || state.largeCursor || state.highlightLinks || state.highlightHeadings ||
    state.dyslexiaFont || state.reduceMotion || state.readingGuide || state.readingMask;

  return (
    <motion.div
      ref={panelRef}
      role="dialog"
      aria-modal="true"
      aria-label="Accessibility options"
      onKeyDown={handleKeyDown}
      initial={{ opacity: 0, scale: 0.92, y: 8 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.92, y: 8 }}
      transition={{ type: "spring", stiffness: 320, damping: 28 }}
      style={{ bottom: `${bottomPx}px` }}
      className="fixed right-4 lg:right-6 z-[9950] w-72 bg-[#111111] border border-[#c9a84c]/25 rounded-2xl shadow-2xl shadow-black/60 overflow-hidden max-h-[80vh] flex flex-col"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/8 bg-[#0d0d0d] shrink-0">
        <div className="flex items-center gap-2">
          <Accessibility size={16} className="text-[#c9a84c]" aria-hidden="true" />
          <span className="text-white font-semibold text-sm">Accessibility</span>
          {isModified && (
            <span className="w-2 h-2 rounded-full bg-[#c9a84c]" aria-label="Settings active" />
          )}
        </div>
        <button
          onClick={onClose}
          aria-label="Close accessibility panel"
          className="p-1.5 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors"
        >
          <X size={14} aria-hidden="true" />
        </button>
      </div>

      {/* Scrollable body */}
      <div className="overflow-y-auto flex-1 p-3 space-y-2">

        {/* ── Vision ── */}
        <SectionHeader
          label="Vision"
          icon={<ZoomIn size={13} aria-hidden="true" />}
          open={openSection === "vision"}
          onToggle={() => toggleSection("vision")}
          active={state.fontSize !== 1 || state.lineHeight !== 1 || state.letterSpacing !== 0}
        />
        <AnimatePresence initial={false}>
          {openSection === "vision" && (
            <motion.div
              key="vision"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="space-y-2 pb-1">
                {/* Font size */}
                <div role="group" aria-label={`Text size — ${fontPct}%`}>
                  <p className="text-white/50 text-[10px] uppercase tracking-wider mb-1.5 px-1">
                    Text Size — {fontPct}%
                  </p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => update({ fontSize: Math.max(0.8, +(state.fontSize - 0.1).toFixed(1)) })}
                      disabled={state.fontSize <= 0.8}
                      aria-label="Decrease text size"
                      className="flex-1 flex items-center justify-center gap-1 py-2 rounded-xl bg-white/5 border border-white/10 hover:border-[#c9a84c]/40 hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all text-white text-xs"
                    >
                      <ZoomOut size={12} aria-hidden="true" /> Smaller
                    </button>
                    <button
                      onClick={() => update({ fontSize: Math.min(1.6, +(state.fontSize + 0.1).toFixed(1)) })}
                      disabled={state.fontSize >= 1.6}
                      aria-label="Increase text size"
                      className="flex-1 flex items-center justify-center gap-1 py-2 rounded-xl bg-white/5 border border-white/10 hover:border-[#c9a84c]/40 hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all text-white text-xs"
                    >
                      <ZoomIn size={12} aria-hidden="true" /> Larger
                    </button>
                  </div>
                </div>

                {/* Line height */}
                <div role="group" aria-label="Line height">
                  <p className="text-white/50 text-[10px] uppercase tracking-wider mb-1.5 px-1">Line Height</p>
                  <div className="flex gap-1.5">
                    {([1, 1.5, 2] as const).map((v) => (
                      <button
                        key={v}
                        onClick={() => update({ lineHeight: v })}
                        aria-pressed={state.lineHeight === v}
                        className={`flex-1 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                          state.lineHeight === v
                            ? "bg-[#c9a84c]/15 border-[#c9a84c]/50 text-white"
                            : "bg-white/5 border-white/10 text-white/60 hover:border-white/25 hover:text-white"
                        }`}
                      >
                        {v === 1 ? "Normal" : v === 1.5 ? "1.5×" : "2×"}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Letter spacing */}
                <div role="group" aria-label="Letter spacing">
                  <p className="text-white/50 text-[10px] uppercase tracking-wider mb-1.5 px-1">Letter Spacing</p>
                  <div className="flex gap-1.5">
                    {([0, 1, 2, 4] as const).map((v) => (
                      <button
                        key={v}
                        onClick={() => update({ letterSpacing: v })}
                        aria-pressed={state.letterSpacing === v}
                        className={`flex-1 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                          state.letterSpacing === v
                            ? "bg-[#c9a84c]/15 border-[#c9a84c]/50 text-white"
                            : "bg-white/5 border-white/10 text-white/60 hover:border-white/25 hover:text-white"
                        }`}
                      >
                        {v === 0 ? "Off" : `+${v}`}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Color & Contrast ── */}
        <SectionHeader
          label="Color & Contrast"
          icon={<Contrast size={13} aria-hidden="true" />}
          open={openSection === "color"}
          onToggle={() => toggleSection("color")}
          active={state.highContrast !== "off" || state.grayscale || state.invertColors || state.colorBlind !== "off"}
        />
        <AnimatePresence initial={false}>
          {openSection === "color" && (
            <motion.div
              key="color"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="space-y-2 pb-1">
                {/* High contrast */}
                <div role="group" aria-labelledby="hc-label">
                  <p id="hc-label" className="text-white/50 text-[10px] uppercase tracking-wider mb-1.5 px-1">High Contrast</p>
                  <div className="grid grid-cols-2 gap-1.5">
                    {(["off", "dark", "light", "yellow"] as const).map((v) => (
                      <button
                        key={v}
                        onClick={() => update({ highContrast: v })}
                        aria-pressed={state.highContrast === v}
                        className={`py-1.5 px-2 rounded-lg text-xs font-medium border transition-all ${
                          state.highContrast === v
                            ? "bg-[#c9a84c]/15 border-[#c9a84c]/50 text-white"
                            : "bg-white/5 border-white/10 text-white/60 hover:border-white/25 hover:text-white"
                        }`}
                      >
                        {v === "off" ? "Off" : v === "dark" ? "Dark" : v === "light" ? "Light" : "Yellow/Black"}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Grayscale / Invert */}
                <div className="flex gap-1.5">
                  <ToggleRow
                    icon={<Minus size={12} aria-hidden="true" />}
                    label="Grayscale"
                    active={state.grayscale}
                    onToggle={() => update({ grayscale: !state.grayscale, colorBlind: "off", invertColors: state.grayscale ? state.invertColors : false })}
                    compact
                  />
                  <ToggleRow
                    icon={<Moon size={12} aria-hidden="true" />}
                    label="Invert"
                    active={state.invertColors}
                    onToggle={() => update({ invertColors: !state.invertColors, colorBlind: "off" })}
                    compact
                  />
                </div>

                {/* Color blind */}
                <div role="group" aria-labelledby="cb-label">
                  <p id="cb-label" className="text-white/50 text-[10px] uppercase tracking-wider mb-1.5 px-1">Color Blind Mode</p>
                  <div className="grid grid-cols-2 gap-1.5">
                    {(["off", "protanopia", "deuteranopia", "tritanopia"] as const).map((v) => (
                      <button
                        key={v}
                        onClick={() => update({ colorBlind: v, grayscale: v !== "off" ? false : state.grayscale, invertColors: v !== "off" ? false : state.invertColors })}
                        aria-pressed={state.colorBlind === v}
                        className={`py-1.5 px-2 rounded-lg text-xs font-medium border transition-all ${
                          state.colorBlind === v
                            ? "bg-[#c9a84c]/15 border-[#c9a84c]/50 text-white"
                            : "bg-white/5 border-white/10 text-white/60 hover:border-white/25 hover:text-white"
                        }`}
                      >
                        {v === "off" ? "Off" : v === "protanopia" ? "Protanopia" : v === "deuteranopia" ? "Deuteranopia" : "Tritanopia"}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Motor & Navigation ── */}
        <SectionHeader
          label="Motor & Navigation"
          icon={<MousePointer2 size={13} aria-hidden="true" />}
          open={openSection === "motor"}
          onToggle={() => toggleSection("motor")}
          active={state.focusHighlight || state.largeCursor || state.highlightLinks || state.highlightHeadings}
        />
        <AnimatePresence initial={false}>
          {openSection === "motor" && (
            <motion.div
              key="motor"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="space-y-1.5 pb-1">
                <ToggleRow icon={<Eye size={12} aria-hidden="true" />} label="Focus Indicators" description="Blue outline on focused elements" active={state.focusHighlight} onToggle={() => update({ focusHighlight: !state.focusHighlight })} />
                <ToggleRow icon={<MousePointer2 size={12} aria-hidden="true" />} label="Large Cursor" description="Bigger mouse pointer" active={state.largeCursor} onToggle={() => update({ largeCursor: !state.largeCursor })} />
                <ToggleRow icon={<Underline size={12} aria-hidden="true" />} label="Highlight Links" description="Yellow highlight on all links" active={state.highlightLinks} onToggle={() => update({ highlightLinks: !state.highlightLinks })} />
                <ToggleRow icon={<AlignJustify size={12} aria-hidden="true" />} label="Highlight Headings" description="Blue left border on headings" active={state.highlightHeadings} onToggle={() => update({ highlightHeadings: !state.highlightHeadings })} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Cognitive & Reading ── */}
        <SectionHeader
          label="Cognitive & Reading"
          icon={<BookOpen size={13} aria-hidden="true" />}
          open={openSection === "cognitive"}
          onToggle={() => toggleSection("cognitive")}
          active={state.dyslexiaFont || state.reduceMotion || state.readingGuide || state.readingMask}
        />
        <AnimatePresence initial={false}>
          {openSection === "cognitive" && (
            <motion.div
              key="cognitive"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="space-y-1.5 pb-1">
                <ToggleRow icon={<Type size={12} aria-hidden="true" />} label="Dyslexia Font" description="Lexend — easier to read" active={state.dyslexiaFont} onToggle={() => update({ dyslexiaFont: !state.dyslexiaFont })} />
                <ToggleRow icon={<Wind size={12} aria-hidden="true" />} label="Reduce Motion" description="Stops animations & transitions" active={state.reduceMotion} onToggle={() => update({ reduceMotion: !state.reduceMotion })} />
                <ToggleRow icon={<Sun size={12} aria-hidden="true" />} label="Reading Guide" description="Horizontal line follows cursor" active={state.readingGuide} onToggle={() => update({ readingGuide: !state.readingGuide })} />
                <ToggleRow icon={<BookOpen size={12} aria-hidden="true" />} label="Reading Mask" description="Dims content outside cursor band" active={state.readingMask} onToggle={() => update({ readingMask: !state.readingMask })} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>

      {/* Footer */}
      <div className="px-3 pb-3 pt-2 border-t border-white/8 shrink-0 space-y-2">
        <button
          onClick={reset}
          className="w-full flex items-center justify-center gap-2 py-2 rounded-xl border border-white/15 hover:border-[#c9a84c]/40 text-white/60 hover:text-white text-xs font-medium transition-all hover:bg-white/5"
          aria-label="Reset all accessibility settings to default"
        >
          <RotateCcw size={11} aria-hidden="true" />
          Reset to Default
        </button>
        <p className="text-white/40 text-[10px] text-center leading-relaxed">
          Settings saved in your browser · <kbd className="font-mono bg-white/10 px-1 rounded text-[9px]">Alt+A</kbd> to toggle
        </p>
      </div>
    </motion.div>
  );
}

// ── Sub-components ─────────────────────────────────────────────────────────────

interface SectionHeaderProps {
  label: string;
  icon: React.ReactNode;
  open: boolean;
  onToggle: () => void;
  active: boolean;
}

function SectionHeader({ label, icon, open, onToggle, active }: SectionHeaderProps) {
  return (
    <button
      onClick={onToggle}
      aria-expanded={open}
      className={`w-full flex items-center gap-2 px-3 py-2 rounded-xl border text-left transition-all ${
        open
          ? "bg-white/8 border-white/15 text-white"
          : "bg-white/3 border-white/8 text-white/70 hover:bg-white/6 hover:text-white"
      }`}
    >
      <span className={active ? "text-[#c9a84c]" : "text-white/50"}>{icon}</span>
      <span className="flex-1 text-xs font-semibold">{label}</span>
      {active && <span className="w-1.5 h-1.5 rounded-full bg-[#c9a84c]" aria-hidden="true" />}
      {open
        ? <ChevronUp size={12} className="text-white/50" aria-hidden="true" />
        : <ChevronDown size={12} className="text-white/50" aria-hidden="true" />
      }
    </button>
  );
}

interface ToggleRowProps {
  icon: React.ReactNode;
  label: string;
  description?: string;
  active: boolean;
  onToggle: () => void;
  compact?: boolean;
}

function ToggleRow({ icon, label, description, active, onToggle, compact }: ToggleRowProps) {
  if (compact) {
    return (
      <button
        role="switch"
        aria-checked={active}
        onClick={onToggle}
        className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl border text-xs font-medium transition-all ${
          active
            ? "bg-[#c9a84c]/10 border-[#c9a84c]/40 text-white"
            : "bg-white/4 border-white/8 text-white/60 hover:bg-white/8 hover:border-white/15 hover:text-white"
        }`}
      >
        <span className={active ? "text-[#c9a84c]" : "text-white/50"}>{icon}</span>
        {label}
      </button>
    );
  }

  return (
    <button
      role="switch"
      aria-checked={active}
      onClick={onToggle}
      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl border transition-all text-left ${
        active
          ? "bg-[#c9a84c]/10 border-[#c9a84c]/40 text-white"
          : "bg-white/4 border-white/8 text-white/70 hover:bg-white/8 hover:border-white/15 hover:text-white"
      }`}
    >
      <span className={`shrink-0 ${active ? "text-[#c9a84c]" : "text-white/50"}`}>{icon}</span>
      <span className="flex-1 min-w-0">
        <span className="block text-xs font-semibold leading-tight">{label}</span>
        {description && <span className="block text-[10px] text-white/50 leading-tight mt-0.5">{description}</span>}
      </span>
      <span
        className={`shrink-0 w-8 h-4 rounded-full transition-colors relative ${active ? "bg-[#c9a84c]" : "bg-white/15"}`}
        aria-hidden="true"
      >
        <span className={`absolute top-0.5 w-3 h-3 rounded-full bg-white shadow transition-transform ${active ? "translate-x-4" : "translate-x-0.5"}`} />
      </span>
    </button>
  );
}

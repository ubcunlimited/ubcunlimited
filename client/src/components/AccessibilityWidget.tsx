/**
 * AccessibilityWidget — Floating ADA accessibility panel for UBC Unlimited
 *
 * Positioning: fixed bottom-[6rem] right-6 (sits above the chat bubble at bottom-6)
 * Design: matches site dark/gold palette (#080808 bg, #c9a84c accents)
 *
 * Features:
 *  - Text size increase / decrease
 *  - High contrast mode
 *  - Dyslexia-friendly font (OpenDyslexic via Google Fonts)
 *  - Reduce motion (respects prefers-reduced-motion)
 *  - Highlight focus indicators
 *  - Grayscale mode
 *  - Reset all
 *
 * All settings are persisted in localStorage and applied via <html> data attributes
 * + injected <style> tags so they work across every page without re-rendering.
 */

import { useState, useEffect, useCallback } from "react";
import { Accessibility, X, ZoomIn, ZoomOut, Sun, Type, Minus, Eye, Wind, RotateCcw } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// ── Types ─────────────────────────────────────────────────────────────────────

interface A11yState {
  fontSize: number;        // multiplier: 1 | 1.1 | 1.2 | 1.3 | 1.4 | 1.5
  highContrast: boolean;
  dyslexiaFont: boolean;
  reduceMotion: boolean;
  focusHighlight: boolean;
  grayscale: boolean;
}

const DEFAULT_STATE: A11yState = {
  fontSize: 1,
  highContrast: false,
  dyslexiaFont: false,
  reduceMotion: false,
  focusHighlight: false,
  grayscale: false,
};

const STORAGE_KEY = "ubc_a11y";
const STYLE_ID = "ubc-a11y-styles";
const FONT_LINK_ID = "ubc-a11y-dyslexia-font";

// ── CSS injection ─────────────────────────────────────────────────────────────

function buildCSS(state: A11yState): string {
  const rules: string[] = [];

  // Font size — scale root em
  if (state.fontSize !== 1) {
    rules.push(`html { font-size: ${state.fontSize * 100}% !important; }`);
  }

  // High contrast
  if (state.highContrast) {
    rules.push(`
      body, body * {
        background-color: #000 !important;
        color: #fff !important;
        border-color: #fff !important;
      }
      a, button, [role="button"] { color: #ffff00 !important; }
      img { filter: contrast(1.4) !important; }
    `);
  }

  // Dyslexia font
  if (state.dyslexiaFont) {
    rules.push(`
      body, body * {
        font-family: 'OpenDyslexic', 'Comic Sans MS', cursive !important;
        letter-spacing: 0.05em !important;
        word-spacing: 0.1em !important;
        line-height: 1.7 !important;
      }
    `);
  }

  // Reduce motion
  if (state.reduceMotion) {
    rules.push(`
      *, *::before, *::after {
        animation-duration: 0.001ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.001ms !important;
        scroll-behavior: auto !important;
      }
    `);
  }

  // Focus highlight
  if (state.focusHighlight) {
    rules.push(`
      *:focus, *:focus-visible {
        outline: 3px solid #c9a84c !important;
        outline-offset: 3px !important;
        box-shadow: 0 0 0 6px rgba(201,168,76,0.25) !important;
      }
    `);
  }

  // Grayscale
  if (state.grayscale) {
    rules.push(`html { filter: grayscale(1) !important; }`);
  }

  return rules.join("\n");
}

function applyStyles(state: A11yState) {
  // Inject / update style tag
  let styleEl = document.getElementById(STYLE_ID) as HTMLStyleElement | null;
  const css = buildCSS(state);

  if (!styleEl) {
    styleEl = document.createElement("style");
    styleEl.id = STYLE_ID;
    document.head.appendChild(styleEl);
  }
  styleEl.textContent = css;

  // Dyslexia font — load OpenDyslexic from a CDN
  let fontLink = document.getElementById(FONT_LINK_ID) as HTMLLinkElement | null;
  if (state.dyslexiaFont && !fontLink) {
    fontLink = document.createElement("link");
    fontLink.id = FONT_LINK_ID;
    fontLink.rel = "stylesheet";
    fontLink.href =
      "https://fonts.googleapis.com/css2?family=Lexend:wght@400;500;600;700&display=swap";
    document.head.appendChild(fontLink);
    // Override the CSS to use Lexend (widely available, dyslexia-friendly)
    const styleEl2 = document.getElementById(STYLE_ID) as HTMLStyleElement;
    if (styleEl2) {
      styleEl2.textContent = styleEl2.textContent!.replace(
        "'OpenDyslexic', 'Comic Sans MS', cursive",
        "'Lexend', 'Comic Sans MS', cursive"
      );
    }
  }
}

function loadState(): A11yState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return { ...DEFAULT_STATE, ...JSON.parse(raw) };
  } catch {
    /* ignore */
  }
  return { ...DEFAULT_STATE };
}

function saveState(state: A11yState) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

// ── Component ─────────────────────────────────────────────────────────────────

export default function AccessibilityWidget() {
  const [open, setOpen] = useState(false);
  const [state, setState] = useState<A11yState>(DEFAULT_STATE);

  // Load persisted state on mount and apply it
  useEffect(() => {
    const loaded = loadState();
    setState(loaded);
    applyStyles(loaded);
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

  const isModified =
    state.fontSize !== 1 ||
    state.highContrast ||
    state.dyslexiaFont ||
    state.reduceMotion ||
    state.focusHighlight ||
    state.grayscale;

  const fontPct = Math.round(state.fontSize * 100);

  return (
    <>
      {/* Trigger button — sits just above the chat bubble (bottom-[6rem]) */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close accessibility options" : "Open accessibility options"}
        aria-expanded={open}
        aria-haspopup="dialog"
        className="fixed bottom-[10rem] lg:bottom-[6.5rem] right-6 z-50 w-12 h-12 rounded-full bg-[#1a1a1a] border border-[#c9a84c]/40 hover:border-[#c9a84c] shadow-lg hover:shadow-[#c9a84c]/20 transition-all hover:scale-105 active:scale-95 flex items-center justify-center group"
        title="Accessibility options"
      >
        <Accessibility
          size={20}
          className="text-[#c9a84c] group-hover:scale-110 transition-transform"
          aria-hidden="true"
        />
        {/* Badge when settings are active */}
        {isModified && (
          <span
            className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-[#c9a84c] border-2 border-[#080808]"
            aria-label="Accessibility settings active"
          />
        )}
      </button>

      {/* Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            aria-modal="false"
            aria-label="Accessibility options"
            initial={{ opacity: 0, scale: 0.92, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 8 }}
            transition={{ type: "spring", stiffness: 320, damping: 28 }}
            className="fixed bottom-[13.5rem] lg:bottom-[10rem] right-6 z-50 w-72 bg-[#111111] border border-[#c9a84c]/25 rounded-2xl shadow-2xl shadow-black/60 overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/8 bg-[#0d0d0d]">
              <div className="flex items-center gap-2">
                <Accessibility size={16} className="text-[#c9a84c]" aria-hidden="true" />
                <span className="text-white font-semibold text-sm">Accessibility</span>
              </div>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close accessibility panel"
                className="p-1.5 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors"
              >
                <X size={14} aria-hidden="true" />
              </button>
            </div>

            {/* Controls */}
            <div className="p-4 space-y-3">

              {/* Text Size */}
              <div>
                <p className="text-white/70 text-xs font-medium uppercase tracking-wider mb-2">
                  Text Size — {fontPct}%
                </p>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => update({ fontSize: Math.max(1, +(state.fontSize - 0.1).toFixed(1)) })}
                    disabled={state.fontSize <= 1}
                    aria-label="Decrease text size"
                    className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl bg-white/5 border border-white/10 hover:border-[#c9a84c]/40 hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all text-white text-xs font-medium"
                  >
                    <ZoomOut size={13} aria-hidden="true" /> Smaller
                  </button>
                  <button
                    onClick={() => update({ fontSize: Math.min(1.5, +(state.fontSize + 0.1).toFixed(1)) })}
                    disabled={state.fontSize >= 1.5}
                    aria-label="Increase text size"
                    className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl bg-white/5 border border-white/10 hover:border-[#c9a84c]/40 hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all text-white text-xs font-medium"
                  >
                    <ZoomIn size={13} aria-hidden="true" /> Larger
                  </button>
                </div>
              </div>

              {/* Toggle controls */}
              <div className="space-y-2">
                <ToggleRow
                  icon={<Sun size={14} aria-hidden="true" />}
                  label="High Contrast"
                  description="Black background, white text"
                  active={state.highContrast}
                  onToggle={() => update({ highContrast: !state.highContrast })}
                />
                <ToggleRow
                  icon={<Type size={14} aria-hidden="true" />}
                  label="Dyslexia Font"
                  description="Lexend — easier to read"
                  active={state.dyslexiaFont}
                  onToggle={() => update({ dyslexiaFont: !state.dyslexiaFont })}
                />
                <ToggleRow
                  icon={<Wind size={14} aria-hidden="true" />}
                  label="Reduce Motion"
                  description="Stops animations & transitions"
                  active={state.reduceMotion}
                  onToggle={() => update({ reduceMotion: !state.reduceMotion })}
                />
                <ToggleRow
                  icon={<Eye size={14} aria-hidden="true" />}
                  label="Focus Indicators"
                  description="Gold outline on focused elements"
                  active={state.focusHighlight}
                  onToggle={() => update({ focusHighlight: !state.focusHighlight })}
                />
                <ToggleRow
                  icon={<Minus size={14} aria-hidden="true" />}
                  label="Grayscale"
                  description="Remove all color from the page"
                  active={state.grayscale}
                  onToggle={() => update({ grayscale: !state.grayscale })}
                />
              </div>

              {/* Reset */}
              {isModified && (
                <button
                  onClick={reset}
                  className="w-full flex items-center justify-center gap-2 py-2 rounded-xl border border-white/15 hover:border-[#c9a84c]/40 text-white/70 hover:text-white text-xs font-medium transition-all hover:bg-white/5"
                  aria-label="Reset all accessibility settings to default"
                >
                  <RotateCcw size={12} aria-hidden="true" />
                  Reset all settings
                </button>
              )}
            </div>

            {/* Footer */}
            <div className="px-4 pb-3">
              <p className="text-white/70 text-[10px] text-center leading-relaxed">
                Settings are saved in your browser and apply across all pages.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// ── Sub-component: Toggle row ─────────────────────────────────────────────────

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
      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl border transition-all text-left ${
        active
          ? "bg-[#c9a84c]/10 border-[#c9a84c]/40 text-white"
          : "bg-white/4 border-white/8 text-white/70 hover:bg-white/8 hover:border-white/15 hover:text-white"
      }`}
    >
      {/* Icon */}
      <span className={`shrink-0 ${active ? "text-[#c9a84c]" : "text-white/70"}`}>
        {icon}
      </span>

      {/* Labels */}
      <span className="flex-1 min-w-0">
        <span className="block text-xs font-semibold leading-tight">{label}</span>
        <span className="block text-[10px] text-white/70 leading-tight mt-0.5">{description}</span>
      </span>

      {/* Toggle pill */}
      <span
        className={`shrink-0 w-8 h-4 rounded-full transition-colors relative ${
          active ? "bg-[#c9a84c]" : "bg-white/15"
        }`}
        aria-hidden="true"
      >
        <span
          className={`absolute top-0.5 w-3 h-3 rounded-full bg-white shadow transition-transform ${
            active ? "translate-x-4" : "translate-x-0.5"
          }`}
        />
      </span>
    </button>
  );
}

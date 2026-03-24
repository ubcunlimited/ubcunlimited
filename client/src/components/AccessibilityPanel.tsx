/**
 * AccessibilityPanel — ADA accessibility panel, used inside FloatingLauncher
 * Extracted from AccessibilityWidget.tsx; no floating trigger button here.
 */

import { useState, useEffect, useCallback } from "react";
import { Accessibility, X, ZoomIn, ZoomOut, Sun, Type, Minus, Eye, Wind, RotateCcw } from "lucide-react";
import { motion } from "framer-motion";

interface A11yState {
  fontSize: number;
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

function buildCSS(state: A11yState): string {
  const rules: string[] = [];
  if (state.fontSize !== 1) rules.push(`html { font-size: ${state.fontSize * 100}% !important; }`);
  if (state.highContrast) rules.push(`body, body * { background-color: #000 !important; color: #fff !important; border-color: #fff !important; } a, button, [role="button"] { color: #ffff00 !important; } img { filter: contrast(1.4) !important; }`);
  if (state.dyslexiaFont) rules.push(`body, body * { font-family: 'OpenDyslexic', 'Comic Sans MS', cursive !important; letter-spacing: 0.05em !important; word-spacing: 0.1em !important; line-height: 1.7 !important; }`);
  if (state.reduceMotion) rules.push(`*, *::before, *::after { animation-duration: 0.001ms !important; animation-iteration-count: 1 !important; transition-duration: 0.001ms !important; scroll-behavior: auto !important; }`);
  if (state.focusHighlight) rules.push(`*:focus, *:focus-visible { outline: 3px solid #c9a84c !important; outline-offset: 3px !important; box-shadow: 0 0 0 6px rgba(201,168,76,0.25) !important; }`);
  if (state.grayscale) rules.push(`html { filter: grayscale(1) !important; }`);
  return rules.join("\n");
}

function applyStyles(state: A11yState) {
  let styleEl = document.getElementById(STYLE_ID) as HTMLStyleElement | null;
  const css = buildCSS(state);
  if (!styleEl) {
    styleEl = document.createElement("style");
    styleEl.id = STYLE_ID;
    document.head.appendChild(styleEl);
  }
  styleEl.textContent = css;
  let fontLink = document.getElementById(FONT_LINK_ID) as HTMLLinkElement | null;
  if (state.dyslexiaFont && !fontLink) {
    fontLink = document.createElement("link");
    fontLink.id = FONT_LINK_ID;
    fontLink.rel = "stylesheet";
    fontLink.href = "https://fonts.googleapis.com/css2?family=Lexend:wght@400;500;600;700&display=swap";
    document.head.appendChild(fontLink);
    const styleEl2 = document.getElementById(STYLE_ID) as HTMLStyleElement;
    if (styleEl2) styleEl2.textContent = styleEl2.textContent!.replace("'OpenDyslexic', 'Comic Sans MS', cursive", "'Lexend', 'Comic Sans MS', cursive");
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
      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl border transition-all text-left ${active ? "bg-[#c9a84c]/10 border-[#c9a84c]/40 text-white" : "bg-white/3 border-white/8 text-white/60 hover:border-white/20 hover:text-white/80"}`}
    >
      <span className={`shrink-0 ${active ? "text-[#c9a84c]" : "text-white/40"}`}>{icon}</span>
      <div className="flex-1 min-w-0">
        <div className="text-xs font-medium leading-tight">{label}</div>
        <div className="text-[10px] text-white/35 mt-0.5 leading-tight">{description}</div>
      </div>
      <div className={`w-8 h-4 rounded-full transition-colors shrink-0 ${active ? "bg-[#c9a84c]" : "bg-white/15"}`}>
        <div className={`w-3 h-3 rounded-full bg-white shadow-sm transition-transform mt-0.5 ${active ? "translate-x-4 ml-0.5" : "translate-x-0.5"}`} />
      </div>
    </button>
  );
}

interface AccessibilityPanelProps {
  onClose: () => void;
  bottomClass: string;
  bottomPx?: number;
}

export default function AccessibilityPanel({ onClose, bottomClass, bottomPx }: AccessibilityPanelProps) {
  const [state, setState] = useState<A11yState>(DEFAULT_STATE);

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

  const isModified = state.fontSize !== 1 || state.highContrast || state.dyslexiaFont || state.reduceMotion || state.focusHighlight || state.grayscale;
  const fontPct = Math.round(state.fontSize * 100);

  return (
    <motion.div
      role="dialog"
      aria-modal="false"
      aria-label="Accessibility options"
      initial={{ opacity: 0, scale: 0.92, y: 8 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.92, y: 8 }}
      transition={{ type: "spring", stiffness: 320, damping: 28 }}
      className={`fixed right-6 z-[49] w-72 bg-[#111111] border border-[#c9a84c]/25 rounded-2xl shadow-2xl shadow-black/60 overflow-hidden`}
      style={{ bottom: bottomPx !== undefined ? `${bottomPx}px` : undefined }}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/8 bg-[#0d0d0d]">
        <div className="flex items-center gap-2">
          <Accessibility size={16} className="text-[#c9a84c]" aria-hidden="true" />
          <span className="text-white font-semibold text-sm">Accessibility</span>
          {isModified && <span className="w-2 h-2 rounded-full bg-[#c9a84c]" aria-label="Settings active" />}
        </div>
        <button onClick={onClose} aria-label="Close accessibility panel" className="p-1.5 rounded-lg text-white/40 hover:text-white hover:bg-white/10 transition-colors">
          <X size={14} aria-hidden="true" />
        </button>
      </div>

      {/* Controls */}
      <div className="p-4 space-y-3">
        {/* Text Size */}
        <div>
          <p className="text-white/50 text-xs font-medium uppercase tracking-wider mb-2">Text Size — {fontPct}%</p>
          <div className="flex items-center gap-2">
            <button onClick={() => update({ fontSize: Math.max(1, +(state.fontSize - 0.1).toFixed(1)) })} disabled={state.fontSize <= 1} aria-label="Decrease text size" className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl bg-white/5 border border-white/10 hover:border-[#c9a84c]/40 hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all text-white text-xs font-medium">
              <ZoomOut size={13} aria-hidden="true" /> Smaller
            </button>
            <button onClick={() => update({ fontSize: Math.min(1.5, +(state.fontSize + 0.1).toFixed(1)) })} disabled={state.fontSize >= 1.5} aria-label="Increase text size" className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl bg-white/5 border border-white/10 hover:border-[#c9a84c]/40 hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all text-white text-xs font-medium">
              <ZoomIn size={13} aria-hidden="true" /> Larger
            </button>
          </div>
        </div>

        {/* Toggles */}
        <div className="space-y-2">
          <ToggleRow icon={<Sun size={14} />} label="High Contrast" description="Black background, white text" active={state.highContrast} onToggle={() => update({ highContrast: !state.highContrast })} />
          <ToggleRow icon={<Type size={14} />} label="Dyslexia Font" description="Lexend — easier to read" active={state.dyslexiaFont} onToggle={() => update({ dyslexiaFont: !state.dyslexiaFont })} />
          <ToggleRow icon={<Wind size={14} />} label="Reduce Motion" description="Stops animations & transitions" active={state.reduceMotion} onToggle={() => update({ reduceMotion: !state.reduceMotion })} />
          <ToggleRow icon={<Eye size={14} />} label="Focus Indicators" description="Gold outline on focused elements" active={state.focusHighlight} onToggle={() => update({ focusHighlight: !state.focusHighlight })} />
          <ToggleRow icon={<Minus size={14} />} label="Grayscale" description="Remove all color from the page" active={state.grayscale} onToggle={() => update({ grayscale: !state.grayscale })} />
        </div>

        {isModified && (
          <button onClick={reset} className="w-full flex items-center justify-center gap-2 py-2 rounded-xl border border-white/15 hover:border-[#c9a84c]/40 text-white/50 hover:text-white text-xs font-medium transition-all hover:bg-white/5" aria-label="Reset all accessibility settings">
            <RotateCcw size={12} aria-hidden="true" /> Reset all settings
          </button>
        )}
      </div>

      <div className="px-4 pb-3">
        <p className="text-white/25 text-[10px] text-center leading-relaxed">Settings are saved in your browser and apply across all pages.</p>
      </div>
    </motion.div>
  );
}

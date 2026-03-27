/**
 * Meta Pixel helpers
 *
 * Wraps window.fbq so TypeScript doesn't complain and so every call
 * is silently no-op'd when the Pixel hasn't loaded (e.g. ad-blockers).
 */

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

/** Fire a standard Meta Pixel event. */
export function trackPixelEvent(event: string, params?: Record<string, unknown>) {
  try {
    if (typeof window !== "undefined" && typeof window.fbq === "function") {
      if (params) {
        window.fbq("track", event, params);
      } else {
        window.fbq("track", event);
      }
    }
  } catch {
    // Silently ignore — ad-blockers or SSR environments
  }
}

/** Convenience: fire the standard Lead event on form success. */
export function trackLead(params?: Record<string, unknown>) {
  trackPixelEvent("Lead", params);
}

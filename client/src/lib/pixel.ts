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

/** Convenience: fire the standard Contact event on phone/email link clicks. */
export function trackContact(params?: Record<string, unknown>) {
  trackPixelEvent("Contact", params);
}

/**
 * Install a single global document-level click listener that fires
 * fbq('track', 'Contact') whenever any tel: link is clicked.
 * Call once at app startup (e.g. in main.tsx or App.tsx useEffect).
 */
export function installPhoneClickTracker() {
  if (typeof document === "undefined") return;
  document.addEventListener("click", (e) => {
    const target = (e.target as HTMLElement).closest("a[href^='tel:']");
    if (target) {
      trackContact();
    }
  });
}

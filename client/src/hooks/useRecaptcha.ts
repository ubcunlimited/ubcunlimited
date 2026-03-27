import { useCallback } from "react";

declare global {
  interface Window {
    grecaptcha: {
      ready: (cb: () => void) => void;
      execute: (siteKey: string, options: { action: string }) => Promise<string>;
    };
  }
}

const SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY as string;

/**
 * Returns an async `getToken(action)` function that resolves to a reCAPTCHA v3 token.
 * Call it just before form submission and pass the token to the server procedure.
 *
 * Usage:
 *   const { getToken } = useRecaptcha();
 *   const token = await getToken("submit_consultation");
 *   mutation.mutate({ ...formData, recaptchaToken: token });
 */
export function useRecaptcha() {
  const getToken = useCallback(
    async (action: string): Promise<string> => {
      if (!SITE_KEY || typeof window === "undefined" || !window.grecaptcha) {
        console.warn("[reCAPTCHA] grecaptcha not loaded — skipping token");
        return "";
      }
      return new Promise<string>((resolve) => {
        window.grecaptcha.ready(async () => {
          try {
            const token = await window.grecaptcha.execute(SITE_KEY, { action });
            resolve(token);
          } catch (err) {
            console.error("[reCAPTCHA] execute failed:", err);
            resolve("");
          }
        });
      });
    },
    []
  );

  return { getToken };
}

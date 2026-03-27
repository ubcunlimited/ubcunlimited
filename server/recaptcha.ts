import { ENV } from "./_core/env";

const RECAPTCHA_VERIFY_URL = "https://www.google.com/recaptcha/api/siteverify";

/**
 * Verify a reCAPTCHA v3 token server-side.
 * Returns true if the token is valid and the score meets the threshold.
 * @param token  - The token from the client (grecaptcha.execute result)
 * @param action - Expected action name (e.g. "submit_form") for extra validation
 * @param minScore - Minimum acceptable score (0.0–1.0). Default 0.5.
 */
export async function verifyRecaptcha(
  token: string,
  action?: string,
  minScore = 0.5
): Promise<{ success: boolean; score?: number; error?: string }> {
  if (!ENV.recaptchaSecretKey) {
    // If no key is configured (e.g. local dev without env), pass through
    console.warn("[reCAPTCHA] RECAPTCHA_SECRET_KEY not set — skipping verification");
    return { success: true };
  }

  try {
    const params = new URLSearchParams({
      secret: ENV.recaptchaSecretKey,
      response: token,
    });

    const res = await fetch(`${RECAPTCHA_VERIFY_URL}?${params.toString()}`, {
      method: "POST",
    });

    const data = (await res.json()) as {
      success: boolean;
      score: number;
      action: string;
      "error-codes"?: string[];
    };

    if (!data.success) {
      return { success: false, error: data["error-codes"]?.join(", ") ?? "invalid-token" };
    }

    if (action && data.action !== action) {
      return { success: false, error: `action-mismatch: expected ${action}, got ${data.action}` };
    }

    if (data.score < minScore) {
      return { success: false, score: data.score, error: `score-too-low: ${data.score}` };
    }

    return { success: true, score: data.score };
  } catch (err) {
    console.error("[reCAPTCHA] Verification request failed:", err);
    return { success: false, error: "verification-request-failed" };
  }
}

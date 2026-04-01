/**
 * LeadConnector webhook forwarding utility.
 *
 * Payload contract (required by GHL field mapping):
 *   firstName         – string  (top-level, always present)
 *   lastName          – string  (top-level, always present)
 *   phone             – string  (top-level, always present)
 *   email             – string  (top-level, always present)
 *   form_type         – string  (top-level, identifies the source form)
 *   submitted_at      – ISO string (top-level)
 *   source            – string  (top-level, always "ubcunlimited.com")
 *   recaptcha_score   – number | null  (0.0–1.0 reCAPTCHA v3 score)
 *   recaptcha_quality – string  ("excellent" | "good" | "fair" | "low" | "unknown")
 *   notes             – JSON object containing all other form-specific fields
 *
 * Failures are logged but never thrown — webhook errors must not block form submissions.
 */

const WEBHOOK_URL =
  "https://services.leadconnectorhq.com/hooks/MhrN1I0u9yBLokxu0JPF/webhook-trigger/7bc9c4d8-1295-4801-aa5d-a62dd797fa28";

export interface WebhookContact {
  firstName: string;
  lastName?: string;
  phone: string;
  email: string;
}

export interface WebhookOptions {
  /**
   * reCAPTCHA v3 score (0.0–1.0).
   * Forwarded to GHL as custom fields for lead quality filtering and smart lists.
   *   0.9–1.0 → "excellent"  (very likely human)
   *   0.7–0.9 → "good"       (likely human)
   *   0.5–0.7 → "fair"       (borderline — passed threshold)
   *   0.0–0.5 → "low"        (should not reach GHL — blocked at server)
   *   undefined → "unknown"  (reCAPTCHA not configured / dev environment)
   */
  recaptchaScore?: number;
}

/** Map a numeric reCAPTCHA score to a human-readable quality label. */
function scoreToQuality(score: number | undefined): string {
  if (score === undefined || score === null) return "unknown";
  if (score >= 0.9) return "excellent";
  if (score >= 0.7) return "good";
  if (score >= 0.5) return "fair";
  return "low";
}

/**
 * Forward form data to the LeadConnector (GHL) webhook.
 *
 * @param formType  Identifies the source form (e.g. "consultation", "hero_lead")
 * @param contact   The four required contact fields (firstName, lastName, phone, email)
 * @param extras    All other form-specific fields — bundled into `notes`
 * @param options   Optional metadata including reCAPTCHA score
 */
export async function sendToWebhook(
  formType: string,
  contact: WebhookContact,
  extras: Record<string, unknown> = {},
  options: WebhookOptions = {}
): Promise<void> {
  try {
    const payload = {
      // ── Required top-level contact fields ───────────────────────────────
      firstName: contact.firstName,
      lastName: contact.lastName ?? "",
      phone: contact.phone,
      email: contact.email,
      // ── Metadata ────────────────────────────────────────────────────────
      form_type: formType,
      submitted_at: new Date().toISOString(),
      source: "ubcunlimited.com",
      // ── reCAPTCHA lead quality score ─────────────────────────────────────
      // Map these to GHL custom fields: "recaptcha_score" and "recaptcha_quality"
      recaptcha_score: options.recaptchaScore ?? null,
      recaptcha_quality: scoreToQuality(options.recaptchaScore),
      // ── All other form-specific data goes into notes ─────────────────────
      notes: Object.keys(extras).length > 0 ? extras : undefined,
    };

    const res = await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(8000), // 8 s timeout — never block the user
    });

    if (!res.ok) {
      console.error(
        `[Webhook] LeadConnector returned ${res.status} for form_type="${formType}"`
      );
    } else {
      console.log(
        `[Webhook] Forwarded form_type="${formType}" for ${contact.firstName} ${contact.lastName ?? ""} | recaptcha_score=${options.recaptchaScore ?? "n/a"} (${scoreToQuality(options.recaptchaScore)})`.trim()
      );
    }
  } catch (err) {
    // Network errors, timeouts, etc. — log and continue
    console.error(`[Webhook] Failed to forward form_type="${formType}":`, err);
  }
}

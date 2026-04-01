/**
 * LeadConnector webhook forwarding utility.
 *
 * Payload contract (required by GHL field mapping):
 *   firstName   – string  (top-level, always present)
 *   lastName    – string  (top-level, always present)
 *   phone       – string  (top-level, always present)
 *   email       – string  (top-level, always present)
 *   form_type   – string  (top-level, identifies the source form)
 *   submitted_at – ISO string (top-level)
 *   source      – string  (top-level, always "ubcunlimited.com")
 *   notes       – JSON object containing all other form-specific fields
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

/**
 * Forward form data to the LeadConnector webhook.
 *
 * @param formType  Identifies the source form (e.g. "consultation", "hero_lead")
 * @param contact   The four required contact fields (firstName, lastName, phone, email)
 * @param extras    All other form-specific fields — bundled into `notes`
 */
export async function sendToWebhook(
  formType: string,
  contact: WebhookContact,
  extras: Record<string, unknown> = {}
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
      console.log(`[Webhook] Forwarded form_type="${formType}" for ${contact.firstName} ${contact.lastName ?? ""}`.trim());
    }
  } catch (err) {
    // Network errors, timeouts, etc. — log and continue
    console.error(`[Webhook] Failed to forward form_type="${formType}":`, err);
  }
}

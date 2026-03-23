/**
 * LeadConnector webhook forwarding utility
 * Sends form submission data to the configured GHL/LeadConnector webhook endpoint.
 * All fields are forwarded as-is; the webhook URL is stored as a constant here
 * so it can be updated in one place.
 */

const WEBHOOK_URL =
  "https://services.leadconnectorhq.com/hooks/MhrN1I0u9yBLokxu0JPF/webhook-trigger/7bc9c4d8-1295-4801-aa5d-a62dd797fa28";

/**
 * Forward form data to the LeadConnector webhook.
 * Failures are logged but never thrown — webhook errors must not block form submissions.
 */
export async function sendToWebhook(
  formType: string,
  data: Record<string, unknown>
): Promise<void> {
  try {
    const payload = {
      form_type: formType,
      submitted_at: new Date().toISOString(),
      source: "ubcunlimited.com",
      ...data,
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
      console.log(`[Webhook] Forwarded form_type="${formType}" successfully`);
    }
  } catch (err) {
    // Network errors, timeouts, etc. — log and continue
    console.error(`[Webhook] Failed to forward form_type="${formType}":`, err);
  }
}

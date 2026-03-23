/**
 * Tests for the LeadConnector webhook forwarding utility.
 * Verifies that sendToWebhook posts the correct payload and handles errors gracefully.
 */
import { describe, it, expect, vi, beforeEach } from "vitest";

// ── Mock global fetch ────────────────────────────────────────────────────────
const mockFetch = vi.fn();
vi.stubGlobal("fetch", mockFetch);

// ── Import after stubbing ────────────────────────────────────────────────────
const { sendToWebhook } = await import("./webhook");

const WEBHOOK_URL =
  "https://services.leadconnectorhq.com/hooks/MhrN1I0u9yBLokxu0JPF/webhook-trigger/7bc9c4d8-1295-4801-aa5d-a62dd797fa28";

describe("sendToWebhook", () => {
  beforeEach(() => {
    mockFetch.mockReset();
  });

  it("POSTs to the correct LeadConnector webhook URL", async () => {
    mockFetch.mockResolvedValueOnce({ ok: true, status: 200 });

    await sendToWebhook("consultation", {
      first_name: "Jane",
      last_name: "Doe",
      email: "jane@example.com",
      phone: "8015551234",
    });

    expect(mockFetch).toHaveBeenCalledOnce();
    const [url, init] = mockFetch.mock.calls[0] as [string, RequestInit];
    expect(url).toBe(WEBHOOK_URL);
    expect(init.method).toBe("POST");
    expect(init.headers).toMatchObject({ "Content-Type": "application/json" });
  });

  it("includes form_type, submitted_at, and source in the payload", async () => {
    mockFetch.mockResolvedValueOnce({ ok: true, status: 200 });

    await sendToWebhook("hero_lead", { phone: "8015559999", business_type: "Retail" });

    const [, init] = mockFetch.mock.calls[0] as [string, RequestInit];
    const body = JSON.parse(init.body as string);

    expect(body.form_type).toBe("hero_lead");
    expect(body.source).toBe("ubcunlimited.com");
    expect(body.submitted_at).toBeDefined();
    expect(body.phone).toBe("8015559999");
    expect(body.business_type).toBe("Retail");
  });

  it("does not throw when the webhook returns a non-OK status", async () => {
    mockFetch.mockResolvedValueOnce({ ok: false, status: 500 });

    // Should resolve without throwing
    await expect(
      sendToWebhook("quote_request", { first_name: "Bob" })
    ).resolves.toBeUndefined();
  });

  it("does not throw when fetch itself rejects (network error)", async () => {
    mockFetch.mockRejectedValueOnce(new Error("Network failure"));

    await expect(
      sendToWebhook("statement_review", { first_name: "Alice" })
    ).resolves.toBeUndefined();
  });

  it("does not throw on timeout (AbortError)", async () => {
    const abortErr = new DOMException("The operation was aborted.", "AbortError");
    mockFetch.mockRejectedValueOnce(abortErr);

    await expect(
      sendToWebhook("blog_lead", { email: "test@example.com" })
    ).resolves.toBeUndefined();
  });
});

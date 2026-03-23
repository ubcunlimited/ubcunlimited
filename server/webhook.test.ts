/**
 * Tests for the LeadConnector webhook forwarding utility.
 * Verifies the new payload contract:
 *   - firstName, lastName, phone, email are always top-level
 *   - all other form-specific data is bundled into `notes`
 *   - errors never propagate to the caller
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

    await sendToWebhook(
      "consultation",
      { firstName: "Michael", lastName: "Torres", phone: "8015551234", email: "michael@example.com" }
    );

    expect(mockFetch).toHaveBeenCalledOnce();
    const [url, init] = mockFetch.mock.calls[0] as [string, RequestInit];
    expect(url).toBe(WEBHOOK_URL);
    expect(init.method).toBe("POST");
    expect(init.headers).toMatchObject({ "Content-Type": "application/json" });
  });

  it("places firstName, lastName, phone, email at the top level", async () => {
    mockFetch.mockResolvedValueOnce({ ok: true, status: 200 });

    await sendToWebhook(
      "quote_request",
      { firstName: "Michael", lastName: "Torres", phone: "8015551234", email: "michael@example.com" },
      { business_name: "Torres Auto", business_type: "Automotive", monthly_volume: "$25,000" }
    );

    const [, init] = mockFetch.mock.calls[0] as [string, RequestInit];
    const body = JSON.parse(init.body as string);

    // Required top-level contact fields
    expect(body.firstName).toBe("Michael");
    expect(body.lastName).toBe("Torres");
    expect(body.phone).toBe("8015551234");
    expect(body.email).toBe("michael@example.com");

    // Metadata
    expect(body.form_type).toBe("quote_request");
    expect(body.source).toBe("ubcunlimited.com");
    expect(body.submitted_at).toBeDefined();

    // Extra fields must be in notes, NOT at top level
    expect(body.notes).toMatchObject({
      business_name: "Torres Auto",
      business_type: "Automotive",
      monthly_volume: "$25,000",
    });
    expect(body.business_name).toBeUndefined();
    expect(body.business_type).toBeUndefined();
  });

  it("omits notes when no extras are provided", async () => {
    mockFetch.mockResolvedValueOnce({ ok: true, status: 200 });

    await sendToWebhook(
      "hero_lead",
      { firstName: "Michael", lastName: "Torres", phone: "8015559999", email: "" }
    );

    const [, init] = mockFetch.mock.calls[0] as [string, RequestInit];
    const body = JSON.parse(init.body as string);

    expect(body.notes).toBeUndefined();
  });

  it("does not throw when the webhook returns a non-OK status", async () => {
    mockFetch.mockResolvedValueOnce({ ok: false, status: 500 });

    await expect(
      sendToWebhook(
        "statement_review",
        { firstName: "Michael", lastName: "Torres", phone: "8015550001", email: "michael@example.com" }
      )
    ).resolves.toBeUndefined();
  });

  it("does not throw when fetch itself rejects (network error)", async () => {
    mockFetch.mockRejectedValueOnce(new Error("Network failure"));

    await expect(
      sendToWebhook(
        "blog_lead",
        { firstName: "Michael", lastName: "Torres", phone: "", email: "michael@example.com" },
        { source_page: "how-interchange-rates-work" }
      )
    ).resolves.toBeUndefined();
  });

  it("does not throw on timeout (AbortError)", async () => {
    const abortErr = new DOMException("The operation was aborted.", "AbortError");
    mockFetch.mockRejectedValueOnce(abortErr);

    await expect(
      sendToWebhook(
        "agent_lead",
        { firstName: "Michael", lastName: "Torres", phone: "8015550002", email: "michael@example.com" },
        { agent_type: "ISO", experience: "5 years" }
      )
    ).resolves.toBeUndefined();
  });
});

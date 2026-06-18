import { describe, expect, it, vi, beforeEach } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

// ── Mock external side-effects so tests run without a real DB or notification service ──

vi.mock("./db", () => ({
  insertBlogLead: vi.fn().mockResolvedValue(undefined),
  insertLead: vi.fn().mockResolvedValue(undefined),
}));

vi.mock("./_core/notification", () => ({
  notifyOwner: vi.fn().mockResolvedValue(true),
}));

vi.mock("./webhook", () => ({
  sendToWebhook: vi.fn().mockResolvedValue(undefined),
}));

import { insertBlogLead } from "./db";
import { notifyOwner } from "./_core/notification";

function createPublicContext(): TrpcContext {
  return {
    user: null,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      clearCookie: vi.fn(),
    } as unknown as TrpcContext["res"],
  };
}

describe("forms.submitBlogLead", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns success, persists the lead, and notifies the owner", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.forms.submitBlogLead({
      firstName: "Jane",
      lastName: "Smith",
      email: "jane@example.com",
      sourcePage: "how-interchange-rates-work",
    });

    expect(result).toEqual({ success: true });

    expect(insertBlogLead).toHaveBeenCalledOnce();
    expect(insertBlogLead).toHaveBeenCalledWith({
      name: "Jane Smith",
      email: "jane@example.com",
      sourcePage: "how-interchange-rates-work",
    });

    expect(notifyOwner).toHaveBeenCalledOnce();
    const notifyCall = vi.mocked(notifyOwner).mock.calls[0]![0];
    expect(notifyCall.title).toContain("Jane");
    expect(notifyCall.content).toContain("jane@example.com");
    expect(notifyCall.content).toContain("how-interchange-rates-work");
  });

  it("works without an optional sourcePage", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.forms.submitBlogLead({
      firstName: "Bob",
      lastName: "Jones",
      email: "bob@example.com",
    });

    expect(result).toEqual({ success: true });
    expect(insertBlogLead).toHaveBeenCalledWith({
      name: "Bob Jones",
      email: "bob@example.com",
      sourcePage: null,
    });
  });

  it("rejects an invalid email address", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.forms.submitBlogLead({ firstName: "Bad", lastName: "Actor", email: "not-an-email" })
    ).rejects.toThrow();

    expect(insertBlogLead).not.toHaveBeenCalled();
    expect(notifyOwner).not.toHaveBeenCalled();
  });

  it("rejects an empty name", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.forms.submitBlogLead({ firstName: "", email: "valid@example.com" })
    ).rejects.toThrow();

    expect(insertBlogLead).not.toHaveBeenCalled();
  });
});

/**
 * Testimonials router unit tests.
 *
 * These tests verify the public tRPC procedure logic in isolation by mocking
 * the database helpers and the owner-notification helper.
 */

import { describe, it, expect, vi, beforeEach } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

// ─── Mocks ────────────────────────────────────────────────────────────────────

vi.mock("./db", () => ({
  insertBlogLead: vi.fn().mockResolvedValue(undefined),
  insertTestimonialSubmission: vi.fn().mockResolvedValue(undefined),
  getTestimonialSubmissions: vi.fn().mockResolvedValue([]),
}));

vi.mock("./_core/notification", () => ({
  notifyOwner: vi.fn().mockResolvedValue(true),
}));

// Mock reCAPTCHA to prevent real HTTP calls during tests
vi.mock("./recaptcha", () => ({
  verifyRecaptcha: vi.fn().mockResolvedValue({ success: true, score: 0.9 }),
}));

// Mock webhook to prevent real HTTP calls during tests
vi.mock("./webhook", () => ({
  sendToWebhook: vi.fn().mockResolvedValue(undefined),
}));

import { insertTestimonialSubmission, getTestimonialSubmissions } from "./db";
import { notifyOwner } from "./_core/notification";

// ─── Context helper ─────────────────────────────────────────────────────────

function publicCtx(): TrpcContext {
  return {
    req: { protocol: "https", headers: {} } as TrpcContext["req"],
    res: { clearCookie: vi.fn() } as unknown as TrpcContext["res"],
  };
}

// ─── Tests ────────────────────────────────────────────────────────────────────

describe("testimonials.submit", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("persists a valid submission and notifies owner", async () => {
    const caller = appRouter.createCaller(publicCtx());

    const result = await caller.testimonials.submit({
      firstName: "Jane",
      lastName: "Smith",
      businessName: "Jane's Bistro",
      location: "Salt Lake City, UT",
      industry: "Restaurants",
      rating: 5,
      quote: "UBC Unlimited saved us thousands in processing fees. Highly recommend!",
      email: "jane@bistro.com",
    });

    expect(result.success).toBe(true);
    expect(insertTestimonialSubmission).toHaveBeenCalledOnce();
    expect(insertTestimonialSubmission).toHaveBeenCalledWith(
      expect.objectContaining({
        name: "Jane Smith",
        businessName: "Jane's Bistro",
        industry: "Restaurants",
        rating: 5,
      })
    );
    expect(notifyOwner).toHaveBeenCalledOnce();
    const notifyCall = vi.mocked(notifyOwner).mock.calls[0]![0];
    expect(notifyCall.title).toContain("Jane");
    expect(notifyCall.content).toContain("Restaurants");
  });

  it("rejects a submission with a quote that is too short", async () => {
    const caller = appRouter.createCaller(publicCtx());

    await expect(
      caller.testimonials.submit({
        firstName: "Bob",
        businessName: "Bob's Shop",
        location: "Provo, UT",
        industry: "Retail",
        rating: 4,
        quote: "Too short", // < 20 chars
      })
    ).rejects.toThrow();

    expect(insertTestimonialSubmission).not.toHaveBeenCalled();
  });

  it("rejects a submission with an invalid industry", async () => {
    const caller = appRouter.createCaller(publicCtx());

    await expect(
      caller.testimonials.submit({
        firstName: "Alice",
        businessName: "Alice's Place",
        location: "Ogden, UT",
        industry: "InvalidIndustry" as never,
        rating: 3,
        quote: "This is a long enough testimonial to pass the minimum length check.",
      })
    ).rejects.toThrow();

    expect(insertTestimonialSubmission).not.toHaveBeenCalled();
  });

  it("accepts a submission without an optional email", async () => {
    const caller = appRouter.createCaller(publicCtx());

    const result = await caller.testimonials.submit({
      firstName: "No Email",
      lastName: "User",
      businessName: "No Email Biz",
      location: "Layton, UT",
      industry: "Medical",
      rating: 5,
      quote: "Great service from UBC Unlimited — very professional and responsive team.",
    });

    expect(result.success).toBe(true);
    // The router converts undefined email to null before persisting
    expect(insertTestimonialSubmission).toHaveBeenCalledWith(
      expect.objectContaining({ email: null })
    );
  });
});

describe("testimonials.listApproved", () => {
  it("returns approved testimonials for public users", async () => {
    const caller = appRouter.createCaller(publicCtx());
    const result = await caller.testimonials.listApproved();
    expect(Array.isArray(result)).toBe(true);
    expect(getTestimonialSubmissions).toHaveBeenCalledWith("approved");
  });
});

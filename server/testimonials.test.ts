/**
 * Testimonials router unit tests.
 *
 * These tests verify the tRPC procedure logic in isolation by mocking the
 * database helpers and the owner-notification helper.
 */

import { describe, it, expect, vi, beforeEach } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

// ─── Mocks ────────────────────────────────────────────────────────────────────

vi.mock("./db", () => ({
  // Existing mocks (used by other routers)
  insertBlogLead: vi.fn().mockResolvedValue(undefined),
  // Testimonial mocks
  insertTestimonialSubmission: vi.fn().mockResolvedValue(undefined),
  getTestimonialSubmissions: vi.fn().mockResolvedValue([]),
  updateTestimonialStatus: vi.fn().mockResolvedValue(undefined),
}));

vi.mock("./_core/notification", () => ({
  notifyOwner: vi.fn().mockResolvedValue(true),
}));

import { insertTestimonialSubmission, getTestimonialSubmissions, updateTestimonialStatus } from "./db";
import { notifyOwner } from "./_core/notification";

// ─── Context helpers ──────────────────────────────────────────────────────────

function publicCtx(): TrpcContext {
  return {
    user: null,
    req: { protocol: "https", headers: {} } as TrpcContext["req"],
    res: { clearCookie: vi.fn() } as unknown as TrpcContext["res"],
  };
}

function adminCtx(): TrpcContext {
  return {
    user: { id: 1, openId: "owner-1", role: "admin", name: "Admin", email: null, loginMethod: null, createdAt: new Date(), updatedAt: new Date(), lastSignedIn: new Date() },
    req: { protocol: "https", headers: {} } as TrpcContext["req"],
    res: { clearCookie: vi.fn() } as unknown as TrpcContext["res"],
  };
}

function userCtx(): TrpcContext {
  return {
    user: { id: 2, openId: "user-1", role: "user", name: "User", email: null, loginMethod: null, createdAt: new Date(), updatedAt: new Date(), lastSignedIn: new Date() },
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
      name: "Jane Smith",
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
    expect(notifyCall.title).toContain("Jane Smith");
    expect(notifyCall.content).toContain("Restaurants");
  });

  it("rejects a submission with a quote that is too short", async () => {
    const caller = appRouter.createCaller(publicCtx());

    await expect(
      caller.testimonials.submit({
        name: "Bob",
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
        name: "Alice",
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
      name: "No Email User",
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

describe("testimonials.adminList", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("allows admin to list all submissions", async () => {
    const caller = appRouter.createCaller(adminCtx());
    const result = await caller.testimonials.adminList({ status: "all" });
    expect(Array.isArray(result)).toBe(true);
    expect(getTestimonialSubmissions).toHaveBeenCalledWith(undefined);
  });

  it("allows admin to filter by pending status", async () => {
    const caller = appRouter.createCaller(adminCtx());
    await caller.testimonials.adminList({ status: "pending" });
    expect(getTestimonialSubmissions).toHaveBeenCalledWith("pending");
  });

  it("rejects non-admin users", async () => {
    const caller = appRouter.createCaller(userCtx());
    await expect(caller.testimonials.adminList({ status: "all" })).rejects.toThrow();
  });

  it("rejects unauthenticated users", async () => {
    const caller = appRouter.createCaller(publicCtx());
    await expect(caller.testimonials.adminList({ status: "all" })).rejects.toThrow();
  });
});

describe("testimonials.review", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("allows admin to approve a submission", async () => {
    const caller = appRouter.createCaller(adminCtx());
    const result = await caller.testimonials.review({ id: 1, status: "approved" });
    expect(result.success).toBe(true);
    expect(updateTestimonialStatus).toHaveBeenCalledWith(1, "approved", undefined);
  });

  it("allows admin to reject a submission with notes", async () => {
    const caller = appRouter.createCaller(adminCtx());
    const result = await caller.testimonials.review({
      id: 2,
      status: "rejected",
      adminNotes: "Spam submission",
    });
    expect(result.success).toBe(true);
    expect(updateTestimonialStatus).toHaveBeenCalledWith(2, "rejected", "Spam submission");
  });

  it("rejects non-admin users", async () => {
    const caller = appRouter.createCaller(userCtx());
    await expect(caller.testimonials.review({ id: 1, status: "approved" })).rejects.toThrow();
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

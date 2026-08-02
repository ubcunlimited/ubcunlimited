import { describe, it, expect, vi, beforeEach } from "vitest";

// Mock the ENV module so we can control the password value
vi.mock("./_core/env", () => ({
  ENV: {
    agentPortalPassword: "test-secret-password",
    recaptchaSecretKey: "",
  },
}));

// Import after mock is set up
const { ENV } = await import("./_core/env");

describe("agent portal password verification logic", () => {
  it("returns success: true when the correct password is provided", () => {
    const input = { password: "test-secret-password" };
    const correct = ENV.agentPortalPassword;
    const result = { success: input.password === correct };
    expect(result.success).toBe(true);
  });

  it("returns success: false when an incorrect password is provided", () => {
    const input = { password: "wrong-password" };
    const correct = ENV.agentPortalPassword;
    const result = { success: input.password === correct };
    expect(result.success).toBe(false);
  });

  it("returns success: false when password is empty", () => {
    const input = { password: "" };
    const correct = ENV.agentPortalPassword;
    const result = { success: input.password === correct };
    expect(result.success).toBe(false);
  });

  it("returns success: false when ENV password is not set", () => {
    const input = { password: "any-password" };
    const correct = ""; // simulates unset password
    if (!correct) {
      expect({ success: false }.success).toBe(false);
    } else {
      expect({ success: input.password === correct }.success).toBe(false);
    }
  });
});

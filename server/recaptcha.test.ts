import { describe, it, expect } from "vitest";
import { ENV } from "./_core/env";

describe("reCAPTCHA configuration", () => {
  it("RECAPTCHA_SECRET_KEY is set in environment", () => {
    expect(ENV.recaptchaSecretKey).toBeTruthy();
    expect(ENV.recaptchaSecretKey.length).toBeGreaterThan(10);
  });

  it("RECAPTCHA_SECRET_KEY has expected format (starts with 6L)", () => {
    // Google reCAPTCHA keys always start with "6L"
    expect(ENV.recaptchaSecretKey.startsWith("6L")).toBe(true);
  });
});

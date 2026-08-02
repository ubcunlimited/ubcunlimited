import { describe, it, expect } from "vitest";
import { ENV } from "./_core/env";

describe("reCAPTCHA configuration", () => {
  it("uses a valid Google reCAPTCHA secret key when one is configured", () => {
    // reCAPTCHA is optional for the public site. When a key IS set it must be a
    // real Google secret key (they start with "6L" and are longer than 10 chars).
    if (ENV.recaptchaSecretKey) {
      expect(ENV.recaptchaSecretKey.length).toBeGreaterThan(10);
      expect(ENV.recaptchaSecretKey.startsWith("6L")).toBe(true);
    }
  });
});

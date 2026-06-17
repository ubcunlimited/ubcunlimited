import { describe, it, expect } from "vitest";
import "dotenv/config";

describe("SEMRUSH_API_KEY environment variable", () => {
  it("should be set in the environment", () => {
    const key = process.env.SEMRUSH_API_KEY;
    // The key is set if it's a non-empty string
    expect(typeof key).toBe("string");
    expect(key!.length).toBeGreaterThan(0);
  });
});

import { describe, expect, it } from "vitest";
import { clampSourceZoom, stepSourceZoom } from "./sourceZoom";

describe("source zoom", () => {
  it("steps by 25 percent and clamps at the supported range", () => {
    expect(stepSourceZoom(1, 1)).toBe(1.25);
    expect(stepSourceZoom(2.5, 1)).toBe(2.5);
    expect(stepSourceZoom(1, -1)).toBe(1);
    expect(stepSourceZoom(1.25, -1)).toBe(1);
  });

  it("normalizes values to two decimals inside the range", () => {
    expect(clampSourceZoom(0.2)).toBe(1);
    expect(clampSourceZoom(3)).toBe(2.5);
    expect(clampSourceZoom(1.249)).toBe(1.25);
  });
});

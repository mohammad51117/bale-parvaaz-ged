import { describe, expect, it } from "vitest";
import { mergeSourceVisuals } from "./sourceVisuals";

describe("mergeSourceVisuals", () => {
  it("keeps ordinary source pages and appends the dedicated visual page", () => {
    const ordinary = [
      { page: 12, url: "https://example.test/page-012.jpg" },
      { page: 13, url: "https://example.test/page-013.jpg" },
    ];

    expect(mergeSourceVisuals(ordinary, { page: 14, url: "https://example.test/page-014.jpg" })).toEqual([
      ...ordinary,
      { page: 14, url: "https://example.test/page-014.jpg" },
    ]);
  });

  it("does not duplicate a visual page already resolved as an ordinary source page", () => {
    const ordinary = [{ page: 14, url: "https://example.test/page-014.jpg" }];

    expect(mergeSourceVisuals(ordinary, { page: 14, url: "https://example.test/page-014.jpg" })).toEqual(ordinary);
  });

  it("does not change source pages when no visual page exists", () => {
    const ordinary = [{ page: 16, url: "https://example.test/page-016.jpg" }];

    expect(mergeSourceVisuals(ordinary, undefined)).toEqual(ordinary);
  });
});

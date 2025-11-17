

import { describe, it, expect } from "vitest";
import { normalizeCategory } from "../data/category-utils";
import { PostCategory } from "../lib/generated/prisma/enums";

describe("normalizeCategory", () => {
  it("maps music to ENTERTAINMENT", () => {
    expect(normalizeCategory("music")).toBe(PostCategory.ENTERTAINMENT);
  });

  it("maps MUSIC to ENTERTAINMENT", () => {
    expect(normalizeCategory("MUSIC")).toBe(PostCategory.ENTERTAINMENT);
  });

  it("maps informatic to TECHNOLOGY", () => {
    expect(normalizeCategory("informatic")).toBe(PostCategory.TECHNOLOGY);
  });

  it("maps TECH to TECHNOLOGY", () => {
    expect(normalizeCategory("TECH")).toBe(PostCategory.TECHNOLOGY);
  });

  it("returns ALL for unknown or empty", () => {
    expect(normalizeCategory("")).toBe(PostCategory.ALL);
    expect(normalizeCategory(undefined)).toBe(PostCategory.ALL);
    expect(normalizeCategory("unknown")).toBe(PostCategory.ALL);
  });

  it("keeps DESIGN as DESIGN", () => {
    expect(normalizeCategory("DESIGN")).toBe(PostCategory.DESIGN);
  });
});

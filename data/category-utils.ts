import { PostCategory } from "../lib/generated/prisma/enums";

export function normalizeCategory(input?: string | PostCategory): PostCategory {
  if (!input) return PostCategory.ALL;
  const s = String(input).trim().toUpperCase();
  // common aliases mapping
  if (s === "MUSIC") return PostCategory.ENTERTAINMENT;
  if (s === "INFORMATIC" || s === "INFORMATIQUE" || s === "IT" || s === "TECH")
    return PostCategory.TECHNOLOGY;
  switch (s) {
    case "TECHNOLOGY":
      return PostCategory.TECHNOLOGY;
    case "ENTERTAINMENT":
      return PostCategory.ENTERTAINMENT;
    case "DEVELOPMENT":
      return PostCategory.DEVELOPMENT;
    case "DESIGN":
      return PostCategory.DESIGN;
    case "ALL":
      return PostCategory.ALL;
    default:
      return PostCategory.ALL;
  }
}

export const CATEGORY_SLUGS = [
  "necklace",
  "bracelet",
  "ring",
  "earrings",
  "pendant",
  "bangle",
  "nosepin",
  "jhumka",
] as const;

export type CategorySlug = (typeof CATEGORY_SLUGS)[number];

const CATEGORY_SLUG_TO_NAME: Record<CategorySlug, string> = {
  necklace: "Necklace",
  bracelet: "Bracelet",
  ring: "Ring",
  earrings: "Earrings",
  pendant: "Pendant",
  bangle: "Bangle",
  nosepin: "Nose Pin",
  jhumka: "Jhumka",
};

const CATEGORY_NAME_TO_SLUG: Record<string, CategorySlug | undefined> = {
  Necklace: "necklace",
  Bracelet: "bracelet",
  Ring: "ring",
  Earrings: "earrings",
  Pendant: "pendant",
  Bangle: "bangle",
  "Nose Pin": "nosepin",
  Jhumka: "jhumka",
};

export function categoryNameToSlug(category?: string): CategorySlug | undefined {
  if (!category) return undefined;
  return CATEGORY_NAME_TO_SLUG[category];
}

export function categorySlugToName(slug: string): string | undefined {
  return CATEGORY_SLUG_TO_NAME[slug as CategorySlug];
}

export function isCategorySlug(slug: string): slug is CategorySlug {
  return slug in CATEGORY_SLUG_TO_NAME;
}

export function productPath(category?: string, slug?: string): string {
  const catSlug = categoryNameToSlug(category);
  return slug ? `/shop/${catSlug ?? "all"}/${slug}` : `/shop`;
}
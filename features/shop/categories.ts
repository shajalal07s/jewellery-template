export const CATEGORY_SLUGS = ["women", "men", "kids", "accessories"] as const;

export type CategorySlug = (typeof CATEGORY_SLUGS)[number];

const CATEGORY_SLUG_TO_NAME: Record<CategorySlug, string> = {
  women: "Women",
  men: "Men",
  kids: "Kids",
  accessories: "Accessories",
};

const CATEGORY_NAME_TO_SLUG: Record<string, CategorySlug | undefined> = {
  Women: "women",
  Men: "men",
  Kids: "kids",
  Accessories: "accessories",
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
  return slug ? `/products/${catSlug ?? "all"}/${slug}` : `/shop`;
}

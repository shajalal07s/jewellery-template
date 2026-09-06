import { products } from "@/features/shop/products";
import type { Product } from "@/types/product";

const EXTRA_GALLERY = [
  "/images/unimart/product-banner/product-banner-jwellerry-a-1.webp",
  "/images/unimart/product-banner/product-banner-jwellerry-a-2.webp",
  "/images/unimart/product-banner/product-banner-jwellerry-a-3.webp",
];

export function findProductByIdOrIndex(value: string): Product | undefined {
  const index = Number(value);
  if (Number.isInteger(index) && index >= 1) {
    return products[index - 1] ?? undefined;
  }
  return products.find((p) => p.id === value);
}

export function singleProductHref(product: Product): string {
  return `/product-single-default/${products.findIndex((p) => p.id === product.id) + 1}`;
}

export function gallerySlides(product: Product): string[] {
  return [...new Set([...(product.images.length > 0 ? product.images : []), ...EXTRA_GALLERY])];
}

export function savePercent(product: Product): number {
  if (!product.compareAtPrice || product.compareAtPrice <= product.price) return 0;
  return Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100);
}

export function similarProducts(product: Product, count = 4): Product[] {
  const sameCategory = products.filter((p) => p.category === product.category && p.id !== product.id);
  const fallback = products
    .filter((p) => p.id !== product.id && !sameCategory.includes(p))
    .sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
  return [...sameCategory, ...fallback].slice(0, count);
}

export function recommendedProducts(product: Product, count = 4): Product[] {
  return products
    .filter((p) => p.id !== product.id)
    .sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0))
    .slice(0, count);
}

export function boughtTogether(product: Product, count = 6): Product[] {
  const others = products.filter((p) => p.id !== product.id);
  return others.slice(0, count);
}
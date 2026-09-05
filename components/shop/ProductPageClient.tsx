"use client";

import { useRecentlyViewedStore } from "@/store/recentlyViewed.store";
import { products } from "@/features/shop/products";
import { useEffect, useRef } from "react";

interface ProductPageClientProps {
  productId: string;
}

export function ProductPageClient({ productId }: ProductPageClientProps) {
  const addRecent = useRecentlyViewedStore((state) => state.addRecent);
  const added = useRef(false);

  useEffect(() => {
    if (added.current) return;
    added.current = true;
    const product = products.find((p) => p.id === productId);
    if (product) {
      addRecent({
        id: product.id,
        name: product.name,
        slug: product.slug,
        price: product.price,
        compareAtPrice: product.compareAtPrice,
        images: product.images,
        stock: product.stock,
        category: product.category,
      });
    }
  }, [addRecent, productId]);

  return null;
}

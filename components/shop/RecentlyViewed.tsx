"use client";

import { useTranslations } from "next-intl";
import { Container } from "@/components/common/Container";
import { SectionHeading } from "@/components/common/SectionHeading";
import { ProductCard } from "@/components/shop/ProductCard";
import { useRecentlyViewedStore } from "@/store/recentlyViewed.store";
import { products } from "@/features/shop/products";

export function RecentlyViewed() {
  const t = useTranslations("Shop");
  const recentIds = useRecentlyViewedStore((state) => state.items);

  if (recentIds.length === 0) return null;

  const recentProducts = recentIds
    .map((item) => products.find((p) => p.id === item.id))
    .filter((p): p is NonNullable<typeof p> => Boolean(p))
    .slice(0, 4);

  if (recentProducts.length === 0) return null;

  return (
    <section className="bg-section-2 py-12">
      <Container className="flex flex-col gap-8">
        <SectionHeading title={t("recentlyViewed")} />
        <div className="grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-4">
          {recentProducts.map((item) => (
            <ProductCard key={item.id} product={item} />
          ))}
        </div>
      </Container>
    </section>
  );
}

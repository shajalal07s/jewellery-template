import { getTranslations } from "next-intl/server";
import { ChevronRight } from "lucide-react";
import { Container } from "@/components/common/Container";
import { ProductsGrid } from "@/components/sections/ProductsGrid";
import type { ProductCardVariant } from "@/components/shop/ProductCard";
import { categoryNameToSlug } from "@/features/shop/categories";
import { Link } from "@/i18n/navigation";
import type { Product } from "@/types/product";

interface ProductCollectionProps {
  namespace: string;
  products: Product[];
  bgClass?: string;
  sectionClassName?: string;
  cardVariant?: ProductCardVariant;
}

export async function ProductCollection({
  namespace,
  products,
  bgClass,
  cardVariant = "classic",
}: ProductCollectionProps) {
  const t = await getTranslations(namespace);

  const firstCategory = categoryNameToSlug(products[0]?.category);
  const seeMoreHref = firstCategory ? `/shop/${firstCategory}` : "/shop";

  return (
    <section className={bgClass ?? ""}>
      <Container className="flex flex-col gap-10 py-16">
        <div className="flex items-end justify-between gap-4">
          <div className="flex flex-col gap-1">
            <h2 className="font-heading text-3xl font-bold tracking-tight md:text-4xl">
              {t("title")}
            </h2>
            <p className="text-muted-foreground text-base">{t("subtitle")}</p>
          </div>
          <Link
            href={seeMoreHref}
            className="bg-secondary hover:bg-secondary/90 inline-flex shrink-0 items-center justify-center gap-1.5 rounded-sm px-6 py-3 text-base font-semibold tracking-wide text-white uppercase transition-colors"
          >
            {t("seeMore")}
            <ChevronRight className="size-5" aria-hidden="true" />
          </Link>
        </div>

        <ProductsGrid products={products} initialCardVariant={cardVariant} />
      </Container>
    </section>
  );
}

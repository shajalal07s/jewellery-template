import { getTranslations } from "next-intl/server";
import { Container } from "@/components/common/Container";
import { SectionHeading } from "@/components/common/SectionHeading";
import { ProductCard } from "@/components/shop/ProductCard";
import { products } from "@/features/shop/products";
import type { Product } from "@/types/product";

interface RelatedProductsProps {
  product: Product;
}

export async function RelatedProducts({ product }: RelatedProductsProps) {
  const t = await getTranslations("Shop");
  const related = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  if (related.length === 0) return null;

  return (
    <section className="py-12">
      <Container className="flex flex-col gap-8">
        <SectionHeading title={t("relatedProducts")} />
        <div className="grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-4">
          {related.map((item) => (
            <ProductCard key={item.id} product={item} />
          ))}
        </div>
      </Container>
    </section>
  );
}

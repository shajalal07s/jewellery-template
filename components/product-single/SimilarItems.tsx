import { Container } from "@/components/common/Container";
import { SectionHeader } from "@/components/product-single/SectionHeader";
import { ProductMiniCard } from "@/components/product-single/ProductMiniCard";
import { similarProducts } from "@/features/shop/singleProduct";
import { ROUTES } from "@/lib/constants";
import type { Product } from "@/types/product";

interface SimilarItemsProps {
  product: Product;
}

export function SimilarItems({ product }: SimilarItemsProps) {
  const items = similarProducts(product, 4);

  return (
    <section className="bg-section-2 py-12 md:py-16">
      <Container className="flex flex-col gap-7">
        <SectionHeader title="Similar Items" linkLabel="View All Products" linkHref={ROUTES.shop} />
        <div className="grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-4">
          {items.map((item) => (
            <ProductMiniCard key={item.id} product={item} />
          ))}
        </div>
      </Container>
    </section>
  );
}
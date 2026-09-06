import { getTranslations } from "next-intl/server";
import { Container } from "@/components/common/Container";
import { ProductCard } from "@/components/shop/ProductCard";
import { products } from "@/features/shop/products";

const DISCOVER_PRODUCTS = products.slice(0, 8);

export async function DiscoverProducts() {
  const t = await getTranslations("DiscoverProducts");

  return (
    <section className="bg-background">
      <Container className="py-10 md:py-16">
        <div className="rounded-[16px] bg-muted px-3 py-8 md:px-6 md:py-12 lg:px-12">
          <h2 className="font-heading text-center text-3xl font-bold text-foreground md:text-4xl lg:text-[42px]">
            {t("title")} <span className="font-bold">{t("titleBold")}</span>
          </h2>
          <div className="mt-8 grid grid-cols-2 gap-3 md:mt-10 md:grid-cols-4 md:gap-4">
            {DISCOVER_PRODUCTS.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
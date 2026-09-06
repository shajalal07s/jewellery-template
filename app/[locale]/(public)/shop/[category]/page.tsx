import { notFound } from "next/navigation";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Container } from "@/components/common/Container";
import { Breadcrumb } from "@/components/common/Breadcrumb";
import { ProductsGrid } from "@/components/sections/ProductsGrid";
import { ROUTES } from "@/lib/constants";
import { products } from "@/features/shop/products";
import { isCategorySlug, CATEGORY_SLUGS } from "@/features/shop/categories";

export function generateStaticParams() {
  return CATEGORY_SLUGS.map((category) => ({ category }));
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ locale: string; category: string }>;
}) {
  const { locale, category } = await params;
  setRequestLocale(locale);

  if (!isCategorySlug(category)) notFound();

  const t = await getTranslations("Shop");

  const categoryProducts = products.filter(
    (p) => p.category?.toLowerCase() === category
  );

  return (
    <>
      <div className="bg-primary/15 border-y border-primary/20">
        <Container className="flex flex-col gap-1 py-5">
          <Breadcrumb
            items={[
              { label: t("breadcrumbHome"), href: "/" },
              { label: t("title"), href: ROUTES.shop },
              { label: t(`categories.${category}`) },
            ]}
          />
        </Container>
      </div>

      <Container className="flex flex-col gap-8 py-16">
        <div className="flex flex-col gap-2">
          <h1 className="font-heading text-2xl font-semibold tracking-tight md:text-3xl">
            {t(`categories.${category}`)}
          </h1>
          <p className="text-muted-foreground">
            {t("categorySubtitle", { category: t(`categories.${category}`) })}
          </p>
          <p className="text-muted-foreground text-sm">
            {t("productsCount", { count: categoryProducts.length })}
          </p>
        </div>

        <ProductsGrid products={categoryProducts} />
      </Container>
    </>
  );
}

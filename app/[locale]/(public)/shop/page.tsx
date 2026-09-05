import { setRequestLocale, getTranslations } from "next-intl/server";
import { Container } from "@/components/common/Container";
import { Breadcrumb } from "@/components/common/Breadcrumb";
import { ProductsGrid } from "@/components/sections/ProductsGrid";
import { products } from "@/features/shop/products";

export default async function ProductsPage({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Shop");

  return (
    <>
      <div className="bg-primary/15 border-y border-primary/20">
        <Container className="flex flex-col gap-1 py-5">
          <Breadcrumb
            items={[{ label: t("breadcrumbHome"), href: "/" }, { label: t("title") }]}
          />
        </Container>
      </div>

      <Container className="flex flex-col gap-8 pt-[30px] pb-[50px]">
        <div className="flex flex-col gap-2">
          <h1 className="font-heading text-2xl font-semibold tracking-tight md:text-3xl">
            {t("title")}
          </h1>
          <p className="text-muted-foreground">{t("subtitle")}</p>
          <p className="text-muted-foreground text-sm">
            {t("productsCount", { count: products.length })}
          </p>
        </div>

        <ProductsGrid products={products} showCategoryFilter />
      </Container>
    </>
  );
}

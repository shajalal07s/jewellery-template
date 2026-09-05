import { notFound } from "next/navigation";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Container } from "@/components/common/Container";
import { Breadcrumb } from "@/components/common/Breadcrumb";
import { ProductGallery } from "@/components/shop/ProductGallery";
import { ProductInfo } from "@/components/shop/ProductInfo";
import { ProductPurchaseCard } from "@/components/shop/ProductPurchaseCard";
import { ProductTabs } from "@/components/shop/ProductTabs";
import { ProductPageClient } from "@/components/shop/ProductPageClient";
import { RelatedProducts } from "@/components/shop/RelatedProducts";
import { RecentlyViewed } from "@/components/shop/RecentlyViewed";
import { ROUTES } from "@/lib/constants";
import { products } from "@/features/shop/products";

export async function generateStaticParams() {
  return products.map((product) => ({
    category: product.category?.toLowerCase() ?? "",
    slug: product.slug,
  }));
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ locale: string; category: string; slug: string }>;
}) {
  const { locale, category, slug } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("Shop");
  const product = products.find((p) => p.slug === slug);

  if (!product || product.category?.toLowerCase() !== category) notFound();

  const qrValue = `${process.env.NEXT_PUBLIC_API_URL ?? ""}/products/${category}/${product.slug}`;

  return (
    <>
      <div className="bg-primary/15 border-y border-primary/20">
        <Container className="flex flex-col gap-1 py-5">
          <Breadcrumb
            items={[
              { label: t("breadcrumbHome"), href: "/" },
              { label: t("title"), href: ROUTES.shop },
              { label: t(`categories.${category}`) },
              { label: product.name },
            ]}
          />
        </Container>
      </div>

      <ProductPageClient productId={product.id} />

      <Container className="flex flex-col gap-10 py-10">
        <div className="grid gap-10 lg:grid-cols-[1fr_0.85fr_360px] lg:items-start">
          <ProductGallery product={product} />
          <ProductInfo product={product} qrValue={qrValue} />
          <ProductPurchaseCard product={product} />
        </div>

        <div className="border-border border-t pt-10">
          <ProductTabs product={product} />
        </div>
      </Container>

      <RelatedProducts product={product} />
      <RecentlyViewed />
    </>
  );
}

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { ChevronLeft, ChevronRight, LayoutGrid } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/common/Container";
import { Breadcrumb } from "@/components/common/Breadcrumb";
import { ProductPageClient } from "@/components/shop/ProductPageClient";
import { SingleProductGallery } from "@/components/product-single/SingleProductGallery";
import { SingleProductInfo } from "@/components/product-single/SingleProductInfo";
import { SingleProductTabs } from "@/components/product-single/SingleProductTabs";
import { SimilarItems } from "@/components/product-single/SimilarItems";
import { CompareTable } from "@/components/product-single/CompareTable";
import { ReviewVideos } from "@/components/product-single/ReviewVideos";
import { FrequentlyBoughtTogether } from "@/components/product-single/FrequentlyBoughtTogether";
import { StickyBuyBar } from "@/components/product-single/StickyBuyBar";
import { findProductByIdOrIndex, gallerySlides, singleProductHref } from "@/features/shop/singleProduct";
import { products } from "@/features/shop/products";
import { ROUTES } from "@/lib/constants";

export function generateStaticParams() {
  return products.map((_, index) => ({ id: String(index + 1) }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const product = findProductByIdOrIndex(id);
  return {
    title: product?.name ?? "Single Product",
    description: product?.description,
  };
}

export default async function ProductSingleDefaultPage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await params;
  setRequestLocale(locale);

  const product = findProductByIdOrIndex(id);
  if (!product) notFound();

  const index = products.findIndex((p) => p.id === product.id);
  const prev = products[(index - 1 + products.length) % products.length];
  const next = products[(index + 1) % products.length];
  const slides = gallerySlides(product);

  return (
    <>
      <div className="border-b border-border">
        <Container className="flex items-center justify-between gap-4 py-5">
          <Breadcrumb
            items={[
              { label: "Home", href: ROUTES.home },
              { label: "Products", href: ROUTES.shop },
              { label: product.category ?? "Shop" },
              { label: product.name },
            ]}
          />
          <div className="hidden items-center gap-2 md:flex">
            <Link
              href={singleProductHref(prev)}
              aria-label="Previous product"
              className="border-border hover:border-primary hover:text-primary flex size-10 items-center justify-center rounded-full border bg-white transition-colors"
            >
              <ChevronLeft className="size-4" aria-hidden="true" />
            </Link>
            <Link
              href={singleProductHref(next)}
              aria-label="Next product"
              className="border-border hover:border-primary hover:text-primary flex size-10 items-center justify-center rounded-full border bg-white transition-colors"
            >
              <ChevronRight className="size-4" aria-hidden="true" />
            </Link>
            <Link
              href={ROUTES.shop}
              aria-label="Back to shop"
              className="border-border hover:border-primary hover:text-primary flex size-10 items-center justify-center rounded-full border bg-white transition-colors"
            >
              <LayoutGrid className="size-4" aria-hidden="true" />
            </Link>
          </div>
        </Container>
      </div>

      <section className="py-8 md:py-10">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[7fr_5fr] lg:items-start">
            <SingleProductGallery product={product} slides={slides} />
            <SingleProductInfo product={product} />
          </div>
        </Container>
      </section>

      <section className="bg-section-2 py-12 md:py-16">
        <Container>
          <SingleProductTabs product={product} />
        </Container>
      </section>

      <ReviewVideos product={product} />
      <CompareTable product={product} />
      <SimilarItems product={product} />
      <FrequentlyBoughtTogether product={product} />

      <StickyBuyBar product={product} />
      <ProductPageClient productId={product.id} />
    </>
  );
}
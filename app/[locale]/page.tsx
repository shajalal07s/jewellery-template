import { setRequestLocale } from "next-intl/server";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileBottomBar } from "@/components/layout/MobileBottomBar";
import { Hero } from "@/components/sections/Hero";
import { DiscoverProducts } from "@/components/sections/DiscoverProducts";
import { FeaturesStrip } from "@/components/sections/FeaturesStrip";
import { PromoBanners } from "@/components/sections/PromoBanners";
import { BestItems } from "@/components/sections/BestItems";
import { VideoShowcase } from "@/components/sections/VideoShowcase";
import { BlogPosts } from "@/components/sections/BlogPosts";
import { products } from "@/features/shop/products";

const BEST_SELLERS = [...products]
  .filter((p) => p.stock > 0)
  .sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0))
  .slice(0, 8);
const TOP_RATED = [...products]
  .filter((p) => p.stock > 0)
  .sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));

export default async function Home({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Header />
      <main className="flex flex-1 flex-col pb-24 md:pb-0">
        <Hero />
        <DiscoverProducts />
        <FeaturesStrip />
        <PromoBanners />
        <BestItems products={BEST_SELLERS} variant="centered" />
        <VideoShowcase />
        <BestItems products={TOP_RATED.slice(0, 4)} variant="split" />
        <BlogPosts />
      </main>
      <Footer />
      <MobileBottomBar />
    </>
  );
}

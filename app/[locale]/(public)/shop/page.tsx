import { setRequestLocale } from "next-intl/server";
import { ShopCatalog } from "@/components/shop/ShopCatalog";

export default async function ProductsPage({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <ShopCatalog />;
}
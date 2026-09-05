import { getTranslations, setRequestLocale } from "next-intl/server";
import { Package } from "lucide-react";
import { EmptyState } from "@/components/common/EmptyState";

export default async function DashboardProductsPage({
  params,
}: PageProps<"/[locale]/dashboard/products">) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Dashboard.products");

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-semibold tracking-tight">{t("title")}</h1>
      <EmptyState icon={Package} title={t("emptyTitle")} description={t("emptyDescription")} />
    </div>
  );
}

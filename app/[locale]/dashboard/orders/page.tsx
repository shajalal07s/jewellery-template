import { getTranslations, setRequestLocale } from "next-intl/server";
import { ShoppingCart } from "lucide-react";
import { EmptyState } from "@/components/common/EmptyState";

export default async function DashboardOrdersPage({
  params,
}: PageProps<"/[locale]/dashboard/orders">) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Dashboard.orders");

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-semibold tracking-tight">{t("title")}</h1>
      <EmptyState icon={ShoppingCart} title={t("emptyTitle")} description={t("emptyDescription")} />
    </div>
  );
}

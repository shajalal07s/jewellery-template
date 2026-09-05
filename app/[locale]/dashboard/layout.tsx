import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Sidebar } from "@/components/layout/Sidebar";

export async function generateMetadata({
  params,
}: LayoutProps<"/[locale]/dashboard">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Dashboard.overview" });

  return {
    title: t("title"),
    description: t("welcome"),
  };
}

export default async function DashboardLayout({
  children,
  params,
}: LayoutProps<"/[locale]/dashboard">) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 overflow-y-auto p-6 md:p-8">{children}</main>
    </div>
  );
}

import { setRequestLocale } from "next-intl/server";
import { ThankYouView } from "@/components/checkout/ThankYouView";

export default async function ThankYouPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ order?: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const { order } = await searchParams;

  return <ThankYouView orderId={order ?? ""} />;
}

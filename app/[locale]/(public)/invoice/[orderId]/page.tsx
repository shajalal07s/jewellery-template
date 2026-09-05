import { setRequestLocale } from "next-intl/server";
import { InvoiceView } from "@/components/checkout/InvoiceView";

export default async function InvoicePage({
  params,
}: {
  params: Promise<{ locale: string; orderId: string }>;
}) {
  const { locale, orderId } = await params;
  setRequestLocale(locale);

  return <InvoiceView orderId={orderId} />;
}

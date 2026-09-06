import { Suspense } from "react";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Container } from "@/components/common/Container";
import { Breadcrumb } from "@/components/common/Breadcrumb";
import { CheckoutForm } from "@/components/checkout/CheckoutForm";
import { CheckoutSummaryClient } from "@/components/checkout/CheckoutSummaryClient";

export default async function CheckoutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("CheckoutPage");

  return (
    <>
      <div className="bg-primary/15 border-y border-primary/20 py-[30px] backdrop-blur-[50px]">
        <Container>
          <Breadcrumb
            items={[{ label: t("breadcrumbCart"), href: "/cart" }, { label: t("title") }]}
          />
        </Container>
      </div>
      <Container className="flex flex-col gap-8 py-[30px] lg:py-16">
        <h1 className="font-heading text-3xl font-semibold tracking-tight">{t("title")}</h1>

        <div className="grid gap-8 lg:grid-cols-[1fr_400px]">
          <CheckoutForm />
          <div className="lg:order-last">
            <Suspense fallback={null}>
              <CheckoutSummaryClient />
            </Suspense>
          </div>
        </div>
      </Container>
    </>
  );
}

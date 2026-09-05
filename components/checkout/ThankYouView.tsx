"use client";

import { useFormatter, useTranslations } from "next-intl";
import { PackageCheck, Printer } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { useOrderStore } from "@/store/order.store";
import { EmptyState } from "@/components/common/EmptyState";
import { Container } from "@/components/common/Container";
import { Button } from "@/components/ui/button";

export function ThankYouView({ orderId }: { orderId: string }) {
  const t = useTranslations("ThankYouPage");
  const format = useFormatter();
  const order = useOrderStore((state) => state.orders.find((o) => o.id === orderId));

  if (!order) {
    return (
      <Container className="flex min-h-[60vh] flex-col items-center justify-center py-16">
        <EmptyState
          icon={PackageCheck}
          title={t("notFound")}
          description={t("notFoundDescription")}
          action={
            <Link href="/shop" className="mt-2">
              <Button variant="outline" size="sm">
                {t("continueShopping")}
              </Button>
            </Link>
          }
        />
      </Container>
    );
  }

  return (
    <Container className="flex max-w-2xl flex-col items-center gap-8 py-20 text-center">
      <div className="bg-secondary/10 text-secondary flex size-20 items-center justify-center rounded-full">
        <PackageCheck className="size-10" aria-hidden="true" />
      </div>

      <div className="flex flex-col items-center gap-2">
        <h1 className="font-heading text-3xl font-bold tracking-tight">{t("title")}</h1>
        <p className="text-muted-foreground max-w-md">
          {t("subtitle")}
        </p>
      </div>

      <div className="w-full rounded-2xl border bg-white p-6 text-left shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-dashed pb-4">
          <div>
            <p className="text-muted-foreground text-xs uppercase tracking-wide">{t("orderNumber")}</p>
            <p className="font-heading text-lg font-bold">{order.id}</p>
          </div>
          <div className="text-right">
            <p className="text-muted-foreground text-xs uppercase tracking-wide">{t("date")}</p>
            <p className="text-sm font-medium">{format.dateTime(new Date(order.createdAt), { dateStyle: "long" })}</p>
          </div>
        </div>

        <dl className="mt-4 grid grid-cols-2 gap-y-4 text-sm sm:grid-cols-4">
          <div>
            <dt className="text-muted-foreground text-xs">{t("items")}</dt>
            <dd className="mt-0.5 font-semibold">
              {order.items.reduce((n, it) => n + it.quantity, 0)}
            </dd>
          </div>
          <div>
            <dt className="text-muted-foreground text-xs">{t("total")}</dt>
            <dd className="text-secondary mt-0.5 font-bold">
              {format.number(order.total, { style: "currency", currency: "BDT" })}
            </dd>
          </div>
          <div>
            <dt className="text-muted-foreground text-xs">{t("payment")}</dt>
            <dd className="mt-0.5 font-semibold">{t(`paymentLabel.${order.payment}`)}</dd>
          </div>
          <div>
            <dt className="text-muted-foreground text-xs">{t("status")}</dt>
            <dd className="mt-0.5 font-semibold">{t(`statusLabel.${order.status}`)}</dd>
          </div>
        </dl>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3">
        <Link href={`/invoice/${order.id}`}>
          <Button size="lg" className="gap-2 py-6 text-base">
            <Printer className="size-4" aria-hidden="true" />
            {t("viewInvoice")}
          </Button>
        </Link>
        <Link href="/shop">
          <Button variant="outline" size="lg" className="py-6 text-base">
            {t("continueShopping")}
          </Button>
        </Link>
      </div>
    </Container>
  );
}

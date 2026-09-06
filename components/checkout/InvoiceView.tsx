"use client";

import Image from "next/image";
import { useFormatter, useTranslations } from "next-intl";
import { ArrowLeft, FileText, PackageX, Printer } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { useOrderStore, type Order } from "@/store/order.store";
import { Container } from "@/components/common/Container";
import { Button } from "@/components/ui/button";

interface InvoiceViewProps {
  orderId: string;
}

export function InvoiceView({ orderId }: InvoiceViewProps) {
  const t = useTranslations("InvoicePage");
  const order = useOrderStore((state) => state.orders.find((o) => o.id === orderId));

  if (!order) {
    return (
      <Container className="flex min-h-[65vh] flex-col items-center justify-center py-16">
        <div className="border-primary/25 flex w-full max-w-lg flex-col items-center gap-6 rounded-[10px] border bg-white px-8 py-14 text-center">
          <span className="bg-primary/10 flex size-16 items-center justify-center rounded-full">
            <PackageX className="text-secondary size-8" aria-hidden="true" />
          </span>
          <div className="flex flex-col items-center gap-2.5">
            <h1 className="font-heading text-secondary text-2xl font-bold tracking-tight sm:text-3xl">
              {t("notFound")}
            </h1>
            <p className="text-muted-foreground max-w-sm text-sm leading-relaxed">
              {t("notFoundDescription")}
            </p>
          </div>
          <span className="bg-primary/20 h-px w-24" aria-hidden="true" />
          <Link href="/shop">
            <Button className="border-primary/60 h-11 rounded-full border-2 px-8">
              {t("backToShop")}
            </Button>
          </Link>
        </div>
      </Container>
    );
  }

  return <InvoiceDocument order={order} />;
}

function InvoiceDocument({ order }: { order: Order }) {
  const t = useTranslations("InvoicePage");
  const format = useFormatter();
  const money = (value: number) => format.number(value, { style: "currency", currency: "BDT" });
  const date = format.dateTime(new Date(order.createdAt), { dateStyle: "long" });

  return (
    <Container className="py-10">
      <div className="mb-10 hidden justify-end print:hidden md:flex">
        <Button onClick={() => window.print()} className="gap-2">
          <Printer className="size-4" aria-hidden="true" />
          {t("print")}
        </Button>
      </div>

      <div className="print-area mx-auto max-w-4xl">
        <div className="bg-white shadow-sm ring-1 ring-border">
          <div className="relative overflow-hidden border-b border-border bg-section-2 p-8 print:bg-white">
            <div className="bg-secondary/20 absolute -top-16 -right-16 size-48 rounded-full" aria-hidden="true" />
            <div className="relative flex flex-wrap items-start justify-between gap-6">
              <div>
                <p className="font-heading text-2xl font-bold tracking-tight">Fashion Store</p>
                <p className="text-muted-foreground mt-1 max-w-xs text-sm">
                  {t("brandTagline")}
                </p>
                <p className="text-muted-foreground mt-3 text-sm leading-relaxed">
                  {t("brandAddress")}
                </p>
              </div>
              <div className="text-left md:text-right">
                <div className="inline-flex items-center gap-2 rounded-full border bg-white px-4 py-1.5">
                  <FileText className="text-secondary size-4" aria-hidden="true" />
                  <span className="text-sm font-semibold uppercase tracking-wider">{t("invoice")}</span>
                </div>
                <p className="mt-3 text-sm">
                  <span className="text-muted-foreground">{t("number")}: </span>
                  <span className="font-semibold">{order.id}</span>
                </p>
                <p className="text-sm">
                  <span className="text-muted-foreground">{t("date")}: </span>
                  <span className="font-medium">{date}</span>
                </p>
                <p className="text-sm">
                  <span className="text-muted-foreground">{t("status")}: </span>
                  <span className="inline-flex items-center gap-1.5 font-semibold text-green-700">
                    <span className="bg-green-600 size-1.5 rounded-full" aria-hidden="true" />
                    {t(`status.${order.status}`)}
                  </span>
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-8 p-8 sm:grid-cols-2">
            <div>
              <p className="text-muted-foreground text-xs font-bold uppercase tracking-wider">
                {t("billedTo")}
              </p>
              <div className="mt-2 text-sm leading-relaxed">
                <p className="font-semibold">{order.customer.fullName}</p>
                <p className="text-muted-foreground">{order.customer.address}</p>
                <p className="text-muted-foreground">
                  {order.customer.city}
                  {order.customer.postalCode ? `, ${order.customer.postalCode}` : ""}
                </p>
                <p className="text-muted-foreground">{order.customer.phone}</p>
                <p className="text-muted-foreground">{order.customer.email}</p>
              </div>
            </div>
            <div className="sm:text-right">
              <p className="text-muted-foreground text-xs font-bold uppercase tracking-wider">
                {t("paymentMethod")}
              </p>
              <p className="mt-2 text-sm font-semibold">{t(`payment.${order.payment}`)}</p>
              <p className="text-muted-foreground mt-1 text-sm">{t(`delivery.${order.shipping.id}`)}</p>
            </div>
          </div>

          <div className="px-8 pb-8">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b border-border text-left">
                  <th className="pb-3 font-bold w-[40%]">{t("table.product")}</th>
                  <th className="pb-3 font-bold">{t("table.price")}</th>
                  <th className="pb-3 font-bold">{t("table.qty")}</th>
                  <th className="pb-3 text-right font-bold">{t("table.total")}</th>
                </tr>
              </thead>
              <tbody>
                {order.items.map((item) => (
                  <tr key={item.product.id} className="border-b border-border/60">
                    <td className="py-3">
                      <div className="flex items-center gap-3">
                        <span className="bg-muted flex size-11 shrink-0 items-center justify-center overflow-hidden rounded-md">
                          {item.product.images[0] ? (
                            <Image
                              src={item.product.images[0]}
                              alt={item.product.name}
                              width={44}
                              height={44}
                              className="size-full object-cover"
                              unoptimized
                            />
                          ) : null}
                        </span>
                        <span className="font-medium">{item.product.name}</span>
                      </div>
                    </td>
                    <td className="text-muted-foreground py-3">{money(item.price)}</td>
                    <td className="py-3">{item.quantity}</td>
                    <td className="py-3 text-right font-semibold">{money(item.price * item.quantity)}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="mt-6 flex justify-end">
              <div className="w-full max-w-xs space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{t("subtotal")}</span>
                  <span>{money(order.subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{t("shipping")}</span>
                  <span>{order.shippingCost === 0 ? t("free") : money(order.shippingCost)}</span>
                </div>
                <div className="bg-section-2 flex justify-between rounded-lg px-3 py-3 font-heading text-base font-bold">
                  <span>{t("total")}</span>
                  <span className="text-secondary">{money(order.total)}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-border px-8 py-5 text-center">
            <p className="text-muted-foreground text-xs">{t("thankYouNote")}</p>
          </div>
        </div>

        <div className="mt-6 flex justify-center print:hidden">
          <Link href="/shop">
            <Button variant="ghost" className="gap-2">
              <ArrowLeft className="size-4" aria-hidden="true" />
              {t("backToShop")}
            </Button>
          </Link>
        </div>
      </div>
    </Container>
  );
}

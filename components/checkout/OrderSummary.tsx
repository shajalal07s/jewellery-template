"use client";

import Image from "next/image";
import { useFormatter, useTranslations } from "next-intl";
import { ShoppingBag } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { ProductListItem } from "@/types/product";

interface SummaryLineItem {
  product: ProductListItem;
  quantity: number;
  price?: number;
}

interface OrderSummaryProps {
  items: SummaryLineItem[];
  subtotal: number;
  shippingCost?: number;
  showItems?: boolean;
  title?: string;
  className?: string;
}

export function OrderSummary({
  items,
  subtotal,
  shippingCost = 0,
  showItems = true,
  title,
  className,
}: OrderSummaryProps) {
  const t = useTranslations("CartPage");
  const format = useFormatter();

  const money = (value: number) =>
    format.number(value, { style: "currency", currency: "BDT" });

  const productCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>{title ?? t("summaryTitle")}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4 p-5">
        {showItems && (
          <div className="flex max-h-72 flex-col gap-3 overflow-y-auto pr-1">
            {items.map((item) => (
              <div key={item.product.id} className="flex items-center gap-3">
                <span className="bg-muted relative flex size-14 shrink-0 items-center justify-center overflow-hidden rounded-lg">
                  {item.product.images[0] ? (
                    <Image
                      src={item.product.images[0]}
                      alt={item.product.name}
                      width={56}
                      height={56}
                      className="size-full object-cover"
                      unoptimized
                    />
                  ) : (
                    <ShoppingBag className="text-muted-foreground size-4" aria-hidden="true" />
                  )}
                  <span className="bg-primary text-primary-foreground absolute -top-1 -right-1 flex size-5 items-center justify-center rounded-full text-[10px] font-bold">
                    {item.quantity}
                  </span>
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">{item.product.name}</p>
                  <p className="text-muted-foreground text-xs">{money(item.price ?? item.product.price)} × {item.quantity}</p>
                </div>
                <span className="text-sm font-semibold">{money((item.price ?? item.product.price) * item.quantity)}</span>
              </div>
            ))}
          </div>
        )}

        {showItems && <div className="border-border border-t" />}

        <div className="flex flex-col gap-2 text-sm">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">
              {t("itemCount", { count: productCount })}
            </span>
            <span>{money(subtotal)}</span>
          </div>
          {shippingCost > 0 && (
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">{t("shipping")}</span>
              <span>{money(shippingCost)}</span>
            </div>
          )}
        </div>

        <div className="border-border border-t" />

        <div className="flex items-center justify-between">
          <span className="font-heading text-base font-semibold">{t("total")}</span>
          <span className="text-secondary font-heading text-xl font-bold">
            {money(subtotal + shippingCost)}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}

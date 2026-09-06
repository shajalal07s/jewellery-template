"use client";

import Image from "next/image";
import { useFormatter, useTranslations } from "next-intl";
import { ShoppingBag } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
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
    <Card className={cn("border-primary/25 rounded-[10px] border bg-white pt-0", className)}>
      <div className="border-primary/15 flex items-center justify-between rounded-t-[10px] border-b bg-primary/[0.05] px-5 py-4">
        <div className="flex items-center gap-3">
          <span className="bg-primary/10 flex size-9 shrink-0 items-center justify-center rounded-full">
            <ShoppingBag className="text-secondary size-4" aria-hidden="true" />
          </span>
          <CardTitle className="font-sans text-black text-lg font-semibold">
            {title ?? t("summaryTitle")}
          </CardTitle>
        </div>
      </div>
      <CardContent className="flex flex-col gap-4 p-5">
        {showItems && (
          <div className="bg-primary/[0.03] flex max-h-72 flex-col gap-3 overflow-y-auto rounded-[5px] p-3 pr-1.5">
            {items.map((item) => (
              <div key={item.product.id} className="flex items-center gap-3">
                <span className="relative block shrink-0">
                  <span className="bg-muted flex size-14 items-center justify-center overflow-hidden rounded-[5px]">
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
                  </span>
                  <span className="bg-primary text-primary-foreground absolute top-0 right-0 z-20 flex size-6 min-w-6 items-center justify-center rounded-full px-1 text-xs font-bold shadow-md">
                    {item.quantity}
                  </span>
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-sans text-sm font-medium">{item.product.name}</p>
                  <p className="text-muted-foreground text-xs">{money(item.price ?? item.product.price)} × {item.quantity}</p>
                </div>
                <span className="text-secondary text-sm font-semibold">{money((item.price ?? item.product.price) * item.quantity)}</span>
              </div>
            ))}
          </div>
        )}

        {showItems && <div className="border-primary/15 border-t" />}

        <div className="bg-secondary/10 flex flex-col gap-2 rounded-[5px] p-3 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">
                {t("itemCount", { count: productCount })}
              </span>
              <span className="font-medium">{money(subtotal)}</span>
            </div>
            {shippingCost > 0 && (
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">{t("shipping")}</span>
                <span className="font-medium">{money(shippingCost)}</span>
              </div>
            )}
          </div>

        <div className="border-primary/15 border-t" />

        <div className="flex items-center justify-between">
          <span className="font-sans text-base font-semibold">{t("total")}</span>
          <span className="text-secondary font-sans text-xl font-bold">
            {money(subtotal + shippingCost)}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}

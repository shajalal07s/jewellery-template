"use client";

import Image from "next/image";
import { useFormatter, useTranslations } from "next-intl";
import { Minus, Plus, ShoppingBag, Trash2, Truck } from "lucide-react";
import { EmptyState } from "@/components/common/EmptyState";
import { Container } from "@/components/common/Container";
import { Card, CardContent } from "@/components/ui/card";
import { Button, buttonVariants } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { useCartStore } from "@/store/cart.store";
import { FREE_SHIPPING_THRESHOLD, STANDARD_SHIPPING_COST } from "@/store/order.store";
import { productPath } from "@/features/shop/categories";
import { cn } from "@/lib/utils";

export default function CartPage() {
  const t = useTranslations("CartPage");
  const format = useFormatter();
  const items = useCartStore((state) => state.items);
  const removeItem = useCartStore((state) => state.removeItem);
  const updateQuantity = useCartStore((state) => state.updateQuantity);

  const money = (value: number) => format.number(value, { style: "currency", currency: "BDT" });

  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const productCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const shippingCost = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : STANDARD_SHIPPING_COST;
  const total = subtotal + shippingCost;

  const freeProgress = Math.min(subtotal / FREE_SHIPPING_THRESHOLD, 1);

  return (
    <Container className="flex flex-col gap-8 py-16">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-heading text-3xl font-semibold tracking-tight">{t("title")}</h1>
          <p className="text-muted-foreground mt-1 text-sm">
            {t("itemCount", { count: productCount })}
          </p>
        </div>
      </div>

      {items.length === 0 ? (
        <EmptyState
          icon={ShoppingBag}
          title={t("emptyTitle")}
          description={t("emptyDescription")}
          action={
            <Link href="/shop" className={cn(buttonVariants({ size: "sm" }), "mt-2")}>
              {t("browseProducts")}
            </Link>
          }
        />
      ) : (
        <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
          <div className="flex flex-col gap-4">
            <Card className="bg-section-2 border-primary/20">
              <CardContent className="flex flex-col gap-2 p-4">
                <div className="flex items-center gap-2 text-sm font-medium">
                  <Truck className="text-secondary size-4" aria-hidden="true" />
                  {subtotal >= FREE_SHIPPING_THRESHOLD
                    ? t("freeShippingEarned")
                    : t("freeShippingRemaining", {
                        amount: money(FREE_SHIPPING_THRESHOLD - subtotal),
                      })}
                </div>
                <div className="bg-primary/15 h-2.5 w-full overflow-hidden rounded-full">
                  <div
                    className="bg-secondary h-full rounded-full transition-all duration-500"
                    style={{ width: `${freeProgress * 100}%` }}
                  />
                </div>
              </CardContent>
            </Card>

            {items.map((item) => (
              <Card key={item.product.id}>
                <CardContent className="flex flex-wrap items-center gap-4 p-4 sm:flex-nowrap">
                  <Link href={productPath(item.product.category, item.product.slug)} className="shrink-0">
                    <span className="bg-muted flex size-24 items-center justify-center overflow-hidden rounded-lg">
                      {item.product.images[0] ? (
                        <Image
                          src={item.product.images[0]}
                          alt={item.product.name}
                          width={96}
                          height={96}
                          className="size-full object-cover"
                          unoptimized
                        />
                      ) : (
                        <ShoppingBag className="text-muted-foreground size-6" aria-hidden="true" />
                      )}
                    </span>
                  </Link>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <Link
                          href={productPath(item.product.category, item.product.slug)}
                          className="text-foreground line-clamp-1 text-base font-medium hover:underline"
                        >
                          {item.product.name}
                        </Link>
                        <p className="text-secondary mt-0.5 text-base font-semibold">
                          {money(item.product.price)}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeItem(item.product.id)}
                        aria-label={t("remove")}
                        className="hover:bg-destructive/10 hover:text-destructive text-muted-foreground flex size-8 shrink-0 items-center justify-center rounded-md transition-colors"
                      >
                        <Trash2 className="size-4" aria-hidden="true" />
                      </button>
                    </div>
                    <div className="mt-3 flex items-center gap-2">
                      <div className="flex items-center gap-1 rounded-lg border">
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          aria-label={`${t("remove")} ${item.product.name}`}
                        >
                          <Minus className="size-3.5" aria-hidden="true" />
                        </Button>
                        <span className="w-8 text-center text-sm font-semibold">{item.quantity}</span>
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          aria-label={t("addItem", { name: item.product.name })}
                        >
                          <Plus className="size-3.5" aria-hidden="true" />
                        </Button>
                      </div>
                      <span className="text-muted-foreground ml-auto text-sm font-semibold">
                        {money(item.product.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            <div className="flex items-center justify-between">
              <Link
                href="/shop"
                className="text-muted-foreground hover:text-secondary text-sm font-medium underline-offset-4 hover:underline"
              >
                {t("continueShopping")}
              </Link>
            </div>
          </div>

          <div className="lg:sticky lg:top-24">
            <Card>
              <CardContent className="flex flex-col gap-4 p-6">
                <h2 className="font-heading text-lg font-semibold">{t("summaryTitle")}</h2>
                <div className="flex flex-col gap-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">{t("subtotal")}</span>
                    <span className="font-medium">{money(subtotal)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">{t("shipping")}</span>
                    <span className="font-medium">
                      {shippingCost === 0 ? (
                        <span className="text-secondary font-semibold">{t("free")}</span>
                      ) : (
                        money(shippingCost)
                      )}
                    </span>
                  </div>
                  <div className="border-border border-t pt-3" />
                  <div className="flex items-center justify-between">
                    <span className="font-heading text-base font-semibold">{t("total")}</span>
                    <span className="text-secondary font-heading text-xl font-bold">{money(total)}</span>
                  </div>
                </div>
                <p className="text-muted-foreground text-xs">{t("taxNote")}</p>
                <Link href="/checkout" className="w-full">
                  <Button className="w-full gap-2 py-6 text-base">
                    <ShoppingBag className="size-4" aria-hidden="true" />
                    {t("checkout")}
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </Container>
  );
}

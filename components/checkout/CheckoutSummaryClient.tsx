"use client";

import { useFormatter, useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";
import { FREE_SHIPPING_THRESHOLD, STANDARD_SHIPPING_COST } from "@/store/order.store";
import { useCartStore } from "@/store/cart.store";
import { OrderSummary } from "@/components/checkout/OrderSummary";
import { Button } from "@/components/ui/button";

export function CheckoutSummaryClient() {
  const t = useTranslations("CheckoutPage");
  const cart = useTranslations("CartPage");
  const format = useFormatter();
  const items = useCartStore((state) => state.items);

  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const shippingCost =
    subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : STANDARD_SHIPPING_COST;
  const total = subtotal + shippingCost;

  const money = (value: number) => format.number(value, { style: "currency", currency: "BDT" });

  return (
    <div className="flex flex-col gap-4 lg:sticky lg:top-24">
      <OrderSummary items={items} subtotal={subtotal} shippingCost={shippingCost} />
      <Button
        type="submit"
        form="checkout-form"
        size="lg"
        className="border-primary/60 h-12 w-full gap-2 rounded-full border-2 text-base"
        disabled={items.length === 0}
      >
        <ArrowRight className="size-4" aria-hidden="true" />
        {t("placeOrder", { total: money(total) })}
      </Button>
      <p className="text-muted-foreground mt-2 text-center text-xs">{cart("secureCheckout")}</p>
    </div>
  );
}

"use client";

import { useTranslations } from "next-intl";
import { FREE_SHIPPING_THRESHOLD, STANDARD_SHIPPING_COST } from "@/store/order.store";
import { useCartStore } from "@/store/cart.store";
import { OrderSummary } from "@/components/checkout/OrderSummary";

export function CheckoutSummaryClient() {
  const t = useTranslations("CheckoutPage");
  const items = useCartStore((state) => state.items);

  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const shippingCost =
    subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : STANDARD_SHIPPING_COST;

  return (
    <div className="flex flex-col gap-4 lg:sticky lg:top-24">
      <OrderSummary items={items} subtotal={subtotal} shippingCost={shippingCost} />
      {subtotal < FREE_SHIPPING_THRESHOLD ? (
        <p className="text-muted-foreground text-xs">
          {t("shipMore", {
            remaining: (FREE_SHIPPING_THRESHOLD - subtotal).toLocaleString(),
          })}
        </p>
      ) : null}
    </div>
  );
}

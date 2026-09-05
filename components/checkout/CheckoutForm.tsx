"use client";

import { useFormatter, useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState, useTransition } from "react";
import { ArrowRight, Loader2, ShieldCheck, Truck } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { CheckoutSectionHeader } from "@/components/checkout/CheckoutSectionHeader";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import {
  FREE_SHIPPING_THRESHOLD,
  generateOrderId,
  SHIPPING_METHODS,
  STANDARD_SHIPPING_COST,
  useOrderStore,
  type PaymentMethod,
} from "@/store/order.store";
import { useCartStore } from "@/store/cart.store";

const formSchema = z.object({
  fullName: z.string().min(2, "min"),
  email: z.string().email("email"),
  phone: z.string().min(10, "min"),
  address: z.string().min(5, "min"),
  city: z.string().min(2, "min"),
  postalCode: z.string().optional(),
  notes: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export function CheckoutForm() {
  const t = useTranslations("CheckoutPage");
  const cart = useTranslations("CartPage");
  const format = useFormatter();
  const router = useRouter();

  const items = useCartStore((state) => state.items);
  const clearCart = useCartStore((state) => state.clearCart);
  const placeOrder = useOrderStore((state) => state.placeOrder);

  const [payment, setPayment] = useState<PaymentMethod>("cod");
  const [shippingId, setShippingId] = useState("standard");
  const [isPending, startTransition] = useTransition();

  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const standardFree = subtotal >= FREE_SHIPPING_THRESHOLD;
  const selectedShipping = SHIPPING_METHODS.find((s) => s.id === shippingId) ?? SHIPPING_METHODS[0];
  const shippingCost = shippingId === "standard" && standardFree ? 0 : selectedShipping.cost;
  const total = subtotal + shippingCost;

  const money = (value: number) => format.number(value, { style: "currency", currency: "BDT" });

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      postalCode: "",
      notes: "",
    },
  });

  function onSubmit(values: FormValues) {
    if (items.length === 0) return;

    startTransition(() => {
      const orderId = generateOrderId();
      placeOrder({
        id: orderId,
        items: items.map((item) => ({
          product: item.product,
          quantity: item.quantity,
          price: item.product.price,
        })),
        customer: {
          fullName: values.fullName,
          email: values.email,
          phone: values.phone,
          address: values.address,
          city: values.city,
          postalCode: values.postalCode ?? "",
          notes: values.notes ?? "",
        },
        shipping: { ...selectedShipping, cost: shippingCost },
        payment,
        subtotal,
        shippingCost,
        total,
        status: "processing",
        createdAt: new Date().toISOString(),
      });
      clearCart();
      router.push({ pathname: "/thank-you", query: { order: orderId } });
    });
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6">
      <Form {...form}>
        <Card>
          <CheckoutSectionHeader title={t("contactTitle")} description={t("contactDescription")} />
          <CardContent className="grid gap-4 p-5 sm:grid-cols-2">
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem className="sm:col-span-2">
                  <FormLabel>{t("fullName")}</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("email")}</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="you@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("phone")}</FormLabel>
                  <FormControl>
                    <Input type="tel" placeholder="01XXXXXXXXX" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <Card>
          <CheckoutSectionHeader title={t("shippingTitle")} description={t("shippingDescription")} />
          <CardContent className="grid gap-4 p-5 sm:grid-cols-2">
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem className="sm:col-span-2">
                  <FormLabel>{t("address")}</FormLabel>
                  <FormControl>
                    <Textarea rows={3} placeholder={t("addressPlaceholder")} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("city")}</FormLabel>
                  <FormControl>
                    <Input placeholder={t("cityPlaceholder")} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="postalCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("postalCode")}</FormLabel>
                  <FormControl>
                    <Input placeholder="1212" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem className="sm:col-span-2">
                  <FormLabel>{t("notes")}</FormLabel>
                  <FormControl>
                    <Textarea rows={2} placeholder={t("notesPlaceholder")} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <Card>
          <CheckoutSectionHeader title={t("deliveryTitle")} />
          <CardContent className="p-5">
            <RadioGroup value={shippingId} onValueChange={setShippingId} className="grid gap-3 sm:grid-cols-2">
              {SHIPPING_METHODS.map((method) => {
                const isFree = method.id === "standard" && standardFree;
                return (
                  <label
                    key={method.id}
                    className="flex cursor-pointer items-start gap-3 rounded-lg border p-4 has-data-[state=checked]:border-secondary has-data-[state=checked]:ring-1 has-data-[state=checked]:ring-secondary/40"
                  >
                    <RadioGroupItem value={method.id} className="mt-0.5" />
                    <div className="flex flex-1 flex-col gap-0.5">
                      <span className="flex items-center gap-1.5 text-sm font-semibold">
                        <Truck className="text-secondary size-4" aria-hidden="true" />
                        {t(`delivery.${method.id}`)}
                      </span>
                      <span className="text-muted-foreground text-xs">{t(`eta.${method.id}`)}</span>
                    </div>
                    <span className="text-sm font-semibold">
                      {isFree ? t("free") : money(method.cost)}
                    </span>
                  </label>
                );
              })}
            </RadioGroup>
            {standardFree && (
              <p className="text-secondary mt-3 flex items-center gap-1.5 text-sm">
                <ShieldCheck className="size-4" aria-hidden="true" />
                {t("freeShippingNote", { amount: money(STANDARD_SHIPPING_COST) })}
              </p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CheckoutSectionHeader title={t("paymentTitle")} />
          <CardContent className="p-5">
            <RadioGroup value={payment} onValueChange={(v) => setPayment(v as PaymentMethod)} className="grid gap-3 sm:grid-cols-2">
              {(["cod", "bkash"] as PaymentMethod[]).map((method) => (
                <label
                  key={method}
                  className="flex cursor-pointer items-start gap-3 rounded-lg border p-4 has-data-[state=checked]:border-secondary has-data-[state=checked]:ring-1 has-data-[state=checked]:ring-secondary/40"
                >
                  <RadioGroupItem value={method} className="mt-0.5" />
                  <div className="flex flex-col gap-0.5">
                    <span className="text-sm font-semibold">{t(`payment.${method}`)}</span>
                    <span className="text-muted-foreground text-xs">{t(`paymentDesc.${method}`)}</span>
                  </div>
                </label>
              ))}
            </RadioGroup>
          </CardContent>
        </Card>

        <Button type="submit" size="lg" className="w-full gap-2 py-6 text-base" disabled={isPending || items.length === 0}>
          {isPending ? (
            <Loader2 className="size-4 animate-spin" aria-hidden="true" />
          ) : (
            <ArrowRight className="size-4" aria-hidden="true" />
          )}
          {t("placeOrder", { total: money(total) })}
        </Button>
        <p className="text-muted-foreground -mt-2 text-center text-xs">{cart("secureCheckout")}</p>
      </Form>
    </form>
  );
}

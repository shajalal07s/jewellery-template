"use client";

import { useFormatter, useTranslations } from "next-intl";
import {
  ShoppingBag,
  Zap,
  Minus,
  Plus,
  ShieldCheck,
  Check,
  BadgeCheck,
  Truck,
  MessageCircle,
  ChevronRight,
} from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cart.store";
import { useRouter } from "@/i18n/navigation";
import { productPath } from "@/features/shop/categories";
import { useCallback, useState } from "react";
import type { Product } from "@/types/product";

interface ProductPurchaseCardProps {
  product: Product;
}

const WHATSAPP_NUMBER = "8801712345678";
const MESSENGER_URL = "https://m.me/example";

export function ProductPurchaseCard({ product }: ProductPurchaseCardProps) {
  const t = useTranslations("Shop");
  const format = useFormatter();
  const router = useRouter();
  const addItem = useCartStore((state) => state.addItem);
  const [quantity, setQuantity] = useState(1);
  const [justAdded, setJustAdded] = useState(false);

  const handleChangeQuantity = useCallback((delta: number) => {
    setQuantity((q) => Math.max(1, q + delta));
  }, []);

  const handleAddToCart = useCallback(() => {
    for (let i = 0; i < quantity; i++) addItem(product);
    setJustAdded(true);
    window.setTimeout(() => setJustAdded(false), 1200);
    toast.custom(
      () => (
        <div
          className="flex w-full cursor-pointer items-center gap-3 p-3"
          role="button"
          tabIndex={0}
          onClick={() => {
            toast.dismiss();
            router.push("/cart");
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              toast.dismiss();
              router.push("/cart");
            }
          }}
        >
          <div className="border-primary/30 relative size-14 shrink-0 overflow-hidden rounded-full border-2 bg-white shadow-[0_4px_12px_rgba(201,168,106,0.25)] ring-2 ring-primary/15">
            {product.images[0] ? (
              <Image
                src={product.images[0]}
                alt=""
                fill
                sizes="56px"
                className="object-cover object-center"
              />
            ) : (
              <span className="flex h-full w-full items-center justify-center text-lg font-bold text-primary">
                {product.name[0]}
              </span>
            )}
          </div>
          <div className="flex min-w-0 flex-1 flex-col gap-1">
            <span className="flex items-center gap-1.5">
              <span className="bg-emerald-500 flex size-4 shrink-0 items-center justify-center rounded-full text-white">
                <Check className="size-2.5" strokeWidth={4} aria-hidden="true" />
              </span>
              <span className="text-emerald-600 text-[10px] font-bold tracking-[0.16em] uppercase">
                {t("addedToCart")}
              </span>
            </span>
            <span className="text-black truncate text-sm leading-tight font-semibold">
              {product.name}
            </span>
            <span className="text-black/70 text-xs">
              {format.number(product.price * quantity, {
                style: "currency",
                currency: "BDT",
              })}
              <span className="mx-1">·</span>
              {quantity} {t("items")}
            </span>
          </div>
          <span className="bg-primary/10 text-primary flex size-9 shrink-0 items-center justify-center rounded-full transition-colors hover:bg-primary/20">
            <ChevronRight className="size-4" strokeWidth={2.5} aria-hidden="true" />
          </span>
        </div>
      ),
      {
        position: "top-center",
        duration: 4000,
        style: {
          "--normal-bg": "#ffffff",
          "--normal-text": "#000000",
          "--normal-padding": "0px",
          zIndex: 999999999,
          background: "#ffffff",
          color: "#000000",
          opacity: 1,
          borderRadius: "9999px",
          border: "1.5px solid rgba(201,168,106,0.6)",
          boxShadow: "0 20px 50px rgba(0,0,0,0.14)",
        } as React.CSSProperties,
      }
    );
  }, [addItem, product, quantity, router, t, format]);

  const handleBuyNow = useCallback(() => {
    for (let i = 0; i < quantity; i++) addItem(product);
    router.push("/checkout");
  }, [addItem, product, quantity, router]);

  const productUrl =
    typeof window !== "undefined"
      ? window.location.href
      : `/${productPath(product.category, product.slug)}`;

  const shareText = `${product.name} - ${format.number(product.price, {
    style: "currency",
    currency: "BDT",
  })} on Fashion Store`;
  const encodedText = encodeURIComponent(shareText);
  const encodedUrl = encodeURIComponent(productUrl);

  return (
    <div className="lg:sticky lg:top-24 lg:self-start">
      <div className="border-primary/25 flex flex-col gap-5 rounded-[16px] border bg-white p-6">
        <div className="flex flex-col gap-2">
          <span className="text-muted-foreground text-xs font-semibold tracking-wider uppercase">
            {t("price")}
          </span>
          <div className="flex flex-wrap items-baseline gap-2">
            <span className="text-foreground text-3xl font-bold">
              {format.number(product.price, { style: "currency", currency: "BDT" })}
            </span>
            {product.compareAtPrice && product.compareAtPrice > product.price && (
              <span className="text-muted-foreground text-base line-through">
                {format.number(product.compareAtPrice, {
                  style: "currency",
                  currency: "BDT",
                })}
              </span>
            )}
          </div>
        </div>

        <div className="border-primary/15 bg-white/80 flex items-center justify-between rounded-[12px] border px-4 py-3">
          <span className="text-muted-foreground text-xs font-semibold tracking-wider uppercase">
            {t("quantity")}
          </span>
          <div className="flex items-center">
            <button
              type="button"
              onClick={() => handleChangeQuantity(-1)}
              aria-label={t("decreaseQty")}
              className="hover:bg-primary/10 flex size-9 items-center justify-center rounded-full transition-colors"
            >
              <Minus className="size-4" aria-hidden="true" />
            </button>
            <span className="flex w-10 items-center justify-center text-sm font-bold">
              {quantity}
            </span>
            <button
              type="button"
              onClick={() => handleChangeQuantity(1)}
              aria-label={t("increaseQty")}
              className="bg-primary/10 text-primary hover:bg-primary/20 flex size-9 items-center justify-center rounded-full transition-colors"
            >
              <Plus className="size-4" aria-hidden="true" />
            </button>
          </div>
        </div>

        <div className="border-primary/25 bg-gradient-to-br from-[#fffdf6] to-[#f6efdc] flex items-center justify-between rounded-[12px] border px-4 py-3">
          <span className="text-muted-foreground text-xs font-semibold tracking-wider uppercase">
            {t("subtotal")}
          </span>
          <div className="flex flex-col items-end gap-0.5">
            <span className="text-foreground text-lg font-bold">
              {format.number(product.price * quantity, {
                style: "currency",
                currency: "BDT",
              })}
            </span>
            <span className="text-muted-foreground text-[11px]">
              {format.number(product.price, {
                style: "currency",
                currency: "BDT",
              })}{" "}
              × {quantity}
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-2.5">
          <div className="group relative w-full">
            <span className="border-primary/50 from-primary/30 to-secondary/20 absolute inset-0 rounded-full bg-gradient-to-r opacity-100 transition-opacity group-hover:opacity-90" />
            <Button
              className="border-primary/60 relative z-10 h-12 w-full gap-2 rounded-full border-2"
              onClick={handleAddToCart}
            >
              {justAdded ? (
                <>
                  <BadgeCheck className="size-5" aria-hidden="true" />
                  {t("addedToCart")}
                </>
              ) : (
                <>
                  <ShoppingBag className="size-5" aria-hidden="true" />
                  {t("addToCart")}
                </>
              )}
            </Button>
          </div>

          <Button
            variant="secondary"
            className="h-12 w-full gap-2 rounded-full"
            onClick={handleBuyNow}
          >
            <Zap className="size-5" aria-hidden="true" />
            {t("buyNow")}
          </Button>

          <div className="grid grid-cols-2 gap-2">
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodedText}%20${encodedUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              suppressHydrationWarning
              className="bg-[#25D366] hover:bg-[#1ebe5b] inline-flex items-center justify-center gap-2 rounded-full px-3 py-2.5 text-sm font-semibold text-white transition-colors"
            >
              <MessageCircle className="size-4" aria-hidden="true" />
              {t("whatsapp")}
            </a>
            <a
              href={`${MESSENGER_URL}?text=${encodeURIComponent(productUrl)}`}
              target="_blank"
              rel="noopener noreferrer"
              suppressHydrationWarning
              className="bg-[#0084FF] hover:bg-[#0073e6] inline-flex items-center justify-center gap-2 rounded-full px-3 py-2.5 text-sm font-semibold text-white transition-colors"
            >
              <MessageCircle className="size-4" aria-hidden="true" />
              {t("messenger")}
            </a>
          </div>
        </div>

        <div className="border-primary/15 bg-white/70 flex flex-col gap-2.5 rounded-[12px] border p-4 text-xs text-muted-foreground">
<span className="flex items-center gap-2">
              <ShieldCheck className="text-primary size-3.5" aria-hidden="true" />
              {t("secureCheckout")}
            </span>
          <span className="flex items-center gap-2">
            <Truck className="text-primary size-3.5" aria-hidden="true" />
            {t("fastDelivery")}
          </span>
          <span className="flex items-center gap-2">
            <BadgeCheck className="text-primary size-3.5" aria-hidden="true" />
            {t("authenticGuarantee")}
          </span>
        </div>
      </div>
    </div>
  );
}
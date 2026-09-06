"use client";

import Image from "next/image";
import { useFormatter, useTranslations } from "next-intl";
import { Eye, Heart, Plus, Scale, ShoppingCart, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ProductQuickView } from "@/components/shop/ProductQuickView";
import { useCartStore } from "@/store/cart.store";
import { useWishlistStore } from "@/store/wishlist.store";
import { productPath } from "@/features/shop/categories";
import type { Product } from "@/types/product";
import { useCallback, useState } from "react";

export type ProductCardVariant = "classic" | "editorial" | "playful" | "luxe";

interface ProductCardProps {
  product: Product;
  variant?: ProductCardVariant;
}

function hashNum(seed: string, min: number, max: number) {
  let h = 0;
  for (const ch of seed) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
  return min + (h % (max - min + 1));
}

function ratingCountFor(product: Product) {
  return 60 + hashNum(product.id, 0, 240);
}

function discountPercent(product: Product) {
  if (product.compareAtPrice && product.compareAtPrice > product.price) {
    return Math.round((1 - product.price / product.compareAtPrice) * 100);
  }
  return 0;
}

const CARD_SKIN: Record<ProductCardVariant, string> = {
  classic: "rounded-[10px] border border-border bg-white p-2",
  editorial: "rounded-[10px] border border-border bg-white p-2",
  playful: "rounded-[10px] border-2 border-border bg-white p-2",
  luxe: "rounded-[10px] border border-primary/20 bg-[#fffaf2] p-2",
};

function Stars({ rating, className }: { rating?: number; className?: string }) {
  if (!rating) return null;
  return (
    <span className={cn("flex items-center gap-0.5", className)} aria-label={`${rating} stars`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <Star
          key={n}
          className={cn(
            "size-3.5",
            n <= Math.round(rating) ? "fill-[#fcc418] text-[#fcc418]" : "fill-muted text-muted"
          )}
          aria-hidden="true"
        />
      ))}
    </span>
  );
}

export function ProductCard({ product, variant = "classic" }: ProductCardProps) {
  const t = useTranslations("Shop");
  const format = useFormatter();
  const addItem = useCartStore((state) => state.addItem);
  const toggleWishlist = useWishlistStore((state) => state.toggle);
  const isInWishlist = useWishlistStore((state) => state.isInWishlist(product.id));
  const [justAdded, setJustAdded] = useState(false);
  const [compared, setCompared] = useState(false);

  const handleAddToCart = useCallback(() => {
    addItem(product);
    setJustAdded(true);
    window.setTimeout(() => setJustAdded(false), 1200);
  }, [addItem, product]);

  const href = productPath(product.category, product.slug);
  const price = format.number(product.price, { style: "currency", currency: "BDT" });
  const comparePrice = product.compareAtPrice
    ? format.number(product.compareAtPrice, { style: "currency", currency: "BDT" })
    : null;
  const discount = discountPercent(product);

  const label =
    product.stock === 0
      ? { text: "SOLD OUT", cls: "bg-[#e53e3e] text-white" }
      : discount >= 15
        ? { text: "SALE", cls: "bg-[#e53434] text-white" }
        : { text: "NEW", cls: "bg-[#24bd25] text-white" };

  const stop = (event: { preventDefault: () => void; stopPropagation: () => void }) => {
    event.preventDefault();
    event.stopPropagation();
  };

  return (
    <article
      className={cn(
        "group/card flex flex-col transition-all duration-300 hover:border-primary/40 hover:-translate-y-1",
        CARD_SKIN[variant]
      )}
    >
      <div className="relative overflow-hidden rounded-[5px] bg-white">
        <Link href={href} aria-label={product.name} className="block">
          <Image
            src={product.images[0]}
            alt={product.name}
            width={312}
            height={312}
            sizes="(max-width:640px) 50vw, (max-width:1024px) 33vw, 25vw"
            className="aspect-square w-full object-cover transition-transform duration-500 group-hover/card:scale-105"
          />
        </Link>

        <span
          className={cn(
            "absolute top-2.5 left-2.5 z-10 rounded-[2.5px] px-2.5 py-1 text-[11px] font-bold tracking-wide text-white uppercase",
            label.cls
          )}
        >
          {label.text}
        </span>

        <div className="absolute top-2.5 right-2.5 z-10 flex flex-col gap-1.5 opacity-100 transition-opacity duration-300 md:translate-x-0 md:opacity-0 md:group-hover/card:opacity-100">
          <button
            type="button"
            onClick={(event) => {
              stop(event);
              toggleWishlist(product);
            }}
            suppressHydrationWarning
            aria-label={isInWishlist ? t("removeWishlist") : t("addWishlist")}
            className={cn(
              "bg-muted hover:border-primary hover:bg-primary hover:text-primary-foreground flex size-8 items-center justify-center rounded-[5px] border border-border transition-colors",
              isInWishlist && "text-destructive"
            )}
          >
            <Heart
              className="size-3.5"
              fill={isInWishlist ? "currentColor" : "none"}
              aria-hidden="true"
              suppressHydrationWarning
            />
          </button>
          <button
            type="button"
            onClick={(event) => {
              stop(event);
              setCompared((value) => !value);
            }}
            aria-label={compared ? t("removeFromCompare") : t("addToCompare")}
            className={cn(
              "bg-muted hover:border-primary hover:bg-primary hover:text-primary-foreground flex size-8 items-center justify-center rounded-[5px] border border-border transition-colors",
              compared && "text-secondary"
            )}
          >
            <Scale className="size-3.5" aria-hidden="true" />
          </button>
          <Dialog>
            <DialogTrigger
              onClick={(event) => event.stopPropagation()}
              render={
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label={t("quickView")}
                  className="bg-muted hover:border-primary hover:bg-primary hover:text-primary-foreground size-8 rounded-[5px] border border-border"
                />
              }
            >
              <Eye className="size-3.5" aria-hidden="true" />
            </DialogTrigger>
            <DialogContent className="sm:max-w-2xl">
              <DialogHeader>
                <DialogTitle className="sr-only">{product.name}</DialogTitle>
                <DialogDescription className="sr-only">
                  {t("quickView")} — {product.name}
                </DialogDescription>
              </DialogHeader>
              <ProductQuickView product={product} />
            </DialogContent>
          </Dialog>
        </div>

        <div className="absolute inset-x-0 bottom-0 z-10 translate-y-full px-2 pb-2 transition-transform duration-300 group-hover/card:translate-y-0">
          <Button
            className="bg-primary text-primary-foreground flex h-9 w-full items-center justify-center gap-1.5 rounded-[5px] text-xs font-semibold uppercase transition-colors hover:bg-primary/90"
            onClick={(event) => {
              stop(event);
              handleAddToCart();
            }}
          >
            {justAdded ? (
              <Plus className="size-3.5" aria-hidden="true" />
            ) : (
              <ShoppingCart className="size-3.5" aria-hidden="true" />
            )}
            {justAdded ? t("addedToCart") : t("addToCart")}
          </Button>
        </div>
      </div>

      <div className="flex flex-1 flex-col items-center px-2 pt-3 pb-2 text-center">
        <Link
          href={href}
          className="text-[11px] font-semibold tracking-[0.14em] text-muted-foreground uppercase transition-colors hover:text-primary"
        >
          {product.category}
        </Link>
        <h3 className="font-sans mt-1 line-clamp-1 text-base font-bold text-foreground">
          <Link href={href} className="transition-colors hover:text-primary">
            {product.name}
          </Link>
        </h3>
        <div className="mt-1.5 flex items-center gap-1.5">
          <Stars rating={product.rating} />
          <span className="text-xs text-muted-foreground">({ratingCountFor(product)})</span>
        </div>
        <div className="mt-2 flex flex-wrap items-center justify-center gap-x-2 gap-y-1">
          {comparePrice && <del className="text-xs text-muted-foreground">{comparePrice}</del>}
          <span className="font-sans text-base font-bold text-foreground">{price}</span>
          {discount > 0 && (
            <span className="rounded-full bg-[#ffe9e9] px-2 py-0.5 text-[11px] font-bold text-[#e53434]">
              -{discount}%
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
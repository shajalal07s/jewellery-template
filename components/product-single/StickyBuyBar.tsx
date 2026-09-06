"use client";

import Image from "next/image";
import { useFormatter } from "next-intl";
import { ShoppingCart, Zap } from "lucide-react";
import { useCartStore } from "@/store/cart.store";
import { useRouter } from "@/i18n/navigation";
import { ROUTES } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { useCallback, useEffect, useState } from "react";
import type { Product } from "@/types/product";

interface StickyBuyBarProps {
  product: Product;
}

export function StickyBuyBar({ product }: StickyBuyBarProps) {
  const format = useFormatter();
  const router = useRouter();
  const addItem = useCartStore((state) => state.addItem);
  const [visible, setVisible] = useState(false);

  const price = format.number(product.price, { style: "currency", currency: "BDT" });
  const comparePrice = product.compareAtPrice
    ? format.number(product.compareAtPrice, { style: "currency", currency: "BDT" })
    : null;

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 480);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleBuyNow = useCallback(() => {
    addItem(product);
    router.push(ROUTES.checkout);
  }, [addItem, product, router]);

  return (
    <div
      className={cn(
        "fixed bottom-5 left-1/2 z-40 hidden -translate-x-1/2 transition-all duration-300 lg:block",
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0"
      )}
    >
      <div className="shadow-elevation-lg bg-card flex items-center gap-4 rounded-full border border-border py-2 pr-2.5 pl-2.5">
        <span className="relative block size-11 shrink-0 overflow-hidden rounded-full bg-section-2">
          {product.images[0] ? (
            <Image src={product.images[0]} alt={product.name} fill sizes="44px" className="object-cover object-center" />
          ) : (
            <span className="from-primary/15 to-secondary/15 flex h-full w-full items-center justify-center bg-gradient-to-br font-heading text-lg font-bold text-primary/50">
              {product.name[0]}
            </span>
          )}
        </span>
        <div className="max-w-[220px]">
          <p className="line-clamp-1 text-sm font-medium">{product.name}</p>
          <p className="flex items-baseline gap-1.5">
            <span className="text-primary text-sm font-bold">{price}</span>
            {comparePrice ? (
              <span className="text-muted-foreground text-xs line-through">{comparePrice}</span>
            ) : null}
          </p>
        </div>
        <button
          type="button"
          onClick={() => addItem(product)}
          className="text-primary border-primary hover:bg-primary inline-flex h-10 items-center gap-1.5 rounded-full border-2 px-5 text-xs font-semibold transition-colors hover:text-white"
        >
          <ShoppingCart className="size-4" aria-hidden="true" />
          Add To Cart
        </button>
        <button
          type="button"
          onClick={handleBuyNow}
          className="bg-primary text-primary-foreground hover:bg-primary/85 inline-flex h-10 items-center gap-1.5 rounded-full px-5 text-xs font-semibold transition-colors"
        >
          <Zap className="size-4" aria-hidden="true" />
          Buy Now
        </button>
      </div>
    </div>
  );
}
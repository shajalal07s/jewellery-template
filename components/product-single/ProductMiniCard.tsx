"use client";

import Image from "next/image";
import { useFormatter } from "next-intl";
import { Check, Eye, GitCompareArrows, Heart, Plus, ShoppingCart, Star } from "lucide-react";
import { toast } from "sonner";
import { Link } from "@/i18n/navigation";
import { useCartStore } from "@/store/cart.store";
import { useWishlistStore } from "@/store/wishlist.store";
import { singleProductHref } from "@/features/shop/singleProduct";
import { cn } from "@/lib/utils";
import { useCallback, useState } from "react";
import type { Product } from "@/types/product";

interface ProductMiniCardProps {
  product: Product;
  className?: string;
  showCompare?: boolean;
}

function RatingStars({ rating, className }: { rating?: number; className?: string }) {
  return (
    <span className={cn("flex items-center gap-0.5", className)}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={cn(
            "size-3.5",
            i < Math.round(rating ?? 0) ? "fill-primary text-primary" : "text-muted-foreground/30"
          )}
          aria-hidden="true"
        />
      ))}
      <span className="text-muted-foreground ml-1 text-[12px]">({Math.round(rating ?? 0)})</span>
    </span>
  );
}

export function ProductMiniCard({ product, className, showCompare = true }: ProductMiniCardProps) {
  const format = useFormatter();
  const addItem = useCartStore((state) => state.addItem);
  const toggleWishlist = useWishlistStore((state) => state.toggle);
  const isInWishlist = useWishlistStore((state) => state.isInWishlist(product.id));
  const [compared, setCompared] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  const price = format.number(product.price, { style: "currency", currency: "BDT" });
  const comparePrice = product.compareAtPrice
    ? format.number(product.compareAtPrice, { style: "currency", currency: "BDT" })
    : null;
  const href = singleProductHref(product);

  const handleAddToCart = useCallback(() => {
    addItem(product);
    setJustAdded(true);
    window.setTimeout(() => setJustAdded(false), 1200);
  }, [addItem, product]);

  const handleCompare = useCallback(() => {
    setCompared((value) => !value);
    toast.success(compared ? "Removed from compare" : "Added to compare");
  }, [compared]);

  return (
    <article className={cn("group/card flex flex-col", className)}>
      <div className="relative aspect-square overflow-hidden rounded-xl bg-section-2">
        <Link href={href} aria-label={product.name} className="block h-full w-full">
          {product.images[0] ? (
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1280px) 33vw, 25vw"
              className="object-cover object-center transition-transform duration-700 group-hover/card:scale-105"
            />
          ) : (
            <span className="from-primary/15 to-secondary/15 flex h-full w-full items-center justify-center bg-gradient-to-br font-heading text-5xl font-bold text-primary/50">
              {product.name[0]}
            </span>
          )}
          <span className="absolute top-3 left-3 rounded-full bg-[#fcc418] px-2.5 py-0.5 text-[11px] font-bold tracking-wide text-black uppercase">
            New
          </span>
        </Link>

        <div className="absolute inset-0 flex items-center justify-center gap-2 bg-black/35 opacity-0 backdrop-blur-[2px] transition-opacity duration-300 group-hover/card:opacity-100 group-focus-within/card:opacity-100">
          <button
            type="button"
            onClick={() => toggleWishlist(product)}
            suppressHydrationWarning
            aria-label={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
            className={cn(
              "flex size-10 items-center justify-center rounded-full bg-white shadow-lg transition-colors hover:bg-primary hover:text-white",
              isInWishlist && "bg-primary text-white"
            )}
          >
            <Heart suppressHydrationWarning className="size-4" fill={isInWishlist ? "currentColor" : "none"} aria-hidden="true" />
          </button>
          <Link
            href={href}
            aria-label="Quick view"
            className="flex size-10 items-center justify-center rounded-full bg-white shadow-lg transition-colors hover:bg-primary hover:text-white"
          >
            <Eye className="size-4" aria-hidden="true" />
          </Link>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-1 pt-3">
        {product.category ? (
          <span className="text-muted-foreground text-[11px] font-semibold tracking-wider uppercase">
            {product.category}
          </span>
        ) : null}
        <p className="line-clamp-1 text-[15px] font-medium">
          <Link href={href} className="text-foreground hover:text-primary transition-colors">
            {product.name}
          </Link>
        </p>
        <RatingStars rating={product.rating} />
        <div className="mt-auto flex items-baseline gap-2 pt-1">
          <span className="text-primary text-lg leading-none font-bold">{price}</span>
          {comparePrice ? (
            <span className="text-muted-foreground line-through">{comparePrice}</span>
          ) : null}
        </div>
        <div className="flex items-center gap-2 pt-2">
          <button
            type="button"
            onClick={handleAddToCart}
            className="border-primary text-primary hover:bg-primary inline-flex h-9 items-center justify-center gap-1.5 rounded-full border-2 px-4 text-[13px] font-semibold transition-colors hover:text-white"
          >
            {justAdded ? <Check className="size-3.5" aria-hidden="true" /> : <ShoppingCart className="size-3.5" aria-hidden="true" />}
            {justAdded ? "Added" : "Add To Cart"}
          </button>
          {showCompare ? (
            <button
              type="button"
              onClick={handleCompare}
              aria-label="Add to compare"
              className={cn(
                "text-muted-foreground hover:text-primary flex size-9 items-center justify-center rounded-full border border-border transition-colors",
                compared && "text-primary"
              )}
            >
              <GitCompareArrows className="size-4" aria-hidden="true" />
            </button>
          ) : null}
        </div>
      </div>
    </article>
  );
}

export function ProductListRow({ product }: { product: Product }) {
  const format = useFormatter();
  const addItem = useCartStore((state) => state.addItem);
  const href = singleProductHref(product);
  const price = format.number(product.price, { style: "currency", currency: "BDT" });
  const comparePrice = product.compareAtPrice
    ? format.number(product.compareAtPrice, { style: "currency", currency: "BDT" })
    : null;

  return (
    <div className="group flex items-center gap-3 rounded-xl border border-border bg-white p-2.5 transition-shadow hover:shadow-md">
      <Link href={href} className="relative block size-16 shrink-0 overflow-hidden rounded-lg bg-section-2">
        {product.images[0] ? (
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            sizes="64px"
            className="object-cover object-center"
          />
        ) : (
          <span className="from-primary/15 to-secondary/15 flex h-full w-full items-center justify-center bg-gradient-to-br font-heading text-xl font-bold text-primary/50">
            {product.name[0]}
          </span>
        )}
      </Link>
      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
        <RatingStars rating={product.rating} />
        <p className="line-clamp-1 text-sm font-medium">
          <Link href={href} className="text-foreground hover:text-primary transition-colors">
            {product.name}
          </Link>
        </p>
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
        aria-label="Add to cart"
        className="bg-primary text-primary-foreground hover:bg-primary/85 flex size-8 shrink-0 items-center justify-center rounded-full transition-colors"
      >
        <Plus className="size-4" aria-hidden="true" />
      </button>
    </div>
  );
}
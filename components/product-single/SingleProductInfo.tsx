"use client";

import Image from "next/image";
import { useFormatter } from "next-intl";
import {
  BadgeCheck,
  Box,
  Check,
  Copy,
  Eye,
  Flame,
  Gem,
  Gift,
  Heart,
  MapPin,
  Minus,
  Plus,
  RotateCcw,
  Share2,
  ShoppingCart,
  Star,
  Truck,
  X,
  Zap,
} from "lucide-react";
import { toast } from "sonner";
import { Link, useRouter } from "@/i18n/navigation";
import { useCartStore } from "@/store/cart.store";
import { useWishlistStore } from "@/store/wishlist.store";
import { savePercent, singleProductHref } from "@/features/shop/singleProduct";
import { similarProducts } from "@/features/shop/singleProduct";
import { ROUTES } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Product } from "@/types/product";

interface SingleProductInfoProps {
  product: Product;
}

const TICKER_MESSAGES = [
  { icon: ShoppingCart, text: "90+ Sold Recently" },
  { icon: Truck, text: "Free shipping" },
  { icon: RotateCcw, text: "7 Days Return Policy" },
];

const BRAND_OPTIONS = ["Rupali Jewellers", "Dhanmondi Jewellers"];
const STYLE_OPTIONS = ["Classic", "Modern", "Bridal"];

export function SingleProductInfo({ product }: SingleProductInfoProps) {
  const format = useFormatter();
  const router = useRouter();
  const addItem = useCartStore((state) => state.addItem);
  const toggleWishlist = useWishlistStore((state) => state.toggle);
  const isInWishlist = useWishlistStore((state) => state.isInWishlist(product.id));

  const [showRegisterBanner, setShowRegisterBanner] = useState(true);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [selectedStyle, setSelectedStyle] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [tickerIndex, setTickerIndex] = useState(0);
  const [justAdded, setJustAdded] = useState(false);
  const [compared, setCompared] = useState(false);

  const targetTime = useRef(0);
  const [countdown, setCountdown] = useState({ h: "00", m: "00", s: "00" });

  const price = format.number(product.price, { style: "currency", currency: "BDT" });
  const comparePrice = product.compareAtPrice
    ? format.number(product.compareAtPrice, { style: "currency", currency: "BDT" })
    : null;
  const save = savePercent(product);

  const stockPercent = Math.min(100, Math.round(product.stock * 2.5));
  const alternatives = similarProducts(product, 4);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setTickerIndex((index) => (index + 1) % TICKER_MESSAGES.length);
    }, 2500);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!targetTime.current) targetTime.current = Date.now() + 1000 * 60 * 60 * 18;
    const timer = window.setInterval(() => {
      const diff = Math.max(0, targetTime.current - Date.now());
      const secs = Math.floor(diff / 1000);
      const pad = (value: number) => String(value).padStart(2, "0");
      setCountdown({
        h: pad(Math.floor((secs / 3600) % 24)),
        m: pad(Math.floor((secs / 60) % 60)),
        s: pad(secs % 60),
      });
    }, 1000);
    return () => window.clearInterval(timer);
  }, []);

  const handleQuantity = useCallback((delta: number) => {
    setQuantity((q) => Math.max(1, q + delta));
  }, []);

  const handleAddToCart = useCallback(() => {
    addItem(product, quantity);
    setJustAdded(true);
    window.setTimeout(() => setJustAdded(false), 1200);
  }, [addItem, product, quantity]);

  const handleBuyNow = useCallback(() => {
    addItem(product, quantity);
    router.push(ROUTES.checkout);
  }, [addItem, product, quantity, router]);

  const handleShare = useCallback(async () => {
    await navigator.clipboard?.writeText(window.location.href).catch(() => undefined);
    toast.success("Product link copied to clipboard");
  }, []);

  const handleCompare = useCallback(() => {
    setCompared((value) => !value);
    toast.success(compared ? "Removed from compare" : "Added to compare");
  }, [compared]);

  const tickerMessage = TICKER_MESSAGES[tickerIndex];

  return (
    <div className="flex flex-col gap-4 text-foreground">
      {showRegisterBanner ? (
        <div className="bg-accent border-primary/10 flex items-center gap-3 rounded-lg border p-3">
          <span className="bg-primary/10 flex size-9 shrink-0 items-center justify-center rounded-full">
            <Gift className="text-primary size-4.5" aria-hidden="true" />
          </span>
          <p className="text-primary min-w-0 flex-1 text-sm font-medium">
            Register to buy jewellery at wholesale prices for your shop.
          </p>
          <a
            href={ROUTES.register}
            className="bg-primary text-primary-foreground hover:bg-primary/85 inline-flex shrink-0 items-center gap-1 rounded-full px-3 py-1.5 text-xs font-semibold transition-colors"
          >
            Register Now
          </a>
          <button
            type="button"
            onClick={() => setShowRegisterBanner(false)}
            aria-label="Dismiss"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="size-4" aria-hidden="true" />
          </button>
        </div>
      ) : null}

      <div className="flex flex-col gap-2">
        {product.category ? (
          <span className="text-muted-foreground text-sm font-semibold">{product.category}</span>
        ) : null}
        <h1 className="font-heading text-2xl leading-tight font-semibold tracking-tight md:text-[30px]">
          {product.name}
        </h1>
        <p className="text-muted-foreground text-[15px] leading-relaxed">{product.description}</p>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-baseline gap-2.5">
          {comparePrice ? (
            <span className="text-muted-foreground text-xl line-through">{comparePrice}</span>
          ) : null}
          <span className="text-primary text-3xl leading-none font-bold">{price}</span>
          {save > 0 ? (
            <span className="bg-destructive text-destructive-foreground rounded-full px-2.5 py-1 text-[11px] font-bold tracking-wide uppercase">
              Save {save}%
            </span>
          ) : null}
        </div>
        <button
          type="button"
          className="text-primary border-primary/20 bg-accent/60 hover:bg-accent inline-flex items-center gap-1.5 rounded-full border px-3.5 py-2 text-xs font-semibold transition-colors"
        >
          <MapPin className="size-3.5" aria-hidden="true" />
          Find A Near Store
        </button>
      </div>

      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 border-y border-border py-3">
        <span className="flex items-center gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={cn(
                "size-4",
                i < Math.round(product.rating ?? 0)
                  ? "fill-primary text-primary"
                  : "text-muted-foreground/30"
              )}
              aria-hidden="true"
            />
          ))}
          <span className="text-muted-foreground ml-1.5 text-xs font-medium">
            ({Math.round(product.rating ?? 0)})
          </span>
        </span>
        <span className="text-foreground/70 flex items-center gap-1.5 text-xs font-medium">
          {(() => {
            const Icon = tickerMessage.icon;
            return <Icon className="size-4" aria-hidden="true" />;
          })()}
          <span key={tickerIndex} className="inline-block animate-fade-in-up">
            {tickerMessage.text}
          </span>
        </span>
      </div>

      <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
        <span>
          <span className="font-semibold">SKU :</span>{" "}
          <span className="text-muted-foreground">{product.sku ?? "N/A"}</span>
        </span>
        <span className="text-muted-foreground/20">|</span>
        <span className="flex items-center gap-1">
          <BadgeCheck className="text-[#24bd25] size-4" aria-hidden="true" />
          <span className="text-muted-foreground">Verified</span>
        </span>
        <span className="text-muted-foreground/20">|</span>
        <span>
          <span className="font-semibold">Brand :</span>{" "}
          <span className="text-muted-foreground">{product.brand ?? "N/A"}</span>
        </span>
      </div>

      <div className="flex flex-wrap gap-2">
        <span className="bg-section-2 text-muted-foreground flex items-center gap-1.5 rounded-md border border-border px-2.5 py-1.5 text-xs font-medium">
          <Flame className="text-destructive size-3.5" aria-hidden="true" />
          34 products sold in last 10 hours.
        </span>
        <span className="bg-section-2 text-muted-foreground flex items-center gap-1.5 rounded-md border border-border px-2.5 py-1.5 text-xs font-medium">
          <Eye className="text-primary size-3.5" aria-hidden="true" />
          20 people are viewing this
        </span>
      </div>

      {product.colors && product.colors.length > 0 ? (
        <VariantBlock label="Color">
          <div className="flex flex-wrap gap-2">
            {product.colors.map((color) => {
              const active = selectedColor === color;
              return (
                <button
                  key={color}
                  type="button"
                  aria-label={color}
                  onClick={() => setSelectedColor(color)}
                  className={cn(
                    "size-8 rounded-full border-2 transition-all",
                    active
                      ? "scale-110 border-primary ring-primary/30 ring-2"
                      : "border-border hover:scale-105"
                  )}
                  style={{ backgroundColor: color }}
                />
              );
            })}
          </div>
        </VariantBlock>
      ) : null}

      {product.sizes && product.sizes.length > 0 ? (
        <VariantBlock label="Size">
          <div className="flex flex-wrap gap-2">
            {product.sizes.map((size) => {
              const active = selectedSize === size;
              return (
                <button
                  key={size}
                  type="button"
                  onClick={() => setSelectedSize(size)}
                  className={cn(
                    "min-w-10 rounded-full border px-3 py-1.5 text-sm font-medium transition-colors",
                    active
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border hover:border-primary/50 text-muted-foreground hover:text-foreground"
                  )}
                >
                  {size}
                </button>
              );
            })}
          </div>
        </VariantBlock>
      ) : null}

      <VariantBlock label="Brand">
        <div className="flex flex-wrap gap-2">
          {BRAND_OPTIONS.map((brand) => {
            const active = selectedBrand === brand;
            return (
              <button
                key={brand}
                type="button"
                onClick={() => setSelectedBrand(brand)}
                className={cn(
                  "rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-colors",
                  active
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border text-muted-foreground hover:border-primary/50 hover:text-foreground"
                )}
              >
                {brand}
              </button>
            );
          })}
        </div>
      </VariantBlock>

      <VariantBlock label="Style">
        <div className="flex flex-wrap gap-2">
          {STYLE_OPTIONS.map((style) => {
            const active = selectedStyle === style;
            return (
              <button
                key={style}
                type="button"
                onClick={() => setSelectedStyle(style)}
                className={cn(
                  "rounded-md border-2 px-3.5 py-1.5 text-xs font-semibold transition-colors",
                  active
                    ? "border-primary text-primary"
                    : "border-border text-muted-foreground hover:border-primary/50 hover:text-foreground"
                )}
              >
                {style}
              </button>
            );
          })}
        </div>
      </VariantBlock>

      <div className="bg-[#fff6e6] border-[#f5b24f]/40 flex flex-wrap items-center gap-x-4 gap-y-2 rounded-lg border p-3.5">
        <span className="text-sm font-semibold">Special Offer :</span>
        <div className="flex items-center gap-1.5">
          {[countdown.h, countdown.m, countdown.s].map((value, index) => (
            <span key={index} className="flex items-center gap-1.5">
              <span className="bg-white text-foreground flex h-9 min-w-9 items-center justify-center rounded-md border border-border text-sm font-bold tabular-nums">
                {value}
              </span>
              {index < 2 ? <span className="font-semibold">:</span> : null}
            </span>
          ))}
        </div>
        <span className="text-muted-foreground text-xs">Remains until the end of the offer.</span>
      </div>

      <div className="flex flex-col gap-1.5">
        <span className="text-sm font-semibold">
          Only <span className="text-[#24bd25]">{product.stock} pc</span> left
        </span>
        <div className="h-2.5 w-full overflow-hidden rounded-full bg-[#e5fae5]">
          <div
            className="bg-[#24bd25] h-full rounded-full transition-all"
            style={{ width: `${stockPercent}%` }}
          />
        </div>
      </div>

      <div className="flex flex-wrap items-stretch gap-3">
        <div className="inline-flex h-16 items-center rounded-full border-2 border-border">
          <button
            type="button"
            onClick={() => handleQuantity(-1)}
            aria-label="Decrease quantity"
            className="flex h-full w-12 items-center justify-center rounded-l-full transition-colors hover:bg-muted"
          >
            <Minus className="size-5" aria-hidden="true" />
          </button>
          <input
            type="number"
            min={1}
            value={quantity}
            onChange={(e) => setQuantity(Math.max(1, Number(e.target.value) || 1))}
            className="h-full w-14 border-x border-border text-center text-base font-semibold tabular-nums outline-none"
            aria-label="Quantity"
          />
          <button
            type="button"
            onClick={() => handleQuantity(1)}
            aria-label="Increase quantity"
            className="flex h-full w-12 items-center justify-center rounded-r-full transition-colors hover:bg-muted"
          >
            <Plus className="size-5" aria-hidden="true" />
          </button>
        </div>

        <button
          type="button"
          onClick={handleAddToCart}
          className="text-primary border-primary hover:bg-primary inline-flex h-16 flex-1 items-center justify-center gap-3 rounded-full border-[3px] px-6 text-lg font-bold transition-colors hover:text-white"
        >
          {justAdded ? (
            <Check className="size-6" aria-hidden="true" />
          ) : (
            <ShoppingCart className="size-6" aria-hidden="true" />
          )}
          {justAdded ? "Added To Cart" : "Add To Cart"}
        </button>

        <button
          type="button"
          onClick={handleBuyNow}
          className="bg-primary text-primary-foreground hover:bg-primary/85 inline-flex h-16 flex-1 items-center justify-center gap-3 rounded-full px-6 text-lg font-bold transition-colors"
        >
          <Zap className="size-6" aria-hidden="true" />
          Buy Now
        </button>
      </div>

      <div className="flex flex-wrap gap-x-6 gap-y-2">
        <button
          type="button"
          onClick={handleCompare}
          className={cn(
            "text-muted-foreground hover:text-primary inline-flex items-center gap-1.5 text-xs font-semibold transition-colors",
            compared && "text-primary"
          )}
        >
          <BadgeCheck className="size-4" aria-hidden="true" />
          Compare Product
        </button>
        <button
          type="button"
          onClick={() => toggleWishlist(product)}
          suppressHydrationWarning
          className={cn(
            "text-muted-foreground hover:text-primary inline-flex items-center gap-1.5 text-xs font-semibold transition-colors",
            isInWishlist && "text-primary"
          )}
        >
          <Heart suppressHydrationWarning className="size-4" fill={isInWishlist ? "currentColor" : "none"} aria-hidden="true" />
          Add To Wishlist
        </button>
        <button
          type="button"
          onClick={handleShare}
          className="text-muted-foreground hover:text-primary inline-flex items-center gap-1.5 text-xs font-semibold transition-colors"
        >
          <Share2 className="size-4" aria-hidden="true" />
          Share
        </button>
      </div>

      <div className="bg-accent/40 flex flex-col gap-3 rounded-lg border border-border p-4">
        <span className="text-sm font-semibold">Additional Offers</span>
        <div className="bg-card flex flex-wrap items-center gap-3 rounded-lg border border-dashed border-border p-3">
          <span className="rounded-md border-2 border-dashed border-[#215ada]/40 px-3 py-1 font-mono text-sm font-bold tracking-wider text-primary">
            WELCOME100
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold">UP TO 30% OFF</p>
            <p className="text-muted-foreground text-xs">For orders over $200. Expires 30 Sep, 2026.</p>
          </div>
          <button
            type="button"
            onClick={() => {
              navigator.clipboard?.writeText("WELCOME100").catch(() => undefined);
              toast.success("Coupon code copied");
            }}
            aria-label="Copy coupon code"
            className="bg-accent text-primary hover:bg-accent/50 flex size-9 items-center justify-center rounded-full transition-colors"
          >
            <Copy className="size-4" aria-hidden="true" />
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <span className="text-sm font-semibold">Alternative For This Product</span>
        <div className="flex flex-col gap-2.5">
          {alternatives.map((item) => (
            <AlternativeRow key={item.id} product={item} />
          ))}
        </div>
      </div>

      <ul className="border-text flex flex-col gap-3 border-t border-border pt-4 text-sm">
        <li className="flex items-center gap-3">
          <Gem className="text-primary shrink-0" aria-hidden="true" />
          <span>
            <span className="font-semibold">Brand :</span>{" "}
            <span className="text-muted-foreground">{product.brand ?? "—"}</span>
          </span>
        </li>
        <li className="flex items-center gap-3">
          <Box className="text-primary shrink-0" aria-hidden="true" />
          <span>
            <span className="font-semibold">Ships :</span>{" "}
            <span className="text-muted-foreground">2–4 business days — Free Shipping</span>
          </span>
        </li>
        <li className="flex items-center gap-3">
          <RotateCcw className="text-primary shrink-0" aria-hidden="true" />
          <span>
            <span className="font-semibold">7 Days Returns :</span>{" "}
            <span className="text-muted-foreground">Free return within 7 days of purchase.</span>
          </span>
        </li>
      </ul>

      <div className="bg-section-2 flex items-center gap-3 rounded-lg border border-border p-3.5">
        <Image
          src="/images/unimart/payment-brand/image-01.webp"
          alt="Payment methods"
          width={180}
          height={40}
          className="h-auto w-auto"
          unoptimized
        />
        <span className="text-muted-foreground text-xs font-medium">
          Guaranteed safe &amp; secure checkout
        </span>
      </div>
    </div>
  );
}

function VariantBlock({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <p className="text-sm font-semibold">
        {label} : <span className="text-muted-foreground font-normal">No Selection</span>
      </p>
      {children}
    </div>
  );
}

function AlternativeRow({ product }: { product: Product }) {
  const format = useFormatter();
  const addItem = useCartStore((state) => state.addItem);
  const href = singleProductHref(product);
  const price = format.number(product.price, { style: "currency", currency: "BDT" });
  const comparePrice = product.compareAtPrice
    ? format.number(product.compareAtPrice, { style: "currency", currency: "BDT" })
    : null;

  return (
    <div className="bg-card flex items-center gap-3 rounded-lg border border-border p-2.5">
      <Link href={href} className="relative block size-14 shrink-0 overflow-hidden rounded-lg bg-section-2">
        {product.images[0] ? (
          <Image src={product.images[0]} alt={product.name} fill sizes="56px" className="object-cover object-center" />
        ) : (
          <span className="from-primary/15 to-secondary/15 flex h-full w-full items-center justify-center bg-gradient-to-br font-heading text-lg font-bold text-primary/50">
            {product.name[0]}
          </span>
        )}
      </Link>
      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
        {product.category ? (
          <span className="text-muted-foreground text-[11px] font-semibold uppercase">
            {product.category}
          </span>
        ) : null}
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
        className="border-primary text-primary hover:bg-primary inline-flex items-center gap-1 rounded-full border-2 px-3.5 py-1.5 text-xs font-semibold transition-colors hover:text-white"
      >
        ADD
      </button>
    </div>
  );
}
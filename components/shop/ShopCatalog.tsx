"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { useFormatter, useTranslations } from "next-intl";
import {
  ArrowRight,
  Banknote,
  BadgeCheck,
  CalendarClock,
  Check,
  ChevronUp,
  GitCompareArrows,
  Heart,
  LayoutGrid,
  List,
  Package,
  ShieldCheck,
  SlidersHorizontal,
  Star,
  Truck,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/common/Container";
import { Breadcrumb } from "@/components/common/Breadcrumb";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ProductCard } from "@/components/shop/ProductCard";
import { products } from "@/features/shop/products";
import { CATEGORY_SLUGS, type CategorySlug } from "@/features/shop/categories";
import { useCartStore } from "@/store/cart.store";
import { useWishlistStore } from "@/store/wishlist.store";
import type { Product } from "@/types/product";

type FastFilter = "featured" | "best" | "topRated" | "new" | "topItems";
type SortValue = "default" | "titleAsc" | "titleDesc" | "priceAsc" | "priceDesc";
type ViewMode = "two" | "grid";

const PRODUCT_CAT_IMAGES: Record<CategorySlug, string> = {
  necklace: "/images/unimart/catagory-img/cat-bg-jwellerry-a-3.webp",
  bracelet: "/images/unimart/catagory-img/cat-bg-jwellerry-a-4.webp",
  ring: "/images/unimart/catagory-img/cat-bg-jwellerry-a-1.webp",
  earrings: "/images/unimart/catagory-img/cat-bg-jwellerry-a-5.webp",
  bangle: "/images/unimart/catagory-img/cat-bg-jwellerry-a-4.webp",
  nosepin: "/images/unimart/catagory-img/cat-bg-jwellerry-a-1.webp",
  jhumka: "/images/unimart/catagory-img/cat-bg-jwellerry-a-5.webp",
  pendant: "/images/unimart/catagory-img/cat-bg-jwellerry-a-2.webp",
};

const SHOW_OPTIONS = [10, 15, 12, 9, 6, 3];

const COLOR_NAMES: Record<string, string> = {
  "#d4af37": "Gold",
  "#fff1d6": "Cream",
  "#b76e79": "Rose",
  "#c0c0c0": "Silver",
  "#b8860b": "Bronze",
  "#f5d78e": "Champagne",
  "#e8c88a": "Beige",
  "#c9a86a": "Mustard",
  "#10b981": "Green",
  "#064e3b": "Dark Green",
  "#f5f5f4": "White",
  "#e7e5e4": "Grey",
  "#e8e8e8": "Light Grey",
};

function hashNum(seed: string, min: number, max: number) {
  let h = 0;
  for (const ch of seed) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
  return min + (h % (max - min + 1));
}

function discountPercent(product: Product) {
  if (product.compareAtPrice && product.compareAtPrice > product.price) {
    return Math.round((1 - product.price / product.compareAtPrice) * 100);
  }
  return 0;
}

function soldRecentlyFor(product: Product) {
  return 40 + hashNum(product.id, 0, 140);
}

function ratingCountFor(product: Product) {
  return 60 + hashNum(product.id, 0, 240);
}

function materialFor(product: Product) {
  return product.name.includes("18K")
    ? "18K Gold"
    : product.name.includes("21K")
      ? "21K Gold"
      : "24K Gold Vermeil";
}

function stoneFor(product: Product) {
  if (product.name.includes("Pearl")) return "Freshwater Pearl";
  if (product.name.includes("Emerald")) return "Emerald";
  if (product.name.includes("Diamond")) return "Lab-Grown Diamond";
  if (product.name.includes("Zirconia")) return "Cubic Zirconia";
  return "Polished Gold";
}

function specsFor(product: Product) {
  return [
    { label: "brand", value: product.brand ?? "—" },
    { label: "material", value: materialFor(product) },
    { label: "stone", value: stoneFor(product) },
    { label: "style", value: product.category ?? "—" },
    { label: "hallmark", value: "BDB Certified" },
    { label: "weight", value: `${7 + hashNum(product.id, 0, 9)}g approx.` },
  ];
}

function labelsFor(product: Product) {
  const labels: { text: string; variant: "default" | "secondary" | "destructive" | "outline" }[] =
    [];
  if (product.stock === 0) {
    labels.push({ text: "SOLD OUT", variant: "outline" });
  } else {
    if (discountPercent(product) >= 15) labels.push({ text: "SALE", variant: "destructive" });
    if ((product.rating ?? 0) >= 4.7) labels.push({ text: "BEST SELLER", variant: "secondary" });
    if (product.createdAt >= "2026-07-10") labels.push({ text: "NEW", variant: "default" });
    if ((product.rating ?? 0) >= 4.5 && hashNum(product.id, 0, 1) === 1)
      labels.push({ text: "HOT", variant: "destructive" });
    if (product.stock <= 18) labels.push({ text: "TRENDING", variant: "outline" });
  }
  return labels.slice(0, 2);
}

function Stars({ rating }: { rating: number }) {
  return (
    <span className="flex items-center gap-0.5" aria-label={`${rating} stars`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <Star
          key={n}
          className={cn("size-3.5", n <= Math.round(rating) ? "fill-secondary text-secondary" : "text-muted-foreground/30")}
          aria-hidden="true"
        />
      ))}
    </span>
  );
}

function FilterSection({
  title,
  defaultOpen = true,
  children,
}: {
  title: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-border py-5">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-3 text-left"
      >
        <span className="font-heading text-sm font-bold tracking-wide text-foreground uppercase">
          {title}
        </span>
        <ChevronUp
          className={cn("size-4 text-muted-foreground transition-transform", !open && "rotate-180")}
          aria-hidden="true"
        />
      </button>
      {open ? <div className="mt-4">{children}</div> : null}
    </div>
  );
}

function PriceBuckets({
  buckets,
  selected,
  onSelect,
  min,
  max,
  setMin,
  setMax,
  applyCustom,
}: {
  buckets: { lo: number; hi: number; count: number }[];
  selected: [number, number] | null;
  onSelect: (range: [number, number] | null) => void;
  min: string;
  max: string;
  setMin: (v: string) => void;
  setMax: (v: string) => void;
  applyCustom: () => void;
}) {
  const t = useTranslations("ShopPage");
  return (
    <div className="flex flex-col gap-2.5">
      {buckets.map((b, i) => {
        const active = selected?.[0] === b.lo && selected?.[1] === b.hi;
        const isFirst = i === 0;
        const isLast = i === buckets.length - 1;
        const label = isFirst
          ? t("under", { value: formatPlain(b.hi) })
          : isLast
            ? t("above", { value: formatPlain(b.lo) })
            : t("range", { from: formatPlain(b.lo), to: formatPlain(b.hi) });
        return (
          <button
            key={i}
            type="button"
            onClick={() => onSelect(active ? null : [b.lo, b.hi])}
            className={cn(
              "flex items-center gap-2 text-sm transition-colors",
              active ? "text-secondary font-semibold" : "text-foreground hover:text-secondary"
            )}
          >
            <span
              className={cn(
                "flex size-4 shrink-0 items-center justify-center rounded-[2.5px] border",
                active ? "border-secondary bg-secondary text-white" : "border-border"
              )}
            >
              {active ? <Check className="size-3" aria-hidden="true" /> : null}
            </span>
            <span className="flex-1">{label}</span>
            <span className="text-muted-foreground">({b.count})</span>
          </button>
        );
      })}
      <div className="mt-1 flex items-center gap-2">
        <Input
          type="number"
          value={min}
          onChange={(e) => setMin(e.target.value)}
          placeholder="-"
          aria-label={t("minPrice")}
          className="rounded-[5px] border-blue-200 bg-blue-100"
        />
        <span className="text-muted-foreground">—</span>
        <Input
          type="number"
          value={max}
          onChange={(e) => setMax(e.target.value)}
          placeholder="-"
          aria-label={t("maxPrice")}
          className="rounded-[5px] border-blue-200 bg-blue-100"
        />
        <Button size="sm" variant="secondary" className="shrink-0 rounded-[5px]" onClick={applyCustom}>
          {t("go")}
        </Button>
      </div>
    </div>
  );
}

function formatPlain(value: number) {
  return value >= 1000 ? `${(value / 1000).toFixed(1)}k` : String(Math.round(value));
}

function GridTwoCard({ product }: { product: Product }) {
  const t = useTranslations("ShopPage");
  const format = useFormatter();
  const addItem = useCartStore((state) => state.addItem);
  const toggleWishlist = useWishlistStore((state) => state.toggle);
  const isInWishlist = useWishlistStore((state) => state.isInWishlist(product.id));
  const [compared, setCompared] = useState(false);
  const [showAllSpecs, setShowAllSpecs] = useState(false);

  const href = `/shop/${product.category?.toLowerCase() ?? "all"}/${product.slug}`;
  const price = format.number(product.price, { style: "currency", currency: "BDT" });
  const comparePrice = product.compareAtPrice
    ? format.number(product.compareAtPrice, { style: "currency", currency: "BDT" })
    : null;
  const discount = discountPercent(product);
  const soldRecently = soldRecentlyFor(product);
  const ratingCount = ratingCountFor(product);
  const specs = specsFor(product);
  const visibleSpecs = showAllSpecs ? specs : specs.slice(0, 4);
  const shipWeeks = `${2 + hashNum(product.id, 0, 2)}–${
    3 + hashNum(product.id, 0, 2)
  } weeks`;

  return (
    <article className="group overflow-hidden rounded-[10px] border border-border bg-white transition-colors duration-300 hover:border-primary/40">
      <div className="grid gap-5 p-3 md:grid-cols-[220px_1fr] md:p-4">
        <div className="relative overflow-hidden rounded-[5px] bg-muted">
          <Link href={href} className="relative block aspect-[3/4] w-full overflow-hidden">
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              sizes="(min-width: 768px) 220px, 100vw"
              className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
            />
          </Link>
          <div className="absolute top-2 left-2 flex flex-col items-start gap-1">
            {labelsFor(product).map((label) => (
              <Badge key={label.text} variant={label.variant}>
                {label.text}
              </Badge>
            ))}
          </div>
          <div className="absolute top-2 right-2 flex flex-col gap-1.5">
            <button
              type="button"
              onClick={() => toggleWishlist(product)}
              suppressHydrationWarning
              aria-label={isInWishlist ? t("removeWishlist") : t("addWishlist")}
              className={cn(
                "flex size-9 items-center justify-center rounded-[5px] border border-border bg-white transition-colors",
                isInWishlist ? "text-destructive" : "text-foreground hover:text-destructive"
              )}
            >
              <Heart suppressHydrationWarning className="size-4" fill={isInWishlist ? "currentColor" : "none"} aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => setCompared((v) => !v)}
              aria-label={t("addToCompare")}
              className={cn(
                "flex size-9 items-center justify-center rounded-[5px] border border-border bg-white transition-colors",
                compared ? "text-secondary" : "text-foreground"
              )}
            >
              <GitCompareArrows className="size-4" aria-hidden="true" />
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-2.5">
          <Link
            href={href}
            className="text-secondary hover:text-secondary/80 text-xs font-semibold tracking-wider uppercase"
          >
            {product.category}
          </Link>
          <Link
            href={href}
            className="font-heading text-foreground line-clamp-1 text-lg leading-snug font-semibold hover:underline md:text-xl"
          >
            {product.name}
          </Link>

          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <Stars rating={product.rating ?? 0} />
              <span>({ratingCount})</span>
            </span>
            <span className="flex items-center gap-1.5">
              <Package className="size-4 text-secondary" aria-hidden="true" />
              {t("soldRecently", { count: soldRecently })}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <Truck className="size-4 text-secondary" aria-hidden="true" />
              {t("freeShipping")}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <ShieldCheck className="size-4 text-secondary" aria-hidden="true" />
              {t("returnDays", { days: 7 })}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <span className="text-muted-foreground text-sm line-through">{comparePrice}</span>
            <span className="text-foreground text-lg font-bold">{price}</span>
            {discount > 0 ? (
              <Badge variant="destructive">-{discount}%</Badge>
            ) : null}
          </div>

          {product.stock === 0 ? (
            <span className="text-destructive text-sm font-semibold">{t("soldOut")}</span>
          ) : (
            <span className="text-sm font-medium text-foreground">
              {product.stock <= 18 ? (
                <span className="text-destructive">{t("onlyLeft", { count: product.stock })}</span>
              ) : (
                t("inStock", { count: product.stock })
              )}
            </span>
          )}

          <div className="mt-1 flex flex-wrap gap-2.5">
            <Button
              size="sm"
              onClick={() => addItem(product)}
              className="gap-1.5 rounded-[5px] uppercase"
            >
              <Package className="size-4" aria-hidden="true" />
              {t("addToCart")}
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => setCompared((v) => !v)}
              className={cn("gap-1.5 rounded-[5px] uppercase", compared && "text-secondary border-secondary")}
            >
              <GitCompareArrows className="size-4" aria-hidden="true" />
              {compared ? t("addedToCompare") : t("addToCompare")}
            </Button>
          </div>

          <ul className="mt-2 flex flex-col gap-1.5 text-sm text-muted-foreground">
            {visibleSpecs.map((spec) => (
              <li key={spec.label} className="flex gap-2">
                <span className="text-foreground/70 w-28 shrink-0 font-medium capitalize">
                  {t(`specs.${spec.label}`)}
                </span>
                <span className="flex-1">{spec.value}</span>
              </li>
            ))}
          </ul>
          <button
            type="button"
            onClick={() => setShowAllSpecs((v) => !v)}
            className="text-secondary hover:text-foreground w-fit text-xs font-semibold uppercase"
          >
            {showAllSpecs ? t("showLess") : t("showMore")}
          </button>

          <div className="mt-2 flex flex-wrap gap-x-6 gap-y-1 border-t border-dashed border-border pt-3 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5">
              {t("ships")}: {shipWeeks} {t("freeShipping")}
            </span>
            <span className="flex items-center gap-1.5">
              {t("pickup")}: {t("checkAvailability")}
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}

export function ShopCatalog() {
  const t = useTranslations("ShopPage");

  const [fast, setFast] = useState<FastFilter>("featured");
  const [sort, setSort] = useState<SortValue>("default");
  const [show, setShow] = useState(10);
  const [page, setPage] = useState(1);
  const [view, setView] = useState<ViewMode>("two");
  const [selectedCats, setSelectedCats] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [minRating, setMinRating] = useState<number | null>(null);
  const [priceRange, setPriceRange] = useState<[number, number] | null>(null);
  const [customMin, setCustomMin] = useState("");
  const [customMax, setCustomMax] = useState("");

  const facet = useMemo(() => {
    const cats = new Map<string, number>();
    const colors = new Map<string, number>();
    const brands = new Map<string, number>();
    for (const p of products) {
      if (p.category) cats.set(p.category, (cats.get(p.category) ?? 0) + 1);
      for (const c of p.colors ?? []) colors.set(c, (colors.get(c) ?? 0) + 1);
      if (p.brand) brands.set(p.brand, (brands.get(p.brand) ?? 0) + 1);
    }
    const prices = products.map((p) => p.price).sort((a, b) => a - b);
    const lo = prices[0] ?? 0;
    const hi = prices[prices.length - 1] ?? 0;
    const step = (hi - lo) / 5 || 1;
    const buckets = Array.from({ length: 5 }, (_, i) => {
      const bLo = i === 4 ? lo + 4 * step : lo + i * step;
      const bHi = i === 4 ? hi : lo + (i + 1) * step;
      const count = products.filter((p) => p.price >= bLo && p.price <= bHi).length;
      return { lo: Math.floor(bLo), hi: Math.ceil(bHi), count };
    });
    return { cats, colors, brands, buckets };
  }, []);

  const filtered = useMemo(() => {
    let list = products.filter((p) => {
      if (selectedCats.length > 0 && !selectedCats.includes(p.category ?? "")) return false;
      if (selectedColors.length > 0 && !(p.colors ?? []).some((c) => selectedColors.includes(c)))
        return false;
      if (selectedBrands.length > 0 && !selectedBrands.includes(p.brand ?? "")) return false;
      if (minRating !== null && (p.rating ?? 0) < minRating) return false;
      if (priceRange && (p.price < priceRange[0] || p.price > priceRange[1])) return false;
      return true;
    });

    if (sort === "titleAsc") list = [...list].sort((a, b) => a.name.localeCompare(b.name));
    else if (sort === "titleDesc") list = [...list].sort((a, b) => b.name.localeCompare(a.name));
    else if (sort === "priceAsc") list = [...list].sort((a, b) => a.price - b.price);
    else if (sort === "priceDesc") list = [...list].sort((a, b) => b.price - a.price);
    else if (fast === "best") list = [...list].sort((a, b) => soldRecentlyFor(b) - soldRecentlyFor(a));
    else if (fast === "topRated") list = [...list].sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
    else if (fast === "new") list = [...list].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
    else if (fast === "topItems")
      list = [...list].sort(
        (a, b) => (b.rating ?? 0) * ratingCountFor(b) - (a.rating ?? 0) * ratingCountFor(a)
      );

    return list;
  }, [fast, sort, selectedCats, selectedColors, selectedBrands, minRating, priceRange]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / show));
  const safePage = Math.min(page, pageCount);
  const fromIndex = (safePage - 1) * show;
  const pageItems = filtered.slice(fromIndex, fromIndex + show);

  const applyCustomPrice = () => {
    const min = customMin === "" ? Number.NEGATIVE_INFINITY : Number(customMin);
    const max = customMax === "" ? Number.POSITIVE_INFINITY : Number(customMax);
    setPriceRange([min, max]);
    setPage(1);
  };

  const resetFilters = () => {
    setSelectedCats([]);
    setSelectedColors([]);
    setSelectedBrands([]);
    setMinRating(null);
    setPriceRange(null);
    setCustomMin("");
    setCustomMax("");
    setFast("featured");
    setSort("default");
    setPage(1);
  };

  const toggleArray = (key: "categories" | "colors" | "brands", value: string) => {
    const state =
      key === "categories"
        ? selectedCats
        : key === "colors"
          ? selectedColors
          : selectedBrands;
    const update = state.includes(value) ? state.filter((v) => v !== value) : [...state, value];
    if (key === "categories") setSelectedCats(update);
    else if (key === "colors") setSelectedColors(update);
    else setSelectedBrands(update);
    setPage(1);
  };

  const sidebar = (
    <div className="overflow-hidden rounded-[10px] border border-border bg-white">
      <div className="flex items-center justify-between rounded-t-[10px] border-b border-orange-200 bg-orange-100 px-5 py-4">
        <h3 className="flex items-center gap-2 text-sm font-bold tracking-wide text-orange-950 uppercase">
          <SlidersHorizontal className="size-4" aria-hidden="true" />
          {t("filterRefine")}
        </h3>
      </div>
      <div className="flex flex-col divide-y divide-border px-5">
        <FilterSection title={t("categoriesTitle")}>
          <div className="flex flex-col gap-2.5">
            {[...facet.cats.entries()].map(([cat, count]) => {
              const active = selectedCats.includes(cat);
              return (
                <label
                  key={cat}
                  className="flex cursor-pointer items-center gap-2 text-sm"
                >
                  <Checkbox
                    checked={active}
                    onCheckedChange={() =>
                      toggleArray(
                        "categories",
                        cat
                      )
                    }
                  />
                  <span className={cn("flex-1", active ? "text-secondary font-semibold" : "text-foreground")}>
                    {t(`categories.${cat.toLowerCase().replace(/\s+/g, "")}`)}
                  </span>
                  <span className="text-muted-foreground">({count})</span>
                </label>
              );
            })}
          </div>
        </FilterSection>

        <FilterSection title={t("customerReviews")}>
          <div className="flex flex-col gap-2.5">
            {[4, 3, 2, 1].map((r) => {
              const active = minRating === r;
              const count = products.filter((p) => (p.rating ?? 0) >= r).length;
              return (
                <button
                  key={r}
                  type="button"
                  onClick={() => {
                    setMinRating(active ? null : r);
                    setPage(1);
                  }}
                  className={cn(
                    "flex items-center gap-2 text-sm",
                    active ? "text-secondary font-semibold" : "text-foreground hover:text-secondary"
                  )}
                >
                  <Stars rating={r} />
                  <span className="flex-1 text-left">
                    {r} {t("andUp")}
                  </span>
                  <span className="text-muted-foreground">({count})</span>
                </button>
              );
            })}
          </div>
        </FilterSection>

        <FilterSection title={t("filterByPrice")}>
          <PriceBuckets
            buckets={facet.buckets}
            selected={priceRange}
            onSelect={(range) => {
              setPriceRange(range);
              setPage(1);
            }}
            min={customMin}
            max={customMax}
            setMin={setCustomMin}
            setMax={setCustomMax}
            applyCustom={applyCustomPrice}
          />
        </FilterSection>

        <FilterSection title={t("filterByColor")}>
          <div className="flex flex-col gap-2.5">
            {[...facet.colors.entries()].slice(0, 12).map(([color, count]) => {
              const active = selectedColors.includes(color);
              return (
                <button
                  key={color}
                  type="button"
                  onClick={() => toggleArray("colors", color)}
                  className={cn(
                    "flex items-center gap-2 text-sm",
                    active ? "text-secondary font-semibold" : "text-foreground hover:text-secondary"
                  )}
                >
                  <span
                    className="size-4 shrink-0 rounded-full border border-black/10"
                    style={{ backgroundColor: color }}
                    aria-hidden="true"
                  />
                  <span className="flex-1 text-left">{t(`colors.${COLOR_NAMES[color] ?? color}`)}</span>
                  <span className="text-muted-foreground">({count})</span>
                </button>
              );
            })}
          </div>
        </FilterSection>

        <FilterSection title={t("brand")}>
          <div className="flex flex-col gap-2.5">
            {[...facet.brands.entries()].map(([brand, count]) => {
              const active = selectedBrands.includes(brand);
              return (
                <label key={brand} className="flex cursor-pointer items-center gap-2 text-sm">
                  <Checkbox
                    checked={active}
                    onCheckedChange={() => toggleArray("brands", brand)}
                  />
                  <span className={cn("flex-1", active ? "text-secondary font-semibold" : "text-foreground")}>
                    {brand}
                  </span>
                  <span className="text-muted-foreground">({count})</span>
                </label>
              );
            })}
          </div>
        </FilterSection>

        <FilterSection title={t("promotionServices")}>
          <div className="flex flex-wrap gap-2">
            {[
              { key: "serviceFreeDelivery", icon: Truck },
              { key: "serviceHotDeals", icon: BadgeCheck },
              { key: "serviceAuthentic", icon: ShieldCheck },
              { key: "serviceCashOnDelivery", icon: Banknote },
              { key: "serviceInstallment", icon: CalendarClock },
            ].map((service) => (
              <span
                key={service.key}
                className="inline-flex items-center gap-1.5 rounded-[2.5px] border border-border bg-muted/40 px-3 py-1.5 text-xs font-medium text-muted-foreground"
              >
                <service.icon className="size-3.5 text-secondary" aria-hidden="true" />
                {t(service.key)}
              </span>
            ))}
          </div>
        </FilterSection>
      </div>

      <div className="p-5 pt-4">
        <Link href="/shop/ring/21k-zirconia-statement-ring" className="group relative block overflow-hidden rounded-[5px]">
          <Image
            src="/images/unimart/catagory-img/cat-bg-jwellerry-a-1.webp"
            alt={t("sidebarBannerTitle")}
            width={600}
            height={720}
            className="aspect-[5/6] w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/75 via-black/20 to-transparent p-4">
            <span className="text-white text-sm font-semibold">{t("sidebarBannerTitle")}</span>
            <span className="mt-1 inline-flex items-center gap-1 text-xs font-semibold text-secondary uppercase">
              {t("sidebarBannerCta")}
              <ArrowRight className="size-3.5" aria-hidden="true" />
            </span>
          </div>
        </Link>
      </div>
    </div>
  );

  const hasActiveFilters =
    selectedCats.length > 0 ||
    selectedColors.length > 0 ||
    selectedBrands.length > 0 ||
    minRating !== null ||
    priceRange !== null ||
    fast !== "featured";

  const fastFilters: { key: FastFilter; label: string }[] = [
    { key: "featured", label: t("featured") },
    { key: "best", label: t("bestSellers") },
    { key: "topRated", label: t("topRated") },
    { key: "new", label: t("new") },
    { key: "topItems", label: t("topItems") },
  ];

  return (
    <>
      <section className="bg-primary/15 border-b border-primary/20">
        <Container className="flex flex-col gap-2 py-2.5">
          <Breadcrumb
            items={[{ label: t("home"), href: "/" }, { label: t("title") }]}
          />
        </Container>
      </section>

      <section className="bg-muted/40 py-[30px]">
        <Container className="flex flex-col gap-8">
          <div className="relative overflow-hidden rounded-[10px] border border-primary/25 bg-gradient-to-br from-[#fffdf6] via-[#fbf3e3] to-[#f5e8c8]">
            <div className="from-primary/20 pointer-events-none absolute -top-16 -right-16 size-64 rounded-full bg-gradient-to-br to-transparent blur-3xl" />
            <div className="from-secondary/15 pointer-events-none absolute -bottom-20 -left-16 size-64 rounded-full bg-gradient-to-tr to-transparent blur-3xl" />
            <div className="pointer-events-none absolute top-3 left-3 size-9 rounded-tl-[10px] border-t-2 border-l-2 border-primary/50" />
            <div className="pointer-events-none absolute right-3 bottom-3 size-9 rounded-br-[10px] border-r-2 border-b-2 border-primary/50" />

            <div className="relative grid gap-6 p-6 md:grid-cols-[1fr_220px] md:p-8">
              <div className="flex flex-col items-start justify-center gap-3">
                <span className="inline-flex items-center gap-1.5 rounded-[2.5px] bg-gradient-to-r from-primary to-secondary px-3 py-1 text-[11px] font-bold tracking-[0.18em] text-white uppercase">
                  {t("promoBadge")}
                </span>
                <h2 className="font-heading max-w-xl text-xl leading-tight font-bold tracking-tight text-foreground md:text-3xl">
                  {t("promoTitle")}
                </h2>
                <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
                  {t("promoSubtitle")}
                </p>
              </div>
              <div className="relative hidden md:block">
                <div className="absolute inset-6 overflow-hidden rounded-[5px] border-2 border-white shadow-none ring-2 ring-primary/40">
                  <Image
                    src="/images/unimart/product-img/jwellery/jw-a-01.webp"
                    alt={t("promoTitle")}
                    fill
                    sizes="220px"
                    className="object-cover object-center"
                  />
                </div>
                <span className="absolute top-2 right-2 flex size-14 flex-col items-center justify-center rounded-full bg-[#1a1206]/90 text-white ring-2 ring-primary/50">
                  <span className="text-[9px] leading-none font-semibold tracking-widest uppercase">
                    Save
                  </span>
                  <span className="text-lg leading-tight font-bold">50%</span>
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="font-heading text-lg font-semibold tracking-tight text-foreground md:text-xl">
              {t("shopByCategory")}
            </h3>
            <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-8">
              {CATEGORY_SLUGS.map((slug) => (
                <Link
                  key={slug}
                  href={`/shop/${slug}`}
                  className="group flex flex-col items-center gap-3"
                >
                  <span className="relative block size-28 overflow-hidden rounded-full border border-border bg-white transition-transform duration-300 group-hover:scale-105 md:size-32">
                    <Image
                      src={PRODUCT_CAT_IMAGES[slug]}
                      alt={t(`categories.${slug}`)}
                      fill
                      sizes="128px"
                      className="object-cover object-center"
                    />
                  </span>
                  <span className="text-center text-sm font-semibold text-foreground transition-colors group-hover:text-primary">
                    {t(`categories.${slug}`)}
                  </span>
                </Link>
              ))}
            </div>
          </div>

          <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
            <aside className="hidden lg:block">{sidebar}</aside>

            <div className="flex min-w-0 flex-col gap-6">
              <div className="overflow-hidden rounded-[10px] border border-border bg-white">
                <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 border-b border-border px-5 py-4">
                  <div className="flex flex-wrap items-center gap-1">
                    {fastFilters.map((filter) => (
                      <button
                        key={filter.key}
                        type="button"
                        onClick={() => {
                          setFast(filter.key);
                          setPage(1);
                        }}
                        className={cn(
                          "rounded-[5px] px-3.5 py-1.5 text-xs font-semibold transition-colors",
                          fast === filter.key
                            ? "bg-secondary text-white"
                            : "text-muted-foreground hover:bg-muted hover:text-foreground"
                        )}
                      >
                        {filter.label}
                      </button>
                    ))}
                  </div>
                  <span className="text-xs font-medium text-muted-foreground">
                    {t("showing", {
                      from: fromIndex + 1,
                      to: fromIndex + pageItems.length,
                      count: filtered.length,
                    })}
                  </span>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-x-5 gap-y-3 px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1.5">
                      <SlidersHorizontal className="size-4 text-orange-500" aria-hidden="true" />
                      <span className="text-sm font-semibold text-foreground capitalize">{t("sortBy")}</span>
                    </div>
                    <Select value={sort} onValueChange={(v) => setSort(v as SortValue)}>
                      <SelectTrigger size="sm" className="rounded-[8px]">
                        <SelectValue />
                      </SelectTrigger>
<SelectContent
  className="rounded-t-[10px] rounded-b-[8px] p-[5px] max-w-[calc(100vw-1.5rem)] sm:max-w-none"
  sideOffset={15}
>
  <SelectItem value="default" className="rounded-[4px]">{t("sortDefault")}</SelectItem>
  <SelectItem value="titleAsc" className="rounded-[4px]">{t("titleAsc")}</SelectItem>
  <SelectItem value="titleDesc" className="rounded-[4px]">{t("titleDesc")}</SelectItem>
  <SelectItem value="priceAsc" className="rounded-[4px]">{t("priceAsc")}</SelectItem>
  <SelectItem value="priceDesc" className="rounded-[4px]">{t("priceDesc")}</SelectItem>
</SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1.5">
                      <span className="text-sm font-semibold text-foreground capitalize">{t("show")}</span>
                      <Select value={String(show)} onValueChange={(v) => { setShow(Number(v)); setPage(1); }}>
                        <SelectTrigger size="sm" className="rounded-[8px]">
                          <SelectValue />
                        </SelectTrigger>
<SelectContent
  className="rounded-t-[10px] rounded-b-[8px] p-[5px] max-w-[calc(100vw-1.5rem)] sm:max-w-none"
  sideOffset={15}
>
  {SHOW_OPTIONS.map((n) => (
    <SelectItem key={n} value={String(n)} className="rounded-[4px]">
      {n} {t("items")}
    </SelectItem>
  ))}
</SelectContent>
                      </Select>
                    </div>
                    <div className="flex items-center gap-1" aria-label={t("viewToggle")}>
                      <button
                        type="button"
                        onClick={() => setView("two")}
                        aria-label={t("viewTwo")}
                        className={cn(
                          "flex size-8 items-center justify-center rounded-[5px] border transition-colors",
                          view === "two"
                            ? "border-secondary bg-secondary text-white"
                            : "border-border text-muted-foreground hover:text-foreground"
                        )}
                      >
                        <List className="size-4" aria-hidden="true" />
                      </button>
                      <button
                        type="button"
                        onClick={() => setView("grid")}
                        aria-label={t("viewGrid")}
                        className={cn(
                          "flex size-8 items-center justify-center rounded-[5px] border transition-colors",
                          view === "grid"
                            ? "border-secondary bg-secondary text-white"
                            : "border-border text-muted-foreground hover:text-foreground"
                        )}
                      >
                        <LayoutGrid className="size-4" aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:hidden">
                <Sheet>
                  <SheetTrigger
                    render={
                      <Button variant="outline" className="w-full gap-2 rounded-[5px]">
                        <SlidersHorizontal className="size-4" aria-hidden="true" />
                        {t("filterRefine")}
                      </Button>
                    }
                  />
                  <SheetContent side="left">
                    <SheetHeader>
                      <SheetTitle className="flex items-center gap-2">
                        <SlidersHorizontal className="size-4 text-orange-500" aria-hidden="true" />
                        {t("filterRefine")}
                      </SheetTitle>
                    </SheetHeader>
                    <div className="px-4">{sidebar}</div>
                  </SheetContent>
                </Sheet>
              </div>

              {hasActiveFilters ? (
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm text-muted-foreground">
                    {t("resultsCount", { count: filtered.length })}
                  </p>
                  <Button variant="outline" size="sm" className="rounded-[5px]" onClick={resetFilters}>
                    {t("reset")}
                  </Button>
                </div>
              ) : null}

              {pageItems.length === 0 ? (
                <div className="flex flex-col items-center gap-3 rounded-[10px] border border-dashed border-border bg-white/60 py-20 text-center">
                  <Check className="size-8 text-muted-foreground/40" aria-hidden="true" />
                  <h3 className="font-heading text-lg font-semibold">{t("emptyTitle")}</h3>
                  <p className="text-sm text-muted-foreground">{t("emptySubtitle")}</p>
                  <Button variant="outline" size="sm" className="rounded-[5px]" onClick={resetFilters}>
                    {t("reset")}
                  </Button>
                </div>
              ) : view === "two" ? (
                <div className="grid gap-5 md:grid-cols-2">
                  {pageItems.map((product) => (
                    <GridTwoCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <ProductCardGrid items={pageItems} />
              )}

              {pageCount > 1 ? (
                <div className="flex items-center justify-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="rounded-[5px]"
                    disabled={safePage === 1}
                    onClick={() => setPage(safePage - 1)}
                  >
                    {t("prev")}
                  </Button>
                  {Array.from({ length: pageCount }, (_, i) => i + 1).map((n) => (
                    <button
                      key={n}
                      type="button"
                      onClick={() => setPage(n)}
                      className={cn(
                        "flex size-9 items-center justify-center rounded-[5px] border text-sm font-semibold transition-colors",
                        safePage === n
                          ? "border-secondary bg-secondary text-white"
                          : "border-border bg-white text-muted-foreground hover:text-foreground"
                      )}
                    >
                      {n}
                    </button>
                  ))}
                  <Button
                    variant="outline"
                    size="sm"
                    className="rounded-[5px]"
                    disabled={safePage === pageCount}
                    onClick={() => setPage(safePage + 1)}
                  >
                    {t("next")}
                  </Button>
                </div>
              ) : null}
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

function ProductCardGrid({ items }: { items: Product[] }) {
  return (
    <div className="grid grid-cols-2 gap-[15px] md:grid-cols-3 xl:grid-cols-4">
      {items.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
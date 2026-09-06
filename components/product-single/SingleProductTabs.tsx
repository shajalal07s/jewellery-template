"use client";

import Image from "next/image";
import {
  BadgeCheck,
  Gem,
  HelpCircle,
  Star,
  Truck,
} from "lucide-react";
import { useRecentlyViewedStore } from "@/store/recentlyViewed.store";
import { ProductListRow } from "@/components/product-single/ProductMiniCard";
import { recommendedProducts } from "@/features/shop/singleProduct";
import { products } from "@/features/shop/products";
import { cn } from "@/lib/utils";
import { useState } from "react";
import type { Product } from "@/types/product";

interface SingleProductTabsProps {
  product: Product;
}

const TABS = ["Description", "Specification", "Reviews", "Questions"] as const;
type TabKey = (typeof TABS)[number];

const FAQS = [
  {
    q: "Is the gold certified?",
    a: "Yes, every piece is hallmark-certified and comes with an authenticity certificate from our trusted jewellers.",
  },
  {
    q: "What is the delivery time?",
    a: "Standard delivery takes 2–4 business days with a free shipping option on all orders inside the country.",
  },
  {
    q: "Can I return or exchange this item?",
    a: "Absolutely. You can return the product within 7 days of purchase for a free return or exchange.",
  },
];

const SPECS = ["Brand", "Category", "SKU", "Metal Purity", "Weight", "Stock", "Rating"];

export function SingleProductTabs({ product }: SingleProductTabsProps) {
  const [activeTab, setActiveTab] = useState<TabKey>("Description");
  const [sidebarTab, setSidebarTab] = useState<"Recently Viewed" | "Recommended">("Recommended");
  const [reviewText, setReviewText] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const recentIds = useRecentlyViewedStore((state) => state.items);
  const recent = recentIds
    .map((item) => products.find((p) => p.id === item.id))
    .filter((p): p is NonNullable<typeof p> => Boolean(p))
    .slice(0, 4);
  const recommended = recommendedProducts(product, 4);
  const sidebarItems = sidebarTab === "Recently Viewed" && recent.length > 0 ? recent : recommended;

  const specValues: Record<string, string> = {
    Brand: product.brand ?? "—",
    Category: product.category ?? "—",
    SKU: product.sku ?? "—",
    "Metal Purity": "21K / 18K Gold",
    Weight: "2.4 g – 8.6 g",
    Stock: `${product.stock} pc`,
    Rating: `${product.rating ?? 0} / 5`,
  };

  return (
    <div className="grid gap-8 lg:grid-cols-[8fr_4fr]">
      <div className="bg-card h-fit rounded-2xl border border-border p-5 md:p-7">
        <div className="flex flex-wrap gap-2.5 border-b border-border pb-4">
          {TABS.map((tab) => {
            const active = activeTab === tab;
            return (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={cn(
                  "rounded-full border px-5 py-2 text-sm font-semibold transition-colors",
                  active
                    ? "border-primary bg-primary text-primary-foreground shadow-sm"
                    : "border-border bg-white text-muted-foreground hover:border-primary/40 hover:text-foreground"
                )}
              >
                {tab}
              </button>
            );
          })}
        </div>

        <div className="pt-5">
          {activeTab === "Description" && (
            <div className="flex flex-col gap-5">
              <div>
                <h5 className="font-heading mb-2 text-lg font-semibold">Immersive elegance</h5>
                <p className="text-muted-foreground text-[15px] leading-relaxed">
                  {product.description} Each piece is hand-finished by master jewellers using
                  certified 18K–22K gold, ensuring a radiant polish that endures everyday wear.
                </p>
              </div>
              <Image
                src="/images/unimart/product-banner/product-banner-jwellerry-a-1.webp"
                alt={product.name}
                width={847}
                height={1100}
                className="w-full rounded-xl object-cover"
              />
              <div className="grid gap-4 sm:grid-cols-3">
                {[
                  { icon: Gem, title: "Genuine Gold", text: "Certified 18K–22K purity layered with 24K polish." },
                  { icon: BadgeCheck, title: "Certified Authentic", text: "Hallmark certified with an authenticity card." },
                  { icon: Truck, title: "Free Delivery", text: "Free insured shipping on all orders inside the country." },
                ].map((feature) => (
                  <div key={feature.title} className="bg-accent/40 flex flex-col gap-2 rounded-xl p-4">
                    <span className="bg-accent text-primary flex size-10 items-center justify-center rounded-full">
                      <feature.icon className="size-5" aria-hidden="true" />
                    </span>
                    <h6 className="text-sm font-semibold">{feature.title}</h6>
                    <p className="text-muted-foreground text-[13px] leading-relaxed">{feature.text}</p>
                  </div>
                ))}
              </div>
              <p className="text-muted-foreground text-[15px] leading-relaxed">
                Packaged in an elegant gift box, this piece arrives ready to gift. Limited stock — grab
                yours while the offer lasts and enjoy secure packing, insured delivery and a 7-day
                return guarantee on every purchase.
              </p>
            </div>
          )}

          {activeTab === "Specification" && (
            <div className="flex flex-col">
              {SPECS.map((spec, index) => (
                <div
                  key={spec}
                  className={cn(
                    "grid grid-cols-1 gap-1 px-4 py-3.5 text-sm sm:grid-cols-[220px_1fr] sm:gap-4",
                    index < SPECS.length - 1 && "border-border border-b",
                    index % 2 === 1 && "bg-section-2/60"
                  )}
                >
                  <span className="text-muted-foreground">{spec}</span>
                  <span className="font-medium">{specValues[spec]}</span>
                </div>
              ))}
            </div>
          )}

          {activeTab === "Reviews" && (
            <div className="flex max-w-3xl flex-col gap-6">
              <div className="flex items-center gap-3">
                <span className="text-4xl font-bold">{product.rating ?? 0}</span>
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-0.5">
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
                  </div>
                  <span className="text-muted-foreground text-xs">Based on 0 reviews</span>
                </div>
              </div>
              {submitted ? (
                <div className="bg-primary/10 border-primary/20 rounded-sm border p-4 text-sm">
                  Thank you! Your review has been submitted for approval.
                </div>
              ) : (
                <form
                  className="bg-section-2 flex flex-col gap-3 rounded-xl border border-border p-4"
                  onSubmit={(e) => {
                    e.preventDefault();
                    setSubmitted(true);
                  }}
                >
                  <label htmlFor="review" className="text-sm font-semibold">
                    Write a review
                  </label>
                  <textarea
                    id="review"
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    placeholder="Share your experience with this product..."
                    className="border-border bg-card text-foreground placeholder:text-muted-foreground min-h-24 w-full rounded-lg border px-3 py-2 text-sm outline-none focus:border-primary"
                  />
                  <button
                    type="submit"
                    disabled={!reviewText.trim()}
                    className="bg-primary text-primary-foreground hover:bg-primary/85 w-fit rounded-full px-6 py-2 text-sm font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Submit Review
                  </button>
                </form>
              )}
            </div>
          )}

          {activeTab === "Questions" && (
            <div className="flex max-w-3xl flex-col gap-3">
              {FAQS.map((faq) => (
                <details
                  key={faq.q}
                  className="bg-section-2 group rounded-xl border border-border px-4 py-3 open:bg-white"
                >
                  <summary className="flex cursor-pointer list-none items-center gap-2 text-sm font-semibold">
                    <HelpCircle className="text-primary size-4 shrink-0" aria-hidden="true" />
                    {faq.q}
                  </summary>
                  <p className="text-muted-foreground pt-2 text-[14px] leading-relaxed">{faq.a}</p>
                </details>
              ))}
            </div>
          )}
        </div>
      </div>

      <aside className="flex flex-col gap-4">
        <div className="bg-card rounded-2xl border border-border p-4">
          <div className="flex gap-2 border-b border-border pb-3">
            {(["Recently Viewed", "Recommended"] as const).map((tab) => {
              const active = sidebarTab === tab;
              return (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setSidebarTab(tab)}
                  className={cn(
                    "rounded-full border px-4 py-1.5 text-xs font-semibold transition-colors",
                    active
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border text-muted-foreground hover:border-primary/40 hover:text-foreground"
                  )}
                >
                  {tab}
                </button>
              );
            })}
          </div>
          <div className="flex flex-col gap-2.5 pt-4">
            {sidebarItems.map((item) => (
              <ProductListRow key={item.id} product={item} />
            ))}
          </div>
        </div>
        <div className="relative aspect-[3/4] overflow-hidden rounded-2xl">
          <Image
            src="/images/unimart/product-banner/product-banner-jwellerry-b-01.webp"
            alt="Jewellery promotion"
            fill
            sizes="(max-width: 1024px) 100vw, 320px"
            className="object-cover object-center"
          />
        </div>
      </aside>
    </div>
  );
}
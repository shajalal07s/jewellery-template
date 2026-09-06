"use client";

import { useTranslations } from "next-intl";
import { Star } from "lucide-react";
import type { Product } from "@/types/product";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface ProductTabsProps {
  product: Product;
}

const TABS = ["description", "additional", "reviews"] as const;
type TabKey = (typeof TABS)[number];

const SAMPLE_REVIEWS = [
  {
    name: "Nusrat J.",
    rating: 5,
    comment:
      "Absolutely stunning piece! The finish is flawless and it feels even better in person.",
  },
  {
    name: "Tanvir H.",
    rating: 4,
    comment: "Beautiful design and quick delivery. Would definitely recommend to others.",
  },
  {
    name: "Farhana K.",
    rating: 5,
    comment: "Precious quality and the packaging was premium. Very happy with the purchase.",
  },
];

export function ProductTabs({ product }: ProductTabsProps) {
  const t = useTranslations("Shop");
  const [activeTab, setActiveTab] = useState<TabKey>("description");
  const [reviewText, setReviewText] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const attributes: Array<{ label: string; value: string }> = [
    { label: t("attBrand"), value: product.brand ?? "—" },
    { label: t("attCategory"), value: product.category ?? "—" },
    { label: t("attSku"), value: product.sku ?? "—" },
    { label: t("attStock"), value: String(product.stock) },
    { label: t("attRating"), value: product.rating ? `${product.rating} / 5` : "—" },
  ];

  return (
    <div className="border-primary/25 rounded-[10px] border bg-white">
      <div className="border-primary/15 flex gap-2 overflow-x-auto border-b p-3">
        {TABS.map((key) => {
          const label =
            key === "description"
              ? t("description")
              : key === "additional"
                ? t("additionalInfo")
                : t("reviews");
          const active = activeTab === key;
          return (
            <button
              key={key}
              type="button"
              onClick={() => setActiveTab(key)}
              className={cn(
                "rounded-[5px] px-5 py-2 text-sm font-semibold whitespace-nowrap transition-colors",
                active
                  ? "bg-primary text-primary-foreground shadow-none"
                  : "text-muted-foreground hover:bg-primary/10 hover:text-foreground"
              )}
            >
              {label}
            </button>
          );
        })}
      </div>

      <div className="p-6 md:p-8">
        {activeTab === "description" && (
          <p className="text-orange-950 bg-orange-50 rounded-[5px] p-[10px] text-sm leading-relaxed">
            {product.description}
          </p>
        )}

        {activeTab === "additional" && (
          <div className="flex flex-col gap-2">
            {attributes.map((attr, index) => (
              <div
                key={attr.label}
                className={cn(
                  "grid grid-cols-2 gap-4 rounded-[5px] p-[10px] text-sm sm:grid-cols-[220px_1fr]",
                  index % 2 === 1 && "bg-muted/60"
                )}
              >
                <span className="text-muted-foreground">{attr.label}</span>
                <span className="font-medium">{attr.value}</span>
              </div>
            ))}
          </div>
        )}

        {activeTab === "reviews" && (
          <div className="grid gap-6 md:grid-cols-[1.1fr_0.9fr]">
            <div className="flex flex-col gap-4">
              <div className="border-primary/15 bg-white rounded-[5px] border p-[10px]">
                <div className="flex items-center gap-4">
                  <span className="text-4xl font-bold">{product.rating ?? 0}</span>
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={cn(
                            "size-4",
                            i < Math.round(product.rating ?? 0)
                              ? "text-secondary fill-secondary"
                              : "text-muted-foreground/30"
                          )}
                          aria-hidden="true"
                        />
                      ))}
                    </div>
                    <span className="text-muted-foreground text-sm">
                      {t("reviewsCount", { count: SAMPLE_REVIEWS.length })}
                    </span>
                  </div>
                </div>
              </div>

              {SAMPLE_REVIEWS.map((review) => (
                <div
                  key={review.name}
                  className="border-border bg-white rounded-[5px] border p-[10px]"
                >
                  <div className="mb-2 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      <span className="bg-primary/10 text-primary flex size-9 items-center justify-center rounded-full text-xs font-bold uppercase">
                        {review.name[0]}
                      </span>
                      <span className="text-sm font-semibold">{review.name}</span>
                    </div>
                    <div className="flex items-center gap-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={cn(
                            "size-3.5",
                            i < review.rating
                              ? "text-secondary fill-secondary"
                              : "text-muted-foreground/30"
                          )}
                          aria-hidden="true"
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {review.comment}
                  </p>
                </div>
              ))}
            </div>

            <div className="border-primary/15 bg-white flex h-fit flex-col gap-3 rounded-[5px] border p-[10px]">
              {submitted ? (
                <div className="bg-primary/10 border-primary/20 rounded-[5px] border p-[10px] text-sm">
                  {t("reviewThanks")}
                </div>
              ) : (
                <form
                  className="flex w-full flex-col gap-3"
                  onSubmit={(e) => {
                    e.preventDefault();
                    setSubmitted(true);
                  }}
                >
                  <label className="text-muted-foreground text-sm font-medium" htmlFor="review">
                    {t("writeReview")}
                  </label>
                  <textarea
                    id="review"
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    placeholder={t("reviewPlaceholder")}
                    className="border-border bg-card text-foreground placeholder:text-muted-foreground h-[200px] w-full rounded-[5px] border px-3 py-2 text-sm outline-none focus:border-primary"
                  />
                  <button
                    type="submit"
                    disabled={!reviewText.trim()}
                    className="bg-primary hover:bg-primary/90 text-primary-foreground w-fit rounded-full px-5 py-2 text-sm font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {t("submitReview")}
                  </button>
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
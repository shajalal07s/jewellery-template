"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { ROUTES } from "@/lib/constants";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/common/Container";
import { ProductCard } from "@/components/shop/ProductCard";
import type { Product } from "@/types/product";

interface BestItemsProps {
  products: Product[];
  variant?: "centered" | "split";
}

export function BestItems({ products, variant = "centered" }: BestItemsProps) {
  const t = useTranslations("BestItems");
  const tabs = t.raw("tabs") as string[];
  const [active, setActive] = useState(0);

  const ordered = [...products.slice(active * 2), ...products.slice(0, active * 2)];

  return (
    <section className="bg-background pb-10 md:pb-16">
      <Container>
        <div className="rounded-[16px] bg-muted px-3 py-8 md:px-6 md:py-12 lg:px-10">
          <div
            className={cn(
              "mb-8 flex flex-wrap items-center gap-4",
              variant === "centered" ? "flex-col justify-center text-center" : "justify-between"
            )}
          >
            <div className={cn("flex flex-col", variant === "centered" && "items-center")}>
              {variant === "split" && (
                <span className="text-sm font-semibold tracking-[0.16em] text-foreground uppercase">
                  {t("subtitle")}
                </span>
              )}
              <h2 className="font-heading text-3xl font-bold text-foreground md:text-4xl lg:text-[42px]">
                <span className="font-bold">{t("title")}</span> {t("titleBold")}
              </h2>
            </div>

            <div className="relative flex flex-wrap items-center gap-1 rounded-full bg-[#e9ecf1] p-1.5">
              {tabs.map((tab, i) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActive(i)}
                  aria-pressed={active === i}
                  className={cn(
                    "rounded-full px-4 py-2 text-sm font-semibold whitespace-nowrap transition-colors",
                    active === i ? "bg-primary text-primary-foreground shadow" : "text-foreground hover:text-primary"
                  )}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {variant === "split" ? (
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-6">
              <Link href={ROUTES.shop} className="group/banner relative block overflow-hidden rounded-[16px]">
                <Image
                  src="/images/unimart/product-banner/product-banner-jwellerry-b-01.webp"
                  alt="Ecommerce Product Banner Image"
                  width={1296}
                  height={1932}
                  sizes="(max-width:1024px) 100vw, 50vw"
                  className="h-full min-h-[420px] w-full object-cover transition-transform duration-700 group-hover/banner:scale-105"
                />
                <span className="bg-primary text-primary-foreground absolute top-4 left-4 z-10 inline-flex h-10 items-center rounded-full px-6 text-sm font-semibold uppercase transition-colors group-hover/banner:bg-secondary">
                  {t("shopNow")}
                </span>
              </Link>
              <div className="grid grid-cols-2 gap-3 md:gap-4">
                {ordered.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
              {ordered.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
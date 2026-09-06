"use client";

import { useTranslations } from "next-intl";
import { QRCodeSVG } from "qrcode.react";
import { Check, ScanLine } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import type { Product } from "@/types/product";

interface ProductInfoProps {
  product: Product;
  qrValue: string;
}

export function ProductInfo({ product, qrValue }: ProductInfoProps) {
  const t = useTranslations("Shop");
  const [selectedColor, setSelectedColor] = useState<string | null>(
    product.colors?.[0] ?? null
  );
  const [selectedSize, setSelectedSize] = useState<string | null>(
    product.sizes?.[0] ?? null
  );

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        {product.category ? (
          <span className="text-muted-foreground text-xs font-semibold tracking-wider uppercase">
            {product.category}
          </span>
        ) : null}
        <h1 className="font-heading text-2xl font-semibold tracking-tight md:text-3xl">
          {product.name}
        </h1>
        {product.sku ? (
          <p className="text-muted-foreground text-xs">
            <span className="font-semibold">{t("sku")}:</span> {product.sku}
          </p>
        ) : null}
        <span
          className={cn(
            "text-xs font-semibold tracking-wider uppercase",
            product.stock > 0 ? "text-emerald-600" : "text-destructive"
          )}
        >
          {product.stock > 0
            ? `${t("inStock")} (${product.stock} ${t("items")})`
            : t("outOfStock")}
        </span>
        <p className="text-orange-950 bg-orange-100 line-clamp-3 rounded-[10px] p-[10px] text-sm leading-relaxed sm:text-[13px]">
          {product.description}
        </p>
      </div>

      {product.colors && product.colors.length > 0 ? (
        <div className="flex flex-col gap-2">
          <span className="text-muted-foreground text-xs font-semibold tracking-wider uppercase">
            {t("colors")}
          </span>
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
                    "flex size-8 items-center justify-center rounded-full border-2 transition-all",
                    active ? "border-foreground scale-110" : "border-border hover:scale-105"
                  )}
                  style={{ backgroundColor: color }}
                >
                  {active ? (
                    <Check className="size-4 text-white drop-shadow" strokeWidth={3} aria-hidden="true" />
                  ) : null}
                </button>
              );
            })}
          </div>
        </div>
      ) : null}

      {product.sizes && product.sizes.length > 0 ? (
        <div className="flex flex-col gap-2">
          <span className="text-muted-foreground text-xs font-semibold tracking-wider uppercase">
            {t("sizes")}
          </span>
          <div className="flex flex-wrap gap-2">
            {product.sizes.map((size) => {
              const active = selectedSize === size;
              return (
                <button
                  key={size}
                  type="button"
                  onClick={() => setSelectedSize(size)}
                  className={cn(
                    "min-w-11 rounded-full border px-3 py-2 text-sm font-medium transition-colors",
                    active
                      ? "border-primary bg-primary text-primary-foreground"
                      : "hover:border-primary/60 text-muted-foreground hover:text-foreground"
                  )}
                >
                  {size}
                </button>
              );
            })}
          </div>
        </div>
      ) : null}

      <div className="flex flex-col gap-2.5">
        <span className="text-muted-foreground text-xs font-semibold tracking-wider uppercase">
          {t("scanQr")}
        </span>
        <div className="from-white via-[#fdfbf4] to-[#f6efdc] border-primary/30 relative overflow-hidden rounded-[16px] border bg-gradient-to-br p-5 shadow-[0_12px_36px_rgba(201,168,106,0.16)]">
          <div className="pointer-events-none absolute -top-16 -right-16 size-40 rounded-full bg-primary/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 -left-10 size-44 rounded-full bg-secondary/15 blur-3xl" />
          <span className="border-primary/70 absolute top-2.5 left-2.5 size-4 rounded-tl-[8px] border-t-2 border-l-2" />
          <span className="border-primary/70 absolute top-2.5 right-2.5 size-4 rounded-tr-[8px] border-t-2 border-r-2" />
          <span className="border-primary/70 absolute bottom-2.5 left-2.5 size-4 rounded-bl-[8px] border-b-2 border-l-2" />
          <span className="border-primary/70 absolute right-2.5 bottom-2.5 size-4 rounded-br-[8px] border-r-2 border-b-2" />

          <div className="relative flex items-center gap-4">
            <div className="shadow-[0_0_24px_rgba(201,168,106,0.5)] relative shrink-0 rounded-full bg-white p-2 ring-2 ring-primary/50">
              <QRCodeSVG value={qrValue} size={86} level="M" className="shrink-0" />
            </div>
            <div className="flex min-w-0 flex-1 flex-col gap-1.5">
              <span className="bg-primary/10 ring-primary/30 inline-flex w-fit items-center gap-1.5 rounded-full px-2 py-0.5 text-[10px] font-bold tracking-[0.18em] text-secondary uppercase ring-1">
                <ScanLine className="size-3" aria-hidden="true" />
                {t("scanQr")}
              </span>
              <span className="text-foreground text-sm font-semibold">{t("shareProduct")}</span>
              <span className="text-muted-foreground text-xs leading-relaxed">{t("qrHint")}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

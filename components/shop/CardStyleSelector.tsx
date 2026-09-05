"use client";

import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import type { ProductCardVariant } from "@/components/shop/ProductCard";

const VARIANTS: ProductCardVariant[] = ["classic", "editorial", "playful", "luxe"];

interface CardStyleSelectorProps {
  value: ProductCardVariant;
  onChange: (variant: ProductCardVariant) => void;
}

export function CardStyleSelector({ value, onChange }: CardStyleSelectorProps) {
  const t = useTranslations("CollectionFilter");

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-muted-foreground text-xs font-bold tracking-wider uppercase">
        {t("cardStyleLabel")}
      </span>
      <div className="flex items-center gap-0.5 border border-border bg-white p-0.5">
        {VARIANTS.map((variant) => (
          <button
            key={variant}
            type="button"
            onClick={() => onChange(variant)}
            className={cn(
              "px-2.5 py-1 text-xs font-semibold transition-colors",
              value === variant ? "bg-secondary text-white" : "text-foreground hover:bg-muted"
            )}
          >
            {t(`cardStyle.${variant}`)}
          </button>
        ))}
      </div>
    </div>
  );
}
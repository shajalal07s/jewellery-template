"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { useState } from "react";
import type { Product } from "@/types/product";

interface ProductGalleryProps {
  product: Product;
}

export function ProductGallery({ product }: ProductGalleryProps) {
  const t = useTranslations("Shop");
  const images = product.images.length > 0 ? product.images : [null];
  const [activeIndex, setActiveIndex] = useState(0);
  const [zoom, setZoom] = useState(false);
  const [origin, setOrigin] = useState("50% 50%");

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setOrigin(`${x}% ${y}%`);
  };

  return (
    <div className="flex flex-col gap-3 md:flex-row-reverse">
      <div
        className="relative aspect-square flex-1 cursor-zoom-in overflow-hidden rounded-[16px] border bg-muted"
        onMouseEnter={() => setZoom(true)}
        onMouseLeave={() => setZoom(false)}
        onMouseMove={handleMouseMove}
      >
        {images[activeIndex] ? (
          <Image
            src={images[activeIndex] as string}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className={cn(
              "object-cover object-center transition-transform duration-200 ease-out",
              zoom ? "scale-[2.2]" : "scale-100"
            )}
            style={{ transformOrigin: origin }}
          />
        ) : (
          <div className="from-primary/15 to-secondary/15 flex h-full w-full items-center justify-center bg-gradient-to-br p-12">
            <span className="text-primary/60 font-heading text-8xl leading-none font-bold select-none">
              {product.name[0]}
            </span>
          </div>
        )}

        <span
          className={cn(
            "pointer-events-none absolute right-3 bottom-3 rounded-sm bg-black/50 px-2 py-1 text-[10px] font-semibold tracking-wide text-white uppercase transition-opacity",
            zoom ? "opacity-100" : "opacity-0"
          )}
        >
          {t("hoverToZoom")}
        </span>
      </div>

      <div className="flex gap-3 overflow-x-auto pb-1 md:w-24 md:flex-col md:overflow-x-visible md:pb-0">
        {images.map((src, index) => (
          <button
            key={index}
            type="button"
            onClick={() => {
              setActiveIndex(index);
              setZoom(false);
            }}
            aria-label={`${product.name} ${t("imageGallery")} ${index + 1}`}
            className={cn(
              "relative aspect-square w-20 shrink-0 overflow-hidden rounded-[16px] border bg-muted transition-colors md:w-full",
              index === activeIndex
                ? "border-secondary ring-secondary/40 ring-2"
                : "hover:border-primary"
            )}
          >
            {src ? (
              <Image
                src={src}
                alt=""
                fill
                sizes="80px"
                className="object-cover object-center"
              />
            ) : (
              <span className="from-primary/15 to-secondary/15 flex h-full w-full items-center justify-center bg-gradient-to-br text-xs font-bold text-primary/60">
                {product.name[0]}
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

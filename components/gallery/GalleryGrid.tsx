"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { useState } from "react";
import { Camera, Plus, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

type FilterKey = "all" | "necklace" | "bracelet" | "ring" | "earrings" | "pendant";

interface LookbookItem {
  key: string;
  src: string;
  filter: Exclude<FilterKey, "all">;
  tall?: boolean;
}

const LOOKBOOK: LookbookItem[] = [
  { key: "necklace-1", src: "/images/unimart/product-img/jwellery/jw-a-03.webp", filter: "necklace", tall: true },
  { key: "bracelet-1", src: "/images/unimart/product-img/jwellery/jw-a-02.webp", filter: "bracelet" },
  { key: "necklace-2", src: "/images/unimart/product-img/jwellery/jw-a-04.webp", filter: "necklace" },
  { key: "ring-1", src: "/images/unimart/product-img/jwellery/jw-a-01.webp", filter: "ring" },
  { key: "necklace-3", src: "/images/unimart/product-img/jwellery/jw-a-08.webp", filter: "necklace" },
  { key: "bracelet-2", src: "/images/unimart/product-img/jwellery/jw-a-07.webp", filter: "bracelet", tall: true },
  { key: "earrings-1", src: "/images/unimart/product-img/jwellery/jw-a-06.webp", filter: "earrings" },
  { key: "necklace-4", src: "/images/unimart/product-img/jwellery/jw-a-11.webp", filter: "necklace" },
  { key: "ring-2", src: "/images/unimart/product-img/jwellery/jw-a-05.webp", filter: "ring" },
  { key: "pendant-1", src: "/images/unimart/product-img/jwellery/jw-a-10.webp", filter: "pendant", tall: true },
  { key: "earrings-2", src: "/images/unimart/product-img/jwellery/jw-a-09.webp", filter: "earrings" },
  { key: "bracelet-3", src: "/images/unimart/product-img/jwellery/jw-a-12.webp", filter: "bracelet" },
  { key: "pendant-2", src: "/images/unimart/product-img/jwellery/jw-a-12.webp", filter: "pendant" },
  { key: "ring-3", src: "/images/unimart/product-img/jwellery/jw-a-01.webp", filter: "ring", tall: true },
  { key: "necklace-5", src: "/images/unimart/product-img/jwellery/jw-a-10.webp", filter: "necklace" },
  { key: "earrings-3", src: "/images/unimart/product-img/jwellery/jw-a-06.webp", filter: "earrings" },
  { key: "bracelet-4", src: "/images/unimart/product-img/jwellery/jw-a-02.webp", filter: "bracelet" },
  { key: "ring-4", src: "/images/unimart/product-img/jwellery/jw-a-05.webp", filter: "ring" },
  { key: "necklace-6", src: "/images/unimart/product-img/jwellery/jw-a-04.webp", filter: "necklace", tall: true },
  { key: "pendant-3", src: "/images/unimart/product-img/jwellery/jw-a-03.webp", filter: "pendant" },
  { key: "earrings-4", src: "/images/unimart/product-img/jwellery/jw-a-09.webp", filter: "earrings" },
  { key: "bracelet-5", src: "/images/unimart/product-img/jwellery/jw-a-07.webp", filter: "bracelet" },
  { key: "pendant-4", src: "/images/unimart/product-img/jwellery/jw-a-08.webp", filter: "pendant" },
  { key: "ring-5", src: "/images/unimart/product-img/jwellery/jw-a-11.webp", filter: "ring" },
];

export function GalleryGrid() {
  const t = useTranslations("Gallery");
  const [active, setActive] = useState<FilterKey>("all");

  const filters: { key: FilterKey; label: string }[] = [
    { key: "all", label: t("filterAll") },
    { key: "necklace", label: t("filters.necklace") },
    { key: "bracelet", label: t("filters.bracelet") },
    { key: "ring", label: t("filters.ring") },
    { key: "earrings", label: t("filters.earrings") },
    { key: "pendant", label: t("filters.pendant") },
  ];

  const filtered =
    active === "all" ? LOOKBOOK : LOOKBOOK.filter((item) => item.filter === active);

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
        <p className="inline-flex items-center gap-2 text-sm text-muted-foreground">
          <Camera className="size-4 text-secondary" aria-hidden="true" />
          {t("results", { count: filtered.length })}
        </p>
        <div className="bg-muted inline-flex w-full flex-wrap justify-center gap-1 rounded-sm p-1 md:w-auto">
          {filters.map((filter) => (
            <button
              key={filter.key}
              type="button"
              onClick={() => setActive(filter.key)}
              className={cn(
                "rounded-sm px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors",
                active === filter.key
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="flex flex-col items-center gap-3 border border-dashed border-border py-20 text-center">
          <Plus className="size-8 text-muted-foreground/40" aria-hidden="true" />
          <h3 className="font-heading text-lg font-semibold">{t("emptyTitle")}</h3>
          <p className="text-sm text-muted-foreground">{t("emptySubtitle")}</p>
        </div>
      ) : (
        <div className="columns-2 gap-4 md:columns-3 lg:columns-4">
          {filtered.map((item) => (
            <LookbookItemCard key={item.key} item={item} viewLabel={t("viewProduct")} />
          ))}
        </div>
      )}
    </div>
  );
}

function LookbookItemCard({ item, viewLabel }: { item: LookbookItem; viewLabel: string }) {
  return (
    <figure className="group relative mb-4 block overflow-hidden border border-border bg-white">
      <div className={item.tall ? "aspect-[3/4]" : "aspect-square"}>
        <Image
          src={item.src}
          alt={item.key}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <figcaption className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-background/70 opacity-0 backdrop-blur-[2px] transition-opacity duration-300 group-hover:opacity-100">
        <span className="inline-flex size-11 items-center justify-center rounded-sm bg-secondary text-secondary-foreground">
          <ExternalLink className="size-5" aria-hidden="true" />
        </span>
        <span className="text-sm font-semibold text-foreground">{viewLabel}</span>
      </figcaption>
    </figure>
  );
}
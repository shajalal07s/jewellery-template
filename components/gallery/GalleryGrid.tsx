"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { useState } from "react";
import { Camera, Plus, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

type FilterKey = "all" | "women" | "men" | "kids" | "accessories";

interface LookbookItem {
  key: string;
  src: string;
  filter: Exclude<FilterKey, "all">;
  tall?: boolean;
}

const LOOKBOOK: LookbookItem[] = [
  { key: "women-1", src: "/images/women/women-1.jpg", filter: "women", tall: true },
  { key: "men-1", src: "/images/men/men-1.jpg", filter: "men" },
  { key: "women-2", src: "/images/women/women-2.jpg", filter: "women" },
  { key: "kids-1", src: "/images/kids/kids-1.jpg", filter: "kids" },
  { key: "women-3", src: "/images/women/women-3.jpg", filter: "women" },
  { key: "men-2", src: "/images/men/men-2.jpg", filter: "men", tall: true },
  { key: "kids-2", src: "/images/kids/kids-2.jpg", filter: "kids" },
  { key: "women-4", src: "/images/women/women-4.jpg", filter: "women" },
  { key: "men-3", src: "/images/men/men-3.jpg", filter: "men" },
  { key: "women-5", src: "/images/women/women-5.jpg", filter: "women", tall: true },
  { key: "kids-3", src: "/images/kids/kids-3.jpg", filter: "kids" },
  { key: "men-4", src: "/images/men/men-4.jpg", filter: "men" },
  { key: "women-6", src: "/images/women/women-6.jpg", filter: "women" },
  { key: "kids-4", src: "/images/kids/kids-4.jpg", filter: "kids", tall: true },
  { key: "men-5", src: "/images/men/men-5.jpg", filter: "men" },
  { key: "women-7", src: "/images/women/women-7.jpg", filter: "women" },
  { key: "kids-5", src: "/images/kids/kids-5.jpg", filter: "kids" },
  { key: "men-6", src: "/images/men/men-6.jpg", filter: "men" },
  { key: "women-8", src: "/images/women/women-8.jpg", filter: "women", tall: true },
  { key: "kids-6", src: "/images/kids/kids-6.jpg", filter: "kids" },
  { key: "men-7", src: "/images/men/men-7.jpg", filter: "men" },
  { key: "women-9", src: "/images/women/women-9.jpg", filter: "women" },
  { key: "kids-7", src: "/images/kids/kids-7.jpg", filter: "kids" },
  { key: "women-10", src: "/images/women/women-10.jpg", filter: "women" },
];

export function GalleryGrid() {
  const t = useTranslations("Gallery");
  const [active, setActive] = useState<FilterKey>("all");

  const filters: { key: FilterKey; label: string }[] = [
    { key: "all", label: t("filterAll") },
    { key: "women", label: t("filters.women") },
    { key: "men", label: t("filters.men") },
    { key: "kids", label: t("filters.kids") },
    { key: "accessories", label: t("filters.accessories") },
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
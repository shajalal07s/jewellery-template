"use client";

import Image from "next/image";
import { useFormatter, useTranslations } from "next-intl";
import { Heart, Trash2 } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { buttonVariants } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useWishlistStore } from "@/store/wishlist.store";
import { productPath } from "@/features/shop/categories";
import { cn } from "@/lib/utils";

export function HeaderWishlist() {
  const t = useTranslations("Wishlist");
  const format = useFormatter();
  const items = useWishlistStore((state) => state.items);
  const removeItem = useWishlistStore((state) => state.removeItem);

  return (
    <Popover>
      <PopoverTrigger
        openOnHover
        delay={200}
        closeDelay={100}
        nativeButton={false}
        render={
          <Link
            href="/wishlist"
            aria-label={t("title")}
            className={cn(buttonVariants({ variant: "ghost", size: "icon" }), "relative")}
          />
        }
      >
        <Heart className="size-5" aria-hidden="true" />
        {items.length > 0 ? (
          <span className="bg-primary text-primary-foreground absolute -top-1 -right-1 flex size-4 items-center justify-center rounded-full text-[10px] font-medium">
            {items.length}
          </span>
        ) : null}
      </PopoverTrigger>

      <PopoverContent align="end" sideOffset={10} className="w-80 p-0">
        <div className="flex flex-col">
          <header className="bg-muted/40 flex items-center justify-between gap-2 border-b px-4 py-3">
            <h4 className="font-heading text-sm font-medium">{t("title")}</h4>
            <span className="bg-primary/10 text-primary flex items-center gap-1 text-xs font-medium">
              <Heart className="size-3.5" aria-hidden="true" />
              {t("itemCount", { count: items.length })}
            </span>
          </header>

          {items.length === 0 ? (
            <div className="flex flex-col items-center gap-2 px-6 py-8 text-center">
              <div className="bg-muted flex size-12 items-center justify-center rounded-full">
                <Heart className="text-muted-foreground size-6" aria-hidden="true" />
              </div>
              <p className="text-sm font-medium">{t("emptyTitle")}</p>
              <p className="text-muted-foreground text-xs">{t("emptyDescription")}</p>
            </div>
          ) : (
            <ul className="max-h-64 overflow-y-auto">
              {items.map((item) => (
                <li
                  key={item.id}
                  className="hover:bg-muted/50 flex items-center gap-3 border-b px-4 py-3 last:border-b-0"
                >
                  <Link href={productPath(item.category, item.slug)} className="shrink-0">
                    <span className="bg-muted flex size-12 items-center justify-center overflow-hidden rounded-lg">
                      {item.images[0] ? (
                        <Image
                          src={item.images[0]}
                          alt={item.name}
                          width={48}
                          height={48}
                          className="size-full object-cover"
                          unoptimized
                        />
                      ) : (
                        <Heart className="text-muted-foreground size-5" aria-hidden="true" />
                      )}
                    </span>
                  </Link>
                  <div className="min-w-0 flex-1">
                    <Link
                      href={productPath(item.category, item.slug)}
                      className="text-foreground block truncate text-sm font-medium"
                    >
                      {item.name}
                    </Link>
                    <p className="text-secondary text-xs font-medium">
                      {format.number(item.price, { style: "currency", currency: "BDT" })}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeItem(item.id)}
                    aria-label={t("remove")}
                    className="hover:bg-destructive/10 hover:text-destructive text-muted-foreground flex size-8 items-center justify-center rounded-md transition-colors"
                  >
                    <Trash2 className="size-4" aria-hidden="true" />
                  </button>
                </li>
              ))}
            </ul>
          )}

          <footer className="border-t p-3">
            <Link href="/wishlist" className={cn(buttonVariants({ size: "sm" }), "w-full")}>
              {t("viewWishlist")}
            </Link>
          </footer>
        </div>
      </PopoverContent>
    </Popover>
  );
}

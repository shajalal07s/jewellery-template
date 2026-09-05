"use client";

import Image from "next/image";
import { useFormatter, useTranslations } from "next-intl";
import { CreditCard, ShoppingCart, Trash2 } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { buttonVariants } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useCartStore } from "@/store/cart.store";
import { productPath } from "@/features/shop/categories";
import { cn } from "@/lib/utils";

export function HeaderCart() {
  const t = useTranslations("CartHover");
  const format = useFormatter();
  const items = useCartStore((state) => state.items);
  const removeItem = useCartStore((state) => state.removeItem);

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  return (
    <Popover>
      <PopoverTrigger
        openOnHover
        delay={200}
        closeDelay={100}
        nativeButton={false}
        render={
          <Link
            href="/cart"
            aria-label={t("title")}
            className={cn(buttonVariants({ variant: "ghost", size: "icon" }), "relative")}
          />
        }
      >
        <ShoppingCart className="size-5" aria-hidden="true" />
        {itemCount > 0 ? (
          <span className="bg-primary text-primary-foreground absolute -top-1 -right-1 flex size-4 items-center justify-center rounded-full text-[10px] font-medium">
            {itemCount}
          </span>
        ) : null}
      </PopoverTrigger>

      <PopoverContent align="end" sideOffset={10} className="w-80 p-0">
        <div className="flex flex-col">
          <header className="bg-muted/40 flex items-center justify-between gap-2 border-b px-4 py-3">
            <h4 className="font-heading text-sm font-medium">{t("title")}</h4>
            <span className="bg-primary/10 text-primary flex items-center gap-1 text-xs font-medium">
              <ShoppingCart className="size-3.5" aria-hidden="true" />
              {t("itemCount", { count: itemCount })}
            </span>
          </header>

          {items.length === 0 ? (
            <div className="flex flex-col items-center gap-2 px-6 py-8 text-center">
              <div className="bg-muted flex size-12 items-center justify-center rounded-full">
                <ShoppingCart className="text-muted-foreground size-6" aria-hidden="true" />
              </div>
              <p className="text-sm font-medium">{t("emptyTitle")}</p>
              <p className="text-muted-foreground text-xs">{t("emptyDescription")}</p>
            </div>
          ) : (
            <ul className="max-h-64 overflow-y-auto">
              {items.map((item) => (
                <li
                  key={item.product.id}
                  className="hover:bg-muted/50 flex items-center gap-3 border-b px-4 py-3 last:border-b-0"
                >
                  <Link href={productPath(item.product.category, item.product.slug)} className="shrink-0">
                    <span className="bg-muted flex size-12 items-center justify-center overflow-hidden rounded-lg">
                      {item.product.images[0] ? (
                        <Image
                          src={item.product.images[0]}
                          alt={item.product.name}
                          width={48}
                          height={48}
                          className="size-full object-cover"
                          unoptimized
                        />
                      ) : (
                        <ShoppingCart className="text-muted-foreground size-5" aria-hidden="true" />
                      )}
                    </span>
                  </Link>
                  <div className="min-w-0 flex-1">
                    <Link
                      href={productPath(item.product.category, item.product.slug)}
                      className="text-foreground block truncate text-sm font-medium"
                    >
                      {item.product.name}
                    </Link>
                    <p className="text-muted-foreground text-xs">
                      {item.quantity} ×{" "}
                      {format.number(item.product.price, { style: "currency", currency: "BDT" })}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeItem(item.product.id)}
                    aria-label={t("remove")}
                    className="hover:bg-destructive/10 hover:text-destructive text-muted-foreground flex size-8 items-center justify-center rounded-md transition-colors"
                  >
                    <Trash2 className="size-4" aria-hidden="true" />
                  </button>
                </li>
              ))}
            </ul>
          )}

          <footer className="flex flex-col gap-2 border-t p-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">{t("subtotal")}</span>
              <span className="text-secondary font-semibold">
                {format.number(subtotal, { style: "currency", currency: "BDT" })}
              </span>
            </div>
            <div className="flex gap-2">
              <Link
                href="/cart"
                className={cn(buttonVariants({ variant: "outline", size: "sm" }), "flex-1")}
              >
                {t("viewCart")}
              </Link>
              <Link href="/cart" className={cn(buttonVariants({ size: "sm" }), "flex-1")}>
                <CreditCard className="size-4" aria-hidden="true" />
                {t("checkout")}
              </Link>
            </div>
          </footer>
        </div>
      </PopoverContent>
    </Popover>
  );
}

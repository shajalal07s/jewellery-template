"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { ArrowRight, Heart, Home, Search, ShoppingBag, User } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useCartStore } from "@/store/cart.store";
import { useWishlistStore } from "@/store/wishlist.store";
import { productPath } from "@/features/shop/categories";
import { products } from "@/features/shop/products";

export function MobileBottomBar() {
  const t = useTranslations("Header.bottom");
  const [searchOpen, setSearchOpen] = useState(false);

  const cartCount = useCartStore((s) => s.items.reduce((n, i) => n + i.quantity, 0));
  const wishlistCount = useWishlistStore((s) => s.items.length);

  return (
    <>
      <nav
        aria-label={t("label")}
        className="fixed inset-x-0 bottom-0 z-40 px-[15px] pb-[15px] md:hidden"
      >
        <div className="bg-background/95 supports-[backdrop-filter]:bg-background/80 flex items-center justify-between gap-1 rounded-full border border-border px-[15px] py-2.5 shadow-lg backdrop-blur">
          <BarIcon href="/" icon={Home} label={t("home")} />
          <button
            type="button"
            onClick={() => setSearchOpen(true)}
            aria-label={t("search")}
            className="bg-muted/70 text-foreground hover:bg-muted flex size-10 items-center justify-center rounded-full transition-colors"
          >
            <Search className="size-5" aria-hidden="true" />
          </button>
          <Link
            href="/cart"
            aria-label={t("cart")}
            className="bg-secondary text-secondary-foreground hover:bg-secondary/90 relative flex size-11 items-center justify-center rounded-full shadow-sm transition-colors"
          >
            <ShoppingBag className="size-5" aria-hidden="true" />
            {cartCount > 0 ? (
              <span className="bg-destructive text-destructive-foreground absolute -top-0.5 -right-0.5 flex h-4 min-w-4 items-center justify-center rounded-full px-1 text-[9px] font-bold">
                {cartCount}
              </span>
            ) : null}
          </Link>
          <BarIcon href="/wishlist" icon={Heart} label={t("wishlist")} count={wishlistCount} />
          <BarIcon href="/login" icon={User} label={t("profile")} />
        </div>
      </nav>

      <Dialog open={searchOpen} onOpenChange={setSearchOpen}>
        <DialogContent className="gap-0 p-0 top-[15%] sm:max-w-md">
          <SearchDialogBody onDone={() => setSearchOpen(false)} />
        </DialogContent>
      </Dialog>
    </>
  );
}

function BarIcon({
  href,
  icon: Icon,
  label,
  count,
}: {
  href: string;
  icon: typeof Home;
  label: string;
  count?: number;
}) {
  return (
    <Link
      href={href}
      aria-label={label}
      className="bg-muted/70 text-foreground hover:bg-muted relative flex size-10 items-center justify-center rounded-full transition-colors"
    >
      <Icon className="size-5" aria-hidden="true" />
      {count && count > 0 ? (
        <span className="bg-primary text-primary-foreground absolute -top-0.5 -right-0.5 flex size-4 items-center justify-center rounded-full text-[9px] font-bold">
          {count}
        </span>
      ) : null}
    </Link>
  );
}

function SearchDialogBody({ onDone }: { onDone: () => void }) {
  const t = useTranslations("Header.bottom");
  const [query, setQuery] = useState("");

  const q = query.trim().toLowerCase();
  const results = useMemo(
    () => (q ? products.filter((p) => p.name.toLowerCase().includes(q)).slice(0, 6) : []),
    [q]
  );

  return (
    <>
      <DialogHeader className="border-b px-4 pt-4 pb-3">
        <DialogTitle className="text-base">{t("search")}</DialogTitle>
        <DialogDescription className="sr-only">{t("searchDesc")}</DialogDescription>
      </DialogHeader>
      <div className="flex flex-col gap-3 p-4">
        <div className="relative">
          <Search
            className="text-muted-foreground pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2"
            aria-hidden="true"
          />
          <Input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t("searchPlaceholder")}
            className="bg-muted h-11 pl-9 text-base"
          />
        </div>

        {results.length > 0 ? (
          <ul className="border-border overflow-hidden rounded-lg border">
            {results.map((product) => (
              <li key={product.id}>
                <Link
                  href={productPath(product.category, product.slug)}
                  onClick={onDone}
                  className="hover:bg-muted flex items-center justify-between px-3 py-2.5 text-sm transition-colors"
                >
                  {product.name}
                  <ArrowRight className="text-muted-foreground size-4" aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>
        ) : q ? (
          <p className="text-muted-foreground py-4 text-center text-sm">{t("noResults")}</p>
        ) : null}
      </div>
    </>
  );
}

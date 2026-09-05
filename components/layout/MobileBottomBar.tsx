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
        className="bg-background/95 supports-[backdrop-filter]:bg-background/80 fixed inset-x-0 bottom-0 z-40 border-t backdrop-blur md:hidden"
      >
        <div className="grid grid-cols-5 border-border">
          <BarLink href="/" icon={Home} label={t("home")} />
          <button
            type="button"
            onClick={() => setSearchOpen(true)}
            aria-label={t("search")}
            className="text-muted-foreground hover:text-secondary flex flex-col items-center gap-1 py-2.5 text-[11px] font-medium"
          >
            <Search className="size-5" aria-hidden="true" />
            {t("search")}
          </button>
          <Link
            href="/cart"
            aria-label={t("cart")}
            className="relative flex flex-col items-center gap-1 py-1.5 text-[11px] font-medium"
          >
            <span className="bg-secondary text-secondary-foreground flex size-9 items-center justify-center rounded-full shadow-sm">
              <ShoppingBag className="size-4" aria-hidden="true" />
            </span>
            {cartCount > 0 ? (
              <span className="bg-destructive text-destructive-foreground absolute top-0 right-1/2 flex h-4 min-w-4 translate-x-[calc(-50%-1.25rem)] items-center justify-center rounded-full px-1 text-[9px] font-bold">
                {cartCount}
              </span>
            ) : null}
            <span className="text-muted-foreground">{t("cart")}</span>
          </Link>
          <BarIconLink href="/wishlist" icon={Heart} label={t("wishlist")} count={wishlistCount} />
          <BarLink href="/login" icon={User} label={t("profile")} />
        </div>
        <div className="h-[env(safe-area-inset-bottom)]" aria-hidden="true" />
      </nav>

      <Dialog open={searchOpen} onOpenChange={setSearchOpen}>
        <DialogContent className="gap-0 p-0 top-[15%] sm:max-w-md">
          <SearchDialogBody onDone={() => setSearchOpen(false)} />
        </DialogContent>
      </Dialog>
    </>
  );
}

function BarLink({
  href,
  icon: Icon,
  label,
}: {
  href: string;
  icon: typeof Home;
  label: string;
}) {
  return (
    <Link
      href={href}
      className="text-muted-foreground hover:text-secondary flex flex-col items-center gap-1 py-2.5 text-[11px] font-medium"
    >
      <Icon className="size-5" aria-hidden="true" />
      {label}
    </Link>
  );
}

function BarIconLink({
  href,
  icon: Icon,
  label,
  count,
}: {
  href: string;
  icon: typeof Home;
  label: string;
  count: number;
}) {
  return (
    <Link
      href={href}
      aria-label={label}
      className="text-muted-foreground hover:text-secondary relative flex flex-col items-center gap-1 py-2.5 text-[11px] font-medium"
    >
      <span className="relative">
        <Icon className="size-5" aria-hidden="true" />
        {count > 0 ? (
          <span className="bg-primary text-primary-foreground absolute -top-1.5 -right-1.5 flex size-4 items-center justify-center rounded-full text-[9px] font-bold">
            {count}
          </span>
        ) : null}
      </span>
      {label}
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

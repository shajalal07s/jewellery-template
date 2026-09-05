"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { useFormatter, useTranslations } from "next-intl";
import { usePathname, Link } from "@/i18n/navigation";
import { ChevronDown, ChevronRight, LayoutGrid } from "lucide-react";
import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { MEGA_MENU_CATEGORIES, NORMAL_LINKS } from "@/components/layout/header/nav";
import { products } from "@/features/shop/products";

export function Navbar() {
  const t = useTranslations("Header");
  const format = useFormatter();
  const pathname = usePathname();
  const [activeSlug, setActiveSlug] = useState<string>(MEGA_MENU_CATEGORIES[0].slug);

  const productBySlug = useMemo(() => {
    const map = new Map<string, (typeof products)[number]>();
    for (const product of products) map.set(product.slug, product);
    return map;
  }, []);

  const priceOf = (product: (typeof products)[number]) =>
    format.number(product.price, { style: "currency", currency: "BDT" });

  const isActive = (href: string) =>
    href === "/" ? pathname === href : pathname.startsWith(href);

  const activeCategory =
    MEGA_MENU_CATEGORIES.find((c) => c.slug === activeSlug) ?? MEGA_MENU_CATEGORIES[0];

  return (
    <nav className="hidden items-center gap-1 lg:flex" aria-label={t("mainNav")}>
      <Popover>
        <PopoverTrigger
          openOnHover
          delay={120}
          closeDelay={80}
          render={
            <button
              type="button"
              aria-haspopup="true"
              className={cn(
                "flex items-center gap-1.5 border border-border px-3 py-2 text-sm font-semibold transition-colors",
                pathname.startsWith("/products")
                  ? "bg-secondary text-secondary-foreground"
                  : "bg-secondary/10 text-secondary hover:bg-secondary hover:text-secondary-foreground"
              )}
            />
          }
        >
          <LayoutGrid className="size-4" aria-hidden="true" />
          {t("nav.categories")}
          <ChevronDown
            className="size-3.5 opacity-80 transition-transform data-[open]:rotate-180"
            aria-hidden="true"
          />
        </PopoverTrigger>

        <PopoverContent
          align="center"
          sideOffset={16}
          className="w-[min(1180px,calc(100vw-80px))] max-w-[calc(100vw-40px)] overflow-visible p-0"
        >
          <div className="border-border flex border-b">
            <div className="bg-section-2 w-60 shrink-0 border-r p-3">
              <p className="text-muted-foreground px-3 pt-1 pb-2 text-xs font-medium uppercase tracking-wide">
                {t("megaMenu.allCategories")}
              </p>
              <div className="flex flex-col gap-1">
                {MEGA_MENU_CATEGORIES.map((category) => {
                  const active = category.slug === activeCategory.slug;
                  const Icon = category.icon;
                  return (
                    <button
                      key={category.slug}
                      type="button"
                      onMouseEnter={() => setActiveSlug(category.slug)}
                      className={cn(
                        "group flex w-full items-center gap-3 border px-3 py-2.5 text-left text-sm font-medium transition-colors",
                        active
                          ? "border-secondary bg-secondary text-secondary-foreground"
                          : "hover:bg-section-2 text-foreground border-transparent hover:border-border"
                      )}
                    >
                      <span
                        className={cn(
                          "flex size-8 shrink-0 items-center justify-center border",
                          active
                            ? "bg-white/20"
                            : "bg-white shadow-sm"
                        )}
                      >
                        <Icon className="size-5" aria-hidden="true" />
                      </span>
                      {t(`categories.${category.slug}`)}
                      <ChevronRight
                        className={cn(
                          "ml-auto size-4 transition-opacity",
                          active ? "opacity-100" : "opacity-0 group-hover:opacity-60"
                        )}
                        aria-hidden="true"
                      />
                    </button>
                  );
                })}
              </div>
            </div>

            <div key={activeCategory.slug} className="animate-fade-in-up flex-1 p-5">
              <div className="mb-4 flex items-center justify-between gap-4 border-b pb-3">
                <div className="flex items-center gap-3">
                  <span className="flex size-11 items-center justify-center border border-secondary/30 bg-secondary/10">
                    <activeCategory.icon className="size-6 text-secondary" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="font-heading text-foreground text-lg font-semibold">
                      {t(`categories.${activeCategory.slug}`)}
                    </p>
                    <p className="text-muted-foreground text-xs">
                      {t(activeCategory.descKey)}
                    </p>
                  </div>
                </div>
                <Link
                  href={activeCategory.href}
                  className="text-secondary flex items-center gap-1 text-sm font-semibold hover:opacity-80"
                >
                  {t("megaMenu.viewAll")}
                  <ChevronRight className="size-4" aria-hidden="true" />
                </Link>
              </div>

              <div className="grid grid-cols-3 gap-4">
                {activeCategory.groups.map((group) => (
                  <div key={group.labelKey} className="flex flex-col gap-2">
                    <p className="text-secondary-foreground bg-secondary px-2.5 py-1 text-xs font-semibold uppercase tracking-wide">
                      {t(group.labelKey)}
                    </p>
                    <div className="grid grid-cols-2 gap-2">
                      {group.links.slice(0, 4).map((link) => {
                        const slug = link.href.split("/").pop() ?? "";
                        const product = productBySlug.get(slug);
                        const href = product
                          ? `/products/${product.category.toLowerCase()}/${product.slug}`
                          : link.href;
                        return (
                          <Link
                            key={link.href}
                            href={href}
                            className="group/card flex flex-col gap-1.5 border border-border bg-white p-1.5 transition-colors hover:bg-section-2"
                          >
                            <span className="relative block h-28 w-full overflow-hidden bg-muted">
                              {product?.images[0] ? (
                                <Image
                                  src={product.images[0]}
                                  alt={product?.name ?? ""}
                                  fill
                                  sizes="220px"
                                  className="object-cover object-center transition-transform duration-500 group-hover/card:scale-110"
                                />
                              ) : (
                                <span className="text-primary font-heading flex h-full w-full items-center justify-center text-2xl font-bold">
                                  {(product?.name ?? "?")[0]}
                                </span>
                              )}
                            </span>
                            <span className="line-clamp-1 text-center text-xs font-medium text-foreground">
                              {product?.name ?? t(link.labelKey)}
                            </span>
                            {product ? (
                              <span className="text-secondary text-center text-sm font-bold">
                                {priceOf(product)}
                              </span>
                            ) : null}
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-section-2 p-3">
            <Link
              href="/shop"
              className="text-secondary-foreground group flex items-center justify-between bg-secondary px-4 py-3 transition-opacity hover:opacity-90"
            >
              <span className="flex items-center gap-2 text-sm font-bold">
                <LayoutGrid className="size-4" aria-hidden="true" />
                {t("megaMenu.shopAll")}
              </span>
              <ChevronRight
                className="size-4 transition-transform group-hover:translate-x-1"
                aria-hidden="true"
              />
            </Link>
          </div>
        </PopoverContent>
      </Popover>

      <span className="bg-border mx-2 h-6 w-px" aria-hidden="true" />

      {NORMAL_LINKS.map((link) => {
        const active = isActive(link.href);
        return (
          <Link
            key={link.key}
            href={link.href}
            aria-current={active ? "page" : undefined}
            className={cn(
              "px-3 py-2 text-sm font-medium transition-colors",
              active
                ? "text-foreground bg-muted"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            )}
          >
            {t(`nav.${link.key}`)}
          </Link>
        );
      })}
    </nav>
  );
}

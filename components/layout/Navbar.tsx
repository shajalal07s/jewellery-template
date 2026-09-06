"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { usePathname, Link } from "@/i18n/navigation";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { NORMAL_LINKS } from "@/components/layout/header/nav";

type ElementCategory = "necklace" | "bracelet" | "ring" | "earrings" | "pendant";

interface MenuElement {
  img: string;
  name: string;
  category: ElementCategory;
  comingSoon?: boolean;
}

const MENU_ELEMENTS: MenuElement[] = [
  { img: "/images/unimart/product-img/jwellery/jw-a-01.webp", name: "21K Zirconia Statement Ring", category: "ring" },
  { img: "/images/unimart/product-img/jwellery/jw-a-02.webp", name: "21K Gold Cubic Bracelet", category: "bracelet" },
  { img: "/images/unimart/product-img/jwellery/jw-a-03.webp", name: "21K Gold Chain Necklace", category: "pendant" },
  { img: "/images/unimart/product-img/jwellery/jw-a-04.webp", name: "18K Gold Cubic Necklace", category: "necklace" },
  { img: "/images/unimart/product-img/jwellery/jw-a-05.webp", name: "Emerald Statement Ring", category: "ring", comingSoon: true },
  { img: "/images/unimart/product-img/jwellery/jw-a-06.webp", name: "Gold Teardrop Earrings", category: "earrings" },
  { img: "/images/unimart/product-img/jwellery/jw-a-07.webp", name: "18K Gold Bangle", category: "bracelet" },
  { img: "/images/unimart/product-img/jwellery/jw-a-08.webp", name: "Pearl Diamond Necklace", category: "necklace" },
  { img: "/images/unimart/product-img/jwellery/jw-a-09.webp", name: "Cubic Zirconia Earrings", category: "earrings" },
  { img: "/images/unimart/product-img/jwellery/jw-a-10.webp", name: "Gold Sunburst Pendant", category: "pendant" },
  { img: "/images/unimart/product-img/jwellery/jw-a-11.webp", name: "Layered Gold Necklace", category: "necklace" },
  { img: "/images/unimart/product-img/jwellery/jw-a-12.webp", name: "Gold Chain Bracelet", category: "bracelet" },
];

const ELEMENT_TABS: { key: ElementCategory | "all"; labelKey: string }[] = [
  { key: "all", labelKey: "megaMenu.elements.all" },
  { key: "necklace", labelKey: "megaMenu.elements.tabs.necklace" },
  { key: "bracelet", labelKey: "megaMenu.elements.tabs.bracelet" },
  { key: "ring", labelKey: "megaMenu.elements.tabs.ring" },
  { key: "earrings", labelKey: "megaMenu.elements.tabs.earrings" },
  { key: "pendant", labelKey: "megaMenu.elements.tabs.pendant" },
];

export function Navbar({
  light = false,
  anchor,
}: {
  light?: boolean;
  anchor?: React.RefObject<HTMLElement | null>;
}) {
  const t = useTranslations("Header");
  const pathname = usePathname();
  const [activeTab, setActiveTab] = useState<ElementCategory | "all">("all");

  const isActive = (href: string) =>
    href === "/" ? pathname === href : pathname.startsWith(href);

  const visibleElements = useMemo(
    () =>
      activeTab === "all"
        ? MENU_ELEMENTS
        : MENU_ELEMENTS.filter((element) => element.category === activeTab),
    [activeTab]
  );

  const countOf = (tab: ElementCategory | "all") =>
    tab === "all"
      ? MENU_ELEMENTS.length
      : MENU_ELEMENTS.filter((element) => element.category === tab).length;

  return (
    <nav className="hidden items-center gap-1 lg:flex" aria-label={t("mainNav")}>
      {NORMAL_LINKS.map((link) => {
        const active = isActive(link.href);
        return (
          <Link
            key={link.key}
            href={link.href}
            aria-current={active ? "page" : undefined}
            className={cn(
              "rounded-full px-3.5 py-2 text-sm font-medium transition-colors",
              light
                ? active
                  ? "bg-white/20 text-white"
                  : "text-white/90 hover:bg-white/10 hover:text-white"
                : active
                  ? "text-foreground bg-muted"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
            )}
          >
            {t(`nav.${link.key}`)}
          </Link>
        );
      })}

      <span className={cn("mx-2 h-6 w-px", light ? "bg-white/30" : "bg-border")} aria-hidden="true" />

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
                "flex items-center gap-1.5 rounded-full px-3.5 py-2 text-sm font-medium transition-colors",
                light
                  ? "bg-white/20 text-white hover:bg-white/10"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            />
          }
        >
          {t("nav.more")}
          <ChevronDown
            className="size-3.5 opacity-80 transition-transform data-[open]:rotate-180"
            aria-hidden="true"
          />
        </PopoverTrigger>

        <PopoverContent
          align="center"
          side="bottom"
          sideOffset={16}
          anchor={anchor}
          className="w-[min(1600px,calc(100vw-100px))] max-w-[calc(100vw-40px)] overflow-hidden p-0"
        >
          <div className="bg-section-2 max-h-[min(78vh,680px)] overflow-y-auto rounded-2xl p-6">
            <div className="bg-white shadow-[0_10px_40px_rgba(0,0,0,0.08)] rounded-[50px] px-6 py-4 sm:px-10 sm:py-5">
              <ul className="[scrollbar-width:none] flex flex-wrap items-center justify-center gap-x-6 gap-y-2 overflow-x-auto sm:gap-x-8">
                {ELEMENT_TABS.map((tab) => {
                  const active = tab.key === activeTab;
                  const count = countOf(tab.key);
                  return (
                    <li key={tab.key}>
                      <button
                        type="button"
                        onMouseEnter={() => setActiveTab(tab.key)}
                        aria-current={active ? "true" : undefined}
                        className={cn(
                          "flex items-center gap-2 whitespace-nowrap transition-colors",
                          active ? "text-primary" : "text-foreground hover:text-primary"
                        )}
                      >
                        <span className="text-lg font-semibold">{t(tab.labelKey)}</span>
                        <span
                          className={cn(
                            "flex min-w-[26px] h-[26px] items-center justify-center rounded-full px-1.5 text-xs font-semibold transition-colors",
                            active
                              ? "bg-primary text-white"
                              : "bg-accent text-primary hover:bg-primary hover:text-white"
                          )}
                        >
                          {count}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="relative pt-4 mt-4">
              <div className="grid grid-cols-[repeat(auto-fill,minmax(210px,1fr))] gap-4">
                {visibleElements.map((element) => (
                  <div
                    key={element.name}
                    className={cn(
                      "bg-white shadow-[0_0_20px_rgba(0,0,0,0.1)] rounded-xl transition-transform duration-300 hover:-translate-y-1",
                      element.comingSoon && "opacity-90"
                    )}
                  >
                    {element.comingSoon ? (
                      <div className="p-4">
                        <div className="relative overflow-hidden rounded-lg">
                          <div className="bg-black/10 h-44 w-full overflow-hidden rounded-lg backdrop-blur-[6px]">
                            <Image
                              src={element.img}
                              alt={element.name}
                              width={400}
                              height={520}
                              className="h-full w-full object-cover blur-[2px]"
                            />
                          </div>
                          <span className="bg-black text-white absolute top-1/2 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2 rounded-full px-5 py-2 text-sm font-medium whitespace-nowrap backdrop-blur-xl">
                            {t("megaMenu.elements.comingSoon")}
                          </span>
                        </div>
                        <p className="text-foreground mt-4 text-center text-sm font-semibold">
                          {element.name}
                        </p>
                      </div>
                    ) : (
                      <Link href="/shop" className="group block p-4">
                        <div className="bg-muted h-44 w-full overflow-hidden rounded-lg">
                          <Image
                            src={element.img}
                            alt={element.name}
                            width={400}
                            height={520}
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                        </div>
                        <p className="text-foreground mt-4 flex items-center justify-center gap-1.5 text-center text-sm font-semibold">
                          {element.name}
                        </p>
                      </Link>
                    )}
                  </div>
                ))}
              </div>

              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 [background:linear-gradient(to_top,#f9f9f9_0%,rgba(249,249,249,0)_62%)]"
              />
            </div>

            <div className="mt-4 flex justify-center">
              <Link
                href="/shop"
                className="text-secondary-foreground bg-secondary hover:bg-secondary/90 rounded-full px-8 py-3 text-sm font-bold transition-colors"
              >
                {t("megaMenu.elements.viewAll")}
              </Link>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </nav>
  );
}
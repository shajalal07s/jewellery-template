"use client";

import { useTranslations } from "next-intl";
import { Menu, Search } from "lucide-react";
import { useRef, useState } from "react";
import { Container } from "@/components/common/Container";
import { LanguageSwitcher } from "@/components/common/LanguageSwitcher";
import { Logo } from "@/components/common/Logo";
import { Navbar } from "@/components/layout/Navbar";
import { HeaderAccount } from "@/components/layout/header/HeaderAccount";
import { HeaderCart } from "@/components/layout/header/HeaderCart";
import { HeaderSearchBar } from "@/components/layout/header/HeaderSearchBar";
import { HeaderWishlist } from "@/components/layout/header/HeaderWishlist";
import { MobileNav } from "@/components/layout/header/MobileNav";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

export function Header() {
  const t = useTranslations("Header");
  const [open, setOpen] = useState(false);
  const [mobileSearch, setMobileSearch] = useState(false);
  const menuRowRef = useRef<HTMLDivElement>(null);

  return (
    <header className="sticky top-0 z-50 bg-background">
      {/* Middle row: logo + search + icons */}
      <div className="border-b bg-background">
        <Container className="flex h-20 items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger
                render={
                  <Button
                    variant="ghost"
                    size="icon"
                    className="lg:hidden"
                    aria-label={t("openMenu")}
                  />
                }
              >
                <Menu className="size-5" />
              </SheetTrigger>
              <SheetContent side="left" className="w-[320px] p-0">
                <SheetTitle className="sr-only">{t("mobileNav")}</SheetTitle>
                <div className="flex h-full flex-col">
                  <MobileNav onNavigate={() => setOpen(false)} />
                  <div className="border-t px-5 py-4">
                    <LanguageSwitcher />
                  </div>
                </div>
              </SheetContent>
            </Sheet>
            <Logo />
          </div>

          <div className="hidden w-full max-w-3xl flex-1 md:block">
            <HeaderSearchBar />
          </div>

          <div className="flex items-center gap-0.5">
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              aria-label={t("middle.searchAria")}
              onClick={() => setMobileSearch(true)}
            >
              <Search className="size-5" />
            </Button>
            <LanguageSwitcher />
            <HeaderWishlist />
            <HeaderCart />
            <HeaderAccount />
          </div>
        </Container>
      </div>

      {/* Bottom row: menu */}
      <div className="border-primary/15 hidden border-b bg-[#fbf7ef] lg:block">
        <Container ref={menuRowRef} className="flex h-14 items-center justify-between gap-4">
          <Navbar anchor={menuRowRef} />
          <div className="flex items-center gap-5 text-sm">
            <button
              type="button"
              className="text-muted-foreground flex items-center gap-1.5 font-medium transition-colors hover:text-secondary"
            >
              <span className="bg-secondary flex size-5 items-center justify-center rounded-full text-white text-xs font-bold">%</span>
              {t("middle.specialOffers")}
            </button>
            <span className="bg-primary/20 h-4 w-px" aria-hidden="true" />
            <button
              type="button"
              className="text-muted-foreground font-medium transition-colors hover:text-secondary"
            >
              {t("middle.recentViewed")}
            </button>
          </div>
        </Container>
      </div>

      <Dialog open={mobileSearch} onOpenChange={setMobileSearch}>
        <DialogContent className="gap-0 p-4 sm:max-w-xl">
          <DialogHeader className="sr-only">
            <DialogTitle>{t("middle.searchAria")}</DialogTitle>
          </DialogHeader>
          <HeaderSearchBar />
        </DialogContent>
      </Dialog>
    </header>
  );
}
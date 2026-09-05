"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { ArrowRight, Loader2, Search, Sparkles, TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { searchCatalog } from "@/features/search/searchCatalog";

export function HeaderSearch() {
  const t = useTranslations("Search");
  const [query, setQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [tooltipOpen, setTooltipOpen] = useState(false);

  const trimmed = query.trim().toLowerCase();
  const suggestions = trimmed
    ? searchCatalog.filter((item) => item.toLowerCase().includes(trimmed)).slice(0, 6)
    : [];

  function reset() {
    setQuery("");
    setSubmitted(false);
    setIsSearching(false);
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!trimmed) return;
    setIsSearching(true);
    window.setTimeout(() => {
      setIsSearching(false);
      setSubmitted(true);
    }, 600);
  }

  return (
    <Dialog
      open={dialogOpen}
      onOpenChange={(open) => {
        setDialogOpen(open);
        if (!open) reset();
      }}
    >
      <Popover
        open={tooltipOpen}
        onOpenChange={(open, eventDetails) => {
          if (eventDetails.reason !== "trigger-hover") return;
          setTooltipOpen(open);
        }}
      >
        <PopoverTrigger
          openOnHover
          delay={200}
          closeDelay={100}
          render={
            <Button
              variant="ghost"
              size="icon"
              aria-label={t("title")}
              onClick={() => setDialogOpen(true)}
            />
          }
        >
          <Search className="size-5" aria-hidden="true" />
        </PopoverTrigger>
        <PopoverContent
          align="end"
          sideOffset={8}
          className="bg-primary text-primary-foreground w-auto px-3 py-1.5 text-xs font-medium shadow-sm"
        >
          <span className="flex items-center gap-1.5">
            <Sparkles className="size-3.5" aria-hidden="true" />
            {t("title")}
          </span>
        </PopoverContent>
      </Popover>

      <DialogContent className="gap-0 p-0 sm:max-w-xl">
        <DialogHeader className="border-b px-5 pt-5 pb-4">
          <div className="flex items-center gap-3">
            <div className="bg-secondary/10 flex size-10 items-center justify-center rounded-lg">
              <Sparkles className="text-secondary size-5" aria-hidden="true" />
            </div>
            <div className="flex flex-col gap-0.5">
              <div className="flex items-center gap-2">
                <DialogTitle className="text-base">{t("title")}</DialogTitle>
                <Badge className="from-primary to-secondary bg-gradient-to-r px-1.5 text-[10px]">
                  {t("badge")}
                </Badge>
              </div>
              <DialogDescription className="text-xs">{t("subtitle")}</DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="flex flex-col gap-4 p-5">
          <form onSubmit={handleSubmit} className="relative">
            <Search
              className="text-muted-foreground pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2"
              aria-hidden="true"
            />
            <Input
              autoFocus
              value={query}
              onChange={(event) => {
                setQuery(event.target.value);
                setSubmitted(false);
              }}
              placeholder={t("placeholder")}
              className="bg-muted h-11 pr-20 pl-9 text-base"
              aria-label={t("placeholder")}
            />
            <div className="absolute top-1/2 right-2 -translate-y-1/2">
              <Button
                type="submit"
                size="sm"
                disabled={!trimmed || isSearching}
                className="gap-1.5"
              >
                {isSearching ? (
                  <Loader2 className="size-4 animate-spin" aria-hidden="true" />
                ) : (
                  <Sparkles className="size-4" aria-hidden="true" />
                )}
                {t("button")}
              </Button>
            </div>
          </form>

          {!trimmed ? (
            <div className="flex flex-col gap-2">
              <p className="text-muted-foreground flex items-center gap-1.5 text-xs font-medium">
                <TrendingUp className="size-3.5" aria-hidden="true" />
                {t("popular")}
              </p>
              <div className="flex flex-wrap gap-2">
                {t.raw("categories").map((category: string) => (
                  <button
                    key={category}
                    type="button"
                    onClick={() => setQuery(category)}
                    className="hover:bg-muted text-muted-foreground hover:text-foreground rounded-full border px-3 py-1 text-xs font-medium transition-colors"
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          ) : isSearching ? (
            <div className="flex flex-col items-center gap-2 py-8 text-center">
              <Loader2 className="text-secondary size-6 animate-spin" aria-hidden="true" />
              <p className="text-muted-foreground text-sm">{t("thinking")}</p>
            </div>
          ) : submitted && suggestions.length === 0 ? (
            <div className="flex flex-col items-center gap-2 py-8 text-center">
              <Search className="text-muted-foreground size-8" aria-hidden="true" />
              <p className="text-sm font-medium">{t("noResults")}</p>
            </div>
          ) : suggestions.length > 0 ? (
            <div className="flex flex-col gap-2">
              <p className="text-muted-foreground flex items-center gap-1.5 text-xs font-medium">
                <Sparkles className="text-secondary size-3.5" aria-hidden="true" />
                {t("suggestions")}
              </p>
              <ul className="border-border overflow-hidden rounded-lg border">
                {suggestions.map((suggestion) => (
                  <li key={suggestion}>
                    <button
                      type="button"
                      onClick={() => {
                        setQuery(suggestion);
                        setSubmitted(true);
                      }}
                      className="hover:bg-muted text-foreground flex w-full items-center justify-between px-3 py-2.5 text-left text-sm transition-colors"
                    >
                      {suggestion}
                      <ArrowRight className="text-muted-foreground size-4" aria-hidden="true" />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          <p className="text-muted-foreground flex items-center justify-center gap-1.5 text-center text-[11px]">
            <Sparkles className="text-secondary size-3" aria-hidden="true" />
            {t("note")}
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}

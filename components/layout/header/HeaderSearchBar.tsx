"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { ChevronDown, Loader2, Search } from "lucide-react";
import { useRouter } from "@/i18n/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const SEARCH_CATEGORIES = ["Fashion", "Furniture", "Electronics", "Beauty"];

export function HeaderSearchBar() {
  const t = useTranslations("Header.middle");
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState(0);
  const [isSearching, setIsSearching] = useState(false);

  const categories = [t("allCategories"), ...SEARCH_CATEGORIES];

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!query.trim()) return;
    setIsSearching(true);
    window.setTimeout(() => {
      setIsSearching(false);
      router.push(`/shop?q=${encodeURIComponent(query.trim())}`);
    }, 500);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-stretch overflow-hidden rounded-full border border-border bg-background focus-within:ring-1 focus-within:ring-primary/30"
    >
      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <button
              type="button"
              className="text-muted-foreground flex items-center gap-1.5 border-r px-4 text-sm font-medium transition-colors hover:text-foreground"
            >
              {categories[category]}
              <ChevronDown className="size-3.5" aria-hidden="true" />
            </button>
          }
        >
          {categories[category]}
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-48">
          {categories.map((cat, i) => (
            <DropdownMenuItem key={cat} onClick={() => setCategory(i)} className="gap-2">
              {cat}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <input
        type="text"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder={t("searchPlaceholder")}
        aria-label={t("searchAria")}
        className="min-w-0 flex-1 bg-transparent px-4 py-2.5 text-sm text-foreground outline-none placeholder:text-muted-foreground"
      />

      <button
        type="submit"
        aria-label={t("searchAria")}
        disabled={isSearching}
        className="bg-primary text-primary-foreground flex w-12 shrink-0 items-center justify-center transition-opacity hover:opacity-90 disabled:opacity-60"
      >
        {isSearching ? (
          <Loader2 className="size-5 animate-spin" aria-hidden="true" />
        ) : (
          <Search className="size-5" aria-hidden="true" />
        )}
      </button>
    </form>
  );
}
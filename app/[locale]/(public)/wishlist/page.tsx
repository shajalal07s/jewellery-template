"use client";

import Image from "next/image";
import { useFormatter, useTranslations } from "next-intl";
import { Heart, Trash2 } from "lucide-react";
import { EmptyState } from "@/components/common/EmptyState";
import { Container } from "@/components/common/Container";
import { Card, CardContent } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { useWishlistStore } from "@/store/wishlist.store";
import { productPath } from "@/features/shop/categories";
import { cn } from "@/lib/utils";

export default function WishlistPage() {
  const t = useTranslations("WishlistPage");
  const format = useFormatter();
  const items = useWishlistStore((state) => state.items);
  const removeItem = useWishlistStore((state) => state.removeItem);

  return (
    <Container className="flex flex-col gap-8 py-16">
      <div className="flex flex-col gap-1">
        <h1 className="font-heading text-2xl font-semibold tracking-tight">{t("title")}</h1>
        <p className="text-muted-foreground text-sm">{t("itemCount", { count: items.length })}</p>
      </div>

      {items.length === 0 ? (
        <EmptyState
          icon={Heart}
          title={t("emptyTitle")}
          description={t("emptyDescription")}
          action={
            <Link href="/shop" className={cn(buttonVariants({ size: "sm" }), "mt-2")}>
              {t("browseProducts")}
            </Link>
          }
        />
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <Card key={item.id}>
              <CardContent className="flex flex-col gap-4 p-4">
                <Link href={productPath(item.category, item.slug)} className="block">
                  <span className="bg-muted flex aspect-square w-full items-center justify-center overflow-hidden rounded-lg">
                    {item.images[0] ? (
                      <Image
                        src={item.images[0]}
                        alt={item.name}
                        width={400}
                        height={400}
                        className="size-full object-cover"
                        unoptimized
                      />
                    ) : (
                      <Heart className="text-muted-foreground size-8" aria-hidden="true" />
                    )}
                  </span>
                </Link>
                <div className="flex flex-col gap-1">
                  <Link
                    href={productPath(item.category, item.slug)}
                    className="text-foreground text-sm font-medium hover:underline"
                  >
                    {item.name}
                  </Link>
                  <p className="text-secondary text-sm font-medium">
                    {format.number(item.price, { style: "currency", currency: "BDT" })}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => removeItem(item.id)}
                  className="hover:bg-destructive/10 hover:text-destructive text-muted-foreground flex items-center justify-center gap-2 rounded-lg border py-2 text-sm font-medium transition-colors"
                >
                  <Trash2 className="size-4" aria-hidden="true" />
                  {t("remove")}
                </button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </Container>
  );
}

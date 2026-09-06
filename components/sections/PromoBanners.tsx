import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { ROUTES } from "@/lib/constants";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/common/Container";

interface PromoItem {
  badge: string;
  titleBold: string;
  title: string;
  description: string;
  image: string;
}

const IMAGES = [
  "/images/unimart/product-banner/product-banner-jwellerry-a-3.webp",
  "/images/unimart/product-banner/product-banner-jwellerry-a-2.webp",
  "/images/unimart/product-banner/product-banner-jwellerry-a-1.webp",
];

export async function PromoBanners() {
  const t = await getTranslations("Promo");
  const items = t.raw("items") as Omit<PromoItem, "image">[];

  return (
    <section className="bg-background pb-10 md:pb-14">
      <Container>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => (
            <Link
              key={i}
              href={ROUTES.shop}
              className={cn(
                "group/banner relative flex flex-col justify-end overflow-hidden rounded-[24px]",
                i === 2 && "sm:col-span-2 lg:col-span-1"
              )}
            >
              <Image
                src={IMAGES[i]}
                alt={`${item.titleBold} ${item.title}`}
                width={848}
                height={1100}
                sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover/banner:scale-105"
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-transparent"
                aria-hidden="true"
              />
              <div className="relative z-10 px-6 pt-24 pb-7 sm:px-7 md:pb-9">
                <h6 className="text-xs font-bold tracking-[0.22em] text-white uppercase">{item.badge}</h6>
                <h3 className="font-heading mt-1 text-3xl font-bold leading-tight text-white md:text-4xl">
                  <span className="font-bold">{item.titleBold}</span> {item.title}
                </h3>
                <p className="mt-2 text-sm text-white/85">{item.description}</p>
                <span className="mt-5 inline-flex h-11 items-center justify-center gap-2 rounded-full bg-white px-7 text-sm font-semibold text-primary transition-all group-hover/banner:bg-primary group-hover/banner:text-white">
                  {t("shopNow")}
                  <ArrowRight className="size-4" aria-hidden="true" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
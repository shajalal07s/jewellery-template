"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { ROUTES } from "@/lib/constants";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/common/Container";

interface Slide {
  src: string;
  alt: string;
  price: string;
}

const SLIDE_IMAGES = [
  "/images/unimart/product-banner/product-banner-jwellerry-h-1.webp",
  "/images/unimart/product-banner/product-banner-jwellerry-h-2.webp",
  "/images/unimart/product-banner/product-banner-jwellerry-h-3.webp",
];

const CATEGORY_IMAGES = [
  "/images/unimart/catagory-img/cat-bg-jwellerry-a-1.webp",
  "/images/unimart/catagory-img/cat-bg-jwellerry-a-2.webp",
  "/images/unimart/catagory-img/cat-bg-jwellerry-a-3.webp",
  "/images/unimart/catagory-img/cat-bg-jwellerry-a-4.webp",
  "/images/unimart/catagory-img/cat-bg-jwellerry-a-5.webp",
];

const CATEGORY_BADGES = [null, "bg-[#24bd25]", null, "bg-primary", "bg-[#e53e3e]"];

const CATEGORY_SPANS = [
  "col-span-2 sm:col-span-6 lg:col-span-5",
  "col-span-1 sm:col-span-6 lg:col-span-4",
  "col-span-1 sm:col-span-6 lg:col-span-3",
  "col-span-1 sm:col-span-6 lg:col-span-7",
  "col-span-2 sm:col-span-6 lg:col-span-5",
];

const AUTOPLAY_INTERVAL = 5000;

export function BannerSlider() {
  const t = useTranslations("Hero");
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

  const banners = t.raw("banners") as { alt: string }[];
  const prices = t.raw("prices") as string[];
  const categories = t.raw("categories") as { alt: string }[];
  const slides: Slide[] = SLIDE_IMAGES.map((src, i) => ({
    src,
    alt: banners[i]?.alt ?? src,
    price: prices[i] ?? "",
  }));

  const goTo = useCallback(
    (slideIndex: number) => {
      setIndex((slideIndex + slides.length) % slides.length);
    },
    [slides.length]
  );

  const prev = useCallback(() => {
    setIndex((current) => (current - 1 + slides.length) % slides.length);
  }, [slides.length]);

  const next = useCallback(() => {
    setIndex((current) => (current + 1) % slides.length);
  }, [slides.length]);

  useEffect(() => {
    if (paused || prefersReducedMotion) return undefined;
    const id = window.setTimeout(() => {
      setIndex((current) => (current + 1) % slides.length);
    }, AUTOPLAY_INTERVAL);
    return () => window.clearTimeout(id);
  }, [index, paused, prefersReducedMotion, slides.length]);

  return (
    <>
      <section className="bg-background pt-0 lg:py-6">
        <Container className="rounded-[24px]">
          <div className="relative overflow-hidden rounded-[24px] bg-[#d3e1f8]">
            <div
              role="region"
              aria-roledescription="carousel"
              aria-label={t("sliderAria")}
              className="group relative"
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
              onTouchStart={(event) => {
                touchStartX.current = event.touches[0].clientX;
              }}
              onTouchEnd={(event) => {
                if (touchStartX.current === null) return;
                const delta = event.changedTouches[0].clientX - touchStartX.current;
                if (Math.abs(delta) > 50) {
                  if (delta < 0) next();
                  else prev();
                }
                touchStartX.current = null;
              }}
            >
              <div className="relative h-[300px] w-full overflow-hidden sm:h-[420px] lg:h-[540px]">
                {slides.map((slide, i) => {
                  const active = i === index;
                  return (
                    <div
                      key={slide.src}
                      aria-hidden={!active}
                      className={cn(
                        "absolute inset-0 transition-opacity duration-700 ease-in-out",
                        active ? "z-10 opacity-100" : "z-0 opacity-0"
                      )}
                    >
                      <Link href={ROUTES.shop} aria-label={slide.alt} className="absolute inset-0 block">
                        <Image
                          src={slide.src}
                          alt={slide.alt}
                          fill
                          sizes="100vw"
                          priority={i === 0}
                          loading={i === 0 ? "eager" : "lazy"}
                          className="object-cover object-center"
                        />
                      </Link>
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" aria-hidden="true" />
                      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 flex w-full items-end max-w-3xl">
                        <div className="pb-1 pl-[80px] mb-6 sm:mb-10 lg:mb-14">
                          <h6 className="font-sans text-base font-normal text-white capitalize">
                            {t("subtitle")}
                          </h6>
                          <h2 className="font-heading mt-2 text-3xl leading-[1.1] font-bold text-white sm:text-4xl lg:text-5xl xl:text-6xl">
                            <span className="block">{t("titleTop")}</span>
                            {t("titleBottom")}
                          </h2>
                          <p className="mt-2 flex items-baseline gap-3 lg:mt-3">
                            <span className="text-sm font-medium text-white/90">{t("startFrom")}</span>
                            <span className="font-heading text-2xl font-bold text-white sm:text-3xl lg:text-4xl">
                              {slide.price}
                            </span>
                          </p>
                          <Link
                            href={ROUTES.shop}
                            className="mt-4 inline-flex h-11 items-center justify-center rounded-full bg-primary px-8 text-base font-semibold text-white shadow-lg transition-all hover:-translate-y-0.5 hover:bg-primary/90 sm:h-12 sm:px-10 lg:mt-6 lg:h-[50px] lg:px-20 lg:text-lg"
                          >
                            {t("shopNow")}
                          </Link>
                        </div>
                      </div>
                    </div>
                  );
                })}

                <button
                  type="button"
                  onClick={prev}
                  aria-label={t("prevSlide")}
                  className="absolute top-1/2 left-4 z-20 flex size-9 -translate-y-1/2 items-center justify-center rounded-full border border-black/5 bg-white text-foreground shadow-md transition-all hover:bg-primary hover:text-white sm:size-11 sm:left-6"
                >
                  <ChevronLeft className="size-4 sm:size-5" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={next}
                  aria-label={t("nextSlide")}
                  className="absolute top-1/2 right-4 z-20 flex size-9 -translate-y-1/2 items-center justify-center rounded-full border border-black/5 bg-white text-foreground shadow-md transition-all hover:bg-primary hover:text-white sm:size-11 sm:right-6"
                >
                  <ChevronRight className="size-4 sm:size-5" aria-hidden="true" />
                </button>

                <div className="absolute inset-x-0 bottom-0 z-20 flex items-center justify-center gap-2">
                  {slides.map((slide, i) => {
                    const active = i === index;
                    return (
                      <button
                        key={slide.src}
                        type="button"
                        aria-label={t("goToSlide", { number: i + 1 })}
                        aria-current={active}
                        onClick={() => goTo(i)}
                        className={cn(
                          "size-2.5 rounded-full transition-all duration-300",
                          active
                            ? "w-6 bg-primary"
                            : "bg-black/50 hover:bg-black/70 hover:ring-2 hover:ring-black/40"
                        )}
                      />
                    );
                  })}
                </div>

                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute bottom-0 left-1/2 z-10 h-[5%] w-[43%] -translate-x-1/2 rounded-t-xl bg-background before:absolute before:top-[15px] before:-left-[15px] before:block before:size-[30px] before:rounded-full before:bg-background before:shadow-[15px_15px_0_0_var(--background)] after:absolute after:top-[15px] after:-right-[15px] after:block after:size-[30px] after:rounded-full after:bg-background after:shadow-[-15px_15px_0_0_var(--background)]"
                />
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-background mt-5 pb-10 md:mt-0 md:pb-14">
        <Container>
<h2 className="font-heading py-2.5 mb-5 text-center text-3xl font-bold text-foreground md:text-5xl">
  {t("categoriesTitleTop")}{" "}
  <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">{t("categoriesTitleBold")}</span>
</h2>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-12 md:gap-4">
            {CATEGORY_IMAGES.map((src, i) => (
              <div
                key={src}
                className={cn("group/cat relative h-52 overflow-hidden rounded-[16px] sm:h-60 lg:h-[260px]", CATEGORY_SPANS[i])}
              >
                <Link href={ROUTES.shop} className="absolute inset-0 block" aria-label={categories[i]?.alt ?? src}>
                  <Image
                    src={src}
                    alt={categories[i]?.alt ?? src}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    loading="lazy"
                    className="object-cover object-center transition-transform duration-500 group-hover/cat:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/20 to-black/5" aria-hidden="true" />
                  <div className="absolute inset-0 flex flex-col justify-end px-4 pt-5 pb-4 sm:px-6 sm:pb-6 lg:px-7 lg:pb-7">
                    {CATEGORY_BADGES[i] && (
                      <span
                        className={cn(
                          "mb-2 w-fit rounded-[3px] px-2.5 py-1 text-[9px] font-bold tracking-[0.18em] text-white uppercase sm:mb-3",
                          CATEGORY_BADGES[i]
                        )}
                      >
                        {t("badge")}
                      </span>
                    )}
                    <p className="font-sans text-sm font-normal text-white/90 sm:text-base">
                      {t("cardSubtitle")}
                    </p>
                    <h5 className="font-heading text-lg leading-tight font-bold text-white sm:text-2xl lg:text-3xl">
                      <span className="font-bold">{t("cardTitleTop")}</span> {t("cardTitleBold")}
                    </h5>
                    <span className="mt-2 inline-flex h-9 w-fit items-center justify-center rounded-full bg-white px-5 text-sm font-semibold text-primary transition-all group-hover/cat:bg-primary group-hover/cat:text-white sm:mt-3 sm:px-6">
                      {t("shopNow")}
                    </span>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
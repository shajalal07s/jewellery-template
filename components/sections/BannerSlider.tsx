"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { ROUTES } from "@/lib/constants";
import { Link } from "@/i18n/navigation";

interface Slide {
  src: string;
  alt: string;
}

const SLIDE_IMAGES = [
  "/images/Banner/banne1.png",
  "/images/Banner/banner2.png",
  "/images/Banner/banner3.png",
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
  const slides: Slide[] = SLIDE_IMAGES.map((src, i) => ({
    src,
    alt: banners[i]?.alt ?? src,
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
    <section className="bg-background">
      <div className="w-full pb-6 md:pb-10">
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
          <div className="relative h-[280px] w-full overflow-hidden sm:h-[380px] lg:h-[520px]">
            {slides.map((slide, i) => {
              const active = i === index;
              return (
                <Link
                  key={slide.src}
                  href={ROUTES.shop}
                  aria-label={slide.alt}
                  className={cn(
                    "absolute inset-0 transition-opacity duration-700 ease-[cubic-bezier(0.33,1,0.68,1)]",
                    active ? "z-10 opacity-100" : "pointer-events-none z-0 opacity-0"
                  )}
                >
                  <Image
                    src={slide.src}
                    alt={slide.alt}
                    fill
                    sizes="100vw"
                    priority={i === 0}
                    loading={i === 0 ? "eager" : "lazy"}
                    className={cn("object-cover object-center", active && "animate-kenburns")}
                  />
                  <div
                    className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/45 to-transparent"
                    aria-hidden="true"
                  />
                  <span className="bg-background/85 text-foreground absolute bottom-4 left-4 z-10 flex items-center gap-2 border px-3 py-1.5 text-xs font-semibold tracking-wider uppercase backdrop-blur-sm sm:left-6">
                    {t("shopNow")}
                    <ArrowRight className="size-3.5" aria-hidden="true" />
                  </span>
                </Link>
              );
            })}

            <div className="bg-background/85 absolute top-4 right-4 z-20 flex items-center gap-1.5 border px-3 py-1 text-xs font-semibold tracking-widest backdrop-blur-sm">
              <span className="text-secondary">{String(index + 1).padStart(2, "0")}</span>
              <span className="text-muted-foreground">
                / {String(slides.length).padStart(2, "0")}
              </span>
            </div>

            <div className="pointer-events-none absolute top-1/2 left-4 z-20 -translate-y-1/2 opacity-0 transition-opacity duration-300 group-hover:pointer-events-auto group-hover:opacity-100 focus-within:opacity-100 max-sm:pointer-events-auto max-sm:opacity-100">
              <button
                type="button"
                onClick={prev}
                aria-label={t("prevSlide")}
                className="bg-background/85 hover:bg-primary hover:text-primary-foreground text-foreground flex size-11 items-center justify-center border shadow-sm backdrop-blur-sm transition-colors"
              >
                <ChevronLeft className="size-5" aria-hidden="true" />
              </button>
            </div>
            <div className="pointer-events-none absolute top-1/2 right-4 z-20 -translate-y-1/2 opacity-0 transition-opacity duration-300 group-hover:pointer-events-auto group-hover:opacity-100 focus-within:opacity-100 max-sm:pointer-events-auto max-sm:opacity-100">
              <button
                type="button"
                onClick={next}
                aria-label={t("nextSlide")}
                className="bg-background/85 hover:bg-primary hover:text-primary-foreground text-foreground flex size-11 items-center justify-center border shadow-sm backdrop-blur-sm transition-colors"
              >
                <ChevronRight className="size-5" aria-hidden="true" />
              </button>
            </div>

            <div className="absolute inset-x-0 bottom-4 z-20 flex items-center justify-center gap-2">
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
                        ? "scale-125 bg-gradient-to-br from-primary to-secondary shadow-md"
                        : "bg-white/60 hover:bg-white hover:ring-2 hover:ring-white/40"
                    )}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

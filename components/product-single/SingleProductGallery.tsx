"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { useCallback, useState } from "react";
import type { Product } from "@/types/product";

interface SingleProductGalleryProps {
  product: Product;
  slides: string[];
}

export function SingleProductGallery({ product, slides }: SingleProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [zoom, setZoom] = useState(false);
  const [origin, setOrigin] = useState("50% 50%");
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const goTo = useCallback(
    (index: number) => setActiveIndex((index + slides.length) % slides.length),
    [slides.length]
  );

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setOrigin(`${x}% ${y}%`);
  };

  return (
    <div className="flex flex-row items-start gap-3 sm:gap-4">
      <div className="flex max-h-[440px] flex-col gap-2 overflow-y-auto">
        {slides.map((src, index) => (
          <button
            key={`${src}-${index}`}
            type="button"
            onClick={() => setActiveIndex(index)}
            aria-label={`${product.name} image ${index + 1}`}
            className={cn(
              "relative size-16 shrink-0 overflow-hidden rounded-lg border-2 bg-section-2 transition-colors sm:size-20",
              index === activeIndex
                ? "border-primary"
                : "border-transparent hover:border-primary/40"
            )}
          >
            <Image
              src={src}
              alt=""
              fill
              sizes="80px"
              className="object-cover object-center"
            />
          </button>
        ))}
      </div>

      <div
        className="group/zoom relative flex-1 cursor-zoom-in overflow-hidden rounded-lg bg-section-2"
        onMouseEnter={() => setZoom(true)}
        onMouseLeave={() => setZoom(false)}
        onMouseMove={handleMouseMove}
      >
        <div className="relative aspect-square">
          <Image
            src={slides[activeIndex]}
            alt={product.name}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 58vw"
            className={cn(
              "object-cover object-center transition-transform duration-200 ease-out",
              zoom ? "scale-[2.2]" : "scale-100"
            )}
            style={{ transformOrigin: origin }}
          />
        </div>

        <div className="absolute top-4 left-4 flex flex-col gap-1.5">
          <span className="rounded-full bg-[#fcc418] px-3 py-1 text-[11px] font-bold tracking-widest text-black uppercase">
            New
          </span>
          <span className="rounded-full bg-[#24bd25] px-3 py-1 text-[11px] font-bold tracking-widest text-white uppercase">
            Hot
          </span>
        </div>

        <button
          type="button"
          onClick={() => goTo(activeIndex - 1)}
          aria-label="Previous image"
          className="absolute top-1/2 left-3 flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-foreground shadow-lg transition-all hover:bg-primary hover:text-white"
        >
          <ChevronLeft className="size-5" aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={() => goTo(activeIndex + 1)}
          aria-label="Next image"
          className="absolute top-1/2 right-3 flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-foreground shadow-lg transition-all hover:bg-primary hover:text-white"
        >
          <ChevronRight className="size-5" aria-hidden="true" />
        </button>

        <button
          type="button"
          onClick={() => setLightboxOpen(true)}
          className="absolute right-4 bottom-4 inline-flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 text-xs font-semibold shadow-lg transition-colors hover:bg-white"
        >
          <Maximize2 className="size-3.5" aria-hidden="true" />
          Enlarge View
        </button>
      </div>

      <Dialog open={lightboxOpen} onOpenChange={setLightboxOpen}>
        <DialogContent
          className="sm:max-w-none"
        >
          <DialogTitle className="sr-only">{product.name}</DialogTitle>
          <div className="flex items-center justify-center bg-black/95 p-2">
            <Image
              src={slides[activeIndex]}
              alt={product.name}
              width={847}
              height={1100}
              priority
              className="max-h-[80vh] w-auto rounded-lg object-contain"
            />
          </div>
          <div className="flex items-center justify-center gap-2 pb-1">
            {slides.map((src, index) => (
              <button
                key={`${src}-${index}`}
                type="button"
                onClick={() => setActiveIndex(index)}
                aria-label={`Select image ${index + 1}`}
                className={cn(
                  "relative size-12 overflow-hidden rounded-md border-2",
                  index === activeIndex ? "border-primary" : "border-white/30"
                )}
              >
                <Image src={src} alt="" fill sizes="48px" className="object-cover object-center" />
              </button>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
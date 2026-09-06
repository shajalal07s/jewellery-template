"use client";

import Image from "next/image";
import { Play } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Container } from "@/components/common/Container";
import { SectionHeader } from "@/components/product-single/SectionHeader";
import { useState } from "react";
import type { Product } from "@/types/product";

interface ReviewVideosProps {
  product: Product;
}

const VIDEO_THUMBS = [
  "/images/unimart/product-banner/product-banner-jwellerry-a-1.webp",
  "/images/unimart/product-banner/product-banner-jwellerry-a-2.webp",
  "/images/unimart/product-banner/product-banner-jwellerry-a-3.webp",
  "/images/unimart/others/video-01.webp",
];

export function ReviewVideos({ product }: ReviewVideosProps) {
  const [open, setOpen] = useState(false);

  return (
    <section className="py-12 md:py-16">
      <Container className="flex flex-col gap-7">
        <SectionHeader title="Review Videos for this product" linkLabel="Play All" linkHref="" />
        <div className="grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
          {VIDEO_THUMBS.map((src, index) => {
            const active = index === 0;
            return (
              <button
                key={src}
                type="button"
                onClick={() => setOpen(true)}
                aria-label="Play review video"
                className="group/video relative aspect-[4/3] overflow-hidden rounded-2xl"
              >
                <Image
                  src={active ? (product.images[0] as string) : src}
                  alt="Product review video"
                  fill
                  sizes="(max-width: 640px) 50vw, 25vw"
                  className="object-cover object-center transition-transform duration-700 group-hover/video:scale-105"
                />
                <span className="absolute inset-0 bg-black/30 transition-colors group-hover/video:bg-black/20" />
                <span className="absolute top-1/2 left-1/2 flex size-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 shadow-lg transition-transform group-hover/video:scale-110">
                  <Play className="text-primary ml-0.5 size-4 fill-current" aria-hidden="true" />
                </span>
              </button>
            );
          })}
        </div>
      </Container>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-none">
          <DialogTitle className="sr-only">{product.name} — review video</DialogTitle>
          <video src="/images/unimart/videos/video-review-1.mp4" controls autoPlay className="w-full rounded-lg" />
        </DialogContent>
      </Dialog>
    </section>
  );
}
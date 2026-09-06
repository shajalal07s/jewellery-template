"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { Container } from "@/components/common/Container";
import { SectionHeader } from "@/components/product-single/SectionHeader";
import { ProductMiniCard } from "@/components/product-single/ProductMiniCard";
import { boughtTogether } from "@/features/shop/singleProduct";
import { useRef } from "react";
import type { Product } from "@/types/product";

interface FrequentlyBoughtTogetherProps {
  product: Product;
}

export function FrequentlyBoughtTogether({ product }: FrequentlyBoughtTogetherProps) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const items = boughtTogether(product, 6);

  const scroll = (direction: 1 | -1) => {
    scrollerRef.current?.scrollBy({ left: direction * 300, behavior: "smooth" });
  };

  return (
    <section className="py-12 md:py-16">
      <Container className="flex flex-col gap-7">
        <SectionHeader title="Frequently Bought Together" />
        <div className="relative">
          <div
            ref={scrollerRef}
            className="flex gap-4 overflow-x-auto pb-2 scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:gap-5"
          >
            {items.map((item) => (
              <ProductMiniCard
                key={item.id}
                product={item}
                className="w-[46vw] shrink-0 sm:w-[250px]"
                showCompare={false}
              />
            ))}
          </div>
          <button
            type="button"
            onClick={() => scroll(-1)}
            aria-label="Scroll left"
            className="bg-primary text-primary-foreground hover:bg-primary/85 absolute top-1/2 -left-4 z-10 hidden -translate-y-1/2 items-center justify-center rounded-full p-2 shadow-lg lg:flex"
          >
            <ChevronLeft className="size-5" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => scroll(1)}
            aria-label="Scroll right"
            className="bg-primary text-primary-foreground hover:bg-primary/85 absolute top-1/2 -right-4 z-10 hidden -translate-y-1/2 items-center justify-center rounded-full p-2 shadow-lg lg:flex"
          >
            <ChevronRight className="size-5" aria-hidden="true" />
          </button>
        </div>
      </Container>
    </section>
  );
}
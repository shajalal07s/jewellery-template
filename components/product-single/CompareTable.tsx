"use client";

import Image from "next/image";
import { Star } from "lucide-react";
import { Container } from "@/components/common/Container";
import { SectionHeader } from "@/components/product-single/SectionHeader";
import { similarProducts, singleProductHref } from "@/features/shop/singleProduct";
import { Link } from "@/i18n/navigation";
import { useFormatter } from "next-intl";
import { cn } from "@/lib/utils";
import type { Product } from "@/types/product";

interface CompareTableProps {
  product: Product;
}

const ROWS = ["Customer Rating", "Price", "Sold By", "Material", "Weight", "Stock"] as const;

export function CompareTable({ product }: CompareTableProps) {
  const format = useFormatter();
  const items = [product, ...similarProducts(product, 3)].slice(0, 4);

  const values = (item: Product): Record<(typeof ROWS)[number], string> => ({
    "Customer Rating": `${item.rating ?? 0} / 5`,
    Price: format.number(item.price, { style: "currency", currency: "BDT" }),
    "Sold By": item.brand ?? "Rupali Jewellers",
    Material: "Certified 21K / 18K Gold",
    Weight: "2.4 g – 8.6 g",
    Stock: item.stock > 0 ? `${item.stock} in stock` : "Out of stock",
  });

  return (
    <section className="bg-section-2 py-12 md:py-16">
      <Container className="flex flex-col gap-7">
        <SectionHeader title="Compare Similar Items" />
        <div className="overflow-x-auto rounded-2xl border border-border">
          <table className="w-full min-w-[760px] border-collapse bg-white text-sm">
            <thead>
              <tr>
                <th className="bg-card text-muted-foreground w-[160px] p-4 text-left font-semibold">
                  Options
                </th>
                {items.map((item) => (
                  <th key={item.id} className="border-l border-border p-4 text-left align-top">
                    <Link
                      href={singleProductHref(item)}
                      className="group flex flex-col gap-2.5"
                    >
                      <span className="relative block aspect-square w-20 overflow-hidden rounded-lg bg-section-2 sm:w-24">
                        {item.images[0] ? (
                          <Image
                            src={item.images[0]}
                            alt={item.name}
                            fill
                            sizes="96px"
                            className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                          />
                        ) : (
                          <span className="from-primary/15 to-secondary/15 flex h-full w-full items-center justify-center bg-gradient-to-br font-heading text-3xl font-bold text-primary/50">
                            {item.name[0]}
                          </span>
                        )}
                      </span>
                      <span className="line-clamp-2 font-semibold group-hover:text-primary transition-colors">
                        {item.name}
                      </span>
                    </Link>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ROWS.map((row, index) => (
                <tr key={row} className={cn(index % 2 === 1 && "bg-section-2/50")}>
                  <td className="p-4 font-medium">{row}</td>
                  {items.map((item) => {
                    const value = values(item)[row];
                    return (
                      <td
                        key={item.id}
                        className={cn(
                          "border-l border-border p-4",
                          row === "Customer Rating" && "align-middle"
                        )}
                      >
                        {row === "Customer Rating" ? (
                          <span className="flex items-center gap-1.5">
                            <Star className="fill-primary text-primary size-4" aria-hidden="true" />
                            <span className="text-muted-foreground font-medium">{value}</span>
                          </span>
                        ) : (
                          <span>{value}</span>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Container>
    </section>
  );
}
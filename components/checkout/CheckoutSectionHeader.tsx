"use client";

import { cn } from "@/lib/utils";

interface CheckoutSectionHeaderProps {
  title: string;
  description?: string;
  className?: string;
}

export function CheckoutSectionHeader({ title, description, className }: CheckoutSectionHeaderProps) {
  return (
    <div className={cn("bg-secondary/10 border-b border-border px-5 py-4", className)}>
      <div className="flex items-start gap-3">
        <span className="bg-secondary mt-1.5 size-1.5 shrink-0 rounded-full" aria-hidden="true" />
        <div className="flex flex-col gap-0.5">
          <h3 className="font-heading text-secondary text-base font-semibold">{title}</h3>
          {description ? (
            <p className="text-secondary/70 text-sm">{description}</p>
          ) : null}
        </div>
      </div>
    </div>
  );
}

"use client";

import { cn } from "@/lib/utils";

interface CheckoutSectionHeaderProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  className?: string;
}

export function CheckoutSectionHeader({
  title,
  description,
  icon,
  className,
}: CheckoutSectionHeaderProps) {
  return (
    <div
      className={cn(
        "border-primary/15 relative flex items-center gap-3 rounded-t-[10px] border-b bg-blue-50 px-5 py-4",
        className
      )}
    >
      {icon ? (
        <span className="bg-primary/10 flex size-10 shrink-0 items-center justify-center rounded-full">
          <span className="text-secondary flex items-center justify-center">{icon}</span>
        </span>
      ) : (
        <span className="bg-primary size-2 shrink-0 rounded-full" aria-hidden="true" />
      )}
      <div className="flex min-w-0 flex-col gap-0.5">
        <h3 className="font-sans text-black text-lg font-semibold">{title}</h3>
        {description ? (
          <p className="text-muted-foreground text-xs leading-relaxed">{description}</p>
        ) : null}
      </div>
    </div>
  );
}
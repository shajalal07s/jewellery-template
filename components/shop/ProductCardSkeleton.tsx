import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface ProductCardSkeletonProps {
  className?: string;
}

export function ProductCardSkeleton({ className }: ProductCardSkeletonProps) {
  return (
    <article
      className={cn(
        "border-border relative flex flex-col border bg-white p-[5px] sm:p-2.5",
        className
      )}
    >
      <div className="shimmer-skeleton relative h-[250px] overflow-hidden bg-muted md:h-[400px]" />
      <div className="flex flex-1 flex-col items-center gap-2 pt-3">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
      </div>
    </article>
  );
}

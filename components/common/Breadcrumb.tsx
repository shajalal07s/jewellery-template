import { ChevronRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumb({ items, className }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className={cn("flex items-center gap-1.5 text-sm", className)}>
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        if (isLast || !item.href) {
          return (
            <span key={index} className="text-muted-foreground" aria-current={isLast ? "page" : undefined}>
              {item.label}
            </span>
          );
        }
        return (
          <span key={index} className="flex items-center gap-1.5">
            <Link
              href={item.href}
              className="text-foreground/70 hover:text-secondary transition-colors"
            >
              {item.label}
            </Link>
            <ChevronRight className="text-muted-foreground/50 size-3.5" aria-hidden="true" />
          </span>
        );
      })}
    </nav>
  );
}

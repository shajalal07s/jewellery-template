import { Link } from "@/i18n/navigation";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  title: string;
  linkLabel?: string;
  linkHref?: string;
  className?: string;
}

export function SectionHeader({ title, linkLabel, linkHref, className }: SectionHeaderProps) {
  return (
    <div className={cn("flex items-end justify-between gap-4", className)}>
      <h4 className="font-heading flex items-center gap-2.5 text-2xl font-semibold tracking-tight md:text-[28px]">
        <span className="bg-primary inline-block size-5 rotate-45" aria-hidden="true" />
        {title}
      </h4>
      {linkLabel && linkHref ? (
        <Link
          href={linkHref}
          className="group text-primary inline-flex items-center gap-1 text-sm font-semibold whitespace-nowrap hover:underline"
        >
          {linkLabel}
          <ChevronRight
            className="size-4 transition-transform group-hover:translate-x-0.5"
            aria-hidden="true"
          />
        </Link>
      ) : null}
    </div>
  );
}
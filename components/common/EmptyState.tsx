import type { LucideIcon } from "lucide-react";
import { Inbox } from "lucide-react";
import { cn } from "@/lib/utils";

interface EmptyStateProps {
  title: string;
  description?: string;
  icon?: LucideIcon;
  action?: React.ReactNode;
  className?: string;
  titleClassName?: string;
  iconClassName?: string;
}

export function EmptyState({
  title,
  description,
  icon: Icon = Inbox,
  action,
  className,
  titleClassName,
  iconClassName,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-4 rounded-lg border border-dashed p-12 text-center",
        className
      )}
    >
      <div
        className={cn(
          "bg-muted flex size-12 items-center justify-center rounded-full",
          iconClassName
        )}
      >
        <Icon className="text-muted-foreground size-6" aria-hidden="true" />
      </div>
      <div className="flex flex-col gap-1">
        <h3 className={cn("font-semibold", titleClassName)}>{title}</h3>
        {description ? <p className="text-muted-foreground text-sm">{description}</p> : null}
      </div>
      {action ? <div className="mt-2">{action}</div> : null}
    </div>
  );
}

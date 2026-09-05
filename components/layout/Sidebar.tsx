"use client";

import { useTranslations } from "next-intl";
import { LayoutDashboard, Package, ShoppingCart, User } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Link, usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

interface SidebarLink {
  key: string;
  href: string;
  icon: LucideIcon;
}

const SIDEBAR_LINKS: SidebarLink[] = [
  { key: "overview", href: "/dashboard", icon: LayoutDashboard },
  { key: "products", href: "/dashboard/products", icon: Package },
  { key: "orders", href: "/dashboard/orders", icon: ShoppingCart },
  { key: "profile", href: "/dashboard/profile", icon: User },
];

export function Sidebar() {
  const t = useTranslations("Dashboard.sidebar");
  const pathname = usePathname();

  return (
    <aside className="bg-muted/30 w-64 shrink-0 border-r">
      <nav className="flex flex-col gap-1 p-4" aria-label={t("navAria")}>
        {SIDEBAR_LINKS.map((link) => {
          const isActive =
            link.href === "/dashboard" ? pathname === link.href : pathname.startsWith(link.href);

          return (
            <Link
              key={link.key}
              href={link.href}
              aria-current={isActive ? "page" : undefined}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <link.icon className="size-4" aria-hidden="true" />
              {t(link.key)}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}

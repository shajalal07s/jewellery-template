"use client";

import { useTranslations } from "next-intl";
import { LayoutDashboard, LogOut, Settings, User } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { Link } from "@/i18n/navigation";
import { buttonVariants } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ROUTES } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function HeaderAccount() {
  const t = useTranslations("AccountMenu");
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <Popover>
      <PopoverTrigger
        openOnHover
        delay={200}
        closeDelay={100}
        nativeButton={false}
        render={
          <Link
            href={isAuthenticated ? ROUTES.dashboard : ROUTES.login}
            aria-label={t("title")}
            className="bg-white text-black hover:bg-orange-200 flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[13px] font-medium transition-colors"
          />
        }
      >
        <User className="size-4" aria-hidden="true" />
        <span className="hidden lg:inline">{t("title")}</span>
      </PopoverTrigger>

      <PopoverContent align="end" sideOffset={10} className="w-72 p-0">
        <div className="flex flex-col">
          <header className="bg-muted/40 flex items-center gap-3 border-b px-4 py-3">
            <div className="bg-secondary/15 text-secondary flex size-10 items-center justify-center rounded-full">
              <User className="size-4" aria-hidden="true" />
            </div>
            <div className="flex min-w-0 flex-col">
              {isAuthenticated && user ? (
                <>
                  <p className="truncate text-sm font-medium">{t("hello", { name: user.name })}</p>
                  <p className="text-muted-foreground truncate text-xs">{user.email}</p>
                </>
              ) : (
                <>
                  <p className="text-sm font-medium">{t("guestGreeting")}</p>
                  <p className="text-muted-foreground text-xs">{t("guest")}</p>
                </>
              )}
            </div>
          </header>

          {isAuthenticated ? (
            <div className="flex flex-col p-1.5">
              <Link
                href="/dashboard"
                className="hover:bg-muted text-foreground flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors"
              >
                <LayoutDashboard className="text-muted-foreground size-4" aria-hidden="true" />
                {t("dashboard")}
              </Link>
              <Link
                href="/dashboard/profile"
                className="hover:bg-muted text-foreground flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors"
              >
                <Settings className="text-muted-foreground size-4" aria-hidden="true" />
                {t("profile")}
              </Link>
              <button
                type="button"
                onClick={() => logout()}
                className="hover:bg-destructive/10 hover:text-destructive text-foreground flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors"
              >
                <LogOut className="text-muted-foreground size-4" aria-hidden="true" />
                {t("signOut")}
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-2 p-3">
              <Link href={ROUTES.login} className={cn(buttonVariants({ size: "sm" }), "w-full")}>
                {t("signIn")}
              </Link>
              <Link
                href={ROUTES.register}
                className={cn(buttonVariants({ variant: "outline", size: "sm" }), "w-full")}
              >
                {t("createAccount")}
              </Link>
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}

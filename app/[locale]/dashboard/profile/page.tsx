"use client";

import { useTranslations } from "next-intl";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function DashboardProfilePage() {
  const t = useTranslations("Dashboard.profile");
  const { user, isAuthenticated } = useAuth();

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-semibold tracking-tight">{t("title")}</h1>
      <Card className="max-w-xl">
        <CardHeader>
          <CardTitle>{t("accountInformation")}</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <dl className="grid grid-cols-3 gap-2 text-sm">
            <dt className="text-muted-foreground">{t("name")}</dt>
            <dd className="col-span-2 font-medium">
              {isAuthenticated && user ? user.name : t("guest")}
            </dd>
            <dt className="text-muted-foreground">{t("email")}</dt>
            <dd className="col-span-2 font-medium">{isAuthenticated && user ? user.email : "—"}</dd>
          </dl>
        </CardContent>
      </Card>
    </div>
  );
}

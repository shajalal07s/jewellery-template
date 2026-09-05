"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { loginSchema, type LoginFormValues } from "@/features/auth/schemas/auth.schema";
import { login as loginRequest } from "@/features/auth/services/auth.service";
import { useAuth } from "@/hooks/useAuth";
import { ROUTES, STORAGE_KEYS } from "@/lib/constants";
import { setAccessToken } from "@/lib/axios";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Link, useRouter } from "@/i18n/navigation";
import { toast } from "sonner";

export function LoginForm() {
  const t = useTranslations("Auth.login");
  const tValidation = useTranslations("Auth.validation");
  const tToast = useTranslations("Auth.toasts");
  const tCommon = useTranslations("Common");

  const router = useRouter();
  const { login } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema(tValidation)),
    defaultValues: { email: "", password: "" },
  });

  async function onSubmit(values: LoginFormValues) {
    setIsSubmitting(true);
    const result = await loginRequest(values);
    setIsSubmitting(false);

    if (result.error) {
      toast.error(result.error.message);
      return;
    }

    if (!result.data) {
      toast.error(tCommon("somethingWentWrong"));
      return;
    }

    login(result.data.user);
    setAccessToken(result.data.tokens.accessToken);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEYS.refreshToken, result.data.tokens.refreshToken);
    }
    toast.success(tToast("loginSuccess"));
    router.push(ROUTES.dashboard);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("emailLabel")}</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder={t("emailPlaceholder")}
                  autoComplete="email"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("passwordLabel")}</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder={t("passwordPlaceholder")}
                  autoComplete="current-password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isSubmitting} className="mt-2 w-full">
          {isSubmitting ? <Loader2 className="size-4 animate-spin" aria-hidden="true" /> : null}
          {isSubmitting ? t("submitting") : t("button")}
        </Button>
        <p className="text-muted-foreground text-center text-sm">
          {t("noAccount")}{" "}
          <Link
            href={ROUTES.register}
            className="text-foreground font-medium underline-offset-4 hover:underline"
          >
            {t("link")}
          </Link>
        </p>
        <div className="bg-muted/50 flex items-center justify-center gap-1.5 rounded-lg px-3 py-2 text-center text-xs">
          <span className="text-muted-foreground">{t("demoHint")}</span>
          <code className="text-foreground font-mono font-semibold">{t("demoEmail")}</code>
          <span className="text-muted-foreground">/</span>
          <code className="text-foreground font-mono font-semibold">{t("demoPassword")}</code>
        </div>
      </form>
    </Form>
  );
}

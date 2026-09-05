"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import { Send } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";

export function ContactForm() {
  const t = useTranslations("Contact");
  const [sending, setSending] = useState(false);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSending(true);
    window.setTimeout(() => {
      setSending(false);
      toast.success(t("success"));
    }, 600);
  }

  return (
    <Card className="border-border bg-white">
      <CardContent className="p-6 md:p-8">
        <div className="flex flex-col gap-1.5">
          <h3 className="font-heading text-2xl font-semibold text-foreground">{t("formTitle")}</h3>
          <p className="text-sm text-muted-foreground">{t("formSubtitle")}</p>
        </div>
        <form onSubmit={handleSubmit} className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="grid gap-2">
            <Label htmlFor="contact-name">{t("name")}</Label>
            <Input id="contact-name" placeholder={t("name")} required />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="contact-email">{t("email")}</Label>
            <Input id="contact-email" type="email" placeholder="you@example.com" required />
          </div>
          <div className="grid gap-2 sm:col-span-2">
            <Label htmlFor="contact-subject">{t("subject")}</Label>
            <Input id="contact-subject" placeholder={t("subject")} />
          </div>
          <div className="grid gap-2 sm:col-span-2">
            <Label htmlFor="contact-message">{t("message")}</Label>
            <Textarea id="contact-message" rows={5} placeholder={t("message")} required />
          </div>
          <div className="sm:col-span-2">
            <Button type="submit" className="w-full gap-2 py-6 sm:w-auto" disabled={sending}>
              <Send className="size-4" aria-hidden="true" />
              {t("submit")}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

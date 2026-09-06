"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import { Send } from "lucide-react";

export function NewsletterForm() {
  const t = useTranslations("Footer");
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setEmail("");
  };

  if (subscribed) {
    return (
      <p className="bg-primary/10 border-primary/40 rounded-[5px] border px-3 py-2.5 text-sm text-secondary">
        {t("newsletterSuccess")}
      </p>
    );
  }

  return (
    <form className="flex gap-1.5" onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder={t("newsletterPlaceholder")}
        className="border-primary/25 w-full rounded-[5px] border bg-white px-3 py-2.5 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:ring-1 focus:ring-secondary"
      />
      <button
        type="submit"
        aria-label={t("newsletterSubscribe")}
        className="bg-secondary hover:bg-secondary/90 flex shrink-0 items-center justify-center rounded-[5px] px-3.5 text-white transition-colors"
      >
        <Send className="size-4" aria-hidden="true" />
      </button>
    </form>
  );
}
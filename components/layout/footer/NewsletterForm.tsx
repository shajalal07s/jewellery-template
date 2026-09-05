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
      <p className="bg-secondary/20 border border-secondary/40 px-3 py-2.5 text-sm text-white">
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
        className="w-full bg-white/10 px-3 py-2.5 text-sm text-white placeholder:text-white/40 outline-none focus:ring-1 focus:ring-secondary"
      />
      <button
        type="submit"
        aria-label={t("newsletterSubscribe")}
        className="bg-secondary hover:bg-secondary/90 flex shrink-0 items-center justify-center px-3.5 text-white transition-colors"
      >
        <Send className="size-4" aria-hidden="true" />
      </button>
    </form>
  );
}

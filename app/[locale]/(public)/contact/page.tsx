import type { Metadata } from "next";
import { Mail, MapPin, Phone, Clock, MessageSquarePlus, MessageCircle, ChevronDown } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Container } from "@/components/common/Container";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Card, CardContent } from "@/components/ui/card";
import { ContactForm } from "@/components/contact/ContactForm";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/contact">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Contact" });

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
  };
}

const INFO_KEYS = ["address", "phone", "email", "hours"] as const;

export default async function ContactPage({ params }: PageProps<"/[locale]/contact">) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Contact");

  const icons = { address: MapPin, phone: Phone, email: Mail, hours: Clock } as const;
  const faqs = t.raw("faqs") as { question: string; answer: string }[];

  return (
    <>
      <section className="border-b bg-gradient-to-br from-primary/15 via-background to-secondary/10 py-14 md:py-20">
        <Container className="flex flex-col items-center text-center gap-5">
          <span className="inline-flex items-center gap-2 rounded-sm bg-secondary/15 px-4 py-1.5 text-sm font-semibold tracking-wide text-secondary uppercase">
            <MessageSquarePlus className="size-4" aria-hidden="true" />
            {t("heroBadge")}
          </span>
          <h1 className="font-heading max-w-3xl text-3xl font-bold tracking-tight text-foreground md:text-5xl">
            {t("heroTitle")}
          </h1>
          <p className="max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
            {t("heroSubtitle")}
          </p>
        </Container>
      </section>

      <section className="py-14 md:py-20">
        <Container>
          <SectionHeading title={t("infoTitle")} subtitle={t("infoSubtitle")} align="center" />

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {INFO_KEYS.map((key) => {
              const Icon = icons[key];
              return (
                <Card key={key} className="border-border bg-white text-center transition-colors hover:bg-section-2">
                  <CardContent className="flex flex-col items-center gap-3 p-6">
                    <div className="flex size-12 items-center justify-center rounded-sm bg-secondary/10 text-secondary">
                      <Icon className="size-5" aria-hidden="true" />
                    </div>
                    <p className="text-xs font-bold tracking-wider text-muted-foreground uppercase">
                      {t(`info.${key}.label`)}
                    </p>
                    <p className="text-sm font-medium text-foreground">{t(`info.${key}.value`)}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-[1fr_1.15fr]">
            <div className="flex flex-col gap-6">
              <Card className="border-0 bg-[#1a0d00] text-white">
                <CardContent className="flex flex-col items-center gap-3 p-8 text-center">
                  <div className="flex size-14 items-center justify-center rounded-sm bg-secondary text-secondary-foreground">
                    <MessageCircle className="size-7" aria-hidden="true" />
                  </div>
                  <h3 className="font-heading text-xl font-semibold">{t("info.phone.label")}</h3>
                  <p className="text-white/80 text-lg font-semibold">{t("info.phone.value")}</p>
                  <p className="text-white/60 text-sm">{t("info.hours.value")}</p>
                </CardContent>
              </Card>

              <Card className="border-border bg-white">
                <CardContent className="p-6">
                  <h3 className="font-heading mb-4 text-lg font-semibold text-foreground">
                    {t("faqTitle")}
                  </h3>
                  <div className="flex flex-col gap-2">
                    {faqs.map((faq, i) => (
                      <details
                        key={i}
                        className="group border border-border bg-muted/30 open:bg-section-2"
                      >
                        <summary className="flex cursor-pointer list-none items-center justify-between gap-3 p-4 text-sm font-medium text-foreground">
                          <span>{faq.question}</span>
                          <ChevronDown className="size-4 shrink-0 text-secondary transition-transform group-open:rotate-180" aria-hidden="true" />
                        </summary>
                        <p className="border-t border-border px-4 pb-4 pt-3 text-sm leading-relaxed text-muted-foreground">
                          {faq.answer}
                        </p>
                      </details>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <ContactForm />
          </div>
        </Container>
      </section>
    </>
  );
}
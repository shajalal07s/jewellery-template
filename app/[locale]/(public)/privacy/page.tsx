import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Container } from "@/components/common/Container";
import { Card, CardContent } from "@/components/ui/card";
import { ShieldCheck, Lock } from "lucide-react";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/privacy">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Privacy" });

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
  };
}

export default async function PrivacyPage({
  params,
}: PageProps<"/[locale]/privacy">) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Privacy");

  const sections = t.raw("sections") as { title: string; body: string }[];

  return (
    <>
      <section className="border-b bg-gradient-to-br from-secondary/15 via-background to-primary/10 py-14 md:py-20">
        <Container className="flex flex-col items-center text-center gap-5">
          <span className="inline-flex items-center gap-2 rounded-sm bg-primary/15 px-4 py-1.5 text-sm font-semibold tracking-wide text-primary uppercase">
            <ShieldCheck className="size-4" aria-hidden="true" />
            {t("heroBadge")}
          </span>
          <h1 className="font-heading max-w-3xl text-3xl font-bold tracking-tight text-foreground md:text-5xl">
            {t("heroTitle")}
          </h1>
          <p className="max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
            {t("heroSubtitle")}
          </p>
          <div className="mt-2 flex flex-wrap items-center justify-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-sm border border-border bg-white px-4 py-2 text-sm font-medium text-muted-foreground">
              <Lock className="size-3.5 text-secondary" aria-hidden="true" />
              {t("lastUpdated")}
            </span>
          </div>
        </Container>
      </section>

      <section className="py-14 md:py-20">
        <Container className="gap-8 lg:grid lg:grid-cols-[280px_1fr]">
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <Card className="border-border bg-white">
              <CardContent className="p-5">
                <h2 className="font-heading mb-4 text-sm font-bold tracking-wider text-foreground uppercase">
                  {t("sectionTitle")}
                </h2>
                <div className="flex flex-col">
                  {sections.map((section, i) => (
                    <a
                      key={i}
                      href={`#privacy-${i + 1}`}
                      className="border-l-2 border-border py-2 pl-4 text-sm text-muted-foreground transition-colors hover:border-secondary hover:text-foreground"
                    >
                      {section.title}
                    </a>
                  ))}
                </div>
              </CardContent>
            </Card>
          </aside>

          <div className="flex flex-col gap-6">
            {sections.map((section, i) => (
              <Card
                key={i}
                id={`privacy-${i + 1}`}
                className="scroll-mt-28 border-border bg-white"
              >
                <CardContent className="flex items-start gap-4 p-6 md:p-8">
                  <div className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-sm bg-primary/10 text-primary">
                    <Lock className="size-4" aria-hidden="true" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <h3 className="font-heading text-lg font-semibold text-foreground">
                      {section.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {section.body}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Container } from "@/components/common/Container";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollText, CheckCircle2 } from "lucide-react";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/terms">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Terms" });

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
  };
}

export default async function TermsPage({ params }: PageProps<"/[locale]/terms">) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Terms");

  const sections = t.raw("sections") as { title: string; body: string }[];

  return (
    <>
      <section className="border-b bg-gradient-to-br from-primary/15 via-background to-secondary/10 py-14 md:py-20">
        <Container className="flex flex-col items-center text-center gap-5">
          <span className="inline-flex items-center gap-2 rounded-sm bg-secondary/15 px-4 py-1.5 text-sm font-semibold tracking-wide text-secondary uppercase">
            <ScrollText className="size-4" aria-hidden="true" />
            {t("heroBadge")}
          </span>
          <h1 className="font-heading max-w-3xl text-3xl font-bold tracking-tight text-foreground md:text-5xl">
            {t("heroTitle")}
          </h1>
          <p className="max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
            {t("heroSubtitle")}
          </p>
          <span className="mt-1 rounded-sm border border-border bg-white px-4 py-1.5 text-xs font-medium text-muted-foreground">
            {t("lastUpdated")}
          </span>
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
                      href={`#terms-${i + 1}`}
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
              <Card key={i} id={`terms-${i + 1}`} className="border-border bg-white">
                <CardContent className="flex items-start gap-4 p-6 md:p-8">
                  <div className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-sm bg-secondary/10 text-secondary">
                    <CheckCircle2 className="size-4" aria-hidden="true" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <h3 className="font-heading text-lg font-semibold text-foreground">
                      {section.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">{section.body}</p>
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
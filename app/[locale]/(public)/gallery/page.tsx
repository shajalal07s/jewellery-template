import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Container } from "@/components/common/Container";
import { Images } from "lucide-react";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/gallery">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Gallery" });

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
  };
}

export default async function GalleryPage({ params }: PageProps<"/[locale]/gallery">) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Gallery");

  return (
    <>
      <section className="border-b bg-gradient-to-br from-primary/15 via-background to-secondary/10 py-14 md:py-20">
        <Container className="flex flex-col items-center text-center gap-5">
          <span className="inline-flex items-center gap-2 rounded-sm bg-secondary/15 px-4 py-1.5 text-sm font-semibold tracking-wide text-secondary uppercase">
            <Images className="size-4" aria-hidden="true" />
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
          <GalleryGrid />
        </Container>
      </section>
    </>
  );
}
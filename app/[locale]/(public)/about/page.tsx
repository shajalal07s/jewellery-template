import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Container } from "@/components/common/Container";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Shield, Heart, Leaf, Users, Package, Star, MapPin, Target, Eye, Sparkles, TrendingUp, Trophy, Rocket } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/about">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "About" });

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
  };
}

export default async function AboutPage({ params }: PageProps<"/[locale]/about">) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("About");

  return (
    <>
      <section className="from-secondary via-primary to-secondary relative overflow-hidden bg-gradient-to-br">
        <div className="from-primary via-secondary to-primary absolute inset-0 bg-gradient-to-br opacity-70" aria-hidden="true" />
        <div className="absolute -top-24 -right-24 size-96 rounded-full bg-white/15 blur-3xl" aria-hidden="true" />
        <div className="absolute -bottom-28 -left-20 size-80 rounded-full bg-white/15 blur-3xl" aria-hidden="true" />
        <div className="from-transparent via-white/10 to-transparent absolute inset-x-0 top-0 h-px" aria-hidden="true" />

        <Container className="relative flex flex-col items-center justify-center gap-6 py-[30px] text-center md:py-16">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-xs font-bold tracking-[0.2em] text-white uppercase ring-1 ring-white/30 backdrop-blur-sm">
            <Sparkles className="size-3.5" aria-hidden="true" />
            {t("heroBadge")}
          </span>

          <h1 className="font-heading text-[25px] font-bold text-white/95 md:text-5xl md:leading-tight">
            {t("heroTitle")}
          </h1>

          <p className="max-w-2xl text-sm leading-relaxed text-white/85 md:text-lg">
            {t("heroSubtitle")}
          </p>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link href="/shop">
              <Button
                size="lg"
                className="gap-2 bg-foreground px-8 text-background shadow-lg hover:bg-foreground/90"
              >
                {t("cta.button")}
                <ArrowRight className="size-4" aria-hidden="true" />
              </Button>
            </Link>
            <Link href="#story">
              <Button
                size="lg"
                variant="outline"
                className="gap-2 border-white/40 bg-white/5 px-8 text-white backdrop-blur-sm hover:border-white/70 hover:bg-white/10 hover:text-white"
              >
                {t("story.title")}
              </Button>
            </Link>
          </div>
        </Container>
      </section>

      <section id="mission" className="bg-section-2 py-16 md:py-24">
        <Container>
          <div className="grid items-center gap-10 md:grid-cols-3 md:gap-12">
            <div className="flex flex-col items-center gap-4 text-center md:items-end md:text-right">
              <div className="bg-primary p-4 text-primary-foreground">
                <Target className="size-7" aria-hidden="true" />
              </div>
              <h2 className="font-heading text-2xl font-bold text-foreground md:text-3xl">
                {t("mission.title")}
              </h2>
              <p className="max-w-sm text-base leading-relaxed text-muted-foreground md:text-lg">
                {t("mission.description")}
              </p>
            </div>

            <div className="relative mx-auto aspect-[5/6] w-full max-w-xs overflow-hidden ring-1 ring-border md:max-w-none">
              <Image
                src="/images/women/women-3.jpg"
                alt={t("mission.title")}
                fill
                sizes="(min-width: 768px) 33vw, 100vw"
                className="object-cover"
              />
            </div>

            <div className="flex flex-col items-center gap-4 text-center md:items-start md:text-left">
              <div className="bg-secondary p-4 text-secondary-foreground">
                <Eye className="size-7" aria-hidden="true" />
              </div>
              <h2 className="font-heading text-2xl font-bold text-foreground md:text-3xl">
                {t("vision.title")}
              </h2>
              <p className="max-w-sm text-base leading-relaxed text-muted-foreground md:text-lg">
                {t("vision.description")}
              </p>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-background py-16 md:py-24">
        <Container>
          <SectionHeading title={t("values.title")} />
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {[
              { icon: Shield, label: t("values.quality.title"), desc: t("values.quality.description") },
              { icon: Heart, label: t("values.authenticity.title"), desc: t("values.authenticity.description") },
              { icon: Users, label: t("values.customer.title"), desc: t("values.customer.description") },
              { icon: Leaf, label: t("values.sustainability.title"), desc: t("values.sustainability.description") },
            ].map((value, i) => (
              <Card key={i} className="border-border bg-white hover:bg-section-2 transition-colors h-full">
                <CardContent className="flex flex-col items-center text-center gap-4 p-6">
                  <div className="bg-primary text-primary-foreground p-4">
                    <value.icon className="size-6" aria-hidden="true" />
                  </div>
                  <h3 className="font-heading text-lg font-semibold text-foreground">{value.label}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{value.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-section-2 py-16 md:py-24">
        <Container>
          <div className="grid md:grid-cols-4 gap-6 text-center">
            {[
              { value: "50,000+", label: t("stats.customers"), icon: Users },
              { value: "1,00,000+", label: t("stats.orders"), icon: Package },
              { value: "500+", label: t("stats.products"), icon: Star },
              { value: "64", label: t("stats.cities"), icon: MapPin },
            ].map((stat, i) => (
              <div key={i} className="flex flex-col items-center gap-2 p-4">
                <div className="bg-primary/10 text-primary p-3 rounded-full">
                  <stat.icon className="size-5" aria-hidden="true" />
                </div>
                <div className="font-heading text-3xl md:text-4xl font-bold text-foreground">{stat.value}</div>
                <div className="text-muted-foreground text-sm font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-background py-16 md:py-24">
        <Container>
          <div className="relative overflow-hidden">
            <div className="absolute inset-0">
              <Image
                src="/images/Banner/banner2.png"
                alt={t("banner.title")}
                fill
                sizes="100vw"
                className="object-cover"
              />
            </div>
            <div className="from-[#1a0d00]/95 via-[#1a0d00]/80 to-secondary/70 absolute inset-0 bg-gradient-to-r" />
            <div className="relative flex flex-col items-center gap-6 px-6 py-16 text-center md:py-24">
              <span className="inline-flex items-center gap-2 rounded-full bg-secondary/20 px-4 py-1.5 text-xs font-bold tracking-[0.2em] text-white uppercase ring-1 ring-white/25">
                <Sparkles className="size-3.5" aria-hidden="true" />
                {t("banner.kicker")}
              </span>
              <h2 className="font-heading max-w-3xl text-3xl font-bold text-white md:text-5xl">
                {t("banner.title")}
              </h2>
              <p className="max-w-2xl text-base leading-relaxed text-white/80 md:text-lg">
                {t("banner.subtitle")}
              </p>
              <Link href="/shop" className="mt-2">
                <Button size="lg" className="gap-2 bg-secondary px-8 text-secondary-foreground hover:bg-secondary/90">
                  {t("banner.button")}
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </section>

      <section id="story" className="relative overflow-hidden bg-section-2 py-16 md:py-24">
        <div
          className="pointer-events-none absolute -top-24 -right-24 size-72 rounded-full bg-primary/10 blur-3xl"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -bottom-24 -left-24 size-72 rounded-full bg-secondary/10 blur-3xl"
          aria-hidden="true"
        />
        <Container>
          <SectionHeading title={t("story.title")} subtitle={t("story.subtitle")} align="center" />

          <div className="relative mx-auto mt-14 max-w-4xl">
            <div
              className="absolute top-0 bottom-0 left-[22px] w-px bg-gradient-to-b from-transparent via-primary/60 to-transparent md:left-1/2 md:-translate-x-1/2"
              aria-hidden="true"
            />

            <div className="flex flex-col gap-10 md:gap-14">
              {[
                {
                  year: "2022",
                  icon: Sparkles,
                  gradient: "from-primary to-secondary",
                  ...t.raw("story.2022"),
                },
                {
                  year: "2023",
                  icon: TrendingUp,
                  gradient: "from-secondary to-primary",
                  ...t.raw("story.2023"),
                },
                {
                  year: "2024",
                  icon: Trophy,
                  gradient: "from-primary to-secondary",
                  ...t.raw("story.2024"),
                },
                {
                  year: "2025",
                  icon: Rocket,
                  gradient: "from-secondary to-primary",
                  ...t.raw("story.2025"),
                },
              ].map((item, index) => {
                const isLeft = index % 2 === 0;
                const number = String(index + 1).padStart(2, "0");
                return (
                  <div key={item.year} className="relative md:grid md:grid-cols-2 md:gap-16">
                    <div
                      className={`pointer-events-none absolute left-[22px] top-1/2 z-10 flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-gradient-to-br shadow-lg ring-4 ring-section-2 ${item.gradient} md:left-1/2 md:-translate-x-1/2`}
                      aria-hidden="true"
                    >
                      <item.icon className="size-5 text-white" aria-hidden="true" />
                    </div>

                    <div
                      className={`ml-12 flex flex-col md:ml-0 ${
                        isLeft
                          ? "md:col-start-1 md:items-end md:pr-10"
                          : "md:col-start-2 md:items-start md:pl-10"
                      }`}
                    >
                      <span
                        className={`inline-flex items-center gap-2 rounded-full bg-gradient-to-r px-4 py-1 text-sm font-bold tracking-wider text-white shadow-md ${item.gradient} ${
                          isLeft ? "md:ml-auto" : ""
                        }`}
                      >
                        {item.year}
                      </span>

                      <div className="relative mt-5 w-full rounded-xl border border-primary/10 bg-white p-6 pt-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                        <div
                          className={`absolute -top-3 flex size-8 items-center justify-center rounded-full bg-gradient-to-br text-xs font-bold text-white shadow-md ${item.gradient} ${
                            isLeft ? "md:right-6 right-6" : "left-6"
                          }`}
                        >
                          {number}
                        </div>
                        <h3 className="font-heading text-xl font-bold text-foreground md:max-w-md">
                          {item.title}
                        </h3>
                        <div className={`mt-2 h-1 w-12 rounded-full bg-gradient-to-r ${item.gradient}`} />
                        <p className="mt-3 leading-relaxed text-muted-foreground">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </Container>
      </section>

      <section className="py-16 md:py-24">
        <Container>
          <SectionHeading title={t("team.title")} subtitle={t("team.subtitle")} />
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {t.raw("team.members").map((member: { name: string; role: string; bio: string }, i: number) => (
              <Card key={i} className="border-border bg-white hover:bg-section-2 transition-colors overflow-hidden">
                <div className="h-48 bg-gradient-to-br from-primary/20 to-secondary/20 relative">
                  <div className="absolute inset-0 flex items-center justify-center bg-primary/5">
                    <Users className="size-12 text-primary/50" aria-hidden="true" />
                  </div>
                </div>
                <CardContent className="p-6 text-center">
                  <h3 className="font-heading text-lg font-semibold text-foreground">{member.name}</h3>
                  <p className="text-secondary text-sm font-medium mb-3">{member.role}</p>
                  <p className="text-muted-foreground text-sm leading-relaxed">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-gradient-to-r from-primary to-secondary py-16 md:py-24">
        <Container className="flex flex-col items-center text-center gap-6">
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground">
            {t("cta.title")}
          </h2>
          <p className="text-primary-foreground/80 max-w-2xl text-lg leading-relaxed">
            {t("cta.subtitle")}
          </p>
          <Link href="/shop">
            <Button size="lg" variant="secondary" className="gap-2 text-lg px-8 mt-4">
              {t("cta.button")}
              <ArrowRight className="size-4" aria-hidden="true" />
            </Button>
          </Link>
        </Container>
      </section>
    </>
  );
}
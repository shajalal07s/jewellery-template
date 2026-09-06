import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Container } from "@/components/common/Container";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, User, Clock, ArrowRight, Newspaper } from "lucide-react";
import Image from "next/image";
import { Link } from "@/i18n/navigation";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/blog">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Blog" });

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
  };
}

const POST_IMAGES = [
  "/images/unimart/blog-post-img/blog-post-09.webp",
  "/images/unimart/blog-post-img/blog-post-10.webp",
  "/images/unimart/blog-post-img/blog-post-11.webp",
  "/images/unimart/blog-post-img/blog-post-12.webp",
  "/images/unimart/product-img/jwellery/jw-a-05.webp",
  "/images/unimart/product-img/jwellery/jw-a-06.webp",
];

export default async function BlogPage({ params }: PageProps<"/[locale]/blog">) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Blog");

  const posts = t.raw("posts") as {
    title: string;
    excerpt: string;
    category: string;
    author: string;
    date: string;
  }[];

  const [featured, ...rest] = posts;

  return (
    <>
      <section className="border-b bg-gradient-to-br from-primary/15 via-background to-secondary/10 py-14 md:py-20">
        <Container className="flex flex-col items-center text-center gap-5">
          <span className="inline-flex items-center gap-2 rounded-sm bg-secondary/15 px-4 py-1.5 text-sm font-semibold tracking-wide text-secondary uppercase">
            <Newspaper className="size-4" aria-hidden="true" />
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
          <div className="overflow-hidden border border-border bg-white">
            <div className="grid lg:grid-cols-2">
              <div className="relative min-h-64 lg:min-h-full">
                <Image
                  src={POST_IMAGES[0]}
                  alt={featured.title}
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col justify-center gap-4 p-8 md:p-12">
                <Badge className="w-fit bg-primary text-primary-foreground">{t("featured")}</Badge>
                <h2 className="font-heading text-2xl font-bold leading-tight text-foreground md:text-3xl">
                  {featured.title}
                </h2>
                <p className="text-muted-foreground leading-relaxed">{featured.excerpt}</p>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
                  <span className="inline-flex items-center gap-1.5">
                    <User className="size-4 text-secondary" aria-hidden="true" />
                    {featured.author}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Calendar className="size-4 text-secondary" aria-hidden="true" />
                    {featured.date}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Clock className="size-4 text-secondary" aria-hidden="true" />
                    {t("readTime", { minutes: 6 })}
                  </span>
                </div>
                <div className="pt-2">
                  <Link href="/blog">
                    <Button className="gap-2">
                      {t("readMore")}
                      <ArrowRight className="size-4" aria-hidden="true" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <SectionHeading className="mt-16" title={t("heroBadge")} />
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((post, i) => (
              <Card key={i} className="group overflow-hidden border-border bg-white transition-colors hover:bg-section-2">
                <div className="relative h-52 overflow-hidden">
                  <Image
                    src={POST_IMAGES[(i + 1) % POST_IMAGES.length]}
                    alt={post.title}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <Badge className="absolute left-4 top-4 bg-background/90 text-foreground backdrop-blur">
                    {post.category}
                  </Badge>
                </div>
                <CardHeader className="p-5">
                  <div className="mb-2 flex items-center gap-3 text-xs text-muted-foreground">
                    <span className="inline-flex items-center gap-1.5">
                      <Calendar className="size-3.5 text-secondary" aria-hidden="true" />
                      {post.date}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <User className="size-3.5 text-secondary" aria-hidden="true" />
                      {post.author}
                    </span>
                  </div>
                  <CardTitle className="font-heading text-lg leading-snug">
                    {post.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-4 p-5 pt-0">
                  <p className="text-sm text-muted-foreground">{post.excerpt}</p>
                  <Link
                    href="/blog"
                    className="inline-flex w-fit items-center gap-1.5 text-sm font-semibold text-secondary hover:text-secondary/80"
                  >
                    {t("readMore")}
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-t bg-[#1a0d00] py-14 md:py-16">
        <Container className="flex flex-col items-center gap-5 text-center">
          <h2 className="font-heading max-w-2xl text-2xl font-bold text-white md:text-3xl">
            {t("newsletterTitle")}
          </h2>
          <p className="max-w-xl text-white/70">{t("newsletterSubtitle")}</p>
          <form className="mt-2 flex w-full max-w-md flex-col gap-3 sm:flex-row">
            <input
              type="email"
              required
              placeholder={t("newsletterPlaceholder")}
              className="h-full min-w-0 flex-1 rounded-sm border border-white/20 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-white/50 focus:border-secondary focus:outline-none"
            />
            <Button type="submit" className="shrink-0">
              {t("newsletterButton")}
            </Button>
          </form>
        </Container>
      </section>
    </>
  );
}
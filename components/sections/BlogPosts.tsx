import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { Clock, User, ArrowUpRight, ArrowRight } from "lucide-react";
import { ROUTES } from "@/lib/constants";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/common/Container";
import { homeBlogs } from "@/features/home/homeData";

export async function BlogPosts() {
  const t = await getTranslations("Blog");

  return (
    <section className="bg-background pb-10 md:pb-16">
      <Container>
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4 md:mb-10">
          <div>
            <span className="text-sm font-semibold tracking-[0.16em] text-foreground uppercase">{t("subtitle")}</span>
            <h2 className="font-heading mt-1 text-3xl font-bold text-foreground md:text-4xl lg:text-[42px]">
              {t("title")} <span className="font-bold">{t("titleBold")}</span>
            </h2>
          </div>
          <Link
            href={ROUTES.shop}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-secondary px-6 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-secondary/90"
          >
            {t("viewAll")}
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {homeBlogs.map((blog) => (
            <article key={blog.title} className="group/blog flex flex-col rounded-[16px] border border-border bg-white p-2.5 transition-all duration-300 hover:shadow-lg">
              <Link href={ROUTES.shop} className="relative block overflow-hidden rounded-[12px]">
                <Image
                  src={blog.img}
                  alt={blog.title}
                  width={640}
                  height={480}
                  sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 25vw"
                  className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover/blog:scale-105"
                />
              </Link>
              <div className="flex flex-1 flex-col px-2.5 pt-4 pb-2">
                <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs">
                  <span className="font-semibold text-primary">{blog.category}</span>
                  <span className="text-muted-foreground">{blog.date}</span>
                </div>
                <h3 className="font-heading mt-2 line-clamp-2 text-lg leading-snug font-bold text-foreground">
                  <Link href={ROUTES.shop} className="transition-colors hover:text-primary">
                    {blog.title}
                  </Link>
                </h3>
                <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <Clock className="size-3.5" aria-hidden="true" />
                    {blog.readTime}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <User className="size-3.5" aria-hidden="true" />
                    {blog.author}
                  </span>
                </div>
                <Link
                  href={ROUTES.shop}
                  className="mt-4 inline-flex h-9 w-fit items-center justify-center gap-1.5 rounded-full bg-secondary px-5 text-sm font-semibold text-white transition-colors hover:bg-secondary/90"
                >
                  {t("readMore")}
                  <ArrowUpRight className="size-3.5" aria-hidden="true" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
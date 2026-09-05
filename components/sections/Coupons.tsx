import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { ArrowRight, Scissors } from "lucide-react";
import { Container } from "@/components/common/Container";
import { ROUTES } from "@/lib/constants";
import { Link } from "@/i18n/navigation";

const COUPON_CONFIG = [
  {
    image: "/images/men/men-1.jpg",
    fallback: "bg-gradient-to-br from-secondary via-[#ff962e] to-primary",
  },
  {
    image: "/images/women/women-1.jpg",
    fallback: "bg-gradient-to-br from-primary via-[#ff962e] to-secondary",
  },
  {
    image: "/images/kids/kids-1.jpg",
    fallback: "bg-gradient-to-br from-accent via-secondary to-[#ff962e]",
  },
  {
    image: "/images/nargisus/nargisus-1.jpg",
    fallback: "bg-gradient-to-br from-[#ff962e] via-primary to-secondary",
  },
];

export async function Coupons() {
  const t = await getTranslations("Coupons");
  const items = t.raw("items") as Array<{
    category: string;
    percent: string;
    title: string;
    description: string;
    code: string;
    cta: string;
  }>;

  return (
    <section className="bg-section-2 py-16">
      <Container className="flex flex-col gap-8">
        <div className="flex flex-col items-start gap-2">
          <h2 className="font-heading text-2xl font-semibold tracking-tight md:text-3xl">
            {t("sectionHeading")}
          </h2>
          <p className="text-muted-foreground">{t("sectionSubtitle")}</p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item, i) => {
            const config = COUPON_CONFIG[i];
            return (
              <article
                key={item.category}
                className="group overflow-hidden border bg-white shadow-md transition-all duration-300 hover:shadow-xl"
              >
                <div className="relative h-44 overflow-hidden">
                  <Image
                    src={config.image}
                    alt={item.category}
                    fill
                    sizes="(max-width: 768px) 100vw, 25vw"
                    className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className={`${config.fallback} absolute inset-0 -z-10`} aria-hidden="true" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute inset-0 flex flex-col justify-between p-5">
                    <span className="text-[10px] font-bold tracking-[0.25em] text-white/90 uppercase">
                      {item.category}
                    </span>
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl leading-none font-black tracking-tighter text-white">
                        {item.percent}
                      </span>
                      <span className="text-sm font-bold tracking-wide text-white">OFF</span>
                    </div>
                  </div>
                </div>

                <div className="relative flex flex-col gap-3 p-5">
                  <div className="border-border absolute top-0 right-4 left-4 border-t-2 border-dashed" />
                  <span
                    className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2"
                    aria-hidden="true"
                  >
                    <Scissors
                      className="text-secondary bg-card border-secondary/20 size-6 border-2 p-1"
                      strokeWidth={2.5}
                    />
                  </span>

                  <div className="pt-2">
                    <h3 className="text-foreground text-sm font-bold tracking-wide uppercase">
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground mt-1.5 text-xs leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  <div className="border-border border-t border-dashed pt-3">
                    <div className="flex items-center justify-between">
                      <code className="bg-muted text-foreground rounded-sm px-2 py-1 font-mono text-xs font-bold tracking-widest">
                        {item.code}
                      </code>
                      <Link
                        href={ROUTES.shop}
                        className="bg-secondary hover:bg-secondary/90 inline-flex items-center gap-1.5 rounded-sm px-3 py-1.5 text-xs font-bold text-white transition-colors"
                      >
                        {item.cta}
                        <ArrowRight className="size-3.5" aria-hidden="true" />
                      </Link>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

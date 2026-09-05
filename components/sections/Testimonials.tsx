import { getTranslations } from "next-intl/server";
import { Container } from "@/components/common/Container";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Quote } from "lucide-react";

interface Testimonial {
  quote: string;
  name: string;
  role: string;
  rating?: number;
}

function TestimonialCard({ item }: { item: Testimonial }) {
  const avatarColor = ["bg-secondary", "bg-primary", "bg-accent", "bg-[#7e22ce]", "bg-[#0f766e]"][
    item.name.charCodeAt(0) % 5
  ];

  return (
    <article className="group relative flex w-[320px] shrink-0 flex-col gap-4 overflow-hidden border border-border bg-gradient-to-br from-white to-[#fff9f0] p-6 shadow-lg transition-transform duration-300 hover:-translate-y-1 sm:w-[360px]">
      <div className="bg-secondary absolute -top-8 -right-8 size-24 rounded-full opacity-15 transition-opacity group-hover:opacity-25" />
      <Quote className="text-secondary/70 size-7 fill-secondary/10" aria-hidden="true" />

      <div className="flex gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <svg
            key={i}
            viewBox="0 0 20 20"
            className={
              i < (item.rating ?? 5) ? "fill-amber-400 size-4" : "fill-muted size-4"
            }
            aria-hidden="true"
          >
            <path d="M9.05 2.93c.3-.92 1.6-.92 1.9 0l1.28 3.96a1 1 0 0 0 .95.69h4.16c.97 0 1.37 1.24.59 1.81l-3.37 2.44a1 1 0 0 0-.36 1.11l1.28 3.96c.3.92-.76 1.69-1.54 1.11l-3.37-2.44a1 1 0 0 0-1.18 0l-3.37 2.44c-.78.57-1.84-.2-1.54-1.11l1.28-3.96a1 1 0 0 0-.36-1.11l-3.37-2.44c-.78-.57-.38-1.81.59-1.81h4.16a1 1 0 0 0 .95-.69l1.28-3.96z" />
          </svg>
        ))}
      </div>

      <blockquote className="text-muted-foreground flex-1 text-sm leading-relaxed">
        &ldquo;{item.quote}&rdquo;
      </blockquote>

      <footer className="flex items-center gap-3 border-t border-dashed pt-4">
        <span
          className={`${avatarColor} flex size-11 shrink-0 items-center justify-center rounded-full font-heading text-base font-bold text-white`}
          aria-hidden="true"
        >
          {item.name.charAt(0)}
        </span>
        <div className="flex flex-col">
          <span className="text-foreground text-sm font-semibold">{item.name}</span>
          <span className="text-muted-foreground text-xs">{item.role}</span>
        </div>
      </footer>
    </article>
  );
}

function CardSet({ items, prefix }: { items: Testimonial[]; prefix: string }) {
  return (
    <div className="flex shrink-0 items-center gap-5 pr-5">
      {items.map((item) => (
        <TestimonialCard key={`${prefix}-${item.name}`} item={item} />
      ))}
    </div>
  );
}

export async function Testimonials() {
  const t = await getTranslations("Testimonials");
  const items = t.raw("items") as Testimonial[];

  return (
    <section className="bg-muted overflow-hidden py-16">
      <Container className="flex flex-col gap-10 pb-10">
        <SectionHeading title={t("title")} subtitle={t("subtitle")} align="center" />
      </Container>
      <div className="animate-marquee flex w-max hover:[animation-play-state:paused] [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]">
        <CardSet items={items} prefix="a" />
        <CardSet items={items} prefix="b" />
      </div>
    </section>
  );
}

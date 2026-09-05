import { getTranslations } from "next-intl/server";
import { Sparkles } from "lucide-react";
import { Container } from "@/components/common/Container";

function MarqueeSet({ items, prefix }: { items: string[]; prefix: string }) {
  return (
    <div className="flex shrink-0 items-center">
      {items.map((item, i) => (
        <span key={`${prefix}-${i}`} className="flex items-center">
          <span className="text-white">{item}</span>
          <Sparkles className="text-white/40 mx-10 size-4 shrink-0" aria-hidden="true" />
        </span>
      ))}
    </div>
  );
}

export async function Marquee() {
  const t = await getTranslations("Marquee");
  const items = t.raw("items") as string[];

  return (
    <Container className="pt-0 pb-4">
      <div className="relative overflow-hidden bg-foreground py-3">
        <div className="animate-marquee flex w-max hover:[animation-play-state:paused]">
          <MarqueeSet items={items} prefix="a" />
          <MarqueeSet items={items} prefix="b" />
        </div>

        <div
          className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-foreground via-foreground/60 to-transparent"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-foreground via-foreground/60 to-transparent"
          aria-hidden="true"
        />
      </div>
    </Container>
  );
}

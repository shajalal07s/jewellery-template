import { getTranslations } from "next-intl/server";
import { Truck, Headset, Package, Ticket } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Container } from "@/components/common/Container";

const ICONS: Record<string, LucideIcon> = {
  shipping: Truck,
  support: Headset,
  return: Package,
  vendor: Ticket,
};

export async function FeaturesStrip() {
  const t = await getTranslations("FeatureStrip");
  const items = t.raw("items") as { icon: string; title: string; description: string }[];

  return (
    <section className="bg-background pb-10 md:pb-14">
      <Container>
        <ul className="grid grid-cols-2 gap-x-8 gap-y-8 lg:grid-cols-4">
          {items.map((item, i) => {
            const Icon = ICONS[item.icon] ?? Truck;
            return (
              <li key={i} className="flex flex-col items-center text-center">
                <span className="text-primary flex size-12 items-center justify-center">
                  <Icon className="size-10" strokeWidth={1.6} aria-hidden="true" />
                </span>
                <h6 className="mt-3 font-heading text-lg font-bold text-foreground">{item.title}</h6>
                <p className="mt-1 text-sm text-muted-foreground">{item.description}</p>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
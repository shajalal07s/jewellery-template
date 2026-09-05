import { Truck, ShieldCheck, RefreshCcw, CreditCard } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Container } from "@/components/common/Container";

interface FeatureIcon {
  key: string;
  icon: LucideIcon;
  badge: string;
}

const FEATURE_ICONS: FeatureIcon[] = [
  { key: "shipping", icon: Truck, badge: "bg-secondary/15 text-secondary" },
  { key: "payment", icon: CreditCard, badge: "bg-primary/15 text-primary" },
  { key: "returns", icon: RefreshCcw, badge: "bg-accent/15 text-accent" },
  { key: "quality", icon: ShieldCheck, badge: "bg-[#7e22ce]/10 text-[#7e22ce]" },
];

export async function Features() {
  const t = await getTranslations("Features");

  return (
    <section className="bg-background py-16">
      <Container>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURE_ICONS.map(({ key, icon: Icon, badge }) => (
            <div
              key={key}
              className="group relative flex flex-col gap-4 overflow-hidden border border-border border-b-[3px] border-b-secondary bg-gradient-to-br from-white to-[#fffaf2] p-6 transition-shadow duration-300 hover:shadow-lg"
            >
              <div className={`${badge} flex size-12 items-center justify-center rounded-sm transition-transform duration-300 group-hover:scale-110`}>
                <Icon className="size-6" aria-hidden="true" />
              </div>
              <h3 className="font-heading text-base font-bold tracking-tight">
                {t(`items.${key}.title`)}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {t(`items.${key}.description`)}
              </p>
              <div className="bg-secondary absolute right-0 bottom-0 left-0 h-[3px] origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100" />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

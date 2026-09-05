import { getTranslations } from "next-intl/server";
import { Container } from "@/components/common/Container";
import { buttonVariants } from "@/components/ui/button";
import { ROUTES } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { Link } from "@/i18n/navigation";

export async function CTA() {
  const t = await getTranslations("CTA");

  return (
    <section className="py-16">
      <Container>
        <div className="from-primary to-secondary flex flex-col items-center justify-between gap-6 bg-gradient-to-r via-[#ff962e] p-10 text-center md:flex-row md:text-left">
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl font-semibold md:text-3xl">{t("title")}</h2>
            <p className="text-foreground/80">{t("subtitle")}</p>
          </div>
          <Link
            href={ROUTES.register}
            className={cn(
              buttonVariants({ size: "lg" }),
              "bg-background text-foreground hover:bg-background/90"
            )}
          >
            {t("button")}
          </Link>
        </div>
      </Container>
    </section>
  );
}

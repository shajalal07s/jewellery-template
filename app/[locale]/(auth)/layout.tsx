import Image from "next/image";
import { Home } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Logo } from "@/components/common/Logo";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Link } from "@/i18n/navigation";

export default async function AuthLayout({ children, params }: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  setRequestLocale(locale);
  const tCommon = await getTranslations("Common");

  return (
    <div className="bg-background flex min-h-screen">
      <div className="relative hidden w-1/2 overflow-hidden lg:block">
        <Image
          src="/images/Banner/banne1.png"
          alt=""
          fill
          priority
          sizes="50vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/20" />
      </div>

      <div className="bg-background flex w-full flex-col lg:w-1/2">
        <div className="flex h-16 items-center px-6 md:px-12">
          <Logo />
        </div>

        <main className="flex flex-1 flex-col items-center justify-center px-6 py-8 md:px-12">
          <Card className="w-full max-w-md shadow-lg shadow-black/5">
            <CardContent className="p-6 sm:p-8">{children}</CardContent>
          </Card>

          <Link
            href="/"
            className={cn(buttonVariants({ variant: "outline" }), "mt-6 w-full max-w-md gap-2")}
          >
            <Home className="size-4" aria-hidden="true" />
            {tCommon("backToHome")}
          </Link>
        </main>
      </div>
    </div>
  );
}
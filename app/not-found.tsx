import Link from "next/link";
import { ArrowRight, Home, Shirt } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Container } from "@/components/common/Container";
import { cn } from "@/lib/utils";

export default function NotFound() {
  return (
    <Container className="relative flex flex-1 flex-col items-center justify-center gap-8 overflow-hidden py-20 text-center">
      <div className="absolute top-10 left-10 opacity-20" aria-hidden="true">
        <Shirt className="size-20 rotate-[-12deg] text-secondary" />
      </div>
      <div className="absolute right-12 bottom-10 opacity-20" aria-hidden="true">
        <Shirt className="size-16 rotate-12 text-primary" />
      </div>
      <div
        className="absolute -top-24 left-1/2 h-64 w-[36rem] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl"
        aria-hidden="true"
      />

      <div className="animate-float-bob relative flex flex-col items-center gap-4">
        <span
          className="text-primary/15 font-heading text-[10rem] leading-none font-black tracking-tighter select-none md:text-[12rem]"
          aria-hidden="true"
        >
          404
        </span>
        <span className="bg-primary text-primary-foreground -mt-8 rounded-full px-4 py-1 text-xs font-bold tracking-widest uppercase">
          Style not found
        </span>
      </div>

      <div className="relative flex max-w-md flex-col gap-3">
        <h2 className="font-heading text-3xl font-semibold tracking-tight">
          The page went out of style
        </h2>
        <p className="text-muted-foreground">
          The page you are looking for doesn&apos;t exist or may have been moved. Let&apos;s get you
          back to the latest trends.
        </p>
      </div>

      <div className="relative flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/"
          className={cn(buttonVariants({ variant: "default" }), "gap-2")}
        >
          <Home className="size-4" aria-hidden="true" />
          Back to Home
        </Link>
        <Link
          href="/products"
          className={cn(buttonVariants({ variant: "outline" }), "gap-2")}
        >
          Browse Products
          <ArrowRight className="size-4" aria-hidden="true" />
        </Link>
      </div>
    </Container>
  );
}

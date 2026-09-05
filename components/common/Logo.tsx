import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  href?: string;
  variant?: "auto" | "light";
}

export function Logo({ className, href = "/", variant = "auto" }: LogoProps) {
  const white = (
    <span className={cn(variant === "light" ? "" : "hidden dark:block")}>
      <Image
        src="/images/logo/fashion-white-logo.png"
        alt="Fashion"
        width={120}
        height={40}
        className="h-10 w-auto"
        priority
      />
    </span>
  );

  const black =
    variant === "light" ? null : (
      <span className="block dark:hidden">
        <Image
          src="/images/logo/fashion-black-logo.png"
          alt="Fashion"
          width={120}
          height={40}
          className="h-10 w-auto"
          priority
        />
      </span>
    );

  return (
    <Link
      href={href}
      className={cn("flex items-center", className)}
      aria-label="Fashion Store home"
    >
      {black}
      {white}
    </Link>
  );
}

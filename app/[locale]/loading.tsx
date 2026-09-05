"use client";

import { Flower2 } from "lucide-react";
import { Logo } from "@/components/common/Logo";
import { useEffect, useState } from "react";

export default function Loading() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => setVisible(false), 2500);
    return () => window.clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white px-6 text-center">
      <div className="animate-fade-in-up relative flex flex-col items-center gap-6">
        <div className="animate-float-bob relative">
          <div className="bg-accent/15 animate-spin-slow absolute -inset-5 rounded-full" aria-hidden="true" />
          <div className="bg-pink-200/40 absolute -inset-8 rounded-full blur-xl" aria-hidden="true" />
          <div className="relative flex size-20 items-center justify-center rounded-full bg-gradient-to-br from-primary/20 via-secondary/15 to-accent/25">
            <Flower2 className="text-secondary animate-spin-slow size-9" aria-hidden="true" />
          </div>
        </div>

        <div className="flex flex-col items-center gap-1.5">
          <Logo />
          <p className="text-muted-foreground text-sm font-medium tracking-wide">
            Blooming fresh styles for you...
          </p>
        </div>

        <div className="bg-foreground/10 h-1 w-56 overflow-hidden rounded-full">
          <div className="bg-primary shimmer-skeleton h-full w-full" />
        </div>
      </div>
    </div>
  );
}

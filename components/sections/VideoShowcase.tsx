"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import Image from "next/image";
import { Play } from "lucide-react";
import { Container } from "@/components/common/Container";

export function VideoShowcase() {
  const t = useTranslations("Video");
  const [playing, setPlaying] = useState(false);

  return (
    <section className="bg-background pb-10 md:pb-16">
      <Container>
        <div className="group relative overflow-hidden rounded-[24px]">
          {playing ? (
            <video
              src="/images/unimart/videos/video-review-1.mp4"
              autoPlay
              controls
              playsInline
              className="aspect-[3520/1034] w-full object-cover"
            />
          ) : (
            <>
              <Image
                src="/images/unimart/others/video-01.webp"
                alt={t("label")}
                width={3520}
                height={1034}
                sizes="100vw"
                className="aspect-[3520/1034] w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"
                aria-hidden="true"
              />
              <button
                type="button"
                onClick={() => setPlaying(true)}
                aria-label={t("play")}
                className="absolute inset-0 flex items-center justify-center"
              >
                <span className="flex items-center justify-center">
                  <span className="absolute size-20 animate-ping rounded-full bg-white/30" aria-hidden="true" />
                  <span className="relative flex size-16 items-center justify-center rounded-full bg-white text-primary shadow-xl transition-transform duration-300 group-hover:scale-110 sm:size-20">
                    <Play className="ml-1 size-6 fill-current sm:size-7" aria-hidden="true" />
                  </span>
                </span>
              </button>
            </>
          )}
        </div>
      </Container>
    </section>
  );
}
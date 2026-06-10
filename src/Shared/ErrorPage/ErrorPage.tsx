"use client";

import * as React from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image, { StaticImageData } from "next/image";
import { banner } from "@/assets/import";

interface Error404Props {
  postcardImage?: string | StaticImageData;
  postcardAlt?: string;
  heading?: string;
  subtext?: string;
  backButtonLabel?: string;
  backButtonHref?: string;
}

export function Error404({
  postcardImage = banner.cover2,
  postcardAlt = "New York City Postcard",
  heading = "404",
  subtext = "Senpai must have got lost while training , however",
  backButtonLabel = "Back to Home",
  backButtonHref = "/",
}: Error404Props) {
  return (
    <div className="flex items-center justify-center px-4 py-16">
      <div className="flex flex-col items-center">
        <div className="relative mb-16">
          <div className="relative z-10">
            <div className="relative p-3 shadow-2xl rotate-[4deg] hover:rotate-0 transition-transform duration-300 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
              <div className="relative overflow-hidden w-[360px] h-[220px]">
                <Image
                  src={postcardImage}
                  alt={postcardAlt}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="text-center max-w-2xl">
          <h1 className="text-6xl md:text-7xl font-doto mb-6 leading-tight">
            {heading}
          </h1>
          <p className="text-muted-foreground text-base md:text-lg mb-10 font-sans">
            {subtext}
          </p>
          <Button asChild className="rounded-lg px-5 py-4 font-sans">
            <Link href={backButtonHref} className="flex items-center gap-2">
              {backButtonLabel}
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Error404;

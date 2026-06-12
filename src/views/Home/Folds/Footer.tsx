import Image from "next/image";
import Link from "next/link";
import { banner } from "@/assets/import";
import SubSection from "@/Shared/Section/SubSection";
import { BannerParticles } from "@/components/BannerParticles";

export default function Footer() {
  return (
    <SubSection className="w-full relative">
      {/* Background Image Container that determines height */}
      <div className="w-full relative">
        <BannerParticles />
        <Image
          src={banner.footer4}
          alt="Footer Background"
          priority
          className="w-full h-[300px] object-cover object-center filter brightness-95 dark:brightness-110"
        />
        <div className="absolute inset-0 bg-linear-to-b from-transparent via-black/10 to-black/60" />
      </div>

      {/* Absolutely positioned content centered on top of the image */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-end pb-10 text-center space-y-2 select-none">
        <p className="text-xs sm:text-sm md:text-base text-white font-sans leading-relaxed">
          Built by{" "}
          <Link
            href="https://github.com/ashutoshdm1"
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold underline decoration-current/30 hover:decoration-current underline-offset-4 transition-colors"
          >
            AshutoshDM1
          </Link>
          . The source code is available on{" "}
          <Link
            href="https://github.com/AshutoshDM1/Elitedev-V3"
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold underline decoration-current/30 hover:decoration-current underline-offset-4 transition-colors"
          >
            GitHub
          </Link>
          .
        </p>
        <p className="text-[10px] sm:text-xs md:text-sm text-white/90 font-sans tracking-wide flex items-center justify-center gap-2 flex-wrap">
          <span>&copy; 2026 Ashutosh Tiwari &middot; All rights reserved</span>
          <span className="text-white/40 select-none">&middot;</span>
          <Link
            href="/robots.txt"
            target="_blank"
            className="hover:text-white transition-colors underline underline-offset-2 decoration-current/30 hover:decoration-current"
          >
            robots.txt
          </Link>
          <span className="text-white/40 select-none">&middot;</span>
          <Link
            href="/sitemap.xml"
            target="_blank"
            className="hover:text-white transition-colors underline underline-offset-2 decoration-current/30 hover:decoration-current"
          >
            sitemap.xml
          </Link>
          <span className="text-white/40 select-none">&middot;</span>
          <Link
            href="/llm.txt"
            target="_blank"
            className="hover:text-white transition-colors underline underline-offset-2 decoration-current/30 hover:decoration-current"
          >
            llm.txt
          </Link>
        </p>
      </div>
    </SubSection>
  );
}

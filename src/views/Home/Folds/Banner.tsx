"use client";
import { banner } from "@/assets/import";
import LineY from "@/Shared/Line/LineY";
import SubSection from "@/Shared/Section/SubSection";
import Image from "next/image";
import { ProgressiveBlur } from "@/components/ui/progressive-blur";
import Ferrofluid from "@/components/Ferrofluid";
import Prism from "@/components/Prism";
import { BannerParticles } from "@/components/BannerParticles";

const Banner = () => {
  const maskStyle = {
    WebkitMaskImage:
      "linear-gradient(to bottom, transparent, black 16px, black calc(100% - 16px), transparent), linear-gradient(to right, transparent, black 16px, black calc(100% - 16px), transparent)",
    WebkitMaskComposite: "destination-in",
    maskImage:
      "linear-gradient(to bottom, transparent, black 16px, black calc(100% - 16px), transparent), linear-gradient(to right, transparent, black 16px, black calc(100% - 16px), transparent)",
    maskComposite: "intersect",
  };

  return (
    <>
      <LineY className="border-t border-b-0">
        <SubSection>
          <div className="flex justify-center items-center overflow-hidden relative bg-background ">
            <Image
              width={1200}
              height={500}
              className="h-70 object-cover object-bottom"
              src={banner.cover3}
              alt="Hero"
              style={maskStyle}
            />
            <BannerParticles />
          </div>
        </SubSection>
      </LineY>
    </>
  );
};

export default Banner;

const BannerCover = () => {
  return (
    <div className="absolute inset-0 z-10 mix-blend-color ">
      <Ferrofluid
        colors={["#ffffff", "#ffffff", "#ffffff"]}
        speed={0.5}
        scale={1.6}
        turbulence={1}
        fluidity={0.1}
        rimWidth={0.2}
        sharpness={2.5}
        shimmer={1.5}
        glow={2}
        flowDirection="down"
        opacity={1}
        mouseInteraction
        mouseStrength={1}
        mouseRadius={0.35}
      />
    </div>
  );
};

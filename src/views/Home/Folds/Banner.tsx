"use client";
import { banner } from "@/assets/import";
import LineY from "@/Shared/Line/LineY";
import SubSection from "@/Shared/Section/SubSection";
import Image from "next/image";
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
          <div className="flex justify-center h-70 w-full items-center overflow-hidden relative bg-background ">
            <Image
              width={1000}
              height={1000}
              className="h-full w-full object-cover object-bottom"
              src={banner.cover3}
              alt="Hero"
              style={maskStyle}
            />
            <BannerParticles  />
          </div>
        </SubSection>
      </LineY>
    </>
  );
};

export default Banner;
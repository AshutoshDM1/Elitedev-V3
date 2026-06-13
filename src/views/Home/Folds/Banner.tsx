import { banner } from "@/assets/import";
import LineY from "@/Shared/Line/LineY";
import SubSection from "@/Shared/Section/SubSection";
import Image from "next/image";
import { BannerParticles } from "@/components/BannerParticles";
import { cn } from "@/lib/utils";

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
            {/* Light Theme Banner Image */}
            <Image
              width={1000}
              height={1000}
              className={cn("h-full w-full object-cover object-bottom block dark:hidden")}
              src={banner.cover3}
              alt="Hero Light"
              style={maskStyle}
              priority
            />
            {/* Dark Theme Banner Image */}
            <Image
              width={1000}
              height={1000}
              className={cn("h-full w-full object-cover object-center hidden dark:block")}
              src={banner.footer1}
              alt="Hero Dark"
              style={maskStyle}
              priority
            />
            <BannerParticles  />
          </div>
        </SubSection>
      </LineY>
    </>
  );
};

export default Banner;
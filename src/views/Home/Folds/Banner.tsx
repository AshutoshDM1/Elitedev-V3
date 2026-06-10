import { banner } from "@/assets/import";
import LineY from "@/Shared/Line/LineY";
import SubSection from "@/Shared/Section/SubSection";
import Image from "next/image";
import { ProgressiveBlur } from "@/components/ui/progressive-blur";

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
          </div>
        </SubSection>
      </LineY>
    </>
  );
};

export default Banner;

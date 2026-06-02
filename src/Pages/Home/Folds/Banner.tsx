import LineY from "@/Shared/Line/LineY";
import SubSection from "@/Shared/Section/SubSection";
import Image from "next/image";

const Banner = () => {
  return (
    <>
      <LineY className="border-t border-b-0">
        <SubSection>
          <div className="flex justify-center items-center overflow-hidden relative">
            <Image
              width={1200}
              height={500}
              className="h-56 object-cover object-top"
              src="/cover2.jpg"
              alt="Hero"
            />
            {/* Premium Edge Bleeding Gradients */}
            <div className="absolute inset-0 pointer-events-none select-none z-10">
              {/* Top Bleed */}
              <div className="absolute top-0 left-0 right-0 h-8 bg-linear-to-b from-background to-transparent" />
              {/* Bottom Bleed */}
              <div className="absolute bottom-0 left-0 right-0 h-8 bg-linear-to-t from-background to-transparent" />
              {/* Left Bleed */}
              <div className="absolute top-0 bottom-0 left-0 w-8 bg-linear-to-r from-background to-transparent" />
              {/* Right Bleed */}
              <div className="absolute top-0 bottom-0 right-0 w-8 bg-linear-to-l from-background to-transparent" />
            </div>
          </div>
        </SubSection>
      </LineY>
    </>
  );
};

export default Banner;

import * as React from "react";
import Image from "next/image";
import SubSection from "@/Shared/Section/SubSection";

interface ProjectImageShowcaseProps {
  projectImage?: string;
  projectName: string;
}

export const ProjectImageShowcase = ({ projectImage, projectName }: ProjectImageShowcaseProps) => {
  if (!projectImage) return null;

  return (
    <SubSection>
      <div className="relative w-full aspect-video  shadow-sm">
        <div className="relative w-full h-full overflow-hidden bg-zinc-950/20">
          <Image
            src={projectImage}
            alt={projectName}
            fill
            priority
            className="object-cover object-top filter brightness-95 contrast-105"
          />
        </div>
      </div>
    </SubSection>
  );
};

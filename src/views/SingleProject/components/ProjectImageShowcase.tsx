import * as React from "react";
import Image from "next/image";
import SubSection from "@/Shared/Section/SubSection";

interface ProjectImageShowcaseProps {
  projectImage?: string;
  projectVideo?: string;
  projectName: string;
}

export const ProjectImageShowcase = ({
  projectImage,
  projectVideo,
  projectName,
}: ProjectImageShowcaseProps) => {
  if (!projectImage && !projectVideo) return null;

  return (
    <SubSection>
      <div className="relative w-full aspect-video shadow-sm p-2">
        <div className="relative w-full h-full overflow-hidden bg-zinc-950/20  ">
          {projectVideo ? (
            <video
              src={projectVideo}
              autoPlay
              muted
              loop
              playsInline
              className="object-cover w-full h-full filter brightness-95 contrast-105"
            />
          ) : (
            projectImage && (
              <Image
                src={projectImage}
                alt={projectName}
                fill
                priority
                className="object-cover object-top filter brightness-95 contrast-105"
              />
            )
          )}
        </div>
      </div>
    </SubSection>
  );
};

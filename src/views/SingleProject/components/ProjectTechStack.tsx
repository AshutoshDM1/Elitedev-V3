import * as React from "react";
import { Boxes } from "lucide-react";
import SubSection from "@/Shared/Section/SubSection";
import TechStackIcon from "@/Shared/TechStackIcon/TechStackIcon";

interface ProjectTechStackProps {
  techstack?: string[];
}

export const ProjectTechStack = ({ techstack }: ProjectTechStackProps) => {
  if (!techstack || techstack.length === 0) return null;

  return (
    <SubSection>
      <div className="space-y-3 border-t border-dashed border-zinc-300 dark:border-zinc-800 pt-6 pb-6">
        <h2 className="font-mono text-xs uppercase font-semibold tracking-wider text-muted-foreground flex items-center gap-2">
          <Boxes className="w-4 h-4" /> Stack used
        </h2>
        <div className="flex flex-wrap gap-2">
          {techstack.map((tech) => (
            <TechStackIcon key={tech} name={tech} />
          ))}
        </div>
      </div>
    </SubSection>
  );
};

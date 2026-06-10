import * as React from "react";
import SubSection from "@/Shared/Section/SubSection";
import { BooleanCheck } from "./BooleanCheck";
import { Architecture } from "@/types/project.types";

interface ProjectSpecsProps {
  architecture?: Architecture | boolean;
  isMonorepo?: boolean | any;
  isHusky?: boolean | any;
  isOpenSource?: boolean | any;
  isReadme?: boolean | any;
  isLLD?: boolean | any;
  isAgentSkills?: boolean | any;
}

export const ProjectSpecs = ({
  architecture,
  isMonorepo,
  isHusky,
  isOpenSource,
  isReadme,
  isLLD,
  isAgentSkills,
}: ProjectSpecsProps) => {
  return (
    <SubSection>
      <div className="p-2 space-y-2">
        <h2 className="font-mono text-xs uppercase font-semibold tracking-wider text-muted-foreground flex items-center gap-2">
          Architecture
        </h2>

        <div className="flex flex-wrap gap-x-4 gap-y-1.5 pt-1">
          {/* Architecture Booleans */}
          <BooleanCheck
            value={!!architecture}
            label={architecture ? `Architecture (${architecture})` : "Architecture"}
          />

          {/* Repo Setup */}
          <BooleanCheck value={isMonorepo} label="Monorepo" />
          <BooleanCheck value={isHusky} label="Husky Hooks" />

          {/* Governance */}
          <BooleanCheck value={isOpenSource} label="Open Source" />

          {/* Docs */}
          <BooleanCheck value={isReadme} label="README" />
          <BooleanCheck value={isLLD} label="LLD Design" />
          <BooleanCheck value={isAgentSkills} label="Agent Skills" />
        </div>
      </div>
    </SubSection>
  );
};

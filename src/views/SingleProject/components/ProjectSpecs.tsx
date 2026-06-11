import * as React from "react";
import SubSection from "@/Shared/Section/SubSection";
import { BooleanCheck } from "@/Shared/BooleanCheck/BooleanCheck";
import { Architecture, MonoRepo, Frontend, Backend } from "@/types/project.types";
import { FrontendSpec } from "./FrontendSpec";
import { BackendSpec } from "./BackendSpec";

interface ProjectSpecsProps {
  architecture?: Architecture | boolean;
  isMonorepo?: MonoRepo | boolean;
  isHusky?: boolean;
  isOpenSource?: boolean;
  isReadme?: boolean;
  isLLD?: boolean;
  isAgentSkills?: boolean;
  frontend?: Frontend | boolean;
  backend?: Backend | boolean;
}

export const ProjectSpecs = ({
  architecture,
  isMonorepo,
  isHusky,
  isOpenSource,
  isReadme,
  isLLD,
  isAgentSkills,
  frontend,
  backend,
}: ProjectSpecsProps) => {
  return (
    <SubSection>
      <div className="p-2 space-y-6">
        <div className="space-y-2">
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

        {/* Frontend specs */}
        {frontend && typeof frontend === "object" && (
          <FrontendSpec frontend={frontend} />
        )}

        {/* Backend specs */}
        {backend && typeof backend === "object" && (
          <BackendSpec backend={backend} />
        )}
      </div>
    </SubSection>
  );
};


import * as React from "react";
import SubSection from "@/Shared/Section/SubSection";
import { BooleanCheck } from "./BooleanCheck";

interface ProjectSpecsProps {
  architecture?: {
    monolithic?: boolean | any;
    microservice?: boolean | any;
    serverless?: boolean | any;
  } | string | any;
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
  const isArchObj = architecture && typeof architecture === "object";

  return (
    <SubSection>
      <div className="p-2 space-y-2">
        <h2 className="font-mono text-xs uppercase font-semibold tracking-wider text-muted-foreground flex items-center gap-2">
         Architecture
        </h2>

        <div className="flex flex-wrap gap-x-4 gap-y-1.5 pt-1">
          {/* Architecture Booleans */}
          {isArchObj && architecture.monolithic && (
            <BooleanCheck value={true} label="Monolithic" />
          )}
          {isArchObj && architecture.microservice && (
            <BooleanCheck value={true} label="Microservice" />
          )}
          {isArchObj && architecture.serverless && (
            <BooleanCheck value={true} label="Serverless" />
          )}

          {/* Repo Setup */}
          {isMonorepo && <BooleanCheck value={true} label="Monorepo" />}
          {isHusky && <BooleanCheck value={true} label="Husky Hooks" />}

          {/* Governance */}
          {isOpenSource && <BooleanCheck value={true} label="Open Source" />}
          <BooleanCheck value={true} label="Public Registry" />

          {/* Docs */}
          {isReadme && <BooleanCheck value={true} label="README" />}
          {isLLD && <BooleanCheck value={true} label="LLD Design" />}
          {isAgentSkills && <BooleanCheck value={true} label="Agent Skills" />}
        </div>
      </div>
    </SubSection>
  );
};

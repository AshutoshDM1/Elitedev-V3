import * as React from "react";
import { BooleanCheck } from "@/Shared/BooleanCheck/BooleanCheck";
import { Frontend } from "@/types/project.types";

interface FrontendSpecProps {
  frontend: Frontend;
}

export const FrontendSpec = ({ frontend }: FrontendSpecProps) => {
  return (
    <div className="space-y-2">
      <h2 className="font-mono text-xs uppercase font-semibold tracking-wider text-muted-foreground flex items-center gap-2">
        Frontend Specs
      </h2>

      <div className="flex flex-wrap gap-x-4 gap-y-1.5">
        <BooleanCheck value={frontend.isCICD} label="CI/CD" />
        <BooleanCheck value={frontend.isCustomDomain} label="Custom Domain" />
        <BooleanCheck value={frontend.monitoringTool} label="Monitoring" />
        <BooleanCheck value={frontend.isContianerized} label="Containerized" />
      </div>
    </div>
  );
};

import * as React from "react";
import { BooleanCheck } from "@/Shared/BooleanCheck/BooleanCheck";
import { Backend } from "@/types/project.types";

interface BackendSpecProps {
  backend: Backend;
}

export const BackendSpec = ({ backend }: BackendSpecProps) => {
  return (
    <div className="space-y-2">
      <h2 className="font-mono text-xs uppercase font-semibold tracking-wider text-muted-foreground flex items-center gap-2">
        Backend Specs
      </h2>

      <div className="flex flex-wrap gap-x-4 gap-y-1.5">
        <BooleanCheck value={backend.authentication} label="Authentication" />
        <BooleanCheck value={backend.caching} label="Caching" />
        <BooleanCheck value={backend.objectStorage} label="Object Storage" />
        <BooleanCheck value={backend.isContianerized} label="Dockerized" />
        <BooleanCheck value={backend.isCICD} label="CI/CD" />
        <BooleanCheck value={backend.reverseProxy} label="Reverse Proxy" />
        <BooleanCheck value={backend.aIGateway} label="AI Gateway" />
        <BooleanCheck value={backend.dbBackup} label="DB Backup" />
        <BooleanCheck value={backend.messageBroker} label="Message Broker" />
        <BooleanCheck value={backend.monitoringTool} label="Monitoring" />
        <BooleanCheck value={backend.isTested} label="Tested" />
      </div>  
    </div>
  );
};

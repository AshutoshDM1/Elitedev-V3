import * as React from "react";
import SubSection from "@/Shared/Section/SubSection";
import { AppCard } from "./AppCard";
import { Projects } from "@/types/project.types";
import { BooleanCheck } from "@/Shared/BooleanCheck/BooleanCheck";

interface ProjectAppsProps {
  apps?: Projects["apps"];
}

export const ProjectApps = ({ apps }: ProjectAppsProps) => {
  const hasActiveApps =
    apps &&
    (apps.frontend ||
      apps.backend ||
      apps.cliTool ||
      apps.microService ||
      apps.mpcServer ||
      apps.sdk);

  if (!hasActiveApps) return null;

  return (
    <SubSection>
      <div className="space-y-2 p-2">
        <h2 className="font-mono text-xs uppercase font-semibold tracking-wider text-muted-foreground flex items-center gap-2">
          Apps
        </h2>

        {/* Vertical App Cards */}
        <div className="space-y-4">
          {/* 1. Frontend App */}
          {apps.frontend && typeof apps.frontend === "object" && (
            <AppCard
              title="Frontend"
              link={apps.frontend.link}
              github={apps.frontend.github}
              techStack={[
                ...(apps.frontend.techStack || []),
                // apps.frontend.language,
                apps.frontend.deploymentPlatform,
              ]}
            />
          )}

          {/* 2. Backend App */}
          {apps.backend && typeof apps.backend === "object" && (
            <AppCard
              title="Backend"
              link={apps.backend.link}
              github={apps.backend.github}
              techStack={[
                ...(apps.backend.techStack || []),
                apps.backend.ORM,
                apps.backend.databaseHosting,
                apps.backend.deploymentPlatform,
                // apps.backend.language,
              ]}
            />
          )}

          {/* 3. CLI Tool */}
          {apps.cliTool && typeof apps.cliTool === "object" && (
            <AppCard
              title={apps.cliTool.name}
              typeLabel="CLI Utility"
              npmVersion={apps.cliTool.npmVersion}
              githubVersion={apps.cliTool.githubVersion}
              npmLink={apps.cliTool.npmLink}
              github={apps.cliTool.github}
              techStack={[
                apps.cliTool.language,
                ...(apps.cliTool.techStack || []),
              ]}
              checks={
                <BooleanCheck value={apps.cliTool.isCICD} label="CI/CD" />
              }
            />
          )}

          {/* 4. MicroService */}
          {apps.microService && typeof apps.microService === "object" && (
            <AppCard
              title={apps.microService.name}
              typeLabel="Microservice"
              link={apps.microService.link}
              github={apps.microService.github}
              techStack={[
                apps.microService.language,
                apps.microService.deploymentPlatform,
                ...(apps.microService.techStack || []),
              ]}
              checks={
                <BooleanCheck value={apps.microService.isContianerized} label="Dockerized" />
              }
            />
          )}

          {/* 5. MPC Server */}
          {apps.mpcServer && typeof apps.mpcServer === "object" && (
            <AppCard
              title={apps.mpcServer.name}
              typeLabel="MCP Server"
              npmVersion={apps.mpcServer.npmVersion}
              githubVersion={apps.mpcServer.githubVersion}
              npmLink={apps.mpcServer.npmLink}
              github={apps.mpcServer.github}
              techStack={[
                apps.mpcServer.language,
                ...(Array.isArray(apps.mpcServer.SupportedIDE)
                  ? apps.mpcServer.SupportedIDE
                  : apps.mpcServer.SupportedIDE
                  ? [apps.mpcServer.SupportedIDE]
                  : []),
                ...(apps.mpcServer.techStack || []),
              ]}
              checks={
                <BooleanCheck value={apps.mpcServer.isCICD} label="CI/CD" />
              }
            />
          )}

          {/* 6. SDK */}
          {apps.sdk && typeof apps.sdk === "object" && (
            <AppCard
              title={apps.sdk.name}
              typeLabel="SDK Package"
              npmVersion={apps.sdk.npmVersion}
              githubVersion={apps.sdk.githubVersion}
              npmLink={apps.sdk.npmLink}
              github={apps.sdk.github}
              techStack={[
                apps.sdk.language,
                ...(apps.sdk.techStack || []),
              ]}
              checks={
                <BooleanCheck value={apps.sdk.isCICD} label="CI/CD" />
              }
            />
          )}
        </div>
      </div>
    </SubSection>
  );
};


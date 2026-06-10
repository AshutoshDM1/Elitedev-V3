import * as React from "react";
import {
  Globe,
  ExternalLink,
  Server,
  Terminal,
  Cpu,
  Package,
} from "lucide-react";
import { GithubIcon } from "@/Shared/Icons/Icons";
import SubSection from "@/Shared/Section/SubSection";
import TechStackIcon from "@/Shared/TechStackIcon/TechStackIcon";
import { BooleanCheck } from "./BooleanCheck";
import { Projects } from "@/types/project.types";

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
      <div className="space-y-4 p-2">
        <h2 className="font-mono text-xs uppercase font-semibold tracking-wider text-muted-foreground flex items-center gap-2">
          Apps
        </h2>

        {/* Vertical App Cards */}
        <div className="space-y-4">
          {/* 1. Frontend App */}
          {apps.frontend && typeof apps.frontend === "object" && (
            <div className="border border-zinc-400 dark:border-zinc-700 p-4 bg-muted/5 space-y-3">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-sm font-bold text-foreground">
                    {apps.frontend.name}
                  </span>
                  <span className="text-[10px] text-muted-foreground font-mono">
                    (Frontend Client)
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex gap-1">
                    {apps.frontend.link && (
                      <a
                        href={apps.frontend.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1 hover:bg-muted text-muted-foreground hover:text-foreground"
                      >
                        <ExternalLink className="size-4.5" />
                      </a>
                    )}
                    {apps.frontend.github && (
                      <a
                        href={apps.frontend.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1 hover:bg-muted text-muted-foreground hover:text-foreground"
                      >
                        <GithubIcon className="size-4.5" />
                      </a>
                    )}
                  </div>
                </div>
              </div>

              {/* Tech Stack Icons (combined) */}
              {(() => {
                const combinedTech = Array.from(
                  new Set(
                    [
                      apps.frontend.language,
                      apps.frontend.deploymentPlatform,
                      ...(apps.frontend.techStack || []),
                    ].filter(Boolean) as string[]
                  )
                );

                return (
                  combinedTech.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {combinedTech.map((tech) => (
                        <TechStackIcon key={tech} name={tech} />
                      ))}
                    </div>
                  )
                );
              })()}

              {/* Booleans checkmarks row */}
              <div className="flex flex-wrap gap-x-4 gap-y-1">
                {apps.frontend.isCICD && (
                  <BooleanCheck value={true} label="CI/CD" />
                )}
                {apps.frontend.isCustomDomain && (
                  <BooleanCheck value={true} label="Custom Domain" />
                )}
                {apps.frontend.monitoringTool && (
                  <BooleanCheck value={true} label="Monitoring" />
                )}
                {apps.frontend.isContianerized && (
                  <BooleanCheck value={true} label="Containerized" />
                )}
              </div>
            </div>
          )}

          {/* 2. Backend App */}
          {apps.backend && typeof apps.backend === "object" && (
            <div className="border border-zinc-400 dark:border-zinc-700 p-4 bg-muted/5 space-y-3">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-sm font-bold text-foreground">
                    {apps.backend.name}
                  </span>
                  <span className="text-[10px] text-muted-foreground font-mono">
                    (Backend Server)
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex gap-1">
                    {apps.backend.link && (
                      <a
                        href={apps.backend.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1 hover:bg-muted text-muted-foreground hover:text-foreground"
                      >
                        <ExternalLink className="size-4.5" />
                      </a>
                    )}
                    {apps.backend.github && (
                      <a
                        href={apps.backend.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1 hover:bg-muted text-muted-foreground hover:text-foreground"
                      >
                        <GithubIcon className="size-4.5" />
                      </a>
                    )}
                  </div>
                </div>
              </div>

              {/* Tech Stack Icons (combined) */}
              {(() => {
                const combinedTech = Array.from(
                  new Set(
                    [
                      apps.backend.language,
                      apps.backend.ORM,
                      apps.backend.databaseHosting,
                      apps.backend.deploymentPlatform,
                      ...(apps.backend.techStack || []),
                    ].filter(Boolean) as string[]
                  )
                );

                return (
                  combinedTech.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {combinedTech.map((tech) => (
                        <TechStackIcon key={tech} name={tech} />
                      ))}
                    </div>
                  )
                );
              })()}

              {/* Booleans checkmarks row */}
              <div className="flex flex-wrap gap-x-4 gap-y-1">
                {apps.backend.authentication && (
                  <BooleanCheck value={true} label="Authentication" />
                )}
                {apps.backend.caching && (
                  <BooleanCheck value={true} label="Caching" />
                )}
                {apps.backend.objectStorage && (
                  <BooleanCheck value={true} label="Object Storage" />
                )}
                {apps.backend.isContianerized && (
                  <BooleanCheck value={true} label="Dockerized" />
                )}
                {apps.backend.isCICD && (
                  <BooleanCheck value={true} label="CI/CD" />
                )}
                {apps.backend.reverseProxy && (
                  <BooleanCheck value={true} label="Reverse Proxy" />
                )}
                {apps.backend.aIGateway && (
                  <BooleanCheck value={true} label="AI Gateway" />
                )}
                {apps.backend.dbBackup && (
                  <BooleanCheck value={true} label="DB Backup" />
                )}
                {apps.backend.messageBroker && (
                  <BooleanCheck value={true} label="Message Broker" />
                )}
                {apps.backend.monitoringTool && (
                  <BooleanCheck value={true} label="Monitoring" />
                )}
                {apps.backend.isTested && (
                  <BooleanCheck value={true} label="Tested" />
                )}
              </div>
            </div>
          )}

          {/* 3. CLI Tool */}
          {apps.cliTool && typeof apps.cliTool === "object" && (
            <div className="border border-zinc-400 dark:border-zinc-700 p-4 bg-muted/5 space-y-3">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-sm font-bold text-foreground">
                    {apps.cliTool.name}
                  </span>
                  <span className="text-[10px] text-muted-foreground font-mono">
                    (CLI Utility)
                  </span>
                  {apps.cliTool.npmVersion && (
                    <span className="font-mono text-[9px] text-muted-foreground uppercase border border-dashed border-zinc-400 dark:border-zinc-700 px-1.5 py-0.5 ml-2">
                      NPM: v{apps.cliTool.npmVersion}
                    </span>
                  )}
                  {apps.cliTool.githubVersion && (
                    <span className="font-mono text-[9px] text-muted-foreground uppercase border border-dashed border-zinc-400 dark:border-zinc-700 px-1.5 py-0.5">
                      Git: v{apps.cliTool.githubVersion}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex gap-1">
                    {apps.cliTool.npmLink && (
                      <a
                        href={apps.cliTool.npmLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-1.5 py-0.5 hover:bg-muted text-muted-foreground hover:text-foreground border border-dashed border-zinc-400 rounded-none text-[8px] font-bold font-mono uppercase"
                      >
                        NPM
                      </a>
                    )}
                    {apps.cliTool.github && (
                      <a
                        href={apps.cliTool.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1 hover:bg-muted text-muted-foreground hover:text-foreground"
                      >
                        <GithubIcon className="size-4.5" />
                      </a>
                    )}
                  </div>
                </div>
              </div>

              {/* Tech Stack Icons (combined) */}
              {(() => {
                const combinedTech = Array.from(
                  new Set(
                    [
                      apps.cliTool.language,
                      ...(apps.cliTool.techStack || []),
                    ].filter(Boolean) as string[]
                  )
                );

                return (
                  combinedTech.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {combinedTech.map((tech) => (
                        <TechStackIcon key={tech} name={tech} />
                      ))}
                    </div>
                  )
                );
              })()}

              {/* Booleans checkmarks row */}
              <div className="flex flex-wrap gap-x-4 gap-y-1">
                {apps.cliTool.isCICD && (
                  <BooleanCheck value={true} label="CI/CD" />
                )}
              </div>
            </div>
          )}

          {/* 4. MicroService */}
          {apps.microService && typeof apps.microService === "object" && (
            <div className="border border-zinc-400 dark:border-zinc-700 p-4 bg-muted/5 space-y-3">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-sm font-bold text-foreground">
                    {apps.microService.name}
                  </span>
                  <span className="text-[10px] text-muted-foreground font-mono">
                    (Microservice)
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex gap-1">
                    {apps.microService.link && (
                      <a
                        href={apps.microService.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1 hover:bg-muted text-muted-foreground hover:text-foreground"
                      >
                        <ExternalLink className="size-4.5" />
                      </a>
                    )}
                    {apps.microService.github && (
                      <a
                        href={apps.microService.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1 hover:bg-muted text-muted-foreground hover:text-foreground"
                      >
                        <GithubIcon className="size-4.5" />
                      </a>
                    )}
                  </div>
                </div>
              </div>

              {/* Tech Stack Icons (combined) */}
              {(() => {
                const combinedTech = Array.from(
                  new Set(
                    [
                      apps.microService.language,
                      apps.microService.deploymentPlatform,
                      ...(apps.microService.techStack || []),
                    ].filter(Boolean) as string[]
                  )
                );

                return (
                  combinedTech.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {combinedTech.map((tech) => (
                        <TechStackIcon key={tech} name={tech} />
                      ))}
                    </div>
                  )
                );
              })()}

              {/* Booleans checkmarks row */}
              <div className="flex flex-wrap gap-x-4 gap-y-1">
                {apps.microService.isContianerized && (
                  <BooleanCheck value={true} label="Dockerized" />
                )}
              </div>
            </div>
          )}

          {/* 5. MPC Server */}
          {apps.mpcServer && typeof apps.mpcServer === "object" && (
            <div className="border border-zinc-400 dark:border-zinc-700 p-4 bg-muted/5 space-y-3">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-sm font-bold text-foreground">
                    {apps.mpcServer.name}
                  </span>
                  <span className="text-[10px] text-muted-foreground font-mono">
                    (MCP Server)
                  </span>
                  {apps.mpcServer.npmVersion && (
                    <span className="font-mono text-[9px] text-muted-foreground uppercase border border-dashed border-zinc-400 dark:border-zinc-700 px-1.5 py-0.5 ml-2">
                      NPM: v{apps.mpcServer.npmVersion}
                    </span>
                  )}
                  {apps.mpcServer.githubVersion && (
                    <span className="font-mono text-[9px] text-muted-foreground uppercase border border-dashed border-zinc-400 dark:border-zinc-700 px-1.5 py-0.5">
                      Git: v{apps.mpcServer.githubVersion}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex gap-1">
                    {apps.mpcServer.npmLink && (
                      <a
                        href={apps.mpcServer.npmLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-1.5 py-0.5 hover:bg-muted text-muted-foreground hover:text-foreground border border-dashed border-zinc-400 rounded-none text-[8px] font-bold font-mono uppercase"
                      >
                        NPM
                      </a>
                    )}
                    {apps.mpcServer.github && (
                      <a
                        href={apps.mpcServer.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1 hover:bg-muted text-muted-foreground hover:text-foreground"
                      >
                        <GithubIcon className="size-4.5" />
                      </a>
                    )}
                  </div>
                </div>
              </div>

              {/* Tech Stack Icons (combined with language & IDEs) */}
              {(() => {
                const ideList = Array.isArray(apps.mpcServer.SupportedIDE)
                  ? apps.mpcServer.SupportedIDE
                  : apps.mpcServer.SupportedIDE
                  ? [apps.mpcServer.SupportedIDE]
                  : [];

                const combinedTech = Array.from(
                  new Set(
                    [
                      apps.mpcServer.language,
                      ...ideList,
                      ...(apps.mpcServer.techStack || []),
                    ].filter(Boolean) as string[]
                  )
                );

                return (
                  combinedTech.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {combinedTech.map((tech) => (
                        <TechStackIcon key={tech} name={tech} />
                      ))}
                    </div>
                  )
                );
              })()}

              {/* Booleans checkmarks row */}
              <div className="flex flex-wrap gap-x-4 gap-y-1">
                {apps.mpcServer.isCICD && (
                  <BooleanCheck value={true} label="CI/CD" />
                )}
              </div>
            </div>
          )}

          {/* 6. SDK */}
          {apps.sdk && typeof apps.sdk === "object" && (
            <div className="border border-zinc-400 dark:border-zinc-700 p-4 bg-muted/5 space-y-3">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-sm font-bold text-foreground">
                    {apps.sdk.name}
                  </span>
                  <span className="text-[10px] text-muted-foreground font-mono">
                    (SDK Package)
                  </span>
                  {apps.sdk.npmVersion && (
                    <span className="font-mono text-[9px] text-muted-foreground uppercase border border-dashed border-zinc-400 dark:border-zinc-700 px-1.5 py-0.5 ml-2">
                      NPM: v{apps.sdk.npmVersion}
                    </span>
                  )}
                  {apps.sdk.githubVersion && (
                    <span className="font-mono text-[9px] text-muted-foreground uppercase border border-dashed border-zinc-400 dark:border-zinc-700 px-1.5 py-0.5">
                      Git: v{apps.sdk.githubVersion}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex gap-1">
                    {apps.sdk.npmLink && (
                      <a
                        href={apps.sdk.npmLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-1.5 py-0.5 hover:bg-muted text-muted-foreground hover:text-foreground border border-dashed border-zinc-400 rounded-none text-[8px] font-bold font-mono uppercase"
                      >
                        NPM
                      </a>
                    )}
                    {apps.sdk.github && (
                      <a
                        href={apps.sdk.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1 hover:bg-muted text-muted-foreground hover:text-foreground"
                      >
                        <GithubIcon className="size-4.5" />
                      </a>
                    )}
                  </div>
                </div>
              </div>

              {/* Tech Stack Icons (combined) */}
              {(() => {
                const combinedTech = Array.from(
                  new Set(
                    [
                      apps.sdk.language,
                      ...(apps.sdk.techStack || []),
                    ].filter(Boolean) as string[]
                  )
                );

                return (
                  combinedTech.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {combinedTech.map((tech) => (
                        <TechStackIcon key={tech} name={tech} />
                      ))}
                    </div>
                  )
                );
              })()}

              {/* Booleans checkmarks row */}
              <div className="flex flex-wrap gap-x-4 gap-y-1">
                {apps.sdk.isCICD && <BooleanCheck value={true} label="CI/CD" />}
              </div>
            </div>
          )}
        </div>
      </div>
    </SubSection>
  );
};

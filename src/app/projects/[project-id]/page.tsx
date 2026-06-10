"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams, notFound } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  ArrowLeft,
  ExternalLink,
  Server,
  CircleDot,
  Settings,
  Shield,
  Layers,
  Globe,
  Boxes,
  Terminal,
  Cpu,
  Package,
} from "lucide-react";
import { GithubIcon } from "@/Shared/Icons/Icons";
import LineY from "@/Shared/Line/LineY";
import SubSection from "@/Shared/Section/SubSection";
import { Badge } from "@/components/ui/badge";
import TechStackIcon from "@/Shared/TechStackIcon/TechStackIcon";
import { projects } from "@/data/project";

export default function ProjectDetailsPage() {
  const params = useParams();
  const projectIdStr = params ? params["project-id"] : "";

  const project = React.useMemo(() => {
    if (!projectIdStr) return null;
    return projects.find(
      (p) =>
        p.id.toString() === projectIdStr ||
        p.name.toLowerCase() === String(projectIdStr).toLowerCase()
    );
  }, [projectIdStr]);

  if (!project) {
    notFound();
  }

  // Helper to check if any app is active
  const hasActiveApps = 
    project.apps && (
      project.apps.frontend ||
      project.apps.backend ||
      project.apps.cliTool ||
      project.apps.microService ||
      project.apps.mpcServer ||
      project.apps.sdk
    );

  return (
    <div className="pt-10 min-h-screen bg-background">
      <LineY className="border-t border-b-0">
        
        {/* Navigation & Header */}
        <SubSection>
          <div className="mb-4">
            <Link
              href="/projects"
              className="font-mono text-[10px] uppercase text-muted-foreground hover:text-foreground inline-flex items-center gap-1 transition-colors duration-150"
            >
              <ArrowLeft className="w-3 h-3" /> [BACK_TO_REGISTRY]
            </Link>
          </div>

          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 pb-6">
            <div className="space-y-2 max-w-3xl">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs text-muted-foreground uppercase border border-dashed border-zinc-400 dark:border-zinc-700 px-2 py-0.5">
                  ID: #{project.id}
                </span>
                <div className="flex items-center gap-1.5">
                  <span
                    className={cn(
                      "w-2 h-2 rounded-full",
                      project.status === "Live"
                        ? "bg-emerald-500 animate-pulse"
                        : project.status === "Building"
                        ? "bg-amber-500 animate-pulse"
                        : "bg-blue-500",
                    )}
                  />
                  <span className="text-[10px] uppercase font-mono tracking-widest text-foreground font-semibold">
                    {project.status}
                  </span>
                </div>
              </div>
              
              <h1 className="text-2xl font-mono font-bold tracking-tight uppercase text-foreground">
                {project.name}
              </h1>
              <p className="text-xs font-mono text-muted-foreground">
                Timeline: {project.startDate} — {project.endDate}
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed font-sans pt-2">
                {project.description || project.shortDescription}
              </p>
            </div>

            {/* Links Box */}
            <div className="border border-dashed border-zinc-400 dark:border-zinc-700 p-4 bg-muted/10 font-mono text-[10px] space-y-3 min-w-[240px] rounded-none">
              <span className="uppercase text-muted-foreground block border-b border-dashed border-zinc-300 dark:border-zinc-800 pb-1 font-semibold">
                Access Channels
              </span>
              <div className="space-y-2">
                {project.liveLink && (
                  <a
                    href={project.liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between hover:text-foreground text-muted-foreground transition-colors duration-150"
                  >
                    <span>LIVE_PREVIEW</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
                {project.githubLink && (
                  <a
                    href={project.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between hover:text-foreground text-muted-foreground transition-colors duration-150"
                  >
                    <span>GITHUB_REPOSITORY</span>
                    <GithubIcon className="w-3 h-3" />
                  </a>
                )}
                {!project.liveLink && !project.githubLink && (
                  <span className="text-muted-foreground uppercase italic">
                    No access channels available
                  </span>
                )}
              </div>
            </div>
          </div>
        </SubSection>

        {/* Project Image Showcase */}
        {project.projectImage && (
          <SubSection>
            <div className="relative w-full aspect-video md:aspect-[21/9] overflow-hidden border border-dashed border-zinc-400 dark:border-zinc-700 bg-muted/10 p-1 mb-6">
              <div className="relative w-full h-full overflow-hidden bg-zinc-950/20">
                <Image
                  src={project.projectImage}
                  alt={project.name}
                  fill
                  priority
                  className="object-cover object-top filter brightness-95 contrast-105"
                />
              </div>
            </div>
          </SubSection>
        )}

        {/* Combined Project Tech Stack */}
        {project.techstack && project.techstack.length > 0 && (
          <SubSection>
            <div className="space-y-3 border-t border-dashed border-zinc-300 dark:border-zinc-800 pt-6 pb-2">
              <h2 className="font-mono text-xs uppercase font-semibold tracking-wider text-muted-foreground flex items-center gap-2">
                <Boxes className="w-4 h-4" /> Core Technologies / Frameworks
              </h2>
              <div className="flex flex-wrap gap-2">
                {project.techstack.map((tech) => (
                  <TechStackIcon key={tech} name={tech} />
                ))}
              </div>
            </div>
          </SubSection>
        )}

        {/* Core Specs Grid */}
        <SubSection>
          <div className="space-y-4 border-t border-dashed border-zinc-300 dark:border-zinc-800 pt-6">
            <h2 className="font-mono text-xs uppercase font-semibold tracking-wider text-muted-foreground flex items-center gap-2">
              <Settings className="w-4 h-4" /> System Specifications & Architecture
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Architecture Config */}
              <div className="border border-dashed border-zinc-400 dark:border-zinc-700 p-4 bg-muted/5 space-y-2">
                <span className="font-mono text-[9px] uppercase text-muted-foreground block font-bold">Architecture</span>
                <div className="font-sans text-xs font-semibold text-foreground space-y-1">
                  {typeof project.architecture === "object" ? (
                    <>
                      {project.architecture.monolithic && <div className="flex items-center gap-1.5"><CircleDot className="w-3 h-3 text-sky-400" /> Monolithic</div>}
                      {project.architecture.microservice && <div className="flex items-center gap-1.5"><CircleDot className="w-3 h-3 text-purple-400" /> Microservices</div>}
                      {project.architecture.serverless && <div className="flex items-center gap-1.5"><CircleDot className="w-3 h-3 text-emerald-400" /> Serverless</div>}
                    </>
                  ) : (
                    <div className="text-muted-foreground uppercase italic text-[10px]">Unspecified</div>
                  )}
                </div>
              </div>

              {/* Repository Setup */}
              <div className="border border-dashed border-zinc-400 dark:border-zinc-700 p-4 bg-muted/5 space-y-2">
                <span className="font-mono text-[9px] uppercase text-muted-foreground block font-bold">Repository Setup</span>
                <div className="font-sans text-xs font-semibold text-foreground space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Monorepo:</span>
                    <span>{project.isMonorepo ? String(project.isMonorepo) : "No"}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Husky Hook:</span>
                    <span>{project.isHusky ? "Configured" : "None"}</span>
                  </div>
                </div>
              </div>

              {/* Project Governance */}
              <div className="border border-dashed border-zinc-400 dark:border-zinc-700 p-4 bg-muted/5 space-y-2">
                <span className="font-mono text-[9px] uppercase text-muted-foreground block font-bold">Governance & Code</span>
                <div className="font-sans text-xs font-semibold text-foreground space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Open Source:</span>
                    <span className={project.isOpenSource ? "text-emerald-500 font-bold" : "text-muted-foreground"}>
                      {project.isOpenSource ? "Yes" : "No"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">GitHub Stars:</span>
                    <span>Public</span>
                  </div>
                </div>
              </div>

              {/* Documentation Status */}
              <div className="border border-dashed border-zinc-400 dark:border-zinc-700 p-4 bg-muted/5 space-y-2">
                <span className="font-mono text-[9px] uppercase text-muted-foreground block font-bold">Docs & Design</span>
                <div className="font-mono text-[10px] text-foreground space-y-1">
                  <div className="flex items-center justify-between">
                    <span>README:</span>
                    <span className={project.isReadme ? "text-emerald-500" : "text-muted-foreground"}>
                      {project.isReadme ? "AVAILABLE" : "MISSING"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>LLD Design:</span>
                    <span className={project.isLLD ? "text-emerald-500" : "text-muted-foreground"}>
                      {project.isLLD ? "AVAILABLE" : "MISSING"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Agent Skills:</span>
                    <span className={project.isAgentSkills ? "text-emerald-500" : "text-muted-foreground"}>
                      {project.isAgentSkills ? "INTEGRATED" : "NONE"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </SubSection>

        {/* Application Deployment & Service Stacks */}
        <SubSection>
          <div className="space-y-6 border-t border-dashed border-zinc-300 dark:border-zinc-800 pt-6 mt-2 pb-10">
            <h2 className="font-mono text-xs uppercase font-semibold tracking-wider text-muted-foreground flex items-center gap-2">
              <Layers className="w-4 h-4" /> Application Service Components
            </h2>

            {!hasActiveApps && (
              <div className="border border-dashed border-zinc-400 dark:border-zinc-700 p-6 text-center">
                <p className="font-mono text-[10px] text-muted-foreground uppercase">
                  No active sub-application services configured for this project.
                </p>
              </div>
            )}

            {/* Vertical App Cards */}
            <div className="space-y-6">
              
              {/* 1. Frontend App */}
              {project.apps?.frontend && typeof project.apps.frontend === "object" && (
                <div className="border border-dashed border-zinc-400 dark:border-zinc-700 p-5 bg-muted/5 space-y-4">
                  <div className="flex items-center justify-between flex-wrap gap-2 border-b border-dashed border-zinc-300 dark:border-zinc-800 pb-3">
                    <div className="flex items-center gap-2">
                      <Globe className="w-4 h-4 text-sky-500" />
                      <h3 className="font-mono text-xs uppercase font-bold text-foreground">
                        {project.apps.frontend.name} (Frontend client)
                      </h3>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge variant="outline" className="font-mono text-[8px] uppercase tracking-wider rounded-none">
                        Status: {project.apps.frontend.deploymentStatus}
                      </Badge>
                      <div className="flex gap-1.5">
                        {project.apps.frontend.link && (
                          <a href={project.apps.frontend.link} target="_blank" rel="noopener noreferrer" className="p-1 hover:bg-muted text-muted-foreground hover:text-foreground border border-dashed border-zinc-400 rounded-none">
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        )}
                        {project.apps.frontend.github && (
                          <a href={project.apps.frontend.github} target="_blank" rel="noopener noreferrer" className="p-1 hover:bg-muted text-muted-foreground hover:text-foreground border border-dashed border-zinc-400 rounded-none">
                            <GithubIcon className="w-3.5 h-3.5" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 font-mono text-[10px] text-muted-foreground">
                    <div>
                      <span className="uppercase text-muted-foreground/60 block">Platform</span>
                      <span className="text-foreground font-semibold">{String(project.apps.frontend.deploymentPlatform || "N/A")}</span>
                    </div>
                    <div>
                      <span className="uppercase text-muted-foreground/60 block">Language</span>
                      <span className="text-foreground font-semibold">{project.apps.frontend.language || "TypeScript"}</span>
                    </div>
                    <div>
                      <span className="uppercase text-muted-foreground/60 block">CI/CD Pipeline</span>
                      <span className="text-foreground font-semibold">{project.apps.frontend.isCICD ? String(project.apps.frontend.isCICD) : "None"}</span>
                    </div>
                    <div>
                      <span className="uppercase text-muted-foreground/60 block">Domain Configuration</span>
                      <span className="text-foreground font-semibold">{project.apps.frontend.isCustomDomain ? "Custom Domain" : "Default SSL"}</span>
                    </div>
                    <div>
                      <span className="uppercase text-muted-foreground/60 block">Monitoring Tool</span>
                      <span className="text-foreground font-semibold">{project.apps.frontend.monitoringTool ? String(project.apps.frontend.monitoringTool) : "None"}</span>
                    </div>
                    <div>
                      <span className="uppercase text-muted-foreground/60 block">Containerization</span>
                      <span className="text-foreground font-semibold">{project.apps.frontend.isContianerized ? String(project.apps.frontend.isContianerized) : "Bare metal / Edge"}</span>
                    </div>
                  </div>

                  {project.apps.frontend.techStack && project.apps.frontend.techStack.length > 0 && (
                    <div className="space-y-1.5 pt-2 border-t border-dashed border-zinc-200 dark:border-zinc-800">
                      <span className="font-mono text-[9px] uppercase text-muted-foreground/60 block">Frontend Tech Stack</span>
                      <div className="flex flex-wrap gap-1.5">
                        {project.apps.frontend.techStack.map((tech) => (
                          <TechStackIcon key={tech} name={tech} />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* 2. Backend App */}
              {project.apps?.backend && typeof project.apps.backend === "object" && (
                <div className="border border-dashed border-zinc-400 dark:border-zinc-700 p-5 bg-muted/5 space-y-4">
                  <div className="flex items-center justify-between flex-wrap gap-2 border-b border-dashed border-zinc-300 dark:border-zinc-800 pb-3">
                    <div className="flex items-center gap-2">
                      <Server className="w-4 h-4 text-purple-500" />
                      <h3 className="font-mono text-xs uppercase font-bold text-foreground">
                        {project.apps.backend.name} (Backend server)
                      </h3>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge variant="outline" className="font-mono text-[8px] uppercase tracking-wider rounded-none">
                        Status: {project.apps.backend.deploymentStatus}
                      </Badge>
                      <div className="flex gap-1.5">
                        {project.apps.backend.link && (
                          <a href={project.apps.backend.link} target="_blank" rel="noopener noreferrer" className="p-1 hover:bg-muted text-muted-foreground hover:text-foreground border border-dashed border-zinc-400 rounded-none">
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        )}
                        {project.apps.backend.github && (
                          <a href={project.apps.backend.github} target="_blank" rel="noopener noreferrer" className="p-1 hover:bg-muted text-muted-foreground hover:text-foreground border border-dashed border-zinc-400 rounded-none">
                            <GithubIcon className="w-3.5 h-3.5" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 font-mono text-[10px] text-muted-foreground">
                    <div>
                      <span className="uppercase text-muted-foreground/60 block">Platform</span>
                      <span className="text-foreground font-semibold">{String(project.apps.backend.deploymentPlatform || "N/A")}</span>
                    </div>
                    <div>
                      <span className="uppercase text-muted-foreground/60 block">Language</span>
                      <span className="text-foreground font-semibold">{project.apps.backend.language || "TypeScript"}</span>
                    </div>
                    <div>
                      <span className="uppercase text-muted-foreground/60 block">Database Hosting</span>
                      <span className="text-foreground font-semibold">{project.apps.backend.databaseHosting ? String(project.apps.backend.databaseHosting) : "None"}</span>
                    </div>
                    <div>
                      <span className="uppercase text-muted-foreground/60 block">ORM</span>
                      <span className="text-foreground font-semibold">{project.apps.backend.ORM ? String(project.apps.backend.ORM) : "None"}</span>
                    </div>
                    <div>
                      <span className="uppercase text-muted-foreground/60 block">Caching</span>
                      <span className="text-foreground font-semibold">{project.apps.backend.caching ? String(project.apps.backend.caching) : "None"}</span>
                    </div>
                    <div>
                      <span className="uppercase text-muted-foreground/60 block">Object Storage</span>
                      <span className="text-foreground font-semibold">{project.apps.backend.objectStorage ? String(project.apps.backend.objectStorage) : "None"}</span>
                    </div>
                    <div>
                      <span className="uppercase text-muted-foreground/60 block">Authentication</span>
                      <span className="text-foreground font-semibold">{project.apps.backend.authentication ? String(project.apps.backend.authentication) : "None"}</span>
                    </div>
                    <div>
                      <span className="uppercase text-muted-foreground/60 block">Dockerized</span>
                      <span className="text-foreground font-semibold">{project.apps.backend.isContianerized ? String(project.apps.backend.isContianerized) : "No"}</span>
                    </div>
                    <div>
                      <span className="uppercase text-muted-foreground/60 block">CI/CD Pipeline</span>
                      <span className="text-foreground font-semibold">{project.apps.backend.isCICD ? String(project.apps.backend.isCICD) : "None"}</span>
                    </div>
                    <div>
                      <span className="uppercase text-muted-foreground/60 block">Reverse Proxy</span>
                      <span className="text-foreground font-semibold">{project.apps.backend.reverseProxy ? String(project.apps.backend.reverseProxy) : "None"}</span>
                    </div>
                    <div>
                      <span className="uppercase text-muted-foreground/60 block">AI Gateway</span>
                      <span className="text-foreground font-semibold">{project.apps.backend.aIGateway ? String(project.apps.backend.aIGateway) : "None"}</span>
                    </div>
                    <div>
                      <span className="uppercase text-muted-foreground/60 block">Backup Strategy</span>
                      <span className="text-foreground font-semibold">{project.apps.backend.dbBackup ? String(project.apps.backend.dbBackup) : "None"}</span>
                    </div>
                    <div>
                      <span className="uppercase text-muted-foreground/60 block">Message Broker</span>
                      <span className="text-foreground font-semibold">{project.apps.backend.messageBroker ? String(project.apps.backend.messageBroker) : "None"}</span>
                    </div>
                    <div>
                      <span className="uppercase text-muted-foreground/60 block">Monitoring Tool</span>
                      <span className="text-foreground font-semibold">{project.apps.backend.monitoringTool ? String(project.apps.backend.monitoringTool) : "None"}</span>
                    </div>
                    <div>
                      <span className="uppercase text-muted-foreground/60 block">Testing</span>
                      <span className="text-foreground font-semibold">{project.apps.backend.isTested ? "Tested & Verified" : "Untested"}</span>
                    </div>
                  </div>

                  {project.apps.backend.techStack && project.apps.backend.techStack.length > 0 && (
                    <div className="space-y-1.5 pt-2 border-t border-dashed border-zinc-200 dark:border-zinc-800">
                      <span className="font-mono text-[9px] uppercase text-muted-foreground/60 block">Backend Tech Stack</span>
                      <div className="flex flex-wrap gap-1.5">
                        {project.apps.backend.techStack.map((tech) => (
                          <TechStackIcon key={tech} name={tech} />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* 3. CLI Tool */}
              {project.apps?.cliTool && typeof project.apps.cliTool === "object" && (
                <div className="border border-dashed border-zinc-400 dark:border-zinc-700 p-5 bg-muted/5 space-y-4">
                  <div className="flex items-center justify-between flex-wrap gap-2 border-b border-dashed border-zinc-300 dark:border-zinc-800 pb-3">
                    <div className="flex items-center gap-2">
                      <Terminal className="w-4 h-4 text-emerald-500" />
                      <h3 className="font-mono text-xs uppercase font-bold text-foreground">
                        {project.apps.cliTool.name} (CLI Utility)
                      </h3>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge variant="outline" className="font-mono text-[8px] uppercase tracking-wider rounded-none">
                        Status: {project.apps.cliTool.projectStatus}
                      </Badge>
                      <div className="flex gap-1.5">
                        {project.apps.cliTool.npmLink && (
                          <a href={project.apps.cliTool.npmLink} target="_blank" rel="noopener noreferrer" className="p-1 hover:bg-muted text-muted-foreground hover:text-foreground border border-dashed border-zinc-400 rounded-none text-[8px] font-bold px-2 py-0.5 font-mono uppercase">
                            NPM
                          </a>
                        )}
                        {project.apps.cliTool.github && (
                          <a href={project.apps.cliTool.github} target="_blank" rel="noopener noreferrer" className="p-1 hover:bg-muted text-muted-foreground hover:text-foreground border border-dashed border-zinc-400 rounded-none">
                            <GithubIcon className="w-3.5 h-3.5" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 font-mono text-[10px] text-muted-foreground">
                    <div>
                      <span className="uppercase text-muted-foreground/60 block">CLI Language</span>
                      <span className="text-foreground font-semibold">{project.apps.cliTool.language || "N/A"}</span>
                    </div>
                    <div>
                      <span className="uppercase text-muted-foreground/60 block">NPM Version</span>
                      <span className="text-foreground font-semibold">{project.apps.cliTool.npmVersion || "N/A"}</span>
                    </div>
                    <div>
                      <span className="uppercase text-muted-foreground/60 block">GitHub Version</span>
                      <span className="text-foreground font-semibold">{project.apps.cliTool.githubVersion || "N/A"}</span>
                    </div>
                    <div>
                      <span className="uppercase text-muted-foreground/60 block">CI/CD Setup</span>
                      <span className="text-foreground font-semibold">{project.apps.cliTool.isCICD ? String(project.apps.cliTool.isCICD) : "None"}</span>
                    </div>
                  </div>

                  {project.apps.cliTool.techStack && project.apps.cliTool.techStack.length > 0 && (
                    <div className="space-y-1.5 pt-2 border-t border-dashed border-zinc-200 dark:border-zinc-800">
                      <span className="font-mono text-[9px] uppercase text-muted-foreground/60 block">CLI Tech Stack</span>
                      <div className="flex flex-wrap gap-1.5">
                        {project.apps.cliTool.techStack.map((tech) => (
                          <TechStackIcon key={tech} name={tech} />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* 4. MicroService */}
              {project.apps?.microService && typeof project.apps.microService === "object" && (
                <div className="border border-dashed border-zinc-400 dark:border-zinc-700 p-5 bg-muted/5 space-y-4">
                  <div className="flex items-center justify-between flex-wrap gap-2 border-b border-dashed border-zinc-300 dark:border-zinc-800 pb-3">
                    <div className="flex items-center gap-2">
                      <Cpu className="w-4 h-4 text-amber-500" />
                      <h3 className="font-mono text-xs uppercase font-bold text-foreground">
                        {project.apps.microService.name} (Microservice component)
                      </h3>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge variant="outline" className="font-mono text-[8px] uppercase tracking-wider rounded-none">
                        Status: {project.apps.microService.deploymentStatus}
                      </Badge>
                      <div className="flex gap-1.5">
                        {project.apps.microService.link && (
                          <a href={project.apps.microService.link} target="_blank" rel="noopener noreferrer" className="p-1 hover:bg-muted text-muted-foreground hover:text-foreground border border-dashed border-zinc-400 rounded-none">
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        )}
                        {project.apps.microService.github && (
                          <a href={project.apps.microService.github} target="_blank" rel="noopener noreferrer" className="p-1 hover:bg-muted text-muted-foreground hover:text-foreground border border-dashed border-zinc-400 rounded-none">
                            <GithubIcon className="w-3.5 h-3.5" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 font-mono text-[10px] text-muted-foreground">
                    <div>
                      <span className="uppercase text-muted-foreground/60 block">Platform</span>
                      <span className="text-foreground font-semibold">{String(project.apps.microService.deploymentPlatform || "N/A")}</span>
                    </div>
                    <div>
                      <span className="uppercase text-muted-foreground/60 block">Language</span>
                      <span className="text-foreground font-semibold">{project.apps.microService.language || "N/A"}</span>
                    </div>
                    <div>
                      <span className="uppercase text-muted-foreground/60 block">Dockerized</span>
                      <span className="text-foreground font-semibold">{project.apps.microService.isContianerized ? String(project.apps.microService.isContianerized) : "No"}</span>
                    </div>
                  </div>

                  {project.apps.microService.techStack && project.apps.microService.techStack.length > 0 && (
                    <div className="space-y-1.5 pt-2 border-t border-dashed border-zinc-200 dark:border-zinc-800">
                      <span className="font-mono text-[9px] uppercase text-muted-foreground/60 block">Microservice Tech Stack</span>
                      <div className="flex flex-wrap gap-1.5">
                        {project.apps.microService.techStack.map((tech) => (
                          <TechStackIcon key={tech} name={tech} />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* 5. MPC Server */}
              {project.apps?.mpcServer && typeof project.apps.mpcServer === "object" && (
                <div className="border border-dashed border-zinc-400 dark:border-zinc-700 p-5 bg-muted/5 space-y-4">
                  <div className="flex items-center justify-between flex-wrap gap-2 border-b border-dashed border-zinc-300 dark:border-zinc-800 pb-3">
                    <div className="flex items-center gap-2">
                      <Server className="w-4 h-4 text-violet-500" />
                      <h3 className="font-mono text-xs uppercase font-bold text-foreground">
                        {project.apps.mpcServer.name} (MCP Server)
                      </h3>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge variant="outline" className="font-mono text-[8px] uppercase tracking-wider rounded-none">
                        Status: {project.apps.mpcServer.projectStatus}
                      </Badge>
                      <div className="flex gap-1.5">
                        {project.apps.mpcServer.npmLink && (
                          <a href={project.apps.mpcServer.npmLink} target="_blank" rel="noopener noreferrer" className="p-1 hover:bg-muted text-muted-foreground hover:text-foreground border border-dashed border-zinc-400 rounded-none text-[8px] font-bold px-2 py-0.5 font-mono uppercase">
                            NPM
                          </a>
                        )}
                        {project.apps.mpcServer.github && (
                          <a href={project.apps.mpcServer.github} target="_blank" rel="noopener noreferrer" className="p-1 hover:bg-muted text-muted-foreground hover:text-foreground border border-dashed border-zinc-400 rounded-none">
                            <GithubIcon className="w-3.5 h-3.5" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 font-mono text-[10px] text-muted-foreground">
                    <div>
                      <span className="uppercase text-muted-foreground/60 block">Language</span>
                      <span className="text-foreground font-semibold">{project.apps.mpcServer.language || "TypeScript"}</span>
                    </div>
                    <div>
                      <span className="uppercase text-muted-foreground/60 block">NPM Version</span>
                      <span className="text-foreground font-semibold">{project.apps.mpcServer.npmVersion || "N/A"}</span>
                    </div>
                    <div>
                      <span className="uppercase text-muted-foreground/60 block">GitHub Version</span>
                      <span className="text-foreground font-semibold">{project.apps.mpcServer.githubVersion || "N/A"}</span>
                    </div>
                    <div>
                      <span className="uppercase text-muted-foreground/60 block">CI/CD Setup</span>
                      <span className="text-foreground font-semibold">{project.apps.mpcServer.isCICD ? String(project.apps.mpcServer.isCICD) : "None"}</span>
                    </div>
                  </div>

                  {project.apps.mpcServer.SupportedIDE && (
                    <div className="font-mono text-[10px] text-muted-foreground pt-1">
                      <span className="uppercase text-muted-foreground/60 block">Supported IDEs</span>
                      <div className="flex gap-2 text-foreground font-semibold pt-0.5">
                        {Array.isArray(project.apps.mpcServer.SupportedIDE) ? (
                          project.apps.mpcServer.SupportedIDE.map((ide) => (
                            <span key={ide} className="border border-dashed border-zinc-300 dark:border-zinc-800 px-2 py-0.5 bg-background">
                              {ide}
                            </span>
                          ))
                        ) : (
                          <span>All compatible IDEs</span>
                        )}
                      </div>
                    </div>
                  )}

                  {project.apps.mpcServer.techStack && project.apps.mpcServer.techStack.length > 0 && (
                    <div className="space-y-1.5 pt-2 border-t border-dashed border-zinc-200 dark:border-zinc-800">
                      <span className="font-mono text-[9px] uppercase text-muted-foreground/60 block">MCP Tech Stack</span>
                      <div className="flex flex-wrap gap-1.5">
                        {project.apps.mpcServer.techStack.map((tech) => (
                          <TechStackIcon key={tech} name={tech} />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* 6. SDK */}
              {project.apps?.sdk && typeof project.apps.sdk === "object" && (
                <div className="border border-dashed border-zinc-400 dark:border-zinc-700 p-5 bg-muted/5 space-y-4">
                  <div className="flex items-center justify-between flex-wrap gap-2 border-b border-dashed border-zinc-300 dark:border-zinc-800 pb-3">
                    <div className="flex items-center gap-2">
                      <Package className="w-4 h-4 text-pink-500" />
                      <h3 className="font-mono text-xs uppercase font-bold text-foreground">
                        {project.apps.sdk.name} (SDK Package)
                      </h3>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge variant="outline" className="font-mono text-[8px] uppercase tracking-wider rounded-none">
                        Status: {project.apps.sdk.projectStatus}
                      </Badge>
                      <div className="flex gap-1.5">
                        {project.apps.sdk.npmLink && (
                          <a href={project.apps.sdk.npmLink} target="_blank" rel="noopener noreferrer" className="p-1 hover:bg-muted text-muted-foreground hover:text-foreground border border-dashed border-zinc-400 rounded-none text-[8px] font-bold px-2 py-0.5 font-mono uppercase">
                            NPM
                          </a>
                        )}
                        {project.apps.sdk.github && (
                          <a href={project.apps.sdk.github} target="_blank" rel="noopener noreferrer" className="p-1 hover:bg-muted text-muted-foreground hover:text-foreground border border-dashed border-zinc-400 rounded-none">
                            <GithubIcon className="w-3.5 h-3.5" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 font-mono text-[10px] text-muted-foreground">
                    <div>
                      <span className="uppercase text-muted-foreground/60 block">Language</span>
                      <span className="text-foreground font-semibold">{project.apps.sdk.language || "N/A"}</span>
                    </div>
                    <div>
                      <span className="uppercase text-muted-foreground/60 block">NPM Version</span>
                      <span className="text-foreground font-semibold">{project.apps.sdk.npmVersion || "N/A"}</span>
                    </div>
                    <div>
                      <span className="uppercase text-muted-foreground/60 block">GitHub Version</span>
                      <span className="text-foreground font-semibold">{project.apps.sdk.githubVersion || "N/A"}</span>
                    </div>
                    <div>
                      <span className="uppercase text-muted-foreground/60 block">CI/CD Setup</span>
                      <span className="text-foreground font-semibold">{project.apps.sdk.isCICD ? String(project.apps.sdk.isCICD) : "None"}</span>
                    </div>
                  </div>

                  {project.apps.sdk.techStack && project.apps.sdk.techStack.length > 0 && (
                    <div className="space-y-1.5 pt-2 border-t border-dashed border-zinc-200 dark:border-zinc-800">
                      <span className="font-mono text-[9px] uppercase text-muted-foreground/60 block">SDK Tech Stack</span>
                      <div className="flex flex-wrap gap-1.5">
                        {project.apps.sdk.techStack.map((tech) => (
                          <TechStackIcon key={tech} name={tech} />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

            </div>
          </div>
        </SubSection>

      </LineY>
    </div>
  );
}

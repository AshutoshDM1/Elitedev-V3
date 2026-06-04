"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { cn } from "@/lib/utils";
import {
  ArrowLeft,
  ExternalLink,
  Server,
  Calendar,
  Eye,
  EyeOff,
  Activity,
  CheckCircle2,
  GitBranch,
  Star,
  GitFork,
  AlertCircle,
  FileCode,
  Shield,
  Layers,
  Settings,
  CircleDot,
} from "lucide-react";
import Loading from "@/Shared/Loading/Loading";
import ServerError from "@/Shared/Error/Error";
import { GithubIcon } from "@/Shared/Icons/Icons";
import LineY from "@/Shared/Line/LineY";
import SubSection from "@/Shared/Section/SubSection";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface ProjectDetailPayload {
  project: {
    id: number;
    title: string;
    description: string;
    image: string;
    tags: string;
    liveUrl: string | null;
    clientRepo: string | null;
    serverRepo: string | null;
    isMonorepo: boolean;
    repoUrl: string | null;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
  };
  frontends: Array<{
    id: number;
    title: string;
    description: string;
    techStack: string;
    liveUrl: string | null;
    clientRepo: string | null;
    isMonorepo: boolean;
    repoUrl: string | null;
    rootPath: string | null;
    isActive: boolean;
    deploymentPlatform: string | null;
    cicd: boolean;
    cicdTool: string | null;
    status: string;
    stars: number;
    forks: number;
    openIssues: number;
    lastCommitMessage: string | null;
    lastCommitAt: string | null;
  }>;
  backends: Array<{
    id: number;
    title: string;
    description: string;
    techStack: string;
    liveUrl: string | null;
    cicd: boolean;
    cicdTool: string | null;
    containerization: boolean;
    containerizationTool: string | null;
    deploymentPlatform: string | null;
    isCliTool: boolean;
    npmVersion: boolean; // mapped to is_server_less
    serverRepo: string | null;
    isMonorepo: boolean;
    repoUrl: string | null;
    rootPath: string | null;
    isActive: boolean;
    status: string;
    stars: number;
    forks: number;
    openIssues: number;
    lastCommitMessage: string | null;
    lastCommitAt: string | null;
  }>;
  tasks: Array<{
    id: number;
    title: string;
    description: string | null;
    status: string;
    priority: string;
    dueDate: string | null;
  }>;
  envVars: Array<{
    id: number;
    repoType: string;
    repoId: number;
    key: string;
    description: string | null;
    isSecret: boolean;
    defaultValue: string | null;
  }>;
}

export default function ProjectDetailsPage() {
  const params = useParams();
  const projectId = params["project-id"];

  // Fetch all related details for this project
  const { data, isLoading, isError, error, refetch } =
    useQuery<ProjectDetailPayload>({
      queryKey: ["project", projectId],
      queryFn: async () => {
        if (!projectId) throw new Error("No project ID provided");
        const res = await fetch(`/api/projects/${projectId}`);
        if (!res.ok) {
          const errData = await res.json();
          throw new Error(errData.error || "Failed to fetch project details");
        }
        return res.json();
      },
      enabled: !!projectId,
    });

  // State to track environment variable secrecy visibility
  const [revealedSecrets, setRevealedSecrets] = React.useState<
    Record<number, boolean>
  >({});

  const toggleSecret = (id: number) => {
    setRevealedSecrets((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  if (isLoading) {
    return (
      <div className="pt-20 min-h-screen bg-background">
        <Loading message="Connecting project server registry..." />
        
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="pt-20 min-h-screen bg-background px-6">
        <div className="max-w-xl mx-auto">
          <ServerError
            title="Failed to retrieve Project details"
            message={
              error instanceof Error ? error.message : "Database fetch error"
            }
            onRetry={() => refetch()}
          />
          <div className="mt-4 text-center">
            <Link
              href="/projects"
              className="font-mono text-xs uppercase text-muted-foreground hover:text-foreground inline-flex items-center gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back to registry
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const { project, frontends, backends, tasks, envVars } = data;
  const tagList = project.tags
    ? project.tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean)
    : [];

  return (
    <div className="pt-10 min-h-screen bg-background">
      <LineY className="border-t border-b-0">
        {/* Navigation & Header */}
        <SubSection className="max-w-7xl">
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
                      project.isActive
                        ? "bg-emerald-500 animate-pulse"
                        : "bg-zinc-400",
                    )}
                  />
                  <span className="text-[10px] uppercase font-mono tracking-widest text-foreground">
                    {project.isActive ? "ACTIVE_SERVICE" : "ARCHIVED_SERVICE"}
                  </span>
                </div>
              </div>
              <h1 className="text-2xl font-mono font-bold tracking-tight uppercase text-foreground">
                {project.title}
              </h1>
              <p className="text-sm text-muted-foreground leading-relaxed font-sans">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-1 pt-1">
                {tagList.map((tag) => (
                  <Badge
                    key={tag}
                    variant="outline"
                    className="font-mono text-[8px] rounded-none py-0 px-1.5 uppercase bg-muted border-foreground/10 text-foreground"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Links Box */}
            <div className="border border-dashed border-zinc-400 dark:border-zinc-700 p-4 bg-muted/10 font-mono text-[10px] space-y-3 min-w-[240px] rounded-none">
              <span className="uppercase text-muted-foreground block border-b border-dashed border-zinc-300 dark:border-zinc-800 pb-1 font-semibold">
                Project Access Links
              </span>
              <div className="space-y-2">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between hover:text-foreground text-muted-foreground transition-colors duration-150"
                  >
                    <span>LIVE_PREVIEW</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
                {project.isMonorepo && project.repoUrl && (
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between hover:text-foreground text-muted-foreground transition-colors duration-150"
                  >
                    <span>GITHUB_MONOREPO</span>
                    <GithubIcon className="w-3 h-3" />
                  </a>
                )}
                {!project.isMonorepo && project.clientRepo && (
                  <a
                    href={project.clientRepo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between hover:text-foreground text-muted-foreground transition-colors duration-150"
                  >
                    <span>CLIENT_REPOSITORY</span>
                    <GithubIcon className="w-3 h-3" />
                  </a>
                )}
                {!project.isMonorepo && project.serverRepo && (
                  <a
                    href={project.serverRepo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between hover:text-foreground text-muted-foreground transition-colors duration-150"
                  >
                    <span>SERVER_REPOSITORY</span>
                    <Server className="w-3 h-3" />
                  </a>
                )}
                {!project.liveUrl &&
                  !project.repoUrl &&
                  !project.clientRepo &&
                  !project.serverRepo && (
                    <span className="text-muted-foreground uppercase italic">
                      No repository links available
                    </span>
                  )}
              </div>
            </div>
          </div>
        </SubSection>

        {/* Content Tabs */}
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left and Middle Sections - Deployments & Env Variables */}
            <div className="lg:col-span-2 space-y-8">
              {/* Deployments Section */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 border-b border-dashed border-zinc-400 dark:border-zinc-700 pb-2">
                  <Layers className="w-4 h-4 text-muted-foreground" />
                  <h2 className="font-mono text-xs uppercase font-semibold tracking-wider">
                    Deployment Deployments & Services
                  </h2>
                </div>

                {frontends.length === 0 && backends.length === 0 && (
                  <div className="border border-dashed border-zinc-400 dark:border-zinc-700 p-6 text-center">
                    <p className="font-mono text-[10px] text-muted-foreground uppercase">
                      No active deployment stacks seeded for this registry.
                    </p>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Frontends */}
                  {frontends.map((fe) => (
                    <div
                      key={fe.id}
                      className="border border-dashed border-zinc-400 dark:border-zinc-700 p-5 bg-background rounded-none space-y-4 flex flex-col justify-between"
                    >
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-[8px] uppercase tracking-wider text-muted-foreground bg-muted px-1.5 py-0.5">
                            Frontend Stack
                          </span>
                          <div className="flex items-center gap-1.5">
                            <span
                              className={cn(
                                "w-1.5 h-1.5 rounded-full",
                                fe.status === "UP"
                                  ? "bg-emerald-500"
                                  : "bg-red-500",
                              )}
                            />
                            <span className="font-mono text-[9px] uppercase tracking-widest">
                              {fe.status}
                            </span>
                          </div>
                        </div>

                        <h3 className="font-mono text-xs uppercase font-bold text-foreground">
                          {fe.title}
                        </h3>
                        <p className="text-[11px] text-muted-foreground font-sans leading-relaxed">
                          {fe.description}
                        </p>

                        <div className="font-mono text-[9px] space-y-1 text-muted-foreground pt-1 border-t border-dashed border-zinc-300 dark:border-zinc-800">
                          <div>
                            <span className="uppercase">Platform:</span>{" "}
                            <span className="text-foreground">
                              {fe.deploymentPlatform || "N/A"}
                            </span>
                          </div>
                          <div>
                            <span className="uppercase">CI/CD:</span>{" "}
                            <span className="text-foreground">
                              {fe.cicd ? fe.cicdTool || "Enabled" : "Disabled"}
                            </span>
                          </div>
                          {fe.isMonorepo && fe.rootPath && (
                            <div>
                              <span className="uppercase">Root Path:</span>{" "}
                              <span className="text-foreground">
                                /{fe.rootPath}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* GitHub stats */}
                      <div className="pt-3 border-t border-dashed border-zinc-300 dark:border-zinc-800 flex items-center justify-between text-muted-foreground font-mono text-[9px]">
                        <div className="flex items-center gap-3">
                          <span className="flex items-center gap-0.5">
                            <Star className="w-3 h-3" /> {fe.stars}
                          </span>
                          <span className="flex items-center gap-0.5">
                            <GitFork className="w-3 h-3" /> {fe.forks}
                          </span>
                          <span className="flex items-center gap-0.5 text-red-400">
                            <AlertCircle className="w-3 h-3" /> {fe.openIssues}
                          </span>
                        </div>
                        {fe.lastCommitAt && (
                          <span className="uppercase text-[8px] max-w-[120px] truncate text-right">
                            Commit: {fe.lastCommitMessage || "Update"}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}

                  {/* Backends */}
                  {backends.map((be) => (
                    <div
                      key={be.id}
                      className="border border-dashed border-zinc-400 dark:border-zinc-700 p-5 bg-background rounded-none space-y-4 flex flex-col justify-between"
                    >
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-[8px] uppercase tracking-wider text-muted-foreground bg-muted px-1.5 py-0.5">
                            Backend Stack
                          </span>
                          <div className="flex items-center gap-1.5">
                            <span
                              className={cn(
                                "w-1.5 h-1.5 rounded-full",
                                be.status === "UP"
                                  ? "bg-emerald-500"
                                  : "bg-red-500",
                              )}
                            />
                            <span className="font-mono text-[9px] uppercase tracking-widest">
                              {be.status}
                            </span>
                          </div>
                        </div>

                        <h3 className="font-mono text-xs uppercase font-bold text-foreground">
                          {be.title}
                        </h3>
                        <p className="text-[11px] text-muted-foreground font-sans leading-relaxed">
                          {be.description}
                        </p>

                        <div className="font-mono text-[9px] space-y-1 text-muted-foreground pt-1 border-t border-dashed border-zinc-300 dark:border-zinc-800">
                          <div>
                            <span className="uppercase">Platform:</span>{" "}
                            <span className="text-foreground">
                              {be.deploymentPlatform || "N/A"}
                            </span>
                          </div>
                          <div>
                            <span className="uppercase">Dockerized:</span>{" "}
                            <span className="text-foreground">
                              {be.containerization
                                ? be.containerizationTool || "Yes"
                                : "No"}
                            </span>
                          </div>
                          <div>
                            <span className="uppercase">Type:</span>{" "}
                            <span className="text-foreground">
                              {be.isCliTool
                                ? "CLI Utility"
                                : "Web Service Server"}
                            </span>
                          </div>
                          {be.isMonorepo && be.rootPath && (
                            <div>
                              <span className="uppercase">Root Path:</span>{" "}
                              <span className="text-foreground">
                                /{be.rootPath}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* GitHub stats */}
                      <div className="pt-3 border-t border-dashed border-zinc-300 dark:border-zinc-800 flex items-center justify-between text-muted-foreground font-mono text-[9px]">
                        <div className="flex items-center gap-3">
                          <span className="flex items-center gap-0.5">
                            <Star className="w-3 h-3" /> {be.stars}
                          </span>
                          <span className="flex items-center gap-0.5">
                            <GitFork className="w-3 h-3" /> {be.forks}
                          </span>
                          <span className="flex items-center gap-0.5 text-red-400">
                            <AlertCircle className="w-3 h-3" /> {be.openIssues}
                          </span>
                        </div>
                        {be.lastCommitAt && (
                          <span className="uppercase text-[8px] max-w-[120px] truncate text-right">
                            Commit: {be.lastCommitMessage || "Update"}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Environment Variables Section */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 border-b border-dashed border-zinc-400 dark:border-zinc-700 pb-2">
                  <Shield className="w-4 h-4 text-muted-foreground" />
                  <h2 className="font-mono text-xs uppercase font-semibold tracking-wider">
                    Required Environment Config Variables
                  </h2>
                </div>

                {envVars.length === 0 ? (
                  <div className="border border-dashed border-zinc-400 dark:border-zinc-700 p-6 text-center">
                    <p className="font-mono text-[10px] text-muted-foreground uppercase">
                      No environmental variables required for deployment config.
                    </p>
                  </div>
                ) : (
                  <div className="border border-dashed border-zinc-400 dark:border-zinc-700 overflow-hidden rounded-none">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse font-mono text-[10px]">
                        <thead>
                          <tr className="bg-muted/30 border-b border-dashed border-zinc-400 dark:border-zinc-700">
                            <th className="p-3 uppercase text-muted-foreground font-semibold">
                              Scope
                            </th>
                            <th className="p-3 uppercase text-muted-foreground font-semibold">
                              Variable Key
                            </th>
                            <th className="p-3 uppercase text-muted-foreground font-semibold">
                              Description
                            </th>
                            <th className="p-3 uppercase text-muted-foreground font-semibold">
                              Value / Default
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {envVars.map((env) => {
                            const isRevealed = revealedSecrets[env.id];
                            return (
                              <tr
                                key={env.id}
                                className="border-b border-dashed border-zinc-300 dark:border-zinc-800 last:border-0 hover:bg-muted/5 transition-colors duration-150"
                              >
                                <td className="p-3">
                                  <Badge
                                    variant="outline"
                                    className={cn(
                                      "text-[8px] px-1 py-0 rounded-none uppercase",
                                      env.repoType === "frontend"
                                        ? "border-sky-400/20 text-sky-400"
                                        : "border-purple-400/20 text-purple-400",
                                    )}
                                  >
                                    {env.repoType}
                                  </Badge>
                                </td>
                                <td className="p-3 font-bold text-foreground break-all">
                                  {env.key}
                                </td>
                                <td className="p-3 text-muted-foreground font-sans leading-tight min-w-[150px]">
                                  {env.description || "-"}
                                </td>
                                <td className="p-3">
                                  {env.isSecret ? (
                                    <div className="flex items-center gap-1.5">
                                      <span className="font-mono text-muted-foreground select-all bg-muted/40 px-1 py-0.5">
                                        {isRevealed
                                          ? env.defaultValue ||
                                            "SECRET_VAULT_VALUE"
                                          : "••••••••••••"}
                                      </span>
                                      <button
                                        onClick={() => toggleSecret(env.id)}
                                        className="p-1 hover:bg-muted text-muted-foreground hover:text-foreground border border-dashed border-zinc-300 dark:border-zinc-800 rounded-none transition-colors"
                                        title={
                                          isRevealed
                                            ? "Hide Secret"
                                            : "Reveal Secret"
                                        }
                                      >
                                        {isRevealed ? (
                                          <EyeOff className="w-3 h-3" />
                                        ) : (
                                          <Eye className="w-3 h-3" />
                                        )}
                                      </button>
                                    </div>
                                  ) : (
                                    <span className="font-mono text-foreground bg-muted/40 px-1 py-0.5 break-all select-all">
                                      {env.defaultValue || "NULL"}
                                    </span>
                                  )}
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right Section - Task Tracker Board */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 border-b border-dashed border-zinc-400 dark:border-zinc-700 pb-2">
                <Settings className="w-4 h-4 text-muted-foreground" />
                <h2 className="font-mono text-xs uppercase font-semibold tracking-wider">
                  Development Task Board
                </h2>
              </div>

              {tasks.length === 0 ? (
                <div className="border border-dashed border-zinc-400 dark:border-zinc-700 p-6 text-center">
                  <p className="font-mono text-[10px] text-muted-foreground uppercase">
                    No task list records configured.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {tasks.map((task) => (
                    <div
                      key={task.id}
                      className={cn(
                        "border border-dashed p-4 rounded-none transition-all duration-150 flex items-start gap-3 bg-background",
                        task.status === "done"
                          ? "border-zinc-300 dark:border-zinc-900 bg-muted/5 opacity-70"
                          : "border-zinc-400 dark:border-zinc-700 hover:border-zinc-500",
                      )}
                    >
                      {/* Checkbox Icon */}
                      <div className="mt-0.5">
                        {task.status === "done" ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                        ) : task.status === "in_progress" ? (
                          <CircleDot className="w-4 h-4 text-amber-500 animate-pulse" />
                        ) : (
                          <div className="w-4 h-4 border border-dashed border-zinc-400 rounded-none bg-background/50" />
                        )}
                      </div>

                      {/* Content */}
                      <div className="space-y-1 flex-1">
                        <div className="flex items-center justify-between gap-2 flex-wrap">
                          <span
                            className={cn(
                              "font-mono text-[9px] uppercase font-bold tracking-wider",
                              task.status === "done"
                                ? "text-emerald-500"
                                : task.status === "in_progress"
                                  ? "text-amber-500 animate-pulse"
                                  : "text-muted-foreground",
                            )}
                          >
                            [{task.status.replace("_", " ")}]
                          </span>
                          <Badge
                            variant="outline"
                            className={cn(
                              "text-[7px] font-mono rounded-none py-0 px-1 uppercase leading-none border",
                              task.priority === "high"
                                ? "border-red-400/20 text-red-400 bg-red-400/5"
                                : task.priority === "medium"
                                  ? "border-amber-400/20 text-amber-400 bg-amber-400/5"
                                  : "border-zinc-400/20 text-muted-foreground",
                            )}
                          >
                            {task.priority}
                          </Badge>
                        </div>

                        <h4
                          className={cn(
                            "font-mono text-[11px] uppercase font-semibold leading-snug",
                            task.status === "done"
                              ? "line-through text-muted-foreground"
                              : "text-foreground",
                          )}
                        >
                          {task.title}
                        </h4>

                        {task.description && (
                          <p className="text-[10px] text-muted-foreground font-sans leading-relaxed">
                            {task.description}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </LineY>
    </div>
  );
}

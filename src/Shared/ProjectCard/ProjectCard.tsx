"use client";

import { useState } from "react";
import Link from "next/link";
import Image, { StaticImageData } from "next/image";
import { motion } from "motion/react";
import { Pin, ArrowUpRight, ExternalLink, Server } from "lucide-react";
import { cn } from "@/lib/utils";
import { bg } from "@/assets/import";
import { GithubIcon } from "@/Shared/Icons/Icons";
import { Badge } from "@/components/ui/badge";
import Skills from "@/Shared/Skills/Skills";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import ProjectVideoPopUp from "./ProjectVideoPopUp";

import { Projects } from "@/types/project.types";

interface ProjectCardProps {
  project: Projects;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const [cardHover, setCardHover] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const onCardHover = () => {
    setCardHover(true);
  };

  const onCardLeave = () => {
    setCardHover(false);
  };

  const cardVariants = {
    initial: { y: 2 },
    hover: { y: 10 },
  };

  // 1. Resolve Title
  const title = project.name;

  // 2. Resolve Mockup Image
  const projectImage = project.projectImage || "";

  // 3. Resolve Background Image
  const bgImage = project.backgroundImage || bg.image5;

  // 4. Resolve Tags / Skills from top-level techstack
  const tagList = project.techstack || [];

  // 5. Resolve Top Label
  const topLabel = project.status || project.slug;

  // 6. Resolve Status
  const statusText = project.status;

  // Status Color Mapping
  const getStatusColor = (status: string | undefined) => {
    if (!status)
      return { dot: "bg-zinc-400", text: "text-muted-foreground/80" };
    switch (status.toLowerCase()) {
      case "ongoing":
      case "live":
        return {
          dot: "bg-emerald-500 animate-pulse",
          text: "text-emerald-500 font-semibold",
        };
      case "building":
        return {
          dot: "bg-amber-500 animate-pulse",
          text: "text-amber-500 font-semibold",
        };
      case "completed":
        return { dot: "bg-blue-500", text: "text-blue-500 font-semibold" };
      default:
        return { dot: "bg-zinc-400", text: "text-muted-foreground/80" };
    }
  };
  const statusColors = getStatusColor(statusText);

  // 8. Resolve Link Details
  const detailsHref = `/projects/${project.slug}`;
  const detailsLabel = "View Project";

  // 9. Links for Icons
  const liveUrl = project.liveLink;
  const isMonorepo = !!project.isMonorepo;
  const monorepoUrl = isMonorepo ? project.githubLink : null;
  const clientRepo = !isMonorepo
    ? typeof project.apps.frontend === "object"
      ? project.apps.frontend.github
      : typeof project.apps.cliTool === "object"
        ? project.apps.cliTool.github
        : project.githubLink
    : null;
  const serverRepo =
    typeof project.apps.backend === "object"
      ? project.apps.backend.github
      : null;

  return (
    <div
      onMouseEnter={onCardHover}
      onMouseLeave={onCardLeave}
      onClick={() => setIsOpen(true)}
      className="w-full flex flex-col group cursor-pointer"
    >
      {/* Image / Preview Container */}
      <div className="relative w-full aspect-video rounded-none border border-border/80 bg-muted/15 p-1 transition-colors duration-300 group-hover:border-border">
        <div className="h-full w-full border rounded-none bg-muted overflow-hidden relative flex justify-center items-end ">
          {/* Top Label */}
          <span className="absolute top-1.5 group-hover:left-1/2 group-hover:-translate-x-1/2 transition-all duration-300 left-4 text-xs font-medium uppercase text-background select-none z-20">
            {topLabel}
          </span>

          {/* Pin Icon */}
          {project.pinned && (
            <div className="absolute top-1.5 right-1.5 p-1.5 rounded-full border border-border/60 bg-background/90 shadow-xs text-muted-foreground/80 select-none z-20">
              <Pin className="size-3.5 fill-muted-foreground/20 rotate-45" />
            </div>
          )}

          {/* Animated Background Image */}
          {bgImage && (
            <motion.div
              animate={{ opacity: cardHover ? 1 : 0.8 }}
              transition={{ type: "spring", stiffness: 200, damping: 25 }}
              className="absolute inset-0 w-full h-full"
            >
              <Image
                src={bgImage}
                alt={title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </motion.div>
          )}

          {/* Foreground Project Mockup Image */}
          <motion.div
            variants={cardVariants}
            initial="initial"
            animate={cardHover ? "hover" : "initial"}
            transition={{ type: "spring", stiffness: 220, damping: 20 }}
            className="h-[140px] w-[290px] relative overflow-hidden px-1 pt-1 bg-background"
          >
            {projectImage ? (
              <Image
                src={projectImage}
                alt={title}
                width={350}
                height={220}
                className="h-full w-full object-top object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-muted">
                <span className="text-[10px] text-muted-foreground font-mono">
                  NO PREVIEW
                </span>
              </div>
            )}
          </motion.div>
        </div>
      </div>

      {/* Info Details Row */}
      <div className="flex items-center justify-between mt-3 px-1">
        <h3 className="text-base font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
          {title}
        </h3>
        {statusText && (
          <div
            className={cn(
              "flex items-center gap-1.5 text-xs select-none font-medium uppercase",
              statusColors.text,
            )}
          >
            <span className={cn("size-1.5 rounded-full", statusColors.dot)} />
            <span>{statusText}</span>
          </div>
        )}
      </div>

      {/* Description */}
      <p className="text-sm text-foreground/60 mt-1.5 px-1 line-clamp-2 leading-relaxed">
        {project.shortDescription}
      </p>

      {/* Tech Stack Badges */}
      {tagList.length > 0 && (
        <div className="flex flex-wrap gap-1 px-1 mt-2.5">
          {tagList.map((tag) => (
            <div key={tag}>
              <Skills name={tag} />
            </div>
          ))}
        </div>
      )}

      {/* Link and Action Icons */}
      <div className="px-1 pt-3 flex items-center justify-between">
        <Link
          href={detailsHref}
          onClick={(e) => e.stopPropagation()}
          className="inline-flex items-center gap-1 text-xs font-semibold hover:text-muted-foreground group-hover:text-foreground transition-colors"
        >
          <span>{detailsLabel}</span>
          <ArrowUpRight className="size-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
        </Link>

        {/* Info Icons */}
        <div className="flex items-center gap-1.5">
          {liveUrl && (
            <Tooltip>
              <TooltipTrigger asChild>
                <a
                  href={liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="p-1 hover:text-muted-foreground transition-all duration-150 rounded-none"
                >
                  <ExternalLink className="size-3.5" />
                </a>
              </TooltipTrigger>
              <TooltipContent>
                <span>View Live Site</span>
              </TooltipContent>
            </Tooltip>
          )}
          {monorepoUrl && (
            <Tooltip>
              <TooltipTrigger asChild>
                <a
                  href={monorepoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="p-1 hover:text-muted-foreground transition-all duration-150 rounded-none flex items-center gap-1 font-mono text-[8px] uppercase font-bold"
                >
                  <GithubIcon className="size-3.5" />
                  <span className="text-[10px] tracking-wide ">Mono</span>
                </a>
              </TooltipTrigger>
              <TooltipContent>
                <span>Monorepo Repository</span>
              </TooltipContent>
            </Tooltip>
          )}
          {clientRepo && (
            <Tooltip>
              <TooltipTrigger asChild>
                <a
                  href={clientRepo}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="p-1 hover:text-muted-foreground transition-all duration-150 rounded-none"
                >
                  <GithubIcon className="size-3.5" />
                </a>
              </TooltipTrigger>
              <TooltipContent>
                <span>Client Repository</span>
              </TooltipContent>
            </Tooltip>
          )}
          {serverRepo && !isMonorepo && (
            <Tooltip>
              <TooltipTrigger asChild>
                <a
                  href={serverRepo}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="p-1 hover:text-muted-foreground transition-all duration-150 rounded-none"
                >
                  <Server className="size-3.5" />
                </a>
              </TooltipTrigger>
              <TooltipContent>
                <span>Server Repository</span>
              </TooltipContent>
            </Tooltip>
          )}
        </div>
      </div>

      <div onClick={(e) => e.stopPropagation()}>
        <ProjectVideoPopUp
          project={project}
          isOpen={isOpen}
          onOpenChange={setIsOpen}
        />
      </div>
    </div>
  );
}

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

export interface UnifiedProject {
  id: number;
  // Common text fields
  title?: string;
  name?: string;
  description?: string;
  shortDescription?: string;
  // Mockup Images
  image?: string;
  projectImage?: string;
  // Background images
  backgroundImage?: string | null;
  background?: StaticImageData | string;
  // Tags/Skills
  tags?: string;
  skills?: string[];
  // Links
  liveUrl?: string | null;
  liveLink?: string;
  clientRepo?: string | null;
  serverRepo?: string | null;
  repoUrl?: string | null;
  githubLink?: string;
  // Indicators
  isMonorepo?: boolean;
  isActive?: boolean;
  isActivelyMaintining?: boolean;
  status?: string;
  pinned?: boolean;
  topLabel?: string;
  startDate?: string;
  endDate?: string;
  projectIcon?: string;
}

interface ProjectCardProps {
  project: UnifiedProject;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const [cardHover, setCardHover] = useState<boolean>(false);

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
  const title = project.title || project.name || "";

  // 2. Resolve Mockup Image
  const projectImage = project.image || project.projectImage || "";

  // 3. Resolve Background Image
  const getBgImage = (bgName: string | StaticImageData | null | undefined) => {
    if (!bgName) return bg.image1;
    if (typeof bgName !== "string") return bgName; // it's StaticImageData
    const cleanKey = bgName
      .replace(/\.(jpg|png|jpeg)$/, "")
      .replace("/background/", "") as keyof typeof bg;
    return bg[cleanKey] || bg.image1;
  };
  const bgImage = getBgImage(project.backgroundImage || project.background);

  // 4. Resolve Tags / Skills
  const getTags = () => {
    if (project.skills && project.skills.length > 0) {
      return project.skills;
    }
    if (project.tags) {
      return project.tags.split(",").map((t) => t.trim()).filter(Boolean);
    }
    return [];
  };
  const tagList = getTags();

  // 5. Resolve Top Label
  const topLabel = project.topLabel || `#${project.id}`;

  // 6. Resolve Status
  const activeStatus = project.isActivelyMaintining !== undefined ? project.isActivelyMaintining : project.isActive;
  const statusText = project.status || (activeStatus !== undefined ? (activeStatus ? "Active" : "Archived") : undefined);
  const isStatusGreen = statusText === "Live" || statusText === "Active" || statusText === "Building";

  // 7. Resolve Description
  const description = project.description || project.shortDescription || "";

  // 8. Resolve Link Details
  // If it's a database project (we check if activeStatus is defined), we link to its detail page.
  // Otherwise, we link directly to its liveUrl / liveLink.
  const isDbProject = activeStatus !== undefined;
  const detailsHref = isDbProject ? `/projects/${project.id}` : (project.liveLink || project.liveUrl || "#");
  const detailsLabel = isDbProject ? "View Details" : "View Project";

  // 9. Links for Icons
  const liveUrl = project.liveUrl || project.liveLink;
  const monorepoUrl = project.isMonorepo ? (project.repoUrl || project.githubLink) : null;
  const clientRepo = !project.isMonorepo ? (project.clientRepo || (!project.serverRepo ? project.githubLink : null)) : null;
  const serverRepo = project.serverRepo || null;

  return (
    <div
      onMouseEnter={onCardHover}
      onMouseLeave={onCardLeave}
      className="w-full flex flex-col group cursor-pointer"
    >
      {/* Image / Preview Container */}
      <div className="relative w-full aspect-video rounded-none border border-border/80 bg-muted/15 p-1 transition-colors duration-300 group-hover:border-border">
        <div className="h-full w-full border rounded-none bg-muted overflow-hidden relative flex justify-center items-end ">
          {/* Top Label */}
          <span className="absolute top-1.5 group-hover:left-1/2 group-hover:-translate-x-1/2 transition-all duration-300 left-4 text-xs font-mono text-muted-foreground select-none z-20">
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
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground/80 select-none font-medium">
            <span
              className={cn(
                "size-1.5 rounded-full",
                isStatusGreen ? "bg-emerald-500 animate-pulse" : "bg-zinc-400"
              )}
            />
            <span>{statusText}</span>
          </div>
        )}
      </div>

      {/* Description */}
      <p className="text-xs text-foreground mt-1.5 px-1 line-clamp-2 leading-relaxed">
        {description}
      </p>

      {/* Tech Stack Badges */}
      {tagList.length > 0 && (
        <div className="flex flex-wrap gap-1 px-1 mt-2.5">
          {tagList.slice(0, 4).map((tag) => (
            <Badge
              key={tag}
              variant="outline"
              className="font-mono text-[8px] rounded-none py-0 px-1.5 uppercase bg-muted/30 border-foreground/10 text-muted-foreground"
            >
              {tag}
            </Badge>
          ))}
          {tagList.length > 4 && (
            <Badge
              variant="outline"
              className="font-mono text-[8px] rounded-none py-0 px-1.5 bg-muted/10 border-foreground/10 text-muted-foreground/50"
            >
              +{tagList.length - 4} MORE
            </Badge>
          )}
        </div>
      )}

      {/* Link and Action Icons */}
      <div className="px-1 pt-3 flex items-center justify-between">
        <Link
          href={detailsHref}
          className="inline-flex items-center gap-1 text-xs font-semibold text-muted-foreground/80 group-hover:text-foreground transition-colors"
        >
          <span>{detailsLabel}</span>
          <ArrowUpRight className="size-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
        </Link>

        {/* Info Icons */}
        <div className="flex items-center gap-1.5">
          {liveUrl && (
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              title="View Live Site"
              onClick={(e) => e.stopPropagation()}
              className="p-1 hover:bg-muted text-muted-foreground hover:text-foreground border border-zinc-400/80 dark:border-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-600 transition-all duration-150 rounded-none"
            >
              <ExternalLink className="size-3.5" />
            </a>
          )}
          {monorepoUrl && (
            <a
              href={monorepoUrl}
              target="_blank"
              rel="noopener noreferrer"
              title="Monorepo Repository"
              onClick={(e) => e.stopPropagation()}
              className="p-1 hover:bg-muted text-muted-foreground hover:text-foreground border border-zinc-400/80 dark:border-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-600 transition-all duration-150 rounded-none flex items-center gap-1 font-mono text-[8px] uppercase font-bold"
            >
              <GithubIcon className="size-3.5" />
              <span className="text-[7px] tracking-tight">Mono</span>
            </a>
          )}
          {clientRepo && (
            <a
              href={clientRepo}
              target="_blank"
              rel="noopener noreferrer"
              title="Client Repository"
              onClick={(e) => e.stopPropagation()}
              className="p-1 hover:bg-muted text-muted-foreground hover:text-foreground border border-zinc-400/80 dark:border-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-600 transition-all duration-150 rounded-none"
            >
              <GithubIcon className="size-3.5" />
            </a>
          )}
          {serverRepo && (
            <a
              href={serverRepo}
              target="_blank"
              rel="noopener noreferrer"
              title="Server Repository"
              onClick={(e) => e.stopPropagation()}
              className="p-1 hover:bg-muted text-muted-foreground hover:text-foreground border border-zinc-400/80 dark:border-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-600 transition-all duration-150 rounded-none"
            >
              <Server className="size-3.5" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

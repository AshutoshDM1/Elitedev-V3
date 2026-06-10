"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { TechStack, TechStackType } from "@/data/techStack";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// Alias mapping to translate experience skills names to database names
const aliasMap: Record<string, string> = {
  "javascript": "Javascipt",
  "js": "Javascipt",
  "postgresql": "PortgreSQL",
  "postgres": "PortgreSQL",
  "redux toolkit": "Redux",
  "framer motion": "Motion",
  "react query": "Tanstack Query",
  "strapi cms": "Strapi",
  "shadcn ui": "Shadcn",
  "github action": "Github-Action",
  "aws s3": "AWS",
  "next": "Next.js",
  "tailwind css": "Tailwind",
  "trpc": "tPRC",
};

const normalizeName = (name: string) => {
  return name.toLowerCase().replace(/[^a-z0-9]/g, "");
};

const getWords = (name: string): string[] => {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9+]/g, " ")
    .split(/\s+/)
    .filter(Boolean);
};

const isWordSubset = (words1: string[], words2: string[]) => {
  if (words1.length === 0 || words2.length === 0) return false;
  const [shorter, longer] =
    words1.length < words2.length ? [words1, words2] : [words2, words1];
  return shorter.every((w) => longer.includes(w));
};

const findTechByName = (name: string): TechStackType | undefined => {
  const cleanName = name.trim();
  const lowerName = cleanName.toLowerCase();

  // 1. Direct match on alias
  if (aliasMap[lowerName]) {
    const aliasMatch = TechStack.find(
      (t) => t.name.toLowerCase() === aliasMap[lowerName].toLowerCase()
    );
    if (aliasMatch) return aliasMatch;
  }

  // 2. Direct name match case-insensitive
  const directMatch = TechStack.find(
    (t) => t.name.toLowerCase() === lowerName
  );
  if (directMatch) return directMatch;

  // 3. Normalized match
  const normName = normalizeName(cleanName);
  const normMatch = TechStack.find(
    (t) => normalizeName(t.name) === normName
  );
  if (normMatch) return normMatch;

  // 4. Word-based subset check (shorter name must be subset of longer name)
  const inputWords = getWords(cleanName);
  const wordMatch = TechStack.find((t) => {
    const tWords = getWords(t.name);
    return isWordSubset(inputWords, tWords);
  });
  return wordMatch;
};

export interface TechStackIconProps {
  name?: string;
  tech?: TechStackType;
  className?: string;
}

export default function TechStackIcon({
  name,
  tech: propTech,
  className,
}: TechStackIconProps) {
  const { theme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const isDark =
    mounted &&
    (theme === "dark" ||
      (theme === "system" &&
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-color-scheme: dark)").matches));

  // Find tech object by name if not provided
  const tech = React.useMemo(() => {
    if (propTech) return propTech;
    if (name) return findTechByName(name);
    return undefined;
  }, [name, propTech]);

  const displayName = name || tech?.name || "";

  const iconContent = (
    <div
      className={cn(
        "inline-flex items-center gap-1.5 px-2 py-1.5 rounded-xs border border-zinc-200 shadow-xs dark:border-zinc-600 dark:bg-card/30 text-foreground text-xs tracking-wide hover:bg-accent/60 hover:text-accent-foreground transition-all duration-200 cursor-pointer select-none",
        className
      )}
    >
      {tech && (tech.logoLight || tech.logoDark) && (
        <img
          src={
            isDark
              ? tech.logoDark || tech.logoLight
              : tech.logoLight || tech.logoDark
          }
          alt={displayName}
          className="w-4 h-4 object-contain select-none"
        />
      )}
      <span>{displayName}</span>
    </div>
  );

  if (!tech || !tech.techCategoryName) {
    return iconContent;
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        {iconContent}
      </TooltipTrigger>
      <TooltipContent sideOffset={6} className="font-sans">
        <p>{tech.name}</p>
      </TooltipContent>
    </Tooltip>
  );
}

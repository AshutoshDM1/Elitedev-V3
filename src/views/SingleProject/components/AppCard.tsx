import * as React from "react";
import { ExternalLink } from "lucide-react";
import { GithubIcon } from "@/Shared/Icons/Icons";
import TechStackIcon from "@/Shared/TechStackIcon/TechStackIcon";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface AppCardProps {
  title: string;
  typeLabel?: string;
  npmVersion?: string;
  githubVersion?: string;
  link?: string | boolean;
  github?: string | boolean;
  npmLink?: string | boolean;
  techStack: (string | boolean | undefined)[];
  checks?: React.ReactNode;
}

export const AppCard = ({
  title,
  typeLabel,
  npmVersion,
  githubVersion,
  link,
  github,
  npmLink,
  techStack,
  checks,
}: AppCardProps) => {
  const combinedTech = Array.from(
    new Set(techStack.filter(Boolean) as string[])
  );

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <span className="font-mono text-sm font-bold text-foreground">
            {title}
          </span>
          {typeLabel && (
            <span className="text-[10px] text-muted-foreground font-mono">
              ({typeLabel})
            </span>
          )}
          {npmVersion && (
            <span className="font-mono text-[9px] text-muted-foreground uppercase border border-dashed border-zinc-400 dark:border-zinc-700 px-1.5 py-0.5 ml-2">
              NPM: v{npmVersion}
            </span>
          )}
          {githubVersion && (
            <span className="font-mono text-[9px] text-muted-foreground uppercase border border-dashed border-zinc-400 dark:border-zinc-700 px-1.5 py-0.5">
              Git: v{githubVersion}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <div className="flex gap-1">
            {npmLink && typeof npmLink === "string" && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <a
                    href={npmLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-1.5 py-0.5 text-muted-foreground hover:text-foreground border border-dashed border-zinc-400 rounded-none text-[8px] font-bold font-mono uppercase"
                  >
                    NPM
                  </a>
                </TooltipTrigger>
                <TooltipContent>
                  <span>View NPM Package</span>
                </TooltipContent>
              </Tooltip>
            )}
            {link && typeof link === "string" && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1 text-muted-foreground hover:text-foreground"
                  >
                    <ExternalLink className="size-4.5" />
                  </a>
                </TooltipTrigger>
                <TooltipContent>
                  <span>Visit Live App</span>
                </TooltipContent>
              </Tooltip>
            )}
            {github && typeof github === "string" && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <a
                    href={github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1 text-muted-foreground hover:text-foreground"
                  >
                    <GithubIcon className="size-4.5" />
                  </a>
                </TooltipTrigger>
                <TooltipContent>
                  <span>View Github Repository</span>
                </TooltipContent>
              </Tooltip>
            )}
          </div>
        </div>
      </div>

      {/* Tech Stack Icons */}
      {combinedTech.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {combinedTech.map((tech) => (
            <TechStackIcon key={tech} name={tech} />
          ))}
        </div>
      )}

      {/* Boolean checkmarks if any */}
      {checks && (
        <div className="flex flex-wrap gap-x-4 gap-y-1 pt-0.5">
          {checks}
        </div>
      )}
    </div>
  );
};

import * as React from "react";
import { Globe } from "lucide-react";
import { GithubIcon } from "@/Shared/Icons/Icons";
import SubSection from "@/Shared/Section/SubSection";

interface ProjectLinksProps {
  githubLink?: string | null;
  liveLink?: string | null;
}

export const ProjectLinks = ({ githubLink, liveLink }: ProjectLinksProps) => {
  return (
    <SubSection>
      <div className="grid grid-cols-2 border border-dashed border-zinc-400 dark:border-zinc-700 font-mono text-xs uppercase divide-x divide-dashed divide-zinc-400 dark:divide-zinc-700 mb-6">
        {githubLink ? (
          <a
            href={githubLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 py-3 hover:bg-muted/10 transition-colors text-muted-foreground hover:text-foreground"
          >
            <GithubIcon className="w-4 h-4" /> Github
          </a>
        ) : (
          <div className="flex items-center justify-center gap-2 py-3 text-muted-foreground/40 cursor-not-allowed select-none">
            <GithubIcon className="w-4 h-4" /> Github (N/A)
          </div>
        )}
        {liveLink ? (
          <a
            href={liveLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 py-3 hover:bg-muted/10 transition-colors text-muted-foreground hover:text-foreground"
          >
            <Globe className="w-4 h-4" /> Website
          </a>
        ) : (
          <div className="flex items-center justify-center gap-2 py-3 text-muted-foreground/40 cursor-not-allowed select-none">
            <Globe className="w-4 h-4" /> Website (N/A)
          </div>
        )}
      </div>
    </SubSection>
  );
};

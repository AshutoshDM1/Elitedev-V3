import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Projects } from "@/types/project.types";
import { Button } from "@/components/ui/button";
import { ExternalLink, ArrowUpRight } from "lucide-react";
import { GithubIcon } from "@/Shared/Icons/Icons";
import Link from "next/link";

interface ProjectVideoPopUpProps {
  project: Projects;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function ProjectVideoPopUp({
  project,
  isOpen,
  onOpenChange,
}: ProjectVideoPopUpProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-3xl p-0 overflow-hidden border border-border bg-background/95 backdrop-blur-md gap-0 ">
        {/* Video / Preview Container */}
        <div className="relative w-full aspect-video border-b border-border p-10">
          {project.projectVideo ? (
            <video
              src={project.projectVideo}
              autoPlay
              muted
              loop
              className="w-full h-full object-cover"
            />
          ) : (
            project.projectImage && (
              <img
                src={project.projectImage}
                alt={project.name}
                className="w-full h-full object-cover"
              />
            )
          )}
        </div>

        {/* Content Info Container */}
        <div className="p-5 space-y-2">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-1">
              <DialogTitle className="text-base font-bold uppercase tracking-wider text-foreground font-mono">
                {project.name}
              </DialogTitle>
              <DialogDescription className="text-xs text-muted-foreground leading-relaxed">
                {project.shortDescription}
              </DialogDescription>
            </div>
          </div>

          {/* Links & Actions */}
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-border/40">
            {project.liveLink && (
              <Link
                href={project.liveLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="inline-flex"
              >
                <Button className="h-8 text-xs font-semibold flex items-center gap-1.5 cursor-pointer">
                  <ExternalLink className="size-3.5" />
                  <span>Live Site</span>
                </Button>
              </Link>
            )}
            {project.githubLink && (
              <Link
                href={project.githubLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="inline-flex"
              >
                <Button variant="outline" className="h-8 text-xs font-semibold flex items-center gap-1.5 cursor-pointer">
                  <GithubIcon className="size-3.5" />
                  <span>GitHub</span>
                </Button>
              </Link>
            )}
            <Link
              href={`/projects/${project.slug}`}
              onClick={(e) => e.stopPropagation()}
              className="inline-flex ml-auto"
            >
              <Button variant="secondary" className="h-8 text-xs font-semibold flex items-center gap-1 cursor-pointer">
                <span>Details</span>
                <ArrowUpRight className="size-3.5" />
              </Button>
            </Link>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

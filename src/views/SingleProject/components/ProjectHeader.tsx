"use client";
import SubSection from "@/Shared/Section/SubSection";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import MDFormat from "@/Shared/MDFormat/MDFormat";
import Link from "next/link";

interface ProjectHeaderProps {
  name: string;
  slug: string;
  status: string;
  startDate: string;
  githubLink: string;
  liveLink: string;
  endDate: string;
  description?: string;
  shortDescription?: string;
}

export const ProjectHeader = ({
  name,
  slug,
  status,
  startDate,
  endDate,
  description,
  shortDescription,
  githubLink,
  liveLink,
}: ProjectHeaderProps) => {
  return (
    <SubSection>
      <div className="space-y-3 p-2 pb-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-mono font-bold tracking-tight uppercase text-foreground">
            {name}
          </h2>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2">
              <Link href={githubLink} target="_blank" rel="noopener noreferrer">
                <Button>Github</Button>
              </Link>
              <Link href={liveLink} target="_blank" rel="noopener noreferrer">
                <Button>Link</Button>
              </Link>
            </div>
            <Button
              className={cn(
                "text-white hover:opacity-80  ",
                status === "Completed"
                  ? "bg-blue-500 hover:bg-blue-500"
                  : status === "Building"
                    ? "bg-amber-500 hover:bg-amber-500 animate-pulse"
                    : "bg-red-500 hover:bg-red-500",
              )}
            >
              {status}
            </Button>
          </div>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed font-sans ">
          {shortDescription && (
            <p className="text-sm text-muted-foreground leading-relaxed font-sans">
              {shortDescription}
            </p>
          )}
        </p>
      </div>
    </SubSection>
  );
};

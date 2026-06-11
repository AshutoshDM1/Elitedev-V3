"use client";

import { useState } from "react";
import SubSection from "@/Shared/Section/SubSection";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/data/project";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import ProjectCard from "@/Shared/ProjectCard/ProjectCard";
import { Projects } from "@/types/project.types";

export default function Project() {
  const [projectShows, setProjectShow] = useState<boolean>(false);

  const displayedProjects = projectShows ? projects : projects.slice(0, 4);

  // Chunk projects into pairs of 2 for grid rows
  const chunkedProjects: Projects[][] = [];
  for (let i = 0; i < displayedProjects.length; i += 2) {
    chunkedProjects.push(displayedProjects.slice(i, i + 2));
  }

  return (
    <>
      <SubSection>
        <h2 className="text-xl font-medium text-foreground tracking-tight py-1">
          Projects
        </h2>
      </SubSection>
      
      {chunkedProjects.map((chunk, index) => (
        <SubSection key={index}>
          <ProjectGrid projects={chunk} />
        </SubSection>
      ))}

      <SubSection>
        <div className="flex items-center justify-center mt-2">
          <Button
            variant={"outline"}
            onClick={() => setProjectShow(!projectShows)}
            className="border rounded-sm bg-accent-foreground text-white hover:text-white flex items-center gap-1.5 group/btn transition-colors hover:bg-accent-foreground/85"
          >
            <span>{projectShows ? "Show Less" : "View All"}</span>
            <ArrowUpRight
              className={cn(
                "size-3.5 transition-transform duration-300",
                projectShows
                  ? "rotate-180 group-hover/btn:-translate-x-0.5 group-hover/btn:translate-y-0.5"
                  : "group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5",
              )}
            />
          </Button>
        </div>
      </SubSection>
    </>
  );
}

interface GridRowProps {
  projects: Projects[];
}

const ProjectGrid = ({ projects }: GridRowProps) => {
  return (
    <>
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 py-2 ">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </>
  );
};

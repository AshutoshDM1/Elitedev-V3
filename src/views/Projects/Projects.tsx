"use client";
import { useGetProjects } from "../../hooks/getproject";
import LineY from "@/Shared/Line/LineY";
import SubSection from "@/Shared/Section/SubSection";
import { Loader } from "lucide-react";
import Loading from "@/Shared/Loading/Loading";
import ServerError from "@/Shared/Error/Error";
import { CreateProjectDialog } from "./components/CreateProjectDialog";
import ProjectCard, { UnifiedProject } from "@/Shared/ProjectCard/ProjectCard";

export default function Projects() {
  const {
    data: projects = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useGetProjects();

  const chunkedProjects: UnifiedProject[][] = [];
  for (let i = 0; i < projects.length; i += 2) {
    chunkedProjects.push(projects.slice(i, i + 2));
  }

  return (
    <>
      <div className="pt-10">
        <LineY className="border-t border-b-0">
          <SubSection>
            <div className="flex items-center justify-between py-2">
              <div>
                <h1 className="text-xl font-medium text-foreground tracking-tight">
                  Projects
                </h1>
                <p className="text-xs text-muted-foreground font-mono mt-0.5">
                  View all my work
                </p>
              </div>
              <div className="flex items-center gap-3">
                <CreateProjectDialog />
              </div>
            </div>
          </SubSection>

          {isLoading ? (
            <SubSection>
              <Loading message="Loading projects..." />
            </SubSection>
          ) : isError ? (
            <SubSection>
              <ServerError
                title="Failed to load Projects"
                message={
                  error instanceof Error
                    ? error.message
                    : "Failed to load database projects"
                }
                onRetry={() => refetch()}
              />
            </SubSection>
          ) : projects.length === 0 ? (
            <SubSection>
              <div className="flex flex-col items-center justify-center border border-dashed border-zinc-400 dark:border-zinc-700 py-16 text-center">
                <span className="font-mono text-xs text-muted-foreground uppercase">
                  No records found in registry
                </span>
              </div>
            </SubSection>
          ) : (
            chunkedProjects.map((chunk, index) => (
              <SubSection key={index}>
                <ProjectGrid projects={chunk} />
              </SubSection>
            ))
          )}
        </LineY>
      </div>
    </>
  );
}

interface GridRowProps {
  projects: UnifiedProject[];
}

const ProjectGrid = ({ projects }: GridRowProps) => {
  return (
    <>
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 py-2 ">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </>
  );
};

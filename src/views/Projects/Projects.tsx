"use client";
import { projects } from "@/data/project";
import LineY from "@/Shared/Line/LineY";
import SubSection from "@/Shared/Section/SubSection";
import ProjectCard from "@/Shared/ProjectCard/ProjectCard";
import { Projects as ProjectsType } from "@/types/project.types";
import Header from "@/Shared/Header/Header";

export default function Projects() {
  const chunkedProjects: ProjectsType[][] = [];
  for (let i = 0; i < projects.length; i += 2) {
    chunkedProjects.push(projects.slice(i, i + 2));
  }

  return (
    <>
      <div className="py-5">
        <LineY className="border-t border-b-0">
          <SubSection>
            <Header title="Projects" />
          </SubSection>
          {chunkedProjects.map((chunk, index) => (
            <SubSection key={index}>
              <ProjectGrid projects={chunk} />
            </SubSection>
          ))}
        </LineY>
      </div>
    </>
  );
}

interface GridRowProps {
  projects: ProjectsType[];
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

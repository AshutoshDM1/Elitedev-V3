"use client";

import * as React from "react";
import { useParams, notFound } from "next/navigation";
import LineY from "@/Shared/Line/LineY";
import SubSection from "@/Shared/Section/SubSection";
import Header from "@/Shared/Header/Header";
import { projects } from "@/data/project";
import { ProjectImageShowcase } from "./components/ProjectImageShowcase";
import { ProjectHeader } from "./components/ProjectHeader";
import { ProjectSpecs } from "./components/ProjectSpecs";
import { ProjectApps } from "./components/ProjectApps";
import MDFormat from "@/Shared/MDFormat/MDFormat";

interface SingleProjectProps {
  projectSlug?: string;
  isAdmin?: boolean;
}

export default function SingleProject({
  projectSlug,
  isAdmin = false,
}: SingleProjectProps) {
  const params = useParams();
  const projectIdStr = projectSlug || (params ? params["project-id"] : "");

  const project = React.useMemo(() => {
    if (!projectIdStr) return null;
    return projects.find(
      (p) =>
        p.slug.toLowerCase() === String(projectIdStr).toLowerCase() ||
        p.name.toLowerCase() === String(projectIdStr).toLowerCase(),
    );
  }, [projectIdStr]);

  if (!project) {
    notFound();
  }

  return (
    <div className="py-5">
      <LineY className="border-t border-b-0">
        {/* Navigation & Header */}
        <SubSection>
          <Header title="Projects" href="/projects" />
        </SubSection>

        {/* Project Image Showcase */}
        <ProjectImageShowcase
          projectImage={project.projectImage}
          projectVideo={project.projectVideo}
          projectName={project.name}
        />

        {/* Title, Timeline & Description Block */}
        <ProjectHeader
          name={project.name}
          slug={project.slug}
          liveLink={project.liveLink}
          githubLink={project.githubLink}
          status={project.status}
          startDate={project.startDate}
          endDate={project.endDate}
          description={project.description}
          shortDescription={project.shortDescription}
        />

        {/* Application Deployment & Service Stacks */}
        <ProjectApps apps={project.apps} />
        <SubSection>
          {project.description && (
            <MDFormat content={project.description} className="mt-4" />
          )}
        </SubSection>

        {/* Core Specs Grid */}
        {isAdmin && (
          <ProjectSpecs
            architecture={project.architecture}
            isMonorepo={project.isMonorepo}
            isHusky={project.isHusky}
            isOpenSource={project.isOpenSource}
            isReadme={project.isReadme}
            isLLD={project.isLLD}
            isAgentSkills={project.isAgentSkills}
            frontend={project.apps.frontend}
            backend={project.apps.backend}
          />
        )}
      </LineY>
    </div>
  );
}

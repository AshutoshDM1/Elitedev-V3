"use client";

import React, { useState } from "react";
import SubSection from "@/Shared/Section/SubSection";
import { Pin, ArrowUpRight, FolderGit2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface ProjectProps {
  id: number;
  name: string;
  description?: string;
  image: string;
  status?: string;
  githubLink?: string;
  liveLink?: string;
  pinned?: boolean;
  topLabel?: string;
}

export default function Project() {
  const projects: ProjectProps[] = [
    {
      id: 1,
      name: "Lunel",
      description:
        "Your entire dev environment in your pocket. Scan a code and start building.",
      image: "/image.png",
      status: "Live",
      githubLink: "#",
      liveLink: "#",
      pinned: true,
      topLabel: "Lunel",
    },
    {
      id: 2,
      name: "Openside",
      description:
        "Record studio-quality remote audio and video, locally captured without quality loss.",
      image: "/image.png",
      status: "Building",
      githubLink: "#",
      liveLink: "#",
      pinned: false,
      topLabel: "Coming Soon",
    },
  ];

  return (
    <>
      <SubSection>
        <h2 className="text-xl font-medium text-foreground tracking-tight py-1">
          Projects
        </h2>
      </SubSection>
      <SubSection>
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
          {projects.map((project) => (
            <ProjectCard key={project.id} data={project} />
          ))}
        </div>
      </SubSection>
    </>
  );
}

const ProjectCard = ({ data }: { data: ProjectProps }) => {
  return (
    <div className="w-full flex flex-col group">
      {/* Image / Preview Container */}
      <div className="relative w-full aspect-video rounded-md border border-border/80 bg-muted/15 p-1">
        <div className="h-full w-full border rounded-sm bg-muted/50 px-6 pt-10 overflow-hidden ">
          {/* Top Label */}
          <span className="absolute top-3.5 left-4 text-xs font-light text-muted-foreground/80 select-none">
            {data.topLabel}
          </span>

          {/* Pin Icon */}
          {data.pinned && (
            <div className="absolute top-2.5 right-2.5 p-1.5 rounded-full border border-border/60 bg-background/90 shadow-xs text-muted-foreground/80 select-none">
              <Pin className="size-3.5 fill-muted-foreground/20 rotate-45" />
            </div>
          )}

          <div className="w-full relative flex items-center justify-center shadow-md rounded-tr-md rounded-tl-md overflow-hidden ">
            <Image
              src={data.image}
              alt={data.name}
              width={350}
              height={200}
              className="w-full object-top object-cover"
            />
          </div>
        </div>
      </div>

      {/* Info details row */}
      <div className="flex items-center justify-between mt-3 px-1">
        <h3 className="text-base font-semibold text-foreground">{data.name}</h3>
        {data.status && (
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground/80 select-none font-medium">
            <span
              className={cn(
                "size-1.5 rounded-full",
                data.status === "Live"
                  ? "bg-emerald-500 animate-pulse"
                  : "bg-red-500",
              )}
            />
            <span>{data.status}</span>
          </div>
        )}
      </div>

      {/* Description */}
      <p className="text-sm text-muted-foreground/90 font-light mt-1.5 px-1 ">
        {data.description}
      </p>

      {/* Link */}
      <div className="px-1 ">
        <Link
          href={data.liveLink || "#"}
          className="inline-flex items-center gap-1 text-xs font-semibold text-muted-foreground/80 hover:text-foreground transition-colors group/link"
        >
          <span>View Project</span>
          <ArrowUpRight className="size-3.5 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
        </Link>
      </div>
    </div>
  );
};

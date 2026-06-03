"use client";

import { useState } from "react";
import SubSection from "@/Shared/Section/SubSection";
import { Pin, ArrowUpRight } from "lucide-react";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import { projects } from "@/data/project";
import { Button } from "@/components/ui/button";

export interface ProjectProps {
  id: number;
  name: string;
  description?: string;
  shortDescription?: string;
  projectImage: string;
  projectIcon?: string;
  status?: string;
  background?: StaticImageData;
  githubLink?: string;
  liveLink?: string;
  pinned?: boolean;
  topLabel?: string;
  startDate?: string;
  endDate?: string;
  skills?: string[];
}

export default function Project() {
  const [projectShows, setProjectShow] = useState<boolean>(false);

  const displayedProjects = projectShows ? projects : projects.slice(0, 4);

  // Chunk projects into pairs of 2 for grid rows
  const chunkedProjects: ProjectProps[][] = [];
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
  projects: ProjectProps[];
}

const ProjectGrid = ({ projects }: GridRowProps) => {
  return (
    <>
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 py-2 ">
        {projects.map((project) => (
          <ProjectCard key={project.id} data={project} />
        ))}
      </div>
    </>
  );
};

const ProjectCard = ({ data }: { data: ProjectProps }) => {
  const [cardHover, setCardHover] = useState<boolean>(false);

  const onCardHover = () => {
    setCardHover(true);
  };

  const onCardLeave = () => {
    setCardHover(false);
  };

  const cardVariants = {
    initial: { y: 2 },
    hover: { y: 10 },
  };

  return (
    <div
      onMouseEnter={onCardHover}
      onMouseLeave={onCardLeave}
      className="w-full flex flex-col group cursor-pointer"
    >
      {/* Image / Preview Container */}
      <div className="relative w-full aspect-video rounded-none border border-border/80 bg-muted/15 p-1 transition-colors duration-300 group-hover:border-border">
        <div className="h-full w-full border rounded-none bg-muted overflow-hidden relative flex justify-center items-end ">
          {/* Top Label */}
          <span className="absolute top-1.5 group-hover:left-1/2 group-hover:-translate-x-1/2 transition-all duration-300 left-4 text-xs font-medium text-foreground/90 select-none z-20">
            {data.topLabel}
          </span>

          {/* Pin Icon */}
          {data.pinned && (
            <div className="absolute top-1.5 right-1.5 p-1.5 rounded-full border border-border/60 bg-background/90 shadow-xs text-muted-foreground/80 select-none z-20">
              <Pin className="size-3.5 fill-muted-foreground/20 rotate-45" />
            </div>
          )}

          {data.background && (
            <motion.div
              animate={{ opacity: cardHover ? 1 : .8 }}
              transition={{ type: "spring", stiffness: 200, damping: 25 }}
              className="absolute inset-0 w-full h-full"
            >
              <Image
                src={data.background}
                alt={data.name}
                fill
                className="object-cover "
              />
            </motion.div>
          )}

          <motion.div
            variants={cardVariants}
            initial="initial"
            animate={cardHover ? "hover" : "initial"}
            transition={{ type: "spring", stiffness: 220, damping: 20 }}
            className="h-[140px] w-[290px] relative  overflow-hidden px-1 pt-1 bg-background"
          >
            <Image
              src={data.projectImage}
              alt={data.name}
              width={350}
              height={220}
              className="h-full w-full object-top object-cover"
            />
          </motion.div>
        </div>
      </div>

      {/* Info details row */}
      <div className="flex items-center justify-between mt-3 px-1">
        <h3 className="text-base font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
          {data.name}
        </h3>
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
        {data.shortDescription}
      </p>

      {/* Link */}
      <div className="px-1 mt-2">
        <Link
          href={data.liveLink || "#"}
          className="inline-flex items-center gap-1 text-xs font-semibold text-muted-foreground/80 group-hover:text-foreground transition-colors"
        >
          <span>View Project</span>
          <ArrowUpRight className="size-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
        </Link>
      </div>
    </div>
  );
};

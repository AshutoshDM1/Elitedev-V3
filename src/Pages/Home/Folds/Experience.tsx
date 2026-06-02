"use client";

import React, { useState } from "react";
import SubSection from "@/Shared/Section/SubSection";
import Skills from "@/Shared/Skills/Skills";
import { ChevronDown, ChevronUp, Briefcase } from "lucide-react";
import Image from "next/image";
import LineY from "@/Shared/Line/LineY";

interface Experience {
  id: number;
  company: string;
  companyIcon?: string;
  position: string;
  startDate: string;
  endDate?: string;
  companyLocation?: string;
  userLocation?: string;
  jobType?: string;
  description?: string[];
  skills?: string[];
}

export default function Experience() {
  const Experiences: Experience[] = [
    {
      id: 1,
      company: "EdgeNroots",
      companyIcon: "/companyv2.png",
      position: "Software Engineer",
      startDate: "May, 2025",
      endDate: "July, 2025",
      companyLocation: "New Delhi, India",
      userLocation: "Remote",
      jobType: "Full Time",
      description: [
        "Owned the core presentation editor, driving major performance and reliability improvements",
        "Designed and built core editor features like drag-and-drop, resize, and keyboard shortcuts end-to-end",
        "Owned a foundational refactor, strengthening a critical codebase to enable safer and faster production",
        "Drove major Drive page performance improvements, resolving bugs to deliver faster, reliable experiences",
      ],
      skills: [
        "Next",
        "Tailwind",
        "TypeScript",
        "JavaScript",
        "Express",
        "PostgreSQL",
        "Docker",
      ],
    },
    {
      id: 2,
      company: "EdgeNroots",
      companyIcon: "/companyv2.png",
      position: "Frontend Developer Intern",
      startDate: "Aug, 2025",
      endDate: "Mar, 2026",
      companyLocation: "New Delhi, India",
      userLocation: "Remote",
      jobType: "Internship",
      description: [
        "Collaborated with product designers to implement pixel-perfect user interfaces using React and TailwindCSS",
        "Optimized frontend bundle sizes by 25% through code splitting and tree shaking techniques",
        "Integrated complex third-party RESTful APIs, facilitating real-time data updates for active users",
      ],
      skills: ["React", "Tailwind", "JavaScript", "HTML5", "CSS3", "Git"],
    },
  ];

  return (
    <>
      <SubSection>
        <h2 className="text-xl font-medium text-foreground tracking-tight py-1">
          Experiences
        </h2>
      </SubSection>
      <SubSection>
        <div className="w-full flex flex-col gap-2 py-2 ">
          {Experiences.map((experience, index) => (
            <ExperienceCards
              key={experience.id}
              data={experience}
              isLast={index === Experiences.length - 1}
            />
          ))}
        </div>
      </SubSection>
    </>
  );
}

const ExperienceCards = ({
  data,
  isLast,
}: {
  data: Experience;
  isLast: boolean;
}) => {
  const [isOpen, setIsOpen] = useState(true);
  const displayLocation = [data.companyLocation, data.userLocation]
    .filter(Boolean)
    .join(" - ");

  return (
    <LineY className={isLast ? "border-none" : "pb-2"}>
      <div className="w-full p-2 transition-all duration-300 relative overflow-hidden group">
        {/* Header section */}
        <div
          className="flex items-start gap-4 cursor-pointer select-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {/* Company Logo / Fallback */}
          <div className="size-12 shrink-0 rounded-sm border border-border bg-white flex items-center justify-center p-1 text-muted-foreground/80 shadow-inner group-hover:border-foreground/20 transition-colors duration-300">
            {data.companyIcon ? (
              <Image
                src={data.companyIcon}
                alt={data.company}
                width={48}
                height={48}
                className="object-contain"
              />
            ) : (
              <Briefcase className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors duration-300" />
            )}
          </div>

          {/* Company & Position Info */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-base font-semibold text-foreground tracking-tight group-hover:text-primary transition-colors duration-300">
                {data.company}
              </h3>
              {data.jobType && (
                <span className="text-[13px] font-medium text-muted-foreground/90 bg-muted/30 px-2 py-0.5 rounded-md border border-border/60">
                  {data.jobType}
                </span>
              )}
            </div>
            <p className="text-sm text-muted-foreground font-light mt-0.5">
              {data.position}
            </p>
          </div>

          {/* Date & Location Info */}
          <div className="flex items-start gap-3 select-none">
            <div className="text-right hidden sm:block">
              <div className="flex items-center justify-end gap-2">
                <p className="text-sm font-medium text-foreground leading-none">
                  {data.startDate} - {data.endDate || "Present"}
                </p>
                <div className="p-0.5 rounded-sm hover:bg-muted/50 transition-colors duration-200">
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-muted-foreground/60 group-hover:text-foreground transition-colors" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-muted-foreground/60 group-hover:text-foreground transition-colors" />
                  )}
                </div>
              </div>
              {displayLocation && (
                <p className="text-sm text-muted-foreground/80 font-light mt-1.5 pr-6">
                  {displayLocation}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Date & Location for Mobile Layout */}
        <div className="sm:hidden flex flex-wrap justify-between items-center mt-3 pt-3 border-t border-border/40 text-xs text-muted-foreground font-light">
          <p className="font-medium text-foreground">
            {data.startDate} - {data.endDate || "Present"}
          </p>
          {displayLocation && <p>{displayLocation}</p>}
        </div>

        {/* Expandable Content Area */}
        <div
          className={`grid transition-all duration-300 ease-in-out ${
            isOpen
              ? "grid-rows-[1fr] opacity-100 mt-4"
              : "grid-rows-[0fr] opacity-0"
          }`}
        >
          <div className="overflow-hidden">
            {/* Bullet points description */}
            {data.description && data.description.length > 0 && (
              <ul className="space-y-2 text-sm text-muted-foreground/90 font-light  pl-1">
                {data.description.map((bullet, index) => (
                  <li key={index} className="flex items-start gap-2.5">
                    <span className="w-1 h-1 bg-muted-foreground/80 rounded-full  mt-2 shrink-0" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            )}

            {/* Skills Tag Section */}
            {data.skills && data.skills.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-3">
                {data.skills.map((skill, index) => (
                  <Skills key={index} name={skill} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </LineY>
  );
};
